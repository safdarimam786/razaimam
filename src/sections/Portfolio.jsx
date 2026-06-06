import React, { useMemo, useState, useCallback, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiPlay, FiFilm, FiClock } from 'react-icons/fi';
import { SectionHeader } from '../components/SectionHeader.jsx';
import { portfolio } from '../data/profile.js';

const categories = ['All', 'Cinematic Videos', 'Motion Graphics'];

function parseSeconds(value) {
  if (typeof value === 'number' && isFinite(value)) return value;
  if (typeof value === 'string' && /^\d{1,2}:\d{2}$/.test(value)) {
    const [m, s] = value.split(':').map(Number);
    return m * 60 + s;
  }
  return NaN;
}

function formatDuration(value) {
  const seconds = parseSeconds(value);
  if (!isFinite(seconds)) return '00:00';
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

function formatTimecode(value) {
  const seconds = parseSeconds(value);
  if (!isFinite(seconds)) return '00:00:00:00';
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
  const onDurationRef = useRef(onDuration);
  onDurationRef.current = onDuration;

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    setError(false);

    const handleError = () => setError(true);

    const trySeek = (t) => { try { if (el) el.currentTime = t; } catch {} };

    const seekToFirst = () => { if (!hoveringRef.current) trySeek(0.1); };

    const onMeta = () => {
      if (onDurationRef.current) onDurationRef.current(el.duration);
      seekToFirst();
    };

    if (el.readyState >= 1) onMeta();
    el.addEventListener('loadedmetadata', onMeta);
    el.addEventListener('error', handleError);

    return () => {
      el.removeEventListener('loadedmetadata', onMeta);
      el.removeEventListener('error', handleError);
    };
  }, [videoSrc]);

  const handleMouseEnter = () => {
    hoveringRef.current = true;
    const el = videoRef.current;
    if (el) el.play().catch(() => {});
  };

  const handleMouseLeave = () => {
    hoveringRef.current = false;
    const el = videoRef.current;
    if (el) { try { el.pause(); } catch {} try { el.currentTime = 0.1; } catch {} }
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

function BentoClip({ item, index, onOpen, onDuration }) {
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
  const [durations, setDurations] = useState({});

  const openVideo = useCallback((item) => {
    const url = '/video-player.html?src=' + encodeURIComponent(item.videoSrc);
    window.open(url, '_blank');
  }, []);

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
    <section id="portfolio" aria-label="Portfolio" className="section-pad overflow-hidden">
      <SectionHeader kicker="Sequence 01" title="Portfolio timeline">
        Bento grid of video projects inspired by After Effects. Hover any clip to preview, click for full view.
      </SectionHeader>
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex flex-wrap justify-center gap-2" data-reveal>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActive(category)}
              className={`category-pill ${active === category ? 'active' : ''}`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="bento-grid">
          <BentoPreview item={portfolioWithDuration[0]} onOpen={openVideo} onDuration={handleDuration} />

          <div className="bento-grid-inner">
            {portfolioWithDuration.slice(1).map((item, index) => (
              <BentoClip
                key={item.id}
                item={item}
                index={index + 1}
                onOpen={openVideo}
                onDuration={handleDuration}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
