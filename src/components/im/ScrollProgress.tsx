"use client";

import { useEffect, useRef, useState } from "react";

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setProgress(Math.min(scrollPercent, 100));
    };

    const handleScroll = () => {
      if (rafId.current !== null) return;
      rafId.current = requestAnimationFrame(() => {
        updateProgress();
        rafId.current = null;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    updateProgress();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] h-[3px] bg-transparent">
      <div
        className="h-full bg-brand-gold transition-[width] duration-100 ease-linear"
        style={{
          width: `${progress}%`,
          boxShadow:
            progress > 0
              ? "0 0 8px rgba(198, 168, 75, 0.5), 0 0 16px rgba(198, 168, 75, 0.2)"
              : "none",
        }}
      />
    </div>
  );
}
