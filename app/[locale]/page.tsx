import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

import { SiteLayout } from '@/src/components/site/SiteLayout';
import { getAllProjects, getPageMdx } from '@/src/lib/content';
import { Mdx } from '@/src/components/mdx/Mdx';
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
  const t = await getTranslations({ locale, namespace: 'seo' });

  return {
    title: t('homeTitle'),
    description: t('homeDescription'),
    openGraph: {
      title: t('homeTitle'),
      description: t('homeDescription'),
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

  const t = await getTranslations({ locale });
  const mdx = await getPageMdx(locale, 'home');
  const projects = await getAllProjects(locale);
  const featured = projects.filter((p) => p.featured).slice(0, 4);

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
            {t('home.role')}
          </p>

          <h1
            id="home-hero-title"
            className="mt-3 text-4xl font-semibold tracking-tight text-text sm:text-6xl"
          >
            {t('brand.name')}
          </h1>

          <p className="mt-4 max-w-2xl text-base leading-relaxed text-text-muted sm:text-lg">
            {t('home.tagline')}
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <ButtonLink href={`/${locale}/projects`} variant="primary">
              {t('home.viewProjects')}
            </ButtonLink>
            <ButtonLink href={`/${locale}/cv`} variant="secondary">
              {t('home.viewCv')}
            </ButtonLink>
            <a
              href={downloadHref}
              className="glass glass--elevated glass-hover inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium text-text-muted transition hover:text-text"
              aria-label={t('home.downloadCvLabel')}
            >
              {t('home.downloadCv')}
            </a>
          </div>

          <div
            className="mt-7 flex flex-wrap gap-2"
            aria-label={t('home.focusLabel')}
          >
            <Chip>Next.js</Chip>
            <Chip>React</Chip>
            <Chip>TypeScript</Chip>
            <Chip>Design systems</Chip>
            <Chip>Forms &amp; workflows</Chip>
          </div>

          <div
            className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2"
            aria-label={t('home.profileLabel')}
          >
            <MetaItem icon="📍" label={t('brand.location')} />
            <span aria-hidden="true" className="text-sm text-text-muted">|</span>
            <MetaItem icon="🚗" label={t('home.driversLicense')} />
            <span aria-hidden="true" className="text-sm text-text-muted">|</span>
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
                {t('home.aboutTitle')}
              </h2>
              <p className="mt-2 text-sm text-text-muted">
                {t('home.aboutSubtitle')}
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
              {t('home.featuredTitle')}
            </h2>
            <p className="mt-2 text-sm text-text-muted">
              {t('home.featuredSubtitle')}
            </p>
          </div>
          <Link
            href={`/${locale}/projects`}
            className="text-sm font-medium text-text underline underline-offset-4 hover:opacity-90"
            aria-label={t('home.allProjectsLabel')}
          >
            {t('home.allProjects')}
          </Link>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {featured.map((p) => (
            <Link
              key={p.slug}
              href={`/${locale}/projects/${p.slug}`}
              aria-label={t('home.viewProjectLabel', { title: p.title })}
              className="group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-bg rounded-2xl"
            >
              <ProjectCard project={p} />
            </Link>
          ))}
        </div>
      </section>

      {/* Contact CTA */}
      <ContactCta />
    </SiteLayout>
  );
}

