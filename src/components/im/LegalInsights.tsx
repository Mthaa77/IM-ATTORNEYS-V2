"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Clock, ArrowRight } from "lucide-react";
import {
  ScrollReveal,
  StaggerContainer,
  staggerChildVariants,
  GoldLine,
} from "@/components/im/ScrollReveal";

const articles = [
  {
    category: "Family Law",
    title: "Understanding Ante-Nuptial Contracts in South Africa",
    excerpt:
      "A comprehensive guide to ANC contracts — in community vs out of community of property, and how the Matrimonial Property Act protects your assets.",
    date: "15 April 2025",
    readTime: "5 min read",
    image: "/images/pegasus-menlyn-maine.jpg",
  },
  {
    category: "Criminal Law",
    title: "Your Rights When Arrested: A Practical Guide",
    excerpt:
      "Knowing your constitutional rights during an arrest can protect you from self-incrimination and ensure fair treatment throughout the legal process.",
    date: "2 April 2025",
    readTime: "4 min read",
    image: "/images/office-building-exterior.jpg",
  },
  {
    category: "RAF Claims",
    title: "How to File a Road Accident Fund Claim Successfully",
    excerpt:
      "Step-by-step instructions for filing a RAF claim, including required documentation, deadlines, and common pitfalls to avoid.",
    date: "20 March 2025",
    readTime: "6 min read",
    image: "/images/pegasus-menlyn-maine.jpg",
  },
];

