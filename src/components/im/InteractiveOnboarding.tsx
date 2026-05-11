"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ChevronRight,
  ChevronLeft,
  Scale,
  Shield,
  FileText,
  Gavel,
  Building2,
  ArrowRight,
  Sparkles,
  Check,
  Phone,
  Mail,
} from "lucide-react";

/* ─── Onboarding Step Data ─── */
interface OnboardingStep {
  id: number;
  title: string;
  subtitle: string;
  question: string;
  type: "single" | "multi";
  options: {
    id: string;
    label: string;
    icon: React.ElementType;
    description: string;
    color: string;
  }[];
}

const steps: OnboardingStep[] = [
  {
    id: 1,
    title: "Welcome to IM Attorneys",
    subtitle: "Let us guide you to the right solution",
    question: "What type of legal matter brings you here today?",
    type: "single",
    options: [
      {
        id: "family",
        label: "Family Law",
        icon: Scale,
        description: "Divorce, custody, protection orders",
        color: "#C6A84B",
      },
      {
        id: "criminal",
        label: "Criminal Law",
        icon: Gavel,
        description: "Bail applications, defence matters",
        color: "#E4D49A",
      },
      {
        id: "commercial",
        label: "Commercial Law",
        icon: Building2,
        description: "Contracts, M&A, corporate governance",
        color: "#C6A84B",
      },
      {
        id: "state",
        label: "Claims Against State",
        icon: Shield,
        description: "RAF claims, wrongful arrest",
        color: "#E4D49A",
      },
      {
        id: "estate",
        label: "Wills & Estates",
        icon: FileText,
        description: "Drafting wills, estate planning",
        color: "#C6A84B",
      },
      {
        id: "litigation",
        label: "General Litigation",
        icon: Scale,
        description: "Debt recovery, evictions",
        color: "#E4D49A",
      },
    ],
  },
  {
    id: 2,
    title: "Tell Us More",
    subtitle: "Help us understand your situation",
    question: "How urgent is your legal matter?",
    type: "single",
    options: [
      {
        id: "urgent",
        label: "Urgent — 24/7",
        icon: Phone,
        description: "I need immediate legal assistance",
        color: "#DC2626",
      },
      {
        id: "soon",
        label: "This Week",
        icon: ArrowRight,
        description: "I'd like to consult within days",
        color: "#C6A84B",
      },
      {
        id: "planning",
        label: "Planning Ahead",
        icon: FileText,
        description: "Exploring options for the future",
        color: "#E4D49A",
      },
      {
        id: "curious",
        label: "Just Exploring",
        icon: Sparkles,
        description: "I'm researching my options",
        color: "#C6A84B",
      },
    ],
  },
  {
    id: 3,
    title: "Your Details",
    subtitle: "Optional — we'll get back to you",
    question: "How would you prefer to be contacted?",
    type: "single",
    options: [
      {
        id: "phone",
        label: "Phone Call",
        icon: Phone,
        description: "Speak directly with an attorney",
        color: "#C6A84B",
      },
      {
        id: "email",
        label: "Email",
        icon: Mail,
        description: "Receive a detailed response",
        color: "#E4D49A",
      },
      {
        id: "whatsapp",
        label: "WhatsApp",
        icon: ArrowRight,
        description: "Quick chat on WhatsApp",
        color: "#C6A84B",
      },
      {
        id: "office",
        label: "Office Visit",
        icon: Building2,
        description: "Schedule an in-person meeting",
        color: "#E4D49A",
      },
    ],
  },
];

