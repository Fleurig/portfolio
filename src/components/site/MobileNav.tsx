"use client";

import { useState, useEffect, useRef, useId, useCallback, useSyncExternalStore } from 'react';
import { clsx } from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { createPortal } from 'react-dom';
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

const emptySubscribe = () => () => {};
const FOCUS_DELAY_MS = 50; // lets the opening animation start before focus jumps into the dialog
const mobileNavBackdropClass = 'bg-black/18';
const hamburgerBarClass = 'block h-[1.5px] w-5 rounded-full bg-current transition-all duration-[250ms]';
const hamburgerTopOpenClass = 'translate-y-[7.5px] rotate-45';
const hamburgerBottomOpenClass = '-translate-y-[7.5px] -rotate-45';

export function MobileNav({ locale }: { locale: Locale }) {
  const [open, setOpen] = useState(false);
  const isClient = useSyncExternalStore(emptySubscribe, () => true, () => false);
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
      }, FOCUS_DELAY_MS); // wait for the opening transition to start
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
    { href: `/${locale}/builder`, label: t('nav.builder') },
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
        {/* translate-y-[7.5px] = gap-1.5 (6px) + half-bar (0.75px) × 2, keeping the rotated bars centred */}
        <span aria-hidden="true" className={clsx(hamburgerBarClass, 'origin-center', open && hamburgerTopOpenClass)} />
        <span aria-hidden="true" className={clsx(hamburgerBarClass, open && 'opacity-0 scale-x-50')} />
        <span aria-hidden="true" className={clsx(hamburgerBarClass, 'origin-center', open && hamburgerBottomOpenClass)} />
      </button>

      {isClient
        ? createPortal(
            <>
              {/* ── Backdrop ── */}
              <div
                onClick={close}
                aria-hidden="true"
                className={`fixed inset-0 z-40 ${mobileNavBackdropClass} transition-opacity duration-300 ${
                  open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
                }`}
              />

              {/* ── Slide-in drawer ──
                  Rendered in a portal so sticky/blurred header styles cannot
                  create a containing block for this fixed-positioned overlay. */}
              <div
                ref={drawerRef}
                id={drawerId}
                role="dialog"
                aria-modal="true"
                aria-labelledby={titleId}
                aria-hidden={!open}
                className={`glass-drawer fixed inset-0 z-50 flex min-h-screen flex-col transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.32,0,0.18,1)] ${
                  open ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
                }`}
              >
                {/* Drawer header */}
                <div className="flex h-16 shrink-0 items-center justify-between border-b border-border/50 px-5 sm:px-6">
                  <span id={titleId} className="text-[15px] font-semibold tracking-tight text-text">
                    {t('nav.menuLabel')}
                  </span>
                  <button
                    type="button"
                    onClick={close}
                    aria-label={t('nav.closeMenu')}
                    className="btn btn-surface flex h-11 w-11 items-center justify-center p-0"
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
                <nav className="flex-1 overflow-y-auto px-4 py-6 sm:px-6" aria-label={t('nav.menuLabel')}>
                  <ul className="flex flex-col gap-2">
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
                            className={`group flex items-center gap-3 rounded-2xl px-5 py-4 text-base font-medium transition-all duration-150 ${
                              active
                                ? 'bg-white/55 text-text shadow-[0_10px_30px_rgba(0,0,0,0.08)]'
                                : 'text-text-muted hover:bg-white/35 hover:text-text'
                            }`}
                          >
                            <span
                              aria-hidden="true"
                              className={`h-1.5 w-1.5 shrink-0 rounded-full transition-all duration-200 ${
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
                <div className="shrink-0 border-t border-border/50 px-4 py-4 sm:px-6">
                  <div className="flex items-center gap-2">
                    <ThemeToggle compact />
                    <LanguageSwitch locale={locale} />
                  </div>
                </div>
              </div>
            </>,
            document.body
          )
        : null}
    </div>
  );
}
