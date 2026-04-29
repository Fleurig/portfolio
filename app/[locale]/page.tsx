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

  return (
    <SiteLayout locale={locale}>
      {/* Hero */}
      <section className="relative">
        <div className="rounded-3xl border border-[var(--color-border)] bg-[linear-gradient(180deg,color-mix(in_oklab,var(--color-surface)_70%,transparent),transparent)] p-6 sm:p-10">
          <p className="text-sm font-medium text-[var(--color-text-muted)]">
            {isNl ? 'Front-end developer' : 'Front-end developer'}
          </p>

          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-[var(--color-text)] sm:text-5xl">
            Fleur Albers
          </h1>

          <p className="mt-4 max-w-2xl text-base leading-relaxed text-[var(--color-text-muted)] sm:text-lg">
            {isNl
              ? 'Ik bouw toegankelijke, snelle en onderhoudbare webapplicaties met React/Next.js — met oog voor UX, design en component-architectuur.'
              : 'I build accessible, fast, and maintainable web applications with React/Next.js — with a strong focus on UX, design and component architecture.'}
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <ButtonLink href={`/${locale}/projects`} variant="primary">
              {isNl ? 'Bekijk projecten' : 'View projects'}
            </ButtonLink>
            <ButtonLink href={`/${locale}/cv`} variant="secondary">
              {isNl ? 'Bekijk CV' : 'View CV'}
            </ButtonLink>
            <a
              href={
                locale === 'en'
                  ? '/cv-fleur-albers-en.pdf'
                  : '/cv-fleur-albers-nl.pdf'
              }
              className="inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium text-[var(--color-text)] hover:bg-[var(--color-surface-muted)]"
            >
              {isNl ? 'Download PDF' : 'Download PDF'}
            </a>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            <Chip>Next.js</Chip>
            <Chip>React</Chip>
            <Chip>TypeScript</Chip>
            <Chip>{isNl ? 'Design systems' : 'Design systems'}</Chip>
            <Chip>{isNl ? 'Forms & workflows' : 'Forms & workflows'}</Chip>
            <Chip>A11y & performance</Chip>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-[var(--color-text-muted)]">
            <span>
              <span className="font-medium text-[var(--color-text)]">
                {tr.brand.location}
              </span>
            </span>
            <span aria-hidden="true">•</span>
            <a
              href="https://www.linkedin.com/in/fleuralbers/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 hover:opacity-90"
            >
              LinkedIn
              <span aria-hidden="true"> ↗</span>
            </a>
            <span aria-hidden="true">•</span>
            <a
              href="mailto:fleuralbers@live.nl"
              className="underline underline-offset-4 hover:opacity-90"
            >
              fleuralbers@live.nl
            </a>
          </div>
        </div>
      </section>

      {/* MDX section (About/Intro) */}
      <section className="mt-12">
        <div className="grid gap-8 md:grid-cols-12">
          <div className="md:col-span-4">
            <h2 className="text-xl font-semibold tracking-tight text-[var(--color-text)]">
              {isNl ? 'Over mij' : 'About'}
            </h2>
            <p className="mt-2 text-sm text-[var(--color-text-muted)]">
              {isNl
                ? 'Korte intro uit MDX (makkelijk aanpasbaar).'
                : 'Short intro pulled from MDX (easy to update).'}
            </p>
          </div>
          <div className="md:col-span-8">
            <div className="space-y-4 text-[var(--color-text)]">
              <article className="prose max-w-none prose-p:leading-relaxed prose-p:text-[var(--color-text-muted)] prose-strong:text-[var(--color-text)]">
                <Mdx source={mdx} />
              </article>
            </div>
          </div>
        </div>
      </section>

      {/* Featured projects */}
      <section className="mt-12">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold tracking-tight text-[var(--color-text)]">
              {isNl ? 'Uitgelicht' : 'Featured'}
            </h2>
            <p className="mt-2 text-sm text-[var(--color-text-muted)]">
              {isNl
                ? 'Een paar projecten waar ik met plezier aan heb gebouwd.'
                : 'A few projects I enjoyed building.'}
            </p>
          </div>
          <Link
            href={`/${locale}/projects`}
            className="text-sm font-medium text-[var(--color-text)] underline underline-offset-4 hover:opacity-90"
          >
            {isNl ? 'Alle projecten' : 'All projects'}
          </Link>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {featured.map((p) => (
            <Link key={p.slug} href={`/${locale}/projects/${p.slug}`}>
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
