import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const locales = ['nl', 'en'] as const;
type Locale = (typeof locales)[number];

function detectLocale(pathname: string): Locale {
  for (const l of locales) {
    if (pathname === `/${l}` || pathname.startsWith(`/${l}/`)) return l;
  }
  return 'nl';
}

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

  const locale = detectLocale(pathname);
  const response = NextResponse.next();
  response.headers.set('x-locale', locale);
  return response;
}

export const config = {
  matcher: ['/:path*'],
};
