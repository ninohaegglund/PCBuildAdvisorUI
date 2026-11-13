import { catalog } from '../data/catalog'
import type { Build, BuildRequest, CatalogComponent, CompatibilityIssue } from '../types/domain'

export const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'mock://buildwise'

const find = (id: string) => catalog.find((item) => item.id === id)

export function checkCompatibility(parts: Partial<Record<string, CatalogComponent>>): CompatibilityIssue[] {
  const issues: CompatibilityIssue[] = []
  const cpu = parts.CPU
  const motherboard = parts.Motherboard
  const memory = parts.Memory
  const gpu = parts.GPU
  const psu = parts['Power Supply']
  const pcCase = parts.Case
  const cooler = parts['CPU Cooler']

  if (cpu && motherboard && cpu.socket !== motherboard.socket) {
    issues.push({ severity: 'error', title: 'CPU socket mismatch', detail: `${cpu.name} uses ${cpu.socket}, but ${motherboard.name} is built for ${motherboard.socket}.`, suggestion: `Choose a ${cpu.socket} motherboard.` })
  }
  if (memory && motherboard && memory.memoryType !== motherboard.memoryType) {
    issues.push({ severity: 'error', title: 'Memory type mismatch', detail: `${motherboard.name} supports ${motherboard.memoryType}, while this kit is ${memory.memoryType}.`, suggestion: `Swap to ${motherboard.memoryType} memory.` })
  }
  if (pcCase && motherboard && pcCase.formFactor !== motherboard.formFactor && pcCase.formFactor !== 'ATX') {
    issues.push({ severity: 'error', title: 'Form-factor mismatch', detail: `${motherboard.name} is ${motherboard.formFactor}, but ${pcCase.name} is designed for ${pcCase.formFactor}.`, suggestion: 'Choose a compatible case or a smaller motherboard.' })
  }
  if (gpu && pcCase && gpu.gpuLength && pcCase.caseGpuClearance && gpu.gpuLength > pcCase.caseGpuClearance) {
    issues.push({ severity: 'warning', title: 'GPU clearance is tight', detail: `${gpu.name} is ${gpu.gpuLength} mm long, while this case allows ${pcCase.caseGpuClearance} mm.`, suggestion: 'Choose a case with more GPU clearance.' })
  }
  if (gpu && psu && gpu.wattage && psu.wattage && psu.wattage < gpu.wattage + 250) {
    issues.push({ severity: 'warning', title: 'PSU headroom is low', detail: `${psu.name} provides ${psu.wattage} W for a GPU rated at ${gpu.wattage} W.`, suggestion: 'Consider an 850 W PSU for transient headroom.' })
  }
  if (cooler && pcCase && cooler.cpuCoolerHeight && pcCase.caseCoolerClearance && cooler.cpuCoolerHeight > pcCase.caseCoolerClearance) {
    issues.push({ severity: 'error', title: 'CPU cooler is too tall', detail: `${cooler.name} is ${cooler.cpuCoolerHeight} mm tall, exceeding the case limit of ${pcCase.caseCoolerClearance} mm.`, suggestion: 'Pick a lower-profile cooler or a roomier case.' })
  }
  if (!issues.length) issues.push({ severity: 'success', title: 'Core compatibility looks good', detail: 'Sockets, memory type, form factor, clearance, and power headroom check out for this sample catalog.' })
  return issues
}

function total(parts: Partial<Record<string, CatalogComponent>>) { return Object.values(parts).reduce((sum, part) => sum + (part?.price || 0), 0) }

export async function generateBuild(request: BuildRequest): Promise<Build> {
  await new Promise((resolve) => setTimeout(resolve, 850))
  const parts: Partial<Record<string, CatalogComponent>> = request.mode === 'custom'
    ? { CPU: find(request.preferences?.cpuBrand === 'Intel' ? 'cpu-i5-14600k' : request.useCase === 'AI / ML' ? 'cpu-r7-7800x3d' : 'cpu-r5-7600'), GPU: request.useCase === 'Work / school' ? undefined : find(request.preferences?.gpuBrand === 'AMD' ? 'gpu-7800xt' : 'gpu-4060'), Motherboard: find(request.preferences?.memoryType === 'DDR4' ? 'mb-b550' : request.preferences?.cpuBrand === 'Intel' ? 'mb-b760' : 'mb-b650'), Memory: find(request.preferences?.memoryType === 'DDR4' ? 'ram-ddr4-32' : 'ram-ddr5-32'), Storage: find('ssd-1tb'), 'Power Supply': find(request.useCase === 'Work / school' ? 'psu-650' : 'psu-850'), Case: find(request.preferences?.caseSize === 'Compact' ? 'case-compact' : 'case-air'), 'CPU Cooler': find('cooler-air') }
    : { CPU: find(request.performanceGoal === 'High performance' ? 'cpu-r7-7800x3d' : 'cpu-r5-7600'), GPU: find(request.resolution === '4K' || request.performanceGoal === 'High performance' ? 'gpu-4070-super' : 'gpu-4060'), Motherboard: find('mb-b650'), Memory: find('ram-ddr5-32'), Storage: find('ssd-1tb'), 'Power Supply': find(request.resolution === '4K' ? 'psu-850' : 'psu-650'), Case: find('case-air'), 'CPU Cooler': find('cooler-air') }
  return { id: `build-${Date.now()}`, title: request.mode === 'custom' ? 'Your tailored setup' : 'Your game-ready setup', subtitle: request.mode === 'custom' ? `${request.useCase || 'Everyday'} focused · ${request.performanceGoal || 'Balanced'}` : `${request.resolution || '1440p'} gaming · ${request.performanceGoal || 'Balanced'}`, components: parts, issues: checkCompatibility(parts), total: total(parts), estimate: 'Performance notes are estimates based on sample parts and typical workloads.' }
}
