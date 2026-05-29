import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

export function useLenis() {
  const rafRef = useRef(null);

  useEffect(() => {
    const isLowDevice = window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      navigator.hardwareConcurrency <= 4;

    const lenis = new Lenis({
      duration: isLowDevice ? 1.8 : 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      smoothTouch: true,
      wheelMultiplier: isLowDevice ? 0.4 : 1,
      touchMultiplier: isLowDevice ? 0.4 : 1.2,
      lerp: 0.1,
      syncTouch: true,
      syncTouchLerp: isLowDevice ? 0.08 : 0.075,
      infinite: false,
    });

    window.lenis = lenis;

    function raf(time) {
      lenis.raf(time);
      rafRef.current = requestAnimationFrame(raf);
    }
    rafRef.current = requestAnimationFrame(raf);

    const handleResize = () => lenis.resize();
    window.addEventListener('resize', handleResize);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', handleResize);
      window.lenis = null;
      lenis.destroy();
    };
  }, []);
}
