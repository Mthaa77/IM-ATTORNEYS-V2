"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BannerProvider } from "@/components/im/BannerContext";
import { PracticeAreaPage } from "@/components/im/PracticeAreaPage";
import { ComplianceModals, useComplianceModals } from "@/components/im/ComplianceModals";
import dynamic from "next/dynamic";

// ── Above-the-fold: loaded eagerly for instant FCP ──
import { OnboardingBanner } from "@/components/im/OnboardingBanner";
import { Navigation } from "@/components/im/Navigation";
import { Hero } from "@/components/im/Hero";
import { WelcomeSection } from "@/components/im/WelcomeSection";
import { StatsBar } from "@/components/im/StatsBar";
import { TheFirm } from "@/components/im/TheFirm";
import { ServicesGrid } from "@/components/im/ServicesGrid";
import { TrustBadges } from "@/components/im/TrustBadges";

// ── Below-the-fold: lazy-loaded for faster initial load ──
const ClientMarquee = dynamic(
  () => import("@/components/im/ClientMarquee").then((m) => ({ default: m.ClientMarquee })),
  { ssr: false }
);
const PracticeAreaOnboarding = dynamic(
  () => import("@/components/im/PracticeAreaOnboarding").then((m) => ({ default: m.PracticeAreaOnboarding })),
  { ssr: false }
);
const OurProcess = dynamic(
  () => import("@/components/im/OurProcess").then((m) => ({ default: m.OurProcess })),
  { ssr: false }
);
const EmergencyCTA = dynamic(
  () => import("@/components/im/EmergencyCTA").then((m) => ({ default: m.EmergencyCTA })),
  { ssr: false }
);
const Founder = dynamic(
  () => import("@/components/im/Founder").then((m) => ({ default: m.Founder })),
  { ssr: false }
);
const TeamSection = dynamic(
  () => import("@/components/im/TeamSection").then((m) => ({ default: m.TeamSection })),
  { ssr: false }
);
const VacationProgramme = dynamic(
  () => import("@/components/im/VacationProgramme").then((m) => ({ default: m.VacationProgramme })),
  { ssr: false }
);
const ParallaxQuote = dynamic(
  () => import("@/components/im/ParallaxQuote").then((m) => ({ default: m.ParallaxQuote })),
  { ssr: false }
);
const Testimonials = dynamic(
  () => import("@/components/im/Testimonials").then((m) => ({ default: m.Testimonials })),
  { ssr: false }
);
const BeforeAfterSlider = dynamic(
  () => import("@/components/im/BeforeAfterSlider").then((m) => ({ default: m.BeforeAfterSlider })),
  { ssr: false }
);
const TrackRecord = dynamic(
  () => import("@/components/im/TrackRecord").then((m) => ({ default: m.TrackRecord })),
  { ssr: false }
);
const AwardsRecognition = dynamic(
  () => import("@/components/im/AwardsRecognition").then((m) => ({ default: m.AwardsRecognition })),
  { ssr: false }
);
const CaseResults = dynamic(
  () => import("@/components/im/CaseResults").then((m) => ({ default: m.CaseResults })),
  { ssr: false }
);
const MilestonesTimeline = dynamic(
  () => import("@/components/im/MilestonesTimeline").then((m) => ({ default: m.MilestonesTimeline })),
  { ssr: false }
);
const LegalInsights = dynamic(
  () => import("@/components/im/LegalInsights").then((m) => ({ default: m.LegalInsights })),
  { ssr: false }
);
const LegalResources = dynamic(
  () => import("@/components/im/LegalResources").then((m) => ({ default: m.LegalResources })),
  { ssr: false }
);
const FAQSection = dynamic(
  () => import("@/components/im/FAQSection").then((m) => ({ default: m.FAQSection })),
  { ssr: false }
);
const ContactForm = dynamic(
  () => import("@/components/im/ContactForm").then((m) => ({ default: m.ContactForm })),
  { ssr: false }
);
const OfficeHours = dynamic(
  () => import("@/components/im/OfficeHours").then((m) => ({ default: m.OfficeHours })),
  { ssr: false }
);
const LocationMap = dynamic(
  () => import("@/components/im/LocationMap").then((m) => ({ default: m.LocationMap })),
  { ssr: false }
);
const NewsletterSection = dynamic(
  () => import("@/components/im/NewsletterSection").then((m) => ({ default: m.NewsletterSection })),
  { ssr: false }
);
const LegalRiskAssessment = dynamic(
  () => import("@/components/im/LegalRiskAssessment").then((m) => ({ default: m.LegalRiskAssessment })),
  { ssr: false }
);

