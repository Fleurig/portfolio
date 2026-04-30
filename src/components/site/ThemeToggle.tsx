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

export function ThemeToggle() {
  const t = useTranslations('a11y');
  const { theme, setTheme, clearTheme } = useTheme();
  const hydrated = useHydrated();
  const visibleTheme = hydrated ? theme : 'light';

  const next = visibleTheme === 'dark' ? 'light' : visibleTheme === 'light' ? 'contrast' : 'dark';

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
        className="btn btn-surface inline-flex items-center gap-1.5 px-2.5 py-2 text-xs"
        aria-label={`${t('toggleTheme')}: ${label}`}
        title={`${t('toggleTheme')}: ${label}`}
        aria-pressed={visibleTheme !== 'light'}
      >
        <span aria-hidden="true">{themeIcon(visibleTheme)}</span>
        <span className="hidden sm:inline">{label}</span>
      </button>

      <button
        type="button"
        onClick={clearTheme}
        className="btn btn-surface inline-flex items-center px-2.5 py-2 text-xs"
        aria-label={t('useSystemTheme')}
        title={t('useSystemTheme')}
      >
        <span aria-hidden="true">🖥</span>
      </button>
    </div>
  );
}

