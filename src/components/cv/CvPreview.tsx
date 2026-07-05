'use client';

import type { CSSProperties, ReactNode } from 'react';
import { useTranslations } from 'next-intl';
import { clsx } from 'clsx';
import type { CvData, CvEntry, CvFont, SectionKey } from '@/src/lib/cv/types';

/** The CV renders as a light "paper" sheet with fixed colors, independent of
 *  the site theme, so what you see on screen is what prints. */

const FONT_STACKS: Record<CvFont, string> = {
  sans: "var(--font-inter), ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
  serif: "Georgia, 'Iowan Old Style', 'Times New Roman', serif",
  mono: "ui-monospace, 'SF Mono', Menlo, Consolas, 'Liberation Mono', monospace",
};

const SIDEBAR_SECTIONS: readonly SectionKey[] = ['skills', 'languages', 'links'];

function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <h2
      className="border-b pb-1 text-[11px] font-semibold uppercase tracking-[0.14em]"
      style={{
        color: 'var(--cv-accent)',
        borderColor: 'color-mix(in srgb, var(--cv-accent) 35%, transparent)',
      }}
    >
      {children}
    </h2>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="print-break-avoid">
      <SectionTitle>{title}</SectionTitle>
      <div className="mt-2.5">{children}</div>
    </section>
  );
}

function dateRange(entry: CvEntry): string {
  if (entry.start && entry.end) return `${entry.start} – ${entry.end}`;
  return entry.start || entry.end;
}

function EntryList({ entries }: { entries: CvEntry[] }) {
  return (
    <div className="space-y-4">
      {entries.map((entry) => (
        <article key={entry.id} className="print-break-avoid">
          <div className="flex flex-wrap items-baseline justify-between gap-x-4">
            <h3 className="text-sm font-semibold text-gray-900">{entry.title}</h3>
            {dateRange(entry) ? (
              <span className="text-xs text-gray-500">{dateRange(entry)}</span>
            ) : null}
          </div>
          {entry.organization || entry.location ? (
            <p className="mt-0.5 text-[13px] font-medium" style={{ color: 'var(--cv-accent)' }}>
              {[entry.organization, entry.location].filter(Boolean).join(' · ')}
            </p>
          ) : null}
          {entry.description ? (
            <p className="mt-1 whitespace-pre-line text-[13px] leading-relaxed text-gray-600">
              {entry.description}
            </p>
          ) : null}
        </article>
      ))}
    </div>
  );
}

function externalHref(url: string): string {
  return /^https?:\/\//i.test(url) ? url : `https://${url}`;
}

export function CvPreview({ data, className }: { data: CvData; className?: string }) {
  const t = useTranslations('cv');
  const { profile, style } = data;

  const sheetStyle = {
    '--cv-accent': style.accent,
    fontFamily: FONT_STACKS[style.font],
  } as CSSProperties;

  const contactItems = [profile.email, profile.phone, profile.location, profile.website].filter(
    Boolean,
  );

  const hasContent: Record<SectionKey, boolean> = {
    summary: Boolean(profile.summary),
    experience: data.experience.length > 0,
    education: data.education.length > 0,
    skills: data.skills.some((s) => s.name),
    languages: data.languages.some((l) => l.name),
    links: data.links.some((l) => l.label || l.url),
  };

  const renderSection = (key: SectionKey): ReactNode => {
    if (!hasContent[key]) return null;
    switch (key) {
      case 'summary':
        return (
          <Section key={key} title={t('sections.summary')}>
            <p className="whitespace-pre-line text-[13px] leading-relaxed text-gray-600">
              {profile.summary}
            </p>
          </Section>
        );
      case 'experience':
        return (
          <Section key={key} title={t('sections.experience')}>
            <EntryList entries={data.experience} />
          </Section>
        );
      case 'education':
        return (
          <Section key={key} title={t('sections.education')}>
            <EntryList entries={data.education} />
          </Section>
        );
      case 'skills':
        return (
          <Section key={key} title={t('sections.skills')}>
            <ul className="flex flex-wrap gap-1.5">
              {data.skills
                .filter((s) => s.name)
                .map((skill) => (
                  <li
                    key={skill.id}
                    className="rounded-md px-2 py-0.5 text-xs font-medium text-gray-800"
                    style={{
                      backgroundColor: 'color-mix(in srgb, var(--cv-accent) 10%, white)',
                      border: '1px solid color-mix(in srgb, var(--cv-accent) 25%, transparent)',
                    }}
                  >
                    {skill.name}
                  </li>
                ))}
            </ul>
          </Section>
        );
      case 'languages':
        return (
          <Section key={key} title={t('sections.languages')}>
            <ul className="space-y-1">
              {data.languages
                .filter((l) => l.name)
                .map((lang) => (
                  <li
                    key={lang.id}
                    className="flex flex-wrap items-baseline justify-between gap-x-4 text-[13px]"
                  >
                    <span className="font-medium text-gray-900">{lang.name}</span>
                    <span className="text-gray-500">{lang.level}</span>
                  </li>
                ))}
            </ul>
          </Section>
        );
      case 'links':
        return (
          <Section key={key} title={t('sections.links')}>
            <ul className="space-y-1">
              {data.links
                .filter((l) => l.label || l.url)
                .map((link) => (
                  <li key={link.id} className="text-[13px] leading-relaxed">
                    {link.label ? (
                      <span className="font-medium text-gray-900">{link.label} — </span>
                    ) : null}
                    {link.url ? (
                      <a
                        href={externalHref(link.url)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="break-all underline underline-offset-2"
                        style={{ color: 'var(--cv-accent)' }}
                      >
                        {link.url}
                      </a>
                    ) : null}
                  </li>
                ))}
            </ul>
          </Section>
        );
    }
  };

  const header = (
    <header>
      <h1 className="text-3xl font-bold tracking-tight text-gray-900">
        {profile.fullName || t('preview.namePlaceholder')}
      </h1>
      {profile.headline ? (
        <p className="mt-1 text-base font-medium" style={{ color: 'var(--cv-accent)' }}>
          {profile.headline}
        </p>
      ) : null}
      {contactItems.length > 0 ? (
        <p className="mt-2 text-xs leading-relaxed text-gray-500">{contactItems.join('  ·  ')}</p>
      ) : null}
    </header>
  );

  if (style.template === 'sidebar') {
    const sidebarSections = data.sectionOrder.filter((key) => SIDEBAR_SECTIONS.includes(key));
    const mainSections = data.sectionOrder.filter((key) => !SIDEBAR_SECTIONS.includes(key));
    return (
      <div className={clsx('cv-sheet', className)} style={sheetStyle}>
        {header}
        <div className="mt-6 grid grid-cols-[minmax(0,3fr)_minmax(0,7fr)] gap-6">
          <aside
            className="space-y-6 rounded-lg p-4"
            style={{ backgroundColor: 'color-mix(in srgb, var(--cv-accent) 6%, white)' }}
          >
            {sidebarSections.map(renderSection)}
          </aside>
          <div className="space-y-6">{mainSections.map(renderSection)}</div>
        </div>
      </div>
    );
  }

  return (
    <div className={clsx('cv-sheet', className)} style={sheetStyle}>
      {header}
      <div className="mt-6 space-y-6">{data.sectionOrder.map(renderSection)}</div>
    </div>
  );
}
