"use client";

import { useEffect, useCallback, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  GraduationCap,
  Scale,
  Globe,
  Calendar,
  Mail,
  Phone,
  X,
} from "lucide-react";

/* ─── Types ─── */

export interface TeamMemberDetail {
  name: string;
  title: string;
  email: string;
  phone: string;
  image: string;
  bio: string;
  qualifications: string[];
  specialties: string[];
  languages: string[];
  admissionYear?: string;
}

export interface TeamMemberModalProps {
  member: TeamMemberDetail | null;
  isOpen: boolean;
  onClose: () => void;
}

/* ─── Team Member Data ─── */

export const teamMemberDetails: TeamMemberDetail[] = [
  {
    name: "Ingrid Mtsweni",
    title: "Founder & Director",
    email: "attorneys@iminc.co.za",
    phone: "081 248 8048",
    image:
      "/images/ingrid-mtsweni-founder.jpg",
    bio: "Ingrid is the founder and driving force behind IM Attorneys Inc. She holds an LLB from the University of Johannesburg (2018) and brings a unique blend of banking-sector legal expertise and boutique-firm dedication. Before founding the firm, she worked in the legal department of one of South Africa's leading banking institutions, gaining invaluable commercial insight.",
    qualifications: [
      "LLB (University of Johannesburg, 2018)",
      "Admitted Attorney of the High Court of South Africa",
      "Certificate in Banking Law",
    ],
    specialties: [
      "Family Law",
      "Commercial Law",
      "Wills & Estates",
      "Claims Against the State",
    ],
    languages: ["English", "Zulu", "Xhosa", "Sotho"],
    admissionYear: "2019",
  },
  {
    name: "Katlego Seitisho",
    title: "Litigation Attorney",
    email: "katlego@iminc.co.za",
    phone: "071 234 1767",
    image:
      "/images/katlego-seitisho.jpg",
    bio: "Katlego is a skilled litigation attorney with a passion for delivering strategic and effective legal solutions. With extensive courtroom experience across civil and commercial disputes, Katlego represents clients with meticulous preparation and aggressive advocacy. His approach combines thorough legal research with practical, results-driven strategies.",
    qualifications: [
      "LLB (University of Pretoria)",
      "Admitted Attorney of the High Court of South Africa",
    ],
    specialties: [
      "General Litigation",
      "Debt Collection",
      "Evictions",
      "Criminal Law",
    ],
    languages: ["English", "Tswana", "Afrikaans"],
    admissionYear: "2020",
  },
  {
    name: "Mmabatho Moncha",
    title: "Legal Secretary",
    email: "info@iminc.co.za",
    phone: "064 510 9707",
    image:
      "https://img1.wsimg.com/isteam/ip/53d9d56f-19db-4b48-b7c6-ba9bb2b6070c/FCA82DF0-0325-4635-AA2D-DA83D31697D0.PNG",
    bio: "Mmabatho is the backbone of the firm's administrative operations. With exceptional organisational skills and a warm, professional demeanour, she ensures every client interaction is seamless. She manages scheduling, correspondence, and file administration with precision and care.",
    qualifications: [
      "National Diploma in Legal Secretary (Tshwane University of Technology)",
      "Certificate in Office Administration",
    ],
    specialties: [
      "Legal Administration",
      "Client Relations",
      "File Management",
      "Court Filing",
    ],
    languages: ["English", "Sotho", "Zulu"],
  },
];

/* ─── Animation Variants ─── */

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const panelDesktopVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 30 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 30,
    transition: {
      duration: 0.25,
      ease: [0.42, 0, 0.58, 1],
    },
  },
};

const panelMobileVariants = {
  hidden: { opacity: 0, y: "100%" },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
  exit: {
    opacity: 0,
    y: "100%",
    transition: {
      duration: 0.3,
      ease: [0.42, 0, 0.58, 1],
    },
  },
};

const contentStagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.15,
    },
  },
};

const contentFadeIn = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: "easeOut" },
  },
};

/* ─── Detail Section Component ─── */

function DetailSection({
  icon: Icon,
  label,
  children,
}: {
  icon: React.ElementType;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div variants={contentFadeIn} className="space-y-2.5">
      <div className="flex items-center gap-2">
        <div className="flex items-center justify-center w-7 h-7 rounded-md bg-brand-gold/10">
          <Icon className="w-3.5 h-3.5 text-brand-gold" strokeWidth={1.8} />
        </div>
        <h4 className="font-body text-[11px] font-semibold tracking-[0.18em] uppercase text-brand-muted">
          {label}
        </h4>
      </div>
      {children}
    </motion.div>
  );
}

