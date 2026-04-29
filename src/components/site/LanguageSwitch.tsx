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
      className="ml-1 inline-flex items-center rounded-lg border border-slate-200 bg-white px-2.5 py-2 text-xs font-medium text-slate-700 shadow-sm hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200 dark:hover:bg-slate-900"
      aria-label={tr.nav.switchLanguage}
    >
      {target.toUpperCase()}
    </Link>
  );
}
