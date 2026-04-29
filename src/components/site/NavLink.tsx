"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { clsx } from 'clsx';

export function NavLink({
  href,
  children,
  locale,
}: {
  href: string;
  children: React.ReactNode;
  locale: 'nl' | 'en';
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
          ? 'bg-[var(--color-surface-muted)] text-[var(--color-text)]'
          : 'text-[var(--color-text-muted)] hover:bg-[var(--color-surface-muted)]',
      )}
    >
      {children}
    </Link>
  );
}
