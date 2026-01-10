"use client";

import Button from "@/components/Button";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { motion } from "motion/react";
import dynamic from "next/dynamic";
import { useTranslations } from "@/lib/i18n/client";
import { useState, useEffect } from "react";

// Dynamically import the heavy 3D component - defer loading until after LCP
const ColorBends = dynamic(() => import("../hero"), {
    ssr: false,
    loading: () => null,
});

const Main = () => {
    const { t } = useTranslations('home.hero');
    const [show3D, setShow3D] = useState(false);
    
    // Defer 3D background loading until after initial paint
    useEffect(() => {
        // Use requestIdleCallback for non-critical 3D loading
        if ('requestIdleCallback' in window) {
            (window as any).requestIdleCallback(() => setShow3D(true), { timeout: 1000 });
        } else {
            // Fallback for Safari
            setTimeout(() => setShow3D(true), 100);
        }
    }, []);
    
    return (
        <div className="relative min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
            {/* Deferred 3D background - loads after LCP */}
            {show3D && (
                <div className="absolute inset-0 z-0 w-full animate-fade-in">
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
            )}
            <div className="container relative z-10 flex items-center justify-center min-h-[54.3125rem] 2xl:min-h-[48rem] md:min-h-screen">
                <div className="max-w-[70rem] text-center justify-center flex flex-col items-center">
                    {/* LCP Element - Role subtitle - NO animation delay */}
                    <div className="text-h3 text-gray-700 dark:text-gray-300">
                        {t('role')}
                    </div>
                    {/* LCP Element - Main title - render immediately with NO delay */}
                    <h1 className="flex flex-col items-center justify-center flex-wrap max-w-[50rem]">
                        <span className="text-display text-gray-900 dark:text-white">{t('title')}</span>
                    </h1>
                    {/* Description - NO delay */}
                    <p className="mb-8 text-h6 text-gray-600 dark:text-gray-400 font-sans">
                        {t('description')}
                    </p>

                {/* CTA buttons - animate after LCP */}
                <motion.div 
                    className="flex gap-4 justify-center md:flex-col md:items-center"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        duration: 0.4,
                        delay: 0.1,
                        ease: "easeOut",
                    }}
                >
                    <Button
                        className="!border-gray-900 !bg-gray-900 !text-white hover:!bg-white hover:!text-gray-900 dark:!border-white dark:!bg-white dark:!text-gray-900 dark:hover:!bg-gray-900 dark:hover:!text-white"
                        title={t('downloadCv')}
                        arrow
                        href={'/US_Ilias_Laoukili_CV.pdf'}
                    />
                    <HoverBorderGradient
                        containerClassName="rounded-full"
                        as="button"
                        className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2"
                        onClick={() => window.open('mailto:ilias.laoukili@outlook.com', '_blank')}
                    >
                        <span>{t('contactMe')}</span>
                    </HoverBorderGradient>
                </motion.div>
            </div>
        </div>
    </div>
    );
};

export default Main;
