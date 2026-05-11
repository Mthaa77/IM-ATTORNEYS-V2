"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote, ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { ScrollReveal, GoldLine } from "@/components/im/ScrollReveal";
import {
  TestimonialDetail,
  extendedTestimonials,
  type ExtendedTestimonial,
} from "@/components/im/TestimonialDetail";

const testimonials = [
  {
    quote:
      "IM Attorneys handled my divorce with incredible sensitivity and professionalism. Ingrid understood my situation and fought for the best outcome for my children and me.",
    author: "Sarah M.",
    matter: "Family Law matter",
    rating: 5,
  },
  {
    quote:
      "After my car accident, I didn't know where to turn. The team guided me through the RAF claims process and ensured I received fair compensation.",
    author: "Thabo K.",
    matter: "RAF Claim",
    rating: 5,
  },
  {
    quote:
      "Professional, responsive, and deeply knowledgeable. They drafted our commercial contracts with precision and protected our business interests.",
    author: "David R.",
    matter: "Commercial Law",
    rating: 5,
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${
            i < rating
              ? "fill-brand-gold text-brand-gold"
              : "fill-brand-border text-brand-border"
          }`}
        />
      ))}
    </div>
  );
}

export function Testimonials() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      skipSnaps: false,
      dragFree: false,
    },
    [Autoplay({ delay: 5500, stopOnInteraction: true, stopOnMouseEnter: true })]
  );

  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [selectedTestimonial, setSelectedTestimonial] = useState<ExtendedTestimonial | null>(null);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const toggleAutoplay = useCallback(() => {
    if (emblaApi) {
      const autoplay = emblaApi.plugins()?.autoplay;
      if (autoplay) {
        if (isPlaying) {
          autoplay.stop();
          setIsPlaying(false);
        } else {
          autoplay.play();
          setIsPlaying(true);
        }
      }
    }
  }, [emblaApi, isPlaying]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setActiveIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <section
      id="testimonials"
      className="relative py-20 md:py-28 bg-brand-cream overflow-hidden noise-overlay corner-gold-tl corner-gold-br"
    >
      {/* Subtle decorative elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-gold/30 to-transparent" />
      <div className="absolute top-10 right-10 w-64 h-64 bg-brand-gold/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-48 h-48 bg-brand-gold/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <ScrollReveal className="text-center mb-12 md:mb-16">
          <span className="label-premium mb-3 block">Client Experiences</span>
          <h2 className="heading-section-light">
            What Our Clients Say
          </h2>
          <div className="flex justify-center">
            <GoldLine width={60} />
          </div>
          <p className="subheading-premium mt-5 max-w-2xl mx-auto">
            Don&apos;t just take our word for it. Hear directly from the clients who trusted us with their most important legal matters — and experienced the IM difference firsthand.
          </p>
        </ScrollReveal>

        {/* Carousel */}
        <div className="relative">
          {/* Embla viewport */}
          <div className="relative overflow-hidden" ref={emblaRef}>
            <div className="flex -ml-4 md:-ml-6">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="flex-[0_0_auto] min-w-[calc(100%-2rem)] pl-4 md:pl-6 sm:min-w-[calc(50%-1.5rem)] lg:min-w-[calc(33.333%-1.5rem)]"
                >
                  <motion.div
                    className={`
                      relative bg-white rounded-lg p-6 sm:p-8 h-full transition-all duration-500
                      ${
                        activeIndex === index
                          ? "shadow-[0_8px_30px_rgba(13,27,42,0.1)] border-l-4 border-l-brand-gold"
                          : "shadow-[0_4px_16px_rgba(13,27,42,0.06)] border-l-4 border-l-transparent"
                      }
                    `}
                    animate={{
                      y: activeIndex === index ? -4 : 0,
                    }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  >
                    {/* Quote icon */}
                    <div
                      className={`mb-4 transition-colors duration-500 ${
                        activeIndex === index
                          ? "text-brand-gold"
                          : "text-brand-gold/40"
                      }`}
                    >
                      <Quote className="w-8 h-8 sm:w-10 sm:h-10" />
                    </div>

                    {/* Testimonial text */}
                    <p className="font-body text-brand-body text-sm sm:text-base leading-relaxed mb-6">
                      &ldquo;{testimonial.quote}&rdquo;
                    </p>

                    {/* Star rating */}
                    <StarRating rating={testimonial.rating} />

                    {/* Author info */}
                    <div className="mt-4 pt-4 border-t border-brand-border/50">
                      <p className="font-display font-semibold text-brand-dark text-sm sm:text-base">
                        {testimonial.author}
                      </p>
                      <p className="font-body text-brand-muted text-xs sm:text-sm mt-0.5">
                        {testimonial.matter}
                      </p>

                      {/* Read Full Story — visible only on the active card */}
                      <button
                        type="button"
                        onClick={() => setSelectedTestimonial(extendedTestimonials[index])}
                        className={`
                          text-xs font-body text-brand-gold hover:text-brand-gold/80
                          transition-all duration-200 flex items-center gap-1 mt-2 cursor-pointer
                          ${activeIndex === index ? "opacity-100" : "opacity-0 pointer-events-none"}
                        `}
                      >
                        Read Full Story <ChevronRight className="w-3 h-3" />
                      </button>
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-center gap-3 mt-8 md:mt-10">
            <button
              onClick={scrollPrev}
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-brand-border flex items-center justify-center text-brand-dark hover:bg-brand-gold hover:border-brand-gold hover:text-white transition-all duration-300"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Dots */}
            <div className="flex items-center gap-2 mx-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => emblaApi?.scrollTo(index)}
                  className={`
                    rounded-full transition-all duration-300
                    ${
                      activeIndex === index
                        ? "w-8 h-2.5 bg-brand-gold"
                        : "w-2.5 h-2.5 bg-brand-border hover:bg-brand-gold/50"
                    }
                  `}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={scrollNext}
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-brand-border flex items-center justify-center text-brand-dark hover:bg-brand-gold hover:border-brand-gold hover:text-white transition-all duration-300"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Autoplay toggle */}
            <button
              onClick={toggleAutoplay}
              className="ml-2 w-9 h-9 rounded-full border border-brand-border flex items-center justify-center text-brand-muted hover:text-brand-gold hover:border-brand-gold/50 transition-all duration-300"
              aria-label={isPlaying ? "Pause autoplay" : "Resume autoplay"}
            >
              {isPlaying ? (
                <Pause className="w-3.5 h-3.5" />
              ) : (
                <Play className="w-3.5 h-3.5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Full-story modal */}
      <TestimonialDetail
        testimonial={selectedTestimonial}
        onClose={() => setSelectedTestimonial(null)}
      />
    </section>
  );
}
