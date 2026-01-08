import Link from "next/link";
import Button from "@/components/Button";
import { useTranslations } from "@/lib/i18n/client";
import type { Locale } from "@/lib/i18n";

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
            ],
        },
        {
            id: "1",
            title: "Social",
            links: [
                { id: "0", title: "GitHub", url: "https://github.com/ilias-laoukili", external: true },
                { id: "1", title: "LinkedIn", url: "https://www.linkedin.com/in/ilias-laoukili", external: true },
            ],
        },
    ];

    return (
        <footer className="mt-[6.875rem] py-20 bg-black text-w-50 lg:mt-25 md:py-12">
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
                                                    className="text-w-50 transition-opacity hover:opacity-80"
                                                    href={link.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    key={link.id}
                                                >
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
