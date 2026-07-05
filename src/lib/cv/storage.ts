import type { CvData } from '@/src/lib/cv/types';
import { normalizeCvData } from '@/src/lib/cv/defaults';

/** The CV is persisted only in the visitor's own browser — private by default. */
const STORAGE_KEY = 'cv-builder:data:v1';

export function loadStoredCv(): CvData | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return normalizeCvData(JSON.parse(raw));
  } catch {
    return null;
  }
}

export function saveStoredCv(data: CvData): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // Storage may be full or blocked (private browsing) — the editor keeps
    // working in memory, it just won't survive a reload.
  }
}

export function clearStoredCv(): void {
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}
