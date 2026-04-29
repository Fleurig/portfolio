"use client";

import { useEffect, useMemo, useState } from 'react';

import type { Theme } from '@/src/lib/translations';

const THEME_KEY = 'theme';

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.classList.toggle('dark', theme === 'dark');
  root.classList.toggle('contrast', theme === 'contrast');
  root.style.colorScheme = theme === 'light' ? 'light' : 'dark';
}

function getInitialTheme(): Theme {
  if (typeof window === 'undefined') return 'dark';

  const stored = window.localStorage.getItem(THEME_KEY);
  if (stored === 'dark' || stored === 'light' || stored === 'contrast') {
    return stored;
  }

  // Default: dark.
  return 'dark';
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>('dark');

  useEffect(() => {
    const initial = getInitialTheme();
    setTheme(initial);
    applyTheme(initial);
  }, []);

  const api = useMemo(() => {
    return {
      theme,
      setTheme: (next: Theme) => {
        setTheme(next);
        window.localStorage.setItem(THEME_KEY, next);
        applyTheme(next);
      },
    };
  }, [theme]);

  return api;
}
