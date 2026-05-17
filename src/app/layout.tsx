import type { Metadata } from "next";
import { Playfair_Display, Outfit } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "next-themes";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["700", "800"],
  style: ["normal", "italic"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const SITE_URL = "https://iminc.co.za";
const SITE_NAME = "IM Attorneys Inc";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | Boutique Law Firm in Menlyn Maine, Pretoria`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Expert legal services in family law, RAF claims, criminal law, wills & estates, and commercial law. Female-led boutique firm in Pretoria's Menlyn Maine. Book a consultation today.",
  keywords: [
    "IM Attorneys",
    "law firm Pretoria",
    "Menlyn Maine attorneys",
    "family law South Africa",
    "divorce attorney Pretoria",
    "RAF claims attorney",
    "bail attorney Pretoria",
    "wills and estates",
    "commercial law",
    "female black-owned law firm",
    "boutique law firm",
    "Ingrid Mtsweni",
    "Pretoria lawyer",
    "Gauteng attorney",
    "legal consultation South Africa",
    "criminal defense attorney",
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  openGraph: {
    title: `${SITE_NAME} | Boutique Law Firm in Menlyn Maine, Pretoria`,
    description:
      "Expert legal services in family law, RAF claims, criminal law, wills & estates, and commercial law. Female-led boutique firm in Pretoria's Menlyn Maine.",
    url: SITE_URL,
    siteName: SITE_NAME,
    type: "website",
    locale: "en_ZA",
    images: [
      {
        url: `${SITE_URL}/images/og-im-attorneys.png`,
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} — Boutique Law Firm in Pretoria`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} | Boutique Law Firm`,
    description:
      "Expert legal services from Pretoria's most prestigious address. Female-led boutique law firm.",
    images: [`${SITE_URL}/images/og-im-attorneys.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
  category: "Law & Legal Services",
  verification: {},
};

/* ──────────────────────────────────────────────────────
   COMPREHENSIVE JSON-LD STRUCTURED DATA
   LegalService + LocalBusiness + FAQ + Organization
   ────────────────────────────────────────────────────── */
const jsonLd = {
  // Primary: LegalService schema (AI crawlers and Google Legal vertical)
  "@context": "https://schema.org",
  "@type": "LegalService",
  name: "IM Attorneys Inc",
  alternateName: "IM Attorneys",
  url: SITE_URL,
  logo: `${SITE_URL}/images/logo.png`,
  telephone: "+27812488048",
  email: "attorneys@iminc.co.za",
  description:
    "100% female black-owned boutique law firm in Menlyn Maine, Pretoria. Specialising in family law, criminal defense, commercial litigation, property law, labour law, and estate planning.",
  priceRange: "$$",
  currencyAccepted: "ZAR",
  paymentAccepted: "Cash, Credit Card, EFT",
  areaServed: {
    "@type": "AdministrativeArea",
    name: "Gauteng, South Africa",
  },
  address: {
    "@type": "PostalAddress",
    streetAddress:
      "210 Amarand Avenue, Pegasus Building 1, Menlyn Maine Precinct, Waterkloof Glen Ext 2",
    addressLocality: "Pretoria",
    addressRegion: "Gauteng",
    postalCode: "0181",
    addressCountry: "ZA",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: -25.7807,
    longitude: 28.2649,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
      ],
      opens: "08:00",
      closes: "17:00",
    },
  ],
  founder: {
    "@type": "Person",
    name: "Ingrid Mtsweni",
    jobTitle: "Founder & Director",
    honorificPrefix: "Adv",
    description:
      "Experienced attorney and founder of IM Attorneys Inc, a leading boutique law firm in Pretoria, South Africa.",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Legal Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Family Law",
          description:
            "Comprehensive family law services including divorce, custody, maintenance, and domestic violence protection orders in South Africa.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Criminal Defense",
          description:
            "Expert criminal defense representation including bail applications, trial defense, and appeals in South African courts.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Commercial Litigation",
          description:
            "Strategic commercial dispute resolution, contract disputes, and business litigation for corporate clients.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Property Law",
          description:
            "Full-service property law including conveyancing, property transfers, bond registrations, and property disputes.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Labour Law",
          description:
            "Employment law advisory, CCMA representation, unfair dismissal claims, and workplace dispute resolution.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Estate Planning & Wills",
          description:
            "Estate planning, will drafting, trust formation, estate administration, and deceased estate management.",
        },
      },
    ],
  },
  // Enhanced with additional entity data for GEO
  knowsAbout: [
    "Family Law South Africa",
    "Criminal Defense Pretoria",
    "RAF Claims",
    "Bail Applications",
    "Divorce Law",
    "Commercial Litigation",
    "Property Conveyancing",
    "Labour Law",
    "Estate Planning",
    "POPIA Compliance",
    "FICA Compliance",
    "South African Legal System",
  ],
  sameAs: [],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "127",
    bestRating: "5",
    worstRating: "1",
  },
};

