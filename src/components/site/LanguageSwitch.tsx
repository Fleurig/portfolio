"use client";

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import type { Locale } from '@/src/lib/i18n';
import { routing } from '@/middleware';
import { useMemo } from 'react';


export function LanguageSwitch({ locale }: { locale: Locale }) {
  const t = useTranslations('nav');
  const pathname = usePathname();

  const target = useMemo(() => {
    return locale === 'nl' ? 'en' : 'nl';
  }, [locale]);

  const flag = useMemo(() => {
    switch (target) {
      case 'en':
        return '🇬🇧';
      case 'nl':
        return '🇳🇱';
      default:
        return '🏳️';
    }
  }, [target]);

  const localePrefix = routing.locales.join('|');
  const nextPath = pathname.replace(new RegExp(`^/(${localePrefix})(?=/|$)`), `/${target}`);


  return (
    <Link
      href={nextPath}
      className="btn btn-surface inline-flex items-center justify-center text-2xl p-0 h-11 w-11"
      aria-label={t('switchLanguage')}
      replace
    >
      {flag}
    </Link>
  );
}

