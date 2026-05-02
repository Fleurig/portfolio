import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';

import { SiteLayout } from '@/src/components/site/SiteLayout';
import { getProjectSlugs, getProjectMdx } from '@/src/lib/content';
import { Mdx } from '@/src/components/mdx/Mdx';
import { Badge } from '@/src/components/ui/Badge';
import { ProjectImageGallery } from '@/src/components/site/ProjectImageGallery';

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
  const { title, company, period, url, tags, images } = mdx.frontmatter;

  return (
    <SiteLayout
      locale={locale}
      title={title}
      backHref={`/${locale}/projects`}
    >
      {/* Frontmatter metadata card */}
      <div className="not-prose mb-8 glass glass--elevated rounded-2xl p-5 sm:p-6">
        <div className="flex flex-wrap gap-x-8 gap-y-3">
          {company ? (
            <div>
              <dt className="text-[10px] font-semibold uppercase tracking-widest text-text-muted">
                {t('pages.projectCompany')}
              </dt>
              <dd className="mt-0.5 text-sm font-medium text-text">{company}</dd>
            </div>
          ) : null}
          {period ? (
            <div>
              <dt className="text-[10px] font-semibold uppercase tracking-widest text-text-muted">
                {t('pages.projectPeriod')}
              </dt>
              <dd className="mt-0.5 text-sm font-medium text-text">{period}</dd>
            </div>
          ) : null}
          {url ? (
            <div>
              <dt className="text-[10px] font-semibold uppercase tracking-widest text-text-muted">
                {t('pages.projectWebsite')}
              </dt>
              <dd className="mt-0.5">
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm font-medium text-text underline decoration-primary/40 underline-offset-4 hover:opacity-80 cursor-pointer"
                >
                  {url.replace(/^https?:\/\//, '')}
                  <span aria-hidden="true" className="text-xs text-text-muted">↗</span>
                  <span className="sr-only">({t('a11y.externalLinkNewTab')})</span>
                </a>
              </dd>
            </div>
          ) : null}
        </div>

        {tags?.length ? (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <Badge key={tag}>{tag}</Badge>
            ))}
          </div>
        ) : null}
      </div>

      <article className="prose max-w-none">
        <Mdx source={mdx} />
      </article>

      {images?.length ? (
        <ProjectImageGallery images={images} />
      ) : null}
    </SiteLayout>
  );
}
