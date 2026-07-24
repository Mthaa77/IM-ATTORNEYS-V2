"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod/v4";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
  Send,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { ScrollReveal, GoldLine } from "@/components/im/ScrollReveal";
import Image from "next/image";

const contactSchema = z.object({
  fullName: z
    .string()
    .min(2, "Please enter your full name")
    .max(100, "Name is too long"),
  phone: z
    .string()
    .min(8, "Please enter a valid phone number")
    .max(20, "Phone number is too long"),
  email: z.email("Please enter a valid email address"),
  areaOfLaw: z.string().min(1, "Please select an area of law"),
  description: z
    .string()
    .min(10, "Please provide a brief description of at least 10 characters")
    .max(2000, "Description is too long"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const areasOfLaw = [
  "Family Law",
  "Wills & Estates",
  "Criminal Law",
  "Commercial Law",
  "Claims Against State",
  "General Litigation",
  "Other",
];

const contactDetails = [
  {
    icon: MapPin,
    label: "Address",
    value: "Pegasus Building, 210 Amarand Avenue, Menlyn Maine, Pretoria, 0181",
    href: "https://maps.google.com/?q=IM+Attorneys+Menlyn+Maine+Pretoria",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "081 248 8048",
    href: "tel:+27812488048",
  },
  {
    icon: Mail,
    label: "Email",
    value: "attorneys@iminc.co.za",
    href: "mailto:attorneys@iminc.co.za",
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "Chat with us",
    href: "https://wa.me/270812488048?text=Hello%20IM%20Attorneys%2C%20I%20would%20like%20to%20enquire%20about%20your%20services.",
  },
];

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [popiaConsent, setPopiaConsent] = useState(false);
  const [contactConsent, setContactConsent] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      fullName: "",
      phone: "",
      email: "",
      areaOfLaw: "",
      description: "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    if (!popiaConsent || !contactConsent) {
      toast({
        title: "Consent Required",
        description: "Please tick both consent checkboxes before submitting your enquiry. This is required under POPIA.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to submit enquiry");
      }

      toast({
        title: "Enquiry Sent Successfully",
        description:
          "Thank you for reaching out. Our team will contact you within 24 hours.",
        variant: "default",
      });

      reset();
      setPopiaConsent(false);
      setContactConsent(false);
    } catch {
      toast({
        title: "Something Went Wrong",
        description:
          "We couldn't submit your enquiry. Please try calling us directly or emailing attorneys@iminc.co.za.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="premium-section-surface premium-section-surface--light relative py-20 md:py-28 bg-brand-parchment overflow-hidden bg-animated-gradient">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-gold/30 to-transparent" />
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-brand-gold/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-brand-gold/5 rounded-full blur-3xl pointer-events-none" />
      {/* Morphing border accent */}
      <div className="absolute top-8 right-8 w-32 h-32 morphing-border opacity-20 pointer-events-none" />
      <div className="absolute bottom-8 left-8 w-24 h-24 morphing-border opacity-15 pointer-events-none" style={{ animationDelay: "-4s" }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <ScrollReveal className="text-center mb-12 md:mb-16">
          <span className="label-premium mb-3 block">Get in Touch</span>
          <h2 className="heading-section-light">
            Ready to Take the Next Step?
          </h2>
          <div className="flex justify-center">
            <GoldLine width={60} />
          </div>
          <p className="subheading-premium mt-5 max-w-2xl mx-auto">
            Whether you&apos;re facing an urgent crisis or planning your next strategic move, our doors are open. Your first consultation is complimentary — no pressure, no obligation, just honest legal guidance you can trust.
          </p>
        </ScrollReveal>

        <div className="grid lg:grid-cols-5 gap-10 lg:gap-14">
          {/* Left Side: Contact Info */}
          <ScrollReveal direction="left" className="lg:col-span-2">
            <div className="space-y-8">
              {/* Office Building Image */}
              <div className="relative rounded-lg overflow-hidden shadow-lg mb-8 group">
                <div className="aspect-[16/10] relative">
                  <Image
                    src="/images/office-building-exterior.jpg"
                    alt="IM Attorneys office at Pegasus Building, Menlyn Maine, Pretoria"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    loading="lazy"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D1B2A]/50 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-4 right-4">
                  <p className="font-body text-xs font-medium text-white/90 tracking-wide">Pegasus Building, Menlyn Maine</p>
                  <p className="font-body text-[10px] text-white/50 mt-0.5">Pretoria, Gauteng</p>
                </div>
                <div className="absolute inset-0 rounded-lg border border-brand-gold/15 pointer-events-none" />
              </div>

              {/* Firm Name */}
              <div>
                <h3 className="font-display text-2xl font-bold text-brand-dark mb-1">
                  IM Attorneys Inc
                </h3>
                <p className="font-body text-brand-muted text-sm">
                  100% Female Black-Owned Boutique Law Firm
                </p>
              </div>

              {/* Contact Details */}
              <div className="space-y-5">
                {contactDetails.map((detail) => (
                  <a
                    key={detail.label}
                    href={detail.href}
                    target={detail.label === "WhatsApp" ? "_blank" : undefined}
                    rel={
                      detail.label === "WhatsApp"
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className="flex items-start gap-4 group"
                  >
                    <div className="flex-shrink-0 w-11 h-11 rounded-full bg-brand-dark/5 flex items-center justify-center group-hover:bg-brand-gold/10 transition-colors duration-300">
                      <detail.icon className="w-5 h-5 text-brand-gold" />
                    </div>
                    <div>
                      <p className="font-body text-xs font-semibold tracking-wider uppercase text-brand-muted mb-0.5">
                        {detail.label}
                      </p>
                      <p className="font-body text-brand-dark text-sm group-hover:text-brand-gold transition-colors duration-300">
                        {detail.value}
                      </p>
                    </div>
                  </a>
                ))}
              </div>

              {/* Divider */}
              <div className="h-px bg-brand-border/60" />

              {/* Office Hours */}
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-11 h-11 rounded-full bg-brand-dark/5 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-brand-gold" />
                </div>
                <div>
                  <p className="font-body text-xs font-semibold tracking-wider uppercase text-brand-muted mb-1">
                    Office Hours
                  </p>
                  <p className="font-body text-brand-dark text-sm font-medium">
                    Mon – Fri: 08:00 – 17:00
                  </p>
                  <p className="font-body text-brand-muted text-xs mt-0.5">
                    Closed on weekends & public holidays
                  </p>
                </div>
              </div>

              {/* Bail Applications Notice */}
              <motion.div
                className="bg-brand-dark text-white rounded-lg p-5 relative overflow-hidden"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-brand-gold/10 rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="relative">
                  <p className="font-body text-xs font-semibold tracking-wider uppercase text-brand-gold mb-1.5">
                    24/7 Criminal Defence
                  </p>
                  <p className="font-body text-sm text-white/90 leading-relaxed">
                    Arrests don't keep office hours, and neither do we. If you or a loved one needs
                    urgent bail or police station representation, call us right now — day or night.
                  </p>
                  <a
                    href="tel:+27812488048"
                    className="inline-flex items-center gap-2 mt-3 text-brand-gold hover:text-brand-gold-light transition-colors font-body font-semibold text-sm"
                  >
                    <Phone className="w-4 h-4" />
                    Call Now: 081 248 8048
                  </a>
                </div>
              </motion.div>
            </div>
          </ScrollReveal>

          {/* Right Side: Form */}
          <ScrollReveal direction="right" className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-[0_8px_32px_rgba(13,27,42,0.08)] p-6 sm:p-8 md:p-10">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                {/* Full Name */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="fullName"
                    className="font-body text-sm font-medium text-brand-dark"
                  >
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <Input
                    id="fullName"
                    placeholder="e.g. John Doe"
                    className="h-11 border-brand-border/70 bg-brand-cream/30 font-body text-brand-dark placeholder:text-brand-muted/60 focus-visible:border-brand-gold focus-visible:ring-brand-gold/20"
                    {...register("fullName")}
                  />
                  {errors.fullName && (
                    <p className="flex items-center gap-1 text-xs text-red-500 font-body mt-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.fullName.message}
                    </p>
                  )}
                </div>

                {/* Phone & Email row */}
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label
                      htmlFor="phone"
                      className="font-body text-sm font-medium text-brand-dark"
                    >
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="e.g. 081 234 5678"
                      className="h-11 border-brand-border/70 bg-brand-cream/30 font-body text-brand-dark placeholder:text-brand-muted/60 focus-visible:border-brand-gold focus-visible:ring-brand-gold/20"
                      {...register("phone")}
                    />
                    {errors.phone && (
                      <p className="flex items-center gap-1 text-xs text-red-500 font-body mt-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.phone.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor="email"
                      className="font-body text-sm font-medium text-brand-dark"
                    >
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="e.g. john@example.co.za"
                      className="h-11 border-brand-border/70 bg-brand-cream/30 font-body text-brand-dark placeholder:text-brand-muted/60 focus-visible:border-brand-gold focus-visible:ring-brand-gold/20"
                      {...register("email")}
                    />
                    {errors.email && (
                      <p className="flex items-center gap-1 text-xs text-red-500 font-body mt-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Area of Law */}
                <div className="space-y-1.5">
                  <label className="font-body text-sm font-medium text-brand-dark">
                    Area of Law <span className="text-red-500">*</span>
                  </label>
                  <Select onValueChange={(val) => setValue("areaOfLaw", val)}>
                    <SelectTrigger className="w-full h-11 border-brand-border/70 bg-brand-cream/30 font-body text-brand-dark focus:ring-brand-gold/20 focus:ring-[3px] focus-visible:border-brand-gold">
                      <SelectValue placeholder="Select an area of law" />
                    </SelectTrigger>
                    <SelectContent className="font-body">
                      {areasOfLaw.map((area) => (
                        <SelectItem key={area} value={area}>
                          {area}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.areaOfLaw && (
                    <p className="flex items-center gap-1 text-xs text-red-500 font-body mt-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.areaOfLaw.message}
                    </p>
                  )}
                </div>

                {/* Brief Description */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="description"
                    className="font-body text-sm font-medium text-brand-dark"
                  >
                    Brief Description <span className="text-red-500">*</span>
                  </label>
                  <Textarea
                    id="description"
                    placeholder="Briefly describe your legal matter or how we can assist you..."
                    rows={5}
                    className="border-brand-border/70 bg-brand-cream/30 font-body text-brand-dark placeholder:text-brand-muted/60 focus-visible:border-brand-gold focus-visible:ring-brand-gold/20 resize-none"
                    {...register("description")}
                  />
                  {errors.description && (
                    <p className="flex items-center gap-1 text-xs text-red-500 font-body mt-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.description.message}
                    </p>
                  )}
                </div>

                {/* POPIA Consent Checkboxes */}
                <div className="space-y-3">
                  <div className="flex items-start gap-2.5">
                    <input
                      type="checkbox"
                      id="popia-consent"
                      checked={popiaConsent}
                      onChange={(e) => setPopiaConsent(e.target.checked)}
                      className="w-4 h-4 mt-0.5 rounded border-brand-border accent-[#C6A84B] cursor-pointer"
                    />
                    <label
                      htmlFor="popia-consent"
                      className="font-body text-xs text-brand-muted leading-relaxed cursor-pointer"
                    >
                      I consent to I.M Attorneys Inc collecting and processing my personal information as described in the{" "}
                      <a
                        href="/privacy-policy"
                        className="text-brand-gold underline hover:text-brand-gold-light"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Privacy Policy
                      </a>
                      . I understand I may withdraw this consent at any time.
                    </label>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <input
                      type="checkbox"
                      id="contact-consent"
                      checked={contactConsent}
                      onChange={(e) => setContactConsent(e.target.checked)}
                      className="w-4 h-4 mt-0.5 rounded border-brand-border accent-[#C6A84B] cursor-pointer"
                    />
                    <label
                      htmlFor="contact-consent"
                      className="font-body text-xs text-brand-muted leading-relaxed cursor-pointer"
                    >
                      I confirm that the information provided is accurate and I consent to being contacted regarding my enquiry via phone, email, or WhatsApp.
                    </label>
                  </div>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-12 bg-brand-gold hover:bg-brand-gold-light text-brand-dark font-body font-semibold text-sm tracking-wide rounded-sm transition-all duration-300 hover:shadow-[0_4px_16px_rgba(198,168,75,0.3)] disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Request a Callback
                      <Send className="w-4 h-4 ml-1" />
                    </>
                  )}
                </Button>

                {/* POPIA & ECTA notice */}
                <div className="space-y-1">
                  <p className="text-center font-body text-xs text-brand-muted leading-relaxed">
                    Your information is protected under the Protection of Personal Information Act (POPIA), 2013.
                  </p>
                  <p className="text-center font-body text-xs text-brand-muted leading-relaxed">
                    For more information about how we handle your data, please read our{" "}
                    <a
                      href="/privacy-policy"
                      className="text-brand-gold underline hover:text-brand-gold-light"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Privacy Policy
                    </a>
                    .
                  </p>
                  <p className="text-center font-body text-xs text-brand-muted leading-relaxed">
                    You have a 14-day cooling-off period for electronic service engagements as per ECTA Section 43.
                  </p>
                </div>
              </form>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
