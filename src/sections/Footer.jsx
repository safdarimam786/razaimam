import React from 'react';
import { profile } from '../data/profile.js';

export function Footer() {
  return (
    <footer className="border-t border-line bg-black/30 px-4 py-7">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-center text-xs uppercase tracking-[0.18em] text-slate-500 md:flex-row md:text-left">
        <span>Raza Imam Edit Suite</span>
        <span>{profile.role}</span>
        <a href={`mailto:${profile.email}`} className="text-cyan">{profile.email}</a>
      </div>
    </footer>
  );
}
