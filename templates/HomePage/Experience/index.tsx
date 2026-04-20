"use client";

import { motion } from "motion/react";
import { useTranslations } from "@/lib/i18n/client";
import { Briefcase, FlaskConical, GraduationCap, HeartHandshake, BookOpen } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type ExperienceItem = {
    key: string;
    icon: LucideIcon;
    badge?: "upcoming" | "incoming";
};

const ITEMS: ExperienceItem[] = [
    { key: "internship", icon: Briefcase, badge: "upcoming" },
    { key: "laval", icon: GraduationCap, badge: "incoming" },
    { key: "research", icon: FlaskConical },
    { key: "redcross", icon: HeartHandshake },
    { key: "tutor", icon: BookOpen },
    { key: "esiee", icon: GraduationCap },
];

const Experience = () => {
    const { t } = useTranslations('home.experience');

    return (
        <div className="py150 bg-white dark:bg-gray-950">
            <div className="container" id="experience">
                <div className="mb-2 label dark:text-gray-400">{t('sectionTitle')}</div>
                <h2 className="mb-12 text-h1 2xl:mb-16 dark:text-white">
                    {t('subtitle').split(' & ')[0]} <br />& {t('subtitle').split(' & ')[1]}
                </h2>

                <div className="relative">
                    {/* Vertical line */}
                    <div className="absolute left-[1.875rem] top-0 bottom-0 w-px bg-gray-200 dark:bg-gray-700 md:hidden" />

                    <div className="flex flex-col gap-8">
                        {ITEMS.map((item, index) => {
                            const Icon = item.icon;
                            return (
                                <motion.div
                                    key={item.key}
                                    initial={{ y: 20 }}
                                    whileInView={{ y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{
                                        duration: 0.5,
                                        delay: index * 0.08,
                                        ease: [0.25, 0.4, 0.25, 1],
                                    }}
                                    className="flex gap-8 md:gap-4"
                                >
                                    {/* Icon dot */}
                                    <div className="relative shrink-0 w-[3.75rem] flex justify-center md:hidden">
                                        <div className="w-10 h-10 rounded-full bg-gray-900 dark:bg-white flex items-center justify-center z-10">
                                            <Icon className="w-4 h-4 text-white dark:text-gray-900" />
                                        </div>
                                    </div>

                                    {/* Content card */}
                                    <div className="flex-1 bg-[#FAFAFA] dark:bg-gray-800 rounded-2xl p-8 md:p-6 border border-gray-100 dark:border-gray-700">
                                        <div className="flex items-start justify-between gap-4 mb-2 flex-wrap">
                                            <div>
                                                <div className="flex items-center gap-2 flex-wrap">
                                                    <span className="text-h3 text-gray-900 dark:text-white">
                                                        {t(`items.${item.key}.title`)}
                                                    </span>
                                                    {item.badge && (
                                                        <span className="px-2 py-0.5 text-[11px] font-medium rounded-full bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/30">
                                                            {t(item.badge)}
                                                        </span>
                                                    )}
                                                </div>
                                                <div className="text-body text-gray-500 dark:text-gray-400 mt-0.5">
                                                    {t(`items.${item.key}.org`)} · {t(`items.${item.key}.location`)}
                                                </div>
                                            </div>
                                            <span className="shrink-0 text-caption text-gray-400 dark:text-gray-500 font-mono">
                                                {t(`items.${item.key}.period`)}
                                            </span>
                                        </div>
                                        <p className="text-body text-gray-600 dark:text-gray-400 leading-relaxed">
                                            {t(`items.${item.key}.description`)}
                                        </p>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Experience;
