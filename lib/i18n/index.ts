// Simple i18n solution compatible with Next.js static export

export const locales = ['en', 'fr', 'de', 'nl', 'es'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

export const localeNames: Record<Locale, string> = {
  en: 'English',
  fr: 'Français',
  de: 'Deutsch',
  nl: 'Nederlands',
  es: 'Español',
};

export const localeFlags: Record<Locale, string> = {
  en: '🇬🇧',
  fr: '🇫🇷',
  de: '🇩🇪',
  nl: '🇳🇱',
  es: '🇪🇸',
};

export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}
