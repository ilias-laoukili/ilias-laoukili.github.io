"use client";

import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Terminal from "@/components/Terminal";
import useKonamiCode from "@/hooks/use-konami-code";
import type { Locale } from "@/lib/i18n";

type LayoutProps = {
    classHeader?: string;
    children: React.ReactNode;
    locale?: Locale;
};

const Layout = ({ classHeader, children, locale = "en" }: LayoutProps) => {
    const { isOpen: isTerminalOpen, close: closeTerminal } = useKonamiCode();
    const isFr = locale === "fr";

    useEffect(() => {
        document.documentElement.lang = locale;
    }, [locale]);

    return (
        <div lang={locale} className="flex min-h-screen flex-col bg-background text-foreground">
            <a
                href="#main-content"
                className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:border focus:border-foreground focus:bg-background focus:px-4 focus:py-2 focus:font-mono focus:text-xs focus:text-foreground"
            >
                {isFr ? "Aller au contenu principal" : "Skip to main content"}
            </a>
            <Header className={classHeader} locale={locale} />
            <main id="main-content" tabIndex={-1} className="grow focus:outline-none">
                {children}
            </main>
            <Footer locale={locale} />
            <Terminal isOpen={isTerminalOpen} onClose={closeTerminal} />
        </div>
    );
};

export default Layout;
