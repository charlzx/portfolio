import { useState, useEffect } from 'react';
import { useMotionValue } from 'framer-motion';

export const useInteractiveCursor = (isTouchDevice) => {
    const x = useMotionValue(-200);
    const y = useMotionValue(-200);
    const [cursorVariant, setCursorVariant] = useState("default");

    useEffect(() => {
        if (!isTouchDevice) {
            const moveCursor = (e) => {
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
        if (!isTouchDevice) {
            const onMouseEnter = (e) => {
                if (e.target.dataset.cursorvariant) {
                    setCursorVariant(e.target.dataset.cursorvariant);
                }
            };
            const onMouseLeave = () => setCursorVariant("default");

            const interactiveElements = document.querySelectorAll('[data-cursorvariant]');
            interactiveElements.forEach(el => {
                el.addEventListener('mouseenter', onMouseEnter);
                el.addEventListener('mouseleave', onMouseLeave);
            });

            return () => {
                 interactiveElements.forEach(el => {
                    el.removeEventListener('mouseenter', onMouseEnter);
                    el.removeEventListener('mouseleave', onMouseLeave);
                });
            };
        }
    }, [isTouchDevice]);

    const cursorVariants = {
        default: { 
            width: 20, 
            height: 20, 
            backgroundColor: 'white',
            mixBlendMode: 'difference' 
        },
        hover: { 
            width: 50, 
            height: 50, 
            backgroundColor: 'white',
            mixBlendMode: 'difference'
        },
    };

    return { x, y, cursorVariant, setCursorVariant, cursorVariants };
};
