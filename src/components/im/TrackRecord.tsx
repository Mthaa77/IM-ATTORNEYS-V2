"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import {
  Trophy,
  TrendingUp,
  Scale,
  Award,
  Clock,
  Users,
  Star,
  ShieldCheck,
  Target,
  Zap,
  ChevronRight,
} from "lucide-react";
import {
  ScrollReveal,
  StaggerContainer,
  staggerChildVariants,
  CountUp,
  GoldLine,
} from "@/components/im/ScrollReveal";

/* ══════════════════════════════════════════════════════════════════════
   DATA
   ══════════════════════════════════════════════════════════════════════ */

const heroMetrics = [
  { value: 2500, suffix: "+", prefix: "", label: "Cases Handled", icon: Scale, description: "Successfully resolved across all practice areas" },
  { value: 98, suffix: "%", prefix: "", label: "Success Rate", icon: TrendingUp, description: "Consistent results our clients can count on" },
  { value: 50, suffix: "M+", prefix: "R", label: "Recovered for Clients", icon: Award, description: "In settlements, judgments, and awards" },
  { value: 15, suffix: "+", prefix: "", label: "Court Appearances Monthly", icon: ShieldCheck, description: "Active presence in courts across Gauteng" },
];

const practiceAreaStats = [
  { name: "Wills & Estates", rate: 99, cases: "180+", icon: Target },
  { name: "Commercial Law", rate: 98, cases: "420+", icon: Trophy },
  { name: "Family Law", rate: 97, cases: "650+", icon: Star },
  { name: "Criminal Law", rate: 96, cases: "380+", icon: ShieldCheck },
  { name: "Claims vs State", rate: 95, cases: "520+", icon: Scale },
  { name: "General Litigation", rate: 94, cases: "350+", icon: Zap },
];

const milestones = [
  { year: "2023", event: "IM Attorneys Inc founded", detail: "Established with a vision for accessible, world-class legal representation" },
  { year: "2024", event: "100th successful case", detail: "Reached our first century of victories across all practice areas" },
  { year: "2024", event: "BBBEE Level 1 Certified", detail: "Achieved the highest level of broad-based black economic empowerment" },
  { year: "2025", event: "R50M milestone recovered", detail: "Over R50 million recovered for clients in settlements and judgments" },
];

/* ══════════════════════════════════════════════════════════════════════
   ANIMATION VARIANTS
   ══════════════════════════════════════════════════════════════════════ */

const fadeUp = {
  hidden: { opacity: 0, y: 25 },
  visible: (d: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: d, ease: [0.22, 1, 0.36, 1] },
  }),
};

/* ══════════════════════════════════════════════════════════════════════
   METRIC HERO CARD
   ══════════════════════════════════════════════════════════════════════ */

