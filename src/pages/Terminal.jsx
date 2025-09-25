import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Settings, X, Minus, Square } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import Projects from '../data/projects';

// --- THEMES (EXPANDED WITH SCROLLBAR STYLES) ---
const themes = {
  dark: { background: 'bg-gray-900', text: 'text-gray-100', prompt: 'text-green-400', output: 'text-gray-300', border: 'border-black/20', titleBar: 'bg-gray-800', error: 'text-red-400', optionSelectedBg: 'bg-green-500', optionSelectedText: 'text-white', suggestion: 'text-gray-500', scrollbarTrack: '#1a202c', scrollbarThumb: '#4a5568', scrollbarThumbHover: '#718096', dir: 'text-blue-400', link: 'text-blue-400 hover:text-blue-300' },
  light: { background: 'bg-white', text: 'text-gray-800', prompt: 'text-blue-600', output: 'text-gray-700', border: 'border-gray-300', titleBar: 'bg-gray-200', error: 'text-red-600', optionSelectedBg: 'bg-blue-500', optionSelectedText: 'text-white', suggestion: 'text-gray-400', scrollbarTrack: '#edf2f7', scrollbarThumb: '#a0aec0', scrollbarThumbHover: '#718096', dir: 'text-blue-500', link: 'text-blue-600 hover:text-blue-500' },
  matrix: { background: 'bg-black', text: 'text-green-400', prompt: 'text-green-300', output: 'text-green-500', border: 'border-green-900', titleBar: 'bg-[#0a0a0a]', error: 'text-red-500', optionSelectedBg: 'bg-green-700', optionSelectedText: 'text-black', suggestion: 'text-green-900', scrollbarTrack: '#000000', scrollbarThumb: '#003B00', scrollbarThumbHover: '#005F00', dir: 'text-green-300', link: 'text-green-300 hover:text-green-200' },
  solarized: { background: 'bg-[#002b36]', text: 'text-[#839496]', prompt: 'text-[#268bd2]', output: 'text-[#93a1a1]', border: 'border-[#001f27]', titleBar: 'bg-[#00212b]', error: 'text-[#dc322f]', optionSelectedBg: 'bg-[#2aa198]', optionSelectedText: 'text-[#002b36]', suggestion: 'text-[#586e75]', scrollbarTrack: '#00212b', scrollbarThumb: '#586e75', scrollbarThumbHover: '#657b83', dir: 'text-[#268bd2]', link: 'text-[#2aa198] hover:text-[#859900]' },
  dracula: { background: 'bg-[#282a36]', text: 'text-[#f8f8f2]', prompt: 'text-[#50fa7b]', output: 'text-[#bd93f9]', border: 'border-[#191a21]', titleBar: 'bg-[#21222c]', error: 'text-[#ff5555]', optionSelectedBg: 'bg-[#bd93f9]', optionSelectedText: 'text-[#282a36]', suggestion: 'text-[#6272a4]', scrollbarTrack: '#21222c', scrollbarThumb: '#44475a', scrollbarThumbHover: '#6272a4', dir: 'text-[#8be9fd]', link: 'text-[#ff79c6] hover:text-[#ffb86c]' },
  gruvbox: { background: 'bg-[#282828]', text: 'text-[#ebdbb2]', prompt: 'text-[#b8bb26]', output: 'text-[#fabd2f]', border: 'border-[#1d2021]', titleBar: 'bg-[#3c3836]', error: 'text-[#fb4934]', optionSelectedBg: 'bg-[#fabd2f]', optionSelectedText: 'text-[#282828]', suggestion: 'text-[#928374]', scrollbarTrack: '#3c3836', scrollbarThumb: '#665c54', scrollbarThumbHover: '#7c6f64', dir: 'text-[#83a598]', link: 'text-[#83a598] hover:text-[#b16286]' },
  nord: { background: 'bg-[#2e3440]', text: 'text-[#d8dee9]', prompt: 'text-[#a3be8c]', output: 'text-[#88c0d0]', border: 'border-[#242933]', titleBar: 'bg-[#3b4252]', error: 'text-[#bf616a]', optionSelectedBg: 'bg-[#88c0d0]', optionSelectedText: 'text-[#2e3440]', suggestion: 'text-[#4c566a]', scrollbarTrack: '#3b4252', scrollbarThumb: '#4c566a', scrollbarThumbHover: '#5e81ac', dir: 'text-[#81a1c1]', link: 'text-[#81a1c1] hover:text-[#b48ead]' },
  'one-dark': { background: 'bg-[#282c34]', text: 'text-[#abb2bf]', prompt: 'text-[#98c379]', output: 'text-[#61afef]', border: 'border-[#21252b]', titleBar: 'bg-[#21252b]', error: 'text-[#e06c75]', optionSelectedBg: 'bg-[#61afef]', optionSelectedText: 'text-[#282c34]', suggestion: 'text-[#5c6370]', scrollbarTrack: '#21252b', scrollbarThumb: '#5c6370', scrollbarThumbHover: '#98c379', dir: 'text-[#61afef]', link: 'text-[#c678dd] hover:text-[#e5c07b]' },
};