export function LegalInsights() {
  const heroArticle = articles[0];
  const sideArticles = articles.slice(1);

  return (
    <section
      className="relative py-20 sm:py-28 lg:py-36 overflow-hidden bg-dot-pattern"
      style={{ backgroundColor: "#F9F8F5" }}
      aria-labelledby="legal-insights-heading"
    >
      {/* ── Decorative blob shapes ────────────────────────────────── */}
      <div
        className="absolute top-8 left-8 w-64 h-64 rounded-full opacity-[0.05] blob-morph pointer-events-none"
        style={{ backgroundColor: "#C6A84B" }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-12 right-12 w-48 h-48 rounded-full opacity-[0.04] blob-morph pointer-events-none"
        style={{ backgroundColor: "#C6A84B", animationDelay: "-4s" }}
        aria-hidden="true"
      />
      <div
        className="absolute top-1/2 right-1/4 w-32 h-32 rounded-full opacity-[0.03] float-organic pointer-events-none"
        style={{ backgroundColor: "#0D1B2A" }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* ── Section Header ──────────────────────────────────────── */}
        <div className="text-center mb-14 sm:mb-20">
          <ScrollReveal direction="up" delay={0}>
            <span className="label-premium mb-4 block">Knowledge Centre</span>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.1}>
            <h2
              id="legal-insights-heading"
              className="heading-gold-glossy"
            >
              Legal Insights
            </h2>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.15}>
            <div className="mt-5 flex justify-center">
              <GoldLine width={60} />
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.2}>
            <p className="subheading-premium mt-5">
              Stay ahead of the curve with expert analysis, legal commentary, and practical guidance on the developments shaping South African law.
            </p>
          </ScrollReveal>
        </div>

        {/* ── Magazine-Style Asymmetric Grid ─────────────────────── */}
        <StaggerContainer
          className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8 items-start"
          staggerDelay={0.15}
        >
          {/* ── LEFT: Hero Article (60%) ─────────────────────────── */}
          <motion.article
            key={heroArticle.title}
            className="lg:col-span-3 group relative cursor-pointer card-ultra-rounded card-lift-glow"
            style={{
              backgroundColor: "#0D1B2A",
              boxShadow: "0 20px 60px rgba(13, 27, 42, 0.15)",
            }}
            variants={staggerChildVariants}
          >
            {/* Hero Image Container */}
            <div className="relative w-full h-[360px] sm:h-[420px] lg:h-[500px] img-container-rounded">
              <Image
                src={heroArticle.image}
                alt={heroArticle.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 60vw"
                priority
              />
              {/* Dark gradient overlay for text readability */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, rgba(13, 27, 42, 0.95) 0%, rgba(13, 27, 42, 0.5) 35%, rgba(13, 27, 42, 0.1) 60%, transparent 100%)",
                }}
              />
            </div>

            {/* Text overlay at bottom */}
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 lg:p-10 z-10">
              {/* Category pill */}
              <span
                className="inline-block font-body text-[11px] font-bold tracking-[0.15em] uppercase px-4 py-1.5 rounded-full mb-4"
                style={{
                  backgroundColor: "#C6A84B",
                  color: "#0D1B2A",
                }}
              >
                {heroArticle.category}
              </span>

              {/* Title */}
              <h3
                className="font-display text-xl sm:text-2xl lg:text-3xl font-bold leading-snug mb-3 text-white transition-colors duration-300 group-hover:text-brand-gold-light"
                style={{ textShadow: "0 2px 8px rgba(0, 0, 0, 0.3)" }}
              >
                {heroArticle.title}
              </h3>

              {/* Excerpt */}
              <p
                className="font-body text-sm leading-relaxed mb-4 line-clamp-2"
                style={{ color: "rgba(255, 255, 255, 0.7)" }}
              >
                {heroArticle.excerpt}
              </p>

              {/* Date + Read time */}
              <div className="flex items-center gap-4">
                <span
                  className="font-body text-xs"
                  style={{ color: "rgba(255, 255, 255, 0.5)" }}
                >
                  {heroArticle.date}
                </span>
                <span
                  className="w-1 h-1 rounded-full"
                  style={{ backgroundColor: "rgba(255, 255, 255, 0.3)" }}
                />
                <span
                  className="inline-flex items-center gap-1.5 font-body text-xs"
                  style={{ color: "rgba(255, 255, 255, 0.5)" }}
                >
                  <Clock className="w-3 h-3" />
                  {heroArticle.readTime}
                </span>
              </div>
            </div>
          </motion.article>

          {/* ── RIGHT: Stacked Side Articles (40%) ─────────────── */}
          <div className="lg:col-span-2 flex flex-col gap-6 lg:gap-8">
            {sideArticles.map((article) => (
              <motion.article
                key={article.title}
                className="group cursor-pointer card-glass-organic spotlight-card"
                variants={staggerChildVariants}
              >
                <div className="flex flex-row gap-4 sm:gap-5 p-4 sm:p-5">
                  {/* Image — organic blob shape */}
                  <div className="relative flex-shrink-0 w-[100px] sm:w-[120px] h-[100px] sm:h-[120px] img-container-organic">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="120px"
                    />
                  </div>

                  {/* Text content */}
                  <div className="flex flex-col justify-center min-w-0 flex-1">
                    {/* Category badge */}
                    <span
                      className="inline-block self-start font-body text-[10px] font-bold tracking-[0.15em] uppercase px-2.5 py-1 rounded-full mb-2.5"
                      style={{
                        backgroundColor: "rgba(198, 168, 75, 0.12)",
                        color: "#C6A84B",
                      }}
                    >
                      {article.category}
                    </span>

                    {/* Title */}
                    <h3
                      className="font-display text-base sm:text-lg font-bold leading-snug mb-2 transition-colors duration-300 group-hover:text-brand-gold"
                      style={{ color: "#0D1B2A" }}
                    >
                      {article.title}
                    </h3>

                    {/* Excerpt */}
                    <p
                      className="font-body text-xs sm:text-sm leading-relaxed line-clamp-2 mb-3"
                      style={{ color: "#5A6A7C" }}
                    >
                      {article.excerpt}
                    </p>

                    {/* Date + Read time */}
                    <div className="flex items-center gap-3">
                      <span
                        className="font-body text-[11px]"
                        style={{ color: "#7A8A9C" }}
                      >
                        {article.date}
                      </span>
                      <span
                        className="w-1 h-1 rounded-full"
                        style={{ backgroundColor: "#DDD6C8" }}
                      />
                      <span
                        className="inline-flex items-center gap-1 font-body text-[11px]"
                        style={{ color: "#7A8A9C" }}
                      >
                        <Clock className="w-3 h-3" />
                        {article.readTime}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </StaggerContainer>

        {/* ── View All CTA ───────────────────────────────────────── */}
        <ScrollReveal direction="up" delay={0.35}>
          <div className="mt-12 sm:mt-16 text-center">
            <a
              href="#"
              className="btn-premium-outline"
            >
              <span>View All Articles</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
