"use client";

import { motion } from "framer-motion";
import { GraduationCap, ArrowRight, Calendar, BookOpen, Scale } from "lucide-react";
import { ScrollReveal, GoldLine } from "@/components/im/ScrollReveal";

const programmeFeatures = [
  {
    icon: BookOpen,
    title: "Legal Drafting",
    description: "Hands-on experience drafting legal documents under mentorship",
  },
  {
    icon: Scale,
    title: "Court Visits",
    description: "Observe real court proceedings and gain courtroom exposure",
  },
  {
    icon: GraduationCap,
    title: "Research Skills",
    description: "Develop legal research capabilities with practical case studies",
  },
];

export function VacationProgramme() {
  return (
    <section
      id="vacation"
      className="relative py-20 md:py-28 bg-white overflow-hidden noise-overlay"
    >
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-border to-transparent" />
      <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-brand-gold/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -top-24 -left-24 w-56 h-56 bg-brand-navy/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Side - Content */}
          <ScrollReveal direction="left">
            <div>
              <span className="label-premium mb-4 block">Student Programme</span>
              <h2 className="heading-section-light mb-5">
                Shape the Next Generation of Legal Professionals
              </h2>
              <GoldLine width={60} className="mb-6" />
              <p className="subheading-premium mb-4">
                Invest in your future with hands-on mentorship from some of South Africa's sharpest legal minds. Our programme is designed to shape the advocates of tomorrow.
              </p>
              <p className="font-body text-brand-body text-base md:text-lg leading-relaxed mb-8">
                If you are a law student looking for practical experience in a boutique 
                firm environment, we invite you to apply for our upcoming programme.
              </p>

              <a
                href="mailto:attorneys@iminc.co.za?subject=Vacation%20Programme%20Application"
                className="group inline-flex items-center gap-3 px-7 py-3.5 bg-brand-dark text-brand-inverse font-body font-semibold text-sm rounded-sm transition-all duration-300 hover:bg-brand-navy hover:shadow-lg hover:shadow-brand-dark/20"
              >
                Apply for the Programme
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </div>
          </ScrollReveal>

          {/* Right Side - Feature Cards */}
          <ScrollReveal direction="right">
            <div className="space-y-5">
              {programmeFeatures.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  className="group flex items-start gap-5 p-5 bg-brand-cream/60 rounded-xl border border-brand-border/40 hover:border-brand-gold/30 hover:bg-white transition-all duration-400 hover:shadow-lg hover:shadow-brand-shadow/50"
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.15,
                    ease: "easeOut",
                  }}
                  whileHover={{ y: -4 }}
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-brand-gold/10 flex items-center justify-center group-hover:bg-brand-gold/20 transition-colors duration-300">
                    <feature.icon className="w-6 h-6 text-brand-gold" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-brand-dark mb-1 group-hover:text-brand-navy transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="font-body text-sm text-brand-body leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}

              {/* Application info box */}
              <motion.div
                className="bg-brand-dark rounded-xl p-6 text-white relative overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/10 rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-brand-gold/5 rounded-full translate-y-1/2 -translate-x-1/2" />
                <div className="relative">
                  <div className="flex items-center gap-3 mb-3">
                    <Calendar className="w-5 h-5 text-brand-gold" />
                    <span className="font-body text-sm font-semibold text-brand-gold uppercase tracking-wider">
                      Applications Open
                    </span>
                  </div>
                  <p className="font-body text-sm text-white/80 leading-relaxed">
                    Applications are reviewed on a rolling basis. Send your CV, academic 
                    transcript, and a brief cover letter to{" "}
                    <a
                      href="mailto:attorneys@iminc.co.za?subject=Vacation%20Programme%20Application"
                      className="text-brand-gold hover:text-brand-gold-light transition-colors underline underline-offset-2"
                    >
                      attorneys@iminc.co.za
                    </a>
                  </p>
                </div>
              </motion.div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
