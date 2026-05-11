"use client";

import { motion, useInView } from "framer-motion";
import { Phone, MessageCircle } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";

export function EmergencyCTA() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      ref={ref}
      id="emergency-cta"
      className="relative w-full overflow-hidden bg-brand-dark border-animated-dashed shadow-glow-gold raised-3d"
      aria-label="Emergency bail attorney contact"
    >
      {/* Subtle diagonal gold accent line - top */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-gold/60 to-transparent"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={isInView ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        style={{ transformOrigin: "center" }}
      />

      {/* Subtle background texture */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23C6A84B' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Inner content */}
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16 lg:py-20">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          {/* Left: Content */}
          <div className="flex-1 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex items-center justify-center lg:justify-start gap-3 mb-4"
            >
              {/* Pulsing red dot */}
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]" />
              </span>
              <span className="label-premium">
                Criminal Matters
              </span>
            </motion.div>

            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="heading-section mb-4"
            >
              Facing an Arrest?{" "}
              <span className="gold-glow-text">We Answer the Call.</span>
            </motion.h3>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="subheading-premium-dark max-w-xl mx-auto lg:mx-0"
            >
              Arrested or facing charges? Every second counts. Our criminal defence team is available around the clock to protect your rights, secure your freedom, and fight for the best possible outcome.
            </motion.p>
          </div>

          {/* Right: Branded Folder Image + CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col items-center gap-6 shrink-0"
          >
            {/* Branded folder image */}
            <div className="relative w-48 h-48 sm:w-56 sm:h-56 lg:w-64 lg:h-64 rounded-sm overflow-hidden shadow-2xl shadow-brand-gold/10 border border-brand-gold/20">
              <Image
                src="/images/branded-folder.jpg"
                alt="IM Attorneys branded folder — Ingrid Mtsweni Attorneys Incorporated"
                fill
                className="object-cover"
                sizes="256px"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/40 to-transparent" />
            </div>

            {/* CTA Buttons row */}
            <div className="flex flex-col sm:flex-row items-center gap-4 lg:gap-5">
              {/* Primary: Call CTA */}
              <a
                href="tel:+27812488048"
                className="group relative flex items-center gap-3 px-7 sm:px-8 py-4 sm:py-4.5 bg-brand-gold text-brand-dark font-body font-semibold text-sm sm:text-base rounded-sm overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(198,168,75,0.35)] active:scale-[0.98]"
              >
                {/* Shimmer overlay on hover */}
                <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-shimmer-gold" />

                <Phone className="relative w-5 h-5 flex-shrink-0" strokeWidth={2.5} />
                <span className="relative whitespace-nowrap">Call Us Now: 081 248 8048</span>
              </a>

              {/* Secondary: WhatsApp CTA */}
              <a
                href="https://wa.me/270812488048"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2.5 px-6 sm:px-7 py-4 sm:py-4.5 border border-brand-gold/40 text-brand-gold font-body font-medium text-sm sm:text-base rounded-sm hover:bg-brand-gold/10 hover:border-brand-gold/70 transition-all duration-300 active:scale-[0.98]"
              >
                <MessageCircle className="w-5 h-5 flex-shrink-0 group-hover:scale-110 transition-transform duration-200" />
                <span className="whitespace-nowrap">WhatsApp Us&ensp;→</span>
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Subtle diagonal gold accent line - bottom */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-gold/60 to-transparent"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={isInView ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
        style={{ transformOrigin: "center" }}
      />
    </section>
  );
}
