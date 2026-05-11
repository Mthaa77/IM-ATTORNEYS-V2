"use client";

import { motion, useMotionValue, useTransform, useInView, animate } from "framer-motion";
import { useRef, useCallback, useState, useEffect } from "react";
import {
  MessageSquare,
  TrendingUp,
  Clock,
  Shield,
  Eye,
  CreditCard,
  Receipt,
  CheckCircle,
  ArrowRight,
  Star,
  Sparkles,
} from "lucide-react";
import {
  ScrollReveal,
  StaggerContainer,
  staggerChildVariants,
  GoldLine,
} from "@/components/im/ScrollReveal";

/* ─── Data ─── */
const pricingTiers = [
  {
    title: "Contingency Fees",
    icon: TrendingUp,
    value: "No Win, No Fee",
    description:
      "For certain personal injury and RAF claims, we work on contingency — you only pay if we win your case.",
    bullets: [
      "RAF claims",
      "Personal injury",
      "No upfront costs",
      "Percentage of settlement",
    ],
    isNoWin: true,
  },
  {
    title: "Hourly Billing",
    icon: Clock,
    value: "Competitive Rates",
    description:
      "For litigation and commercial matters, we offer competitive hourly rates with detailed monthly statements.",
    bullets: [
      "Detailed invoices",
      "Monthly statements",
      "No hidden charges",
      "Rate agreed upfront",
    ],
    isNoWin: false,
  },
];

const trustItems = [
  { icon: Shield, label: "Free Assessment" },
  { icon: Eye, label: "No Hidden Fees" },
  { icon: CreditCard, label: "Flexible Payment" },
  { icon: Receipt, label: "Detailed Invoicing" },
];

