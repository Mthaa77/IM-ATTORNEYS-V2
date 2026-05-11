"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, Shield, ChevronRight, X } from "lucide-react";

const CONSENT_KEY = "im-attorneys-cookie-consent";
const CONSENT_VERSION = "2.0";

interface CookieConsentData {
  accepted: boolean;
  date: string;
  essentials: boolean;
  analytics: boolean;
  marketing: boolean;
  version: string;
}

interface CookieConsentProps {
  onOpenCookiePolicy?: () => void;
}

type BannerState = "hidden" | "summary" | "expanded";

interface CookieCategory {
  id: "essentials" | "analytics" | "marketing";
  title: string;
  description: string;
  items: string[];
  required: boolean;
}

const COOKIE_CATEGORIES: CookieCategory[] = [
  {
    id: "essentials",
    title: "Essential Cookies",
    description:
      "These cookies are necessary for the website to function and cannot be disabled.",
    items: ["Session cookies", "CSRF protection", "Consent preferences"],
    required: true,
  },
  {
    id: "analytics",
    title: "Analytics Cookies",
    description:
      "Help us understand how visitors interact with our website to improve your experience.",
    items: ["Anonymized website usage analytics"],
    required: false,
  },
  {
    id: "marketing",
    title: "Marketing Cookies",
    description:
      "Used to deliver relevant content and integrate with social media platforms.",
    items: ["Social media embeds", "Third-party integrations"],
    required: false,
  },
];

function getStoredConsent(): CookieConsentData | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(CONSENT_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as CookieConsentData;
    // Accept old v1 format gracefully — migrate on next save
    return parsed;
  } catch {
    return null;
  }
}

function saveConsent(data: CookieConsentData): void {
  localStorage.setItem(CONSENT_KEY, JSON.stringify(data));
}

function buildConsent(
  preferences: Record<string, boolean>
): CookieConsentData {
  return {
    accepted: true,
    date: new Date().toISOString(),
    essentials: true,
    analytics: preferences.analytics ?? false,
    marketing: preferences.marketing ?? false,
    version: CONSENT_VERSION,
  };
}

/* ─── Toggle Switch ────────────────────────────────────────────── */
function CookieToggle({
  checked,
  disabled,
  onChange,
  label,
}: {
  checked: boolean;
  disabled?: boolean;
  onChange: (checked: boolean) => void;
  label: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={[
        "relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold/50 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-dark disabled:cursor-not-allowed disabled:opacity-60",
        checked ? "bg-brand-gold" : "bg-brand-muted/40",
      ].join(" ")}
    >
      <span
        className={[
          "pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-md ring-0 transition-transform duration-200",
          checked ? "translate-x-[calc(100%+2px)]" : "translate-x-0",
        ].join(" ")}
      />
    </button>
  );
}

