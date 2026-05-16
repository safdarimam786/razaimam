import React from 'react';

export function Panel({ children, className = '', title, actions = true, ...props }) {
  return (
    <div className={`panel-shell ${className}`} {...props}>
      {(title || actions) && (
        <div className="panel-titlebar">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
          </div>
          {title && <span className="text-[10px] uppercase tracking-[0.22em] text-slate-400">{title}</span>}
        </div>
      )}
      {children}
    </div>
  );
}
