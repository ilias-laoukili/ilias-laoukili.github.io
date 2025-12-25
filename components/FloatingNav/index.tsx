"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { headerNavigation } from "@/constants/navigation";
import { Mail01Icon } from "@/utils/icons/icons/Mail01Icon";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

const FloatingNav = () => {
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [activeSection, setActiveSection] = useState<string>("#home");
    const pathname = usePathname();
    const router = useRouter();
    
    useEffect(() => {
        const handleScroll = () => {
            const offset = window.scrollY;
            setIsVisible(offset > 300);
            if (pathname.includes("/blog")) {
                setActiveSection("#blog");
            }

            const sections = headerNavigation.map(nav => nav.url);
            for (const section of sections) {
                if(section.startsWith("#")) {
                    const element = document.querySelector(section);
                    if (element) {
                        const rect = element.getBoundingClientRect();
                        if (rect.top <= 150 && rect.bottom >= 150) {
                            setActiveSection(section);
                            break;
                        }
                    }
                }
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [pathname]);

    const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, url: string) => {
        e.preventDefault();
        if(url.startsWith("#")) {
            if(pathname.includes("/blog")) {
                router.push('/' + url)
            }
            const element = document.querySelector(url);
            if (element) {
                element.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        } else {
            router.push(url);
        }
    };

    return (
        <nav
            className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-700 ease-out ${
                isVisible
                    ? "opacity-100 translate-y-0 scale-100"
                    : "opacity-0 -translate-y-10 scale-95 pointer-events-none"
            }`}
        >
            <div 
                className="flex items-center gap-1 px-5 py-2.5 rounded-full bg-white/75 shadow-2xl border border-white/40 hover:shadow-3xl transition-all duration-300"
                style={{
                    backdropFilter: "blur(28px) saturate(180%)",
                    WebkitBackdropFilter: "blur(28px) saturate(180%)",
                    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.12), 0 2px 8px rgba(0, 0, 0, 0.08)",
                }}
            >
                <Link
                    className="shrink-0 md:relative md:z-3 font-bold text-sm md:block hidden"
                    href="/"
                    onClick={(e) => handleSmoothScroll(e, "#home")}
                >
                    Ilias Laoukili
                </Link>
                {headerNavigation.map((link) => !link.url.startsWith("#contact") && (
                    <Link
                        key={link.id}
                        href={link.url}
                        onClick={(e) => handleSmoothScroll(e, link.url)}
                        className={`relative px-4 py-2 text-sm font-semibold transition-all duration-300 rounded-full md:hidden ${
                            activeSection === link.url || (pathname === "/blog" && link.url === "/blog")
                                ? "text-gray-900"
                                : "text-gray-700 hover:text-gray-900 hover:bg-gray-100/50"
                        }`}
                    >
                        {(activeSection === link.url || (pathname.includes("/blog") && link.url === "/blog")) && (
                            <span
                                className="absolute inset-0 bg-gray-100 border border-gray-200 rounded-full -z-10"
                                style={{
                                    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                                    backgroundSize: "200% 100%",
                                    animation: "gradient-shift 3s ease infinite",
                                }}
                            />
                        )}
                        <span className="relative z-10">{link.title}</span>
                    </Link>
                ))}
                
                <div className="w-px h-5 bg-gradient-to-b from-transparent via-gray-300 to-transparent mx-1 md:mx-10" />
                
                <a
                    href="mailto:ilias.laoukili@proton.me"
                    className="relative px-5 py-2 text-sm font-semibold text-white rounded-full hover:scale-105 transition-all duration-300 overflow-hidden group"
                >
                    <span 
                        className="absolute inset-0 bg-black -z-10"
                        style={{
                            backgroundSize: "200% 100%",
                            animation: "gradient-shift 3s ease infinite",
                        }}
                    />
                    <span className="relative z-10 flex items-center gap-2 justify-center md:justify-start min-w-26">
                        Contact
                        <Mail01Icon variant="duotone" className="w-4 h-4" />
                    </span>
                </a>
            </div>
            
            <style jsx>{`
                @keyframes gradient-shift {
                    0%, 100% {
                        background-position: 0% 50%;
                    }
                    50% {
                        background-position: 100% 50%;
                    }
                }
            `}</style>
        </nav>
    );
};

export default FloatingNav;
