import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

import { SiteLayout } from '@/src/components/site/SiteLayout';
import { getAllProfileProjects } from '@/src/lib/content';
import { getProfile } from '@/src/lib/profiles';
import { ProjectCard } from '@/src/components/site/ProjectCard';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  try {
    const profile = await getProfile(slug);
    return {
      title: `Projects — ${profile.displayName}`,
      description: `Projects by ${profile.displayName}`,
      openGraph: { locale },
    };
  } catch {
    return {};
  }
}

export default async function ProfileProjectsPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (locale !== 'nl' && locale !== 'en') return notFound();

  const t = await getTranslations({ locale });
  const projects = await getAllProfileProjects(slug, locale);
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);
  const base = `/${locale}/portfolio/${slug}`;

  return (
    <SiteLayout locale={locale} backHref={base}>
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

      {featured.length > 0 && (
        <section aria-label={t('home.featuredTitle')}>
          <h2 className="mb-4 text-xs font-semibold uppercase tracking-widest text-text-muted">
            {t('nav.featured')}
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {featured.map((p) => (
              <Link
                key={p.slug}
                href={`${base}/projects/${p.slug}`}
                aria-label={t('home.viewProjectLabel', { title: p.title })}
                className="project-link group"
              >
                <ProjectCard project={p} locale={locale} />
              </Link>
            ))}
          </div>
        </section>
      )}

      {rest.length > 0 && (
        <section
          aria-label={t('pages.projectsOtherLabel')}
          className={featured.length > 0 ? 'mt-10' : undefined}
        >
          {featured.length > 0 && (
            <h2 className="mb-4 text-xs font-semibold uppercase tracking-widest text-text-muted">
              {t('pages.projectsOther')}
            </h2>
          )}
          <div className="grid gap-4 md:grid-cols-2">
            {rest.map((p) => (
              <Link
                key={p.slug}
                href={`${base}/projects/${p.slug}`}
                aria-label={t('home.viewProjectLabel', { title: p.title })}
                className="project-link group"
              >
                <ProjectCard project={p} locale={locale} />
              </Link>
            ))}
          </div>
        </section>
      )}
    </SiteLayout>
  );
}
