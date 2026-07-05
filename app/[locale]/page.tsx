import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';

import { SiteLayout } from '@/src/components/site/SiteLayout';
import { ButtonLink } from '@/src/components/ui/ButtonLink';
import { Chip } from '@/src/components/ui/Chip';

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

const FEATURES = [
  { key: 'customize', icon: '🎨' },
  { key: 'privacy', icon: '🔒' },
  { key: 'share', icon: '🔗' },
  { key: 'free', icon: '🌱' },
] as const;

const STEPS = ['step1', 'step2', 'step3'] as const;

export default async function LandingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (locale !== 'nl' && locale !== 'en') return notFound();

  const t = await getTranslations({ locale });

  return (
    <SiteLayout locale={locale}>
      {/* Hero */}
      <section className="relative" aria-labelledby="landing-hero-title">
        <div className="glass-panel">
          <p className="text-sm font-medium text-text-muted">{t('landing.eyebrow')}</p>

          <h1
            id="landing-hero-title"
            className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight text-text sm:text-6xl"
          >
            {t('landing.heroTitle')}
          </h1>

          <p className="mt-4 max-w-2xl text-base leading-relaxed text-text-muted sm:text-lg">
            {t('landing.heroTagline')}
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <ButtonLink href={`/${locale}/builder`} variant="primary">
              {t('landing.ctaStart')}
            </ButtonLink>
            <ButtonLink href="#how-it-works" variant="secondary">
              {t('landing.ctaHow')}
            </ButtonLink>
          </div>

          <div className="mt-7 flex flex-wrap gap-2">
            {FEATURES.map(({ key }) => (
              <Chip key={key}>{t(`landing.features.${key}.title`)}</Chip>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mt-14" aria-labelledby="landing-features-title">
        <h2
          id="landing-features-title"
          className="text-xl font-semibold tracking-tight text-text"
        >
          {t('landing.featuresTitle')}
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {FEATURES.map(({ key, icon }) => (
            <div key={key} className="glass-card rounded-2xl p-6">
              <span aria-hidden="true" className="text-2xl">
                {icon}
              </span>
              <h3 className="mt-3 text-base font-semibold text-text">
                {t(`landing.features.${key}.title`)}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-text-muted">
                {t(`landing.features.${key}.body`)}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="mt-14" aria-labelledby="landing-how-title">
        <div className="glass-panel">
          <h2 id="landing-how-title" className="text-xl font-semibold tracking-tight text-text">
            {t('landing.howTitle')}
          </h2>
          <ol className="mt-6 grid gap-6 sm:grid-cols-3">
            {STEPS.map((step, index) => (
              <li key={step}>
                <span
                  aria-hidden="true"
                  className="icon-bullet-primary h-8 w-8 text-sm font-semibold"
                >
                  {index + 1}
                </span>
                <h3 className="mt-3 text-base font-semibold text-text">
                  {t(`landing.${step}Title`)}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-text-muted">
                  {t(`landing.${step}Body`)}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Final CTA */}
      <section className="mt-14" aria-labelledby="landing-cta-title">
        <div className="glass-panel text-center">
          <h2
            id="landing-cta-title"
            className="text-2xl font-semibold tracking-tight text-text sm:text-3xl"
          >
            {t('landing.ctaFinalTitle')}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-text-muted sm:text-base">
            {t('landing.ctaFinalBody')}
          </p>
          <div className="mt-6 flex justify-center">
            <ButtonLink href={`/${locale}/builder`} variant="primary">
              {t('landing.ctaStart')}
            </ButtonLink>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
