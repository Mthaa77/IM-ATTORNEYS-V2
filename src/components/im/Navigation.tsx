"use client";

import { useState, useEffect, useCallback, useRef, useSyncExternalStore } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, MessageCircle, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Our Team", href: "#team" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

const sectionIds = navLinks.map((link) => link.href.replace("#", ""));

interface NavigationProps {
  activePracticeArea?: string | null;
  onGoHome?: () => void;
}

export function Navigation({ activePracticeArea, onGoHome }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
  const { theme, setTheme } = useTheme();

  // ─── Scroll detection ───
  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 60);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // ─── Active section tracking via IntersectionObserver ───
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Find the entry that is intersecting
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible) {
          setActiveSection(visible.target.id);
        }
      },
      {
        rootMargin: "-40% 0px -60% 0px",
        threshold: [0],
      }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // ─── Lock body scroll when mobile menu is open ───
  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileOpen]);

  const handleNavClick = (href: string) => {
    setIsMobileOpen(false);
    if (activePracticeArea && onGoHome) {
      onGoHome();
      const targetId = href.replace("#", "");
      setTimeout(() => {
        const el = document.getElementById(targetId);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 350);
    } else {
      const el = document.querySelector(href);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (activePracticeArea && onGoHome) {
      setIsMobileOpen(false);
      onGoHome();
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 350);
    } else {
      handleNavClick("#home");
    }
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const isDark = mounted && theme === "dark";

  return (
    <>
      <motion.header
        className={`fixed left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "glass-dark shadow-lg shadow-black/10"
            : "bg-transparent"
        } shadow-directional`}
        style={{ top: "var(--banner-height, 0px)" }}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{
          duration: 0.6,
          ease: "easeOut",
          top: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
        }}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <a
              href="#home"
              onClick={handleLogoClick}
              className="flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-full border-2 border-brand-gold flex items-center justify-center">
                <span className="font-display font-bold text-brand-gold text-lg">
                  IM
                </span>
              </div>
              <div className="hidden sm:block">
                <span className="font-body font-medium text-brand-inverse text-sm tracking-wide letter-spacing-hover">
                  IM ATTORNEYS
                </span>
              </div>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => {
                const sectionId = link.href.replace("#", "");
                const isActive = activeSection === sectionId;
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(link.href);
                    }}
                    className={`font-body text-sm tracking-wide transition-colors duration-200 relative ${
                      isActive
                        ? "text-brand-gold"
                        : "text-brand-inverse/80 hover:text-brand-gold"
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <motion.span
                        layoutId="active-nav-underline"
                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-brand-gold rounded-full"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </a>
                );
              })}
            </div>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-4">
              <a
                href="tel:+27812488048"
                className="flex items-center gap-2 text-brand-inverse/80 hover:text-brand-gold transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span className="text-sm font-body">081 248 8048</span>
              </a>

              {/* Dark Mode Toggle */}
              {mounted && (
                <button
                  onClick={toggleTheme}
                  className="w-9 h-9 rounded-full border border-brand-gold/30 flex items-center justify-center text-brand-gold hover:border-brand-gold/60 hover:bg-brand-gold/10 transition-all duration-200"
                  aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
                >
                  <motion.div
                    key={theme}
                    initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                    exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    {isDark ? (
                      <Sun className="w-4 h-4" />
                    ) : (
                      <Moon className="w-4 h-4" />
                    )}
                  </motion.div>
                </button>
              )}

              <a
                href="mailto:attorneys@iminc.co.za?subject=Book%20a%20consultation"
                className="px-6 py-2.5 bg-brand-gold text-brand-dark font-body font-semibold text-sm rounded-sm hover:bg-brand-gold-light transition-colors duration-200"
              >
                Book a Consultation
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="lg:hidden text-brand-inverse p-2"
              aria-label="Toggle navigation menu"
            >
              {isMobileOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-brand-dark/98 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col items-center justify-center min-h-screen gap-8 px-6">
              {navLinks.map((link, i) => {
                const sectionId = link.href.replace("#", "");
                const isActive = activeSection === sectionId;
                return (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(link.href);
                    }}
                    className={`font-display text-3xl transition-colors relative ${
                      isActive
                        ? "text-brand-gold"
                        : "text-brand-inverse hover:text-brand-gold"
                    }`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{
                      duration: 0.3,
                      delay: i * 0.08,
                      ease: "easeOut",
                    }}
                  >
                    {link.label}
                    {isActive && (
                      <motion.span
                        layoutId="active-mobile-underline"
                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-brand-gold rounded-full"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </motion.a>
                );
              })}

              {/* Dark Mode Toggle (mobile) */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: navLinks.length * 0.08 }}
              >
                {mounted && (
                  <button
                    onClick={toggleTheme}
                    className="flex items-center gap-3 text-brand-inverse/80 hover:text-brand-gold transition-colors py-2"
                    aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
                  >
                    <motion.div
                      key={theme}
                      initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                      animate={{ rotate: 0, opacity: 1, scale: 1 }}
                      exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      {isDark ? (
                        <Sun className="w-5 h-5 text-brand-gold" />
                      ) : (
                        <Moon className="w-5 h-5 text-brand-gold" />
                      )}
                    </motion.div>
                    <span className="font-body text-sm">
                      {isDark ? "Light Mode" : "Dark Mode"}
                    </span>
                  </button>
                )}
              </motion.div>

              <motion.div
                className="flex flex-col items-center gap-4 mt-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.3,
                  delay: (navLinks.length + 1) * 0.08,
                }}
              >
                <a
                  href="tel:+27812488048"
                  className="flex items-center gap-2 text-brand-inverse/80"
                >
                  <Phone className="w-5 h-5" />
                  <span className="font-body">081 248 8048</span>
                </a>
                <a
                  href="https://wa.me/270812488048"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-green-400"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span className="font-body">WhatsApp Us</span>
                </a>
                <a
                  href="mailto:attorneys@iminc.co.za?subject=Book%20a%20consultation"
                  className="mt-4 px-8 py-3 bg-brand-gold text-brand-dark font-body font-semibold rounded-sm"
                >
                  Book a Consultation
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
