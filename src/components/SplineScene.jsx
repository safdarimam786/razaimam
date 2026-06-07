import React, { useEffect, useState } from 'react';
import { FiFilm } from 'react-icons/fi';

export function SplineScene() {
  const [highPerf, setHighPerf] = useState(true);

  useEffect(() => {
    const perf = window.__RI_PERF || {};
    setHighPerf(Boolean(perf.highPerf));
  }, []);

  if (!highPerf) {
    return (
      <div className="relative h-full min-h-[240px] overflow-hidden rounded-xl border border-line bg-black/20 flex items-center justify-center">
        <div className="text-center p-6">
          <div className="mb-3 inline-flex items-center justify-center rounded-md bg-white/[0.04] p-3">
            <FiFilm className="text-cyan" />
          </div>
          <div className="text-sm text-slate-300">Video model preview</div>
        </div>
      </div>
    );
  }

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
      <div className="absolute left-2 top-2 flex items-center gap-1.5 rounded-lg border border-line bg-ink/70 px-2 py-1 text-[0.55rem] uppercase tracking-[0.18em] text-slate-300 backdrop-blur">
        <FiFilm className="text-cyan" size={10} />
        Video Model
      </div>
      <div className="absolute right-2 top-2 flex items-center gap-1 rounded-lg border border-line bg-black/50 px-2 py-1 text-[0.5rem] uppercase tracking-[0.16em] text-cyan/70 backdrop-blur">
        <span className="inline-block h-1 w-1 rounded-full bg-emerald-400" />
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
