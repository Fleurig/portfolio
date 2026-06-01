import type { ReactNode } from 'react';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import { auth } from '@/src/lib/auth';
import type { AuthUser } from '@/src/lib/auth';

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

  // Allow unauthenticated access to login and register pages
  if (pathname.includes('/admin/login') || pathname.includes('/admin/register')) {
    return <>{children}</>;
  }

  const session = await auth.api.getSession({ headers: hdrs });

  if (!session) {
    redirect(`/${locale}/admin/login`);
  }

  const user = session.user as AuthUser;

  // Must have a profileSlug assigned to manage content
  if (!user.profileSlug) {
    // Admin can still access; regular users without a slug see an error
    if (user.role !== 'admin') {
      redirect(`/${locale}/admin/login?error=no-profile`);
    }
  }

  return <>{children}</>;
}
