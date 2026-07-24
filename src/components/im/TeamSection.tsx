"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Mail, Phone, ArrowRight } from "lucide-react";
import {
  ScrollReveal,
  GoldLine,
  StaggerContainer,
  staggerChildVariants,
} from "./ScrollReveal";
import {
  TeamMemberModal,
  teamMemberDetails,
  type TeamMemberDetail,
} from "./TeamMemberModal";

/* ─── Team Data ─── */

interface TeamMember {
  name: string;
  title: string;
  email: string;
  phone: string;
  image: string;
  bio: string;
  badge?: string;
}

const teamMembers: TeamMember[] = [
  {
    name: "Ingrid Mtsweni",
    title: "Founder & Director",
    email: "attorneys@iminc.co.za",
    phone: "081 248 8048",
    image:
      "/images/ingrid-mtsweni-founder.jpg",
    bio: "Ingrid acquired her LLB degree from the University of Johannesburg in 2018. After completing her articles and being admitted as an Attorney, she was appointed to join the legal department of one of South Africa\u2019s leading banking institutions. During that time, she gained a vast wealth of valuable experience and expanded her skills across different areas of law \u2014 which subsequently led her to found IM Attorneys Inc.",
    badge: "Founder",
  },
  {
    name: "Katlego Seitisho",
    title: "Litigation Attorney",
    email: "katlego@iminc.co.za",
    phone: "071 234 1767",
    image:
      "/images/katlego-seitisho.jpg",
    bio: "Katlego is a skilled litigation attorney with a focus on delivering strategic and effective legal solutions. With extensive courtroom experience, Katlego represents clients in civil and commercial disputes, ensuring the best possible outcomes through meticulous preparation and aggressive advocacy.",
  },
  {
    name: "Mmabatho Moncha",
    title: "Legal Secretary",
    email: "info@iminc.co.za",
    phone: "064 510 9707",
    image:
      "/images/workspace-lounge.jpg",
    bio: "Mmabatho is the backbone of the firm\u2019s administrative operations. With exceptional organisational skills and a warm, professional demeanour, she ensures every client interaction is seamless and that the firm runs efficiently behind the scenes.",
  },
];

/* ─── Founder Spotlight Component ─── */

