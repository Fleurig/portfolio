/** Data model for the CV builder. Everything lives client-side (localStorage
 *  or the URL fragment of a share link) — there is no server storage. */

export const SECTION_KEYS = [
  'summary',
  'experience',
  'education',
  'skills',
  'languages',
  'links',
] as const;
export type SectionKey = (typeof SECTION_KEYS)[number];

export const CV_FONTS = ['sans', 'serif', 'mono'] as const;
export type CvFont = (typeof CV_FONTS)[number];

export const CV_TEMPLATES = ['classic', 'sidebar'] as const;
export type CvTemplate = (typeof CV_TEMPLATES)[number];

export interface CvProfile {
  fullName: string;
  headline: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  summary: string;
}

/** Shared shape for experience and education entries. */
export interface CvEntry {
  id: string;
  title: string;
  organization: string;
  location: string;
  start: string;
  end: string;
  description: string;
}

export interface CvSkill {
  id: string;
  name: string;
}

export interface CvLanguage {
  id: string;
  name: string;
  level: string;
}

export interface CvLink {
  id: string;
  label: string;
  url: string;
}

export interface CvStyle {
  accent: string;
  font: CvFont;
  template: CvTemplate;
}

export interface CvData {
  version: 1;
  profile: CvProfile;
  experience: CvEntry[];
  education: CvEntry[];
  skills: CvSkill[];
  languages: CvLanguage[];
  links: CvLink[];
  sectionOrder: SectionKey[];
  style: CvStyle;
}

export const ACCENT_PRESETS = [
  '#7c3aed', // violet (site brand)
  '#2563eb', // blue
  '#0d9488', // teal
  '#16a34a', // green
  '#d97706', // amber
  '#e11d48', // rose
  '#334155', // slate
  '#111827', // near-black
] as const;

export function newId(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }
  return `id-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}
