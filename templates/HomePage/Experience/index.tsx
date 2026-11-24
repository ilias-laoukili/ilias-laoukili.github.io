"use client";

import { Fragment } from "react";
import { ArrowUpRight } from "lucide-react";
import { useTranslations } from "@/lib/i18n/client";
import type { Locale } from "@/lib/i18n";
import profile from "@/data/profile.generated.json";
import { INSTITUTIONS, type InstitutionGlyph } from "@/constants/institutions";

type ExperienceProps = {
    locale: Locale;
};

const InstitutionGlyphSvg = ({ glyph }: { glyph: InstitutionGlyph }) => {
    const common = {
        className: "h-4 w-4 text-foreground/80",
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: 1.6,
        strokeLinecap: "square" as const,
        strokeLinejoin: "miter" as const,
        "aria-hidden": true as const,
    };

    switch (glyph) {
        case "shield":
            return (
                <svg {...common}>
                    <path d="M12 3l7 3v5c0 4.5-3 8.2-7 10-4-1.8-7-5.5-7-10V6l7-3z" />
                    <path d="M9.5 11.5L11.2 13.2L15 9.4" />
                </svg>
            );
        case "compass":
            return (
                <svg {...common}>
                    <circle cx="12" cy="12" r="8.5" />
                    <polygon points="15.5,8.5 13.2,13.2 8.5,15.5 10.8,10.8" />
                </svg>
            );
        case "nodes":
            return (
                <svg {...common}>
                    <circle cx="6" cy="7" r="2.2" />
                    <circle cx="18" cy="7" r="2.2" />
                    <circle cx="12" cy="17.5" r="2.2" />
                    <path d="M8.2 7h7.6M7.2 8.9l3.6 6.7M16.8 8.9l-3.6 6.7" />
                </svg>
            );
        case "book":
            return (
                <svg {...common}>
                    <path d="M4 5.5h6.5a2 2 0 0 1 1.5.7 2 2 0 0 1 1.5-.7H20v13h-6.5a2 2 0 0 0-1.5.7 2 2 0 0 0-1.5-.7H4v-13z" />
                    <path d="M12 6.2v12.8" />
                </svg>
            );
        case "crest":
            return (
                <svg {...common}>
                    <path d="M12 3L3 7.5 12 12l9-4.5L12 3z" />
                    <path d="M6.5 9.8v5.7c0 1.4 2.5 2.8 5.5 2.8s5.5-1.4 5.5-2.8V9.8" />
                </svg>
            );
        case "circuit":
            return (
                <svg {...common}>
                    <rect x="7" y="7" width="10" height="10" />
                    <path d="M10 3v4M14 3v4M10 17v4M14 17v4M3 10h4M3 14h4M17 10h4M17 14h4" />
                </svg>
            );
        case "grid":
            return (
                <svg {...common}>
                    <rect x="4" y="4" width="6.5" height="6.5" />
                    <rect x="13.5" y="4" width="6.5" height="6.5" />
                    <rect x="4" y="13.5" width="6.5" height="6.5" />
                    <rect x="13.5" y="13.5" width="6.5" height="6.5" />
                </svg>
            );
        case "cross":
            return (
                <svg {...common}>
                    <path d="M9.5 4h5v5.5H20v5h-5.5V20h-5v-5.5H4v-5h5.5V4z" />
                </svg>
            );
    }
};

type LedgerRowProps = {
    id: string;
    loc: "en" | "fr";
    period: string;
    title: string;
    org: string;
    location: string;
    bullets: string[];
    activeLabel?: string;
};

