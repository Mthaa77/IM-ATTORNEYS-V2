"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ArrowRight, Shield, Scale, Clock, Award, Star, ChevronLeft, ChevronRight } from "lucide-react";
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
/*  Ultra Premium Background Slides                                    */
/* ------------------------------------------------------------------ */

const heroSlides = [
  {
    src: "/images/hero-slide-brand-logo.jpg",
    alt: "IM Attorneys Inc — Premium Legal Brand Identity",
    caption: "Prestige Legal Excellence",
    subcaption: "Ingrid Mtsweni Attorneys Incorporated",
    kenBurns: { initial: { scale: 1.0, x: 0, y: 0 }, animate: { scale: 1.06, x: 0, y: -8 } },
    overlayOpacity: 0.92,
  },
  {
    src: "/images/hero-slide-attorney-client.jpg",
    alt: "Attorney-Client Consultation — Professional Legal Meeting",
    caption: "Trusted Legal Counsel",
    subcaption: "Dedicated to your case, every step of the way",
    kenBurns: { initial: { scale: 1.0, x: -20, y: 0 }, animate: { scale: 1.15, x: 20, y: -5 } },
    overlayOpacity: 0.72,
  },
  {
    src: "/images/hero-slide-office-modern.jpg",
    alt: "IM Attorneys Modern Office — Contemporary Legal Workspace",
    caption: "Modern Legal Practice",
    subcaption: "State-of-the-art facilities in Menlyn Maine, Pretoria",
    kenBurns: { initial: { scale: 1.05, x: 0, y: 10 }, animate: { scale: 1.18, x: -10, y: -8 } },
    overlayOpacity: 0.70,
  },
  {
    src: "/images/hero-slide-collab-desk.jpg",
    alt: "Legal Team Collaboration — Strategic Case Discussion",
    caption: "Strategic Collaboration",
    subcaption: "Collective expertise for complex legal challenges",
    kenBurns: { initial: { scale: 1.04, x: 10, y: 0 }, animate: { scale: 1.14, x: -15, y: 5 } },
    overlayOpacity: 0.72,
  },
  {
    src: "/images/hero-slide-team-meeting.jpg",
    alt: "IM Attorneys Team Meeting — Collaborative Legal Strategy",
    caption: "Team Excellence",
    subcaption: "Award-winning attorneys working for you",
    kenBurns: { initial: { scale: 1.06, x: -15, y: -5 }, animate: { scale: 1.20, x: 10, y: 8 } },
    overlayOpacity: 0.72,
  },
  {
    src: "/images/hero-slide-brand-portfolio.jpg",
    alt: "IM Attorneys Branded Portfolio — Professional Legal Identity",
    caption: "Boutique Law Firm",
    subcaption: "BBBEE Level 1 — Empowering through legal excellence",
    kenBurns: { initial: { scale: 1.02, x: 5, y: 5 }, animate: { scale: 1.10, x: -8, y: -5 } },
    overlayOpacity: 0.80,
  },
  {
    src: "/images/hero-slide-attorney-work.jpg",
    alt: "Senior Attorney at Work — Meticulous Case Preparation",
    caption: "Meticulous Preparation",
    subcaption: "Every case receives our undivided attention",
    kenBurns: { initial: { scale: 1.04, x: -8, y: 0 }, animate: { scale: 1.12, x: 12, y: -6 } },
    overlayOpacity: 0.74,
  },
];

const SLIDE_INTERVAL = 8000; // 8 seconds
const TRANSITION_DURATION = 1.4; // 1.4s cinematic crossfade

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
/*  Slide Counter (01/07 format)                                       */
/* ------------------------------------------------------------------ */

