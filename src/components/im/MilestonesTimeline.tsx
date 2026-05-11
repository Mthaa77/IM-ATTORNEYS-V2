"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  ScrollReveal,
  StaggerContainer,
  staggerChildVariants,
  GoldLine,
} from "@/components/im/ScrollReveal";

/* ─── Milestone Data ──────────────────────────────────────────────── */

const milestones = [
  {
    year: "2018",
    title: "Foundation Laid",
    description:
      "Ingrid Mtsweni graduates with LLB from the University of Johannesburg, laying the academic foundation for her legal career.",
  },
  {
    year: "2019",
    title: "Admitted as Attorney",
    description:
      "After completing articles and passing the bar, Ingrid is admitted as an Attorney of the High Court of South Africa.",
  },
  {
    year: "2020",
    title: "Banking Sector Experience",
    description:
      "Joined the legal department of a leading banking institution, gaining invaluable corporate and commercial law experience.",
  },
  {
    year: "2021",
    title: "The Vision Takes Shape",
    description:
      "The decision to establish a client-focused, boutique law firm begins to crystallize during private practice consulting.",
  },
  {
    year: "2022",
    title: "IM Attorneys Founded",
    description:
      "IM Attorneys Inc is officially registered and opens its doors in Centurion, serving the Gauteng community.",
  },
  {
    year: "2023",
    title: "Menlyn Maine Relocation",
    description:
      "The firm relocates to the prestigious Pegasus Building in Menlyn Maine, Pretoria — marking a significant growth milestone.",
  },
  {
    year: "2024",
    title: "Team Expansion",
    description:
      "The team grows to include dedicated litigation and administrative professionals, expanding service capacity.",
  },
  {
    year: "2025",
    title: "Recognition & Growth",
    description:
      "Recognized as a Top 100 law firm, achieving BBBEE Level 1, and serving 500+ clients across Gauteng.",
  },
];

/* ─── Timeline Line (animated grow) ─────────────────────────────── */

function TimelineLine() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div
      ref={ref}
      className="absolute top-0 bottom-0 left-5 lg:left-1/2 w-px -translate-x-1/2"
    >
      <motion.div
        className="w-full origin-top"
        style={{
          background:
            "linear-gradient(180deg, transparent, rgba(198, 168, 75, 0.35) 8%, rgba(198, 168, 75, 0.35) 92%, transparent)",
        }}
        initial={{ height: 0 }}
        animate={isInView ? { height: "100%" } : { height: 0 }}
        transition={{ duration: 1.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      />
    </div>
  );
}

/* ─── Milestone Card ────────────────────────────────────────────── */

interface MilestoneCardProps {
  year: string;
  title: string;
  description: string;
  index: number;
  isLast: boolean;
}

function MilestoneCard({
  year,
  title,
  description,
  index,
  isLast,
}: MilestoneCardProps) {
  const isLeft = index % 2 === 0;

  return (
    <motion.div
      className={`relative ${isLast ? "" : "mb-10 lg:mb-16"}`}
      variants={staggerChildVariants}
    >
      {/* Gold dot node on the timeline */}
      <div className="absolute left-5 lg:left-1/2 top-7 -translate-x-1/2 z-10">
        <div
          className="w-4 h-4 rounded-full bg-brand-gold gold-pulse-ring"
          style={{ boxShadow: "0 0 14px rgba(198, 168, 75, 0.45)" }}
        />
      </div>

      {/* Horizontal connector line (desktop only) */}
      <div
        className="hidden lg:block absolute top-[1.75rem] h-px w-10"
        style={{
          left: isLeft ? "calc(50% - 2.5rem)" : "50%",
          background: isLeft
            ? "linear-gradient(90deg, rgba(198, 168, 75, 0.1), rgba(198, 168, 75, 0.3))"
            : "linear-gradient(90deg, rgba(198, 168, 75, 0.3), rgba(198, 168, 75, 0.1))",
        }}
      />

      {/* Mobile connector (from dot to card) */}
      <div
        className="lg:hidden absolute top-[1.75rem] left-[1.375rem] w-3 h-px"
        style={{
          background:
            "linear-gradient(90deg, rgba(198, 168, 75, 0.3), rgba(198, 168, 75, 0.1))",
        }}
      />

      {/* Content positioning — mobile: right of left timeline; desktop: alternating */}
      <div
        className={`
          pl-14 lg:pl-0
          ${isLeft ? "lg:pr-[calc(50%+2.5rem)]" : "lg:pl-[calc(50%+2.5rem)]"}
        `}
      >
        {/* Card */}
        <div className="card-glass hover-border-gold rounded-xl p-5 group cursor-default">
          <span className="font-display text-lg font-bold text-brand-gold leading-tight">
            {year}
          </span>
          <h3
            className={`font-body font-semibold text-brand-dark mt-1.5 text-base leading-snug ${
              isLeft ? "lg:text-right" : "lg:text-left"
            }`}
          >
            {title}
          </h3>
          <p
            className={`font-body text-sm text-brand-body leading-relaxed mt-2.5 ${
              isLeft ? "lg:text-right" : "lg:text-left"
            }`}
          >
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Main Component ────────────────────────────────────────────── */

export function MilestonesTimeline() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(timelineRef, { once: true, margin: "-50px" });

  return (
    <section
      id="our-journey"
      className="relative w-full overflow-hidden bg-white bg-dot-pattern py-20 sm:py-28 corner-gold-bl"
      aria-label="Our Journey"
    >
      {/* Section number watermark */}
      <span className="section-number" aria-hidden="true">
        01
      </span>

      {/* Top gold gradient separator */}
      <div className="section-separator absolute top-0 left-0 right-0 z-20" />

      {/* Bottom gold gradient separator */}
      <div className="section-separator absolute bottom-0 left-0 right-0 z-20" />

      {/* Subtle radial glow — bottom left */}
      <div
        className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(198, 168, 75, 0.05) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* Content wrapper */}
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── Section header ── */}
        <ScrollReveal className="text-center mb-16 sm:mb-24">
          <div className="flex flex-col items-center">
            <span className="label-premium mb-4 block">Our Story</span>
            <h2 className="heading-section-light">
              Our Journey
            </h2>
            <p className="subheading-premium mt-4">
              From a bold vision to one of Pretoria's most respected boutique law firms — every milestone marks a promise kept and a client served.
            </p>
          </div>
        </ScrollReveal>

        {/* ── Timeline ── */}
        <div ref={timelineRef} className="relative">
          {/* Vertical animated gold line */}
          <TimelineLine />

          {/* Milestone cards with stagger animation */}
          <StaggerContainer
            className="relative"
            staggerDelay={0.12}
          >
            {milestones.map((milestone, index) => (
              <MilestoneCard
                key={milestone.year}
                year={milestone.year}
                title={milestone.title}
                description={milestone.description}
                index={index}
                isLast={index === milestones.length - 1}
              />
            ))}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}
