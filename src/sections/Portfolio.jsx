import React, { useMemo, useState, useRef, useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FiExternalLink, FiMaximize2, FiPlay, FiX, FiFilm, FiClock } from 'react-icons/fi';
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

function HoverVideo({ thumbnail, videoSrc, className, onDuration }) {
  const [hovering, setHovering] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    if (!videoRef.current) return;
    if (hovering) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    } else {
      videoRef.current.pause();
    }
  }, [hovering]);

  const showVideo = hovering && videoReady;

  return (
    <div
      className="hover-video-wrap"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <img
        src={thumbnail}
        alt=""
        className={className}
        style={{ display: showVideo ? 'none' : undefined }}
        loading="lazy"
      />
      <video
        ref={videoRef}
        src={videoSrc}
        muted
        loop
        playsInline
        preload="none"
        className={className}
        style={{ display: showVideo ? undefined : 'none' }}
        onLoadedData={() => setVideoReady(true)}
        onLoadedMetadata={() => {
          if (onDuration && videoRef.current) {
            onDuration(videoRef.current.duration);
          }
        }}
        onError={() => setVideoReady(false)}
      />
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
        <HoverVideo thumbnail={item.thumbnail} videoSrc={item.videoSrc} className="bento-preview-img" onDuration={(d) => onDuration(item.id, d)} />
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
        <HoverVideo thumbnail={item.thumbnail} videoSrc={item.videoSrc} className="bento-clip-img" onDuration={(d) => onDuration(item.id, d)} />
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
        Bento grid of video projects inspired by After Effects. Hover any clip to preview, click to play full.
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
            className="portfolio-modal fixed inset-0 z-[80] bg-black/82 p-3 backdrop-blur-xl md:grid md:place-items-center md:p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              key={selected.id}
              className="portfolio-dialog flex w-full flex-col overflow-hidden rounded-2xl border border-cyan/25 bg-panel shadow-glow md:mx-auto md:max-w-5xl"
              initial={{ scale: 0.92, y: 40 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.92, y: 40 }}
            >
              <div className="flex items-center justify-between border-b border-line bg-black/30 px-4 py-3 shrink-0">
                <div className="min-w-0">
                  <p className="text-xs uppercase tracking-[0.22em] text-cyan">{selected.category}</p>
                  <h3 className="font-display truncate text-xl font-bold text-white">{selected.title}</h3>
                </div>
                <button
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-line"
                  onClick={() => setSelected(null)}
                  aria-label="Close video"
                >
                  <FiX />
                </button>
              </div>
              <div className="portfolio-player bg-black">
                <video
                  ref={videoRef}
                  src={selected.videoSrc}
                  className="h-full w-full"
                  controls
                  autoPlay
                  playsInline
                />
              </div>
              <div className="portfolio-actions flex flex-wrap items-center justify-between gap-3 p-4 shrink-0">
                <span className="inline-flex items-center gap-2 text-sm text-slate-400">
                  <FiMaximize2 className="text-cyan" />
                  Full playback
                </span>
                <a
                  href={selected.videoSrc}
                  download
                  className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-bold text-ink"
                >
                  <FiExternalLink />
                  Download Video
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