function SlideCounter({ current, total }: { current: number; total: number }) {
  const displayNum = String(current + 1).padStart(2, "0");
  const displayTotal = String(total).padStart(2, "0");

  return (
    <div className="flex items-center gap-2 font-body">
      <motion.span
        key={displayNum}
        initial={{ y: 8, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -8, opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="text-lg font-bold text-white/90 tracking-wider tabular-nums"
      >
        {displayNum}
      </motion.span>
      <span className="text-xs text-brand-gold/40">/</span>
      <span className="text-sm text-white/40 tracking-wider">{displayTotal}</span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Cinematic Progress Bar (8s animated fill)                          */
/* ------------------------------------------------------------------ */

function CinematicProgress({
  active,
  onDone,
  index,
}: {
  active: boolean;
  onDone: () => void;
  index: number;
}) {
  useEffect(() => {
    if (!active) return;
    const timeout = setTimeout(onDone, SLIDE_INTERVAL);
    return () => clearTimeout(timeout);
  }, [active, onDone]);

  return (
    <div className="relative w-full h-[2px] rounded-full overflow-hidden bg-white/10">
      <motion.div
        className="absolute inset-y-0 left-0 rounded-full"
        style={{
          background: "linear-gradient(90deg, #C6A84B 0%, #E4D49A 50%, #C6A84B 100%)",
          boxShadow: "0 0 8px rgba(198,168,75,0.4)",
        }}
        initial={{ width: "0%" }}
        animate={active ? { width: "100%" } : { width: "0%" }}
        transition={active ? { duration: SLIDE_INTERVAL / 1000, ease: "linear" } : { duration: 0.2 }}
        key={`progress-${index}`}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Hero Component                                                     */
/* ------------------------------------------------------------------ */

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Parallax: background image scrolls at 0.3x speed
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.6], [0, 0.4]);

  // Auto-advance carousel
  const advanceSlide = useCallback(() => {
    if (isPaused || isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
      setIsTransitioning(false);
    }, 200);
  }, [isPaused, isTransitioning]);

  const goToSlide = useCallback(
    (index: number) => {
      if (isTransitioning || index === currentSlide) return;
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentSlide(index);
        setIsTransitioning(false);
      }, 200);
    },
    [isTransitioning, currentSlide]
  );

  const goNext = useCallback(() => {
    goToSlide((currentSlide + 1) % heroSlides.length);
  }, [currentSlide, goToSlide]);

  const goPrev = useCallback(() => {
    goToSlide((currentSlide - 1 + heroSlides.length) % heroSlides.length);
  }, [currentSlide, goToSlide]);

  const slide = heroSlides[currentSlide];
  const isFirstSlide = currentSlide === 0;

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden wave-divider-bottom"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
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
            {/* Ken Burns zoom/pan wrapper */}
            <motion.div
              className="absolute inset-0"
              initial={slide.kenBurns.initial}
              animate={slide.kenBurns.animate}
              transition={{
                duration: SLIDE_INTERVAL / 1000 + TRANSITION_DURATION,
                ease: "linear",
              }}
            >
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                className="object-cover object-center"
                priority={currentSlide === 0}
                sizes="100vw"
                quality={90}
              />
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* ====== Ultra Premium Cinematic Overlays ====== */}
      {/* Dynamic per-slide dark overlay */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`overlay-opacity-${currentSlide}`}
          className="absolute inset-0 z-[1]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: TRANSITION_DURATION, ease: "easeInOut" }}
          style={{ backgroundColor: `rgba(13, 27, 42, ${slide.overlayOpacity})` }}
        />
      </AnimatePresence>

      {/* Navy gradient from bottom (always present) */}
      <div className="absolute inset-0 z-[2] bg-gradient-to-t from-[#0D1B2A] via-[#0D1B2A]/60 to-transparent" />
      {/* Gold accent at edges */}
      <div className="absolute inset-0 z-[2] bg-gradient-to-br from-[#C6A84B]/10 via-transparent to-[#C6A84B]/5" />
      {/* Cinematic vignette */}
      <div className="absolute inset-0 z-[2] bg-[radial-gradient(ellipse_at_center,transparent_35%,#0D1B2A_100%)]" />
      {/* Letterbox bars for cinematic feel */}
      <div className="absolute top-0 left-0 right-0 h-[3vh] bg-[#0D1B2A] z-[3] pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-[5vh] bg-[#0D1B2A] z-[3] pointer-events-none" />
      {/* Scroll-based darkening */}
      <motion.div
        className="absolute inset-0 z-[2] bg-[#0D1B2A]"
        style={{ opacity: overlayOpacity }}
      />

      {/* ====== Animated Gold Scan Line ====== */}
      <motion.div
        className="absolute left-0 right-0 h-px z-[3] pointer-events-none"
        style={{
          background: "linear-gradient(90deg, transparent 0%, rgba(198,168,75,0.15) 20%, rgba(198,168,75,0.3) 50%, rgba(198,168,75,0.15) 80%, transparent 100%)",
        }}
        animate={{ top: ["0%", "100%"] }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
      />

      {/* ====== Animated Ambient Gold Orbs ====== */}
      <motion.div
        className="absolute top-[15%] left-[10%] w-[420px] h-[420px] rounded-full z-[4] pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(198,168,75,0.12) 0%, transparent 70%)",
        }}
        animate={{ x: [0, 30, -20, 0], y: [0, -20, 15, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[20%] right-[8%] w-[360px] h-[360px] rounded-full z-[4] pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(228,212,154,0.08) 0%, transparent 70%)",
        }}
        animate={{ x: [0, -25, 20, 0], y: [0, 18, -12, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-[50%] left-[55%] w-[280px] h-[280px] rounded-full z-[4] pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(198,168,75,0.06) 0%, transparent 70%)",
        }}
        animate={{ x: [0, 15, -30, 0], y: [0, -30, 10, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* ====== Decorative Gold Corner Lines ====== */}
      <div className="absolute top-8 left-8 z-[5] hidden lg:block">
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
      <div className="absolute bottom-16 right-8 z-[5] hidden lg:block">
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

      {/* ====== Floating &quot;Est. 2023&quot; Badge ====== */}
      <motion.div
        className="absolute top-28 right-8 z-[6] hidden lg:flex flex-col items-center gap-2"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="relative">
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
      <div className="relative z-[7] w-full max-w-5xl mx-auto px-6 pt-28 pb-36 lg:pt-32 lg:pb-44 text-center">
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
              {i > 0 && <span className="text-brand-gold/40 text-[8px]">&#9670;</span>}
              <div className="flex items-center gap-2">
                <item.icon className="w-4 h-4 text-brand-gold/70" />
                <span className="font-body text-sm text-white/70">{item.label}</span>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Mobile trust items */}
        <motion.div
          className="flex md:hidden items-center justify-center gap-4 mb-8"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={1.25}
        >
          {trustItems.slice(0, 2).map((item, i) => (
            <div key={item.label} className="flex items-center gap-2">
              {i > 0 && <span className="text-brand-gold/40 text-[8px]">&#9670;</span>}
              <item.icon className="w-3.5 h-3.5 text-brand-gold/70" />
              <span className="font-body text-xs text-white/70">{item.label}</span>
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

      {/* ====== Bottom Controls Bar ====== */}
      <div className="absolute bottom-6 left-0 right-0 z-[8] px-6 lg:px-12">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          {/* Left: Slide Counter */}
          <div className="hidden sm:flex items-center gap-4">
            <SlideCounter current={currentSlide} total={heroSlides.length} />
            <div className="w-16 sm:w-24">
              <CinematicProgress
                active={!isPaused && !isTransitioning}
                onDone={advanceSlide}
                index={currentSlide}
              />
            </div>
          </div>

          {/* Center: Dot Navigation */}
          <div className="flex items-center gap-2">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className="relative cursor-pointer group"
                aria-label={`Go to slide ${index + 1}`}
              >
                <span
                  className="block rounded-full transition-all duration-500"
                  style={{
                    width: index === currentSlide ? 24 : 8,
                    height: 8,
                    backgroundColor:
                      index === currentSlide ? "#C6A84B" : "rgba(198, 168, 75, 0.25)",
                    boxShadow:
                      index === currentSlide
                        ? "0 0 12px rgba(198,168,75,0.4)"
                        : "none",
                  }}
                />
              </button>
            ))}
          </div>

          {/* Right: Prev / Next Arrows */}
          <div className="hidden sm:flex items-center gap-1">
            <button
              onClick={goPrev}
              className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 hover:bg-brand-gold/10 border border-brand-gold/15 hover:border-brand-gold/30"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-4 h-4 text-white/60 group-hover:text-brand-gold" />
            </button>
            <button
              onClick={goNext}
              className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 hover:bg-brand-gold/10 border border-brand-gold/15 hover:border-brand-gold/30"
              aria-label="Next slide"
            >
              <ChevronRight className="w-4 h-4 text-white/60 group-hover:text-brand-gold" />
            </button>
          </div>
        </div>
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
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
