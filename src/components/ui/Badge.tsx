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
        'border border-(--glass-border) bg-(--glass-bg-light)',
        'text-text-muted backdrop-blur-sm',
        'shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]',
        className,
      )}
      {...props}
    />
  );
}
