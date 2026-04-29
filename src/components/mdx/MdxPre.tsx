import type { ComponentProps } from 'react';

export function MdxPre(props: ComponentProps<'pre'>) {
  return (
    <pre
      className="overflow-x-auto rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-muted)] p-4 text-sm"
      {...props}
    />
  );
}
