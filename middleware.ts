import { type NextRequest, NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['nl', 'en'],
  defaultLocale: 'nl',
});

const handleI18n = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const response = handleI18n(request) ?? NextResponse.next();
  // Forward the pathname so server layouts can inspect it without usePathname
  response.headers.set('x-pathname', request.nextUrl.pathname);
  return response;
}

export const config = {
  matcher: ['/((?!_next|api|.*\\..*).*)'],
};
