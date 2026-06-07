import React, { useEffect, useRef } from 'react';

export function ScrollProgress() {
  const barRef = useRef(null);

  useEffect(() => {
    const lenis = window.lenis;
    let current = 0;
    let target = 0;
    let rafId;

    const updateTransform = () => {
      if (barRef.current) {
        barRef.current.style.transform = `translateX(${(current - 1) * 100}%)`;
      }
    };

    const animate = () => {
      current += (target - current) * 0.18;
      updateTransform();
      if (Math.abs(current - target) > 0.0001) {
        rafId = requestAnimationFrame(animate);
      }
    };

    const onScrollEvent = (scroll, limit) => {
      target = limit > 0 ? scroll / limit : 0;
      if (!rafId) rafId = requestAnimationFrame(animate);
    };

    const handleLenisScroll = (e) => {
      const limit = e.limit || document.documentElement.scrollHeight - window.innerHeight;
      onScrollEvent(e.scroll, limit);
    };

    const handleNativeScroll = () => {
      const limit = document.documentElement.scrollHeight - window.innerHeight;
      onScrollEvent(window.scrollY, limit);
    };

    if (lenis) {
      lenis.on('scroll', handleLenisScroll);
      handleLenisScroll({ scroll: lenis.scroll, limit: lenis.limit });
    } else {
      window.addEventListener('scroll', handleNativeScroll, { passive: true });
      handleNativeScroll();
    }

    return () => {
      if (lenis) {
        lenis.off('scroll', handleLenisScroll);
      } else {
        window.removeEventListener('scroll', handleNativeScroll);
      }
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
