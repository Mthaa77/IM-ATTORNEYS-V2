"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  Heart,
  FileText,
  Landmark,
  Shield,
  Briefcase,
  Scale,
  ArrowRight,
  ArrowLeft,
  Check,
  Sparkles,
  MessageCircle,
  Clock,
  AlertTriangle,
  Phone,
  ChevronRight,
  Zap,
  Target,
  BookOpen,
  Lightbulb,
  Star,
  RotateCcw,
} from "lucide-react";
import {
  ScrollReveal,
  GoldLine,
} from "@/components/im/ScrollReveal";

/* ══════════════════════════════════════════════════════════════════════
   DATA — Practice Areas & Sub-Issues
   ══════════════════════════════════════════════════════════════════════ */

interface SubIssue {
  id: string;
  label: string;
  icon: React.ElementType;
}

interface PracticeArea {
  id: string;
  title: string;
  icon: React.ElementType;
  tagline: string;
  subIssues: SubIssue[];
  advice: {
    overview: string;
    steps: string[];
    doNot: string[];
    urgencyNote: string;
  };
}

const practiceAreas: PracticeArea[] = [
  {
    id: "family-law",
    title: "Family Law",
    icon: Heart,
    tagline: "Protecting your family's future with compassion",
    subIssues: [
      { id: "divorce", label: "Divorce / Separation", icon: Heart },
      { id: "custody", label: "Child Custody / Access", icon: Scale },
      { id: "maintenance", label: "Maintenance Claims", icon: FileText },
      { id: "protection", label: "Protection Order (DV)", icon: Shield },
      { id: "anc", label: "Ante-Nuptial Contract", icon: BookOpen },
      { id: "parenting", label: "Parenting Plan", icon: Target },
    ],
    advice: {
      overview:
        "Family law matters are deeply personal and time-sensitive. Delays can significantly impact custody arrangements, financial settlements, and most importantly, your family's well-being. South African courts prioritise the best interests of the child, and acting swiftly demonstrates your commitment to a fair resolution.",
      steps: [
        "Gather all relevant documents (marriage certificate, ID, financial records)",
        "Do not sign any agreements without legal review — verbal promises are unenforceable",
        "Document everything: incidents, communications, financial transactions",
        "Consult with us before filing — strategic preparation maximises your outcome",
        "If you feel unsafe, apply for a protection order immediately at your nearest Magistrate's Court",
      ],
      doNot: [
        "Move out of the matrimonial home without legal advice",
        "Sign any settlement offers without attorney review",
        "Discuss your case on social media — it can be used against you",
        "Withhold children from the other parent without a court order",
        "Ignore letters of demand — they carry strict deadlines",
      ],
      urgencyNote:
        "Protection orders can be obtained the same day. Uncontested divorces can be finalised in 4–6 weeks. Delay in custody matters can create precedent against you.",
    },
  },
  {
    id: "criminal-law",
    title: "Criminal Law",
    icon: Shield,
    tagline: "Fiercely defending your freedom and rights 24/7",
    subIssues: [
      { id: "bail", label: "Bail Application", icon: Zap },
      { id: "defence", label: "Criminal Defence", icon: Shield },
      { id: "appeal", label: "Appeal / Review", icon: Scale },
      { id: "sexual", label: "Sexual Offence Charge", icon: AlertTriangle },
      { id: "plea", label: "Plea Negotiation", icon: BookOpen },
      { id: "arrested", label: "Arrested / Detained", icon: Phone },
    ],
    advice: {
      overview:
        "In criminal law, every hour matters. From the moment of arrest, your constitutional rights are in play, and anything you say or do can significantly impact your case. The most critical mistake people make is attempting to handle police interactions alone. Having an attorney from the earliest possible stage is not a luxury — it is a necessity.",
      steps: [
        "Exercise your right to remain silent — do NOT answer police questions without your attorney present",
        "Do NOT make a warning statement without legal counsel — it can be used as evidence against you",
        "Contact us immediately if arrested — we are available 24/7 for emergency bail applications",
        "Preserve all evidence, witnesses' contact details, and CCTV footage if possible",
        "Never consent to a search without a warrant — unless the police have reasonable grounds",
      ],
      doNot: [
        "Speak to the police or make any statements without your attorney present",
        "Resist arrest — it adds an additional charge and weakens your defence",
        "Discuss your case with cellmates or anyone other than your lawyer",
        "Accept a plea deal without understanding the full consequences",
        "Miss any court dates — this can result in a warrant for your arrest",
      ],
      urgencyNote:
        "Bail applications must be filed urgently. We are available 24/7. Delays in contacting an attorney can result in lost evidence, missed bail hearing windows, and weakened defence strategies.",
    },
  },
  {
    id: "claims-vs-state",
    title: "Claims vs State",
    icon: Landmark,
    tagline: "Holding government accountable for justice",
    subIssues: [
      { id: "raf", label: "RAF Claim (Road Accident)", icon: AlertTriangle },
      { id: "medical", label: "Medical Negligence", icon: Shield },
      { id: "police", label: "Police Brutality / Wrongful Arrest", icon: Scale },
      { id: "constitutional", label: "Constitutional Rights Violation", icon: Landmark },
      { id: "human-rights", label: "Human Rights Litigation", icon: Heart },
      { id: "state-liability", label: "State Liability Claim", icon: Briefcase },
    ],
    advice: {
      overview:
        "Claims against the state involve strict prescribed time limits and complex procedural requirements. The RAF prescribes claims within 3 years of the accident, and missing this deadline means permanently losing your right to compensation. Government entities have vast legal resources — you need experienced litigators who understand state protocols to level the playing field.",
      steps: [
        "Report the incident to the relevant authority immediately and obtain a reference number",
        "Seek medical attention and keep ALL records — medical reports form the backbone of your claim",
        "Preserve evidence: photographs, witness statements, CCTV footage, police reports",
        "Lodge your RAF claim within 3 years (or before a child turns 21 for minors)",
        "Document all financial losses including medical expenses, lost income, and future care costs",
      ],
      doNot: [
        "Give recorded statements to state officials without your attorney present",
        "Accept early settlement offers — they almost always undervalue your claim",
        "Miss the 3-year prescription period for RAF claims",
        "Sign any discharge forms or settlement agreements without legal review",
        "Delay seeking medical treatment — gaps in medical records weaken your case",
      ],
      urgencyNote:
        "RAF claims prescribe within 3 years. Police brutality claims have a 6-month notice period. Medical negligence claims require expert medical opinions obtained timeously.",
    },
  },
  {
    id: "wills-estates",
    title: "Wills & Estates",
    icon: FileText,
    tagline: "Preserving your legacy and protecting loved ones",
    subIssues: [
      { id: "will-draft", label: "Draft / Update a Will", icon: FileText },
      { id: "estate-admin", label: "Estate Administration", icon: Briefcase },
      { id: "trust", label: "Trust Formation", icon: Shield },
      { id: "executor", label: "Executor Appointment", icon: Scale },
      { id: "estate-plan", label: "Estate Planning Strategy", icon: Target },
      { id: "intestate", label: "Died Without a Will", icon: AlertTriangle },
    ],
    advice: {
      overview:
        "Without a valid will, your estate is distributed according to the Intestate Succession Act, which may not reflect your wishes and can create unnecessary family conflict. Proper estate planning not only protects your beneficiaries but can significantly reduce estate duty and capital gains tax, preserving more of your hard-earned wealth for the people who matter most.",
      steps: [
        "Compile a comprehensive asset list (properties, investments, policies, bank accounts, vehicles)",
        "Identify your beneficiaries and consider their specific needs and circumstances",
        "Appoint a trustworthy executor — consider professional executor services for complex estates",
        "Review your will after every major life event (marriage, divorce, birth of a child, property purchase)",
        "Consider establishing a trust for minor beneficiaries or to protect assets",
      ],
      doNot: [
        "Use generic online will templates — they often contain legal flaws",
        "Appoint an executor without understanding their duties and potential liabilities",
        "Forget to update your will after major life changes",
        "Assume joint ownership automatically transfers property — it does not always",
        "Delay estate administration — creditors' claims expire after 30 years but interest accumulates",
      ],
      urgencyNote:
        "Drafting a will takes as little as 1–2 weeks. If someone has passed away, estate administration should begin immediately. Estate duty returns must be filed within 12 months of death.",
    },
  },
  {
    id: "commercial-law",
    title: "Commercial Law",
    icon: Briefcase,
    tagline: "Strategic counsel for business growth and protection",
    subIssues: [
      { id: "contracts", label: "Contract Drafting / Review", icon: FileText },
      { id: "dispute", label: "Commercial Dispute", icon: Scale },
      { id: "compliance", label: "BBBEE / POPIA Compliance", icon: Shield },
      { id: "property", label: "Property Transaction", icon: Landmark },
      { id: "governance", label: "Corporate Governance", icon: Briefcase },
      { id: "restructuring", label: "M&A / Restructuring", icon: Target },
    ],
    advice: {
      overview:
        "In commercial law, prevention is always cheaper than cure. A poorly drafted contract can expose your business to millions in liability, and non-compliance with POPIA or BBBEE requirements can result in fines, reputational damage, and loss of lucrative contracts. Proactive legal counsel is an investment that pays for itself many times over.",
      steps: [
        "Have EVERY significant contract reviewed by an attorney before signing",
        "Ensure your BBBEE verification is current and strategically aligned",
        "Implement POPIA compliance measures — the Information Regulator is actively enforcing penalties",
        "Document all business decisions, agreements, and correspondence in writing",
        "Review your shareholder agreement, MOI, and compliance framework annually",
      ],
      doNot: [
        "Sign contracts based on trust alone — verbal agreements are risky and hard to enforce",
        "Ignore letters of demand — they carry strict deadlines and can escalate to litigation",
        "Operate without proper corporate governance — directors can be held personally liable",
        "Delay responding to compliance notices or regulatory inquiries",
        "Attempt to resolve complex commercial disputes without legal representation",
      ],
      urgencyNote:
        "Letters of demand typically carry 7–14 day deadlines. POPIA non-compliance penalties can reach R10 million. BBBEE verification can take 4–6 weeks to complete.",
    },
  },
  {
    id: "general-litigation",
    title: "General Litigation",
    icon: Scale,
    tagline: "Resolving disputes with strategy and determination",
    subIssues: [
      { id: "debt", label: "Debt Recovery", icon: Target },
      { id: "eviction", label: "Tenant Eviction", icon: AlertTriangle },
      { id: "contract-dispute", label: "Contractual Dispute", icon: FileText },
      { id: "arbitration", label: "Arbitration / Mediation", icon: Scale },
      { id: "application", label: "Urgent Court Application", icon: Zap },
      { id: "enforcement", label: "Judgment Enforcement", icon: Shield },
    ],
    advice: {
      overview:
        "Civil litigation requires strategic timing and meticulous preparation. The success of your case often depends on early evidence preservation and procedural compliance. Whether recovering debts, enforcing contractual rights, or seeking urgent court relief, having experienced litigators who understand court procedures and timelines can mean the difference between winning and losing.",
      steps: [
        "Preserve ALL documentary evidence — emails, messages, contracts, invoices, receipts",
        "Send a formal letter of demand before proceeding to court — it is often a prerequisite",
        "Identify and secure witness statements while memories are fresh",
        "Consider alternative dispute resolution (mediation/arbitration) for faster, cheaper outcomes",
        "Act within prescription periods — most civil claims prescribe within 3 years",
      ],
      doNot: [
        "Ignore prescription deadlines — once prescribed, your claim is permanently extinguished",
        "Attempt self-representation in complex matters — court procedure is unforgiving",
        "Destroy or alter any documents — even accidentally, it can be construed as spoliation",
        "Delay enforcement of court judgments — debtors can dissipate assets",
        "File frivolous applications — courts can award costs against vexatious litigants",
      ],
      urgencyNote:
        "Prescription periods are strict (3 years for most claims). Urgent court applications can be heard within hours. Debtors can dissipate assets rapidly — swift enforcement is critical.",
    },
  },
];

