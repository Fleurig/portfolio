"use client";

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import type { Locale } from '@/src/lib/i18n';
import { LanguageSwitch } from '@/src/components/site/LanguageSwitch';
import { ThemeToggle } from '@/src/components/site/ThemeToggle';

export function MobileNav({ locale }: { locale: Locale }) {
  const [open, setOpen] = useState(false);
  const t = useTranslations();
  const pathname = usePathname();
  const triggerRef = useRef<HTMLButtonElement>(null);

  const close = () => setOpen(false);

  // Escape key closes drawer + returns focus
  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        close();
        triggerRef.current?.focus();
      }
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [open]);

  // Lock body scroll while open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const navLinks = [
    { href: `/${locale}`, label: t('nav.home') },
    { href: `/${locale}/cv`, label: t('nav.cv') },
    { href: `/${locale}/projects`, label: t('nav.projects') },
    { href: `/${locale}/contact`, label: t('nav.contact') },
  ];

  return (
    <div className="flex sm:hidden items-center">
      {/* Hamburger trigger */}
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? t('nav.closeMenu') : t('nav.openMenu')}
        className="btn btn-surface flex h-11 w-11 flex-col items-center justify-center gap-1.5 p-0"
      >
        {/* translate-y-[7.5px] = gap(6px) + half bar(0.75px) × 2 — aligns outer bars with the centre of the middle bar when forming the × */}
        <span
          aria-hidden="true"
          className={`block h-[1.5px] w-5 rounded-full bg-current origin-center transition-all duration-[250ms] ${open ? 'translate-y-[7.5px] rotate-45' : ''}`}
        />
        <span
          aria-hidden="true"
          className={`block h-[1.5px] w-5 rounded-full bg-current transition-all duration-[250ms] ${open ? 'opacity-0 scale-x-50' : ''}`}
        />
        <span
          aria-hidden="true"
          className={`block h-[1.5px] w-5 rounded-full bg-current origin-center transition-all duration-[250ms] ${open ? '-translate-y-[7.5px] -rotate-45' : ''}`}
        />
      </button>

      {/* Backdrop */}
      <div
        onClick={close}
        aria-hidden="true"
        className={`fixed inset-0 z-40 transition-opacity duration-300 ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        style={{ background: 'rgba(0,0,0,0.32)' }}
      />

      {/* Slide-in drawer */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={`glass-drawer fixed inset-y-0 right-0 z-50 flex w-72 max-w-[88vw] flex-col transition-transform duration-300 ease-[cubic-bezier(0.32,0,0.18,1)] ${open ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* Drawer header */}
        <div className="flex h-14 items-center justify-between border-b border-border/60 px-5">
          <span className="text-[15px] font-semibold tracking-tight text-text">
            {t('brand.name')}
          </span>
          <button
            type="button"
            onClick={close}
            aria-label={t('nav.closeMenu')}
            className="btn btn-surface flex h-8 w-8 items-center justify-center p-0"
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
        <nav className="flex-1 overflow-y-auto px-3 py-4" aria-label="Mobile navigation">
          <ul className="flex flex-col gap-0.5">
            {navLinks.map(({ href, label }) => {
              // Exact match for home, prefix for sub-pages
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
                    className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-150 ${
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
        <div className="border-t border-border/60 px-4 py-3">
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <LanguageSwitch locale={locale} />
          </div>
        </div>
      </div>
    </div>
  );
}
