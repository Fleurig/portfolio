import type { ComponentProps } from 'react';

export function MdxTd(props: ComponentProps<'td'>) {
  return (
    <td className="border border-[var(--color-border)] px-3 py-2" {...props} />
  );
}
