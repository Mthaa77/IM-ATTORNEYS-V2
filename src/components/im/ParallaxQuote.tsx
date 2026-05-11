"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function ParallaxQuote() {
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Parallax: background scrolls at 60% of page scroll speed
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

  // Subtle fade-in/out for quote content
  const quoteOpacity = useTransform(
    scrollYProgress,
    [0, 0.25, 0.75, 1],
    [0.3, 1, 1, 0.3]
  );

  // Subtle scale breathing effect on the quote
  const quoteScale = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    [0.95, 1, 1, 1, 0.95]
  );

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[70vh] sm:h-[80vh] lg:h-[85vh] overflow-hidden"
      aria-label="Inspirational quote"
    >
      {/* Parallax background image */}
      <motion.div
        className="absolute inset-0 w-full h-full will-change-transform"
        style={{ y: backgroundY }}
      >
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-110"
          style={{ backgroundImage: "url('/images/pegasus-menlyn-maine.jpg')" }}
        />

        {/* 60% dark overlay */}
        <div className="absolute inset-0 bg-brand-dark/[0.60]" />

        {/* Subtle vignette effect */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 40%, rgba(13,27,42,0.4) 100%)",
          }}
        />
      </motion.div>

      {/* Gold accent lines — top and bottom */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-gold/40 to-transparent z-10" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-gold/40 to-transparent z-10" />

      {/* Centered quote content */}
      <div className="relative z-10 flex items-center justify-center h-full px-6 sm:px-8">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          style={{ opacity: quoteOpacity, scale: quoteScale }}
        >
          {/* Decorative quotation mark */}
          <motion.span
            className="block font-display text-brand-gold/30 text-6xl sm:text-7xl lg:text-8xl leading-none select-none mb-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            &ldquo;
          </motion.span>

          {/* Main quote */}
          <motion.blockquote
            className="font-display text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium italic text-brand-inverse leading-snug sm:leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: "easeOut", delay: 0.15 }}
          >
            A good lawyer is going to try and protect her client.
          </motion.blockquote>

          {/* Gold divider */}
          <div className="mx-auto mt-6 sm:mt-8 mb-5 sm:mb-6 w-16 gold-line-animated" />

          {/* Attribution */}
          <motion.cite
            className="font-body text-sm sm:text-base font-medium tracking-[0.2em] uppercase text-brand-gold not-italic"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.5 }}
          >
            &mdash; John F. Kennedy
          </motion.cite>
        </motion.div>
      </div>
    </section>
  );
}
