import React from 'react';

export function SectionHeader({ kicker, title, children }) {
  return (
    <div className="mx-auto mb-10 max-w-3xl text-center md:mb-14" data-reveal>
      <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-line bg-white/[0.04] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.26em] text-cyan">
        <span className="h-1.5 w-1.5 rounded-full bg-cyan shadow-cyan" />
        {kicker}
      </div>
      <h2 className="font-display text-3xl font-bold text-white md:text-5xl">{title}</h2>
      {children && <p className="mt-4 text-sm leading-7 text-slate-300 md:text-base">{children}</p>}
    </div>
  );
}
