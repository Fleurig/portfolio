"use client";

import { usePathname } from 'next/navigation';
import Link from 'next/link';

import type { Locale } from '@/src/lib/i18n';
import { otherLocale } from '@/src/lib/i18n';
import { t } from '@/src/lib/translations';

export function LanguageSwitch({ locale }: { locale: Locale }) {
  const tr = t(locale);
  const pathname = usePathname();
  const target = otherLocale(locale);

  const nextPath = pathname.replace(/^\/(nl|en)(?=\/|$)/, `/${target}`);

  return (
    <Link
      href={nextPath}
      className="ml-1 inline-flex items-center rounded-lg border border-card-border bg-card-surface px-2.5 py-2 text-xs font-medium text-card-text shadow-sm hover:bg-card-surface-muted"
      aria-label={tr.nav.switchLanguage}
    >
      {target.toUpperCase()}
    </Link>
  );
}
