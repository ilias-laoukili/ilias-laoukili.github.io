import Link from "next/link";
import Button from "@/components/Button";
import { Github, Linkedin, Mail, FileDown } from "lucide-react";
import { useTranslations } from "@/lib/i18n/client";
import type { Locale } from "@/lib/i18n";
import type { ReactNode } from "react";

const GitLabIcon = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M22.65 14.39 12 22.13 1.35 14.39a.84.84 0 0 1-.3-.94l1.22-3.78 2.44-7.51A.42.42 0 0 1 4.82 2a.43.43 0 0 1 .58 0 .42.42 0 0 1 .11.18l2.44 7.49h8.1l2.44-7.51A.42.42 0 0 1 18.6 2a.43.43 0 0 1 .58 0 .42.42 0 0 1 .11.18l2.44 7.51L23 13.45a.84.84 0 0 1-.35.94z" />
    </svg>
);

type FooterLink = {
    id: string;
    title: string;
    url: string;
    external: boolean;
    icon?: ReactNode;
};

type FooterProps = {
    locale?: Locale;
};

const Footer = ({ locale = 'en' }: FooterProps) => {
    const { t } = useTranslations('footer');

    const basePath = locale === 'en' ? '' : `/${locale}`;
    const blogPath = `${basePath}/blog`;

    const navigationFooter = [
        {
            id: "0",
            title: "Navigation",
            links: [
                { id: "0", title: "Home", url: basePath || "/", external: false },
                { id: "1", title: "Blog", url: blogPath, external: false },
            ] as FooterLink[],
        },
        {
            id: "1",
            title: "Contact",
            links: [
                { id: "0", title: "Email", url: "mailto:ilias.laoukili@proton.me", external: true, icon: <Mail className="w-5 h-5" /> },
                { id: "1", title: t('downloadCV'), url: "https://github.com/ilias-laoukili/resume/releases/latest/download/cv_industry.pdf", external: true, icon: <FileDown className="w-5 h-5" /> },
            ] as FooterLink[],
        },
        {
            id: "2",
            title: "Social",
            links: [
                { id: "0", title: "GitHub", url: "https://github.com/ilias-laoukili", external: true, icon: <Github className="w-5 h-5" /> },
                { id: "1", title: "GitLab", url: "https://gitlab.com/ilias-laoukili", external: true, icon: <GitLabIcon className="w-5 h-5" /> },
                { id: "2", title: "LinkedIn", url: "https://www.linkedin.com/in/ilias-laoukili", external: true, icon: <Linkedin className="w-5 h-5" /> },
            ] as FooterLink[],
        },
    ];

    return (
        <footer className="mt-[6.875rem] py-20 bg-black dark:bg-gray-950 text-w-50 lg:mt-25 md:py-12 border-t border-transparent dark:border-gray-800">
            <div className="container">
                <div className="flex justify-between lg:block">
                    <div className="max-w-[27rem] mr-10 xl:max-w-[22rem] lg:max-w-full lg:mr-0 lg:mb-25">
                        <div className="mb-8 text-h4">
                            {t('tagline')}
                        </div>
                        <Button title={t('contactMe')} light arrow onClick={() => window.open('mailto:ilias.laoukili@proton.me', '_blank')} />
                    </div>
                    <div className="min-w-[28.5rem] lg:min-w-full">
                        <div className="mb-12 text-h5">ilias.laoukili@proton.me</div>
                        <div className="mb-[9.75rem] text-h5 xl:mb-24">
                            {t('location')}
                        </div>
                        <div className="flex space-x-18 xl:space-x-14 md:flex-wrap md:-mt-14 md:space-x-0">
                            {navigationFooter.map((group) => (
                                <div
                                    className="lg:w-1/3 md:w-1/2 md:mt-14"
                                    key={group.id}
                                >
                                    <div className="flex flex-col space-y-3.5">
                                        {group.links.map((link) =>
                                            link.external ? (
                                                <a
                                                    className="flex items-center gap-2 text-w-50 transition-opacity hover:opacity-80"
                                                    href={link.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    key={link.id}
                                                >
                                                    {link.icon}
                                                    {link.title}
                                                </a>
                                            ) : (
                                                <Link
                                                    className="text-w-50 transition-opacity hover:opacity-80"
                                                    key={link.id}
                                                    href={link.url}
                                                >
                                                    {link.title}
                                                </Link>
                                            )
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="-mt-6 text-h5 lg:mt-25 lg:text-center">
                    {t('copyright')}
                </div>
            </div>
        </footer>
    );
};

export default Footer;
