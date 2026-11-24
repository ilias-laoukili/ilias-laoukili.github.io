"use client";

import { ArrowUpRight } from "lucide-react";
import ContactEmail from "@/components/ContactEmail";
import { useTranslations } from "@/lib/i18n/client";
import type { Locale } from "@/lib/i18n";
import profile from "@/data/profile.generated.json";

type FooterProps = {
    locale?: Locale;
};

const Footer = ({ locale = "en" }: FooterProps) => {
    const { t } = useTranslations("footer");
    const loc = locale === "fr" ? "fr" : "en";

    const newTab = loc === "fr" ? " (ouvre dans un nouvel onglet)" : " (opens in a new tab)";

    return (
        <footer className="border-t border-border bg-muted/40">
            <div className="site-container py-12">
                <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
                    <div>
                        <div className="font-mono text-xs uppercase tracking-[0.14em] text-foreground">
                            {profile.identity.name}
                        </div>
                        <p className="mt-3 text-sm text-muted-foreground">
                            {profile.identity.location[loc]}
                        </p>
                        <ContactEmail locale={loc} variant="reveal" />
                    </div>

                    <div>
                        <div className="section-index mb-3">{t("cvHeading")}</div>
                        <ul className="space-y-1 text-sm">
                            <li>
                                <a
                                    href={profile.cvDownloads.industry.en}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex min-h-[28px] items-center gap-1 py-0.5 text-muted-foreground transition-colors hover:text-foreground"
                                >
                                    {t("industryEn")}
                                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                                    <span className="sr-only">{newTab}</span>
                                </a>
                            </li>
                            <li>
                                <a
                                    href={profile.cvDownloads.industry.fr}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex min-h-[28px] items-center gap-1 py-0.5 text-muted-foreground transition-colors hover:text-foreground"
                                >
                                    {t("industryFr")}
                                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                                    <span className="sr-only">{newTab}</span>
                                </a>
                            </li>
                            <li>
                                <a
                                    href={profile.cvDownloads.academic.en}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex min-h-[28px] items-center gap-1 py-0.5 text-muted-foreground transition-colors hover:text-foreground"
                                >
                                    {t("academicEn")}
                                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                                    <span className="sr-only">{newTab}</span>
                                </a>
                            </li>
                            <li>
                                <a
                                    href={profile.cvDownloads.academic.fr}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex min-h-[28px] items-center gap-1 py-0.5 text-muted-foreground transition-colors hover:text-foreground"
                                >
                                    {t("academicFr")}
                                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                                    <span className="sr-only">{newTab}</span>
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <div className="section-index mb-3">{t("linksHeading")}</div>
                        <ul className="space-y-1 text-sm">
                            <li>
                                <a
                                    href={profile.identity.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={`GitHub — ${profile.identity.name}${newTab}`}
                                    className="inline-flex min-h-[28px] items-center gap-1 py-0.5 text-muted-foreground transition-colors hover:text-foreground"
                                >
                                    GitHub
                                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                                </a>
                            </li>
                            <li>
                                <a
                                    href={profile.identity.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={`LinkedIn — ${profile.identity.name}${newTab}`}
                                    className="inline-flex min-h-[28px] items-center gap-1 py-0.5 text-muted-foreground transition-colors hover:text-foreground"
                                >
                                    LinkedIn
                                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                                </a>
                            </li>
                            <li>
                                <ContactEmail
                                    locale={loc}
                                    variant="link"
                                    label={loc === "fr" ? "Courriel" : "Email"}
                                />
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-10 flex flex-wrap items-center justify-between gap-2 border-t border-border pt-6 font-mono text-xs text-muted-foreground">
                    <span>{t("copyright")}</span>
                    <span>ilias.laoukili.com</span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
