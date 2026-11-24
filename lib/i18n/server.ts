import type { Locale } from './index';
import { resolveTranslation } from './translate';

type Messages = Record<string, unknown>;

import enMessages from '../../messages/en.json';
import frMessages from '../../messages/fr.json';

const messagesMap: Record<Locale, Messages> = {
  en: enMessages,
  fr: frMessages,
};

export function getMessages(locale: Locale): Messages {
  return messagesMap[locale] ?? messagesMap.en;
}

export function getTranslation(
  messages: Messages,
  key: string,
  params?: Record<string, string | number>
): string {
  return resolveTranslation(messages, key, params);
}

export function createTranslator(locale: Locale) {
  const messages = getMessages(locale);
  return (key: string, params?: Record<string, string | number>) =>
    resolveTranslation(messages, key, params);
}
