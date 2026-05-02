"use client";

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
  'inline-flex w-fit items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-sm font-medium cursor-pointer ' +
  'text-text-muted transition-all duration-200 hover:bg-surface-muted hover:text-text ' +
  'active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus';

/**
 * Renders as a proper <a> element at all times (good for semantics, right-click, status bar)
 * and always follows the locale-aware fallback href.
 */
export function BackButton({ fallback }: { fallback: string }) {
  const t = useTranslations('nav');

  return (
    <Link href={fallback} className={btnClass}>
      <Chevron />
      <span>{t('back')}</span>
    </Link>
  );
}
