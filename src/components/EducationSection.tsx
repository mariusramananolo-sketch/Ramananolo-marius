import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { GraduationCap, Shield, Code2, Calendar } from 'lucide-react';
import { PORTFOLIO_CONTENT } from '../data/portfolio';
import { useLanguage } from '../context/LanguageContext';
import { EASE_EDITORIAL, SectionHeader, VIEWPORT_CONFIG } from './MotionPrimitives';

export function EducationSection() {
  const { language } = useLanguage();
  const eduContent = PORTFOLIO_CONTENT[language].education;
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="education"
      className="relative py-20 sm:py-28 bg-[#F4F1EA] border-b border-[#111827]/8"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <SectionHeader
          index="05"
          kicker={eduContent.kicker}
          title={eduContent.title}
        />

        <div className="relative pl-7 sm:pl-12 max-w-4xl">
          <div
            className="absolute left-2.5 sm:left-4 top-3 bottom-3 w-px bg-[#111827]/18"
            aria-hidden="true"
          />

          <div className="space-y-8">
            {eduContent.items.map((edu, idx) => (
              <motion.article
                key={edu.degree}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEWPORT_CONFIG}
                transition={{
                  duration: 0.55,
                  delay: 0.1 * idx,
                  ease: EASE_EDITORIAL,
                }}
                className="relative rounded-2xl bg-[#FAF8F4] border border-[#111827]/10 p-6 sm:p-8"
              >
                <div
                  className={`absolute -left-[25px] sm:-left-[39px] top-8 w-3.5 h-3.5 rounded-full border-[3px] bg-[#F4F1EA] ${
                    edu.isCurrent ? 'border-[#F07855]' : 'border-[#2878F0]'
                  }`}
                  aria-hidden="true"
                />

                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 pb-5 border-b border-[#111827]/10">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#858585]">
                      <span>{edu.stage}</span>
                      <span aria-hidden="true">·</span>
                      <span
                        className={
                          edu.isCurrent ? 'text-[#F07855]' : 'text-[#2878F0]'
                        }
                      >
                        {edu.institution}
                      </span>
                    </div>

                    <h3 className="mt-2 font-identity text-xl sm:text-2xl font-bold text-[#111827]">
                      {edu.degree}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2 text-sm font-medium text-[#4B5563] tabular-nums shrink-0">
                    {edu.isCurrent ? (
                      <Shield
                        className="w-4 h-4 text-[#F07855]"
                        aria-hidden="true"
                      />
                    ) : (
                      <Code2
                        className="w-4 h-4 text-[#2878F0]"
                        aria-hidden="true"
                      />
                    )}
                    <Calendar
                      className="w-4 h-4 text-[#858585]"
                      aria-hidden="true"
                    />
                    <span className="text-[#111827] font-semibold">
                      {edu.period}
                    </span>
                  </div>
                </div>

                <div className="mt-5 flex items-start gap-3 text-sm sm:text-[15px] text-[#374151] leading-relaxed">
                  <GraduationCap
                    className="w-4 h-4 text-[#858585] mt-1 shrink-0"
                    aria-hidden="true"
                  />
                  <p>{edu.description}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