// --- FONT STYLES (EXPANDED) ---
const fontStyles = { 
  'monospace': 'font-mono', 
  'inconsolata': 'font-[Inconsolata]', 
  'source code': 'font-[Source_Code_Pro]', 
  'roboto': 'font-[Roboto_Mono]', 
  'ubuntu': 'font-[Ubuntu_Mono]', 
  'serif': 'font-serif' 
};
const fontSizes = { 'xs': 'text-xs', 'sm': 'text-sm', 'base': 'text-base', 'lg': 'text-lg', 'xl': 'text-xl' };

// --- SIMULATED FILE SYSTEM ---
const fileSystem = {
  'home': {
    'charles': {
      'about.txt': `
Title: Frontend Developer
Intro: As a frontend developer, I build beautiful, functional, and user-centric web experiences. I am proficient in the modern frontend stack, including React, Next.js, and Tailwind CSS, and I have a passion for creating pixel-perfect designs and intuitive interactions. I enjoy collaborating with designers and developers to bring ideas to life, and I am always eager to learn new technologies and improve my skills.

## Experience
- Freelance Frontend Developer | Self-Employed (2022 — Present)
  - Partnered with clients, startups and small businesses to build and scale web sites / applications. Specialized in creating responsive, high-performance UIs based on specifications.
- Frontend Developer | Zuri Team, Inc. (Mar 2021 — Jul 2021)
  - Worked with teams to build full web applications. Focused on responsive UIs, API integration, and collaboration with GitHub.
- Frontend Intern (StudentBuild Study Group) | Levelop (Aug 2020 — Dec 2020)
  - Built test projects and collaborated with peers on React.js features. Gained experience in debugging, code reviews, and teamwork.
- Student Intern | Emerging Platforms Ltd (Feb 2020 — Sep 2020)
  - Started learning tech with focus on HTML, CSS, and JavaScript to build simple web projects.

## Education
- BSc in Business Administration | University of Benin (2018 - 2023)
`,
      'projects': Object.fromEntries(Projects.map(p => {
  const key = `${p.title.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'')}.md`;
  const md = `\n# ${p.title}\n${p.description}\n- Technologies: ${p.technologies.join(', ')}\n- Live URL: ${p.liveUrl || ''}\n- GitHub: ${p.githubUrl || ''}\n`;
  return [key, md];
      })),
      'contact.txt': `
You can reach me via the following channels:
- Email: charlesobuzor@outlook.com
- GitHub: https://github.com/charlzx
`,
      'socials.txt': `
Connect with me on other platforms:
- Spotify: https://open.spotify.com/user/s76ocb47g23yzpwrf939hyvvw
- Chess.com: https://www.chess.com/member/charlz-x
- GitHub: https://github.com/charlzx
`
    }
  }
};

// --- Helper Components & Functions ---

// Utility to get browser info
const parseUserAgent = () => {
  if (typeof navigator === 'undefined') return 'SSR';
  const ua = navigator.userAgent;
  let browserName = "Unknown";
  let browserVersion = "N/A";

  if (/firefox/i.test(ua)) { browserName = "Firefox"; browserVersion = ua.match(/firefox\/([\d.]+)/i)?.[1]; }
  else if (/chrome/i.test(ua) && !/edge/i.test(ua)) { browserName = "Chrome"; browserVersion = ua.match(/chrome\/([\d.]+)/i)?.[1]; }
  else if (/safari/i.test(ua) && !/chrome/i.test(ua)) { browserName = "Safari"; browserVersion = ua.match(/version\/([\d.]+)/i)?.[1]; }
  else if (/edge/i.test(ua)) { browserName = "Edge"; browserVersion = ua.match(/edge\/([\d.]+)/i)?.[1]; }
  return `${browserName} ${browserVersion || ''}`.trim();
};

