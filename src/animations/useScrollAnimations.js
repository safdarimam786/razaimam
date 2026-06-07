import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useScrollAnimations() {
  useEffect(() => {
    const isLowDevice = navigator.hardwareConcurrency <= 4;
    const blurAmount = isLowDevice ? 4 : 6;

    const context = gsap.context(() => {
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
    });

    return () => context.revert();
  }, []);
}
