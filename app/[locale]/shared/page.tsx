import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';

import { SiteLayout } from '@/src/components/site/SiteLayout';
import { SharedCvViewer } from '@/src/components/cv/SharedCvViewer';

export const dynamic = 'force-static';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (locale !== 'nl' && locale !== 'en') return {};
  const t = await getTranslations({ locale, namespace: 'seo' });

  return {
    title: t('sharedTitle'),
    description: t('sharedDescription'),
    // A shared CV is personal content that should never be indexed.
    robots: { index: false, follow: false },
  };
}

export default async function SharedCvPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (locale !== 'nl' && locale !== 'en') return notFound();

  return (
    <SiteLayout locale={locale}>
      <SharedCvViewer locale={locale} />
    </SiteLayout>
  );
}
