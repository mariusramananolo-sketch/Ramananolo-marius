import React, { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ShieldCheck, Layers } from 'lucide-react';
import { PORTFOLIO_CONTENT } from '../data/portfolio';
import { useLanguage } from '../context/LanguageContext';
import { EASE_EDITORIAL, SectionHeader, VIEWPORT_CONFIG } from './MotionPrimitives';
import { TechIcon } from './TechIcons';

export function SkillsSection() {
  const { language } = useLanguage();
  const skillsContent = PORTFOLIO_CONTENT[language].skills;

  const [activeFilter, setActiveFilter] = useState('all');
  const prefersReducedMotion = useReducedMotion();

  const visibleCategories =
    activeFilter === 'all'
      ? skillsContent.categories
      : skillsContent.categories.filter((cat) => cat.filterKey === activeFilter);

  return (
    <section
      id="skills"
      className="relative py-20 sm:py-28 bg-[#F4F1EA] border-b border-[#111827]/8"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12 md:mb-14">
          <div className="[&>div]:mb-0">
            <SectionHeader
              index="03"
              kicker={skillsContent.kicker}
              title={skillsContent.title}
            />
          </div>

          <div
            role="tablist"
            aria-label={skillsContent.filterAriaLabel}
            className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-xl bg-[#EAE5DB]/85 border border-[#111827]/10 self-start lg:self-end"
          >
            {skillsContent.filters.map((tab) => {
              const isSelected = activeFilter === tab.key;
              return (
                <button
                  key={tab.key}
                  role="tab"
                  type="button"
                  aria-selected={isSelected}
                  onClick={() => setActiveFilter(tab.key)}
                  className={`px-3.5 py-2 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap shrink-0 transition-colors duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2878F0] ${
                    isSelected
                      ? 'bg-[#111827] text-[#F4F1EA] shadow-sm'
                      : 'text-[#4B5563] hover:text-[#111827] hover:bg-[#F4F1EA]/60'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleCategories.map((category, idx) => {
            const isSecurity = category.id === 'cybersecurity';

            return (
              <motion.section
                key={category.id}
                layout
                initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEWPORT_CONFIG}
                transition={{
                  duration: 0.45,
                  delay: 0.06 * idx,
                  ease: EASE_EDITORIAL,
                }}
                className="rounded-2xl bg-[#FAF8F4] border border-[#111827]/10 p-6 sm:p-7 flex flex-col justify-between hover:border-[#2878F0]/35 transition-colors duration-200"
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-4 pb-4 border-b border-[#111827]/10">
                    <div>
                      <span className="text-xs font-medium tracking-[0.14em] uppercase text-[#858585]">
                        {category.code}
                      </span>
                      <h3 className="mt-1 font-identity text-lg sm:text-xl font-bold text-[#111827] leading-snug">
                        {category.title}
                      </h3>
                    </div>
                    {isSecurity && (
                      <ShieldCheck
                        className="w-5 h-5 text-[#F07855] shrink-0"
                        aria-hidden="true"
                      />
                    )}
                  </div>

                  <ul className="space-y-2.5">
                    {category.skills.map((skill) => (
                      <li
                        key={skill.name}
                        className="group flex items-center gap-3 py-1.5 px-2.5 -mx-2.5 rounded-lg hover:bg-[#F4F1EA] transition-colors duration-150"
                      >
                        <span
                          className="flex items-center justify-center w-7 h-7 rounded-md bg-[#F4F1EA] border border-[#111827]/10 text-[#111827] shrink-0 transition-transform duration-200 group-hover:scale-105"
                          style={{
                            color: skill.hasIcon ? undefined : '#4B5563',
                          }}
                        >
                          {skill.hasIcon ? (
                            <TechIcon
                              name={skill.iconKey}
                              className="w-4 h-4 transition-colors duration-200"
                              colored={false}
                            />
                          ) : isSecurity ? (
                            <ShieldCheck
                              className="w-4 h-4 text-[#F07855]"
                              aria-hidden="true"
                            />
                          ) : (
                            <Layers
                              className="w-4 h-4 text-[#2878F0]"
                              aria-hidden="true"
                            />
                          )}
                        </span>
                        <span className="text-sm sm:text-[15px] font-medium text-[#111827] group-hover:translate-x-0.5 transition-transform duration-150">
                          {skill.name}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {category.note && (
                  <p className="mt-5 pt-4 border-t border-[#111827]/10 text-xs text-[#4B5563] leading-relaxed">
                    {category.note}
                  </p>
                )}
              </motion.section>
            );
          })}
        </div>

        {/* Clean Programming & Scripting Languages summary line */}
        <div className="mt-8 pt-6 border-t border-[#111827]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-sm">
          <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#858585]">
            {skillsContent.languagesNoteLabel}
          </span>
          <span className="font-identity font-medium text-[#111827]">
            {skillsContent.languagesNoteValue}
          </span>
        </div>
      </div>
    </section>
  );
}
