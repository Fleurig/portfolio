import Link from 'next/link';

import type { Locale } from '@/src/lib/i18n';
import { t } from '@/src/lib/translations';

export function PageHeader({
  locale,
  title,
  backHref,
}: {
  locale: Locale;
  title?: string;
  backHref?: string;
}) {
  const tr = t(locale);

  return (
    <div className="flex flex-col gap-3">
      {backHref ? (
        <Link
          href={backHref}
          className="inline-flex w-fit items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-sm font-medium text-text-muted transition-all duration-200 hover:bg-surface-muted hover:text-text active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
        >
          <svg aria-hidden="true" width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10 12L6 8l4-4" />
          </svg>
          <span>{tr.nav.back}</span>
        </Link>
      ) : null}

      {title ? (
        <h1 className="text-2xl font-semibold tracking-tight text-card-text">
          {title}
        </h1>
      ) : null}
    </div>
  );
}
