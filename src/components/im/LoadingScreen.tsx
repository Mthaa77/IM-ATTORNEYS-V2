"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LOADING_SESSION_KEY = "im-loading-screen-shown";

type Phase = "hidden" | "in" | "out";

export function LoadingScreen() {
  const [phase, setPhase] = useState<Phase>("hidden");
  const timeoutRefs = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    const alreadyShown = sessionStorage.getItem(LOADING_SESSION_KEY);
    if (alreadyShown) return;

    // Phase 1: Fade in
    const t1 = setTimeout(() => setPhase("in"), 50);
    // Phase 2: Hold then fade out
    const t2 = setTimeout(() => setPhase("out"), 1100);
    // Phase 3: Mark as shown
    const t3 = setTimeout(() => {
      setPhase("hidden");
      sessionStorage.setItem(LOADING_SESSION_KEY, "true");
    }, 1500);

    timeoutRefs.current = [t1, t2, t3];

    return () => {
      timeoutRefs.current.forEach(clearTimeout);
    };
  }, []);

  const isVisible = phase === "in" || phase === "out";

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-brand-inverse"
          initial={{ opacity: 0 }}
          animate={phase === "in" ? { opacity: 1 } : { opacity: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          {/* Monogram Circle */}
          <motion.div
            className="w-24 h-24 rounded-full border-2 border-brand-gold flex items-center justify-center relative"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
          >
            {/* Pulse ring */}
            <motion.span
              className="absolute w-24 h-24 rounded-full border border-brand-gold/30"
              animate={{
                scale: [1, 1.5, 1.5],
                opacity: [0.5, 0, 0],
              }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: "easeOut",
              }}
            />
            <motion.span
              className="font-display font-bold text-brand-gold text-4xl tracking-wider"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25, ease: "easeOut" }}
            >
              IM
            </motion.span>
          </motion.div>

          {/* Firm Name */}
          <motion.p
            className="font-body font-medium text-brand-dark text-sm tracking-[0.35em] uppercase mt-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
          >
            IM Attorneys
          </motion.p>

          {/* Subtle gold line */}
          <motion.div
            className="h-px bg-brand-gold mt-4"
            initial={{ width: 0 }}
            animate={{ width: 48 }}
            transition={{ duration: 0.6, delay: 0.55, ease: "easeOut" }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
