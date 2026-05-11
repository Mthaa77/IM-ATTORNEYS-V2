"use client";

import { useState, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import {
  Scale,
  Shield,
  FileText,
  Gavel,
  Building2,
  ArrowRight,
} from "lucide-react";
import {
  ScrollReveal,
  StaggerContainer,
  staggerChildVariants,
} from "@/components/im/ScrollReveal";
import {
  ServiceDetailModal,
  serviceDetails,
  type ServiceDetail,
} from "@/components/im/ServiceDetailModal";

/* ─── Service data (exact spec) ─── */
interface Service {
  title: string;
  description: string;
  icon: React.ElementType;
  variant: "featured" | "wide" | "normal" | "pill";
}

const services: Service[] = [
  {
    title: "Family Law",
    description:
      "Divorce, custody, ANC contracts, and protection orders — sensitive matters handled with compassion, discretion, and fierce advocacy for your family's future.",
    icon: Scale,
    variant: "featured",
  },
  {
    title: "Wills & Estates",
    description:
      "Your life's work deserves a plan. We draft watertight wills, administer estates, and ensure your legacy reaches the people who matter most.",
    icon: FileText,
    variant: "normal",
  },
  {
    title: "Claims Against the State",
    description:
      "When the system fails you, we fight back. RAF claims, wrongful arrests, medical negligence — we demand the accountability and compensation you deserve.",
    icon: Shield,
    variant: "normal",
  },
  {
    title: "Criminal Law",
    description:
      "Arrested or under investigation? Our criminal defence team responds day or night. We protect your freedom, your reputation, and your rights from the first call.",
    icon: Gavel,
    variant: "normal",
  },
  {
    title: "Commercial Law",
    description:
      "From drafting your first commercial contract to navigating mergers and corporate governance — we help you build, protect, and grow your business with confidence.",
    icon: Building2,
    variant: "wide",
  },
  {
    title: "General Litigation",
    description:
      "Evictions, debt recovery, and debt review removal — the complex matters other firms shy away from. We step in, take control, and get results.",
    icon: Scale,
    variant: "pill",
  },
];

/* ─── Spotlight + morphing bento card ─── */
function BentoServiceCard({
  service,
  onOpen,
}: {
  service: Service;
  onOpen: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const Icon = service.icon;

  const isFeatured = service.variant === "featured";
  const isWide = service.variant === "wide";
  const isPill = service.variant === "pill";

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      cardRef.current.style.setProperty(
        "--mouse-x",
        `${e.clientX - rect.left}px`
      );
      cardRef.current.style.setProperty(
        "--mouse-y",
        `${e.clientY - rect.top}px`
      );
    },
    []
  );

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onClick={onOpen}
      variants={staggerChildVariants}
      whileHover={{ y: -5, transition: { duration: 0.35, ease: "easeOut" } }}
      role="button"
      tabIndex={0}
      aria-label={`Learn more about ${service.title}`}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpen();
        }
      }}
      className={`
        spotlight-card card-glass-organic card-3d-premium glass-3d-card group relative cursor-pointer overflow-hidden hover:shadow-gold-lg
        ${isFeatured ? "md:col-span-2 md:row-span-2" : ""}
        ${isWide ? "md:col-span-2" : ""}
        ${isPill ? "md:col-span-3" : "md:col-span-1"}
      `}
      style={
        {
          "--mouse-x": "50%",
          "--mouse-y": "50%",
          background: isPill
            ? "rgba(13, 27, 42, 0.88)"
            : isFeatured
              ? "linear-gradient(145deg, #F9F8F5 0%, #FFFFFF 60%, #EEE8DC 100%)"
              : isWide
                ? "linear-gradient(135deg, rgba(255,255,255,0.92), rgba(255,255,255,0.85))"
                : "rgba(255, 255, 255, 0.88)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
        } as React.CSSProperties
      }
    >
      {/* ── Mouse-following spotlight overlay ── */}
      <div
        className="pointer-events-none absolute inset-0 z-[2] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(350px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(198, 168, 75, 0.10), transparent 60%)",
        }}
      />

      {/* ── Featured card decorative blob ── */}
      {isFeatured && (
        <div className="absolute -bottom-12 -right-12 h-56 w-56 rounded-full bg-brand-gold/[0.06] blur-3xl pointer-events-none" />
      )}
      {isFeatured && (
        <div className="absolute -top-8 -left-8 h-40 w-40 rounded-full bg-brand-gold/[0.04] blur-2xl pointer-events-none" />
      )}

      {/* ── Card content ── */}
      <div
        className={`relative z-10 ${
          isPill
            ? "flex flex-col sm:flex-row items-center gap-5 sm:gap-8 px-6 sm:px-10 py-7 sm:py-8"
            : isFeatured
              ? "flex flex-col justify-between h-full p-7 sm:p-10 lg:p-12"
              : "p-6 sm:p-7 lg:p-8"
        }`}
      >
        {/* ── Icon in circular gold container ── */}
        <div
          className={`
            relative flex items-center justify-center rounded-full border-2 border-brand-gold/25
            flex-shrink-0
            ${
              isFeatured
                ? "w-[4.5rem] h-[4.5rem] sm:w-[5.5rem] sm:h-[5.5rem]"
                : isPill
                  ? "w-14 h-14"
                  : "w-12 h-12"
            }
          `}
          style={{
            background:
              "linear-gradient(135deg, rgba(198,168,75,0.10), rgba(198,168,75,0.04))",
          }}
        >
          {/* Animated gold ring for featured */}
          {isFeatured && (
            <span className="absolute inset-[-6px] rounded-full border border-brand-gold/20 animate-pulse-gold pointer-events-none" />
          )}
          <Icon
            className={`text-brand-gold transition-transform duration-500 group-hover:scale-110 ${
              isFeatured
                ? "w-6 h-6 sm:w-7 sm:h-7"
                : isPill
                  ? "w-6 h-6"
                  : "w-5 h-5"
            }`}
            strokeWidth={1.8}
          />
        </div>

        {/* ── Text block ── */}
        <div className={isPill ? "flex-1 min-w-0 text-center sm:text-left" : ""}>
          <h3
            className={`font-display font-bold leading-tight ${
              isPill
                ? "text-lg sm:text-xl text-brand-inverse"
                : isFeatured
                  ? "text-xl sm:text-2xl lg:text-[1.75rem] text-brand-dark mb-3"
                  : "text-lg text-brand-dark mb-2"
            }`}
          >
            {service.title}
          </h3>

          <p
            className={`font-body leading-relaxed ${
              isPill
                ? "text-sm text-brand-inverse/70 max-w-2xl"
                : isFeatured
                  ? "text-sm sm:text-[0.94rem] text-brand-body max-w-md"
                  : "text-sm text-brand-body"
            }`}
          >
            {service.description}
          </p>

          {/* CTA */}
          {!isPill && (
            <div className="mt-5 flex items-center gap-2">
              <span className="font-body text-[0.6875rem] font-semibold tracking-[0.14em] uppercase text-brand-gold">
                Explore
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-brand-gold transition-transform duration-300 group-hover:translate-x-1.5" />
            </div>
          )}
        </div>

        {/* Pill card: inline CTA */}
        {isPill && (
          <div className="flex-shrink-0 hidden sm:flex">
            <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-brand-gold/25 text-brand-gold-light font-body text-xs font-semibold tracking-wider uppercase transition-all duration-300 group-hover:border-brand-gold/50 group-hover:bg-brand-gold/10">
              <span>Learn More</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </div>
        )}

        {/* Featured card: large ornamental number */}
        {isFeatured && (
          <span className="absolute bottom-5 right-7 font-display text-7xl sm:text-8xl font-extrabold leading-none text-brand-gold/[0.05] pointer-events-none select-none">
            01
          </span>
        )}
      </div>

      {/* ── Subtle gold left accent on hover ── */}
      <div className="absolute top-0 left-0 w-0 h-full bg-gradient-to-b from-brand-gold via-brand-gold-light to-brand-gold opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:w-[3px] z-[3] pointer-events-none" />
    </motion.div>
  );
}

