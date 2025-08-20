import { React, useState, useEffect } from 'react';
import { motion, AnimatePresence, useSpring } from 'framer-motion';
import { Routes, Route, useLocation } from 'react-router-dom';

// Hooks
import { useInteractiveCursor } from './hooks/useInteractiveCursor';

// Components
import Preloader from './components/Preloader';
import Header from './components/Header';
import MobileMenu from './components/MobileMenu';

// Pages
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ProjectsPage from './pages/ProjectsPage';
import ContactPage from './pages/ContactPage';
import NotFoundPage from './pages/NotFoundPage';
import Terminal from './pages/Terminal';


// --- BACKGROUND ---
const GridPatternBackground = ({ theme }) => {
    const color = theme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.1)';
    return (
        <div className="absolute inset-0 z-0 overflow-hidden">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <pattern id="grid" width="64" height="64" patternUnits="userSpaceOnUse">
                        <path d="M 64 0 L 0 0 0 64" fill="none" stroke={color} strokeWidth="0.5"/>
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
        </div>
    );
};


// --- MAIN APP COMPONENT ---
export default function App() {
    const [isLoading, setIsLoading] = useState(true);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isTouchDevice, setIsTouchDevice] = useState(false);
    const [theme, setTheme] = useState(() => {
        if (typeof window !== 'undefined') {
            const savedTheme = localStorage.getItem('theme');
            return savedTheme || 'dark';
        }
        return 'dark';
    });

    const location = useLocation();
    // This is the key change: we check if the current path is '/terminal'
    const isTerminalPage = location.pathname === '/terminal';

    useEffect(() => {
        setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
    }, []);

    const { x: cursorX, y: cursorY, cursorVariant, cursorVariants } = useInteractiveCursor(isTouchDevice);

    const smoothCursorX = useSpring(cursorX, { stiffness: 500, damping: 40 });
    const smoothCursorY = useSpring(cursorY, { stiffness: 500, damping: 40 });

    const springConfig = { type: 'spring', stiffness: 200, damping: 20 };

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 2500);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('theme', theme);
        }
    }, [theme]);

    const toggleTheme = () => {
        setTheme(currentTheme => currentTheme === 'light' ? 'dark' : 'light');
    };

    const themeClasses = theme === 'dark'
        ? 'bg-[#0D0D0D] text-white selection:bg-[#C51A24] selection:text-white'
        : 'bg-[#F5F5F5] text-black selection:bg-[#C51A24] selection:text-white';

    return (
        <>
            <link href="https://fonts.cdnfonts.com/css/neue-machina" rel="stylesheet" />
            <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />

            {/* Conditionally apply theme and cursor styles. */}
            <div className={`relative antialiased font-['Inter',_sans_serif] min-h-screen w-full 
                ${!isTerminalPage ? `transition-colors duration-500 ${themeClasses}` : ''} 
                ${!isTouchDevice && !isTerminalPage ? 'cursor-none' : 'cursor-auto'}`}>
                
                {/* Conditionally render the custom cursor. It won't appear on the terminal page. */}
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
                    <div className="relative z-10">
                        {/* Conditionally render the background, header, and menu. */}
                        {!isTerminalPage && (
                            <>
                                <GridPatternBackground theme={theme} />
                                <Header
                                    onMenuClick={() => setIsMenuOpen(!isMenuOpen)}
                                    theme={theme}
                                    toggleTheme={toggleTheme}
                                    isTouchDevice={isTouchDevice}
                                    isMenuOpen={isMenuOpen}
                                />
                                <MobileMenu
                                    isOpen={isMenuOpen}
                                    closeMenu={() => setIsMenuOpen(false)}
                                    theme={theme}
                                />
                            </>
                        )}
                        <AnimatePresence mode="wait">
                           <Routes location={location} key={location.pathname}>
                                <Route index element={<HomePage theme={theme} />} />
                                <Route path="/contact" element={<ContactPage theme={theme} />} />
                                <Route path="/:path" element={<AboutPage theme={theme} />} />
                                <Route path="/:path/projects" element={<ProjectsPage theme={theme} />} />
                                <Route path="*" element={<NotFoundPage theme={theme} />} />
                                {/* The terminal route renders without the themed layout */}
                                <Route path="/terminal" element={<Terminal theme={theme} />} />
                           </Routes>
                        </AnimatePresence>
                    </div>
                )}
            </div>
        </>
    );
}
