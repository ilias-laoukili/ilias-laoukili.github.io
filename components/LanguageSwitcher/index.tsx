'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { locales, localeFlags, localeNames, type Locale } from '@/lib/i18n';
import { ChevronDown } from 'lucide-react';

type LanguageSwitcherProps = {
  locale?: Locale;
};

export default function LanguageSwitcher({ locale = 'en' }: LanguageSwitcherProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const getLocalizedPath = (newLocale: Locale) => {
    // Remove current locale from pathname
    let pathWithoutLocale = pathname;
    
    // Check if path starts with a locale
    for (const loc of locales) {
      if (pathname.startsWith(`/${loc}/`) || pathname === `/${loc}`) {
        pathWithoutLocale = pathname.slice(`/${loc}`.length) || '/';
        break;
      }
    }

    // Add new locale prefix (except for English which is default)
    if (newLocale === 'en') {
      return pathWithoutLocale || '/';
    }
    return `/${newLocale}${pathWithoutLocale === '/' ? '' : pathWithoutLocale}`;
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Current language button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 text-sm rounded-lg transition-colors bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <span className="text-base">{localeFlags[locale]}</span>
        <ChevronDown 
          size={14} 
          className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 py-1 w-40 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50">
          {locales.map((loc) => (
            <Link
              key={loc}
              href={getLocalizedPath(loc)}
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-3 px-3 py-2 text-sm transition-colors ${
                locale === loc
                  ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <span className="text-base">{localeFlags[loc]}</span>
              <span>{localeNames[loc]}</span>
              {locale === loc && (
                <span className="ml-auto text-green-500 dark:text-green-400">✓</span>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
