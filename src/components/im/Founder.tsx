"use client";

import { motion, useInView } from "framer-motion";
import { ArrowRight, Star } from "lucide-react";
import { useRef } from "react";
import {
  ScrollReveal,
  GoldLine,
  StaggerContainer,
  staggerChildVariants,
} from "./ScrollReveal";

const values = [
  "Ethical Integrity",
  "Ubuntu",
  "Passion",
  "Excellence",
  "Representation",
];

export function Founder() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      id="founder"
      className="premium-section-surface premium-section-surface--light relative bg-brand-cream overflow-hidden"
      aria-label="Founder biography"
    >
      {/* Decorative corner accent */}
      <div className="absolute top-0 right-0 w-40 h-40 opacity-[0.06]">
        <svg viewBox="0 0 200 200" fill="none" className="w-full h-full">
          <circle cx="200" cy="0" r="200" fill="#C6A84B" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 lg:py-32">
        <div className="flex flex-col lg:flex-row items-stretch gap-10 lg:gap-16">
          {/* Left: Portrait — 45% */}
          <ScrollReveal
            direction="left"
            duration={0.8}
            className="w-full lg:w-[45%] shrink-0"
          >
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Gold border ring / frame */}
              <div className="relative">
                {/* Outer gold frame */}
                <motion.div
                  className="absolute -inset-3 sm:-inset-4 rounded-sm border-2 border-brand-gold/30"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={
                    isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }
                  }
                  transition={{ duration: 0.8, delay: 0.3 }}
                />
                {/* Inner gold accent frame */}
                <motion.div
                  className="absolute -inset-1 sm:-inset-1.5 rounded-sm border border-brand-gold/15"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                />

                {/* Portrait image */}
                <div className="relative aspect-[3/4] rounded-sm overflow-hidden bg-brand-parchment parallax-depth image-hover-zoom panel-3d-float">
                  <motion.img
                    src="/images/ingrid-mtsweni-founder.jpg"
                    alt="Ingrid Mtsweni — Founder & Director of IM Attorneys Inc"
                    className="w-full h-full object-cover object-top"
                    initial={{ scale: 1.08 }}
                    animate={isInView ? { scale: 1 } : { scale: 1.08 }}
                    transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
                    loading="lazy"
                  />

                  {/* Subtle bottom gradient overlay */}
                  <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-brand-dark/20 to-transparent" />
                </div>

                {/* Gold accent corner brackets */}
                <motion.div
                  className="absolute -top-1 -left-1 w-8 h-8 border-t-2 border-l-2 border-brand-gold"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                />
                <motion.div
                  className="absolute -top-1 -right-1 w-8 h-8 border-t-2 border-r-2 border-brand-gold"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                />
                <motion.div
                  className="absolute -bottom-1 -left-1 w-8 h-8 border-b-2 border-l-2 border-brand-gold"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.5, delay: 0.9 }}
                />
                <motion.div
                  className="absolute -bottom-1 -right-1 w-8 h-8 border-b-2 border-r-2 border-brand-gold"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.5, delay: 1.0 }}
                />
              </div>
            </div>
          </ScrollReveal>

          {/* Right: Bio Content — 55% */}
          <div className="w-full lg:w-[55%] flex flex-col justify-center">
            {/* Gold caps label */}
            <ScrollReveal delay={0.15}>
              <span className="label-premium">
                Founder &amp; Director
              </span>
            </ScrollReveal>

            {/* Gold divider — 40px */}
            <div className="mt-4 mb-5">
              <GoldLine width={40} />
            </div>

            {/* Name */}
            <ScrollReveal delay={0.25}>
              <h2 className="heading-section-light">
                Ingrid Mtsweni
              </h2>
              <p className="subheading-premium mt-5">
                A fearless advocate, visionary leader, and the driving force behind IM Attorneys&apos; commitment to excellence, justice, and the spirit of Ubuntu.
              </p>
            </ScrollReveal>

            {/* Bio paragraph */}
            <ScrollReveal delay={0.35}>
              <p className="font-body text-sm sm:text-base text-brand-body leading-relaxed mt-6 body-lg">
                Ingrid holds an <strong className="text-brand-dark font-semibold">LLB degree from the University of Johannesburg</strong>,
                awarded in 2018. Before founding IM Attorneys Inc, she built a strong
                foundation in the financial services sector, gaining invaluable
                corporate insight through banking experience. This unique combination
                of commercial acumen and legal expertise informs her holistic approach
                to client service — understanding not just the law, but the
                real-world financial and personal implications of every matter.
              </p>
            </ScrollReveal>

            {/* Pull quote */}
            <ScrollReveal delay={0.45}>
              <blockquote className="relative mt-8 pl-6 border-l-2 border-brand-gold/50">
                <Star
                  className="absolute -left-[1.15rem] -top-1 w-5 h-5 text-brand-gold/30"
                  fill="currentColor"
                />
                <p className="font-display text-lg sm:text-xl italic text-brand-dark/80 leading-relaxed">
                  &ldquo;IM Attorneys Inc is a product of passion meets skill and
                  knowledge.&rdquo;
                </p>
              </blockquote>
            </ScrollReveal>

            {/* Gold divider — 40px */}
            <div className="mt-8 mb-7">
              <GoldLine width={40} />
            </div>

            {/* Values row */}
            <ScrollReveal delay={0.55}>
              <div className="flex flex-wrap gap-2.5">
                {values.map((value) => (
                  <span
                    key={value}
                    className="inline-flex items-center px-4 py-2 rounded-sm bg-brand-dark/[0.04] border border-brand-gold/20 font-body text-xs sm:text-sm font-medium text-brand-dark tracking-wide hover:border-brand-gold/50 hover:bg-brand-gold/[0.06] transition-all duration-300"
                  >
                    {value}
                  </span>
                ))}
              </div>
            </ScrollReveal>

            {/* CTA */}
            <ScrollReveal delay={0.65}>
              <a
                href="#team"
                onClick={(e) => {
                  e.preventDefault();
                  const el = document.querySelector("#team");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="group inline-flex items-center gap-2 mt-8 font-body text-sm font-semibold text-brand-gold hover:text-brand-dark transition-colors duration-300"
              >
                <span>Meet the Full Team</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </a>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
