"use client";

import {
  useState,
  useEffect,
  useMemo,
  useSyncExternalStore,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Clock,
  Phone,
  MessageCircle,
  AlertTriangle,
  Circle,
  ChevronRight,
} from "lucide-react";
import {
  ScrollReveal,
  StaggerContainer,
  staggerChildVariants,
} from "@/components/im/ScrollReveal";

// ─── Schedule Data ───────────────────────────────────────────────────────────

interface DaySchedule {
  day: string;
  shortDay: string;
  open: number;
  close: number;
  isClosed: boolean;
}

const SCHEDULE: DaySchedule[] = [
  { day: "Monday", shortDay: "Mon", open: 8, close: 17, isClosed: false },
  { day: "Tuesday", shortDay: "Tue", open: 8, close: 17, isClosed: false },
  { day: "Wednesday", shortDay: "Wed", open: 8, close: 17, isClosed: false },
  { day: "Thursday", shortDay: "Thu", open: 8, close: 17, isClosed: false },
  { day: "Friday", shortDay: "Fri", open: 8, close: 17, isClosed: false },
  { day: "Saturday", shortDay: "Sat", open: 9, close: 13, isClosed: false },
  { day: "Sunday", shortDay: "Sun", open: 0, close: 0, isClosed: true },
];

const PHONE_NUMBER = "081 248 8048";
const WHATSAPP_URL = "https://wa.me/27812488048";

// ─── Hydration-safe mounted hook ─────────────────────────────────────────────

const emptySubscribe = () => () => {};

function useHydrated(): boolean {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}

// ─── Time Utilities ──────────────────────────────────────────────────────────

function getSASTTime(): { hours: number; minutes: number; dayOfWeek: number } {
  const now = new Date();
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Africa/Johannesburg",
    hour: "numeric",
    minute: "numeric",
    hour12: false,
    weekday: "short",
  }).formatToParts(now);

  let hours = 0;
  let minutes = 0;
  let dayOfWeek = 0;

  const dayMap: Record<string, number> = {
    Mon: 0,
    Tue: 1,
    Wed: 2,
    Thu: 3,
    Fri: 4,
    Sat: 5,
    Sun: 6,
  };

  for (const part of parts) {
    if (part.type === "hour") hours = parseInt(part.value, 10);
    if (part.type === "minute") minutes = parseInt(part.value, 10);
    if (part.type === "weekday") dayOfWeek = dayMap[part.value] ?? 0;
  }

  // Handle midnight (24 -> 0)
  if (hours === 24) hours = 0;

  return { hours, minutes, dayOfWeek };
}

function formatSASTDisplay(
  hours: number,
  minutes: number
): { time: string; seconds: string } {
  const h = String(hours).padStart(2, "0");
  const m = String(minutes).padStart(2, "0");
  const now = new Date();
  const s = String(now.getSeconds()).padStart(2, "0");
  return { time: `${h}:${m}`, seconds: s };
}

function isCurrentlyOpen(): boolean {
  const { hours, dayOfWeek } = getSASTTime();
  const today = SCHEDULE[dayOfWeek];
  if (today.isClosed) return false;
  return hours >= today.open && hours < today.close;
}

function getTimeUntilNextChange(): string {
  const { hours, minutes, dayOfWeek } = getSASTTime();
  const today = SCHEDULE[dayOfWeek];

  if (today.isClosed) {
    // Find next open day
    for (let i = 1; i <= 7; i++) {
      const nextIdx = (dayOfWeek + i) % 7;
      const nextDay = SCHEDULE[nextIdx];
      if (!nextDay.isClosed) {
        if (i === 1) {
          const diffHours = nextDay.open - hours;
          const diffMins = diffHours * 60 - minutes;
          if (diffMins <= 60) return `Opens in ${diffMins} min`;
          return `Opens in ${diffHours}h ${diffMins % 60}m`;
        }
        return `Opens on ${nextDay.day}`;
      }
    }
    return "";
  }

  if (hours >= today.open && hours < today.close) {
    const closeHour = today.close;
    const diffHours = closeHour - hours;
    const diffMins = diffHours * 60 - minutes;
    if (diffMins <= 60) return `Closes in ${diffMins} min`;
    return `Closes in ${diffHours}h ${diffMins % 60}m`;
  }

  // Before opening today
  const diffMins = today.open * 60 - (hours * 60 + minutes);
  if (diffMins > 0 && diffMins <= 60) return `Opens in ${diffMins} min`;
  if (diffMins > 0) return `Opens in ${Math.floor(diffMins / 60)}h ${diffMins % 60}m`;

  // After closing today, find next open day
  for (let i = 1; i <= 7; i++) {
    const nextIdx = (dayOfWeek + i) % 7;
    const nextDay = SCHEDULE[nextIdx];
    if (!nextDay.isClosed) {
      return `Opens on ${nextDay.day}`;
    }
  }
  return "";
}

