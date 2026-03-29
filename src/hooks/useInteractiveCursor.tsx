"use client";

import { useState, useEffect } from 'react';
import { useMotionValue } from 'framer-motion';

export const useInteractiveCursor = (isTouchDevice: boolean) => {
    const x = useMotionValue(-200);
    const y = useMotionValue(-200);
    const [cursorVariant, setCursorVariant] = useState("default");

    useEffect(() => {
        if (!isTouchDevice) {
            const moveCursor = (e: MouseEvent) => {
                x.set(e.clientX);
                y.set(e.clientY);
            };
            window.addEventListener('mousemove', moveCursor);
            document.body.style.cursor = 'none';

            return () => {
                window.removeEventListener('mousemove', moveCursor);
                document.body.style.cursor = 'auto';
            };
        }
    }, [isTouchDevice, x, y]);
    
    useEffect(() => {
        if (isTouchDevice) return;

        const getVariant = (target: EventTarget | null) => {
            if (!(target instanceof HTMLElement)) return null;
            const interactive = target.closest<HTMLElement>('[data-cursorvariant]');
            return interactive?.dataset.cursorvariant ?? null;
        };

        const onMouseOver = (e: MouseEvent) => {
            const variant = getVariant(e.target);
            if (variant) {
                setCursorVariant(variant);
            }
        };

        const onMouseOut = (e: MouseEvent) => {
            const fromVariant = getVariant(e.target);
            if (!fromVariant) return;

            const toVariant = getVariant(e.relatedTarget);
            if (toVariant !== fromVariant) {
                setCursorVariant(toVariant ?? "default");
            }
        };

        document.addEventListener('mouseover', onMouseOver);
        document.addEventListener('mouseout', onMouseOut);

        return () => {
            document.removeEventListener('mouseover', onMouseOver);
            document.removeEventListener('mouseout', onMouseOut);
        };
    }, [isTouchDevice]);

    const cursorVariants = {
        default: { 
            width: 20, 
            height: 20, 
            backgroundColor: 'white',
            mixBlendMode: 'difference' as const
        },
        hover: { 
            width: 50, 
            height: 50, 
            backgroundColor: 'white',
            mixBlendMode: 'difference' as const
        },
    };

    return { x, y, cursorVariant, setCursorVariant, cursorVariants };
};
