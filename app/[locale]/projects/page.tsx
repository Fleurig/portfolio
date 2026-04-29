import { notFound } from 'next/navigation';
import Link from 'next/link';
import { SiteLayout } from '@/src/components/site/SiteLayout';
import { getAllProjects } from '@/src/lib/content';
import { ProjectCard } from '@/src/components/site/ProjectCard';
import { t } from '@/src/lib/translations';

export const dynamic = 'force-static';

export default async function ProjectsIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (locale !== 'nl' && locale !== 'en') return notFound();

  const tr = t(locale);
  const projects = await getAllProjects(locale);

  return (
    <SiteLayout locale={locale}>
      <header className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
          {tr.pages.projectsTitle}
        </h1>
        <p className="mt-2 max-w-2xl text-slate-600 dark:text-slate-300">
          {tr.pages.projectsIntro}
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
