'use client';

import { useTranslations } from 'next-intl';
import { clsx } from 'clsx';
import type { CvData, CvFont, CvTemplate } from '@/src/lib/cv/types';
import { ACCENT_PRESETS, CV_FONTS, CV_TEMPLATES } from '@/src/lib/cv/types';
import type { CvUpdater } from '@/src/components/cv/EditorPanel';
import { IconButton } from '@/src/components/cv/fields';

const FONT_PREVIEW: Record<CvFont, string> = {
  sans: 'ui-sans-serif, system-ui, sans-serif',
  serif: "Georgia, 'Times New Roman', serif",
  mono: 'ui-monospace, Menlo, monospace',
};

function OptionButton({
  selected,
  onClick,
  children,
  style,
}: {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
  style?: React.CSSProperties;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      style={style}
      className={clsx(
        'btn btn-surface px-3 py-2',
        selected && 'border-primary bg-primary/12 text-text',
      )}
    >
      {children}
    </button>
  );
}

export function DesignPanel({ data, onChange }: { data: CvData; onChange: CvUpdater }) {
  const t = useTranslations('builder.design');
  const tCv = useTranslations('cv.sections');

  const setStyle = (changes: Partial<CvData['style']>) =>
    onChange((prev) => ({ ...prev, style: { ...prev.style, ...changes } }));

  const moveSection = (index: number, direction: -1 | 1) =>
    onChange((prev) => {
      const target = index + direction;
      if (target < 0 || target >= prev.sectionOrder.length) return prev;
      const order = [...prev.sectionOrder];
      [order[index], order[target]] = [order[target], order[index]];
      return { ...prev, sectionOrder: order };
    });

  return (
    <details className="glass-card rounded-2xl" open>
      <summary className="flex cursor-pointer select-none items-center justify-between gap-3 rounded-2xl px-5 py-4 text-sm font-semibold text-text list-none [&::-webkit-details-marker]:hidden focus-ring">
        <span>{t('title')}</span>
        <span aria-hidden="true" className="text-xs text-text-muted">
          ▾
        </span>
      </summary>

      <div className="space-y-5 border-t border-border-muted px-5 py-4">
        {/* Accent color */}
        <fieldset>
          <legend className="mb-2 text-xs font-medium text-text-muted">{t('accent')}</legend>
          <div className="flex flex-wrap items-center gap-2">
            {ACCENT_PRESETS.map((color) => (
              <button
                key={color}
                type="button"
                onClick={() => setStyle({ accent: color })}
                aria-pressed={data.style.accent === color}
                aria-label={`${t('accent')}: ${color}`}
                title={color}
                className={clsx(
                  'h-8 w-8 rounded-full border border-border transition-transform focus-ring',
                  data.style.accent === color
                    ? 'scale-110 ring-2 ring-focus ring-offset-2 ring-offset-bg'
                    : 'hover:scale-105',
                )}
                style={{ backgroundColor: color }}
              />
            ))}
            <label className="ml-1 inline-flex cursor-pointer items-center gap-2 text-xs text-text-muted">
              <input
                type="color"
                value={data.style.accent}
                onChange={(e) => setStyle({ accent: e.target.value })}
                aria-label={t('customColor')}
                className="h-8 w-8 cursor-pointer rounded-full border border-border bg-transparent p-0.5"
              />
              {t('customColor')}
            </label>
          </div>
        </fieldset>

        {/* Font */}
        <fieldset>
          <legend className="mb-2 text-xs font-medium text-text-muted">{t('font')}</legend>
          <div className="flex flex-wrap gap-2">
            {CV_FONTS.map((font) => (
              <OptionButton
                key={font}
                selected={data.style.font === font}
                onClick={() => setStyle({ font })}
                style={{ fontFamily: FONT_PREVIEW[font] }}
              >
                {t(`fonts.${font}`)}
              </OptionButton>
            ))}
          </div>
        </fieldset>

        {/* Template */}
        <fieldset>
          <legend className="mb-2 text-xs font-medium text-text-muted">{t('template')}</legend>
          <div className="flex flex-wrap gap-2">
            {CV_TEMPLATES.map((template: CvTemplate) => (
              <OptionButton
                key={template}
                selected={data.style.template === template}
                onClick={() => setStyle({ template })}
              >
                {t(`templates.${template}`)}
              </OptionButton>
            ))}
          </div>
        </fieldset>

        {/* Section order */}
        <fieldset>
          <legend className="mb-2 text-xs font-medium text-text-muted">{t('sectionOrder')}</legend>
          <ul className="space-y-1.5">
            {data.sectionOrder.map((key, index) => (
              <li
                key={key}
                className="flex items-center justify-between gap-3 rounded-lg border border-border-muted bg-surface-muted/50 px-3 py-1.5"
              >
                <span className="text-sm text-text">{tCv(key)}</span>
                <span className="flex gap-1">
                  <IconButton
                    label={t('moveSectionUp', { section: tCv(key) })}
                    onClick={() => moveSection(index, -1)}
                    disabled={index === 0}
                  >
                    ↑
                  </IconButton>
                  <IconButton
                    label={t('moveSectionDown', { section: tCv(key) })}
                    onClick={() => moveSection(index, 1)}
                    disabled={index === data.sectionOrder.length - 1}
                  >
                    ↓
                  </IconButton>
                </span>
              </li>
            ))}
          </ul>
        </fieldset>
      </div>
    </details>
  );
}
