"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  FileText,
  Landmark,
  Shield,
  Briefcase,
  Scale,
  CheckCircle,
  ArrowRight,
  HelpCircle,
  BookOpen,
} from "lucide-react";
import {
  ScrollReveal,
  GoldLine,
} from "@/components/im/ScrollReveal";

/* ────────────────────────────────────────────
   Data Types
   ──────────────────────────────────────────── */

interface ServiceItem {
  title: string;
  description: string;
}

interface PracticeArea {
  id: string;
  title: string;
  icon: React.ElementType;
  description: string;
  whenToConsult: string[];
  keyServices: ServiceItem[];
  faqs: { question: string; answer: string }[];
}

/* ────────────────────────────────────────────
   Rich Content Data for All 6 Practice Areas
   ──────────────────────────────────────────── */

const practiceAreas: PracticeArea[] = [
  {
    id: "family-law",
    title: "Family Law",
    icon: Heart,
    description:
      "We understand that family disputes are deeply personal and emotionally challenging. Our compassionate team provides sensitive, expert guidance through divorce proceedings, custody arrangements, maintenance claims, and protection orders — always prioritising the well-being of your family while fiercely protecting your legal rights.",
    whenToConsult: [
      "You are considering or facing a divorce or separation",
      "You need to establish or modify a custody or access arrangement",
      "You require a protection order against an abusive partner",
      "You want to draft or review an ante-nuptial contract before marriage",
    ],
    keyServices: [
      {
        title: "Divorce & Separation",
        description:
          "Contested and uncontested divorce proceedings with compassionate representation.",
      },
      {
        title: "Child Custody & Access",
        description:
          "Primary residence, contact schedules, and parental rights arrangements.",
      },
      {
        title: "Maintenance Claims",
        description:
          "Spousal and child maintenance calculations, applications, and enforcement.",
      },
      {
        title: "Protection Orders",
        description:
          "Emergency and interim protection orders in domestic violence matters.",
      },
      {
        title: "Ante-Nuptial Contracts",
        description:
          "Drafting and registration of ANC contracts with or without accrual.",
      },
      {
        title: "Parenting Plans",
        description:
          "Customised co-parenting agreements that serve the best interests of the child.",
      },
    ],
    faqs: [
      {
        question: "How long does a divorce take in South Africa?",
        answer:
          "An uncontested divorce can be finalised in as little as 4–6 weeks if all documents are in order. Contested divorces typically take 12–18 months depending on complexity and court schedules.",
      },
      {
        question: "Can I get a protection order the same day?",
        answer:
          "Yes. In emergency situations, you can apply for an interim protection order on the same day at your nearest Magistrate's Court. We can assist with the application process to ensure your safety.",
      },
    ],
  },
  {
    id: "wills-estates",
    title: "Wills & Estates",
    icon: FileText,
    description:
      "Planning for the future is one of the most responsible decisions you can make. Our estate planning practice helps you protect your legacy, ensure your loved ones are provided for, and navigate the complexities of estate administration with efficiency and care — giving you total peace of mind.",
    whenToConsult: [
      "You don't have a valid will or haven't updated yours recently",
      "You've been appointed as an executor and need guidance",
      "You want to establish a trust to protect your assets",
      "A family member has passed away and the estate needs administration",
    ],
    keyServices: [
      {
        title: "Will Drafting",
        description:
          "Legally sound wills that clearly express your final wishes and protect beneficiaries.",
      },
      {
        title: "Estate Administration",
        description:
          "Complete winding-up of deceased estates including asset distribution and debt settlement.",
      },
      {
        title: "Executor Appointment",
        description:
          "Professional executor services to ensure efficient and compliant estate management.",
      },
      {
        title: "Trust Formation",
        description:
          "Inter vivos and testamentary trusts for asset protection and succession planning.",
      },
      {
        title: "Estate Planning Strategy",
        description:
          "Comprehensive tax-efficient strategies to minimise estate duty and preserve wealth.",
      },
    ],
    faqs: [
      {
        question: "What happens if I die without a will?",
        answer:
          "If you die intestate (without a will), your estate is distributed according to the Intestate Succession Act, which may not reflect your wishes. Spouses, children, and parents inherit in a predetermined order that may exclude loved ones you intended to provide for.",
      },
      {
        question: "How long does estate administration take?",
        answer:
          "Estate administration typically takes 6–12 months for straightforward estates. Complex estates with business interests, properties in multiple jurisdictions, or disputes can take significantly longer. We work diligently to expedite the process.",
      },
    ],
  },
  {
    id: "claims-vs-state",
    title: "Claims vs State",
    icon: Landmark,
    description:
      "When state organs fail in their duty of care, ordinary citizens deserve recourse. Our dedicated team specialises in holding government entities accountable — from Road Accident Fund claims and medical negligence to police brutality and constitutional rights violations. We fight tenaciously for the compensation and justice you deserve.",
    whenToConsult: [
      "You've been injured in a road accident caused by another party",
      "You've suffered due to medical negligence at a state hospital",
      "You've been a victim of police brutality or wrongful arrest",
      "Your constitutional rights have been violated by a government body",
    ],
    keyServices: [
      {
        title: "RAF Claims",
        description:
          "Road Accident Fund claims for bodily injuries, loss of earnings, and medical expenses.",
      },
      {
        title: "Medical Negligence",
        description:
          "Claims against state and private healthcare providers for substandard treatment.",
      },
      {
        title: "Police Brutality",
        description:
          "Civil claims for assault, wrongful arrest, detention, and malicious prosecution.",
      },
      {
        title: "Constitutional Rights",
        description:
          "Challenging unconstitutional laws, policies, or administrative decisions.",
      },
      {
        title: "State Liability",
        description:
          "Claims for damages caused by state organs failing in their legal duties.",
      },
      {
        title: "Human Rights Litigation",
        description:
          "Strategic litigation to advance and protect fundamental human rights.",
      },
    ],
    faqs: [
      {
        question: "How long do I have to lodge a RAF claim?",
        answer:
          "You must lodge a claim with the RAF within 3 years of the accident date. If a child is involved, the claim must be lodged before the child turns 21. We recommend consulting us as soon as possible to preserve evidence and build a strong case.",
      },
      {
        question: "Can I claim for emotional trauma from police brutality?",
        answer:
          "Yes. South African law recognises claims for emotional and psychological trauma resulting from police misconduct. Damages can include compensation for pain and suffering, emotional shock, PTSD, and loss of quality of life.",
      },
    ],
  },
  {
    id: "criminal-law",
    title: "Criminal Law",
    icon: Shield,
    description:
      "Facing criminal charges is one of the most stressful experiences a person can endure. Our experienced criminal defence team provides robust, fearless representation at every stage — from urgent 24/7 bail applications to complex trials and appeals. We safeguard your constitutional rights and pursue every avenue for the best possible outcome.",
    whenToConsult: [
      "You or a loved one has been arrested or is facing criminal charges",
      "You need an urgent bail application at any hour of the day or night",
      "You've been contacted by the police for questioning or a warning statement",
      "You want to appeal a criminal conviction or sentence",
    ],
    keyServices: [
      {
        title: "Bail Applications",
        description:
          "24/7 urgent bail applications at police stations and courts across all jurisdictions.",
      },
      {
        title: "Criminal Defence",
        description:
          "Full trial representation for offences ranging from theft to complex fraud cases.",
      },
      {
        title: "Appeals & Reviews",
        description:
          "Challenging convictions and sentences through higher court appeals and reviews.",
      },
      {
        title: "Plea Negotiations",
        description:
          "Strategic plea bargaining to secure favourable outcomes and reduced sentences.",
      },
      {
        title: "Sexual Offences",
        description:
          "Specialised, sensitive defence in sexual offence matters with strict confidentiality.",
      },
      {
        title: "Pre-Trial Strategy",
        description:
          "Thorough case analysis, evidence review, and defence strategy development.",
      },
    ],
    faqs: [
      {
        question: "Do I have the right to remain silent?",
        answer:
          "Yes. The South African Constitution guarantees your right to remain silent and your right not to be compelled to give self-incriminating evidence. You are not required to answer police questions without your attorney present, and we strongly advise against doing so.",
      },
      {
        question: "What should I do if I'm arrested?",
        answer:
          "Remain calm, do not resist arrest, and immediately request to contact your lawyer. You have the right to be informed of the charges, the right to remain silent, and the right to legal representation. Contact us immediately — we are available 24/7 for emergencies.",
      },
    ],
  },
  {
    id: "commercial-law",
    title: "Commercial Law",
    icon: Briefcase,
    description:
      "In today's complex business environment, sound legal counsel is essential for growth and protection. Our commercial law team provides pragmatic, commercially aware advice on contracts, corporate governance, compliance, and dispute resolution — helping you navigate regulatory challenges and safeguard your business interests effectively.",
    whenToConsult: [
      "You're entering a significant business contract or partnership agreement",
      "You're facing a commercial dispute or breach of contract",
      "You need guidance on BBBEE compliance or regulatory requirements",
      "You're buying, selling, or leasing commercial property",
    ],
    keyServices: [
      {
        title: "Contract Drafting & Review",
        description:
          "Tailored commercial agreements that protect your interests and minimise risk.",
      },
      {
        title: "Commercial Disputes",
        description:
          "Resolution of business conflicts through negotiation, mediation, or litigation.",
      },
      {
        title: "Regulatory Compliance",
        description:
          "BBBEE, POPIA, and industry-specific compliance advisory and implementation.",
      },
      {
        title: "Property Transactions",
        description:
          "Conveyancing, commercial leases, property development, and sectional title matters.",
      },
      {
        title: "Corporate Governance",
        description:
          "Board advisory, shareholder agreements, and Companies Act compliance.",
      },
      {
        title: "Business Restructuring",
        description:
          "Mergers, acquisitions, liquidations, and business rescue proceedings.",
      },
    ],
    faqs: [
      {
        question: "Is a verbal agreement legally binding?",
        answer:
          "In many cases, yes — verbal agreements can be legally enforceable under South African law. However, certain types of agreements must be in writing to be valid, such as sale of immovable property, credit agreements, and leases longer than 10 years. We strongly recommend formal written contracts.",
      },
      {
        question: "Do I need a lawyer for BBBEE compliance?",
        answer:
          "While not legally required, proper BBBEE compliance involves complex scoring criteria, verification processes, and strategic planning. We provide comprehensive advisory to help you achieve optimal scores, avoid common pitfalls, and leverage compliance for business growth.",
      },
    ],
  },
  {
    id: "general-litigation",
    title: "General Litigation",
    icon: Scale,
    description:
      "When disputes cannot be resolved through negotiation, you need determined, experienced litigators in your corner. Our litigation team handles a broad spectrum of civil disputes — from debt recovery and contractual claims to evictions and arbitration — with the strategic focus and courtroom expertise to deliver results.",
    whenToConsult: [
      "You're involved in a civil dispute that requires court intervention",
      "You need to recover outstanding debts or enforce a contractual right",
      "You're a landlord dealing with a tenant dispute or eviction",
      "You require alternative dispute resolution through arbitration or mediation",
    ],
    keyServices: [
      {
        title: "Civil Disputes",
        description:
          "Resolution of contractual, delictual, and property-related disputes in all courts.",
      },
      {
        title: "Debt Recovery",
        description:
          "Strategic debt collection through letters of demand, summons, and judgment enforcement.",
      },
      {
        title: "Eviction Proceedings",
        description:
          "Lawful eviction of residential and commercial tenants in compliance with PIEA.",
      },
      {
        title: "Contractual Disputes",
        description:
          "Interpretation, enforcement, and rescission of commercial and civil contracts.",
      },
      {
        title: "Arbitration & Mediation",
        description:
          "Alternative dispute resolution for faster, cost-effective outcomes outside court.",
      },
      {
        title: "Application Proceedings",
        description:
          "Urgent and interlocutory applications for interim relief and specific performance.",
      },
    ],
    faqs: [
      {
        question: "How long does a civil lawsuit take?",
        answer:
          "Timelines vary significantly depending on complexity. A straightforward debt recovery matter may resolve in 3–6 months, while complex contractual disputes can take 1–3 years. We work to resolve matters as efficiently as possible, including through settlement negotiations.",
      },
      {
        question: "What is the difference between arbitration and litigation?",
        answer:
          "Litigation involves court proceedings in the public judicial system, while arbitration is a private process where an independent arbitrator makes a binding decision. Arbitration is typically faster, more confidential, and less formal, but the decision is equally enforceable in law.",
      },
    ],
  },
];