// ── Floating UI: lazy-loaded (non-critical) ──
const Footer = dynamic(
  () => import("@/components/im/Footer").then((m) => ({ default: m.Footer })),
  { ssr: false }
);
const BailFloatingIcon = dynamic(
  () => import("@/components/im/BailFloatingIcon").then((m) => ({ default: m.BailFloatingIcon })),
  { ssr: false }
);
const WhatsAppButton = dynamic(
  () => import("@/components/im/WhatsAppButton").then((m) => ({ default: m.WhatsAppButton })),
  { ssr: false }
);
const ClientIntakeOnboarding = dynamic(
  () => import("@/components/im/ClientIntakeOnboarding").then((m) => ({ default: m.ClientIntakeOnboarding })),
  { ssr: false }
);
export default function Home() {
  const { openModal, open, close } = useComplianceModals();
  const [activePracticeArea, setActivePracticeArea] = useState<string | null>(null);

  const handleBackToHome = useCallback(() => {
    setActivePracticeArea(null);
  }, []);

  const handleNavigatePracticeArea = useCallback((slug: string) => {
    setActivePracticeArea(slug);
  }, []);

  return (
    <BannerProvider>
      <OnboardingBanner />
      <Navigation activePracticeArea={activePracticeArea} onGoHome={handleBackToHome} />

      <AnimatePresence mode="wait">
        {activePracticeArea ? (
          <PracticeAreaPage
            key={activePracticeArea}
            slug={activePracticeArea}
            onBack={handleBackToHome}
            onNavigate={handleNavigatePracticeArea}
          />
        ) : (
          <motion.main
            key="homepage"
            className="homepage-content min-h-screen overflow-x-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* ── Above the fold (eagerly loaded) ── */}
            <section id="home">
              <Hero />
            </section>

            <WelcomeSection />
            <StatsBar />
            <TrustBadges />

            {/* ── Below the fold (lazy loaded) ── */}
            <ClientMarquee />

            <section id="about">
              <TheFirm />
            </section>

            <section id="services">
              <ServicesGrid onOpenPracticeArea={handleNavigatePracticeArea} />
            </section>

            <PracticeAreaOnboarding />
            <OurProcess />
            <EmergencyCTA />
            <Founder />

            <section id="team">
              <TeamSection />
            </section>

            <VacationProgramme />
            <ParallaxQuote />

            <section id="testimonials">
              <Testimonials />
            </section>

            <BeforeAfterSlider />
            <TrackRecord />
            <AwardsRecognition />
            <CaseResults />
            <MilestonesTimeline />
            <LegalInsights />
            <LegalResources />
            <LegalRiskAssessment />

            <section id="faq">
              <FAQSection />
            </section>

            <section id="contact">
              <ContactForm />
            </section>

            <OfficeHours />
            <LocationMap />
            <NewsletterSection />
          </motion.main>
        )}
      </AnimatePresence>

      {/* Footer */}
      <Footer onOpenModal={open} />

      {/* Floating Action Buttons */}
      <BailFloatingIcon />
      <WhatsAppButton />
      <ClientIntakeOnboarding />

      {/* Regulatory Compliance Modals (POPIA, ECTA, PAIA, FICA, LPC) */}
      <ComplianceModals openModal={openModal} onOpenModal={open} />

    </BannerProvider>
  );
}
