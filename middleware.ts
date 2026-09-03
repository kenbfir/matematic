import { NextResponse, type NextRequest } from 'next/server'
import { isLandingPageSlug } from '@/lib/landingVariants'
import { cookieNameFor, resolveVariant } from '@/lib/abVariant'

const COOKIE_MAX_AGE = 60 * 60 * 24 * 30 // 30 days

export function middleware(request: NextRequest) {
  const slug = request.nextUrl.pathname.replace(/^\//, '')
  if (!isLandingPageSlug(slug)) return NextResponse.next()

  const cookieName = cookieNameFor(slug)
  const { variant, shouldSetCookie } = resolveVariant(
    request.nextUrl.searchParams.get('v'),
    request.cookies.get(cookieName)?.value
  )

  const response = NextResponse.next()
  if (shouldSetCookie) {
    response.cookies.set(cookieName, variant, {
      maxAge: COOKIE_MAX_AGE,
      path: `/${slug}`,
      sameSite: 'lax',
    })
  }
  return response
}

export const config = {
  matcher: ['/bagrut', '/middle-school', '/academic', '/pre-academic'],
}
