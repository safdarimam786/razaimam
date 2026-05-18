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
        <div className="model-crosshair">
          <div className="model-crosshair-x" />
          <div className="model-crosshair-y" />
          <div className="model-crosshair-dot" />
        </div>
        <div className="model-rig" />
        <div className="model-slider-track">
          <div className="model-slider-thumb" />
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0 bg-radial-mask" />
      <div className="absolute left-4 top-4 flex items-center gap-2 rounded-lg border border-line bg-ink/70 px-3 py-2 text-xs uppercase tracking-[0.18em] text-slate-300 backdrop-blur">
        <FiFilm className="text-cyan" />
        Video Model
      </div>
      <div className="absolute right-4 top-4 flex items-center gap-1.5 rounded-lg border border-line bg-black/50 px-3 py-2 text-[0.55rem] uppercase tracking-[0.18em] text-cyan/70 backdrop-blur">
        <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />
        Live
      </div>
      <div className="absolute bottom-4 left-4 right-4 grid grid-cols-8 gap-1">
        {Array.from({ length: 24 }).map((_, index) => (
          <span
            key={index}
            className="h-1.5 rounded-sm"
            style={{
              background: index % 3 === 0
                ? 'rgba(36, 232, 255, 0.5)'
                : index % 3 === 1
                  ? 'rgba(155, 92, 255, 0.4)'
                  : 'rgba(247, 185, 85, 0.35)',
              opacity: 0.3 + (index % 6) * 0.1,
            }}
          />
        ))}
      </div>
    </div>
  );
}
