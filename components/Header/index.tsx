"use client";

import { useState } from "react";
import { disablePageScroll, enablePageScroll } from "scroll-lock";
import Link from "next/link";
import Button from "@/components/Button";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useTranslations } from "@/lib/i18n/client";

import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import type { Locale } from "@/lib/i18n";

type HeaderProps = {
    className?: string;
    light?: boolean;
    locale?: Locale;
};

const Header = ({ className, locale = 'en' }: HeaderProps) => {
    const [visible, setVisible] = useState<boolean>(false);
    const pathname = usePathname();
    const router = useRouter();
    const { t } = useTranslations('common.navigation');

    const basePath = locale === 'en' ? '' : `/${locale}`;
    const blogPath = `${basePath}/blog`;

    const headerNavigation = [
        { id: "0", title: t('home'), url: "#home" },
        { id: "1", title: t('about'), url: "#about" },
        { id: "2", title: t('skills'), url: "#skills" },
        { id: "3", title: t('projects'), url: "#projects" },
        { id: "4", title: t('research'), url: "#research" },
        { id: "5", title: t('blog'), url: blogPath },
    ];

    const toggleMenu = () => {
        setVisible(!visible);
        if (visible) {
            enablePageScroll();
        } else {
            disablePageScroll();
        }
    };

    const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, url: string) => {
        if (url.startsWith("#")) {
            e.preventDefault();
            if(pathname.includes("/blog") && url.startsWith("#")) {
                router.push(basePath + '/' + url)
            }
            else {
                const element = document.querySelector(url);
                if (element) {
                    element.scrollIntoView({ behavior: "smooth", block: "start" });
                    if (visible) {
                        setVisible(false);
                        enablePageScroll();
                    }
                }
            }
        }
    };

    const isHomePage = pathname === '/' || pathname === `/${locale}` || pathname === basePath;
    const isBlogPage = pathname.includes("/blog");

    return (
        <header className={`relative z-[9999] ${className || ""}`}>
            <div className="container flex items-center h-20 md:h-17">
                <Link
                    className="shrink-0 md:relative md:z-3 font-bold text-xl"
                    href={basePath || '/'}
                    onClick={(e) => handleSmoothScroll(e, "#home")}
                >
                    Ilias Laoukili
                </Link>
                <div
                    className={`flex items-center grow md:fixed md:z-2 md:inset-0 md:flex-col md:items-start md:pt-24 md:px-5 md:pb-8 md:transition-all ${
                        "md:bg-white"
                    } ${visible ? "" : "md:invisible md:opacity-0"}`}
                >
                    <nav className="flex mx-auto space-x-6 md:flex-col md:mx-0 md:space-x-0 md:space-y-8 md:mb-auto">
                        {headerNavigation.map((link) => {
                            const isActive = 
                                (link.url === '#home' && isHomePage && !isBlogPage) ||
                                (link.url === blogPath && isBlogPage) ||
                                (link.url.startsWith('#') && isHomePage);
                            
                            return (
                                <Link
                                    className={`text-base font-medium ${isActive ? "text-gray-900" : "text-gray-500 hover:text-gray-600"} transition-colors lg:text-caption md:text-h5`}
                                    href={isBlogPage && link.url.startsWith("#") ? `${basePath}/${link.url}` : link.url}
                                    key={link.id}
                                    onClick={(e) => handleSmoothScroll(e, link.url)}
                                >
                                    {link.title}
                                </Link>
                            );
                        })}
                    </nav>
                    <div className="flex items-center gap-4">
                        <LanguageSwitcher locale={locale} />
                        <Button
                            className="!border-gray-900 hover:!bg-gray-900 hover:!text-white"
                            title="Contact"
                            href="mailto:ilias.laoukili@proton.me"
                            arrow
                            onClick={() => window.open('mailto:ilias.laoukili@proton.me', '_blank')}
                        />
                    </div>
                </div>
                <button
                    className={`hidden relative z-20 flex-col justify-center items-center w-9 h-9 ml-auto rounded-full tap-highlight-color before:w-4 before:h-0.5 before:rounded-full before:transition-all after:w-4 after:h-0.5 after:rounded-full after:transition-all md:flex ${
                        visible
                            ? "before:rotate-45 before:translate-y-[0.37rem] after:-rotate-45 after:-translate-y-[0.37rem]"
                            : ""
                    } ${
                        "bg-white before:bg-g-500 after:bg-g-500"
                    }`}
                    onClick={toggleMenu}
                    aria-label={visible ? "Close menu" : "Open menu"}
                    aria-expanded={visible}
                >
                    <span
                        className={`w-4 h-0.5 my-1 rounded-full transition-all ${
                            visible ? "w-0 opacity-0" : ""
                        } ${"bg-g-500" }`}
                    ></span>
                </button>
            </div>
        </header>
    );
};

export default Header;
