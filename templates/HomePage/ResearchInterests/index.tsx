"use client";

import * as Icons from "@/utils/icons";
import { CardContainer, CardItem } from "@/components/ui/3d-card";
import { StripedPattern } from "@/components/magicui/striped-pattern";
import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { useTranslations } from "@/lib/i18n/client";

type ResearchInterest = {
    id: string;
    icon: string;
    titleKey: string;
    descriptionKey: string;
};

const ResearchInterests = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });
    const { t } = useTranslations('home.research');

    const researchInterests: ResearchInterest[] = [
        { id: "1", icon: "StructureFoldIcon", titleKey: "interests.graphNetworks.title", descriptionKey: "interests.graphNetworks.description" },
        { id: "2", icon: "WaveformIcon", titleKey: "interests.signalProcessing.title", descriptionKey: "interests.signalProcessing.description" },
        { id: "3", icon: "SoftwareIcon", titleKey: "interests.mlPipelines.title", descriptionKey: "interests.mlPipelines.description" },
        { id: "4", icon: "Brain01Icon", titleKey: "interests.education.title", descriptionKey: "interests.education.description" },
    ];

    return (
        <div className="relative py150 bg-[#FAFAFA] overflow-hidden">
            <StripedPattern className="absolute inset-0 [mask-image:radial-gradient(800px_circle_at_center,white,transparent)] opacity-20" />
            
            <div className="container relative z-10" id="research">
                <div className="mb-2 label">{t('sectionTitle')}</div>
                <div className="mb-12 text-h1 2xl:mb-25">
                    {t('subtitle').split(' & ')[0]} <br />& {t('subtitle').split(' & ')[1]}
                </div>

                <div ref={ref} className="grid grid-cols-2 gap-8 lg:grid-cols-1">
                    {researchInterests.map((interest, index) => {
                        const IconComponent = Icons[interest.icon as keyof typeof Icons] as React.ComponentType<{ className?: string, variant?: string }>;
                        return (
                        <motion.div
                            key={interest.id}
                            initial={{ opacity: 0, y: 40 }}
                            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                            transition={{
                                duration: 0.6,
                                delay: index * 0.15,
                                ease: [0.25, 0.4, 0.25, 1],
                            }}
                        >
                        <CardContainer
                            className="relative group inter-var"
                        >
                        <div className="relative bg-transparent backdrop-blur-[2px] rounded-2xl p-10 lg:p-8 md:p-6 transition-all duration-300 border border-gray-200 group/card">
                            <div className="relative mb-6 w-16 h-16 bg-g-500 rounded-xl flex items-center justify-center text-white">
                                {IconComponent ? (
                                <IconComponent variant='duotone' className="w-6 h-6 text-white" />
                                ) : null}
                            </div>

                            <CardItem translateZ="50" className="mb-4 text-h3 text-g-500">
                                {t(interest.titleKey)}
                            </CardItem>

                            <p className="relative text-body text-g-100 leading-relaxed">
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