// ─── Sub-Components ──────────────────────────────────────────────────────────

function DigitalClock() {
  const mounted = useHydrated();
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (!mounted) return;
    // Schedule first tick asynchronously to avoid sync setState in effect
    const timeout = setTimeout(() => setTick(1), 0);
    const interval = setInterval(() => setTick((t) => t + 1), 60000);
    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [mounted]);

  const timeData = useMemo(() => {
    if (!mounted || tick === 0) return { time: "--:--", seconds: "--" };
    const { hours, minutes } = getSASTTime();
    return formatSASTDisplay(hours, minutes);
  }, [mounted, tick]);

  return (
    <div className="flex items-center gap-4">
      <div className="relative">
        <div className="flex items-baseline font-display tracking-wider">
          <span
            className={`text-4xl sm:text-5xl md:text-6xl font-bold tabular-nums transition-opacity duration-500 ${
              mounted
                ? "text-brand-gold"
                : "text-transparent"
            }`}
            style={
              mounted
                ? {
                    textShadow: "0 0 30px rgba(198, 168, 75, 0.4)",
                  }
                : undefined
            }
          >
            {timeData.time}
          </span>
          <span
            className={`text-lg sm:text-xl font-body font-light text-brand-gold/60 ml-1 transition-opacity duration-500 ${
              mounted ? "opacity-100" : "opacity-0"
            }`}
          >
            SAST
          </span>
        </div>
      </div>
    </div>
  );
}

function StatusBadge() {
  const mounted = useHydrated();
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (!mounted) return;
    const interval = setInterval(() => {
      setTick((t) => t + 1);
    }, 60000);
    return () => clearInterval(interval);
  }, [mounted]);

  const open = mounted ? isCurrentlyOpen() : false;
  const countdown = mounted ? getTimeUntilNextChange() : "";
  // tick is read to ensure re-computation on interval
  void tick;

  if (!mounted) {
    return (
      <div className="flex items-center gap-3 h-10">
        <div className="w-16 h-8 bg-brand-navy-light rounded-full" />
      </div>
    );
  }

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
      <motion.div
        className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border"
        animate={{
          borderColor: open
            ? "rgba(34, 197, 94, 0.4)"
            : "rgba(239, 68, 68, 0.4)",
          backgroundColor: open
            ? "rgba(34, 197, 94, 0.08)"
            : "rgba(239, 68, 68, 0.08)",
        }}
        initial={false}
        transition={{ duration: 0.5 }}
      >
        <span className="relative flex h-3 w-3">
          {open ? (
            <motion.span
              className="absolute inline-flex h-full w-full rounded-full bg-green-500"
              animate={{
                opacity: [1, 0.4, 1],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ) : (
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500" />
          )}
          <span
            className={`relative inline-flex rounded-full h-3 w-3 ${
              open ? "bg-green-500" : "bg-red-500"
            }`}
          />
        </span>
        <span
          className={`text-sm font-body font-semibold tracking-wide ${
            open ? "text-green-400" : "text-red-400"
          }`}
        >
          {open ? "OPEN NOW" : "CLOSED"}
        </span>
      </motion.div>

      {countdown && (
        <motion.span
          className="text-xs font-body text-brand-muted/70 tracking-wide"
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          {countdown}
        </motion.span>
      )}
    </div>
  );
}

