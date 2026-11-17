import type { ApiComponent, CatalogComponent, ComponentCategory, Game } from '../types/domain'
export const apiBaseUrl = (import.meta.env.VITE_API_BASE_URL || '/api').replace(/\/$/, '')
const categories: Record<number,ComponentCategory> = {0:'CPU',1:'GPU',2:'Motherboard',3:'Memory',4:'Storage',5:'Power Supply',6:'Case',7:'CPU Cooler'}
const numericSpec=(c:ApiComponent,k:string)=>{const n=Number(c.specifications?.[k]);return Number.isFinite(n)&&n>0?n:undefined}
export function adaptGame(g:any):Game{const raw=String(g.demand).toLowerCase();const demand:Game['demand']=raw==='light'||raw==='balanced'||raw==='demanding'?raw:'balanced';return{id:Number(g.id),slug:g.slug,title:g.name,genre:g.genre||'Game',image:g.imageUrl||'',demand,description:g.description||''}}
export function adaptComponent(c:ApiComponent):CatalogComponent{
 const category=categories[Number(c.type)];if(!category)throw new Error('Unknown component type: '+c.type)
 const specs={...(c.specifications||{})};if(c.socket)specs.Socket=c.socket;if(c.memoryType)specs['Memory type']=c.memoryType;if(c.formFactor)specs['Form factor']=c.formFactor;if(c.wattage!=null)specs.Wattage=c.wattage+' W';if(c.capacityGb!=null)specs.Capacity=c.capacityGb+' GB'
 return{id:String(c.id),category,name:c.name,manufacturer:c.manufacturer,price:c.estimatedPrice??0,specs,socket:c.socket||undefined,memoryType:c.memoryType||undefined,formFactor:c.formFactor||undefined,wattage:c.wattage??undefined,gpuLength:c.lengthMm??undefined,caseGpuClearance:numericSpec(c,'GpuClearanceMm'),cpuCoolerHeight:c.heightMm??numericSpec(c,'CoolerHeightMm'),caseCoolerClearance:numericSpec(c,'CoolerClearanceMm'),performanceTier:c.performanceTier,api:c}
}
async function request<T>(path:string,init?:RequestInit):Promise<T>{
 const response=await fetch(apiBaseUrl+path,{...init,headers:{'Content-Type':'application/json',...init?.headers}})
 const data=await response.json().catch(()=>null)
 if(!response.ok){const error=new Error(data?.message||('Request failed ('+response.status+')')) as Error&{minimumEstimatedTotal?:number};error.minimumEstimatedTotal=data?.minimumEstimatedTotal;throw error}
 return data as T
}
export async function fetchCatalogs(){const [g,c]=await Promise.all([request<any[]>('/games'),request<ApiComponent[]>('/components')]);return{games:g.map(adaptGame),catalog:c.map(adaptComponent)}}
export function postJson<T>(path:string,body:unknown){return request<T>(path,{method:'POST',body:JSON.stringify(body)})}
