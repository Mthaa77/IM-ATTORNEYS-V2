"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import {
  ScrollReveal,
  GoldLine,
  StaggerContainer,
  staggerChildVariants,
} from "./ScrollReveal";
import {
  ArrowRight,
  Quote,
  Handshake,
  ShieldCheck,
  Heart,
  Scale,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Animation variants                                                 */
/* ------------------------------------------------------------------ */

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (d: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: d, ease: [0.22, 1, 0.36, 1] },
  }),
};

const containerStagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const itemFade = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

/* ------------------------------------------------------------------ */
/*  Promise pillars                                                    */
/* ------------------------------------------------------------------ */

const promises = [
  {
    icon: ShieldCheck,
    title: "Unwavering Commitment",
    description:
      "Every case is handled with the tenacity and dedication it deserves — because your future depends on it.",
  },
  {
    icon: Heart,
    title: "Ubuntu-Centred Practice",
    description:
      "We believe in the dignity of every person. Our practice is rooted in empathy, respect, and human connection.",
  },
  {
    icon: Scale,
    title: "Fearless Advocacy",
    description:
      "We fight relentlessly for justice, unafraid to challenge powerful interests on behalf of our clients.",
  },
];

/* ------------------------------------------------------------------ */
/*  Welcome Section Component                                          */
/* ------------------------------------------------------------------ */

