import type { ComponentProps } from 'react';
import { clsx } from 'clsx';

export function Badge({
  className,
  ...props
}: ComponentProps<'span'>) {
  return (
    <span
      className={clsx(
        'glass glass--elevated inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium text-[var(--color-text-muted)]',
        className,
      )}
      {...props}
    />
  );
}
