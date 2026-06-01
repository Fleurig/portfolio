import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

import { SiteLayout } from '@/src/components/site/SiteLayout';
import { getProfilePageMdx, getAllProfileProjects } from '@/src/lib/content';
import { getProfile } from '@/src/lib/profiles';
import { Mdx } from '@/src/components/mdx/Mdx';
import { ButtonLink } from '@/src/components/ui/ButtonLink';
import { Chip } from '@/src/components/ui/Chip';
import { ProjectCard } from '@/src/components/site/ProjectCard';
import { ContactCta } from '@/src/components/site/ContactCta';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  try {
    const profile = await getProfile(slug);
    return {
      title: `${profile.displayName} — Portfolio`,
      description: `Portfolio of ${profile.displayName}`,
      openGraph: { title: `${profile.displayName} — Portfolio`, locale },
    };
  } catch {
    return {};
  }
}

export default async function ProfileHomePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (locale !== 'nl' && locale !== 'en') return notFound();

  let profile;
  try {
    profile = await getProfile(slug);
  } catch {
    return notFound();
  }

  const t = await getTranslations({ locale });

  let mdx;
  try {
    mdx = await getProfilePageMdx(slug, locale, 'home');
  } catch {
    mdx = null;
  }

  const projects = await getAllProfileProjects(slug, locale);
  const featured = projects.filter((p) => p.featured).slice(0, 4);

  const base = `/${locale}/portfolio/${slug}`;

  return (
    <SiteLayout locale={locale}>
      {/* Hero */}
      <section>
        <div className="glass-panel" aria-labelledby="profile-hero-title">
          <p className="text-sm font-medium text-text-muted">{t('home.role')}</p>
          <h1
            id="profile-hero-title"
            className="mt-3 text-4xl font-semibold tracking-tight text-text sm:text-6xl"
          >
            {profile.displayName}
          </h1>
          {mdx && (
            <div className="mt-4 max-w-2xl text-base leading-relaxed text-text-muted sm:text-lg line-clamp-3">
              {/* Brief teaser from MDX frontmatter title or first paragraph */}
            </div>
          )}
          <div className="mt-6 flex flex-wrap gap-3">
            <ButtonLink href={`${base}/projects`} variant="primary">
              {t('home.viewProjects')}
            </ButtonLink>
            <ButtonLink href={`${base}/cv`} variant="secondary">
              {t('home.viewCv')}
            </ButtonLink>
          </div>
        </div>
      </section>

      {/* About */}
      {mdx && (
        <section className="mt-14">
          <div className="glass-panel">
            <div className="grid gap-8 md:grid-cols-12">
              <div className="md:col-span-4">
                <h2 className="text-xl font-semibold tracking-tight text-text">
                  {t('home.aboutTitle')}
                </h2>
              </div>
              <div className="md:col-span-8">
                <article className="prose max-w-none prose-p:leading-relaxed prose-p:text-text-muted prose-strong:text-text">
                  <Mdx source={mdx} />
                </article>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Featured projects */}
      {featured.length > 0 && (
        <section className="mt-14" aria-labelledby="profile-featured">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2
                id="profile-featured"
                className="text-xl font-semibold tracking-tight text-text"
              >
                {t('home.featuredTitle')}
              </h2>
              <p className="mt-2 text-sm text-text-muted">{t('home.featuredSubtitle')}</p>
            </div>
            <Link href={`${base}/projects`} className="text-link text-sm">
              {t('home.allProjects')}
            </Link>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
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

      <ContactCta locale={locale} />
    </SiteLayout>
  );
}
