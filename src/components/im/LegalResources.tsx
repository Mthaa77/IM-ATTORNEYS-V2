"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  FileIcon,
  ClipboardCheck,
  Shield,
  FileText,
  Briefcase,
  Scale,
  Download,
} from "lucide-react";
import {
  ScrollReveal,
  StaggerContainer,
  staggerChildVariants,
  GoldLine,
} from "@/components/im/ScrollReveal";

/* ─── Data ─── */
const resources = [
  {
    title: "Divorce Guide",
    icon: FileIcon,
    description:
      "Step-by-step guide to the divorce process in South Africa, including documents needed and timelines.",
  },
  {
    title: "RAF Claim Checklist",
    icon: ClipboardCheck,
    description:
      "Complete checklist for Road Accident Fund claims including required documentation and deadlines.",
  },
  {
    title: "Bail Application Guide",
    icon: Shield,
    description:
      "Understanding your rights and the bail application process, from arrest to court appearance.",
  },
  {
    title: "Estate Planning Checklist",
    icon: FileText,
    description:
      "Essential checklist for drafting your will and planning your estate, including executor appointment.",
  },
  {
    title: "Commercial Contract Basics",
    icon: Briefcase,
    description:
      "Key elements every business owner should know before signing commercial agreements.",
  },
  {
    title: "Know Your Rights",
    icon: Scale,
    description:
      "A comprehensive guide to your constitutional rights when dealing with law enforcement.",
  },
];

/* ─── Hex layout positions (staggered organic layout) ─── */
const hexPositions = [
  { col: 0, row: 0, yOffset: 0 },
  { col: 1, row: 0, yOffset: 28 },
  { col: 2, row: 0, yOffset: 0 },
  { col: 0, row: 1, yOffset: 28 },
  { col: 1, row: 1, yOffset: 0 },
  { col: 2, row: 1, yOffset: 28 },
];

