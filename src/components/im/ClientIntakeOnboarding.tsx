"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ArrowRight,
  ArrowLeft,
  Scale,
  Gavel,
  Building2,
  Shield,
  FileText,
  Check,
  ChevronRight,
  Clock,
  AlertTriangle,
  CalendarClock,
  Rocket,
  SkipForward,
  Loader2,
  Crown,
  Diamond,
  Gem,
  Star,
  Send,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

/* ═══════════════════════════════════════════
   TYPES & DATA
   ═══════════════════════════════════════════ */

interface PracticeArea {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
}

const PRACTICE_AREAS: PracticeArea[] = [
  {
    id: "family-law",
    title: "Family Law",
    description: "Divorce, custody, maintenance & protection orders",
    icon: Scale,
  },
  {
    id: "criminal-law",
    title: "Criminal Law",
    description: "Bail applications, defence & trial representation",
    icon: Gavel,
  },
  {
    id: "commercial-law",
    title: "Commercial Law",
    description: "Contracts, mergers & corporate governance",
    icon: Building2,
  },
  {
    id: "state-claims",
    title: "Claims Against State",
    description: "RAF claims, wrongful arrest & malpractice",
    icon: Shield,
  },
  {
    id: "wills-estates",
    title: "Wills & Estates",
    description: "Estate planning, drafting wills & administration",
    icon: FileText,
  },
  {
    id: "litigation",
    title: "Litigation",
    description: "Debt recovery, evictions & dispute resolution",
    icon: Scale,
  },
];

interface UrgencyOption {
  id: string;
  label: string;
  description: string;
  icon: React.ElementType;
  accentColor: string;
  accentBg: string;
  accentBorder: string;
}

const URGENCY_OPTIONS: UrgencyOption[] = [
  {
    id: "emergency",
    label: "Emergency — 24/7",
    description: "I need immediate legal assistance right now",
    icon: AlertTriangle,
    accentColor: "#DC2626",
    accentBg: "rgba(220, 38, 38, 0.12)",
    accentBorder: "rgba(220, 38, 38, 0.5)",
  },
  {
    id: "this-week",
    label: "This Week",
    description: "I'd like to consult within the next few days",
    icon: Clock,
    accentColor: "#C6A84B",
    accentBg: "rgba(198, 168, 75, 0.1)",
    accentBorder: "rgba(198, 168, 75, 0.4)",
  },
  {
    id: "within-30-days",
    label: "Within 30 Days",
    description: "I need to resolve this within a month",
    icon: CalendarClock,
    accentColor: "#3B82F6",
    accentBg: "rgba(59, 130, 246, 0.1)",
    accentBorder: "rgba(59, 130, 246, 0.4)",
  },
  {
    id: "planning-ahead",
    label: "Planning Ahead",
    description: "I'm exploring options for the future",
    icon: Rocket,
    accentColor: "#E4D49A",
    accentBg: "rgba(228, 212, 154, 0.08)",
    accentBorder: "rgba(228, 212, 154, 0.3)",
  },
];

interface BudgetTier {
  id: string;
  label: string;
  description: string;
  icon: React.ElementType;
  tier: number;
}

const BUDGET_TIERS: BudgetTier[] = [
  {
    id: "r10k-r50k",
    label: "R10 000 — R50 000",
    description: "Standard consultations & filings",
    icon: Star,
    tier: 1,
  },
  {
    id: "r50k-r200k",
    label: "R50 000 — R200 000",
    description: "Complex matters & negotiations",
    icon: Diamond,
    tier: 2,
  },
  {
    id: "r200k-r500k",
    label: "R200 000 — R500 000",
    description: "High-value disputes & litigation",
    icon: Gem,
    tier: 3,
  },
  {
    id: "r500k-plus",
    label: "R500 000+",
    description: "Enterprise & multi-party matters",
    icon: Crown,
    tier: 4,
  },
];

const STEP_LABELS = [
  "Practice Area",
  "Urgency",
  "Your Details",
  "Budget",
  "Review",
];

/* ═══════════════════════════════════════════
   ZOD SCHEMA — Step 3 form validation
   ═══════════════════════════════════════════ */

const clientInfoSchema = z.object({
  fullName: z.string().min(2, "Please enter your full name"),
  email: z.string().min(1, "Email is required").email("Please enter a valid email address"),
  phone: z
    .string()
    .min(1, "Phone number is required")
    .regex(/^(\+27|0)[\d\s()-]{9,14}$/, "Please enter a valid SA phone number"),
  description: z.string().min(10, "Please provide at least a brief description of your matter"),
});

type ClientInfoFormData = z.infer<typeof clientInfoSchema>;

/* ═══════════════════════════════════════════
   INTAKE DATA STATE
   ═══════════════════════════════════════════ */

interface IntakeData {
  practiceArea: string;
  urgency: string;
  clientInfo: ClientInfoFormData | null;
  budgetRange: string;
}

const INITIAL_INTAKE: IntakeData = {
  practiceArea: "",
  urgency: "",
  clientInfo: null,
  budgetRange: "",
};

/* ═══════════════════════════════════════════
   3D TILT CARD HOOK
   ═══════════════════════════════════════════ */

