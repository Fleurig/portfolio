import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';

import { SiteLayout } from '@/src/components/site/SiteLayout';
import { getAllProjects, getPageMdx } from '@/src/lib/content';
import { Mdx } from '@/src/components/mdx/Mdx';
import { t } from '@/src/lib/translations';
import { ButtonLink } from '@/src/components/ui/ButtonLink';
import { Chip } from '@/src/components/ui/Chip';
import { ProjectCard } from '@/src/components/site/ProjectCard';
import { ContactCta } from '@/src/components/site/ContactCta';

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
    title: tr.seo.homeTitle,
    description: tr.seo.homeDescription,
    openGraph: {
      title: tr.seo.homeTitle,
      description: tr.seo.homeDescription,
      locale,
    },
  };
}

function MetaItem({ icon, label }: { icon: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-2 text-sm text-text-muted">
      <span aria-hidden="true" className="text-base">
        {icon}
      </span>
      <span>{label}</span>
    </span>
  );
}

export default async function LocaleHomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (locale !== 'nl' && locale !== 'en') return notFound();

  const tr = t(locale);

  const mdx = await getPageMdx(locale, 'home');
  const projects = await getAllProjects(locale);
  const featured = projects.filter((p) => p.featured).slice(0, 4);

  const isNl = locale === 'nl';

  const downloadHref =
    locale === 'en' ? '/cv-fleur-albers-en.pdf' : '/cv-fleur-albers-nl.pdf';

  return (
    <SiteLayout locale={locale}>
      {/* Hero */}
      <section className="relative">
        <div
          className="glass glass--elevated rounded-3xl p-6 sm:p-10"
          aria-labelledby="home-hero-title"
        >
          <p className="text-sm font-medium text-text-muted">
            {isNl ? 'Front-end Developer · React & Next.js' : 'Front-end Developer · React & Next.js'}
          </p>

          <h1
            id="home-hero-title"
            className="mt-3 text-4xl font-semibold tracking-tight text-text sm:text-6xl"
          >
            Fleur Albers
          </h1>

          <p className="mt-4 max-w-2xl text-base leading-relaxed text-text-muted sm:text-lg">
            {isNl
              ? 'Ik bouw productieklare webapplicaties met React en Next.js — met oog voor UX, herbruikbaarheid en component-kwaliteit.'
              : 'I build production-ready web applications with React and Next.js — with a focus on UX, reusability, and component quality.'}
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <ButtonLink href={`/${locale}/projects`} variant="primary">
              {isNl ? 'Bekijk projecten' : 'View projects'}
            </ButtonLink>
            <ButtonLink href={`/${locale}/cv`} variant="secondary">
              {isNl ? 'Bekijk CV' : 'View CV'}
            </ButtonLink>
            <a
              href={downloadHref}
              className="glass glass--elevated glass-hover inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium text-text-muted transition hover:text-text"
              aria-label={isNl ? 'Download CV als PDF' : 'Download CV as PDF'}
            >
              {isNl ? 'Download CV (PDF)' : 'Download CV (PDF)'}
            </a>
          </div>

          <div
            className="mt-7 flex flex-wrap gap-2"
            aria-label={isNl ? 'Focus' : 'Focus'}
          >
            <Chip>Next.js</Chip>
            <Chip>React</Chip>
            <Chip>TypeScript</Chip>
            <Chip>{isNl ? 'Design systems' : 'Design systems'}</Chip>
            <Chip>{isNl ? 'Forms & workflows' : 'Forms & workflows'}</Chip>
          </div>

          <div
            className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2"
            aria-label={isNl ? 'Profiel' : 'Profile'}
          >
            <MetaItem icon="📍" label={tr.brand.location} />
            <span
              aria-hidden="true"
              className="text-sm text-text-muted"
            >
              |
            </span>
            <MetaItem
              icon="🚗"
              label={isNl ? 'Rijbewijs' : "Driver's license"}
            />
            <span
              aria-hidden="true"
              className="text-sm text-text-muted"
            >
              |
            </span>
            <MetaItem icon="🎂" label="26-08-1999" />
          </div>
        </div>
      </section>

      {/* About */}
      <section className="mt-14">
        <div className="glass glass--elevated rounded-3xl p-6 sm:p-10">
          <div className="grid gap-8 md:grid-cols-12">
            <div className="md:col-span-4">
              <h2 className="text-xl font-semibold tracking-tight text-text">
                {isNl ? 'Over mij' : 'About'}
              </h2>
              <p className="mt-2 text-sm text-text-muted">
                {isNl
                  ? 'Wie ik ben en wat me drijft'
                  : 'Who I am and what drives me'}
              </p>
            </div>
            <div className="md:col-span-8">
              <article className="prose max-w-none prose-p:leading-relaxed prose-p:text-text-muted prose-strong:text-text">
                <Mdx source={mdx} />
              </article>
            </div>
          </div>
        </div>
      </section>

      {/* Featured projects */}
      <section className="mt-14" aria-labelledby="home-featured">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2
              id="home-featured"
              className="text-xl font-semibold tracking-tight text-text"
            >
              {isNl ? 'Uitgelicht' : 'Featured'}
            </h2>
            <p className="mt-2 text-sm text-text-muted">
              {isNl
                ? 'Een paar projecten waar ik met plezier aan heb gebouwd.'
                : 'A few projects I enjoyed building.'}
            </p>
          </div>
          <Link
            href={`/${locale}/projects`}
            className="text-sm font-medium text-text underline underline-offset-4 hover:opacity-90"
            aria-label={isNl ? 'Bekijk alle projecten' : 'View all projects'}
          >
            {isNl ? 'Alle projecten' : 'All projects'}
          </Link>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {featured.map((p) => (
            <Link
              key={p.slug}
              href={`/${locale}/projects/${p.slug}`}
              aria-label={
                isNl ? `Bekijk project: ${p.title}` : `View project: ${p.title}`
              }
            >
              <ProjectCard project={p} locale={locale} />
            </Link>
          ))}
        </div>
      </section>

      {/* Contact CTA */}
      <ContactCta locale={locale} />
    </SiteLayout>
  );
}
