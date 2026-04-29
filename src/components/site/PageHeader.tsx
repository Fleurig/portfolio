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
          className="inline-flex w-fit items-center gap-2 rounded-lg px-2 py-1 text-sm font-medium text-[var(--color-text-muted)] hover:bg-[var(--color-surface-muted)] hover:text-[var(--color-text)]"
        >
          <span aria-hidden="true">←</span>
          <span>{tr.nav.back}</span>
        </Link>
      ) : null}

      {title ? (
        <h1 className="text-2xl font-semibold tracking-tight text-[var(--color-text)]">
          {title}
        </h1>
      ) : null}
    </div>
  );
}
