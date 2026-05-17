"use client";

import { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Crown,
  Star,
  CheckCircle,
  Diamond,
  ArrowRight,
  Phone,
  Building2,
  Shield,
  Clock,
  MessageSquare,
  User,
  Mail,
  CalendarDays,
  FileText,
} from "lucide-react";

import { ScrollReveal } from "@/components/im/ScrollReveal";

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
/*  Tier data                                                          */
/* ------------------------------------------------------------------ */

interface Tier {
  id: string;
  name: string;
  price: string;
  priceNote: string;
  duration: string;
  format: string;
  badge?: string;
  badgeIcon?: typeof Star;
  features: string[];
  icon: typeof Phone;
  isPremium?: boolean;
  isCrown?: boolean;
}

const tiers: Tier[] = [
  {
    id: "standard",
    name: "Standard Consultation",
    price: "Free",
    priceNote: "No obligation",
    duration: "30 min",
    format: "Phone / Video",
    icon: Phone,
    features: [
      "Initial case assessment",
      "Overview of legal options",
      "General guidance on process",
      "Recommendation of next steps",
      "No-obligation discussion",
    ],
  },
  {
    id: "premium",
    name: "Premium Consultation",
    price: "R2,500",
    priceNote: "One-time fee",
    duration: "60 min",
    format: "In-Person with Senior Attorney",
    icon: Building2,
    badge: "Most Popular",
    badgeIcon: Star,
    isPremium: true,
    features: [
      "In-depth case analysis",
      "Senior attorney assigned",
      "Strategic legal advice",
      "Preliminary case assessment",
      "Document review (up to 10 pages)",
      "Written summary of advice",
      "Priority follow-up within 24 hrs",
    ],
  },
  {
    id: "private",
    name: "Private Client Engagement",
    price: "Custom",
    priceNote: "Tailored to your matter",
    duration: "Dedicated",
    format: "Full Legal Team & Priority Access",
    icon: Crown,
    badge: "Exclusive",
    badgeIcon: Crown,
    isCrown: true,
    features: [
      "Dedicated attorney team",
      "Priority 24/7 access",
      "Comprehensive legal strategy",
      "Unlimited document review",
      "Court representation included",
      "Monthly progress reports",
      "Direct line to lead attorney",
      "Confidentiality agreements",
      "Expedited proceedings",
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Gold diamond checkmark icon                                        */
/* ------------------------------------------------------------------ */

function GoldDiamondCheck() {
  return (
    <Diamond
      className="w-3.5 h-3.5 shrink-0 rotate-45"
      style={{ color: "#C6A84B" }}
    />
  );
}

/* ------------------------------------------------------------------ */
/*  Form input component                                               */
/* ------------------------------------------------------------------ */

function GlassInput({
  icon: Icon,
  type = "text",
  placeholder,
  value,
  onChange,
  textarea = false,
}: {
  icon: typeof User;
  type?: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  textarea?: boolean;
}) {
  const baseStyle = {
    background: "rgba(198,168,75,0.05)",
    border: "1px solid rgba(198,168,75,0.2)",
    color: "#F0EDE8",
  };

  if (textarea) {
    return (
      <div className="relative">
        <Icon
          className="absolute top-3 left-3 w-4 h-4 pointer-events-none"
          style={{ color: "rgba(198,168,75,0.5)" }}
        />
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={3}
          className="w-full pl-10 pr-4 py-3 rounded-lg font-body text-sm placeholder:text-white/30 focus:outline-none focus:border-brand-gold/50 transition-colors resize-none"
          style={baseStyle}
        />
      </div>
    );
  }

  return (
    <div className="relative">
      <Icon
        className="absolute top-1/2 left-3 -translate-y-1/2 w-4 h-4 pointer-events-none"
        style={{ color: "rgba(198,168,75,0.5)" }}
      />
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-10 pr-4 py-3 rounded-lg font-body text-sm placeholder:text-white/30 focus:outline-none focus:border-brand-gold/50 transition-colors"
        style={baseStyle}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Booking form                                                       */
/* ------------------------------------------------------------------ */

function BookingForm({ tier }: { tier: Tier }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    datetime: "",
    description: "",
  });

  const update = useCallback((key: string, val: string) => {
    setForm((prev) => ({ ...prev, [key]: val }));
  }, []);

  const allFilled =
    form.name && form.email && form.phone && form.description;

  const waMessage = `Hello IM Attorneys!\n\nI would like to book a ${tier.name}.\n\nName: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\nPreferred Date/Time: ${form.datetime || "Flexible"}\n\nDescription:\n${form.description}\n\nLooking forward to hearing from you.`;

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="overflow-hidden"
    >
      <div className="mt-6 pt-6 section-separator" style={{ borderColor: "rgba(198,168,75,0.2)" }}>
        <p className="font-body text-sm font-semibold text-brand-gold mb-4 text-center">
          Complete Your Booking
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg mx-auto">
          <GlassInput
            icon={User}
            placeholder="Full Name"
            value={form.name}
            onChange={(v) => update("name", v)}
          />
          <GlassInput
            icon={Mail}
            type="email"
            placeholder="Email Address"
            value={form.email}
            onChange={(v) => update("email", v)}
          />
          <GlassInput
            icon={Phone}
            type="tel"
            placeholder="Phone Number"
            value={form.phone}
            onChange={(v) => update("phone", v)}
          />
          <GlassInput
            icon={CalendarDays}
            placeholder="Preferred Date / Time"
            value={form.datetime}
            onChange={(v) => update("datetime", v)}
          />
          <div className="sm:col-span-2">
            <GlassInput
              icon={FileText}
              placeholder="Brief description of your legal matter..."
              value={form.description}
              onChange={(v) => update("description", v)}
              textarea
            />
          </div>
        </div>
        <div className="mt-5 flex justify-center">
          <a
            href={whatsappUrl(waMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-premium inline-flex items-center gap-2 px-6 py-3 font-body text-sm rounded-md disabled:opacity-40"
            style={
              !allFilled
                ? {
                    background: "rgba(198,168,75,0.15)",
                    color: "rgba(198,168,75,0.3)",
                    boxShadow: "none",
                    pointerEvents: "none",
                  }
                : undefined
            }
          >
            <MessageSquare className="w-4 h-4" />
            Confirm Booking via WhatsApp
          </a>
        </div>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Tier Card                                                          */
/* ------------------------------------------------------------------ */

function TierCard({
  tier,
  isSelected,
  onSelect,
}: {
  tier: Tier;
  isSelected: boolean;
  onSelect: () => void;
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
      const rotateX = ((y - centerY) / centerY) * -3;
      const rotateY = ((x - centerX) / centerX) * 3;
      cardRef.current.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02,1.02,1.02)`;
    },
    [cardRef]
  );

  const handleMouseLeave = useCallback(() => {
    if (!cardRef.current) return;
    cardRef.current.style.transform =
      "perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)";
  }, []);

  const Icon = tier.icon;

  return (
    <div className="flex flex-col">
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={onSelect}
        className="glass-premium rounded-2xl p-6 sm:p-8 cursor-pointer flex flex-col h-full"
        style={{
          border: isSelected
            ? "2px solid rgba(198,168,75,0.7)"
            : "1px solid rgba(198,168,75,0.15)",
          boxShadow: isSelected
            ? "0 0 40px rgba(198,168,75,0.2), inset 0 0 30px rgba(198,168,75,0.05)"
            : tier.isPremium
            ? "0 8px 32px rgba(198,168,75,0.08)"
            : undefined,
          transition:
            "transform 0.2s ease, border-color 0.3s, box-shadow 0.3s",
        }}
        whileTap={{ scale: 0.98 }}
      >
        {/* Badge */}
        {tier.badge && (
          <div className="flex justify-center mb-4">
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] uppercase tracking-[0.15em] font-body font-bold"
              style={{
                background: tier.isCrown
                  ? "linear-gradient(135deg, #C6A84B, #E4D49A)"
                  : "rgba(198,168,75,0.15)",
                color: tier.isCrown ? "#0D1B2A" : "#C6A84B",
                border: `1px solid ${
                  tier.isCrown
                    ? "rgba(198,168,75,0.8)"
                    : "rgba(198,168,75,0.3)"
                }`,
              }}
            >
              {tier.badgeIcon && (
                <tier.badgeIcon className="w-3 h-3" />
              )}
              {tier.badge}
            </span>
          </div>
        )}

        {/* Icon */}
        <div
          className="w-14 h-14 mx-auto rounded-full flex items-center justify-center mb-4"
          style={{
            background: tier.isCrown
              ? "linear-gradient(135deg, rgba(198,168,75,0.2), rgba(228,212,154,0.1))"
              : "rgba(198,168,75,0.08)",
            border: `1px solid ${
              tier.isCrown ? "rgba(198,168,75,0.4)" : "rgba(198,168,75,0.2)"
            }`,
            boxShadow: tier.isCrown
              ? "0 0 20px rgba(198,168,75,0.15)"
              : undefined,
          }}
        >
          <Icon
            className="w-6 h-6"
            style={{ color: tier.isCrown ? "#E4D49A" : "#C6A84B" }}
          />
        </div>

        {/* Title */}
        <h3
          className="font-display text-lg sm:text-xl text-center mb-1"
          style={{
            color: tier.isCrown ? "#E4D49A" : "#fff",
          }}
        >
          {tier.name}
        </h3>

        {/* Price */}
        <p className="text-center mb-1">
          <span
            className="font-display text-3xl sm:text-4xl font-bold"
            style={{
              color: tier.isCrown
                ? "#C6A84B"
                : tier.isPremium
                ? "#E4D49A"
                : "#fff",
            }}
          >
            {tier.price}
          </span>
        </p>
        <p
          className="font-body text-xs text-center mb-4"
          style={{ color: "rgba(255,255,255,0.4)" }}
        >
          {tier.priceNote}
        </p>

        {/* Duration & Format */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" style={{ color: "#C6A84B" }} />
            <span
              className="font-body text-xs"
              style={{ color: "rgba(255,255,255,0.6)" }}
            >
              {tier.duration}
            </span>
          </div>
          <div
            className="w-px h-3"
            style={{ background: "rgba(198,168,75,0.2)" }}
          />
          <span
            className="font-body text-xs"
            style={{ color: "rgba(255,255,255,0.6)" }}
          >
            {tier.format}
          </span>
        </div>

        {/* Features */}
        <ul className="space-y-2.5 flex-1 mb-6">
          {tier.features.map((feature) => (
            <li key={feature} className="flex items-start gap-2.5">
              <GoldDiamondCheck />
              <span
                className="font-body text-sm"
                style={{ color: "rgba(255,255,255,0.65)" }}
              >
                {feature}
              </span>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <button
          className={
            tier.isCrown
              ? "btn-premium w-full"
              : tier.isPremium
              ? "btn-premium w-full"
              : "btn-premium-outline w-full"
          }
          style={
            !tier.isPremium && !tier.isCrown
              ? {}
              : undefined
          }
        >
          {isSelected ? (
            <>
              <CheckCircle className="w-4 h-4" />
              Selected
            </>
          ) : (
            <>
              {tier.id === "private" ? "Enquire Now" : "Book Now"}
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </motion.div>

      {/* Inline booking form */}
      <AnimatePresence>
        {isSelected && <BookingForm tier={tier} />}
      </AnimatePresence>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Component                                                     */
/* ------------------------------------------------------------------ */

export function VIPConsultationBooking() {
  const [selectedTier, setSelectedTier] = useState<string | null>(null);

  const handleSelect = useCallback((tierId: string) => {
    setSelectedTier((prev) => (prev === tierId ? null : tierId));
  }, []);

  return (
    <section
      id="vip-consultation"
      className="relative py-20 sm:py-28 lg:py-36 overflow-hidden noise-overlay"
      style={{ background: "#0D1B2A" }}
      aria-labelledby="vip-heading"
    >
      {/* Background accents */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundImage: `radial-gradient(ellipse at 50% 20%, rgba(198,168,75,0.06) 0%, transparent 50%),
                           radial-gradient(ellipse at 30% 80%, rgba(198,168,75,0.03) 0%, transparent 40%)`,
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

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── Heading Area ── */}
        <div className="text-center mb-10 sm:mb-14">
          <ScrollReveal direction="up" delay={0}>
            <span className="label-premium mb-4 block">
              <Crown className="w-3.5 h-3.5 inline mr-1" />
              VIP Booking
            </span>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.1}>
            <h2 id="vip-heading" className="heading-gold-glossy">
              Book Your Consultation
            </h2>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.15}>
            <OrnamentalDivider />
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.2}>
            <p className="subheading-premium-dark">
              Choose the engagement level that suits your needs. Every
              consultation is handled with the utmost discretion and
              professionalism.
            </p>
          </ScrollReveal>
        </div>

        {/* ── Tier Cards ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {tiers.map((tier, i) => (
            <motion.div
              key={tier.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
            >
              <TierCard
                tier={tier}
                isSelected={selectedTier === tier.id}
                onSelect={() => handleSelect(tier.id)}
              />
            </motion.div>
          ))}
        </div>

        {/* ── Trust Note ── */}
        <ScrollReveal direction="up" delay={0.3}>
          <div className="mt-12 sm:mt-16 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full" style={{
              background: "rgba(198,168,75,0.06)",
              border: "1px solid rgba(198,168,75,0.15)",
            }}>
              <Shield className="w-4 h-4" style={{ color: "#C6A84B" }} />
              <span className="font-body text-xs" style={{ color: "rgba(228,212,154,0.7)" }}>
                All consultations are 100% confidential · Attorney-client privilege applies
              </span>
            </div>
          </div>
        </ScrollReveal>
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
