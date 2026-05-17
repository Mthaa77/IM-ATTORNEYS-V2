"use client";

import { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Scale,
  Home,
  Gavel,
  Building2,
  ShieldCheck,
  FileText,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  Calculator,
  MessageSquare,
  Diamond,
  Clock,
  Sparkles,
} from "lucide-react";
import { ScrollReveal } from "@/components/im/ScrollReveal";

/* ------------------------------------------------------------------ */
/*  Practice area data                                                 */
/* ------------------------------------------------------------------ */

type PracticeAreaKey =
  | "family"
  | "criminal"
  | "commercial"
  | "claims"
  | "wills"
  | "litigation";

interface PracticeArea {
  key: PracticeAreaKey;
  label: string;
  icon: typeof Scale;
  color: string;
}

const practiceAreas: PracticeArea[] = [
  { key: "family", label: "Family Law", icon: Home, color: "#C6A84B" },
  { key: "criminal", label: "Criminal Law", icon: Gavel, color: "#C6A84B" },
  { key: "commercial", label: "Commercial Law", icon: Building2, color: "#C6A84B" },
  { key: "claims", label: "Claims vs State", icon: ShieldCheck, color: "#C6A84B" },
  { key: "wills", label: "Wills & Estates", icon: FileText, color: "#C6A84B" },
  { key: "litigation", label: "Litigation", icon: Scale, color: "#C6A84B" },
];

/* ------------------------------------------------------------------ */
/*  Context questions by practice area                                 */
/* ------------------------------------------------------------------ */

interface ContextQuestion {
  id: string;
  label: string;
  options: { value: string; label: string }[];
}

const contextQuestions: Record<PracticeAreaKey, ContextQuestion[]> = {
  family: [
    {
      id: "children",
      label: "Are minor children involved?",
      options: [
        { value: "no", label: "No" },
        { value: "yes-1-2", label: "Yes, 1–2 children" },
        { value: "yes-3+", label: "Yes, 3 or more" },
      ],
    },
    {
      id: "asset_value",
      label: "What is the estimated asset value?",
      options: [
        { value: "under-500k", label: "Under R500,000" },
        { value: "500k-2m", label: "R500,000 – R2 million" },
        { value: "2m-10m", label: "R2 – R10 million" },
        { value: "over-10m", label: "Over R10 million" },
      ],
    },
  ],
  criminal: [
    {
      id: "severity",
      label: "What is the severity level?",
      options: [
        { value: "minor", label: "Minor offence" },
        { value: "moderate", label: "Moderate offence" },
        { value: "serious", label: "Serious / indictable" },
        { value: " Schedule6", label: "Schedule 6 offence" },
      ],
    },
    {
      id: "charges",
      label: "Are there multiple charges?",
      options: [
        { value: "single", label: "Single charge" },
        { value: "2-3", label: "2–3 charges" },
        { value: "4+", label: "4 or more charges" },
      ],
    },
  ],
  commercial: [
    {
      id: "contract_value",
      label: "What is the contract / dispute value?",
      options: [
        { value: "under-500k", label: "Under R500,000" },
        { value: "500k-5m", label: "R500,000 – R5 million" },
        { value: "5m-50m", label: "R5 – R50 million" },
        { value: "over-50m", label: "Over R50 million" },
      ],
    },
    {
      id: "multi_party",
      label: "Is this a multi-party matter?",
      options: [
        { value: "no", label: "No, bilateral" },
        { value: "yes", label: "Yes, multi-party" },
      ],
    },
    {
      id: "urgency",
      label: "What is the time sensitivity?",
      options: [
        { value: "planning", label: "Planning ahead" },
        { value: "soon", label: "Within 30 days" },
        { value: "urgent", label: "Urgent – within 7 days" },
      ],
    },
  ],
  claims: [
    {
      id: "claim_value",
      label: "What is the estimated claim value?",
      options: [
        { value: "under-200k", label: "Under R200,000" },
        { value: "200k-1m", label: "R200,000 – R1 million" },
        { value: "1m-5m", label: "R1 – R5 million" },
        { value: "over-5m", label: "Over R5 million" },
      ],
    },
    {
      id: "injury",
      label: "Is there permanent injury?",
      options: [
        { value: "none", label: "No permanent injury" },
        { value: "partial", label: "Partial / temporary" },
        { value: "permanent", label: "Permanent disability" },
      ],
    },
  ],
  wills: [
    {
      id: "estate_value",
      label: "What is the total estate value?",
      options: [
        { value: "under-1m", label: "Under R1 million" },
        { value: "1m-5m", label: "R1 – R5 million" },
        { value: "5m-20m", label: "R5 – R20 million" },
        { value: "over-20m", label: "Over R20 million" },
      ],
    },
    {
      id: "beneficiaries",
      label: "Number of beneficiaries?",
      options: [
        { value: "1-2", label: "1–2" },
        { value: "3-5", label: "3–5" },
        { value: "6+", label: "6 or more" },
      ],
    },
  ],
  litigation: [
    {
      id: "claim_amount",
      label: "What is the claim amount?",
      options: [
        { value: "under-500k", label: "Under R500,000" },
        { value: "500k-5m", label: "R500,000 – R5 million" },
        { value: "5m-25m", label: "R5 – R25 million" },
        { value: "over-25m", label: "Over R25 million" },
      ],
    },
    {
      id: "multi_party",
      label: "Is this a multi-party dispute?",
      options: [
        { value: "no", label: "No" },
        { value: "yes", label: "Yes" },
      ],
    },
  ],
};

