"use client";

import { useState, useEffect, useCallback } from 'react';
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

        const onMouseEnter = (e: Event) => {
            const target = e.target as HTMLElement;
            if (target.dataset.cursorvariant) {
                setCursorVariant(target.dataset.cursorvariant);
            }
        };
        const onMouseLeave = () => setCursorVariant("default");

        const attachListeners = () => {
            const interactiveElements = document.querySelectorAll('[data-cursorvariant]');
            interactiveElements.forEach(el => {
                el.addEventListener('mouseenter', onMouseEnter);
                el.addEventListener('mouseleave', onMouseLeave);
            });
            return interactiveElements;
        };

        // Initial attach
        let elements = attachListeners();

        // Re-attach on DOM changes using MutationObserver
        const observer = new MutationObserver(() => {
            // Detach old listeners
            elements.forEach(el => {
                el.removeEventListener('mouseenter', onMouseEnter);
                el.removeEventListener('mouseleave', onMouseLeave);
            });
            // Attach to new elements
            elements = attachListeners();
        });

        observer.observe(document.body, { childList: true, subtree: true });

        return () => {
            observer.disconnect();
            elements.forEach(el => {
                el.removeEventListener('mouseenter', onMouseEnter);
                el.removeEventListener('mouseleave', onMouseLeave);
            });
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
