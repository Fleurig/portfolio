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
  // Forward the request pathname as a response header so server-side layouts
  // can inspect the current route without using the client-only usePathname()
  // hook. The admin layout uses this to exempt /admin/login and /admin/register
  // from the authentication guard, preventing a redirect loop.
  //
  // The pathname is already normalised by Next.js's URL parser (no query string,
  // no fragment) and we only read it in the admin layout — but we restrict it to
  // admin routes here so it is never propagated for unrelated requests.
  if (request.nextUrl.pathname.includes('/admin')) {
    response.headers.set('x-pathname', request.nextUrl.pathname);
  }
  return response;
}

export const config = {
  matcher: ['/((?!_next|api|.*\\..*).*)'],
};
