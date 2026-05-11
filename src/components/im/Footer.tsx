"use client";

import { useState, useCallback } from "react";
import {
  Instagram,
  Facebook,
  Linkedin,
  MapPin,
  Phone,
  Mail,
  ExternalLink,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const quickLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Our Team", href: "#team" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

const serviceLinks = [
  "Family Law",
  "Wills & Estates",
  "Criminal Law",
  "Commercial Law",
  "Claims vs State",
  "Litigation",
];

const complianceLinks = [
  { label: "Privacy Policy (POPIA)", modalId: "privacy" },
  { label: "Terms & Conditions (ECTA)", modalId: "terms" },
  { label: "PAIA Manual", modalId: "paia" },
  { label: "Cookie Policy", modalId: "cookies" },
  { label: "Complaints Procedure", modalId: "complaints" },
  { label: "Data Subject Rights", modalId: "data-rights" },
  { label: "FICA Compliance Notice", modalId: "fica" },
];

const socialLinks = [
  {
    label: "Instagram",
    href: "https://instagram.com/mtsweniinc",
    icon: Instagram,
  },
  {
    label: "Facebook",
    href: "https://facebook.com/IMAttorneysInc",
    icon: Facebook,
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/company/im-attorneys-inc",
    icon: Linkedin,
  },
];

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface FooterProps {
  onOpenModal?: (modalId: string) => void;
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function Footer({ onOpenModal }: FooterProps) {
  const [hoveredSocial, setHoveredSocial] = useState<string | null>(null);

  const handleSmoothScroll = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      const el = document.querySelector(href);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    },
    [],
  );

  const handleComplianceClick = useCallback(
    (modalId: string) => {
      if (onOpenModal) {
        onOpenModal(modalId);
      }
    },
    [onOpenModal],
  );

  return (
    <footer className="bg-brand-dark text-brand-inverse text-premium-body wave-divider-top">
      {/* Decorative top gold line */}
      <div className="h-px bg-gradient-to-r from-transparent via-brand-gold/60 to-transparent" />

      {/* ============================================ */}
      {/*  Main Footer Content — 4-Column Grid         */}
      {/* ============================================ */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Column 1: Logo, Tagline & Social Icons */}
          <div className="sm:col-span-2 lg:col-span-1">
            <a
              href="#home"
              onClick={(e) => handleSmoothScroll(e, "#home")}
              className="inline-flex items-center gap-3 group mb-6"
            >
              <div className="w-14 h-14 rounded-full border-2 border-brand-gold flex items-center justify-center group-hover:bg-brand-gold/10 transition-colors duration-300">
                <span className="font-display font-bold text-brand-gold text-2xl tracking-wide">
                  IM
                </span>
              </div>
              <div>
                <span className="font-body font-semibold text-brand-inverse text-sm tracking-[0.15em] uppercase block">
                  IM Attorneys
                </span>
                <span className="font-body text-brand-gold text-xs tracking-wider">
                  Inc.
                </span>
              </div>
            </a>
            <p className="font-body text-brand-muted text-sm leading-relaxed max-w-xs">
              Legal service curated for your personal and business needs
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-3 mt-6">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Follow us on ${social.label}`}
                  onMouseEnter={() => setHoveredSocial(social.label)}
                  onMouseLeave={() => setHoveredSocial(null)}
                  className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all duration-300 ${
                    hoveredSocial === social.label
                      ? "border-brand-gold bg-brand-gold/15 text-brand-gold"
                      : "border-brand-navy-light bg-brand-navy/40 text-brand-muted hover:border-brand-gold/50 hover:text-brand-gold/80"
                  }`}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="font-body font-semibold text-xs tracking-[0.2em] uppercase text-brand-gold mb-6">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => handleSmoothScroll(e, link.href)}
                    className="font-body text-sm text-brand-muted hover:text-brand-gold transition-colors duration-200 inline-flex items-center gap-2 group"
                  >
                    <span className="w-0 group-hover:w-3 h-px bg-brand-gold transition-all duration-300" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Practice Areas */}
          <div>
            <h4 className="font-body font-semibold text-xs tracking-[0.2em] uppercase text-brand-gold mb-6">
              Practice Areas
            </h4>
            <ul className="space-y-3">
              {serviceLinks.map((service) => (
                <li key={service}>
                  <a
                    href="#services"
                    onClick={(e) => handleSmoothScroll(e, "#services")}
                    className="font-body text-sm text-brand-muted hover:text-brand-gold transition-colors duration-200 inline-flex items-center gap-2 group"
                  >
                    <span className="w-0 group-hover:w-3 h-px bg-brand-gold transition-all duration-300" />
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Legal & Compliance */}
          <div>
            <h4 className="font-body font-semibold text-xs tracking-[0.2em] uppercase text-brand-gold mb-6">
              Legal & Compliance
            </h4>
            <ul className="space-y-3">
              {complianceLinks.map((link) => (
                <li key={link.modalId}>
                  <button
                    type="button"
                    onClick={() => handleComplianceClick(link.modalId)}
                    className="font-body text-sm text-brand-muted hover:text-brand-gold transition-colors duration-200 inline-flex items-center gap-2 group cursor-pointer"
                  >
                    <span className="w-0 group-hover:w-3 h-px bg-brand-gold transition-all duration-300" />
                    {link.label}
                    <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-60 transition-opacity duration-200 ml-0.5" />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ============================================ */}
        {/*  Contact Info Row                            */}
        {/* ============================================ */}
        <div className="mt-12 pt-8 border-t border-white/[0.06]">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 text-sm text-brand-muted">
            <a
              href="tel:+27812488048"
              className="inline-flex items-start gap-3 hover:text-brand-gold transition-colors duration-200 group"
            >
              <Phone className="w-4 h-4 mt-0.5 text-brand-gold/60 group-hover:text-brand-gold transition-colors shrink-0" />
              <span className="font-body">081 248 8048</span>
            </a>
            <a
              href="mailto:attorneys@iminc.co.za"
              className="inline-flex items-start gap-3 hover:text-brand-gold transition-colors duration-200 group"
            >
              <Mail className="w-4 h-4 mt-0.5 text-brand-gold/60 group-hover:text-brand-gold transition-colors shrink-0" />
              <span className="font-body">attorneys@iminc.co.za</span>
            </a>
            <div className="inline-flex items-start gap-3">
              <MapPin className="w-4 h-4 mt-0.5 text-brand-gold/60 shrink-0" />
              <span className="font-body leading-relaxed">
                Pegasus Building, 210 Amarand Avenue, Menlyn Maine, Pretoria,
                0181
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================ */}
      {/*  Compliance Disclosure Bar                   */}
      {/* ============================================ */}
      <div className="border-t border-brand-gold/20 bg-[#0a1520]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3 text-[11px] leading-relaxed text-brand-muted/70">
            {/* LPC Rule 54 — Firm Identity */}
            <div>
              <p className="font-body">
                <span className="text-brand-inverse font-semibold">
                  I.M Attorneys Inc
                </span>{" "}
                &mdash; Incorporated &middot; Personal Liability Company
              </p>
              <p className="font-body mt-1">
                Director:{" "}
                <span className="text-brand-gold/80">Ingrid Mtsweni (LLB UJ)</span>
              </p>
              <p className="font-body mt-1">
                Regulated by the{" "}
                <span className="text-brand-gold/80">
                  Legal Practice Council of South Africa
                </span>
              </p>
              <p className="font-body mt-1">
                LPC Reference:{" "}
                <span className="text-brand-gold/60 italic">
                  [To be confirmed]
                </span>
              </p>
            </div>

            {/* LPC Rule 54 — Address & Contact */}
            <div>
              <p className="font-body">
                Physical Address: Pegasus Building, 210 Amarand Avenue, Menlyn
                Maine, Pretoria, 0181
              </p>
              <p className="font-body mt-1">
                Tel: 081 248 8048 &nbsp;|&nbsp; Email: attorneys@iminc.co.za
              </p>
              <p className="font-body mt-1">
                Registered with the{" "}
                <span className="text-brand-gold/80">
                  Companies and Intellectual Property Commission (CIPC)
                </span>
              </p>
              <p className="font-body mt-1">
                CIPC Reg:{" "}
                <span className="text-brand-gold/60 italic">
                  [To be confirmed]
                </span>
              </p>
            </div>

            {/* ECTA Section 43 */}
            <p className="font-body md:col-span-2 pt-2 md:pt-0">
              In compliance with the{" "}
              <span className="text-brand-gold/80">
                Electronic Communications and Transactions Act 36 of 2002
              </span>{" "}
              (ECTA)
            </p>

            {/* POPIA, PAIA, Information Officer */}
            <div className="md:col-span-2 flex flex-col sm:flex-row sm:flex-wrap gap-x-6 gap-y-1 pt-1">
              <p className="font-body">
                POPIA: Compliant with the{" "}
                <span className="text-brand-gold/80">
                  Protection of Personal Information Act 4 of 2013
                </span>
              </p>
              <p className="font-body">
                PAIA: Manual available on request &mdash;{" "}
                <span className="text-brand-gold/80">
                  Section 51 of PAIA 2 of 2000
                </span>
              </p>
              <p className="font-body">
                Information Officer:{" "}
                <span className="text-brand-gold/80">Ingrid Mtsweni</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================ */}
      {/*  Copyright Bar                               */}
      {/* ============================================ */}
      <div className="border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-left">
            <p className="font-body text-xs text-brand-muted/70">
              &copy; {new Date().getFullYear()} I.M Attorneys Inc. All Rights
              Reserved.
            </p>
            {/* Social Icons (Desktop Bottom) */}
            <div className="hidden md:flex items-center gap-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="text-brand-muted/40 hover:text-brand-gold/70 transition-colors duration-200"
                >
                  <social.icon className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