/* ─── Animated Conic Gradient Border Circle ─── */
function OrbitCircle({
  children,
  size = 300,
  isNoWin = false,
  delay = 0,
}: {
  children: React.ReactNode;
  size?: number;
  isNoWin?: boolean;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const borderColor = isNoWin
    ? "from-green-600/40 via-amber-400/40 to-green-600/40"
    : "from-brand-gold/40 via-brand-gold-light/60 to-brand-gold/40";

  const glowColor = isNoWin
    ? "rgba(34,197,94,0.2)"
    : "rgba(198,168,75,0.2)";

  return (
    <motion.div
      ref={ref}
      className="relative flex-shrink-0"
      initial={{ opacity: 0, scale: 0.6 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.6 }}
      transition={{ duration: 0.8, delay, ease: "easeOut" }}
    >
      {/* Outer rotating ring */}
      <div
        className="absolute rounded-full animate-spin"
        style={{
          inset: -2,
          background: `conic-gradient(from 0deg, transparent 0%, ${
            isNoWin ? "rgba(34,197,94,0.5)" : "rgba(198,168,75,0.5)"
          } 25%, transparent 50%, ${
            isNoWin ? "rgba(228,212,154,0.4)" : "rgba(198,168,75,0.4)"
          } 75%, transparent 100%)`,
          animationDuration: "8s",
        }}
      />

      {/* Static outer border ring */}
      <div
        className="absolute rounded-full"
        style={{
          inset: -1,
          border: `1px solid ${isNoWin ? "rgba(34,197,94,0.3)" : "rgba(198,168,75,0.3)"}`,
        }}
      />

      {/* Main circle content */}
      <div
        className="relative rounded-full overflow-hidden flex items-center justify-center"
        style={{
          width: size,
          height: size,
          background: `radial-gradient(circle at 30% 30%, ${
            isNoWin
              ? "rgba(20,40,60,0.85)"
              : "rgba(26,50,80,0.85)"
          }, rgba(13,27,42,0.95))`,
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          boxShadow: `0 0 40px ${glowColor}, inset 0 0 30px rgba(0,0,0,0.2)`,
          border: `1px solid ${isNoWin ? "rgba(34,197,94,0.2)" : "rgba(198,168,75,0.2)"}`,
        }}
      >
        {children}
      </div>
    </motion.div>
  );
}

/* ─── Pricing Tier Content ─── */
function TierContent({
  tier,
  isNoWin,
}: {
  tier: (typeof pricingTiers)[0];
  isNoWin: boolean;
}) {
  const Icon = tier.icon;
  const accentColor = isNoWin ? "#4ade80" : "#C6A84B";

  return (
    <div className="flex flex-col items-center text-center px-5 py-4 h-full justify-center">
      {/* Icon */}
      <div
        className="w-10 h-10 rounded-full flex items-center justify-center mb-3"
        style={{
          background: isNoWin
            ? "rgba(34,197,94,0.12)"
            : "rgba(198,168,75,0.12)",
          border: `1px solid ${isNoWin ? "rgba(34,197,94,0.25)" : "rgba(198,168,75,0.25)"}`,
        }}
      >
        <Icon className="w-5 h-5" style={{ color: accentColor }} />
      </div>

      {/* Value */}
      <p
        className="font-display text-base lg:text-lg font-bold mb-1"
        style={{ color: accentColor }}
      >
        {tier.value}
      </p>

      {/* Title */}
      <h3
        className="font-display text-sm lg:text-base font-semibold mb-2"
        style={{ color: "#E4D49A" }}
      >
        {tier.title}
      </h3>

      {/* Bullets */}
      <ul className="space-y-1.5">
        {tier.bullets.map((bullet) => (
          <li key={bullet} className="flex items-center gap-1.5">
            <CheckCircle
              className="w-3 h-3 shrink-0"
              style={{ color: accentColor }}
            />
            <span
              className="text-xs leading-snug"
              style={{ color: "rgba(240,237,232,0.7)" }}
            >
              {bullet}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ─── Center Hub (Complimentary Consultation) ─── */
function CenterHub() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const angle = useMotionValue(0);

  useEffect(() => {
    const controls = animate(angle, 360, {
      duration: 20,
      repeat: Infinity,
      ease: "linear",
    });
    return () => controls.stop();
  }, [angle]);

  return (
    <motion.div
      ref={ref}
      className="relative flex-shrink-0"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
      transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
    >
      {/* Pulsing outer ring */}
      <div
        className="absolute rounded-full animate-ping"
        style={{
          inset: -8,
          border: "2px solid rgba(198,168,75,0.3)",
          animationDuration: "3s",
        }}
      />

      {/* Second pulsing ring */}
      <div
        className="absolute rounded-full"
        style={{
          inset: -4,
          border: "1px solid rgba(198,168,75,0.2)",
          animation: "goldPulseRing 3s ease-out infinite",
        }}
      />

      {/* Rotating dashed border */}
      <motion.div
        className="absolute rounded-full"
        style={{
          inset: -2,
          rotate: angle,
          border: "2px dashed rgba(198,168,75,0.25)",
        }}
      />

      {/* Main hub */}
      <div
        className="relative rounded-full overflow-hidden flex flex-col items-center justify-center text-center px-8 py-6"
        style={{
          width: 220,
          height: 220,
          background:
            "radial-gradient(circle at 40% 35%, rgba(42,74,112,0.9), rgba(13,27,42,0.98))",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          boxShadow:
            "0 0 60px rgba(198,168,75,0.2), 0 0 120px rgba(198,168,75,0.06), inset 0 0 40px rgba(0,0,0,0.3)",
          border: "2px solid rgba(198,168,75,0.35)",
        }}
      >
        {/* Star icon */}
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center mb-3"
          style={{
            background: "rgba(198,168,75,0.12)",
            border: "1px solid rgba(198,168,75,0.3)",
          }}
        >
          <MessageSquare className="w-7 h-7" style={{ color: "#C6A84B" }} />
        </div>

        <p
          className="font-display text-xl lg:text-2xl font-bold leading-tight"
          style={{ color: "#C6A84B" }}
        >
          Complimentary
        </p>
        <p
          className="font-display text-xl lg:text-2xl font-bold leading-tight mb-2"
          style={{ color: "#E4D49A" }}
        >
          Consultation
        </p>
        <p
          className="text-xs leading-relaxed"
          style={{ color: "rgba(240,237,232,0.55)" }}
        >
          Your first 30-minute consultation is absolutely free
        </p>
      </div>
    </motion.div>
  );
}

/* ─── Trust Satellite Dot ─── */
function TrustSatellite({
  item,
  index,
  total,
  orbitRadius,
}: {
  item: (typeof trustItems)[0];
  index: number;
  total: number;
  orbitRadius: number;
}) {
  const Icon = item.icon;
  const angle = (index / total) * 360 - 90;
  const radian = (angle * Math.PI) / 180;
  const x = Math.cos(radian) * orbitRadius;
  const y = Math.sin(radian) * orbitRadius;
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      className="absolute flex flex-col items-center gap-1"
      style={{
        left: `calc(50% + ${x}px)`,
        top: `calc(50% + ${y}px)`,
        transform: "translate(-50%, -50%)",
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
      transition={{ duration: 0.5, delay: 0.8 + index * 0.15 }}
    >
      <div
        className="w-9 h-9 rounded-full flex items-center justify-center"
        style={{
          background: "rgba(13,27,42,0.9)",
          border: "1px solid rgba(198,168,75,0.3)",
          boxShadow: "0 0 12px rgba(198,168,75,0.1)",
        }}
      >
        <Icon className="w-4 h-4" style={{ color: "#C6A84B" }} />
      </div>
      <span
        className="text-[10px] sm:text-xs font-semibold whitespace-nowrap"
        style={{ color: "rgba(228,212,154,0.8)" }}
      >
        {item.label}
      </span>
    </motion.div>
  );
}

/* ─── Mobile Vertical Stack ─── */
function MobileLayout() {
  return (
    <div className="flex flex-col items-center gap-8 lg:hidden">
      {/* Contingency */}
      <OrbitCircle size={220} isNoWin delay={0.3}>
        <TierContent tier={pricingTiers[0]} isNoWin />
      </OrbitCircle>

      {/* Vertical connector */}
      <div className="flex flex-col items-center gap-1" aria-hidden="true">
        <div
          className="w-px h-8"
          style={{
            background: "linear-gradient(180deg, rgba(34,197,94,0.3), rgba(198,168,75,0.3))",
          }}
        />
        <div
          className="w-2 h-2 rotate-45"
          style={{ background: "#C6A84B", opacity: 0.4 }}
        />
        <div
          className="w-px h-8"
          style={{
            background: "linear-gradient(180deg, rgba(198,168,75,0.3), rgba(198,168,75,0.3))",
          }}
        />
      </div>

      {/* Center Hub */}
      <CenterHub />

      {/* Vertical connector */}
      <div className="flex flex-col items-center gap-1" aria-hidden="true">
        <div
          className="w-px h-8"
          style={{
            background: "linear-gradient(180deg, rgba(198,168,75,0.3), rgba(198,168,75,0.3))",
          }}
        />
        <div
          className="w-2 h-2 rotate-45"
          style={{ background: "#C6A84B", opacity: 0.4 }}
        />
        <div
          className="w-px h-8"
          style={{
            background: "linear-gradient(180deg, rgba(198,168,75,0.3), rgba(198,168,75,0.5))",
          }}
        />
      </div>

      {/* Hourly */}
      <OrbitCircle size={220} delay={0.5}>
        <TierContent tier={pricingTiers[1]} isNoWin={false} />
      </OrbitCircle>

      {/* Trust items as horizontal row */}
      <div className="flex flex-wrap items-center justify-center gap-4 mt-4">
        {trustItems.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.label}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full"
              style={{
                background: "rgba(198,168,75,0.06)",
                border: "1px solid rgba(198,168,75,0.12)",
              }}
            >
              <Icon className="w-3.5 h-3.5" style={{ color: "#C6A84B" }} />
              <span
                className="text-xs font-semibold"
                style={{ color: "rgba(228,212,154,0.8)" }}
              >
                {item.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ─── Desktop Constellation Layout ─── */
function DesktopLayout() {
  return (
    <div className="hidden lg:flex items-center justify-center relative" style={{ minHeight: 640 }}>
      {/* Contingency Fees — left orbit */}
      <div className="absolute" style={{ left: "calc(50% - 340px)", top: "50%", transform: "translateY(-50%)" }}>
        <OrbitCircle size={260} isNoWin delay={0.3}>
          <TierContent tier={pricingTiers[0]} isNoWin />
        </OrbitCircle>
      </div>

      {/* Hourly Billing — right orbit */}
      <div className="absolute" style={{ right: "calc(50% - 340px)", top: "50%", transform: "translateY(-50%)" }}>
        <OrbitCircle size={260} delay={0.5}>
          <TierContent tier={pricingTiers[1]} isNoWin={false} />
        </OrbitCircle>
      </div>

      {/* Animated dashed gold lines connecting tiers to center */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        aria-hidden="true"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Left line */}
        <motion.line
          x1="50%"
          y1="50%"
          x2="22%"
          y2="50%"
          stroke="rgba(198,168,75,0.2)"
          strokeWidth="1.5"
          strokeDasharray="8 6"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.8 }}
        />
        {/* Right line */}
        <motion.line
          x1="50%"
          y1="50%"
          x2="78%"
          y2="50%"
          stroke="rgba(198,168,75,0.2)"
          strokeWidth="1.5"
          strokeDasharray="8 6"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.2, delay: 1.0 }}
        />
        {/* Animated dot traveling on left line */}
        <motion.circle
          r="3"
          fill="#C6A84B"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.8, 0] }}
          transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
        >
          <animateMotion
            dur="3s"
            repeatCount="indefinite"
            path="M620,320 L195,320"
            begin="1.5s"
          />
        </motion.circle>
        {/* Animated dot traveling on right line */}
        <motion.circle
          r="3"
          fill="#C6A84B"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.8, 0] }}
          transition={{ duration: 3, repeat: Infinity, delay: 2.5 }}
        >
          <animateMotion
            dur="3s"
            repeatCount="indefinite"
            path="M680,320 L1105,320"
            begin="2.5s"
          />
        </motion.circle>
      </svg>

      {/* Center Hub */}
      <div className="relative z-10">
        <CenterHub />
      </div>

      {/* Trust satellite dots orbiting around the constellation */}
      <div className="absolute inset-0" style={{ width: 760, height: 640, left: "50%", top: "50%", transform: "translate(-50%, -50%)" }}>
        {trustItems.map((item, index) => (
          <TrustSatellite
            key={item.label}
            item={item}
            index={index}
            total={trustItems.length}
            orbitRadius={310}
          />
        ))}
      </div>
    </div>
  );
}

