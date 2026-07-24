"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Scale, Shield, Gavel, Building2, ArrowRight, Sparkles } from "lucide-react";
import {
  ScrollReveal,
  StaggerContainer,
  staggerChildVariants,
  CountUp,
  GoldLine,
} from "@/components/im/ScrollReveal";

/* ─── Data ──────────────────────────────────────────────────────── */

interface CaseResult {
  practice: string;
  icon: React.ElementType;
  title: string;
  outcome: string;
  result: string;
  numericValue: number;
  suffix: string;
  prefix: string;
  isMonetary: boolean;
  badgeColor: "green" | "gold";
}

const caseResults: CaseResult[] = [
  {
    practice: "Family Law",
    icon: Scale,
    title: "High-Net-Worth Divorce Settlement",
    outcome: "Comprehensive settlement across three provinces with international custody arrangements.",
    result: "R12.5M",
    numericValue: 12.5,
    suffix: "M",
    prefix: "R",
    isMonetary: true,
    badgeColor: "green",
  },
  {
    practice: "RAF Claims",
    icon: Shield,
    title: "Road Accident Fund Claim",
    outcome: "Maximum compensation for catastrophic injuries including future medical expenses.",
    result: "R8.2M",
    numericValue: 8.2,
    suffix: "M",
    prefix: "R",
    isMonetary: true,
    badgeColor: "green",
  },
  {
    practice: "Criminal Law",
    icon: Gavel,
    title: "Acquittal in Fraud Trial",
    outcome: "Full acquittal after defending against 47 counts over an 8-month trial.",
    result: "Acquitted",
    numericValue: 0,
    suffix: "",
    prefix: "",
    isMonetary: false,
    badgeColor: "gold",
  },
  {
    practice: "Commercial Law",
    icon: Building2,
    title: "Commercial Lease Dispute",
    outcome: "Favorable settlement in a R15M commercial lease dispute.",
    result: "R15M",
    numericValue: 15,
    suffix: "M",
    prefix: "R",
    isMonetary: true,
    badgeColor: "gold",
  },
  {
    practice: "Claims Against State",
    icon: Shield,
    title: "Wrongful Arrest Claim",
    outcome: "Substantial damages for wrongful arrest including trauma compensation.",
    result: "R2.8M",
    numericValue: 2.8,
    suffix: "M",
    prefix: "R",
    isMonetary: true,
    badgeColor: "green",
  },
  {
    practice: "General Litigation",
    icon: Scale,
    title: "Complex Debt Recovery",
    outcome: "Recovered outstanding debts across multiple jurisdictions.",
    result: "R4.5M",
    numericValue: 4.5,
    suffix: "M",
    prefix: "R",
    isMonetary: true,
    badgeColor: "gold",
  },
];

/* ─── Diamond Card ──────────────────────────────────────────────── */

