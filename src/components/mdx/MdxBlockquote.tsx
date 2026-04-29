import type { ComponentProps } from 'react';

export function MdxBlockquote(props: ComponentProps<'blockquote'>) {
  return (
    <blockquote
      className="border-l-4 border-[color-mix(in_oklab,var(--color-primary)_40%,var(--color-border))] bg-[var(--color-surface)] px-4 py-1 text-[var(--color-text)]"
      {...props}
    />
  );
}
