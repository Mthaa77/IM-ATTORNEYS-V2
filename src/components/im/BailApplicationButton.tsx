"use client";

import { motion } from "framer-motion";
import { ShieldAlert } from "lucide-react";

export function BailApplicationButton() {
  return (
    <motion.a
      href="tel:+27812488048"
      aria-label="Emergency Bail Application — Call Now"
      className="fixed right-3 sm:right-6 z-50 flex items-center justify-center rounded-full bg-red-600 text-white shadow-lg shadow-red-600/30 hover:shadow-xl hover:shadow-red-600/40 transition-all duration-300 no-underline"
      style={{ bottom: "max(6rem, calc(env(safe-area-inset-bottom, 1rem) + 5.5rem))" }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay: 2.5,
      }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.92 }}
    >
      {/* Pulse ring */}
      <motion.span
        className="absolute inset-0 rounded-full bg-red-600"
        animate={{
          scale: [1, 1.25, 1],
          opacity: [0.35, 0, 0.35],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Icon container */}
      <span className="relative flex items-center justify-center w-11 h-11 sm:w-[52px] sm:h-[52px]">
        <ShieldAlert className="w-5 h-5 sm:w-6 sm:h-6 fill-white" strokeWidth={2} />
      </span>

      {/* Tooltip — desktop only, on hover */}
      <span className="absolute right-full mr-2.5 whitespace-nowrap bg-brand-dark text-white text-xs font-body font-medium px-3 py-1.5 rounded-lg shadow-lg pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200 hidden sm:block">
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
          Bail Application 24/7
        </span>
        <span className="absolute top-1/2 -right-1 -translate-y-1/2 w-2 h-2 bg-brand-dark rotate-45" />
      </span>
    </motion.a>
  );
}
