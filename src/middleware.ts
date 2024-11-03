import { NextRequest, NextResponse } from 'next/server'
import { getUrl } from './lib/get-url'

export async function middleware(request: NextRequest) {
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

  if (pathname.includes('/app/admin')) {
    try {
      const response = await fetch(`${getUrl('/api/auth/session')}`, {
        headers: {
          cookie: request.headers.get('cookie') || '',
        },
      })
      
      const { user } = await response.json()
      
      if (user?.role !== 'ADMIN') {
        return NextResponse.redirect(new URL(getUrl('/app/unauthorized')))
      }

    } catch (error) {
      return NextResponse.redirect(new URL(getUrl('/app')))
    }
  }
}

export const config = {
  matcher: ['/app/:path*', '/login', '/register', '/magic-link'],
}
