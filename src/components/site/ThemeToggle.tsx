"use client";

import { t } from '@/src/lib/translations';
import { useTheme } from '@/src/lib/useTheme';

export function ThemeToggle({ locale }: { locale: 'nl' | 'en' }) {
  const tr = t(locale);
  const { theme, setTheme } = useTheme();

  const icon = theme === 'dark' ? '☾' : theme === 'contrast' ? '◐' : '☀';
  const next = theme === 'dark' ? 'light' : theme === 'light' ? 'contrast' : 'dark';

  const label =
    theme === 'dark'
      ? tr.a11y.themeDark
      : theme === 'light'
        ? tr.a11y.themeLight
        : tr.a11y.themeContrast;

  return (
    <button
      type="button"
      onClick={() => setTheme(next)}
      className="ml-1 inline-flex items-center rounded-lg border border-slate-200 bg-white px-2.5 py-2 text-xs font-medium text-slate-700 shadow-sm hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200 dark:hover:bg-slate-900 contrast:border-black contrast:bg-white contrast:text-black"
      aria-label={`${tr.a11y.toggleTheme}: ${label}`}
      title={`${tr.a11y.toggleTheme}: ${label}`}
    >
      {icon}
    </button>
  );
}
