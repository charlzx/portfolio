import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView, useSpring, useMotionValue } from 'framer-motion';
import * as THREE from 'three';

// --- HELPER ICONS ---

const ArrowIcon = ({ className }) => (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M13.5 4.5L21 12M21 12L13.5 19.5M21 12H3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const SunIcon = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
    </svg>
);

const MoonIcon = ({ className }) => (
     <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
    </svg>
);

const DownloadIcon = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
        <polyline points="7 10 12 15 17 10"></polyline>
        <line x1="12" y1="15" x2="12" y2="3"></line>
    </svg>
);

const BriefcaseIcon = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
    </svg>
);

const CodeIcon = ({ className }) => (
     <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6"></polyline>
        <polyline points="8 6 2 12 8 18"></polyline>
    </svg>
);

const GithubIcon = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
    </svg>
);

const ExternalLinkIcon = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
        <polyline points="15 3 21 3 21 9"></polyline>
        <line x1="10" y1="14" x2="21" y2="3"></line>
    </svg>
);


// --- DYNAMIC & INTERACTIVE HOOKS ---

const useInteractiveCursor = (isTouchDevice) => {
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


const useMagneticEffect = (ref) => {
    const x = useSpring(0, { stiffness: 150, damping: 15, mass: 0.1 });
    const y = useSpring(0, { stiffness: 150, damping: 15, mass: 0.1 });

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const handleMouseMove = (e) => {
            const rect = el.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const distance = Math.sqrt(Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - centerY, 2));

            if (distance < rect.width * 1.5) { // Activation distance
                x.set((e.clientX - centerX) * 0.2);
                y.set((e.clientY - centerY) * 0.2);
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


// --- MAIN APP COMPONENT ---

export default function App() {
    const [page, setPage] = useState('home');
    const [path, setPath] = useState(null); // 'finance' or 'frontend'
    const [isLoading, setIsLoading] = useState(true);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isTouchDevice, setIsTouchDevice] = useState(false);
    // Set 'dark' as the default theme
    const [theme, setTheme] = useState(() => {
        if (typeof window !== 'undefined') {
            const savedTheme = localStorage.getItem('theme');
            return savedTheme || 'dark';
        }
        return 'dark';
    });
    
    useEffect(() => {
        setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
    }, []);

    const { x: cursorX, y: cursorY, cursorVariant, setCursorVariant, cursorVariants } = useInteractiveCursor(isTouchDevice);
    
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

    const navigateTo = (newPage) => {
        if (page === newPage) return;
        setPage(newPage);
        setIsMenuOpen(false);
    };
    
    const selectPath = (chosenPath) => {
        setPath(chosenPath);
        navigateTo('about');
    };
    
    const goHome = () => {
        setPath(null);
        navigateTo('home');
    }

    const toggleTheme = () => {
        setTheme(currentTheme => currentTheme === 'light' ? 'dark' : 'light');
    };

    const themeClasses = theme === 'dark' 
        ? 'bg-[#0D0D0D] text-white selection:bg-[#C51A24] selection:text-white'
        : 'bg-[#F5F5F5] text-black selection:bg-[#C51A24] selection:text-white';

    const renderPage = () => {
        if (!path) {
            return <HomePage theme={theme} selectPath={selectPath} navigateTo={navigateTo} />;
        }
        
        switch(page) {
            case 'about': return <AboutPage theme={theme} path={path} />;
            case 'projects':
                return path === 'frontend' ? <ProjectsPage theme={theme} path={path} /> : <AboutPage theme={theme} path={path} />;
            case 'contact': return <ContactPage theme={theme} path={path} />;
            default: return <AboutPage theme={theme} path={path} />;
        }
    };

    return (
        <>
            <link href="https://fonts.cdnfonts.com/css/neue-machina" rel="stylesheet" />
            <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />

            <div className={`relative antialiased font-['Inter',_sans-serif] min-h-screen w-full transition-colors duration-500 ${themeClasses}`}>
                {!isTouchDevice && (
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
                        <GridPatternBackground theme={theme} />
                        <Header 
                            currentPage={page} 
                            navigateTo={navigateTo}
                            goHome={goHome}
                            path={path}
                            onMenuClick={() => setIsMenuOpen(!isMenuOpen)}
                            theme={theme}
                            toggleTheme={toggleTheme}
                            isTouchDevice={isTouchDevice}
                            isMenuOpen={isMenuOpen}
                            selectPath={selectPath}
                        />
                        <MobileMenu 
                            isOpen={isMenuOpen} 
                            navigateTo={navigateTo}
                            path={path}
                            theme={theme}
                        />
                        <AnimatePresence mode="wait">
                            <main key={page + path}>
                                {renderPage()}
                            </main>
                        </AnimatePresence>
                    </div>
                )}
            </div>
        </>
    );
}

// --- PRELOADER ---
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

// --- MAGNETIC BUTTON ---
const MagneticButton = ({ children, ...props }) => {
    const ref = useRef(null);
    const { x, y } = useMagneticEffect(ref);

    return (
        <motion.button ref={ref} style={{ x, y }} {...props}>
            {children}
        </motion.button>
    );
};


// --- HEADER, FOOTER & MENUS ---
const Path = props => (
  <motion.path
    fill="transparent"
    strokeWidth="3"
    stroke="currentColor"
    strokeLinecap="round"
    {...props}
  />
);

const MenuToggle = ({ toggle }) => (
  <button onClick={toggle} className="md:hidden p-2 z-50">
    <svg width="23" height="23" viewBox="0 0 23 23">
      <Path
        variants={{
          closed: { d: "M 2 2.5 L 20 2.5" },
          open: { d: "M 3 16.5 L 17 2.5" }
        }}
      />
      <Path
        d="M 2 9.423 L 20 9.423"
        variants={{
          closed: { opacity: 1 },
          open: { opacity: 0 }
        }}
        transition={{ duration: 0.1 }}
      />
      <Path
        variants={{
          closed: { d: "M 2 16.346 L 20 16.346" },
          open: { d: "M 3 2.5 L 17 16.346" }
        }}
      />
    </svg>
  </button>
);

const Header = ({ currentPage, navigateTo, goHome, path, onMenuClick, theme, toggleTheme, isTouchDevice, isMenuOpen, selectPath }) => {
    const baseNavItems = [
        { id: 'about', label: 'About' },
        { id: 'contact', label: 'Contact' },
    ];
    
    const navItems = path === 'frontend' 
        ? [
            { id: 'about', label: 'About' },
            { id: 'projects', label: 'Projects' },
            { id: 'contact', label: 'Contact' },
          ]
        : baseNavItems;
    
    const headerBgClass = theme === 'dark' ? 'bg-transparent' : 'bg-transparent';
    const textColorClass = theme === 'dark' ? 'text-white' : 'text-black';

    return (
        <header className={`${isTouchDevice ? 'relative' : 'fixed'} top-0 left-0 right-0 z-50 ${headerBgClass}`}>
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                 <button className={`flex items-center space-x-2 ${textColorClass}`} onClick={goHome} data-cursorvariant="hover">
                     <svg width="28" height="28" viewBox="0 0 100 100">
                        <path d="M20,80 L50,20 L80,80 Z" fill="none" stroke="#C51A24" strokeWidth="8"/>
                        <path d="M25,70 L75,70" fill="none" stroke="#C51A24" strokeWidth="8"/>
                    </svg>
                    {path && <span className="text-xl font-bold tracking-wider">CHARLZ</span>}
                </button>
                <AnimatePresence>
                {path && (
                    <motion.nav 
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="hidden md:flex items-center space-x-2 backdrop-blur-sm bg-black/20 border border-white/10 p-1 rounded-full"
                    >
                        {navItems.map(item => (
                            <button 
                                key={item.id} 
                                onClick={() => navigateTo(item.id)} 
                                className={`relative text-sm uppercase tracking-widest transition-colors duration-300 px-4 py-2 rounded-full ${currentPage === item.id ? 'text-white' : 'text-gray-300 hover:text-white'}`} 
                                data-cursorvariant="hover"
                            >
                                {currentPage === item.id && (
                                    <motion.span
                                        className="absolute inset-0 rounded-full bg-[#C51A24]"
                                        layoutId="active-pill"
                                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                    />
                                )}
                                <span className="relative z-10">{item.label}</span>
                            </button>
                        ))}
                    </motion.nav>
                )}
                </AnimatePresence>
                 <div className="flex items-center gap-4">
                    {!path && (
                        <div className="hidden md:flex items-center gap-4">
                             <button onClick={() => selectPath('finance')} className={`p-2 rounded-full ${textColorClass}`} data-cursorvariant="hover" aria-label="Finance Path">
                                <BriefcaseIcon className="w-5 h-5" />
                            </button>
                             <button onClick={() => selectPath('frontend')} className={`p-2 rounded-full ${textColorClass}`} data-cursorvariant="hover" aria-label="Frontend Path">
                                <CodeIcon className="w-5 h-5" />
                            </button>
                        </div>
                    )}
                    {path === 'frontend' && (
                        <a href="https://github.com/your-profile" target="_blank" rel="noopener noreferrer" className={`hidden md:block p-2 rounded-full ${textColorClass} hover:text-[#C51A24] transition-colors`} data-cursorvariant="hover">
                            <GithubIcon className="w-5 h-5" />
                        </a>
                    )}
                    <button onClick={toggleTheme} className={`p-2 rounded-full ${textColorClass}`} data-cursorvariant="hover">
                        {theme === 'dark' ? <SunIcon className="w-5 h-5" /> : <MoonIcon className="w-5 h-5" />}
                    </button>
                    {path && (
                        <motion.nav
                            className="md:hidden"
                            initial={false}
                            animate={isMenuOpen ? "open" : "closed"}
                        >
                            <MenuToggle toggle={onMenuClick} />
                        </motion.nav>
                    )}
                 </div>
            </div>
        </header>
    );
};

const mobileNavVariants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 }
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 }
  }
};

