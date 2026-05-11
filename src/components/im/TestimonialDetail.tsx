"use client";

import { useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, X } from "lucide-react";

/* ----------------------------------------------------------------
   EXTENDED TESTIMONIALS DATA
   ---------------------------------------------------------------- */

export interface ExtendedTestimonial {
  id: string;
  name: string;
  shortQuote: string;
  fullStory: string;
  area: string;
  duration: string;
  outcome: string;
  rating: number;
  recommendResponse: string;
}

export const extendedTestimonials: ExtendedTestimonial[] = [
  {
    id: "thandi-m",
    name: "Thandi M.",
    shortQuote:
      "IM Attorneys handled my divorce with incredible sensitivity and professionalism.",
    fullStory:
      "Going through a divorce was one of the most challenging periods of my life, made even harder by an acrimonious custody battle that left me feeling overwhelmed and uncertain about the future. From the very first consultation, the team at IM Attorneys listened to my concerns with genuine empathy and outlined a clear legal strategy that put my children's wellbeing first. They negotiated tirelessly on my behalf, ensuring that the settlement was fair and that I maintained a meaningful role in my children's lives. Six months later, I walked away with a favourable settlement that gave me stability and peace of mind. I am deeply grateful for their compassion and unwavering dedication throughout the entire process.",
    area: "Family Law",
    duration: "6 months",
    outcome: "Favourable settlement",
    rating: 5,
    recommendResponse:
      "Absolutely. They treated me with respect and professionalism throughout.",
  },
  {
    id: "david-k",
    name: "David K.",
    shortQuote:
      "After my car accident, I didn't know where to turn. The team guided me through the RAF claims process.",
    fullStory:
      "I was involved in a severe car accident on the N1 that left me hospitalised for three weeks and unable to work for several months. Navigating the Road Accident Fund claims process felt impossible while I was still recovering, and the paperwork alone was overwhelming. IM Attorneys took on my case with remarkable efficiency, gathering medical records, consulting specialists, and building a compelling claim on my behalf. They kept me informed at every stage and handled all communication with the RAF so I could focus on my rehabilitation. After fourteen months of determined advocacy, they secured a R1.2 million settlement that covered my medical expenses, lost income, and future care needs. I cannot thank them enough for their tenacity and care.",
    area: "RAF Claims",
    duration: "14 months",
    outcome: "R1.2M settlement",
    rating: 5,
    recommendResponse:
      "Absolutely. They treated me with respect and professionalism throughout.",
  },
  {
    id: "sarah-n",
    name: "Sarah N.",
    shortQuote:
      "Professional, responsive, and deeply knowledgeable. They drafted our commercial contracts with precision.",
    fullStory:
      "When my business partner breached a critical contract clause, it threatened not only our working relationship but the very survival of the company we had built together over five years. I needed legal representation that understood both the commercial realities and the personal stakes involved. IM Attorneys analysed every detail of our partnership agreement, identified the breaches, and developed a strategy that protected my interests while leaving room for a negotiated resolution. Their commercial law expertise was evident in every correspondence and court filing. After eight months of careful legal work, the matter was resolved with a favourable judgment that upheld my rights and allowed the business to continue operating. Their strategic approach saved me both time and significant legal costs.",
    area: "Commercial Law",
    duration: "8 months",
    outcome: "Favourable judgment",
    rating: 5,
    recommendResponse:
      "Absolutely. They treated me with respect and professionalism throughout.",
  },
];

/* ----------------------------------------------------------------
   COMPONENT
   ---------------------------------------------------------------- */

interface TestimonialDetailProps {
  /** Which testimonial to display, or `null` to hide the modal. */
  testimonial: ExtendedTestimonial | null;
  /** Called to dismiss the modal. */
  onClose: () => void;
}

export function TestimonialDetail({ testimonial, onClose }: TestimonialDetailProps) {
  /* ---- Body scroll lock ---- */
  useEffect(() => {
    if (!testimonial) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [testimonial]);

  /* ---- Escape key handler ---- */
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose],
  );

  useEffect(() => {
    if (!testimonial) return;

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [testimonial, handleKeyDown]);

  return (
    <AnimatePresence>
      {testimonial && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={`Testimonial from ${testimonial.name}`}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-brand-dark/60 backdrop-blur-sm" />

          {/* Card */}
          <motion.div
            className="relative bg-white rounded-2xl max-w-lg w-full mx-4 shadow-2xl border border-brand-gold/10 overflow-hidden"
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full text-brand-muted hover:text-brand-dark hover:bg-brand-gold/10 transition-colors duration-200"
              aria-label="Close testimonial"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="px-6 sm:px-8 pt-8 pb-8">
              {/* Gold quote icon */}
              <div className="text-brand-gold mb-4">
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 48 48"
                  fill="none"
                  aria-hidden="true"
                  className="w-10 h-10 sm:w-12 sm:h-12"
                >
                  <path
                    d="M14 28c0 3.314-2.686 6-6 6H6v-4h2c1.105 0 2-.895 2-2v-4h4v4zm20 0c0 3.314-2.686 6-6 6h-2v-4h2c1.105 0 2-.895 2-2v-4h4v4zM8 8h4v12H8V8zm20 0h4v12h-4V8z"
                    fill="currentColor"
                    fillOpacity={0.25}
                  />
                  <path
                    d="M8 8h2v10H8V8zm20 0h2v10h-2V8z"
                    fill="currentColor"
                  />
                </svg>
              </div>

              {/* Full testimonial text */}
              <p className="font-display italic text-lg leading-relaxed text-brand-body">
                &ldquo;{testimonial.fullStory}&rdquo;
              </p>

              {/* Gold divider */}
              <div className="my-6 h-px bg-gradient-to-r from-transparent via-brand-gold/40 to-transparent" />

              {/* Star rating */}
              <div className="flex items-center gap-0.5 mb-5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < testimonial.rating
                        ? "fill-brand-gold text-brand-gold"
                        : "fill-brand-border text-brand-border"
                    }`}
                  />
                ))}
              </div>

              {/* Client info */}
              <div className="flex items-center gap-3 mb-6">
                <span className="font-body font-semibold text-brand-dark">
                  {testimonial.name}
                </span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-brand-gold/10 text-brand-gold font-body font-medium">
                  {testimonial.area}
                </span>
              </div>

              {/* Case details grid */}
              <div className="grid grid-cols-2 gap-4 mb-6 p-4 rounded-xl bg-brand-cream/60">
                <div>
                  <p className="font-body text-xs text-brand-muted uppercase tracking-wider mb-1">
                    Duration
                  </p>
                  <p className="font-body text-sm font-semibold text-brand-dark">
                    {testimonial.duration}
                  </p>
                </div>
                <div>
                  <p className="font-body text-xs text-brand-muted uppercase tracking-wider mb-1">
                    Outcome
                  </p>
                  <p className="font-body text-sm font-semibold text-brand-dark">
                    {testimonial.outcome}
                  </p>
                </div>
              </div>

              {/* Recommendation */}
              <div className="border-t border-brand-border/40 pt-5">
                <p className="font-body text-sm text-brand-muted mb-2">
                  Would you recommend IM Attorneys?
                </p>
                <p className="font-display italic text-base text-brand-dark leading-relaxed">
                  &ldquo;{testimonial.recommendResponse}&rdquo;
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
