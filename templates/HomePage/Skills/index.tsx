"use client";

import { useTranslations } from "@/lib/i18n/client";
import type { Locale } from "@/lib/i18n";
import profile from "@/data/profile.generated.json";

type SkillsProps = {
    locale: Locale;
};

const Skills = ({ locale }: SkillsProps) => {
    const { t } = useTranslations("home.skills");
    const loc = locale === "fr" ? "fr" : "en";

    return (
        <section id="skills" className="bg-background">
            <div className="site-container py-20">
                <div className="section-index">{t("index")}</div>
                <h2 className="mt-2 font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                    {t("title")}
                </h2>

                <div className="mt-10 divide-y divide-border border-y border-border">
                    {profile.skills.map((group) => (
                        <div
                            key={group.label.en}
                            className="grid grid-cols-1 gap-2 py-5 sm:grid-cols-[12rem_1fr] sm:gap-8"
                        >
                            <div className="font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground sm:pt-0.5">
                                {group.label[loc]}
                            </div>
                            <div className="text-sm leading-relaxed text-foreground">
                                {group.items[loc]}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;
