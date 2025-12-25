import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { enablePageScroll, clearQueueScrollLocks } from "scroll-lock";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

type LayoutProps = {
    classHeader?: string;
    lightHeader?: boolean;
    children: React.ReactNode;
};

const Layout = ({ classHeader, lightHeader, children }: LayoutProps) => {
    const pathname = usePathname();

    useEffect(() => {
        clearQueueScrollLocks();
        enablePageScroll();
    }, [pathname]);

    return (
        <div className="flex flex-col min-h-screen">
            <Header className={classHeader} light={lightHeader} />
            <div className="grow">{children}</div>
            <Footer />
        </div>
    );
};

export default Layout;
