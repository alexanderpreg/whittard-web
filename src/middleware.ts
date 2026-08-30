import { NextRequest, NextResponse } from 'next/server';

const PROTECTED_ROUTES = ['/mi-cuenta', '/favoritos'];
const AUTH_COOKIE = 'whittard_customer_access_token';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isProtected = PROTECTED_ROUTES.some((route) => pathname.startsWith(route));

  if (!isProtected) return NextResponse.next();

  const token = request.cookies.get(AUTH_COOKIE)?.value;

  if (!token) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/mi-cuenta/:path*', '/favoritos/:path*'],
};