function DiamondCard({
  caseData,
  index,
}: {
  caseData: CaseResult;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const Icon = caseData.icon;
  const isOdd = index % 2 === 1;

  return (
    <motion.div
      ref={ref}
      className="relative flex items-center justify-center"
      style={{
        width: "clamp(180px, 28vw, 240px)",
        height: "clamp(180px, 28vw, 240px)",
        marginTop: isOdd ? "clamp(-40px, -5vw, -60px)" : "0",
      }}
      initial={{ opacity: 0, scale: 0.5, rotate: 45 }}
      animate={
        isInView
          ? { opacity: 1, scale: 1, rotate: 45 }
          : { opacity: 0, scale: 0.5, rotate: 45 }
      }
      transition={{
        duration: 0.7,
        delay: index * 0.12,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      whileHover={{
        y: -12,
        transition: { duration: 0.35, ease: "easeOut" },
      }}
      aria-label={`${caseData.practice}: ${caseData.title} — ${caseData.result}`}
    >
      {/* Golden glow beneath on hover */}
      <motion.div
        className="absolute inset-0 rounded-sm"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(198,168,75,0.35) 0%, rgba(198,168,75,0.1) 50%, transparent 80%)",
          filter: "blur(18px)",
          transform: "rotate(45deg)",
        }}
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.35 }}
      />

      {/* Diamond container (rotated 45deg) */}
      <motion.div
        className="relative w-full h-full cursor-pointer"
        style={{ transform: "rotate(45deg)" }}
        whileHover={{
          boxShadow:
            "0 0 40px rgba(198,168,75,0.3), 0 0 80px rgba(198,168,75,0.1), inset 0 0 30px rgba(198,168,75,0.05)",
        }}
        transition={{ duration: 0.35 }}
      >
        {/* Gold shimmer border on hover */}
        <motion.div
          className="absolute inset-0 rounded-sm overflow-hidden"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.35 }}
        >
          <div
            className="absolute rounded-sm"
            style={{
              inset: "-2px",
              background:
                "conic-gradient(from 0deg, #C6A84B, #E4D49A, #C6A84B, #E4D49A, #C6A84B)",
            }}
          />
        </motion.div>

        {/* Diamond face */}
        <div
          className="relative w-full h-full rounded-sm overflow-hidden flex items-center justify-center"
          style={{
            background:
              "linear-gradient(135deg, rgba(26,50,80,0.85) 0%, rgba(13,27,42,0.95) 50%, rgba(26,50,80,0.85) 100%)",
            border: "1px solid rgba(198,168,75,0.3)",
          }}
        >
          {/* Counter-rotated content */}
          <motion.div
            className="flex flex-col items-center justify-center text-center px-3"
            style={{ transform: "rotate(-45deg)" }}
            whileHover={{ scale: 1.06 }}
            transition={{ duration: 0.3 }}
          >
            {/* Practice area icon */}
            <div
              className="mb-1.5 flex h-7 w-7 items-center justify-center rounded-full"
              style={{
                background: "rgba(198,168,75,0.15)",
                border: "1px solid rgba(198,168,75,0.4)",
              }}
            >
              <Icon
                className="h-3.5 w-3.5"
                style={{ color: "#C6A84B" }}
                strokeWidth={1.8}
              />
            </div>

            {/* Practice area name */}
            <span
              className="text-[9px] sm:text-[10px] font-semibold uppercase tracking-widest mb-1"
              style={{ color: "#E4D49A" }}
            >
              {caseData.practice}
            </span>

            {/* Divider line */}
            <div
              className="w-8 h-px mb-1.5"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(198,168,75,0.6), transparent)",
              }}
            />

            {/* Case title */}
            <span
              className="font-body text-[11px] sm:text-xs font-medium leading-tight mb-1.5"
              style={{ color: "rgba(239,232,220,0.9)" }}
            >
              {caseData.title}
            </span>

            {/* Result amount — large gold text */}
            {caseData.isMonetary ? (
              <span
                className="font-display font-bold text-base sm:text-lg"
                style={{
                  background: "linear-gradient(135deg, #C6A84B, #E4D49A, #C6A84B)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {caseData.prefix}
                <CountUp
                  end={caseData.numericValue}
                  suffix={caseData.suffix}
                  prefix=""
                  duration={2.2}
                  className="font-display font-bold text-base sm:text-lg"
                  // Override color with inline style via wrapper
                />
                {!isInView && `${caseData.prefix}0${caseData.suffix}`}
              </span>
            ) : (
              <span
                className="font-body text-sm font-bold"
                style={{ color: "#C6A84B" }}
              >
                {caseData.result}
              </span>
            )}

            {/* Badge pill */}
            <div
              className="mt-1.5 flex items-center gap-1 rounded-full px-2 py-0.5 text-[8px] font-bold uppercase tracking-wider"
              style={{
                background:
                  caseData.badgeColor === "green"
                    ? "rgba(34,197,94,0.15)"
                    : "rgba(198,168,75,0.15)",
                border: `1px solid ${
                  caseData.badgeColor === "green"
                    ? "rgba(34,197,94,0.4)"
                    : "rgba(198,168,75,0.4)"
                }`,
                color:
                  caseData.badgeColor === "green" ? "#4ade80" : "#E4D49A",
              }}
            >
              <Sparkles className="h-2 w-2" />
              {caseData.badgeColor === "green" ? "Awarded" : "Resolved"}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── Main Component ────────────────────────────────────────────── */

export function CaseResults() {
  const scrollToContact = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const el = document.querySelector("#contact");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="case-results"
      className="relative w-full overflow-hidden py-24 sm:py-32"
      style={{ backgroundColor: "#0D1B2A" }}
      aria-label="Notable Case Results"
    >
      {/* ── Noise texture overlay ── */}
      <div className="noise-overlay absolute inset-0 pointer-events-none z-[1]" />

      {/* ── Subtle diagonal gold lines ── */}
      <div className="absolute inset-0 pointer-events-none z-[1] opacity-[0.03]">
        <svg
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id="diagonal-gold"
              patternUnits="userSpaceOnUse"
              width="80"
              height="80"
              patternTransform="rotate(45)"
            >
              <line
                x1="0"
                y1="0"
                x2="0"
                y2="80"
                stroke="#C6A84B"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#diagonal-gold)" />
        </svg>
      </div>

      {/* ── Top gold accent line ── */}
      <div
        className="absolute top-0 left-0 right-0 h-px z-10"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(198,168,75,0.4), transparent)",
        }}
      />

      {/* ── Radial glow accents ── */}
      <div
        className="absolute pointer-events-none z-[1]"
        style={{
          top: "10%",
          right: "-10%",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(198,168,75,0.06) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute pointer-events-none z-[1]"
        style={{
          bottom: "10%",
          left: "-10%",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(198,168,75,0.04) 0%, transparent 70%)",
        }}
      />

      {/* ── Content ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── Section Header ── */}
        <ScrollReveal className="text-center mb-16 sm:mb-24">
          <div className="flex flex-col items-center">
            <span className="label-premium mb-4 block">Case Studies</span>
            <h2 className="heading-section">
              Notable Case Results
            </h2>
            <p className="subheading-premium-dark mt-4">
              Real cases. Real outcomes. Real justice. Explore a selection of matters where our strategic expertise turned the tide in our clients' favour.
            </p>
          </div>
        </ScrollReveal>

        {/* ── Diamond Mosaic Grid ── */}
        {/* Desktop: 3 per row, Tablet: 2 per row, Mobile: 1 per row */}
        <div className="flex flex-col items-center gap-2 sm:gap-4">
          {/* Row 1: 3 diamonds (desktop), 2 (tablet), 1 (mobile) */}
          <div className="flex flex-wrap justify-center gap-6 sm:gap-8 lg:gap-10">
            {caseResults.slice(0, 3).map((caseData, i) => (
              <DiamondCard key={caseData.title} caseData={caseData} index={i} />
            ))}
          </div>

          {/* Row 2: 3 diamonds (desktop), 2 (tablet), 1 (mobile) — offset */}
          <div
            className="flex flex-wrap justify-center gap-6 sm:gap-8 lg:gap-10"
            style={{ marginTop: "clamp(-60px, -8vw, -80px)" }}
          >
            {caseResults.slice(3, 6).map((caseData, i) => (
              <DiamondCard
                key={caseData.title}
                caseData={caseData}
                index={i + 3}
              />
            ))}
          </div>
        </div>

        {/* ── Bottom CTA ── */}
        <ScrollReveal className="mt-16 sm:mt-24">
          <div className="flex flex-col items-center text-center gap-5">
            <p
              className="font-body text-base sm:text-lg"
              style={{ color: "rgba(239,232,220,0.6)" }}
            >
              Every case is unique. Let us discuss yours.
            </p>
            <a
              href="#contact"
              className="btn-premium"
              onClick={scrollToContact}
            >
              <span>Request a Case Evaluation</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </ScrollReveal>

        {/* ── Gold ornament line ── */}
        <div className="mt-16 sm:mt-20">
          <div
            className="h-px mx-auto max-w-xs"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(198,168,75,0.5), transparent)",
            }}
          />
          <div className="flex justify-center mt-2">
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M6 0L12 6L6 12L0 6L6 0Z"
                fill="rgba(198,168,75,0.3)"
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
