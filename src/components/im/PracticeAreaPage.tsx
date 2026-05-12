"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Phone,
  Clock,
  ShieldCheck,
  Star,
  Heart,
  FileText,
  Landmark,
  Briefcase,
  Scale,
  Shield,
  Users,
  TrendingUp,
  Award,
  type LucideProps,
} from "lucide-react";
import {
  ScrollReveal,
  StaggerContainer,
  staggerChildVariants,
  CountUp,
  GoldLine,
} from "@/components/im/ScrollReveal";
import {
  getPracticeAreaBySlug,
  type PracticeAreaData,
} from "@/components/im/practiceAreaData";

/* ══════════════════════════════════════════════════════════════════════
   ICON MAPPER
   ══════════════════════════════════════════════════════════════════════ */

function PracticeIcon({ name, ...props }: { name: string } & LucideProps) {
  switch (name) {
    case "Heart": return <Heart {...props} />;
    case "FileText": return <FileText {...props} />;
    case "Landmark": return <Landmark {...props} />;
    case "Shield": return <Shield {...props} />;
    case "Briefcase": return <Briefcase {...props} />;
    case "Scale": return <Scale {...props} />;
    default: return <Scale {...props} />;
  }
}

/* ══════════════════════════════════════════════════════════════════════
   PROPS
   ══════════════════════════════════════════════════════════════════════ */

interface PracticeAreaPageProps {
  slug: string;
  onBack: () => void;
  onNavigate?: (slug: string) => void;
}

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
   FAQ ACCORDION
   ══════════════════════════════════════════════════════════════════════ */

