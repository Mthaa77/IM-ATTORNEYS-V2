"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldAlert, Phone, X, MessageCircle } from "lucide-react";

export function BailFloatingIcon() {
  const [isExpanded, setIsExpanded] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const closeCard = useCallback(() => {
    setIsExpanded(false);
  }, []);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCard();
    };
    if (isExpanded) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isExpanded, closeCard]);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (cardRef.current && !cardRef.current.contains(e.target as Node)) {
        closeCard();
      }
    };
    if (isExpanded) {
      // Small delay to avoid the opening click immediately closing it
      const timer = setTimeout(() => {
        document.addEventListener("mousedown", handleClickOutside);
      }, 50);
      return () => {
        clearTimeout(timer);
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [isExpanded, closeCard]);

  return (
    <motion.div
      className="fixed left-4 sm:left-6 bottom-20 sm:bottom-24 z-[55]"
      initial={{ opacity: 0, x: -50, scale: 0.8 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{
        duration: 0.8,
        delay: 2,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <AnimatePresence mode="wait">
        {isExpanded ? (
          /* ── Expanded Card ── */
          <motion.div
            ref={cardRef}
            key="card"
            className="relative"
            initial={{ opacity: 0, scale: 0.85, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 10 }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 28,
              mass: 0.8,
            }}
          >
            {/* Glass card backdrop */}
            <div className="glass-premium rounded-2xl p-5 w-[280px] sm:w-[300px] relative">
              {/* Close button */}
              <button
                onClick={closeCard}
                aria-label="Close bail assistance panel"
                className="absolute top-3 right-3 w-7 h-7 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 transition-colors cursor-pointer"
              >
                <X className="w-3.5 h-3.5 text-white/70" />
              </button>

              {/* Gold accent line */}
              <div className="absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-[#C6A84B] to-transparent" />

              {/* Shield icon + heading */}
              <div className="flex items-center gap-2.5 mb-3">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-[#C6A84B]/15 border border-[#C6A84B]/30">
                  <ShieldAlert className="w-4.5 h-4.5 text-[#C6A84B]" strokeWidth={2} />
                </div>
                <div>
                  <h3 className="font-display text-sm font-bold text-gold-gradient leading-tight">
                    24/7 Bail Assistance
                  </h3>
                  <p className="font-body text-[11px] text-white/50 leading-snug">
                    Emergency bail applications
                  </p>
                </div>
              </div>

              {/* Description */}
              <p className="font-body text-xs text-white/70 leading-relaxed mb-4 pl-0.5">
                Emergency bail applications — any time, any day. Our attorneys are ready to assist you around the clock.
              </p>

              {/* Action buttons */}
              <div className="flex gap-2.5 mb-3.5">
                <a
                  href="tel:+27812488048"
                  className="btn-premium flex-1 !py-2.5 !px-3 !text-xs !rounded-xl no-underline"
                  aria-label="Call IM Attorneys for bail assistance"
                >
                  <Phone className="w-3.5 h-3.5" />
                  Call Now
                </a>
                <a
                  href="https://wa.me/27812488048?text=Hello%2C%20I%20need%20urgent%20bail%20assistance."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-premium-outline flex-1 !py-2.5 !px-3 !text-xs !rounded-xl no-underline"
                  aria-label="WhatsApp IM Attorneys for bail assistance"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  WhatsApp
                </a>
              </div>

              {/* Operating hours */}
              <div className="flex items-center gap-1.5 pt-3 border-t border-white/10">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <p className="font-body text-[10px] text-white/45 tracking-wide uppercase">
                  Available 24 hours, 7 days a week
                </p>
              </div>
            </div>
          </motion.div>
        ) : (
          /* ── Compact Button ── */
          <motion.button
            key="button"
            onClick={() => setIsExpanded(true)}
            aria-label="24/7 Bail Application Assistance — Click for options"
            className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C6A84B]/60"
            style={{
              background:
                "linear-gradient(135deg, rgba(13,27,42,0.85) 0%, rgba(26,50,80,0.75) 50%, rgba(13,27,42,0.85) 100%)",
              backdropFilter: "blur(20px) saturate(1.8)",
              WebkitBackdropFilter: "blur(20px) saturate(1.8)",
              border: "1px solid rgba(198,168,75,0.35)",
              boxShadow:
                "0 4px 20px rgba(0,0,0,0.3), 0 0 20px rgba(198,168,75,0.08), inset 0 1px 0 rgba(255,255,255,0.08), inset 0 -1px 0 rgba(0,0,0,0.2)",
            }}
            whileHover={{
              scale: 1.08,
              y: -2,
              boxShadow:
                "0 8px 32px rgba(198,168,75,0.25), 0 0 40px rgba(198,168,75,0.12), inset 0 1px 0 rgba(255,255,255,0.12), inset 0 -1px 0 rgba(0,0,0,0.2)",
            }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Shield icon */}
            <ShieldAlert
              className="w-5 h-5 sm:w-[22px] sm:h-[22px] text-[#C6A84B] drop-shadow-[0_0_6px_rgba(198,168,75,0.4)]"
              strokeWidth={1.8}
            />

            {/* Red pulsing availability dot */}
            <span
              className="absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full bg-red-500 border-2 border-[#0D1B2A]/80"
              style={{
                boxShadow: "0 0 6px rgba(239,68,68,0.6), 0 0 12px rgba(239,68,68,0.3)",
              }}
            >
            </span>
          </motion.button>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
