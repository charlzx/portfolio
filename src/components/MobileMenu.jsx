import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { SunIcon, MoonIcon, GithubIcon } from './Icons';

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

const MobileMenu = ({ isOpen, closeMenu, theme, toggleTheme }) => {
    const navigate = useNavigate();

    const navItems = [
        { to: '/about', label: 'About' },
        { to: '/projects', label: 'Projects' },
        { to: '/contact', label: 'Contact' },
    ];

    const handleNavigation = (to) => {
        navigate(to);
        closeMenu();
    };

    const handleThemeToggle = () => {
        toggleTheme();
    };

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
                        className="h-full flex flex-col items-center justify-center space-y-8"
                    >
                        {navItems.map(item => (
                            <motion.li key={item.to} variants={mobileLinkVariants}>
                                <button onClick={() => handleNavigation(item.to)} className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-black'}`} data-cursorvariant="hover">{item.label}</button>
                            </motion.li>
                        ))}
                        
                        {/* Separator */}
                        <motion.li variants={mobileLinkVariants}>
                            <div className={`w-16 h-px ${theme === 'dark' ? 'bg-white/20' : 'bg-black/20'} my-4`}></div>
                        </motion.li>
                        
                        {/* Theme Toggle */}
                        <motion.li variants={mobileLinkVariants}>
                            <button 
                                onClick={handleThemeToggle} 
                                className={`flex items-center gap-3 text-lg font-medium ${theme === 'dark' ? 'text-white' : 'text-black'}`}
                                data-cursorvariant="hover"
                            >
                                {theme === 'dark' ? <SunIcon className="w-5 h-5" /> : <MoonIcon className="w-5 h-5" />}
                                {theme === 'dark' ? '' : ''}
                            </button>
                        </motion.li>
                    </motion.ul>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default MobileMenu;
