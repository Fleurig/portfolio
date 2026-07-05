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

export function SharedCvViewer({ locale }: { locale: Locale }) {
  const t = useTranslations('shared');
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

  if (state.status === 'loading') {
    return <p className="py-16 text-center text-sm text-text-muted">{t('loading')}</p>;
  }

  if (state.status === 'invalid') {
    return (
      <div className="glass-panel text-center">
        <h1 className="text-2xl font-semibold tracking-tight text-text">{t('invalidTitle')}</h1>
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
    );
  }

  const handleUseInEditor = () => {
    const stored = loadStoredCv();
    if (stored && !isCvEmpty(stored) && !window.confirm(t('useInEditorConfirm'))) return;
    saveStoredCv(state.data);
    router.push(`/${locale}/builder`);
  };

  return (
    <div>
      <div className="no-print glass-panel !p-4 sm:!p-5">
        <p className="text-sm leading-relaxed text-text-muted">
          <span aria-hidden="true">🔒</span> {t('notice')}
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          <button type="button" onClick={() => window.print()} className="btn btn-surface px-4 py-2">
            {t('downloadPdf')}
          </button>
          <button type="button" onClick={handleUseInEditor} className="btn btn-surface px-4 py-2">
            {t('useInEditor')}
          </button>
          <Link href={`/${locale}/builder`} className="btn btn-surface px-4 py-2">
            {t('createOwn')}
          </Link>
        </div>
      </div>

      <div className="mt-8">
        <CvPreview data={state.data} />
      </div>
    </div>
  );
}
