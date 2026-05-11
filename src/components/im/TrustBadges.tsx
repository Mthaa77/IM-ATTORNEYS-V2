"use client";

import {
  Shield,
  Award,
  ShieldCheck,
  MapPin,
  FileCheck,
  Scale,
  BookOpen,
} from "lucide-react";
import {
  ScrollReveal,
  StaggerContainer,
  staggerChildVariants,
} from "@/components/im/ScrollReveal";
import { motion } from "framer-motion";

const badges = [
  {
    icon: Shield,
    label: "Legal Practice Council",
    sublabel: "Registered & Regulated",
  },
  {
    icon: ShieldCheck,
    label: "POPIA Compliant",
    sublabel: "Data Privacy Protected",
  },
  {
    icon: FileCheck,
    label: "ECTA Compliant",
    sublabel: "Electronic Transactions Act",
  },
  {
    icon: BookOpen,
    label: "PAIA Manual",
    sublabel: "Information Access Act",
  },
  {
    icon: Scale,
    label: "FICA Compliant",
    sublabel: "Financial Intelligence",
  },
  {
    icon: Award,
    label: "BBBEE Level 1",
    sublabel: "100% Female Black-Owned",
  },
  {
    icon: MapPin,
    label: "Pretoria, Gauteng",
    sublabel: "Menlyn Maine",
  },
];

export function TrustBadges() {
  return (
    <section className="bg-brand-dark py-12 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <StaggerContainer
          className="grid grid-cols-2 gap-6 sm:gap-0 md:grid-cols-7"
          staggerDelay={0.12}
        >
          {badges.map((badge, index) => {
            const Icon = badge.icon;
            const showDivider = index < badges.length - 1;

            return (
              <motion.div
                key={badge.label}
                variants={staggerChildVariants}
                className={`relative flex flex-col items-center gap-3 text-center ${
                  showDivider
                    ? "sm:after:absolute sm:after:right-0 sm:after:top-1/2 sm:after:h-10 sm:after:w-px sm:after:-translate-y-1/2 sm:after:bg-brand-gold/25"
                    : ""
                }`}
              >
                {/* Gold icon container */}
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-brand-gold/20 bg-brand-gold/10 transition-colors duration-300">
                  <Icon className="h-5 w-5 text-brand-gold" strokeWidth={1.5} />
                </div>

                {/* Label */}
                <div>
                  <p className="font-display text-sm font-semibold leading-tight text-brand-inverse sm:text-base">
                    {badge.label}
                  </p>
                  <p className="mt-1 text-xs leading-snug text-brand-muted sm:text-sm">
                    {badge.sublabel}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </StaggerContainer>
      </div>

      {/* Subtle bottom gold line */}
      <ScrollReveal delay={0.4}>
        <div className="section-separator mt-10 mx-auto max-w-xs" />
      </ScrollReveal>
    </section>
  );
}
