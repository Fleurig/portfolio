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
    <header className="no-print sticky top-0 z-40 border-b border-header-border bg-header-surface backdrop-blur-xl saturate-150 supports-backdrop-filter:bg-header-surface">
      <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/30 to-transparent pointer-events-none" aria-hidden="true" />
      <Container className="flex h-14 items-center justify-between gap-4">
        <a
          href="#content"
          className="sr-only rounded-lg px-3 py-2 text-sm font-medium text-text focus:not-sr-only"
        >
          {t('a11y.skipToContent')}
        </a>

        <Link
          href={`/${locale}`}
          className="font-semibold tracking-tight text-text hover:opacity-80 transition-opacity duration-200"
          aria-label={t('nav.home')}
        >
          {t('brand.name')}
        </Link>

        {/* Desktop nav */}
        <nav className="hidden sm:flex items-center gap-1" aria-label="Primary">
          <NavLink href={`/${locale}/cv`}>{t('nav.cv')}</NavLink>
          <NavLink href={`/${locale}/projects`}>{t('nav.projects')}</NavLink>
          <NavLink href={`/${locale}/contact`}>{t('nav.contact')}</NavLink>
          <ThemeToggle />
          <LanguageSwitch locale={locale} />
        </nav>

        {/* Mobile nav */}
        <MobileNav locale={locale} />
      </Container>
    </header>
  );
}

