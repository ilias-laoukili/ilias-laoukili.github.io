"use client";

import { motion, useInView } from "motion/react";
import { useRef, ReactNode } from "react";

type AnimatedSectionProps = {
    children: ReactNode;
    className?: string;
    delay?: number;
    direction?: "up" | "down" | "left" | "right";
};

const AnimatedSection = ({ 
    children, 
    className = "", 
    delay = 0,
    direction = "up" 
}: AnimatedSectionProps) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { 
        once: true, 
        amount: 0.2 
    });

    const directions = {
        up: { y: 60, x: 0 },
        down: { y: -60, x: 0 },
        left: { y: 0, x: 60 },
        right: { y: 0, x: -60 },
    };

    const initialPosition = directions[direction];

    return (
        <motion.div
            ref={ref}
            initial={{ 
                opacity: 0, 
                ...initialPosition 
            }}
            animate={isInView ? { 
                opacity: 1, 
                y: 0,
                x: 0 
            } : {
                opacity: 0,
                ...initialPosition
            }}
            transition={{
                duration: 0.7,
                delay: delay,
                ease: [0.25, 0.4, 0.25, 1], 
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

export default AnimatedSection;

