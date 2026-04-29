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
    'inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium shadow-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)]';

  const styles =
    variant === 'primary'
      ? 'bg-[var(--color-text)] text-[var(--color-bg)] hover:opacity-90'
      : variant === 'secondary'
        ? 'border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] hover:bg-[var(--color-surface-muted)]'
        : 'text-[var(--color-text)] hover:bg-[var(--color-surface-muted)]';

  return (
    <Link href={href} className={`${base} ${styles}`}>
      {children}
    </Link>
  );
}