function FounderSpotlight({
  member,
  onViewProfile,
}: {
  member: TeamMember;
  onViewProfile: (name: string) => void;
}) {
  const handleSpotlightCardMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const el = e.currentTarget;
      const rect = el.getBoundingClientRect();
      el.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
      el.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
    },
    []
  );

  return (
    <motion.article
      variants={staggerChildVariants}
      className="spotlight-card card-glass-organic relative p-6 sm:p-8 lg:p-10 overflow-hidden"
      onMouseMove={handleSpotlightCardMouseMove}
    >
      {/* Floating decorative blobs */}
      <div className="absolute top-4 right-4 w-20 h-20 sm:w-28 sm:h-28 bg-brand-gold/[0.04] blob-1 pointer-events-none" />
      <div className="absolute bottom-6 left-6 w-16 h-16 sm:w-24 sm:h-24 bg-brand-gold/[0.03] blob-3 pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 w-12 h-12 bg-brand-gold-light/[0.03] blob-4 pointer-events-none float-organic" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center lg:items-start gap-6 lg:gap-8">
        {/* Portrait with orbit ring */}
        <div className="relative flex-shrink-0">
          <div className="orbit-ring relative w-48 h-48">
            <div className="img-container-organic w-full h-full">
              <Image
                src={member.image}
                alt={`${member.name} \u2014 ${member.title}`}
                width={192}
                height={192}
                className="w-full h-full object-cover object-top"
                unoptimized
                loading="lazy"
              />
            </div>
          </div>

          {/* Founder badge */}
          {member.badge && (
            <motion.span
              initial={{ opacity: 0, scale: 0.8, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.4 }}
              className="absolute -bottom-2 left-1/2 -translate-x-1/2 inline-flex items-center px-4 py-1.5 rounded-full bg-brand-gold text-white font-body text-[10px] sm:text-xs font-semibold tracking-[0.15em] uppercase shadow-lg shadow-brand-gold/20 z-10"
            >
              {member.badge}
            </motion.span>
          )}
        </div>

        {/* Text content */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left gap-3 flex-1">
          <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-brand-dark leading-tight">
            {member.name}
          </h3>

          <p className="text-gold-gradient font-body text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase">
            {member.title}
          </p>

          {/* Gold divider */}
          <div className="w-12 h-px bg-gradient-to-r from-brand-gold to-brand-gold-light lg:mx-0 mx-auto" />

          {/* Bio */}
          <p className="font-body text-sm sm:text-[15px] leading-relaxed text-brand-body font-light max-w-lg">
            {member.bio}
          </p>

          {/* Contact pill buttons */}
          <div className="flex flex-wrap items-center gap-3 mt-2">
            <a
              href={`mailto:${member.email}`}
              aria-label={`Email ${member.name}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-gold/10 border border-brand-gold/25 font-body text-sm font-medium text-brand-dark hover:bg-brand-gold hover:text-white hover:border-brand-gold transition-all duration-300 hover:shadow-lg hover:shadow-brand-gold/20"
            >
              <Mail className="w-4 h-4 text-brand-gold group-hover:text-white" strokeWidth={1.8} />
              <span>Email</span>
            </a>
            <a
              href={`tel:${member.phone.replace(/\s/g, "")}`}
              aria-label={`Call ${member.name}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-gold/10 border border-brand-gold/25 font-body text-sm font-medium text-brand-dark hover:bg-brand-gold hover:text-white hover:border-brand-gold transition-all duration-300 hover:shadow-lg hover:shadow-brand-gold/20"
            >
              <Phone className="w-4 h-4 text-brand-gold group-hover:text-white" strokeWidth={1.8} />
              <span>{member.phone}</span>
            </a>
          </div>

          {/* View Full Profile link */}
          <button
            onClick={() => onViewProfile(member.name)}
            className="mt-1 font-body text-sm font-medium text-brand-gold link-underline-anim cursor-pointer"
            aria-label={`View full profile of ${member.name}`}
          >
            View Full Profile
          </button>
        </div>
      </div>
    </motion.article>
  );
}

/* ─── Team Member Mini Card ─── */

function TeamMemberCard({
  member,
  onViewProfile,
}: {
  member: TeamMember;
  onViewProfile: (name: string) => void;
}) {
  const handleSpotlightCardMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const el = e.currentTarget;
      const rect = el.getBoundingClientRect();
      el.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
      el.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
    },
    []
  );

  return (
    <motion.article
      variants={staggerChildVariants}
      className="spotlight-card card-ultra-rounded p-5 sm:p-6"
      onMouseMove={handleSpotlightCardMouseMove}
    >
      <div className="relative z-10 flex items-start gap-4">
        {/* Portrait */}
        <div className="flex-shrink-0 relative">
          <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-full border-2 border-brand-gold/30 p-[2px]">
            <div className="w-full h-full rounded-full overflow-hidden bg-brand-parchment">
              <Image
                src={member.image}
                alt={`${member.name} \u2014 ${member.title}`}
                width={112}
                height={112}
                className="w-full h-full object-cover object-top transition-transform duration-500 hover:scale-110"
                unoptimized
                loading="lazy"
              />
            </div>
          </div>
        </div>

        {/* Text content */}
        <div className="flex flex-col gap-1.5 flex-1 min-w-0 pt-1">
          <h4 className="font-display text-lg sm:text-xl font-bold text-brand-dark leading-tight">
            {member.name}
          </h4>
          <p className="font-body text-[11px] sm:text-xs font-semibold tracking-[0.18em] uppercase text-brand-gold">
            {member.title}
          </p>

          {/* Mini divider */}
          <div className="w-8 h-px bg-brand-gold/30 my-1" />

          {/* Short bio */}
          <p className="font-body text-xs sm:text-sm leading-relaxed text-brand-body font-light line-clamp-3 sm:line-clamp-4">
            {member.bio}
          </p>

          {/* View Profile underline link */}
          <button
            onClick={() => onViewProfile(member.name)}
            className="mt-2 self-start font-body text-xs sm:text-sm font-medium text-brand-gold link-underline-anim cursor-pointer"
            aria-label={`View full profile of ${member.name}`}
          >
            View Full Profile
          </button>
        </div>
      </div>
    </motion.article>
  );
}

/* ─── Main TeamSection Component ─── */

