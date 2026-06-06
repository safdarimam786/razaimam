import React from 'react';
import { motion } from 'framer-motion';
import { FiCheckCircle } from 'react-icons/fi';
import { SectionHeader } from '../components/SectionHeader.jsx';
import { workflow } from '../data/profile.js';

const stepVariants = {
  hidden: { opacity: 0, y: 40, filter: 'blur(8px)' },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { delay: i * 0.12, duration: 0.7, ease: 'easeOut' }
  })
};

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
              <motion.div
                key={step}
                className="workflow-step"
                custom={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
                variants={stepVariants}
                whileHover={{ y: -8, scale: 1.03, transition: { duration: 0.3 } }}
              >
                <motion.div
                  className="mx-auto mb-5 grid h-14 w-14 place-items-center rounded-xl border border-cyan/30 bg-cyan/10 text-cyan shadow-cyan"
                  whileHover={{ rotate: [0, -10, 10, -10, 0], transition: { duration: 0.5 } }}
                >
                  <FiCheckCircle />
                </motion.div>
                <p className="mb-2 text-xs uppercase tracking-[0.22em] text-slate-500">Keyframe {index + 1}</p>
                <h3 className="font-display text-lg font-bold text-white">{step}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
