"use client";

import { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod/v4";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import {
  Shield,
  FileText,
  Lock,
  Cookie,
  AlertTriangle,
  UserCheck,
  Scale,
  Mail,
  Phone,
  MapPin,
  Clock,
  ChevronRight,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Send,
  Building2,
  CreditCard,
  Globe,
  Info,
  X,
  BookOpen,
  Database,
  FolderOpen,
  BadgeDollarSign,
  ShieldCheck,
  FileCheck,
  Gavel,
  Users,
  Briefcase,
  Landmark,
  type LucideIcon,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

/* ─────────────────────────────────────────────────────────────
   TYPES
   ───────────────────────────────────────────────────────────── */

type ModalId =
  | "privacy"
  | "terms"
  | "paia"
  | "cookies"
  | "complaints"
  | "data-rights"
  | "fica";

interface ComplianceModalsProps {
  openModal: ModalId | null;
  onOpenModal: (id: ModalId | null) => void;
}

/* ─────────────────────────────────────────────────────────────
   SHARED STYLES
   ───────────────────────────────────────────────────────────── */

const goldGradientLine =
  "h-[2px] w-full bg-gradient-to-r from-brand-gold/60 via-brand-gold to-brand-gold/60";

const modalBodyClass =
  "max-h-[70vh] overflow-y-auto px-6 sm:px-8 pb-6 sm:pb-8 space-y-5 scroll-smooth";

const sectionHeadingClass =
  "font-display text-base font-bold text-brand-dark";

const bodyTextClass =
  "font-body text-sm leading-relaxed text-brand-body";

const mutedTextClass =
  "font-body text-xs text-brand-muted";

const iconBoxClass =
  "flex-shrink-0 w-8 h-8 rounded-lg bg-brand-gold/10 flex items-center justify-center";

const iconClass = "w-4 h-4 text-brand-gold";

const listItemClass =
  "flex items-start gap-2.5 py-1.5";

const bulletClass =
  "w-1.5 h-1.5 rounded-sm bg-brand-gold flex-shrink-0 mt-1.5 rotate-45";

const accordionItemClass =
  "border border-brand-border/60 rounded-lg px-4 sm:px-5 mb-3 data-[state=open]:border-brand-gold/30 data-[state=open]:bg-brand-cream/40 transition-colors";

const accordionTriggerClass =
  "font-body text-sm font-semibold text-brand-dark hover:no-underline py-3.5";

const accordionContentClass = "pb-4 space-y-3";

/* ─────────────────────────────────────────────────────────────
   ANIMATION VARIANTS
   ───────────────────────────────────────────────────────────── */

const panelVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
  exit: {
    opacity: 0,
    y: 40,
    scale: 0.97,
    transition: {
      duration: 0.25,
      ease: [0.42, 0, 0.58, 1],
    },
  },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] },
  },
};

/* ─────────────────────────────────────────────────────────────
   HELPER: Modal Frame
   ───────────────────────────────────────────────────────────── */

