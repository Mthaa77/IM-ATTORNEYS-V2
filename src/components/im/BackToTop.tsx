"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";

export function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = useCallback(() => {
    setIsVisible(window.scrollY > 600);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          onClick={scrollToTop}
          className="fixed right-3 sm:right-6 z-40 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-brand-dark/90 text-brand-gold hover:bg-brand-dark hover:text-brand-gold-light border border-brand-gold/20 shadow-lg shadow-black/10 backdrop-blur-sm flex items-center justify-center transition-colors duration-300 group"
          style={{ bottom: "max(12.5rem, calc(env(safe-area-inset-bottom, 1rem) + 12rem))" }}
          aria-label="Back to top"
        >
          <ArrowUp className="w-4 h-4 sm:w-5 sm:h-5 group-hover:-translate-y-0.5 transition-transform duration-300" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