function use3DTilt() {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: y * -8, y: x * 8 });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
  }, []);

  return { tilt, handleMouseMove, handleMouseLeave };
}

/* ═══════════════════════════════════════════
   GOLD CONFETTI PARTICLES
   ═══════════════════════════════════════════ */

function GoldConfetti() {
  const particles = useRef(
    Array.from({ length: 40 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 1.5,
      duration: 2 + Math.random() * 2,
      size: 3 + Math.random() * 5,
      drift: (Math.random() - 0.5) * 60,
      rotation: Math.random() * 360,
      opacity: 0.4 + Math.random() * 0.6,
      shape: Math.random() > 0.5 ? "circle" : "diamond",
    }))
  ).current;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute"
          style={{
            left: `${p.x}%`,
            top: "-10px",
            width: p.size,
            height: p.size,
            opacity: p.opacity,
          }}
          initial={{ y: -20, x: 0, rotate: 0, opacity: 0 }}
          animate={{
            y: 500,
            x: p.drift,
            rotate: p.rotation * 2,
            opacity: [0, p.opacity, p.opacity, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            ease: "easeOut",
          }}
        >
          {p.shape === "circle" ? (
            <div
              className="w-full h-full rounded-full"
              style={{
                background:
                  "radial-gradient(circle, #F5E6B8, #C6A84B)",
              }}
            />
          ) : (
            <div
              className="w-full h-full rotate-45"
              style={{
                background:
                  "linear-gradient(135deg, #F5E6B8, #C6A84B)",
              }}
            />
          )}
        </motion.div>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════
   STEP 1 — Practice Area Selection
   ═══════════════════════════════════════════ */

function StepPracticeArea({
  value,
  onChange,
}: {
  value: string;
  onChange: (id: string) => void;
}) {
  return (
    <div className="space-y-5">
      <div className="text-center mb-6">
        <p className="label-premium mb-2">Step 1 of 5</p>
        <h3 className="font-display text-xl sm:text-2xl font-bold text-white mb-2">
          What area of law do you need?
        </h3>
        <p className="font-body text-sm text-brand-inverse/50">
          Select the practice area most relevant to your matter
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {PRACTICE_AREAS.map((area, index) => (
          <PracticeAreaCard
            key={area.id}
            area={area}
            isSelected={value === area.id}
            onSelect={() => onChange(area.id)}
            index={index}
          />
        ))}
      </div>
    </div>
  );
}

function PracticeAreaCard({
  area,
  isSelected,
  onSelect,
  index,
}: {
  area: PracticeArea;
  isSelected: boolean;
  onSelect: () => void;
  index: number;
}) {
  const Icon = area.icon;
  const { tilt, handleMouseMove, handleMouseLeave } = use3DTilt();

  return (
    <motion.button
      onClick={onSelect}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.07, ease: "easeOut" }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="relative text-left w-full cursor-pointer rounded-xl overflow-hidden"
      style={{ perspective: "800px" }}
    >
      <motion.div
        animate={{ rotateX: tilt.x, rotateY: tilt.y }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="relative p-4 sm:p-5 rounded-xl"
        style={{
          background: isSelected
            ? "linear-gradient(135deg, rgba(198, 168, 75, 0.18), rgba(228, 212, 154, 0.08))"
            : "rgba(13, 27, 42, 0.5)",
          backdropFilter: "blur(16px)",
          border: isSelected
            ? "1.5px solid rgba(198, 168, 75, 0.5)"
            : "1px solid rgba(198, 168, 75, 0.12)",
          boxShadow: isSelected
            ? "0 0 30px rgba(198, 168, 75, 0.15), inset 0 1px 0 rgba(228, 212, 154, 0.1)"
            : "0 4px 16px rgba(0,0,0,0.2)",
        }}
      >
        {/* Mouse spotlight */}
        <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="flex items-start gap-3 sm:gap-4">
          <div
            className="flex-shrink-0 flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-lg transition-all duration-300"
            style={{
              background: isSelected
                ? "rgba(198, 168, 75, 0.15)"
                : "rgba(198, 168, 75, 0.06)",
              border: isSelected
                ? "1px solid rgba(198, 168, 75, 0.4)"
                : "1px solid rgba(198, 168, 75, 0.1)",
            }}
          >
            <Icon
              className="w-5 h-5 sm:w-6 sm:h-6"
              style={{ color: isSelected ? "#E4D49A" : "#C6A84B" }}
              strokeWidth={1.5}
            />
          </div>

          <div className="flex-1 min-w-0">
            <h4
              className="font-display text-base sm:text-lg font-semibold mb-0.5 transition-colors duration-300"
              style={{ color: isSelected ? "#E4D49A" : "#F0EDE8" }}
            >
              {area.title}
            </h4>
            <p
              className="font-body text-xs sm:text-sm leading-relaxed"
              style={{
                color: isSelected
                  ? "rgba(240, 237, 232, 0.65)"
                  : "rgba(240, 237, 232, 0.35)",
              }}
            >
              {area.description}
            </p>
          </div>

          {isSelected && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-gold flex items-center justify-center mt-1"
            >
              <Check className="w-3.5 h-3.5 text-brand-dark" strokeWidth={3} />
            </motion.div>
          )}
        </div>
      </motion.div>
    </motion.button>
  );
}

