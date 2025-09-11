// src/pages/NotFoundPage.jsx

import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import MagneticButton from '../components/MagneticButton';

const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeInOut' } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.5, ease: 'easeInOut' } }
};

const CompassIcon = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon>
    </svg>
);

const NotFoundPage = ({ theme }) => {
    const navigate = useNavigate();
    const textColor = theme === 'dark' ? 'text-white' : 'text-black';
    const mutedTextColor = theme === 'dark' ? 'text-gray-400' : 'text-gray-600';

    useEffect(() => {
        if (typeof document === 'undefined') return;
        document.title = "404 Not Found | Charlz's Portfolio";
        let meta = document.head.querySelector('meta[name="description"]');
        if (!meta) {
            meta = document.createElement('meta');
            meta.setAttribute('name', 'description');
            document.head.appendChild(meta);
        }
        meta.setAttribute('content', "Page not found. Return to Charlz's portfolio home.");
    }, []);

    return (
            <motion.div 
                variants={pageVariants} 
                initial="initial" 
                animate="animate" 
                exit="exit" 
                className="min-h-screen flex items-center justify-center container mx-auto px-6"
            >
                <div className="grid md:grid-cols-2 items-center gap-12 w-full max-w-5xl">
                    <div className="text-center md:text-left">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                        >
                            <CompassIcon className={`w-16 h-16 mx-auto md:mx-0 mb-4 ${textColor}`} />
                            <h1 className="text-4xl md:text-5xl font-bold mb-4" data-cursorvariant="hover">
                                It seems you're lost.
                            </h1>
                            <p className={`mb-8 text-lg ${mutedTextColor}`}>
                                The page you were looking for couldn't be found. Let's get you back on track.
                            </p>
                            <MagneticButton 
                                onClick={() => navigate('/')}
                                className="bg-[#C51A24] text-white px-10 py-3 rounded-full font-bold transition-transform hover:scale-105"
                            >
                                Return Home
                            </MagneticButton>
                        </motion.div>
                    </div>
                    <motion.div
                        className="relative flex items-center justify-center"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.4, type: 'spring' }}
                    >
                        <h1 
                            className={`text-9xl md:text-[200px] font-black opacity-10 select-none ${textColor}`}
                            data-cursorvariant="hover"
                        >
                            404
                        </h1>
                    </motion.div>
                </div>
            </motion.div>
    );
};

export default NotFoundPage;
