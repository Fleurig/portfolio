import type { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import { profileContentExists } from '@/src/lib/profiles';

export default async function ProfileLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { slug } = await params;

  // Show 404 if this profile doesn't have any content yet
  if (!profileContentExists(slug)) {
    notFound();
  }

  return <>{children}</>;
}
