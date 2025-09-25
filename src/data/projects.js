import crwn3Img from '../assets/crwn3.webp';
import gymxImg from '../assets/gymx.webp';
import heirswealthImg from '../assets/heirswealth.webp';
import radioImg from '../assets/radio.webp';
import portfolioImg from '../assets/my-portfolio.webp';
import solisysImg from '../assets/solisys.webp';

const Projects = [
  {
    title: 'CRWN3',
    description: 'A full-featured e-commerce site with product listings, a shopping cart, and a checkout process. Built with a focus on performance and user experience.',
    technologies: ['React', 'Vite', 'Tailwind', 'Leaflet.js'],
    liveUrl: 'https://crwn3.vercel.app/',
    githubUrl: 'https://github.com/charlzx/shop',
    imageUrl: crwn3Img,
  },
  {
    title: 'SMART GYM',
    description: 'A responsive fitness website featuring workout program sections, class schedules, and modern UI components for an engaging user experience.',
    technologies: ['React', 'Vite', 'Tailwind', 'Rechart.js', 'React-Icons'],
    liveUrl: 'https://gymx.vercel.app/',
    githubUrl: 'https://github.com/charlzx/gym-app',
    imageUrl: gymxImg,
  },
  {
    title: 'HEIRSWEALTH',
    description: 'A full-spectrum solar energy company offering residential, industrial, and community installations, delivering sustainable, cost-efficient power systems to empower clients long-term.',
    technologies: ['React', 'Vite', 'Tailwind', 'Framer Motion'],
    liveUrl: 'https://heirswealth.com',
    githubUrl: '',
    imageUrl: heirswealthImg,
  },
  {
    title: 'GTA Radio',
    description: 'A modern web application that recreates the authentic Grand Theft Auto radio experience with real-time synchronized playback across all users.',
    technologies: ['React', 'Vite', 'Tailwind'],
    liveUrl: 'https://gta-live.vercel.app/',
    githubUrl: 'https://github.com/charlzx/gta-radio',
    imageUrl: radioImg,
  },
  {
    title: 'SOLISYS',
    description: 'A web app that guides users through designing off-grid solar systems — from load estimation to inverter, battery, and panel sizing — with printable, client-ready summaries.',
    technologies: ['React', 'Tailwind', 'Vite'],
    liveUrl: 'https://solisys.vercel.app/',
    githubUrl: 'https://github.com/charlzx/solisys',
    imageUrl: solisysImg,
  },
  {
    title: 'My Portfolio',
    description: 'The very site you are on now. A personal portfolio to showcase my frontend development skills, built with modern web technologies and clean design principles.',
    technologies: ['React', 'Framer Motion', 'Tailwind', 'Vite'],
    liveUrl: 'https://charlz.dev',
    githubUrl: 'https://github.com/charlzx/portfolio',
    imageUrl: portfolioImg,
  },
];

export default Projects;
