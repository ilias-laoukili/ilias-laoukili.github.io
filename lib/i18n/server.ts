import type { Locale } from './index';

type Messages = Record<string, unknown>;

// Import all messages statically for static export
import enMessages from '../../messages/en.json';
import frMessages from '../../messages/fr.json';
import deMessages from '../../messages/de.json';
import nlMessages from '../../messages/nl.json';
import esMessages from '../../messages/es.json';

const messagesMap: Record<Locale, Messages> = {
  en: enMessages,
  fr: frMessages,
  de: deMessages,
  nl: nlMessages,
  es: esMessages,
};

export function getMessages(locale: Locale): Messages {
  return messagesMap[locale] ?? messagesMap.en;
}

export function getTranslation(messages: Messages, key: string, params?: Record<string, string | number>): string {
  const keys = key.split('.');
  let value: unknown = messages;
  
  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = (value as Record<string, unknown>)[k];
    } else {
      return key;
    }
  }
  
  if (typeof value !== 'string') {
    return key;
  }
  
  if (params) {
    return value.replace(/\{(\w+)\}/g, (_, paramKey) => {
      return params[paramKey]?.toString() ?? `{${paramKey}}`;
    });
  }
  
  return value;
}

// Server-side translation function
export function createTranslator(locale: Locale) {
  const messages = getMessages(locale);
  return (key: string, params?: Record<string, string | number>) => getTranslation(messages, key, params);
}
