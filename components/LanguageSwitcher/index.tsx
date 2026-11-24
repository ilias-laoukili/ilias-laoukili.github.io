"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { locales, localeNames, type Locale } from "@/lib/i18n";

type LanguageSwitcherProps = {
    locale?: Locale;
};

export default function LanguageSwitcher({ locale = "en" }: LanguageSwitcherProps) {
    const pathname = usePathname();
    const isFr = locale === "fr";

    const getLocalizedPath = (targetLocale: Locale) => {
        let stripped = (pathname || "/").replace(/\.html$/, "");
        for (const loc of locales) {
            if (stripped === `/${loc}` || stripped === `/${loc}/`) {
                stripped = "/";
                break;
            }
            if (stripped.startsWith(`/${loc}/`)) {
                stripped = stripped.slice(loc.length + 1);
                break;
            }
        }
        return stripped === "/" ? `/${targetLocale}/` : `/${targetLocale}${stripped}`;
    };

    return (
        <div
            className="inline-flex h-9 items-center border border-border font-mono text-xs"
            role="group"
            aria-label={isFr ? "Sélecteur de langue" : "Language switcher"}
        >
            {locales.map((loc) => {
                const active = loc === locale;
                return (
                    <Link
                        key={loc}
                        href={getLocalizedPath(loc)}
                        lang={loc}
                        hrefLang={loc}
                        aria-label={`${loc.toUpperCase()} — ${localeNames[loc]}`}
                        aria-current={active ? "page" : undefined}
                        className={`flex h-full min-w-[2.25rem] items-center justify-center px-2.5 uppercase transition-colors ${
                            active
                                ? "bg-foreground text-background"
                                : "text-muted-foreground hover:text-foreground"
                        }`}
                    >
                        {loc}
                    </Link>
                );
            })}
        </div>
    );
}
