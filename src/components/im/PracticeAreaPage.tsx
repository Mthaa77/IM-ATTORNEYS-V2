"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  type LucideProps,
} from "lucide-react";
import {
  ScrollReveal,
  StaggerContainer,
  staggerChildVariants,
} from "@/components/im/ScrollReveal";
import {
  getPracticeAreaBySlug,
  getAllPracticeAreaSlugs,
  type PracticeAreaData,
} from "@/components/im/practiceAreaData";

/* ─── Icon Component ─── */
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

/* ─── Props ─── */
interface PracticeAreaPageProps {
  slug: string;
  onBack: () => void;
  onNavigate?: (slug: string) => void;
}

/* ─── FAQ Accordion Item ─── */
function FAQItem({ q, a, isOpen, toggle }: { q: string; a: string; isOpen: boolean; toggle: () => void }) {
  return (
    <div className="border-b border-brand-gold/15 last:border-b-0">
      <button
        type="button"
        onClick={toggle}
        className="flex items-center justify-between w-full py-5 text-left group"
        aria-expanded={isOpen}
      >
        <span className={`font-body font-medium text-sm sm:text-base pr-4 transition-colors duration-300 ${isOpen ? "text-brand-gold" : "text-brand-dark dark:text-brand-inverse"}`}>
          {q}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="flex-shrink-0 text-brand-gold"
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
            <p className="font-body text-sm text-brand-body dark:text-brand-muted leading-relaxed pb-5">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── Main Component ─── */
export function PracticeAreaPage({ slug, onBack, onNavigate }: PracticeAreaPageProps) {
  const data = getPracticeAreaBySlug(slug);
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [slug]);

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-cream">
        <div className="text-center">
          <p className="font-body text-brand-body mb-4">Practice area not found.</p>
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

  return (
    <div className="min-h-screen">
      {/* ═══ HERO BANNER ═══ */}
      <section className="relative bg-brand-dark overflow-hidden noise-overlay">
        <div className="absolute inset-0 bg-crosshatch opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-navy/40 to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32">
          {/* Breadcrumb */}
          <ScrollReveal delay={0}>
            <nav className="flex items-center gap-2 text-sm font-body mb-8" aria-label="Breadcrumb">
              <button onClick={onBack} className="text-brand-muted hover:text-brand-gold transition-colors">Home</button>
              <span className="text-brand-gold/40">/</span>
              <span className="text-brand-muted">Practice Areas</span>
              <span className="text-brand-gold/40">/</span>
              <span className="text-brand-gold font-medium">{data.title}</span>
            </nav>
          </ScrollReveal>

          {/* Icon + Title */}
          <ScrollReveal delay={0.1}>
            <div className="flex flex-col sm:flex-row items-start gap-6 mb-6">
              <div className="relative gold-pulse-ring w-20 h-20 rounded-full bg-brand-gold/10 border border-brand-gold/30 flex items-center justify-center flex-shrink-0">
                <PracticeIcon name={data.icon} className="w-9 h-9 text-brand-gold" strokeWidth={1.5} />
              </div>
              <div>
                <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white text-elegant-shadow mb-3">
                  {data.title}
                </h1>
                <p className="font-display text-lg sm:text-xl text-brand-gold italic">
                  {data.tagline}
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* Gold Separator */}
          <ScrollReveal delay={0.2}>
            <div className="h-[2px] w-20 bg-gradient-to-r from-brand-gold to-brand-gold-light mb-8" />
          </ScrollReveal>

          {/* Stats Bar */}
          <ScrollReveal delay={0.25}>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 mb-10">
              {data.stats.map((stat, i) => (
                <div key={i} className="text-center sm:text-left">
                  <div className="font-display text-2xl sm:text-3xl font-bold text-gold-gradient">{stat.value}</div>
                  <div className="font-body text-xs sm:text-sm text-brand-muted mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </ScrollReveal>

          {/* Back Button */}
          <ScrollReveal delay={0.3}>
            <button onClick={onBack} className="btn-premium-ghost text-white/70 hover:text-brand-gold gap-2">
              <ArrowLeft className="w-4 h-4" /> Back to Home
            </button>
          </ScrollReveal>
        </div>

        {/* Corner accents */}
        <div className="corner-gold-tl absolute inset-0 pointer-events-none" />
        <div className="corner-gold-br absolute inset-0 pointer-events-none" />
        {/* Wave bottom */}
        <div className="wave-divider-bottom" />
      </section>

      {/* ═══ OVERVIEW ═══ */}
      <section className="bg-brand-cream dark:bg-brand-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-16">
            <div className="lg:col-span-2">
              <ScrollReveal>
                <span className="font-body text-xs font-semibold tracking-[0.2em] uppercase text-brand-gold mb-3 block">Overview</span>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-brand-dark dark:text-brand-inverse mb-6 text-elegant-shadow">
                  {data.title}
                </h2>
              </ScrollReveal>
              {data.overview.split("\n\n").map((para, i) => (
                <ScrollReveal key={i} delay={i * 0.1}>
                  <p className="font-body text-sm sm:text-base text-brand-body dark:text-brand-muted leading-relaxed mb-5">
                    {para}
                  </p>
                </ScrollReveal>
              ))}
            </div>
            <div>
              <ScrollReveal delay={0.2}>
                <div className="space-y-4">
                  {data.keyServices.slice(0, 3).map((service, i) => (
                    <div key={i} className="card-glass rounded-lg p-5">
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-brand-gold flex-shrink-0 mt-0.5" strokeWidth={1.75} />
                        <div>
                          <h3 className="font-body font-semibold text-sm text-brand-dark dark:text-brand-inverse mb-1">{service.title}</h3>
                          <p className="font-body text-xs text-brand-muted leading-relaxed">{service.description.slice(0, 80)}...</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ KEY SERVICES GRID ═══ */}
      <section className="bg-brand-cream dark:bg-brand-dark bg-dot-pattern">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <ScrollReveal>
            <div className="text-center mb-12">
              <span className="font-body text-xs font-semibold tracking-[0.2em] uppercase text-brand-gold mb-3 block">Our Expertise</span>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-brand-dark dark:text-brand-inverse text-elegant-shadow">
                Key Services
              </h2>
              <div className="ornament-line max-w-[120px] mx-auto mt-4" />
            </div>
          </ScrollReveal>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {data.keyServices.map((service, i) => (
              <motion.div key={i} variants={staggerChildVariants} className="card-glass rounded-lg p-5 card-hover-lift">
                <div className="w-10 h-10 rounded-md bg-brand-gold/10 flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-5 h-5 text-brand-gold" strokeWidth={1.75} />
                </div>
                <h3 className="font-body font-semibold text-sm text-brand-dark dark:text-brand-inverse mb-2">{service.title}</h3>
                <p className="font-body text-xs text-brand-muted leading-relaxed">{service.description}</p>
              </motion.div>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ═══ OUR PROCESS ═══ */}
      <section className="bg-brand-parchment dark:bg-brand-navy/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <ScrollReveal>
            <div className="text-center mb-12">
              <span className="font-body text-xs font-semibold tracking-[0.2em] uppercase text-brand-gold mb-3 block">How We Work</span>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-brand-dark dark:text-brand-inverse text-elegant-shadow">
                Our Process
              </h2>
              <div className="ornament-line max-w-[120px] mx-auto mt-4" />
            </div>
          </ScrollReveal>

          <StaggerContainer className="relative">
            {/* Horizontal connector (desktop) */}
            <div className="hidden lg:block absolute top-12 left-[12.5%] right-[12.5%] h-[2px] bg-gradient-to-r from-transparent via-brand-gold/25 to-transparent" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
              {data.processSteps.map((step) => (
                <motion.div key={step.step} variants={staggerChildVariants} className="relative text-center">
                  <div className="step-number-watermark">{String(step.step).padStart(2, "0")}</div>
                  <div className="relative z-10 w-24 h-24 mx-auto rounded-full bg-brand-dark dark:bg-brand-navy border-2 border-brand-gold/30 flex items-center justify-center mb-5">
                    <span className="font-display text-2xl font-bold text-brand-gold">{step.step}</span>
                  </div>
                  <h3 className="font-body font-semibold text-sm text-brand-dark dark:text-brand-inverse mb-2">{step.title}</h3>
                  <p className="font-body text-xs text-brand-body dark:text-brand-muted leading-relaxed max-w-[240px] mx-auto">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </StaggerContainer>
        </div>
      </section>

      {/* ═══ CASE STUDIES ═══ */}
      <section className="bg-brand-dark noise-overlay">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <ScrollReveal>
            <div className="text-center mb-12">
              <span className="font-body text-xs font-semibold tracking-[0.2em] uppercase text-brand-gold mb-3 block">Track Record</span>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-white text-elegant-shadow">
                Case Results
              </h2>
              <div className="ornament-line max-w-[120px] mx-auto mt-4" />
            </div>
          </ScrollReveal>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {data.caseStudies.map((cs, i) => (
              <motion.div key={i} variants={staggerChildVariants} className="card-gradient-border">
                <div className="bg-brand-navy/60 dark:bg-brand-dark rounded-xl p-6 h-full flex flex-col">
                  <span className="inline-block self-start px-3 py-1 rounded-full bg-brand-gold/10 border border-brand-gold/20 font-body text-xs font-medium text-brand-gold mb-4">
                    {cs.category}
                  </span>
                  <h3 className="font-body font-semibold text-sm text-white mb-3">{cs.title}</h3>
                  <p className="font-body text-xs text-brand-muted leading-relaxed mb-4 flex-1">{cs.outcome}</p>
                  <div className="border-t border-brand-gold/15 pt-4">
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-brand-gold" strokeWidth={1.75} />
                      <span className="font-body font-semibold text-sm text-brand-gold">{cs.result}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ═══ FAQ SECTION ═══ */}
      <section className="bg-brand-cream dark:bg-brand-dark">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <ScrollReveal>
            <div className="text-center mb-12">
              <span className="font-body text-xs font-semibold tracking-[0.2em] uppercase text-brand-gold mb-3 block">Common Questions</span>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-brand-dark dark:text-brand-inverse text-elegant-shadow">
                Frequently Asked Questions
              </h2>
              <div className="ornament-line max-w-[120px] mx-auto mt-4" />
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <div className="card-glass rounded-xl p-6 sm:p-8">
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

      {/* ═══ CTA SECTION ═══ */}
      <section className="relative bg-brand-dark noise-overlay overflow-hidden">
        <div className="absolute inset-0 bg-radial-glow" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center">
          <ScrollReveal>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-white text-elegant-shadow mb-4">
              Ready to Discuss Your Case?
            </h2>
            <p className="font-body text-brand-muted mb-10 max-w-xl mx-auto leading-relaxed">
              Our experienced team is here to provide the expert legal guidance you need. Book a consultation today — your first consultation is complimentary.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
              <button onClick={handleBookConsultation} className="btn-premium">
                Book a Consultation <ArrowRight className="w-4 h-4" />
              </button>
              <a href="tel:+27110001234" className="btn-premium-outline">
                <Phone className="w-4 h-4" /> Call Us Now
              </a>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-6 text-brand-muted">
              <div className="flex items-center gap-2 font-body text-xs">
                <Clock className="w-4 h-4 text-brand-gold" strokeWidth={1.5} />
                Mon – Fri: 08:00 – 17:00
              </div>
              <div className="flex items-center gap-2 font-body text-xs">
                <ShieldCheck className="w-4 h-4 text-brand-gold" strokeWidth={1.5} />
                Confidential & Discreet
              </div>
              <div className="flex items-center gap-2 font-body text-xs">
                <Star className="w-4 h-4 text-brand-gold" strokeWidth={1.5} />
                500+ 5-Star Reviews
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══ RELATED PRACTICE AREAS ═══ */}
      {relatedData.length > 0 && (
        <section className="bg-brand-cream dark:bg-brand-dark">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
            <ScrollReveal>
              <div className="text-center mb-12">
                <span className="font-body text-xs font-semibold tracking-[0.2em] uppercase text-brand-gold mb-3 block">Explore More</span>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-brand-dark dark:text-brand-inverse text-elegant-shadow">
                  Related Practice Areas
                </h2>
                <div className="ornament-line max-w-[120px] mx-auto mt-4" />
              </div>
            </ScrollReveal>

            <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedData.map((related) => (
                  <motion.button
                    key={related.slug}
                    variants={staggerChildVariants}
                    onClick={() => onNavigate?.(related.slug)}
                    className="card-glass rounded-lg p-6 text-left card-hover-lift group"
                  >
                    <div className="w-12 h-12 rounded-lg bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center mb-4 group-hover:bg-brand-gold/20 transition-colors">
                      <PracticeIcon name={related.icon} className="w-6 h-6 text-brand-gold" strokeWidth={1.5} />
                    </div>
                    <h3 className="font-display text-lg font-bold text-brand-dark dark:text-brand-inverse mb-2">{related.title}</h3>
                    <p className="font-body text-xs text-brand-muted leading-relaxed mb-4 line-clamp-3">{related.tagline}</p>
                    <span className="inline-flex items-center gap-1.5 font-body text-sm font-semibold text-brand-gold group-hover:gap-2.5 transition-all">
                      Learn More <ArrowRight className="w-4 h-4" />
                    </span>
                  </motion.button>
                )
              )}
            </StaggerContainer>
          </div>
        </section>
      )}
    </div>
  );
}
