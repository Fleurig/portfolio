"use client";

import { useSyncExternalStore } from 'react';
import { useTranslations } from 'next-intl';

import { useTheme } from '@/src/lib/useTheme';

const emptySubscribe = () => () => {};

function useHydrated() {
  return useSyncExternalStore(emptySubscribe, () => true, () => false);
}

function themeIcon(theme: 'dark' | 'light' | 'contrast') {
  if (theme === 'dark') return '☾';
  if (theme === 'contrast') return '◐';
  return '☀';
}

export function ThemeToggle({ compact = false }: { compact?: boolean }) {
  const t = useTranslations('a11y');
  const { theme, setTheme, clearTheme } = useTheme();
  const hydrated = useHydrated();
  const visibleTheme = hydrated ? theme : 'light';

  const next =
    visibleTheme === 'dark'
      ? 'light'
      : visibleTheme === 'light'
        ? 'contrast'
        : 'dark';

  const label =
    visibleTheme === 'dark'
      ? t('themeDark')
      : visibleTheme === 'light'
        ? t('themeLight')
        : t('themeContrast');

  return (
    <div className="inline-flex items-center gap-1">
      <button
        type="button"
        onClick={() => setTheme(next)}
        className="btn btn-surface inline-flex items-center justify-center text-2xl p-0 h-11 w-11"
        aria-label={`${t('toggleTheme')}: ${label}`}
        title={`${t('toggleTheme')}: ${label}`}
        aria-pressed={visibleTheme !== 'light'}
      >
        <span aria-hidden="true" className="text-sm leading-none">{themeIcon(visibleTheme)}</span>
        {!compact && <span>{label}</span>}
      </button>

      {/* <button
        type="button"
        onClick={clearTheme}
        className="btn btn-surface inline-flex items-center justify-center text-2xl p-0 h-11 w-11"
        aria-label={t('useSystemTheme')}
        title={t('useSystemTheme')}
      >
        <span aria-hidden="true" className="text-sm leading-none">🖥</span>
      </button> */}
    </div>
  );
}
