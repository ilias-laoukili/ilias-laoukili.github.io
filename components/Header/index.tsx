"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import ThemeToggle from "@/components/ThemeToggle";
import { useTranslations } from "@/lib/i18n/client";
import type { Locale } from "@/lib/i18n";

type HeaderProps = {
    className?: string;
    locale?: Locale;
};

const Header = ({ className, locale = "en" }: HeaderProps) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const pathname = usePathname();
    const { t } = useTranslations("common.navigation");
    const isFr = locale === "fr";

    const homePath = `/${locale}/`;
    const blogPath = `/${locale}/blog/`;
    const isBlogPage = pathname.includes("/blog");

    const navItems = [
        { label: t("experience"), href: `${homePath}#experience` },
        { label: t("projects"), href: `${homePath}#projects` },
        { label: t("skills"), href: `${homePath}#skills` },
        { label: t("blog"), href: blogPath },
    ];

    useEffect(() => {
        setMenuOpen(false);
    }, [pathname]);

    return (
        <header
            className={`sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 ${className || ""}`}
        >
            <div className="site-container flex h-16 items-center justify-between gap-4">
                <Link
                    href={homePath}
                    className="inline-flex min-h-[36px] items-center font-mono text-sm font-medium uppercase tracking-[0.14em] text-foreground transition-opacity hover:opacity-75"
                >
                    Ilias Laoukili
                </Link>

                <nav
                    aria-label={isFr ? "Navigation principale" : "Main navigation"}
                    className="hidden items-center gap-6 md:flex"
                >
                    {navItems.map((item) => {
                        const active = item.href === blogPath && isBlogPage;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`inline-flex min-h-[32px] items-center px-1 text-sm transition-colors ${
                                    active
                                        ? "font-medium text-foreground"
                                        : "text-muted-foreground hover:text-foreground"
                                }`}
                            >
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>

                <div className="flex items-center gap-2">
                    <LanguageSwitcher locale={locale} />
                    <ThemeToggle />
                    <button
                        type="button"
                        onClick={() => setMenuOpen((prev) => !prev)}
                        className="inline-flex h-9 w-9 items-center justify-center border border-border text-muted-foreground transition-colors hover:border-foreground hover:text-foreground md:hidden"
                        aria-label={
                            menuOpen
                                ? isFr
                                    ? "Fermer le menu"
                                    : "Close menu"
                                : isFr
                                  ? "Ouvrir le menu"
                                  : "Open menu"
                        }
                        aria-expanded={menuOpen}
                        aria-controls="mobile-nav"
                    >
                        {menuOpen ? (
                            <X className="h-4 w-4" aria-hidden="true" />
                        ) : (
                            <Menu className="h-4 w-4" aria-hidden="true" />
                        )}
                    </button>
                </div>
            </div>

            {menuOpen && (
                <nav
                    id="mobile-nav"
                    aria-label={isFr ? "Navigation mobile" : "Mobile navigation"}
                    className="border-t border-border bg-background md:hidden"
                >
                    <div className="site-container flex flex-col divide-y divide-border py-2">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setMenuOpen(false)}
                                className="flex min-h-[44px] items-center font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground transition-colors hover:text-foreground"
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>
                </nav>
            )}
        </header>
    );
};

export default Header;
