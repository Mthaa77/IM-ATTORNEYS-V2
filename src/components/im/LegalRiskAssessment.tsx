"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  AlertTriangle,
  Clock,
  DollarSign,
  Users,
  Target,
  MessageSquare,
  ArrowRight,
  ArrowLeft,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Zap,
  FileText,
  Scale,
  Sparkles,
  CheckCircle,
} from "lucide-react";
import { ScrollReveal } from "@/components/im/ScrollReveal";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface Question {
  id: string;
  question: string;
  icon: typeof Clock;
  options: { value: number; label: string; icon: typeof Clock }[];
}

/* ------------------------------------------------------------------ */
/*  Questions data                                                     */
/* ------------------------------------------------------------------ */

const questions: Question[] = [
  {
    id: "urgency",
    question: "How would you describe your current legal situation?",
    icon: AlertTriangle,
    options: [
      { value: 1, label: "Not urgent — exploring options", icon: ShieldCheck },
      { value: 2, label: "Somewhat concerning", icon: Shield },
      { value: 3, label: "Urgent — need advice soon", icon: ShieldAlert },
      { value: 4, label: "Crisis — immediate action required", icon: AlertTriangle },
    ],
  },
  {
    id: "action",
    question: "Have you already taken any action?",
    icon: FileText,
    options: [
      { value: 1, label: "Nothing yet — just researching", icon: FileText },
      { value: 2, label: "Spoken to another attorney", icon: Users },
      { value: 3, label: "Filed documents", icon: Scale },
      { value: 4, label: "Court proceedings started", icon: AlertTriangle },
    ],
  },
  {
    id: "financial",
    question: "What is the financial value of your matter?",
    icon: DollarSign,
    options: [
      { value: 1, label: "Under R50,000", icon: DollarSign },
      { value: 2, label: "R50,000 – R500,000", icon: DollarSign },
      { value: 3, label: "R500,000 – R5 million", icon: DollarSign },
      { value: 4, label: "Over R5 million", icon: DollarSign },
    ],
  },
  {
    id: "parties",
    question: "How many parties are involved?",
    icon: Users,
    options: [
      { value: 1, label: "Just me", icon: Users },
      { value: 2, label: "2 parties", icon: Users },
      { value: 3, label: "3–5 parties", icon: Users },
      { value: 4, label: "Complex multi-party", icon: Users },
    ],
  },
  {
    id: "outcome",
    question: "What outcome matters most to you?",
    icon: Target,
    options: [
      { value: 1, label: "Quick resolution", icon: Clock },
      { value: 2, label: "Maximum compensation", icon: DollarSign },
      { value: 3, label: "Long-term protection", icon: Shield },
      { value: 4, label: "All of the above", icon: Target },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Score calculation & risk zones                                     */
/* ------------------------------------------------------------------ */

function calculateScore(answers: Record<string, number>): number {
  const values = Object.values(answers);
  const raw = values.reduce((sum, v) => sum + v, 0);
  // Normalize: min 5, max 20 → scale to 1-100
  return Math.round(((raw - 5) / 15) * 99) + 1;
}

function getRiskZone(score: number) {
  if (score <= 25) return { label: "Low Risk", color: "#C6A84B", bgColor: "rgba(198,168,75,0.1)" };
  if (score <= 50) return { label: "Medium Risk", color: "#F59E0B", bgColor: "rgba(245,158,11,0.1)" };
  if (score <= 75) return { label: "High Risk", color: "#EF4444", bgColor: "rgba(239,68,68,0.1)" };
  return { label: "Critical Risk", color: "#DC2626", bgColor: "rgba(220,38,38,0.15)" };
}

function getRecommendation(score: number): string {
  if (score <= 25)
    return "Your legal situation appears manageable with proper guidance. A standard consultation will help you understand your rights and options. Early legal advice can prevent minor issues from becoming major problems.";
  if (score <= 50)
    return "There are elements of your situation that warrant professional legal attention. We recommend scheduling a consultation to develop a clear strategy. Proactive legal counsel at this stage can significantly improve your position.";
  if (score <= 75)
    return "Your matter involves several risk factors that require immediate professional legal representation. We strongly recommend engaging with one of our senior attorneys as soon as possible. Swift action can help protect your interests and legal rights.";
  return "Your situation presents serious and potentially time-sensitive legal challenges. We strongly recommend immediate legal representation. Our team is available 24/7 for urgent matters — please contact us right away for a priority consultation.";
}

function getActionSteps(answers: Record<string, number>): string[] {
  const steps: string[] = [];

  if (answers.urgency >= 3) {
    steps.push("Schedule an urgent consultation — time-sensitive matters benefit from immediate legal counsel");
  } else {
    steps.push("Book a consultation to discuss your situation — early legal advice is always valuable");
  }

  if (answers.action >= 3) {
    steps.push("Gather all existing legal documents and correspondence for your attorney to review");
  } else if (answers.action === 2) {
    steps.push("Compile a summary of advice received from other attorneys for a second opinion");
  } else {
    steps.push("Document key facts, dates, and communications related to your matter");
  }

  if (answers.financial >= 3) {
    steps.push("Prepare a financial overview — asset valuations, income statements, or contract values");
  } else {
    steps.push("Identify all relevant financial documents and receipts pertaining to your matter");
  }

  if (steps.length < 3) {
    steps.push("Avoid making any statements or signing documents without legal guidance");
  }

  return steps.slice(0, 3);
}

/* ------------------------------------------------------------------ */
/*  WhatsApp URL helper                                                */
/* ------------------------------------------------------------------ */

function whatsappUrl(text: string) {
  return `https://wa.me/27812488048?text=${encodeURIComponent(text)}`;
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
/*  Circular progress gauge                                            */
/* ------------------------------------------------------------------ */

function RiskGauge({ score, zone }: { score: number; zone: ReturnType<typeof getRiskZone> }) {
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const [animatedScore, setAnimatedScore] = useState(0);
  const [animatedOffset, setAnimatedOffset] = useState(circumference);

  useEffect(() => {
    const duration = 1500;
    const start = Date.now();
    const animate = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      setAnimatedScore(Math.round(score * eased));
      setAnimatedOffset(circumference - (score / 100) * circumference * eased);
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [score, circumference]);

  return (
    <div className="relative w-48 h-48 sm:w-56 sm:h-56 mx-auto mb-6">
      <svg viewBox="0 0 160 160" className="w-full h-full -rotate-90">
        {/* Background circle */}
        <circle
          cx="80"
          cy="80"
          r={radius}
          fill="none"
          stroke="rgba(198,168,75,0.1)"
          strokeWidth="8"
        />
        {/* Progress arc */}
        <motion.circle
          cx="80"
          cy="80"
          r={radius}
          fill="none"
          stroke={zone.color}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={animatedOffset}
          style={{
            filter: `drop-shadow(0 0 8px ${zone.color}40)`,
            transition: "stroke 0.3s",
          }}
        />
        {/* Inner decorative circle */}
        <circle
          cx="80"
          cy="80"
          r={radius - 16}
          fill="none"
          stroke="rgba(198,168,75,0.05)"
          strokeWidth="1"
        />
      </svg>
      {/* Score text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span
          className="font-display text-5xl sm:text-6xl font-bold"
          style={{
            color: zone.color,
            textShadow: `0 0 20px ${zone.color}30`,
          }}
        >
          {animatedScore}
        </span>
        <span
          className="font-body text-xs uppercase tracking-[0.2em] mt-1"
          style={{ color: zone.color, opacity: 0.8 }}
        >
          {zone.label}
        </span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Start screen                                                       */
/* ------------------------------------------------------------------ */

function StartScreen({ onStart }: { onStart: () => void }) {
  return (
    <motion.div
      key="start"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="text-center py-8"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
        className="w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-6"
        style={{
          background: "rgba(198,168,75,0.12)",
          border: "2px solid rgba(198,168,75,0.4)",
          boxShadow: "0 0 40px rgba(198,168,75,0.2)",
        }}
      >
        <Zap className="w-9 h-9" style={{ color: "#C6A84B" }} />
      </motion.div>

      <h3 className="font-display text-2xl sm:text-3xl text-white mb-3">
        Assess Your Legal Risk
      </h3>
      <p className="font-display text-lg sm:text-xl text-gold-gradient mb-4">
        in 60 Seconds
      </p>
      <p className="font-body text-sm text-white/50 max-w-md mx-auto mb-8">
        Answer 5 quick questions and receive an instant risk assessment with
        personalised recommendations. No sign-up required.
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4" style={{ color: "#C6A84B" }} />
          <span className="font-body text-xs text-white/50">Takes ~60 seconds</span>
        </div>
        <div className="w-1 h-1 rounded-full bg-brand-gold/30" />
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4" style={{ color: "#C6A84B" }} />
          <span className="font-body text-xs text-white/50">100% confidential</span>
        </div>
        <div className="w-1 h-1 rounded-full bg-brand-gold/30" />
        <div className="flex items-center gap-2">
          <Target className="w-4 h-4" style={{ color: "#C6A84B" }} />
          <span className="font-body text-xs text-white/50">Instant results</span>
        </div>
      </div>

      <motion.button
        onClick={onStart}
        className="btn-premium inline-flex items-center gap-2 px-8 py-4 font-body text-sm rounded-md"
        whileTap={{ scale: 0.97 }}
      >
        Start Assessment
        <ArrowRight className="w-4 h-4" />
      </motion.button>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Question card                                                      */
/* ------------------------------------------------------------------ */

function QuestionCard({
  question,
  questionIndex,
  totalQuestions,
  selectedAnswer,
  onSelect,
  onPrev,
}: {
  question: Question;
  questionIndex: number;
  totalQuestions: number;
  selectedAnswer: number | null;
  onSelect: (value: number) => void;
  onPrev: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -2;
      const rotateY = ((x - centerX) / centerX) * 2;
      cardRef.current.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01,1.01,1.01)`;
    },
    [cardRef]
  );

  const handleMouseLeave = useCallback(() => {
    if (!cardRef.current) return;
    cardRef.current.style.transform =
      "perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)";
  }, []);

  const QIcon = question.icon;
  const progress = ((questionIndex + 1) / totalQuestions) * 100;

  return (
    <motion.div
      key={question.id}
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -60 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="font-body text-xs text-white/40">
            Question {questionIndex + 1} of {totalQuestions}
          </span>
          <span className="font-body text-xs text-brand-gold">
            {Math.round(progress)}%
          </span>
        </div>
        <div
          className="h-1 rounded-full overflow-hidden"
          style={{ background: "rgba(198,168,75,0.1)" }}
        >
          <motion.div
            className="h-full rounded-full"
            style={{
              background: "linear-gradient(90deg, #C6A84B, #E4D49A)",
              boxShadow: "0 0 12px rgba(198,168,75,0.3)",
            }}
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* Question icon and text */}
      <div className="text-center mb-8">
        <div
          className="w-14 h-14 mx-auto rounded-full flex items-center justify-center mb-4"
          style={{
            background: "rgba(198,168,75,0.1)",
            border: "1px solid rgba(198,168,75,0.25)",
          }}
        >
          <QIcon className="w-6 h-6" style={{ color: "#C6A84B" }} />
        </div>
        <h3 className="font-display text-xl sm:text-2xl text-white leading-snug">
          {question.question}
        </h3>
      </div>

      {/* Options */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl mx-auto">
        {question.options.map((opt, i) => {
          const OIcon = opt.icon;
          const isSelected = selectedAnswer === opt.value;
          return (
            <motion.button
              key={opt.value}
              ref={i === 0 || i === 2 ? undefined : undefined}
              onClick={() => onSelect(opt.value)}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="glass-premium rounded-xl p-4 text-left cursor-pointer flex items-center gap-3 transition-all duration-300"
              style={{
                border: isSelected
                  ? "2px solid rgba(198,168,75,0.7)"
                  : "1px solid rgba(198,168,75,0.1)",
                boxShadow: isSelected
                  ? "0 0 25px rgba(198,168,75,0.15)"
                  : "none",
                transform:
                  "perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)",
                transition:
                  "transform 0.2s ease, border-color 0.3s, box-shadow 0.3s",
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              whileTap={{ scale: 0.97 }}
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                style={{
                  background: isSelected
                    ? "rgba(198,168,75,0.2)"
                    : "rgba(198,168,75,0.06)",
                  border: `1px solid ${
                    isSelected
                      ? "rgba(198,168,75,0.4)"
                      : "rgba(198,168,75,0.12)"
                  }`,
                }}
              >
                <OIcon
                  className="w-4 h-4"
                  style={{ color: isSelected ? "#E4D49A" : "#C6A84B" }}
                />
              </div>
              <span
                className="font-body text-sm"
                style={{
                  color: isSelected ? "#E4D49A" : "rgba(255,255,255,0.55)",
                }}
              >
                {opt.label}
              </span>
              {isSelected && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="ml-auto shrink-0"
                >
                  <CheckCircle
                    className="w-5 h-5"
                    style={{ color: "#C6A84B" }}
                  />
                </motion.div>
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-8 max-w-2xl mx-auto">
        {questionIndex > 0 ? (
          <button
            onClick={onPrev}
            className="btn-premium-ghost inline-flex items-center gap-2 px-4 py-2 font-body text-sm rounded-md text-brand-gold/70"
          >
            <ArrowLeft className="w-4 h-4" />
            Previous
          </button>
        ) : (
          <div />
        )}
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Results screen                                                     */
/* ------------------------------------------------------------------ */

function ResultsScreen({
  score,
  answers,
  onReset,
}: {
  score: number;
  answers: Record<string, number>;
  onReset: () => void;
}) {
  const zone = getRiskZone(score);
  const recommendation = getRecommendation(score);
  const actionSteps = getActionSteps(answers);

  const waMessage = `Hello IM Attorneys!\n\nI just completed your Legal Risk Assessment.\n\nMy risk score: ${score}/100 (${zone.label})\n\nI would like to speak with an attorney about my matter.\n\nPlease contact me to arrange a consultation.`;

  return (
    <motion.div
      key="results"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="text-center py-4"
    >
      <RiskGauge score={score} zone={zone} />

      <h3
        className="font-display text-2xl sm:text-3xl mb-4"
        style={{ color: zone.color }}
      >
        {zone.label}
      </h3>

      <p className="font-body text-sm text-white/60 max-w-xl mx-auto mb-8 leading-relaxed">
        {recommendation}
      </p>

      {/* Action Steps */}
      <div
        className="glass-premium rounded-2xl p-6 max-w-xl mx-auto mb-8 text-left"
      >
        <p className="font-body text-xs uppercase tracking-[0.15em] text-brand-gold mb-4 text-center">
          Recommended Next Steps
        </p>
        <div className="space-y-3">
          {actionSteps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.15 }}
              className="flex items-start gap-3"
            >
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                style={{
                  background: "rgba(198,168,75,0.12)",
                  border: "1px solid rgba(198,168,75,0.25)",
                }}
              >
                <span className="font-body text-xs font-bold" style={{ color: "#C6A84B" }}>
                  {i + 1}
                </span>
              </div>
              <span className="font-body text-sm text-white/65 leading-relaxed">
                {step}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTAs */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-6">
        <a
          href={whatsappUrl(waMessage)}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-premium inline-flex items-center gap-2 px-7 py-3.5 font-body text-sm rounded-md"
        >
          <MessageSquare className="w-4 h-4" />
          Speak with an Attorney Now
        </a>
        <button
          onClick={onReset}
          className="btn-premium-outline inline-flex items-center gap-2 px-5 py-3 font-body text-sm rounded-md"
        >
          <ArrowLeft className="w-4 h-4" />
          Retake Assessment
        </button>
      </div>

      <p className="font-body text-[11px] text-white/25 max-w-md mx-auto">
        * This assessment provides general guidance only and does not constitute legal advice. Please consult with an attorney for advice specific to your situation.
      </p>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Component                                                     */
/* ------------------------------------------------------------------ */

export function LegalRiskAssessment() {
  const [phase, setPhase] = useState<"start" | "questions" | "results">("start");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  const handleStart = useCallback(() => {
    setPhase("questions");
    setCurrentQuestion(0);
    setAnswers({});
    setSelectedAnswer(null);
  }, []);

  const handleAnswer = useCallback(
    (value: number) => {
      setSelectedAnswer(value);

      // Auto-advance after a short delay
      setTimeout(() => {
        const newAnswers = { ...answers, [questions[currentQuestion].id]: value };
        setAnswers(newAnswers);

        if (currentQuestion < questions.length - 1) {
          setCurrentQuestion((prev) => prev + 1);
          setSelectedAnswer(null);
        } else {
          setPhase("results");
        }
      }, 400);
    },
    [answers, currentQuestion]
  );

  const handlePrev = useCallback(() => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
      // Restore the previous answer
      const prevQuestion = questions[currentQuestion - 1];
      setSelectedAnswer(answers[prevQuestion.id] ?? null);
    }
  }, [currentQuestion, answers]);

  const handleReset = useCallback(() => {
    setPhase("start");
    setCurrentQuestion(0);
    setAnswers({});
    setSelectedAnswer(null);
  }, []);

  const score = calculateScore(answers);

  return (
    <section
      id="risk-assessment"
      className="relative py-20 sm:py-28 lg:py-36 overflow-hidden noise-overlay"
      style={{ background: "#0D1B2A" }}
      aria-labelledby="risk-heading"
    >
      {/* Background pattern */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundImage: `radial-gradient(ellipse at 70% 20%, rgba(198,168,75,0.05) 0%, transparent 50%),
                           radial-gradient(ellipse at 20% 80%, rgba(198,168,75,0.03) 0%, transparent 40%)`,
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

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── Heading Area ── */}
        <div className="text-center mb-10 sm:mb-14">
          <ScrollReveal direction="up" delay={0}>
            <span className="label-premium mb-4 block">
              <Sparkles className="w-3.5 h-3.5 inline mr-1" />
              Interactive Assessment
            </span>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.1}>
            <h2 id="risk-heading" className="heading-gold-glossy">
              Legal Risk Assessment
            </h2>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.15}>
            <OrnamentalDivider />
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.2}>
            <p className="subheading-premium-dark">
              Understanding your legal risk is the first step to protecting
              your rights. Our quick assessment tool provides instant, confidential
              guidance tailored to your situation.
            </p>
          </ScrollReveal>
        </div>

        {/* ── Assessment Container ── */}
        <div className="glass-premium rounded-2xl p-6 sm:p-10 min-h-[400px]">
          <AnimatePresence mode="wait">
            {phase === "start" && <StartScreen onStart={handleStart} />}

            {phase === "questions" && (
              <QuestionCard
                question={questions[currentQuestion]}
                questionIndex={currentQuestion}
                totalQuestions={questions.length}
                selectedAnswer={selectedAnswer}
                onSelect={handleAnswer}
                onPrev={handlePrev}
              />
            )}

            {phase === "results" && (
              <ResultsScreen
                score={score}
                answers={answers}
                onReset={handleReset}
              />
            )}
          </AnimatePresence>
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
