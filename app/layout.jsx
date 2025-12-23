'use client';

import { Inter } from 'next/font/google';
import './globals.css';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useSpring } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { Analytics } from '@vercel/analytics/react';
import posthog from 'posthog-js';
import { PostHogProvider } from 'posthog-js/react';

// Context
import { ThemeProvider } from '../src/context/ThemeContext';

// Hooks
import { useInteractiveCursor } from '../src/hooks/useInteractiveCursor';

// Components
import Preloader from '../src/components/Preloader';
import Header from '../src/components/Header';
import MobileMenu from '../src/components/MobileMenu';
import Footer from '../src/components/Footer';

const inter = Inter({ subsets: ['latin'] });

// Initialize PostHog
if (typeof window !== 'undefined') {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY || '', {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://app.posthog.com',
    loaded: (posthog) => {
      if (process.env.NODE_ENV === 'development') posthog.debug();
    }
  });
}

// Background Grid Pattern Component
const GridPatternBackground = ({ theme }) => {
    const color = theme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.1)';
    return (
        <div className="absolute inset-0 z-0 overflow-hidden">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                        <path d="M 64 0 L 0 0 0 64" fill="none" stroke={color} strokeWidth="0.5"/>
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
        </div>
    );
};

export default function RootLayout({ children }) {
    const [isLoading, setIsLoading] = useState(true);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isTouchDevice, setIsTouchDevice] = useState(false);
    const [theme, setTheme] = useState('dark');
    
    const pathname = usePathname();
    const isTerminalPage = pathname === '/terminal';

    useEffect(() => {
        // Load saved theme
        const savedTheme = localStorage.getItem('theme') || 'dark';
        setTheme(savedTheme);
        
        // Check for touch device
        setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
        
        // Hide loader after delay
        const timer = setTimeout(() => setIsLoading(false), 2500);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        localStorage.setItem('theme', theme);
    }, [theme]);

    const { x: cursorX, y: cursorY, cursorVariant, cursorVariants } = useInteractiveCursor(isTouchDevice);
    const smoothCursorX = useSpring(cursorX, { stiffness: 500, damping: 40 });
    const smoothCursorY = useSpring(cursorY, { stiffness: 500, damping: 40 });
    const springConfig = { type: 'spring', stiffness: 200, damping: 20 };

    const themeClasses = theme === 'dark'
        ? 'bg-[#0D0D0D] text-white selection:bg-[#C51A24] selection:text-white'
        : 'bg-[#F5F5F5] text-black selection:bg-[#C51A24] selection:text-white';

    return (
        <html lang="en" className={theme}>
            <body className={inter.className}>
                <ThemeProvider>
                    <PostHogProvider client={posthog}>
                        <div className={`relative antialiased font-['Inter',_sans_serif] min-h-screen w-full flex flex-col
                            ${!isTerminalPage ? `transition-colors duration-500 ${themeClasses}` : ''} 
                            ${!isTouchDevice && !isTerminalPage ? 'cursor-none' : 'cursor-auto'}`}>
                        
                        {/* Custom Cursor */}
                        {!isTouchDevice && !isTerminalPage && (
                            <motion.div
                                variants={cursorVariants}
                                animate={cursorVariant}
                                transition={springConfig}
                                className="pointer-events-none fixed top-0 left-0 z-[100] rounded-full"
                                style={{
                                    x: smoothCursorX,
                                    y: smoothCursorY,
                                    translateX: '-50%',
                                    translateY: '-50%'
                                }}
                            />
                        )}

                        <AnimatePresence>
                            {isLoading && <Preloader theme={theme} />}
                        </AnimatePresence>

                        {!isLoading && (
                            <>
                                {/* Background Pattern */}
                                {!isTerminalPage && (
                                    <div className="fixed inset-0 z-0">
                                        <GridPatternBackground theme={theme} />
                                    </div>
                                )}
                                
                                <div className="relative z-10 flex flex-col min-h-screen">
                                    {/* Header */}
                                    {!isTerminalPage && (
                                        <>
                                            <Header
                                                onMenuClick={() => setIsMenuOpen(!isMenuOpen)}
                                                isMenuOpen={isMenuOpen}
                                            />
                                            <MobileMenu
                                                isOpen={isMenuOpen}
                                                closeMenu={() => setIsMenuOpen(false)}
                                            />
                                        </>
                                    )}
                                    
                                    {/* Main Content */}
                                    <main className="flex-1">
                                        {children}
                                    </main>
                                    
                                    {/* Footer */}
                                    {!isTerminalPage && <Footer />}
                                </div>
                            </>
                        )}
                    </div>
                    <Analytics />
                </PostHogProvider>            </ThemeProvider>            </body>
        </html>
    );
}
