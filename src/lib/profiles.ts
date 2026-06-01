import path from 'node:path';
import fs from 'node:fs/promises';
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
