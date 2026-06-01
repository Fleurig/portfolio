import type { ReactNode } from 'react';
import Link from 'next/link';
import type { AuthUser } from '@/src/lib/auth';
import { ROLE_ADMIN } from '@/src/lib/actions/auth';

type NavItem = { label: string; href: string };

type Props = {
  user: AuthUser;
  locale: string;
  profileSlug: string;
  children: ReactNode;
};

export function AdminLayout({ user, locale, profileSlug, children }: Props) {
  const base = `/${locale}/admin`;

  const nav: NavItem[] = [
    { label: 'Dashboard', href: base },
    { label: 'Edit Home', href: `${base}/home` },
    { label: 'Edit CV', href: `${base}/cv` },
    { label: 'Edit Contact', href: `${base}/contact` },
    { label: 'Edit Projects', href: `${base}/projects` },
  ];

  const profileUrl = `/${locale}/portfolio/${profileSlug}`;

  return (
    <div className="min-h-dvh bg-bg">
      {/* Admin top bar */}
      <header className="no-print sticky top-0 z-40 glass-header">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <span className="rounded-lg bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">
              Admin
            </span>
            <span className="text-sm font-medium text-text">{user.name}</span>
          </div>
          <div className="flex items-center gap-3">
            <a
              href={profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-text-muted transition-opacity hover:opacity-70"
            >
              View portfolio
              <svg aria-hidden="true" className="h-3 w-3" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M4 12L12 4M12 4H6M12 4v6" />
              </svg>
            </a>
            <form action={`/api/auth/sign-out`} method="POST">
              <button
                type="submit"
                className="text-sm text-text-muted transition-opacity hover:opacity-70"
              >
                Sign out
              </button>
            </form>
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-6xl gap-6 px-4 py-8 sm:px-6 md:gap-10">
        {/* Sidebar nav */}
        <nav
          className="no-print hidden w-44 shrink-0 md:block"
          aria-label="Admin navigation"
        >
          <ul className="flex flex-col gap-1">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="flex items-center rounded-xl px-3 py-2 text-sm text-text-muted transition-colors hover:bg-surface hover:text-text"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Main content */}
        <main className="min-w-0 flex-1">{children}</main>
      </div>
    </div>
  );
}
