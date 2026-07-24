"use client";

import { motion } from "framer-motion";

export function ParallaxQuote() {
  return (
    <section
      className="relative w-full h-[70vh] sm:h-[80vh] lg:h-[85vh] overflow-hidden"
      aria-label="Inspirational quote"
    >
      {/* Parallax background image */}
      <div className="absolute inset-0 w-full h-full">
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
      </div>

      {/* Gold accent lines — top and bottom */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-gold/40 to-transparent z-10" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-gold/40 to-transparent z-10" />

      {/* Centered quote content */}
      <div className="relative z-10 flex items-center justify-center h-full px-6 sm:px-8">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-64px" }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
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
