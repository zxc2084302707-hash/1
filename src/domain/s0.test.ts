import { describe, expect, it } from 'vitest'
import { evaluateS0 } from './s0'
import type { BuyerCandidate, S0Input } from './types'

function candidate(index: number): BuyerCandidate {
  return {
    id: `buyer-${index}`,
    tenantId: 'tenant-1',
    uniqueKey: `reg-ng-${index}`,
    isDemo: false,
    evidenceEligible: true,
    operatingVerified: index < 90,
    grade: index < 15 ? 'A' : index < 70 ? 'B' : 'C',
    relevantImporterOrWholesaler: index < 70,
    confirmedImporter: index < 15,
    verifiedUsableContact: index < 60,
    selectedForDelivery: index < 20,
  }
}

function passingInput(): S0Input {
  return {
    tenantId: 'tenant-1',
    candidates: Array.from({ length: 100 }, (_, index) => candidate(index)),
    eligibleDataCostCny: 560,
    supplierReviews: Array.from({ length: 30 }, (_, index) => ({
      supplierId: `supplier-${Math.floor(index / 10) + 1}`,
      buyerId: `buyer-${index}`,
      accepted: index < 21,
      eligible: true,
    })),
    providerAuthorizations: [
      { providerId: 'provider-1', isCore: true, writtenCommercialSaasAuthorization: true },
    ],
    measuredAt: '2026-10-14T08:00:00.000Z',
  }
}

