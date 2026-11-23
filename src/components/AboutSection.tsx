import React, { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { PORTFOLIO_CONTENT } from '../data/portfolio';
import { useLanguage } from '../context/LanguageContext';
import { EASE_EDITORIAL, SectionHeader, VIEWPORT_CONFIG } from './MotionPrimitives';

function ArchitecturalDefenseVisual() {
  const { language } = useLanguage();
  const labels = PORTFOLIO_CONTENT[language].about.visualLabels;
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const layerShift = useTransform(scrollYProgress, [0, 1], [-14, 14]);
  const accentShift = useTransform(scrollYProgress, [0, 1], [12, -12]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full min-h-[340px] sm:min-h-[400px] rounded-2xl bg-[#EAE5DB]/75 border border-[#111827]/12 p-6 sm:p-8 flex items-center justify-center overflow-hidden"
    >
      <div
        className="absolute inset-0 opacity-40 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(17,24,39,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(17,24,39,0.06) 1px, transparent 1px)',
          backgroundSize: '36px 36px',
        }}
        aria-hidden="true"
      />

      <motion.div
        style={prefersReducedMotion ? undefined : { y: layerShift }}
        className="relative z-10 w-full max-w-[360px]"
      >
        <svg
          viewBox="0 0 360 320"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto"
          role="img"
          aria-label={labels.ariaLabel}
        >
          <rect
            x="24"
            y="24"
            width="312"
            height="272"
            rx="14"
            fill="#FAF8F4"
            stroke="#111827"
            strokeOpacity="0.16"
            strokeWidth="1.5"
          />
          <text
            x="44"
            y="52"
            fill="#111827"
            fontSize="10.5"
            fontFamily="Sora, sans-serif"
            fontWeight="700"
            letterSpacing="1.2"
          >
            {labels.securityLayer}
          </text>
          <path
            d="M294 38L306 43V51C306 58 300.8 63.6 294 66C287.2 63.6 282 58 282 51V43L294 38Z"
            stroke="#F07855"
            strokeWidth="1.8"
            fill="#F07855"
            fillOpacity="0.12"
          />

          <rect
            x="48"
            y="80"
            width="264"
            height="192"
            rx="12"
            fill="#F4F1EA"
            stroke="#2878F0"
            strokeOpacity="0.4"
            strokeWidth="1.5"
          />
          <text
            x="68"
            y="108"
            fill="#2878F0"
            fontSize="10.5"
            fontFamily="Sora, sans-serif"
            fontWeight="700"
            letterSpacing="1.1"
          >
            {labels.backendLayer}
          </text>
          <text
            x="68"
            y="126"
            fill="#4B5563"
            fontSize="10.5"
            fontFamily="DM Sans, sans-serif"
          >
            {labels.backendStack}
          </text>

          <rect x="72" y="148" width="216" height="102" rx="10" fill="#111827" />
          <text
            x="92"
            y="178"
            fill="#F4F1EA"
            fontSize="10.5"
            fontFamily="Sora, sans-serif"
            fontWeight="700"
            letterSpacing="1"
          >
            {labels.uiLayer}
          </text>
          <text
            x="92"
            y="198"
            fill="#D1D5DB"
            fontSize="10.5"
            fontFamily="DM Sans, sans-serif"
          >
            {labels.uiStack}
          </text>
          <rect x="92" y="216" width="84" height="14" rx="4" fill="#2878F0" />
          <rect x="184" y="216" width="52" height="14" rx="4" fill="#F07855" />
        </svg>
      </motion.div>

      <motion.div
        style={prefersReducedMotion ? undefined : { y: accentShift }}
        className="absolute bottom-5 right-5 z-20 px-3.5 py-2 rounded-lg bg-[#FAF8F4] border border-[#111827]/12 shadow-sm text-xs font-medium text-[#111827]"
      >
        <span>{labels.badgeLeft}</span>
        <span className="mx-2 text-[#858585]" aria-hidden="true">
          ·
        </span>
        <span className="text-[#2878F0]">{labels.badgeRight}</span>
      </motion.div>
    </div>
  );
}

export function AboutSection() {
  const { language } = useLanguage();
  const about = PORTFOLIO_CONTENT[language].about;
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="about"
      className="relative py-20 sm:py-28 bg-[#F4F1EA] border-b border-[#111827]/8"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <SectionHeader index="01" kicker={about.kicker} title={about.title} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-stretch">
          <div className="lg:col-span-7 flex flex-col justify-between">
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT_CONFIG}
              transition={{ duration: 0.6, ease: EASE_EDITORIAL }}
              className="space-y-5 text-base sm:text-[17px] text-[#374151] leading-[1.75] max-w-2xl"
            >
              {about.paragraphs.map((paragraph, i) => (
                <p
                  key={i}
                  className={
                    i === 0
                      ? 'text-lg sm:text-xl font-medium text-[#111827] leading-relaxed'
                      : undefined
                  }
                >
                  {paragraph}
                </p>
              ))}
            </motion.div>

            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6 pt-8 border-t border-[#111827]/12">
              {about.facts.map((fact, idx) => (
                <motion.div
                  key={fact.label}
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={VIEWPORT_CONFIG}
                  transition={{
                    duration: 0.45,
                    delay: 0.08 * idx,
                    ease: EASE_EDITORIAL,
                  }}
                  className="pt-1"
                >
                  <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-[#858585]">
                    {fact.label}
                  </dt>
                  <dd className="mt-1.5 font-identity text-base font-semibold text-[#111827] leading-snug">
                    {fact.value}
                  </dd>
                </motion.div>
              ))}
            </div>

            {/* Languages (French — Intermediate, English — Intermediate) */}
            <div className="mt-8 pt-6 border-t border-[#111827]/12 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-8">
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#858585] shrink-0">
                {about.languagesTitle}
              </span>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm sm:text-[15px] text-[#111827]">
                {about.languages.map((lang) => (
                  <span key={lang.name} className="font-medium">
                    {lang.name}{' '}
                    <span className="text-[#4B5563] font-normal">
                      — {lang.level}
                    </span>
                  </span>
                ))}
              </div>
            </div>
          </div>

          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT_CONFIG}
            transition={{ duration: 0.65, delay: 0.12, ease: EASE_EDITORIAL }}
            className="lg:col-span-5 flex"
          >
            <ArchitecturalDefenseVisual />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
