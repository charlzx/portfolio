import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import MagneticButton from '../components/MagneticButton';

// --- ICONS ---
const MailIcon = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
        <polyline points="22,6 12,13 2,6"></polyline>
    </svg>
);

const LinkedinIcon = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
        <rect x="2" y="9" width="4" height="12"></rect>
        <circle cx="4" cy="4" r="2"></circle>
    </svg>
);

const ArrowLeftIcon = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="19" y1="12" x2="5" y2="12"></line>
        <polyline points="12 19 5 12 12 5"></polyline>
    </svg>
);


const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeInOut' } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.5, ease: 'easeInOut' } }
};

const ContactPage = ({ theme }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const showBackButton = location.key !== 'default';

    const inputClasses = `w-full p-3 rounded-md border focus:outline-none focus:ring-2 ring-offset-2 ring-offset-transparent focus:ring-[#C51A24] transition-shadow ${theme === 'dark' ? 'bg-[#1a1a1a] border-gray-700 placeholder-gray-500' : 'bg-gray-100 border-gray-300 placeholder-gray-500'}`;
    
    return (
        <motion.div 
            variants={pageVariants} 
            initial="initial" 
            animate="animate" 
            exit="exit" 
            className="min-h-screen flex items-center justify-center container mx-auto px-6 py-24 relative"
        >
            {showBackButton && (
                <button 
                    onClick={() => navigate(-1)} 
                    className={`absolute top-10 left-6 md:top-16 md:left-10 flex items-center gap-2 group ${theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'} transition-colors`}
                    data-cursorvariant="hover"
                >
                    <ArrowLeftIcon className="w-5 h-5" />
                    <span className="font-semibold">Back</span>
                </button>
            )}

            <div className="grid md:grid-cols-2 gap-16 items-center max-w-6xl w-full">
                {/* Left Column: Info */}
                <div className="text-left">
                    <h2 className="text-lg font-semibold text-[#C51A24] uppercase tracking-widest">Contact</h2>
                    <h1 className="text-4xl md:text-6xl font-bold my-4" data-cursorvariant="hover">Let's Create Together.</h1>
                    <p className={`mb-8 text-lg ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        I'm currently available for freelance work and open to discussing new projects. Whether you have a question, a proposal, or just want to say hello, feel free to reach out.
                    </p>
                    <div className="space-y-4">
                        <a href="mailto:hello@charlesobuzor.com" className="flex items-center gap-4 group w-fit" data-cursorvariant="hover">
                            <MailIcon className="w-6 h-6 text-[#C51A24]" />
                            <span className={`font-semibold group-hover:text-[#C51A24] transition-colors ${theme === 'dark' ? 'text-white' : 'text-black'}`}>hello@charlesobuzor.com</span>
                        </a>
                        <a href="https://www.linkedin.com/in/your-profile" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group w-fit" data-cursorvariant="hover">
                            <LinkedinIcon className="w-6 h-6 text-[#C51A24]" />
                            <span className={`font-semibold group-hover:text-[#C51A24] transition-colors ${theme === 'dark' ? 'text-white' : 'text-black'}`}>Connect on LinkedIn</span>
                        </a>
                    </div>
                </div>

                {/* Right Column: Form */}
                <div className={`p-8 rounded-lg border ${theme === 'dark' ? 'bg-[#1a1a1a]/50 border-gray-800' : 'bg-white/50 border-gray-200'}`}>
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
            </div>
        </motion.div>
    );
};

export default ContactPage;