const LedgerRow = ({
    id,
    loc,
    period,
    title,
    org,
    location,
    bullets,
    activeLabel,
}: LedgerRowProps) => {
    const meta = INSTITUTIONS[id];
    const newTabText = loc === "fr" ? " (ouvre dans un nouvel onglet)" : " (opens in a new tab)";

    // Preserve any department suffix (e.g. " — AI Transformation Office") after linked institution name
    const suffixMatch = org.match(/(\s+—\s+.+)$/);
    const orgSuffix = suffixMatch ? suffixMatch[1] : "";

    return (
        <div className="grid grid-cols-1 gap-3 py-6 first:pt-2 sm:grid-cols-[12rem_1fr] sm:gap-8">
            <div className="font-mono text-xs text-muted-foreground sm:pt-1">
                <div>{period}</div>
                {activeLabel && (
                    <span className="mt-1.5 inline-flex items-center gap-1.5 border border-border px-2 py-0.5 text-[10px] uppercase tracking-wider text-foreground">
                        <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
                        {activeLabel}
                    </span>
                )}
            </div>

            <div className="flex items-start gap-4">
                {meta && (
                    <div
                        className="mt-0.5 hidden h-10 w-10 shrink-0 flex-col items-center justify-center border border-border bg-muted/40 sm:flex"
                        aria-hidden="true"
                        title={meta.code}
                    >
                        <InstitutionGlyphSvg glyph={meta.glyph} />
                    </div>
                )}

                <div className="min-w-0 flex-1">
                    <h4 className="font-display text-base font-medium text-foreground sm:text-lg">
                        {title}
                    </h4>

                    <div className="mt-1 flex flex-wrap items-center gap-y-1 text-sm text-muted-foreground">
                        {meta && meta.links.length > 0 ? (
                            <>
                                {meta.links.map((link, idx) => (
                                    <Fragment key={link.url}>
                                        {idx > 0 && (
                                            <span className="mx-1.5 text-muted-foreground/60" aria-hidden="true">
                                                /
                                            </span>
                                        )}
                                        <a
                                            href={link.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex min-h-[28px] items-center gap-1 py-0.5 text-foreground/90 underline decoration-border underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
                                        >
                                            <span>{link.label[loc]}</span>
                                            <ArrowUpRight
                                                className="h-3 w-3 shrink-0 text-muted-foreground"
                                                aria-hidden="true"
                                            />
                                            <span className="sr-only">{newTabText}</span>
                                        </a>
                                    </Fragment>
                                ))}
                                {orgSuffix && <span className="ml-1.5">{orgSuffix.trim()}</span>}
                            </>
                        ) : (
                            <span>{org}</span>
                        )}
                        <span className="mx-2 text-border" aria-hidden="true">
                            ·
                        </span>
                        <span>{location}</span>
                    </div>

                    <ul className="mt-3 space-y-1.5 text-sm leading-relaxed text-muted-foreground">
                        {bullets.map((bullet, idx) => (
                            <li key={idx} className="flex gap-2.5">
                                <span
                                    className="mt-2 h-1 w-1 shrink-0 bg-muted-foreground/60"
                                    aria-hidden="true"
                                />
                                <span>{bullet}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

const Experience = ({ locale }: ExperienceProps) => {
    const { t } = useTranslations("home.experience");
    const loc = locale === "fr" ? "fr" : "en";

    return (
        <section id="experience" className="border-b border-border bg-background">
            <div className="site-container py-20">
                <div className="section-index">{t("index")}</div>
                <h2 className="mt-2 font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                    {t("title")}
                </h2>

                <div className="mt-12 space-y-12">
                    <div>
                        <h3 className="border-b border-border pb-2.5 font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
                            {t("workHeading")}
                        </h3>
                        <div className="divide-y divide-border">
                            {profile.experience.map((item) => (
                                <LedgerRow
                                    key={item.id}
                                    id={item.id}
                                    loc={loc}
                                    period={item.period[loc]}
                                    title={item.role[loc]}
                                    org={item.organization[loc]}
                                    location={item.location[loc]}
                                    bullets={item.bullets[loc]}
                                    activeLabel={item.current ? t("current") : undefined}
                                />
                            ))}
                        </div>
                    </div>

                    <div>
                        <h3 className="border-b border-border pb-2.5 font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
                            {t("educationHeading")}
                        </h3>
                        <div className="divide-y divide-border">
                            {profile.education.map((item) => (
                                <LedgerRow
                                    key={item.id}
                                    id={item.id}
                                    loc={loc}
                                    period={item.period[loc]}
                                    title={item.degree[loc]}
                                    org={item.institution[loc]}
                                    location={item.location[loc]}
                                    bullets={item.bullets[loc]}
                                    activeLabel={item.current ? t("current") : undefined}
                                />
                            ))}
                        </div>
                    </div>

                    {profile.activities.length > 0 && (
                        <div>
                            <h3 className="border-b border-border pb-2.5 font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
                                {t("volunteeringHeading")}
                            </h3>
                            <div className="divide-y divide-border">
                                {profile.activities.map((item) => (
                                    <LedgerRow
                                        key={item.id}
                                        id={item.id}
                                        loc={loc}
                                        period={item.period[loc]}
                                        title={item.role[loc]}
                                        org={item.organization[loc]}
                                        location={item.location[loc]}
                                        bullets={item.bullets[loc]}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Experience;
