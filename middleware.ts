import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const locales = ['nl', 'en'] as const;

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  const hasLocale = locales.some(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`),
  );

  // Default locale routing for non-prefixed URLs.
  if (!hasLocale && pathname !== '/') {
    const url = req.nextUrl.clone();
    url.pathname = `/nl${pathname}`;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/:path*'],
};
