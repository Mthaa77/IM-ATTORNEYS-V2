"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ArrowRight, Shield, Scale, Clock, Award, Star } from "lucide-react";
import { ScrollReveal } from "@/components/im/ScrollReveal";

/* ------------------------------------------------------------------ */
/*  Animation variants                                                 */
/* ------------------------------------------------------------------ */

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (d: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, delay: d, ease: [0.22, 1, 0.36, 1] },
  }),
};

const lineReveal = {
  hidden: { scaleX: 0 },
  visible: (d: number) => ({
    scaleX: 1,
    transition: { duration: 0.9, delay: d, ease: [0.22, 1, 0.36, 1] },
  }),
};

/* ------------------------------------------------------------------ */
/*  Background slides data                                             */
/* ------------------------------------------------------------------ */

const heroSlides = [
  {
    src: "/images/pegasus-menlyn-maine.jpg",
    alt: "Pegasus Building, Menlyn Maine Precinct — Home of IM Attorneys Inc",
    kenBurns: { initial: { scale: 1.0, x: 0 }, animate: { scale: 1.12, x: 20 } },
  },
  {
    src: "/images/office-building-exterior.jpg",
    alt: "IM Attorneys Office Exterior — Professional Legal Practice",
    kenBurns: { initial: { scale: 1.08, x: 0 }, animate: { scale: 1.16, x: -15 } },
  },
  {
    src: "/images/parallax-city.png",
    alt: "Pretoria City Skyline — Legal Capital of South Africa",
    kenBurns: { initial: { scale: 1.04, x: -10 }, animate: { scale: 1.14, x: 10 } },
  },
  {
    src: "/images/team-panoramic.jpg",
    alt: "Our Dedicated Legal Team — Experts in South African Law",
    kenBurns: { initial: { scale: 1.06, x: 15 }, animate: { scale: 1.18, x: -10 } },
  },
  {
    src: "/images/hero-building.png",
    alt: "Premium Legal Architecture — IM Attorneys",
    kenBurns: { initial: { scale: 1.02, x: -5 }, animate: { scale: 1.10, x: 15 } },
  },
];

const SLIDE_INTERVAL = 7000; // 7 seconds
const TRANSITION_DURATION = 1.2; // 1.2s crossfade

/* ------------------------------------------------------------------ */
/*  Trust items                                                        */
/* ------------------------------------------------------------------ */

const trustItems = [
  { icon: Clock, label: "24/7 Available" },
  { icon: Scale, label: "500+ Cases Won" },
  { icon: Award, label: "98% Success Rate" },
  { icon: Star, label: "BBBEE Level 1" },
];

