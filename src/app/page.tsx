"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BannerProvider } from "@/components/im/BannerContext";
import { PracticeAreaPage } from "@/components/im/PracticeAreaPage";

import { LoadingScreen } from "@/components/im/LoadingScreen";
import { OnboardingBanner } from "@/components/im/OnboardingBanner";
import { Navigation } from "@/components/im/Navigation";
import { Hero } from "@/components/im/Hero";
import { WelcomeSection } from "@/components/im/WelcomeSection";
import { StatsBar } from "@/components/im/StatsBar";
import { TheFirm } from "@/components/im/TheFirm";
import { ServicesGrid } from "@/components/im/ServicesGrid";
import { EmergencyCTA } from "@/components/im/EmergencyCTA";
import { Founder } from "@/components/im/Founder";
import { TeamSection } from "@/components/im/TeamSection";
import { VacationProgramme } from "@/components/im/VacationProgramme";
import { ParallaxQuote } from "@/components/im/ParallaxQuote";
import { Testimonials } from "@/components/im/Testimonials";
import { FAQSection } from "@/components/im/FAQSection";
import { LegalInsights } from "@/components/im/LegalInsights";
import { ContactForm } from "@/components/im/ContactForm";
import { LocationMap } from "@/components/im/LocationMap";
import { Footer } from "@/components/im/Footer";
import { WhatsAppButton } from "@/components/im/WhatsAppButton";
import { BailFloatingIcon } from "@/components/im/BailFloatingIcon";
import { ClientIntakeOnboarding } from "@/components/im/ClientIntakeOnboarding";
import { NewsletterSection } from "@/components/im/NewsletterSection";
import { TrustBadges } from "@/components/im/TrustBadges";
import { TrackRecord } from "@/components/im/TrackRecord";

import { OurProcess } from "@/components/im/OurProcess";

import { ClientMarquee } from "@/components/im/ClientMarquee";
import { AwardsRecognition } from "@/components/im/AwardsRecognition";
import { CaseResults } from "@/components/im/CaseResults";
import { MilestonesTimeline } from "@/components/im/MilestonesTimeline";
import { LegalResources } from "@/components/im/LegalResources";

import { FeesAndBilling } from "@/components/im/FeesAndBilling";
import { PracticeAreaOnboarding } from "@/components/im/PracticeAreaOnboarding";
import { OfficeHours } from "@/components/im/OfficeHours";

import { BeforeAfterSlider } from "@/components/im/BeforeAfterSlider";


import { ComplianceModals, useComplianceModals } from "@/components/im/ComplianceModals";

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
      <LoadingScreen />
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
            className="min-h-screen overflow-x-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Hero Section */}
            <section id="home">
              <Hero />
            </section>

            {/* Welcome Message from Director */}
            <WelcomeSection />

            {/* Stats Bar */}
            <StatsBar />

            {/* Trust & Certifications */}
            <TrustBadges />

            {/* Client Marquee */}
            <ClientMarquee />

            {/* About / The Firm Section */}
            <section id="about">
              <TheFirm />
            </section>

            {/* Services Section */}
            <section id="services">
              <ServicesGrid onOpenPracticeArea={handleNavigatePracticeArea} />
            </section>

            {/* Practice Area — Interactive Onboarding Assessment */}
            <PracticeAreaOnboarding />

            {/* Our Process */}
            <OurProcess />

            {/* 24/7 Emergency CTA */}
            <EmergencyCTA />

            {/* Founder Spotlight */}
            <Founder />

            {/* Team Section */}
            <section id="team">
              <TeamSection />
            </section>

            {/* Vacation Programme */}
            <VacationProgramme />

            {/* Parallax Quote */}
            <ParallaxQuote />

            {/* Testimonials Section */}
            <section id="testimonials">
              <Testimonials />
            </section>

            {/* Before/After Results Slider */}
            <BeforeAfterSlider />

            {/* Track Record */}
            <TrackRecord />

            {/* Awards & Recognition */}
            <AwardsRecognition />

            {/* Case Results */}
            <CaseResults />

            {/* Milestones Timeline */}
            <MilestonesTimeline />

            {/* Legal Insights */}
            <LegalInsights />

            {/* Legal Resources */}
            <LegalResources />

            {/* Fees & Billing */}
            <FeesAndBilling />

            {/* FAQ Section */}
            <section id="faq">
              <FAQSection />
            </section>

            {/* Contact Section */}
            <section id="contact">
              <ContactForm />
            </section>

            {/* Office Hours */}
            <OfficeHours />

            {/* Location & Map */}
            <LocationMap />

            {/* Newsletter */}
            <NewsletterSection />
          </motion.main>
        )}
      </AnimatePresence>

      {/* Footer — with compliance modal triggers */}
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
