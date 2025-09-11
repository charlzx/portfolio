import React from 'react';
import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';
import MagneticButton from '../components/MagneticButton';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeInOut' } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.5, ease: 'easeInOut' } }
};

const HomePage = ({ theme }) => {

    const navigate = useNavigate();

    const HighlightedLink = ({ children, onClick, href }) => {
        const underlineColor = theme === 'dark' ? 'bg-gray-700' : 'bg-gray-300';
        const linkColor = theme === 'dark' ? 'text-white hover:text-black' : 'text-black hover:text-white';
        const bgColor = theme === 'dark' ? 'hover:bg-white' : 'hover:bg-black';

        const commonProps = {
            className: `cursor-pointer font-bold transition-colors duration-300 ${linkColor} ${bgColor}`,
        };

        const content = (
            <>
                {children}
                <span
                    className={`absolute bottom-0 left-0 h-0.5 w-full ${underlineColor} origin-left transform scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100`}
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

    useEffect(() => {
        if (typeof document === 'undefined') return;
        document.title = "Home | Charlz's Portfolio";
        let meta = document.head.querySelector('meta[name="description"]');
        if (!meta) {
            meta = document.createElement('meta');
            meta.setAttribute('name', 'description');
            document.head.appendChild(meta);
        }
        meta.setAttribute('content', "Welcome to Charlz's portfolio. Discover beautiful web experiences, frontend skills, and ways to connect.");
    }, []);

    // H1 color: bright accent in dark mode, match button color in light mode
    const headingColor = theme === 'dark' ? 'text-[#F94144]' : 'text-[#C51A24]';

    return (
            <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
                <div className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 sm:px-6 py-24">
                    <div className="relative z-10 max-w-4xl text-left intro">
                        <h2 className="text-xl md:text-xl font-light mb-4 flex items-center" data-cursorvariant="hover">
                            Hello
                            <motion.span
                                className="ml-1 text-2xl"
                                animate={{ rotate: [0, 20, 0, 20, 0] }}
                                transition={{
                                    duration: 1.5,
                                    repeat: Infinity,
                                    repeatDelay: 1,
                                    ease: "easeInOut",
                                }}
                            >
                                👋🏾
                            </motion.span>,
                        </h2>
                        <h1
                            className={`text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tighter mb-6 leading-none md:leading-none ${headingColor} drop-shadow-md`}
                            data-cursorvariant="hover">
                            I turn ideas into interactive,&nbsp;
                            <span className="linebreak-500"><br /></span>
                            responsive websites.
                        </h1>

                        <p className={`text-sm sm:text-base leading-relaxed ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                            I'm Charles, a frontend developer focused on{' '}
                            <HighlightedLink onClick={() => navigate('/about')}>building beautiful interfaces</HighlightedLink>
                            {' '}for the web. I focus on clean design, fast performance, and practical features. I enjoy breaking down problems and building tools that just work.
                            <br/><br/>
                            When I'm not debugging code or exploring new technologies, I read books, scroll online, test UI layouts, listen to {' '}
                            <HighlightedLink href="https://open.spotify.com/user/s76ocb47g23yzpwrf939hyvvw">music</HighlightedLink>
                            {' '}or play{' '}
                            <HighlightedLink href="https://www.chess.com/member/charlz-x">chess</HighlightedLink>
                            . I treat frontend development as a craft — something I do to stay sharp and think clearly. If you want to collaborate or talk shop, you can{' '}
                            <HighlightedLink onClick={() => navigate('/contact')}>contact me</HighlightedLink>.
                        </p>

                        <div className="mt-8 flex flex-wrap items-center gap-3">
                            <MagneticButton
                                type="button"
                                onClick={() => navigate('/contact')}
                                className="inline-flex items-center gap-2 rounded-lg bg-[#C51A24] text-white px-4 py-2 text-sm font-medium shadow-sm hover:opacity-90 transition"
                                data-cursorvariant="hover"
                            >
                                <Mail className="w-4 h-4" /> Get in touch
                            </MagneticButton>
                        </div>
                    </div>
                </div>
            </motion.div>
    );
};

export default HomePage;
