"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod/v4";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageSquare,
  X,
  Phone,
  Send,
  Loader2,
  AlertCircle,
  Clock,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

// --- Zod Validation Schema ---
const quickConsultSchema = z.object({
  name: z
    .string()
    .min(2, "Please enter your name (at least 2 characters)"),
  phone: z
    .string()
    .min(8, "Please enter a valid phone number (at least 8 digits)"),
  message: z
    .string()
    .min(10, "Please describe your matter (at least 10 characters)")
    .max(500, "Message is too long (max 500 characters)"),
});

type QuickConsultFormData = z.infer<typeof quickConsultSchema>;

// --- Framer Motion Variants ---
const drawerVariants = {
  closed: { x: "100%" },
  open: { x: 0 },
};

const overlayVariants = {
  closed: { opacity: 0 },
  open: { opacity: 1 },
};

const triggerVariants = {
  closed: { rotate: 0 },
  open: { rotate: 90 },
};

// --- Focus trap utility ---
function getFocusableElements(container: HTMLElement): HTMLElement[] {
  const selectors = [
    'a[href]',
    'button:not([disabled])',
    'input:not([disabled])',
    'textarea:not([disabled])',
    'select:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
  ];
  return Array.from(
    container.querySelectorAll<HTMLElement>(selectors.join(", "))
  );
}

