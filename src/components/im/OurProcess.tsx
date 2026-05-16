"use client";

import { useRef, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import { MessageSquare, Lightbulb, Gavel, Award } from "lucide-react";
import {
  ScrollReveal,
  StaggerContainer,
  staggerChildVariants,
  GoldLine,
} from "@/components/im/ScrollReveal";

/* ─── Data ──────────────────────────────────────────────────────── */

const steps = [
  {
    number: "01",
    title: "Free Initial Consultation",
    description:
      "Every great outcome begins with a conversation. Tell us your story — we'll listen without judgement, assess your position honestly, and map out your options at absolutely no cost to you.",
    icon: MessageSquare,
  },
  {
    number: "02",
    title: "Tailored Legal Strategy",
    description:
      "No two cases are alike. We craft a bespoke legal strategy tailored to your specific goals, timeline, and circumstances — turning complexity into a clear path forward.",
    icon: Lightbulb,
  },
  {
    number: "03",
    title: "Diligent Representation",
    description:
      "With your strategy in hand, we go to work — preparing meticulously, advocating forcefully, and keeping you informed at every single stage. You will never wonder what's happening with your case.",
    icon: Gavel,
  },
  {
    number: "04",
    title: "Favourable Resolution",
    description:
      "Whether the best path is skilful negotiation, mediation, or courtroom litigation — we pursue the outcome that protects your interests and your peace of mind.",
    icon: Award,
  },
];

/* ─── Constellation Connector (Desktop) ─────────────────────────── */

function ConstellationConnectorDesktop() {
  const ref = useRef<SVGSVGElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  // Curved path connecting 4 nodes in a diamond/arc constellation
  // Nodes positioned at: (10%, 50%), (36%, 25%), (64%, 25%), (90%, 50%)
  // We draw bezier curves between each consecutive pair
  const paths = [
    { d: "M 10% 50% C 18% 35%, 28% 28%, 36% 25%", delay: 0 },
    { d: "M 36% 25% C 44% 22%, 56% 22%, 64% 25%", delay: 0.3 },
    { d: "M 64% 25% C 72% 28%, 82% 35%, 90% 50%", delay: 0.6 },
  ];

  return (
    <svg
      ref={ref}
      className="absolute inset-0 w-full h-full hidden lg:block pointer-events-none"
      viewBox="0 0 1000 400"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="lineGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(198,168,75,0.15)" />
          <stop offset="50%" stopColor="rgba(198,168,75,0.5)" />
          <stop offset="100%" stopColor="rgba(198,168,75,0.15)" />
        </linearGradient>
        <filter id="goldGlowLine">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {paths.map((path, i) => (
        <g key={i}>
          {/* Background glow line */}
          <motion.path
            d={path.d}
            fill="none"
            stroke="rgba(198,168,75,0.08)"
            strokeWidth="3"
            filter="url(#goldGlowLine)"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{
              duration: 1.5,
              delay: path.delay,
              ease: "easeInOut",
            }}
          />
          {/* Main dashed line */}
          <motion.path
            d={path.d}
            fill="none"
            stroke="url(#lineGrad1)"
            strokeWidth="1.5"
            strokeDasharray="8 6"
            filter="url(#goldGlowLine)"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{
              duration: 1.5,
              delay: path.delay,
              ease: "easeInOut",
            }}
          />
        </g>
      ))}

      {/* Animated particles along paths */}
      {paths.map((path, i) => (
        <motion.circle
          key={`particle-${i}`}
          r="3"
          fill="#C6A84B"
          opacity={0.8}
          filter="url(#goldGlowLine)"
        >
          <motion.animateMotion
            dur="4s"
            begin={`${path.delay + 1.5}s`}
            repeatCount="indefinite"
            path={path.d}
          />
          <motion.animate
            attributeName="opacity"
            values="0;0.9;0.9;0"
            dur="4s"
            begin={`${path.delay + 1.5}s`}
            repeatCount="indefinite"
          />
        </motion.circle>
      ))}
    </svg>
  );
}

/* ─── Constellation Connector (Mobile — Vertical Curves) ────────── */

