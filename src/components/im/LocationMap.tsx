"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Navigation } from "lucide-react";
import Image from "next/image";
import { ScrollReveal, GoldLine } from "@/components/im/ScrollReveal";

export function LocationMap() {
  return (
    <section className="relative bg-white overflow-hidden corner-gold-tr corner-gold-bl">
      {/* Top decorative line */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-gold/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        {/* Section Header */}
        <ScrollReveal className="text-center mb-12 md:mb-16">
          <span className="label-premium mb-3 block">Our Location</span>
          <h2 className="heading-section-light">
            Find Us in Menlyn Maine
          </h2>
          <div className="flex justify-center">
            <GoldLine width={60} />
          </div>
          <p className="subheading-premium mt-5 max-w-2xl mx-auto">
            Visit us at our prestigious offices in Menlyn Maine, Pretoria&apos;s premier business precinct — where world-class legal counsel meets effortless accessibility.
          </p>
        </ScrollReveal>

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-10">
          {/* Left Side: Info */}
          <ScrollReveal direction="left" className="lg:col-span-2 space-y-6">
            <div className="bg-brand-cream rounded-xl p-6 sm:p-8 space-y-6">
              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-brand-gold/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-brand-gold" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold text-brand-dark mb-1">
                    IM Attorneys Inc
                  </h3>
                  <p className="font-body text-brand-body text-sm leading-relaxed">
                    Pegasus Building
                    <br />
                    210 Amarand Avenue
                    <br />
                    Menlyn Maine, Pretoria
                    <br />
                    0181, South Africa
                  </p>
                </div>
              </div>

              {/* Divider */}
              <div className="h-px bg-brand-border/60" />

              {/* Contact Details */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-brand-gold flex-shrink-0" />
                  <a
                    href="tel:+27812488048"
                    className="font-body text-sm text-brand-body hover:text-brand-gold transition-colors"
                  >
                    081 248 8048
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-brand-gold flex-shrink-0" />
                  <a
                    href="mailto:attorneys@iminc.co.za"
                    className="font-body text-sm text-brand-body hover:text-brand-gold transition-colors"
                  >
                    attorneys@iminc.co.za
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-brand-gold flex-shrink-0" />
                  <span className="font-body text-sm text-brand-body">
                    Mon – Fri: 08:00 – 17:00
                  </span>
                </div>
              </div>

              {/* Divider */}
              <div className="h-px bg-brand-border/60" />

              {/* Directions hint */}
              <div className="bg-brand-dark/5 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Navigation className="w-5 h-5 text-brand-gold flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-body text-sm font-medium text-brand-dark mb-1">
                      Getting Here
                    </p>
                    <p className="font-body text-xs text-brand-body leading-relaxed">
                      Located in the prestigious Menlyn Maine Precinct. Secure
                      underground parking available. Access via Amarand Avenue
                      off Garsfontein Road.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Book a Consultation Button */}
            <motion.a
              href="#contact"
              className="block w-full text-center px-8 py-4 bg-brand-gold hover:bg-brand-gold-light text-brand-dark font-body font-semibold text-sm tracking-wide rounded-sm transition-all duration-300 hover:shadow-[0_4px_16px_rgba(198,168,75,0.3)]"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Book a Consultation
            </motion.a>
          </ScrollReveal>

          {/* Right Side: Map + Workspace Image */}
          <ScrollReveal direction="right" className="lg:col-span-3 flex flex-col gap-6">
            {/* Workspace photo */}
            <div className="relative w-full h-[200px] sm:h-[240px] rounded-xl overflow-hidden shadow-md group">
              <Image
                src="/images/office-building-exterior.jpg"
                alt="IM Attorneys office at Pegasus Building, Menlyn Maine Precinct, Pretoria"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 60vw"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/30 to-transparent" />
              <div className="absolute bottom-3 left-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-dark/70 backdrop-blur-sm text-white text-xs font-body font-medium">
                  <MapPin className="w-3 h-3 text-brand-gold" />
                  Our Modern Workspace
                </span>
              </div>
            </div>

            {/* Google Map */}
            <div className="relative w-full flex-1 min-h-[200px] sm:min-h-[300px] rounded-xl overflow-hidden shadow-[0_8px_32px_rgba(13,27,42,0.1)] border border-brand-border/30">
              {/* Map overlay gradient for polish */}
              <div className="absolute inset-0 pointer-events-none z-10 rounded-xl ring-1 ring-inset ring-black/5" />

              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3587.3!2d28.28!3d-25.78!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sPegasus+Building+Menlyn+Maine+Pretoria!5e0!3m2!1sen!2sza!4v1"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="IM Attorneys Inc - Pegasus Building, Menlyn Maine, Pretoria"
                className="absolute inset-0"
              />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
