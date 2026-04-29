import Link from 'next/link';

import { Container } from '@/src/components/ui/Container';
import { LanguageSwitch } from '@/src/components/site/LanguageSwitch';
import type { Locale } from '@/src/lib/i18n';
import { t } from '@/src/lib/translations';
import { ThemeToggle } from '@/src/components/site/ThemeToggle';

export function SiteHeader({ locale }: { locale: Locale }) {
  const tr = t(locale);

  return (
    <header className="no-print sticky top-0 z-40 border-b border-slate-200/60 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:border-slate-800/60 dark:bg-slate-950/40">
      <Container className="flex h-14 items-center justify-between gap-4">
        <a
          href="#content"
          className="sr-only rounded-lg px-3 py-2 text-sm font-medium text-slate-900 focus:not-sr-only focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 dark:text-slate-100"
        >
          {tr.a11y.skipToContent}
        </a>

        <Link
          href={`/${locale}`}
          className="font-semibold tracking-tight text-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 dark:text-slate-100"
        >
          {tr.brand.name}
        </Link>

        <nav className="flex items-center gap-1" aria-label="Primary">
          <Link
            className="rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 dark:text-slate-200 dark:hover:bg-slate-900"
            href={`/${locale}/cv`}
          >
            {tr.nav.cv}
          </Link>
          <Link
            className="rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 dark:text-slate-200 dark:hover:bg-slate-900"
            href={`/${locale}/projects`}
          >
            {tr.nav.projects}
          </Link>
          <Link
            className="rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 dark:text-slate-200 dark:hover:bg-slate-900"
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
