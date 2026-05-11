'use client';

import React from 'react';

const ROW_ONE_NAMES = [
  'Department of Justice SA',
  'Road Accident Fund',
  'Pretoria High Court',
  'Legal Aid South Africa',
  'Law Society of the Northern Provinces',
  'South African Police Service',
  'National Prosecuting Authority',
  'Menzies Aviation',
];

const ROW_TWO_NAMES = [
  'Discovery Health',
  'Momentum Metropolitan',
  'Old Mutual',
  'Standard Bank',
  'Nedbank',
  'FNB Commercial',
  'Absa Group',
  'Gauteng Provincial Government',
];

function DiamondSeparator() {
  return (
    <span className="inline-flex items-center justify-center mx-4 sm:mx-6 opacity-30 text-brand-gold select-none">
      <svg
        width="8"
        height="8"
        viewBox="0 0 8 8"
        fill="currentColor"
        className="rotate-45 shrink-0"
      >
        <rect width="8" height="8" rx="1" />
      </svg>
    </span>
  );
}

function MarqueeRow({
  names,
  reverse = false,
}: {
  names: string[];
  reverse?: boolean;
}) {
  const items = names.map((name, i) => (
    <React.Fragment key={`${name}-${i}`}>
      <span className="marquee-name font-body font-semibold text-brand-dark uppercase tracking-widest text-sm sm:text-lg whitespace-nowrap opacity-40 transition-all duration-300 hover:opacity-80 hover:drop-shadow-[0_0_8px_rgba(198,168,75,0.3)] cursor-default select-none">
        {name}
      </span>
      <DiamondSeparator />
    </React.Fragment>
  ));

  // Duplicate content for seamless infinite scroll
  const content = (
    <>
      {items}
      {items}
    </>
  );

  // Keyframe names
  const keyframeName = reverse
    ? 'marqueeScrollRight'
    : 'marqueeScrollLeft';

  return (
    <div className="marquee-container">
      <style>{`
        @keyframes ${keyframeName} {
          0% {
            transform: translateX(${reverse ? '-50%' : '0'});
          }
          100% {
            transform: translateX(${reverse ? '0' : '-50%'});
          }
        }
      `}</style>
      <div
        className="marquee-content group/marquee"
        style={{
          animation: `${keyframeName} 40s linear infinite`,
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLDivElement).style.animationPlayState =
            'paused';
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLDivElement).style.animationPlayState =
            'running';
        }}
      >
        {content}
      </div>
    </div>
  );
}

export function ClientMarquee() {
  return (
    <section className="relative w-full bg-brand-cream overflow-hidden py-10 sm:py-14 lg:py-16">
      {/* Top Label */}
      <div className="text-center mb-6 sm:mb-8 lg:mb-10 px-4">
        <span className="inline-block font-body text-xs sm:text-sm font-semibold tracking-[0.25em] uppercase text-brand-gold">
          Trusted By Leading Organizations
        </span>
      </div>

      {/* Row 1 — scrolls left */}
      <div className="mb-4 sm:mb-5 lg:mb-6">
        <MarqueeRow names={ROW_ONE_NAMES} reverse={false} />
      </div>

      {/* Row 2 — scrolls right */}
      <div className="mb-6 sm:mb-8 lg:mb-10">
        <MarqueeRow names={ROW_TWO_NAMES} reverse={true} />
      </div>

      {/* Bottom Gold Gradient Separator */}
      <div className="section-separator" />
    </section>
  );
}
