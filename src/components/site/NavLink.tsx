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
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus',
        active
          ? 'bg-surface text-text shadow-sm'
          : 'text-text-muted hover:bg-surface-muted hover:text-text',
      )}
    >
      {children}
      {active && (
        <span
          className="absolute inset-x-2 -bottom-px h-0.5 rounded-full bg-primary"
          aria-hidden="true"
        />
      )}
    </Link>
  );
}
