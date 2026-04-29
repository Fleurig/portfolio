import type { ComponentProps } from 'react';
import { clsx } from 'clsx';

export function Card({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      className={clsx(
        'rounded-2xl border border-[var(--color-card-border)] bg-[var(--color-card-surface)] p-5 shadow-sm',
        'transition will-change-transform hover:-translate-y-0.5 hover:shadow-md',
        'focus-within:ring-2 focus-within:ring-[var(--color-focus)]',
        className,
      )}
      {...props}
    />
  );
}
