import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { SiteLayout } from '@/src/components/site/SiteLayout';
import { getProjectSlugs, getProjectMdx } from '@/src/lib/content';
import { Mdx } from '@/src/components/mdx/Mdx';
import { t } from '@/src/lib/translations';

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
  const tr = t(locale);

  const mdx = await getProjectMdx(locale, slug);
  const title = mdx.frontmatter.title ?? tr.seo.projectsTitle;

  return {
    title,
    description: tr.seo.projectsDescription,
    openGraph: {
      title,
      description: tr.seo.projectsDescription,
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

  const tr = t(locale);
  const mdx = await getProjectMdx(locale, slug);
  const title = mdx.frontmatter.title;

  return (
    <SiteLayout
      locale={locale}
      title={title}
      backHref={`/${locale}/projects`}
    >
      {mdx.frontmatter.url ? (
        <div className="not-prose mb-6">
          <a
            href={mdx.frontmatter.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface px-4 py-2 text-sm font-medium text-text shadow-sm hover:bg-surface-muted"
          >
            {tr.pages.projectWebsite}
            <span className="text-xs text-text-muted" aria-hidden="true">
              ↗
            </span>
            <span className="sr-only">({tr.a11y.externalLinkNewTab})</span>
          </a>
        </div>
      ) : null}

      <article className="prose max-w-none">
        <Mdx source={mdx} />
      </article>
    </SiteLayout>
  );
}