/* ------------------------------------------------------------------ */
/*  Hero Component                                                     */
/* ------------------------------------------------------------------ */

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Parallax: background image scrolls at 0.3× speed
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.6], [0, 0.4]);

  // Auto-advance carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, SLIDE_INTERVAL);
    return () => clearInterval(timer);
  }, []);

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index);
  }, []);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden wave-divider-bottom"
    >
      {/* ====== Background Image Carousel ====== */}
      <motion.div className="absolute inset-0 z-0" style={{ y: bgY }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: TRANSITION_DURATION, ease: "easeInOut" }}
          >
            <motion.div
              className="absolute inset-0"
              initial={heroSlides[currentSlide].kenBurns.initial}
              animate={heroSlides[currentSlide].kenBurns.animate}
              transition={{
                duration: SLIDE_INTERVAL + TRANSITION_DURATION,
                ease: "linear",
              }}
            >
              <Image
                src={heroSlides[currentSlide].src}
                alt={heroSlides[currentSlide].alt}
                fill
                className="object-cover object-center"
                priority={currentSlide === 0}
              />
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* ====== Cinematic Color Grading Overlays ====== */}
      {/* Base dark navy gradient from bottom */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-t from-[#0D1B2A] via-[#0D1B2A]/80 to-transparent" />
      {/* Gold accent at edges */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-br from-[#C6A84B]/10 via-transparent to-[#C6A84B]/5" />
      {/* Vignette */}
      <div className="absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_center,transparent_40%,#0D1B2A_100%)]" />
      {/* Scroll-based darkening */}
      <motion.div
        className="absolute inset-0 z-[1] bg-[#0D1B2A]"
        style={{ opacity: overlayOpacity }}
      />

      {/* ====== Animated Ambient Gold Orbs ====== */}
      <motion.div
        className="absolute top-[15%] left-[10%] w-[420px] h-[420px] rounded-full z-[2] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(198,168,75,0.12) 0%, transparent 70%)",
        }}
        animate={{ x: [0, 30, -20, 0], y: [0, -20, 15, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[20%] right-[8%] w-[360px] h-[360px] rounded-full z-[2] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(228,212,154,0.08) 0%, transparent 70%)",
        }}
        animate={{ x: [0, -25, 20, 0], y: [0, 18, -12, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-[50%] left-[55%] w-[280px] h-[280px] rounded-full z-[2] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(198,168,75,0.06) 0%, transparent 70%)",
        }}
        animate={{ x: [0, 15, -30, 0], y: [0, -30, 10, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* ====== Decorative Gold Corner Lines ====== */}
      {/* Top-left */}
      <div className="absolute top-8 left-8 z-[3] hidden lg:block">
        <motion.div
          className="w-24 h-px bg-brand-gold/30"
          variants={lineReveal}
          initial="hidden"
          animate="visible"
          custom={1.8}
          style={{ originX: 0 }}
        />
        <motion.div
          className="w-px h-24 bg-brand-gold/30 mt-0"
          variants={lineReveal}
          initial="hidden"
          animate="visible"
          custom={2.0}
          style={{ originX: 0, scaleY: 1 }}
        />
      </div>
      {/* Bottom-right */}
      <div className="absolute bottom-16 right-8 z-[3] hidden lg:block">
        <motion.div
          className="w-24 h-px bg-brand-gold/30"
          variants={lineReveal}
          initial="hidden"
          animate="visible"
          custom={1.8}
        />
        <motion.div
          className="w-px h-24 bg-brand-gold/30 absolute right-0 top-[-96px]"
          variants={lineReveal}
          initial="hidden"
          animate="visible"
          custom={2.0}
        />
      </div>

      {/* ====== Floating "Est. 2023" Badge ====== */}
      <motion.div
        className="absolute top-28 right-8 z-[4] hidden lg:flex flex-col items-center gap-2"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="relative">
          {/* Pulsing gold ring */}
          <motion.div
            className="absolute inset-[-6px] rounded-full border border-brand-gold/40"
            animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.1, 0.4] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
          <div className="w-20 h-20 rounded-full border border-brand-gold/60 bg-[#0D1B2A]/80 backdrop-blur-sm flex items-center justify-center">
            <Shield className="w-7 h-7 text-brand-gold" strokeWidth={1.5} />
          </div>
        </div>
        <span className="text-[10px] uppercase tracking-[0.25em] text-brand-gold/70 font-body">
          Est. 2023
        </span>
      </motion.div>

      {/* ====== Main Content ====== */}
      <div className="relative z-[5] w-full max-w-5xl mx-auto px-6 pt-28 pb-32 lg:pt-32 lg:pb-40 text-center">
        {/* Gold micro-label */}
        <motion.p
          className="font-body text-[11px] sm:text-xs uppercase tracking-[0.3em] text-brand-gold/80 mb-5"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.2}
        >
          Est. 2023 &middot; Pretoria &middot; Boutique Law Firm
        </motion.p>

        {/* Animated gold separator */}
        <motion.div
          className="h-px bg-gradient-to-r from-transparent via-brand-gold to-transparent mx-auto mb-8 max-w-[140px]"
          variants={lineReveal}
          initial="hidden"
          animate="visible"
          custom={0.5}
        />

        {/* Main headline */}
        <h1 className="font-display leading-[1.1] mb-6">
          <motion.span
            className="block text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.65}
          >
            Defending Your Rights,
          </motion.span>
          <motion.span
            className="block text-gold-gradient text-shadow-gold-glow text-4xl sm:text-5xl md:text-6xl lg:text-7xl mt-1"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.85}
          >
            Championing Your Future.
          </motion.span>
        </h1>

        {/* Subtitle */}
        <motion.p
          className="font-body text-base sm:text-lg md:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed mb-10"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={1.05}
        >
          When your freedom, family, or fortune is at stake — you need more than
          a lawyer. You need{" "}
          <span className="text-brand-gold font-medium">IM Attorneys</span>.
        </motion.p>

        {/* Trust credentials bar */}
        <motion.div
          className="hidden md:flex items-center justify-center gap-5 lg:gap-8 mb-10"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={1.25}
        >
          {trustItems.map((item, i) => (
            <div key={item.label} className="flex items-center gap-3">
              {i > 0 && (
                <span className="text-brand-gold/40 text-[8px]">&#9670;</span>
              )}
              <div className="flex items-center gap-2">
                <item.icon className="w-4 h-4 text-brand-gold/70" />
                <span className="font-body text-sm text-white/70">
                  {item.label}
                </span>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Mobile trust items (2 only) */}
        <motion.div
          className="flex md:hidden items-center justify-center gap-4 mb-8"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={1.25}
        >
          {trustItems.slice(0, 2).map((item, i) => (
            <div key={item.label} className="flex items-center gap-2">
              {i > 0 && (
                <span className="text-brand-gold/40 text-[8px]">&#9670;</span>
              )}
              <item.icon className="w-3.5 h-3.5 text-brand-gold/70" />
              <span className="font-body text-xs text-white/70">
                {item.label}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Dual CTAs */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={1.45}
        >
          <motion.a
            href="#contact"
            className="btn-premium inline-flex items-center gap-2 px-7 py-3.5 font-body text-sm rounded-md"
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            Book Free Consultation
            <ArrowRight className="w-4 h-4" />
          </motion.a>
          <a
            href="#practice-areas"
            className="btn-premium-outline inline-flex items-center gap-2 px-7 py-3.5 font-body text-sm rounded-md"
          >
            <Scale className="w-4 h-4" />
            Explore Practice Areas
          </a>
        </motion.div>
      </div>

      {/* ====== Carousel Progress Dots ====== */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-[6] flex items-center gap-2.5">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className="relative flex items-center justify-center w-8 h-8 cursor-pointer"
            aria-label={`Go to slide ${index + 1}`}
          >
            {/* Background dot */}
            <span
              className="absolute inset-0 flex items-center justify-center"
            >
              <span
                className={`rounded-full transition-all duration-500 ${
                  index === currentSlide
                    ? "w-2.5 h-2.5"
                    : "w-1.5 h-1.5 opacity-40"
                }`}
                style={{
                  backgroundColor: "#C6A84B",
                }}
              />
            </span>
            {/* Animated fill ring on active dot */}
            {index === currentSlide && (
              <motion.span
                className="absolute rounded-full"
                style={{
                  width: 28,
                  height: 28,
                  border: "1.5px solid rgba(198,168,75,0.5)",
                }}
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                transition={{ duration: 0.3 }}
              />
            )}
          </button>
        ))}
      </div>

      {/* ====== Scroll Indicator ====== */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[6]">
        <ScrollReveal delay={2} direction="none" duration={1}>
          <div className="scroll-indicator flex flex-col items-center gap-2">
            <span className="font-body text-[10px] uppercase tracking-[0.2em] text-white/40">
              Scroll
            </span>
            <motion.div
              className="w-5 h-8 rounded-full border border-white/20 flex justify-center pt-1.5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.5 }}
            >
              <motion.div
                className="w-1 h-1.5 rounded-full bg-brand-gold/70"
                animate={{ y: [0, 10, 0] }}
                transition={{
                  duration: 1.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
