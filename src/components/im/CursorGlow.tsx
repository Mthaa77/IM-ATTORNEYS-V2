"use client";

import { useState, useEffect, useRef } from "react";

export function CursorGlow() {
  const [position, setPosition] = useState({ x: -500, y: -500 });
  const [isVisible, setIsVisible] = useState(false);
  const currentPos = useRef({ x: -500, y: -500 });

  useEffect(() => {
    // Only enable on desktop (fine pointer devices)
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      currentPos.current = { x: e.clientX, y: e.clientY };
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    // Use requestAnimationFrame for smooth 60fps interpolation
    let rafId: number;
    const animate = () => {
      setPosition((prev) => ({
        x: prev.x + (currentPos.current.x - prev.x) * 0.15,
        y: prev.y + (currentPos.current.y - prev.y) * 0.15,
      }));
      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      className="pointer-events-none fixed z-0 hidden lg:block"
      style={{
        left: 0,
        top: 0,
        willChange: "transform",
      }}
    >
      <div
        className="rounded-full"
        style={{
          position: "absolute",
          width: 600,
          height: 600,
          transform: `translate(${position.x - 300}px, ${position.y - 300}px)`,
          background:
            "radial-gradient(circle, rgba(198, 168, 75, 0.06) 0%, rgba(198, 168, 75, 0.03) 40%, transparent 70%)",
          opacity: isVisible ? 1 : 0,
          transition: "opacity 0.4s ease-out",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}