function ConstellationConnectorMobile() {
  const ref = useRef<SVGSVGElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  const paths = [
    { d: "M 50 120 C 30 160, 30 180, 50 220", delay: 0 },
    { d: "M 50 340 C 70 380, 70 400, 50 440", delay: 0.3 },
    { d: "M 50 560 C 30 600, 30 620, 50 660", delay: 0.6 },
  ];

  return (
    <svg
      ref={ref}
      className="absolute top-0 left-1/2 -translate-x-1/2 w-[100px] h-full lg:hidden pointer-events-none"
      viewBox="0 0 100 800"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="lineGradM" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="rgba(198,168,75,0.15)" />
          <stop offset="50%" stopColor="rgba(198,168,75,0.5)" />
          <stop offset="100%" stopColor="rgba(198,168,75,0.15)" />
        </linearGradient>
        <filter id="goldGlowLineM">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {paths.map((path, i) => (
        <g key={i}>
          <motion.path
            d={path.d}
            fill="none"
            stroke="rgba(198,168,75,0.08)"
            strokeWidth="3"
            filter="url(#goldGlowLineM)"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{
              duration: 1.5,
              delay: path.delay,
              ease: "easeInOut",
            }}
          />
          <motion.path
            d={path.d}
            fill="none"
            stroke="url(#lineGradM)"
            strokeWidth="1.5"
            strokeDasharray="6 5"
            filter="url(#goldGlowLineM)"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{
              duration: 1.5,
              delay: path.delay,
              ease: "easeInOut",
            }}
          />
          <motion.circle
            key={`mp-${i}`}
            r="2.5"
            fill="#C6A84B"
            opacity={0.7}
          >
            <motion.animateMotion
              dur="3.5s"
              begin={`${path.delay + 1.5}s`}
              repeatCount="indefinite"
              path={path.d}
            />
            <motion.animate
              attributeName="opacity"
              values="0;0.8;0.8;0"
              dur="3.5s"
              begin={`${path.delay + 1.5}s`}
              repeatCount="indefinite"
            />
          </motion.circle>
        </g>
      ))}
    </svg>
  );
}

/* ─── Process Node ──────────────────────────────────────────────── */

interface ProcessNodeProps {
  step: (typeof steps)[0];
  index: number;
}

function ProcessNode({ step, index }: ProcessNodeProps) {
  const Icon = step.icon;
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  // Alternate text position: even steps text below, odd steps text above
  const textPosition = index % 2 === 0 ? "below" : "above";

  return (
    <motion.div
      ref={ref}
      variants={staggerChildVariants}
      className="relative flex flex-col items-center"
    >
      {/* Text above (for odd steps) */}
      {textPosition === "above" && (
        <div className="text-center mb-6 lg:mb-8 max-w-[220px] lg:max-w-[260px] order-1 lg:order-none">
          <h3 className="font-display text-lg sm:text-xl font-bold text-brand-dark mb-2">
            {step.title}
          </h3>
          <p className="font-body text-brand-body text-sm leading-relaxed">
            {step.description}
          </p>
        </div>
      )}

      {/* The circular node */}
      <div className="relative order-2 lg:order-none">
        {/* Expanding pulse ring on hover (CSS-only) */}
        <div className="absolute inset-[-12px] rounded-full border border-brand-gold/0 group-hover:border-brand-gold/30 transition-all duration-500 pointer-events-none" />

        <motion.div
          className="relative group cursor-default"
          whileHover={{ scale: 1.08 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          {/* Animated rotating gold ring (conic-gradient) */}
          <div
            className="absolute -inset-[3px] rounded-full opacity-0"
            style={{
              background:
                "conic-gradient(from 0deg, transparent 0%, #C6A84B 25%, transparent 50%, #E4D49A 75%, transparent 100%)",
              animation: isInView
                ? "spin 3s linear infinite"
                : "none",
            }}
          />

          {/* Pulse ring on hover */}
          <div className="absolute -inset-[8px] rounded-full border-2 border-brand-gold/0 group-hover:border-brand-gold/20 transition-all duration-700 animate-[goldPulseRing_2s_ease-in-out_infinite] opacity-0 group-hover:opacity-100" />

          {/* Main circle */}
          <div
            className="relative w-20 h-20 sm:w-[100px] sm:h-[100px] lg:w-[130px] lg:h-[130px] rounded-full flex flex-col items-center justify-center overflow-hidden"
            style={{
              background:
                "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.95), rgba(249,248,245,0.9))",
              boxShadow:
                "0 8px 32px rgba(13,27,42,0.08), inset 0 1px 0 rgba(255,255,255,0.8), 0 0 0 1px rgba(198,168,75,0.15)",
            }}
          >
            {/* Inner subtle gold ring */}
            <div className="absolute inset-[2px] rounded-full border border-brand-gold/20" />

            {/* Step number */}
            <motion.span
              className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-brand-gold leading-none"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={
                isInView
                  ? { opacity: 1, scale: 1 }
                  : { opacity: 0, scale: 0.5 }
              }
              transition={{ duration: 0.6, delay: 0.3 + index * 0.15 }}
            >
              {step.number}
            </motion.span>

            {/* Icon */}
            <motion.div
              className="mt-1"
              initial={{ opacity: 0, y: 5 }}
              animate={
                isInView
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 5 }
              }
              transition={{ duration: 0.5, delay: 0.5 + index * 0.15 }}
            >
              <Icon
                className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-brand-gold/70"
                strokeWidth={1.75}
              />
            </motion.div>
          </div>
        </motion.div>

        {/* Animated rotating gold ring wrapper */}
        <motion.div
          className="absolute -inset-[3px] rounded-full pointer-events-none"
          initial={{ opacity: 0, rotate: 0 }}
          animate={
            isInView
              ? {
                  opacity: 1,
                  rotate: 360,
                }
              : { opacity: 0, rotate: 0 }
          }
          transition={{
            opacity: { duration: 0.6, delay: 0.2 + index * 0.15 },
            rotate: { duration: 8, repeat: Infinity, ease: "linear" },
          }}
          style={{
            background:
              "conic-gradient(from 0deg, transparent 0%, #C6A84B 15%, transparent 30%, #E4D49A 50%, transparent 65%, #C6A84B 85%, transparent 100%)",
            mask: "radial-gradient(farthest-side, transparent calc(100% - 2px), black calc(100% - 2px))",
            WebkitMask:
              "radial-gradient(farthest-side, transparent calc(100% - 2px), black calc(100% - 2px))",
          }}
        />
      </div>

      {/* Text below (for even steps) */}
      {textPosition === "below" && (
        <div className="text-center mt-6 lg:mt-8 max-w-[220px] lg:max-w-[260px] order-3 lg:order-none">
          <h3 className="font-display text-lg sm:text-xl font-bold text-brand-dark mb-2">
            {step.title}
          </h3>
          <p className="font-body text-brand-body text-sm leading-relaxed">
            {step.description}
          </p>
        </div>
      )}
    </motion.div>
  );
}

