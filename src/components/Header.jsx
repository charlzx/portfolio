import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { SunIcon, MoonIcon, GithubIcon } from './Icons';
import { useScrollPosition } from '../hooks/useScrollPosition';

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

const Header = ({ onMenuClick, theme, toggleTheme, isMenuOpen }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const scrolled = useScrollPosition();

    // Determine if we're on a page that should show navigation
    const showNavigation = location.pathname !== '/terminal';

    const navItems = [
        { to: '/about', label: 'About' },
        { to: '/projects', label: 'Projects' },
        { to: '/contact', label: 'Contact' },
    ];
    
    const headerBgClass = scrolled
        ? theme === 'dark'
            ? 'bg-[#0D0D0D]'
            : 'bg-[#F5F5F5]'
        : 'bg-transparent';
    
    const borderClass = scrolled
        ? theme === 'dark'
            ? 'border-white/10'
            : 'border-black/10'
        : 'border-transparent';
        
    const textColorClass = theme === 'dark' ? 'text-white' : 'text-black';
    
    // Theme-aware navigation pill styles
    const navPillBg = theme === 'dark' ? 'bg-black/20' : 'bg-white/20';
    const navPillBorder = theme === 'dark' ? 'border-white/10' : 'border-black/10';
    const inactiveTextColor = theme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-black';

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${headerBgClass} ${borderClass}`}>
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                 <button className={`flex items-center space-x-2 ${textColorClass}`} onClick={() => navigate('/')} data-cursorvariant="hover">
                     <svg width="24" height="24" viewBox="0 0 100 100">
                        <path d="M20,80 L50,20 L80,80 Z" fill="none" stroke="#C51A24" strokeWidth="8"/>
                        <path d="M25,70 L75,70" fill="none" stroke="#C51A24" strokeWidth="8"/>
                    </svg>
                    {showNavigation && <span className="text-lg font-bold tracking-wider">CHARLZ</span>}
                </button>
                <AnimatePresence>
                {showNavigation && (
                    <motion.nav 
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className={`hidden md:flex items-center space-x-2 backdrop-blur-sm ${navPillBg} border ${navPillBorder} p-1 rounded-full`}
                    >
                        {navItems.map(item => (
                            <NavLink 
                                key={item.to} 
                                to={item.to} 
                                end={item.to.split('/').length <= 2}
                                className={({ isActive }) => `relative text-sm uppercase tracking-widest transition-colors duration-300 px-4 py-2 rounded-full ${isActive ? 'text-white' : inactiveTextColor}`}
                                data-cursorvariant="hover"
                            >
                                {({ isActive }) => (
                                    <>
                                        {isActive && (
                                            <motion.span
                                                className="absolute inset-0 rounded-full bg-[#C51A24]"
                                                layoutId="active-pill"
                                                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                            />
                                        )}
                                        <span className="relative z-10">{item.label}</span>
                                    </>
                                )}
                            </NavLink>
                        ))}
                    </motion.nav>
                )}
                </AnimatePresence>
                 <div className="flex items-center gap-4">
                    <button onClick={toggleTheme} className={`hidden md:block p-2 rounded-full ${textColorClass}`} data-cursorvariant="hover">
                        {theme === 'dark' ? <SunIcon className="w-4 h-4" /> : <MoonIcon className="w-4 h-4" />}
                    </button>
                    {showNavigation && (
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

export default Header;
