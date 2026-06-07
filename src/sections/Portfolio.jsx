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

function HoverVideo({ videoSrc, className, onDuration, supportsHover }) {
  const [error, setError] = useState(false);
  const [activeSrc, setActiveSrc] = useState('');
  const videoRef = useRef(null);
  const hoveringRef = useRef(false);
  const onDurationRef = useRef(onDuration);
  onDurationRef.current = onDuration;

  useEffect(() => {
    const el = videoRef.current;
    if (!el || !activeSrc) return;
    setError(false);

    const handleError = () => setError(true);
    const handleLoadedMeta = () => {
      if (onDurationRef.current) onDurationRef.current(el.duration);
    };

    el.addEventListener('loadedmetadata', handleLoadedMeta);
    el.addEventListener('error', handleError);

    if (el.readyState >= 1) handleLoadedMeta();

    return () => {
      el.removeEventListener('loadedmetadata', handleLoadedMeta);
      el.removeEventListener('error', handleError);
    };
  }, [activeSrc]);

  const handleMouseEnter = () => {
    if (!supportsHover) return;
    hoveringRef.current = true;
    if (!activeSrc) setActiveSrc(videoSrc);
    const el = videoRef.current;
    if (el && el.readyState >= 3) el.play().catch(() => {});
  };

  const handleMouseLeave = () => {
    hoveringRef.current = false;
    const el = videoRef.current;
    if (el) {
      try { el.pause(); } catch {}
      try { el.currentTime = 0.1; } catch {}
    }
  };

  const shouldShowVideo = supportsHover && activeSrc && !error;

  return (
    <div className="hover-video-wrap" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {shouldShowVideo ? (
        <video
          ref={videoRef}
          src={activeSrc}
          muted
          loop
          playsInline
          preload="none"
          className={className}
          onCanPlay={() => {
            if (hoveringRef.current && videoRef.current) {
              videoRef.current.play().catch(() => {});
            }
          }}
        />
      ) : (
        <div className="bento-media-fallback"><FiFilm /></div>
      )}
    </div>
  );
}

function BentoPreview({ item, onOpen, onDuration, supportsHover, disableAnimations }) {
  if (!item) return null;

  const content = (
    <>
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
        <HoverVideo
          videoSrc={item.videoSrc}
          className="bento-preview-img"
          onDuration={(d) => onDuration(item.id, d)}
          supportsHover={supportsHover}
        />
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
    </>
  );

  if (disableAnimations) {
    return <div className="bento-preview">{content}</div>;
  }

  return (
    <motion.div
      className="bento-preview"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      {content}
    </motion.div>
  );
}

function BentoClip({ item, index, onOpen, onDuration, supportsHover, disableAnimations }) {
  const [hovering, setHovering] = useState(false);

  const inner = (
    <>
      <div className="bento-clip-track">
        <span className="bento-track-num">V{index + 1}</span>
      </div>
      <div className="bento-clip-media">
        <HoverVideo
          videoSrc={item.videoSrc}
          className="bento-clip-img"
          onDuration={(d) => onDuration(item.id, d)}
          supportsHover={supportsHover}
        />
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
    </>
  );

  if (disableAnimations) {
    return (
      <div
        className={`bento-clip ${item.color}`}
        onClick={() => onOpen(item)}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
      >
        {inner}
      </div>
    );
  }

  return (
    <motion.div
      layout
      className={`bento-clip ${item.color}`}
      onClick={() => onOpen(item)}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      whileHover={supportsHover ? { scale: 1.02, y: -4, z: 10 } : undefined}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
    >
      {inner}
    </motion.div>
  );
}

export function Portfolio() {
  const [active, setActive] = useState('All');
  const [durations, setDurations] = useState({});
  const [supportsHover, setSupportsHover] = useState(false);
  const [disableAnimations, setDisableAnimations] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(hover: hover) and (pointer: fine)');
    const updateHoverSupport = () => setSupportsHover(media.matches);

    updateHoverSupport();
    if (media.addEventListener) {
      media.addEventListener('change', updateHoverSupport);
    } else {
      media.addListener(updateHoverSupport);
    }

    return () => {
      if (media.removeEventListener) {
        media.removeEventListener('change', updateHoverSupport);
      } else {
        media.removeListener(updateHoverSupport);
      }
    };
  }, []);

  useEffect(() => {
    const perf = window.__RI_PERF || {};
    setDisableAnimations(Boolean(perf.disableAnimations));
  }, []);

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
          <BentoPreview
            item={portfolioWithDuration[0]}
            onOpen={openVideo}
            onDuration={handleDuration}
            supportsHover={supportsHover}
            disableAnimations={disableAnimations}
          />

          <div className="bento-grid-inner">
            {portfolioWithDuration.slice(1).map((item, index) => (
              <BentoClip
                key={item.id}
                item={item}
                index={index + 1}
                onOpen={openVideo}
                onDuration={handleDuration}
                supportsHover={supportsHover}
                disableAnimations={disableAnimations}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
