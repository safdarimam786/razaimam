import React, { useEffect, useState } from 'react';

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const lenis = window.lenis;
    if (!lenis) return;

    const onScroll = (e) => {
      const limit = e.limit || document.documentElement.scrollHeight - window.innerHeight;
      setProgress(limit > 0 ? e.scroll / limit : 0);
    };

    lenis.on('scroll', onScroll);
    onScroll({ scroll: lenis.scroll, limit: lenis.limit });
    return () => lenis.off('scroll', onScroll);
  }, []);

  return (
    <div className="fixed left-0 top-0 z-50 h-1 w-full bg-white/5">
      <div className="h-full bg-gradient-to-r from-premiere via-after to-cyan" style={{ width: `${progress * 100}%` }} />
    </div>
  );
}
