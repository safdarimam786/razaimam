import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useScrollAnimations() {
  useEffect(() => {
    const cpuCount = navigator.hardwareConcurrency || 8;
    const isLowCpu = cpuCount <= 6;
    const connectionType = navigator.connection?.effectiveType || '';
    const isSlowConnection = /(2g|slow-2g|3g)/.test(connectionType);
    const memoryInfo = navigator.deviceMemory || 8;
    const isLowMemory = memoryInfo <= 4;

    if (isLowCpu || isSlowConnection || isLowMemory) {
      window.__RI_ANIMATIONS_DISABLED = true;
      return;
    }

    const context = gsap.context(() => {
      ScrollTrigger.matchMedia({
        '(max-width: 1023px), (pointer: coarse), (prefers-reduced-motion: reduce), (max-resolution: 2dppx)': () => {
          gsap.utils.toArray('[data-reveal]').forEach((element) => {
            gsap.fromTo(
              element,
              { autoAlpha: 0, y: 24 },
              {
                autoAlpha: 1,
                y: 0,
                duration: 0.6,
                ease: 'power2.out',
                scrollTrigger: {
                  trigger: element,
                  start: 'top 90%'
                }
              }
            );
          });
        },
        '(min-width: 1024px)': () => {
          const blurAmount = isLowCpu || isSlowConnection ? 3 : 6;

          gsap.utils.toArray('[data-reveal]').forEach((element) => {
            gsap.fromTo(
              element,
              { autoAlpha: 0, y: 48, filter: `blur(${blurAmount}px)` },
              {
                autoAlpha: 1,
                y: 0,
                filter: 'blur(0px)',
                duration: 0.9,
                ease: 'power2.out',
                scrollTrigger: {
                  trigger: element,
                  start: 'top 85%'
                }
              }
            );
          });

          gsap.utils.toArray('[data-parallax]').forEach((element) => {
            gsap.to(element, {
              yPercent: Number(element.dataset.parallax || -12),
              ease: 'none',
              scrollTrigger: {
                trigger: element,
                scrub: 1
              }
            });
          });

          gsap.to('.workflow-line', {
            scaleX: 1,
            transformOrigin: 'left center',
            ease: 'none',
            scrollTrigger: {
              trigger: '#workflow',
              start: 'top 65%',
              end: 'bottom 70%',
              scrub: 1.5
            }
          });
        }
      });
    });

    return () => {
      context.revert();
      ScrollTrigger.clearMatchMedia();
    };
  }, []);
}