/* ─── Main Component ────────────────────────────────────────────── */

export function OurProcess() {
  return (
    <section
      id="process"
      className="relative bg-brand-cream bg-hexagonal py-20 md:py-28 overflow-hidden"
      aria-label="Our Process"
    >
      {/* Background section number */}
      <span className="section-number" aria-hidden="true">
        04
      </span>

      {/* Subtle top/bottom gold gradient lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-gold/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-gold/20 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-24">
          <ScrollReveal>
            <span className="label-premium mb-3 block">The IM Difference</span>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="heading-section-light">
              Your Journey With Us
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <div className="flex justify-center mt-5">
              <GoldLine width={80} />
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.3}>
            <p className="subheading-premium mt-5 max-w-2xl mx-auto">
              From your very first call to the final resolution, we provide unwavering support, crystal-clear communication, and relentless advocacy at every step.
            </p>
          </ScrollReveal>
        </div>

        {/* Desktop Constellation Layout */}
        <div className="relative hidden lg:block">
          {/* SVG connectors */}
          <ConstellationConnectorDesktop />

          {/* 4 nodes in a constellation arc */}
          <StaggerContainer
            className="relative grid grid-cols-4 gap-0 items-start pt-[180px]"
            staggerDelay={0.2}
          >
            {steps.map((step, index) => (
              <ProcessNode key={step.number} step={step} index={index} />
            ))}
          </StaggerContainer>
        </div>

        {/* Mobile/Tablet Vertical Constellation */}
        <div className="relative lg:hidden">
          {/* SVG vertical connectors */}
          <ConstellationConnectorMobile />

          <StaggerContainer
            className="relative flex flex-col items-center gap-10 sm:gap-14"
            staggerDelay={0.15}
          >
            {steps.map((step, index) => (
              <ProcessNode key={step.number} step={step} index={index} />
            ))}
          </StaggerContainer>
        </div>
      </div>

      {/* ── Accent Image Strip ── */}
      <ScrollReveal direction="up" delay={0.2}>
        <div className="mt-20 md:mt-28 relative max-w-4xl mx-auto">
          <div className="relative rounded-xl overflow-hidden shadow-lg group">
            <div className="aspect-[21/9] relative">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: "url('/images/hero-slide-collab-desk.jpg')" }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-brand-cream/90 via-brand-cream/50 to-brand-cream/90" />
              <div className="absolute inset-0 flex items-center justify-center px-8">
                <div className="text-center max-w-md">
                  <p className="font-display text-xl sm:text-2xl font-bold text-brand-dark mb-2">
                    From Consultation to Resolution
                  </p>
                  <p className="font-body text-sm text-brand-body leading-relaxed">
                    Every client&apos;s journey is unique. We adapt our approach to deliver the outcome you deserve.
                  </p>
                  <a
                    href="#contact"
                    onClick={(e) => {
                      e.preventDefault();
                      const el = document.querySelector("#contact");
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="inline-flex items-center gap-2 mt-4 font-body text-sm font-semibold text-brand-gold hover:text-brand-dark transition-colors group/link"
                  >
                    <span>Start Your Journey</span>
                    <span className="group-hover/link:translate-x-1 transition-transform">&rarr;</span>
                  </a>
                </div>
              </div>
            </div>
            <div className="absolute inset-0 rounded-xl border border-brand-gold/10 pointer-events-none" />
          </div>
        </div>
      </ScrollReveal>

      {/* Keyframe for goldPulseRing */}
      <style jsx>{`
        @keyframes goldPulseRing {
          0% {
            transform: scale(1);
            opacity: 0.3;
          }
          50% {
            transform: scale(1.3);
            opacity: 0;
          }
          100% {
            transform: scale(1);
            opacity: 0;
          }
        }
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </section>
  );
}