/* ─── Hexagonal Card ─── */
function HexCard({
  resource,
  index,
}: {
  resource: (typeof resources)[0];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-60px" });
  const pos = hexPositions[index];

  const Icon = resource.icon;

  return (
    <motion.div
      ref={cardRef}
      className="flex justify-center"
      style={{ marginTop: pos.yOffset }}
      initial={{ opacity: 0, scale: 0.7, y: 40 }}
      animate={
        isInView
          ? { opacity: 1, scale: 1, y: 0 }
          : { opacity: 0, scale: 0.7, y: 40 }
      }
      transition={{ duration: 0.7, delay: index * 0.12, ease: "easeOut" }}
    >
      <motion.div
        className="relative cursor-pointer group"
        role="article"
        aria-label={resource.title}
        tabIndex={0}
      >
        {/* Gold glow underneath */}
        <div
          className="absolute inset-3 opacity-0 group-hover:opacity-60 transition-opacity duration-300"
          style={{ background: "rgba(198,168,75,0.25)" }}
          aria-hidden="true"
        />

        {/* Hexagon card using clip-path */}
        <div
          className="relative w-[200px] h-[230px] sm:w-[240px] sm:h-[276px] lg:w-[280px] lg:h-[322px] transition-transform duration-500 group-hover:-translate-y-3"
          style={{
            clipPath:
              "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
          }}
        >
          {/* Glassmorphism background */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, rgba(26,50,80,0.6) 0%, rgba(13,27,42,0.8) 50%, rgba(26,50,80,0.6) 100%)",
            }}
          />

          {/* Gold border glow on hover */}
          <div
            className="absolute inset-0 opacity-40 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              clipPath:
                "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
              background: `conic-gradient(from 0deg, transparent, rgba(198,168,75,0.5), transparent, rgba(228,212,154,0.5), transparent)`,
            }}
          />

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center justify-center h-full px-5 sm:px-7 text-center">
            {/* Icon */}
            <div
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center mb-3 sm:mb-4 transition-transform duration-300 group-hover:scale-125"
              style={{
                background: "rgba(198,168,75,0.12)",
                border: "1px solid rgba(198,168,75,0.25)",
              }}
            >
              <Icon
                className="w-5 h-5 sm:w-6 sm:h-6 transition-colors duration-300"
                style={{ color: "#C6A84B" }}
              />
            </div>

            {/* Title */}
            <h3
              className="font-display text-sm sm:text-base lg:text-lg font-semibold mb-2 leading-tight"
              style={{ color: "#E4D49A" }}
            >
              {resource.title}
            </h3>

            {/* Description (truncated on small) */}
            <p
              className="text-xs sm:text-sm leading-relaxed line-clamp-3 mb-3 sm:mb-4"
              style={{ color: "rgba(240,237,232,0.65)" }}
            >
              {resource.description}
            </p>

            {/* Download button */}
            <button
              type="button"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-gold"
              style={{
                color: "#C6A84B",
                background: "rgba(198,168,75,0.1)",
                border: "1px solid rgba(198,168,75,0.25)",
              }}
              aria-label={`Download ${resource.title}`}
            >
              <Download className="w-3 h-3" />
              <span>PDF Guide</span>
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── SVG Connecting Lines Between Hexagons ─── */
function ConnectingLines() {
  const ref = useRef<SVGSVGElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <svg
      ref={ref}
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
      preserveAspectRatio="none"
    >
      {/* Horizontal connections - top row */}
      <motion.line
        x1="16.5%"
        y1="20%"
        x2="50%"
        y2="14%"
        stroke="rgba(198,168,75,0.15)"
        strokeWidth="1"
        strokeDasharray="6 4"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={
          isInView
            ? { pathLength: 1, opacity: 1 }
            : { pathLength: 0, opacity: 0 }
        }
        transition={{ duration: 1.5, delay: 0.6 }}
      />
      <motion.line
        x1="50%"
        y1="14%"
        x2="83.5%"
        y2="20%"
        stroke="rgba(198,168,75,0.15)"
        strokeWidth="1"
        strokeDasharray="6 4"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={
          isInView
            ? { pathLength: 1, opacity: 1 }
            : { pathLength: 0, opacity: 0 }
        }
        transition={{ duration: 1.5, delay: 0.9 }}
      />

      {/* Vertical connections */}
      <motion.line
        x1="16.5%"
        y1="38%"
        x2="16.5%"
        y2="55%"
        stroke="rgba(198,168,75,0.15)"
        strokeWidth="1"
        strokeDasharray="6 4"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={
          isInView
            ? { pathLength: 1, opacity: 1 }
            : { pathLength: 0, opacity: 0 }
        }
        transition={{ duration: 1.5, delay: 1.2 }}
      />
      <motion.line
        x1="50%"
        y1="32%"
        x2="50%"
        y2="48%"
        stroke="rgba(198,168,75,0.15)"
        strokeWidth="1"
        strokeDasharray="6 4"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={
          isInView
            ? { pathLength: 1, opacity: 1 }
            : { pathLength: 0, opacity: 0 }
        }
        transition={{ duration: 1.5, delay: 1.0 }}
      />
      <motion.line
        x1="83.5%"
        y1="38%"
        x2="83.5%"
        y2="55%"
        stroke="rgba(198,168,75,0.15)"
        strokeWidth="1"
        strokeDasharray="6 4"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={
          isInView
            ? { pathLength: 1, opacity: 1 }
            : { pathLength: 0, opacity: 0 }
        }
        transition={{ duration: 1.5, delay: 1.2 }}
      />

      {/* Horizontal connections - bottom row */}
      <motion.line
        x1="16.5%"
        y1="75%"
        x2="50%"
        y2="80%"
        stroke="rgba(198,168,75,0.15)"
        strokeWidth="1"
        strokeDasharray="6 4"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={
          isInView
            ? { pathLength: 1, opacity: 1 }
            : { pathLength: 0, opacity: 0 }
        }
        transition={{ duration: 1.5, delay: 1.4 }}
      />
      <motion.line
        x1="50%"
        y1="80%"
        x2="83.5%"
        y2="75%"
        stroke="rgba(198,168,75,0.15)"
        strokeWidth="1"
        strokeDasharray="6 4"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={
          isInView
            ? { pathLength: 1, opacity: 1 }
            : { pathLength: 0, opacity: 0 }
        }
        transition={{ duration: 1.5, delay: 1.6 }}
      />
    </svg>
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
export function LegalResources() {
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={sectionRef}
      className="premium-section-surface premium-section-surface--dark relative py-20 sm:py-28 lg:py-36 overflow-hidden"
      style={{ background: "#0D1B2A" }}
      aria-labelledby="legal-resources-heading"
    >
      {/* Gold grid pattern overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundImage: `
            linear-gradient(rgba(198,168,75,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(198,168,75,0.03) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Radial glow from center */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse at 50% 40%, rgba(198,168,75,0.06) 0%, transparent 60%)",
        }}
      />

      {/* Top gold accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(198,168,75,0.3), transparent)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <ScrollReveal direction="up" delay={0}>
            <span className="label-premium mb-4 block">Knowledge Centre</span>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.1}>
            <h2
              id="legal-resources-heading"
              className="heading-gold-glossy"
            >
              Legal Resources
            </h2>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.15}>
            <OrnamentalDivider />
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.2}>
            <p className="subheading-premium-dark">
              Empower yourself with free downloadable guides, checklists, and templates — curated by our attorneys to help you navigate common legal situations with confidence.
            </p>
          </ScrollReveal>
        </div>

        {/* Hexagonal Grid */}
        <div className="relative">
          {/* Connecting lines (desktop only) */}
          <div className="hidden md:block absolute inset-0">
            <ConnectingLines />
          </div>

          {/* Grid: 1-col mobile, 2-col sm, 3-col md+ */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-8 sm:gap-y-10 lg:gap-y-12 gap-x-4 sm:gap-x-2 md:gap-x-0">
            {resources.map((resource, index) => (
              <HexCard key={resource.title} resource={resource} index={index} />
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <ScrollReveal direction="up" delay={0.3}>
          <p
            className="mt-12 sm:mt-16 text-center font-body text-sm"
            style={{ color: "rgba(240,237,232,0.5)" }}
          >
            Need a resource not listed here?{" "}
            <a
              href="#contact"
              className="font-semibold transition-colors duration-200 hover:underline underline-offset-4"
              style={{ color: "#C6A84B" }}
            >
              Contact us
            </a>{" "}
            and we&apos;ll gladly assist.
          </p>
        </ScrollReveal>
      </div>

      {/* Bottom gold accent line */}
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