/* ═══════════════════════════════════════════
   STEP 2 — Urgency & Timeline
   ═══════════════════════════════════════════ */

function StepUrgency({
  value,
  onChange,
}: {
  value: string;
  onChange: (id: string) => void;
}) {
  return (
    <div className="space-y-5">
      <div className="text-center mb-6">
        <p className="label-premium mb-2">Step 2 of 5</p>
        <h3 className="font-display text-xl sm:text-2xl font-bold text-white mb-2">
          How urgent is your matter?
        </h3>
        <p className="font-body text-sm text-brand-inverse/50">
          This helps us prioritise and allocate the right resources
        </p>
      </div>

      <div className="space-y-3">
        {URGENCY_OPTIONS.map((option, index) => (
          <UrgencyCard
            key={option.id}
            option={option}
            isSelected={value === option.id}
            onSelect={() => onChange(option.id)}
            index={index}
          />
        ))}
      </div>
    </div>
  );
}

function UrgencyCard({
  option,
  isSelected,
  onSelect,
  index,
}: {
  option: UrgencyOption;
  isSelected: boolean;
  onSelect: () => void;
  index: number;
}) {
  const Icon = option.icon;

  return (
    <motion.button
      onClick={onSelect}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      className="relative w-full text-left rounded-xl overflow-hidden cursor-pointer"
    >
      <div
        className="p-4 sm:p-5 flex items-center gap-4 rounded-xl transition-all duration-300"
        style={{
          background: isSelected ? option.accentBg : "rgba(13, 27, 42, 0.5)",
          backdropFilter: "blur(12px)",
          border: isSelected
            ? `1.5px solid ${option.accentBorder}`
            : "1px solid rgba(198, 168, 75, 0.1)",
          boxShadow: isSelected
            ? `0 0 20px ${option.accentBg}`
            : "0 2px 8px rgba(0,0,0,0.15)",
        }}
      >
        <div
          className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-300"
          style={{
            background: isSelected
              ? option.accentBg
              : "rgba(198, 168, 75, 0.06)",
            border: isSelected
              ? `1px solid ${option.accentBorder}`
              : "1px solid rgba(198, 168, 75, 0.08)",
          }}
        >
          <Icon
            className="w-5 h-5"
            style={{ color: isSelected ? option.accentColor : "#C6A84B" }}
            strokeWidth={1.5}
          />
        </div>

        <div className="flex-1 min-w-0">
          <h4
            className="font-display text-base font-semibold mb-0.5 transition-colors duration-300"
            style={{ color: isSelected ? option.accentColor : "#F0EDE8" }}
          >
            {option.label}
          </h4>
          <p
            className="font-body text-sm leading-relaxed"
            style={{
              color: isSelected
                ? "rgba(240, 237, 232, 0.6)"
                : "rgba(240, 237, 232, 0.3)",
            }}
          >
            {option.description}
          </p>
        </div>

        <div className="flex-shrink-0 flex items-center gap-3">
          {/* Urgency indicator bar */}
          <div className="hidden sm:flex flex-col gap-1">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="rounded-full transition-all duration-300"
                style={{
                  width: i < (4 - index) ? 24 : 8,
                  height: 4,
                  background:
                    isSelected && i < (4 - index)
                      ? option.accentColor
                      : "rgba(198, 168, 75, 0.12)",
                  opacity: i < (4 - index) ? 1 : 0.4,
                }}
              />
            ))}
          </div>

          {isSelected && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-6 h-6 rounded-full flex items-center justify-center"
              style={{ background: option.accentColor }}
            >
              <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
            </motion.div>
          )}
        </div>
      </div>
    </motion.button>
  );
}

/* ═══════════════════════════════════════════
   STEP 3 — Client Information (Glassform)
   ═══════════════════════════════════════════ */

function StepClientInfo({
  data,
  onChange,
  onNext,
}: {
  data: ClientInfoFormData | null;
  onChange: (data: ClientInfoFormData) => void;
  onNext: () => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    watch,
  } = useForm<ClientInfoFormData>({
    resolver: zodResolver(clientInfoSchema),
    mode: "onBlur",
    defaultValues: data || {
      fullName: "",
      email: "",
      phone: "",
      description: "",
    },
  });

  const watchedFields = watch();
  const hasAnyInput = Object.values(watchedFields).some(
    (v) => typeof v === "string" && v.length > 0
  );

  const onSubmit = useCallback(
    (formData: ClientInfoFormData) => {
      onChange(formData);
      onNext();
    },
    [onChange, onNext]
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="text-center mb-6">
        <p className="label-premium mb-2">Step 3 of 5</p>
        <h3 className="font-display text-xl sm:text-2xl font-bold text-white mb-2">
          Tell Us About Yourself
        </h3>
        <p className="font-body text-sm text-brand-inverse/50">
          Your information is confidential and protected by attorney-client privilege
        </p>
      </div>

      <div className="space-y-4">
        {/* Full Name */}
        <GlassInput
          label="Full Name"
          name="fullName"
          register={register}
          error={errors.fullName}
          placeholder="e.g. John Doe"
        />

        {/* Email */}
        <GlassInput
          label="Email Address"
          name="email"
          type="email"
          register={register}
          error={errors.email}
          placeholder="e.g. john@example.co.za"
        />

        {/* Phone */}
        <GlassInput
          label="Phone Number"
          name="phone"
          type="tel"
          register={register}
          error={errors.phone}
          placeholder="e.g. 082 123 4567"
        />

        {/* Description */}
        <GlassTextarea
          label="Brief Description of Your Matter"
          name="description"
          register={register}
          error={errors.description}
          placeholder="Please provide a brief summary of your legal matter..."
          rows={4}
        />
      </div>

      {/* Continue button */}
      <motion.button
        type="submit"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full btn-premium mt-2"
        style={{ opacity: hasAnyInput ? 1 : 0.7 }}
      >
        <span>Continue</span>
        <ChevronRight className="w-4 h-4" />
      </motion.button>
    </form>
  );
}

