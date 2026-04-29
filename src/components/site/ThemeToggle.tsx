"use client";

import { t } from '@/src/lib/translations';
import { useTheme } from '@/src/lib/useTheme';

function themeIcon(theme: 'dark' | 'light' | 'contrast') {
  if (theme === 'dark') return '☾';
  if (theme === 'contrast') return '◐';
  return '☀';
}

export function ThemeToggle({ locale }: { locale: 'nl' | 'en' }) {
  const tr = t(locale);
  const { theme, setTheme, clearTheme } = useTheme();

  const next = theme === 'dark' ? 'light' : theme === 'light' ? 'contrast' : 'dark';

  const label =
    theme === 'dark'
      ? tr.a11y.themeDark
      : theme === 'light'
        ? tr.a11y.themeLight
        : tr.a11y.themeContrast;

  return (
    <div className="ml-1 inline-flex items-center gap-1">
      <button
        type="button"
        onClick={() => setTheme(next)}
        className="inline-flex items-center gap-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-2.5 py-2 text-xs font-medium text-[var(--color-text)] shadow-sm hover:bg-[var(--color-surface-muted)]"
        aria-label={`${tr.a11y.toggleTheme}: ${label}`}
        title={`${tr.a11y.toggleTheme}: ${label}`}
      >
        <span aria-hidden="true">{themeIcon(theme)}</span>
        <span>{label}</span>
      </button>

      <button
        type="button"
        onClick={clearTheme}
        className="inline-flex items-center rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-2.5 py-2 text-xs font-medium text-[var(--color-text-muted)] shadow-sm hover:bg-[var(--color-surface-muted)]"
        aria-label={tr.a11y.useSystemTheme}
        title={tr.a11y.useSystemTheme}
      >
        <span aria-hidden="true">🖥</span>
      </button>
    </div>
  );
}
