import React, { useMemo, useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FiExternalLink, FiMaximize2, FiPlay, FiX, FiFilm } from 'react-icons/fi';
import { SectionHeader } from '../components/SectionHeader.jsx';
import { portfolio } from '../data/profile.js';

const categories = ['All', 'Cinematic Videos', 'Motion Graphics'];

function VideoFrame({ src, className }) {
  const ref = useRef(null);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  useEffect(() => {
    setLoaded(false);
    setError(false);
    const el = ref.current;
    if (!el) return;
    if (el.readyState >= 1) { el.currentTime = 0.1; setLoaded(true); return; }
    const onMeta = () => { el.currentTime = 0.1; setLoaded(true); };
    const onErr = () => { setError(true); };
    el.addEventListener('loadedmetadata', onMeta);
    el.addEventListener('error', onErr);
    return () => {
      el.removeEventListener('loadedmetadata', onMeta);
      el.removeEventListener('error', onErr);
    };
  }, [src]);
  return (
    <>
      {!loaded && !error && <div className="clip-media-placeholder" />}
      {error && <div className="clip-media-fallback"><FiFilm /></div>}
      <video ref={ref} src={src} muted playsInline preload="metadata" className={className} style={error ? { display: 'none' } : undefined} />
    </>
  );
}

function PortfolioPreview({ item, playing, onOpen }) {
  if (!item) return null;
  return (
    <motion.div
      className="portfolio-preview liquid-glass"
      data-reveal
      data-parallax="-4"
      initial={{ opacity: 0, y: 24, rotateX: 4 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
    >
      <div className="preview-titlebar">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
        </div>
        <span>Program Monitor / Hover Preview</span>
      </div>
      <div className="preview-grid">
        <div className="preview-screen" onClick={() => onOpen(item)} role="button" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && onOpen(item)}>
          <VideoFrame src={item.videoSrc} className="preview-screen-img" />
          <AnimatePresence mode="wait">
            {playing && (
              <motion.div
                key={item.id}
                className="preview-video-overlay"
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.35 }}
              >
                <div className="preview-video-pulse" />
                <div className="preview-video-label">Preview Active</div>
              </motion.div>
            )}
          </AnimatePresence>
          <div className="preview-scanlines" />
        </div>
        <div className="preview-meta">
          <span className="clip-tag">{item.category}</span>
          <h3>{item.title}</h3>
          <p>Hover any timeline clip to load it into this larger cinematic preview monitor.</p>
          <div className="preview-meters">
            {['Exposure', 'Motion', 'Audio', 'Grade'].map((meter, index) => (
              <div key={meter}>
                <span>{meter}</span>
                <i style={{ width: `${62 + index * 9}%` }} />
              </div>
            ))}
          </div>
          <button className="preview-open" onClick={() => onOpen(item)}>
            Open Full Player
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function PortfolioClip({ item, index = 0, onOpen, onPreview, onPreviewEnd, className = '' }) {
  const [previewing, setPreviewing] = useState(false);
  const waveCount = className.includes('mobile') ? 18 : 22;

  const startPreview = () => {
    setPreviewing(true);
    onPreview(item);
  };

  const stopPreview = () => {
    setPreviewing(false);
    onPreviewEnd(item);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onOpen(item);
    }
  };

  return (
    <motion.div
      layout
      role="button"
      tabIndex={0}
      onClick={() => onOpen(item)}
      onKeyDown={handleKeyDown}
      onMouseEnter={startPreview}
      onMouseLeave={stopPreview}
      onFocus={startPreview}
      onBlur={stopPreview}
      className={`clip-card ${item.color} ${className}`}
      whileHover={{ scale: 1.035, y: -7, rotateX: 1.5 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
    >
      <div className="clip-media">
        <VideoFrame src={item.videoSrc} className="clip-media-img" />
        <motion.div className="clip-hover-wash" animate={{ opacity: previewing ? 1 : 0 }} />
        <div className="clip-play">
          <FiPlay />
          <span className="clip-play-label">Play</span>
        </div>
      </div>
      <div className="clip-content">
        <div className="flex items-center justify-between gap-2">
          <span className="clip-tag">{item.category}</span>
          <span className="clip-duration">{item.duration}</span>
        </div>
        <h3>{item.title}</h3>
        <div className="waveform">
          {Array.from({ length: waveCount }).map((_, waveIndex) => (
            <span key={waveIndex} style={{ height: `${18 + ((waveIndex + index) % 7) * 8}%` }} />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export function Portfolio() {
  const [active, setActive] = useState('All');
  const [selected, setSelected] = useState(null);
  const [activePreview, setActivePreview] = useState(portfolio[0]);
  const [previewPlaying, setPreviewPlaying] = useState(false);
  const filtered = useMemo(() => (active === 'All' ? portfolio : portfolio.filter((item) => item.category === active)), [active]);
  const currentPreview = filtered.find((item) => item.id === activePreview?.id) || filtered[0];

  const selectCategory = (category) => {
    const nextItems = category === 'All' ? portfolio : portfolio.filter((item) => item.category === category);
    setActive(category);
    setActivePreview(nextItems[0]);
    setPreviewPlaying(false);
  };

  const startPreview = (item) => {
    setActivePreview(item);
    setPreviewPlaying(true);
  };

  const stopPreview = (item) => {
    setActivePreview(item);
    setPreviewPlaying(false);
  };

  return (
    <section id="portfolio" className="section-pad overflow-hidden">
      <SectionHeader kicker="Sequence 01" title="Portfolio timeline">
        Clip-style video thumbnails arranged as editing tracks. Hover a clip to auto-preview it, or open the cinematic player.
      </SectionHeader>
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex flex-wrap justify-center gap-2" data-reveal>
          {categories.map((category) => (
            <button key={category} onClick={() => selectCategory(category)} className={`category-pill ${active === category ? 'active' : ''}`}>
              {category}
            </button>
          ))}
        </div>

        <PortfolioPreview item={currentPreview} playing={previewPlaying} onOpen={setSelected} />

        <div className="mobile-swiper mb-6 md:hidden" data-reveal>
            {filtered.map((item) => (
              <div className="mobile-slide" key={item.id}>
                <PortfolioClip item={item} onOpen={setSelected} onPreview={startPreview} onPreviewEnd={stopPreview} className="mobile-clip min-h-64 w-full" />
              </div>
            ))}
        </div>

        <div className="timeline-board hidden md:block" data-reveal>
          <div className="timeline-ruler">
            {Array.from({ length: 12 }).map((_, index) => (
              <span key={index}>00:{String(index * 5).padStart(2, '0')}</span>
            ))}
          </div>
          <motion.div className="playhead" animate={{ left: ['8%', '94%', '8%'] }} transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }} />
          <div className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 rounded-xl border border-line bg-black/30 p-4">
              {filtered.map((item, index) => (
                <PortfolioClip
                  key={item.id}
                  item={item}
                  index={index}
                  onOpen={setSelected}
                  onPreview={startPreview}
                  onPreviewEnd={stopPreview}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div className="portfolio-modal fixed inset-0 z-[80] bg-black/82 p-3 backdrop-blur-xl md:grid md:place-items-center md:p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div key={selected.id} className="portfolio-dialog flex w-full flex-col overflow-hidden rounded-2xl border border-cyan/25 bg-panel shadow-glow md:mx-auto md:max-w-5xl" initial={{ scale: 0.92, y: 40 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.92, y: 40 }}>
              <div className="flex items-center justify-between border-b border-line bg-black/30 px-4 py-3 shrink-0">
                <div className="min-w-0">
                  <p className="text-xs uppercase tracking-[0.22em] text-cyan">{selected.category}</p>
                  <h3 className="font-display truncate text-xl font-bold text-white">{selected.title}</h3>
                </div>
                <button className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-line" onClick={() => setSelected(null)} aria-label="Close video">
                  <FiX />
                </button>
              </div>
              <div className="portfolio-player bg-black">
                <iframe key={selected.id} src={selected.embedSrc} className="h-full w-full" allow="autoplay; encrypted-media" allowFullScreen title={selected.title} />
              </div>
              <div className="portfolio-actions flex flex-wrap items-center justify-between gap-3 p-4 shrink-0">
                <span className="inline-flex items-center gap-2 text-sm text-slate-400">
                  <FiMaximize2 className="text-cyan" />
                  Local preview
                </span>
                <a href={selected.videoSrc} download className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-bold text-ink">
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
