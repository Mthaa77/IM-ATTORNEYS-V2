"use client";

import { useRef, useState, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  Clock,
  Trophy,
  Banknote,
  TrendingUp,
  ShieldCheck,
  Scale,
  ChevronRight,
  Sparkles,
  Quote,
  Gavel,
  Heart,
  Landmark,
  Eye,
  EyeOff,
} from "lucide-react";
import {
  ScrollReveal,
  StaggerContainer,
  staggerChildVariants,
  GoldLine,
  CountUp,
} from "@/components/im/ScrollReveal";

/* ══════════════════════════════════════════════════════════════════════
   DATA
   ══════════════════════════════════════════════════════════════════════ */

interface CaseStudy {
  id: string;
  clientType: string;
  practiceArea: string;
  icon: React.ElementType;
  severity: "Critical" | "Extreme" | "High";
  duration: string;
  before: {
    title: string;
    description: string;
    highlights: string[];
  };
  after: {
    title: string;
    description: string;
    highlights: string[];
    result: string;
    resultValue: string;
  };
  testimonial: string;
}

const caseStudies: CaseStudy[] = [
  {
    id: "raf-claim",
    clientType: "Individual — Road Accident Victim",
    practiceArea: "Claims vs State",
    icon: ShieldCheck,
    severity: "Critical",
    duration: "14 months",
    before: {
      title: "Devastating Car Accident — RAF Claim Denied",
      description:
        "A 34-year-old teacher was involved in a severe head-on collision caused by a drunk driver. The Road Accident Fund initially denied liability, leaving our client with mounting medical bills, no income, and rapidly deteriorating physical and mental health. She was told by two previous attorneys that her case was 'too difficult to win'.",
      highlights: [
        "RAF denied liability — claim rejected twice",
        "R1.8 million in medical debt accumulated",
        "Unable to work for 11 months",
        "Previous attorneys declined the matter",
      ],
    },
    after: {
      title: "R1.2 Million Settlement Secured",
      description:
        "We built an airtight case using accident reconstruction experts, medical specialists, and forensic evidence. Through strategic litigation and relentless advocacy, we not only overturned the RAF's denial but secured a comprehensive settlement covering all past and future medical expenses, loss of earnings, and general damages.",
      highlights: [
        "Liability established through expert testimony",
        "Full medical expenses recovered",
        "Future care provisions secured",
        "Appeal process navigated successfully",
      ],
      result: "R1.2 Million",
      resultValue: "1200000",
    },
    testimonial:
      "\"After being turned away by other attorneys, IM Attorneys took my case and fought for me like I was family. They never gave up, even when the odds were against us. I can now focus on my recovery with financial security.\"",
  },
  {
    id: "criminal-defence",
    clientType: "Professional — Fraud Charges",
    practiceArea: "Criminal Law",
    icon: Gavel,
    severity: "Extreme",
    duration: "8 months",
    before: {
      title: "Senior Executive Facing Fraud Charges",
      description:
        "A senior banking executive was falsely accused of R12 million fraud by a former employer seeking to deflect blame for their own financial mismanagement. With media attention, reputational damage, and a potential 15-year prison sentence looming, the stakes could not have been higher. The NPA had already indicated their intention to prosecute.",
      highlights: [
        "15-year potential prison sentence",
        "NPA prosecution imminent",
        "Career and reputation destroyed overnight",
        "Complex financial evidence manipulated against client",
      ],
    },
    after: {
      title: "Full Acquittal — All Charges Dismissed",
      description:
        "We assembled a forensic accounting team, identified the evidence tampering, and systematically dismantled the prosecution's case during the preliminary hearing. Through meticulous cross-examination and expert witness testimony, we proved our client had no involvement in the alleged fraud. The NPA withdrew all charges before trial.",
      highlights: [
        "All charges withdrawn at preliminary hearing",
        "Forensic evidence tampering exposed",
        "Reputation fully restored",
        "Counter-claim for damages pursued",
      ],
      result: "Not Guilty",
      resultValue: "0",
    },
    testimonial:
      "\"IM Attorneys saved my life, my career, and my family's future. Their forensic team uncovered evidence that everyone else missed. I cannot express enough gratitude for their relentless pursuit of the truth.\"",
  },
  {
    id: "family-custody",
    clientType: "Parent — Custody Dispute",
    practiceArea: "Family Law",
    icon: Heart,
    severity: "High",
    duration: "6 months",
    before: {
      title: "Mother Denied All Access to Her Children",
      description:
        "A devoted mother of two young children was denied all contact by her estranged husband, who manipulated the children against her and fabricated allegations of neglect. She had not seen her children in four months, and her previous attorney's approach had only worsened the situation through aggressive confrontation.",
      highlights: [
        "Zero contact with children for 4 months",
        "Father fabricated neglect allegations",
        "Previous attorney's strategy backfired",
        "Children showing signs of parental alienation",
      ],
    },
    after: {
      title: "Shared Custody and Supervised Reintegration",
      description:
        "We took a completely different approach — requesting a comprehensive family assessment by a court-appointed psychologist, documenting the alienation patterns, and proposing a phased reintegration plan. The court accepted our evidence-based strategy, granting shared custody with a structured reintegration schedule that prioritised the children's emotional wellbeing.",
      highlights: [
        "Shared custody order granted",
        "Phased reintegration plan implemented",
        "Father's false allegations exposed",
        "Children's best interests prioritised",
      ],
      result: "Custody Granted",
      resultValue: "0",
    },
    testimonial:
      "\"They didn't just win my case — they healed my family. The psychologist's report they obtained revealed exactly what was happening to my children. IM Attorneys gave me my babies back.\"",
  },
];

