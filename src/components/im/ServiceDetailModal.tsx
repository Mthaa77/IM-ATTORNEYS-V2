"use client";

import { useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Scale,
  Shield,
  FileText,
  Gavel,
  Building2,
  ArrowRight,
  X,
  CheckCircle2,
  BookOpen,
} from "lucide-react";

export interface ServiceDetail {
  title: string;
  tagline: string;
  description: string;
  features: string[];
  icon: React.ElementType;
  slug: string;
}

export interface ServiceDetailModalProps {
  service: ServiceDetail | null;
  isOpen: boolean;
  onClose: () => void;
  onViewFullPage?: (slug: string) => void;
}

export const serviceDetails: ServiceDetail[] = [
  {
    title: "Family Law",
    slug: "family-law",
    tagline: "Protecting what matters most",
    description:
      "Family disputes demand sensitivity, discretion, and expert legal strategy. Our team understands the emotional weight of family law matters and provides compassionate yet decisive representation. We navigate the complexities of South African family law to secure the best outcomes for you and your loved ones, ensuring that your rights and interests are protected at every stage.",
    features: [
      "Divorce proceedings (contested & uncontested)",
      "Child custody & access arrangements",
      "Ante-nuptial contracts (ANC) & marital regimes",
      "Domestic violence & protection orders",
      "Maintenance claims & enforcement",
      "Parental rights & responsibilities agreements",
    ],
    icon: Scale,
  },
  {
    title: "Wills & Estates",
    slug: "wills-estates",
    tagline: "Preserving your legacy for generations",
    description:
      "Estate planning is one of the most important steps you can take to protect your family's future. Our attorneys draft bespoke wills and estate plans that honour your wishes and comply with South African law. We guide executors through the probate process with precision, and we are experienced in resolving complex estate disputes to ensure your legacy is preserved.",
    features: [
      "Drafting of last wills & testaments",
      "Estate administration & probate",
      "Trust formation & management",
      "Ante-nuptial contract drafting",
      "Estate dispute resolution",
      "Inheritance claims & objections",
    ],
    icon: FileText,
  },
  {
    title: "Claims Against the State",
    slug: "claims-state",
    tagline: "Holding power to account",
    description:
      "When the state fails in its duty, you deserve justice. Our firm specialises in claims against government entities, including Road Accident Fund (RAF) claims, wrongful arrest and detention, medical negligence in state facilities, and police brutality. We have a proven track record of securing fair compensation and holding state actors accountable for their actions.",
    features: [
      "Road Accident Fund (RAF) claims",
      "Wrongful arrest & unlawful detention",
      "State medical negligence claims",
      "Police brutality & excessive force",
      "Constitutional rights violations",
      "Claim against government departments",
    ],
    icon: Shield,
  },
  {
    title: "Criminal Law",
    slug: "criminal-law",
    tagline: "Fierce defence, unwavering commitment",
    description:
      "Facing criminal charges is one of the most stressful experiences anyone can endure. Our criminal law team is available 24/7 for urgent bail applications and provides robust defence across all criminal matters. From initial consultations through to trial and appeal, we fight tirelessly to protect your freedom, your reputation, and your constitutional rights.",
    features: [
      "24/7 bail application service",
      "Defence in all criminal charges",
      "Trial preparation & courtroom representation",
      "Appeal & review applications",
      "Assault, theft & fraud defence",
      "Drug-related offence representation",
    ],
    icon: Gavel,
  },
  {
    title: "Commercial Law",
    slug: "commercial-law",
    tagline: "Legal solutions that make business sense",
    description:
      "In today's complex regulatory environment, businesses need legal partners who understand both the law and the bottom line. Our commercial law team provides strategic advice on contracts, mergers and acquisitions, corporate governance, and compliance. We help businesses of all sizes — from startups to established enterprises — navigate legal risks and seize opportunities with confidence.",
    features: [
      "Contract drafting, review & negotiation",
      "Mergers & acquisitions (M&A)",
      "Corporate governance & compliance",
      "Business registration & structuring",
      "Dispute resolution & mediation",
      "BBBEE advisory & compliance",
    ],
    icon: Building2,
  },
  {
    title: "General Litigation",
    slug: "general-litigation",
    tagline: "We litigate what others avoid",
    description:
      "Some legal matters require determined, experienced litigators who are not afraid to take on difficult cases. Our litigation team handles a broad spectrum of disputes, including evictions, debt collection, debt review removal, contractual disputes, and property-related matters. We are known for our meticulous preparation, aggressive advocacy, and relentless pursuit of favourable outcomes for our clients.",
    features: [
      "Property evictions & rental disputes",
      "Debt collection & recovery",
      "Debt review removal applications",
      "Contractual disputes & breach of contract",
      "Interdicts & urgent court applications",
      "Magistrates' & High Court litigation",
    ],
    icon: Scale,
  },
];