/* ------------------------------------------------------------------ */
/*  Estimate ranges (simplified realistic ranges in ZAR)              */
/* ------------------------------------------------------------------ */

function getEstimateRange(
  area: PracticeAreaKey,
  answers: Record<string, string>
): { low: string; high: string; description: string } {
  const multiplierMap: Record<string, number> = {
    "under-500k": 0.5, "500k-2m": 1.5, "2m-10m": 4, "over-10m": 8,
    "under-200k": 0.3, "200k-1m": 1, "1m-5m": 4, "over-5m": 8,
    "under-1m": 0.5, "1m-5m": 2.5, "5m-20m": 8, "over-20m": 15,
    "under-500k": 0.5, "500k-5m": 3, "5m-50m": 15, "over-50m": 30,
    minor: 0.3, moderate: 1, serious: 3, " Schedule6": 5,
    single: 1, "2-3": 2, "4+": 3.5,
    no: 1, yes: 2,
    "no": 1, "yes-1-2": 1.5, "yes-3+": 2,
    none: 1, partial: 2.5, permanent: 5,
    "1-2": 1, "3-5": 1.5, "6+": 2.5,
    planning: 0.8, soon: 1.2, urgent: 2,
  };

  const baseFee = area === "criminal" ? 15000 : 20000;
  let total = baseFee;
  for (const val of Object.values(answers)) {
    total *= (multiplierMap[val] || 1);
  }

  const low = Math.round(total * 0.8);
  const high = Math.round(total * 1.4);

  const fmt = (n: number) =>
    n >= 1_000_000
      ? `R${(n / 1_000_000).toFixed(1)}M`
      : n >= 1_000
      ? `R${(n / 1_000).toFixed(0)}K`
      : `R${n}`;

  const descriptions: Record<PracticeAreaKey, string> = {
    family: "Estimated total legal costs for the duration of the matter",
    criminal: "Estimated legal representation and court preparation costs",
    commercial: "Estimated legal fees for commercial proceedings",
    claims: "Estimated legal costs for state claim proceedings",
    wills: "Estimated estate planning and administration fees",
    litigation: "Estimated litigation and dispute resolution costs",
  };

  return {
    low: fmt(low),
    high: fmt(high),
    description: descriptions[area],
  };
}

/* ------------------------------------------------------------------ */
/*  Tilt card hook (mouse-follow spotlight)                            */
/* ------------------------------------------------------------------ */

