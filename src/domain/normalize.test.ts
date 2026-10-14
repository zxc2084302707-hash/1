import { describe, expect, it } from 'vitest'
import {
  deterministicDuplicateKeys,
  normalizeCompanyName,
  normalizeDomain,
  normalizePhone,
} from './normalize'

describe('buyer identity normalization', () => {
  it('normalizes company-name case, punctuation, and whitespace without creating an identity key', () => {
    expect(normalizeCompanyName('  Lagos Trading,  LTD. ')).toBe('lagos trading ltd')
    expect(deterministicDuplicateKeys({ companyName: 'Lagos Trading Ltd' })).toEqual([])
  })

  it('normalizes URL hosts and drops paths and www', () => {
    expect(normalizeDomain('HTTPS://WWW.Example.COM/catalog?kettle=1')).toBe('example.com')
    expect(normalizeDomain('example.com/about')).toBe('example.com')
    expect(normalizeDomain('not a domain')).toBeNull()
  })

  it('normalizes Nigerian local and international phone formats', () => {
    expect(normalizePhone('0803 123 4567')).toBe('+2348031234567')
    expect(normalizePhone('+234 (803) 123-4567')).toBe('+2348031234567')
    expect(normalizePhone('123')).toBeNull()
  })

  it('produces equivalent keys for equivalent verified identifiers', () => {
    const first = deterministicDuplicateKeys({
      registrationNumber: 'RC 123-456',
      verifiedDomain: 'https://www.example.com/products',
      verifiedPhone: '0803 123 4567',
      verifiedAddress: '12 Broad Street, Lagos.',
    })
    const second = deterministicDuplicateKeys({
      registrationNumber: 'rc123456',
      verifiedDomain: 'example.com',
      verifiedPhone: '+2348031234567',
      verifiedAddress: '12 BROAD STREET LAGOS',
    })

    expect(first).toEqual(second)
    expect(first).toEqual([
      'registration:rc123456',
      'domain:example.com',
      'phone:+2348031234567',
      'address:12 broad street lagos',
    ])
  })

  it('ignores invalid or unverified identifiers', () => {
    expect(
      deterministicDuplicateKeys({
        companyName: 'Example Importer',
        verifiedDomain: 'bad domain',
        verifiedPhone: '555',
        verifiedAddress: 'Lagos',
      }),
    ).toEqual([])
  })
})
