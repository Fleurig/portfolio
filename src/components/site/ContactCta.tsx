import Link from 'next/link';

import { Card } from '@/src/components/ui/Card';

export function ContactCta({
  locale,
}: {
  locale: 'nl' | 'en';
}) {
  const isNl = locale === 'nl';

  return (
    <Card className="mt-12">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold tracking-tight text-[var(--color-card-text)]">
            {isNl ? 'Samenwerken?' : 'Want to work together?'}
          </h2>
          <p className="mt-1 text-sm text-[var(--color-card-text-muted)]">
            {isNl
              ? 'Stuur me een bericht via mail of LinkedIn.'
              : 'Send me a message via email or LinkedIn.'}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <a
            href="mailto:fleuralbers@live.nl"
            className="inline-flex items-center justify-center rounded-xl bg-[var(--color-text)] px-4 py-2 text-sm font-medium text-[var(--color-bg)] shadow-sm transition hover:opacity-90"
          >
            {isNl ? 'Mail' : 'Email'}
          </a>
          <a
            href="https://www.linkedin.com/in/fleuralbers/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-2 text-sm font-medium text-[var(--color-text)] shadow-sm transition hover:bg-[var(--color-surface-muted)]"
          >
            LinkedIn
            <span aria-hidden="true" className="ml-1 text-xs text-[var(--color-text-muted)]">
              ↗
            </span>
          </a>
          <Link
            href={`/${locale}/contact`}
            className="inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium text-[var(--color-text)] hover:bg-[var(--color-surface-muted)]"
          >
            {isNl ? 'Contact' : 'Contact'}
          </Link>
        </div>
      </div>
    </Card>
  );
}
