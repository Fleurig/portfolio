import type { ReactNode } from 'react';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import { auth } from '@/src/lib/auth';
import type { AuthUser } from '@/src/lib/auth';
import { ROLE_ADMIN } from '@/src/lib/actions/auth';

// Routes under /admin that do NOT require authentication
const PUBLIC_ADMIN_PATHS = ['/admin/login', '/admin/register'];

export default async function AdminRootLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const hdrs = await headers();
  const pathname = hdrs.get('x-pathname') ?? '';

  // Allow unauthenticated access to login and register pages.
  // x-pathname is set by middleware so server layouts can inspect the route
  // without usePathname() (which is client-only) and without redirect loops.
  const isPublicAdminRoute = PUBLIC_ADMIN_PATHS.some((p) => pathname.endsWith(p));
  if (isPublicAdminRoute) {
    return <>{children}</>;
  }

  const session = await auth.api.getSession({ headers: hdrs });

  if (!session) {
    redirect(`/${locale}/admin/login`);
  }

  const user = session.user as AuthUser;

  // Must have a profileSlug assigned to manage content
  if (!user.profileSlug && user.role !== ROLE_ADMIN) {
    redirect(`/${locale}/admin/login?error=no-profile`);
  }

  return <>{children}</>;
}