const firmStats = [
  { value: 2500, suffix: "+", label: "Cases Won", icon: Trophy, prefix: "" },
  { value: 850, suffix: "M", label: "Total Recovered", icon: Banknote, prefix: "R" },
  { value: 98, suffix: "%", label: "Success Rate", icon: TrendingUp, prefix: "" },
  { value: 500, suffix: "+", label: "Families Protected", icon: Heart, prefix: "" },
];

/* ══════════════════════════════════════════════════════════════════════
   ANIMATION VARIANTS
   ══════════════════════════════════════════════════════════════════════ */

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (d: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: d, ease: [0.22, 1, 0.36, 1] },
  }),
};

const cardReveal = {
  hidden: { opacity: 0, y: 40, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

/* ══════════════════════════════════════════════════════════════════════
   CASE STUDY CARD
   ══════════════════════════════════════════════════════════════════════ */

function CaseStudyCard({
  study,
  index,
}: {
  study: CaseStudy;
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-40px" });
  const [showDetails, setShowDetails] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const Icon = study.icon;

  const severityColors = {
    Critical: { bg: "rgba(239,68,68,0.08)", border: "rgba(239,68,68,0.2)", text: "#EF4444" },
    Extreme: { bg: "rgba(245,158,11,0.08)", border: "rgba(245,158,11,0.2)", text: "#F59E0B" },
    High: { bg: "rgba(251,146,60,0.08)", border: "rgba(251,146,60,0.2)", text: "#FB923C" },
  };

  const sev = severityColors[study.severity];

  return (
    <motion.div
      ref={cardRef}
      variants={cardReveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: index * 0.15 }}
      className="group relative"
    >
      <div
        className="relative overflow-hidden rounded-xl"
        style={{
          background: "rgba(255,255,255,0.02)",
          border: "1px solid rgba(198,168,75,0.1)",
        }}
      >
        {/* ── Header ── */}
        <div className="px-6 pt-6 pb-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{
                  background: "rgba(198,168,75,0.08)",
                  border: "1px solid rgba(198,168,75,0.15)",
                }}
              >
                <Icon className="w-5 h-5 text-brand-gold" strokeWidth={1.5} />
              </div>
              <div>
                <p className="font-body text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-gold/60">
                  {study.practiceArea}
                </p>
                <p className="font-body text-[10px] text-white/30">{study.clientType}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span
                className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider"
                style={{ background: sev.bg, border: `1px solid ${sev.border}`, color: sev.text }}
              >
                {study.severity}
              </span>
              <span className="font-body text-[10px] text-white/25 flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {study.duration}
              </span>
            </div>
          </div>

          {/* Case number */}
          <div className="flex items-center gap-3">
            <span className="font-display text-5xl sm:text-6xl font-black" style={{
              color: "rgba(198,168,75,0.06)",
            }}>
              {String(index + 1).padStart(2, "0")}
            </span>
            <div className="flex-1 h-px" style={{
              background: "linear-gradient(90deg, rgba(198,168,75,0.15), transparent)",
            }} />
          </div>
        </div>

        {/* ── BEFORE Section ── */}
        <div className="px-6 pb-4">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-6 h-6 rounded-md flex items-center justify-center bg-red-500/10 border border-red-500/20">
              <AlertTriangle className="w-3 h-3 text-red-400" strokeWidth={2} />
            </div>
            <h3 className="font-display text-base sm:text-lg font-bold text-red-300">
              {study.before.title}
            </h3>
          </div>
          <p className="font-body text-xs sm:text-sm leading-relaxed text-white/45 mb-4">
            {study.before.description}
          </p>
          <ul className="space-y-2">
            {study.before.highlights.map((h, i) => (
              <motion.li
                key={i}
                className="flex items-start gap-2.5"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 + i * 0.08 }}
              >
                <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-red-400/60 mt-1.5" />
                <span className="font-body text-xs text-white/35 leading-relaxed">{h}</span>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* ── Transformation divider ── */}
        <div className="px-6 py-3">
          <div className="relative flex items-center justify-center">
            <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-gold/25 to-transparent" />
            <motion.div
              className="relative z-10 w-10 h-10 rounded-full flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, #C6A84B, #E4D49A)",
                boxShadow: "0 0 20px rgba(198,168,75,0.3)",
              }}
              animate={{
                boxShadow: [
                  "0 0 20px rgba(198,168,75,0.3)",
                  "0 0 35px rgba(198,168,75,0.5)",
                  "0 0 20px rgba(198,168,75,0.3)",
                ],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <ChevronRight className="w-4 h-4 text-brand-dark" strokeWidth={2.5} />
            </motion.div>
          </div>
        </div>

        {/* ── AFTER Section ── */}
        <div className="px-6 pb-4">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-6 h-6 rounded-md flex items-center justify-center bg-emerald-500/10 border border-emerald-500/20">
              <CheckCircle2 className="w-3 h-3 text-emerald-400" strokeWidth={2} />
            </div>
            <h3 className="font-display text-base sm:text-lg font-bold text-emerald-300">
              {study.after.title}
            </h3>
          </div>

          {/* Result badge */}
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg mb-4"
            style={{
              background: "linear-gradient(135deg, rgba(198,168,75,0.1), rgba(198,168,75,0.04))",
              border: "1px solid rgba(198,168,75,0.2)",
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <Trophy className="w-4 h-4 text-brand-gold" strokeWidth={1.5} />
            <span className="font-display text-lg sm:text-xl font-bold text-gold-gradient">
              {study.after.resultValue !== "0" && (
                <CountUp
                  end={parseInt(study.after.resultValue)}
                  prefix="R"
                  duration={2.5}
                  className="font-display text-lg sm:text-xl font-bold"
                />
              )}
              {study.after.resultValue === "0" && study.after.result}
            </span>
          </motion.div>

          <p className="font-body text-xs sm:text-sm leading-relaxed text-white/45 mb-4">
            {study.after.description}
          </p>
          <ul className="space-y-2">
            {study.after.highlights.map((h, i) => (
              <motion.li
                key={i}
                className="flex items-start gap-2.5"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 + i * 0.08 }}
              >
                <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-emerald-400/60 mt-1.5" />
                <span className="font-body text-xs text-white/35 leading-relaxed">{h}</span>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* ── Testimonial toggle ── */}
        <div className="px-6 pb-6">
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="w-full flex items-center justify-between py-3 rounded-lg transition-all duration-300"
            style={{
              background: showDetails ? "rgba(198,168,75,0.05)" : "rgba(255,255,255,0.02)",
              border: `1px solid ${showDetails ? "rgba(198,168,75,0.15)" : "rgba(255,255,255,0.04)"}`,
            }}
          >
            <div className="flex items-center gap-2">
              <Quote className="w-3.5 h-3.5 text-brand-gold/50" />
              <span className="font-body text-xs font-medium text-white/40">Client Testimonial</span>
            </div>
            {showDetails ? (
              <EyeOff className="w-3.5 h-3.5 text-white/30" />
            ) : (
              <Eye className="w-3.5 h-3.5 text-white/30" />
            )}
          </button>

          <AnimatePresence>
            {showDetails && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4 }}
                className="overflow-hidden"
              >
                <div
                  className="mt-3 p-4 rounded-lg"
                  style={{
                    background: "rgba(198,168,75,0.03)",
                    borderLeft: "2px solid rgba(198,168,75,0.3)",
                  }}
                >
                  <p className="font-display text-sm italic leading-relaxed" style={{ color: "rgba(228,212,154,0.7)" }}>
                    {study.testimonial}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ── Gold corner accents ── */}
        <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-brand-gold/15 rounded-tl-xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-brand-gold/15 rounded-br-xl pointer-events-none" />
      </div>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   STAT CARD
   ══════════════════════════════════════════════════════════════════════ */

function StatCard({
  stat,
  index,
}: {
  stat: (typeof firmStats)[number];
  index: number;
}) {
  const Icon = stat.icon;
  return (
    <motion.div
      className="group relative text-center p-5 sm:p-6 rounded-xl overflow-hidden transition-all duration-500 hover:-translate-y-1"
      style={{
        background: "rgba(198,168,75,0.03)",
        border: "1px solid rgba(198,168,75,0.08)",
      }}
      variants={staggerChildVariants}
      whileHover={{
        borderColor: "rgba(198,168,75,0.25)",
        background: "rgba(198,168,75,0.06)",
      }}
    >
      {/* Hover glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at center, rgba(198,168,75,0.06) 0%, transparent 70%)" }}
      />

      <div className="relative z-10">
        <Icon className="w-5 h-5 text-brand-gold/40 mx-auto mb-3" strokeWidth={1.5} />
        <div className="flex items-baseline justify-center gap-0.5 mb-1">
          {stat.prefix && (
            <span className="font-display text-lg font-bold text-brand-gold/50">{stat.prefix}</span>
          )}
          <CountUp
            end={stat.value}
            duration={2.5}
            suffix={stat.suffix}
            className="font-display text-3xl sm:text-4xl font-bold text-gold-gradient"
          />
        </div>
        <span className="font-body text-[10px] sm:text-xs text-white/30 uppercase tracking-[0.15em]">
          {stat.label}
        </span>
      </div>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ══════════════════════════════════════════════════════════════════════ */

export function BeforeAfterSlider() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-60px" });

  return (
    <section
      ref={sectionRef}
      id="before-after"
      className="relative w-full overflow-hidden"
      style={{ backgroundColor: "#0A1222" }}
      aria-label="Case Transformation Theatre"
    >
      {/* ── Background atmosphere ── */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-[600px] h-[600px] pointer-events-none"
          style={{ background: "radial-gradient(ellipse at center, rgba(198,168,75,0.04) 0%, transparent 60%)" }}
        />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] pointer-events-none"
          style={{ background: "radial-gradient(ellipse at center, rgba(198,168,75,0.03) 0%, transparent 60%)" }}
        />
        <div className="absolute inset-0 noise-overlay opacity-[0.02]" />
        <div className="absolute inset-0 bg-crosshatch pointer-events-none opacity-30" />
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
            Case Transformation Theatre
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
            Real Cases. Real Impact.
          </motion.h2>

          <motion.p
            className="font-body text-base sm:text-lg text-white/45 max-w-2xl mx-auto leading-relaxed"
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            custom={0.45}
          >
            Every case tells a story of resilience, strategy, and unwavering commitment. Witness how we transform seemingly impossible legal battles into life-changing victories.
          </motion.p>
        </div>

        {/* ═══════ Case Studies Grid ═══════ */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-7 mb-16 sm:mb-20">
          {caseStudies.map((study, i) => (
            <CaseStudyCard key={study.id} study={study} index={i} />
          ))}
        </div>

        {/* ═══════ Trust Indicators ═══════ */}
        <div>
          <motion.div
            className="h-px mx-auto max-w-xs mb-12 sm:mb-14"
            style={{ background: "linear-gradient(90deg, transparent, rgba(198,168,75,0.25), transparent)" }}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          />

          <StaggerContainer
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5"
            staggerDelay={0.1}
          >
            {firmStats.map((stat, i) => (
              <StatCard key={stat.label} stat={stat} index={i} />
            ))}
          </StaggerContainer>
        </div>

        {/* ═══════ CTA ═══════ */}
        <motion.div
          className="mt-14 sm:mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <p className="font-display text-lg sm:text-xl font-bold text-white/70 mb-3">
            Your case could be next.
          </p>
          <p className="font-body text-sm text-white/35 mb-8 max-w-md mx-auto">
            Don&apos;t let another day pass without the legal representation you deserve.
          </p>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              const el = document.querySelector("#contact");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            className="btn-premium inline-flex items-center gap-2 px-8 py-3.5 font-body text-sm rounded-md"
          >
            <Sparkles className="w-4 h-4" />
            Request a Free Consultation
            <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>

      {/* ── Bottom separator ── */}
      <div className="absolute bottom-0 left-0 right-0 h-px z-10"
        style={{ background: "linear-gradient(90deg, transparent 0%, rgba(198,168,75,0.3) 30%, rgba(198,168,75,0.5) 50%, rgba(198,168,75,0.3) 70%, transparent 100%)" }}
      />
    </section>
  );
}
