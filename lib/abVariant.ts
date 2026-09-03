import type { LandingPageSlug, Variant } from '@/lib/landingVariants'

export function cookieNameFor(page: LandingPageSlug): string {
  return `ab_variant_${page}`
}

const VALID_VARIANTS: Variant[] = ['a', 'b', 'c']

function isVariant(value: string | null | undefined): value is Variant {
  return !!value && (VALID_VARIANTS as string[]).includes(value)
}

/**
 * Decides which variant a visitor should see and whether the cookie needs
 * (re)writing. The `v` query param (set on the ad's destination URL) always
 * wins on the visit that carries it, so ad traffic keeps message match with
 * variant B/C even if an earlier visit already set a different cookie.
 * Absent a query param, an existing cookie is reused; first-time organic/SEO
 * traffic defaults to 'a'.
 */
export function resolveVariant(
  queryParam: string | null | undefined,
  existingCookie: string | null | undefined
): { variant: Variant; shouldSetCookie: boolean } {
  if (isVariant(queryParam)) {
    return { variant: queryParam, shouldSetCookie: queryParam !== existingCookie }
  }
  if (isVariant(existingCookie)) {
    return { variant: existingCookie, shouldSetCookie: false }
  }
  return { variant: 'a', shouldSetCookie: true }
}