export function TeamSection() {
  const [selectedMember, setSelectedMember] =
    useState<TeamMemberDetail | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewProfile = (name: string) => {
    const detail = teamMemberDetails.find((m) => m.name === name);
    if (detail) {
      setSelectedMember(detail);
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedMember(null), 350);
  };

  const founder = teamMembers[0];
  const otherMembers = teamMembers.slice(1);

  return (
    <section
      id="team"
      className="premium-section-surface premium-section-surface--light relative bg-brand-cream overflow-hidden"
      aria-label="Our team"
    >
      {/* ─── Background Decorations ─── */}

      {/* Subtle radial gold glow behind founder */}
      <div
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 25% 40%, rgba(198, 168, 75, 0.05) 0%, transparent 55%)",
        }}
      />

      {/* Floating organic blobs */}
      <div className="absolute top-12 left-8 w-32 h-32 bg-brand-gold/[0.03] blob-2 pointer-events-none" />
      <div className="absolute top-1/3 right-12 w-24 h-24 bg-brand-gold-light/[0.03] blob-1 pointer-events-none float-organic" />
      <div className="absolute bottom-16 left-1/4 w-28 h-28 bg-brand-gold/[0.025] blob-4 pointer-events-none" />
      <div className="absolute bottom-8 right-1/3 w-20 h-20 bg-brand-gold-light/[0.025] blob-3 pointer-events-none float-organic" />

      {/* Decorative SVG circles in corners */}
      <div className="absolute -top-10 -left-10 w-48 h-48 opacity-[0.03] pointer-events-none">
        <svg viewBox="0 0 200 200" fill="none" className="w-full h-full">
          <circle cx="200" cy="200" r="180" stroke="#C6A84B" strokeWidth="1" />
          <circle cx="200" cy="200" r="120" stroke="#C6A84B" strokeWidth="0.5" />
        </svg>
      </div>
      <div className="absolute -bottom-10 -right-10 w-64 h-64 opacity-[0.03] pointer-events-none">
        <svg viewBox="0 0 300 300" fill="none" className="w-full h-full">
          <circle cx="0" cy="0" r="250" stroke="#C6A84B" strokeWidth="1" />
          <circle cx="0" cy="0" r="180" stroke="#C6A84B" strokeWidth="0.5" />
          <circle cx="0" cy="0" r="110" stroke="#C6A84B" strokeWidth="0.5" />
        </svg>
      </div>
      <div className="absolute top-1/4 right-0 w-36 h-36 opacity-[0.02] pointer-events-none hidden lg:block">
        <svg viewBox="0 0 150 150" fill="none" className="w-full h-full">
          <circle cx="0" cy="75" r="60" stroke="#E4D49A" strokeWidth="0.5" fill="none" />
        </svg>
      </div>

      {/* ─── Content ─── */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 lg:py-32">
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
          <ScrollReveal delay={0}>
            <span className="label-premium">Our Team</span>
          </ScrollReveal>

          <div className="mt-4 flex justify-center">
            <GoldLine width={50} />
          </div>

          <ScrollReveal delay={0.15}>
            <h2 className="heading-section-light mt-6">
              The People Behind
              <br className="hidden sm:block" /> IM Attorneys
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.25}>
            <p className="subheading-premium mt-5">
              A dedicated collective of legal minds united by one purpose — to deliver exceptional results with integrity, precision, and the spirit of Ubuntu.
            </p>
          </ScrollReveal>
        </div>

        {/* ─── Asymmetric Editorial Layout ─── */}
        <StaggerContainer
          className="flex flex-col lg:flex-row gap-8 lg:gap-10"
          staggerDelay={0.2}
        >
          {/* LEFT: Founder spotlight — 60% on desktop */}
          <div className="w-full lg:w-[60%]">
            <FounderSpotlight
              member={founder}
              onViewProfile={handleViewProfile}
            />
          </div>

          {/* RIGHT: Stacked team member cards — 40% on desktop */}
          <div className="w-full lg:w-[40%] flex flex-col gap-6 lg:gap-8 relative">
            {/* Vertical gold connecting line between cards (desktop only) */}
            <div className="hidden lg:block absolute left-8 top-[calc(50%-1rem)] bottom-[calc(50%+1rem)] w-px bg-gradient-to-b from-brand-gold/20 via-brand-gold/40 to-brand-gold/20 pointer-events-none" />

            {otherMembers.map((member) => (
              <div key={member.name} className="relative">
                {/* Gold dot on the connecting line (desktop) */}
                <div className="hidden lg:block absolute -left-0 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-brand-gold border-2 border-brand-cream z-10" />
                <TeamMemberCard
                  member={member}
                  onViewProfile={handleViewProfile}
                />
              </div>
            ))}
          </div>
        </StaggerContainer>

        {/* Bottom CTA */}
        <ScrollReveal delay={0.3}>
          <div className="mt-16 sm:mt-20 text-center">
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                const el = document.querySelector("#contact");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="group inline-flex items-center gap-2.5 font-body text-sm font-semibold text-brand-gold hover:text-brand-dark transition-colors duration-300"
            >
              <span className="border-b border-current pb-0.5">
                Get in Touch with Our Team
              </span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </a>
          </div>
        </ScrollReveal>
      </div>

      {/* Team Member Detail Modal */}
      <TeamMemberModal
        member={selectedMember}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </section>
  );
}