export function QuickConsultation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [messageCharCount, setMessageCharCount] = useState(0);
  const [popiaConsent, setPopiaConsent] = useState(false);
  const { toast } = useToast();
  const drawerRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<QuickConsultFormData>({
    resolver: zodResolver(quickConsultSchema),
    defaultValues: {
      name: "",
      phone: "",
      message: "",
    },
  });

  // Track message character count
  const messageValue = watch("message");
  useEffect(() => {
    setMessageCharCount(messageValue?.length ?? 0);
  }, [messageValue]);

  // --- Open / Close Drawer ---
  const openDrawer = useCallback(() => {
    previousFocusRef.current = document.activeElement as HTMLElement;
    setIsOpen(true);
  }, []);

  const closeDrawer = useCallback(() => {
    setIsOpen(false);
  }, []);

  // --- Body scroll lock ---
  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY;
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";

      return () => {
        document.body.style.overflow = "";
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.width = "";
        window.scrollTo(0, scrollY);
      };
    }
  }, [isOpen]);

  // --- Escape key handler ---
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeDrawer();
        return;
      }

      // Focus trap: Tab / Shift+Tab cycles within drawer
      if (e.key === "Tab" && drawerRef.current) {
        const focusable = getFocusableElements(drawerRef.current);
        if (focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, closeDrawer]);

  // --- Restore focus on close ---
  useEffect(() => {
    if (!isOpen && previousFocusRef.current) {
      previousFocusRef.current.focus();
      previousFocusRef.current = null;
    }
  }, [isOpen]);

  // --- Focus first input when drawer opens ---
  useEffect(() => {
    if (isOpen && drawerRef.current) {
      // Small delay to let animation start
      const timer = setTimeout(() => {
        const firstInput = drawerRef.current?.querySelector<HTMLInputElement>(
          'input, textarea'
        );
        if (firstInput) firstInput.focus();
      }, 350);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // --- Form Submission ---
  const onSubmit = async (data: QuickConsultFormData) => {
    if (!popiaConsent) {
      toast({
        title: "Consent Required",
        description: "Please tick the consent checkbox before submitting. This is required under POPIA.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          fullName: data.name,
          phone: data.phone,
          description: data.message,
          areaOfLaw: "Quick Consultation",
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit consultation request");
      }

      toast({
        title: "Consultation Request Sent",
        description:
          "We'll call you back within 2 hours. Thank you for trusting IM Attorneys.",
      });

      reset();
      setMessageCharCount(0);
      setPopiaConsent(false);
      closeDrawer();
    } catch {
      toast({
        title: "Something Went Wrong",
        description:
          "We couldn't send your request. Please try calling us directly at 081 248 8048.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* ============ Floating Trigger Button ============ */}
      <motion.button
        type="button"
        aria-label={isOpen ? "Close consultation drawer" : "Quick Consultation"}
        onClick={isOpen ? closeDrawer : openDrawer}
        className="fixed right-3 sm:right-6 z-[90] w-10 h-10 sm:w-[52px] sm:h-[52px] rounded-full bg-brand-gold text-brand-dark shadow-lg shadow-brand-gold/25 hover:shadow-xl hover:shadow-brand-gold/35 transition-shadow duration-300 flex items-center justify-center group"
        style={{ bottom: "max(9rem, calc(env(safe-area-inset-bottom, 1rem) + 8.5rem))" }}
        animate={{
          y: isOpen ? 0 : [0, -6, 0],
        }}
        transition={{
          y: {
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
          },
        }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Pulse ring */}
        {!isOpen && (
          <span className="absolute inset-0 rounded-full bg-brand-gold animate-pulse-gold" />
        )}

        {/* Icon with rotation */}
        <motion.span
          className="relative z-10"
          animate={{ rotate: isOpen ? 90 : 0 }}
          transition={{ duration: 0.2 }}
        >
          {isOpen ? (
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          ) : (
            <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6" />
          )}
        </motion.span>

        {/* Tooltip */}
        <AnimatePresence>
          {!isOpen && (
            <motion.span
              className="absolute right-full mr-2.5 whitespace-nowrap bg-brand-dark text-white text-xs font-body font-medium px-3 py-1.5 rounded-md shadow-md pointer-events-none hidden sm:block"
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 8 }}
              transition={{ duration: 0.2 }}
            >
              Quick Consultation
              {/* Tooltip arrow */}
              <span className="absolute top-1/2 -right-1 -translate-y-1/2 w-2 h-2 bg-brand-dark rotate-45" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      {/* ============ Backdrop Overlay ============ */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-[89] bg-black/50 backdrop-blur-sm"
            variants={overlayVariants}
            initial="closed"
            animate="open"
            exit="closed"
            transition={{ duration: 0.3 }}
            onClick={closeDrawer}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* ============ Drawer Panel ============ */}
      <AnimatePresence>
        {isOpen && (
          <motion.aside
            ref={drawerRef}
            role="dialog"
            aria-modal="true"
            aria-label="Quick Consultation Form"
            className="fixed top-0 right-0 z-[90] h-screen md:h-screen h-[85vh] w-full md:w-[400px] bg-white/[0.97] backdrop-blur-xl border-l-2 border-brand-gold shadow-2xl flex flex-col overflow-hidden"
            variants={drawerVariants}
            initial="closed"
            animate="open"
            exit="closed"
            transition={{
              type: "spring",
              damping: 30,
              stiffness: 300,
            }}
          >
            {/* --- Drawer Header --- */}
            <div className="flex-shrink-0 px-6 pt-6 pb-4">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="font-display text-2xl font-bold text-brand-dark">
                    Quick Consultation
                  </h2>
                  <p className="flex items-center gap-1.5 mt-1 font-body text-sm text-brand-muted">
                    <Clock className="w-3.5 h-3.5 text-brand-gold" />
                    We&apos;ll call you back within 2 hours
                  </p>
                </div>
                <button
                  type="button"
                  aria-label="Close consultation drawer"
                  onClick={closeDrawer}
                  className="flex-shrink-0 w-9 h-9 rounded-full bg-brand-dark/5 hover:bg-brand-dark/10 flex items-center justify-center transition-colors duration-200"
                >
                  <X className="w-4.5 h-4.5 text-brand-dark" />
                </button>
              </div>
              {/* Gold decorative line */}
              <div className="mt-3 h-0.5 w-full bg-gradient-to-r from-brand-gold via-brand-gold/60 to-transparent" />
            </div>

            {/* --- Form Body --- */}
            <div className="flex-1 overflow-y-auto px-6 py-2 custom-scrollbar">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-5"
                noValidate
              >
                {/* Name Field */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="qc-name"
                    className="font-body text-sm font-medium text-brand-dark"
                  >
                    Your Name <span className="text-red-500">*</span>
                  </label>
                  <Input
                    id="qc-name"
                    placeholder="e.g. John Doe"
                    autoComplete="name"
                    className="h-11 border-brand-border/70 bg-brand-cream/30 font-body text-brand-dark placeholder:text-brand-muted/60 focus-visible:border-brand-gold focus-visible:ring-brand-gold/20"
                    {...register("name")}
                  />
                  {errors.name && (
                    <p className="flex items-center gap-1 text-xs text-red-500 font-body mt-1">
                      <AlertCircle className="w-3 h-3 flex-shrink-0" />
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* Phone Field */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="qc-phone"
                    className="font-body text-sm font-medium text-brand-dark"
                  >
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <Input
                    id="qc-phone"
                    type="tel"
                    placeholder="e.g. 081 234 5678"
                    autoComplete="tel"
                    className="h-11 border-brand-border/70 bg-brand-cream/30 font-body text-brand-dark placeholder:text-brand-muted/60 focus-visible:border-brand-gold focus-visible:ring-brand-gold/20"
                    {...register("phone")}
                  />
                  {errors.phone && (
                    <p className="flex items-center gap-1 text-xs text-red-500 font-body mt-1">
                      <AlertCircle className="w-3 h-3 flex-shrink-0" />
                      {errors.phone.message}
                    </p>
                  )}
                </div>

                {/* Message Field */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="qc-message"
                    className="font-body text-sm font-medium text-brand-dark"
                  >
                    Brief Message <span className="text-red-500">*</span>
                  </label>
                  <Textarea
                    id="qc-message"
                    placeholder="Briefly describe your legal matter..."
                    rows={4}
                    maxLength={500}
                    className="border-brand-border/70 bg-brand-cream/30 font-body text-brand-dark placeholder:text-brand-muted/60 focus-visible:border-brand-gold focus-visible:ring-brand-gold/20 resize-none"
                    {...register("message")}
                  />
                  <div className="flex items-center justify-between">
                    {errors.message ? (
                      <p className="flex items-center gap-1 text-xs text-red-500 font-body">
                        <AlertCircle className="w-3 h-3 flex-shrink-0" />
                        {errors.message.message}
                      </p>
                    ) : (
                      <span />
                    )}
                    <span
                      className={`font-body text-xs tabular-nums ${
                        messageCharCount > 450
                          ? "text-amber-600"
                          : messageCharCount > 500
                            ? "text-red-500"
                            : "text-brand-muted"
                      }`}
                    >
                      {messageCharCount}/500
                    </span>
                  </div>
                </div>

                {/* POPIA Consent Checkbox */}
                <div className="flex items-start gap-2.5">
                  <input
                    type="checkbox"
                    id="qc-popia-consent"
                    checked={popiaConsent}
                    onChange={(e) => setPopiaConsent(e.target.checked)}
                    className="w-4 h-4 mt-0.5 rounded border-brand-border accent-[#C6A84B] cursor-pointer"
                  />
                  <label
                    htmlFor="qc-popia-consent"
                    className="font-body text-xs text-brand-muted leading-relaxed cursor-pointer"
                  >
                    I consent to I.M Attorneys Inc processing my personal information as per the{" "}
                    <a
                      href="/privacy-policy"
                      className="text-brand-gold underline hover:text-brand-gold-light"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Privacy Policy
                    </a>
                    .
                  </label>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-12 bg-brand-gold hover:bg-brand-gold-light text-brand-dark font-body font-semibold text-sm tracking-wide rounded-sm transition-all duration-300 hover:shadow-[0_4px_16px_rgba(198,168,75,0.3)] disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Request Callback
                      <Send className="w-4 h-4 ml-1" />
                    </>
                  )}
                </Button>
              </form>
            </div>

            {/* --- Drawer Footer --- */}
            <div className="flex-shrink-0 px-6 py-4 border-t border-brand-border/30 bg-brand-cream/20">
              {/* POPIA Notice */}
              <p className="font-body text-xs text-brand-muted leading-relaxed mb-3">
                Your information is confidential and protected under the Protection of Personal Information Act (POPIA), 2013. For more details, please read our{" "}
                <a
                  href="/privacy-policy"
                  className="text-brand-gold underline hover:text-brand-gold-light"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Privacy Policy
                </a>
                . You may withdraw your consent at any time.
              </p>

              {/* Emergency Line */}
              <div className="flex items-center gap-2">
                <span className="font-body text-xs text-brand-muted">
                  Need urgent help?
                </span>
                <a
                  href="tel:+27812488048"
                  className="inline-flex items-center gap-1 font-body text-xs font-semibold text-brand-gold hover:text-brand-gold-light transition-colors"
                >
                  <Phone className="w-3 h-3" />
                  081 248 8048
                </a>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
