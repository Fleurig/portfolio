import type { ComponentProps } from 'react';

export function MdxCode({ className, ...props }: ComponentProps<'code'>) {
  // Keep inline code token-based; if it's a fenced code block, it will be wrapped by <pre>.
  return (
    <code
      className={
        className ??
        'rounded-md border border-[var(--color-border)] bg-[var(--color-surface-muted)] px-1 py-0.5 text-[0.9em]'
      }
      {...props}
    />
  );
}
