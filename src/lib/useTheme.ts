"use client";

import { useEffect, useMemo, useState } from 'react';

export type Theme = 'dark' | 'light' | 'contrast';

const THEME_KEY = 'theme';

function applyTheme(theme: Theme) {
  document.documentElement.setAttribute('data-theme', theme);
}

function resolveSystemTheme(): Theme {
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
}

function getInitialTheme(): Theme {
  if (typeof window === 'undefined') return 'light';
  const stored = window.localStorage.getItem(THEME_KEY);
  if (stored === 'dark' || stored === 'light' || stored === 'contrast') {
    return stored;
  }
  // default: system
  return resolveSystemTheme();
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => getInitialTheme());

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  useEffect(() => {
    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = () => {
      // Only follow system when user hasn't explicitly set a theme.
      const stored = window.localStorage.getItem(THEME_KEY);
      if (stored === 'dark' || stored === 'light' || stored === 'contrast') return;
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
      setTheme: (next: Theme) => {
        setTheme(next);
        window.localStorage.setItem(THEME_KEY, next);
        applyTheme(next);
      },
      clearTheme: () => {
        window.localStorage.removeItem(THEME_KEY);
        const next = resolveSystemTheme();
        setTheme(next);
        applyTheme(next);
      },
    };
  }, [theme]);

  return api;
}
