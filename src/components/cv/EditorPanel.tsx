'use client';

import type { ReactNode } from 'react';
import { useTranslations } from 'next-intl';
import type { CvData, CvEntry } from '@/src/lib/cv/types';
import { newId } from '@/src/lib/cv/types';
import { AddButton, IconButton, LabeledInput, LabeledTextarea } from '@/src/components/cv/fields';

export type CvUpdater = (updater: (prev: CvData) => CvData) => void;

function moveItem<T>(items: T[], index: number, direction: -1 | 1): T[] {
  const target = index + direction;
  if (target < 0 || target >= items.length) return items;
  const next = [...items];
  [next[index], next[target]] = [next[target], next[index]];
  return next;
}

function EditorSection({
  title,
  count,
  defaultOpen,
  children,
}: {
  title: string;
  count?: number;
  defaultOpen?: boolean;
  children: ReactNode;
}) {
  return (
    <details className="glass-card rounded-2xl" open={defaultOpen}>
      <summary className="flex cursor-pointer select-none items-center justify-between gap-3 rounded-2xl px-5 py-4 text-sm font-semibold text-text list-none [&::-webkit-details-marker]:hidden focus-ring">
        <span>{title}</span>
        <span className="flex items-center gap-2">
          {count ? (
            <span className="rounded-full bg-primary/12 px-2 py-0.5 text-xs font-medium text-primary">
              {count}
            </span>
          ) : null}
          <span aria-hidden="true" className="text-xs text-text-muted">
            ▾
          </span>
        </span>
      </summary>
      <div className="space-y-4 border-t border-border-muted px-5 py-4">{children}</div>
    </details>
  );
}

/** Card around one list item (a job, a study, …) with move/remove controls. */
function ItemCard({
  index,
  total,
  onMove,
  onRemove,
  moveUpLabel,
  moveDownLabel,
  removeLabel,
  children,
}: {
  index: number;
  total: number;
  onMove: (direction: -1 | 1) => void;
  onRemove: () => void;
  moveUpLabel: string;
  moveDownLabel: string;
  removeLabel: string;
  children: ReactNode;
}) {
  return (
    <div className="rounded-xl border border-border-muted bg-surface-muted/50 p-4">
      <div className="mb-3 flex items-center justify-end gap-1.5">
        <IconButton label={moveUpLabel} onClick={() => onMove(-1)} disabled={index === 0}>
          ↑
        </IconButton>
        <IconButton
          label={moveDownLabel}
          onClick={() => onMove(1)}
          disabled={index === total - 1}
        >
          ↓
        </IconButton>
        <IconButton label={removeLabel} onClick={onRemove}>
          ✕
        </IconButton>
      </div>
      {children}
    </div>
  );
}

function emptyEntry(): CvEntry {
  return { id: newId(), title: '', organization: '', location: '', start: '', end: '', description: '' };
}

