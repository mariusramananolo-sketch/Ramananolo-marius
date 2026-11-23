import React, { useState } from 'react';
import { MARQUEE_TECHNOLOGIES } from '../data/portfolio';
import { TECH_BRAND_COLORS, TechIcon } from './TechIcons';

export function TechMarquee() {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const items = [...MARQUEE_TECHNOLOGIES, ...MARQUEE_TECHNOLOGIES];

  return (
    <section
      aria-label="Core Technologies Strip"
      className="relative w-full bg-[#111827] text-[#F4F1EA] border-y border-[#111827] py-4 sm:py-5 overflow-hidden"
    >
      <div className="marquee-wrapper relative flex items-center overflow-hidden">
        {/* Subtle left/right fade edges */}
        <div
          className="pointer-events-none absolute left-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-r from-[#111827] to-transparent z-10"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-l from-[#111827] to-transparent z-10"
          aria-hidden="true"
        />

        <div className="marquee-track items-center gap-8 sm:gap-12 px-4">
          {items.map((tech, idx) => {
            const isHovered = hoveredItem === `${tech}-${idx}`;
            const brandColor = TECH_BRAND_COLORS[tech] || '#2878F0';
            // Keep Next.js / GitHub crisp light on dark background when hovered
            const hoverColor =
              brandColor === '#111827' || brandColor === '#003B57'
                ? '#60A5FA'
                : brandColor;

            return (
              <div
                key={`${tech}-${idx}`}
                onMouseEnter={() => setHoveredItem(`${tech}-${idx}`)}
                onMouseLeave={() => setHoveredItem(null)}
                className="group flex items-center gap-3 px-2 py-1 transition-transform duration-200 hover:scale-105 cursor-default shrink-0"
              >
                <span
                  className="flex items-center justify-center transition-colors duration-200"
                  style={{ color: isHovered ? hoverColor : '#D1D5DB' }}
                >
                  <TechIcon name={tech} className="w-5 h-5 sm:w-6 sm:h-6" />
                </span>
                <span
                  className="font-identity text-sm sm:text-base font-medium tracking-tight whitespace-nowrap transition-colors duration-200"
                  style={{ color: isHovered ? '#FFFFFF' : '#E5E7EB' }}
                >
                  {tech}
                </span>
                <span
                  className="ml-4 sm:ml-6 text-[#F07855]/65 text-xs select-none"
                  aria-hidden="true"
                >
                  ·
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
