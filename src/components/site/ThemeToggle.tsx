"use client";

import { useSyncExternalStore } from 'react';

import { t } from '@/src/lib/translations';
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

export function ThemeToggle({ locale }: { locale: 'nl' | 'en' }) {
  const tr = t(locale);
  const { theme, setTheme, clearTheme } = useTheme();
  const hydrated = useHydrated();
  const visibleTheme = hydrated ? theme : 'light';

  const next = visibleTheme === 'dark' ? 'light' : visibleTheme === 'light' ? 'contrast' : 'dark';

  const label =
    visibleTheme === 'dark'
      ? tr.a11y.themeDark
      : visibleTheme === 'light'
        ? tr.a11y.themeLight
        : tr.a11y.themeContrast;

  return (
    <div className="ml-1 inline-flex items-center gap-1">
      <button
        type="button"
        onClick={() => setTheme(next)}
        className="btn btn-surface inline-flex items-center gap-2 px-2.5 py-2 text-xs"
        aria-label={`${tr.a11y.toggleTheme}: ${label}`}
        title={`${tr.a11y.toggleTheme}: ${label}`}
        aria-pressed={visibleTheme !== 'light'}
      >
        <span aria-hidden="true">{themeIcon(visibleTheme)}</span>
        <span>{label}</span>
      </button>

      <button
        type="button"
        onClick={clearTheme}
        className="btn btn-surface inline-flex items-center px-2.5 py-2 text-xs"
        aria-label={tr.a11y.useSystemTheme}
        title={tr.a11y.useSystemTheme}
      >
        <span aria-hidden="true">🖥</span>
      </button>
    </div>
  );
}
