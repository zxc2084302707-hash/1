import type {
  BuyerCandidate,
  MetricState,
  S0Evaluation,
  S0Input,
  S0Metric,
  S0MetricKey,
} from './types'

interface MetricOptions {
  key: S0MetricKey
  label: string
  state: MetricState
  numerator: number | null
  denominator: number | null
  value: number | null
  threshold: string
  excluded?: number
  measuredAt: string | null
  note: string
}

function metric(options: MetricOptions): S0Metric {
  return { excluded: 0, ...options }
}

function measuredState(hasPopulation: boolean, passes: boolean): MetricState {
  if (!hasPopulation) return 'unmeasured'
  return passes ? 'passing' : 'failing'
}

function uniqueRealCandidates(candidates: BuyerCandidate[]) {
  const real = candidates.filter((buyer) => !buyer.isDemo)
  const unique = new Map<string, BuyerCandidate>()
  for (const buyer of real) {
    if (!unique.has(buyer.uniqueKey)) unique.set(buyer.uniqueKey, buyer)
  }

  return {
    candidates: [...unique.values()],
    excluded: candidates.length - unique.size,
  }
}

export function evaluateS0(input: S0Input): S0Evaluation {
  const population = uniqueRealCandidates(input.candidates)
  const buyers = population.candidates
  const count = buyers.length
  const hasBuyers = count > 0
  const operating = buyers.filter((buyer) => buyer.operatingVerified).length
  const qualified = buyers.filter(
    (buyer) =>
      (buyer.grade === 'A' || buyer.grade === 'B') && buyer.relevantImporterOrWholesaler,
  )
  const confirmedA = buyers.filter(
    (buyer) => buyer.grade === 'A' && buyer.confirmedImporter,
  ).length
  const contacts = buyers.filter((buyer) => buyer.verifiedUsableContact).length
  const delivery = buyers.filter((buyer) => buyer.selectedForDelivery)
  const deliveryEligible = delivery.filter(
    (buyer) =>
      (buyer.grade === 'A' || buyer.grade === 'B') &&
      buyer.relevantImporterOrWholesaler &&
      buyer.verifiedUsableContact,
  ).length
  const eligibleReviews = input.supplierReviews.filter((review) => review.eligible)
  const supplierCounts = new Map<string, number>()
  for (const review of eligibleReviews) {
    supplierCounts.set(review.supplierId, (supplierCounts.get(review.supplierId) ?? 0) + 1)
  }
  const supplierSampleComplete =
    supplierCounts.size >= 3 && [...supplierCounts.values()].every((reviews) => reviews >= 10)
  const acceptedReviews = eligibleReviews.filter((review) => review.accepted).length
  const authorizedProviders = input.providerAuthorizations.filter(
    (authorization) =>
      authorization.isCore && authorization.writtenCommercialSaasAuthorization,
  ).length
  const qualifiedCost =
    qualified.length === 0 ? null : input.eligibleDataCostCny / qualified.length

  const metrics: S0Metric[] = [
    metric({
      key: 'uniqueCandidates',
      label: '真实唯一候选企业',
      state: measuredState(hasBuyers, count >= 100),
      numerator: count,
      denominator: 100,
      value: count,
      threshold: '≥ 100家',
      excluded: population.excluded,
      measuredAt: input.measuredAt,
      note: hasBuyers ? '排除DEMO及确定性重复企业' : '尚无合格真实企业样本',
    }),
    metric({
      key: 'operatingBusinesses',
      label: '真实经营企业',
      state: measuredState(hasBuyers, operating / count >= 0.9),
      numerator: operating,
      denominator: count,
      value: hasBuyers ? operating / count : null,
      threshold: '≥ 90%',
      measuredAt: input.measuredAt,
      note: hasBuyers ? '仅计入已审核经营证据' : '缺少可审核企业样本',
    }),
    metric({
      key: 'qualifiedBuyers',
      label: 'A/B级进口或批发企业',
      state: measuredState(hasBuyers, qualified.length / count >= 0.7),
      numerator: qualified.length,
      denominator: count,
      value: hasBuyers ? qualified.length / count : null,
      threshold: '≥ 70%',
      measuredAt: input.measuredAt,
      note: hasBuyers ? '等级与相关性均须完成审核' : '缺少可审核企业样本',
    }),
    metric({
      key: 'confirmedAImporters',
      label: '已确认A级进口商',
      state: measuredState(hasBuyers, confirmedA >= 15),
      numerator: confirmedA,
      denominator: count,
      value: confirmedA,
      threshold: '≥ 15家',
      measuredAt: input.measuredAt,
      note: hasBuyers ? '同时满足A级与进口商确认' : '缺少可审核企业样本',
    }),
    metric({
      key: 'verifiedContacts',
      label: '合法可用的已验证企业联系方式',
      state: measuredState(hasBuyers, contacts >= 60),
      numerator: contacts,
      denominator: count,
      value: contacts,
      threshold: '≥ 60/100',
      measuredAt: input.measuredAt,
      note: hasBuyers ? '要求企业级、合法用途及验证记录' : '缺少可审核企业样本',
    }),
    metric({
      key: 'qualifiedBuyerCost',
      label: '合格买家数据成本',
      state: measuredState(qualified.length > 0, qualifiedCost !== null && qualifiedCost <= 8),
      numerator: input.eligibleDataCostCny,
      denominator: qualified.length,
      value: qualifiedCost,
      threshold: '≤ ¥8/家',
      measuredAt: input.measuredAt,
      note: qualified.length > 0 ? '不含人工成本' : '尚无合格A/B买家，无法计算单位成本',
    }),
    metric({
      key: 'deliveryCompleteness',
      label: '20家完整交付企业',
      state: measuredState(delivery.length > 0, delivery.length === 20 && deliveryEligible === 20),
      numerator: deliveryEligible,
      denominator: delivery.length,
      value: deliveryEligible,
      threshold: '20/20均为A/B级且联系方式合格',
      measuredAt: input.measuredAt,
      note: delivery.length > 0 ? '交付批次需固定为20家' : '尚未形成交付批次',
    }),
    metric({
      key: 'supplierAcceptance',
      label: '中国供应商认可率',
      state: measuredState(
        supplierSampleComplete,
        eligibleReviews.length > 0 && acceptedReviews / eligibleReviews.length >= 0.7,
      ),
      numerator: acceptedReviews,
      denominator: eligibleReviews.length,
      value:
        supplierSampleComplete && eligibleReviews.length > 0
          ? acceptedReviews / eligibleReviews.length
          : null,
      threshold: '3家×10条，认可率≥70%',
      measuredAt: input.measuredAt,
      note: supplierSampleComplete ? '样本要求已满足' : '每家供应商须完成10条评估',
    }),
    metric({
      key: 'providerAuthorization',
      label: '核心数据提供方商业授权',
      state: measuredState(input.providerAuthorizations.length > 0, authorizedProviders >= 1),
      numerator: authorizedProviders,
      denominator: input.providerAuthorizations.length,
      value: authorizedProviders,
      threshold: '≥ 1家书面商业SaaS授权',
      measuredAt: input.measuredAt,
      note:
        input.providerAuthorizations.length > 0
          ? '仅计入已审核书面授权'
          : '尚无数据提供方授权证据',
    }),
  ]

  const state = metrics.some((item) => item.state === 'unmeasured')
    ? 'undetermined'
    : metrics.every((item) => item.state === 'passing')
      ? 'passed'
      : 'failed'

  return { state, metrics, measuredAt: input.measuredAt }
}
