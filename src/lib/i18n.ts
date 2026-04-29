export type Locale = 'nl' | 'en';

export function isLocale(value: string): value is Locale {
  return value === 'nl' || value === 'en';
}

export function otherLocale(locale: Locale): Locale {
  return locale === 'nl' ? 'en' : 'nl';
}
