"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { CountUp } from "@/components/im/ScrollReveal";

interface StatItemProps {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  duration?: number;
}

function StatItem({ value, suffix = "", prefix = "", label, duration = 2 }: StatItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      className="flex flex-col items-center text-center px-4 sm:px-6 py-6 panel-3d-float"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="relative mb-3">
        {/* Subtle gold glow behind number */}
        <motion.div
          className="absolute -inset-4 rounded-full opacity-0"
          style={{
            background: "radial-gradient(circle, rgba(198,168,75,0.15) 0%, transparent 70%)",
          }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        />
        <span className="relative font-display text-4xl sm:text-5xl lg:text-6xl font-bold gradient-text-gold tracking-tight nums-tabular">
          <CountUp
            end={value}
            suffix={suffix}
            prefix={prefix}
            duration={duration}
            className="text-brand-gold"
          />
        </span>
      </div>
      <motion.span
        className="font-body text-sm sm:text-base text-brand-inverse/70 tracking-widest uppercase body-sm"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        {label}
      </motion.span>
    </motion.div>
  );
}

const stats: StatItemProps[] = [
  { value: 2023, label: "Established" },
  { value: 6, suffix: "+", label: "Areas of Expertise" },
  { value: 3, label: "Dedicated Attorneys" },
  { value: 24, suffix: "/7", label: "Bail Response" },
];

export function StatsBar() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-60px" });

  return (
    <section
      id="stats"
      className="relative w-full overflow-hidden"
      style={{ backgroundColor: "#0D1B2A" }}
      aria-label="Firm statistics"
    >
      {/* Subtle top edge gold accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-gold/40 to-transparent" />

      {/* Background subtle pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, transparent, transparent 60px, rgba(198,168,75,0.5) 60px, rgba(198,168,75,0.5) 61px), repeating-linear-gradient(0deg, transparent, transparent 60px, rgba(198,168,75,0.5) 60px, rgba(198,168,75,0.5) 61px)",
        }}
      />

      {/* Perspective grid overlay */}
      <div className="perspective-grid absolute inset-0 pointer-events-none" />

      {/* Subtle team panoramic background */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-[0.06]"
          style={{ backgroundImage: "url('/images/team-panoramic.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0D1B2A] via-[#0D1B2A]/95 to-[#0D1B2A]" />
      </div>

      <div ref={containerRef} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-brand-gold/10">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.4, delay: index * 0.15 }}
            >
              <StatItem {...stat} />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom edge gold accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-gold/40 to-transparent" />
    </section>
  );
}