describe('evaluateS0', () => {
  it('keeps an empty dataset undetermined with every metric unmeasured', () => {
    const result = evaluateS0({
      tenantId: 'tenant-1',
      candidates: [],
      eligibleDataCostCny: 0,
      supplierReviews: [],
      providerAuthorizations: [],
      measuredAt: null,
    })

    expect(result.state).toBe('undetermined')
    expect(result.metrics).toHaveLength(9)
    expect(result.metrics.every((metric) => metric.state === 'unmeasured')).toBe(true)
  })

  it('excludes demo records and duplicate company identities from real counts', () => {
    const input = passingInput()
    input.candidates.push({ ...candidate(100), id: 'demo-1', uniqueKey: 'demo-1', isDemo: true })
    input.candidates.push({ ...candidate(0), id: 'duplicate-1' })

    const result = evaluateS0(input)
    const population = result.metrics.find((metric) => metric.key === 'uniqueCandidates')

    expect(population).toMatchObject({ numerator: 100, denominator: 100, excluded: 2 })
    expect(result.state).toBe('passed')
  })

  it('excludes candidates without matching ownership or required evidence', () => {
    const input = passingInput()
    input.candidates.push({ ...candidate(100), id: 'foreign', tenantId: 'tenant-2' })
    input.candidates.push({ ...candidate(101), id: 'no-evidence', evidenceEligible: false })

    const result = evaluateS0(input)
    const population = result.metrics.find((metric) => metric.key === 'uniqueCandidates')

    expect(population).toMatchObject({ numerator: 100, excluded: 2 })
    expect(result.state).toBe('passed')
  })

  it('remains undetermined without a measurement timestamp', () => {
    const input = passingInput()
    input.measuredAt = null

    const result = evaluateS0(input)

    expect(result.state).toBe('undetermined')
    expect(result.metrics.every((metric) => metric.state === 'unmeasured')).toBe(true)
  })

  it('passes all metrics at the exact frozen thresholds', () => {
    const result = evaluateS0(passingInput())

    expect(result.state).toBe('passed')
    expect(result.metrics.every((metric) => metric.state === 'passing')).toBe(true)
    expect(result.metrics.map((metric) => metric.key)).toEqual([
      'uniqueCandidates',
      'operatingBusinesses',
      'qualifiedBuyers',
      'confirmedAImporters',
      'verifiedContacts',
      'qualifiedBuyerCost',
      'deliveryCompleteness',
      'supplierAcceptance',
      'providerAuthorization',
    ])
  })

  it.each([
    ['unique candidate count', (input: S0Input) => input.candidates.pop(), 'uniqueCandidates'],
    [
      'operating business rate',
      (input: S0Input) => {
        input.candidates[89]!.operatingVerified = false
      },
      'operatingBusinesses',
    ],
    [
      'qualified buyer rate',
      (input: S0Input) => {
        input.candidates[69]!.grade = 'C'
      },
      'qualifiedBuyers',
    ],
    [
      'confirmed A importer count',
      (input: S0Input) => {
        input.candidates[14]!.confirmedImporter = false
      },
      'confirmedAImporters',
    ],
    [
      'verified contact count',
      (input: S0Input) => {
        input.candidates[59]!.verifiedUsableContact = false
      },
      'verifiedContacts',
    ],
    [
      'qualified buyer unit cost',
      (input: S0Input) => {
        input.eligibleDataCostCny = 560.01
      },
      'qualifiedBuyerCost',
    ],
    [
      'delivery completeness',
      (input: S0Input) => {
        input.candidates[19]!.verifiedUsableContact = false
      },
      'deliveryCompleteness',
    ],
    [
      'supplier acceptance rate',
      (input: S0Input) => {
        input.supplierReviews[20]!.accepted = false
      },
      'supplierAcceptance',
    ],
    [
      'provider authorization',
      (input: S0Input) => {
        input.providerAuthorizations[0]!.writtenCommercialSaasAuthorization = false
      },
      'providerAuthorization',
    ],
  ])('fails %s immediately below its threshold once every metric is measured', (_, mutate, key) => {
    const input = passingInput()
    mutate(input)

    const result = evaluateS0(input)

    expect(result.metrics.find((metric) => metric.key === key)?.state).toBe('failing')
    expect(result.state).toBe('failed')
  })

  it('leaves cost unmeasured when there are no qualified buyers', () => {
    const input = passingInput()
    input.candidates.forEach((buyer) => {
      buyer.grade = 'C'
      buyer.relevantImporterOrWholesaler = false
    })

    const result = evaluateS0(input)

    expect(result.metrics.find((metric) => metric.key === 'qualifiedBuyerCost')).toMatchObject({
      state: 'unmeasured',
      denominator: 0,
      value: null,
    })
    expect(result.state).toBe('undetermined')
  })

  it('leaves supplier acceptance unmeasured until three suppliers each review ten records', () => {
    const input = passingInput()
    input.supplierReviews.pop()

    const result = evaluateS0(input)

    expect(result.metrics.find((metric) => metric.key === 'supplierAcceptance')).toMatchObject({
      state: 'unmeasured',
      numerator: 21,
      denominator: 29,
    })
    expect(result.state).toBe('undetermined')
  })

  it('deduplicates supplier reviews and excludes demo buyers', () => {
    const input = passingInput()
    input.supplierReviews = Array.from({ length: 30 }, (_, index) => ({
      supplierId: `supplier-${Math.floor(index / 10) + 1}`,
      buyerId: 'buyer-0',
      accepted: true,
      eligible: true,
    }))

    const repeated = evaluateS0(input)
    expect(repeated.metrics.find((metric) => metric.key === 'supplierAcceptance')?.state).toBe(
      'unmeasured',
    )

    input.candidates[0]!.isDemo = true
    input.supplierReviews = passingInput().supplierReviews.map((review) => ({
      ...review,
      buyerId: 'buyer-0',
    }))

    const demo = evaluateS0(input)
    expect(demo.metrics.find((metric) => metric.key === 'supplierAcceptance')?.state).toBe(
      'unmeasured',
    )
  })

  it('ignores an incomplete additional supplier once three supplier samples are complete', () => {
    const input = passingInput()
    input.supplierReviews.push({
      supplierId: 'supplier-4',
      buyerId: 'buyer-40',
      accepted: false,
      eligible: true,
    })

    const result = evaluateS0(input)

    expect(result.metrics.find((metric) => metric.key === 'supplierAcceptance')).toMatchObject({
      state: 'passing',
      numerator: 21,
      denominator: 30,
    })
  })

  it('leaves provider authorization unmeasured when no provider evidence exists', () => {
    const input = passingInput()
    input.providerAuthorizations = []

    const result = evaluateS0(input)

    expect(result.metrics.find((metric) => metric.key === 'providerAuthorization')?.state).toBe(
      'unmeasured',
    )
    expect(result.state).toBe('undetermined')
  })
})
