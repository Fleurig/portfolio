"use client";

import { useState, useEffect, useRef, useId, useCallback } from 'react';
import { clsx } from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import type { Locale } from '@/src/lib/i18n';
import { LanguageSwitch } from '@/src/components/site/LanguageSwitch';
import { ThemeToggle } from '@/src/components/site/ThemeToggle';

/** Returns all focusable elements inside a container that are not hidden. */
function getFocusables(container: HTMLElement): HTMLElement[] {
  return Array.from(
    container.querySelectorAll<HTMLElement>(
      'button:not([disabled]), [href]:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])'
    )
  ).filter((el) => !el.closest('[hidden]') && !el.closest('[aria-hidden="true"]'));
}

export function MobileNav({ locale }: { locale: Locale }) {
  const [open, setOpen] = useState(false);
  const t = useTranslations();
  const pathname = usePathname();

  const triggerRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  // Unique IDs for the drawer panel and its visible title (used by aria-controls
  // and aria-labelledby so screen readers announce the dialog name correctly).
  const drawerId = useId();
  const titleId = useId();

  const close = useCallback(() => setOpen(false), []);

  // When the drawer opens, move focus to its first interactive element.
  // When it closes, return focus to the hamburger trigger.
  useEffect(() => {
    if (open) {
      const id = setTimeout(() => {
        const first = drawerRef.current ? getFocusables(drawerRef.current)[0] : null;
        first?.focus();
      }, 50); // wait for slide-in transition to start
      return () => clearTimeout(id);
    } else {
      triggerRef.current?.focus();
    }
  }, [open]);

  // Keyboard handling: Escape closes; Tab is trapped inside the drawer.
  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        close();
        return;
      }
      if (e.key !== 'Tab' || !drawerRef.current) return;

      const focusables = getFocusables(drawerRef.current);
      if (focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, close]);

  // Prevent body scroll while the drawer is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const navLinks = [
    { href: `/${locale}`, label: t('nav.home') },
    { href: `/${locale}/cv`, label: t('nav.cv') },
    { href: `/${locale}/projects`, label: t('nav.projects') },
    { href: `/${locale}/contact`, label: t('nav.contact') },
  ];

  return (
    <div className="flex sm:hidden items-center">
      {/* ── Hamburger trigger ── */}
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={drawerId}
        aria-label={open ? t('nav.closeMenu') : t('nav.openMenu')}
        className="btn btn-surface flex h-11 w-11 flex-col items-center justify-center gap-1.5 p-0"
      >
        {/* translate-y-[7.5px] = gap(6px) + half-bar(0.75px) × 2 — centres the rotated bars on the middle bar */}
        <span aria-hidden="true" className={clsx('block h-[1.5px] w-5 rounded-full bg-current origin-center transition-all duration-[250ms]', open && 'translate-y-[7.5px] rotate-45')} />
        <span aria-hidden="true" className={clsx('block h-[1.5px] w-5 rounded-full bg-current transition-all duration-[250ms]', open && 'opacity-0 scale-x-50')} />
        <span aria-hidden="true" className={clsx('block h-[1.5px] w-5 rounded-full bg-current origin-center transition-all duration-[250ms]', open && '-translate-y-[7.5px] -rotate-45')} />
      </button>

      {/* ── Backdrop ── */}
      <div
        onClick={close}
        aria-hidden="true"
        className={`fixed inset-0 z-40 bg-black/45 transition-opacity duration-300 ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* ── Slide-in drawer ──
          Uses aria-labelledby pointing to the visible title inside the drawer,
          which is the recommended ARIA dialog pattern. */}
      <div
        ref={drawerRef}
        id={drawerId}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className={`glass-drawer fixed inset-y-0 right-0 z-50 flex w-80 max-w-[90vw] flex-col transition-transform duration-300 ease-[cubic-bezier(0.32,0,0.18,1)] ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Drawer header */}
        <div className="flex h-14 flex-shrink-0 items-center justify-between border-b border-border/60 px-5">
          <span id={titleId} className="text-[15px] font-semibold tracking-tight text-text">
            {t('nav.menuLabel')}
          </span>
          <button
            type="button"
            onClick={close}
            aria-label={t('nav.closeMenu')}
            className="btn btn-surface flex h-9 w-9 items-center justify-center p-0"
          >
            <svg
              aria-hidden="true"
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="M1 1l12 12M13 1L1 13" />
            </svg>
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex-1 overflow-y-auto px-3 py-4" aria-label={t('nav.menuLabel')}>
          <ul className="flex flex-col gap-1">
            {navLinks.map(({ href, label }) => {
              const active =
                href === `/${locale}`
                  ? pathname === href
                  : pathname === href || pathname.startsWith(`${href}/`);
              return (
                <li key={href}>
                  <Link
                    href={href}
                    onClick={close}
                    aria-current={active ? 'page' : undefined}
                    className={`group flex items-center gap-3 rounded-xl px-4 py-3 text-[15px] font-medium transition-all duration-150 ${
                      active
                        ? 'bg-surface text-text shadow-[0_1px_3px_rgba(0,0,0,0.06)]'
                        : 'text-text-muted hover:bg-surface-muted hover:text-text'
                    }`}
                  >
                    <span
                      aria-hidden="true"
                      className={`h-1.5 w-1.5 flex-shrink-0 rounded-full transition-all duration-200 ${
                        active ? 'bg-primary' : 'bg-transparent group-hover:bg-text-muted'
                      }`}
                    />
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Bottom toolbar */}
        <div className="flex-shrink-0 border-t border-border/60 px-4 py-4">
          <div className="flex items-center gap-2">
            <ThemeToggle compact />
            <LanguageSwitch locale={locale} />
          </div>
        </div>
      </div>
    </div>
  );
}
