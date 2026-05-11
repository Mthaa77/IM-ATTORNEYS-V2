"use client";

import { ChevronDown, ArrowRight } from "lucide-react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { ScrollReveal, GoldLine, StaggerContainer, staggerChildVariants } from "@/components/im/ScrollReveal";
import { motion } from "framer-motion";

interface FAQ {
  question: string;
  answer: string;
}

const faqs: FAQ[] = [
  {
    question: "What is an Ante-Nuptial Contract (ANC)?",
    answer:
      "An Ante-Nuptial Contract is a legal agreement entered into by two parties before marriage that determines the matrimonial property regime. In South Africa, there are two types: with accrual and without accrual. An ANC without accrual means each spouse retains their own estate, while an ANC with accrual provides for a sharing of the growth in each spouse's estate during the marriage. We strongly recommend consulting an attorney before your wedding to ensure your assets are protected.",
  },
  {
    question:
      "Does lobola without Home Affairs registration make me married in community of property?",
    answer:
      "No. In South Africa, lobola alone does not create a legally recognised marriage. For your marriage to be valid and to determine your matrimonial property regime, you must be married by a registered marriage officer and your marriage must be registered with the Department of Home Affairs. If you do not sign an Ante-Nuptial Contract before the marriage, you will automatically be married in community of property.",
  },
  {
    question: "I am still young — do I need a will?",
    answer:
      "Yes. Regardless of your age, if you own any assets — including a vehicle, savings, retirement funds, or life insurance — a will ensures your wishes are respected after your passing. Without a valid will, your estate will be distributed according to the Intestate Succession Act, which may not align with your wishes. A will also allows you to appoint a guardian for minor children and an executor you trust.",
  },
  {
    question: "How do I claim from the Road Accident Fund (RAF)?",
    answer:
      "To claim from the RAF, you must have been injured in a motor vehicle accident in South Africa (as a driver, passenger, pedestrian, or cyclist). Claims must be lodged within three years of the accident date. The process involves gathering medical reports, police reports, and supporting documentation. We recommend contacting us as soon as possible after an accident to ensure critical evidence is preserved and deadlines are met.",
  },
  {
    question: "What should I do if I'm arrested or need a bail application?",
    answer:
      "If you or a loved one has been arrested, the most important thing is to remain calm and exercise your right to remain silent until you have spoken to an attorney. Do not make any statements to the police without legal representation. Contact us immediately — we are available 24 hours a day, 7 days a week for bail applications. The sooner we are involved, the better we can protect your rights.",
  },
  {
    question: "How long does a divorce take in South Africa?",
    answer:
      "An uncontested divorce (where both spouses agree on all terms) can be finalised in as little as 4 to 6 weeks. A contested divorce (where there is a dispute) can take anywhere from several months to over a year, depending on the complexity of the issues involved and the court's schedule. We always attempt to resolve matters amicably first through mediation, which saves time, reduces costs, and minimises emotional strain.",
  },
];

function FAQItem({ faq, index }: { faq: FAQ; index: number }) {
  return (
    <motion.div variants={staggerChildVariants}>
      <AccordionItem
        value={`faq-${index}`}
        className="border-b-0 mb-3 last:mb-0"
      >
        <div className="rounded-lg bg-white shadow-[0_2px_12px_rgba(13,27,42,0.06)] overflow-hidden transition-shadow duration-300 hover:shadow-[0_4px_20px_rgba(13,27,42,0.1)] data-[state=open]:shadow-[0_6px_24px_rgba(13,27,42,0.12)]">
          <AccordionTrigger className="group relative px-5 sm:px-7 py-5 sm:py-6 text-left rounded-lg hover:no-underline hover:bg-brand-cream/50 transition-all duration-300 cursor-pointer">
            {/* Gold left accent on open */}
            <span className="absolute left-0 top-0 w-0 h-full bg-brand-gold rounded-l-lg transition-all duration-300 group-data-[state=open]:w-1" />
            <span className="font-display text-base sm:text-lg font-semibold text-brand-dark pr-4 leading-snug transition-colors duration-300 group-hover:text-brand-gold/80">
              {faq.question}
            </span>
            <ChevronDown className="shrink-0 w-5 h-5 text-brand-gold transition-transform duration-300 rotate-0 group-data-[state=open]:rotate-180" />
          </AccordionTrigger>
          <AccordionContent className="px-5 sm:px-7 pb-5 sm:pb-6">
            <p className="font-body text-sm sm:text-base leading-relaxed text-brand-body pt-0 pb-1">
              {faq.answer}
            </p>
          </AccordionContent>
        </div>
      </AccordionItem>
    </motion.div>
  );
}

export function FAQSection() {
  return (
    <section
      id="faq"
      className="relative py-20 sm:py-28 lg:py-36 bg-brand-parchment bg-hexagonal"
      aria-labelledby="faq-heading"
    >
      {/* Subtle decorative gold gradient line at top */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-gold/30 to-transparent" />

      {/* Decorative blur accents */}
      <div className="absolute top-16 right-8 w-72 h-72 bg-brand-gold/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 left-4 w-56 h-56 bg-brand-gold/[0.03] rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <ScrollReveal direction="up" delay={0}>
            <span className="label-premium mb-4 block">Knowledge & Clarity</span>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.1}>
            <h2
              id="faq-heading"
              className="heading-section-light"
            >
              Answers to the Questions We Hear Most
            </h2>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.15}>
            <p className="subheading-premium mt-6 max-w-2xl mx-auto">
              We believe informed clients make the best decisions. Here are the answers to the questions our attorneys hear most often.
            </p>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.2}>
            <div className="mt-5 flex justify-center">
              <GoldLine width={60} />
            </div>
          </ScrollReveal>
        </div>

        {/* FAQ Accordion */}
        <ScrollReveal direction="up" delay={0.2}>
          <StaggerContainer className="space-y-0" staggerDelay={0.07}>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <FAQItem key={index} faq={faq} index={index} />
              ))}
            </Accordion>
          </StaggerContainer>
        </ScrollReveal>

        {/* CTA */}
        <ScrollReveal direction="up" delay={0.3}>
          <div className="mt-12 sm:mt-16 text-center">
            <p className="font-body text-sm sm:text-base text-brand-body mb-6 leading-relaxed max-w-lg mx-auto">
              Can't find what you're looking for? We're here to help — reach out for a confidential, no-obligation conversation.
            </p>
            <a
              href="#contact"
              className="group inline-flex items-center gap-2.5 px-8 py-3.5 bg-brand-gold text-white font-body font-semibold text-sm rounded-sm transition-all duration-300 hover:bg-[#B59840] hover:shadow-lg hover:shadow-brand-shadow"
              onClick={(e) => {
                e.preventDefault();
                const el = document.querySelector("#contact");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <span>Get in Touch</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
