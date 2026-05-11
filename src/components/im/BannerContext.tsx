"use client";

import { createContext, useState, useEffect, type ReactNode, type Context } from "react";

interface BannerContextType {
  bannerVisible: boolean;
  setBannerVisible: (visible: boolean) => void;
}

const BannerContext: Context<BannerContextType> = createContext<BannerContextType>({
  bannerVisible: false,
  setBannerVisible: () => {},
});

export function BannerProvider({ children }: { children: ReactNode }) {
  const [bannerVisible, setBannerVisible] = useState(false);

  useEffect(() => {
    const updateBannerHeight = () => {
      const banner = document.getElementById("im-onboarding-banner");
      const height = banner?.offsetHeight ?? 0;
      document.documentElement.style.setProperty("--banner-height", `${height}px`);
    };

    if (bannerVisible) {
      // Measure after a short delay (animation needs to start)
      const t1 = setTimeout(updateBannerHeight, 60);
      const t2 = setTimeout(updateBannerHeight, 500);
      const resizeObserver = new ResizeObserver(() => updateBannerHeight());

      const banner = document.getElementById("im-onboarding-banner");
      if (banner) resizeObserver.observe(banner);

      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        resizeObserver.disconnect();
      };
    } else {
      document.documentElement.style.setProperty("--banner-height", "0px");
    }
  }, [bannerVisible]);

  return (
    <BannerContext.Provider value={{ bannerVisible, setBannerVisible }}>
      {children}
    </BannerContext.Provider>
  );
}

export { BannerContext };
