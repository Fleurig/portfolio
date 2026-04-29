"use client";

import { t } from '@/src/lib/translations';
import { useTheme } from '@/src/lib/useTheme';

export function ThemeToggle({ locale }: { locale: 'nl' | 'en' }) {
  const tr = t(locale);
  const { theme, preference, setPreference } = useTheme();

  const next =
    preference === 'system'
      ? 'dark'
      : preference === 'dark'
        ? 'light'
        : preference === 'light'
          ? 'contrast'
          : preference === 'contrast'
            ? 'system'
            : 'system';

  const icon =
    preference === 'system'
      ? '◌'
      : theme === 'dark'
        ? '☾'
        : theme === 'contrast'
          ? '◐'
          : '☀';

  const label =
    preference === 'system'
      ? tr.a11y.themeSystem
      : preference === 'dark'
        ? tr.a11y.themeDark
        : preference === 'light'
          ? tr.a11y.themeLight
          : tr.a11y.themeContrast;

  return (
    <button
      type="button"
      onClick={() => setPreference(next)}
      className="ml-1 inline-flex items-center gap-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-2.5 py-2 text-xs font-medium text-[var(--color-text)] shadow-sm hover:bg-[var(--color-surface-muted)]"
      aria-label={`${tr.a11y.toggleTheme}: ${label}`}
      title={`${tr.a11y.toggleTheme}: ${label}`}
    >
      <span aria-hidden="true">{icon}</span>
      <span className="hidden sm:inline">{label}</span>
    </button>
  );
}
