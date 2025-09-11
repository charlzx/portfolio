import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send } from 'lucide-react';
import { useEffect } from 'react';
import MagneticButton from '../components/MagneticButton';

const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.3, ease: 'easeIn' } }
};

const fadeUp = {
    hidden: { opacity: 0, y: 15 },
    show: (i = 0) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.1, duration: 0.4, ease: 'easeOut' }
    })
};

const ContactPage = ({ theme }) => {
    const isDark = theme === 'dark';
    const subtle = isDark ? 'text-gray-400' : 'text-gray-600';
    const subtleStrong = isDark ? 'text-gray-300' : 'text-gray-700';
    const cardBg = isDark ? 'bg-white/5' : 'bg-black/5';
    const hairline = isDark ? 'border-white/10' : 'border-black/10';
    const inputBg = isDark ? 'bg-white/5' : 'bg-black/5';

    const inputClasses = `w-full p-3 rounded-lg border focus:outline-none focus:ring-2 ring-offset-0 focus:ring-[#C51A24] transition-all ${inputBg} ${hairline} placeholder-gray-500`;

    useEffect(() => {
        if (typeof document === 'undefined') return;
        document.title = "Contact | Charlz's Portfolio";
        let meta = document.head.querySelector('meta[name="description"]');
        if (!meta) {
            meta = document.createElement('meta');
            meta.setAttribute('name', 'description');
            document.head.appendChild(meta);
        }
        meta.setAttribute('content', "Contact Charles Obuzor for collaborations, questions, or project inquiries. Email and form available.");
    }, []);

    return (
            <motion.main
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="relative container mx-auto px-4 sm:px-6 py-28 md:py-32"
            >
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <motion.div
                        className="text-left md:text-center"
                        variants={fadeUp}
                        initial="hidden"
                        animate="show"
                    >
                        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight" data-cursorvariant="hover">
                            Let's build something great.
                        </h1>
                        <p className={`mt-4 text-base max-w-2xl md:mx-auto ${subtleStrong}`}>
                            Have a project in mind, a question, or just want to connect? I'm always open to new ideas and collaborations.
                        </p>
                    </motion.div>

                    <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Left Column: Contact Info */}
                        <motion.div
                            className="md:col-span-1 space-y-4 md:space-y-6"
                            variants={fadeUp}
                            initial="hidden"
                            animate="show"
                            custom={1}
                        >
                            <h2 className="text-xl font-bold">Contact Details</h2>
                            <a
                                href="mailto:charlesobuzor@outlook.com"
                                className="group flex items-start gap-4"
                                data-cursorvariant="hover"
                            >
                                <Mail className="w-4 h-4 text-[#C51A24] mt-1" />
                                <div>
                                    <p className="font-semibold">Email</p>
                                    <p className={`text-sm ${subtle} group-hover:text-[#C51A24] transition-colors`}>
                                        charlesobuzor@outlook.com
                                    </p>
                                </div>
                            </a>
                            {/* <a
                                href="https://www.linkedin.com/in/your-profile"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`group flex items-start gap-4 rounded-lg p-4 transition-colors ${cardBg} hover:bg-white/10`}
                                data-cursorvariant="hover"
                            >
                                <Linkedin className="w-5 h-5 text-[#C51A24] mt-1" />
                                <div>
                                    <p className="font-semibold">LinkedIn</p>
                                    <p className={`text-sm ${subtle} group-hover:text-[#C51A24] transition-colors`}>
                                        Connect with me
                                    </p>
                                </div>
                            </a> */}
                        </motion.div>

                        {/* Right Column: Form */}
                        <motion.div
                            className={`md:col-span-2 rounded-xl border ${hairline} p-6 md:p-8 ${cardBg}`}
                            variants={fadeUp}
                            initial="hidden"
                            animate="show"
                            custom={2}
                        >
                            <h2 className="text-xl font-bold mb-5">Send a Message</h2>
                                
                            <Form />
                        </motion.div>
                    </div>
                </div>
        </motion.main>
    );
};

export default ContactPage;

// Simple controlled form component that posts to Formspree and prevents full page reload
function Form() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState('idle'); // idle | sending | success | error

    const FORMSPREE_ID = 'mandvdpe';
    const endpoint = `https://formspree.io/f/${FORMSPREE_ID}`;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('sending');
        try {
            const res = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, message })
            });
            if (res.ok) {
                setStatus('success');
                setName(''); setEmail(''); setMessage('');
            } else {
                setStatus('error');
            }
        } catch (err) {
            setStatus('error');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            <div>
                <label htmlFor="name" className="sr-only">Name</label>
                <input id="name" type="text" name="name" placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)} className={"w-full p-3 rounded-lg border focus:outline-none focus:ring-2 ring-offset-0 focus:ring-[#C51A24] transition-all bg-white/5 border-black/10 placeholder-gray-500"} required data-cursorvariant="hover" />
            </div>
            <div>
                <label htmlFor="email" className="sr-only">Email</label>
                <input id="email" type="email" name="email" placeholder="Your Email" value={email} onChange={(e) => setEmail(e.target.value)} className={"w-full p-3 rounded-lg border focus:outline-none focus:ring-2 ring-offset-0 focus:ring-[#C51A24] transition-all bg-white/5 border-black/10 placeholder-gray-500"} required data-cursorvariant="hover" />
            </div>
            <div>
                <label htmlFor="message" className="sr-only">Message</label>
                <textarea id="message" name="message" rows="5" placeholder="Your Message" value={message} onChange={(e) => setMessage(e.target.value)} className={"w-full p-3 rounded-lg border focus:outline-none focus:ring-2 ring-offset-0 focus:ring-[#C51A24] transition-all bg-white/5 border-black/10 placeholder-gray-500"} required data-cursorvariant="hover" />
            </div>
            <div className="text-left pt-2">
                <MagneticButton type="submit" className="inline-flex items-center gap-2 rounded-lg bg-[#C51A24] text-white px-6 py-2.5 text-sm font-semibold shadow-sm hover:opacity-90 transition-opacity" data-cursorvariant="hover">
                    <Send className="w-4 h-4" />
                    {status === 'sending' ? 'Sending...' : 'Send Message'}
                </MagneticButton>
            </div>

            {status === 'success' && <p className="mt-3 text-green-500">Thanks — your message was sent.</p>}
            {status === 'error' && <p className="mt-3 text-red-500">Sorry, something went wrong. Please try again later.</p>}
        </form>
    );
}

