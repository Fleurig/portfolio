import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';

import { SiteLayout } from '@/src/components/site/SiteLayout';
import { getPageMdx } from '@/src/lib/content';
import { Mdx } from '@/src/components/mdx/Mdx';

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
    title: t('cvTitle'),
    description: t('cvDescription'),
    openGraph: {
      title: t('cvTitle'),
      description: t('cvDescription'),
      locale,
    },
  };
}

export default async function CvPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (locale !== 'nl' && locale !== 'en') return notFound();

  const t = await getTranslations({ locale });
  const mdx = await getPageMdx(locale, 'cv');

  return (
    <SiteLayout locale={locale} title={t('seo.cvTitle')} backHref={`/${locale}`}>
      <div className="no-print mb-6 flex flex-wrap items-center gap-3">
        <a
          className="inline-flex items-center justify-center rounded-xl bg-text px-4 py-2 text-sm font-medium text-bg shadow-sm transition hover:opacity-90"
          href={
            locale === 'en'
              ? '/cv-fleur-albers-en.pdf'
              : '/cv-fleur-albers-nl.pdf'
          }
        >
          {t('pages.cvDownload')}
        </a>
        <p className="text-sm text-text-muted">{t('pages.cvTip')}</p>
      </div>

      <article className="prose max-w-none print:prose-sm">
        <Mdx source={mdx} />
      </article>
    </SiteLayout>
  );
}
