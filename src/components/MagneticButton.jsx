import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { useMagneticEffect } from '../hooks/useMagneticEffect';

const MagneticButton = ({ children, ...props }) => {
    const ref = useRef(null);
    const { x, y } = useMagneticEffect(ref);

    return (
        <motion.button ref={ref} style={{ x, y }} {...props}>
            {children}
        </motion.button>
    );
};

export default MagneticButton;