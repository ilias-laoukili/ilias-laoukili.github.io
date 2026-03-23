"use client";

import { StructureFoldIcon, WaveformIcon, SoftwareIcon, Brain01Icon } from "@/utils/icons";
import type { IconProps } from "@/utils/icons";
import { CardContainer, CardItem } from "@/components/ui/3d-card";
import { StripedPattern } from "@/components/magicui/striped-pattern";
import { motion } from "motion/react";
import { useTranslations } from "@/lib/i18n/client";

type ResearchInterest = {
    id: string;
    icon: React.ComponentType<IconProps>;
    titleKey: string;
    descriptionKey: string;
};

const RESEARCH_INTERESTS: ResearchInterest[] = [
    { id: "1", icon: StructureFoldIcon, titleKey: "interests.graphNetworks.title", descriptionKey: "interests.graphNetworks.description" },
    { id: "2", icon: WaveformIcon, titleKey: "interests.signalProcessing.title", descriptionKey: "interests.signalProcessing.description" },
    { id: "3", icon: SoftwareIcon, titleKey: "interests.mlPipelines.title", descriptionKey: "interests.mlPipelines.description" },
    { id: "4", icon: Brain01Icon, titleKey: "interests.education.title", descriptionKey: "interests.education.description" },
];

const ResearchInterests = () => {
    const { t } = useTranslations('home.research');

    return (
        <div className="relative py150 bg-[#FAFAFA] dark:bg-gray-900 overflow-hidden">
            <StripedPattern className="absolute inset-0 [mask-image:radial-gradient(800px_circle_at_center,white,transparent)] opacity-20 dark:opacity-10" />
            
            <div className="container relative z-10" id="research">
                <div className="mb-2 label dark:text-gray-400">{t('sectionTitle')}</div>
                <h2 className="mb-12 text-h1 2xl:mb-25 dark:text-white">
                    {t('subtitle').split(' & ')[0]} <br />& {t('subtitle').split(' & ')[1]}
                </h2>

                <div className="grid grid-cols-2 gap-8 lg:grid-cols-1">
                    {RESEARCH_INTERESTS.map((interest, index) => {
                        const IconComponent = interest.icon;
                        return (
                        <motion.div
                            key={interest.id}
                            initial={{ y: 20 }}
                            whileInView={{ y: 0 }}
                            viewport={{ once: true }}
                            transition={{
                                duration: 0.5,
                                delay: index * 0.1,
                                ease: [0.25, 0.4, 0.25, 1],
                            }}
                        >
                        <CardContainer
                            className="relative group inter-var"
                        >
                        <div className="relative bg-transparent dark:bg-gray-800/50 backdrop-blur-[2px] rounded-2xl p-10 lg:p-8 md:p-6 border border-gray-200 dark:border-gray-700 group/card">
                            <div className="relative mb-6 w-16 h-16 bg-g-500 dark:bg-white rounded-xl flex items-center justify-center text-white dark:text-gray-900">
                                {IconComponent ? (
                                <IconComponent variant='duotone' className="w-6 h-6 text-white dark:text-gray-900" />
                                ) : null}
                            </div>

                            <CardItem translateZ="50" className="mb-4 text-h3 text-g-500 dark:text-white">
                                {t(interest.titleKey)}
                            </CardItem>

                            <p className="relative text-body text-g-100 dark:text-gray-400 leading-relaxed">
                                {t(interest.descriptionKey)}
                            </p>
                        </div>
                    </CardContainer>
                        </motion.div>
                    );
                    })}
                </div>
            </div>
        </div>
    );
};

export default ResearchInterests;
