import React from 'react';
import { motion } from 'framer-motion';
import { SectionHeader } from '../components/SectionHeader.jsx';
import { services } from '../data/profile.js';

export function Services() {
  return (
    <section id="services" className="section-pad">
      <SectionHeader kicker="Tool Panels" title="Editing services built for modern content" />
      <div className="mx-auto grid max-w-7xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {services.map(({ title, icon: Icon }, index) => (
          <motion.div
            key={title}
            className="service-card"
            data-reveal
            whileHover={{ y: -8, rotateX: 4, rotateY: -4 }}
            transition={{ type: 'spring', stiffness: 220, damping: 18 }}
          >
            <div className="mb-7 flex items-center justify-between">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-cyan/10 text-2xl text-cyan">
                <Icon />
              </span>
              <span className="text-xs uppercase tracking-[0.22em] text-slate-500">FX {String(index + 1).padStart(2, '0')}</span>
            </div>
            <h3 className="font-display text-xl font-bold text-white">{title}</h3>
            <div className="mt-7 grid grid-cols-8 gap-1">
              {Array.from({ length: 8 }).map((_, meter) => (
                <span key={meter} className="h-1 rounded-full bg-gradient-to-r from-premiere to-cyan" style={{ opacity: 0.2 + meter * 0.08 }} />
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
