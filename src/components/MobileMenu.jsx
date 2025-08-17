import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';

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

const MobileMenu = ({ isOpen, closeMenu, theme }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const pathnameParts = location.pathname.split('/');
    const path = ['work', 'dev'].includes(pathnameParts[1]) ? pathnameParts[1] : null;

    const navItems = path === 'dev' 
        ? [
            { to: `/${path}`, label: 'About' },
            { to: `/${path}/projects`, label: 'Projects' },
            { to: '/contact', label: 'Contact' },
          ]
        : [
            { to: `/${path}`, label: 'About' },
            { to: '/contact', label: 'Contact' },
        ];

    const handleNavigation = (to) => {
        navigate(to);
        closeMenu();
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
                        className="h-full flex flex-col items-center justify-center space-y-6"
                    >
                        {navItems.map(item => (
                            <motion.li key={item.to} variants={mobileLinkVariants}>
                                <button onClick={() => handleNavigation(item.to)} className="text-4xl font-bold" data-cursorvariant="hover">{item.label}</button>
                            </motion.li>
                        ))}
                    </motion.ul>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default MobileMenu;
