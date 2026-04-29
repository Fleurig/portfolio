import type { ComponentProps } from 'react';

export function MdxTh(props: ComponentProps<'th'>) {
  return (
    <th
      className="border border-border bg-surface-muted px-3 py-2 text-left font-semibold"
      {...props}
    />
  );
}