function useTilt(ref: React.RefObject<HTMLDivElement | null>) {
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -4;
      const rotateY = ((x - centerX) / centerX) * 4;
      ref.current.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02,1.02,1.02)`;
    },
    [ref]
  );

  const handleMouseLeave = useCallback(() => {
    if (!ref.current) return;
    ref.current.style.transform =
      "perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)";
  }, [ref]);

  return { handleMouseMove, handleMouseLeave };
}

/* ------------------------------------------------------------------ */
/*  Ornamental Divider                                                 */
/* ------------------------------------------------------------------ */

function OrnamentalDivider() {
  return (
    <div
      className="flex items-center justify-center gap-3 mt-2 mb-6"
      aria-hidden="true"
    >
      <div
        className="h-px w-12 sm:w-16"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(198,168,75,0.5))",
        }}
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
        style={{
          background:
            "linear-gradient(270deg, transparent, rgba(198,168,75,0.5))",
        }}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  WhatsApp URL helper                                                */
/* ------------------------------------------------------------------ */

function whatsappUrl(text: string) {
  return `https://wa.me/27812488048?text=${encodeURIComponent(text)}`;
}

/* ------------------------------------------------------------------ */
/*  Step indicators                                                    */
/* ------------------------------------------------------------------ */

function StepIndicator({
  currentStep,
  totalSteps,
}: {
  currentStep: number;
  totalSteps: number;
}) {
  return (
    <div className="flex items-center justify-center gap-2 mb-8">
      {Array.from({ length: totalSteps }, (_, i) => (
        <div key={i} className="flex items-center gap-2">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold font-body transition-all duration-500"
            style={{
              background:
                i <= currentStep
                  ? "linear-gradient(135deg, #C6A84B, #E4D49A)"
                  : "rgba(198,168,75,0.15)",
              color: i <= currentStep ? "#0D1B2A" : "rgba(198,168,75,0.5)",
              border: `1px solid ${
                i <= currentStep
                  ? "rgba(198,168,75,0.6)"
                  : "rgba(198,168,75,0.2)"
              }`,
              boxShadow:
                i === currentStep
                  ? "0 0 20px rgba(198,168,75,0.3)"
                  : "none",
            }}
          >
            {i < currentStep ? (
              <CheckCircle className="w-4 h-4" />
            ) : (
              i + 1
            )}
          </div>
          {i < totalSteps - 1 && (
            <div
              className="w-8 sm:w-12 h-px transition-all duration-500"
              style={{
                background:
                  i < currentStep
                    ? "linear-gradient(90deg, rgba(198,168,75,0.6), rgba(198,168,75,0.3))"
                    : "rgba(198,168,75,0.15)",
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Practice Area Card (extracted for hook rules)                     */
/* ------------------------------------------------------------------ */

function PracticeAreaCard({
  area,
  isSelected,
  onSelect,
}: {
  area: PracticeArea;
  isSelected: boolean;
  onSelect: (key: PracticeAreaKey) => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const tilt = useTilt(cardRef);
  const Icon = area.icon;

  return (
    <motion.button
      ref={cardRef}
      onClick={() => onSelect(area.key)}
      onMouseMove={tilt.handleMouseMove}
      onMouseLeave={tilt.handleMouseLeave}
      className="glass-premium rounded-xl p-4 sm:p-5 text-center cursor-pointer transition-all duration-400"
      style={{
        border: isSelected
          ? "2px solid rgba(198,168,75,0.8)"
          : "1px solid rgba(198,168,75,0.15)",
        boxShadow: isSelected
          ? "0 0 30px rgba(198,168,75,0.2), inset 0 0 20px rgba(198,168,75,0.05)"
          : "none",
        transition: "transform 0.2s ease, border-color 0.3s, box-shadow 0.3s",
      }}
      whileTap={{ scale: 0.97 }}
    >
      <div
        className="w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-3"
        style={{
          background: isSelected
            ? "rgba(198,168,75,0.2)"
            : "rgba(198,168,75,0.08)",
          border: `1px solid ${
            isSelected
              ? "rgba(198,168,75,0.4)"
              : "rgba(198,168,75,0.15)"
          }`,
        }}
      >
        <Icon
          className="w-5 h-5"
          style={{ color: isSelected ? "#E4D49A" : "#C6A84B" }}
        />
      </div>
      <span
        className="font-body text-xs sm:text-sm font-semibold"
        style={{
          color: isSelected ? "#E4D49A" : "rgba(255,255,255,0.6)",
        }}
      >
        {area.label}
      </span>
      {isSelected && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="mt-2 mx-auto w-5 h-5 rounded-full flex items-center justify-center"
          style={{
            background: "#C6A84B",
            boxShadow: "0 0 12px rgba(198,168,75,0.4)",
          }}
        >
          <CheckCircle className="w-3 h-3" style={{ color: "#0D1B2A" }} />
        </motion.div>
      )}
    </motion.button>
  );
}

/* ------------------------------------------------------------------ */
/*  Step 1: Practice Area Selection                                   */
/* ------------------------------------------------------------------ */

function Step1PracticeArea({
  selected,
  onSelect,
}: {
  selected: PracticeAreaKey | null;
  onSelect: (key: PracticeAreaKey) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -60 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <h3 className="font-display text-xl sm:text-2xl text-white mb-2">
        Select Your Practice Area
      </h3>
      <p className="font-body text-sm text-white/50 mb-8 max-w-lg mx-auto">
        Choose the area of law most relevant to your matter
      </p>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 max-w-3xl mx-auto">
        {practiceAreas.map((area) => (
          <PracticeAreaCard
            key={area.key}
            area={area}
            isSelected={selected === area.key}
            onSelect={onSelect}
          />
        ))}
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Step 2: Context Questions                                         */
/* ------------------------------------------------------------------ */

function Step2ContextQuestions({
  area,
  answers,
  onAnswer,
}: {
  area: PracticeAreaKey;
  answers: Record<string, string>;
  onAnswer: (questionId: string, value: string) => void;
}) {
  const questions = contextQuestions[area];
  const allAnswered = questions.every((q) => answers[q.id]);

  return (
    <motion.div
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -60 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <h3 className="font-display text-xl sm:text-2xl text-white mb-2">
        Tell Us More
      </h3>
      <p className="font-body text-sm text-white/50 mb-8 max-w-lg mx-auto">
        A few quick questions to refine your estimate
      </p>
      <div className="space-y-6 max-w-2xl mx-auto">
        {questions.map((q, qi) => (
          <motion.div
            key={q.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: qi * 0.15 }}
          >
            <label className="block font-body text-sm font-semibold text-brand-gold-light mb-3">
              {q.label}
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3">
              {q.options.map((opt) => {
                const isSelected = answers[q.id] === opt.value;
                return (
                  <motion.button
                    key={opt.value}
                    onClick={() => onAnswer(q.id, opt.value)}
                    className="glass-premium rounded-lg px-3 py-2.5 text-center cursor-pointer transition-all duration-300"
                    style={{
                      border: isSelected
                        ? "1.5px solid rgba(198,168,75,0.7)"
                        : "1px solid rgba(198,168,75,0.1)",
                      boxShadow: isSelected
                        ? "0 0 20px rgba(198,168,75,0.15)"
                        : "none",
                    }}
                    whileTap={{ scale: 0.96 }}
                  >
                    <span
                      className="font-body text-xs sm:text-sm"
                      style={{
                        color: isSelected
                          ? "#E4D49A"
                          : "rgba(255,255,255,0.5)",
                      }}
                    >
                      {opt.label}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Step 3: Results                                                   */
/* ------------------------------------------------------------------ */

function Step3Results({
  area,
  answers,
  onReset,
}: {
  area: PracticeAreaKey;
  answers: Record<string, string>;
  onReset: () => void;
}) {
  const areaLabel =
    practiceAreas.find((a) => a.key === area)?.label ?? area;
  const estimate = getEstimateRange(area, answers);

  const summaryParts = Object.entries(answers).map(([key, val]) => {
    const q = contextQuestions[area].find((qq) => qq.id === key);
    const opt = q?.options.find((o) => o.value === val);
    return `${q?.label}: ${opt?.label}`;
  });

  const waMessage = `Hello IM Attorneys!\n\nI'm interested in ${areaLabel} services.\n\n${summaryParts.join("\n")}\n\nEstimated range: ${estimate.low} – ${estimate.high}\n\nI'd like to book a consultation.`;

  return (
    <motion.div
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -60 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 15,
          delay: 0.1,
        }}
        className="w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-6"
        style={{
          background: "rgba(198,168,75,0.12)",
          border: "2px solid rgba(198,168,75,0.4)",
          boxShadow: "0 0 40px rgba(198,168,75,0.2)",
        }}
      >
        <Calculator className="w-9 h-9" style={{ color: "#C6A84B" }} />
      </motion.div>

      <h3 className="font-display text-2xl sm:text-3xl text-white mb-2">
        Your Estimated Range
      </h3>
      <p className="font-body text-sm text-white/50 mb-8">
        Based on your {areaLabel} matter profile
      </p>

      <div
        className="glass-premium rounded-2xl p-6 sm:p-8 max-w-lg mx-auto mb-6"
        style={{
          border: "1px solid rgba(198,168,75,0.3)",
        }}
      >
        <div className="flex items-center justify-center gap-3 mb-4">
          <Diamond className="w-4 h-4" style={{ color: "#C6A84B" }} />
          <span className="font-body text-xs uppercase tracking-[0.2em] text-brand-gold">
            Estimated Legal Costs
          </span>
          <Diamond className="w-4 h-4" style={{ color: "#C6A84B" }} />
        </div>
        <div className="flex items-baseline justify-center gap-3 mb-2">
          <span className="font-display text-4xl sm:text-5xl text-gold-gradient text-shadow-gold-glow">
            {estimate.low}
          </span>
          <span className="font-body text-xl text-white/40">–</span>
          <span className="font-display text-4xl sm:text-5xl text-gold-gradient text-shadow-gold-glow">
            {estimate.high}
          </span>
        </div>
        <p className="font-body text-xs text-white/40 mt-2">
          {estimate.description}
        </p>
      </div>

      <div
        className="glass-premium rounded-xl p-4 max-w-lg mx-auto mb-8 text-left"
      >
        <p className="font-body text-xs text-white/40 mb-2 uppercase tracking-wider">
          Summary
        </p>
        {summaryParts.map((s, i) => (
          <div key={i} className="flex items-start gap-2 mb-1.5">
            <CheckCircle
              className="w-3.5 h-3.5 shrink-0 mt-0.5"
              style={{ color: "#C6A84B" }}
            />
            <span className="font-body text-sm text-white/70">{s}</span>
          </div>
        ))}
      </div>

      <p className="font-body text-xs text-white/30 mb-6 max-w-md mx-auto">
        * This is a preliminary estimate only. Actual fees depend on the
        complexity, duration, and specific circumstances of your matter. Contact
        us for an accurate assessment.
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <a
          href={whatsappUrl(waMessage)}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-premium inline-flex items-center gap-2 px-6 py-3 font-body text-sm rounded-md"
        >
          <MessageSquare className="w-4 h-4" />
          Book Consultation via WhatsApp
        </a>
        <button
          onClick={onReset}
          className="btn-premium-outline inline-flex items-center gap-2 px-5 py-3 font-body text-sm rounded-md"
        >
          <ArrowLeft className="w-4 h-4" />
          Start Over
        </button>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Component                                                     */
/* ------------------------------------------------------------------ */

export function CaseValueEstimator() {
  const [step, setStep] = useState(0);
  const [selectedArea, setSelectedArea] = useState<PracticeAreaKey | null>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const handleSelectArea = useCallback((key: PracticeAreaKey) => {
    setSelectedArea(key);
    setAnswers({});
    setStep(1);
  }, []);

  const handleAnswer = useCallback(
    (questionId: string, value: string) => {
      setAnswers((prev) => ({ ...prev, [questionId]: value }));
    },
    []
  );

  const handleNext = useCallback(() => {
    if (step === 1 && selectedArea) {
      const questions = contextQuestions[selectedArea];
      if (questions.every((q) => answers[q.id])) {
        setStep(2);
      }
    }
  }, [step, selectedArea, answers]);

  const handleReset = useCallback(() => {
    setStep(0);
    setSelectedArea(null);
    setAnswers({});
  }, []);

  const isStep2Complete =
    selectedArea &&
    contextQuestions[selectedArea].every((q) => answers[q.id]);

  return (
    <section
      id="case-estimator"
      className="relative py-20 sm:py-28 lg:py-36 overflow-hidden noise-overlay"
      style={{ background: "#0D1B2A" }}
      aria-labelledby="estimator-heading"
    >
      {/* Background accents */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundImage: `radial-gradient(ellipse at 20% 30%, rgba(198,168,75,0.06) 0%, transparent 50%),
                           radial-gradient(ellipse at 80% 70%, rgba(198,168,75,0.04) 0%, transparent 50%)`,
        }}
      />

      {/* Top gold accent */}
      <div
        className="absolute top-0 left-0 right-0 h-px z-10"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(198,168,75,0.3), transparent)",
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── Heading Area ── */}
        <div className="text-center mb-10 sm:mb-14">
          <ScrollReveal direction="up" delay={0}>
            <span className="label-premium mb-4 block">
              <Sparkles className="w-3.5 h-3.5 inline mr-1" />
              Interactive Tool
            </span>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.1}>
            <h2 id="estimator-heading" className="heading-gold-glossy">
              Case Value Estimator
            </h2>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.15}>
            <OrnamentalDivider />
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.2}>
            <p className="subheading-premium-dark">
              Get a preliminary estimate of your legal costs in three simple
              steps. This tool provides a general indication — your actual fees
              will be confirmed during your consultation.
            </p>
          </ScrollReveal>
        </div>

        {/* ── Wizard ── */}
        <div className="glass-premium rounded-2xl p-6 sm:p-10">
          {/* Step indicators */}
          <StepIndicator currentStep={step} totalSteps={3} />

          <AnimatePresence mode="wait">
            {step === 0 && (
              <Step1PracticeArea
                key="step1"
                selected={selectedArea}
                onSelect={handleSelectArea}
              />
            )}
            {step === 1 && selectedArea && (
              <Step2ContextQuestions
                key="step2"
                area={selectedArea}
                answers={answers}
                onAnswer={handleAnswer}
              />
            )}
            {step === 2 && selectedArea && (
              <Step3Results
                key="step3"
                area={selectedArea}
                answers={answers}
                onReset={handleReset}
              />
            )}
          </AnimatePresence>

          {/* Navigation buttons for steps 1 and 2 */}
          {step < 2 && (
            <div className="flex items-center justify-between mt-8">
              {step === 1 ? (
                <button
                  onClick={() => setStep(0)}
                  className="btn-premium-ghost inline-flex items-center gap-2 px-4 py-2 font-body text-sm rounded-md text-brand-gold/70"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </button>
              ) : (
                <div />
              )}
              {step === 1 && (
                <motion.button
                  onClick={handleNext}
                  className="btn-premium inline-flex items-center gap-2 px-6 py-3 font-body text-sm rounded-md disabled:opacity-40 disabled:cursor-not-allowed"
                  disabled={!isStep2Complete}
                  whileTap={{ scale: 0.97 }}
                  style={
                    !isStep2Complete
                      ? {
                          background: "rgba(198,168,75,0.15)",
                          color: "rgba(198,168,75,0.3)",
                          boxShadow: "none",
                        }
                      : undefined
                  }
                >
                  Get Estimate
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Bottom gold accent */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px z-10"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(198,168,75,0.3), transparent)",
        }}
      />
    </section>
  );
}
