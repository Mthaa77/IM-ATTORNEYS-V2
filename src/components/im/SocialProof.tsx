"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, X } from "lucide-react";

// --- Notification data pool ---

interface SocialProofItem {
  name: string;
  action: string;
}

const names = [
  "Thabo",
  "Nomsa",
  "Sipho",
  "Lerato",
  "Andile",
  "Zanele",
  "Bongani",
  "Ayesha",
  "Kagiso",
  "Precious",
  "David",
  "Fatima",
  "Mandla",
  "Thandiwe",
  "Kgositsile",
];

const areas = [
  "Family Law",
  "Criminal Law",
  "RAF Claims",
  "Wills & Estates",
  "Commercial Law",
  "Litigation",
];

const actionTemplates = [
  (area: string) => `Inquired about ${area} services`,
  (area: string) => `Booked a consultation for ${area}`,
  (area: string) => `Downloaded our ${area} Guide`,
  (area: string) => `Viewed our ${area} page`,
  (area: string) => `Submitted a case evaluation request for ${area}`,
  (area: string) => `Started a ${area} consultation`,
];

function getRandomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateNotification(): SocialProofItem {
  const name = getRandomItem(names);
  const area = getRandomItem(areas);
  const actionFn = getRandomItem(actionTemplates);
  return {
    name,
    action: actionFn(area),
  };
}

function getRandomInterval(): number {
  return 15000 + Math.random() * 10000; // 15–25 seconds
}

// --- Component ---

export function SocialProof() {
  const [notification, setNotification] = useState<SocialProofItem | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const isPausedRef = useRef(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dismissRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Track scroll position — only show past hero, hide near footer
  const checkScrollPosition = useCallback(() => {
    const scrollY = window.scrollY;
    const docHeight = document.documentElement.scrollHeight;
    const winHeight = window.innerHeight;

    // Past hero (assume hero is roughly the first viewport height)
    const pastHero = scrollY > winHeight * 0.6;

    // Near footer — within 300px of the bottom
    const nearFooter = scrollY + winHeight >= docHeight - 300;

    setIsVisible(pastHero && !nearFooter);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", checkScrollPosition, { passive: true });
    return () => window.removeEventListener("scroll", checkScrollPosition);
  }, [checkScrollPosition]);

  // Visibility API — pause when tab is not visible
  useEffect(() => {
    const handleVisibilityChange = () => {
      isPausedRef.current = document.hidden;
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  // Clear all timers
  const clearTimers = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    if (dismissRef.current) {
      clearTimeout(dismissRef.current);
      dismissRef.current = null;
    }
  }, []);

  // Core notification scheduling logic using a single useEffect
  // to avoid circular useCallback references
  useEffect(() => {
    clearTimers();

    // First notification after 8 seconds
    timerRef.current = setTimeout(() => {
      // Recursive self-scheduling function (defined inside effect to avoid lint issues)
      function scheduleNext(delay: number) {
        timerRef.current = setTimeout(() => {
          if (isPausedRef.current) {
            // Re-check in 2 seconds if tab is not visible
            scheduleNext(2000);
            return;
          }

          const item = generateNotification();
          setNotification(item);

          // Auto-dismiss after 5 seconds
          dismissRef.current = setTimeout(() => {
            setNotification(null);
          }, 5000);

          // Schedule the next notification
          const nextDelay = getRandomInterval();
          scheduleNext(nextDelay);
        }, delay);
      }

      scheduleNext(0);
    }, 8000);

    return () => {
      clearTimers();
    };
  }, [clearTimers]);

  // Manual dismiss
  const handleDismiss = useCallback(() => {
    clearTimers();
    setNotification(null);

    // Reschedule with a new random interval
    const nextDelay = getRandomInterval();
    timerRef.current = setTimeout(() => {
      if (isPausedRef.current) {
        return;
      }

      const item = generateNotification();
      setNotification(item);

      // Auto-dismiss after 5 seconds
      dismissRef.current = setTimeout(() => {
        setNotification(null);
      }, 5000);
    }, nextDelay);
  }, [clearTimers]);

  // Only render toast when visible and there's a notification
  const show = isVisible && notification;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, x: "-100%" }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: "-100%" }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="fixed left-3 sm:left-6 z-40 max-w-[260px] sm:max-w-xs w-full"
          style={{ bottom: "max(3.5rem, calc(env(safe-area-inset-bottom, 1rem) + 3rem))" }}
          role="status"
          aria-live="polite"
        >
          <div className="bg-white rounded-xl shadow-xl border border-gray-100 p-4 relative">
            {/* Close button */}
            <button
              onClick={handleDismiss}
              className="absolute top-3 right-3 w-5 h-5 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors duration-200"
              aria-label="Dismiss notification"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Top row: avatar + name + time */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-brand-gold/10 flex items-center justify-center flex-shrink-0">
                <User className="w-4 h-4 text-brand-gold" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-gray-900 font-body truncate">
                  {notification.name}
                </p>
                <p className="text-xs text-gray-400">just now</p>
              </div>
            </div>

            {/* Middle row: action text */}
            <p className="mt-2 text-sm text-gray-600 leading-snug font-body">
              {notification.action}
            </p>

            {/* Bottom row: firm name */}
            <p className="mt-1.5 text-xs text-muted-foreground font-body">
              IM Attorneys Inc
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
