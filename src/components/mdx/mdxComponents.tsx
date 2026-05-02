import type { MDXComponents } from 'mdx/types';
import Link from 'next/link';
import type React from 'react';

function isExternalHref(href: string) {
  return (
    href.startsWith('http://') ||
    href.startsWith('https://') ||
    href.startsWith('//') ||
    href.startsWith('mailto:') ||
    href.startsWith('tel:')
  );
}

export function MdxA({
  href = '',
  children,
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  const external = isExternalHref(href);

  const className =
    'font-medium text-text underline decoration-primary/55 underline-offset-4 hover:opacity-90 cursor-pointer';

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        {...props}
      >
        {children}
        <span aria-hidden="true" className="ml-1 text-xs text-text-muted">
          ↗
        </span>
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

export const mdxComponents: MDXComponents = {
  a: (props) => <MdxA {...props} />,
  h1: ({ children, ...props }) => (
    <h1
      className="mb-4 mt-8 text-2xl font-bold tracking-tight text-text first:mt-0 sm:text-3xl"
      {...props}
    >
      {children}
    </h1>
  ),
  h2: ({ children, ...props }) => (
    <h2
      className="mb-3 mt-8 border-b border-border-muted pb-2 text-lg font-semibold tracking-tight text-text first:mt-0"
      {...props}
    >
      {children}
    </h2>
  ),
  h3: ({ children, ...props }) => (
    <h3
      className="mb-2 mt-6 text-base font-semibold tracking-tight text-text first:mt-0"
      {...props}
    >
      {children}
    </h3>
  ),
  p: ({ children, ...props }) => (
    <p className="mt-3 leading-relaxed text-text [&:first-child]:mt-0" {...props}>
      {children}
    </p>
  ),
  ul: ({ children, ...props }) => (
    <ul className="my-3 ml-5 list-disc space-y-1 text-text" {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }) => (
    <ol className="my-3 ml-5 list-decimal space-y-1 text-text" {...props}>
      {children}
    </ol>
  ),
  li: ({ children, ...props }) => (
    <li className="leading-relaxed" {...props}>
      {children}
    </li>
  ),
  strong: ({ children, ...props }) => (
    <strong className="font-semibold text-text" {...props}>
      {children}
    </strong>
  ),
  pre: (props) => (
    <pre
      className="not-prose overflow-x-auto rounded-xl border border-border bg-surface-muted p-4 text-sm"
      {...props}
    />
  ),
  code: ({ className, ...props }) => (
    <code
      className={
        className ??
        'rounded-md border border-border bg-surface-muted px-1 py-0.5 text-[0.9em]'
      }
      {...props}
    />
  ),
  blockquote: (props) => (
    <blockquote
      className="border-l-4 border-primary/40 bg-surface px-4 py-1 text-text"
      {...props}
    />
  ),
  hr: (props) => <hr className="my-8 border-border" {...props} />,
  table: (props) => (
    <div className="not-prose my-6 overflow-x-auto">
      <table className="w-full border-collapse text-sm" {...props} />
    </div>
  ),
  th: (props) => (
    <th
      className="border border-border bg-surface-muted px-3 py-2 text-left font-semibold"
      {...props}
    />
  ),
  td: (props) => (
    <td className="border border-border px-3 py-2" {...props} />
  ),
};