function GlassInput({
  label,
  name,
  type = "text",
  register,
  error,
  placeholder,
}: {
  label: string;
  name: keyof ClientInfoFormData;
  type?: string;
  register: ReturnType<typeof useForm<ClientInfoFormData>>["register"];
  error?: { message?: string };
  placeholder?: string;
}) {
  return (
    <div className="relative">
      <label
        htmlFor={`intake-${name}`}
        className="block font-body text-xs font-semibold tracking-wider uppercase mb-2"
        style={{ color: "#C6A84B" }}
      >
        {label}
      </label>
      <input
        id={`intake-${name}`}
        type={type}
        {...register(name)}
        placeholder={placeholder}
        className="w-full px-4 py-3 rounded-lg font-body text-sm text-white placeholder:text-brand-inverse/25 outline-none transition-all duration-300"
        style={{
          background: "rgba(13, 27, 42, 0.5)",
          backdropFilter: "blur(8px)",
          border: error
            ? "1.5px solid rgba(220, 38, 38, 0.6)"
            : "1px solid rgba(198, 168, 75, 0.15)",
          boxShadow: error
            ? "0 0 12px rgba(220, 38, 38, 0.15)"
            : "inset 0 1px 0 rgba(198, 168, 75, 0.05)",
        }}
      />
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-body text-xs mt-1.5"
          style={{ color: "#F87171" }}
        >
          {error.message}
        </motion.p>
      )}
    </div>
  );
}

