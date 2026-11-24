"use client";

import { ArrowUpRight, FileDown } from "lucide-react";
import Image from "@/components/Image";
import ContactEmail from "@/components/ContactEmail";
import { useTranslations } from "@/lib/i18n/client";
import type { Locale } from "@/lib/i18n";
import profile from "@/data/profile.generated.json";

type MainProps = {
    locale: Locale;
};

const Main = ({ locale }: MainProps) => {
    const { t } = useTranslations("home.hero");
    const loc = locale === "fr" ? "fr" : "en";

    return (
        <section className="relative overflow-hidden border-b border-border bg-[#080b12] text-white">
            {/* Atmospheric NASA-editorial visual backdrop (decorative) */}
            <div className="pointer-events-none absolute inset-0" aria-hidden="true">
                <Image
                    src="/images/hero-nasa.png"
                    alt=""
                    fill
                    priority
                    sizes="100vw"
                    className="object-cover object-center opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#080b12]/90 via-[#080b12]/65 to-[#080b12]/30" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080b12]/80 via-transparent to-[#080b12]/40" />
            </div>

            <div className="site-container relative z-10 py-20 sm:py-28">
                <div className="mb-6 flex flex-wrap items-center gap-x-4 gap-y-1.5 font-mono text-xs uppercase tracking-[0.14em] text-neutral-300">
                    <span className="inline-flex items-center gap-2">
                        <span
                            className="inline-block h-1.5 w-1.5 rounded-full bg-sky-400"
                            aria-hidden="true"
                        />
                        <span>{t("status")}</span>
                    </span>
                    <span className="hidden text-white/25 sm:inline" aria-hidden="true">
                        |
                    </span>
                    <span className="text-neutral-400">{t("telemetry")}</span>
                </div>

                <h1 className="font-display text-4xl font-semibold tracking-tight text-white sm:text-6xl">
                    {profile.identity.name}
                </h1>

                <p className="mt-3 font-mono text-sm text-sky-200/90 sm:text-base">
                    {t("role")}
                </p>

                <p className="mt-6 max-w-2xl text-base leading-relaxed text-neutral-200 sm:text-lg">
                    {profile.summary[loc]}
                </p>

                <div className="mt-9 flex flex-wrap items-center gap-3">
                    <a
                        href={profile.cvDownloads.industry[loc]}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex h-10 items-center gap-2 bg-white px-5 text-sm font-medium text-[#080b12] transition-opacity hover:opacity-90 focus-visible:ring-offset-[#080b12]"
                    >
                        <FileDown className="h-4 w-4" aria-hidden="true" />
                        <span>{t("downloadCv")}</span>
                        <span className="sr-only">
                            {loc === "fr"
                                ? " (PDF, ouvre dans un nouvel onglet)"
                                : " (PDF, opens in a new tab)"}
                        </span>
                    </a>

                    <ContactEmail locale={loc} variant="hero" label={t("contact")} />
                </div>

                <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-white/15 pt-6 font-mono text-xs text-neutral-300">
                    <a
                        href={profile.identity.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-[28px] items-center gap-1 py-1 transition-colors hover:text-white focus-visible:ring-offset-[#080b12]"
                    >
                        github.com/ilias-laoukili
                        <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
                        <span className="sr-only">
                            {loc === "fr"
                                ? " (ouvre dans un nouvel onglet)"
                                : " (opens in a new tab)"}
                        </span>
                    </a>
                    <a
                        href={profile.identity.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-[28px] items-center gap-1 py-1 transition-colors hover:text-white focus-visible:ring-offset-[#080b12]"
                    >
                        linkedin.com/in/ilias-laoukili
                        <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
                        <span className="sr-only">
                            {loc === "fr"
                                ? " (ouvre dans un nouvel onglet)"
                                : " (opens in a new tab)"}
                        </span>
                    </a>
                    <span className="inline-flex min-h-[28px] items-center py-1 text-neutral-300">
                        {profile.identity.location[loc]}
                    </span>
                </div>
            </div>
        </section>
    );
};

export default Main;
