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

  return (
    <SiteLayout locale={locale} title={t('seo.projectsTitle')} backHref={`/${locale}`}>
      <header className="mb-8">
        <p className="mt-2 max-w-2xl text-text-muted">
          {t('pages.projectsIntro')}
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        {projects.map((p) => (
          <Link key={p.slug} href={`/${locale}/projects/${p.slug}`}>
            <ProjectCard project={p} />
          </Link>
        ))}
      </div>
    </SiteLayout>
  );
}
