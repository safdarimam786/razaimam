import React from 'react';
import { FiFilm } from 'react-icons/fi';

export function SplineScene() {
  return (
    <div className="relative h-full min-h-[320px] overflow-hidden rounded-xl border border-line bg-black/30">
      <div className="editing-orb-scene" aria-hidden="true">
        <div className="editing-orb">
          <span className="orb-ring ring-one" />
          <span className="orb-ring ring-two" />
          <span className="orb-ring ring-three" />
          <span className="orb-core" />
        </div>
        <div className="floating-window window-a">
          <span />
          <span />
          <span />
        </div>
        <div className="floating-window window-b">
          <span />
          <span />
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0 bg-radial-mask" />
      <div className="absolute left-4 top-4 flex items-center gap-2 rounded-lg border border-line bg-ink/70 px-3 py-2 text-xs uppercase tracking-[0.18em] text-slate-300 backdrop-blur">
        <FiFilm className="text-cyan" />
        Motion Object
      </div>
      <div className="absolute bottom-4 left-4 right-4 grid grid-cols-5 gap-1">
        {Array.from({ length: 15 }).map((_, index) => (
          <span key={index} className="h-2 rounded-sm bg-cyan/30" style={{ opacity: 0.25 + (index % 5) * 0.13 }} />
        ))}
      </div>
    </div>
  );
}
