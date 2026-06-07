import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FiActivity, FiCpu, FiPlay, FiScissors } from 'react-icons/fi';
import { Panel } from '../components/Panel.jsx';
import { profile } from '../data/profile.js';

const layers = ['Color Grade', 'Sound Design', 'Motion Text', 'Story Cut'];

const softwareStack = [
  { name: 'CapCut', file: '/software/capcut.png', meta: 'Fast social edits' },
  { name: 'Premiere Pro', file: '/software/premiere-pro.png', meta: 'Timeline editing' },
  { name: 'After Effects', file: '/software/after-effects.png', meta: 'Motion graphics' }
];

export function Hero() {
  const [highPerf, setHighPerf] = useState(true);

  useEffect(() => {
    const perf = window.__RI_PERF || {};
    setHighPerf(Boolean(perf.highPerf));
  }, []);

  return (
    <section id="hero" className="relative min-h-screen overflow-hidden px-4 pb-20 pt-32 md:pt-36">
      <div className="absolute inset-0 bg-grid bg-[length:64px_64px] opacity-35" />
      <div className="absolute left-1/2 top-16 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-premiere/20 blur-[110px]" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-8 lg:grid-cols-[1.03fr_.97fr]">
        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.7 }}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-line bg-white/[0.05] px-3 py-2 text-xs uppercase tracking-[0.22em] text-cyan backdrop-blur"
          >
            <FiActivity />
            Premiere x After Effects Workspace
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75, duration: 0.8, ease: 'easeOut' }}
            className="split-title font-display text-[clamp(3.6rem,11vw,10rem)] font-black uppercase leading-[0.82] text-white"
          >
            Raza
            <span className="block bg-gradient-to-r from-white via-cyan to-premiere bg-clip-text text-transparent">Imam</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.7 }}
            className="mt-7 max-w-2xl text-base leading-8 text-slate-300 md:text-xl"
          >
            {profile.role}. Cinematic edits, reels, motion graphics, color grading, and story-first social content from Ghaziabad.
          </motion.p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#portfolio" className="magnetic group inline-flex items-center gap-3 rounded-xl bg-white px-5 py-3 text-sm font-bold uppercase tracking-[0.16em] text-ink">
              <FiPlay className="transition group-hover:scale-125" />
              View Timeline
            </a>
            <a href="#contact" className="magnetic inline-flex items-center gap-3 rounded-xl border border-cyan/30 bg-cyan/10 px-5 py-3 text-sm font-bold uppercase tracking-[0.16em] text-cyan">
              <FiScissors />
              Start Project
            </a>
          </div>
          <motion.div
            className="software-dock mt-8"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.75, ease: 'easeOut' }}
          >
            {softwareStack.map((tool, index) => (
              <motion.div
                key={tool.name}
                className="software-tile"
                whileHover={{ y: -8, rotateX: 6, rotateY: index === 1 ? 0 : index === 0 ? -5 : 5, scale: 1.04 }}
                transition={{ type: 'spring', stiffness: 260, damping: 18 }}
              >
                <picture>
                  <source srcSet={`${tool.file.replace('.png', '.webp')} 1x, ${tool.file.replace('.png', '@2x.webp')} 2x`} type="image/webp" />
                  <img src={tool.file} alt={`${tool.name} neon 3D icon`} loading="eager" decoding="async" />
                </picture>
                <div>
                  <strong>{tool.name}</strong>
                  <span>{tool.meta}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <div className="relative z-10 grid gap-4 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1" {...(highPerf ? { 'data-parallax': '-7' } : {})}>
          <div className="hero-panels-right grid gap-4">
            <Panel title="Effect Controls" className="p-4">
              <div className="mb-5 flex items-center justify-between">
                <span className="text-xs uppercase tracking-[0.2em] text-slate-400">Layer Stack</span>
                <FiCpu className="text-cyan" />
              </div>
              <div className="space-y-3">
                {layers.map((layer, index) => (
                  <motion.div
                    key={layer}
                    className="rounded-lg border border-line bg-white/[0.04] p-3"
                    animate={{ x: [0, index % 2 ? 4 : -4, 0] }}
                    transition={{ duration: 4 + index, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <div className="mb-2 flex items-center justify-between text-xs text-slate-300">
                      <span>{layer}</span>
                      <span>{88 + index * 3}%</span>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                      <span className="block h-full rounded-full bg-gradient-to-r from-premiere to-cyan" style={{ width: `${74 + index * 5}%` }} />
                    </div>
                  </motion.div>
                ))}
              </div>
            </Panel>
            <Panel title="Timeline Scrubber" className="p-4">
              <div className="relative h-28 overflow-hidden rounded-lg bg-black/35 p-3">
                <span className="absolute bottom-2 top-2 left-[38%] w-px bg-amber shadow-[0_0_22px_rgba(247,185,85,.8)]" />
                {[0, 1, 2].map((row) => (
                  <div key={row} className="mb-2 grid grid-cols-8 gap-1">
                    {Array.from({ length: 8 }).map((_, index) => (
                      <span key={index} className={`h-6 rounded ${index % 3 === row ? 'bg-premiere/60' : 'bg-after/35'}`} />
                    ))}
                  </div>
                ))}
              </div>
            </Panel>
          </div>
        </div>
      </div>
    </section>
  );
}

