export type BuilderMode = 'game' | 'custom' | 'manual'

export type ComponentCategory = 'CPU' | 'GPU' | 'Motherboard' | 'Memory' | 'Storage' | 'Power Supply' | 'Case' | 'CPU Cooler'

export type CatalogComponent = {
  id: string
  category: ComponentCategory
  name: string
  manufacturer: string
  price: number
  specs: Record<string, string>
  socket?: string
  memoryType?: 'DDR4' | 'DDR5'
  formFactor?: 'ATX' | 'Micro ATX' | 'Mini ITX'
  wattage?: number
  gpuLength?: number
  caseGpuClearance?: number
  cpuCoolerHeight?: number
  caseCoolerClearance?: number
  performanceTier: 'entry' | 'mid' | 'high' | 'enthusiast'
}

export type Game = {
  id: string
  title: string
  genre: string
  image: string
  demand: 'light' | 'balanced' | 'demanding'
}

export type CompatibilityIssue = {
  severity: 'error' | 'warning' | 'success'
  title: string
  detail: string
  suggestion?: string
}

export type Build = {
  id: string
  title: string
  subtitle: string
  components: Partial<Record<ComponentCategory, CatalogComponent>>
  issues: CompatibilityIssue[]
  estimate: string
  total: number
}

export type BuildRequest = {
  mode: BuilderMode
  games?: string[]
  resolution?: string
  performanceGoal?: string
  useCase?: string
  preferences?: Record<string, string>
  budget?: string
}
