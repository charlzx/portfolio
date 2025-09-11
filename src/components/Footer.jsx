import React from 'react';
import { Github, Mail, Terminal } from 'lucide-react';

const Footer = ({ theme }) => {
    const isDark = theme === 'dark';
    const borderColor = isDark ? 'border-white/10' : 'border-black/10';
    const textColor = isDark ? 'text-gray-400' : 'text-gray-600';
    const linkHoverColor = 'hover:text-[#C51A24]';

    return (
        <footer className={`relative z-20 border-t ${borderColor} py-4`}>
            <div className="container mx-auto px-4 sm:px-6">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                    {/* Copyright */}
                    <div className={`text-sm ${textColor}`}>
                        © {new Date().getFullYear()} Charles Obuzor
                    </div>
                    
                    {/* Social Links */}
                    <div className="flex items-center gap-6">
                        <a 
                            href="mailto:charlesobuzor@outlook.com"
                            className={`relative z-10 ${textColor} ${linkHoverColor} transition-colors cursor-pointer`}
                            data-cursorvariant="hover"
                            aria-label="Email"
                        >
                            <Mail className="w-4 h-4" />
                        </a>
                        <a 
                            href="https://github.com/charlzx"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`relative z-10 ${textColor} ${linkHoverColor} transition-colors cursor-pointer`}
                            data-cursorvariant="hover"
                            aria-label="GitHub"
                        >
                            <Github className="w-4 h-4" />
                        </a>
                        <a 
                            href="/terminal"
                            className={`relative z-10 ${textColor} ${linkHoverColor} transition-colors cursor-pointer`}
                            data-cursorvariant="hover"
                            aria-label="Terminal Portfolio"
                        >
                            <Terminal className="w-4 h-4" />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