function DayScheduleRow({
  day,
  index,
}: {
  day: DaySchedule;
  index: number;
}) {
  const mounted = useHydrated();
  const isToday = useMemo(() => {
    if (!mounted) return false;
    const { dayOfWeek } = getSASTTime();
    return dayOfWeek === index;
  }, [mounted, index]);

  const barWidth = day.isClosed ? 0 : ((day.close - day.open) / 24) * 100;
  const barOffset = day.isClosed ? 0 : (day.open / 24) * 100;

  return (
    <motion.div
      className={`
        group relative flex items-center gap-3 sm:gap-4 py-3 px-3 sm:px-4 rounded-xl transition-all duration-300
        ${
          isToday
            ? "bg-brand-gold/[0.07] border border-brand-gold/20 shadow-[0_0_20px_rgba(198,168,75,0.08)]"
            : "border border-transparent hover:bg-white/[0.02] hover:border-white/[0.04]"
        }
      `}
      variants={staggerChildVariants}
    >
      {/* Day Label */}
      <div className="flex-shrink-0 w-10 sm:w-20 flex flex-col">
        <span
          className={`text-sm sm:text-base font-body font-semibold tracking-wide ${
            isToday ? "text-brand-gold" : "text-white/80"
          }`}
        >
          {day.shortDay}
        </span>
        <span className="hidden sm:block text-[10px] font-body text-brand-muted/50 uppercase tracking-widest">
          {day.day}
        </span>
      </div>

      {/* Visual Bar Area */}
      <div className="flex-1 relative h-8 sm:h-10 flex items-center">
        {/* 24h Track */}
        <div className="absolute inset-x-0 h-2.5 rounded-full bg-white/[0.04]" />

        {/* Hour markers */}
        <div className="absolute inset-x-0 flex justify-between px-0 pointer-events-none">
          {[0, 6, 12, 18, 24].map((h) => (
            <div key={h} className="relative">
              <div className="w-px h-1.5 bg-white/[0.06] rounded-full" />
              <span className="absolute -bottom-3.5 left-1/2 -translate-x-1/2 text-[8px] font-body text-brand-muted/30">
                {h === 0 || h === 24 ? "12a" : h === 6 ? "6a" : h === 12 ? "12p" : h === 18 ? "6p" : ""}
              </span>
            </div>
          ))}
        </div>

        {/* Active Hours Bar */}
        {barWidth > 0 && (
          <motion.div
            className="absolute top-1/2 -translate-y-1/2 h-3 sm:h-4 rounded-full"
            style={{
              left: `${barOffset}%`,
              right: `${100 - barOffset - barWidth}%`,
            }}
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: index * 0.06, ease: "easeOut" }}
          >
            <div
              className={`w-full h-full rounded-full ${
                isToday
                  ? "bg-gradient-to-r from-brand-gold to-[#E4D49A] shadow-[0_0_16px_rgba(198,168,75,0.35)]"
                  : "bg-gradient-to-r from-brand-gold/60 to-brand-gold/40"
              }`}
            />
            {isToday && (
              <motion.div
                className="absolute inset-0 rounded-full"
                animate={{
                  boxShadow: [
                    "0 0 8px rgba(198,168,75,0.3)",
                    "0 0 20px rgba(198,168,75,0.5)",
                    "0 0 8px rgba(198,168,75,0.3)",
                  ],
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
            )}
          </motion.div>
        )}

        {/* Current time indicator */}
        {isToday && mounted && (
          <CurrentTimeIndicator />
        )}
      </div>

      {/* Time Range Text */}
      <div className="flex-shrink-0 w-20 sm:w-24 text-right">
        {day.isClosed ? (
          <span className="text-sm font-body text-red-400/70 font-medium tracking-wide">
            Closed
          </span>
        ) : (
          <span
            className={`text-sm font-body tabular-nums tracking-wide ${
              isToday ? "text-brand-gold font-semibold" : "text-white/60"
            }`}
          >
            {String(day.open).padStart(2, "0")}:00&ndash;
            {String(day.close).padStart(2, "0")}:00
          </span>
        )}
      </div>

      {/* Today indicator */}
      {isToday && (
        <motion.div
          className="flex-shrink-0"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-brand-gold/15 text-brand-gold text-[10px] font-body font-semibold uppercase tracking-widest">
            <Circle className="w-1.5 h-1.5 fill-brand-gold" />
            Today
          </span>
        </motion.div>
      )}
    </motion.div>
  );
}

