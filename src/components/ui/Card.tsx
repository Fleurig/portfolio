import type { ComponentProps } from 'react';
import { clsx } from 'clsx';

export function Card({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      className={clsx(
        'glass glass--elevated glass-hover rounded-2xl p-5',
        'focus-within:ring-2 focus-within:ring-[var(--color-focus)]',
        className,
      )}
      {...props}
    />
  );
}
