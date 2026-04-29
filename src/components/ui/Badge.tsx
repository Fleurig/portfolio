import type { ComponentProps } from 'react';
import { clsx } from 'clsx';

export function Badge({
  className,
  ...props
}: ComponentProps<'span'>) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
        'border border-[var(--glass-border)] bg-[var(--glass-bg-light)]',
        'text-[var(--color-text-muted)] backdrop-blur-sm',
        'shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]',
        className,
      )}
      {...props}
    />
  );
}
