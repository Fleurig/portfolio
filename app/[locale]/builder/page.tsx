import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';

import { SiteLayout } from '@/src/components/site/SiteLayout';
import { CvBuilder } from '@/src/components/cv/CvBuilder';

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
    title: t('builderTitle'),
    description: t('builderDescription'),
    openGraph: {
      title: t('builderTitle'),
      description: t('builderDescription'),
      locale,
    },
  };
}

export default async function BuilderPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (locale !== 'nl' && locale !== 'en') return notFound();

  const t = await getTranslations({ locale });

  return (
    <SiteLayout locale={locale}>
      <div className="no-print mb-8">
        <h1 className="text-3xl font-semibold tracking-tight text-text">
          {t('builder.title')}
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-text-muted">
          {t('builder.intro')}
        </p>
      </div>
      <CvBuilder locale={locale} />
    </SiteLayout>
  );
}
