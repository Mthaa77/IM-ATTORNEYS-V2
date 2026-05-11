"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

export function WhatsAppButton() {
  return (
    <motion.a
      href="https://wa.me/270812488048"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed right-3 sm:right-6 z-50 flex items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-[#25D366]/25 hover:shadow-xl hover:shadow-[#25D366]/35 transition-all duration-300 no-underline"
      style={{ bottom: "max(1rem, env(safe-area-inset-bottom, 1rem))" }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay: 1.5,
      }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.92 }}
    >
      {/* Pulse ring */}
      <motion.span
        className="absolute inset-0 rounded-full bg-[#25D366]"
        animate={{
          scale: [1, 1.25, 1],
          opacity: [0.35, 0, 0.35],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Icon container — smaller on mobile */}
      <span className="relative flex items-center justify-center w-10 h-10 sm:w-[52px] sm:h-[52px]">
        <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 fill-white" />
      </span>

      {/* Tooltip — desktop only, on hover */}
      <span className="absolute right-full mr-2.5 whitespace-nowrap bg-brand-dark text-white text-xs font-body font-medium px-3 py-1.5 rounded-lg shadow-lg pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200 hidden sm:block">
        Chat on WhatsApp
        <span className="absolute top-1/2 -right-1 -translate-y-1/2 w-2 h-2 bg-brand-dark rotate-45" />
      </span>
    </motion.a>
  );
}
