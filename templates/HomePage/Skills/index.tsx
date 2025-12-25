"use client";

import { CardPattern, generateRandomString } from "@/components/ui/evervault-card";
import { useMotionValue, motion, useInView } from "motion/react";
import { useState, useEffect, useRef } from "react";
import type { SkillGroup } from "@/types";

type SkillsProps = {
    skills: SkillGroup[];
};

const Skills = ({ skills }: SkillsProps) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });

    return (
        <div className="py150 bg-[#FAFAFA]">
            <div className="container" id="skills">
                <div className="mb-2 label">Expertise</div>
                <div className="mb-12 text-h1 2xl:mb-25">
                    Technical Skills <br />& Areas of Expertise
                </div>
                <div ref={ref} className="grid grid-cols-2 gap-10 lg:grid-cols-1 lg:gap-8">
                    {skills.map((skillGroup, index) => (
                        <SkillCard 
                            key={skillGroup._id || index} 
                            skillGroup={skillGroup}
                            index={index}
                            isInView={isInView}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

const SkillCard = ({ 
    skillGroup, 
    index,
    isInView 
}: { 
    skillGroup: SkillGroup; 
    index: number;
    isInView: boolean;
}) => {
    let mouseX = useMotionValue(0);
    let mouseY = useMotionValue(0);
    const [randomString, setRandomString] = useState("");

    useEffect(() => {
        const str = generateRandomString(1500);
        setRandomString(str);
    }, []);

    function onMouseMove({ currentTarget, clientX, clientY }: any) {
        let { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);

        const str = generateRandomString(1500);
        setRandomString(str);
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{
                duration: 0.6,
                delay: index * 0.15,
                ease: [0.25, 0.4, 0.25, 1],
            }}
            className="group/card bg-white rounded-2xl p-10 lg:p-8 md:p-6 relative overflow-hidden cursor-pointer transition-all border border-gray-200"
            onMouseMove={onMouseMove}
        >
            <CardPattern mouseX={mouseX} mouseY={mouseY} randomString={randomString} />

            <div className="relative z-10">
                <div className="mb-6 text-h3 text-g-500">
                    {skillGroup.category}
                </div>

                <div className="flex flex-wrap gap-3">
                    {skillGroup.items?.map((skill: string) => (
                        <div
                            key={skill}
                            className="px-4 py-2 text-sm bg-g-20 backdrop-blur-sm border border-gray-200 rounded-full text-body text-g-500 font-medium transition-colors group-hover/card:bg-white/50"
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
