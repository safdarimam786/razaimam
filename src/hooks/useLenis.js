import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function useLenis() {
  const rafRef = useRef(null);

  useEffect(() => {
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isLowCpu = navigator.hardwareConcurrency ? navigator.hardwareConcurrency <= 4 : false;
    const isTouchDevice =
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia('(pointer: coarse)').matches;
    const connectionType = navigator.connection?.effectiveType || '';
    const isSlowConnection = /(2g|slow-2g|3g)/.test(connectionType);
    const shouldUseNativeScroll = isReducedMotion || isLowCpu || isTouchDevice || isSlowConnection;

    if (shouldUseNativeScroll) {
      window.lenis = null;
      return;
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      smoothTouch: true,
      wheelMultiplier: 1.0,
      touchMultiplier: isTouchDevice ? 1.0 : 0.8,
      lerp: 0.04,
      syncTouch: true,
      syncTouchLerp: 0.05,
      infinite: false,
    });

    window.lenis = lenis;
    lenis.on('scroll', ScrollTrigger.update);

    function raf(time) {
      lenis.raf(time);
      rafRef.current = requestAnimationFrame(raf);
    }
    rafRef.current = requestAnimationFrame(raf);

    let resizeTimer;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        lenis.resize();
        ScrollTrigger.refresh();
      }, 150);
    };
    window.addEventListener('resize', handleResize);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleMotionChange = () => {
      lenis.destroy();
      ScrollTrigger.refresh();
      window.lenis = null;
    };
    prefersReducedMotion.addEventListener('change', handleMotionChange);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      clearTimeout(resizeTimer);
      window.removeEventListener('resize', handleResize);
      prefersReducedMotion.removeEventListener('change', handleMotionChange);
      window.lenis = null;
      lenis.destroy();
    };
  }, []);
}
