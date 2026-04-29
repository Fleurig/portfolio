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
    'font-medium text-[var(--color-text)] underline decoration-[color-mix(in_oklab,var(--color-primary)_55%,transparent)] underline-offset-4 hover:opacity-90';

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
        <span aria-hidden="true" className="ml-1 text-xs text-[var(--color-text-muted)]">
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
  pre: (props) => (
    <pre
      className="not-prose overflow-x-auto rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-muted)] p-4 text-sm"
      {...props}
    />
  ),
  code: ({ className, ...props }) => (
    <code
      className={
        className ??
        'rounded-md border border-[var(--color-border)] bg-[var(--color-surface-muted)] px-1 py-0.5 text-[0.9em]'
      }
      {...props}
    />
  ),
  blockquote: (props) => (
    <blockquote
      className="border-l-4 border-[color-mix(in_oklab,var(--color-primary)_40%,var(--color-border))] bg-[var(--color-surface)] px-4 py-1 text-[var(--color-text)]"
      {...props}
    />
  ),
  hr: (props) => <hr className="my-8 border-[var(--color-border)]" {...props} />,
  table: (props) => (
    <div className="not-prose my-6 overflow-x-auto">
      <table className="w-full border-collapse text-sm" {...props} />
    </div>
  ),
  th: (props) => (
    <th
      className="border border-[var(--color-border)] bg-[var(--color-surface-muted)] px-3 py-2 text-left font-semibold"
      {...props}
    />
  ),
  td: (props) => (
    <td className="border border-[var(--color-border)] px-3 py-2" {...props} />
  ),
};
