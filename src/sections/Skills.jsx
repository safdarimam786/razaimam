import React from 'react';
import { FiChevronDown } from 'react-icons/fi';
import { Panel } from '../components/Panel.jsx';
import { SectionHeader } from '../components/SectionHeader.jsx';
import { skills } from '../data/profile.js';

export function Skills() {
  return (
    <section id="skills" className="section-pad relative">
      <SectionHeader kicker="Effect Controls" title="Tools, effects, and edit muscle" />
      <div className="mx-auto grid max-w-7xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {skills.map(([skill, value], index) => (
          <Panel key={skill} title={`Layer ${String(index + 1).padStart(2, '0')}`} className="skill-card p-4" data-reveal>
            <div className="mb-5 flex items-start justify-between gap-3">
              <h3 className="font-display text-lg font-bold text-white">{skill}</h3>
              <FiChevronDown className="mt-1 text-cyan transition group-hover:rotate-180" />
            </div>
            <div className="mb-3 flex items-center justify-between text-xs uppercase tracking-[0.18em] text-slate-400">
              <span>Intensity</span>
              <span>{value}%</span>
            </div>
            <div className="relative h-3 overflow-hidden rounded-full bg-black/50">
              <span className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-premiere via-after to-cyan" style={{ width: `${value}%` }} />
              <span className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0_12px,rgba(0,0,0,.35)_12px_14px)] bg-[length:18px_100%]" />
            </div>
          </Panel>
        ))}
      </div>
    </section>
  );
}
