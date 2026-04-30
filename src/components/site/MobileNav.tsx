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
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const close = () => setOpen(false);

  // Close on Escape key
  useEffect(() => {
    if (!open) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };

    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [open]);

  // Prevent body scroll when open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const navLinks = [
    { href: `/${locale}/cv`, label: t('nav.cv') },
    { href: `/${locale}/projects`, label: t('nav.projects') },
    { href: `/${locale}/contact`, label: t('nav.contact') },
  ];

  return (
    <div className="flex sm:hidden items-center gap-2">
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? t('nav.closeMenu') : t('nav.openMenu')}
        className="btn btn-surface p-2"
      >
        {/* Animated hamburger icon */}
        <span aria-hidden="true" className="flex flex-col justify-center items-center w-5 h-5 gap-1">
          <span
            className={`block h-0.5 w-5 rounded-full bg-current transition-all duration-200 origin-center ${open ? 'translate-y-1.5 rotate-45' : ''}`}
          />
          <span
            className={`block h-0.5 w-5 rounded-full bg-current transition-all duration-200 ${open ? 'opacity-0 scale-x-0' : ''}`}
          />
          <span
            className={`block h-0.5 w-5 rounded-full bg-current transition-all duration-200 origin-center ${open ? '-translate-y-1.5 -rotate-45' : ''}`}
          />
        </span>
      </button>

      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
          aria-hidden="true"
          onClick={close}
        />
      )}

      {/* Drawer */}
      <div
        id="mobile-menu"
        ref={menuRef}
        role="dialog"
        aria-modal="true"
        aria-label={t('nav.openMenu')}
        className={`fixed inset-y-0 right-0 z-50 w-72 max-w-[85vw] flex flex-col glass glass--elevated shadow-2xl transition-transform duration-300 ease-in-out ${open ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between border-b border-border px-5 h-14">
          <span className="font-semibold tracking-tight text-text">
            {t('brand.name')}
          </span>
          <button
            type="button"
            onClick={close}
            aria-label={t('nav.closeMenu')}
            className="btn btn-surface p-2"
          >
            <svg aria-hidden="true" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M2 2l12 12M14 2L2 14" />
            </svg>
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex-1 overflow-y-auto px-4 py-6" aria-label="Mobile navigation">
          <ul className="flex flex-col gap-1">
            {navLinks.map(({ href, label }) => {
              const active = pathname === href || pathname.startsWith(`${href}/`);
              return (
                <li key={href}>
                  <Link
                    href={href}
                    onClick={close}
                    aria-current={active ? 'page' : undefined}
                    className={`flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-medium transition-colors ${active ? 'bg-surface text-text' : 'text-text-muted hover:bg-surface-muted hover:text-text'}`}
                  >
                    {active && (
                      <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                    )}
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Bottom toolbar */}
        <div className="border-t border-border px-4 py-4 flex flex-wrap items-center gap-2">
          <ThemeToggle />
          <LanguageSwitch locale={locale} />
        </div>
      </div>
    </div>
  );
}
