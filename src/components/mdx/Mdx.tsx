import type { ComponentProps, ReactNode } from 'react';

type Props = {
  source: { content: ReactNode };
} & ComponentProps<'div'>;

export function Mdx({ source, className, ...props }: Props) {
  return (
    <div className={className} {...props}>
      {source.content}
    </div>
  );
}
