import React from 'react';
import { motion } from 'framer-motion';

const Preloader = ({ theme }) => (
    <motion.div 
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
        className={`fixed inset-0 z-[300] flex items-center justify-center ${theme === 'dark' ? 'bg-[#0D0D0D]' : 'bg-[#F5F5F5]'}`}
    >
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: 'easeInOut', repeat: 1, repeatType: 'reverse' }}
        >
            <svg width="60" height="60" viewBox="0 0 100 100">
                <path d="M20,80 L50,20 L80,80 Z" fill="none" stroke="#C51A24" strokeWidth="8"/>
                <path d="M25,70 L75,70" fill="none" stroke="#C51A24" strokeWidth="8"/>
            </svg>
        </motion.div>
    </motion.div>
);

export default Preloader;