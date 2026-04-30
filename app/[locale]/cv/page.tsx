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
  const pdfHref =
    locale === 'en' ? '/cv-fleur-albers-en.pdf' : '/cv-fleur-albers-nl.pdf';

  return (
    <SiteLayout locale={locale} title={t('seo.cvTitle')} backHref={`/${locale}`}>
      {/* Download / print toolbar */}
      <div className="no-print mb-8 glass glass--elevated rounded-2xl p-4 sm:p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-text-muted">{t('pages.cvTip')}</p>
          <a
            href={pdfHref}
            download
            className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-text px-4 py-2 text-sm font-semibold text-bg shadow-sm transition-opacity duration-200 hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus cursor-pointer"
          >
            {/* Download arrow icon */}
            <svg
              aria-hidden="true"
              width="14"
              height="14"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M8 2v8M4 7l4 4 4-4M2 13h12" />
            </svg>
            {t('pages.cvDownload')}
          </a>
        </div>
      </div>

      <article className="prose max-w-none print:prose-sm">
        <Mdx source={mdx} />
      </article>
    </SiteLayout>
  );
}
