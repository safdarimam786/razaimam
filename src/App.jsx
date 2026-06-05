import React, { useEffect, useState, Suspense, lazy } from 'react';
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

const Portfolio = lazy(() => import('./sections/Portfolio.jsx'));

const backgroundVideo =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260508_064122_c4750c0e-7476-4b44-94a2-a85a65c63bf2.mp4';

export default function App() {
  const [loading, setLoading] = useState(true);
  useLenis();
  useScrollAnimations();

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 1500);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#0c0c0c] text-white selection:bg-cyan/30">
      <div className="pointer-events-none fixed inset-0 z-0">
        <video
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
