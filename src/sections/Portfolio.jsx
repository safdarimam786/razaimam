import React, { useMemo, useState, useRef, useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FiPlay, FiX, FiFilm, FiClock } from 'react-icons/fi';
import { SectionHeader } from '../components/SectionHeader.jsx';
import { portfolio } from '../data/profile.js';

const categories = ['All', 'Cinematic Videos', 'Motion Graphics'];

function formatDuration(seconds) {
  if (!seconds || !isFinite(seconds)) return '00:00';
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

function formatTimecode(seconds) {
  if (!seconds || !isFinite(seconds)) return '00:00:00:00';
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  const f = Math.floor((seconds % 1) * 30);
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}:${String(f).padStart(2, '0')}`;
}

function HoverVideo({ videoSrc, className, onDuration }) {
  const [error, setError] = useState(false);
  const videoRef = useRef(null);
  const hoveringRef = useRef(false);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    setError(false);

    const seekToFirst = () => { if (el && !hoveringRef.current) el.currentTime = 0.1; };

    const onMeta = () => {
      if (onDuration) onDuration(el.duration);
      seekToFirst();
    };

    if (el.readyState >= 1) onMeta();
    el.addEventListener('loadedmetadata', onMeta);
    el.addEventListener('error', () => setError(true));

    return () => {
      el.removeEventListener('loadedmetadata', onMeta);
      el.removeEventListener('error', () => setError(true));
    };
  }, [videoSrc, onDuration]);

  const handleMouseEnter = () => {
    hoveringRef.current = true;
    const el = videoRef.current;
    if (el) el.play().catch(() => {});
  };

  const handleMouseLeave = () => {
    hoveringRef.current = false;
    const el = videoRef.current;
    if (el) { el.pause(); el.currentTime = 0.1; }
  };

  return (
    <div className="hover-video-wrap" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {error && <div className="bento-media-fallback"><FiFilm /></div>}
      <video ref={videoRef} src={videoSrc} muted loop playsInline preload="metadata" className={className} />
    </div>
  );
}

function BentoPreview({ item, onOpen, onDuration }) {
  if (!item) return null;
  return (
    <motion.div
      className="bento-preview"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="bento-preview-titlebar">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
        </div>
        <span>Composition Viewer</span>
        <span className="bento-preview-time">{formatTimecode(item.duration)}</span>
      </div>
      <div className="bento-preview-body" onClick={() => onOpen(item)} role="button" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && onOpen(item)}>
        <HoverVideo videoSrc={item.videoSrc} className="bento-preview-img" onDuration={(d) => onDuration(item.id, d)} />
        <div className="preview-scanlines" />
        <div className="bento-preview-play">
          <FiPlay />
          <span>Preview</span>
        </div>
      </div>
      <div className="bento-preview-info">
        <span className="clip-tag">{item.category}</span>
        <h3>{item.title}</h3>
        <div className="bento-preview-meta">
          <span><FiClock size={12} /> {formatDuration(item.duration)}</span>
          <span>1920 × 1080</span>
          <span>29.97 fps</span>
        </div>
      </div>
    </motion.div>
  );
}

function BentolClip({ item, index, onOpen, onDuration }) {
  const [hovering, setHovering] = useState(false);

  return (
    <motion.div
      layout
      className={`bento-clip ${item.color}`}
      onClick={() => onOpen(item)}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      whileHover={{ scale: 1.02, y: -4, z: 10 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
    >
      <div className="bento-clip-track">
        <span className="bento-track-num">V{index + 1}</span>
      </div>
      <div className="bento-clip-media">
        <HoverVideo videoSrc={item.videoSrc} className="bento-clip-img" onDuration={(d) => onDuration(item.id, d)} />
        <div className={`bento-clip-play-icon ${hovering ? 'is-hovering' : ''}`}>
          <FiPlay />
        </div>
      </div>
      <div className="bento-clip-info">
        <div className="bento-clip-meta">
          <span className="clip-tag">{item.category}</span>
          <span className="clip-duration"><FiClock size={10} /> {formatDuration(item.duration)}</span>
        </div>
        <h3>{item.title}</h3>
      </div>
      <div className="bento-clip-bar" style={{ width: `${55 + (index * 6) % 40}%` }} />
    </motion.div>
  );
}

export function Portfolio() {
  const [active, setActive] = useState('All');
  const [selected, setSelected] = useState(null);
  const [durations, setDurations] = useState({});

  const videoRef = useRef(null);

  const filtered = useMemo(
    () => (active === 'All' ? portfolio : portfolio.filter((item) => item.category === active)),
    [active]
  );

  const portfolioWithDuration = useMemo(
    () => filtered.map((item) => ({ ...item, duration: durations[item.id] || item.duration })),
    [filtered, durations]
  );

  const handleDuration = useCallback((id, seconds) => {
    setDurations((prev) => {
      if (prev[id] === seconds) return prev;
      return { ...prev, [id]: seconds };
    });
  }, []);

  return (
    <section id="portfolio" className="section-pad overflow-hidden">
      <SectionHeader kicker="Sequence 01" title="Portfolio timeline">
        Bento grid of video projects inspired by After Effects. Hover any clip to preview, click for full view.
      </SectionHeader>
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex flex-wrap justify-center gap-2" data-reveal>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => { setActive(category); setSelected(null); }}
              className={`category-pill ${active === category ? 'active' : ''}`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="bento-grid">
          <BentoPreview item={portfolioWithDuration[0]} onOpen={setSelected} onDuration={handleDuration} />

          <div className="bento-grid-inner">
            {portfolioWithDuration.map((item, index) => (
              <BentolClip
                key={item.id}
                item={item}
                index={index}
                onOpen={setSelected}
                onDuration={handleDuration}
              />
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-[80] flex items-center justify-center bg-black p-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              key={selected.id}
              className="relative flex h-full w-full items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white backdrop-blur-sm hover:bg-white/20"
                onClick={() => setSelected(null)}
                aria-label="Close video"
              >
                <FiX size={20} />
              </button>
              <video
                ref={videoRef}
                src={selected.videoSrc}
                className="max-h-full max-w-full"
                controls
                autoPlay
                playsInline
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
