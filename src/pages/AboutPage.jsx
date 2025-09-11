import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, GraduationCap, Code2, User, Github } from 'lucide-react';
import { useEffect } from 'react';

const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.3, ease: 'easeIn' } }
};

const fadeUp = { hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0, transition: { duration: 0.35 } } };

export default function AboutPage({ theme }) {
    const isDark = theme === 'dark';

        const content = {
            title: 'About',
            intro:
                "As a frontend developer, I build beautiful, functional, and user-centric web experiences. I am proficient in the modern frontend stack, including React, Next.js, and Tailwind CSS, and I have a passion for creating pixel-perfect designs and intuitive interactions. I enjoy collaborating with designers and developers to bring ideas to life, and I am always eager to learn new technologies and improve my skills.",
            skills: ['React', 'Next.js', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'Framer Motion', 'Vite', 'Git/GitHub', 'Vercel'],
            experience: [
                {
                    role: 'Freelance Frontend Developer',
                    org: 'Self-Employed',
                    period: '2022 — Present',
                    notes: 'Partnered with clients, startups and small businesses to build and scale web sites / applications. Specialized in creating responsive, high-performance UIs based on specifications.'
                },
                {
                    role: 'Frontend Developer',
                    org: 'Zuri Team, Inc.',
                    period: 'Mar 2021 — Jul 2021',
                    notes: 'Worked with teams to build full web applications. Focused on responsive UIs, API integration, and collaboration with GitHub.'
                },
                {
                    role: 'Frontend Intern (StudentBuild Study Group)',
                    org: 'Levelop',
                    period: 'Aug 2020 — Dec 2020',
                    notes: 'Built test projects and collaborated with peers on React.js features. Gained experience in debugging, code reviews, and teamwork.'
                },
                {
                    role: 'Student Intern',
                    org: 'Emerging Platforms Ltd',
                    period: 'Feb 2020 — Sep 2020',
                    notes: 'Started learning tech with focus on HTML, CSS, and JavaScript to build simple web projects.'
                }
            ],
            education: [
                { title: 'BSc in Business Administration', place: 'University of Benin', period: '2018 - 2023' },
            ]
        };

    const subtle = isDark ? 'text-gray-400' : 'text-gray-600';
    const subtleStrong = isDark ? 'text-gray-300' : 'text-gray-700';
    const hairline = isDark ? 'border-white/10' : 'border-black/10';

    useEffect(() => {
        if (typeof document === 'undefined') return;
        document.title = "About | Charlz's Portfolio";
        let meta = document.head.querySelector('meta[name="description"]');
        if (!meta) {
            meta = document.createElement('meta');
            meta.setAttribute('name', 'description');
            document.head.appendChild(meta);
        }
        meta.setAttribute('content', "Learn about Charles Obuzor, a frontend developer skilled in React, Next.js, and Tailwind CSS. View experience and education.");
    }, []);

    return (
            <motion.main
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="relative container mx-auto px-4 sm:px-6 py-28 md:py-32"
            >
                <section className="max-w-3xl mx-auto">
                    {/* <motion.h1 className="text-3xl md:text-4xl font-extrabold tracking-tight flex items-center gap-3" variants={fadeUp} data-cursorvariant="hover">
                        <User className="w-6 h-6 text-[#C51A24]" />{content.title}
                    </motion.h1> */}
                    <motion.p className={`mt-4 text-lg ${subtleStrong}`} variants={fadeUp}>
                        {content.intro}
                    </motion.p>
                    {/* Divider */}
                    <motion.hr className={`mt-10 ${isDark ? 'border-white/10' : 'border-black/10'}`} variants={fadeUp} />

                    {/* Skills */}
                    <motion.section className="mt-10" variants={fadeUp}>
                        <h2 className="text-xl md:text-2xl font-extrabold flex items-center gap-3" data-cursorvariant="hover">
                            <Code2 className="w-5 h-5 text-[#C51A24]" /> Skills
                        </h2>
                        <ul className="mt-4 flex flex-wrap gap-2">
                            {content.skills.map((item) => (
                                <li key={item}>
                                    <span className="inline-block text-xs font-medium px-2.5 py-1 rounded-full bg-[#C51A24]/10 text-[#C51A24]">
                                        {item}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </motion.section>

                    {/* Divider */}
                    <motion.hr className={`mt-12 ${isDark ? 'border-white/10' : 'border-black/10'}`} variants={fadeUp} />

                    {/* GitHub */} 
                    <motion.section className="mt-12" variants={fadeUp}>
                        <h2 className="text-xl md:text-2xl font-extrabold flex items-center gap-3" data-cursorvariant="hover">
                            <Github className="w-5 h-5 text-[#C51A24]" /> GitHub
                        </h2>
                        <div className="mt-4">
                            <p className={`text-base ${subtleStrong} mb-4`}>
                                Check out my GitHub for my projects and what i'm working on...
                            </p>
                            <a 
                                href="https://github.com/charlzx" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg border ${hairline} ${isDark ? 'bg-white/5 hover:bg-white/10' : 'bg-black/5 hover:bg-black/10'} transition-colors group`}
                                data-cursorvariant="hover"
                            >
                                <Github className="w-4 h-4 group-hover:text-[#C51A24] transition-colors" />
                                <span className="font-medium">@charlzx</span>
                                <svg className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                            </a>
                        </div>
                    </motion.section>

                    {/* Divider */}
                    <motion.hr className={`mt-12 ${isDark ? 'border-white/10' : 'border-black/10'}`} variants={fadeUp} />

                    {/* Experience */}
                    <motion.section className="mt-12" variants={fadeUp}>
                        <h2 className="text-xl md:text-2xl font-extrabold flex items-center gap-3" data-cursorvariant="hover">
                            <Briefcase className="w-5 h-5 text-[#C51A24]" /> Experience
                        </h2>
                        <div className={`mt-6 relative border-l-2 ${hairline}`}>
                            {content.experience.map((exp, index) => (
                                <div key={index} className="mb-8 ml-8">
                                    <span className={`absolute -left-[9px] mt-1.5 h-4 w-4 rounded-full border-2 ${isDark ? 'border-gray-800 bg-gray-700' : 'border-white bg-gray-300'}`}></span>
                                    <p className={`text-xs ${subtle}`}>{exp.period}</p>
                                    <p className="font-bold mt-0.5">{exp.role}</p>
                                    <p className="text-sm text-[#C51A24]">{exp.org}</p>
                                    <p className={`text-sm mt-2 ${subtle}`}>{exp.notes}</p>
                                </div>
                            ))}
                        </div>
                    </motion.section>

                    {/* Divider */}
                    <motion.hr className={`mt-12 ${isDark ? 'border-white/10' : 'border-black/10'}`} variants={fadeUp} />

                    {/* Education */}
                    <motion.section className="mt-12" variants={fadeUp}>
                        <h2 className="text-xl md:text-2xl font-extrabold flex items-center gap-3" data-cursorvariant="hover">
                            <GraduationCap className="w-5 h-5 text-[#C51A24]" /> Education
                        </h2>
                        <div className="mt-5">
                            {content.education.map((ed) => (
                                <div key={ed.title} className={`rounded-lg border ${hairline} p-4 ${isDark ? 'bg-white/5' : 'bg-black/5'}`}>
                                    <p className="text-base font-bold">{ed.title}</p>
                                    <p className="text-sm text-[#C51A24]">{ed.place}</p>
                                    <p className={`text-xs mt-0.5 ${subtle}`}>{ed.period}</p>
                                </div>
                            ))}
                        </div>
                    </motion.section>
                </section>
        </motion.main>
    );
}
