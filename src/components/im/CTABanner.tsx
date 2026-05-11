"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, X } from "lucide-react";

const DISMISS_KEY = "cta-banner-dismissed";

export function CTABanner() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const mountedRef = useRef(false);

  useEffect(() => {
    mountedRef.current = true;
    const isDismissed = sessionStorage.getItem(DISMISS_KEY) === "true";
    if (isDismissed) {
      setTimeout(() => setDismissed(true), 0);
    }
  }, []);

  const handleScroll = useCallback(() => {
    if (dismissed) return;
    const scrollY = window.scrollY;
    if (scrollY > 600) {
      setVisible(true);
    } else if (scrollY < 400) {
      setVisible(false);
    }
  }, [dismissed]);

  useEffect(() => {
    if (!mountedRef.current) return;
    window.addEventListener("scroll", handleScroll, { passive: true });
    // Check initial scroll position asynchronously
    const rafId = requestAnimationFrame(() => handleScroll());
    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, [handleScroll]);

  const handleDismiss = useCallback(() => {
    setVisible(false);
    setDismissed(true);
    sessionStorage.setItem(DISMISS_KEY, "true");
  }, []);

  const handleScrollToContact = useCallback(() => {
    const el = document.getElementById("contact");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  if (dismissed) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 z-50 bg-brand-dark/95 backdrop-blur-xl border-t border-brand-gold/20"
          role="complementary"
          aria-label="Call to action banner"
        >
          {/* Close button */}
          <button
            onClick={handleDismiss}
            className="absolute top-1 right-2 text-white/40 hover:text-white/80 transition-colors p-1 -m-1"
            aria-label="Dismiss banner"
          >
            <X className="w-3.5 h-3.5" />
          </button>

          <div className="max-w-7xl mx-auto py-3 px-4 sm:px-6 flex items-center justify-between gap-4">
            {/* Left content */}
            <div className="flex flex-col min-w-0">
              <span className="font-semibold text-sm text-white font-body">
                Need Legal Help?
              </span>
              <span className="text-xs text-white/60 font-body mt-0.5">
                Free initial consultation &bull; Available 24/7 for emergencies
              </span>
              <a
                href="tel:0812488048"
                className="hidden sm:inline-flex items-center gap-1.5 text-brand-gold text-sm mt-1 hover:underline font-body transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
                081 248 8048
              </a>
            </div>

            {/* Right side — CTA buttons */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              <button
                onClick={handleScrollToContact}
                className="bg-brand-gold text-brand-dark font-semibold text-xs sm:text-sm px-3 py-1.5 sm:px-4 sm:py-2 rounded-sm hover:shadow-lg hover:shadow-brand-gold/20 transition-all duration-200 font-body cursor-pointer"
              >
                Book Consultation
              </button>
              <a
                href="tel:0812488048"
                className="border border-brand-gold/40 text-brand-gold text-xs sm:text-sm px-3 py-1.5 sm:px-4 sm:py-2 rounded-sm hover:bg-brand-gold/10 transition-all duration-200 font-body inline-flex items-center justify-center"
              >
                <Phone className="w-3 h-3 sm:mr-1.5 sm:w-3.5 sm:h-3.5" />
                <span className="hidden sm:inline">Call Now</span>
                <span className="sm:hidden">Call</span>
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
