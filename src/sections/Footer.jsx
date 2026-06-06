import React from 'react';
import { motion } from 'framer-motion';
import { profile } from '../data/profile.js';

export function Footer() {
  return (
    <motion.footer
      className="border-t border-line bg-black/30 px-4 py-7"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-center text-xs uppercase tracking-[0.18em] text-slate-500 md:flex-row md:text-left">
        <motion.span initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1, duration: 0.5 }}>Raza Imam Edit Suite</motion.span>
        <motion.span initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2, duration: 0.5 }}>{profile.role}</motion.span>
        <motion.a
          href={`mailto:${profile.email}`}
          className="text-cyan"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
          whileHover={{ scale: 1.05, color: '#ffffff' }}
        >
          {profile.email}
        </motion.a>
      </div>
    </motion.footer>
  );
}
