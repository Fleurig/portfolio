import path from 'node:path';
import fs from 'node:fs/promises';
import fsSync from 'node:fs';
import { cache } from 'react';

export type ProfileMeta = {
  slug: string;
  displayName: string;
  email: string;
  locales: string[];
  defaultLocale: string;
};

export type CVExperience = {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  description: string;
  bullets: string[];
};

export type CVProject = {
  id: string;
  name: string;
  description: string;
};

export type CVSkills = {
  daily: string[];
  strong: string[];
  also: string[];
};

export type CVEducation = {
  id: string;
  institution: string;
  degree: string;
  period: string;
  status: string;
};

export type CVData = {
  name: string;
  title: string;
  location: string;
  profile: string;
  experience: CVExperience[];
  projects: CVProject[];
  skills: CVSkills;
  education: CVEducation[];
};

function dataRoot() {
  return path.join(process.cwd(), 'data');
}

export const getAllProfiles = cache(async (): Promise<string[]> => {
  const filePath = path.join(dataRoot(), 'profiles', 'index.json');
  const raw = await fs.readFile(filePath, 'utf8');
  return JSON.parse(raw) as string[];
});

export const getProfile = cache(async (slug: string): Promise<ProfileMeta> => {
  const filePath = path.join(dataRoot(), 'profiles', slug, 'profile.json');
  const raw = await fs.readFile(filePath, 'utf8');
  return JSON.parse(raw) as ProfileMeta;
});

export const getCVData = cache(async (slug: string, locale: string): Promise<CVData> => {
  const filePath = path.join(dataRoot(), 'profiles', slug, locale, 'cv.json');
  const raw = await fs.readFile(filePath, 'utf8');
  return JSON.parse(raw) as CVData;
});

// ── Content path helpers ────────────────────────────────────────────

export function profileContentRoot(slug: string) {
  return path.join(process.cwd(), 'content', 'profiles', slug);
}

export function profileContentExists(slug: string): boolean {
  try {
    fsSync.accessSync(profileContentRoot(slug));
    return true;
  } catch {
    return false;
  }
}

/** Default MDX templates used when a new user registers */
export const DEFAULT_HOME_TEMPLATE = `---
title: About me
---

I'm a developer based in **your city**. Write your bio here.
`;

export const DEFAULT_CV_TEMPLATE = `---
title: CV
---

# CV — Your Name

**Your Title** · Your City

## Profile

Write your professional profile here.

## Experience

### Job Title — Company
**Start – End · Location**

Description of your role.

- Key achievement 1
- Key achievement 2

## Skills

**Daily**: Technology 1, Technology 2

## Education

### University Name
Degree — **Year – Year**
`;

export const DEFAULT_CONTACT_TEMPLATE = `---
title: Contact
email: your@email.com
linkedin: https://linkedin.com/in/yourprofile
availability: Open to opportunities
---

Feel free to reach out via email or LinkedIn.
`;

/** Create all content directories + template files for a new profile */
export function scaffoldProfileContent(slug: string): void {
  const base = profileContentRoot(slug);
  for (const locale of ['en', 'nl']) {
    fsSync.mkdirSync(path.join(base, locale, 'projects'), { recursive: true });
    const homePath = path.join(base, locale, 'home.mdx');
    const cvPath = path.join(base, locale, 'cv.mdx');
    const contactPath = path.join(base, locale, 'contact.mdx');
    if (!fsSync.existsSync(homePath)) fsSync.writeFileSync(homePath, DEFAULT_HOME_TEMPLATE, 'utf8');
    if (!fsSync.existsSync(cvPath)) fsSync.writeFileSync(cvPath, DEFAULT_CV_TEMPLATE, 'utf8');
    if (!fsSync.existsSync(contactPath)) fsSync.writeFileSync(contactPath, DEFAULT_CONTACT_TEMPLATE, 'utf8');
  }

  // Create data directory for profile.json
  const dataDir = path.join(process.cwd(), 'data', 'profiles', slug);
  fsSync.mkdirSync(path.join(dataDir, 'en'), { recursive: true });
  fsSync.mkdirSync(path.join(dataDir, 'nl'), { recursive: true });

  const profileJson: ProfileMeta = {
    slug,
    displayName: slug,
    email: '',
    locales: ['en', 'nl'],
    defaultLocale: 'en',
  };
  const profileJsonPath = path.join(dataDir, 'profile.json');
  if (!fsSync.existsSync(profileJsonPath)) {
    fsSync.writeFileSync(profileJsonPath, JSON.stringify(profileJson, null, 2), 'utf8');
  }

  // Register slug in index.json
  const indexPath = path.join(process.cwd(), 'data', 'profiles', 'index.json');
  let slugs: string[] = [];
  try {
    slugs = JSON.parse(fsSync.readFileSync(indexPath, 'utf8')) as string[];
  } catch {
    slugs = [];
  }
  if (!slugs.includes(slug)) {
    slugs.push(slug);
    fsSync.writeFileSync(indexPath, JSON.stringify(slugs, null, 2), 'utf8');
  }
}
