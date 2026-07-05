import type {
  CvData,
  CvEntry,
  CvFont,
  CvLanguage,
  CvLink,
  CvProfile,
  CvSkill,
  CvStyle,
  CvTemplate,
  SectionKey,
} from '@/src/lib/cv/types';
import { ACCENT_PRESETS, CV_FONTS, CV_TEMPLATES, SECTION_KEYS, newId } from '@/src/lib/cv/types';

export function createEmptyCv(): CvData {
  return {
    version: 1,
    profile: {
      fullName: '',
      headline: '',
      email: '',
      phone: '',
      location: '',
      website: '',
      summary: '',
    },
    experience: [],
    education: [],
    skills: [],
    languages: [],
    links: [],
    sectionOrder: [...SECTION_KEYS],
    style: {
      accent: ACCENT_PRESETS[0],
      font: 'sans',
      template: 'classic',
    },
  };
}

export function isCvEmpty(data: CvData): boolean {
  return JSON.stringify(data) === JSON.stringify(createEmptyCv());
}

/* ── Normalization ──────────────────────────────────────────────────
   Stored and shared CVs come from untrusted places (localStorage, URL
   fragments), so every field is coerced back into the expected shape. */

function asString(value: unknown): string {
  return typeof value === 'string' ? value : '';
}

function asRecord(value: unknown): Record<string, unknown> {
  return typeof value === 'object' && value !== null ? (value as Record<string, unknown>) : {};
}

function asArray(value: unknown): unknown[] {
  return Array.isArray(value) ? value : [];
}

function normalizeProfile(value: unknown): CvProfile {
  const raw = asRecord(value);
  return {
    fullName: asString(raw.fullName),
    headline: asString(raw.headline),
    email: asString(raw.email),
    phone: asString(raw.phone),
    location: asString(raw.location),
    website: asString(raw.website),
    summary: asString(raw.summary),
  };
}

function normalizeEntry(value: unknown): CvEntry {
  const raw = asRecord(value);
  return {
    id: asString(raw.id) || newId(),
    title: asString(raw.title),
    organization: asString(raw.organization),
    location: asString(raw.location),
    start: asString(raw.start),
    end: asString(raw.end),
    description: asString(raw.description),
  };
}

function normalizeSkill(value: unknown): CvSkill {
  const raw = asRecord(value);
  return { id: asString(raw.id) || newId(), name: asString(raw.name) };
}

function normalizeLanguage(value: unknown): CvLanguage {
  const raw = asRecord(value);
  return {
    id: asString(raw.id) || newId(),
    name: asString(raw.name),
    level: asString(raw.level),
  };
}

function normalizeLink(value: unknown): CvLink {
  const raw = asRecord(value);
  return {
    id: asString(raw.id) || newId(),
    label: asString(raw.label),
    url: asString(raw.url),
  };
}

function normalizeSectionOrder(value: unknown): SectionKey[] {
  const seen = new Set<SectionKey>();
  const order: SectionKey[] = [];
  for (const item of asArray(value)) {
    if (
      typeof item === 'string' &&
      (SECTION_KEYS as readonly string[]).includes(item) &&
      !seen.has(item as SectionKey)
    ) {
      seen.add(item as SectionKey);
      order.push(item as SectionKey);
    }
  }
  for (const key of SECTION_KEYS) {
    if (!seen.has(key)) order.push(key);
  }
  return order;
}

function normalizeStyle(value: unknown): CvStyle {
  const raw = asRecord(value);
  const accent = asString(raw.accent);
  const font = asString(raw.font);
  const template = asString(raw.template);
  return {
    // Accents are injected into inline styles, so only accept a strict hex color.
    accent: /^#[0-9a-fA-F]{6}$/.test(accent) ? accent : ACCENT_PRESETS[0],
    font: (CV_FONTS as readonly string[]).includes(font) ? (font as CvFont) : 'sans',
    template: (CV_TEMPLATES as readonly string[]).includes(template)
      ? (template as CvTemplate)
      : 'classic',
  };
}

/** Coerces unknown input into a valid CvData, or returns null when the input
 *  is not even object-shaped. */
export function normalizeCvData(value: unknown): CvData | null {
  if (typeof value !== 'object' || value === null) return null;
  const raw = value as Record<string, unknown>;
  return {
    version: 1,
    profile: normalizeProfile(raw.profile),
    experience: asArray(raw.experience).map(normalizeEntry),
    education: asArray(raw.education).map(normalizeEntry),
    skills: asArray(raw.skills).map(normalizeSkill),
    languages: asArray(raw.languages).map(normalizeLanguage),
    links: asArray(raw.links).map(normalizeLink),
    sectionOrder: normalizeSectionOrder(raw.sectionOrder),
    style: normalizeStyle(raw.style),
  };
}

/* ── Sample CV ────────────────────────────────────────────────────── */

export function createSampleCv(locale: 'nl' | 'en'): CvData {
  const nl = locale === 'nl';
  const base = createEmptyCv();
  return {
    ...base,
    profile: {
      fullName: 'Alex Jansen',
      headline: nl ? 'Front-end Developer' : 'Front-end Developer',
      email: 'alex.jansen@example.com',
      phone: '+31 6 12 34 56 78',
      location: nl ? 'Utrecht, Nederland' : 'Utrecht, the Netherlands',
      website: 'alexjansen.example.com',
      summary: nl
        ? 'Front-end developer met vijf jaar ervaring in het bouwen van toegankelijke webapplicaties. Sterk in React, design systems en het vertalen van ontwerp naar soepele, snelle interfaces.'
        : 'Front-end developer with five years of experience building accessible web applications. Strong in React, design systems, and turning designs into smooth, fast interfaces.',
    },
    experience: [
      {
        id: newId(),
        title: nl ? 'Front-end Developer' : 'Front-end Developer',
        organization: 'Studio Noord',
        location: 'Amsterdam',
        start: '2022',
        end: nl ? 'heden' : 'present',
        description: nl
          ? 'Bouwde een component-bibliotheek die door drie productteams wordt gebruikt. Verbeterde de laadtijd van de belangrijkste pagina met 40%.'
          : 'Built a component library used by three product teams. Improved load time of the main page by 40%.',
      },
      {
        id: newId(),
        title: nl ? 'Junior Developer' : 'Junior Developer',
        organization: 'Webbureau De Brug',
        location: 'Utrecht',
        start: '2019',
        end: '2022',
        description: nl
          ? 'Ontwikkelde websites en webshops voor klanten in retail en cultuur.'
          : 'Developed websites and web shops for clients in retail and culture.',
      },
    ],
    education: [
      {
        id: newId(),
        title: nl ? 'HBO-ICT, Software Engineering' : 'BSc ICT, Software Engineering',
        organization: nl ? 'Hogeschool Utrecht' : 'University of Applied Sciences Utrecht',
        location: 'Utrecht',
        start: '2015',
        end: '2019',
        description: '',
      },
    ],
    skills: ['React', 'TypeScript', 'Next.js', 'CSS', 'Accessibility', 'Git'].map((name) => ({
      id: newId(),
      name,
    })),
    languages: [
      { id: newId(), name: nl ? 'Nederlands' : 'Dutch', level: nl ? 'Moedertaal' : 'Native' },
      { id: newId(), name: nl ? 'Engels' : 'English', level: nl ? 'Vloeiend' : 'Fluent' },
    ],
    links: [{ id: newId(), label: 'LinkedIn', url: 'linkedin.com/in/alexjansen' }],
  };
}
