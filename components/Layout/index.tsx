import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { enablePageScroll, clearQueueScrollLocks } from "scroll-lock";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type { Locale } from "@/lib/i18n";

type LayoutProps = {
    classHeader?: string;
    lightHeader?: boolean;
    children: React.ReactNode;
    locale?: Locale;
};

const Layout = ({ classHeader, lightHeader, children, locale = 'en' }: LayoutProps) => {
    const pathname = usePathname();

    useEffect(() => {
        clearQueueScrollLocks();
        enablePageScroll();
    }, [pathname]);

    return (
        <div className="flex flex-col min-h-screen">
            <Header className={classHeader} light={lightHeader} locale={locale} />
            <div className="grow">{children}</div>
            <Footer locale={locale} />
        </div>
    );
};

export default Layout;
