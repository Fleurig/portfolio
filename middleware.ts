import createMiddleware from 'next-intl/middleware';
import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['nl', 'en'],
  defaultLocale: 'nl',
});

export default createMiddleware(routing);

export const config = {
  matcher: ['/((?!_next|api|.*\\..*).*)'],
};
