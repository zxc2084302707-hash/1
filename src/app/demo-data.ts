import type { BuyerCandidate, S0Input } from '../domain/types'

export interface DemoBuyer extends BuyerCandidate {
  name: string
  location: string
  businessType: string
  products: string[]
  matchReason: string
  contact: string
  contactStatus: 'verified' | 'pending'
  evidenceCount: number
}

export const demoBuyers: DemoBuyer[] = [
  {
    id: 'demo-atlas',
    uniqueKey: 'demo-atlas',
    isDemo: true,
    name: 'Atlas Home Distribution',
    location: 'Lagos, Nigeria',
    businessType: '小家电批发商',
    products: ['搅拌机', '电热水壶'],
    matchReason: '演示：产品组合与中国小家电供应商高度重合。',
    contact: 'sales@example.invalid',
    contactStatus: 'verified',
    evidenceCount: 4,
    operatingVerified: true,
    grade: 'A',
    relevantImporterOrWholesaler: true,
    confirmedImporter: true,
    verifiedUsableContact: true,
    selectedForDelivery: false,
  },
  {
    id: 'demo-nova',
    uniqueKey: 'demo-nova',
    isDemo: true,
    name: 'Nova Retail Supply',
    location: 'Abuja, Nigeria',
    businessType: '区域分销商',
    products: ['电熨斗', '电热水壶'],
    matchReason: '演示：覆盖尼日利亚中部零售渠道。',
    contact: '+234 000 000 0000',
    contactStatus: 'pending',
    evidenceCount: 2,
    operatingVerified: true,
    grade: 'B',
    relevantImporterOrWholesaler: true,
    confirmedImporter: false,
    verifiedUsableContact: false,
    selectedForDelivery: false,
  },
  {
    id: 'demo-coast',
    uniqueKey: 'demo-coast',
    isDemo: true,
    name: 'Coastline Appliance Mart',
    location: 'Port Harcourt, Nigeria',
    businessType: '家电零售与批发',
    products: ['搅拌机', '电熨斗'],
    matchReason: '演示：存在批发业务信号，进口属性待核验。',
    contact: 'contact@example.invalid',
    contactStatus: 'pending',
    evidenceCount: 1,
    operatingVerified: false,
    grade: 'C',
    relevantImporterOrWholesaler: false,
    confirmedImporter: false,
    verifiedUsableContact: false,
    selectedForDelivery: false,
  },
]

export const demoS0Input: S0Input = {
  candidates: demoBuyers,
  eligibleDataCostCny: 0,
  supplierReviews: [],
  providerAuthorizations: [],
  measuredAt: null,
}

export const demoEvidence = [
  {
    id: 'ev-1',
    buyer: 'Atlas Home Distribution',
    claim: '演示：官方网站展示搅拌机与电热水壶批发目录',
    source: 'example.invalid/catalog',
    status: '待人工复核',
  },
  {
    id: 'ev-2',
    buyer: 'Nova Retail Supply',
    claim: '演示：商业目录列出区域分销业务',
    source: 'example.invalid/directory',
    status: '待人工复核',
  },
]