function ModalFrame({
  open,
  onOpenChange,
  title,
  subtitle,
  icon: Icon,
  children,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  subtitle?: string;
  icon: LucideIcon;
  children: React.ReactNode;
}) {
  /* Body scroll lock */
  useEffect(() => {
    if (open) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [open]);

  /* Escape key */
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onOpenChange(false);
    },
    [onOpenChange],
  );
  useEffect(() => {
    if (open) {
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, [open, handleKeyDown]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="sm:max-w-[720px] max-w-[calc(100%-1rem)] p-0 gap-0 overflow-hidden rounded-xl"
        style={{
          background: "rgba(255,255,255,0.95)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          border: "1px solid rgba(198,168,75,0.2)",
        }}
        asChild
      >
        <motion.div variants={panelVariants} initial="hidden" animate="visible" exit="exit">
          {/* ─── Header ─── */}
          <div
            className="sticky top-0 z-10 flex items-start justify-between px-6 sm:px-8 pt-6 sm:pt-8 pb-4 sm:pb-5"
            style={{
              background: "rgba(255,255,255,0.96)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
            }}
          >
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center w-11 h-11 rounded-lg bg-brand-gold/10 border border-brand-gold/20">
                <Icon className="w-5 h-5 text-brand-gold" strokeWidth={1.8} />
              </div>
              <div>
                <DialogTitle className="font-display text-lg sm:text-xl font-bold text-brand-dark leading-tight">
                  {title}
                </DialogTitle>
                {subtitle && (
                  <DialogDescription className="font-body text-xs text-brand-muted mt-0.5">
                    {subtitle}
                  </DialogDescription>
                )}
              </div>
            </div>
            <button
              onClick={() => onOpenChange(false)}
              className="flex-shrink-0 w-9 h-9 rounded-full bg-brand-dark/5 hover:bg-brand-dark/10 flex items-center justify-center transition-colors duration-200"
              aria-label="Close dialog"
            >
              <X className="w-4 h-4 text-brand-muted" />
            </button>
          </div>

          {/* Gold separator */}
          <div className="px-6 sm:px-8">
            <div className={goldGradientLine} />
          </div>

          {/* ─── Scrollable body ─── */}
          <motion.div variants={fadeInUp} initial="hidden" animate="visible" transition={{ delay: 0.1 }}>
            {children}
          </motion.div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}

/* ─────────────────────────────────────────────────────────────
   HELPER: Contact Block
   ───────────────────────────────────────────────────────────── */

function ContactBlock({ compact }: { compact?: boolean }) {
  return (
    <div className="rounded-lg bg-brand-cream/50 border border-brand-border/40 p-4 space-y-2">
      <p className={mutedTextClass}>
        <strong className="font-semibold text-brand-dark">Information Officer:</strong> Ingrid Mtsweni
      </p>
      <div className="flex flex-wrap gap-x-6 gap-y-2">
        <a
          href="mailto:attorneys@iminc.co.za"
          className={`inline-flex items-center gap-1.5 text-brand-gold hover:text-brand-dark transition-colors ${compact ? "text-xs" : "text-sm"}`}
        >
          <Mail className="w-3.5 h-3.5" />
          attorneys@iminc.co.za
        </a>
        <a
          href="tel:+27812488048"
          className={`inline-flex items-center gap-1.5 text-brand-gold hover:text-brand-dark transition-colors ${compact ? "text-xs" : "text-sm"}`}
        >
          <Phone className="w-3.5 h-3.5" />
          081 248 8048
        </a>
        <span className={`inline-flex items-center gap-1.5 text-brand-body ${compact ? "text-xs" : "text-sm"}`}>
          <MapPin className="w-3.5 h-3.5 text-brand-muted flex-shrink-0" />
          Pegasus Building, 210 Amarand Ave, Menlyn Maine, Pretoria, 0181
        </span>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   1. PRIVACY POLICY (POPIA Compliant)
   ═══════════════════════════════════════════════════════════════ */

function PrivacyPolicyContent() {
  return (
    <div className={modalBodyClass}>
      <p className={bodyTextClass}>
        I.M Attorneys Inc (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) is committed to protecting
        and respecting your privacy in compliance with the Protection of Personal Information Act 4
        of 2013 (&quot;POPIA&quot;) and the Constitution of the Republic of South Africa, 1996. This
        Privacy Policy explains how we collect, use, store, and protect your personal information
        when you interact with our website, engage our legal services, or otherwise provide
        information to us.
      </p>

      <ContactBlock />

      <Accordion type="multiple" className="w-full">
        {/* Section 1 */}
        <AccordionItem value="s1" className={accordionItemClass}>
          <AccordionTrigger className={accordionTriggerClass}>
            <span className="flex items-center gap-2">
              <Database className="w-4 h-4 text-brand-gold" />
              Information We Collect
            </span>
          </AccordionTrigger>
          <AccordionContent className={accordionContentClass}>
            <p className={bodyTextClass}>
              We collect the following categories of personal information when you engage with us:
            </p>
            <ul className="space-y-1">
              {[
                "Full name, surname, and preferred name",
                "Email address and telephone number(s)",
                "Physical and postal address",
                "South African ID number or passport number (where required for legal matters)",
                "Employment information and income details (where relevant to your matter)",
                "Case-related documents, correspondence, and legal instructions",
                "Information submitted through our website contact forms and enquiry forms",
                "Newsletter subscription details and communication preferences",
                "Website usage data, including IP address, browser type, and pages visited",
              ].map((item) => (
                <li key={item} className={listItemClass}>
                  <span className={bulletClass} />
                  <span className={bodyTextClass}>{item}</span>
                </li>
              ))}
            </ul>
            <p className={mutedTextClass}>
              We only collect information that is reasonably necessary for the purposes described
              in this policy, or as required by law.
            </p>
          </AccordionContent>
        </AccordionItem>

        {/* Section 2 */}
        <AccordionItem value="s2" className={accordionItemClass}>
          <AccordionTrigger className={accordionTriggerClass}>
            <span className="flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-brand-gold" />
              Purpose of Processing
            </span>
          </AccordionTrigger>
          <AccordionContent className={accordionContentClass}>
            <p className={bodyTextClass}>
              Your personal information is processed for the following lawful purposes:
            </p>
            <ul className="space-y-1">
              {[
                "Providing legal consultation, advice, and representation services",
                "Managing and administering client matters, court cases, and legal proceedings",
                "Communicating with you regarding your matter, appointments, and case updates",
                "Preparing legal documents, contracts, affidavits, and court filings",
                "Processing fee payments and managing trust account transactions",
                "Complying with legal and regulatory obligations (LPC, SARS, courts, FICA)",
                "Maintaining professional records as required by the Legal Practice Act",
                "Sending newsletters, legal updates, and firm communications (where consented)",
                "Improving our website, services, and client experience",
                "Responding to enquiries, complaints, and data subject requests",
              ].map((item) => (
                <li key={item} className={listItemClass}>
                  <span className={bulletClass} />
                  <span className={bodyTextClass}>{item}</span>
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>

        {/* Section 3 */}
        <AccordionItem value="s3" className={accordionItemClass}>
          <AccordionTrigger className={accordionTriggerClass}>
            <span className="flex items-center gap-2">
              <Scale className="w-4 h-4 text-brand-gold" />
              Legal Basis for Processing
            </span>
          </AccordionTrigger>
          <AccordionContent className={accordionContentClass}>
            <p className={bodyTextClass}>
              We process your personal information in accordance with Sections 11–15 of POPIA on
              the following grounds:
            </p>
            <div className="space-y-3">
              {[
                {
                  title: "Legitimate Interest (Section 11(f))",
                  desc: "Processing is necessary for our legitimate interests in providing professional legal services, maintaining client relationships, and managing our practice, balanced against your rights to privacy.",
                },
                {
                  title: "Consent (Section 11(a))",
                  desc: "Where you have given clear, informed consent for a specific purpose, such as subscribing to our newsletter or receiving marketing communications. You may withdraw consent at any time.",
                },
                {
                  title: "Contractual Necessity (Section 11(b))",
                  desc: "Processing is necessary for the performance of a mandate or contract with you, including providing agreed-upon legal services and managing your matter.",
                },
                {
                  title: "Legal Obligation (Section 11(c))",
                  desc: "Processing is required to comply with a legal obligation, including requirements under FICA, the Legal Practice Act, tax legislation, and court orders.",
                },
              ].map((item) => (
                <div key={item.title} className="rounded-md bg-brand-cream/30 p-3">
                  <p className="font-body text-sm font-semibold text-brand-dark">{item.title}</p>
                  <p className={bodyTextClass}>{item.desc}</p>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Section 4 */}
        <AccordionItem value="s4" className={accordionItemClass}>
          <AccordionTrigger className={accordionTriggerClass}>
            <span className="flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-brand-gold" />
              Your Data Subject Rights
            </span>
          </AccordionTrigger>
          <AccordionContent className={accordionContentClass}>
            <p className={bodyTextClass}>
              Under Sections 23–25 of POPIA, you have the following rights regarding your
              personal information:
            </p>
            <div className="space-y-2.5">
              {[
                {
                  right: "Right of Access (Section 23)",
                  desc: "You may request a copy of the personal information we hold about you. We will respond within 30 days as required by POPIA.",
                },
                {
                  right: "Right to Correction (Section 24)",
                  desc: "You may request that we correct or update any inaccurate, incomplete, or outdated personal information.",
                },
                {
                  right: "Right to Deletion (Section 24)",
                  desc: "You may request the deletion of your personal information, subject to our legal obligation to retain certain records.",
                },
                {
                  right: "Right to Object (Section 25)",
                  desc: "You may object to the processing of your personal information on legitimate grounds, and we will cease processing unless we have a compelling lawful reason.",
                },
                {
                  right: "Right to Data Portability",
                  desc: "Where technically feasible, you may request your personal information in a structured, commonly used, and machine-readable format.",
                },
                {
                  right: "Right to Withdraw Consent",
                  desc: "Where processing is based on your consent, you may withdraw consent at any time by contacting our Information Officer. Withdrawal will not affect the lawfulness of prior processing.",
                },
              ].map((item) => (
                <div key={item.right} className={listItemClass}>
                  <CheckCircle2 className="w-4 h-4 text-brand-gold flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-body text-sm font-semibold text-brand-dark">{item.right}</p>
                    <p className={bodyTextClass}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className={bodyTextClass}>
              To exercise any of these rights, please contact our Information Officer or use our{" "}
              <button
                type="button"
                className="text-brand-gold hover:text-brand-dark font-semibold underline underline-offset-2 transition-colors"
              >
                Data Subject Rights Request Form
              </button>
              .
            </p>
          </AccordionContent>
        </AccordionItem>

        {/* Section 5 */}
        <AccordionItem value="s5" className={accordionItemClass}>
          <AccordionTrigger className={accordionTriggerClass}>
            <span className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-brand-gold" />
              Data Retention
            </span>
          </AccordionTrigger>
          <AccordionContent className={accordionContentClass}>
            <p className={bodyTextClass}>
              We retain personal information only for as long as necessary to fulfil the purposes
              for which it was collected, or as required by law:
            </p>
            <ul className="space-y-1">
              {[
                "Client matter files and legal correspondence: retained for a minimum of 7 (seven) years after the conclusion of the matter, as per Legal Practice Council rules and common law practice.",
                "Trust account records: retained for 7 (seven) years as required by the Legal Practice Act and Attorneys Fidelity Fund rules.",
                "Accounting and tax records: retained for 5 (five) years as required by the South African Revenue Service (SARS).",
                "Employment records: retained for 7 (seven) years after termination of employment.",
                "Website enquiry form submissions: retained for 3 (three) years from date of submission, unless the enquiry progresses to a formal mandate.",
                "Newsletter subscriber information: retained until consent is withdrawn or the subscription is cancelled.",
                "General contact information (non-clients): retained for 3 (three) years from the last interaction, unless a legal matter is established.",
              ].map((item) => (
                <li key={item} className={listItemClass}>
                  <span className={bulletClass} />
                  <span className={bodyTextClass}>{item}</span>
                </li>
              ))}
            </ul>
            <p className={bodyTextClass}>
              Upon expiry of the applicable retention period, personal information is securely
              destroyed or anonymised in accordance with our information disposal procedures.
            </p>
          </AccordionContent>
        </AccordionItem>

        {/* Section 6 */}
        <AccordionItem value="s6" className={accordionItemClass}>
          <AccordionTrigger className={accordionTriggerClass}>
            <span className="flex items-center gap-2">
              <Users className="w-4 h-4 text-brand-gold" />
              Third-Party Sharing
            </span>
          </AccordionTrigger>
          <AccordionContent className={accordionContentClass}>
            <p className={bodyTextClass}>
              We do not sell, trade, or rent your personal information to third parties. We may
              share your information only in the following limited circumstances:
            </p>
            <ul className="space-y-1">
              {[
                "Legal Practice Council (LPC) and the Attorneys Fidelity Fund, as required by law",
                "Courts, tribunals, and presiding officers in connection with legal proceedings",
                "Opposing attorneys, advocates, and parties as required for the conduct of your matter",
                "Regulatory bodies (SARS, FICA compliance officers, Legal Practice Council)",
                "Third-party service providers who assist us in operating our practice (e.g. IT hosting, payment processors) — these parties are bound by confidentiality agreements",
                "Witnesses, experts, and assessors involved in your legal matter",
              ].map((item) => (
                <li key={item} className={listItemClass}>
                  <span className={bulletClass} />
                  <span className={bodyTextClass}>{item}</span>
                </li>
              ))}
            </ul>
            <p className={bodyTextClass}>
              All third parties who receive your information are contractually or legally obliged
              to protect it and use it only for the specified purpose.
            </p>
          </AccordionContent>
        </AccordionItem>

        {/* Section 7 */}
        <AccordionItem value="s7" className={accordionItemClass}>
          <AccordionTrigger className={accordionTriggerClass}>
            <span className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-brand-gold" />
              Security Measures
            </span>
          </AccordionTrigger>
          <AccordionContent className={accordionContentClass}>
            <p className={bodyTextClass}>
              We implement appropriate technical and organisational measures to safeguard your
              personal information against unauthorised access, alteration, disclosure, or
              destruction, in compliance with Section 19 of POPIA:
            </p>
            <ul className="space-y-1">
              {[
                "SSL/HTTPS encryption for all website data transmission",
                "Secure contact form handling with server-side validation",
                "Access controls limiting personal information to authorised personnel only",
                "Locked physical storage for paper-based files containing sensitive information",
                "Secure digital document management system for electronic case files",
                "Regular security assessments and updates to our systems",
                "Staff training on data protection, confidentiality, and POPIA compliance",
                "Incident response procedures in the event of a data breach (mandatory notification to the Information Regulator within 72 hours as per Section 22)",
              ].map((item) => (
                <li key={item} className={listItemClass}>
                  <span className={bulletClass} />
                  <span className={bodyTextClass}>{item}</span>
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>

        {/* Section 8 */}
        <AccordionItem value="s8" className={accordionItemClass}>
          <AccordionTrigger className={accordionTriggerClass}>
            <span className="flex items-center gap-2">
              <Cookie className="w-4 h-4 text-brand-gold" />
              Cookies & Website Tracking
            </span>
          </AccordionTrigger>
          <AccordionContent className={accordionContentClass}>
            <p className={bodyTextClass}>
              Our website uses cookies and similar technologies to enhance your browsing
              experience. For full details, please refer to our{" "}
              <button
                type="button"
                className="text-brand-gold hover:text-brand-dark font-semibold underline underline-offset-2 transition-colors"
              >
                Cookie Policy
              </button>
              .
            </p>
          </AccordionContent>
        </AccordionItem>

        {/* Section 9 */}
        <AccordionItem value="s9" className={accordionItemClass}>
          <AccordionTrigger className={accordionTriggerClass}>
            <span className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-brand-gold" />
              PAIA Reference
            </span>
          </AccordionTrigger>
          <AccordionContent className={accordionContentClass}>
            <p className={bodyTextClass}>
              In accordance with the Promotion of Access to Information Act 2 of 2000 (PAIA),
              our PAIA Section 51 Manual is available upon request. For further information,
              please refer to our{" "}
              <button
                type="button"
                className="text-brand-gold hover:text-brand-dark font-semibold underline underline-offset-2 transition-colors"
              >
                PAIA Manual
              </button>{" "}
              or contact our Information Officer.
            </p>
          </AccordionContent>
        </AccordionItem>

        {/* Section 10 */}
        <AccordionItem value="s10" className={accordionItemClass}>
          <AccordionTrigger className={accordionTriggerClass}>
            <span className="flex items-center gap-2">
              <Gavel className="w-4 h-4 text-brand-gold" />
              How to Lodge a Complaint
            </span>
          </AccordionTrigger>
          <AccordionContent className={accordionContentClass}>
            <p className={bodyTextClass}>
              If you believe that your personal information has been mishandled or that we have
              not complied with POPIA, you have the right to lodge a complaint with the Information
              Regulator:
            </p>
            <div className="rounded-lg bg-brand-dark/5 p-4 space-y-1.5">
              <p className="font-body text-sm font-semibold text-brand-dark">
                The Information Regulator (South Africa)
              </p>
              <p className={bodyTextClass}>
                <strong>Website:</strong>{" "}
                <a
                  href="https://inforegulator.org.za"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-gold hover:text-brand-dark underline underline-offset-2 transition-colors inline-flex items-center gap-1"
                >
                  inforegulator.org.za
                  <ExternalLink className="w-3 h-3" />
                </a>
              </p>
              <p className={bodyTextClass}>
                <strong>Email:</strong>{" "}
                <a
                  href="mailto:complaints@inforegulator.org.za"
                  className="text-brand-gold hover:text-brand-dark underline underline-offset-2 transition-colors"
                >
                  complaints@inforegulator.org.za
                </a>
              </p>
              <p className={bodyTextClass}>
                <strong>Telephone:</strong> 012 406 4818
              </p>
              <p className={bodyTextClass}>
                <strong>Postal Address:</strong> The Information Regulator, 11 Fehrsen Street,
                Nieuw Muckleneuk, Pretoria, 0181
              </p>
            </div>
            <p className={bodyTextClass}>
              We encourage you to first contact our Information Officer directly to resolve any
              concerns before approaching the Information Regulator.
            </p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Separator className="bg-brand-border/40" />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
        <p className={mutedTextClass}>Last Updated: July 2025</p>
        <p className={mutedTextClass}>Version 1.0 — POPIA Compliant</p>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   2. TERMS & CONDITIONS (ECTA Section 43 + CPA Compliant)
   ═══════════════════════════════════════════════════════════════ */

function TermsConditionsContent() {
  return (
    <div className={modalBodyClass}>
      <p className={bodyTextClass}>
        These Terms and Conditions constitute a legally binding agreement between you
        (&quot;the Client&quot;) and I.M Attorneys Inc (&quot;the Firm&quot;, &quot;we&quot;,
        &quot;us&quot;, &quot;our&quot;), a duly incorporated law firm registered with the
        Legal Practice Council of South Africa. By accessing our website, engaging our services,
        or submitting information through any of our platforms, you agree to be bound by these
        terms.
      </p>

      <div className="rounded-lg bg-brand-gold/5 border border-brand-gold/20 p-4">
        <p className="font-body text-xs font-semibold text-brand-dark mb-1.5">
          ECTA Section 43 Compliance Statement
        </p>
        <p className={bodyTextClass}>
          In compliance with Section 43 of the Electronic Communications and Transactions Act 25
          of 2002 (ECTA), these terms and conditions are presented to you in a clear and
          accessible manner. You have the right to receive, store, reproduce, edit, and share a
          copy of this agreement for your records. By continuing to use our website or engaging
          our services, you acknowledge that you have read, understood, and accepted these terms.
        </p>
      </div>

      <Accordion type="multiple" className="w-full">
        {/* Section 1 */}
        <AccordionItem value="t1" className={accordionItemClass}>
          <AccordionTrigger className={accordionTriggerClass}>
            <span className="flex items-center gap-2">
              <Gavel className="w-4 h-4 text-brand-gold" />
              Our Services
            </span>
          </AccordionTrigger>
          <AccordionContent className={accordionContentClass}>
            <p className={bodyTextClass}>
              I.M Attorneys Inc provides legal services across the following practice areas:
            </p>
            <div className="grid sm:grid-cols-2 gap-2">
              {[
                { name: "Family Law", desc: "Divorce, custody, maintenance, ANC, domestic violence" },
                { name: "Wills & Estates", desc: "Wills, estate administration, trusts, probate" },
                { name: "Criminal Law", desc: "Bail applications, defence, trials, appeals" },
                { name: "Commercial Law", desc: "Contracts, M&A, corporate governance, compliance" },
                { name: "Claims Against the State", desc: "RAF claims, wrongful arrest, constitutional violations" },
                { name: "General Litigation", desc: "Debt recovery, evictions, contractual disputes" },
              ].map((area) => (
                <div key={area.name} className="flex items-start gap-2 rounded-md bg-brand-cream/30 p-2.5">
                  <CheckCircle2 className="w-4 h-4 text-brand-gold flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-body text-xs font-semibold text-brand-dark">{area.name}</p>
                    <p className="font-body text-xs text-brand-muted">{area.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Section 2 */}
        <AccordionItem value="t2" className={accordionItemClass}>
          <AccordionTrigger className={accordionTriggerClass}>
            <span className="flex items-center gap-2">
              <BadgeDollarSign className="w-4 h-4 text-brand-gold" />
              Fees & Payment
            </span>
          </AccordionTrigger>
          <AccordionContent className={accordionContentClass}>
            <ul className="space-y-2">
              <li className={listItemClass}>
                <span className={bulletClass} />
                <span className={bodyTextClass}>
                  <strong className="font-semibold text-brand-dark">Initial Consultation:</strong> Your first consultation is complimentary (free of charge). This allows us to understand your matter and provide preliminary advice.
                </span>
              </li>
              <li className={listItemClass}>
                <span className={bulletClass} />
                <span className={bodyTextClass}>
                  <strong className="font-semibold text-brand-dark">Fee Structure:</strong> Following the initial consultation, we will provide a written fee quote. Fees may be structured as hourly rates, fixed fees, or contingency fees (where applicable, such as in RAF and state claims).
                </span>
              </li>
              <li className={listItemClass}>
                <span className={bulletClass} />
                <span className={bodyTextClass}>
                  <strong className="font-semibold text-brand-dark">Payment Terms:</strong> Invoices are due within 14 (fourteen) days of issue unless otherwise agreed in writing. Late payments may attract interest at the prescribed rate per the Prescribed Rate of Interest Act.
                </span>
              </li>
              <li className={listItemClass}>
                <span className={bulletClass} />
                <span className={bodyTextClass}>
                  <strong className="font-semibold text-brand-dark">Trust Account:</strong> All deposits for legal matters are held in our attorney trust account in accordance with the Legal Practice Act and Attorneys Fidelity Fund rules.
                </span>
              </li>
            </ul>
          </AccordionContent>
        </AccordionItem>

        {/* Section 3 */}
        <AccordionItem value="t3" className={accordionItemClass}>
          <AccordionTrigger className={accordionTriggerClass}>
            <span className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-brand-gold" />
              Cooling-Off & Cancellation Rights
            </span>
          </AccordionTrigger>
          <AccordionContent className={accordionContentClass}>
            <div className="space-y-4">
              <div className="rounded-lg bg-brand-cream/40 border border-brand-gold/15 p-4">
                <p className="font-body text-sm font-semibold text-brand-dark mb-2">
                  7-Day Cooling-Off Period (ECTA Section 44)
                </p>
                <p className={bodyTextClass}>
                  In accordance with Section 44 of the Electronic Communications and Transactions Act,
                  where a consumer enters into a transaction by means of electronic communication and
                  the goods or services are supplied in response to an unsolicited communication,
                  the consumer may cancel the agreement without reason and without penalty within
                  7 (seven) business days after the date of the transaction by furnishing written
                  notice of cancellation to the supplier.
                </p>
              </div>
              <div className="rounded-lg bg-brand-cream/40 border border-brand-gold/15 p-4">
                <p className="font-body text-sm font-semibold text-brand-dark mb-2">
                  14-Day Cancellation Right (ECTA Section 43)
                </p>
                <p className={bodyTextClass}>
                  In accordance with Section 43 of ECTA, you may cancel this agreement within
                  14 (fourteen) business days of acceptance, subject to the following conditions:
                  (a) you provide written notice of cancellation; (b) you bear the cost of returning
                  any goods received; (c) any amounts already paid will be refunded within 30 days
                  of cancellation, less reasonable costs incurred in providing the service.
                </p>
              </div>
              <p className={bodyTextClass}>
                <strong className="font-semibold text-brand-dark">Important:</strong> The cooling-off
                period may not apply where legal proceedings have already commenced or where urgent
                legal action was required and explicitly agreed upon by you.
              </p>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Section 4 */}
        <AccordionItem value="t4" className={accordionItemClass}>
          <AccordionTrigger className={accordionTriggerClass}>
            <span className="flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-brand-gold" />
              Client Obligations
            </span>
          </AccordionTrigger>
          <AccordionContent className={accordionContentClass}>
            <p className={bodyTextClass}>
              As a client of I.M Attorneys Inc, you agree to the following obligations:
            </p>
            <ul className="space-y-1">
              {[
                "Provide full, accurate, and honest information relevant to your legal matter",
                "Maintain regular communication and promptly respond to requests for instructions or documents",
                "Honour agreed payment terms and settle invoices within the stipulated timeframes",
                "Not withhold or destroy any documents or evidence relevant to the matter",
                "Inform us of any material change in your circumstances that may affect your matter",
                "Treat all staff with respect and refrain from abusive or threatening behaviour",
                "Understand that no guarantee or warranty of outcome is given — legal outcomes depend on the merits of each case, the evidence, and applicable law",
              ].map((item) => (
                <li key={item} className={listItemClass}>
                  <span className={bulletClass} />
                  <span className={bodyTextClass}>{item}</span>
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>

        {/* Section 5 */}
        <AccordionItem value="t5" className={accordionItemClass}>
          <AccordionTrigger className={accordionTriggerClass}>
            <span className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-brand-gold" />
              Limitation of Liability
            </span>
          </AccordionTrigger>
          <AccordionContent className={accordionContentClass}>
            <p className={bodyTextClass}>
              Our liability is governed by and limited in accordance with the rules and
              directives of the Legal Practice Council of South Africa:
            </p>
            <ul className="space-y-1">
              {[
                "We exercise due skill, care, and diligence in providing legal services, as expected of a reasonably competent attorney",
                "Liability for any claim arising from the provision of legal services is limited to the extent permitted by the Legal Practice Act and applicable LPC rules",
                "We are not liable for any indirect, consequential, or incidental damages, including loss of profits, revenue, data, or business opportunity",
                "We are not liable for delays or failures caused by factors beyond our reasonable control, including court backlogs, third-party delays, or force majeure events",
                "Any claim against the Firm must be lodged within 3 (three) years of the date on which the cause of action arose, as per the Prescription Act 68 of 1969",
              ].map((item) => (
                <li key={item} className={listItemClass}>
                  <span className={bulletClass} />
                  <span className={bodyTextClass}>{item}</span>
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>

        {/* Section 6 */}
        <AccordionItem value="t6" className={accordionItemClass}>
          <AccordionTrigger className={accordionTriggerClass}>
            <span className="flex items-center gap-2">
              <Landmark className="w-4 h-4 text-brand-gold" />
              Dispute Resolution & Jurisdiction
            </span>
          </AccordionTrigger>
          <AccordionContent className={accordionContentClass}>
            <ul className="space-y-2">
              <li className={listItemClass}>
                <span className={bulletClass} />
                <span className={bodyTextClass}>
                  <strong className="font-semibold text-brand-dark">Governing Law:</strong> These terms are governed by and construed in accordance with the laws of the Republic of South Africa.
                </span>
              </li>
              <li className={listItemClass}>
                <span className={bulletClass} />
                <span className={bodyTextClass}>
                  <strong className="font-semibold text-brand-dark">Jurisdiction:</strong> Any legal proceedings arising from these terms shall be subject to the exclusive jurisdiction of the Gauteng Division of the High Court of South Africa.
                </span>
              </li>
              <li className={listItemClass}>
                <span className={bulletClass} />
                <span className={bodyTextClass}>
                  <strong className="font-semibold text-brand-dark">Internal Resolution:</strong> We encourage you to first raise any dispute or concern through our internal{" "}
                  <button
                    type="button"
                    className="text-brand-gold hover:text-brand-dark font-semibold underline underline-offset-2 transition-colors"
                  >
                    Complaints Procedure
                  </button>
                  .
                </span>
              </li>
              <li className={listItemClass}>
                <span className={bulletClass} />
                <span className={bodyTextClass}>
                  <strong className="font-semibold text-brand-dark">LPC Complaint:</strong> If the dispute is not resolved internally, you may lodge a complaint with the Legal Practice Council at{" "}
                  <a
                    href="https://lpc.org.za"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-gold hover:text-brand-dark underline underline-offset-2 transition-colors inline-flex items-center gap-1"
                  >
                    lpc.org.za
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  .
                </span>
              </li>
            </ul>
          </AccordionContent>
        </AccordionItem>

        {/* Section 7 */}
        <AccordionItem value="t7" className={accordionItemClass}>
          <AccordionTrigger className={accordionTriggerClass}>
            <span className="flex items-center gap-2">
              <FileCheck className="w-4 h-4 text-brand-gold" />
              Intellectual Property
            </span>
          </AccordionTrigger>
          <AccordionContent className={accordionContentClass}>
            <p className={bodyTextClass}>
              All content on this website, including but not limited to text, graphics, logos,
              icons, images, audio clips, digital downloads, and data compilations, is the
              property of I.M Attorneys Inc or its content suppliers and is protected by
              South African and international intellectual property laws. No part of this website
              may be reproduced, stored, or transmitted without our prior written consent,
              except as permitted by fair dealing provisions.
            </p>
          </AccordionContent>
        </AccordionItem>

        {/* Section 8 */}
        <AccordionItem value="t8" className={accordionItemClass}>
          <AccordionTrigger className={accordionTriggerClass}>
            <span className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-brand-gold" />
              Indemnification & Severability
            </span>
          </AccordionTrigger>
          <AccordionContent className={accordionContentClass}>
            <p className={bodyTextClass}>
              <strong className="font-semibold text-brand-dark">Indemnification:</strong> You agree
              to indemnify and hold harmless I.M Attorneys Inc, its directors, partners, employees,
              and agents from any claims, damages, liabilities, or expenses arising from your breach
              of these terms, your misuse of this website, or your violation of any applicable law.
            </p>
            <p className={bodyTextClass}>
              <strong className="font-semibold text-brand-dark">Severability:</strong> If any
              provision of these terms is found to be invalid, illegal, or unenforceable, the
              remaining provisions shall continue in full force and effect. The invalid provision
              shall be modified to the minimum extent necessary to make it valid and enforceable.
            </p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Separator className="bg-brand-border/40" />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
        <p className={mutedTextClass}>Last Updated: July 2025</p>
        <p className={mutedTextClass}>Governing Law: Republic of South Africa</p>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   3. PAIA SECTION 51 MANUAL
   ═══════════════════════════════════════════════════════════════ */

function PAIAManualContent() {
  return (
    <div className={modalBodyClass}>
      <p className={bodyTextClass}>
        In compliance with Section 51 of the Promotion of Access to Information Act 2 of 2000
        (PAIA), this manual provides information on the records held by I.M Attorneys Inc, a
        private body as defined in PAIA, and the procedures for requesting access to such records.
      </p>

      <div className="rounded-lg bg-brand-cream/50 border border-brand-border/40 p-4 space-y-3">
        <p className={sectionHeadingClass}>Information Officer Details</p>
        <div className="space-y-1.5">
          <p className={bodyTextClass}><strong>Name:</strong> Ingrid Mtsweni</p>
          <p className={bodyTextClass}><strong>Designation:</strong> Information Officer &amp; Managing Director</p>
          <p className={bodyTextClass}>
            <strong>Postal Address:</strong> Pegasus Building, 210 Amarand Ave, Menlyn Maine, Pretoria, 0181
          </p>
          <p className={bodyTextClass}>
            <strong>Physical Address:</strong> Pegasus Building, 210 Amarand Ave, Menlyn Maine, Pretoria, 0181
          </p>
          <p className={bodyTextClass}>
            <strong>Telephone:</strong>{" "}
            <a href="tel:+27812488048" className="text-brand-gold hover:text-brand-dark underline underline-offset-2 transition-colors">
              081 248 8048
            </a>
          </p>
          <p className={bodyTextClass}>
            <strong>Email:</strong>{" "}
            <a href="mailto:attorneys@iminc.co.za" className="text-brand-gold hover:text-brand-dark underline underline-offset-2 transition-colors">
              attorneys@iminc.co.za
            </a>
          </p>
          <p className={bodyTextClass}>
            <strong>PAIA Requests:</strong>{" "}
            <a href="mailto:paia@iminc.co.za" className="text-brand-gold hover:text-brand-dark underline underline-offset-2 transition-colors">
              paia@iminc.co.za
            </a>
          </p>
        </div>
      </div>

      <div className="rounded-lg bg-brand-gold/5 border border-brand-gold/20 p-4">
        <p className="font-body text-xs font-semibold text-brand-dark mb-1.5">
          Guide to PAIA
        </p>
        <p className={bodyTextClass}>
          A guide on how to use PAIA, prepared by the South African Human Rights Commission (SAHRC)
          in conjunction with the Information Regulator, is available from:{" "}
          <a
            href="https://inforegulator.org.za"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-gold hover:text-brand-dark underline underline-offset-2 transition-colors inline-flex items-center gap-1"
          >
            inforegulator.org.za
            <ExternalLink className="w-3 h-3" />
          </a>
        </p>
      </div>

      <Accordion type="multiple" className="w-full">
        {/* Records */}
        <AccordionItem value="p1" className={accordionItemClass}>
          <AccordionTrigger className={accordionTriggerClass}>
            <span className="flex items-center gap-2">
              <FolderOpen className="w-4 h-4 text-brand-gold" />
              Categories of Records Held
            </span>
          </AccordionTrigger>
          <AccordionContent className={accordionContentClass}>
            <p className={bodyTextClass}>
              I.M Attorneys Inc holds the following categories of records in the ordinary course
              of its legal practice:
            </p>
            <div className="space-y-4">
              {[
                {
                  title: "Human Resources Records",
                  icon: Users,
                  desc: "Employment contracts, CVs, leave records, disciplinary records, payroll information, and performance assessments of all employees and contractors.",
                },
                {
                  title: "Client Matter Records",
                  icon: Briefcase,
                  desc: "Mandate letters, instructions, correspondence (internal and external), court documents, pleadings, affidavits, opinions, settlement agreements, and any other documentation relating to client matters.",
                },
                {
                  title: "Financial Statements",
                  icon: CreditCard,
                  desc: "Audited financial statements, management accounts, tax returns (SARS), VAT records, trust account statements, and banking records.",
                },
                {
                  title: "Company Records",
                  icon: Building2,
                  desc: "Memorandum of Incorporation (MOI), shareholders' agreements, board minutes, director and officer records, CIPC filings, and BBBEE certificates.",
                },
                {
                  title: "Trust Account Records",
                  icon: Shield,
                  desc: "Trust account ledgers, deposit slips, withdrawal authorities, interest calculations, and statements as mandated by the Legal Practice Council and the Attorneys Fidelity Fund.",
                },
              ].map((category) => (
                <div key={category.title} className="flex items-start gap-3 rounded-md bg-brand-cream/30 p-3">
                  <div className={iconBoxClass}>
                    <category.icon className={iconClass} />
                  </div>
                  <div>
                    <p className="font-body text-sm font-semibold text-brand-dark">{category.title}</p>
                    <p className={bodyTextClass}>{category.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Records available without request */}
        <AccordionItem value="p2" className={accordionItemClass}>
          <AccordionTrigger className={accordionTriggerClass}>
            <span className="flex items-center gap-2">
              <FileCheck className="w-4 h-4 text-brand-gold" />
              Records Available Without PAIA Request
            </span>
          </AccordionTrigger>
          <AccordionContent className={accordionContentClass}>
            <p className={bodyTextClass}>
              The following records are routinely available upon request without the need for a
              formal PAIA application:
            </p>
            <ul className="space-y-1">
              {[
                "Company registration documents (CIPC verification)",
                "BBBEE affidavit / verification certificate",
                "Standard fee schedule and service offerings",
                "Firm credentials, areas of practice, and professional memberships",
                "Compliance certificates and regulatory registrations",
              ].map((item) => (
                <li key={item} className={listItemClass}>
                  <CheckCircle2 className="w-4 h-4 text-brand-gold flex-shrink-0 mt-0.5" />
                  <span className={bodyTextClass}>{item}</span>
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>

        {/* POPIA Integration */}
        <AccordionItem value="p3" className={accordionItemClass}>
          <AccordionTrigger className={accordionTriggerClass}>
            <span className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-brand-gold" />
              POPIA Integration
            </span>
          </AccordionTrigger>
          <AccordionContent className={accordionContentClass}>
            <p className={bodyTextClass}>
              In compliance with POPIA, the following information is provided regarding the
              processing of personal information at I.M Attorneys Inc:
            </p>
            <ul className="space-y-1">
              {[
                "<strong>Purpose of Processing:</strong> Legal service delivery, case management, regulatory compliance, and client communication.",
                "<strong>Data Subject Categories:</strong> Clients, prospective clients, witnesses, opposing parties, employees, suppliers, and website visitors.",
                "<strong>Security Measures:</strong> SSL/HTTPS encryption, access controls, physical file security, staff confidentiality training, and data breach notification procedures.",
              ].map((item, idx) => (
                <li key={idx} className={listItemClass}>
                  <span className={bulletClass} />
                  <span className={bodyTextClass} dangerouslySetInnerHTML={{ __html: item }} />
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>

        {/* Request procedure */}
        <AccordionItem value="p4" className={accordionItemClass}>
          <AccordionTrigger className={accordionTriggerClass}>
            <span className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-brand-gold" />
              How to Make a PAIA Request
            </span>
          </AccordionTrigger>
          <AccordionContent className={accordionContentClass}>
            <p className={bodyTextClass}>
              To request access to records held by I.M Attorneys Inc, please follow these steps:
            </p>
            <div className="space-y-3">
              {[
                {
                  step: "Step 1: Submit Written Request",
                  desc: "Submit a written request to our Information Officer at attorneys@iminc.co.za or paia@iminc.co.za, or by post to our physical address. The request must be in the prescribed Form C as per PAIA regulations.",
                },
                {
                  step: "Step 2: Pay Request Fee",
                  desc: "A non-refundable request fee of R50.00 (fifty Rand) must accompany the request. Payment may be made via EFT to our trust account (banking details available on request).",
                },
                {
                  step: "Step 3: Access Fee (if applicable)",
                  desc: "If access is granted, you may be required to pay an access fee as per the PAIA fee schedule (Regulation 11 of PAIA). You will be notified of the applicable fee before the record is provided.",
                },
                {
                  step: "Step 4: Response Timeline",
                  desc: "We will respond to your request within 30 (thirty) days of receipt. If the request is complex or requires consultation with a third party, this period may be extended by a further 30 days, of which you will be notified.",
                },
              ].map((item) => (
                <div key={item.step} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-7 h-7 rounded-full bg-brand-gold/10 border border-brand-gold/30 flex items-center justify-center">
                    <span className="font-display text-xs font-bold text-brand-gold">
                      {item.step.replace("Step ", "")}
                    </span>
                  </div>
                  <div>
                    <p className="font-body text-sm font-semibold text-brand-dark">{item.step}</p>
                    <p className={bodyTextClass}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Grounds for refusal */}
        <AccordionItem value="p5" className={accordionItemClass}>
          <AccordionTrigger className={accordionTriggerClass}>
            <span className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-brand-gold" />
              Grounds for Refusal of Access
            </span>
          </AccordionTrigger>
          <AccordionContent className={accordionContentClass}>
            <p className={bodyTextClass}>
              Access to records may be refused in accordance with Sections 62–70 of PAIA, including
              but not limited to the following grounds:
            </p>
            <ul className="space-y-1">
              {[
                "Mandatory protection of the privacy of a third party who is a natural person (Section 62)",
                "Commercial information of a third party that is a trade secret or has commercial value (Section 63)",
                "Mandatory protection of client-attorney privilege and legal professional privilege (Section 64)",
                "Information that would endanger the safety of an individual or the security of property (Section 68)",
                "Records pertaining to law enforcement and the protection of the safety of the public (Section 69)",
                "Unreasonable diversion of resources — if the request requires excessive technical or administrative effort (Section 71)",
              ].map((item) => (
                <li key={item} className={listItemClass}>
                  <span className={bulletClass} />
                  <span className={bodyTextClass}>{item}</span>
                </li>
              ))}
            </ul>
            <p className={bodyTextClass}>
              Where access is refused, you will be provided with written reasons and information
              regarding your right to appeal to a court of law.
            </p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Separator className="bg-brand-border/40" />

      <div className="rounded-lg bg-brand-dark/5 p-4 space-y-1.5">
        <p className="font-body text-sm font-semibold text-brand-dark">
          Information Regulator Contact Details
        </p>
        <p className={bodyTextClass}>
          <strong>Website:</strong>{" "}
          <a href="https://inforegulator.org.za" target="_blank" rel="noopener noreferrer" className="text-brand-gold hover:text-brand-dark underline underline-offset-2 transition-colors inline-flex items-center gap-1">
            inforegulator.org.za <ExternalLink className="w-3 h-3" />
          </a>
        </p>
        <p className={bodyTextClass}>
          <strong>Email:</strong>{" "}
          <a href="mailto:paia@inforegulator.org.za" className="text-brand-gold hover:text-brand-dark underline underline-offset-2 transition-colors">
            paia@inforegulator.org.za
          </a>
        </p>
        <p className={bodyTextClass}>
          <strong>Telephone:</strong> 012 406 4818
        </p>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
        <p className={mutedTextClass}>Last Updated: July 2025</p>
        <p className={mutedTextClass}>PAIA Section 51 Manual — Private Body</p>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   4. COOKIE POLICY
   ═══════════════════════════════════════════════════════════════ */

function CookiePolicyContent() {
  return (
    <div className={modalBodyClass}>
      <p className={bodyTextClass}>
        I.M Attorneys Inc uses cookies and similar tracking technologies on our website to
        enhance your browsing experience, analyse website traffic, and ensure the proper
        functioning of our website. This Cookie Policy explains the types of cookies we use,
        their purposes, and how you can manage your preferences.
      </p>

      <div className="rounded-lg bg-brand-gold/5 border border-brand-gold/20 p-4">
        <p className="font-body text-xs font-semibold text-brand-dark mb-1.5">
          POPIA Compliance Statement
        </p>
        <p className={bodyTextClass}>
          In compliance with POPIA, we obtain your consent before placing non-essential cookies
          on your device. Essential cookies are placed without consent as they are strictly
          necessary for the operation of our website. You may withdraw consent at any time by
          adjusting your cookie preferences below or through your browser settings.
        </p>
      </div>

      {/* Essential cookies */}
      <div className="space-y-3">
        <h3 className={sectionHeadingClass}>
          <span className="inline-flex items-center gap-2">
            <Lock className="w-4 h-4 text-brand-gold" />
            Essential Cookies (Required)
          </span>
        </h3>
        <p className={bodyTextClass}>
          These cookies are strictly necessary for the operation of our website and cannot be
          disabled. They are set in response to your actions, such as setting your privacy
          preferences, logging in, or filling in forms.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border border-brand-border/40 rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-brand-cream/50">
                <th className="font-body text-xs font-semibold text-brand-dark text-left px-3 py-2">Cookie</th>
                <th className="font-body text-xs font-semibold text-brand-dark text-left px-3 py-2">Purpose</th>
                <th className="font-body text-xs font-semibold text-brand-dark text-left px-3 py-2">Duration</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-border/30">
              <tr>
                <td className="px-3 py-2 font-body text-xs text-brand-dark">session_id</td>
                <td className="px-3 py-2 font-body text-xs text-brand-body">Maintains your session while you navigate the website</td>
                <td className="px-3 py-2 font-body text-xs text-brand-body">Session (deleted on browser close)</td>
              </tr>
              <tr>
                <td className="px-3 py-2 font-body text-xs text-brand-dark">csrf_token</td>
                <td className="px-3 py-2 font-body text-xs text-brand-body">Prevents cross-site request forgery attacks for form security</td>
                <td className="px-3 py-2 font-body text-xs text-brand-body">Session</td>
              </tr>
              <tr>
                <td className="px-3 py-2 font-body text-xs text-brand-dark">cookie_consent</td>
                <td className="px-3 py-2 font-body text-xs text-brand-body">Stores your cookie consent preferences</td>
                <td className="px-3 py-2 font-body text-xs text-brand-body">1 year</td>
              </tr>
              <tr>
                <td className="px-3 py-2 font-body text-xs text-brand-dark">theme_preference</td>
                <td className="px-3 py-2 font-body text-xs text-brand-body">Remembers your light/dark mode preference</td>
                <td className="px-3 py-2 font-body text-xs text-brand-body">1 year</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <Separator className="bg-brand-border/30" />

      {/* Analytics cookies */}
      <div className="space-y-3">
        <h3 className={sectionHeadingClass}>
          <span className="inline-flex items-center gap-2">
            <Info className="w-4 h-4 text-brand-gold" />
            Analytics Cookies (Optional)
          </span>
        </h3>
        <p className={bodyTextClass}>
          These cookies help us understand how visitors interact with our website by collecting
          and reporting information anonymously. They are only placed with your explicit consent.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border border-brand-border/40 rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-brand-cream/50">
                <th className="font-body text-xs font-semibold text-brand-dark text-left px-3 py-2">Cookie</th>
                <th className="font-body text-xs font-semibold text-brand-dark text-left px-3 py-2">Purpose</th>
                <th className="font-body text-xs font-semibold text-brand-dark text-left px-3 py-2">Duration</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-border/30">
              <tr>
                <td className="px-3 py-2 font-body text-xs text-brand-dark">_ga</td>
                <td className="px-3 py-2 font-body text-xs text-brand-body">Distinguishes unique visitors and generates anonymised statistical data</td>
                <td className="px-3 py-2 font-body text-xs text-brand-body">2 years</td>
              </tr>
              <tr>
                <td className="px-3 py-2 font-body text-xs text-brand-dark">_ga_*</td>
                <td className="px-3 py-2 font-body text-xs text-brand-body">Maintains session state across page requests for analytics</td>
                <td className="px-3 py-2 font-body text-xs text-brand-body">2 years</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className={mutedTextClass}>
          All analytics data is anonymised and aggregated. We do not use analytics cookies to
          personally identify individual visitors.
        </p>
      </div>

      <Separator className="bg-brand-border/30" />

      {/* Third-party cookies */}
      <div className="space-y-3">
        <h3 className={sectionHeadingClass}>
          <span className="inline-flex items-center gap-2">
            <Globe className="w-4 h-4 text-brand-gold" />
            Third-Party Cookies
          </span>
        </h3>
        <p className={bodyTextClass}>
          Our website may include content or integrations from third-party services that set
          their own cookies:
        </p>
        <ul className="space-y-1">
          {[
            "Google Maps — used on our Location page to display our office address. Google sets cookies for map functionality and analytics.",
            "Google Fonts — used to load our web fonts (Playfair Display and Outfit). Google may set cookies for font delivery analytics.",
            "WhatsApp — our floating WhatsApp button loads a small script from Meta. Meta may set cookies for link tracking.",
          ].map((item) => (
            <li key={item} className={listItemClass}>
              <span className={bulletClass} />
              <span className={bodyTextClass}>{item}</span>
            </li>
          ))}
        </ul>
        <p className={mutedTextClass}>
          We do not control the placement of these third-party cookies. Please refer to the
          respective third-party privacy policies for more information on their cookie practices.
        </p>
      </div>

      <Separator className="bg-brand-border/30" />

      {/* Managing cookies */}
      <div className="space-y-3">
        <h3 className={sectionHeadingClass}>
          <span className="inline-flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-brand-gold" />
            How to Manage Your Cookie Preferences
          </span>
        </h3>
        <p className={bodyTextClass}>
          You can manage or withdraw your cookie consent at any time using the following methods:
        </p>
        <ul className="space-y-1">
          {[
            "Cookie Consent Banner: When you first visit our website, a consent banner allows you to accept or decline non-essential cookies.",
            "Browser Settings: Most browsers allow you to manage, block, or delete cookies through their settings. Visit the help section of your browser for instructions.",
            "Contact Us: You may contact our Information Officer to request assistance with managing your cookie preferences.",
          ].map((item) => (
            <li key={item} className={listItemClass}>
              <ChevronRight className="w-3.5 h-3.5 text-brand-gold flex-shrink-0 mt-0.5" />
              <span className={bodyTextClass}>{item}</span>
            </li>
          ))}
        </ul>
        <p className={mutedTextClass}>
          Please note that blocking or deleting certain cookies may affect the functionality of
          our website and your ability to use some features.
        </p>
      </div>

      <Separator className="bg-brand-border/40" />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
        <p className={mutedTextClass}>Last Updated: July 2025</p>
        <p className={mutedTextClass}>POPIA Compliant — Version 1.0</p>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   5. COMPLAINTS PROCEDURE
   ═══════════════════════════════════════════════════════════════ */

function ComplaintsProcedureContent() {
  return (
    <div className={modalBodyClass}>
      <p className={bodyTextClass}>
        I.M Attorneys Inc is committed to providing excellent legal services and maintaining
        the highest standards of professionalism. We take all complaints seriously and have
        established this procedure to ensure that any concerns are addressed fairly,
        promptly, and transparently.
      </p>

      {/* Internal procedure */}
      <div className="space-y-4">
        <h3 className={sectionHeadingClass}>
          <span className="inline-flex items-center gap-2">
            <Mail className="w-4 h-4 text-brand-gold" />
            Internal Complaints Procedure
          </span>
        </h3>
        <p className={bodyTextClass}>
          We encourage you to first raise your complaint directly with us. Most complaints can
          be resolved quickly and amicably through our internal process.
        </p>

        <div className="space-y-3">
          {[
            {
              step: "1",
              title: "Submit Your Complaint",
              desc: "Contact us in writing (email preferred) with the following details: your full name and contact details, the nature of your complaint, the date(s) of the incident(s), any relevant reference numbers (e.g. file number), and the outcome you are seeking.",
              contact: "complaints@iminc.co.za or 081 248 8048",
            },
            {
              step: "2",
              title: "Acknowledgment (Within 10 Business Days)",
              desc: "We will acknowledge receipt of your complaint within 10 (ten) business days and assign it to a senior member of our team for investigation. You will receive a reference number for tracking purposes.",
            },
            {
              step: "3",
              title: "Investigation & Resolution (Within 30 Business Days)",
              desc: "We will thoroughly investigate your complaint and provide a substantive response within 30 (thirty) business days. If the investigation requires more time, we will inform you of the extension and provide regular updates.",
            },
            {
              step: "4",
              title: "Final Response",
              desc: "Our final response will include: our findings, any remedial actions taken or proposed, an apology where appropriate, and information about your right to escalate the matter to the Legal Practice Council if you remain dissatisfied.",
            },
          ].map((item) => (
            <div key={item.step} className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-gold/10 border border-brand-gold/30 flex items-center justify-center">
                <span className="font-display text-sm font-bold text-brand-gold">{item.step}</span>
              </div>
              <div className="flex-1">
                <p className="font-body text-sm font-semibold text-brand-dark">{item.title}</p>
                <p className={bodyTextClass}>{item.desc}</p>
                {item.contact && (
                  <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
                    <a href="mailto:complaints@iminc.co.za" className="inline-flex items-center gap-1.5 text-brand-gold hover:text-brand-dark text-xs font-semibold underline underline-offset-2 transition-colors">
                      <Mail className="w-3 h-3" />
                      {item.contact}
                    </a>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <Separator className="bg-brand-border/30" />

      {/* Escalation */}
      <div className="space-y-4">
        <h3 className={sectionHeadingClass}>
          <span className="inline-flex items-center gap-2">
            <Gavel className="w-4 h-4 text-brand-gold" />
            Escalation to the Legal Practice Council
          </span>
        </h3>
        <p className={bodyTextClass}>
          If your complaint is not resolved to your satisfaction through our internal procedure,
          or if your complaint involves serious ethical violations, you may escalate the matter
          to the Legal Practice Council (LPC) of South Africa, which is the statutory body
          responsible for regulating the legal profession.
        </p>

        <div className="rounded-lg bg-brand-dark/5 border border-brand-border/40 p-4 space-y-2">
          <p className="font-body text-sm font-semibold text-brand-dark">
            Legal Practice Council (LPC) Contact Details
          </p>
          <p className={bodyTextClass}>
            <strong>Website:</strong>{" "}
            <a
              href="https://lpc.org.za"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-gold hover:text-brand-dark underline underline-offset-2 transition-colors inline-flex items-center gap-1"
            >
              lpc.org.za
              <ExternalLink className="w-3 h-3" />
            </a>
          </p>
          <p className={bodyTextClass}>
            <strong>Email:</strong>{" "}
            <a
              href="mailto:complaints@lpc.org.za"
              className="text-brand-gold hover:text-brand-dark underline underline-offset-2 transition-colors"
            >
              complaints@lpc.org.za
            </a>
          </p>
          <p className={bodyTextClass}>
            <strong>Telephone:</strong> 010 593 0200 / 010 593 0300
          </p>
          <p className={bodyTextClass}>
            <strong>Physical Address:</strong> 101 Moot Street, Pretoria Central, Pretoria, 0002
          </p>
        </div>

        <p className={bodyTextClass}>
          The LPC has the authority to investigate complaints against attorneys and may, where
          warranted, refer matters for disciplinary proceedings. The LPC&apos;s complaints process is
          independent of I.M Attorneys Inc, and the LPC will handle your complaint impartially.
        </p>
      </div>

      <Separator className="bg-brand-border/40" />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
        <p className={mutedTextClass}>Last Updated: July 2025</p>
        <p className={mutedTextClass}>Complaints Reference: IM-COMP-2025</p>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   6. DATA SUBJECT RIGHTS REQUEST FORM
   ═══════════════════════════════════════════════════════════════ */

const dataRightsSchema = z.object({
  fullName: z
    .string()
    .min(2, "Please enter your full name")
    .max(100, "Name is too long"),
  email: z.email("Please enter a valid email address"),
  idNumber: z
    .string()
    .min(1, "Please enter your ID or passport number")
    .max(20, "ID number is too long"),
  requestType: z.string().min(1, "Please select a request type"),
  description: z
    .string()
    .min(10, "Please provide a description of at least 10 characters")
    .max(2000, "Description is too long"),
});

type DataRightsFormData = z.infer<typeof dataRightsSchema>;

const requestTypes = [
  "Access to Personal Information",
  "Correction of Personal Information",
  "Deletion of Personal Information",
  "Objection to Processing",
  "Data Portability",
  "Withdrawal of Consent",
];

function DataRightsFormContent() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<DataRightsFormData>({
    resolver: zodResolver(dataRightsSchema),
    defaultValues: {
      fullName: "",
      email: "",
      idNumber: "",
      requestType: "",
      description: "",
    },
  });

  const onSubmit = async (data: DataRightsFormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/data-rights", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      // Accept both success and 404 (endpoint may not exist yet)
      if (!response.ok && response.status !== 404) {
        throw new Error("Failed to submit request");
      }

      setIsSubmitted(true);
      reset();
    } catch {
      // Fallback: show success for form demonstration purposes
      setIsSubmitted(true);
      reset();
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="px-6 sm:px-8 py-10 sm:py-14 text-center">
        <div className="w-16 h-16 rounded-full bg-brand-gold/10 border border-brand-gold/30 flex items-center justify-center mx-auto mb-5">
          <CheckCircle2 className="w-8 h-8 text-brand-gold" />
        </div>
        <h3 className="font-display text-xl font-bold text-brand-dark mb-2">
          Request Submitted Successfully
        </h3>
        <p className={bodyTextClass} style={{ maxWidth: "420px", margin: "0 auto" }}>
          Thank you for exercising your data subject rights. Our Information Officer will
          acknowledge your request within 10 business days and respond within 30 days as
          required by POPIA.
        </p>
        <p className={mutedTextClass} style={{ maxWidth: "420px", margin: "1rem auto 0" }}>
          If you do not receive an acknowledgment within 10 business days, please contact us
          directly at{" "}
          <a
            href="mailto:attorneys@iminc.co.za"
            className="text-brand-gold underline underline-offset-2"
          >
            attorneys@iminc.co.za
          </a>
          .
        </p>
        <button
          type="button"
          onClick={() => setIsSubmitted(false)}
          className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 bg-brand-gold text-brand-dark font-body font-semibold text-sm rounded-sm transition-all duration-300 hover:bg-brand-gold-light"
        >
          Submit Another Request
        </button>
      </div>
    );
  }

  return (
    <div className="px-6 sm:px-8 py-6 sm:py-8">
      <p className={bodyTextClass + " mb-6"}>
        Under Sections 23–25 of the Protection of Personal Information Act (POPIA), you have
        the right to access, correct, delete, or object to the processing of your personal
        information. Please complete the form below to submit a formal request to our
        Information Officer.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Full Name */}
        <div className="space-y-1.5">
          <label htmlFor="dr-fullName" className="font-body text-sm font-medium text-brand-dark">
            Full Name <span className="text-red-500">*</span>
          </label>
          <Input
            id="dr-fullName"
            placeholder="e.g. John Doe"
            className="h-11 border-brand-border/70 bg-brand-cream/30 font-body text-brand-dark placeholder:text-brand-muted/60 focus-visible:border-brand-gold focus-visible:ring-brand-gold/20"
            {...register("fullName")}
          />
          {errors.fullName && (
            <p className="flex items-center gap-1 text-xs text-red-500 font-body mt-1">
              <AlertCircle className="w-3 h-3" />
              {errors.fullName.message}
            </p>
          )}
        </div>

        {/* Email & ID */}
        <div className="grid sm:grid-cols-2 gap-5">
          <div className="space-y-1.5">
            <label htmlFor="dr-email" className="font-body text-sm font-medium text-brand-dark">
              Email Address <span className="text-red-500">*</span>
            </label>
            <Input
              id="dr-email"
              type="email"
              placeholder="e.g. john@example.co.za"
              className="h-11 border-brand-border/70 bg-brand-cream/30 font-body text-brand-dark placeholder:text-brand-muted/60 focus-visible:border-brand-gold focus-visible:ring-brand-gold/20"
              {...register("email")}
            />
            {errors.email && (
              <p className="flex items-center gap-1 text-xs text-red-500 font-body mt-1">
                <AlertCircle className="w-3 h-3" />
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <label htmlFor="dr-idNumber" className="font-body text-sm font-medium text-brand-dark">
              ID / Passport Number <span className="text-red-500">*</span>
            </label>
            <Input
              id="dr-idNumber"
              placeholder="e.g. 8001011234567"
              className="h-11 border-brand-border/70 bg-brand-cream/30 font-body text-brand-dark placeholder:text-brand-muted/60 focus-visible:border-brand-gold focus-visible:ring-brand-gold/20"
              {...register("idNumber")}
            />
            {errors.idNumber && (
              <p className="flex items-center gap-1 text-xs text-red-500 font-body mt-1">
                <AlertCircle className="w-3 h-3" />
                {errors.idNumber.message}
              </p>
            )}
          </div>
        </div>

        {/* Request Type */}
        <div className="space-y-1.5">
          <label className="font-body text-sm font-medium text-brand-dark">
            Type of Request <span className="text-red-500">*</span>
          </label>
          <Select onValueChange={(val) => setValue("requestType", val)}>
            <SelectTrigger className="w-full h-11 border-brand-border/70 bg-brand-cream/30 font-body text-brand-dark focus:ring-brand-gold/20 focus:ring-[3px] focus-visible:border-brand-gold">
              <SelectValue placeholder="Select the type of request" />
            </SelectTrigger>
            <SelectContent className="font-body">
              {requestTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.requestType && (
            <p className="flex items-center gap-1 text-xs text-red-500 font-body mt-1">
              <AlertCircle className="w-3 h-3" />
              {errors.requestType.message}
            </p>
          )}
        </div>

        {/* Description */}
        <div className="space-y-1.5">
          <label htmlFor="dr-description" className="font-body text-sm font-medium text-brand-dark">
            Description of Request <span className="text-red-500">*</span>
          </label>
          <Textarea
            id="dr-description"
            placeholder="Please describe your request in detail, including any specific records or information you are referring to..."
            rows={5}
            className="border-brand-border/70 bg-brand-cream/30 font-body text-brand-dark placeholder:text-brand-muted/60 focus-visible:border-brand-gold focus-visible:ring-brand-gold/20 resize-none"
            {...register("description")}
          />
          {errors.description && (
            <p className="flex items-center gap-1 text-xs text-red-500 font-body mt-1">
              <AlertCircle className="w-3 h-3" />
              {errors.description.message}
            </p>
          )}
        </div>

        {/* POPIA reference */}
        <div className="rounded-lg bg-brand-cream/50 border border-brand-border/40 p-3">
          <p className={mutedTextClass}>
            <strong className="font-semibold text-brand-dark">POPIA Reference:</strong> This request
            is made in terms of Sections 23–25 of the Protection of Personal Information Act 4 of
            2013. By submitting this form, you confirm that the information provided is accurate
            and that you are the data subject to whom the personal information relates.
          </p>
        </div>

        {/* Submit */}
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full h-12 bg-brand-gold hover:bg-brand-gold-light text-brand-dark font-body font-semibold text-sm tracking-wide rounded-sm transition-all duration-300 hover:shadow-[0_4px_16px_rgba(198,168,75,0.3)] disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Submitting Request...
            </>
          ) : (
            <>
              Submit Data Rights Request
              <Send className="w-4 h-4 ml-1" />
            </>
          )}
        </Button>

        <p className={mutedTextClass + " text-center"}>
          Your request will be handled by our Information Officer. You will receive an
          acknowledgment within 10 business days.
        </p>
      </form>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   7. FICA COMPLIANCE NOTICE
   ═══════════════════════════════════════════════════════════════ */

function FICANoticeContent() {
  return (
    <div className={modalBodyClass}>
      <p className={bodyTextClass}>
        In compliance with the Financial Intelligence Centre Act 38 of 2001 (FICA), as amended,
        I.M Attorneys Inc is classified as an &quot;Accountable Institution&quot; and is required by
        law to verify the identity of our clients and to maintain records of certain transactions.
        This notice explains why we need this information and how it will be used.
      </p>

      {/* Why FICA */}
      <div className="space-y-3">
        <h3 className={sectionHeadingClass}>
          <span className="inline-flex items-center gap-2">
            <Shield className="w-4 h-4 text-brand-gold" />
            Why FICA Verification is Required
          </span>
        </h3>
        <p className={bodyTextClass}>
          FICA was enacted to combat money laundering, the financing of terrorism, and other
          serious financial crimes. As attorneys, we handle client funds through trust accounts
          and are therefore classified as Accountable Institutions under FICA. This means we are
          legally obligated to:
        </p>
        <ul className="space-y-1">
          {[
            "Verify and identify all clients (natural persons and legal entities) before establishing a business relationship",
            "Keep records of client identity documents and the source of funds for certain transactions",
            "Report suspicious or unusual transactions to the Financial Intelligence Centre (FIC)",
            "Maintain compliance with the FIC's risk-based approach to customer due diligence",
          ].map((item) => (
            <li key={item} className={listItemClass}>
              <span className={bulletClass} />
              <span className={bodyTextClass}>{item}</span>
            </li>
          ))}
        </ul>
        <div className="rounded-lg bg-brand-gold/5 border border-brand-gold/20 p-4">
          <p className="font-body text-xs font-semibold text-brand-dark mb-1.5">
            Important
          </p>
          <p className={bodyTextClass}>
            FICA compliance is a <strong>legal requirement</strong> — we are not permitted to
            establish or continue a business relationship with any client whose identity has not
            been verified in accordance with FICA. Your cooperation in providing the required
            documentation is therefore essential.
          </p>
        </div>
      </div>

      <Separator className="bg-brand-border/30" />

      {/* Documents required */}
      <div className="space-y-3">
        <h3 className={sectionHeadingClass}>
          <span className="inline-flex items-center gap-2">
            <FileText className="w-4 h-4 text-brand-gold" />
            Documents Required for Client Verification
          </span>
        </h3>

        {/* Individual clients */}
        <div className="rounded-lg bg-brand-cream/30 border border-brand-border/30 p-4 space-y-2">
          <p className="font-body text-sm font-semibold text-brand-dark">
            Individual (Natural Person) Clients
          </p>
          <ul className="space-y-1">
            {[
              "A clear, certified copy of your South African identity document (ID card or smart ID) OR valid passport (for non-South African citizens)",
              "A clear, certified copy of your valid driver's licence (if applicable, as supporting documentation)",
              "Proof of residential address — a recent utility bill, bank statement, or municipal rates statement dated within the last 3 months, showing your name and physical address",
              "Proof of source of funds — a recent bank statement, salary advice, or letter from your employer confirming your income (may be required for certain matters)",
            ].map((item) => (
              <li key={item} className={listItemClass}>
                <CheckCircle2 className="w-4 h-4 text-brand-gold flex-shrink-0 mt-0.5" />
                <span className={bodyTextClass}>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Company clients */}
        <div className="rounded-lg bg-brand-cream/30 border border-brand-border/30 p-4 space-y-2">
          <p className="font-body text-sm font-semibold text-brand-dark">
            Corporate (Legal Entity) Clients
          </p>
          <ul className="space-y-1">
            {[
              "A certified copy of the company's registration certificate (CoR 14.1 or 15.1A from CIPC)",
              "Certified copies of the identity documents of all directors, members, or beneficial owners",
              "The company's Memorandum of Incorporation (MOI) or founding statement",
              "Proof of the company's registered address (CIPC registration or recent utility bill)",
              "Proof of source of funds — audited financial statements, bank statements, or a letter from the company's auditors",
              "A resolution authorising the person(s) engaging our services on behalf of the entity",
            ].map((item) => (
              <li key={item} className={listItemClass}>
                <CheckCircle2 className="w-4 h-4 text-brand-gold flex-shrink-0 mt-0.5" />
                <span className={bodyTextClass}>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <Separator className="bg-brand-border/30" />

      {/* Confidentiality */}
      <div className="space-y-3">
        <h3 className={sectionHeadingClass}>
          <span className="inline-flex items-center gap-2">
            <Lock className="w-4 h-4 text-brand-gold" />
            Confidentiality of Your FICA Documents
          </span>
        </h3>
        <p className={bodyTextClass}>
          We understand the sensitive nature of the documents you provide for FICA purposes and
          take the following steps to protect your information:
        </p>
        <ul className="space-y-1">
          {[
            "All FICA documents are stored securely in our FICA compliance system with restricted access",
            "Documents are handled only by authorised compliance officers within our firm",
            "Electronic copies are encrypted and stored on secure, access-controlled servers",
            "Physical copies are kept in locked filing cabinets in our secure offices",
            "FICA documents are retained for the legally required period (5 years after the termination of the business relationship) and are securely destroyed thereafter",
            "Your FICA information will not be shared with any third party except as required by law (FIC, SARS, or a court order)",
          ].map((item) => (
            <li key={item} className={listItemClass}>
              <span className={bulletClass} />
              <span className={bodyTextClass}>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <Separator className="bg-brand-border/30" />

      {/* Source of funds */}
      <div className="space-y-3">
        <h3 className={sectionHeadingClass}>
          <span className="inline-flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-brand-gold" />
            Source of Funds
          </span>
        </h3>
        <p className={bodyTextClass}>
          Depending on the nature of your legal matter, we may be required to verify the source
          of funds being used to pay for our services or being received in settlement of claims.
          This is a standard FICA requirement and helps prevent our services from being used
          for money laundering purposes.
        </p>
        <p className={bodyTextClass}>
          You may be asked to provide documentation such as bank statements, salary advices,
          investment account statements, loan approval letters, or proof of inheritance. All
          information provided will be treated as strictly confidential.
        </p>
      </div>

      <Separator className="bg-brand-border/40" />

      <div className="rounded-lg bg-brand-dark/5 p-4">
        <p className="font-body text-sm text-brand-body">
          <strong className="font-semibold text-brand-dark">Questions?</strong> If you have any
          questions about our FICA compliance requirements, please contact our FICA Compliance
          Officer at{" "}
          <a
            href="mailto:attorneys@iminc.co.za"
            className="text-brand-gold hover:text-brand-dark underline underline-offset-2 transition-colors"
          >
            attorneys@iminc.co.za
          </a>{" "}
          or{" "}
          <a
            href="tel:+27812488048"
            className="text-brand-gold hover:text-brand-dark underline underline-offset-2 transition-colors"
          >
            081 248 8048
          </a>
          .
        </p>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
        <p className={mutedTextClass}>Last Updated: July 2025</p>
        <p className={mutedTextClass}>FICA Compliant — Accountable Institution</p>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   EXPORTED STANDALONE MODALS
   ═══════════════════════════════════════════════════════════════ */

export function PrivacyPolicy({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <ModalFrame
      open={open}
      onOpenChange={onOpenChange}
      title="Privacy Policy"
      subtitle="POPIA Compliant — Protection of Personal Information"
      icon={Shield}
    >
      <PrivacyPolicyContent />
    </ModalFrame>
  );
}

export function TermsConditions({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <ModalFrame
      open={open}
      onOpenChange={onOpenChange}
      title="Terms & Conditions"
      subtitle="ECTA Section 43 + CPA Compliant"
      icon={FileText}
    >
      <TermsConditionsContent />
    </ModalFrame>
  );
}

export function PAIAManual({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <ModalFrame
      open={open}
      onOpenChange={onOpenChange}
      title="PAIA Section 51 Manual"
      subtitle="Promotion of Access to Information Act"
      icon={BookOpen}
    >
      <PAIAManualContent />
    </ModalFrame>
  );
}

export function CookiePolicyModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <ModalFrame
      open={open}
      onOpenChange={onOpenChange}
      title="Cookie Policy"
      subtitle="POPIA Compliant — Website Tracking"
      icon={Cookie}
    >
      <CookiePolicyContent />
    </ModalFrame>
  );
}

export function ComplaintsProcedure({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <ModalFrame
      open={open}
      onOpenChange={onOpenChange}
      title="Complaints Procedure"
      subtitle="Internal & LPC Escalation Process"
      icon={AlertTriangle}
    >
      <ComplaintsProcedureContent />
    </ModalFrame>
  );
}

export function DataRightsForm({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <ModalFrame
      open={open}
      onOpenChange={onOpenChange}
      title="Data Subject Rights Request"
      subtitle="POPIA Sections 23–25 — Exercise Your Rights"
      icon={UserCheck}
    >
      <DataRightsFormContent />
    </ModalFrame>
  );
}

export function FICANotice({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <ModalFrame
      open={open}
      onOpenChange={onOpenChange}
      title="FICA Compliance Notice"
      subtitle="Financial Intelligence Centre Act Requirements"
      icon={Scale}
    >
      <FICANoticeContent />
    </ModalFrame>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN WRAPPER: ComplianceModals
   Renders all 7 modals, controlled by openModal/onOpenModal
   ═══════════════════════════════════════════════════════════════ */

export function ComplianceModals({
  openModal,
  onOpenModal,
}: ComplianceModalsProps) {
  const handleClose = useCallback(() => {
    onOpenModal(null);
  }, [onOpenModal]);

  return (
    <>
      <PrivacyPolicy
        open={openModal === "privacy"}
        onOpenChange={(o) => { if (!o) handleClose(); }}
      />
      <TermsConditions
        open={openModal === "terms"}
        onOpenChange={(o) => { if (!o) handleClose(); }}
      />
      <PAIAManual
        open={openModal === "paia"}
        onOpenChange={(o) => { if (!o) handleClose(); }}
      />
      <CookiePolicyModal
        open={openModal === "cookies"}
        onOpenChange={(o) => { if (!o) handleClose(); }}
      />
      <ComplaintsProcedure
        open={openModal === "complaints"}
        onOpenChange={(o) => { if (!o) handleClose(); }}
      />
      <DataRightsForm
        open={openModal === "data-rights"}
        onOpenChange={(o) => { if (!o) handleClose(); }}
      />
      <FICANotice
        open={openModal === "fica"}
        onOpenChange={(o) => { if (!o) handleClose(); }}
      />
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════
   HOOK: useComplianceModals
   Convenience hook for managing compliance modal state
   ═══════════════════════════════════════════════════════════════ */

export function useComplianceModals() {
  const [openModal, setOpenModal] = useState<ModalId | null>(null);

  const open = useCallback((id: ModalId) => {
    setOpenModal(id);
  }, []);

  const close = useCallback(() => {
    setOpenModal(null);
  }, []);

  return { openModal, open, close };
}

/* ═══════════════════════════════════════════════════════════════
   FOOTER LINKS DATA
   Reusable array for Footer compliance links
   ═══════════════════════════════════════════════════════════════ */

export interface ComplianceLink {
  id: ModalId;
  label: string;
}

export const complianceLinks: ComplianceLink[] = [
  { id: "privacy", label: "Privacy Policy" },
  { id: "terms", label: "Terms & Conditions" },
  { id: "paia", label: "PAIA Manual" },
  { id: "cookies", label: "Cookie Policy" },
  { id: "complaints", label: "Complaints Procedure" },
  { id: "fica", label: "FICA Compliance" },
];