/* ─── Orbital Progress Indicator ─── */
function OrbitalProgress({
  currentStep,
  totalSteps,
  onStepClick,
}: {
  currentStep: number;
  totalSteps: number;
  onStepClick: (step: number) => void;
}) {
  const radius = 36;
  const circumference = 2 * Math.PI * radius;

  return (
    <div className="relative w-24 h-24 flex-shrink-0">
      {/* Background track */}
      <svg
        className="absolute inset-0 -rotate-90"
        viewBox="0 0 100 100"
        fill="none"
      >
        <circle
          cx="50"
          cy="50"
          r={radius}
          stroke="rgba(198, 168, 75, 0.15)"
          strokeWidth="3"
          fill="none"
        />
        <motion.circle
          cx="50"
          cy="50"
          r={radius}
          stroke="url(#goldGradient)"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{
            strokeDashoffset:
              circumference - (currentStep / totalSteps) * circumference,
          }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        />
        <defs>
          <linearGradient
            id="goldGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor="#C6A84B" />
            <stop offset="100%" stopColor="#E4D49A" />
          </linearGradient>
        </defs>
      </svg>

      {/* Center step number */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.span
          key={currentStep}
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="font-display text-2xl font-bold text-brand-gold"
        >
          {currentStep}
        </motion.span>
      </div>

      {/* Step dots around the orbit */}
      {Array.from({ length: totalSteps }).map((_, i) => {
        const angle = (i / totalSteps) * 360 - 90;
        const rad = (angle * Math.PI) / 180;
        const dotRadius = 44;
        const x = 50 + dotRadius * Math.cos(rad);
        const y = 50 + dotRadius * Math.sin(rad);
        const isActive = i + 1 === currentStep;
        const isComplete = i + 1 < currentStep;

        return (
          <motion.button
            key={i}
            className="absolute"
            style={{
              left: `${x}%`,
              top: `${y}%`,
              transform: "translate(-50%, -50%)",
            }}
            onClick={() => onStepClick(i + 1)}
            whileHover={{ scale: 1.3 }}
            whileTap={{ scale: 0.9 }}
          >
            <motion.div
              className="rounded-full flex items-center justify-center"
              animate={{
                width: isActive ? 14 : 10,
                height: isActive ? 14 : 10,
                backgroundColor: isComplete
                  ? "#C6A84B"
                  : isActive
                    ? "#E4D49A"
                    : "rgba(198, 168, 75, 0.3)",
              }}
              transition={{ duration: 0.3 }}
            >
              {isComplete && (
                <Check className="w-2.5 h-2.5 text-brand-dark" strokeWidth={3} />
              )}
            </motion.div>
          </motion.button>
        );
      })}
    </div>
  );
}

/* ─── Option Hex Button ─── */
function HexOption({
  option,
  isSelected,
  onSelect,
  index,
}: {
  option: { id: string; label: string; icon: React.ElementType; description: string; color: string };
  isSelected: boolean;
  onSelect: () => void;
  index: number;
}) {
  const Icon = option.icon;
  const ref = useRef<HTMLButtonElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: y * -10, y: x * 10 });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
  }, []);

  return (
    <motion.button
      ref={ref}
      onClick={onSelect}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.08,
        ease: "easeOut",
      }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className="relative group cursor-pointer text-left"
      style={{
        perspective: "800px",
      }}
    >
      <motion.div
        animate={{
          rotateX: tilt.x,
          rotateY: tilt.y,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="relative overflow-hidden"
        style={{
          borderRadius: "16px 16px 16px 4px",
          background: isSelected
            ? "linear-gradient(135deg, rgba(198, 168, 75, 0.15), rgba(228, 212, 154, 0.08))"
            : "rgba(13, 27, 42, 0.6)",
          backdropFilter: "blur(16px)",
          border: isSelected
            ? "1.5px solid rgba(198, 168, 75, 0.5)"
            : "1px solid rgba(198, 168, 75, 0.15)",
          boxShadow: isSelected
            ? "0 0 30px rgba(198, 168, 75, 0.15), inset 0 1px 0 rgba(228, 212, 154, 0.1)"
            : "none",
        }}
      >
        {/* Mouse follow spotlight */}
        <div
          className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background:
              "radial-gradient(200px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(198, 168, 75, 0.06), transparent 60%)",
          }}
        />

        <div className="p-4 sm:p-5">
          {/* Icon circle */}
          <div
            className="mb-3 flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-full transition-all duration-500"
            style={{
              background: isSelected
                ? `linear-gradient(135deg, ${option.color}20, ${option.color}10)`
                : "rgba(198, 168, 75, 0.08)",
              border: isSelected
                ? `1.5px solid ${option.color}60`
                : "1px solid rgba(198, 168, 75, 0.12)",
            }}
          >
            <Icon
              className="w-5 h-5 sm:w-6 sm:h-6 transition-all duration-300"
              style={{
                color: isSelected ? option.color : "#C6A84B",
              }}
              strokeWidth={1.5}
            />
          </div>

          {/* Label */}
          <h4
            className="font-display text-base sm:text-lg font-semibold mb-1 transition-colors duration-300"
            style={{
              color: isSelected ? "#E4D49A" : "#F0EDE8",
            }}
          >
            {option.label}
          </h4>

          {/* Description */}
          <p className="font-body text-xs sm:text-sm leading-relaxed"
            style={{
              color: isSelected
                ? "rgba(240, 237, 232, 0.7)"
                : "rgba(240, 237, 232, 0.4)",
            }}
          >
            {option.description}
          </p>

          {/* Selected indicator */}
          {isSelected && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute top-3 right-3 w-5 h-5 rounded-full bg-brand-gold flex items-center justify-center"
            >
              <Check className="w-3 h-3 text-brand-dark" strokeWidth={3} />
            </motion.div>
          )}
        </div>
      </motion.div>
    </motion.button>
  );
}

