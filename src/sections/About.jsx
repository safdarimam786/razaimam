import React from 'react';
import { motion } from 'framer-motion';
import { FiMapPin, FiMonitor, FiUserCheck } from 'react-icons/fi';
import { Panel } from '../components/Panel.jsx';
import { SectionHeader } from '../components/SectionHeader.jsx';
import { profile, strengths } from '../data/profile.js';

export function About() {
  return (
    <section id="about" className="section-pad">
      <SectionHeader kicker="About Panel" title="Story-driven editing with studio precision">
        {profile.summary}
      </SectionHeader>
      <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-[1.15fr_.85fr]">
        <motion.div
          initial={{ opacity: 0, x: -60, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <Panel title="Editor Profile" className="p-5 md:p-7">
          <div className="grid gap-5 md:grid-cols-3">
            {[
              ['Experience', profile.experience.duration, profile.experience.period],
              ['Location', 'Ghaziabad', 'Uttar Pradesh'],
              ['Focus', 'Reels + Motion', 'Cinematic Content']
            ].map(([label, value, sub]) => (
              <div key={label} className="rounded-xl border border-line bg-black/25 p-5">
                <p className="mb-3 text-xs uppercase tracking-[0.22em] text-cyan">{label}</p>
                <h3 className="font-display text-2xl font-bold text-white">{value}</h3>
                <p className="mt-2 text-sm text-slate-400">{sub}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 rounded-xl border border-line bg-white/[0.035] p-5">
            <div className="mb-4 flex items-center gap-3 text-sm uppercase tracking-[0.2em] text-slate-300">
              <FiMonitor className="text-cyan" />
              {profile.experience.title} | {profile.experience.company}
            </div>
            <p className="text-sm leading-7 text-slate-300">
              Built client-focused edits across social content, talking-head formats, cinematic edits, motion graphics, color correction, audio syncing, rendering, and export workflows.
            </p>
          </div>
        </Panel>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 60, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.15 }}
        >
          <Panel title="Creative Strengths" className="p-5 md:p-7">
          <div className="mb-6 flex items-center gap-3 rounded-xl border border-line bg-cyan/10 p-4 text-cyan">
            <FiMapPin />
            <span className="text-sm">{profile.location}</span>
          </div>
          <div className="space-y-3">
            {strengths.map((strength, index) => (
              <div key={strength} className="group flex items-center gap-3 rounded-xl border border-line bg-white/[0.035] p-4 transition hover:border-cyan/40 hover:bg-cyan/10">
                <span className="grid h-9 w-9 place-items-center rounded-lg bg-white/10 font-display text-sm text-white">{index + 1}</span>
                <FiUserCheck className="text-premiere" />
                <span className="text-sm font-semibold text-slate-200">{strength}</span>
              </div>
            ))}
          </div>
        </Panel>
        </motion.div>
      </div>
    </section>
  );
}
