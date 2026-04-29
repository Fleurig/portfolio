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
        'rounded-lg px-3 py-2 text-sm transition',
        active
          ? 'bg-card-surface-muted text-card-text'
          : 'text-card-text-muted hover:bg-card-surface-muted',
      )}
    >
      {children}
    </Link>
  );
}