/* ─── Ornamental Divider ─── */
function OrnamentalDivider() {
  return (
    <div className="flex items-center justify-center gap-3 mt-2 mb-6" aria-hidden="true">
      <div
        className="h-px w-12 sm:w-16"
        style={{ background: "linear-gradient(90deg, transparent, rgba(198,168,75,0.5))" }}
      />
      <div
        className="w-2 h-2 rotate-45"
        style={{ background: "#C6A84B", opacity: 0.6 }}
      />
      <div className="h-px w-1" style={{ background: "rgba(198,168,75,0.3)" }} />
      <div
        className="w-1.5 h-1.5 rotate-45"
        style={{ background: "#C6A84B", opacity: 0.4 }}
      />
      <div className="h-px w-1" style={{ background: "rgba(198,168,75,0.3)" }} />
      <div
        className="w-2 h-2 rotate-45"
        style={{ background: "#C6A84B", opacity: 0.6 }}
      />
      <div
        className="h-px w-12 sm:w-16"
        style={{ background: "linear-gradient(270deg, transparent, rgba(198,168,75,0.5))" }}
      />
    </div>
  );
}

/* ─── Main Component ─── */
export function FeesAndBilling() {
  return (
    <section
      id="fees"
      className="relative py-20 sm:py-28 lg:py-36 overflow-hidden"
      style={{ background: "#0D1B2A" }}
      aria-labelledby="fees-heading"
    >
      {/* Subtle background effects */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundImage: `radial-gradient(ellipse at 30% 50%, rgba(198,168,75,0.04) 0%, transparent 50%),
                           radial-gradient(ellipse at 70% 50%, rgba(198,168,75,0.04) 0%, transparent 50%)`,
        }}
      />

      {/* Top gold accent */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(198,168,75,0.3), transparent)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── Heading Area ── */}
        <div className="text-center mb-12 sm:mb-16">
          <ScrollReveal direction="up" delay={0}>
            <span className="label-premium mb-4 block">Pricing</span>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.1}>
            <h2
              id="fees-heading"
              className="heading-gold-glossy"
            >
              Transparent Pricing
            </h2>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.15}>
            <OrnamentalDivider />
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.2}>
            <p className="subheading-premium-dark">
              Transparency isn't just our policy — it's our principle. Know exactly what to expect before you commit, with no hidden fees and no unpleasant surprises.
            </p>
          </ScrollReveal>
        </div>

        {/* ── Constellation Layout ── */}
        <MobileLayout />
        <DesktopLayout />

        {/* ── Famous Quote ── */}
        <ScrollReveal direction="up" delay={0.3}>
          <div className="mt-14 sm:mt-16 lg:mt-20 max-w-3xl mx-auto text-center">
            <blockquote>
              <p
                className="font-display text-lg sm:text-xl md:text-2xl lg:text-3xl italic leading-snug"
                style={{ color: "#C6A84B" }}
              >
                &ldquo;Your first consultation is always complimentary — because
                understanding your legal position should never come at a
                cost.&rdquo;
              </p>
              <footer className="mt-4">
                <cite
                  className="font-body text-sm font-semibold not-italic tracking-wide"
                  style={{ color: "rgba(228,212,154,0.6)" }}
                >
                  — Ingrid Mtsweni, Founding Attorney
                </cite>
              </footer>
            </blockquote>
          </div>
        </ScrollReveal>

        {/* ── CTA Section ── */}
        <ScrollReveal direction="up" delay={0.35}>
          <div className="mt-10 sm:mt-12 text-center max-w-xl mx-auto">
            <a
              href="#contact"
              className="btn-premium"
              onClick={(e) => {
                e.preventDefault();
                const el = document.querySelector("#contact");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <span>Request a Fee Quote</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </ScrollReveal>
      </div>

      {/* Bottom gold accent */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(198,168,75,0.3), transparent)",
        }}
      />
    </section>
  );
}
