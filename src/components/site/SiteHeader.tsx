import Link from 'next/link';

import { Container } from '@/src/components/ui/Container';
import { LanguageSwitch } from '@/src/components/site/LanguageSwitch';
import type { Locale } from '@/src/lib/i18n';
import { t } from '@/src/lib/translations';
import { ThemeToggle } from '@/src/components/site/ThemeToggle';

export function SiteHeader({ locale }: { locale: Locale }) {
  const tr = t(locale);

  return (
    <header className="no-print sticky top-0 z-40 border-b border-[var(--color-header-border)] bg-[var(--color-header-surface)] backdrop-blur supports-[backdrop-filter]:bg-[var(--color-header-surface)]">
      <Container className="flex h-14 items-center justify-between gap-4">
        <a
          href="#content"
          className="sr-only rounded-lg px-3 py-2 text-sm font-medium text-[var(--color-text)] focus:not-sr-only"
        >
          {tr.a11y.skipToContent}
        </a>

        <Link
          href={`/${locale}`}
          className="font-semibold tracking-tight text-[var(--color-text)]"
        >
          {tr.brand.name}
        </Link>

        <nav className="flex items-center gap-1" aria-label="Primary">
          <Link
            className="rounded-lg px-3 py-2 text-sm text-[var(--color-text-muted)] hover:bg-[var(--color-surface-muted)]"
            href={`/${locale}/cv`}
          >
            {tr.nav.cv}
          </Link>
          <Link
            className="rounded-lg px-3 py-2 text-sm text-[var(--color-text-muted)] hover:bg-[var(--color-surface-muted)]"
            href={`/${locale}/projects`}
          >
            {tr.nav.projects}
          </Link>
          <Link
            className="rounded-lg px-3 py-2 text-sm text-[var(--color-text-muted)] hover:bg-[var(--color-surface-muted)]"
            href={`/${locale}/contact`}
          >
            {tr.nav.contact}
          </Link>

          <ThemeToggle locale={locale} />
          <LanguageSwitch locale={locale} />
        </nav>
      </Container>
    </header>
  );
}
