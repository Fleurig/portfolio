import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';

import { SiteLayout } from '@/src/components/site/SiteLayout';
import { getProfileProjectMdx } from '@/src/lib/content';
import { Mdx } from '@/src/components/mdx/Mdx';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string; project: string }>;
}): Promise<Metadata> {
  const { locale, slug, project } = await params;
  try {
    const { frontmatter } = await getProfileProjectMdx(slug, locale, project);
    return {
      title: `${frontmatter.title} — Projects`,
      openGraph: { locale },
    };
  } catch {
    return {};
  }
}

export default async function ProfileProjectPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string; project: string }>;
}) {
  const { locale, slug, project } = await params;
  if (locale !== 'nl' && locale !== 'en') return notFound();

  const t = await getTranslations({ locale });
  const base = `/${locale}/portfolio/${slug}`;

  let mdx;
  try {
    mdx = await getProfileProjectMdx(slug, locale, project);
  } catch {
    return notFound();
  }

  const { frontmatter } = mdx;

  return (
    <SiteLayout locale={locale} backHref={`${base}/projects`}>
      {/* Project header */}
      <header className="mb-10">
        <div className="mb-3 flex flex-wrap gap-2">
          {frontmatter.tags?.map((tag: string) => (
            <span
              key={tag}
              className="inline-flex items-center rounded-full bg-surface px-2.5 py-0.5 text-xs font-medium text-text-muted ring-1 ring-inset ring-border"
            >
              {tag}
            </span>
          ))}
        </div>
        <h1 className="text-3xl font-semibold tracking-tight text-text sm:text-4xl">
          {frontmatter.title}
        </h1>
        {(frontmatter.company || frontmatter.period) && (
          <p className="mt-3 text-sm text-text-muted">
            {frontmatter.company && (
              <span className="font-medium">{frontmatter.company}</span>
            )}
            {frontmatter.company && frontmatter.period && <span> · </span>}
            {frontmatter.period && <span>{frontmatter.period}</span>}
          </p>
        )}
      </header>

      <article className="prose max-w-none">
        <Mdx source={mdx} />
      </article>

      <footer className="no-print mt-12 border-t border-border pt-6 text-sm text-text-muted">
        <a href={`${base}/projects`} className="text-link">
          ← {t('pages.backToProjects')}
        </a>
      </footer>
    </SiteLayout>
  );
}
