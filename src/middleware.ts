import { NextRequest, NextResponse } from 'next/server'
import { getUrl } from './lib/get-url'

export function middleware(request: NextRequest) {
  const token =
    request.cookies.get('authjs.session-token') ||
    request.cookies.get('__Secure-authjs.session-token')
  const pathname = request.nextUrl.pathname

  if (
    (pathname === '/magic-link' ||
      pathname === '/login' ||
      pathname === '/register') &&
    token
  ) {
    return NextResponse.redirect(new URL(getUrl('/app')))
  }

  if (pathname.includes('/app') && !token) {
    return NextResponse.redirect(new URL(getUrl('/login')))
  }
}

export const config = {
  matcher: ['/app/:path*', '/login', '/register', '/magic-link'],
}
