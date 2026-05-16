"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { ScrollReveal, GoldLine } from "@/components/im/ScrollReveal";

export function TheFirm() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      id="about"
      className="relative py-20 sm:py-28 lg:py-36 overflow-hidden bg-dot-pattern"
      style={{ backgroundColor: "#F9F8F5" }}
      aria-labelledby="the-firm-heading"
    >
      {/* Fancy gold divider above section */}
      <div className="flex justify-center mb-16 sm:mb-20">
        <div className="divider-gold-fancy" />
      </div>

      <div ref={sectionRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="label-premium mb-4 block">The Firm</span>
          <h2 id="the-firm-heading" className="heading-section-light mb-6">A Law Firm Built on Principle, Driven by Results</h2>
          <p className="subheading-premium mb-8">We are not just another law firm. We are a female-led, black-owned practice that blends decades of legal mastery with an unwavering commitment to our clients and our community.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left Column — Pull Quote + Team Image */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center lg:justify-start lg:pt-8 gap-10">
            <ScrollReveal direction="left" delay={0.1} duration={0.8}>
              <div className="relative max-w-md">
                {/* Decorative gold quotation mark */}
                <motion.span
                  className="absolute -top-6 -left-4 sm:-top-8 sm:-left-6 font-display text-brand-gold text-7xl sm:text-8xl lg:text-9xl leading-none select-none"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                >
                  &ldquo;
                </motion.span>

                <blockquote className="relative z-10 pl-6 sm:pl-10">
                  <p
                    className="font-display text-2xl sm:text-3xl lg:text-4xl font-medium italic leading-snug sm:leading-snug"
                    style={{ color: "#C6A84B" }}
                  >
                    We wear the law on our sleeve.
                  </p>
                </blockquote>

                {/* Thin gold accent line below quote */}
                <motion.div
                  className="h-0.5 bg-brand-gold mt-6 ml-6 sm:ml-10"
                  initial={{ width: 0 }}
                  animate={isInView ? { width: "80px" } : { width: 0 }}
                  transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
                />

                <motion.p
                  className="mt-4 ml-6 sm:ml-10 font-body text-sm tracking-widest uppercase"
                  style={{ color: "#7A8A9C" }}
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.6, delay: 1 }}
                >
                  Ingrid Mtsweni, Founder
                </motion.p>
              </div>
            </ScrollReveal>

            {/* Team discussion photo */}
            <ScrollReveal direction="left" delay={0.3} duration={0.8}>
              <div className="relative w-full max-w-md rounded-sm overflow-hidden shadow-lg group">
                <div className="aspect-[4/3] relative">
                  <Image
                    src="/images/team-discussion.jpg"
                    alt="IM Attorneys team collaborating in their Menlyn Maine office"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    loading="lazy"
                  />
                </div>
                {/* Bottom gold gradient */}
                <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-brand-dark/30 to-transparent" />
                {/* Gold accent border */}
                <div className="absolute inset-0 rounded-sm border border-brand-gold/20 pointer-events-none" />
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column — Firm Description */}
          <div className="lg:col-span-7">
            <ScrollReveal direction="right" delay={0.2} duration={0.8}>
              <div className="space-y-5 sm:space-y-6 max-w-2xl">
                <p className="font-body text-base sm:text-lg leading-relaxed" style={{ color: "#3A4A5C" }}>
                  IM Attorneys Inc is a proudly South African, 100% female black-owned boutique law firm —
                  a distinction we wear with purpose. Founded in February 2023 by Ingrid Mtsweni, the firm was born
                  from a simple yet powerful conviction: that every person deserves world-class legal representation,
                  delivered with empathy, integrity, and an unwavering commitment to Ubuntu.
                </p>

                <p className="font-body text-base sm:text-lg leading-relaxed" style={{ color: "#3A4A5C" }}>
                  We are not a volume-driven practice. We are a deliberately small, deeply dedicated team
                  that knows your name, understands your story, and treats your matter as if it were our own.
                  Our size is our strength — it means you receive the full attention of experienced attorneys,
                  not a junior in a cubicle.
                </p>

                <p className="font-body text-base sm:text-lg leading-relaxed" style={{ color: "#3A4A5C" }}>
                  Rooted in Pretoria&apos;s prestigious Menlyn Maine Precinct, we serve individuals and businesses
                  across Gauteng and beyond. Whether you are safeguarding your family&apos;s future, protecting your
                  legacy, or defending your rights — we bring big-firm expertise with the heart and
                  responsiveness that only a true boutique practice can deliver.
                </p>

                {/* Team collaboration image */}
                <ScrollReveal direction="right" delay={0.5} duration={0.8}>
                  <div className="relative w-full max-w-lg rounded-sm overflow-hidden shadow-md group my-8">
                    <div className="aspect-[16/9] relative">
                      <Image
                        src="/images/team-collaboration.jpg"
                        alt="IM Attorneys team collaborating on complex legal matters"
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 1024px) 100vw, 55vw"
                        loading="lazy"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/20 via-transparent to-transparent" />
                    <div className="absolute inset-0 rounded-sm border border-brand-gold/15 pointer-events-none" />
                  </div>
                </ScrollReveal>

                {/* CTA Link */}
                <motion.div
                  className="pt-4"
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                >
                  <a
                    href="#about"
                    className="group inline-flex items-center gap-2 font-body font-semibold text-sm tracking-wide transition-colors duration-300"
                    style={{ color: "#C6A84B" }}
                    onClick={(e) => {
                      e.preventDefault();
                      const el = document.querySelector("#about");
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    <span className="relative">
                      Discover Our Difference
                      <span className="absolute bottom-0 left-0 h-px bg-brand-gold group-hover:w-full transition-all duration-300" style={{ width: "0%" }} />
                    </span>
                    <motion.span
                      className="inline-block"
                      initial={{ x: 0 }}
                      whileHover={{ x: 4 }}
                      transition={{ duration: 0.2 }}
                    >
                      &rarr;
                    </motion.span>
                  </a>
                </motion.div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
