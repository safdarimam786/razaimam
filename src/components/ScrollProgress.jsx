import React, { useEffect, useRef } from 'react';

export function ScrollProgress() {
  const barRef = useRef(null);

  useEffect(() => {
    const lenis = window.lenis;
    if (!lenis) return;

    let current = 0;
    let target = 0;
    let rafId;

    const onScroll = (e) => {
      const limit = e.limit || document.documentElement.scrollHeight - window.innerHeight;
      target = limit > 0 ? e.scroll / limit : 0;
    };

    const animate = () => {
      current += (target - current) * 0.15;
      if (barRef.current) {
        barRef.current.style.transform = `translateX(${(current - 1) * 100}%)`;
      }
      if (Math.abs(current - target) > 0.0001) {
        rafId = requestAnimationFrame(animate);
      }
    };

    const onScrollEnd = () => {
      if (rafId) cancelAnimationFrame(rafId);
      current = target;
      if (barRef.current) {
        barRef.current.style.transform = `translateX(${(target - 1) * 100}%)`;
      }
    };

    lenis.on('scroll', onScroll);
    lenis.on('scroll', () => {
      if (!rafId) rafId = requestAnimationFrame(animate);
    });
    onScroll({ scroll: lenis.scroll, limit: lenis.limit });

    return () => {
      lenis.off('scroll', onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className="fixed left-0 top-0 z-50 h-1 w-full bg-white/5">
      <div
        ref={barRef}
        className="h-full w-full origin-left bg-gradient-to-r from-premiere via-after to-cyan"
        style={{ transform: 'translateX(-100%)' }}
      />
    </div>
  );
}
