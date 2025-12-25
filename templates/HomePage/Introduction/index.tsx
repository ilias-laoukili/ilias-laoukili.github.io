"use client";

import Image from "@/components/Image";
import Button from "@/components/Button";
import { motion, useInView } from "motion/react";
import { useRef } from "react";
import type { HomeSettings, Stat } from "@/types";

type IntroductionProps = {
    homeSettings: HomeSettings;
};

const Introduction = ({ homeSettings }: IntroductionProps) => {
    const statsRef = useRef(null);
    const isStatsInView = useInView(statsRef, { once: true, amount: 0.3 });

    return (
        <div className="pt150 pb-19 bg-[#FAFAFA] md:pb-0 md:bg-transparent">
            <div className="container" id="about">
                <div className="flex mb-32 xl:mb-25 lg:block">
                    <div className="label shrink-0 w-[27.19rem] 2xl:w-[18rem] lg:w-full lg:mb-16">
                        About Me
                    </div>
                    <div className="grow">
                        <div className="mb-8 text-h1">
                            {homeSettings.introduction}
                        </div>
                        <Button
                            title="See my projects"
                            arrow
                            href="#projects"
                        />
                    </div>
                </div>

                <div ref={statsRef} className="grid grid-cols-4 gap-6 mb-16 xl:mb-25 md:grid-cols-2 md:gap-4">
                    {homeSettings.stats?.map((stat: Stat, index: number) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, scale: 0.8, y: 20 }}
                            animate={isStatsInView ? { 
                                opacity: 1, 
                                scale: 1, 
                                y: 0 
                            } : { 
                                opacity: 0, 
                                scale: 0.8, 
                                y: 20 
                            }}
                            transition={{
                                duration: 0.5,
                                delay: index * 0.1,
                                ease: [0.25, 0.4, 0.25, 1],
                            }}
                            className="bg-white rounded-2xl p-8 text-center md:p-6"
                        >
                            <div className="mb-2 text-h1 text-g-500">
                                {stat.value}
                            </div>
                            <div className="text-body text-g-100">
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
