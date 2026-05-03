import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';

import { SiteLayout } from '@/src/components/site/SiteLayout';

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
    title: t('contactTitle'),
    description: t('contactDescription'),
    openGraph: {
      title: t('contactTitle'),
      description: t('contactDescription'),
      locale,
    },
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (locale !== 'nl' && locale !== 'en') return notFound();

  const t = await getTranslations({ locale });

  return (
    <SiteLayout locale={locale} backHref={`/${locale}`}>
      {/* Hero */}
      <section>
        <div className="glass glass--elevated rounded-3xl p-8 sm:p-12">
          {/* Availability pill */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-surface-muted px-3 py-1.5 text-xs font-medium text-text-muted">
            <span
              aria-hidden="true"
              className="h-2 w-2 rounded-full bg-green-500 shadow-[0_0_6px_1px_rgba(34,197,94,0.5)]"
            />
            {t('contact.availability')}
          </div>

          <h1 className="text-3xl font-semibold tracking-tight text-text sm:text-4xl">
            {t('contact.heading')}
          </h1>
          <p className="mt-3 max-w-lg text-base leading-relaxed text-text-muted sm:text-lg">
            {t('contact.subheading')}
          </p>
          <p className="mt-1.5 text-sm text-text-muted">
            {t('contact.responseTime')}
          </p>

          {/* Contact cards */}
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {/* Email card */}
            <a
              href="mailto:fleuralbers@live.nl"
              className="glass-action-card group"
              aria-label={t('contact.emailLabel')}
            >
              <div
                className="contact-icon-primary flex h-11 w-11 items-center justify-center rounded-xl text-xl"
              >
                ✉️
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-text-muted">
                  {t('contact.emailCardTitle')}
                </p>
                <p className="mt-1 font-medium text-text">
                  fleuralbers@live.nl
                </p>
              </div>
              <div className="mt-auto flex items-center gap-1 text-xs font-medium text-text-muted transition-colors duration-200 group-hover:text-text">
                {t('contact.email')}
                <svg
                  aria-hidden="true"
                  width="12"
                  height="12"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  className="transition-transform duration-200 group-hover:translate-x-0.5"
                >
                  <path d="M6 4l4 4-4 4" />
                </svg>
              </div>
            </a>

            {/* LinkedIn card */}
            <a
              href="https://www.linkedin.com/in/fleuralbers"
              target="_blank"
              rel="noopener noreferrer"
              className="glass-action-card group"
              aria-label={t('contact.linkedInLabel')}
            >
              <div
                className="contact-icon-blue flex h-11 w-11 items-center justify-center rounded-xl text-xl"
              >
                💼
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-text-muted">
                  {t('contact.linkedInCardTitle')}
                </p>
                <p className="mt-1 font-medium text-text">
                  linkedin.com/in/fleuralbers
                </p>
              </div>
              <div className="mt-auto flex items-center gap-1 text-xs font-medium text-text-muted transition-colors duration-200 group-hover:text-text">
                LinkedIn
                <svg
                  aria-hidden="true"
                  width="11"
                  height="11"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <path d="M4 12L12 4M12 4H6M12 4v6" />
                </svg>
                <span className="sr-only">
                  ({t('a11y.externalLinkNewTab')})
                </span>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Details section */}
      <section className="mt-10">
        <div className="glass glass--elevated rounded-3xl p-8">
          <h2 className="text-lg font-semibold tracking-tight text-text">
            {t('contact.availableForTitle')}
          </h2>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {(
              [
                t('contact.availableFor1'),
                t('contact.availableFor2'),
                t('contact.availableFor3'),
                t('contact.availableFor4'),
              ] as string[]
            ).map((item) => (
              <li key={item} className="flex items-center gap-2.5 text-sm text-text-muted">
                <span
                  aria-hidden="true"
                  className="icon-bullet-primary"
                >
                  ✓
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </SiteLayout>
  );
}