function FAQItem({ q, a, isOpen, toggle }: { q: string; a: string; isOpen: boolean; toggle: () => void }) {
  return (
    <div
      className="border-b last:border-b-0"
      style={{ borderColor: "rgba(198,168,75,0.12)" }}
    >
      <button
        type="button"
        onClick={toggle}
        className="flex items-center justify-between w-full py-5 text-left group"
        aria-expanded={isOpen}
      >
        <span
          className={`font-body font-medium text-sm sm:text-base pr-4 transition-colors duration-300 ${
            isOpen ? "text-brand-gold" : "text-white/80"
          }`}
        >
          {q}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="flex-shrink-0"
          style={{ color: "rgba(198,168,75,0.7)" }}
        >
          <ChevronDown className="w-5 h-5" strokeWidth={1.75} />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="font-body text-sm leading-relaxed pb-5" style={{ color: "rgba(255,255,255,0.45)" }}>
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   SERVICE CARD
   ══════════════════════════════════════════════════════════════════════ */

function ServiceCard({ service, index }: { service: { title: string; description: string }; index: number }) {
  return (
    <motion.div
      className="group relative overflow-hidden rounded-xl p-5 sm:p-6 transition-all duration-500 hover:-translate-y-1 cursor-default"
      style={{
        background: "rgba(255,255,255,0.02)",
        border: "1px solid rgba(198,168,75,0.08)",
      }}
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      whileHover={{
        borderColor: "rgba(198,168,75,0.22)",
        background: "rgba(198,168,75,0.04)",
      }}
    >
      {/* Hover glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(198,168,75,0.06) 0%, transparent 60%)" }}
      />

      <div className="relative z-10">
        <div
          className="w-10 h-10 rounded-lg flex items-center justify-center mb-4 transition-all duration-300"
          style={{
            background: "rgba(198,168,75,0.06)",
            border: "1px solid rgba(198,168,75,0.12)",
          }}
        >
          <CheckCircle2 className="w-5 h-5 text-brand-gold" strokeWidth={1.5} />
        </div>
        <h3 className="font-display text-base font-bold text-white/90 mb-2 group-hover:text-brand-gold transition-colors duration-300">
          {service.title}
        </h3>
        <p className="font-body text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.4)" }}>
          {service.description}
        </p>
      </div>

      {/* Bottom gold accent on hover */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-px bg-brand-gold/40 group-hover:w-3/4 transition-all duration-500" />
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   PROCESS STEP CARD
   ══════════════════════════════════════════════════════════════════════ */

function ProcessStepCard({ step, index }: { step: { step: number; title: string; description: string }; index: number }) {
  return (
    <motion.div
      className="relative text-center group"
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.12, duration: 0.5 }}
    >
      {/* Connector line (desktop) */}
      {index < 3 && (
        <div
          className="hidden lg:block absolute top-8 left-[calc(50%+32px)] right-0 h-px"
          style={{ background: "linear-gradient(90deg, rgba(198,168,75,0.2), rgba(198,168,75,0.05))" }}
        />
      )}

      {/* Step circle */}
      <div
        className="relative z-10 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-105"
        style={{
          background: "linear-gradient(135deg, rgba(198,168,75,0.12), rgba(198,168,75,0.04))",
          border: "1.5px solid rgba(198,168,75,0.25)",
          boxShadow: "0 0 20px rgba(198,168,75,0.08)",
        }}
      >
        <span className="font-display text-xl font-bold text-brand-gold">{step.step}</span>
      </div>

      <h3 className="font-display text-base font-bold text-white/90 mb-2">{step.title}</h3>
      <p className="font-body text-xs leading-relaxed max-w-[240px] mx-auto" style={{ color: "rgba(255,255,255,0.4)" }}>
        {step.description}
      </p>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   CASE STUDY CARD
   ══════════════════════════════════════════════════════════════════════ */

function CaseStudyCard({ cs, index }: { cs: { title: string; outcome: string; result: string; category: string }; index: number }) {
  return (
    <motion.div
      className="group relative overflow-hidden rounded-xl transition-all duration-500 hover:-translate-y-1"
      style={{
        background: "rgba(198,168,75,0.03)",
        border: "1px solid rgba(198,168,75,0.1)",
      }}
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.12, duration: 0.5 }}
      whileHover={{
        borderColor: "rgba(198,168,75,0.25)",
        background: "rgba(198,168,75,0.06)",
      }}
    >
      <div className="p-6">
        {/* Category badge */}
        <span
          className="inline-block px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider mb-4"
          style={{
            background: "rgba(198,168,75,0.08)",
            border: "1px solid rgba(198,168,75,0.15)",
            color: "#E4D49A",
          }}
        >
          {cs.category}
        </span>

        <h3 className="font-display text-base font-bold text-white/90 mb-3">{cs.title}</h3>
        <p className="font-body text-xs leading-relaxed mb-5" style={{ color: "rgba(255,255,255,0.4)" }}>
          {cs.outcome}
        </p>

        {/* Result */}
        <div
          className="flex items-center gap-2 pt-4"
          style={{ borderTop: "1px solid rgba(198,168,75,0.1)" }}
        >
          <Star className="w-4 h-4 text-brand-gold" strokeWidth={1.75} />
          <span className="font-body text-sm font-semibold text-brand-gold">{cs.result}</span>
        </div>
      </div>

      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-5 h-5 border-t border-l rounded-tl-xl pointer-events-none"
        style={{ borderColor: "rgba(198,168,75,0.12)" }}
      />
      <div className="absolute bottom-0 right-0 w-5 h-5 border-b border-r rounded-br-xl pointer-events-none"
        style={{ borderColor: "rgba(198,168,75,0.12)" }}
      />
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   STAT CARD
   ══════════════════════════════════════════════════════════════════════ */

function StatCard({ stat }: { stat: { label: string; value: string }; index: number }) {
  return (
    <motion.div
      className="text-center"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="font-display text-2xl sm:text-3xl font-bold text-gold-gradient mb-1">
        {stat.value}
      </div>
      <div className="font-body text-[10px] sm:text-xs uppercase tracking-[0.15em]" style={{ color: "rgba(255,255,255,0.4)" }}>
        {stat.label}
      </div>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ══════════════════════════════════════════════════════════════════════ */

export function PracticeAreaPage({ slug, onBack, onNavigate }: PracticeAreaPageProps) {
  const data = getPracticeAreaBySlug(slug);
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [slug]);

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#0A1222" }}>
        <div className="text-center">
          <p className="font-body text-white/50 mb-4">Practice area not found.</p>
          <button onClick={onBack} className="btn-premium-ghost text-brand-gold">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </button>
        </div>
      </div>
    );
  }

  const relatedData = data.relatedAreas
    .map((s) => getPracticeAreaBySlug(s))
    .filter(Boolean) as PracticeAreaData[];

  const handleBookConsultation = () => {
    onBack();
    setTimeout(() => {
      document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
    }, 400);
  };

  const handleWhatsApp = () => {
    const msg = encodeURIComponent(
      `Hello IM Attorneys. I need assistance with ${data.title}. Please contact me to arrange a consultation.`
    );
    window.open(`https://wa.me/27812488048?text=${msg}`, "_blank", "noopener");
  };

  return (
    <div className="min-h-screen" ref={sectionRef}>
      {/* ═══════════════════════════════════════════════════════════
          HERO BANNER
          ═══════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden" style={{ backgroundColor: "#0A1222" }}>
        {/* Background image with overlay */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0">
            <Image
              src={data.heroImage}
              alt=""
              fill
              className="object-cover opacity-[0.08]"
              sizes="100vw"
              priority
            />
          </div>
          <div className="absolute inset-0 bg-crosshatch pointer-events-none opacity-20" />
          <div className="absolute inset-0 noise-overlay opacity-[0.02]" />
          {/* Radial glow */}
          <div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] pointer-events-none"
            style={{ background: "radial-gradient(ellipse at center, rgba(198,168,75,0.06) 0%, transparent 60%)" }}
          />
        </div>

        {/* Top gold separator */}
        <div
          className="absolute top-0 left-0 right-0 h-px z-10"
          style={{ background: "linear-gradient(90deg, transparent 0%, rgba(198,168,75,0.3) 30%, rgba(198,168,75,0.5) 50%, rgba(198,168,75,0.3) 70%, transparent 100%)" }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-36 lg:pt-44 pb-16 sm:pb-24">
          {/* Back button */}
          <motion.div
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <button
              onClick={onBack}
              className="inline-flex items-center gap-2 font-body text-xs uppercase tracking-[0.2em] mb-10 transition-colors duration-300 hover:text-brand-gold"
              style={{ color: "rgba(255,255,255,0.5)" }}
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </button>
          </motion.div>

          {/* Breadcrumb */}
          <motion.nav
            className="flex items-center gap-2 text-sm font-body mb-8"
            aria-label="Breadcrumb"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
          >
            <button onClick={onBack} className="hover:text-brand-gold transition-colors" style={{ color: "rgba(255,255,255,0.4)" }}>Home</button>
            <span style={{ color: "rgba(198,168,75,0.3)" }}>/</span>
            <span style={{ color: "rgba(255,255,255,0.4)" }}>Practice Areas</span>
            <span style={{ color: "rgba(198,168,75,0.3)" }}>/</span>
            <span className="text-brand-gold font-medium">{data.title}</span>
          </motion.nav>

          {/* Icon + Title */}
          <div className="flex flex-col sm:flex-row items-start gap-6 mb-8">
            <motion.div
              className="relative flex-shrink-0"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div
                className="w-20 h-20 rounded-2xl flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, rgba(198,168,75,0.12), rgba(198,168,75,0.04))",
                  border: "1.5px solid rgba(198,168,75,0.2)",
                  boxShadow: "0 0 30px rgba(198,168,75,0.1)",
                }}
              >
                <PracticeIcon name={data.icon} className="w-9 h-9 text-brand-gold" strokeWidth={1.5} />
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <h1 className="heading-section text-3xl sm:text-4xl lg:text-5xl mb-3">
                {data.title}
              </h1>
              <p className="font-display text-lg sm:text-xl italic" style={{ color: "rgba(198,168,75,0.7)" }}>
                {data.tagline}
              </p>
            </motion.div>
          </div>

          {/* Gold separator */}
          <motion.div
            className="h-px w-24 mb-10"
            style={{ background: "linear-gradient(to right, rgba(198,168,75,0.6), transparent)" }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.25 }}
          />

          {/* Stats */}
          <motion.div
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {data.stats.map((stat, i) => (
              <div key={i} className="p-4 rounded-xl" style={{
                background: "rgba(198,168,75,0.03)",
                border: "1px solid rgba(198,168,75,0.08)",
              }}>
                <StatCard stat={stat} index={i} />
              </div>
            ))}
          </motion.div>
        </div>

        {/* Bottom separator */}
        <div
          className="absolute bottom-0 left-0 right-0 h-px z-10"
          style={{ background: "linear-gradient(90deg, transparent 0%, rgba(198,168,75,0.3) 30%, rgba(198,168,75,0.5) 50%, rgba(198,168,75,0.3) 70%, transparent 100%)" }}
        />
      </section>

      {/* ═══════════════════════════════════════════════════════════
          OVERVIEW
          ═══════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden" style={{ backgroundColor: "#0D1B2A" }}>
        {/* Subtle background */}
        <div
          className="absolute top-0 right-0 w-[500px] h-[500px] pointer-events-none"
          style={{ background: "radial-gradient(ellipse at center, rgba(198,168,75,0.03) 0%, transparent 60%)" }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-16">
            <div className="lg:col-span-2">
              <ScrollReveal>
                <span className="font-body text-[11px] sm:text-xs uppercase tracking-[0.3em] text-brand-gold/80 mb-4 block">
                  Overview
                </span>
                <div className="h-px w-16 bg-gradient-to-r from-brand-gold/50 to-transparent mb-6" />
                <h2 className="heading-gold-glossy text-2xl sm:text-3xl mb-8">
                  {data.title}
                </h2>
              </ScrollReveal>
              {data.overview.split("\n\n").map((para, i) => (
                <ScrollReveal key={i} delay={i * 0.08}>
                  <p className="font-body text-sm sm:text-base leading-relaxed mb-5" style={{ color: "rgba(255,255,255,0.5)" }}>
                    {para}
                  </p>
                </ScrollReveal>
              ))}

              {/* Quick action buttons */}
              <ScrollReveal delay={0.2}>
                <div className="flex flex-wrap gap-3 mt-8">
                  <button onClick={handleBookConsultation} className="btn-premium inline-flex items-center gap-2 px-6 py-3">
                    Book a Consultation <ArrowRight className="w-4 h-4" />
                  </button>
                  <button onClick={handleWhatsApp} className="btn-premium-outline inline-flex items-center gap-2 px-6 py-3">
                    <Phone className="w-4 h-4" /> WhatsApp Us
                  </button>
                </div>
              </ScrollReveal>
            </div>

            {/* Sidebar: Top 3 services */}
            <div>
              <ScrollReveal delay={0.15}>
                <div
                  className="rounded-xl p-6"
                  style={{
                    background: "rgba(198,168,75,0.03)",
                    border: "1px solid rgba(198,168,75,0.1)",
                    boxShadow: "0 0 40px rgba(198,168,75,0.03)",
                  }}
                >
                  <h3 className="font-display text-base font-bold text-white/90 mb-5">
                    Key Services
                  </h3>
                  <div className="space-y-4">
                    {data.keyServices.slice(0, 4).map((service, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div
                          className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                          style={{
                            background: "rgba(198,168,75,0.06)",
                            border: "1px solid rgba(198,168,75,0.1)",
                          }}
                        >
                          <CheckCircle2 className="w-4 h-4 text-brand-gold" strokeWidth={1.5} />
                        </div>
                        <div>
                          <h4 className="font-body text-sm font-semibold text-white/80 mb-1">{service.title}</h4>
                          <p className="font-body text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.35)" }}>
                            {service.description.slice(0, 100)}...
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          ALL SERVICES GRID
          ═══════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden" style={{ backgroundColor: "#0A1222" }}>
        <div className="absolute inset-0 noise-overlay opacity-[0.015]" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <div className="text-center mb-14">
            <ScrollReveal>
              <span className="font-body text-[11px] sm:text-xs uppercase tracking-[0.3em] text-brand-gold/80 mb-4 block">
                Our Expertise
              </span>
              <div className="h-px bg-gradient-to-r from-transparent via-brand-gold/40 to-transparent mx-auto mb-6 max-w-[120px]" />
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h2 className="heading-section text-2xl sm:text-3xl mb-4">
                Comprehensive Services
              </h2>
              <p className="font-body text-sm sm:text-base max-w-2xl mx-auto" style={{ color: "rgba(255,255,255,0.4)" }}>
                Every aspect of {data.title.toLowerCase()} handled with precision, expertise, and unwavering commitment to your best outcome.
              </p>
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
            {data.keyServices.map((service, i) => (
              <ServiceCard key={service.title} service={service} index={i} />
            ))}
          </div>
        </div>

        {/* Bottom separator */}
        <div className="absolute bottom-0 left-0 right-0 h-px z-10"
          style={{ background: "linear-gradient(90deg, transparent 0%, rgba(198,168,75,0.3) 30%, rgba(198,168,75,0.5) 50%, rgba(198,168,75,0.3) 70%, transparent 100%)" }}
        />
      </section>

      {/* ═══════════════════════════════════════════════════════════
          OUR PROCESS
          ═══════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden" style={{ backgroundColor: "#0D1B2A" }}>
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] pointer-events-none"
          style={{ background: "radial-gradient(ellipse at center, rgba(198,168,75,0.03) 0%, transparent 50%)" }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <div className="text-center mb-14">
            <ScrollReveal>
              <span className="font-body text-[11px] sm:text-xs uppercase tracking-[0.3em] text-brand-gold/80 mb-4 block">
                How We Work
              </span>
              <div className="h-px bg-gradient-to-r from-transparent via-brand-gold/40 to-transparent mx-auto mb-6 max-w-[120px]" />
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h2 className="heading-section text-2xl sm:text-3xl">
                Our Proven Process
              </h2>
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
            {data.processSteps.map((step, i) => (
              <ProcessStepCard key={step.step} step={step} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          CASE RESULTS
          ═══════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden" style={{ backgroundColor: "#0A1222" }}>
        <div className="absolute inset-0 noise-overlay opacity-[0.02]" />
        <div className="absolute bg-crosshatch pointer-events-none opacity-20" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <div className="text-center mb-14">
            <ScrollReveal>
              <span className="font-body text-[11px] sm:text-xs uppercase tracking-[0.3em] text-brand-gold/80 mb-4 block">
                Track Record
              </span>
              <div className="h-px bg-gradient-to-r from-transparent via-brand-gold/40 to-transparent mx-auto mb-6 max-w-[120px]" />
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h2 className="heading-section text-2xl sm:text-3xl mb-4">
                Case Results
              </h2>
              <p className="font-body text-sm sm:text-base max-w-2xl mx-auto" style={{ color: "rgba(255,255,255,0.4)" }}>
                Real outcomes from real cases. Our track record speaks to the depth of our expertise and the dedication we bring to every matter.
              </p>
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
            {data.caseStudies.map((cs, i) => (
              <CaseStudyCard key={cs.title} cs={cs} index={i} />
            ))}
          </div>
        </div>

        {/* Bottom separator */}
        <div className="absolute bottom-0 left-0 right-0 h-px z-10"
          style={{ background: "linear-gradient(90deg, transparent 0%, rgba(198,168,75,0.3) 30%, rgba(198,168,75,0.5) 50%, rgba(198,168,75,0.3) 70%, transparent 100%)" }}
        />
      </section>

      {/* ═══════════════════════════════════════════════════════════
          FAQ SECTION
          ═══════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden" style={{ backgroundColor: "#0D1B2A" }}>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <div className="text-center mb-14">
            <ScrollReveal>
              <span className="font-body text-[11px] sm:text-xs uppercase tracking-[0.3em] text-brand-gold/80 mb-4 block">
                Common Questions
              </span>
              <div className="h-px bg-gradient-to-r from-transparent via-brand-gold/40 to-transparent mx-auto mb-6 max-w-[120px]" />
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h2 className="heading-section text-2xl sm:text-3xl">
                Frequently Asked Questions
              </h2>
            </ScrollReveal>
          </div>

          <ScrollReveal delay={0.15}>
            <div
              className="rounded-xl p-6 sm:p-8"
              style={{
                background: "rgba(255,255,255,0.015)",
                border: "1px solid rgba(198,168,75,0.1)",
                boxShadow: "0 0 40px rgba(198,168,75,0.02)",
              }}
            >
              {data.faqs.map((faq, i) => (
                <FAQItem
                  key={i}
                  q={faq.question}
                  a={faq.answer}
                  isOpen={openFAQ === i}
                  toggle={() => setOpenFAQ(openFAQ === i ? null : i)}
                />
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          CTA SECTION
          ═══════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden" style={{ backgroundColor: "#0A1222" }}>
        {/* Background glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] pointer-events-none"
          style={{ background: "radial-gradient(ellipse at center, rgba(198,168,75,0.06) 0%, transparent 60%)" }}
        />
        <div className="absolute inset-0 noise-overlay opacity-[0.02]" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 text-center">
          <ScrollReveal>
            <span className="font-body text-[11px] sm:text-xs uppercase tracking-[0.3em] text-brand-gold/80 mb-5 block">
              Take the First Step
            </span>
            <div className="h-px bg-gradient-to-r from-transparent via-brand-gold/40 to-transparent mx-auto mb-8 max-w-[100px]" />
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h2 className="heading-section text-2xl sm:text-3xl lg:text-4xl mb-5">
              Ready to Discuss Your Case?
            </h2>
            <p className="font-body text-sm sm:text-base max-w-xl mx-auto leading-relaxed mb-10" style={{ color: "rgba(255,255,255,0.45)" }}>
              Our experienced team is here to provide the expert legal guidance you need. Book a consultation today — your first consultation is complimentary.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
              <button onClick={handleBookConsultation} className="btn-premium inline-flex items-center gap-2 px-8 py-3.5">
                Book a Free Consultation <ArrowRight className="w-4 h-4" />
              </button>
              <a href="tel:+27812488048" className="btn-premium-outline inline-flex items-center gap-2 px-8 py-3.5">
                <Phone className="w-4 h-4" /> 081 248 8048
              </a>
            </div>
          </ScrollReveal>

          {/* Trust indicators */}
          <ScrollReveal delay={0.3}>
            <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8">
              {[
                { icon: Clock, label: "Mon – Fri: 08:00 – 17:00" },
                { icon: ShieldCheck, label: "Confidential & Discreet" },
                { icon: Star, label: "500+ 5-Star Reviews" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <item.icon className="w-4 h-4 text-brand-gold" strokeWidth={1.5} />
                  <span className="font-body text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>{item.label}</span>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>

        {/* Bottom separator */}
        <div className="absolute bottom-0 left-0 right-0 h-px z-10"
          style={{ background: "linear-gradient(90deg, transparent 0%, rgba(198,168,75,0.3) 30%, rgba(198,168,75,0.5) 50%, rgba(198,168,75,0.3) 70%, transparent 100%)" }}
        />
      </section>

      {/* ═══════════════════════════════════════════════════════════
          RELATED PRACTICE AREAS
          ═══════════════════════════════════════════════════════════ */}
      {relatedData.length > 0 && (
        <section className="relative overflow-hidden" style={{ backgroundColor: "#0D1B2A" }}>
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
            <div className="text-center mb-14">
              <ScrollReveal>
                <span className="font-body text-[11px] sm:text-xs uppercase tracking-[0.3em] text-brand-gold/80 mb-4 block">
                  Explore More
                </span>
                <div className="h-px bg-gradient-to-r from-transparent via-brand-gold/40 to-transparent mx-auto mb-6 max-w-[120px]" />
              </ScrollReveal>
              <ScrollReveal delay={0.1}>
                <h2 className="heading-section text-2xl sm:text-3xl">
                  Related Practice Areas
                </h2>
              </ScrollReveal>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {relatedData.map((related, i) => (
                <motion.button
                  key={related.slug}
                  onClick={() => onNavigate?.(related.slug)}
                  className="group relative overflow-hidden rounded-xl text-left p-6 transition-all duration-500 hover:-translate-y-1"
                  style={{
                    background: "rgba(255,255,255,0.015)",
                    border: "1px solid rgba(198,168,75,0.08)",
                  }}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12, duration: 0.5 }}
                  whileHover={{
                    borderColor: "rgba(198,168,75,0.25)",
                    background: "rgba(198,168,75,0.04)",
                  }}
                >
                  {/* Hover glow */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(198,168,75,0.06) 0%, transparent 60%)" }}
                  />

                  <div className="relative z-10">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all duration-300"
                      style={{
                        background: "rgba(198,168,75,0.06)",
                        border: "1px solid rgba(198,168,75,0.12)",
                      }}
                    >
                      <PracticeIcon name={related.icon} className="w-6 h-6 text-brand-gold" strokeWidth={1.5} />
                    </div>
                    <h3 className="font-display text-lg font-bold text-white/90 mb-2 group-hover:text-brand-gold transition-colors duration-300">
                      {related.title}
                    </h3>
                    <p className="font-body text-xs leading-relaxed mb-4" style={{ color: "rgba(255,255,255,0.4)" }}>
                      {related.tagline}
                    </p>
                    <span className="inline-flex items-center gap-1.5 font-body text-sm font-semibold text-brand-gold group-hover:gap-2.5 transition-all duration-300">
                      Learn More <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>

                  {/* Corner accents */}
                  <div className="absolute top-0 left-0 w-5 h-5 border-t border-l rounded-tl-xl pointer-events-none"
                    style={{ borderColor: "rgba(198,168,75,0.1)" }}
                  />
                  <div className="absolute bottom-0 right-0 w-5 h-5 border-b border-r rounded-br-xl pointer-events-none"
                    style={{ borderColor: "rgba(198,168,75,0.1)" }}
                  />
                </motion.button>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
