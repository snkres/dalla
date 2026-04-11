import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const AUTH_SESSION_COOKIE = 'dalla_session'

const PUBLIC_PATHS = [
  '/login',
  '/signup',
  '/forgot-password',
  '/reset-password',
  '/verify',
  '/onboard',
]

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  const isPublicPath = PUBLIC_PATHS.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`),
  )

  if (isPublicPath) {
    return NextResponse.next()
  }

  const sessionCookie = request.cookies.get(AUTH_SESSION_COOKIE)

  if (!sessionCookie?.value) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

// Match all routes except Next.js internals and static files
const MIDDLEWARE_MATCHER =
  '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'

export const config = {
  matcher: [MIDDLEWARE_MATCHER],
}
