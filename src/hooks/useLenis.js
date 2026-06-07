import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function useLenis() {
  const rafRef = useRef(null);

  useEffect(() => {
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const cpuCount = navigator.hardwareConcurrency || 8;
    const isLowCpu = cpuCount <= 6;
    const isTouchDevice =
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia('(pointer: coarse)').matches;
    const connectionType = navigator.connection?.effectiveType || '';
    const isSlowConnection = /(2g|slow-2g|3g)/.test(connectionType);
    const memoryInfo = navigator.deviceMemory || 8;
    const isLowMemory = memoryInfo <= 4;
    const shouldUseNativeScroll = isReducedMotion || isLowCpu || isTouchDevice || isSlowConnection || isLowMemory;

    if (shouldUseNativeScroll) {
      window.lenis = null;
      return;
    }

    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => {
        // Smooth cubic easing for butter-smooth feel
        if (t < 0.5) {
          return 2 * t * t * t;
        } else {
          return 1 - Math.pow(-2 * t + 2, 3) / 2;
        }
      },
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      smoothTouch: true,
      wheelMultiplier: 1.0,
      touchMultiplier: isTouchDevice ? 1.0 : 0.8,
      lerp: 0.035,
      syncTouch: true,
      syncTouchLerp: 0.06,
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
