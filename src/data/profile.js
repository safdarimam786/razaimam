import {
  BiLogoAdobe,
  BiLogoYoutube,
  BiMoviePlay,
  BiPalette,
  BiSolidVideos
} from 'react-icons/bi';
import { FiLayers, FiSliders, FiZap } from 'react-icons/fi';

const cloudBase = 'https://res.cloudinary.com/dyvnrtkpx';

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

const colors = ['premiere', 'after', 'cyan', 'amber'];

export const portfolio = [
  { category: 'Cinematic Videos', title: 'Railway Cinematic',           file: 'v1779171263/Railway_cinematic_imw8de.mp4',        duration: '00:30' },
  { category: 'Motion Graphics',   title: 'Srijan Motion Graphic',      file: 'v1779171261/srijan_final_motion_graphic_fathmv.mp4', duration: '00:30' },
  { category: 'Motion Graphics',   title: 'After Reel Motion Graphic',  file: 'v1779171241/after_reel_motion_graphic_ero7jo.mp4',  duration: '00:30' },
  { category: 'Cinematic Videos',  title: 'Fast Paced Reel',            file: 'v1779171189/fast_paced_reel_cinematic_tfadro.mp4',  duration: '00:30' },
  { category: 'Motion Graphics',   title: 'The Reel Motion Graphic',    file: 'v1779171185/the_reel_motion_graphic_hgyuz4.mp4',    duration: '00:30' },
  { category: 'Motion Graphics',   title: 'Ali Abdal Style',            file: 'v1779171165/final_ali_abdal_style_motion_graphic_faijdp.mp4', duration: '00:30' },
  { category: 'Motion Graphics',   title: 'AI Job Sample',              file: 'v1779171152/AI_job_sample_motion_graphic_ywnpja.mp4',     duration: '00:30' },
].map((item, index) => ({
  id: `video-${index}`,
  ...item,
  videoSrc: `${cloudBase}/video/upload/q_auto/${item.file}`,
  posterSrc: `${cloudBase}/video/upload/q_auto/so_0/${item.file.replace('.mp4', '.jpg')}`,
  color: colors[index % colors.length],
}));