/* ─── Animation variants ─── */
const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const panelVariants = {
  hidden: { opacity: 0, y: 80 },
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
    y: 80,
    transition: {
      duration: 0.3,
      ease: [0.42, 0, 0.58, 1],
    },
  },
};

export function ServiceDetailModal({
  service,
  isOpen,
  onClose,
  onViewFullPage,
}: ServiceDetailModalProps) {
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

  const handleCTAClick = () => {
    onClose();
    setTimeout(() => {
      const el = document.querySelector("#contact");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 350);
  };

  if (!service) return null;

  const Icon = service.icon;

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

          {/* ─── Modal panel ─── */}
          <motion.div
            className="fixed inset-0 z-[101] flex items-end sm:items-center justify-center p-0 sm:p-4"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.2 }}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-title"
              className="relative w-full sm:max-w-[600px] max-h-[90vh] sm:max-h-[85vh] overflow-y-auto rounded-t-2xl sm:rounded-lg shadow-2xl card-aura"
              style={{
                background:
                  "rgba(255, 255, 255, 0.92)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                border: "1px solid rgba(198, 168, 75, 0.2)",
              }}
              variants={panelVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
            >
              {/* ─── Header ─── */}
              <div className="sticky top-0 z-10 flex items-start justify-between p-6 sm:p-8 pb-4 sm:pb-5"
                style={{
                  background: "rgba(255, 255, 255, 0.95)",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                }}
              >
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-brand-cream border border-brand-gold/20">
                    <Icon
                      className="w-6 h-6 text-brand-gold"
                      strokeWidth={1.8}
                    />
                  </div>
                  <div>
                    <h2
                      id="modal-title"
                      className="font-display text-xl sm:text-2xl font-bold text-brand-dark leading-tight"
                    >
                      {service.title}
                    </h2>
                    <p className="font-display text-sm text-brand-gold italic mt-0.5">
                      {service.tagline}
                    </p>
                  </div>
                </div>

                <button
                  onClick={onClose}
                  className="flex-shrink-0 w-9 h-9 rounded-full bg-brand-dark/5 hover:bg-brand-dark/10 flex items-center justify-center transition-colors duration-200"
                  aria-label="Close modal"
                >
                  <X className="w-4 h-4 text-brand-muted" />
                </button>
              </div>

              {/* ─── Gold decorative separator ─── */}
              <div className="px-6 sm:px-8">
                <div className="h-[2px] w-full bg-gradient-to-r from-brand-gold/60 via-brand-gold to-brand-gold/60" />
              </div>

              {/* ─── Content ─── */}
              <div className="p-6 sm:p-8 space-y-6">
                {/* Description */}
                <p className="font-body text-sm sm:text-base leading-relaxed text-brand-body">
                  {service.description}
                </p>

                {/* Features list */}
                <div className="space-y-3">
                  <h3 className="font-body text-xs font-semibold tracking-[0.2em] uppercase text-brand-muted">
                    What We Handle
                  </h3>
                  <ul className="space-y-2.5">
                    {service.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-3"
                      >
                        <CheckCircle2
                          className="w-4 h-4 text-brand-gold flex-shrink-0 mt-0.5"
                          strokeWidth={1.8}
                        />
                        <span className="font-body text-sm text-brand-dark leading-snug">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA Buttons */}
                <div className="pt-2 space-y-3">
                  <button
                    onClick={handleCTAClick}
                    className="group w-full inline-flex items-center justify-center gap-2.5 px-7 py-3.5 bg-brand-gold text-brand-dark font-body font-semibold text-sm rounded-sm transition-all duration-300 hover:bg-brand-gold-light hover:shadow-lg hover:shadow-brand-gold/20"
                  >
                    <span>Book a Consultation</span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                  {onViewFullPage && (
                    <button
                      onClick={() => {
                        onClose();
                        setTimeout(() => onViewFullPage(service.slug), 350);
                      }}
                      className="group w-full inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-brand-gold/30 text-brand-gold font-body font-semibold text-sm rounded-sm transition-all duration-300 hover:border-brand-gold hover:bg-brand-gold/5"
                    >
                      <BookOpen className="w-4 h-4" />
                      <span>View Full Practice Area</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                    </button>
                  )}
                  <p className="text-center font-body text-xs text-brand-muted">
                    Available 24/7 for urgent criminal matters
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
