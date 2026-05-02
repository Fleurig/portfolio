import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

import { SiteLayout } from '@/src/components/site/SiteLayout';
import { getAllProjects } from '@/src/lib/content';
import { ProjectCard } from '@/src/components/site/ProjectCard';

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
    title: t('projectsTitle'),
    description: t('projectsDescription'),
    openGraph: {
      title: t('projectsTitle'),
      description: t('projectsDescription'),
      locale,
    },
  };
}

export default async function ProjectsIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (locale !== 'nl' && locale !== 'en') return notFound();

  const t = await getTranslations({ locale });
  const projects = await getAllProjects(locale);
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <SiteLayout locale={locale} backHref={`/${locale}`}>
      {/* Page header */}
      <div className="mb-10">
        <h1 className="text-3xl font-semibold tracking-tight text-text sm:text-4xl">
          {t('seo.projectsTitle')}
        </h1>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-text-muted">
          {t('pages.projectsIntro')}
        </p>

        <div className="mt-3 flex items-center gap-2">
          <span className="text-xs font-medium text-text-muted">
            {projects.length}&nbsp;{t('pages.projectsWord')}
          </span>
        </div>
      </div>

      {/* Featured */}
      {featured.length > 0 ? (
        <section aria-label={t('home.featuredTitle')}>
          <h2 className="mb-4 text-xs font-semibold uppercase tracking-widest text-text-muted">
            {t('nav.featured')}
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {featured.map((p) => (
              <Link
                key={p.slug}
                href={`/${locale}/projects/${p.slug}`}
                aria-label={t('home.viewProjectLabel', { title: p.title })}
                className="project-link group"
              >
                <ProjectCard project={p} />
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      {/* Remaining projects */}
      {rest.length > 0 ? (
        <section
          aria-label={t('pages.projectsOtherLabel')}
          className={featured.length > 0 ? 'mt-10' : undefined}
        >
          {featured.length > 0 ? (
            <h2 className="mb-4 text-xs font-semibold uppercase tracking-widest text-text-muted">
              {t('pages.projectsOther')}
            </h2>
          ) : null}
          <div className="grid gap-4 md:grid-cols-2">
            {rest.map((p) => (
              <Link
                key={p.slug}
                href={`/${locale}/projects/${p.slug}`}
                aria-label={t('home.viewProjectLabel', { title: p.title })}
                className="project-link group"
              >
                <ProjectCard project={p} />
              </Link>
            ))}
          </div>
        </section>
      ) : null}
    </SiteLayout>
  );
}
