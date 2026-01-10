"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { enablePageScroll, clearQueueScrollLocks } from "scroll-lock";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Terminal from "@/components/Terminal";
import useKonamiCode from "@/hooks/use-konami-code";
import type { Locale } from "@/lib/i18n";

type LayoutProps = {
    classHeader?: string;
    lightHeader?: boolean;
    children: React.ReactNode;
    locale?: Locale;
};

const Layout = ({ classHeader, lightHeader, children, locale = 'en' }: LayoutProps) => {
    const pathname = usePathname();
    const { isOpen: isTerminalOpen, close: closeTerminal } = useKonamiCode();

    useEffect(() => {
        clearQueueScrollLocks();
        enablePageScroll();
    }, [pathname]);

    return (
        <div className="flex flex-col min-h-screen bg-white dark:bg-gray-950 transition-colors duration-300">
            <Header className={classHeader} light={lightHeader} locale={locale} />
            <div className="grow">{children}</div>
            <Footer locale={locale} />
            <Terminal isOpen={isTerminalOpen} onClose={closeTerminal} />
        </div>
    );
};

export default Layout;
