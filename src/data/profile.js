import {
  BiLogoAdobe,
  BiLogoYoutube,
  BiMoviePlay,
  BiPalette,
  BiSolidVideos
} from 'react-icons/bi';
import { FiLayers, FiSliders, FiZap } from 'react-icons/fi';

const v = (id) => `https://drive.usercontent.google.com/download?id=${id}`;

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
  ['Cinematic Videos', 'Cinematic reel 1', '1yfUXxU-hMJX8eUW8rtA21DuEppXFgi1u', '00:30'],
  ['Cinematic Videos', 'Cinematic reel 2', '1q57qliOUD0xw7rPbheyMEsoFL7kklxRz', '00:30'],
  ['Motion Graphics', 'Motion graphic 1', '1tFFw4Toptq9_4RaEmBACUKrfRDaUqjUU', '00:30'],
  ['Motion Graphics', 'Motion graphic 2', '1qN3x8gzmjZm7Q6_BKvcCubMRY2oIwvem', '00:30'],
  ['Motion Graphics', 'Motion graphic 3', '1vL6botHEFmgmQbLNzC7O6cULKbuLWLGO', '00:30'],
  ['Motion Graphics', 'Motion graphic 4', '1Z6vkRZPGiSGhBpYgnTf01wfRPTDb_3nt', '00:30'],
  ['Motion Graphics', 'Motion graphic 5', '1GLMF-hnHeRfCPIT2BZAxuhMT7Xha2Q9e', '00:30'],
  ['Motion Graphics', 'Motion graphic 6', '1KoDKMpYNbTYv-F-SIpyCdNjpFmsmAYGi', '00:30'],
];

export const portfolio = portfolioSeed.map(([category, title, fileId, duration], index) => ({
  id: `video-${index}`,
  title,
  category,
  duration,
  videoSrc: v(fileId),
  track: index % 4,
  color: ['premiere', 'after', 'cyan', 'amber'][index % 4],
}));
