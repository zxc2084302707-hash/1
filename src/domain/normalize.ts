export interface BuyerIdentity {
  companyName?: string | null
  registrationNumber?: string | null
  verifiedDomain?: string | null
  verifiedPhone?: string | null
  verifiedAddress?: string | null
}

function normalizeWords(value: string) {
  return value
    .normalize('NFKC')
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, ' ')
    .trim()
    .replace(/\s+/g, ' ')
}

export function normalizeCompanyName(value: string): string {
  return normalizeWords(value)
}

export function normalizeDomain(value: string): string | null {
  const trimmed = value.trim()
  if (!trimmed) return null

  try {
    const url = new URL(trimmed.includes('://') ? trimmed : `https://${trimmed}`)
    const hostname = url.hostname.toLowerCase().replace(/^www\./, '').replace(/\.$/, '')
    if (!hostname.includes('.') || hostname.split('.').some((part) => !part)) return null
    return hostname
  } catch {
    return null
  }
}

export function normalizePhone(value: string): string | null {
  const digits = value.replace(/\D/g, '')
  if (digits.length === 11 && digits.startsWith('0')) return `+234${digits.slice(1)}`
  if (digits.length === 13 && digits.startsWith('234')) return `+${digits}`
  if (value.trim().startsWith('+') && digits.length >= 8 && digits.length <= 15) return `+${digits}`
  return null
}

function normalizeRegistration(value: string): string | null {
  const normalized = value.normalize('NFKC').toLowerCase().replace(/[^a-z0-9]/g, '')
  return normalized.length >= 5 ? normalized : null
}

function normalizeAddress(value: string): string | null {
  const normalized = normalizeWords(value)
  return normalized.length >= 10 && /\d/.test(normalized) ? normalized : null
}

export function deterministicDuplicateKeys(identity: BuyerIdentity): string[] {
  const keys: string[] = []
  const registration = identity.registrationNumber
    ? normalizeRegistration(identity.registrationNumber)
    : null
  const domain = identity.verifiedDomain ? normalizeDomain(identity.verifiedDomain) : null
  const phone = identity.verifiedPhone ? normalizePhone(identity.verifiedPhone) : null
  const address = identity.verifiedAddress ? normalizeAddress(identity.verifiedAddress) : null

  if (registration) keys.push(`registration:${registration}`)
  if (domain) keys.push(`domain:${domain}`)
  if (phone) keys.push(`phone:${phone}`)
  if (address) keys.push(`address:${address}`)

  return keys
}