export function WelcomeSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-60px" });

  return (
    <section
      ref={sectionRef}
      id="welcome"
      className="relative w-full overflow-hidden"
      style={{ backgroundColor: "#0D1B2A" }}
      aria-label="Welcome message from the director"
    >
      {/* ═══════ Background atmosphere ═══════ */}
      {/* Gold radial glow top-left */}
      <div
        className="absolute top-0 left-0 w-[600px] h-[600px] pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(198,168,75,0.07) 0%, transparent 70%)",
        }}
      />
      {/* Gold radial glow bottom-right */}
      <div
        className="absolute bottom-0 right-0 w-[500px] h-[500px] pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(198,168,75,0.05) 0%, transparent 70%)",
        }}
      />
      {/* Subtle noise texture */}
      <div className="absolute inset-0 z-0 noise-overlay opacity-[0.04]" />

      {/* ═══════ Decorative gold line accents ═══════ */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-px z-10"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(198,168,75,0.3) 30%, rgba(198,168,75,0.5) 50%, rgba(198,168,75,0.3) 70%, transparent 100%)",
        }}
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
      />

      {/* ═══════ Main content ═══════ */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-36">
        {/* ──── Top: Section Label & Heading ──── */}
        <div className="text-center max-w-4xl mx-auto mb-16 sm:mb-20 lg:mb-24">
          <motion.span
            className="font-body text-[11px] sm:text-xs uppercase tracking-[0.3em] text-brand-gold/80 mb-6 block"
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            custom={0.1}
          >
            A Message from Our Director
          </motion.span>

          <motion.div
            className="h-px bg-gradient-to-r from-transparent via-brand-gold/60 to-transparent mx-auto mb-8 max-w-[120px]"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: "easeOut" }}
          />

          <motion.h2
            className="heading-section mb-6"
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            custom={0.4}
          >
            Welcome to IM Attorneys
          </motion.h2>

          <motion.p
            className="font-body text-base sm:text-lg md:text-xl text-white/50 max-w-2xl mx-auto leading-relaxed"
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            custom={0.55}
          >
            Where legal excellence meets the spirit of Ubuntu
          </motion.p>
        </div>

        {/* ──── Main Layout: Portrait + Message ──── */}
        <div className="flex flex-col lg:flex-row items-stretch gap-12 lg:gap-20">
          {/* ═══════ LEFT: Director Portrait ═══════ */}
          <motion.div
            className="w-full lg:w-[42%] shrink-0 flex justify-center lg:justify-start"
          >
            <ScrollReveal direction="left" duration={0.9} delay={0.2}>
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Animated gold ring behind portrait */}
                <motion.div
                  className="absolute -inset-5 rounded-full border border-brand-gold/20"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={
                    isInView
                      ? { opacity: 1, scale: 1 }
                      : { opacity: 0, scale: 0.9 }
                  }
                  transition={{ duration: 1.2, delay: 0.5 }}
                />
                <motion.div
                  className="absolute -inset-10 rounded-full border border-brand-gold/[0.08]"
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={
                    isInView
                      ? { opacity: 1, scale: 1 }
                      : { opacity: 0, scale: 0.85 }
                  }
                  transition={{ duration: 1.2, delay: 0.7 }}
                />

                {/* Portrait container */}
                <div className="relative aspect-[3/4] rounded-sm overflow-hidden shadow-2xl">
                  {/* Gold accent border */}
                  <div className="absolute inset-0 rounded-sm border border-brand-gold/30 z-20 pointer-events-none" />

                  {/* Corner brackets */}
                  <motion.div
                    className="absolute top-3 left-3 w-10 h-10 border-t-2 border-l-2 border-brand-gold/60 z-20 pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.5, delay: 1.0 }}
                  />
                  <motion.div
                    className="absolute top-3 right-3 w-10 h-10 border-t-2 border-r-2 border-brand-gold/60 z-20 pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.5, delay: 1.1 }}
                  />
                  <motion.div
                    className="absolute bottom-3 left-3 w-10 h-10 border-b-2 border-l-2 border-brand-gold/60 z-20 pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.5, delay: 1.2 }}
                  />
                  <motion.div
                    className="absolute bottom-3 right-3 w-10 h-10 border-b-2 border-r-2 border-brand-gold/60 z-20 pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.5, delay: 1.3 }}
                  />

                  <Image
                    src="/images/ingrid-portrait-welcome.jpg"
                    alt="Ingrid Mtsweni — Founder & Director of IM Attorneys Inc"
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 1024px) 80vw, 38vw"
                    priority
                  />

                  {/* Gradient overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D1B2A]/60 via-transparent to-transparent z-10" />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#0D1B2A]/20 via-transparent to-transparent z-10" />
                </div>

                {/* Name badge below portrait */}
                <motion.div
                  className="mt-6 text-center lg:text-left"
                  initial={{ opacity: 0, y: 15 }}
                  animate={
                    isInView
                      ? { opacity: 1, y: 0 }
                      : { opacity: 0, y: 15 }
                  }
                  transition={{ duration: 0.7, delay: 0.8 }}
                >
                  <p className="font-display text-xl sm:text-2xl font-bold text-white">
                    Ingrid Mtsweni
                  </p>
                  <p className="font-body text-sm text-brand-gold/70 tracking-wide mt-1 uppercase">
                    Founder &amp; Director
                  </p>
                  <p className="font-body text-xs text-white/40 mt-1">
                    LLB (University of Johannesburg) | Admitted Attorney
                  </p>
                </motion.div>
              </div>
            </ScrollReveal>
          </motion.div>

          {/* ═══════ RIGHT: Director's Welcome Message ═══════ */}
          <div className="w-full lg:w-[58%] flex flex-col justify-center">
            {/* Opening quote mark */}
            <ScrollReveal delay={0.3}>
              <div className="relative mb-8">
                <Quote
                  className="absolute -top-4 -left-2 w-12 h-12 text-brand-gold/20"
                  strokeWidth={1.5}
                />
                <p className="font-body text-lg sm:text-xl leading-relaxed text-white/80 pl-10">
                  <span className="text-brand-gold font-semibold">
                    Dear valued client,
                  </span>
                </p>
              </div>
            </ScrollReveal>

            {/* Welcome message paragraphs */}
            <ScrollReveal delay={0.4}>
              <div className="space-y-5">
                <p className="font-body text-base sm:text-[17px] leading-[1.85] text-white/70">
                  I founded IM Attorneys Inc in February 2023 with a singular,
                  unwavering vision: to build a law firm that treats every client
                  not as a file number, but as a human being whose life, liberty,
                  and livelihood truly matter. As a 100% female black-owned boutique
                  practice rooted in the heart of Pretoria&apos;s prestigious Menlyn
                  Maine Precinct, we exist to challenge the notion that world-class
                  legal representation must come at the cost of personal attention
                  and genuine care.
                </p>

                <p className="font-body text-base sm:text-[17px] leading-[1.85] text-white/70">
                  My journey to the law was unconventional. Before earning my LLB
                  from the University of Johannesburg, I spent years in the
                  financial services sector, gaining a deep understanding of how
                  legal challenges intersect with real-world financial and personal
                  consequences. That experience fundamentally shaped how we
                  approach every matter at IM Attorneys — we don&apos;t just
                  interpret the law; we understand the lives behind it. Whether
                  you are facing a criminal charge, navigating a complex family
                  dispute, or safeguarding your business interests, you deserve an
                  attorney who sees the complete picture.
                </p>

                <p className="font-body text-base sm:text-[17px] leading-[1.85] text-white/70">
                  Our firm is deliberately small by design. This is not a
                  limitation — it is our greatest strength. When you work with IM
                  Attorneys, you work directly with experienced attorneys who know
                  your name, understand your story, and treat your matter as if it
                  were their own. We believe that the spirit of{" "}
                  <span className="text-brand-gold font-medium italic">
                    Ubuntu
                  </span>{" "}
                  — the profound African philosophy that &ldquo;I am because we
                  are&rdquo; — should be at the heart of everything we do. It
                  means we fight for you not merely as a professional obligation,
                  but as a deeply personal commitment to justice, dignity, and
                  community.
                </p>

                <p className="font-body text-base sm:text-[17px] leading-[1.85] text-white/70">
                  We do not measure our success by the volume of cases we handle,
                  but by the depth of impact we create in each client&apos;s life.
                  From the moment you walk through our doors, you become part of
                  the IM Attorneys family — and we will stand beside you every
                  step of the way, fighting relentlessly for the outcome you
                  deserve.
                </p>
              </div>
            </ScrollReveal>

            {/* Signature area */}
            <ScrollReveal delay={0.5}>
              <div className="mt-10 flex items-center gap-5">
                <div className="h-12 w-px bg-brand-gold/30" />
                <div>
                  <p className="font-display text-lg font-semibold text-white italic">
                    With purpose and conviction,
                  </p>
                  <p className="font-display text-xl font-bold text-brand-gold mt-1">
                    Ingrid Mtsweni
                  </p>
                  <p className="font-body text-xs text-white/40 mt-0.5 tracking-wider uppercase">
                    Founder &amp; Director, IM Attorneys Inc
                  </p>
                </div>
              </div>
            </ScrollReveal>

            {/* CTA */}
            <ScrollReveal delay={0.6}>
              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <a
                  href="#contact"
                  className="btn-premium inline-flex items-center justify-center gap-2 px-7 py-3.5 font-body text-sm rounded-md"
                >
                  Book a Free Consultation
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="#services"
                  className="btn-premium-outline inline-flex items-center justify-center gap-2 px-7 py-3.5 font-body text-sm rounded-md"
                >
                  <Scale className="w-4 h-4" />
                  Explore Our Services
                </a>
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* ──── Bottom: Promise Pillars ──── */}
        <motion.div
          className="mt-20 lg:mt-28 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
          variants={containerStagger}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {promises.map((promise, i) => (
            <motion.div
              key={promise.title}
              variants={itemFade}
              className="group relative rounded-lg p-7 sm:p-8 transition-all duration-500 hover:-translate-y-1"
              style={{
                background:
                  "linear-gradient(135deg, rgba(198,168,75,0.06) 0%, rgba(198,168,75,0.02) 100%)",
                border: "1px solid rgba(198,168,75,0.12)",
              }}
            >
              {/* Hover glow effect */}
              <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(ellipse at center, rgba(198,168,75,0.08) 0%, transparent 70%)",
                }}
              />

              {/* Icon */}
              <div
                className="relative w-12 h-12 rounded-md flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110"
                style={{
                  background: "rgba(198,168,75,0.1)",
                  border: "1px solid rgba(198,168,75,0.2)",
                }}
              >
                <promise.icon
                  className="w-5 h-5 text-brand-gold"
                  strokeWidth={1.5}
                />
              </div>

              {/* Title */}
              <h3 className="font-display text-lg font-bold text-white mb-3 transition-colors duration-300 group-hover:text-brand-gold">
                {promise.title}
              </h3>

              {/* Description */}
              <p className="font-body text-sm leading-relaxed text-white/50 group-hover:text-white/65 transition-colors duration-300">
                {promise.description}
              </p>

              {/* Bottom gold accent line */}
              <div
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-px bg-brand-gold/40 group-hover:w-3/4 transition-all duration-500"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* ═══════ Bottom decorative line ═══════ */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-px z-10"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(198,168,75,0.3) 30%, rgba(198,168,75,0.5) 50%, rgba(198,168,75,0.3) 70%, transparent 100%)",
        }}
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 1.2, delay: 0.6, ease: "easeOut" }}
      />
    </section>
  );
}