/* ─── Main Modal Component ─── */

export function TeamMemberModal({
  member,
  isOpen,
  onClose,
}: TeamMemberModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  /* Detect mobile viewport */
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  /* Body scroll lock */
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  /* Escape key handler */
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, [isOpen, handleKeyDown]);

  /* Focus trap */
  useEffect(() => {
    if (isOpen && modalRef.current) {
      // Focus the close button first
      const closeBtn = modalRef.current.querySelector<HTMLButtonElement>(
        '[data-close-btn]'
      );
      if (closeBtn) {
        closeBtn.focus();
      }

      const handleTabKey = (e: KeyboardEvent) => {
        if (e.key !== "Tab" || !modalRef.current) return;

        const focusableSelectors =
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
        const focusableElements =
          modalRef.current.querySelectorAll<HTMLElement>(focusableSelectors);
        const firstFocusable = focusableElements[0];
        const lastFocusable = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstFocusable) {
            e.preventDefault();
            lastFocusable?.focus();
          }
        } else {
          if (document.activeElement === lastFocusable) {
            e.preventDefault();
            firstFocusable?.focus();
          }
        }
      };

      document.addEventListener("keydown", handleTabKey);
      return () => document.removeEventListener("keydown", handleTabKey);
    }
  }, [isOpen]);

  if (!member) return null;

  const panelVariants = isMobile ? panelMobileVariants : panelDesktopVariants;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* ─── Dark overlay backdrop ─── */}
          <motion.div
            className="fixed inset-0 z-[100] bg-brand-dark/70 backdrop-blur-sm"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.3 }}
            onClick={onClose}
            aria-hidden="true"
          />

          {/* ─── Modal panel wrapper ─── */}
          <motion.div
            className="fixed inset-0 z-[101] flex items-end sm:items-center justify-center p-0 sm:p-6"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.2 }}
          >
            <motion.div
              ref={modalRef}
              role="dialog"
              aria-modal="true"
              aria-label={`${member.name} \u2014 ${member.title} profile`}
              className={
                "relative w-full max-h-[92vh] sm:max-h-[88vh] overflow-y-auto shadow-2xl " +
                "sm:max-w-2xl " +
                "rounded-t-2xl sm:rounded-xl"
              }
              style={{
                background: "rgba(255, 255, 255, 0.92)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                borderTop: "3px solid #C6A84B",
              }}
              variants={panelVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
            >
              {/* ─── Close Button ─── */}
              <button
                data-close-btn
                onClick={onClose}
                className={
                  "absolute top-4 right-4 z-20 " +
                  "w-9 h-9 rounded-full " +
                  "bg-brand-dark/5 hover:bg-brand-gold/15 " +
                  "flex items-center justify-center " +
                  "transition-colors duration-200"
                }
                aria-label="Close profile"
              >
                <X className="w-4 h-4 text-brand-muted" />
              </button>

              {/* ─── Content ─── */}
              <motion.div
                className="p-6 sm:p-8"
                variants={contentStagger}
                initial="hidden"
                animate="visible"
              >
                {/* ─── Top Section: Image + Name/Title/Bio ─── */}
                <div className="flex flex-col sm:flex-row gap-6 sm:gap-8">
                  {/* ─── Portrait Image ─── */}
                  <motion.div
                    variants={contentFadeIn}
                    className="flex-shrink-0 flex sm:justify-center"
                  >
                    <div className="relative mx-auto sm:mx-0">
                      {/* Outer gold glow ring */}
                      <div className="absolute -inset-2 rounded-full bg-gradient-to-br from-brand-gold/20 via-brand-gold/5 to-brand-gold/20" />

                      <div className="relative w-40 h-40 sm:w-48 sm:h-48 rounded-full border-[3px] border-brand-gold p-[3px] shadow-lg shadow-brand-gold/10">
                        <div className="w-full h-full rounded-full overflow-hidden bg-brand-parchment">
                          <Image
                            src={member.image}
                            alt={`Portrait of ${member.name}`}
                            width={192}
                            height={192}
                            className="w-full h-full object-cover object-top"
                            unoptimized
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* ─── Name, Title, Bio ─── */}
                  <div className="flex-1 min-w-0 text-center sm:text-left">
                    <motion.h2
                      variants={contentFadeIn}
                      className="font-display text-2xl sm:text-3xl font-bold text-brand-dark leading-tight"
                    >
                      {member.name}
                    </motion.h2>

                    <motion.p
                      variants={contentFadeIn}
                      className="mt-2 font-body text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase text-brand-gold"
                    >
                      {member.title}
                    </motion.p>

                    {/* Divider */}
                    <motion.div
                      variants={contentFadeIn}
                      className="my-4 mx-auto sm:mx-0 w-12 h-px bg-brand-gold/50"
                    />

                    <motion.p
                      variants={contentFadeIn}
                      className="font-body text-sm sm:text-[15px] leading-relaxed text-brand-body"
                    >
                      {member.bio}
                    </motion.p>
                  </div>
                </div>

                {/* ─── Separator ─── */}
                <motion.div
                  variants={contentFadeIn}
                  className="my-6 sm:my-8 h-px w-full bg-gradient-to-r from-transparent via-brand-gold/30 to-transparent"
                />

                {/* ─── Detail Sections Grid ─── */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                  {/* Qualifications */}
                  <DetailSection icon={GraduationCap} label="Qualifications">
                    <ul className="space-y-1.5">
                      {member.qualifications.map((q) => (
                        <li key={q} className="flex items-start gap-2">
                          <span className="mt-[7px] w-1.5 h-1.5 rounded-full bg-brand-gold flex-shrink-0" />
                          <span className="font-body text-sm text-brand-dark leading-snug">
                            {q}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </DetailSection>

                  {/* Specialties */}
                  <DetailSection icon={Scale} label="Specialties">
                    <div className="flex flex-wrap gap-2">
                      {member.specialties.map((s) => (
                        <span
                          key={s}
                          className="inline-flex items-center px-3 py-1 rounded-full bg-brand-gold/10 border border-brand-gold/20 font-body text-xs font-medium text-brand-dark"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </DetailSection>

                  {/* Languages */}
                  <DetailSection icon={Globe} label="Languages">
                    <div className="flex flex-wrap gap-2">
                      {member.languages.map((lang) => (
                        <span
                          key={lang}
                          className="inline-flex items-center px-3 py-1 rounded-full bg-brand-cream border border-brand-border/50 font-body text-xs font-medium text-brand-body"
                        >
                          {lang}
                        </span>
                      ))}
                    </div>
                  </DetailSection>

                  {/* Admission Year */}
                  {member.admissionYear && (
                    <DetailSection icon={Calendar} label="Admitted to the Bar">
                      <div className="flex items-center gap-2">
                        <span className="font-display text-2xl font-bold text-brand-gold">
                          {member.admissionYear}
                        </span>
                      </div>
                      <p className="font-body text-xs text-brand-muted">
                        High Court of South Africa
                      </p>
                    </DetailSection>
                  )}
                </div>

                {/* ─── Bottom Separator ─── */}
                <motion.div
                  variants={contentFadeIn}
                  className="my-6 sm:my-8 h-px w-full bg-gradient-to-r from-transparent via-brand-gold/30 to-transparent"
                />

                {/* ─── Contact Row ─── */}
                <motion.div
                  variants={contentFadeIn}
                  className="flex flex-col sm:flex-row gap-3 sm:gap-4"
                >
                  <a
                    href={`mailto:${member.email}`}
                    className={
                      "group inline-flex items-center justify-center gap-2.5 " +
                      "w-full sm:w-auto " +
                      "px-5 py-3 " +
                      "bg-brand-cream border border-brand-border/50 " +
                      "rounded-lg " +
                      "font-body text-sm font-medium text-brand-dark " +
                      "hover:border-brand-gold/40 hover:bg-brand-gold/5 " +
                      "transition-all duration-300"
                    }
                  >
                    <Mail className="w-4 h-4 text-brand-gold" strokeWidth={1.8} />
                    <span>{member.email}</span>
                  </a>
                  <a
                    href={`tel:${member.phone.replace(/\s/g, "")}`}
                    className={
                      "group inline-flex items-center justify-center gap-2.5 " +
                      "w-full sm:w-auto " +
                      "px-5 py-3 " +
                      "bg-brand-gold text-brand-dark " +
                      "rounded-lg " +
                      "font-body text-sm font-semibold " +
                      "hover:bg-brand-gold-light hover:shadow-lg hover:shadow-brand-gold/20 " +
                      "transition-all duration-300"
                    }
                  >
                    <Phone
                      className="w-4 h-4"
                      strokeWidth={1.8}
                    />
                    <span>{member.phone}</span>
                  </a>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
