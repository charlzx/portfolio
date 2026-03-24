"use client";

import { useRef, ReactNode } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { useMagneticEffect } from '@/hooks/useMagneticEffect';

interface MagneticButtonProps extends Omit<HTMLMotionProps<"button">, 'ref'> {
    children: ReactNode;
}

const MagneticButton = ({ children, ...props }: MagneticButtonProps) => {
    const ref = useRef<HTMLButtonElement>(null);
    const { x, y } = useMagneticEffect(ref);

    return (
        <motion.button ref={ref} style={{ x, y }} {...props}>
            {children}
        </motion.button>
    );
};

export default MagneticButton;