function MetricHeroCard({ metric, index }: { metric: typeof heroMetrics[number]; index: number }) {
  const Icon = metric.icon;
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-30px" });
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      className="group relative p-6 sm:p-8 rounded-xl overflow-hidden transition-all duration-500 hover:-translate-y-1 cursor-default"
      style={{
        background: isHovered ? "rgba(198,168,75,0.06)" : "rgba(198,168,75,0.02)",
        border: `1px solid ${isHovered ? "rgba(198,168,75,0.2)" : "rgba(198,168,75,0.07)"}`,
      }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.12, duration: 0.6 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Hover glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(198,168,75,0.08) 0%, transparent 70%)" }}
      />

      <div className="relative z-10">
        <div
          className="w-11 h-11 rounded-lg flex items-center justify-center mb-5 transition-all duration-300"
          style={{
            background: isHovered ? "rgba(198,168,75,0.12)" : "rgba(198,168,75,0.06)",
            border: `1px solid ${isHovered ? "rgba(198,168,75,0.25)" : "rgba(198,168,75,0.1)"}`,
          }}
        >
          <Icon className="w-5 h-5 text-brand-gold/70 group-hover:text-brand-gold transition-colors" strokeWidth={1.5} />
        </div>

        <div className="flex items-baseline gap-0.5 mb-2">
          {metric.prefix && (
            <span className="font-display text-xl font-bold text-brand-gold/50">{metric.prefix}</span>
          )}
          <CountUp
            end={metric.value}
            suffix={metric.suffix}
            duration={2.5}
            className="font-display text-4xl sm:text-5xl font-black text-gold-gradient"
          />
        </div>

        <h3 className="font-body text-sm font-semibold text-white/80 mb-1.5">
          {metric.label}
        </h3>
        <p className="font-body text-xs text-white/30 leading-relaxed">
          {metric.description}
        </p>
      </div>

      {/* Bottom gold accent on hover */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-px bg-brand-gold/40 group-hover:w-3/4 transition-all duration-500" />
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   PRACTICE AREA PROGRESS BAR
   ══════════════════════════════════════════════════════════════════════ */

function PracticeAreaBar({ area, index }: { area: typeof practiceAreaStats[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-20px" });
  const Icon = area.icon;

  return (
    <motion.div
      ref={ref}
      className="group relative"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
    >
      <div className="flex items-center gap-4 mb-2">
        <div className="w-8 h-8 rounded-md flex items-center justify-center flex-shrink-0 transition-all duration-300"
          style={{
            background: "rgba(198,168,75,0.06)",
            border: "1px solid rgba(198,168,75,0.1)",
          }}
        >
          <Icon className="w-4 h-4 text-brand-gold/60" strokeWidth={1.5} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1.5">
            <span className="font-body text-sm font-medium text-white/70 truncate">{area.name}</span>
            <span className="font-body text-xs font-bold text-brand-gold tabular-nums">{area.rate}%</span>
          </div>
          <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(198,168,75,0.08)" }}>
            <motion.div
              className="h-full rounded-full"
              style={{ background: "linear-gradient(90deg, #C6A84B, #E4D49A)" }}
              initial={{ width: 0 }}
              whileInView={{ width: `${area.rate}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, delay: index * 0.1 + 0.2, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
        </div>
        <span className="font-body text-[11px] text-white/25 flex-shrink-0 w-12 text-right tabular-nums">
          {area.cases}
        </span>
      </div>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   MILESTONE CARD
   ══════════════════════════════════════════════════════════════════════ */

function MilestoneCard({ milestone, index }: { milestone: typeof milestones[number]; index: number }) {
  return (
    <motion.div
      className="relative p-5 rounded-xl transition-all duration-400 hover:-translate-y-0.5 group"
      style={{
        background: "rgba(198,168,75,0.02)",
        border: "1px solid rgba(198,168,75,0.06)",
      }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.12, duration: 0.5 }}
      whileHover={{
        borderColor: "rgba(198,168,75,0.18)",
        background: "rgba(198,168,75,0.04)",
      }}
    >
      <div className="flex items-start gap-4">
        <div
          className="flex-shrink-0 w-14 h-14 rounded-lg flex flex-col items-center justify-center"
          style={{
            background: "linear-gradient(135deg, rgba(198,168,75,0.1), rgba(198,168,75,0.04))",
            border: "1px solid rgba(198,168,75,0.15)",
          }}
        >
          <Clock className="w-4 h-4 text-brand-gold/50 mb-0.5" strokeWidth={1.5} />
          <span className="font-display text-sm font-bold text-brand-gold">{milestone.year}</span>
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-display text-base font-bold text-white/85 mb-1 group-hover:text-brand-gold transition-colors duration-300">
            {milestone.event}
          </h4>
          <p className="font-body text-xs text-white/35 leading-relaxed">
            {milestone.detail}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ══════════════════════════════════════════════════════════════════════ */

export function TrackRecord() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-60px" });

  return (
    <section
      ref={sectionRef}
      id="track-record"
      className="relative w-full overflow-hidden"
      style={{ backgroundColor: "#0D1B2A" }}
      aria-label="Our Track Record"
    >
      {/* ── Background ── */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] pointer-events-none"
          style={{ background: "radial-gradient(ellipse at center, rgba(198,168,75,0.04) 0%, transparent 60%)" }}
        />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] pointer-events-none"
          style={{ background: "radial-gradient(ellipse at center, rgba(198,168,75,0.03) 0%, transparent 60%)" }}
        />
        <div className="absolute inset-0 noise-overlay opacity-[0.02]" />
      </div>

      {/* ── Top separator ── */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-px z-10"
        style={{ background: "linear-gradient(90deg, transparent 0%, rgba(198,168,75,0.3) 30%, rgba(198,168,75,0.5) 50%, rgba(198,168,75,0.3) 70%, transparent 100%)" }}
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-36">
        {/* ═══════ Section Header ═══════ */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-20">
          <motion.span
            className="font-body text-[11px] sm:text-xs uppercase tracking-[0.3em] text-brand-gold/80 mb-5 block"
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            custom={0.1}
          >
            Our Track Record
          </motion.span>

          <motion.div
            className="h-px bg-gradient-to-r from-transparent via-brand-gold/60 to-transparent mx-auto mb-8 max-w-[120px]"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />

          <motion.h2
            className="heading-section mb-6"
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            custom={0.3}
          >
            Numbers That Speak Volumes
          </motion.h2>

          <motion.p
            className="font-body text-base sm:text-lg text-white/45 max-w-2xl mx-auto leading-relaxed"
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            custom={0.45}
          >
            Behind every statistic is a real person whose life, livelihood, or legacy we fought to protect. Our numbers reflect an unwavering commitment to justice and the tangible outcomes we deliver every day.
          </motion.p>
        </div>

        {/* ═══════ Hero Metrics Grid ═══════ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-16 sm:mb-24">
          {heroMetrics.map((metric, i) => (
            <MetricHeroCard key={metric.label} metric={metric} index={i} />
          ))}
        </div>

        {/* ═══════ Two-Column: Practice Area Stats + Image ═══════ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start mb-16 sm:mb-24">
          {/* Left: Practice Area Stats */}
          <div className="lg:col-span-7">
            <ScrollReveal>
              <div className="flex items-center gap-3 mb-6">
                <div className="h-8 w-1 rounded-full bg-brand-gold" />
                <h3 className="heading-gold-glossy text-xl sm:text-2xl">
                  Success Across Every Practice Area
                </h3>
              </div>
            </ScrollReveal>

            <div className="space-y-5 sm:space-y-6">
              {practiceAreaStats.map((area, i) => (
                <PracticeAreaBar key={area.name} area={area} index={i} />
              ))}
            </div>

            {/* Sub-note */}
            <ScrollReveal delay={0.3}>
              <p className="mt-8 font-body text-xs text-white/25 leading-relaxed max-w-lg">
                * Success rates are based on outcomes achieved across all matters handled since inception in February 2023. Each case is unique and past results do not guarantee future outcomes.
              </p>
            </ScrollReveal>
          </div>

          {/* Right: Image + Milestones */}
          <div className="lg:col-span-5 space-y-6">
            {/* Office image */}
            <ScrollReveal direction="right" delay={0.2}>
              <div className="relative rounded-xl overflow-hidden shadow-2xl" style={{
                boxShadow: "0 20px 60px rgba(0,0,0,0.3), 0 0 40px rgba(198,168,75,0.05)",
              }}>
                <div className="aspect-[4/3] relative">
                  <Image
                    src="/images/branded-binders.jpg"
                    alt="IM Attorneys — organised case files and legal documentation"
                    fill
                    className="object-cover transition-transform duration-700 hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 42vw"
                    loading="lazy"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D1B2A] via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <p className="font-display text-sm font-bold text-white/90">Meticulous Case Management</p>
                  <p className="font-body text-xs text-white/40 mt-1">Every file organised, every deadline tracked, every detail accounted for</p>
                </div>
                <div className="absolute inset-0 rounded-xl border border-brand-gold/10 pointer-events-none" />
              </div>
            </ScrollReveal>

            {/* Milestones */}
            <ScrollReveal direction="right" delay={0.35}>
              <div className="space-y-3">
                {milestones.map((m, i) => (
                  <MilestoneCard key={m.event} milestone={m} index={i} />
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* ═══════ Client Promise Banner ═══════ */}
        <motion.div
          className="relative rounded-xl overflow-hidden"
          style={{
            background: "linear-gradient(135deg, rgba(198,168,75,0.06), rgba(198,168,75,0.02))",
            border: "1px solid rgba(198,168,75,0.12)",
          }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10 p-8 sm:p-10">
            <div className="flex-shrink-0 w-14 h-14 rounded-full flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, #C6A84B, #E4D49A)",
                boxShadow: "0 0 24px rgba(198,168,75,0.3)",
              }}
            >
              <Star className="w-6 h-6 text-brand-dark" fill="#0D1B2A" strokeWidth={0} />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="font-display text-lg sm:text-xl font-bold text-white/90 mb-2">
                Our Promise to You
              </h3>
              <p className="font-body text-sm text-white/45 leading-relaxed max-w-2xl">
                We measure our success not by the volume of cases we handle, but by the depth of impact we create in each client&apos;s life. Whether you are facing a criminal charge, navigating a custody dispute, or fighting for fair compensation — we bring the same relentless commitment to every single matter.
              </p>
            </div>
            <div className="flex-shrink-0">
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  const el = document.querySelector("#contact");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center gap-2 font-body text-sm font-semibold text-brand-gold hover:text-brand-gold-light transition-colors group"
              >
                <span>Get Started</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ── Bottom separator ── */}
      <div className="absolute bottom-0 left-0 right-0 h-px z-10"
        style={{ background: "linear-gradient(90deg, transparent 0%, rgba(198,168,75,0.3) 30%, rgba(198,168,75,0.5) 50%, rgba(198,168,75,0.3) 70%, transparent 100%)" }}
      />
    </section>
  );
}