/* ─── Completion Screen ─── */
function CompletionScreen({
  choices,
  onClose,
}: {
  choices: Record<number, string>;
  onClose: () => void;
}) {
  const practiceStep = steps[0];
  const selectedPractice = practiceStep.options.find(
    (o) => o.id === choices[1]
  );

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      className="text-center px-6 py-8"
    >
      {/* Success animation */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 15,
          delay: 0.2,
        }}
        className="mx-auto w-20 h-20 rounded-full bg-gradient-to-br from-brand-gold to-brand-gold-light flex items-center justify-center mb-6 shadow-lg shadow-brand-gold/30"
      >
        <Check className="w-10 h-10 text-brand-dark" strokeWidth={2.5} />
      </motion.div>

      <motion.h3
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="font-display text-2xl sm:text-3xl font-bold text-white mb-3"
      >
        We&apos;re Ready to{" "}
        <span className="text-gold-gradient">Help</span>
      </motion.h3>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="font-body text-sm text-brand-inverse/60 mb-8 max-w-xs mx-auto"
      >
        Based on your{" "}
        {selectedPractice?.label || "legal"}{" "}
        matter, our team will reach out to assist you.
      </motion.p>

      {/* Summary pills */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="flex flex-wrap justify-center gap-2 mb-8"
      >
        {Object.entries(choices).map(([stepIdx, choiceId]) => {
          const stepData = steps[parseInt(stepIdx) - 1];
          const option = stepData?.options.find((o) => o.id === choiceId);
          if (!option) return null;
          return (
            <span
              key={stepIdx}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold"
              style={{
                background: "rgba(198, 168, 75, 0.1)",
                border: "1px solid rgba(198, 168, 75, 0.25)",
                color: "#E4D49A",
              }}
            >
              {option.label}
            </span>
          );
        })}
      </motion.div>

      {/* CTA Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="flex flex-col sm:flex-row items-center justify-center gap-3"
      >
        <a
          href="#contact"
          onClick={(e) => {
            e.preventDefault();
            onClose();
            setTimeout(() => {
              const el = document.querySelector("#contact");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }, 300);
          }}
          className="btn-premium w-full sm:w-auto"
        >
          <span>Schedule Consultation</span>
          <ArrowRight className="w-4 h-4" />
        </a>
        <button
          onClick={onClose}
          className="btn-premium-ghost text-brand-inverse/60 w-full sm:w-auto"
        >
          Continue Browsing
        </button>
      </motion.div>
    </motion.div>
  );
}

/* ─── Main Component ─── */
export function InteractiveOnboarding() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [choices, setChoices] = useState<Record<number, string>>({});
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Show onboarding after 5 seconds (only once per session)
  useEffect(() => {
    const sessionKey = "im-attorneys-onboarded";
    const alreadySeen = sessionStorage.getItem(sessionKey);
    if (alreadySeen) return;

    timerRef.current = setTimeout(() => {
      setIsOpen(true);
      setHasSeenOnboarding(true);
      sessionStorage.setItem(sessionKey, "true");
    }, 5000);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleSelect = useCallback(
    (stepId: number, optionId: string) => {
      setChoices((prev) => ({ ...prev, [stepId]: optionId }));

      // Auto-advance after selection with delay
      setTimeout(() => {
        if (stepId < steps.length) {
          setCurrentStep(stepId + 1);
        }
      }, 400);
    },
    []
  );

  const handleStepClick = useCallback(
    (step: number) => {
      // Can only go to completed steps or current
      if (step <= currentStep) {
        setCurrentStep(step);
      }
    },
    [currentStep]
  );

  const handleBack = useCallback(() => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  }, [currentStep]);

  const isComplete = currentStep > steps.length;
  const stepData = steps[currentStep - 1];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 25,
            }}
            className="fixed z-[61] inset-x-4 top-[10%] sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2 sm:w-full sm:max-w-xl max-h-[80vh] overflow-y-auto rounded-2xl"
            style={{
              background:
                "linear-gradient(145deg, #0D1B2A 0%, #12223A 40%, #0D1B2A 100%)",
              border: "1px solid rgba(198, 168, 75, 0.2)",
              boxShadow:
                "0 40px 80px rgba(0, 0, 0, 0.5), 0 0 60px rgba(198, 168, 75, 0.08)",
            }}
          >
            {/* Noise overlay */}
            <div className="noise-overlay pointer-events-none" />

            {/* Header */}
            <div className="sticky top-0 z-10 px-6 pt-5 pb-3 flex items-center justify-between"
              style={{
                background: "linear-gradient(to bottom, #0D1B2A 60%, transparent)",
              }}
            >
              <div className="flex items-center gap-4">
                <OrbitalProgress
                  currentStep={currentStep}
                  totalSteps={steps.length}
                  onStepClick={handleStepClick}
                />
                <div>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={isComplete ? "complete" : currentStep}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      transition={{ duration: 0.3 }}
                    >
                      {isComplete ? (
                        <h3 className="font-display text-lg font-bold text-white">
                          Assessment Complete
                        </h3>
                      ) : (
                        <>
                          <h3 className="font-display text-lg font-bold text-white">
                            {stepData.title}
                          </h3>
                          <p className="font-body text-xs text-brand-inverse/50">
                            {stepData.subtitle}
                          </p>
                        </>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              <button
                onClick={handleClose}
                className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 hover:bg-brand-gold/10 border border-brand-gold/20 hover:border-brand-gold/40"
                aria-label="Close onboarding"
              >
                <X className="w-4 h-4 text-brand-inverse/60 hover:text-brand-gold" />
              </button>
            </div>

            {/* Content */}
            <div className="px-6 pb-6 min-h-[280px] flex flex-col justify-center">
              <AnimatePresence mode="wait">
                {isComplete ? (
                  <CompletionScreen
                    choices={choices}
                    onClose={handleClose}
                  />
                ) : (
                  <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ duration: 0.35, ease: "easeInOut" }}
                  >
                    <p className="font-body text-sm text-brand-inverse/70 mb-5">
                      {stepData.question}
                    </p>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {stepData.options.map((option, index) => (
                        <HexOption
                          key={option.id}
                          option={option}
                          isSelected={choices[stepData.id] === option.id}
                          onSelect={() =>
                            handleSelect(stepData.id, option.id)
                          }
                          index={index}
                        />
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Footer navigation */}
            {!isComplete && (
              <div className="px-6 pb-5 flex items-center justify-between border-t border-brand-gold/10 pt-4">
                <button
                  onClick={handleBack}
                  disabled={currentStep === 1}
                  className="flex items-center gap-1.5 font-body text-sm font-medium transition-all duration-300 disabled:opacity-30 hover:text-brand-gold"
                  style={{ color: "rgba(240, 237, 232, 0.6)" }}
                >
                  <ChevronLeft className="w-4 h-4" />
                  Back
                </button>

                {/* Step indicators */}
                <div className="flex items-center gap-1.5">
                  {steps.map((s) => (
                    <div
                      key={s.id}
                      className="rounded-full transition-all duration-500"
                      style={{
                        width: s.id === currentStep ? 24 : 8,
                        height: 8,
                        background:
                          s.id === currentStep
                            ? "#C6A84B"
                            : s.id < currentStep
                              ? "rgba(198, 168, 75, 0.6)"
                              : "rgba(198, 168, 75, 0.15)",
                      }}
                    />
                  ))}
                </div>

                <button
                  onClick={() => setCurrentStep(currentStep + 1)}
                  disabled={!choices[currentStep]}
                  className="flex items-center gap-1.5 font-body text-sm font-semibold transition-all duration-300 disabled:opacity-30"
                  style={{
                    color: choices[currentStep]
                      ? "#C6A84B"
                      : "rgba(240, 237, 232, 0.3)",
                  }}
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}

      {/* Floating trigger removed — onboarding auto-opens after 5s */}
    </AnimatePresence>
  );
}
