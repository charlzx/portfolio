"use client";

import { useEffect, RefObject } from 'react';
import { useSpring } from 'framer-motion';

export const useMagneticEffect = (ref: RefObject<HTMLElement | null>) => {
    const x = useSpring(0, { stiffness: 300, damping: 30, mass: 0.5 });
    const y = useSpring(0, { stiffness: 300, damping: 30, mass: 0.5 });

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const handleMouseMove = (e: MouseEvent) => {
            const rect = el.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const distance = Math.sqrt(Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - centerY, 2));

            if (distance < rect.width * 1.5) { // Activation distance
                x.set((e.clientX - centerX) * 0.25);
                y.set((e.clientY - centerY) * 0.25);
            } else {
                x.set(0);
                y.set(0);
            }
        };

        const handleMouseLeave = () => {
            x.set(0);
            y.set(0);
        };

        window.addEventListener('mousemove', handleMouseMove);
        el.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            el.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [ref, x, y]);

    return { x, y };
};
