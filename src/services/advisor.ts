import type { Build, BuildRequest, CatalogComponent, CompatibilityIssue } from '../types/domain'
import { postJson } from './api'
const modeNumbers={game:0,custom:1,manual:2} as const
const purposes:Record<string,number>={Gaming:0,Streaming:1,'Content creation':2,'Work / school':3,Development:4,'AI / ML':5}
const resolutionNumbers:Record<string,number>={'1080p':0,'1440p':1,'4K':2}
type Response={build:any;estimatedTotal:number|null;feedback:string[];warnings:string[];unverifiedChecks:string[]}
function goal(value?:string){return value==='Value'?'value':value==='High performance'?'high':'balanced'}
function adaptPart(c:any):CatalogComponent{
 const labels:Record<number,CatalogComponent['category']>={0:'CPU',1:'GPU',2:'Motherboard',3:'Memory',4:'Storage',5:'Power Supply',6:'Case',7:'CPU Cooler'}
 const specs={...(c.specifications||{})};if(c.socket)specs.Socket=c.socket;if(c.memoryType)specs['Memory type']=c.memoryType;if(c.formFactor)specs['Form factor']=c.formFactor
 return{id:String(c.id),category:labels[Number(c.type)],name:c.name,manufacturer:c.manufacturer,price:c.estimatedPrice??0,specs,socket:c.socket||undefined,memoryType:c.memoryType||undefined,formFactor:c.formFactor||undefined,wattage:c.wattage??undefined,gpuLength:c.lengthMm??undefined,cpuCoolerHeight:c.heightMm??undefined,performanceTier:c.performanceTier,api:c}
}
function toIssues(r:Response):CompatibilityIssue[]{const a:CompatibilityIssue[]=[...(r.warnings||[]).map(detail=>({severity:'warning' as const,title:'Compatibility warning',detail})),...(r.unverifiedChecks||[]).map(detail=>({severity:'warning' as const,title:'Unverified check',detail})),...(r.feedback||[]).map(detail=>({severity:'success' as const,title:'Advisor note',detail}))];return a.length?a:[{severity:'success',title:'No reported issues',detail:'The API reported no compatibility issues.'}]}
export function adaptRecommendation(r:Response,request:BuildRequest):Build{
 const entries=[['cpu','CPU'],['gpu','GPU'],['motherboard','Motherboard'],['memory','Memory'],['storage','Storage'],['powerSupply','Power Supply'],['case','Case'],['cpuCooler','CPU Cooler']] as const
 const components:Build['components']={}
 for(const [field,category] of entries){const value=r.build?.[field];const part=Array.isArray(value)?value[0]:value;if(part)components[category]=adaptPart(part)}
 const total=r.estimatedTotal??null
 return{id:String(r.build?.id||Date.now()),title:request.mode==='custom'?'Your tailored setup':'Your game-ready setup',subtitle:request.mode==='custom'?(request.useCase||'Everyday')+' focused · '+(request.performanceGoal||'Balanced'):(request.resolution||'1440p')+' gaming · '+(request.performanceGoal||'Balanced'),components,issues:toIssues(r),total,estimate:total==null?'An estimated total is unavailable because one or more prices are unknown.':'Estimated component total from the API catalog.'}
}
export async function generateBuild(r:BuildRequest):Promise<Build>{
 const p:Record<string,unknown>={mode:modeNumbers[r.mode],gameIds:r.mode==='game'?(r.games||[]):[],performanceGoal:goal(r.performanceGoal)}
 if(r.mode==='game'){p.purpose=0;p.targetResolution=resolutionNumbers[r.resolution||'1440p']}
 else{p.purpose=purposes[r.useCase||'Gaming']??0;p.targetResolution=resolutionNumbers[r.resolution||'1440p']}
 const budget=Number(r.budget);if(r.budget&&Number.isFinite(budget))p.maximumEstimatedBudget=budget
 const cpu=r.preferences?.cpuBrand,gpu=r.preferences?.gpuBrand
 if(cpu&&cpu!=='No preference')p.cpuPreference=cpu;if(gpu&&gpu!=='No preference')p.gpuPreference=gpu
 return adaptRecommendation(await postJson<Response>('/builds/recommend',p),r)
}
export async function evaluateManualBuild(parts:Partial<Record<string,CatalogComponent>>){
 const body:Record<string,any>={mode:2,memory:[],storage:[],games:[]}
 const fields:Record<string,string>={CPU:'cpu',GPU:'gpu',Motherboard:'motherboard','Power Supply':'powerSupply',Case:'case','CPU Cooler':'cpuCooler'}
 for(const [category,field] of Object.entries(fields))if(parts[category])body[field]=parts[category]!.api
 if(parts.Memory)body.memory=[parts.Memory.api];if(parts.Storage)body.storage=[parts.Storage.api]
 return toIssues(await postJson<Response>('/builds/evaluate',body))
}
