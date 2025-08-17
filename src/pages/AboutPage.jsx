import React from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import { DownloadIcon } from '../components/Icons';
import NotFoundPage from './NotFoundPage';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeInOut' } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.5, ease: 'easeInOut' } }
};

const AboutPage = ({ theme }) => {
    const { path } = useParams();
   
    // --- FIX ---
    // Validate the path. If it's not 'work' or 'dev', show the 404 page.
    if (path !== 'work' && path !== 'dev') {
        return <NotFoundPage theme={theme} />;
    }

    const content = {
        work: {
            title: "About Me: The Financial Analyst",
            intro: "With a keen eye for market dynamics and a passion for data-driven insights, I specialize in financial modeling, valuation, and strategic investment analysis. My goal is to translate complex financial data into actionable strategies that drive business growth.",
            experience: [
                { title: "Senior Financial Analyst", company: "Global Investments Inc.", years: "2020 - Present", description: "Led financial planning and analysis for a $50M portfolio. Developed complex valuation models for M&A targets, resulting in two successful acquisitions." },
                { title: "Junior Analyst", company: "Capital Ventures", years: "2018 - 2020", description: "Conducted market research and supported senior analysts in due diligence processes. Prepared detailed reports on industry trends and competitor performance." },
            ],
            certifications: [
                { name: "Chartered Financial Analyst (CFA)", issuer: "CFA Institute", year: "2021" },
                { name: "Financial Modeling & Valuation Analyst (FMVA)", issuer: "Corporate Finance Institute (CFI)", year: "2019" },
            ],
            education: [
                { degree: "MSc in Finance", university: "London School of Economics", years: "2017 - 2018" },
                { degree: "BSc in Economics", university: "University of Lagos", years: "2013 - 2017" },
            ],
            cvUrl: "/charles-obuzor-finance-cv.pdf",
        },
        dev: {
            title: "About Me: The Frontend Developer",
            intro: "As a creative developer, I build beautiful, functional, and user-centric web experiences. I am proficient in the modern frontend stack, including React, Next.js, and Tailwind CSS, and I have a passion for creating pixel-perfect designs and intuitive interactions.",
            experience: [
                { title: "Freelance Frontend Developer", company: "Self-Employed", years: "2019 - Present", description: "Partnered with startups and small businesses to build and scale their web applications. Specialized in creating responsive, high-performance UIs with React and Next.js." },
                { title: "UI/UX Intern", company: "Innovate Solutions", years: "2018", description: "Assisted the design team in creating wireframes, mockups, and prototypes. Contributed to the development of a new design system using Figma and Storybook." },
            ],
            certifications: [
                { name: "React - The Complete Guide", issuer: "Udemy (Academind)", year: "2020" },
                { name: "Advanced CSS and Sass", issuer: "Udemy (Jonas Schmedtmann)", year: "2019" },
            ],
            education: [
                 { degree: "Self-Taught & Online Courses", university: "Various Platforms (freeCodeCamp, Scrimba)", years: "Ongoing" },
                 { degree: "BSc in Economics", university: "University of Lagos", years: "2013 - 2017" },
            ]
        }
    };
    
    const currentContent = content[path];

    const Section = ({ title, children }) => (
        <div className="mb-12">
            <h2 className="text-2xl font-bold border-b-2 border-[#C51A24] pb-2 mb-6" data-cursorvariant="hover">{title}</h2>
            <div className="space-y-8">
                {children}
            </div>
        </div>
    );

    return (
        <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" className="container mx-auto px-6 py-32 md:py-40">
            <div className="max-w-4xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between md:items-start mb-8 gap-4">
                    <h1 className="text-4xl md:text-5xl font-bold" data-cursorvariant="hover">{currentContent.title}</h1>
                    <div className="flex items-center gap-4 flex-shrink-0">
                        {path === 'work' && (
                            <a
                                href={currentContent.cvUrl}
                                download
                                className={`group flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${theme === 'dark' ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-200 hover:bg-gray-300'}`}
                                data-cursorvariant="hover"
                            >
                                <DownloadIcon className="w-5 h-5" />
                                <span className="text-sm font-semibold">Download CV</span>
                            </a>
                        )}
                    </div>
                </div>
                <p className={`text-lg mb-16 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>{currentContent.intro}</p>

                <Section title="Experience">
                    {currentContent.experience.map(exp => (
                        <div key={exp.title}>
                            <h3 className="text-xl font-semibold">{exp.title}</h3>
                            <div className="flex justify-between items-baseline">
                                <p className="text-md text-[#C51A24]">{exp.company}</p>
                                <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{exp.years}</p>
                            </div>
                            <p className={`mt-2 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{exp.description}</p>
                        </div>
                    ))}
                </Section>

                <Section title="Certifications">
                     {currentContent.certifications.map(cert => (
                        <div key={cert.name}>
                            <h3 className="text-xl font-semibold">{cert.name}</h3>
                             <div className="flex justify-between items-baseline">
                                <p className="text-md text-[#C51A24]">{cert.issuer}</p>
                                <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{cert.year}</p>
                            </div>
                        </div>
                    ))}
                </Section>

                <Section title="Education">
                    {currentContent.education.map(edu => (
                         <div key={edu.degree}>
                            <h3 className="text-xl font-semibold">{edu.degree}</h3>
                             <div className="flex justify-between items-baseline">
                                <p className="text-md text-[#C51A24]">{edu.university}</p>
                                <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{edu.years}</p>
                            </div>
                        </div>
                    ))}
                </Section>
            </div>
        </motion.div>
    );
};

export default AboutPage;
