"use client";

import { useContext, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { BannerContext } from "./BannerContext";

const BANNER_SESSION_KEY = "im-onboarding-banner-dismissed";

export function OnboardingBanner() {
  const { bannerVisible, setBannerVisible } = useContext(BannerContext);

  useEffect(() => {
    const dismissed = sessionStorage.getItem(BANNER_SESSION_KEY);
    if (!dismissed) {
      const timer = setTimeout(() => setBannerVisible(true), 100);
      return () => clearTimeout(timer);
    }
  }, [setBannerVisible]);

  const handleDismiss = () => {
    setBannerVisible(false);
    sessionStorage.setItem(BANNER_SESSION_KEY, "true");
  };

  return (
    <AnimatePresence>
      {bannerVisible && (
        <motion.div
          id="im-onboarding-banner"
          role="banner"
          className="bg-brand-gold text-brand-dark relative z-[60]"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{
            height: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
            opacity: { duration: 0.3, delay: 0.05 },
          }}
        >
          <div className="overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
              {/* Message */}
              <p className="font-body text-sm sm:text-base font-medium text-center sm:text-left leading-snug flex-1 min-w-0">
                <span className="hidden sm:inline" aria-hidden="true">✨ </span>
                Welcome to IM Attorneys Inc — Book your first consultation and receive a{" "}
                <span className="font-semibold underline underline-offset-2 decoration-brand-dark/30">
                  complimentary case assessment
                </span>
                . Call{" "}
                <a
                  href="tel:+27812488048"
                  className="font-semibold hover:underline underline-offset-2"
                >
                  081 248 8048
                </a>{" "}
                or{" "}
                <a
                  href="mailto:attorneys@iminc.co.za"
                  className="font-semibold hover:underline underline-offset-2"
                >
                  email us
                </a>{" "}
                today.
              </p>

              {/* Close button */}
              <button
                onClick={handleDismiss}
                aria-label="Dismiss banner"
                className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center hover:bg-brand-dark/10 transition-colors duration-200 -mr-1"
              >
                <X className="w-4 h-4 text-brand-dark/70" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
