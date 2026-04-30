"use client";

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

import type { Locale } from '@/src/lib/i18n';
import { routing } from '@/middleware';

function otherLocale(locale: Locale): Locale {
  return locale === 'nl' ? 'en' : 'nl';
}

export function LanguageSwitch({ locale }: { locale: Locale }) {
  const t = useTranslations('nav');
  const pathname = usePathname();
  const target = otherLocale(locale);
  const localePrefix = routing.locales.join('|');
  const nextPath = pathname.replace(new RegExp(`^/(${localePrefix})(?=/|$)`), `/${target}`);

  return (
    <Link
      href={nextPath}
      className="btn btn-surface ml-1 px-2.5 py-2 text-xs"
      aria-label={t('switchLanguage')}
    >
      {target.toUpperCase()}
    </Link>
  );
}