/* ─── Main Services Grid export ─── */
export function ServicesGrid({ onOpenPracticeArea }: { onOpenPracticeArea?: (slug: string) => void }) {
  const [modalService, setModalService] = useState<ServiceDetail | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenService = (title: string) => {
    const detail = serviceDetails.find((s) => s.title === title);
    if (detail) {
      setModalService(detail);
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setModalService(null), 350);
  };

  return (
    <section
      id="services"
      className="relative py-20 sm:py-28 lg:py-36 bg-brand-cream bg-stripe-pattern overflow-hidden corner-gold-tl corner-gold-br"
      aria-labelledby="services-heading"
    >
      {/* ── Decorative background blobs ── */}
      <div className="blob-morph blob-1 pointer-events-none" />
      <div className="blob-morph blob-2 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── Section header ── */}
        <div className="text-center mb-14 sm:mb-20">
          <ScrollReveal direction="up" delay={0}>
            <span className="label-premium mb-4 block">What We Do</span>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.1}>
            <h2
              id="services-heading"
              className="heading-section-light max-w-3xl mx-auto"
            >
              Six Areas of Law,{" "}
              <span className="text-gold-gradient">One Firm You Can Trust.</span>
            </h2>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.2}>
            <p className="subheading-premium mt-6 max-w-2xl mx-auto">
              From family disputes to high-stakes commercial litigation, our team delivers decisive legal strategies tailored to protect what matters most to you.
            </p>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.3}>
            <div className="mt-7 flex justify-center">
              <div className="ornament-divider">
                <span className="ornament-diamond" />
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* ── Bento grid ── */}
        <StaggerContainer
          className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 lg:gap-6"
          staggerDelay={0.09}
        >
          {services.map((service) => (
            <BentoServiceCard
              key={service.title}
              service={service}
              onOpen={() => handleOpenService(service.title)}
            />
          ))}
        </StaggerContainer>

        {/* ── Bottom CTA ── */}
        <ScrollReveal direction="up" delay={0.35}>
          <div className="mt-14 sm:mt-16 text-center">
            <a
              href="#contact"
              className="btn-premium"
              onClick={(e) => {
                e.preventDefault();
                const el = document.querySelector("#contact");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <span>Discuss Your Case</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>
        </ScrollReveal>
      </div>

      {/* ── Service Detail Modal ── */}
      <ServiceDetailModal
        service={modalService}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onViewFullPage={onOpenPracticeArea}
      />
    </section>
  );
}
