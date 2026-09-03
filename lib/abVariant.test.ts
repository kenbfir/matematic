import { describe, it, expect } from 'vitest'
import { resolveVariant, cookieNameFor } from '@/lib/abVariant'

describe('resolveVariant', () => {
  it('defaults to variant a with no query param and no cookie (first-time organic visit)', () => {
    expect(resolveVariant(null, null)).toEqual({ variant: 'a', shouldSetCookie: true })
  })

  it('uses the query param on a fresh visit and marks the cookie for writing', () => {
    expect(resolveVariant('b', null)).toEqual({ variant: 'b', shouldSetCookie: true })
    expect(resolveVariant('c', null)).toEqual({ variant: 'c', shouldSetCookie: true })
  })

  it('reuses an existing cookie when there is no query param', () => {
    expect(resolveVariant(null, 'b')).toEqual({ variant: 'b', shouldSetCookie: false })
  })

  it('lets the query param override an existing cookie (ad message match wins)', () => {
    expect(resolveVariant('c', 'b')).toEqual({ variant: 'c', shouldSetCookie: true })
  })

  it('does not rewrite the cookie when the query param matches it already', () => {
    expect(resolveVariant('b', 'b')).toEqual({ variant: 'b', shouldSetCookie: false })
  })

  it('ignores an invalid query param and falls back to the existing cookie', () => {
    expect(resolveVariant('z', 'c')).toEqual({ variant: 'c', shouldSetCookie: false })
  })

  it('ignores an invalid query param with no cookie and defaults to a', () => {
    expect(resolveVariant('z', null)).toEqual({ variant: 'a', shouldSetCookie: true })
  })

  it('ignores a corrupted cookie value and defaults to a', () => {
    expect(resolveVariant(null, 'not-a-variant')).toEqual({ variant: 'a', shouldSetCookie: true })
  })
})

describe('cookieNameFor', () => {
  it('namespaces the cookie per landing page so tests do not cross-contaminate', () => {
    expect(cookieNameFor('bagrut')).toBe('ab_variant_bagrut')
    expect(cookieNameFor('pre-academic')).toBe('ab_variant_pre-academic')
  })
})
