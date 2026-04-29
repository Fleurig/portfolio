import type { ComponentProps } from 'react';
import { MdxLink } from '@/src/components/mdx/MdxLink';
import { MdxPre } from '@/src/components/mdx/MdxPre';
import { MdxCode } from '@/src/components/mdx/MdxCode';
import { MdxBlockquote } from '@/src/components/mdx/MdxBlockquote';
import { MdxHr } from '@/src/components/mdx/MdxHr';
import { MdxTable } from '@/src/components/mdx/MdxTable';
import { MdxTh } from '@/src/components/mdx/MdxTh';
import { MdxTd } from '@/src/components/mdx/MdxTd';

type Props = {
  source: { content: React.ReactNode };
} & ComponentProps<'div'>;

export function Mdx({ source, className, ...props }: Props) {
  return (
    <div className={className} {...props}>
      <div className="prose max-w-none">
        <style>{`.prose a { text-decoration: none; }`}</style>
        {
          // next-mdx-remote/rsc returns a ReactNode tree; we can't pass components the same
          // way as @next/mdx useMDXComponents, so we style via wrappers and provide
          // explicit MDX components through MDX itself. For now, we provide a small runtime
          // replacement for links by relying on the fact that MDX compiles <a> tags.
        }
        {source.content}
      </div>
    </div>
  );
}

// Export components so MDX can import them explicitly if needed.
export const mdxComponents = {
  a: MdxLink,
  pre: MdxPre,
  code: MdxCode,
  blockquote: MdxBlockquote,
  hr: MdxHr,
  table: MdxTable,
  th: MdxTh,
  td: MdxTd,
};
