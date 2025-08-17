import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeInOut' } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.5, ease: 'easeInOut' } }
};

const HomePage = ({ theme }) => {
    // useDocumentTitle("Charles Obuzor | Home");

    const navigate = useNavigate();

    const HighlightedLink = ({ children, onClick, href }) => {
        const underlineColor = theme === 'dark' ? 'bg-gray-700' : 'bg-gray-300';
        const linkColor = theme === 'dark' ? 'text-white hover:text-black' : 'text-black hover:text-white';
        const bgColor = theme === 'dark' ? 'hover:bg-white' : 'hover:bg-black';

        const commonProps = {
            className: `cursor-pointer font-bold transition-colors duration-300 ${linkColor} ${bgColor} px-1`,
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

    return (
        <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
            <div className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 py-24">
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
                        <HighlightedLink onClick={() => navigate('/work')}>Business consulting and finance.&nbsp;</HighlightedLink>
                        Outside of that, I{' '}
                        <HighlightedLink onClick={() => navigate('/dev')}>build frontend interfaces</HighlightedLink>
                        {' '}for the web. I focus on clean design, fast performance, and practical features. I enjoy breaking down problems and building tools that just work.
                        <br/><br/>
                        When I'm not deep in client strategy or debugging code, I read reports, explore product ideas, test UI layouts, play{' '}
                        <HighlightedLink href="https://open.spotify.com/user/s76ocb47g23yzpwrf939hyvvw">music</HighlightedLink>
                        {' '}or play{' '}
                        <HighlightedLink href="https://www.chess.com/member/charlz-x">chess</HighlightedLink>
                        . I treat frontend work as a craft — something I do to stay sharp and think clearly. If you want to collaborate or talk shop, you can{' '}
                        <HighlightedLink onClick={() => navigate('/contact')}>contact me</HighlightedLink>.
                    </p>
                </div>
            </div>
        </motion.div>
    );
};

export default HomePage;
