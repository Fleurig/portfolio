'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { clsx } from 'clsx';
import type { Locale } from '@/src/lib/i18n';
import type { CvData } from '@/src/lib/cv/types';
import { createEmptyCv, createSampleCv, isCvEmpty } from '@/src/lib/cv/defaults';
import { encodeCvToFragment } from '@/src/lib/cv/codec';
import { clearStoredCv, loadStoredCv, saveStoredCv } from '@/src/lib/cv/storage';
import { CvPreview } from '@/src/components/cv/CvPreview';
import { EditorPanel, type CvUpdater } from '@/src/components/cv/EditorPanel';
import { DesignPanel } from '@/src/components/cv/DesignPanel';
import { AdSlot } from '@/src/components/cv/AdSlot';

const AUTOSAVE_DELAY_MS = 400;

export function CvBuilder({ locale }: { locale: Locale }) {
  const t = useTranslations('builder');
  const [data, setData] = useState<CvData>(() => createEmptyCv());
  const [hydrated, setHydrated] = useState(false);
  const [mobileTab, setMobileTab] = useState<'edit' | 'preview'>('edit');
  const [shareUrl, setShareUrl] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const copyResetRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Load the locally stored CV after mount (SSR renders the empty state).
  useEffect(() => {
    let cancelled = false;
    Promise.resolve().then(() => {
      if (cancelled) return;
      const stored = loadStoredCv();
      if (stored) setData(stored);
      setHydrated(true);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  // Debounced autosave to localStorage.
  useEffect(() => {
    if (!hydrated) return;
    const id = setTimeout(() => saveStoredCv(data), AUTOSAVE_DELAY_MS);
    return () => clearTimeout(id);
  }, [data, hydrated]);

  const onChange: CvUpdater = useCallback((updater) => {
    setData(updater);
    setShareUrl(null); // an edited CV invalidates the last generated link
  }, []);

  const handleShare = async () => {
    const fragment = await encodeCvToFragment(data);
    const url = `${window.location.origin}/${locale}/shared#${fragment}`;
    setShareUrl(url);
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      if (copyResetRef.current) clearTimeout(copyResetRef.current);
      copyResetRef.current = setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false); // clipboard blocked — the link below can be copied manually
    }
  };

  const handleReset = () => {
    if (!isCvEmpty(data) && !window.confirm(t('resetConfirm'))) return;
    setData(createEmptyCv());
    clearStoredCv();
    setShareUrl(null);
  };

  const handleLoadSample = () => {
    if (!isCvEmpty(data) && !window.confirm(t('sampleConfirm'))) return;
    setData(createSampleCv(locale));
    setShareUrl(null);
  };

  return (
    <div>
      {/* Toolbar */}
      <div className="no-print glass-panel !p-4 sm:!p-5">
        <div className="flex flex-wrap items-center gap-2">
          <button type="button" onClick={() => window.print()} className="btn btn-surface px-4 py-2">
            {t('actions.downloadPdf')}
          </button>
          <button type="button" onClick={handleShare} className="btn btn-surface px-4 py-2">
            {copied ? t('actions.shareCopied') : t('actions.share')}
          </button>
          <button type="button" onClick={handleLoadSample} className="btn btn-surface px-4 py-2">
            {t('actions.loadSample')}
          </button>
          <button type="button" onClick={handleReset} className="btn btn-surface px-4 py-2">
            {t('actions.reset')}
          </button>
          <p className="ml-auto text-xs text-text-muted">
            <span aria-hidden="true">🔒</span> {t('autosaveNote')}
          </p>
        </div>

        {shareUrl ? (
          <div className="mt-4 rounded-xl border border-border-muted bg-surface-muted/60 p-3">
            <label htmlFor="cv-share-url" className="block text-xs font-medium text-text">
              {t('share.linkLabel')}
            </label>
            <input
              id="cv-share-url"
              readOnly
              value={shareUrl}
              onFocus={(e) => e.target.select()}
              className="mt-1.5 w-full rounded-lg border border-border bg-surface px-3 py-2 text-xs text-text focus-ring"
            />
            <p className="mt-2 text-xs leading-relaxed text-text-muted">{t('share.privacyNote')}</p>
          </div>
        ) : null}
      </div>

      {/* Mobile tab switch */}
      <div
        role="tablist"
        aria-label={t('tabs.label')}
        className="no-print mt-6 grid grid-cols-2 gap-2 lg:hidden"
      >
        {(['edit', 'preview'] as const).map((tab) => (
          <button
            key={tab}
            type="button"
            role="tab"
            aria-selected={mobileTab === tab}
            onClick={() => setMobileTab(tab)}
            className={clsx(
              'btn btn-surface py-2.5',
              mobileTab === tab && 'border-primary bg-primary/12',
            )}
          >
            {t(`tabs.${tab}`)}
          </button>
        ))}
      </div>

      <div className="mt-6 grid items-start gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
        {/* Editor + design */}
        <div
          className={clsx('no-print space-y-4', mobileTab === 'preview' && 'hidden lg:block')}
        >
          <EditorPanel data={data} onChange={onChange} />
          <DesignPanel data={data} onChange={onChange} />
          <AdSlot />
        </div>

        {/* Live preview */}
        <div
          className={clsx(
            'print-force-block lg:sticky lg:top-20',
            mobileTab === 'edit' && 'hidden lg:block',
          )}
        >
          <p className="no-print mb-3 text-xs font-medium uppercase tracking-wide text-text-muted">
            {t('previewLabel')}
          </p>
          <CvPreview data={data} />
        </div>
      </div>
    </div>
  );
}