/* ─── Category Card ────────────────────────────────────────────── */
function CategoryCard({
  category,
  checked,
  onToggle,
}: {
  category: CookieCategory;
  checked: boolean;
  onToggle: (checked: boolean) => void;
}) {
  return (
    <div
      className={[
        "rounded-xl border p-4 transition-colors duration-200",
        category.required
          ? "border-brand-gold/20 bg-brand-gold/[0.06] opacity-80"
          : "border-white/10 bg-white/[0.04] hover:border-brand-gold/20",
      ].join(" ")}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h4 className="text-sm font-semibold text-brand-inverse">
              {category.title}
            </h4>
            {category.required && (
              <span className="inline-flex items-center rounded-full bg-brand-gold/20 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-brand-gold">
                Required
              </span>
            )}
          </div>
          <p className="mt-1 text-xs leading-relaxed text-brand-inverse/60">
            {category.description}
          </p>
          <ul className="mt-2 flex flex-wrap gap-x-3 gap-y-1">
            {category.items.map((item) => (
              <li
                key={item}
                className="flex items-center gap-1 text-[11px] text-brand-inverse/50"
              >
                <ChevronRight className="h-3 w-3 text-brand-gold/50" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="pt-0.5">
          <CookieToggle
            checked={checked}
            disabled={category.required}
            onChange={onToggle}
            label={`${category.title}: ${checked ? "enabled" : "disabled"}`}
          />
        </div>
      </div>
    </div>
  );
}

/* ─── Minimal Floating Button ──────────────────────────────────── */
function MinimalCookieButton({
  onClick,
}: {
  onClick: () => void;
}) {
  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.7 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      onClick={onClick}
      className="fixed left-3 sm:left-6 z-40 flex w-9 h-9 sm:w-11 sm:h-11 items-center justify-center rounded-full border border-brand-gold/20 bg-brand-dark/90 text-brand-gold shadow-lg shadow-black/10 backdrop-blur-sm transition-colors duration-300 hover:bg-brand-dark hover:border-brand-gold/40"
      style={{ bottom: "max(1rem, env(safe-area-inset-bottom, 1rem))" }}
      aria-label="Open cookie preferences"
    >
      <Cookie className="h-4 w-4 sm:h-5 sm:w-5" />
    </motion.button>
  );
}

/* ─── Main Cookie Consent Component ────────────────────────────── */
function useInitialConsent() {
  return useState(() => {
    const stored = getStoredConsent();
    if (stored) {
      return {
        hasConsented: true,
        needsBanner: false,
        preferences: {
          analytics: stored.analytics ?? false,
          marketing: stored.marketing ?? false,
        },
      };
    }
    return {
      hasConsented: false,
      needsBanner: true,
      preferences: {
        analytics: false,
        marketing: false,
      },
    };
  });
}

export function CookieConsent({ onOpenCookiePolicy }: CookieConsentProps) {
  const [bannerState, setBannerState] = useState<BannerState>("hidden");
  const [initial] = useInitialConsent();
  const [hasConsented, setHasConsented] = useState(initial.hasConsented);
  const [preferences, setPreferences] = useState(initial.preferences);

  /* Show banner after delay if no consent stored */
  useEffect(() => {
    if (!initial.needsBanner) return;
    const timer = setTimeout(() => setBannerState("summary"), 1500);
    return () => clearTimeout(timer);
  }, [initial.needsBanner]);

  const hideBanner = useCallback(() => {
    setBannerState("hidden");
  }, []);

  const openPreferences = useCallback(() => {
    setBannerState("expanded");
  }, []);

  const handleSavePreferences = useCallback(() => {
    const consent = buildConsent(preferences);
    saveConsent(consent);
    setHasConsented(true);
    hideBanner();
  }, [preferences, hideBanner]);

  const handleAcceptAll = useCallback(() => {
    const consent = buildConsent({ analytics: true, marketing: true });
    saveConsent(consent);
    setHasConsented(true);
    setPreferences({ analytics: true, marketing: true });
    hideBanner();
  }, [hideBanner]);

  const handleDeclineNonEssential = useCallback(() => {
    const consent = buildConsent({ analytics: false, marketing: false });
    saveConsent(consent);
    setHasConsented(true);
    setPreferences({ analytics: false, marketing: false });
    hideBanner();
  }, [hideBanner]);

  const handleMinimalClick = useCallback(() => {
    setBannerState("summary");
  }, []);

  const handleCookiePolicyClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      onOpenCookiePolicy?.();
    },
    [onOpenCookiePolicy]
  );

  const isBannerVisible = bannerState !== "hidden";

  return (
    <>
      {/* Banner: Summary & Expanded Views */}
      <AnimatePresence mode="wait">
        {isBannerVisible && (
          <motion.div
            key={bannerState}
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6"
            role="dialog"
            aria-label="Cookie consent preferences"
          >
            {/* ─── Summary View ─── */}
            {bannerState === "summary" && (
              <div className="glass-dark mx-auto max-w-4xl rounded-2xl border border-brand-gold/20 p-5 shadow-2xl sm:p-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-5">
                  {/* Icon */}
                  <div className="hidden shrink-0 sm:block">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full border border-brand-gold/30 bg-brand-gold/10">
                      <Shield className="h-5 w-5 text-brand-gold" />
                    </div>
                  </div>

                  {/* Text */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm leading-relaxed text-brand-inverse/90">
                      We use cookies to enhance your browsing experience and
                      analyse site traffic in compliance with the Protection of
                      Personal Information Act (POPIA).{" "}
                      <button
                        type="button"
                        onClick={handleCookiePolicyClick}
                        className="font-semibold text-brand-gold transition-colors duration-200 hover:text-brand-gold-light"
                      >
                        Cookie Policy
                      </button>
                    </p>
                  </div>

                  {/* Buttons */}
                  <div className="flex shrink-0 flex-col gap-2 sm:flex-row sm:gap-3">
                    <button
                      type="button"
                      onClick={openPreferences}
                      className="cursor-pointer rounded-lg border border-brand-gold/30 px-5 py-2.5 text-sm font-medium text-brand-inverse/70 transition-all duration-300 hover:border-brand-gold/60 hover:text-brand-gold"
                    >
                      Manage Preferences
                    </button>
                    <button
                      type="button"
                      onClick={handleAcceptAll}
                      className="cursor-pointer rounded-lg bg-brand-gold px-5 py-2.5 text-sm font-semibold text-brand-dark transition-all duration-300 hover:bg-brand-gold-light hover:shadow-lg"
                    >
                      Accept All
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* ─── Expanded View ─── */}
            {bannerState === "expanded" && (
              <div className="glass-dark mx-auto max-w-2xl rounded-2xl border border-brand-gold/20 p-5 shadow-2xl sm:p-6">
                {/* Header */}
                <div className="mb-5 flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-brand-gold/30 bg-brand-gold/10">
                      <Shield className="h-5 w-5 text-brand-gold" />
                    </div>
                    <div>
                      <h3 className="font-body text-base font-semibold text-brand-inverse">
                        Cookie Preferences
                      </h3>
                      <p className="mt-1 text-xs leading-relaxed text-brand-inverse/60">
                        We use cookies to enhance your browsing experience and
                        analyse site traffic in compliance with the Protection of
                        Personal Information Act (POPIA).{" "}
                        <button
                          type="button"
                          onClick={handleCookiePolicyClick}
                          className="font-semibold text-brand-gold transition-colors duration-200 hover:text-brand-gold-light"
                        >
                          Cookie Policy
                        </button>
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={hideBanner}
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-brand-inverse/50 transition-colors duration-200 hover:bg-white/10 hover:text-brand-inverse"
                    aria-label="Close cookie preferences"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                {/* Divider */}
                <div className="mb-4 h-px bg-white/10" />

                {/* Category Cards */}
                <div className="flex max-h-72 flex-col gap-3 overflow-y-auto pr-1">
                  {COOKIE_CATEGORIES.map((cat) => (
                    <CategoryCard
                      key={cat.id}
                      category={cat}
                      checked={
                        cat.required
                          ? true
                          : cat.id === "analytics"
                            ? preferences.analytics
                            : preferences.marketing
                      }
                      onToggle={(checked) => {
                        if (cat.required) return;
                        setPreferences((prev) => ({
                          ...prev,
                          [cat.id]: checked,
                        }));
                      }}
                    />
                  ))}
                </div>

                {/* Divider */}
                <div className="mt-4 mb-4 h-px bg-white/10" />

                {/* Action Buttons */}
                <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
                  <button
                    type="button"
                    onClick={handleDeclineNonEssential}
                    className="cursor-pointer rounded-lg border border-brand-gold/30 px-5 py-2.5 text-sm font-medium text-brand-inverse/70 transition-all duration-300 hover:border-brand-gold/60 hover:text-brand-gold"
                  >
                    Decline Non-Essential
                  </button>
                  <button
                    type="button"
                    onClick={handleAcceptAll}
                    className="cursor-pointer rounded-lg bg-brand-gold px-5 py-2.5 text-sm font-semibold text-brand-dark transition-all duration-300 hover:bg-brand-gold-light hover:shadow-lg"
                  >
                    Accept All
                  </button>
                  <button
                    type="button"
                    onClick={handleSavePreferences}
                    className="cursor-pointer rounded-lg bg-white/10 px-5 py-2.5 text-sm font-semibold text-brand-inverse transition-all duration-300 hover:bg-white/20"
                  >
                    Save Preferences
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Minimal floating cookie button — visible after consent */}
      <AnimatePresence>
        {hasConsented && !isBannerVisible && (
          <MinimalCookieButton onClick={handleMinimalClick} />
        )}
      </AnimatePresence>
    </>
  );
}
