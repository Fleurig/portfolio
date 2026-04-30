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
    'glass glass--elevated glass-hover inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-bg';

  const styles =
    variant === 'primary'
      ? 'text-text'
      : variant === 'secondary'
        ? 'text-text'
        : 'bg-transparent shadow-none text-text hover:bg-surface-muted';

  return (
    <Link href={href} className={`${base} ${styles}`}>
      {children}
    </Link>
  );
}