// Component to render text with clickable links
const LinkifiedText = ({ text, themeClasses }) => {
  const linkRegex = new RegExp('(\\b(?:https?|ftp|file):\\/\\/[-A-Z0-9+&@#\\/\\%?=~_|!:,.;]*[-A-Z0-9+&@#\\/%=~_|])|(\\bwww\\.[-A-Z0-9+&@#\\/\\%?=~_|!:,.;]*[-A-Z0-9+&@#\\/%=~_|])|(\\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,})', 'ig');
  if (!text || typeof text !== 'string') return <>{text}</>;

  const parts = text.split(linkRegex).filter(part => part !== undefined);

  return (
    <>
      {parts.map((part, index) => {
        if (part.match(linkRegex)) {
          let href = part;
          if (part.startsWith('www.')) href = `http://${part}`;
          else if (part.includes('@')) href = `mailto:${part}`;
          return (
            <a key={index} href={href} target="_blank" rel="noopener noreferrer" className={`underline ${themeClasses.link}`}>
              {part}
            </a>
          );
        }
        return part;
      })}
    </>
  );
}; 

// Component to animate text typing
const TypingAnimation = ({ text, onComplete, onProgress, themeClasses }) => {
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    if (typeof text !== 'string') {
      if (onComplete) onComplete();
      return;
    }
    let i = 0;
    setDisplayText('');
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayText(text.substring(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
        if (onComplete) onComplete();
      }
    }, 15);
    return () => clearInterval(interval);
  }, [text, onComplete]);

  useEffect(() => {
    if (onProgress && displayText.length > 0) {
      // Run after render so DOM (and scrollHeight) is updated
      try {
        window.requestAnimationFrame(() => onProgress(displayText.length));
      } catch {
        // fallback
        setTimeout(() => onProgress(displayText.length), 0);
      }
    }
  }, [displayText, onProgress]);

  return (
    <pre className="whitespace-pre-wrap">
      {displayText}
      {displayText.length < (text?.length || 0) && <span className={`animate-pulse ${themeClasses.text}`}>█</span>}
    </pre>
  );
};

