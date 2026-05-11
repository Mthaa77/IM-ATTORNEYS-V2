"use client";

import { ReactNode } from "react";

/**
 * Gentle page entrance animation using pure CSS.
 * Replaces the old Framer Motion version that could fail in
 * iframe / SSR-hydration environments, leaving content permanently hidden.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  return (
    <div className="animate-[pageFadeIn_0.6s_ease-out_0.2s_both]">
      {children}
    </div>
  );
}
