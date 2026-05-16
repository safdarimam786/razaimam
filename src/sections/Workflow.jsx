import React from 'react';
import { FiCheckCircle } from 'react-icons/fi';
import { SectionHeader } from '../components/SectionHeader.jsx';
import { workflow } from '../data/profile.js';

export function Workflow() {
  return (
    <section id="workflow" className="section-pad">
      <SectionHeader kicker="Keyframe Flow" title="From rough idea to final export" />
      <div className="mx-auto max-w-7xl" data-reveal>
        <div className="relative overflow-hidden rounded-2xl border border-line bg-panel/70 p-5 md:p-8">
          <div className="absolute left-8 right-8 top-1/2 hidden h-px bg-white/10 md:block" />
          <div className="workflow-line absolute left-8 right-8 top-1/2 hidden h-px scale-x-0 bg-gradient-to-r from-premiere via-after to-cyan md:block" />
          <div className="relative grid gap-4 md:grid-cols-5">
            {workflow.map((step, index) => (
              <div key={step} className="workflow-step">
                <div className="mx-auto mb-5 grid h-14 w-14 place-items-center rounded-xl border border-cyan/30 bg-cyan/10 text-cyan shadow-cyan">
                  <FiCheckCircle />
                </div>
                <p className="mb-2 text-xs uppercase tracking-[0.22em] text-slate-500">Keyframe {index + 1}</p>
                <h3 className="font-display text-lg font-bold text-white">{step}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