/* ────────────────────────────────────────────
   Animation Variants
   ──────────────────────────────────────────── */

const tabContentVariants = {
  initial: { opacity: 0, y: 20, transition: { duration: 0.3, ease: "easeOut" } },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.25, ease: "easeIn" } },
};

/* ────────────────────────────────────────────
   Tab Button Component
   ──────────────────────────────────────────── */

function TabButton({
  area,
  isActive,
  onClick,
  tabIndex,
}: {
  area: PracticeArea;
  isActive: boolean;
  onClick: () => void;
  tabIndex: number;
}) {
  const Icon = area.icon;

  return (
    <button
      type="button"
      role="tab"
      aria-selected={isActive}
      aria-controls={`panel-${area.id}`}
      tabIndex={isActive ? 0 : -1}
      onClick={onClick}
      onKeyDown={undefined} // handled at tablist level
      className={`
        flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap
        transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2
        ${
          isActive
            ? "bg-brand-gold text-white shadow-md shadow-brand-gold/25"
            : "bg-white text-slate-700 border border-gray-200 hover:border-brand-gold/50 hover:text-brand-dark"
        }
      `}
    >
      <Icon className="w-4 h-4 flex-shrink-0" strokeWidth={1.75} />
      <span className="font-body">{area.title}</span>
    </button>
  );
}

