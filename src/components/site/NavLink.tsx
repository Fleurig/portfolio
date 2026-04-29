"use client";

import type { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { clsx } from 'clsx';

export function NavLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  const pathname = usePathname();

  // Active when exact match or current sub-route.
  const active = pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Link
      href={href}
      aria-current={active ? 'page' : undefined}
      className={clsx(
        'relative rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus)]',
        active
          ? 'bg-[var(--color-surface)] text-[var(--color-text)] shadow-sm'
          : 'text-[var(--color-text-muted)] hover:bg-[var(--color-surface-muted)] hover:text-[var(--color-text)]',
      )}
    >
      {children}
      {active && (
        <span
          className="absolute inset-x-2 -bottom-px h-0.5 rounded-full bg-[var(--color-primary)]"
          aria-hidden="true"
        />
      )}
    </Link>
  );
}
