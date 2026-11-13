import type { CatalogComponent, Game } from '../types/domain'

export const games: Game[] = [
  { id: 'apex', title: 'Apex Legends', genre: 'Battle royale', image: 'https://upload.wikimedia.org/wikipedia/en/d/db/Apex_legends_cover.jpg?utm_source=en.wikipedia.org&utm_campaign=index&utm_content=original', demand: 'balanced' },
  { id: 'warzone', title: 'Call of Duty: Warzone', genre: 'Competitive FPS', image: 'https://upload.wikimedia.org/wikipedia/en/6/65/COD_Warzone_Cover_Art.jpg?utm_source=en.wikipedia.org&utm_campaign=index&utm_content=original', demand: 'demanding' },
  { id: 'cyberpunk', title: 'Cyberpunk 2077', genre: 'Action RPG', image: 'https://upload.wikimedia.org/wikipedia/en/9/9f/Cyberpunk_2077_box_art.jpg?utm_source=en.wikipedia.org&utm_campaign=index&utm_content=original', demand: 'demanding' },
  { id: 'elden-ring', title: 'Elden Ring', genre: 'Action RPG', image: 'https://i.ebayimg.com/images/g/9owAAOSww4RiKBzU/s-l1200.jpg', demand: 'demanding' },
  { id: 'valorant', title: 'Valorant', genre: 'Competitive FPS', image: 'https://m.media-amazon.com/images/M/MV5BZmQwMjQ2ZTUtZmM5MC00MTdkLWIxYzgtODU1NzQ4Zjg4NmMxXkEyXkFqcGc@._V1_.jpg', demand: 'light' },
  { id: 'baldurs-gate', title: "Baldur's Gate 3", genre: 'RPG', image: 'https://live-production.wcms.abc-cdn.net.au/6fb825b2cc3e8a5e1f90fb65ca6a57ee?impolicy=wcms_crop_resize&cropH=2160&cropW=2160&xPos=40&yPos=0&width=862&height=862', demand: 'balanced' },
  { id: 'forza', title: 'Forza Horizon 6', genre: 'Racing', image: 'https://content.presspage.com/uploads/1523/cca058d2-d82a-4d74-94a5-4bdc6f4da17f/1920_fh6_evergreen_keyart_branded-square_2160x2160_rgb.png?10000', demand: 'balanced' },
  { id: 'minecraft', title: 'Minecraft', genre: 'Sandbox', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7udRVuulbP8UqXqsn-S_RyGYlmx3T-l5UPOXOhNiKzw&s=10', demand: 'light' },
]

export const catalog: CatalogComponent[] = [
  { id: 'cpu-r5-7600', category: 'CPU', name: 'Ryzen 5 7600', manufacturer: 'AMD', price: 199, socket: 'AM5', performanceTier: 'mid', specs: { Cores: '6 cores / 12 threads', Boost: 'Up to 5.1 GHz', TDP: '65 W' } },
  { id: 'cpu-r7-7800x3d', category: 'CPU', name: 'Ryzen 7 7800X3D', manufacturer: 'AMD', price: 359, socket: 'AM5', performanceTier: 'high', specs: { Cores: '8 cores / 16 threads', Boost: 'Up to 5.0 GHz', TDP: '120 W' } },
  { id: 'cpu-i5-14600k', category: 'CPU', name: 'Core i5-14600K', manufacturer: 'Intel', price: 289, socket: 'LGA1700', performanceTier: 'high', specs: { Cores: '14 cores / 20 threads', Boost: 'Up to 5.3 GHz', TDP: '125 W' } },
  { id: 'gpu-4070-super', category: 'GPU', name: 'GeForce RTX 4070 SUPER', manufacturer: 'NVIDIA', price: 599, wattage: 220, gpuLength: 305, performanceTier: 'high', specs: { VRAM: '12 GB GDDR6X', Outputs: '3 × DisplayPort, 1 × HDMI', RayTracing: 'Excellent' } },
  { id: 'gpu-7800xt', category: 'GPU', name: 'Radeon RX 7800 XT', manufacturer: 'AMD', price: 489, wattage: 263, gpuLength: 302, performanceTier: 'high', specs: { VRAM: '16 GB GDDR6', Outputs: '3 × DisplayPort, 1 × HDMI', RayTracing: 'Very good' } },
  { id: 'gpu-4060', category: 'GPU', name: 'GeForce RTX 4060', manufacturer: 'NVIDIA', price: 299, wattage: 115, gpuLength: 245, performanceTier: 'mid', specs: { VRAM: '8 GB GDDR6', Outputs: '3 × DisplayPort, 1 × HDMI', RayTracing: 'Good' } },
  { id: 'mb-b650', category: 'Motherboard', name: 'B650 AORUS Elite AX', manufacturer: 'Gigabyte', price: 189, socket: 'AM5', memoryType: 'DDR5', formFactor: 'ATX', performanceTier: 'high', specs: { Chipset: 'AMD B650', Networking: 'Wi-Fi 6E', Expansion: 'PCIe 4.0' } },
  { id: 'mb-b760', category: 'Motherboard', name: 'B760M Pro RS', manufacturer: 'ASRock', price: 139, socket: 'LGA1700', memoryType: 'DDR5', formFactor: 'Micro ATX', performanceTier: 'mid', specs: { Chipset: 'Intel B760', Networking: '2.5 Gb LAN', Expansion: 'PCIe 4.0' } },
  { id: 'mb-b550', category: 'Motherboard', name: 'B550M Steel Legend', manufacturer: 'ASRock', price: 119, socket: 'AM4', memoryType: 'DDR4', formFactor: 'Micro ATX', performanceTier: 'mid', specs: { Chipset: 'AMD B550', Networking: '2.5 Gb LAN', Expansion: 'PCIe 4.0' } },
  { id: 'ram-ddr5-32', category: 'Memory', name: 'Vengeance 32 GB', manufacturer: 'Corsair', price: 109, memoryType: 'DDR5', performanceTier: 'mid', specs: { Capacity: '32 GB (2 × 16 GB)', Speed: 'DDR5-6000', Latency: 'CL36' } },
  { id: 'ram-ddr4-32', category: 'Memory', name: 'Ripjaws V 32 GB', manufacturer: 'G.Skill', price: 69, memoryType: 'DDR4', performanceTier: 'mid', specs: { Capacity: '32 GB (2 × 16 GB)', Speed: 'DDR4-3600', Latency: 'CL18' } },
  { id: 'ssd-1tb', category: 'Storage', name: '990 EVO 1 TB', manufacturer: 'Samsung', price: 89, performanceTier: 'high', specs: { Capacity: '1 TB', Interface: 'NVMe PCIe 4.0', Read: 'Up to 5,000 MB/s' } },
  { id: 'psu-650', category: 'Power Supply', name: 'RM650e', manufacturer: 'Corsair', price: 89, wattage: 650, performanceTier: 'mid', specs: { Efficiency: '80+ Gold', Modular: 'Fully modular', Warranty: '7 years' } },
  { id: 'psu-850', category: 'Power Supply', name: 'RM850x SHIFT', manufacturer: 'Corsair', price: 149, wattage: 850, performanceTier: 'high', specs: { Efficiency: '80+ Gold', Modular: 'Fully modular', Warranty: '10 years' } },
  { id: 'case-air', category: 'Case', name: 'North Airflow', manufacturer: 'Fractal Design', price: 139, formFactor: 'ATX', caseGpuClearance: 355, caseCoolerClearance: 170, performanceTier: 'high', specs: { Type: 'Mid tower', Airflow: 'High airflow mesh', FrontIO: 'USB-C, 2 × USB-A' } },
  { id: 'case-compact', category: 'Case', name: 'AP201 Mesh', manufacturer: 'ASUS', price: 89, formFactor: 'Micro ATX', caseGpuClearance: 338, caseCoolerClearance: 170, performanceTier: 'mid', specs: { Type: 'Compact tower', Airflow: 'Mesh panels', FrontIO: 'USB-C, 2 × USB-A' } },
  { id: 'cooler-air', category: 'CPU Cooler', name: 'Peerless Assassin 120', manufacturer: 'Thermalright', price: 44, cpuCoolerHeight: 157, performanceTier: 'high', specs: { Type: 'Dual tower air', Height: '157 mm', Noise: '25.6 dBA' } },
  { id: 'cooler-low', category: 'CPU Cooler', name: 'Pure Rock 2', manufacturer: 'be quiet!', price: 39, cpuCoolerHeight: 155, performanceTier: 'mid', specs: { Type: 'Single tower air', Height: '155 mm', Noise: '26.8 dBA' } },
]

export const categories = ['CPU', 'GPU', 'Motherboard', 'Memory', 'Storage', 'Power Supply', 'Case', 'CPU Cooler'] as const
