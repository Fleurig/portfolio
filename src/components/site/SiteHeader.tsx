import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { Container } from '@/src/components/ui/Container';
import { LanguageSwitch } from '@/src/components/site/LanguageSwitch';
import type { Locale } from '@/src/lib/i18n';
import { ThemeToggle } from '@/src/components/site/ThemeToggle';
import { NavLink } from '@/src/components/site/NavLink';
import { MobileNav } from '@/src/components/site/MobileNav';

export function SiteHeader({ locale }: { locale: Locale }) {
  const t = useTranslations();

  return (
    <header className="no-print sticky top-0 z-40 glass-header">
      {/* Specular top-edge highlight */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{ background: 'linear-gradient(to right, transparent 10%, rgba(255,255,255,0.55) 50%, transparent 90%)' }}
        aria-hidden="true"
      />

      <Container className="flex h-14 items-center justify-between gap-4">
        <a
          href="#content"
          className="sr-only rounded-lg px-3 py-2 text-sm font-medium text-text focus:not-sr-only"
        >
          {t('a11y.skipToContent')}
        </a>

        <Link
          href={`/${locale}`}
          className="text-[15px] font-semibold tracking-tight text-text transition-opacity duration-200 hover:opacity-60"
          aria-label={t('nav.home')}
        >
          {t('brand.name')}
        </Link>

        {/* Desktop nav */}
        <nav className="hidden sm:flex items-center gap-0.5" aria-label="Primary">
          <NavLink href={`/${locale}/cv`}>{t('nav.cv')}</NavLink>
          <NavLink href={`/${locale}/projects`}>{t('nav.projects')}</NavLink>
          <NavLink href={`/${locale}/contact`}>{t('nav.contact')}</NavLink>

          <span className="mx-2 h-4 w-px bg-border opacity-60" aria-hidden="true" />

          <ThemeToggle compact />
          <LanguageSwitch locale={locale} />
        </nav>

        {/* Mobile nav */}
        <MobileNav locale={locale} />
      </Container>
    </header>
  );
}

