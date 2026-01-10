"use client";

import { CardPattern, generateRandomString } from "@/components/ui/evervault-card";
import { useMotionValue, motion } from "motion/react";
import { useState, useEffect, useRef, useCallback } from "react";
import { useTranslations } from "@/lib/i18n/client";

type SkillCategory = {
    categoryKey: string;
    items: string[];
};

const SKILL_CATEGORIES: SkillCategory[] = [
    {
        categoryKey: "aiMl",
        items: ["Python", "TensorFlow", "PyTorch", "scikit-learn", "Keras", "NumPy", "Pandas", "OpenCV", "Hugging Face"],
    },
    {
        categoryKey: "webDev",
        items: ["React", "Next.js", "TypeScript", "Node.js", "TailwindCSS", "HTML/CSS", "REST APIs", "GraphQL"],
    },
    {
        categoryKey: "cloudDevops",
        items: ["AWS", "Docker", "Kubernetes", "CI/CD", "Git", "Linux", "Terraform", "MongoDB", "PostgreSQL"],
    },
    {
        categoryKey: "languages",
        items: ["Python", "TypeScript", "JavaScript", "Java", "C++", "SQL", "Bash", "R"],
    },
];

const Skills = () => {
    const { t } = useTranslations('home.skills');

    return (
        <div className="py150 bg-[#FAFAFA] dark:bg-gray-900">
            <div className="container" id="skills">
                <div className="mb-2 label dark:text-gray-400">{t('sectionTitle')}</div>
                <div className="mb-12 text-h1 2xl:mb-25 dark:text-white">
                    {t('subtitle').split(' & ')[0]} <br />& {t('subtitle').split(' & ')[1]}
                </div>
                <div className="grid grid-cols-2 gap-10 lg:grid-cols-1 lg:gap-8">
                    {SKILL_CATEGORIES.map((skillGroup, index) => (
                        <SkillCard 
                            key={skillGroup.categoryKey} 
                            skillGroup={skillGroup}
                            index={index}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

const SkillCard = ({ 
    skillGroup, 
    index
}: { 
    skillGroup: SkillCategory; 
    index: number;
}) => {
    const { t } = useTranslations('home.skills.categories');
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const [randomString, setRandomString] = useState("");
    const lastUpdateRef = useRef(0);

    useEffect(() => {
        const str = generateRandomString(1500);
        setRandomString(str);
    }, []);

    // Throttled mouse move handler - only update every 50ms
    const onMouseMove = useCallback(({ currentTarget, clientX, clientY }: React.MouseEvent) => {
        const now = Date.now();
        if (now - lastUpdateRef.current < 50) return;
        lastUpdateRef.current = now;

        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);

        // Only regenerate string occasionally for effect, not every move
        if (Math.random() < 0.3) {
            const str = generateRandomString(1500);
            setRandomString(str);
        }
    }, [mouseX, mouseY]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: [0.25, 0.4, 0.25, 1],
            }}
            className="group/card bg-white dark:bg-gray-800 rounded-2xl p-10 lg:p-8 md:p-6 relative overflow-hidden cursor-pointer border border-gray-200 dark:border-gray-700"
            onMouseMove={onMouseMove}
        >
            <CardPattern mouseX={mouseX} mouseY={mouseY} randomString={randomString} />

            <div className="relative z-10">
                <div className="mb-6 text-h3 text-g-500 dark:text-white">
                    {t(skillGroup.categoryKey)}
                </div>

                <div className="flex flex-wrap gap-3">
                    {skillGroup.items.map((skill: string) => (
                        <div
                            key={skill}
                            className="px-4 py-2 text-sm bg-g-20 dark:bg-gray-700 backdrop-blur-sm border border-gray-200 dark:border-gray-600 rounded-full text-body text-g-500 dark:text-gray-200 font-medium transition-colors group-hover/card:bg-white/50 dark:group-hover/card:bg-gray-600/50"
                        >
                            {skill}
                        </div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

export default Skills;
