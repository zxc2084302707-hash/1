export type BuyerGrade = 'A' | 'B' | 'C' | 'ungraded'

export interface BuyerCandidate {
  id: string
  uniqueKey: string
  isDemo: boolean
  operatingVerified: boolean
  grade: BuyerGrade
  relevantImporterOrWholesaler: boolean
  confirmedImporter: boolean
  verifiedUsableContact: boolean
  selectedForDelivery: boolean
}

export interface SupplierReview {
  supplierId: string
  buyerId: string
  accepted: boolean
  eligible: boolean
}

export interface ProviderAuthorization {
  providerId: string
  isCore: boolean
  writtenCommercialSaasAuthorization: boolean
}

export interface S0Input {
  candidates: BuyerCandidate[]
  eligibleDataCostCny: number
  supplierReviews: SupplierReview[]
  providerAuthorizations: ProviderAuthorization[]
  measuredAt: string | null
}

export type MetricState = 'unmeasured' | 'failing' | 'passing'
export type S0State = 'undetermined' | 'failed' | 'passed'

export type S0MetricKey =
  | 'uniqueCandidates'
  | 'operatingBusinesses'
  | 'qualifiedBuyers'
  | 'confirmedAImporters'
  | 'verifiedContacts'
  | 'qualifiedBuyerCost'
  | 'deliveryCompleteness'
  | 'supplierAcceptance'
  | 'providerAuthorization'

export interface S0Metric {
  key: S0MetricKey
  label: string
  state: MetricState
  numerator: number | null
  denominator: number | null
  value: number | null
  threshold: string
  excluded: number
  measuredAt: string | null
  note: string
}

export interface S0Evaluation {
  state: S0State
  metrics: S0Metric[]
  measuredAt: string | null
}