function EntryListEditor({
  entries,
  onEntriesChange,
  titleLabel,
  organizationLabel,
  addLabel,
}: {
  entries: CvEntry[];
  onEntriesChange: (entries: CvEntry[]) => void;
  titleLabel: string;
  organizationLabel: string;
  addLabel: string;
}) {
  const t = useTranslations('builder');

  const patch = (id: string, changes: Partial<CvEntry>) =>
    onEntriesChange(entries.map((e) => (e.id === id ? { ...e, ...changes } : e)));

  return (
    <>
      {entries.map((entry, index) => (
        <ItemCard
          key={entry.id}
          index={index}
          total={entries.length}
          onMove={(dir) => onEntriesChange(moveItem(entries, index, dir))}
          onRemove={() => onEntriesChange(entries.filter((e) => e.id !== entry.id))}
          moveUpLabel={t('actions.moveUp')}
          moveDownLabel={t('actions.moveDown')}
          removeLabel={t('actions.remove')}
        >
          <div className="grid gap-3 sm:grid-cols-2">
            <LabeledInput
              label={titleLabel}
              value={entry.title}
              onChange={(v) => patch(entry.id, { title: v })}
            />
            <LabeledInput
              label={organizationLabel}
              value={entry.organization}
              onChange={(v) => patch(entry.id, { organization: v })}
            />
            <LabeledInput
              label={t('fields.location')}
              value={entry.location}
              onChange={(v) => patch(entry.id, { location: v })}
            />
            <div className="grid grid-cols-2 gap-3">
              <LabeledInput
                label={t('fields.start')}
                value={entry.start}
                onChange={(v) => patch(entry.id, { start: v })}
                placeholder={t('fields.startPlaceholder')}
              />
              <LabeledInput
                label={t('fields.end')}
                value={entry.end}
                onChange={(v) => patch(entry.id, { end: v })}
                placeholder={t('fields.endPlaceholder')}
              />
            </div>
            <LabeledTextarea
              label={t('fields.description')}
              value={entry.description}
              onChange={(v) => patch(entry.id, { description: v })}
              rows={3}
              className="sm:col-span-2"
            />
          </div>
        </ItemCard>
      ))}
      <AddButton label={addLabel} onClick={() => onEntriesChange([...entries, emptyEntry()])} />
    </>
  );
}