const urgencyLevels = [
  {
    id: "emergency",
    label: "Emergency Now",
    icon: AlertTriangle,
    description: "Arrested, in danger, or court deadline today",
    color: "#EF4444",
    badge: "24/7 Immediate Response",
  },
  {
    id: "urgent",
    label: "Urgent — This Week",
    icon: Zap,
    description: "Court date, deadline, or pressing matter",
    color: "#F59E0B",
    badge: "Priority Callback",
  },
  {
    id: "soon",
    label: "Within 2 Weeks",
    icon: Clock,
    description: "Need to consult and plan my approach",
    color: "#C6A84B",
    badge: "Standard Consultation",
  },
  {
    id: "planning",
    label: "Planning / Exploring",
    icon: Sparkles,
    description: "Researching options for the future",
    color: "#E4D49A",
    badge: "Advisory Session",
  },
];

/* ══════════════════════════════════════════════════════════════════════
   ANIMATION VARIANTS
   ══════════════════════════════════════════════════════════════════════ */

const fadeUp = {
  hidden: { opacity: 0, y: 25 },
  visible: (d: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: d, ease: [0.22, 1, 0.36, 1] },
  }),
};

const slideVariants = {
  enter: (dir: number) => ({
    opacity: 0,
    x: dir > 0 ? 80 : -80,
    scale: 0.97,
  }),
  center: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
  exit: (dir: number) => ({
    opacity: 0,
    x: dir > 0 ? -80 : 80,
    scale: 0.97,
    transition: { duration: 0.35, ease: "easeIn" },
  }),
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

/* ══════════════════════════════════════════════════════════════════════
   WHATSAPP HELPER
   ══════════════════════════════════════════════════════════════════════ */

const WA_NUMBER = "270812488048";

function buildWhatsAppURL(selections: {
  area: PracticeArea;
  subIssue: SubIssue;
  urgency: (typeof urgencyLevels)[number];
}): string {
  const text = [
    `*IM Attorneys — Legal Consultation Request*`,
    ``,
    `*Legal Area:* ${selections.area.title}`,
    `*Specific Issue:* ${selections.subIssue.label}`,
    `*Urgency:* ${selections.urgency.label}`,
    `*Service Tier:* ${selections.urgency.badge}`,
    ``,
    `I'd like to book a free consultation with IM Attorneys regarding the above matter. Please contact me at your earliest convenience.`,
    ``,
    `---`,
    `Submitted via imattorneys.co.za`,
  ].join("\n");

  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
}

/* ══════════════════════════════════════════════════════════════════════
   STEP INDICATOR
   ══════════════════════════════════════════════════════════════════════ */

function StepIndicator({
  current,
  total,
}: {
  current: number;
  total: number;
}) {
  return (
    <div className="flex items-center justify-center gap-2">
      {Array.from({ length: total }).map((_, i) => {
        const step = i + 1;
        const isActive = step === current;
        const isComplete = step < current;

        return (
          <div key={i} className="flex items-center gap-2">
            <motion.div
              className="relative flex items-center justify-center"
              animate={{
                width: isActive ? 36 : 28,
                height: isActive ? 36 : 28,
              }}
              transition={{ duration: 0.3 }}
            >
              {/* Active glow ring */}
              {isActive && (
                <motion.div
                  className="absolute inset-[-4px] rounded-full border border-brand-gold/30"
                  animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.15, 0.4] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                />
              )}
              <div
                className="relative flex items-center justify-center rounded-full transition-all duration-500"
                style={{
                  background: isComplete
                    ? "#C6A84B"
                    : isActive
                      ? "linear-gradient(135deg, #C6A84B, #E4D49A)"
                      : "rgba(198, 168, 75, 0.1)",
                  border: isActive
                    ? "2px solid rgba(198, 168, 75, 0.5)"
                    : isComplete
                      ? "2px solid #C6A84B"
                      : "1px solid rgba(198, 168, 75, 0.15)",
                }}
              >
                {isComplete ? (
                  <Check className="w-3.5 h-3.5 text-brand-dark" strokeWidth={3} />
                ) : (
                  <span
                    className="font-body text-xs font-bold"
                    style={{ color: isActive ? "#0D1B2A" : "rgba(198,168,75,0.5)" }}
                  >
                    {step}
                  </span>
                )}
              </div>
            </motion.div>
            {i < total - 1 && (
              <motion.div
                className="w-8 sm:w-12 h-px"
                style={{
                  background: isComplete
                    ? "linear-gradient(90deg, #C6A84B, rgba(198,168,75,0.4))"
                    : "rgba(198, 168, 75, 0.1)",
                }}
                transition={{ duration: 0.5 }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ══════════════════════════════════════════════════════════════════════ */

type Screen = "intro" | "step1" | "step2" | "step3" | "results";

export function PracticeAreaOnboarding() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-60px" });
  const resultsRef = useRef<HTMLDivElement>(null);

  const [screen, setScreen] = useState<Screen>("intro");
  const [direction, setDirection] = useState(1);
  const [selectedArea, setSelectedArea] = useState<PracticeArea | null>(null);
  const [selectedSubIssue, setSelectedSubIssue] = useState<SubIssue | null>(null);
  const [selectedUrgency, setSelectedUrgency] = useState<
    (typeof urgencyLevels)[number] | null
  >(null);

  const stepScreens: Screen[] = ["step1", "step2", "step3"];
  const currentStepIndex = stepScreens.indexOf(screen);
  const totalSteps = 3;

  /* ── Navigation ── */
  const goNext = useCallback(() => {
    setDirection(1);
    if (screen === "intro") setScreen("step1");
    else if (screen === "step1") setScreen("step2");
    else if (screen === "step2") setScreen("step3");
    else if (screen === "step3") setScreen("results");
  }, [screen]);

  const goBack = useCallback(() => {
    setDirection(-1);
    if (screen === "step3") setScreen("step2");
    else if (screen === "step2") setScreen("step1");
    else if (screen === "step1") setScreen("intro");
    else if (screen === "results") setScreen("step3");
  }, [screen]);

  const handleReset = useCallback(() => {
    setDirection(-1);
    setSelectedArea(null);
    setSelectedSubIssue(null);
    setSelectedUrgency(null);
    setScreen("intro");
  }, []);

  const handleAreaSelect = useCallback(
    (area: PracticeArea) => {
      setSelectedArea(area);
      setSelectedSubIssue(null);
      setTimeout(() => goNext(), 300);
    },
    [goNext]
  );

  const handleSubIssueSelect = useCallback(
    (sub: SubIssue) => {
      setSelectedSubIssue(sub);
      setTimeout(() => goNext(), 300);
    },
    [goNext]
  );

  const handleUrgencySelect = useCallback(
    (urgency: (typeof urgencyLevels)[number]) => {
      setSelectedUrgency(urgency);
      setTimeout(() => goNext(), 400);
    },
    [goNext]
  );

  /* ── WhatsApp URL ── */
  const waURL =
    selectedArea && selectedSubIssue && selectedUrgency
      ? buildWhatsAppURL({
          area: selectedArea,
          subIssue: selectedSubIssue,
          urgency: selectedUrgency,
        })
      : "";

  /* ── Scroll to results when shown ── */
  useEffect(() => {
    if (screen === "results" && resultsRef.current) {
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  }, [screen]);

  /* ═══════════════════════════════════════════════════════════════
     RENDER
     ═══════════════════════════════════════════════════════════════ */

  return (
    <section
      ref={sectionRef}
      id="practice-areas"
      className="relative w-full overflow-hidden"
      style={{ backgroundColor: "#0D1B2A" }}
      aria-label="Legal assessment onboarding"
    >
      {/* ── Background atmosphere ── */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute top-0 right-0 w-[700px] h-[700px] pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(198,168,75,0.05) 0%, transparent 60%)",
          }}
        />
        <div
          className="absolute bottom-0 left-0 w-[500px] h-[500px] pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(198,168,75,0.04) 0%, transparent 60%)",
          }}
        />
        <div className="absolute inset-0 noise-overlay opacity-[0.03]" />
      </div>

      {/* ── Top separator ── */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-px z-10"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(198,168,75,0.3) 30%, rgba(198,168,75,0.5) 50%, rgba(198,168,75,0.3) 70%, transparent 100%)",
        }}
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-36">
        {/* ═══════════════════════════════════════════
            SECTION HEADER (visible during intro & steps)
            ═══════════════════════════════════════════ */}
        <AnimatePresence mode="wait">
          {(screen === "intro" || stepScreens.includes(screen)) && (
            <motion.div
              key="header"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className={`text-center mb-12 sm:mb-16 ${screen === "results" ? "hidden" : ""}`}
            >
              {screen === "intro" ? (
                <>
                  <motion.span
                    className="font-body text-[11px] sm:text-xs uppercase tracking-[0.3em] text-brand-gold/80 mb-5 block"
                    variants={fadeUp}
                    initial="hidden"
                    animate="visible"
                    custom={0.1}
                  >
                    Legal Assessment
                  </motion.span>

                  <motion.div
                    className="h-px bg-gradient-to-r from-transparent via-brand-gold/60 to-transparent mx-auto mb-8 max-w-[120px]"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.8, delay: 0.25 }}
                  />

                  <motion.h2
                    className="heading-section mb-5"
                    variants={fadeUp}
                    initial="hidden"
                    animate="visible"
                    custom={0.35}
                  >
                    Find the Right Legal Solution
                  </motion.h2>

                  <motion.p
                    className="font-body text-base sm:text-lg text-white/50 max-w-2xl mx-auto leading-relaxed"
                    variants={fadeUp}
                    initial="hidden"
                    animate="visible"
                    custom={0.5}
                  >
                    Answer 3 quick questions and receive personalised legal guidance
                    — plus a direct line to our attorneys via WhatsApp. It takes
                    less than 60 seconds.
                  </motion.p>
                </>
              ) : (
                <div className="flex flex-col items-center gap-6">
                  <StepIndicator
                    current={currentStepIndex + 1}
                    total={totalSteps}
                  />
                  <div>
                    <AnimatePresence mode="wait">
                      <motion.p
                        key={screen}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        className="font-display text-xl sm:text-2xl lg:text-3xl font-bold text-white"
                      >
                        {screen === "step1" && "What legal challenge are you facing?"}
                        {screen === "step2" &&
                          selectedArea &&
                          `Tell us more about your ${selectedArea.title.toLowerCase()} matter`}
                        {screen === "step3" && "How soon do you need help?"}
                      </motion.p>
                    </AnimatePresence>
                    <p className="font-body text-sm text-white/40 mt-2">
                      {screen === "step1" && "Select the area that best matches your situation"}
                      {screen === "step2" && "Choose the specific issue that applies to you"}
                      {screen === "step3" && "This helps us prioritise your consultation"}
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* ═══════════════════════════════════════════
            INTRO SCREEN — Start Button
            ═══════════════════════════════════════════ */}
        <AnimatePresence mode="wait">
          {screen === "intro" && (
            <motion.div
              key="intro"
              variants={slideVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              custom={direction}
              className="max-w-3xl mx-auto"
            >
              {/* Animated teaser cards */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 mb-12">
                {practiceAreas.slice(0, 6).map((area, i) => {
                  const Icon = area.icon;
                  return (
                    <motion.div
                      key={area.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.6 + i * 0.08 }}
                      className="group flex flex-col items-center gap-3 p-5 sm:p-6 rounded-xl transition-all duration-300 hover:-translate-y-1"
                      style={{
                        background: "rgba(198,168,75,0.04)",
                        border: "1px solid rgba(198,168,75,0.08)",
                      }}
                    >
                      <div
                        className="w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                        style={{
                          background: "rgba(198,168,75,0.08)",
                          border: "1px solid rgba(198,168,75,0.15)",
                        }}
                      >
                        <Icon
                          className="w-5 h-5 text-brand-gold/60 group-hover:text-brand-gold transition-colors duration-300"
                          strokeWidth={1.5}
                        />
                      </div>
                      <span className="font-body text-xs text-white/40 group-hover:text-white/60 transition-colors text-center">
                        {area.title}
                      </span>
                    </motion.div>
                  );
                })}
              </div>

              {/* CTA */}
              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 }}
              >
                <button
                  onClick={goNext}
                  className="group relative inline-flex items-center gap-3 px-10 py-4 rounded-xl font-body font-semibold text-base transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]"
                  style={{
                    background:
                      "linear-gradient(135deg, #C6A84B 0%, #E4D49A 50%, #C6A84B 100%)",
                    backgroundSize: "200% 200%",
                    boxShadow:
                      "0 4px 24px rgba(198,168,75,0.35), 0 0 60px rgba(198,168,75,0.08)",
                    color: "#0D1B2A",
                  }}
                >
                  <Sparkles className="w-5 h-5" />
                  Start Your Free Assessment
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
                <p className="font-body text-xs text-white/30 mt-4">
                  Takes less than 60 seconds &middot; No obligation &middot; 100% confidential
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ═══════════════════════════════════════════
            STEP 1 — Select Practice Area
            ═══════════════════════════════════════════ */}
        <AnimatePresence mode="wait">
          {screen === "step1" && (
            <motion.div
              key="step1"
              variants={slideVariants}
              initial="hidden"
              animate="center"
              exit="exit"
              custom={direction}
              className="max-w-5xl mx-auto"
            >
              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4"
                variants={stagger}
                initial="hidden"
                animate="visible"
              >
                {practiceAreas.map((area, i) => {
                  const Icon = area.icon;
                  const isSelected = selectedArea?.id === area.id;
                  return (
                    <motion.button
                      key={area.id}
                      variants={staggerItem}
                      onClick={() => handleAreaSelect(area)}
                      whileHover={{ y: -4, scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="group relative text-left rounded-xl p-5 sm:p-6 transition-all duration-400 cursor-pointer overflow-hidden"
                      style={{
                        background: isSelected
                          ? "linear-gradient(135deg, rgba(198,168,75,0.15), rgba(198,168,75,0.06))"
                          : "rgba(255,255,255,0.03)",
                        border: isSelected
                          ? "1.5px solid rgba(198,168,75,0.5)"
                          : "1px solid rgba(198,168,75,0.08)",
                        boxShadow: isSelected
                          ? "0 0 40px rgba(198,168,75,0.12)"
                          : "none",
                      }}
                    >
                      {/* Hover spotlight */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                        style={{
                          background:
                            "radial-gradient(300px circle at 50% 50%, rgba(198,168,75,0.06), transparent 60%)",
                        }}
                      />

                      <div className="relative z-10">
                        <div
                          className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 transition-all duration-300"
                          style={{
                            background: isSelected
                              ? "rgba(198,168,75,0.15)"
                              : "rgba(198,168,75,0.06)",
                            border: isSelected
                              ? "1.5px solid rgba(198,168,75,0.4)"
                              : "1px solid rgba(198,168,75,0.1)",
                          }}
                        >
                          <Icon
                            className="w-5 h-5 transition-colors duration-300"
                            style={{ color: isSelected ? "#E4D49A" : "#C6A84B" }}
                            strokeWidth={1.5}
                          />
                        </div>

                        <h3
                          className="font-display text-base sm:text-lg font-bold mb-1.5 transition-colors duration-300"
                          style={{ color: isSelected ? "#E4D49A" : "#F0EDE8" }}
                        >
                          {area.title}
                        </h3>
                        <p className="font-body text-xs leading-relaxed" style={{ color: "rgba(240,237,232,0.35)" }}>
                          {area.tagline}
                        </p>

                        {isSelected && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute top-4 right-4 w-5 h-5 rounded-full bg-brand-gold flex items-center justify-center"
                          >
                            <Check className="w-3 h-3 text-brand-dark" strokeWidth={3} />
                          </motion.div>
                        )}
                      </div>

                      {/* Gold bottom accent on hover */}
                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-px bg-brand-gold/40 group-hover:w-2/3 transition-all duration-500" />
                    </motion.button>
                  );
                })}
              </motion.div>

              {/* Back button */}
              <div className="mt-8 flex justify-center">
                <button
                  onClick={goBack}
                  className="inline-flex items-center gap-2 font-body text-sm text-white/40 hover:text-brand-gold transition-colors duration-300"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ═══════════════════════════════════════════
            STEP 2 — Select Sub-Issue
            ═══════════════════════════════════════════ */}
        <AnimatePresence mode="wait">
          {screen === "step2" && selectedArea && (
            <motion.div
              key="step2"
              variants={slideVariants}
              initial="hidden"
              animate="center"
              exit="exit"
              custom={direction}
              className="max-w-4xl mx-auto"
            >
              {/* Selected area badge */}
              <motion.div
                className="flex items-center justify-center gap-3 mb-8"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold"
                  style={{
                    background: "rgba(198,168,75,0.1)",
                    border: "1px solid rgba(198,168,75,0.2)",
                    color: "#E4D49A",
                  }}
                >
                  {(() => { const Icon = selectedArea.icon; return <Icon className="w-4 h-4" strokeWidth={1.5} />; })()}
                  {selectedArea.title}
                </div>
              </motion.div>

              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4"
                variants={stagger}
                initial="hidden"
                animate="visible"
              >
                {selectedArea.subIssues.map((sub, i) => {
                  const Icon = sub.icon;
                  const isSelected = selectedSubIssue?.id === sub.id;
                  return (
                    <motion.button
                      key={sub.id}
                      variants={staggerItem}
                      onClick={() => handleSubIssueSelect(sub)}
                      whileHover={{ y: -3, scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="group relative text-left rounded-xl p-5 transition-all duration-400 cursor-pointer overflow-hidden"
                      style={{
                        background: isSelected
                          ? "linear-gradient(135deg, rgba(198,168,75,0.15), rgba(198,168,75,0.06))"
                          : "rgba(255,255,255,0.03)",
                        border: isSelected
                          ? "1.5px solid rgba(198,168,75,0.5)"
                          : "1px solid rgba(198,168,75,0.08)",
                        boxShadow: isSelected
                          ? "0 0 30px rgba(198,168,75,0.1)"
                          : "none",
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-300"
                          style={{
                            background: isSelected
                              ? "rgba(198,168,75,0.15)"
                              : "rgba(198,168,75,0.06)",
                            border: isSelected
                              ? "1.5px solid rgba(198,168,75,0.4)"
                              : "1px solid rgba(198,168,75,0.1)",
                          }}
                        >
                          <Icon
                            className="w-4 h-4 transition-colors duration-300"
                            style={{ color: isSelected ? "#E4D49A" : "#C6A84B" }}
                            strokeWidth={1.5}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4
                            className="font-body text-sm font-semibold transition-colors duration-300"
                            style={{ color: isSelected ? "#E4D49A" : "#F0EDE8" }}
                          >
                            {sub.label}
                          </h4>
                        </div>
                        {isSelected && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-5 h-5 rounded-full bg-brand-gold flex items-center justify-center flex-shrink-0"
                          >
                            <Check className="w-3 h-3 text-brand-dark" strokeWidth={3} />
                          </motion.div>
                        )}
                      </div>
                    </motion.button>
                  );
                })}
              </motion.div>

              {/* Back button */}
              <div className="mt-8 flex justify-center">
                <button
                  onClick={goBack}
                  className="inline-flex items-center gap-2 font-body text-sm text-white/40 hover:text-brand-gold transition-colors duration-300"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ═══════════════════════════════════════════
            STEP 3 — Urgency Level
            ═══════════════════════════════════════════ */}
        <AnimatePresence mode="wait">
          {screen === "step3" && (
            <motion.div
              key="step3"
              variants={slideVariants}
              initial="hidden"
              animate="center"
              exit="exit"
              custom={direction}
              className="max-w-3xl mx-auto"
            >
              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4"
                variants={stagger}
                initial="hidden"
                animate="visible"
              >
                {urgencyLevels.map((urg, i) => {
                  const Icon = urg.icon;
                  const isSelected = selectedUrgency?.id === urg.id;
                  return (
                    <motion.button
                      key={urg.id}
                      variants={staggerItem}
                      onClick={() => handleUrgencySelect(urg)}
                      whileHover={{ y: -3, scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="group relative text-left rounded-xl p-5 sm:p-6 transition-all duration-400 cursor-pointer overflow-hidden"
                      style={{
                        background: isSelected
                          ? `linear-gradient(135deg, ${urg.color}22, ${urg.color}0A)`
                          : "rgba(255,255,255,0.03)",
                        border: isSelected
                          ? `1.5px solid ${urg.color}80`
                          : "1px solid rgba(198,168,75,0.08)",
                        boxShadow: isSelected
                          ? `0 0 30px ${urg.color}15`
                          : "none",
                      }}
                    >
                      <div className="relative z-10">
                        <div className="flex items-start justify-between mb-3">
                          <div
                            className="w-11 h-11 rounded-lg flex items-center justify-center"
                            style={{
                              background: `${urg.color}15`,
                              border: `1px solid ${urg.color}30`,
                            }}
                          >
                            <Icon
                              className="w-5 h-5"
                              style={{ color: urg.color }}
                              strokeWidth={1.5}
                            />
                          </div>
                          {isSelected && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="w-5 h-5 rounded-full flex items-center justify-center"
                              style={{ background: urg.color }}
                            >
                              <Check className="w-3 h-3 text-white" strokeWidth={3} />
                            </motion.div>
                          )}
                        </div>

                        <h4
                          className="font-display text-base sm:text-lg font-bold mb-1 transition-colors duration-300"
                          style={{ color: isSelected ? urg.color : "#F0EDE8" }}
                        >
                          {urg.label}
                        </h4>
                        <p className="font-body text-xs leading-relaxed" style={{ color: "rgba(240,237,232,0.35)" }}>
                          {urg.description}
                        </p>
                        <div
                          className="mt-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-semibold uppercase tracking-wider"
                          style={{
                            background: `${urg.color}15`,
                            color: urg.color,
                            border: `1px solid ${urg.color}20`,
                          }}
                        >
                          <Zap className="w-2.5 h-2.5" />
                          {urg.badge}
                        </div>
                      </div>
                    </motion.button>
                  );
                })}
              </motion.div>

              {/* Back button */}
              <div className="mt-8 flex justify-center">
                <button
                  onClick={goBack}
                  className="inline-flex items-center gap-2 font-body text-sm text-white/40 hover:text-brand-gold transition-colors duration-300"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ═══════════════════════════════════════════════════════
            RESULTS SCREEN — Advice + WhatsApp CTA
            ═══════════════════════════════════════════════════════ */}
        <AnimatePresence mode="wait">
          {screen === "results" && selectedArea && selectedSubIssue && selectedUrgency && (
            <motion.div
              key="results"
              ref={resultsRef}
              variants={scaleIn}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.6 }}
              className="max-w-5xl mx-auto"
            >
              {/* ── Results header ── */}
              <motion.div
                className="text-center mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {/* Success icon */}
                <motion.div
                  className="mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-5"
                  style={{
                    background: "linear-gradient(135deg, #C6A84B, #E4D49A)",
                    boxShadow: "0 4px 24px rgba(198,168,75,0.35)",
                  }}
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
                >
                  <Lightbulb className="w-7 h-7 text-brand-dark" />
                </motion.div>

                <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3">
                  Your Personalised{" "}
                  <span className="text-gold-gradient">Legal Guidance</span>
                </h2>
                <p className="font-body text-sm sm:text-base text-white/50 max-w-xl mx-auto">
                  Based on your {selectedArea.title.toLowerCase()} matter, here is
                  our expert recommendation and your recommended next steps.
                </p>
              </motion.div>

              {/* ── Summary pills ── */}
              <motion.div
                className="flex flex-wrap justify-center gap-3 mb-12"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
              >
                {[
                  { icon: selectedArea.icon, label: selectedArea.title },
                  { icon: selectedSubIssue.icon, label: selectedSubIssue.label },
                  { icon: selectedUrgency.icon, label: selectedUrgency.label },
                ].map((pill, i) => (
                  <div
                    key={i}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold"
                    style={{
                      background: "rgba(198,168,75,0.08)",
                      border: "1px solid rgba(198,168,75,0.2)",
                      color: "#E4D49A",
                    }}
                  >
                    <pill.icon className="w-3.5 h-3.5" strokeWidth={1.5} />
                    {pill.label}
                  </div>
                ))}
              </motion.div>

              {/* ── Main content: Advice + WhatsApp side by side ── */}
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-10">
                {/* LEFT: Advice (3 cols) */}
                <motion.div
                  className="lg:col-span-3 space-y-6"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                >
                  {/* Overview */}
                  <div
                    className="rounded-xl p-6"
                    style={{
                      background: "rgba(198,168,75,0.04)",
                      border: "1px solid rgba(198,168,75,0.1)",
                    }}
                  >
                    <div className="flex items-center gap-2 mb-4">
                      <BookOpen className="w-5 h-5 text-brand-gold" strokeWidth={1.5} />
                      <h3 className="font-display text-lg font-bold text-white">
                        Expert Overview
                      </h3>
                    </div>
                    <p className="font-body text-sm leading-[1.8] text-white/65">
                      {selectedArea.advice.overview}
                    </p>
                  </div>

                  {/* Recommended Steps */}
                  <div
                    className="rounded-xl p-6"
                    style={{
                      background: "rgba(255,255,255,0.02)",
                      border: "1px solid rgba(198,168,75,0.08)",
                    }}
                  >
                    <div className="flex items-center gap-2 mb-4">
                      <Target className="w-5 h-5 text-brand-gold" strokeWidth={1.5} />
                      <h3 className="font-display text-lg font-bold text-white">
                        Recommended Next Steps
                      </h3>
                    </div>
                    <ul className="space-y-3">
                      {selectedArea.advice.steps.map((step, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <span
                            className="flex-shrink-0 w-6 h-6 rounded-md flex items-center justify-center text-[11px] font-bold mt-0.5"
                            style={{
                              background: "rgba(198,168,75,0.12)",
                              color: "#C6A84B",
                              border: "1px solid rgba(198,168,75,0.2)",
                            }}
                          >
                            {i + 1}
                          </span>
                          <span className="font-body text-sm leading-relaxed text-white/60">
                            {step}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Critical Mistakes to Avoid */}
                  <div
                    className="rounded-xl p-6"
                    style={{
                      background: "rgba(239,68,68,0.03)",
                      border: "1px solid rgba(239,68,68,0.1)",
                    }}
                  >
                    <div className="flex items-center gap-2 mb-4">
                      <AlertTriangle className="w-5 h-5 text-red-400/80" strokeWidth={1.5} />
                      <h3 className="font-display text-lg font-bold text-white">
                        Critical Mistakes to Avoid
                      </h3>
                    </div>
                    <ul className="space-y-2.5">
                      {selectedArea.advice.doNot.map((item, i) => (
                        <li key={i} className="flex items-start gap-2.5">
                          <span className="flex-shrink-0 text-red-400/60 mt-0.5 text-sm">&#10005;</span>
                          <span className="font-body text-sm leading-relaxed text-white/55">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Urgency note */}
                  <motion.div
                    className="rounded-xl p-5 flex items-start gap-4"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    style={{
                      background: `${selectedUrgency.color}08`,
                      border: `1px solid ${selectedUrgency.color}20`,
                    }}
                  >
                    <Clock
                      className="w-5 h-5 flex-shrink-0 mt-0.5"
                      style={{ color: selectedUrgency.color }}
                      strokeWidth={1.5}
                    />
                    <div>
                      <h4 className="font-body text-sm font-bold mb-1" style={{ color: selectedUrgency.color }}>
                        Timeline &amp; Urgency
                      </h4>
                      <p className="font-body text-sm leading-relaxed text-white/55">
                        {selectedArea.advice.urgencyNote}
                      </p>
                    </div>
                  </motion.div>
                </motion.div>

                {/* RIGHT: WhatsApp CTA (2 cols) — Sticky card */}
                <motion.div
                  className="lg:col-span-2"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                >
                  <div
                    className="lg:sticky lg:top-8 rounded-xl p-6 sm:p-8"
                    style={{
                      background:
                        "linear-gradient(160deg, rgba(37,211,102,0.06) 0%, rgba(198,168,75,0.06) 100%)",
                      border: "1px solid rgba(37,211,102,0.15)",
                    }}
                  >
                    {/* WhatsApp icon */}
                    <div className="flex items-center justify-center mb-5">
                      <div
                        className="w-14 h-14 rounded-full flex items-center justify-center"
                        style={{
                          background: "rgba(37,211,102,0.12)",
                          border: "2px solid rgba(37,211,102,0.25)",
                          boxShadow: "0 0 30px rgba(37,211,102,0.1)",
                        }}
                      >
                        <MessageCircle
                          className="w-6 h-6 text-[#25D366]"
                          fill="#25D366"
                        />
                      </div>
                    </div>

                    <h3 className="font-display text-xl font-bold text-white text-center mb-2">
                      Ready to Take Action?
                    </h3>
                    <p className="font-body text-sm text-white/50 text-center mb-6 leading-relaxed">
                      Tap below to instantly connect with our attorneys on
                      WhatsApp. Your assessment results will be included
                      automatically — no need to repeat yourself.
                    </p>

                    {/* WhatsApp CTA button */}
                    <a
                      href={waURL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-center gap-3 w-full py-4 rounded-xl font-body font-bold text-base transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] mb-4 no-underline"
                      style={{
                        background: "linear-gradient(135deg, #25D366, #128C7E)",
                        boxShadow: "0 4px 20px rgba(37,211,102,0.3)",
                        color: "#FFFFFF",
                      }}
                    >
                      <MessageCircle className="w-5 h-5" fill="white" />
                      Chat on WhatsApp Now
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                    </a>

                    <p className="font-body text-[11px] text-white/30 text-center mb-6">
                      Free &middot; Instant response during business hours &middot; 100% confidential
                    </p>

                    {/* Divider */}
                    <div className="flex items-center gap-3 mb-6">
                      <div className="flex-1 h-px bg-white/10" />
                      <span className="font-body text-[10px] text-white/25 uppercase tracking-widest">or</span>
                      <div className="flex-1 h-px bg-white/10" />
                    </div>

                    {/* Phone CTA */}
                    <a
                      href="tel:+270812488048"
                      className="group flex items-center justify-center gap-2.5 w-full py-3.5 rounded-xl font-body font-semibold text-sm transition-all duration-300 hover:scale-[1.02] no-underline"
                      style={{
                        background: "rgba(198,168,75,0.08)",
                        border: "1.5px solid rgba(198,168,75,0.25)",
                        color: "#E4D49A",
                      }}
                    >
                      <Phone className="w-4 h-4" />
                      Call Direct: 081 248 8048
                    </a>

                    {/* Trust indicators */}
                    <div className="mt-6 pt-5 border-t border-white/5">
                      <div className="flex items-center justify-center gap-4">
                        {[
                          { icon: Shield, label: "Confidential" },
                          { icon: Star, label: "98% Success" },
                          { icon: Clock, label: "24/7 Available" },
                        ].map((item, i) => (
                          <div key={i} className="flex flex-col items-center gap-1">
                            <item.icon className="w-4 h-4 text-brand-gold/50" strokeWidth={1.5} />
                            <span className="font-body text-[10px] text-white/30">{item.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* ── Bottom actions ── */}
              <motion.div
                className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <button
                  onClick={handleReset}
                  className="inline-flex items-center gap-2 font-body text-sm text-white/40 hover:text-brand-gold transition-colors duration-300"
                >
                  <RotateCcw className="w-4 h-4" />
                  Start New Assessment
                </button>
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    const el = document.querySelector("#contact");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="inline-flex items-center gap-2 font-body text-sm font-semibold text-brand-gold hover:text-brand-gold-light transition-colors duration-300"
                >
                  Book Full Consultation
                  <ChevronRight className="w-4 h-4" />
                </a>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Bottom separator ── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px z-10"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(198,168,75,0.3) 30%, rgba(198,168,75,0.5) 50%, rgba(198,168,75,0.3) 70%, transparent 100%)",
        }}
      />
    </section>
  );
}