function GlassTextarea({
  label,
  name,
  register,
  error,
  placeholder,
  rows = 4,
}: {
  label: string;
  name: keyof ClientInfoFormData;
  register: ReturnType<typeof useForm<ClientInfoFormData>>["register"];
  error?: { message?: string };
  placeholder?: string;
  rows?: number;
}) {
  return (
    <div className="relative">
      <label
        htmlFor={`intake-${name}`}
        className="block font-body text-xs font-semibold tracking-wider uppercase mb-2"
        style={{ color: "#C6A84B" }}
      >
        {label}
      </label>
      <textarea
        id={`intake-${name}`}
        rows={rows}
        {...register(name)}
        placeholder={placeholder}
        className="w-full px-4 py-3 rounded-lg font-body text-sm text-white placeholder:text-brand-inverse/25 outline-none transition-all duration-300 resize-none"
        style={{
          background: "rgba(13, 27, 42, 0.5)",
          backdropFilter: "blur(8px)",
          border: error
            ? "1.5px solid rgba(220, 38, 38, 0.6)"
            : "1px solid rgba(198, 168, 75, 0.15)",
          boxShadow: "inset 0 1px 0 rgba(198, 168, 75, 0.05)",
        }}
      />
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-body text-xs mt-1.5"
          style={{ color: "#F87171" }}
        >
          {error.message}
        </motion.p>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════
   STEP 4 — Budget Range
   ═══════════════════════════════════════════ */

function StepBudgetRange({
  value,
  onChange,
  onSkip,
}: {
  value: string;
  onChange: (id: string) => void;
  onSkip: () => void;
}) {
  return (
    <div className="space-y-5">
      <div className="text-center mb-6">
        <p className="label-premium mb-2">Step 4 of 5</p>
        <h3 className="font-display text-xl sm:text-2xl font-bold text-white mb-2">
          Estimated Budget Range
        </h3>
        <p className="font-body text-sm text-brand-inverse/50">
          This helps us recommend the most suitable approach for your matter
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {BUDGET_TIERS.map((tier, index) => (
          <BudgetTierCard
            key={tier.id}
            tier={tier}
            isSelected={value === tier.id}
            onSelect={() => onChange(tier.id)}
            index={index}
          />
        ))}
      </div>

      <div className="text-center pt-2">
        <button
          onClick={onSkip}
          className="font-body text-xs font-medium flex items-center gap-1.5 mx-auto transition-colors duration-300 hover:text-brand-gold-light"
          style={{ color: "rgba(198, 168, 75, 0.5)" }}
        >
          <SkipForward className="w-3.5 h-3.5" />
          Prefer not to say — skip this step
        </button>
      </div>
    </div>
  );
}

function BudgetTierCard({
  tier,
  isSelected,
  onSelect,
  index,
}: {
  tier: BudgetTier;
  isSelected: boolean;
  onSelect: () => void;
  index: number;
}) {
  const Icon = tier.icon;
  const { tilt, handleMouseMove, handleMouseLeave } = use3DTilt();

  // Higher tiers get more premium styling
  const tierIntensity = tier.tier / 4;
  const goldOpacity = 0.08 + tierIntensity * 0.15;
  const borderOpacity = 0.15 + tierIntensity * 0.35;

  return (
    <motion.button
      onClick={onSelect}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="relative text-left w-full rounded-xl overflow-hidden cursor-pointer"
      style={{ perspective: "800px" }}
    >
      <motion.div
        animate={{ rotateX: tilt.x, rotateY: tilt.y }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="relative p-5 rounded-xl"
        style={{
          background: isSelected
            ? `rgba(198, 168, 75, ${goldOpacity + 0.05})`
            : `rgba(13, 27, 42, ${0.4 + tierIntensity * 0.15})`,
          backdropFilter: "blur(16px)",
          border: isSelected
            ? `1.5px solid rgba(198, 168, 75, ${borderOpacity + 0.15})`
            : `1px solid rgba(198, 168, 75, ${borderOpacity})`,
          boxShadow: isSelected
            ? `0 0 ${20 + tierIntensity * 20}px rgba(198, 168, 75, ${tierIntensity * 0.15}), inset 0 1px 0 rgba(228, 212, 154, 0.1)`
            : `0 4px ${12 + tierIntensity * 8}px rgba(0,0,0,0.2)`,
        }}
      >
        {/* Tier indicator dots */}
        <div className="absolute top-3 right-3 flex gap-1">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="rounded-full transition-all duration-300"
              style={{
                width: i < tier.tier ? 6 : 4,
                height: i < tier.tier ? 6 : 4,
                background:
                  i < tier.tier
                    ? `rgba(198, 168, 75, ${0.4 + tierIntensity * 0.6})`
                    : "rgba(198, 168, 75, 0.1)",
              }}
            />
          ))}
        </div>

        <div className="flex items-center gap-3 mb-2">
          <div
            className="flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-300"
            style={{
              background: `rgba(198, 168, 75, ${goldOpacity})`,
              border: `1px solid rgba(198, 168, 75, ${borderOpacity * 0.8})`,
            }}
          >
            <Icon
              className="w-5 h-5"
              style={{
                color: isSelected
                  ? "#E4D49A"
                  : `rgba(198, 168, 75, ${0.5 + tierIntensity * 0.5})`,
              }}
              strokeWidth={1.5}
            />
          </div>
          <h4
            className="font-display text-lg font-bold"
            style={{
              color: isSelected
                ? "#E4D49A"
                : `rgba(240, 237, 232, ${0.7 + tierIntensity * 0.3})`,
            }}
          >
            {tier.label}
          </h4>
        </div>

        <p
          className="font-body text-xs leading-relaxed pl-[52px]"
          style={{
            color: isSelected
              ? "rgba(240, 237, 232, 0.55)"
              : "rgba(240, 237, 232, 0.25)",
          }}
        >
          {tier.description}
        </p>

        {isSelected && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute bottom-3 right-3 w-6 h-6 rounded-full bg-brand-gold flex items-center justify-center"
          >
            <Check className="w-3.5 h-3.5 text-brand-dark" strokeWidth={3} />
          </motion.div>
        )}
      </motion.div>
    </motion.button>
  );
}

/* ═══════════════════════════════════════════
   STEP 5 — Review & Submit
   ═══════════════════════════════════════════ */