const mobileLinkVariants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 }
    }
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 }
    }
  }
};

const MobileMenu = ({ isOpen, navigateTo, path, theme }) => {
    const baseNavItems = [
        { id: 'about', label: 'About' },
        { id: 'contact', label: 'Contact' },
    ];
    
    const navItems = path === 'frontend' 
        ? [
            { id: 'about', label: 'About' },
            { id: 'projects', label: 'Projects' },
            { id: 'contact', label: 'Contact' },
          ]
        : baseNavItems;

    const menuVariants = {
        open: {
            clipPath: `circle(150% at 90% 10%)`,
            transition: {
                type: "spring",
                stiffness: 20,
                restDelta: 2
            }
        },
        closed: {
            clipPath: "circle(0% at 90% 10%)",
            transition: {
                delay: 0.5,
                type: "spring",
                stiffness: 400,
                damping: 40
            }
        }
    };
    
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial="closed"
                    animate="open"
                    exit="closed"
                    variants={menuVariants}
                    className={`fixed inset-0 z-40 ${theme === 'dark' ? 'bg-[#111]' : 'bg-[#F0F0F0]'}`}
                >
                    <motion.ul 
                        variants={mobileNavVariants}
                        className="h-full flex flex-col items-center justify-center space-y-6"
                    >
                        {navItems.map(item => (
                            <motion.li key={item.id} variants={mobileLinkVariants}>
                                <button onClick={() => navigateTo(item.id)} className="text-4xl font-bold" data-cursorvariant="hover">{item.label}</button>
                            </motion.li>
                        ))}
                    </motion.ul>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

// --- PAGES & SECTIONS ---

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

const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeInOut' } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.5, ease: 'easeInOut' } }
};

