import React from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';
import { useEffect } from 'react';

const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeInOut' } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.5, ease: 'easeInOut' } }
};

const ProjectCard = ({ project, theme, isReversed }) => {
    const textColor = theme === 'dark' ? 'text-gray-300' : 'text-gray-700';
    const titleColor = theme === 'dark' ? 'text-white' : 'text-black';
    const techPillBg = theme === 'dark' ? 'bg-[#C51A24]/10 text-[#C51A24]' : 'bg-[#C51A24]/10 text-[#C51A24]';

    const imageContent = (
        <div className="w-full md:w-1/2 lg:w-2/5">
            <a href={project.liveUrl || project.githubUrl} target="_blank" rel="noopener noreferrer" data-cursorvariant="hover">
                <img 
                    src={project.imageUrl} 
                    alt={`${project.title} preview`} 
                    className="w-full h-full object-cover rounded-lg shadow-lg transition-transform duration-300 hover:scale-105"
                    onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/600x400/0D0D0D/C51A24?text=Image+Not+Found'; }}
                />
            </a>
        </div>
    );

    const textContent = (
        <div className={`w-full md:w-1/2 lg:w-3/5 pt-8 md:pt-0 ${isReversed ? 'md:pr-12' : 'md:pl-12'}`}>
            <h3 className={`text-xl font-bold mb-3 ${titleColor}`} data-cursorvariant="hover">{project.title}</h3>
            <p className={`text-sm mb-6 ${textColor}`}>{project.description}</p>
            <div className="flex flex-wrap gap-2 mb-6">
                {project.technologies.map(tech => (
                    <span key={tech} className={`text-xs font-medium px-3 py-1.5 rounded-full ${techPillBg}`}>
                        {tech}
                    </span>
                ))}
            </div>
            <div className="flex items-center gap-4">
                {project.githubUrl && (
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-[#C51A24] transition-colors cursor-pointer relative z-10" data-cursorvariant="hover">
                        <Github className="w-4 h-4" />
                        <span>GitHub</span>
                    </a>
                )}
                {project.liveUrl && (
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-[#C51A24] transition-colors cursor-pointer relative z-10" data-cursorvariant="hover">
                        <ExternalLink className="w-4 h-4" />
                        <span>Live Demo</span>
                    </a>
                )}
            </div>
        </div>
    );

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className={`flex flex-col md:flex-row items-center mb-24 ${isReversed ? 'md:flex-row-reverse' : ''}`}
        >
            {imageContent}
            {textContent}
        </motion.div>
    );
};


const ProjectsPage = ({ theme }) => {
    const dummyProjects = [
        {
            title: "E-commerce Platform",
            description: "A full-featured e-commerce site with product listings, a shopping cart, and a checkout process. Built with a focus on performance and user experience.",
            technologies: ["React", "Redux", "Node.js", "Express", "MongoDB"],
            liveUrl: "https://example.com",
            githubUrl: "https://github.com/charlzx",
            imageUrl: "https://placehold.co/600x400/1a1a1a/ffffff?text=E-commerce",
        },
        {
            title: "Task Management App",
            description: "A Kanban-style task management application that allows users to create, organize, and track their tasks through different stages of completion.",
            technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
            liveUrl: "https://example.com",
            githubUrl: "https://github.com/charlzx",
            imageUrl: "https://placehold.co/600x400/1a1a1a/ffffff?text=Task+Manager",
        },
        {
            title: "Portfolio Website v2",
            description: "The very site you are on now. A personal portfolio to showcase my frontend development skills, built with modern web technologies and clean design principles.",
            technologies: ["React", "Framer Motion", "Tailwind CSS", "Vite"],
            liveUrl: "https://charlz.dev",
            githubUrl: "https://github.com/charlzx/portfolio",
            imageUrl: "https://placehold.co/600x400/1a1a1a/ffffff?text=Portfolio",
        },
        {
            title: "Weather Dashboard",
            description: "A clean and simple weather dashboard that provides current weather conditions and a 5-day forecast for any city using a third-party API.",
            technologies: ["React", "Chart.js", "OpenWeatherMap API"],
            liveUrl: "https://example.com",
            githubUrl: "https://github.com/charlzx",
            imageUrl: "https://placehold.co/600x400/1a1a1a/ffffff?text=Weather+App",
        },
    ];

    useEffect(() => {
        if (typeof document === 'undefined') return;
        document.title = "Projects | Charlz's Portfolio";
        let meta = document.head.querySelector('meta[name="description"]');
        if (!meta) {
            meta = document.createElement('meta');
            meta.setAttribute('name', 'description');
            document.head.appendChild(meta);
        }
        meta.setAttribute('content', "Explore web development projects by Charles Obuzor. See e-commerce, task manager, portfolio, and more.");
    }, []);

    return (
            <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" className="container mx-auto px-4 sm:px-6 py-28 md:py-32">
                <div className="text-left md:text-center">
                    <h1 className="text-3xl md:text-4xl font-bold mb-4" data-cursorvariant="hover">
                        My Projects
                    </h1>
                    <p className={`text-sm sm:text-base mb-16 md:mb-24 max-w-2xl md:mx-auto ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        A selection of projects that showcase my passion for creating clean, efficient, and user-friendly web applications.
                    </p>
                </div>
                <div className="max-w-5xl mx-auto">
                    {dummyProjects.map((project, index) => (
                        <ProjectCard key={index} project={project} theme={theme} isReversed={index % 2 !== 0} />
                    ))}
                </div>
        </motion.div>
    );
};

export default ProjectsPage;
