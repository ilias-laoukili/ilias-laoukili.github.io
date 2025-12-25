"use client";

import Button from "@/components/Button";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { motion } from "motion/react";
import ColorBends from "../hero";
import type { HomeSettings } from "@/types/index";

type MainProps = {
    homeSettings: HomeSettings;
};

const Main = ({ homeSettings }: MainProps) => (
    <div className="relative min-h-screen bg-white">
        <div className="absolute inset-0 z-0 w-full">
            <ColorBends
                colors={["#00ff00", "#32cd32", "#7fff88"]}
                rotation={30}
                speed={0.3}
                scale={1.2}
                frequency={1.43}
                warpStrength={1.2}
                mouseInfluence={0.8}
                parallax={-0.6}
                noise={0.08}
            />
        </div>
        <div className="container relative z-10 flex items-center justify-center min-h-[54.3125rem] 2xl:min-h-[48rem] md:min-h-screen">
            <div className="max-w-[70rem] text-center justify-center flex flex-col items-center">
                <motion.div 
                    className="text-h3 text-gray-700"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        duration: 0.6,
                        delay: 0.2,
                        ease: [0.25, 0.4, 0.25, 1],
                    }}
                >
                    {homeSettings.role}
                </motion.div>
                <motion.div 
                    className="flex flex-col items-center justify-center flex-wrap max-w-[50rem]"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        duration: 0.6,
                        delay: 0.4,
                        ease: [0.25, 0.4, 0.25, 1],
                    }}
                >
                    <span className="text-display text-gray-900">{homeSettings.title}</span><br/>
                    {/* <ContainerTextFlip
                        words={profileData.titleFlipWords}
                        interval={2500}
                        // className="text-h1 !py-2 !px-6 md:!text-h3"
                        textClassName="text-gray-900 font-inter-tight"
                    /> */}
                </motion.div>
                <motion.div 
                    className="mb-8 text-h6 text-gray-600 font-sans"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        duration: 0.6,
                        delay: 0.6,
                        ease: [0.25, 0.4, 0.25, 1],
                    }}
                >
                    {homeSettings.description}
                </motion.div>

                <motion.div 
                    className="flex gap-4 justify-center md:flex-col md:items-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        duration: 0.6,
                        delay: 0.8,
                        ease: [0.25, 0.4, 0.25, 1],
                    }}
                >
                    <Button
                        className="!border-gray-900 hover:!bg-gray-900 hover:!text-white"
                        title="Download CV"
                        arrow
                        href={homeSettings.cvPath || '/US_Ilias_Laoukili_CV.pdf'}
                    />
                    <HoverBorderGradient
                        containerClassName="rounded-full"
                        as="button"
                        className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2"
                        onClick={() => window.open('mailto:ilias.laoukili@proton.me', '_blank')}
                    >
                        <span>Contact Me</span>
                    </HoverBorderGradient>
                </motion.div>
            </div>
        </div>
    </div>
);

export default Main;
