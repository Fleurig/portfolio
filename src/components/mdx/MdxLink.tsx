import Link from 'next/link';
import type { ComponentProps } from 'react';

function isExternalHref(href: string) {
  // Treat protocol-relative, http(s), mailto, tel as external.
  return (
    href.startsWith('http://') ||
    href.startsWith('https://') ||
    href.startsWith('//') ||
    href.startsWith('mailto:') ||
    href.startsWith('tel:')
  );
}

export function MdxLink({
  href = '',
  children,
  ...props
}: ComponentProps<'a'>) {
  const external = isExternalHref(href);

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="font-medium text-[var(--color-text)] underline decoration-[color-mix(in_oklab,var(--color-primary)_55%,transparent)] underline-offset-4 hover:opacity-90"
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
    <Link
      href={href}
      className="font-medium text-[var(--color-text)] underline decoration-[color-mix(in_oklab,var(--color-primary)_55%,transparent)] underline-offset-4 hover:opacity-90"
    >
      {children}
    </Link>
  );
}
