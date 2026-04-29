"use client";

import { useEffect, useMemo, useState } from 'react';

import type { Theme } from '@/src/lib/translations';

const THEME_KEY = 'theme';

type ThemePreference = Theme | 'system';

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.setAttribute('data-theme', theme);
}

function resolveSystemTheme(): Theme {
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
}

function getInitialPreference(): ThemePreference {
  if (typeof window === 'undefined') return 'system';

  const stored = window.localStorage.getItem(THEME_KEY);
  if (stored === 'dark' || stored === 'light' || stored === 'contrast') {
    return stored;
  }
  if (stored === 'system') return 'system';

  // Default: system.
  return 'system';
}

export function useTheme() {
  const [preference, setPreference] = useState<ThemePreference>('system');
  const [theme, setTheme] = useState<Theme>('dark');

  useEffect(() => {
    const initialPref = getInitialPreference();
    setPreference(initialPref);

    const initialTheme =
      initialPref === 'system' ? resolveSystemTheme() : initialPref;
    setTheme(initialTheme);
    applyTheme(initialTheme);

    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = () => {
      if (getInitialPreference() !== 'system') return;
      const next = resolveSystemTheme();
      setTheme(next);
      applyTheme(next);
    };

    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, []);

  const api = useMemo(() => {
    return {
      theme,
      preference,
      setPreference: (next: ThemePreference) => {
        setPreference(next);
        window.localStorage.setItem(THEME_KEY, next);
        const resolved = next === 'system' ? resolveSystemTheme() : next;
        setTheme(resolved);
        applyTheme(resolved);
      },
    };
  }, [preference, theme]);

  return api;
}
