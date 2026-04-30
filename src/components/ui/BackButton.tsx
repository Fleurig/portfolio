"use client";

import type { MouseEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
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
 * Renders as a proper <a> element at all times (good for semantics, right-click, status bar).
 * On click: uses browser history if available (router.back()), otherwise follows the Link href.
 * This gives both link affordances AND the correct back-navigation behaviour.
 */
export function BackButton({ fallback }: { fallback: string }) {
  const t = useTranslations('nav');
  const router = useRouter();

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    // Only intercept plain left-clicks (no modifier keys / middle-click / right-click)
    if (!e.defaultPrevented && e.button === 0 && !e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey) {
      e.preventDefault();
      router.back();
    }
  };

  return (
    <Link href={fallback} onClick={handleClick} className={btnClass}>
      <Chevron />
      <span>{t('back')}</span>
    </Link>
  );
}
