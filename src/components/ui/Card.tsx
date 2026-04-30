import type { ComponentProps } from 'react';
import { clsx } from 'clsx';

export function Card({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      className={clsx(
        'glass-card rounded-2xl p-5',
        'hover:-translate-y-0.5',
        'focus-within:ring-2 focus-within:ring-focus focus-within:outline-none',
        className,
      )}
      {...props}
    />
  );
}