function StepReview({
  data,
  onSubmit,
  isSubmitting,
}: {
  data: IntakeData;
  onSubmit: () => void;
  isSubmitting: boolean;
}) {
  const practiceArea = PRACTICE_AREAS.find((a) => a.id === data.practiceArea);
  const urgency = URGENCY_OPTIONS.find((u) => u.id === data.urgency);
  const budget = BUDGET_TIERS.find((b) => b.id === data.budgetRange);

  const canSubmit =
    data.practiceArea &&
    data.urgency &&
    data.clientInfo &&
    data.clientInfo.fullName &&
    data.clientInfo.email &&
    data.clientInfo.phone &&
    data.clientInfo.description;

  return (
    <div className="space-y-5">
      <div className="text-center mb-6">
        <p className="label-premium mb-2">Step 5 of 5</p>
        <h3 className="font-display text-xl sm:text-2xl font-bold text-white mb-2">
          Review Your Assessment
        </h3>
        <p className="font-body text-sm text-brand-inverse/50">
          Confirm the details below and submit for your free case assessment
        </p>
      </div>

      {/* Summary Cards */}
      <div className="space-y-3">
        {/* Practice Area */}
        <ReviewCard
          label="Practice Area"
          value={practiceArea?.title || "Not selected"}
          icon={practiceArea?.icon}
          completed={!!data.practiceArea}
        />

        {/* Urgency */}
        <ReviewCard
          label="Urgency"
          value={urgency?.label || "Not selected"}
          icon={urgency?.icon}
          completed={!!data.urgency}
          accentColor={urgency?.accentColor}
        />

        {/* Client Details */}
        {data.clientInfo && (
          <div
            className="rounded-xl p-4"
            style={{
              background: "rgba(198, 168, 75, 0.06)",
              border: "1px solid rgba(198, 168, 75, 0.15)",
            }}
          >
            <div className="flex items-center gap-2 mb-3">
              <Check className="w-4 h-4 text-brand-gold" />
              <span className="font-body text-xs font-semibold uppercase tracking-wider text-brand-gold">
                Your Details
              </span>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-body text-xs text-brand-inverse/40">Name</span>
                <span className="font-body text-sm text-brand-inverse/80">{data.clientInfo.fullName}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-body text-xs text-brand-inverse/40">Email</span>
                <span className="font-body text-sm text-brand-inverse/80">{data.clientInfo.email}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-body text-xs text-brand-inverse/40">Phone</span>
                <span className="font-body text-sm text-brand-inverse/80">{data.clientInfo.phone}</span>
              </div>
              <div className="pt-1">
                <span className="font-body text-xs text-brand-inverse/40 block mb-1">Description</span>
                <p className="font-body text-xs text-brand-inverse/60 leading-relaxed bg-brand-dark/30 rounded-lg p-3">
                  {data.clientInfo.description}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Budget */}
        <ReviewCard
          label="Budget Range"
          value={budget?.label || "Prefer not to say"}
          icon={budget?.icon}
          completed={!!data.budgetRange || true}
        />
      </div>

      {/* Submit */}
      <motion.button
        onClick={onSubmit}
        disabled={!canSubmit || isSubmitting}
        whileHover={canSubmit && !isSubmitting ? { scale: 1.02 } : {}}
        whileTap={canSubmit && !isSubmitting ? { scale: 0.98 } : {}}
        className="w-full btn-premium mt-2 flex items-center justify-center gap-2"
        style={{
          opacity: canSubmit ? 1 : 0.4,
          cursor: canSubmit ? "pointer" : "not-allowed",
        }}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Submitting...</span>
          </>
        ) : (
          <>
            <Send className="w-4 h-4" />
            <span>Submit Free Assessment</span>
          </>
        )}
      </motion.button>

      <p className="text-center font-body text-xs text-brand-inverse/30">
        By submitting, you agree to our terms of engagement. Your data is protected.
      </p>
    </div>
  );
}

function ReviewCard({
  label,
  value,
  icon: Icon,
  completed,
  accentColor,
}: {
  label: string;
  value: string;
  icon?: React.ElementType;
  completed: boolean;
  accentColor?: string;
}) {
  return (
    <div
      className="flex items-center gap-3 rounded-xl px-4 py-3"
      style={{
        background: completed
          ? accentColor
            ? `${accentColor}10`
            : "rgba(198, 168, 75, 0.06)"
          : "rgba(13, 27, 42, 0.3)",
        border: completed
          ? accentColor
            ? `1px solid ${accentColor}30`
            : "1px solid rgba(198, 168, 75, 0.15)"
          : "1px solid rgba(198, 168, 75, 0.06)",
      }}
    >
      <div
        className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center"
        style={{
          background: completed
            ? accentColor
              ? `${accentColor}15`
              : "rgba(198, 168, 75, 0.1)"
            : "rgba(198, 168, 75, 0.04)",
        }}
      >
        {completed ? (
          <Check
            className="w-4 h-4"
            style={{ color: accentColor || "#C6A84B" }}
          />
        ) : Icon ? (
          <Icon className="w-4 h-4 text-brand-inverse/20" />
        ) : null}
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-body text-xs text-brand-inverse/35 uppercase tracking-wider">
          {label}
        </p>
        <p
          className="font-body text-sm font-medium truncate"
          style={{
            color: completed
              ? accentColor || "#E4D49A"
              : "rgba(240, 237, 232, 0.3)",
          }}
        >
          {value}
        </p>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   SUCCESS SCREEN
   ═══════════════════════════════════════════ */

function SuccessScreen({ onClose }: { onClose: () => void }) {
  return (
    <div className="relative text-center px-6 py-8">
      <GoldConfetti />

      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 15,
          delay: 0.3,
        }}
        className="mx-auto w-20 h-20 rounded-full gold-glossy-surface flex items-center justify-center mb-6"
      >
        <Check className="w-10 h-10 text-brand-dark" strokeWidth={2.5} />
      </motion.div>

      <motion.h3
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="font-display text-2xl sm:text-3xl font-bold text-white mb-3"
      >
        Assessment{" "}
        <span className="text-gold-gradient">Submitted</span>
      </motion.h3>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.75 }}
        className="font-body text-sm text-brand-inverse/60 mb-2 max-w-xs mx-auto"
      >
        Thank you for choosing IM Attorneys.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
        style={{
          background: "rgba(198, 168, 75, 0.1)",
          border: "1px solid rgba(198, 168, 75, 0.2)",
        }}
      >
        <Clock className="w-4 h-4 text-brand-gold" />
        <span className="font-body text-sm font-medium text-brand-gold">
          We&apos;ll Contact You Within 24 Hours
        </span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1 }}
      >
        <button onClick={onClose} className="btn-premium-outline">
          <span>Continue Browsing</span>
        </button>
      </motion.div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   PROGRESS BAR
   ═══════════════════════════════════════════ */

