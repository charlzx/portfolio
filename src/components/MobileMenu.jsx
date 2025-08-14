import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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

export default MobileMenu;