function CurrentTimeIndicator() {
  const [position, setPosition] = useState(0);

  useEffect(() => {
    const updatePosition = () => {
      const { hours, minutes } = getSASTTime();
      const currentDecimal = hours + minutes / 60;
      setPosition((currentDecimal / 24) * 100);
    };
    updatePosition();
    const interval = setInterval(updatePosition, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="absolute top-1/2 -translate-y-1/2 z-10"
      style={{ left: `${position}%` }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
    >
      <motion.div
        className="relative"
        animate={{ y: [0, -2, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="w-0.5 h-6 bg-white rounded-full shadow-[0_0_6px_rgba(255,255,255,0.5)]" />
        <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-white rounded-full shadow-[0_0_8px_rgba(255,255,255,0.6)]" />
      </motion.div>
    </motion.div>
  );
}

function EmergencyCard() {
  return (
    <motion.div
      className="relative rounded-2xl overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      {/* Glass morphism card */}
      <div className="relative backdrop-blur-xl bg-white/[0.03] border border-brand-gold/25 rounded-2xl p-6 sm:p-8">
        {/* Subtle gold glow */}
        <div className="absolute -inset-px rounded-2xl bg-gradient-to-b from-brand-gold/10 via-transparent to-transparent pointer-events-none" />

        {/* Red urgency glow behind alert */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative">
          {/* Header */}
          <div className="flex items-center gap-3 mb-4">
            <motion.div
              className="relative flex items-center justify-center w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20"
              animate={{
                boxShadow: [
                  "0 0 10px rgba(239, 68, 68, 0.15)",
                  "0 0 25px rgba(239, 68, 68, 0.25)",
                  "0 0 10px rgba(239, 68, 68, 0.15)",
                ],
              }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <AlertTriangle className="w-6 h-6 text-red-400" />
            </motion.div>
            <div>
              <h3 className="text-lg sm:text-xl font-display font-bold text-white tracking-wide">
                Emergency Legal Assistance
              </h3>
              <p className="text-xs font-body text-brand-muted/60 tracking-wide">
                Available 24 hours for urgent matters
              </p>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm font-body text-white/50 mb-6 leading-relaxed max-w-lg">
            Facing a legal emergency? Don&apos;t wait. Reach out to us immediately
            through phone or WhatsApp for priority assistance.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href={`tel:${PHONE_NUMBER.replace(/\s/g, "")}`}
              className="group inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-brand-gold to-[#D4B85A] text-brand-dark font-body font-semibold text-sm tracking-wide transition-all duration-300 hover:shadow-[0_4px_24px_rgba(198,168,75,0.35)] hover:-translate-y-0.5 active:translate-y-0"
              aria-label={`Call us at ${PHONE_NUMBER}`}
            >
              <Phone className="w-4.5 h-4.5 transition-transform duration-300 group-hover:rotate-12" />
              <span>Call {PHONE_NUMBER}</span>
              <ChevronRight className="w-4 h-4 opacity-0 -ml-2 transition-all duration-300 group-hover:opacity-100 group-hover:ml-0" />
            </a>

            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl border border-brand-gold/30 text-brand-gold font-body font-semibold text-sm tracking-wide transition-all duration-300 hover:bg-brand-gold/10 hover:border-brand-gold/50 hover:-translate-y-0.5 active:translate-y-0"
              aria-label="Contact us on WhatsApp"
            >
              <MessageCircle className="w-4.5 h-4.5 transition-transform duration-300 group-hover:scale-110" />
              <span>WhatsApp</span>
              <ChevronRight className="w-4 h-4 opacity-0 -ml-2 transition-all duration-300 group-hover:opacity-100 group-hover:ml-0" />
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────

export function OfficeHours() {
  const mounted = useHydrated();

  return (
    <section
      className="relative overflow-hidden bg-brand-dark py-16 sm:py-20 md:py-24"
      aria-labelledby="office-hours-heading"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Radial glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-brand-gold/[0.03] rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-brand-navy-light/30 rounded-full blur-[100px]" />

        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `linear-gradient(rgba(198,168,75,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(198,168,75,0.5) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal className="text-center mb-12 sm:mb-16">
          <span className="label-premium mb-4 block">Office Hours</span>

          {/* Main Heading */}
          <h2
            id="office-hours-heading"
            className="heading-gold-glossy"
          >
            When We're Available
          </h2>

          <p className="subheading-premium-dark mt-4">
            We understand that legal emergencies don't follow a schedule. Our team is available when you need us most — because justice shouldn't wait.
          </p>
        </ScrollReveal>

        {/* Live Clock + Status */}
        <ScrollReveal delay={0.15} className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-8 mb-10 sm:mb-14 p-5 sm:p-6 rounded-2xl bg-white/[0.02] border border-white/[0.05]">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-brand-gold/10 border border-brand-gold/15">
              <Clock className="w-5 h-5 text-brand-gold/80" />
            </div>
            <div>
              <p className="text-[10px] font-body font-semibold uppercase tracking-[0.2em] text-brand-muted/50 mb-0.5">
                Current Time (SAST)
              </p>
              <DigitalClock />
            </div>
          </div>

          <div className="flex flex-col items-center sm:items-end gap-1">
            <StatusBadge />
          </div>
        </ScrollReveal>

        {/* Visual Week Schedule */}
        <div className="mb-10 sm:mb-14">
          <ScrollReveal>
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px flex-1 bg-gradient-to-r from-brand-gold/20 to-transparent" />
              <span className="text-[10px] font-body font-semibold uppercase tracking-[0.25em] text-brand-muted/40">
                Weekly Schedule
              </span>
              <div className="h-px flex-1 bg-gradient-to-l from-brand-gold/20 to-transparent" />
            </div>
          </ScrollReveal>

          <StaggerContainer
            className="space-y-1.5 sm:space-y-2"
            staggerDelay={0.06}
          >
            {SCHEDULE.map((day, index) => (
              <DayScheduleRow key={day.day} day={day} index={index} />
            ))}
          </StaggerContainer>

          {/* Legend */}
          <ScrollReveal delay={0.4}>
            <div className="flex items-center justify-center gap-6 mt-6 text-[10px] font-body text-brand-muted/40 uppercase tracking-widest">
              <div className="flex items-center gap-2">
                <div className="w-8 h-1.5 rounded-full bg-gradient-to-r from-brand-gold/60 to-brand-gold/40" />
                <span>Operating Hours</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_4px_rgba(255,255,255,0.5)]" />
                <span>Current Time</span>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Emergency Contact */}
        <EmergencyCard />
      </div>
    </section>
  );
}
