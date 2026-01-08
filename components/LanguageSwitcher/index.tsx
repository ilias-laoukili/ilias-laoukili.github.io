'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { locales, localeFlags, type Locale } from '@/lib/i18n';

type LanguageSwitcherProps = {
  locale?: Locale;
};

export default function LanguageSwitcher({ locale = 'en' }: LanguageSwitcherProps) {
  const pathname = usePathname();

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

  return (
    <div className="flex items-center gap-1">
      {locales.map((loc) => (
        <Link
          key={loc}
          href={getLocalizedPath(loc)}
          className={`px-2 py-1 text-sm rounded transition-colors ${
            locale === loc
              ? 'bg-gray-900 text-white'
              : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
          }`}
          title={loc.toUpperCase()}
        >
          {localeFlags[loc]}
        </Link>
      ))}
    </div>
  );
}
