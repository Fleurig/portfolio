import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';

import { SiteLayout } from '@/src/components/site/SiteLayout';
import { getProjectSlugs, getProjectMdx } from '@/src/lib/content';
import { Mdx } from '@/src/components/mdx/Mdx';

export const dynamic = 'force-static';

export async function generateStaticParams() {
  const nl = await getProjectSlugs('nl');
  const en = await getProjectSlugs('en');

  return [
    ...nl.map((slug) => ({ locale: 'nl', slug })),
    ...en.map((slug) => ({ locale: 'en', slug })),
  ];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (locale !== 'nl' && locale !== 'en') return {};
  const t = await getTranslations({ locale, namespace: 'seo' });

  const mdx = await getProjectMdx(locale, slug);
  const title = mdx.frontmatter.title ?? t('projectsTitle');

  return {
    title,
    description: t('projectsDescription'),
    openGraph: {
      title,
      description: t('projectsDescription'),
      locale,
    },
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (locale !== 'nl' && locale !== 'en') return notFound();

  const t = await getTranslations({ locale });
  const mdx = await getProjectMdx(locale, slug);
  const title = mdx.frontmatter.title;

  return (
    <SiteLayout
      locale={locale}
      title={title}
      backHref={`/${locale}/projects`}
    >
      {mdx.frontmatter.url ? (
        <div className="not-prose mb-8">
          <a
            href={mdx.frontmatter.url}
            target="_blank"
            rel="noopener noreferrer"
            className="glass glass--elevated glass-hover inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
          >
            <span
              aria-hidden="true"
              className="flex h-6 w-6 items-center justify-center rounded-full text-xs"
              style={{ background: 'rgba(124,58,237,0.12)' }}
            >
              ↗
            </span>
            {t('pages.projectWebsite')}
            <span className="sr-only">({t('a11y.externalLinkNewTab')})</span>
          </a>
        </div>
      ) : null}

      <article className="prose max-w-none">
        <Mdx source={mdx} />
      </article>
    </SiteLayout>
  );
}
