'use client';

import { useTranslations } from 'next-intl';

/** Placeholder for a future, deliberately low-key ad slot that covers hosting
 *  costs. Flip this on once an ad provider is chosen — the promise is: clearly
 *  labeled, no tracking-heavy networks, never interrupting the editor. */
const ADS_ENABLED = false;

export function AdSlot() {
  const t = useTranslations('ads');

  if (!ADS_ENABLED) return null;

  return (
    <aside
      aria-label={t('label')}
      className="no-print rounded-2xl border border-dashed border-border p-4 text-center"
    >
      <p className="text-[10px] font-medium uppercase tracking-wide text-text-muted">
        {t('label')}
      </p>
      <p className="mt-1 text-xs text-text-muted">{t('note')}</p>
    </aside>
  );
}
