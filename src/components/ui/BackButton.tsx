"use client";

import { useSyncExternalStore } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

const Chevron = () => (
  <svg
    aria-hidden="true"
    width="14"
    height="14"
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M10 12L6 8l4-4" />
  </svg>
);

const btnClass =
  'inline-flex w-fit items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-sm font-medium ' +
  'text-text-muted transition-all duration-200 hover:bg-surface-muted hover:text-text ' +
  'active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus';

const emptySubscribe = () => () => {};

/**
 * Smart back button.
 * - SSR: renders as a <Link href={fallback}> for accessibility with no JS.
 * - After hydration: if browser history is available (length > 1), calls
 *   router.back() so the user naturally returns to wherever they came from.
 *   (home → project → back = home; projects list → project → back = projects list)
 */
export function BackButton({ fallback }: { fallback: string }) {
  const t = useTranslations('nav');
  const router = useRouter();

  // useSyncExternalStore correctly handles SSR vs client without setState-in-effect.
  // Server snapshot returns false (renders as Link); client snapshot reads real history.
  const canGoBack = useSyncExternalStore(
    emptySubscribe,
    () => window.history.length > 1,
    () => false,
  );

  if (canGoBack) {
    return (
      <button type="button" onClick={() => router.back()} className={btnClass}>
        <Chevron />
        <span>{t('back')}</span>
      </button>
    );
  }

  return (
    <Link href={fallback} className={btnClass}>
      <Chevron />
      <span>{t('back')}</span>
    </Link>
  );
}
