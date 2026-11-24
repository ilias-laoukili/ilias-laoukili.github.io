// Simple i18n configuration compatible with Next.js static export

export const locales = ['en', 'fr'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

export const localeNames: Record<Locale, string> = {
  en: 'English',
  fr: 'Français',
};

export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}
