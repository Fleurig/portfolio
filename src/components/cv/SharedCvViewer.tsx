'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import type { Locale } from '@/src/lib/i18n';
import type { CvData } from '@/src/lib/cv/types';
import { decodeCvFromFragment } from '@/src/lib/cv/codec';
import { isCvEmpty } from '@/src/lib/cv/defaults';
import { loadStoredCv, saveStoredCv } from '@/src/lib/cv/storage';
import { CvPreview } from '@/src/components/cv/CvPreview';

type ViewerState =
  | { status: 'loading' }
  | { status: 'ready'; data: CvData }
  | { status: 'invalid' };

/** Renders a shared link as the CV document itself: a slim, unobtrusive
 *  action bar on top and the sheet centered on a plain background. */
export function SharedCvViewer({ locale }: { locale: Locale }) {
  const t = useTranslations('shared');
  const tPlatform = useTranslations('platform');
  const router = useRouter();
  const [state, setState] = useState<ViewerState>({ status: 'loading' });

  useEffect(() => {
    let cancelled = false;
    const fragment = window.location.hash.slice(1);
    const decoded = fragment ? decodeCvFromFragment(fragment) : Promise.resolve(null);
    decoded.then((data) => {
      if (cancelled) return;
      setState(data ? { status: 'ready', data } : { status: 'invalid' });
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const handleUseInEditor = () => {
    if (state.status !== 'ready') return;
    const stored = loadStoredCv();
    if (stored && !isCvEmpty(stored) && !window.confirm(t('useInEditorConfirm'))) return;
    saveStoredCv(state.data);
    router.push(`/${locale}/builder`);
  };

  return (
    <div className="min-h-dvh">
      {/* Slim action bar — intentionally quiet so the CV is the page */}
      <header className="no-print sticky top-0 z-10 border-b border-border-muted bg-bg/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-between gap-2 px-4 py-2">
          <Link
            href={`/${locale}`}
            className="text-sm font-semibold tracking-tight text-text-muted transition-opacity hover:opacity-70"
          >
            {tPlatform('name')}
          </Link>
          {state.status === 'ready' ? (
            <div className="flex flex-wrap gap-1.5">
              <button
                type="button"
                onClick={() => window.print()}
                className="btn btn-surface px-3 py-1.5"
              >
                {t('downloadPdf')}
              </button>
              <button
                type="button"
                onClick={handleUseInEditor}
                className="btn btn-surface px-3 py-1.5"
              >
                {t('useInEditor')}
              </button>
              <Link href={`/${locale}/builder`} className="btn btn-surface px-3 py-1.5">
                {t('createOwn')}
              </Link>
            </div>
          ) : null}
        </div>
      </header>

      <main className="print-reset-pad mx-auto max-w-4xl px-4 py-8 sm:py-12">
        {state.status === 'loading' ? (
          <p className="py-16 text-center text-sm text-text-muted">{t('loading')}</p>
        ) : null}

        {state.status === 'invalid' ? (
          <div className="glass-panel mx-auto max-w-lg text-center">
            <h1 className="text-2xl font-semibold tracking-tight text-text">
              {t('invalidTitle')}
            </h1>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-text-muted">
              {t('invalidBody')}
            </p>
            <div className="mt-6 flex justify-center">
              <Link
                href={`/${locale}/builder`}
                className="btn btn-surface px-4 py-2 text-sm font-medium"
              >
                {t('createOwn')}
              </Link>
            </div>
          </div>
        ) : null}

        {state.status === 'ready' ? (
          <>
            <CvPreview data={state.data} />
            <p className="no-print mt-5 text-center text-xs text-text-muted">
              <span aria-hidden="true">🔒</span> {t('notice')}
            </p>
          </>
        ) : null}
      </main>
    </div>
  );
}
