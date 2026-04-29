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
        'glass glass--elevated glass-hover rounded-lg px-3 py-2 text-sm',
        active
          ? 'text-[var(--color-text)]'
          : 'text-[var(--color-text-muted)] hover:opacity-95',
      )}
    >
      {children}
    </Link>
  );
}
