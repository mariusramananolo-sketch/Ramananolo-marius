import React, { useRef, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'motion/react';
import {
  Building2,
  Calendar,
  ChevronDown,
  Check,
  MapPin,
  Briefcase,
} from 'lucide-react';
import { PORTFOLIO_CONTENT } from '../data/portfolio';
import { useLanguage } from '../context/LanguageContext';
import { EASE_EDITORIAL, SectionHeader, VIEWPORT_CONFIG } from './MotionPrimitives';
import { TechIcon } from './TechIcons';

export function ExperienceSection() {
  const { language } = useLanguage();
  const exp = PORTFOLIO_CONTENT[language].experience;

  const [expandedMap, setExpandedMap] = useState<Record<string, boolean>>({
    'nim-madagascar': true,
    'ohmy-fr-exp': true,
    'pine-script-exp': true,
  });

  const timelineRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 80%', 'end 65%'],
  });

  const lineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const toggleExpand = (id: string) => {
    setExpandedMap((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section
      id="experience"
      className="relative py-20 sm:py-28 bg-[#EAE5DB]/55 border-b border-[#111827]/8"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <SectionHeader index="02" kicker={exp.kicker} title={exp.title} />

        <div ref={timelineRef} className="relative pl-7 sm:pl-12 max-w-4xl">
          <div
            className="absolute left-2.5 sm:left-4 top-2 bottom-2 w-px bg-[#111827]/15"
            aria-hidden="true"
          />

          <motion.div
            style={
              prefersReducedMotion
                ? undefined
                : { scaleY: lineScaleY, transformOrigin: 'top' }
            }
            className="absolute left-2.5 sm:left-4 top-2 bottom-2 w-[2px] bg-[#2878F0]"
            aria-hidden="true"
          />

          <div className="space-y-8">
            {exp.items.map((item, cardIdx) => {
              const isExpanded = expandedMap[item.id] ?? true;

              return (
                <div key={item.id} className="relative">
                  {/* Timeline Node */}
                  <div
                    className={`absolute -left-[25px] sm:-left-[39px] top-8 w-3.5 h-3.5 rounded-full bg-[#F4F1EA] border-[3px] ${
                      cardIdx === 0 ? 'border-[#2878F0]' : 'border-[#F07855]'
                    }`}
                    aria-hidden="true"
                  />

                  <motion.article
                    initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={VIEWPORT_CONFIG}
                    transition={{
                      duration: 0.6,
                      delay: cardIdx * 0.08,
                      ease: EASE_EDITORIAL,
                    }}
                    className="rounded-2xl bg-[#FAF8F4] border border-[#111827]/10 p-6 sm:p-8 lg:p-10 shadow-[0_12px_32px_rgba(17,24,39,0.04)]"
                  >
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 pb-6 border-b border-[#111827]/10">
                      <div>
                        <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs font-semibold uppercase tracking-[0.14em] text-[#2878F0]">
                          <span className="inline-flex items-center gap-1.5">
                            <Building2 className="w-4 h-4 shrink-0" aria-hidden="true" />
                            <span>{item.company}</span>
                          </span>
                          <span className="text-[#858585]" aria-hidden="true">
                            ·
                          </span>
                          <span className="inline-flex items-center gap-1 text-[#F07855]">
                            <Briefcase className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                            <span>{item.employmentType}</span>
                          </span>
                        </div>

                        <h3 className="mt-2 font-identity text-2xl sm:text-[1.75rem] font-bold text-[#111827] tracking-tight">
                          {item.position}
                        </h3>
                      </div>

                      <div className="flex flex-col md:items-end gap-1.5 text-sm font-medium text-[#4B5563] tabular-nums shrink-0">
                        <div className="inline-flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-[#F07855] shrink-0" aria-hidden="true" />
                          <span className="text-[#111827] font-semibold">
                            {item.period}
                          </span>
                        </div>
                        {item.location && (
                          <div className="inline-flex items-center gap-1.5 text-xs text-[#858585]">
                            <MapPin className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                            <span>{item.location}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <p className="mt-6 text-base sm:text-[17px] text-[#374151] leading-relaxed">
                      {item.description}
                    </p>

                    <div className="mt-7">
                      <h4 className="text-xs font-semibold uppercase tracking-[0.14em] text-[#858585] mb-3">
                        {exp.technologiesLabel}
                      </h4>
                      <div className="flex flex-wrap gap-2.5">
                        {item.technologies.map((tech, idx) => (
                          <motion.div
                            key={tech}
                            initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={VIEWPORT_CONFIG}
                            transition={{
                              duration: 0.35,
                              delay: 0.04 * idx,
                              ease: EASE_EDITORIAL,
                            }}
                            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#F4F1EA] border border-[#111827]/12 text-xs sm:text-sm font-medium text-[#111827]"
                          >
                            <TechIcon name={tech} className="w-4 h-4 text-[#2878F0]" />
                            <span className="whitespace-nowrap">{tech}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-[#111827]/10">
                      <button
                        type="button"
                        onClick={() => toggleExpand(item.id)}
                        aria-expanded={isExpanded}
                        className="inline-flex items-center justify-between w-full text-left group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2878F0] rounded"
                      >
                        <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#111827] group-hover:text-[#2878F0] transition-colors">
                          {exp.responsibilitiesLabel} ({item.responsibilities.length})
                        </span>
                        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[#4B5563] group-hover:text-[#111827] transition-colors">
                          <span>{isExpanded ? exp.hideDetails : exp.showDetails}</span>
                          <ChevronDown
                            className={`w-4 h-4 transition-transform duration-200 ${
                              isExpanded ? 'rotate-180' : ''
                            }`}
                            aria-hidden="true"
                          />
                        </span>
                      </button>

                      <AnimatePresence initial={false}>
                        {isExpanded && (
                          <motion.ul
                            initial={
                              prefersReducedMotion
                                ? { opacity: 1 }
                                : { opacity: 0, y: -6 }
                            }
                            animate={{ opacity: 1, y: 0 }}
                            exit={
                              prefersReducedMotion
                                ? { opacity: 0 }
                                : { opacity: 0, y: -6 }
                            }
                            transition={{ duration: 0.25, ease: EASE_EDITORIAL }}
                            className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3"
                          >
                            {item.responsibilities.map((resp) => (
                              <li
                                key={resp}
                                className="flex items-start gap-2.5 text-sm sm:text-[15px] text-[#374151] leading-relaxed"
                              >
                                <Check
                                  className="w-4 h-4 text-[#2878F0] mt-1 shrink-0"
                                  aria-hidden="true"
                                />
                                <span>{resp}</span>
                              </li>
                            ))}
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.article>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