export function EditorPanel({ data, onChange }: { data: CvData; onChange: CvUpdater }) {
  const t = useTranslations('builder');

  const patchProfile = (changes: Partial<CvData['profile']>) =>
    onChange((prev) => ({ ...prev, profile: { ...prev.profile, ...changes } }));

  return (
    <div className="space-y-4">
      {/* Personal details */}
      <EditorSection title={t('sections.profile')} defaultOpen>
        <div className="grid gap-3 sm:grid-cols-2">
          <LabeledInput
            label={t('fields.fullName')}
            value={data.profile.fullName}
            onChange={(v) => patchProfile({ fullName: v })}
          />
          <LabeledInput
            label={t('fields.headline')}
            value={data.profile.headline}
            onChange={(v) => patchProfile({ headline: v })}
            placeholder={t('fields.headlinePlaceholder')}
          />
          <LabeledInput
            label={t('fields.email')}
            value={data.profile.email}
            onChange={(v) => patchProfile({ email: v })}
            type="email"
          />
          <LabeledInput
            label={t('fields.phone')}
            value={data.profile.phone}
            onChange={(v) => patchProfile({ phone: v })}
            type="tel"
          />
          <LabeledInput
            label={t('fields.location')}
            value={data.profile.location}
            onChange={(v) => patchProfile({ location: v })}
          />
          <LabeledInput
            label={t('fields.website')}
            value={data.profile.website}
            onChange={(v) => patchProfile({ website: v })}
          />
        </div>
      </EditorSection>

      {/* Summary */}
      <EditorSection title={t('sections.summary')}>
        <LabeledTextarea
          label={t('fields.summary')}
          value={data.profile.summary}
          onChange={(v) => patchProfile({ summary: v })}
          rows={5}
          placeholder={t('fields.summaryPlaceholder')}
        />
      </EditorSection>

      {/* Experience */}
      <EditorSection title={t('sections.experience')} count={data.experience.length}>
        <EntryListEditor
          entries={data.experience}
          onEntriesChange={(experience) => onChange((prev) => ({ ...prev, experience }))}
          titleLabel={t('fields.role')}
          organizationLabel={t('fields.company')}
          addLabel={t('actions.addExperience')}
        />
      </EditorSection>

      {/* Education */}
      <EditorSection title={t('sections.education')} count={data.education.length}>
        <EntryListEditor
          entries={data.education}
          onEntriesChange={(education) => onChange((prev) => ({ ...prev, education }))}
          titleLabel={t('fields.degree')}
          organizationLabel={t('fields.school')}
          addLabel={t('actions.addEducation')}
        />
      </EditorSection>

      {/* Skills */}
      <EditorSection title={t('sections.skills')} count={data.skills.length}>
        {data.skills.map((skill, index) => (
          <div key={skill.id} className="flex items-end gap-1.5">
            <LabeledInput
              label={`${t('fields.skill')} ${index + 1}`}
              value={skill.name}
              onChange={(v) =>
                onChange((prev) => ({
                  ...prev,
                  skills: prev.skills.map((s) => (s.id === skill.id ? { ...s, name: v } : s)),
                }))
              }
              className="flex-1"
            />
            <IconButton
              label={t('actions.remove')}
              onClick={() =>
                onChange((prev) => ({
                  ...prev,
                  skills: prev.skills.filter((s) => s.id !== skill.id),
                }))
              }
            >
              ✕
            </IconButton>
          </div>
        ))}
        <AddButton
          label={t('actions.addSkill')}
          onClick={() =>
            onChange((prev) => ({ ...prev, skills: [...prev.skills, { id: newId(), name: '' }] }))
          }
        />
      </EditorSection>

      {/* Languages */}
      <EditorSection title={t('sections.languages')} count={data.languages.length}>
        {data.languages.map((lang) => (
          <div key={lang.id} className="flex items-end gap-1.5">
            <LabeledInput
              label={t('fields.language')}
              value={lang.name}
              onChange={(v) =>
                onChange((prev) => ({
                  ...prev,
                  languages: prev.languages.map((l) => (l.id === lang.id ? { ...l, name: v } : l)),
                }))
              }
              className="flex-1"
            />
            <LabeledInput
              label={t('fields.level')}
              value={lang.level}
              onChange={(v) =>
                onChange((prev) => ({
                  ...prev,
                  languages: prev.languages.map((l) => (l.id === lang.id ? { ...l, level: v } : l)),
                }))
              }
              placeholder={t('fields.levelPlaceholder')}
              className="flex-1"
            />
            <IconButton
              label={t('actions.remove')}
              onClick={() =>
                onChange((prev) => ({
                  ...prev,
                  languages: prev.languages.filter((l) => l.id !== lang.id),
                }))
              }
            >
              ✕
            </IconButton>
          </div>
        ))}
        <AddButton
          label={t('actions.addLanguage')}
          onClick={() =>
            onChange((prev) => ({
              ...prev,
              languages: [...prev.languages, { id: newId(), name: '', level: '' }],
            }))
          }
        />
      </EditorSection>

      {/* Links */}
      <EditorSection title={t('sections.links')} count={data.links.length}>
        {data.links.map((link) => (
          <div key={link.id} className="flex items-end gap-1.5">
            <LabeledInput
              label={t('fields.linkLabel')}
              value={link.label}
              onChange={(v) =>
                onChange((prev) => ({
                  ...prev,
                  links: prev.links.map((l) => (l.id === link.id ? { ...l, label: v } : l)),
                }))
              }
              placeholder="LinkedIn"
              className="flex-1"
            />
            <LabeledInput
              label={t('fields.linkUrl')}
              value={link.url}
              onChange={(v) =>
                onChange((prev) => ({
                  ...prev,
                  links: prev.links.map((l) => (l.id === link.id ? { ...l, url: v } : l)),
                }))
              }
              placeholder="linkedin.com/in/…"
              className="flex-1"
            />
            <IconButton
              label={t('actions.remove')}
              onClick={() =>
                onChange((prev) => ({
                  ...prev,
                  links: prev.links.filter((l) => l.id !== link.id),
                }))
              }
            >
              ✕
            </IconButton>
          </div>
        ))}
        <AddButton
          label={t('actions.addLink')}
          onClick={() =>
            onChange((prev) => ({
              ...prev,
              links: [...prev.links, { id: newId(), label: '', url: '' }],
            }))
          }
        />
      </EditorSection>
    </div>
  );
}
