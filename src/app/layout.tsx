import type { Metadata } from "next";
import { Playfair_Display, Outfit } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "next-themes";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "IM Attorneys Inc | Boutique Law Firm in Menlyn Maine, Pretoria",
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
  ],
  authors: [{ name: "IM Attorneys Inc" }],
  openGraph: {
    title: "IM Attorneys Inc | Boutique Law Firm in Menlyn Maine, Pretoria",
    description:
      "Expert legal services in family law, RAF claims, criminal law, wills & estates, and commercial law. Female-led boutique firm in Pretoria's Menlyn Maine.",
    url: "https://iminc.co.za",
    siteName: "IM Attorneys Inc",
    type: "website",
    locale: "en_ZA",
  },
  twitter: {
    card: "summary_large_image",
    title: "IM Attorneys Inc | Boutique Law Firm",
    description:
      "Expert legal services from Pretoria's most prestigious address. Female-led boutique law firm.",
  },
  robots: {
    index: true,
    follow: true,
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LegalService",
              name: "IM Attorneys Inc",
              description:
                "100% female black-owned boutique law firm in Menlyn Maine, Pretoria",
              url: "https://iminc.co.za",
              telephone: "+27812488048",
              email: "attorneys@iminc.co.za",
              address: {
                "@type": "PostalAddress",
                streetAddress:
                  "210 Amarand Avenue, Pegasus Building 1, Menlyn Maine Precinct, Waterkloof Glen Ext 2",
                addressLocality: "Pretoria",
                postalCode: "0181",
                addressCountry: "ZA",
                addressRegion: "Gauteng",
              },
              openingHoursSpecification: {
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
              priceRange: "$$",
              areaServed: "Gauteng, South Africa",
              founder: {
                "@type": "Person",
                name: "Ingrid Mtsweni",
                jobTitle: "Founder & Director",
              },
            }),
          }}
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