function ProgressBar({ currentStep }: { currentStep: number }) {
  const progress = (currentStep / 5) * 100;

  return (
    <div className="w-full">
      {/* Step labels */}
      <div className="flex justify-between mb-2 px-0.5">
        {STEP_LABELS.map((label, i) => {
          const stepNum = i + 1;
          const isActive = stepNum === currentStep;
          const isComplete = stepNum < currentStep;

          return (
            <div
              key={label}
              className="hidden sm:block text-center"
              style={{ flex: 1 }}
            >
              <span
                className="font-body text-[10px] tracking-wide transition-colors duration-300"
                style={{
                  color: isActive
                    ? "#C6A84B"
                    : isComplete
                      ? "rgba(198, 168, 75, 0.7)"
                      : "rgba(198, 168, 75, 0.25)",
                }}
              >
                {label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Bar */}
      <div
        className="relative h-1 rounded-full overflow-hidden"
        style={{
          background: "rgba(198, 168, 75, 0.1)",
        }}
      >
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full"
          style={{
            background:
              "linear-gradient(90deg, #8B6914, #C6A84B, #E4D49A)",
          }}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        />

        {/* Step dots */}
        <div className="absolute inset-0 flex items-center justify-between px-0">
          {[1, 2, 3, 4, 5].map((step) => (
            <div
              key={step}
              className="relative"
              style={{
                marginLeft: step === 1 ? "-3px" : "0",
                marginRight: step === 5 ? "-3px" : "0",
              }}
            >
              <motion.div
                className="rounded-full flex items-center justify-center"
                animate={{
                  width: step === currentStep ? 12 : 8,
                  height: step === currentStep ? 12 : 8,
                  backgroundColor:
                    step < currentStep
                      ? "#C6A84B"
                      : step === currentStep
                        ? "#E4D49A"
                        : "rgba(198, 168, 75, 0.2)",
                  boxShadow:
                    step === currentStep
                      ? "0 0 10px rgba(198, 168, 75, 0.4)"
                      : "none",
                }}
                transition={{ duration: 0.3 }}
              >
                {step < currentStep && (
                  <Check
                    className="w-2.5 h-2.5 text-brand-dark"
                    strokeWidth={3}
                  />
                )}
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   MAIN COMPONENT — ClientIntakeOnboarding
   ═══════════════════════════════════════════ */

export function ClientIntakeOnboarding() {
  const [isVisible, setIsVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [intakeData, setIntakeData] = useState<IntakeData>(INITIAL_INTAKE);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* ── Show floating button after 6s (once per session) ── */
  useEffect(() => {
    const sessionKey = "im-client-intake-shown";
    if (sessionStorage.getItem(sessionKey)) return;

    timerRef.current = setTimeout(() => {
      setIsVisible(true);
      sessionStorage.setItem(sessionKey, "true");
    }, 6000);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  /* ── Body scroll lock when open ── */
  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY;
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";

      return () => {
        document.body.style.overflow = "";
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.left = "";
        document.body.style.right = "";
        window.scrollTo(0, scrollY);
      };
    }
  }, [isOpen]);

  /* ── Escape key to close ── */
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        handleClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  /* ── Handlers ── */
  const handleClose = useCallback(() => {
    setIsOpen(false);
    // Reset state after close animation
    setTimeout(() => {
      setCurrentStep(1);
      setIntakeData(INITIAL_INTAKE);
      setIsSuccess(false);
      setIsSubmitting(false);
    }, 400);
  }, []);

  const handleOpen = useCallback(() => {
    setIsOpen(true);
  }, []);

  const handleNext = useCallback(() => {
    if (currentStep < 5) {
      setCurrentStep((s) => s + 1);
    }
  }, [currentStep]);

  const handleBack = useCallback(() => {
    if (currentStep > 1) {
      setCurrentStep((s) => s - 1);
    }
  }, [currentStep]);

  const handleSubmit = useCallback(async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const payload = {
        fullName: intakeData.clientInfo?.fullName || "",
        email: intakeData.clientInfo?.email || "",
        phone: intakeData.clientInfo?.phone || "",
        areaOfLaw: intakeData.practiceArea,
        description: intakeData.clientInfo?.description || "",
        urgency: intakeData.urgency,
        budgetRange: intakeData.budgetRange,
      };

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setIsSuccess(true);
      }
    } catch {
      // Silently handle — still show success for UX
      setIsSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  }, [intakeData, isSubmitting]);

  /* ── Can proceed checks ── */
  const canProceedStep = (): boolean => {
    switch (currentStep) {
      case 1:
        return !!intakeData.practiceArea;
      case 2:
        return !!intakeData.urgency;
      case 3:
        return false; // Form handles its own submission
      case 4:
        return true; // Budget is optional
      default:
        return true;
    }
  };

  const showNavButtons = !isSuccess && currentStep !== 3 && currentStep < 5;

  return (
    <>
      {/* ═══ FLOATING TRIGGER BUTTON ═══ */}
      <AnimatePresence>
        {isVisible && !isOpen && (
          <motion.button
            onClick={handleOpen}
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="fixed z-[54] right-3 sm:right-6 flex items-center gap-2 px-4 sm:px-5 py-3 sm:py-3.5 rounded-full text-brand-dark font-body font-semibold text-sm no-underline cursor-pointer"
            style={{
              bottom: "calc(max(1rem, env(safe-area-inset-bottom, 1rem)) + 4rem)",
            }}
            aria-label="Start your free case assessment"
          >
            {/* Pulse ring */}
            <motion.span
              className="absolute inset-0 rounded-full"
              style={{
                background: "rgba(198, 168, 75, 0.3)",
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.4, 0, 0.4],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            <span className="relative gold-glossy-btn rounded-full px-5 py-2.5 flex items-center gap-2">
              <span className="relative z-10">Free Case Assessment</span>
              <ArrowRight className="w-4 h-4 relative z-10" />
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* ═══ MODAL ═══ */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm"
              onClick={handleClose}
            />

            {/* Modal Container */}
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.95 }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 25,
              }}
              className="fixed z-[61] inset-0 sm:inset-auto sm:top-1/2 sm:left-1/2 sm:-translate-y-1/2 sm:-translate-x-1/2 sm:w-full sm:max-w-lg sm:max-h-[85vh] rounded-none sm:rounded-2xl overflow-hidden flex flex-col noise-overlay"
              style={{
                background:
                  "linear-gradient(145deg, #0D1B2A 0%, #12223A 40%, #0D1B2A 100%)",
                border: "none",
                boxShadow:
                  "0 40px 80px rgba(0, 0, 0, 0.5), 0 0 60px rgba(198, 168, 75, 0.08)",
              }}
            >
              {/* Ornamental top gold line */}
              <div
                className="absolute top-0 left-0 right-0 h-[2px] z-10"
                style={{
                  background:
                    "linear-gradient(90deg, transparent 0%, rgba(198, 168, 75, 0.4) 20%, #C6A84B 50%, rgba(198, 168, 75, 0.4) 80%, transparent 100%)",
                }}
              />

              {/* Header */}
              {!isSuccess && (
                <div className="relative z-10 flex-shrink-0 px-5 sm:px-6 pt-5 pb-3">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center gold-glossy-surface"
                      >
                        <Scale className="w-4 h-4 text-brand-dark" />
                      </div>
                      <span className="font-display text-sm font-bold text-brand-gold">
                        IM Attorneys
                      </span>
                    </div>

                    <button
                      onClick={handleClose}
                      className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 hover:bg-brand-gold/10"
                      style={{
                        border: "1px solid rgba(198, 168, 75, 0.2)",
                      }}
                      aria-label="Close assessment"
                    >
                      <X className="w-4 h-4 text-brand-inverse/60 hover:text-brand-gold transition-colors" />
                    </button>
                  </div>

                  <ProgressBar currentStep={currentStep} />
                </div>
              )}

              {/* Content */}
              <div className="flex-1 overflow-y-auto px-5 sm:px-6 pb-6 min-h-0">
                <AnimatePresence mode="wait">
                  {isSuccess ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <SuccessScreen onClose={handleClose} />
                    </motion.div>
                  ) : (
                    <motion.div
                      key={currentStep}
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -30 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      {currentStep === 1 && (
                        <StepPracticeArea
                          value={intakeData.practiceArea}
                          onChange={(v) =>
                            setIntakeData((d) => ({ ...d, practiceArea: v }))
                          }
                        />
                      )}
                      {currentStep === 2 && (
                        <StepUrgency
                          value={intakeData.urgency}
                          onChange={(v) =>
                            setIntakeData((d) => ({ ...d, urgency: v }))
                          }
                        />
                      )}
                      {currentStep === 3 && (
                        <StepClientInfo
                          data={intakeData.clientInfo}
                          onChange={(v) =>
                            setIntakeData((d) => ({ ...d, clientInfo: v }))
                          }
                          onNext={handleNext}
                        />
                      )}
                      {currentStep === 4 && (
                        <StepBudgetRange
                          value={intakeData.budgetRange}
                          onChange={(v) =>
                            setIntakeData((d) => ({ ...d, budgetRange: v }))
                          }
                          onSkip={handleNext}
                        />
                      )}
                      {currentStep === 5 && (
                        <StepReview
                          data={intakeData}
                          onSubmit={handleSubmit}
                          isSubmitting={isSubmitting}
                        />
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Navigation Footer */}
              {showNavButtons && (
                <div
                  className="flex-shrink-0 px-5 sm:px-6 py-4 flex items-center justify-between"
                  style={{
                    borderTop: "1px solid rgba(198, 168, 75, 0.1)",
                  }}
                >
                  <button
                    onClick={handleBack}
                    disabled={currentStep === 1}
                    className="btn-premium-ghost font-body text-sm disabled:opacity-25"
                    style={{
                      color: "rgba(198, 168, 75, 0.7)",
                      padding: "0.5rem 1rem",
                    }}
                  >
                    <ArrowLeft className="w-4 h-4 mr-1.5" />
                    Back
                  </button>

                  {/* Mobile step counter */}
                  <span className="sm:hidden font-body text-xs text-brand-inverse/30">
                    {currentStep} / 5
                  </span>

                  <button
                    onClick={handleNext}
                    disabled={!canProceedStep()}
                    className="btn-premium-outline font-body text-sm disabled:opacity-25"
                    style={{
                      padding: "0.5rem 1rem",
                    }}
                  >
                    Next
                    <ArrowRight className="w-4 h-4 ml-1.5" />
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
