import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function useLenis() {
  const rafRef = useRef(null);

  useEffect(() => {
    const isLowDevice = window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      navigator.hardwareConcurrency <= 4;

    const lenis = new Lenis({
      duration: isLowDevice ? 2.0 : 1.6,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      smoothTouch: true,
      wheelMultiplier: isLowDevice ? 0.5 : 0.8,
      touchMultiplier: isLowDevice ? 0.5 : 1,
      lerp: isLowDevice ? 0.08 : 0.05,
      syncTouch: true,
      syncTouchLerp: isLowDevice ? 0.08 : 0.05,
      infinite: false,
    });

    window.lenis = lenis;
    lenis.on('scroll', ScrollTrigger.update);

    function raf(time) {
      lenis.raf(time);
      rafRef.current = requestAnimationFrame(raf);
    }
    rafRef.current = requestAnimationFrame(raf);

    const handleResize = () => {
      lenis.resize();
      ScrollTrigger.refresh();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', handleResize);
      window.lenis = null;
      lenis.destroy();
    };
  }, []);
}