// A wrapper to handle rendering different types of output (JSX vs. string)
const OutputRenderer = ({ content, onComplete, onProgress, themeClasses }) => {
  useEffect(() => {
    if (typeof content !== 'string') {
      const timer = setTimeout(() => {
        if (onComplete) onComplete();
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [content, onComplete]);

  if (typeof content === 'string') {
    return <TypingAnimation text={content} onComplete={onComplete} onProgress={onProgress} themeClasses={themeClasses} />;
  }
  return content;
};


// --- Settings Dropdown ---
const SettingsDropdown = ({ settings, setSettings, setIsOpen, themeClasses }) => {
  const dropdownRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => { if (dropdownRef.current && !dropdownRef.current.contains(event.target)) setIsOpen(false); };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setIsOpen]);

  const OptionGroup = ({ title, options, current, name }) => (
    <div>
      <h4 className={`font-semibold text-sm mb-2 opacity-80`}>{title}</h4>
      <div className="flex flex-wrap gap-2">
        {Object.keys(options).map(key => (
          <button key={key} onClick={() => setSettings(s => ({ ...s, [name]: key }))} className={`px-3 py-1 text-xs rounded-full transition-colors capitalize ${current === key ? `${themeClasses.optionSelectedBg} ${themeClasses.optionSelectedText}` : `bg-black/20 hover:bg-black/40`}`}>
            {key}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <motion.div 
      ref={dropdownRef} 
      initial={{ opacity: 0, y: -10 }} 
      animate={{ opacity: 1, y: 0 }} 
      exit={{ opacity: 0, y: -10 }} 
      transition={{ duration: 0.2 }} 
      className={`absolute top-12 right-2 ${themeClasses.titleBar} ${themeClasses.text} rounded-lg shadow-xl p-4 w-72 border ${themeClasses.border} z-50 max-h-[calc(80vh-4rem)] sm:max-h-[calc(100vh-4rem)] overflow-y-auto custom-scrollbar`}
    >
      <div className="space-y-4">
        <OptionGroup title="Theme" options={themes} current={settings.theme} name="theme" />
        <OptionGroup title="Font Family" options={fontStyles} current={settings.font} name="font" />
        <OptionGroup title="Font Size" options={fontSizes} current={settings.size} name="size" />
      </div>
    </motion.div>
  );
};

// --- Title Bar Component ---
const MacControls = () => (
    <div className="flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-red-500"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
        <div className="w-3 h-3 rounded-full bg-green-500"></div>
    </div>
);

// --- Main App Component ---
export default function App() {
  // State management
  const [history, setHistory] = useState([]);
  const [input, setInput] = useState('');
  const [suggestion, setSuggestion] = useState('');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [currentPath, setCurrentPath] = useState(['home', 'charles']);
  const [isProcessing, setIsProcessing] = useState(false);

  // Load settings from localStorage
  const [settings, setSettings] = useState(() => {
    try {
      const savedSettings = localStorage.getItem('terminal-settings');
      const parsed = savedSettings ? JSON.parse(savedSettings) : {};
      return { 
        theme: parsed.theme || 'dark', 
        font: parsed.font || 'monospace', 
        size: parsed.size || 'base',
      };
    } catch { 
        return { theme: 'dark', font: 'monospace', size: 'base' }; 
    }
  });

  const terminalRef = useRef(null);
  const inputRef = useRef(null);

  const smoothScrollToBottom = useCallback(() => {
    const el = terminalRef.current;
    if (!el) return;
    // Prefer native smooth scroll when available
    try {
      el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
    } catch {
      el.scrollTop = el.scrollHeight;
    }
  }, []);

  // --- File System & Path Logic ---
  const resolvePath = (path, forCd = false) => {
    let tempPath;
    let originalPath = path;

    if (path.startsWith('/')) {
        tempPath = [];
    } else if (path.startsWith('~')) {
        tempPath = ['home', 'charles'];
        path = path.substring(1);
    } else {
        tempPath = [...currentPath];
    }

    const segments = path.split('/').filter(Boolean);
    for (const segment of segments) {
        if (segment === '..') {
            if (tempPath.length > 0) tempPath.pop();
        } else if (segment !== '.') {
            tempPath.push(segment);
        }
    }

    let target = fileSystem;
    for (const segment of tempPath) {
        if (target && typeof target === 'object' && segment in target) {
            target = target[segment];
        } else {
            return forCd ? `cd: no such file or directory: ${originalPath}` : null;
        }
    }

    if (forCd && typeof target !== 'object') {
        return `cd: not a directory: ${originalPath}`;
    }

    return forCd ? tempPath : target;
  };
  
  const getPathString = (path = currentPath) => {
      if (path.length >= 2 && path[0] === 'home' && path[1] === 'charles') {
          if (path.length === 2) return '~';
          return `~/${path.slice(2).join('/')}`;
      }
      return `/${path.join('/')}`;
  };

  // --- COMMANDS ---
  const commands = {
    help: () => (
      <div className="space-y-1">
      <p>Available commands:</p>
      <ul className="list-disc list-inside pl-4">
          <li><span className="font-semibold">welcome</span>: Display the welcome message.</li>
          <li><span className="font-semibold">about</span>: Display my professional background.</li>
          <li><span className="font-semibold">projects</span>: View my recent projects.</li>
          <li><span className="font-semibold">contact</span>: Get my contact information.</li>
          <li><span className="font-semibold">socials</span>: Find me on other platforms.</li>
          <li className="pt-2"><span className="font-semibold">dir, ls</span>: List directory contents.</li>
          <li><span className="font-semibold">cd [dir]</span>: Change directory.</li>
          <li><span className="font-semibold">cat, type [file]</span>: Display file content.</li>
          <li className="pt-2"><span className="font-semibold">history</span>: Show command history.</li>
          <li><span className="font-semibold">neofetch</span>: Display system information.</li>
          <li><span className="font-semibold">date</span>: Display the current date and time.</li>
          <li><span className="font-semibold">settings</span>: View and change terminal settings.</li>
          <li><span className="font-semibold">clear</span>: Clear the terminal screen.</li>
          <li><span className="font-semibold">help</span>: Show this help message.</li>
      </ul>
      </div>
    ),
    welcome: () => (
      <div>
      <h1 className="text-2xl font-bold mb-2">Welcome to my Portfolio!</h1>
      <p>This is a simulated terminal environment. All my portfolio content is stored in a virtual file system.</p>
      <p className="mt-2">You can use direct commands like `about` or `projects`, or navigate the file system with `dir`, `cd`, and `cat`. Type `help` for a full list of commands.</p>
      </div>
    ),
    about: () => fileSystem.home.charles['about.txt'].trim(),
    projects: () => Object.values(fileSystem.home.charles.projects).map(p => p.trim()).join('\n---\n'),
    contact: () => fileSystem.home.charles['contact.txt'].trim(),
    socials: () => fileSystem.home.charles['socials.txt'].trim(),
    dir: (args) => {
        const path = args[0] || '.';
        const target = resolvePath(path);
        const themeClasses = themes[settings.theme] || {};
        if (typeof target !== 'object' || target === null) {
            return { text: `dir: ${path}: Not a directory`, isError: true };
        }
        return (
            <div className="grid grid-cols-3 gap-x-4">
                {Object.keys(target).map(key => (
                    <span key={key} className={typeof target[key] === 'object' ? themeClasses.dir : ''}>
                        {typeof target[key] === 'object' ? `${key}/` : key}
                    </span>
                ))}
            </div>
        );
    },
    cd: (args) => {
        const path = args[0];
        if (!path) return;

        const newPath = resolvePath(path, true);
        if (typeof newPath === 'string') {
            return { text: newPath, isError: true };
        }
        setCurrentPath(newPath);
    },
    cat: (args) => {
        const path = args[0];
        if (!path) return { text: `Usage: cat [file]`, isError: true };
        
        const target = resolvePath(path);
        if (typeof target === 'object' && target !== null) {
            return { text: `cat: ${path}: Is a directory`, isError: true };
        }
        if (target === null) {
            return { text: `cat: ${path}: No such file or directory`, isError: true };
        }
        return typeof target === 'string' ? target.trim() : target;
    },
    history: () => (
        <div className="space-y-1">
            {commandHistory.map((cmd, i) => <p key={i}>{`${commandHistory.length - i}  ${cmd}`}</p>)}
        </div>
    ),
    date: () => new Date().toLocaleString(),
    settings: (args) => {
        const option = args[0];
        const value = args.slice(1).join(' ');

        if (!option) {
            return `Usage: settings [option] [value]\n\nOptions:\n  theme   - Change the color theme.\n  font    - Change the font family.\n  size    - Change the font size.\n\nAvailable themes: ${Object.keys(themes).join(', ')}\nAvailable fonts: ${Object.keys(fontStyles).join(', ')}\nAvailable sizes: ${Object.keys(fontSizes).join(', ')}\n\nCurrent Settings:\n  Theme: ${settings.theme}\n  Font: ${settings.font}\n  Size: ${settings.size}\n\nExample: settings font source code`;
        }
        
        const findKey = (obj, val) => Object.keys(obj).find(key => key.toLowerCase() === val.toLowerCase());

        switch (option) {
      case 'theme': {
        if (!value) return `Current theme: ${settings.theme}. Available: ${Object.keys(themes).join(', ')}`;
        const themeKey = findKey(themes, value);
        if (themeKey) {
          setSettings(s => ({ ...s, theme: themeKey }));
          return `Theme set to ${themeKey}.`;
        }
        return { text: `Error: '${value}' is not a valid theme.`, isError: true };
      }
      case 'font': {
        if (!value) return `Current font: ${settings.font}. Available: ${Object.keys(fontStyles).join(', ')}`;
        const fontKey = findKey(fontStyles, value);
        if (fontKey) {
          setSettings(s => ({ ...s, font: fontKey }));
          return `Font set to ${fontKey}.`;
        }
        return { text: `Error: '${value}' is not a valid font.`, isError: true };
      }
      case 'size': {
        if (!value) return `Current font size: ${settings.size}. Available: ${Object.keys(fontSizes).join(', ')}`;
        const sizeKey = findKey(fontSizes, value);
        if (sizeKey) {
          setSettings(s => ({ ...s, size: sizeKey }));
          return `Font size set to ${sizeKey}.`;
        }
        return { text: `Error: '${value}' is not a valid size.`, isError: true };
      }
      default:
        return { text: `Error: '${option}' is not a valid setting.`, isError: true };
        }
    },
    neofetch: () => (
      <div className="flex gap-4">
      <pre className="font-mono text-sm">{
`   /\\
  /  \\
 /____\\
/______\\
  /  \\
 /    \\
/      \\
/________\\`
      }</pre>
      <div className="text-sm">
          <p><span className="font-bold">charles</span>@<span className="font-bold">portfolio</span></p>
          <p>--------------------</p>
          <p><span className="font-bold">OS</span>: Web Browser</p>
          <p><span className="font-bold">Browser</span>: {parseUserAgent()}</p>
          <p><span className="font-bold">Resolution</span>: {window.innerWidth}x{window.innerHeight}</p>
          <p><span className="font-bold">Timestamp</span>: {new Date().toLocaleTimeString()}</p>
          <p><span className="font-bold">Shell</span>: zsh (simulated)</p>
          <p><span className="font-bold">Theme</span>: {settings.theme}</p>
      </div>
      </div>
    ),
    echo: (args) => args.join(' '),
    cowsay: (args) => {
        const message = args.join(' ') || "Moo!";
        return (
            <pre className="font-mono text-sm">{
`< ${message} >
 \\  ^__^
  \\ (oo)\\_______
    (__)\\       )\\/\\
        ||----w |
        ||     ||`
            }</pre>
        );
    }
  };
  // Add command aliases
  commands.ls = commands.dir;
  commands.type = commands.cat;
  
  // --- Effects ---
  useEffect(() => { localStorage.setItem('terminal-settings', JSON.stringify(settings)); }, [settings]);
  useEffect(() => { const link = document.createElement('link'); link.href = "https://fonts.googleapis.com/css2?family=Inconsolata&family=Source+Code+Pro&family=Roboto+Mono&family=Ubuntu+Mono&display=swap"; link.rel = 'stylesheet'; document.head.appendChild(link); return () => { document.head.removeChild(link) } }, []);
  useEffect(() => { setHistory([{ command: 'welcome', output: (
    <div>
      <h1 className="text-2xl font-bold mb-2">Welcome to my Portfolio!</h1>
      <p>This is a simulated terminal environment. All my portfolio content is stored in a virtual file system.</p>
      <p className="mt-2">You can use direct commands like `about` or `projects`, or navigate the file system with `dir`, `cd`, and `cat`. Type `help` for a full list of commands.</p>
    </div>
  ), isTyping: false, path: ['home', 'charles'] }]); }, []);
  
  useEffect(() => {
    smoothScrollToBottom();
  }, [history, isProcessing, smoothScrollToBottom]);

  useEffect(() => {
    const styleId = 'dynamic-scrollbar-styles';
    const currentTheme = themes[settings.theme];
    if (!currentTheme) return;
    const { scrollbarTrack, scrollbarThumb, scrollbarThumbHover } = currentTheme;
    const css = `.custom-scrollbar::-webkit-scrollbar { width: 8px; } .custom-scrollbar::-webkit-scrollbar-track { background: ${scrollbarTrack}; } .custom-scrollbar::-webkit-scrollbar-thumb { background-color: ${scrollbarThumb}; border-radius: 4px; } .custom-scrollbar::-webkit-scrollbar-thumb:hover { background-color: ${scrollbarThumbHover}; }`;
    const oldStyle = document.getElementById(styleId);
    if (oldStyle) oldStyle.remove();
    const style = document.createElement('style');
    style.id = styleId;
    style.innerHTML = css;
    document.head.appendChild(style);
  }, [settings.theme]);

  const focusInput = () => inputRef.current?.focus();

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInput(value);
    if (value) {
        const match = Object.keys(commands).find(c => c.startsWith(value.toLowerCase()));
        setSuggestion(match && match !== value ? match.slice(value.length) : '');
    } else {
        setSuggestion('');
    }
  };

  const handleCommand = (e) => {
    if (e.key === 'Enter' && input.trim() !== '') {
      e.preventDefault();
      const fullCommand = input.trim();
      const [command, ...args] = fullCommand.toLowerCase().split(' ');
      
      setCommandHistory(prev => [fullCommand, ...prev]);
      setHistoryIndex(-1);
      setSuggestion('');
      setInput('');
      setIsProcessing(true);

      if (command === 'clear') { 
          setHistory([]); 
          setIsProcessing(false);
      } 
      else {
        const result = commands[command] ? commands[command](args) : { text: `Command not found: ${command}.`, isError: true };
        if (result !== undefined) {
            const outputText = result?.text ?? result;
            const isError = result?.isError ?? false;
            setHistory(prev => [...prev, { command: fullCommand, output: outputText, isError, isTyping: true, path: currentPath }]);
        } else {
            setHistory(prev => [...prev, { command: fullCommand, output: '', isError: false, isTyping: false, path: currentPath }]);
            setIsProcessing(false);
        }
      }
    } else if (e.key === 'Tab' || (e.key === 'ArrowRight' && e.target.selectionStart === input.length)) {
        if (suggestion) { e.preventDefault(); setInput(input + suggestion); setSuggestion(''); }
    } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if(historyIndex < commandHistory.length - 1) {
            const newIndex = historyIndex + 1;
            setHistoryIndex(newIndex);
            setInput(commandHistory[newIndex]);
        }
    } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if(historyIndex > -1) {
            const newIndex = historyIndex - 1;
            setHistoryIndex(newIndex);
            setInput(commandHistory[newIndex] || '');
        } else {
            setHistoryIndex(-1);
            setInput('');
        }
    }
  };
  
  const onTypingComplete = (index) => {
    setHistory(h => h.map((entry, i) => i === index ? { ...entry, isTyping: false } : entry));
    setIsProcessing(false);
    focusInput();
  };

  const themeClasses = themes[settings.theme] || {};
  const fontClass = fontStyles[settings.font] || 'font-mono';
  const sizeClass = fontSizes[settings.size] || 'text-base';

  const TitleBar = () => {
    const Title = () => (
        <div className="text-center text-sm opacity-60">
            charles@portfolio: {getPathString()}
        </div>
    );
    const SettingsButton = () => (
        <div className="relative">
            <button onClick={() => setIsSettingsOpen(o => !o)} className={`p-1 rounded-full transition-colors hover:bg-black/20`} aria-label="Open settings">
                <Settings size={18} />
            </button>
            <AnimatePresence>
                {isSettingsOpen && <SettingsDropdown settings={settings} setSettings={setSettings} setIsOpen={setIsSettingsOpen} themeClasses={themeClasses} />}
            </AnimatePresence>
        </div>
    );

    return (
        <div className={`hidden sm:flex items-center h-9 px-3 gap-2 flex-shrink-0 ${themeClasses.titleBar}`}>
            <MacControls />
            <div className="flex-grow"><Title /></div>
            <SettingsButton />
        </div>
    );
  };

  return (
    <main className={`flex items-center justify-center min-h-screen sm:p-4 bg-blue-800/60 ${fontClass} ${sizeClass} ${themeClasses.text}`}>
      <div className={`w-full h-screen sm:max-w-5xl sm:h-[80vh] sm:rounded-lg sm:shadow-2xl overflow-hidden flex flex-col border ${themeClasses.border} ${themeClasses.background}`}>
          <TitleBar />
          {/* Terminal Content */}
          <div ref={terminalRef} className="w-full flex-grow overflow-y-auto p-4 custom-scrollbar" onClick={focusInput}>
              {history.map((entry, index) => (
              <div key={index} className="mb-2">
                  <div className="flex items-center">
                  <span className={`${themeClasses.prompt} font-bold`}>charles@portfolio:{getPathString(entry.path)}$</span>
                  <span className="ml-2">{entry.command}</span>
                  </div>
                  <div className={`${entry.isError ? themeClasses.error : themeClasses.output}`}>
                    {entry.isTyping ? (
                      <OutputRenderer content={entry.output} onComplete={() => onTypingComplete(index)} onProgress={() => {
                        smoothScrollToBottom();
                      }} themeClasses={themeClasses} />
                    ) : (
                      typeof entry.output === 'string' ? (
                        <pre className="whitespace-pre-wrap"><LinkifiedText text={entry.output} themeClasses={themeClasses} /></pre>
                      ) : (
                        entry.output
                      )
                    )}
                  </div>
              </div>
              ))}
              {!isProcessing && (
                  <div className="flex items-center">
                      <span className={`${themeClasses.prompt} font-bold`}>charles@portfolio:{getPathString()}$</span>
                      <div className="relative flex-grow ml-2">
                          <input 
                              ref={inputRef} 
                              type="text" 
                              value={input} 
                              onChange={handleInputChange} 
                              onKeyDown={handleCommand} 
                              className="w-full bg-transparent border-none outline-none"
                              style={{ caretColor: 'currentColor' }}
                              autoFocus 
                          />
                          {suggestion && <span className={`absolute left-0 top-0 ${themeClasses.suggestion} pointer-events-none`}>{input}<span className="opacity-50">{suggestion}</span></span>}
                      </div>
                  </div>
              )}
          </div>
      </div>
    </main>
  );
}