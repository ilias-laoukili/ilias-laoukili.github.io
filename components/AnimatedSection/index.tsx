"use client";

import { motion } from "motion/react";
import { ReactNode, useMemo } from "react";

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
    const initialPosition = useMemo(() => {
        const directions = {
            up: { y: 40, x: 0 },
            down: { y: -40, x: 0 },
            left: { y: 0, x: 40 },
            right: { y: 0, x: -40 },
        };
        return directions[direction];
    }, [direction]);

    return (
        <motion.div
            initial={{ 
                opacity: 0, 
                ...initialPosition 
            }}
            whileInView={{ 
                opacity: 1, 
                y: 0,
                x: 0 
            }}
            viewport={{ once: true, amount: 0.15, margin: "-50px" }}
            transition={{
                duration: 0.5,
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

