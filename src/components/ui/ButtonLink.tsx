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
    'glass glass--elevated glass-hover inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)]';

  const styles =
    variant === 'primary'
      ? 'text-[var(--color-text)]'
      : variant === 'secondary'
        ? 'text-[var(--color-text)]'
        : 'bg-transparent shadow-none text-[var(--color-text)] hover:bg-[var(--color-surface-muted)]';

  return (
    <Link href={href} className={`${base} ${styles}`}>
      {children}
    </Link>
  );
}
