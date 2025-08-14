import React from 'react';
import { motion } from 'framer-motion';
import MagneticButton from '../components/MagneticButton';

const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeInOut' } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.5, ease: 'easeInOut' } }
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

export default ContactPage;
