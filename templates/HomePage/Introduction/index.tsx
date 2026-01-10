"use client";

import Button from "@/components/Button";
import { motion } from "motion/react";
import { useMemo } from "react";
import { useTranslations } from "@/lib/i18n/client";

type Stat = {
    label: string;
    value: string;
    description: string;
};

const Introduction = () => {
    const { t } = useTranslations('home');

    const stats: Stat[] = useMemo(() => [
        { label: t('stats.academic.label'), value: t('stats.academic.value'), description: t('stats.academic.description') },
        { label: t('stats.modelAccuracy.label'), value: t('stats.modelAccuracy.value'), description: t('stats.modelAccuracy.description') },
        { label: t('stats.years.label'), value: t('stats.years.value'), description: t('stats.years.description') },
        { label: t('stats.graphCompression.label'), value: t('stats.graphCompression.value'), description: t('stats.graphCompression.description') },
    ], [t]);

    return (
        <div className="pt150 pb-19 bg-[#FAFAFA] dark:bg-gray-900 md:pb-0 md:bg-transparent md:dark:bg-transparent">
            <div className="container" id="about">
                <div className="flex mb-32 xl:mb-25 lg:block">
                    <div className="label shrink-0 w-[27.19rem] 2xl:w-[18rem] lg:w-full lg:mb-16 dark:text-gray-400">
                        {t('introduction.sectionTitle')}
                    </div>
                    <div className="grow">
                        <div className="mb-8 text-h1 dark:text-white">
                            {t('introduction.content')}
                        </div>
                        <Button
                            title={t('introduction.seeProjects')}
                            arrow
                            href="#projects"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-4 gap-6 mb-16 xl:mb-25 md:grid-cols-2 md:gap-4">
                    {stats.map((stat: Stat, index: number) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, scale: 0.95, y: 15 }}
                            whileInView={{ 
                                opacity: 1, 
                                scale: 1, 
                                y: 0 
                            }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{
                                duration: 0.4,
                                delay: index * 0.05,
                                ease: [0.25, 0.4, 0.25, 1],
                            }}
                            className="bg-white dark:bg-gray-800 rounded-2xl p-8 text-center md:p-6"
                        >
                            <div className="mb-2 text-h1 text-g-500 dark:text-white">
                                {stat.value}
                            </div>
                            <div className="text-body text-g-100 dark:text-gray-400">
                                {stat.label}
                            </div>
                        </motion.div>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default Introduction;