/* ────────────────────────────────────────────
   Tab Content Panel Component
   ──────────────────────────────────────────── */

function TabContentPanel({ area, onOpenPracticeArea }: { area: PracticeArea; onOpenPracticeArea?: (slug: string) => void }) {
  const Icon = area.icon;

  return (
    <motion.div
      key={area.id}
      variants={tabContentVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      id={`panel-${area.id}`}
      role="tabpanel"
      aria-labelledby={`tab-${area.id}`}
      className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12"
    >
      {/* ── Left Column ── */}
      <div className="flex flex-col">
        {/* Icon */}
        <div className="w-16 h-16 rounded-xl bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center mb-5">
          <Icon className="w-7 h-7 text-brand-gold" strokeWidth={1.75} />
        </div>

        {/* Title */}
        <h3 className="font-display text-2xl font-bold text-brand-dark mb-3">
          {area.title}
        </h3>

        {/* Gold divider */}
        <div className="h-0.5 w-14 bg-brand-gold mb-5" />

        {/* Description */}
        <p className="font-body text-muted-foreground leading-relaxed text-base mb-6">
          {area.description}
        </p>

        {/* When to consult */}
        <div>
          <h4 className="font-body text-sm font-semibold tracking-wider uppercase text-brand-gold mb-3">
            When to Consult Us
          </h4>
          <ul className="space-y-2.5">
            {area.whenToConsult.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <CheckCircle
                  className="w-4.5 h-4.5 text-brand-gold flex-shrink-0 mt-0.5"
                  strokeWidth={2}
                />
                <span className="font-body text-sm text-brand-body leading-relaxed">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ── Right Column ── */}
      <div className="flex flex-col">
        {/* Key Services */}
        <div className="mb-8">
          <h4 className="font-body text-sm font-semibold tracking-wider uppercase text-brand-gold mb-4">
            Key Services
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {area.keyServices.map((service, idx) => (
              <div
                key={idx}
                className="rounded-lg p-4 bg-brand-parchment/50 border-l-[3px] border-brand-gold"
              >
                <h5 className="font-body font-medium text-sm text-brand-dark mb-1">
                  {service.title}
                </h5>
                <p className="font-body text-xs text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Common Questions */}
        <div className="mb-8">
          <h4 className="font-body text-sm font-semibold tracking-wider uppercase text-brand-gold mb-4 flex items-center gap-2">
            <HelpCircle className="w-4 h-4" strokeWidth={1.75} />
            Common Questions
          </h4>
          <div className="space-y-4">
            {area.faqs.map((faq, idx) => (
              <div key={idx} className="rounded-lg bg-white border border-gray-100 p-4">
                <h5 className="font-body font-medium text-sm text-brand-dark mb-2">
                  {faq.question}
                </h5>
                <p className="font-body text-xs text-muted-foreground leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTAs */}
        <div className="mt-auto flex flex-col sm:flex-row gap-3">
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              const el = document.querySelector("#contact");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            className="group inline-flex items-center gap-2.5 px-7 py-3 bg-brand-dark text-brand-inverse font-body font-semibold text-sm rounded-lg transition-all duration-300 hover:bg-brand-navy hover:shadow-lg hover:shadow-brand-shadow focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2 outline-none"
          >
            <span>Discuss Your Case</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
          {onOpenPracticeArea && (
            <button
              onClick={() => onOpenPracticeArea(area.id)}
              className="group inline-flex items-center gap-2 px-6 py-3 border-2 border-brand-gold/30 text-brand-gold font-body font-semibold text-sm rounded-lg transition-all duration-300 hover:border-brand-gold hover:bg-brand-gold/5 focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2 outline-none"
            >
              <BookOpen className="w-4 h-4" />
              <span>View Full Details</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}

/* ────────────────────────────────────────────
   Main Component
   ──────────────────────────────────────────── */

export function PracticeAreaExplorer({ onOpenPracticeArea }: { onOpenPracticeArea?: (slug: string) => void }) {
  const [activeTab, setActiveTab] = useState(0);
  const tabListRef = useRef<HTMLDivElement>(null);

  /* ── Keyboard Navigation ── */
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      let nextIndex = activeTab;

      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        nextIndex = (activeTab + 1) % practiceAreas.length;
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        nextIndex = (activeTab - 1 + practiceAreas.length) % practiceAreas.length;
      } else if (e.key === "Home") {
        e.preventDefault();
        nextIndex = 0;
      } else if (e.key === "End") {
        e.preventDefault();
        nextIndex = practiceAreas.length - 1;
      } else {
        return;
      }

      setActiveTab(nextIndex);

      // Focus the newly active tab button
      const tabButtons = tabListRef.current?.querySelectorAll<HTMLButtonElement>(
        '[role="tab"]'
      );
      if (tabButtons && tabButtons[nextIndex]) {
        tabButtons[nextIndex].focus();
        // Scroll tab into view on mobile
        tabButtons[nextIndex].scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        });
      }
    },
    [activeTab]
  );

  /* ── Handle tab selection ── */
  const handleTabSelect = useCallback((index: number) => {
    setActiveTab(index);
  }, []);

  /* ── Ensure active tab button is focused on mount and tab change ── */
  useEffect(() => {
    const tabButtons = tabListRef.current?.querySelectorAll<HTMLButtonElement>(
      '[role="tab"]'
    );
    if (tabButtons && tabButtons[activeTab]) {
      tabButtons[activeTab].setAttribute("tabIndex", "0");
      tabButtons.forEach((btn, i) => {
        if (i !== activeTab) {
          btn.setAttribute("tabIndex", "-1");
        }
      });
    }
  }, [activeTab]);

  return (
    <section
      id="practice-areas"
      className="relative bg-white py-20 sm:py-28 lg:py-32 overflow-hidden"
      aria-labelledby="practice-areas-heading"
    >
      {/* Background section number */}
      <span className="section-number" aria-hidden="true">
        05
      </span>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── Section Header ── */}
        <div className="text-center mb-12 sm:mb-16">
          <ScrollReveal direction="up" delay={0}>
            <span className="label-premium mb-4 block">Practice Areas</span>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.1}>
            <h2
              id="practice-areas-heading"
              className="heading-section-light"
            >
              Explore Our Practice Areas
            </h2>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.15}>
            <div className="divider-gold-fancy mt-5" />
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.2}>
            <p className="subheading-premium mt-6 max-w-2xl mx-auto">
              Click on any practice area below to discover the depth of our expertise — and how we turn complex legal challenges into clear, successful outcomes.
            </p>
          </ScrollReveal>
        </div>

        {/* ── Tab Buttons ── */}
        <ScrollReveal direction="up" delay={0.25}>
          <div
            ref={tabListRef}
            role="tablist"
            aria-label="Practice areas"
            aria-orientation="horizontal"
            className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10 sm:mb-12"
            onKeyDown={handleKeyDown}
          >
            {practiceAreas.map((area, index) => (
              <TabButton
                key={area.id}
                area={area}
                isActive={activeTab === index}
                onClick={() => handleTabSelect(index)}
                tabIndex={activeTab === index ? 0 : -1}
              />
            ))}
          </div>
        </ScrollReveal>

        {/* ── Tab Content ── */}
        <div className="bg-brand-cream/40 rounded-2xl border border-brand-border/50 p-6 sm:p-8 lg:p-10 min-h-[480px]">
          <AnimatePresence mode="wait">
            <TabContentPanel area={practiceAreas[activeTab]} onOpenPracticeArea={onOpenPracticeArea} />
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
