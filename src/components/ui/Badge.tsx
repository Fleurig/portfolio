import type { ComponentProps } from 'react';
import { clsx } from 'clsx';

export function Badge({
  className,
  ...props
}: ComponentProps<'span'>) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full border border-[var(--color-badge-border)] bg-[var(--color-badge-surface)] px-2.5 py-1 text-xs font-medium text-[var(--color-badge-text)]',
        className,
      )}
      {...props}
    />
  );
}
