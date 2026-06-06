import React, { useEffect, useRef } from 'react';

export function CursorGlow() {
  const ref = useRef(null);
  const frameRef = useRef(null);

  useEffect(() => {
    const move = (event) => {
      if (frameRef.current) return;
      frameRef.current = requestAnimationFrame(() => {
        frameRef.current = null;
        if (!ref.current) return;
        ref.current.style.transform = `translate3d(${event.clientX - 180}px, ${event.clientY - 180}px, 0)`;
      });
    };
    window.addEventListener('pointermove', move, { passive: true });
    return () => {
      window.removeEventListener('pointermove', move);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return <div ref={ref} className="pointer-events-none fixed left-0 top-0 z-30 hidden h-[360px] w-[360px] rounded-full bg-cyan/10 blur-3xl md:block" />;
}
