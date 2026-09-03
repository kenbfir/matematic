import { describe, it, expect } from 'vitest'
import { getLandingVariant, isLandingPageSlug, LANDING_PAGE_SLUGS } from '@/lib/landingVariants'

describe('getLandingVariant', () => {
  it('returns complete LandingHero content for every page/variant combination', () => {
    for (const page of LANDING_PAGE_SLUGS) {
      for (const variant of ['a', 'b', 'c'] as const) {
        const content = getLandingVariant(page, variant)
        expect(content.badge).toBeTruthy()
        expect(content.headline).toBeTruthy()
        expect(content.highlightedWord).toBeTruthy()
        expect(content.subheadline).toBeTruthy()
        expect(content.bullets.length).toBeGreaterThan(0)
        expect(content.ctaText).toBeTruthy()
      }
    }
  })

  it('gives each variant on a page distinct copy (no accidental duplication)', () => {
    for (const page of LANDING_PAGE_SLUGS) {
      const a = getLandingVariant(page, 'a')
      const b = getLandingVariant(page, 'b')
      const c = getLandingVariant(page, 'c')
      expect(a.headline).not.toBe(b.headline)
      expect(a.headline).not.toBe(c.headline)
      expect(b.headline).not.toBe(c.headline)
    }
  })

  it('keeps the existing (variant A) bagrut copy unchanged', () => {
    const a = getLandingVariant('bagrut', 'a')
    expect(a.badge).toBe('100 בבגרות 5 יחידות - המורה שהיה שם')
    expect(a.ctaText).toBe('קביעת שיעור')
  })
})

describe('isLandingPageSlug', () => {
  it('accepts the 4 PPC landing page slugs', () => {
    expect(isLandingPageSlug('bagrut')).toBe(true)
    expect(isLandingPageSlug('middle-school')).toBe(true)
    expect(isLandingPageSlug('academic')).toBe(true)
    expect(isLandingPageSlug('pre-academic')).toBe(true)
  })

  it('rejects the homepage and unrelated paths', () => {
    expect(isLandingPageSlug('')).toBe(false)
    expect(isLandingPageSlug('contact')).toBe(false)
  })
})
