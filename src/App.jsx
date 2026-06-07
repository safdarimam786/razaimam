import React, { useEffect, useRef, useState, Suspense, lazy } from 'react';
import { AnimatePresence } from 'framer-motion';
import { About } from './sections/About.jsx';
import { Contact } from './sections/Contact.jsx';
import { Footer } from './sections/Footer.jsx';
import { Hero } from './sections/Hero.jsx';
import { ErrorBoundary } from './components/ErrorBoundary.jsx';
import { Services } from './sections/Services.jsx';
import { Skills } from './sections/Skills.jsx';
import { Workflow } from './sections/Workflow.jsx';
import { LoadingScreen } from './components/LoadingScreen.jsx';
import { CursorGlow } from './components/CursorGlow.jsx';
import { Navigation } from './components/Navigation.jsx';
import { ScrollProgress } from './components/ScrollProgress.jsx';
import { useLenis } from './hooks/useLenis.js';
import { useScrollAnimations } from './animations/useScrollAnimations.js';

const Portfolio = lazy(() => import('./sections/Portfolio.jsx').then(m => ({ default: m.Portfolio })));

const backgroundVideo =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260508_064122_c4750c0e-7476-4b44-94a2-a85a65c63bf2.mp4';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [enableVideoBackground, setEnableVideoBackground] = useState(false);
  const videoRef = useRef(null);
  useLenis();
  useScrollAnimations();

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 600);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const cpuCount = navigator.hardwareConcurrency || 8;
    const isLowCpu = cpuCount <= 6;
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0 || window.matchMedia('(pointer: coarse)').matches;
    const connectionType = navigator.connection?.effectiveType || '';
    const isSlowConnection = /(2g|slow-2g|3g)/.test(connectionType);
    const memoryInfo = navigator.deviceMemory || 8;
    const isLowMemory = memoryInfo <= 4;
    const shouldUseVideo = !prefersReducedMotion && !isLowCpu && !isTouchDevice && !isSlowConnection && !isLowMemory && window.innerWidth >= 1024;

    setEnableVideoBackground(shouldUseVideo);
  }, []);

  useEffect(() => {
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const cpuCount = navigator.hardwareConcurrency || 8;
    const isLowCpu = cpuCount <= 6;
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0 || window.matchMedia('(pointer: coarse)').matches;
    const connectionType = navigator.connection?.effectiveType || '';
    const isSlowConnection = /(2g|slow-2g|3g)/.test(connectionType);
    const memoryInfo = navigator.deviceMemory || 8;
    const isLowMemory = memoryInfo <= 4;
    const supportsHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    const highPerf = !isReducedMotion && !isLowCpu && !isTouchDevice && !isSlowConnection && !isLowMemory;
    const disableAnimations = isReducedMotion || isLowCpu || isSlowConnection || isLowMemory;

    window.__RI_PERF = { highPerf, supportsHover, disableAnimations };
  }, [enableVideoBackground]);

  useEffect(() => {
    if (!enableVideoBackground) return;

    const video = videoRef.current;
    if (!video) return;

    const hero = document.getElementById('hero');
    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0 }
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, [enableVideoBackground]);

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#0c0c0c] text-white selection:bg-cyan/30">
      <div className="pointer-events-none fixed inset-0 z-0">
        {enableVideoBackground ? (
          <video
            ref={videoRef}
            className="pointer-events-none h-full w-full object-cover"
            autoPlay
            loop
            muted
            playsInline
            aria-hidden="true"
            preload="metadata"
          >
            <source src={backgroundVideo} type="video/mp4" />
          </video>
        ) : (
          <div
            className="absolute inset-0"
            aria-hidden="true"
            style={{
              background:
                'radial-gradient(circle at 20% 0%, rgba(155, 92, 255, 0.22), transparent 34rem), radial-gradient(circle at 78% 12%, rgba(36, 232, 255, 0.16), transparent 32rem), #06070d'
            }}
          />
        )}
        <div className="absolute inset-0 bg-[#05060d]/75" />
      </div>
      <CursorGlow />
      <ScrollProgress />
      <AnimatePresence mode="wait">{loading && <LoadingScreen />}</AnimatePresence>
      <div className="relative z-10">
        <Navigation />
        <Hero />
        <About />
        <Skills />
        <ErrorBoundary><Suspense fallback={<div className="section-pad text-center text-slate-500">Loading timeline...</div>}><Portfolio /></Suspense></ErrorBoundary>
        <Services />
        <Workflow />
        <Contact />
        <Footer />
      </div>
    </main>
  );
}
