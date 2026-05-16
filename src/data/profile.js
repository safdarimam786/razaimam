import {
  BiLogoAdobe,
  BiLogoYoutube,
  BiMoviePlay,
  BiPalette,
  BiSolidVideos
} from 'react-icons/bi';
import { FiLayers, FiSliders, FiZap } from 'react-icons/fi';

const v = (f) => `/videos/${f.replace(/ /g, '%20')}`;

export const profile = {
  name: 'Raza Imam',
  role: 'Video Editor & Motion Graphics Artist',
  location: 'Pratap Vihar, Ghaziabad, Uttar Pradesh',
  email: 'razaimam942@gmail.com',
  phone: '+91-9717372784',
  summary:
    'Creative Video Editor passionate about bringing stories to life through engaging content. Experienced in editing videos for social media, motion graphics, cinematic edits, color grading, and storytelling-driven content.',
  experience: {
    title: 'Freelance Video Editor',
    company: 'Self-Employed',
    period: '2023 - 2024',
    duration: '1 Year'
  }
};

export const skills = [
  ['Adobe Premiere Pro', 96],
  ['Adobe After Effects', 92],
  ['CapCut', 90],
  ['Motion Graphics', 88],
  ['Color Grading', 87],
  ['Color Correction', 86],
  ['Audio Syncing', 84],
  ['Video Rendering', 90],
  ['Export Settings', 89],
  ['Cinematic Editing', 93],
  ['Social Media Editing', 95],
  ['Talking Head Videos', 88],
  ['Reels & Shorts', 94]
];

export const strengths = [
  'Creative Thinking',
  'Eye for Detail',
  'Fast Learner',
  'Client-Focused',
  'Good Time Management'
];

export const services = [
  { title: 'Video Editing', icon: BiMoviePlay },
  { title: 'Motion Graphics', icon: FiLayers },
  { title: 'Reels Editing', icon: BiSolidVideos },
  { title: 'YouTube Editing', icon: BiLogoYoutube },
  { title: 'Cinematic Editing', icon: FiZap },
  { title: 'Color Grading', icon: BiPalette },
  { title: 'Social Media Content', icon: BiLogoAdobe },
  { title: 'Visual Effects', icon: FiSliders }
];

export const workflow = [
  'Idea & Planning',
  'Asset Collection',
  'Editing Process',
  'Motion Graphics',
  'Final Delivery'
];

const portfolioSeed = [
  ['Cinematic Videos', 'Railway cinematic', 'Railway cinematic.mp4', '01:18'],
  ['Cinematic Videos', 'Fast paced reel cinematic', 'fast paced reel cinematic.mp4', '00:52'],
  ['Motion Graphics', 'Srijan final motion graphic', 'srijan final motion graphic.mp4', '00:34'],
  ['Motion Graphics', 'Final ali abdal style motion graphic', 'final ali abdal style motion graphic.mp4', '00:41'],
  ['Motion Graphics', 'After reel motion graphic', 'after reel motion graphic.mp4', '00:29'],
  ['Motion Graphics', 'AI job sample motion graphic', 'AI job sample motion graphic.mp4', '00:37'],
  ['Motion Graphics', 'The reel motion graphic', 'the reel motion graphic.mp4', '00:45'],
];

export const portfolio = portfolioSeed.map(([category, title, filename, duration], index) => ({
  id: `video-${index}`,
  title,
  category,
  duration,
  videoSrc: v(filename),
  track: index % 4,
  color: ['premiere', 'after', 'cyan', 'amber'][index % 4],
}));
