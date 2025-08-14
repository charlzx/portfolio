import React from 'react';
import { motion } from 'framer-motion';
import { GithubIcon, ExternalLinkIcon } from '../components/Icons';

const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeInOut' } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.5, ease: 'easeInOut' } }
};

const ProjectCard = ({ project, theme }) => {
    const cardBg = theme === 'dark' ? 'bg-[#1a1a1a]/50 backdrop-blur-sm border-gray-800' : 'bg-white/50 backdrop-blur-sm border-gray-200';
    const textColor = theme === 'dark' ? 'text-gray-300' : 'text-gray-700';
    const titleColor = theme === 'dark' ? 'text-white' : 'text-black';
    const techPillBg = theme === 'dark' ? 'bg-[#C51A24]/10 text-[#C51A24]' : 'bg-[#C51A24]/10 text-[#C51A24]';

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className={`border rounded-lg flex flex-col h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${cardBg} overflow-hidden`}
        >
            <img 
                src={project.imageUrl} 
                alt={`${project.title} preview`} 
                className="w-full h-48 object-cover"
                onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/600x400/0D0D0D/C51A24?text=Image+Not+Found'; }}
            />
            <div className="p-6 flex flex-col flex-grow">
                <div className="flex-grow">
                    <div className="flex justify-between items-start mb-4">
                        <h3 className={`text-xl font-bold ${titleColor}`} data-cursorvariant="hover">{project.title}</h3>
                        <div className="flex items-center gap-3 flex-shrink-0">
                            {project.githubUrl && (
                                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="hover:text-[#C51A24] transition-colors" data-cursorvariant="hover">
                                    <GithubIcon className="w-5 h-5" />
                                </a>
                            )}
                            {project.liveUrl && (
                                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="hover:text-[#C51A24] transition-colors" data-cursorvariant="hover">
                                    <ExternalLinkIcon className="w-5 h-5" />
                                </a>
                            )}
                        </div>
                    </div>
                    <p className={`text-sm mb-4 ${textColor}`}>{project.description}</p>
                </div>
                <div className="flex flex-wrap gap-2 mt-auto">
                    {project.technologies.map(tech => (
                        <span key={tech} className={`text-xs font-medium px-2.5 py-1 rounded-full ${techPillBg}`}>
                            {tech}
                        </span>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};


const ProjectsPage = ({ theme, path }) => {
    const dummyProjects = [
        {
            title: "E-commerce Platform",
            description: "A full-featured e-commerce site with product listings, a shopping cart, and a checkout process. Built with a focus on performance and user experience.",
            technologies: ["React", "Redux", "Node.js", "Express", "MongoDB"],
            liveUrl: "#",
            githubUrl: "#",
            imageUrl: "https://placehold.co/600x400/1a1a1a/ffffff?text=E-commerce",
        },
        {
            title: "Task Management App",
            description: "A Kanban-style task management application that allows users to create, organize, and track their tasks through different stages of completion.",
            technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
            liveUrl: "#",
            githubUrl: "#",
            imageUrl: "https://placehold.co/600x400/1a1a1a/ffffff?text=Task+Manager",
        },
        {
            title: "Portfolio Website v2",
            description: "The very site you are on now. A personal portfolio to showcase my skills in finance and frontend development, built with modern web technologies.",
            technologies: ["React", "Framer Motion", "Tailwind CSS", "Three.js"],
            liveUrl: "#",
            githubUrl: "#",
            imageUrl: "https://placehold.co/600x400/1a1a1a/ffffff?text=Portfolio",
        },
        {
            title: "Weather Dashboard",
            description: "A clean and simple weather dashboard that provides current weather conditions and a 5-day forecast for any city using a third-party API.",
            technologies: ["React", "Chart.js", "OpenWeatherMap API"],
            liveUrl: "#",
            githubUrl: "#",
            imageUrl: "https://placehold.co/600x400/1a1a1a/ffffff?text=Weather+App",
        },
        {
            title: "Interactive Data Visualization",
            description: "A data visualization project that displays complex datasets in an interactive and easy-to-understand format using D3.js.",
            technologies: ["D3.js", "JavaScript", "HTML5", "CSS3"],
            liveUrl: "#",
            githubUrl: "#",
            imageUrl: "https://placehold.co/600x400/1a1a1a/ffffff?text=Data+Viz",
        },
        {
            title: "Real-time Chat Application",
            description: "A web-based chat application that enables users to communicate in real-time, featuring user authentication and multiple chat rooms.",
            technologies: ["React", "Socket.IO", "Node.js", "Firebase"],
            liveUrl: "#",
            githubUrl: "#",
            imageUrl: "https://placehold.co/600x400/1a1a1a/ffffff?text=Chat+App",
        },
    ];

    return (
        <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" className="container mx-auto px-6 py-32 md:py-40">
            <h1 className="text-4xl md:text-6xl font-bold text-center mb-4" data-cursorvariant="hover">
                My Projects
            </h1>
            <p className={`text-lg text-center mb-16 max-w-2xl mx-auto ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                A selection of projects that showcase my passion for creating clean, efficient, and user-friendly web applications.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {dummyProjects.map((project, index) => (
                    <ProjectCard key={index} project={project} theme={theme} />
                ))}
            </div>
        </motion.div>
    );
};

export default ProjectsPage;