// FAQ Schema for GEO — enables rich results and AI Q&A extraction
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What areas of law does IM Attorneys Inc specialise in?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "IM Attorneys Inc is a boutique law firm in Pretoria specialising in family law, criminal defense (including bail applications), commercial litigation, property law and conveyancing, labour law and CCMA matters, and estate planning including wills and trusts. As a 100% female black-owned firm, we bring a unique perspective and dedicated approach to every case.",
      },
    },
    {
      "@type": "Question",
      name: "Where is IM Attorneys Inc located?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "IM Attorneys Inc is located at 210 Amarand Avenue, Pegasus Building 1, in the prestigious Menlyn Maine Precinct, Waterkloof Glen Ext 2, Pretoria, Gauteng, South Africa. Our office hours are Monday to Friday, 08:00 to 17:00.",
      },
    },
    {
      "@type": "Question",
      name: "How do I book a consultation with IM Attorneys?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You can book a consultation with IM Attorneys Inc by calling us at +27 81 248 8048, emailing attorneys@iminc.co.za, or using the contact form on our website. We also offer WhatsApp consultations for your convenience. Our team is available during office hours, and we offer emergency legal assistance for urgent criminal matters.",
      },
    },
    {
      "@type": "Question",
      name: "Does IM Attorneys handle emergency bail applications?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, IM Attorneys Inc handles emergency bail applications 24/7. If you or a loved one has been arrested, contact us immediately at +27 81 248 8048 or via WhatsApp. Our criminal defense team is experienced in urgent bail hearings at police stations and courts across Gauteng.",
      },
    },
    {
      "@type": "Question",
      name: "What makes IM Attorneys different from other law firms in Pretoria?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "IM Attorneys Inc is a 100% female black-owned boutique law firm founded by Adv. Ingrid Mtsweni. Located in the prestigious Menlyn Maine Precinct, we combine elite legal expertise with a client-centric, accessible approach. Our team handles each matter with the personal attention of a boutique firm while delivering results that rival large corporate practices.",
      },
    },
    {
      "@type": "Question",
      name: "How much does a consultation cost at IM Attorneys?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "IM Attorneys Inc offers transparent fee structures tailored to each matter. We provide an initial consultation to understand your legal needs and discuss our fee options, which may include hourly rates, flat fees, or contingency arrangements depending on the type of case. Contact us for a personalised quote.",
      },
    },
  ],
};

// Organization schema for brand entity recognition
const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "IM Attorneys Inc",
  alternateName: "IM Attorneys",
  url: SITE_URL,
  logo: `${SITE_URL}/images/logo.png`,
  legalName: "IM Attorneys Inc",
  foundingDate: "2020",
  numberOfEmployees: {
    "@type": "QuantitativeValue",
    minValue: 5,
    maxValue: 15,
  },
  foundingLocation: {
    "@type": "Place",
    name: "Pretoria, Gauteng, South Africa",
  },
  nonprofitStatus: "False",
  diversityPolicy: "https://iminc.co.za",
  motto: "Excellence in Legal Practice",
  description:
    "IM Attorneys Inc is a 100% female black-owned boutique law firm based in Menlyn Maine, Pretoria, providing expert legal services across family law, criminal defense, commercial litigation, property law, labour law, and estate planning.",
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+27812488048",
    contactType: "customer service",
    email: "attorneys@iminc.co.za",
    availableLanguage: ["English"],
    areaServed: "ZA",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Primary structured data: LegalService + LocalBusiness */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd),
          }}
        />
        {/* FAQ structured data: AI-friendly Q&A extraction */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqJsonLd),
          }}
        />
        {/* Organization entity data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(orgJsonLd),
          }}
        />
        {/* Preconnect to external resources */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Preload critical hero image for LCP */}
        <link
          rel="preload"
          as="image"
          href="/images/hero-slide-brand-logo.jpg"
          type="image/jpeg"
        />
      </head>
      <body
        className={`${playfair.variable} ${outfit.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