const HomePage = ({ theme, selectPath, navigateTo }) => {
    // Updated HighlightedLink to use Tailwind's group-hover for the underline effect
    const HighlightedLink = ({ children, onClick, href }) => {
        const linkColor = theme === 'dark' ? 'text-white font-bold' : 'text-black font-bold';
        const underlineColor = theme === 'dark' ? 'bg-gray-700' : 'bg-gray-300';
        
        const commonProps = {
            className: `group cursor-pointer relative inline-block transition-colors duration-300 ${linkColor}`,
            "data-cursorvariant": "hover",
        };

        const content = (
            <>
                {children}
                <span
                    className={`absolute bottom-0 left-0 h-0.5 ${underlineColor} origin-left transform scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100`}
                />
            </>
        );

        if (href) {
            return (
                <a href={href} target="_blank" rel="noopener noreferrer" {...commonProps}>
                    {content}
                </a>
            );
        }

        return (
            <span onClick={onClick} {...commonProps}>
                {content}
            </span>
        );
    };

    return (
        <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
            <div className="relative min-h-screen flex items-center justify-center overflow-hidden px-4">
                <div className="relative z-10 max-w-4xl text-left intro">
                    <h2 className="text-2xl md:text-3xl font-light mb-4 flex items-center" data-cursorvariant="hover">
                        Hello
                        <motion.span
                            className="ml-3 text-3xl"
                            animate={{ rotate: [0, 20, 0, 20, 0] }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                repeatDelay: 1,
                                ease: "easeInOut",
                            }}
                        >
                            👋🏾
                        </motion.span>
                    </h2>
                    <h1 className="text-5xl md:text-6xl font-extrabold tracking-tighter mb-6" data-cursorvariant="hover">
                        I'm Charles Obuzor
                    </h1>
                    <p className={`text-l md:text-l leading-relaxed ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                        I'm a graduate of business administration working in{' '}
                        <HighlightedLink onClick={() => selectPath('finance')}>Business consulting and finance.&nbsp;</HighlightedLink>
                        Outside of that, I{' '}
                        <HighlightedLink onClick={() => selectPath('frontend')}>build frontend interfaces</HighlightedLink>
                        {' '}for the web. I focus on clean design, fast performance, and practical features. I enjoy breaking down problems and building tools that just work.
                        <br/><br/>
                        When I'm not deep in client strategy or debugging code, I read reports, explore product ideas, test UI layouts, play{' '}
                        <HighlightedLink href="https://open.spotify.com/user/s76ocb47g23yzpwrf939hyvvw">music</HighlightedLink>
                        {' '}or play{' '}
                        <HighlightedLink href="https://www.chess.com/member/charlz-x">chess</HighlightedLink>
                        . I treat frontend work as a craft — something I do to stay sharp and think clearly. If you want to collaborate or talk shop, you can{' '}
                        <HighlightedLink onClick={() => navigateTo('contact')}>contact me</HighlightedLink>.
                    </p>
                </div>
            </div>
        </motion.div>
    );
};

// --- ABOUT PAGE ---

const AboutPage = ({ theme, path }) => {
    const content = {
        finance: {
            title: "About Me: The Financial Analyst",
            intro: "With a keen eye for market dynamics and a passion for data-driven insights, I specialize in financial modeling, valuation, and strategic investment analysis. My goal is to translate complex financial data into actionable strategies that drive business growth.",
            experience: [
                { title: "Senior Financial Analyst", company: "Global Investments Inc.", years: "2020 - Present", description: "Led financial planning and analysis for a $50M portfolio. Developed complex valuation models for M&A targets, resulting in two successful acquisitions." },
                { title: "Junior Analyst", company: "Capital Ventures", years: "2018 - 2020", description: "Conducted market research and supported senior analysts in due diligence processes. Prepared detailed reports on industry trends and competitor performance." },
            ],
            certifications: [
                { name: "Chartered Financial Analyst (CFA)", issuer: "CFA Institute", year: "2021" },
                { name: "Financial Modeling & Valuation Analyst (FMVA)", issuer: "Corporate Finance Institute (CFI)", year: "2019" },
            ],
            education: [
                { degree: "MSc in Finance", university: "London School of Economics", years: "2017 - 2018" },
                { degree: "BSc in Economics", university: "University of Lagos", years: "2013 - 2017" },
            ],
            cvUrl: "/charles-obuzor-finance-cv.pdf", // IMPORTANT: Replace with the actual path to your CV
        },
        frontend: {
            title: "About Me: The Frontend Developer",
            intro: "As a creative developer, I build beautiful, functional, and user-centric web experiences. I am proficient in the modern frontend stack, including React, Next.js, and Tailwind CSS, and I have a passion for creating pixel-perfect designs and intuitive interactions.",
            experience: [
                { title: "Freelance Frontend Developer", company: "Self-Employed", years: "2019 - Present", description: "Partnered with startups and small businesses to build and scale their web applications. Specialized in creating responsive, high-performance UIs with React and Next.js." },
                { title: "UI/UX Intern", company: "Innovate Solutions", years: "2018", description: "Assisted the design team in creating wireframes, mockups, and prototypes. Contributed to the development of a new design system using Figma and Storybook." },
            ],
            certifications: [
                { name: "React - The Complete Guide", issuer: "Udemy (Academind)", year: "2020" },
                { name: "Advanced CSS and Sass", issuer: "Udemy (Jonas Schmedtmann)", year: "2019" },
            ],
            education: [
                 { degree: "Self-Taught & Online Courses", university: "Various Platforms (freeCodeCamp, Scrimba)", years: "Ongoing" },
                 { degree: "BSc in Economics", university: "University of Lagos", years: "2013 - 2017" },
            ]
        }
    };
    
    const currentContent = content[path];

    const Section = ({ title, children }) => (
        <div className="mb-12">
            <h2 className="text-2xl font-bold border-b-2 border-[#C51A24] pb-2 mb-6" data-cursorvariant="hover">{title}</h2>
            <div className="space-y-8">
                {children}
            </div>
        </div>
    );

    return (
        <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" className="container mx-auto px-6 py-32 md:py-40">
            <div className="max-w-4xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between md:items-start mb-8 gap-4">
                    <h1 className="text-4xl md:text-5xl font-bold" data-cursorvariant="hover">{currentContent.title}</h1>
                    <div className="flex items-center gap-4 flex-shrink-0">
                        {path === 'finance' && (
                            <a
                                href={currentContent.cvUrl}
                                download
                                className={`group flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${theme === 'dark' ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-200 hover:bg-gray-300'}`}
                                data-cursorvariant="hover"
                            >
                                <DownloadIcon className="w-5 h-5" />
                                <span className="text-sm font-semibold">Download CV</span>
                            </a>
                        )}
                    </div>
                </div>
                <p className={`text-lg mb-16 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>{currentContent.intro}</p>

                <Section title="Experience">
                    {currentContent.experience.map(exp => (
                        <div key={exp.title}>
                            <h3 className="text-xl font-semibold">{exp.title}</h3>
                            <div className="flex justify-between items-baseline">
                                <p className="text-md text-[#C51A24]">{exp.company}</p>
                                <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{exp.years}</p>
                            </div>
                            <p className={`mt-2 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{exp.description}</p>
                        </div>
                    ))}
                </Section>

                <Section title="Certifications">
                     {currentContent.certifications.map(cert => (
                        <div key={cert.name}>
                            <h3 className="text-xl font-semibold">{cert.name}</h3>
                             <div className="flex justify-between items-baseline">
                                <p className="text-md text-[#C51A24]">{cert.issuer}</p>
                                <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{cert.year}</p>
                            </div>
                        </div>
                    ))}
                </Section>

                <Section title="Education">
                    {currentContent.education.map(edu => (
                         <div key={edu.degree}>
                            <h3 className="text-xl font-semibold">{edu.degree}</h3>
                             <div className="flex justify-between items-baseline">
                                <p className="text-md text-[#C51A24]">{edu.university}</p>
                                <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{edu.years}</p>
                            </div>
                        </div>
                    ))}
                </Section>
            </div>
        </motion.div>
    );
};

