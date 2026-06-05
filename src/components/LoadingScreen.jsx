import React from 'react';
import { motion } from 'framer-motion';

export function LoadingScreen() {
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#050612]"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
    >
      <div className="absolute inset-0 bg-grid bg-[length:42px_42px] opacity-30" />
      <div className="absolute inset-x-0 top-1/2 h-40 -translate-y-1/2 bg-gradient-to-r from-transparent via-premiere/20 to-transparent blur-3xl" />
      <div className="relative w-[min(86vw,560px)]">
        <motion.div
          className="loader-mark mx-auto mb-8 grid h-24 w-24 place-items-center rounded-[26px] border border-cyan/30 bg-white/[0.06] shadow-glow backdrop-blur-2xl"
          initial={{ scale: 0.8, rotate: -10, opacity: 0 }}
          animate={{ scale: 1, rotate: 0, opacity: 1 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
        >
          <span className="loader-orbit orbit-a" />
          <span className="loader-orbit orbit-b" />
          <span className="font-display text-3xl font-black text-white">RI</span>
        </motion.div>
        <div className="mb-4 flex items-center justify-between text-[11px] uppercase tracking-[0.25em] text-slate-400">
          <span>Starting edit suite</span>
          <span>100%</span>
        </div>
        <div className="loader-track relative h-14 overflow-hidden rounded-lg border border-line bg-black/40">
          <motion.div
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-premiere via-after to-cyan"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
          />
          <div className="absolute inset-0 grid grid-cols-12 gap-px p-1">
            {Array.from({ length: 12 }).map((_, index) => (
              <motion.span
                key={index}
                className="rounded bg-black/45"
                animate={{ opacity: [0.25, 0.8, 0.25] }}
                transition={{ duration: 1.2, repeat: Infinity, delay: index * 0.04 }}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
