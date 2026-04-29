import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const locales = ["nl", "en"] as const;

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Ignore next internals and public files.
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // If the pathname already includes a locale, continue.
  const hasLocale = locales.some(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`)
  );

  if (!hasLocale && pathname !== "/") {
    const url = req.nextUrl.clone();
    url.pathname = `/nl${pathname}`;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/:path*"],
};