const ProjectCard = ({ project, theme }) => {
    const cardBg = theme === 'dark' ? 'bg-[#1a1a1a]/50 backdrop-blur-sm border-gray-800' : 'bg-white/50 backdrop-blur-sm border-gray-200';
    const textColor = theme === 'dark' ? 'text-gray-300' : 'text-gray-700';
    const titleColor = theme === 'dark' ? 'text-white' : 'text-black';
    const techPillBg = theme === 'dark' ? 'bg-[#C51A24]/10 text-[#C51A24]' : 'bg-[#C51A24]/10 text-[#C51A24]';

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className={`border rounded-lg flex flex-col h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${cardBg} overflow-hidden`}
        >
            <img 
                src={project.imageUrl} 
                alt={`${project.title} preview`} 
                className="w-full h-48 object-cover"
                onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/600x400/0D0D0D/C51A24?text=Image+Not+Found'; }}
            />
            <div className="p-6 flex flex-col flex-grow">
                <div className="flex-grow">
                    <div className="flex justify-between items-start mb-4">
                        <h3 className={`text-xl font-bold ${titleColor}`} data-cursorvariant="hover">{project.title}</h3>
                        <div className="flex items-center gap-3 flex-shrink-0">
                            {project.githubUrl && (
                                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="hover:text-[#C51A24] transition-colors" data-cursorvariant="hover">
                                    <GithubIcon className="w-5 h-5" />
                                </a>
                            )}
                            {project.liveUrl && (
                                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="hover:text-[#C51A24] transition-colors" data-cursorvariant="hover">
                                    <ExternalLinkIcon className="w-5 h-5" />
                                </a>
                            )}
                        </div>
                    </div>
                    <p className={`text-sm mb-4 ${textColor}`}>{project.description}</p>
                </div>
                <div className="flex flex-wrap gap-2 mt-auto">
                    {project.technologies.map(tech => (
                        <span key={tech} className={`text-xs font-medium px-2.5 py-1 rounded-full ${techPillBg}`}>
                            {tech}
                        </span>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};


const ProjectsPage = ({ theme, path }) => {
    const dummyProjects = [
        {
            title: "E-commerce Platform",
            description: "A full-featured e-commerce site with product listings, a shopping cart, and a checkout process. Built with a focus on performance and user experience.",
            technologies: ["React", "Redux", "Node.js", "Express", "MongoDB"],
            liveUrl: "#",
            githubUrl: "#",
            imageUrl: "https://placehold.co/600x400/1a1a1a/ffffff?text=E-commerce",
        },
        {
            title: "Task Management App",
            description: "A Kanban-style task management application that allows users to create, organize, and track their tasks through different stages of completion.",
            technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
            liveUrl: "#",
            githubUrl: "#",
            imageUrl: "https://placehold.co/600x400/1a1a1a/ffffff?text=Task+Manager",
        },
        {
            title: "Portfolio Website v2",
            description: "The very site you are on now. A personal portfolio to showcase my skills in finance and frontend development, built with modern web technologies.",
            technologies: ["React", "Framer Motion", "Tailwind CSS", "Three.js"],
            liveUrl: "#",
            githubUrl: "#",
            imageUrl: "https://placehold.co/600x400/1a1a1a/ffffff?text=Portfolio",
        },
        {
            title: "Weather Dashboard",
            description: "A clean and simple weather dashboard that provides current weather conditions and a 5-day forecast for any city using a third-party API.",
            technologies: ["React", "Chart.js", "OpenWeatherMap API"],
            liveUrl: "#",
            githubUrl: "#",
            imageUrl: "https://placehold.co/600x400/1a1a1a/ffffff?text=Weather+App",
        },
        {
            title: "Interactive Data Visualization",
            description: "A data visualization project that displays complex datasets in an interactive and easy-to-understand format using D3.js.",
            technologies: ["D3.js", "JavaScript", "HTML5", "CSS3"],
            liveUrl: "#",
            githubUrl: "#",
            imageUrl: "https://placehold.co/600x400/1a1a1a/ffffff?text=Data+Viz",
        },
        {
            title: "Real-time Chat Application",
            description: "A web-based chat application that enables users to communicate in real-time, featuring user authentication and multiple chat rooms.",
            technologies: ["React", "Socket.IO", "Node.js", "Firebase"],
            liveUrl: "#",
            githubUrl: "#",
            imageUrl: "https://placehold.co/600x400/1a1a1a/ffffff?text=Chat+App",
        },
    ];

    return (
        <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" className="container mx-auto px-6 py-32 md:py-40">
            <h1 className="text-4xl md:text-6xl font-bold text-center mb-4" data-cursorvariant="hover">
                My Projects
            </h1>
            <p className={`text-lg text-center mb-16 max-w-2xl mx-auto ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                A selection of projects that showcase my passion for creating clean, efficient, and user-friendly web applications.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {dummyProjects.map((project, index) => (
                    <ProjectCard key={index} project={project} theme={theme} />
                ))}
            </div>
        </motion.div>
    );
};

const ContactPage = ({ theme, path }) => {
    const inputClasses = `w-full p-3 rounded-md border focus:outline-none focus:ring-2 ring-offset-2 ring-offset-transparent focus:ring-[#C51A24] transition-shadow ${theme === 'dark' ? 'bg-[#1a1a1a] border-gray-700 placeholder-gray-500' : 'bg-gray-100 border-gray-300 placeholder-gray-500'}`;
    
    return (
        <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" className="min-h-screen flex items-center container mx-auto px-6">
            <div className="max-w-xl w-full text-left">
                <h2 className="text-lg font-semibold text-[#C51A24] uppercase tracking-widest">Contact</h2>
                <h1 className="text-4xl md:text-6xl font-bold my-4" data-cursorvariant="hover">Let's Create Together.</h1>
                <p className={`mb-12 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    Have a question or a project in mind? I'd love to hear from you.
                </p>
                <form name="contact" method="POST" data-netlify="true" className="space-y-6 text-left">
                    <input type="hidden" name="form-name" value="contact" />
                    <div>
                        <label htmlFor="name" className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-700'}`}>Name</label>
                        <input id="name" type="text" name="name" className={inputClasses} required data-cursorvariant="hover" />
                    </div>
                    <div>
                        <label htmlFor="email" className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-700'}`}>Email</label>
                        <input id="email" type="email" name="email" className={inputClasses} required data-cursorvariant="hover" />
                    </div>
                    <div>
                        <label htmlFor="message" className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-700'}`}>Message</label>
                        <textarea id="message" name="message" rows="5" className={inputClasses} required data-cursorvariant="hover" />
                    </div>
                    <div className="text-left pt-4">
                        <MagneticButton type="submit" className="bg-[#C51A24] text-white px-10 py-3 rounded-full font-bold transition-transform hover:scale-105">
                            Send Message
                        </MagneticButton>
                    </div>
                </form>
            </div>
        </motion.div>
    );
};
