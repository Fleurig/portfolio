import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { SiteLayout } from '@/src/components/site/SiteLayout';
import { getPageMdx } from '@/src/lib/content';
import { Mdx } from '@/src/components/mdx/Mdx';
import { t } from '@/src/lib/translations';

export const dynamic = 'force-static';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (locale !== 'nl' && locale !== 'en') return {};
  const tr = t(locale);

  return {
    title: tr.seo.cvTitle,
    description: tr.seo.cvDescription,
    openGraph: {
      title: tr.seo.cvTitle,
      description: tr.seo.cvDescription,
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

  const tr = t(locale);
  const mdx = await getPageMdx(locale, 'cv');

  return (
    <SiteLayout locale={locale}>
      <div className="no-print mb-6 flex flex-wrap items-center gap-3">
        <a
          className="inline-flex items-center justify-center rounded-xl bg-[var(--color-text)] px-4 py-2 text-sm font-medium text-[var(--color-bg)] shadow-sm transition hover:opacity-90"
          href={
            locale === 'en'
              ? '/cv-fleur-albers-en.pdf'
              : '/cv-fleur-albers-nl.pdf'
          }
        >
          {tr.pages.cvDownload}
        </a>
        <p className="text-sm text-[var(--color-text-muted)]">{tr.pages.cvTip}</p>
      </div>

      <article className="prose max-w-none print:prose-sm">
        <Mdx source={mdx} />
      </article>
    </SiteLayout>
  );
}
