import Link from 'next/link';

export function ButtonLink({
  href,
  variant = 'primary',
  children,
}: {
  href: string;
  variant?: 'primary' | 'secondary' | 'ghost';
  children: React.ReactNode;
}) {
  const base =
    'inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)]';

  const styles =
    variant === 'primary'
      ? 'glass text-[var(--color-text)] hover:opacity-90'
      : variant === 'secondary'
        ? 'glass text-[var(--color-text)] hover:bg-[color-mix(in_oklab,var(--glass-bg)_85%,var(--color-primary)_15%)]'
        : 'text-[var(--color-text)] hover:bg-[var(--color-surface-muted)]';

  return (
    <Link href={href} className={`${base} ${styles}`}>
      {children}
    </Link>
  );
}
