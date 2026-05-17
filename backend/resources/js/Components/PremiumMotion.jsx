import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

/**
 * 1. Mouse Position Tracker for Parallax/Ambient Effects
 */
export const useMousePosition = () => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    useEffect(() => {
        const handleMouseMove = (e) => {
            const { innerWidth, innerHeight } = window;
            // Map coordinates from -1 to 1 (center is 0)
            const x = (e.clientX - innerWidth / 2) / (innerWidth / 2);
            const y = (e.clientY - innerHeight / 2) / (innerHeight / 2);
            mouseX.set(x);
            mouseY.set(y);
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [mouseX, mouseY]);

    return { mouseX, mouseY };
};

/**
 * 2. FadeInUp Component
 * Smoothly fades and slides up on scroll
 */
export const FadeInUp = ({ children, delay = 0, duration = 0.8, className = "" }) => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration, delay, ease: [0.215, 0.61, 0.355, 1] }}
        className={className}
    >
        {children}
    </motion.div>
);

/**
 * 3. StaggerContainer Component
 * Container for staggering children animations
 */
export const StaggerContainer = ({ children, delay = 0, staggerChildren = 0.1, className = "" }) => (
    <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        variants={{
            hidden: {},
            show: {
                transition: {
                    staggerChildren,
                    delayChildren: delay
                }
            }
        }}
        className={className}
    >
        {children}
    </motion.div>
);

/**
 * 4. RevealText Component
 * Elegant upward text reveal, line by line or word by word
 */
export const RevealText = ({ text, className = "", delay = 0 }) => {
    const words = text.split(" ");
    return (
        <motion.div
            className={`flex flex-wrap ${className}`}
            variants={{
                hidden: {},
                show: {
                    transition: {
                        staggerChildren: 0.04,
                        delayChildren: delay
                    }
                }
            }}
            initial="hidden"
            animate="show"
        >
            {words.map((word, index) => (
                <div key={index} className="overflow-hidden mr-3 mb-1">
                    <motion.span
                        className="inline-block"
                        variants={{
                            hidden: { y: "100%", opacity: 0 },
                            show: { y: 0, opacity: 1 }
                        }}
                        transition={{ duration: 0.85, ease: [0.215, 0.61, 0.355, 1] }}
                    >
                        {word}
                    </motion.span>
                </div>
            ))}
        </motion.div>
    );
};

/**
 * 5. FloatingCard Component
 * Idle floating, glass reflection sweeping, and mouse parallax.
 */
export const FloatingCard = ({ children, delay = 0, yOffset = 0, className = "" }) => {
    const { mouseX, mouseY } = useMousePosition();
    const springConfig = { damping: 30, stiffness: 120 };
    
    const x = useSpring(useMotionValue(0), springConfig);
    const y = useSpring(useMotionValue(0), springConfig);

    useEffect(() => {
        const unsubscribeX = mouseX.on('change', (v) => {
            x.set(v * 6); // Max 6px horizontal movement
        });
        const unsubscribeY = mouseY.on('change', (v) => {
            y.set(v * 6); // Max 6px vertical movement
        });
        return () => {
            unsubscribeX();
            unsubscribeY();
        };
    }, [mouseX, mouseY, x, y]);

    return (
        <motion.div
            initial={{ opacity: 0, y: yOffset + 25 }}
            animate={{
                opacity: 1,
                y: [yOffset, yOffset - 12, yOffset],
            }}
            style={{ x, y }}
            transition={{
                delay,
                duration: 0.9,
                y: {
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut"
                }
            }}
            whileHover={{ scale: 1.025 }}
            className={`glass-reflection shimmer-border border border-white/10 ${className}`}
        >
            {children}
        </motion.div>
    );
};

/**
 * 6. MagneticButton Component
 * Gently pulls the button towards the cursor on hover.
 */
export const MagneticButton = ({ children, className = "" }) => {
    const ref = useRef(null);
    const springConfig = { damping: 15, stiffness: 180 };
    const x = useSpring(0, springConfig);
    const y = useSpring(0, springConfig);

    const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        const { left, top, width, height } = ref.current.getBoundingClientRect();
        const centerX = left + width / 2;
        const centerY = top + height / 2;
        const distanceX = clientX - centerX;
        const distanceY = clientY - centerY;
        
        // 25% pull ratio
        x.set(distanceX * 0.25);
        y.set(distanceY * 0.25);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            style={{ x, y }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={`inline-block ${className}`}
            whileTap={{ scale: 0.96 }}
        >
            {children}
        </motion.div>
    );
};

/**
 * 7. GlowButton Component
 * Reusable magnetic glow button with continuous soft breathing pulse.
 */
export const GlowButton = ({ children, className = "", glowColor = "#a855f7", onClick, ...props }) => {
    return (
        <MagneticButton className="w-full sm:w-auto">
            <motion.button
                whileHover={{ 
                    scale: 1.03,
                    boxShadow: `0 0 25px rgba(168, 85, 247, 0.4)`
                }}
                transition={{ duration: 0.3 }}
                className={`relative flex items-center justify-center rounded-2xl overflow-hidden glass-reflection border border-white/20 transition-all ${className}`}
                onClick={onClick}
                {...props}
            >
                {children}
            </motion.button>
        </MagneticButton>
    );
};
