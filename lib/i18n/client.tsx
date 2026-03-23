'use client';

import { createContext, useContext, useMemo, ReactNode } from 'react';
import type { Locale } from './index';
import { resolveTranslation } from './translate';

type Messages = Record<string, unknown>;

type TranslationContextType = {
  locale: Locale;
  messages: Messages;
  t: (key: string, params?: Record<string, string | number>) => string;
};

const TranslationContext = createContext<TranslationContextType | null>(null);

type TranslationProviderProps = {
  children: ReactNode;
  locale: Locale;
  messages: Messages;
};

export function TranslationProvider({ children, locale, messages }: TranslationProviderProps) {
  const t = useMemo(
    () => (key: string, params?: Record<string, string | number>): string => {
      return resolveTranslation(messages, key, params);
    },
    [messages]
  );

  return (
    <TranslationContext.Provider value={{ locale, messages, t }}>
      {children}
    </TranslationContext.Provider>
  );
}

export function useTranslations(namespace?: string) {
  const context = useContext(TranslationContext);

  if (!context) {
    throw new Error('useTranslations must be used within a TranslationProvider');
  }

  const { t: baseT, locale, messages } = context;

  const t = (key: string, params?: Record<string, string | number>): string => {
    const fullKey = namespace ? `${namespace}.${key}` : key;
    return baseT(fullKey, params);
  };

  return { t, locale, messages };
}

export function useLocale(): Locale {
  const context = useContext(TranslationContext);

  if (!context) {
    throw new Error('useLocale must be used within a TranslationProvider');
  }

  return context.locale;
}
