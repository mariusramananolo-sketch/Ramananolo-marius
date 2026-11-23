import React, { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import {
  ArrowUpRight,
  Eye,
  X,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Terminal,
  ShieldCheck,
  FileText,
  ExternalLink,
} from 'lucide-react';
import { PORTFOLIO_CONTENT, type ProjectItem } from '../data/portfolio';
import { useLanguage } from '../context/LanguageContext';
import { EASE_EDITORIAL, SectionHeader, VIEWPORT_CONFIG } from './MotionPrimitives';
import { TechIcon } from './TechIcons';

interface ProjectGalleryProps {
  project: ProjectItem;
  prevLabel: string;
  nextLabel: string;
  goToSlideLabel: string;
  tlsPlaceholderTitle: string;
  tlsPlaceholderNote: string;
  linuxPlaceholderTitle: string;
  linuxPlaceholderNote: string;
}

function ProjectVisualGallery({
  project,
  prevLabel,
  nextLabel,
  goToSlideLabel,
  tlsPlaceholderTitle,
  tlsPlaceholderNote,
  linuxPlaceholderTitle,
  linuxPlaceholderNote,
}: ProjectGalleryProps) {
  const images = project.images;
  const hasMultiple = images.length > 1;
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const isDarkCanvas =
    project.id === 'stock-matcher' || project.id === 'openssl-cryptography';

  const goNext = useCallback(() => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const goPrev = useCallback(() => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  const goToIndex = (index: number) => {
    if (index === activeIndex) return;
    setDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
  };

  useEffect(() => {
    if (!hasMultiple || isPaused || prefersReducedMotion) return;
    const timer = window.setInterval(() => {
      setDirection(1);
      setActiveIndex((prev) => (prev + 1) % images.length);
    }, 4800);
    return () => window.clearInterval(timer);
  }, [hasMultiple, isPaused, prefersReducedMotion, images.length]);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!hasMultiple) return;
    touchStartX.current = e.touches[0].clientX;
    setIsPaused(true);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!hasMultiple || touchStartX.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(deltaX) > 40) {
      if (deltaX < 0) goNext();
      else goPrev();
    }
    touchStartX.current = null;
    setIsPaused(false);
  };

  // Case 1: No screenshot provided (TLS/HTTPS Analysis or Linux Server Administration Laboratory)
  if (images.length === 0) {
    const isTls = project.placeholderKind === 'tls';
    const placeholderTitle = isTls ? tlsPlaceholderTitle : linuxPlaceholderTitle;
    const placeholderNote = isTls ? tlsPlaceholderNote : linuxPlaceholderNote;

    return (
      <div className="relative w-full aspect-[16/10] rounded-xl bg-[#EAE5DB]/80 border border-[#111827]/12 flex flex-col items-center justify-center p-6 text-center">
        <div
          className="absolute inset-0 opacity-35 pointer-events-none rounded-xl"
          style={{
            backgroundImage:
              'radial-gradient(rgba(17, 24, 39, 0.14) 1px, transparent 1px)',
            backgroundSize: '20px 20px',
          }}
          aria-hidden="true"
        />
        <div className="relative z-10 flex flex-col items-center max-w-sm">
          <div
            className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
              isTls
                ? 'bg-[#2878F0] text-white'
                : 'bg-[#111827] text-[#F4F1EA]'
            }`}
          >
            {isTls ? (
              <ShieldCheck className="w-5 h-5" aria-hidden="true" />
            ) : (
              <Terminal className="w-5 h-5" aria-hidden="true" />
            )}
          </div>
          <p className="font-identity text-base font-semibold text-[#111827]">
            {placeholderTitle}
          </p>
          <p className="mt-1.5 text-xs text-[#4B5563] leading-relaxed">
            {placeholderNote}
          </p>
        </div>
      </div>
    );
  }

  // Case 2: Single polished preview without slideshow controls (Stock Manager, Ohmy.fr)
  if (images.length === 1) {
    const img = images[0];
    return (
      <div className="w-full flex flex-col justify-center">
        <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden bg-[#F4F1EA] border border-[#111827]/12 shadow-[0_8px_24px_rgba(17,24,39,0.06)]">
          <img
            src={img.src}
            alt={img.alt}
            loading="lazy"
            referrerPolicy="no-referrer"
            className="w-full h-full object-contain bg-[#FAF8F4] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.015]"
          />
        </div>
      </div>
    );
  }

  // Case 3: Multi-image interactive animated gallery (OpenSSL: 5, NIM: 3, Stock Matcher: 2)
  const currentImage = images[activeIndex];

  return (
    <div
      className="w-full flex flex-col justify-center gap-3"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={() => setIsPaused(false)}
    >
      {/* Main Interactive Gallery Viewport */}
      <div
        className={`relative w-full aspect-[16/10] rounded-xl overflow-hidden border border-[#111827]/14 shadow-[0_10px_28px_rgba(17,24,39,0.07)] select-none ${
          isDarkCanvas ? 'bg-[#0B0D12]' : 'bg-[#FAF8F4]'
        }`}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <AnimatePresence initial={false} mode="wait">
          <motion.img
            key={currentImage.src}
            src={currentImage.src}
            alt={currentImage.alt}
            loading="lazy"
            referrerPolicy="no-referrer"
            initial={
              prefersReducedMotion
                ? { opacity: 1 }
                : { opacity: 0, x: direction * 18 }
            }
            animate={{ opacity: 1, x: 0 }}
            exit={
              prefersReducedMotion
                ? { opacity: 0 }
                : { opacity: 0, x: direction * -18 }
            }
            transition={{ duration: 0.32, ease: EASE_EDITORIAL }}
            className="w-full h-full object-contain"
          />
        </AnimatePresence>

        {/* Subtle Previous / Next Navigation Arrows */}
        <button
          type="button"
          onClick={goPrev}
          aria-label={prevLabel}
          className="absolute left-2.5 top-1/2 -translate-y-1/2 z-10 inline-flex items-center justify-center w-9 h-9 rounded-full bg-[#111827]/78 text-[#F4F1EA] border border-white/15 backdrop-blur-sm hover:bg-[#2878F0] transition-colors duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2878F0]"
        >
          <ChevronLeft className="w-4 h-4" aria-hidden="true" />
        </button>

        <button
          type="button"
          onClick={goNext}
          aria-label={nextLabel}
          className="absolute right-2.5 top-1/2 -translate-y-1/2 z-10 inline-flex items-center justify-center w-9 h-9 rounded-full bg-[#111827]/78 text-[#F4F1EA] border border-white/15 backdrop-blur-sm hover:bg-[#2878F0] transition-colors duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2878F0]"
        >
          <ChevronRight className="w-4 h-4" aria-hidden="true" />
        </button>

        {/* Subtle Slide Counter / Caption Overlay */}
        <div className="pointer-events-none absolute bottom-2.5 left-3 right-3 flex items-center justify-between gap-2">
          {currentImage.caption ? (
            <span className="px-2.5 py-1 rounded-md bg-[#111827]/78 text-[#F4F1EA] text-[11px] font-medium backdrop-blur-sm">
              {currentImage.caption}
            </span>
          ) : (
            <span />
          )}
          <span className="px-2 py-1 rounded-md bg-[#111827]/78 text-[#F4F1EA] text-[11px] font-medium tabular-nums backdrop-blur-sm">
            {activeIndex + 1} / {images.length}
          </span>
        </div>
      </div>

      {/* Pagination Indicators + Compact Wrapping Thumbnails */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-0.5">
        <div className="flex flex-wrap items-center gap-2">
          {images.map((img, idx) => {
            const isActive = idx === activeIndex;
            return (
              <button
                key={img.src}
                type="button"
                onClick={() => goToIndex(idx)}
                aria-label={`${goToSlideLabel} ${idx + 1}`}
                aria-current={isActive ? 'true' : undefined}
                className={`relative w-12 sm:w-14 aspect-[16/10] rounded-md overflow-hidden border transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2878F0] ${
                  isActive
                    ? 'border-[#2878F0] ring-2 ring-[#2878F0]/25 opacity-100'
                    : 'border-[#111827]/15 opacity-60 hover:opacity-95'
                }`}
              >
                <img
                  src={img.src}
                  alt=""
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top"
                />
              </button>
            );
          })}
        </div>

        {/* Minimalist Pagination Dots */}
        <div className="flex items-center gap-1.5" aria-hidden="true">
          {images.map((img, idx) => (
            <span
              key={img.src}
              className={`h-1.5 rounded-full transition-all duration-200 ${
                idx === activeIndex
                  ? 'w-5 bg-[#2878F0]'
                  : 'w-1.5 bg-[#111827]/25'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export function ProjectsSection() {
  const { language } = useLanguage();
  const projectsContent = PORTFOLIO_CONTENT[language].projects;

  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const selectedProject =
    projectsContent.items.find((p) => p.id === selectedProjectId) || null;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedProjectId(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const isAcademicProject = (project: ProjectItem) =>
    project.id === 'openssl-cryptography' || project.id === 'tls-x509-analysis';

  return (
    <section
      id="projects"
      className="relative py-20 sm:py-28 bg-[#EAE5DB]/55 border-b border-[#111827]/8"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <SectionHeader
          index="04"
          kicker={projectsContent.kicker}
          title={projectsContent.title}
          subtitle={projectsContent.subtitle}
        />

        <div className="space-y-12 lg:space-y-16">
          {projectsContent.items.map((project, idx) => {
            const isReversed = idx % 2 === 1;

            return (
              <motion.article
                key={project.id}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEWPORT_CONFIG}
                transition={{ duration: 0.65, ease: EASE_EDITORIAL }}
                className="group rounded-2xl bg-[#FAF8F4] border border-[#111827]/10 p-6 sm:p-8 lg:p-10 shadow-[0_14px_34px_rgba(17,24,39,0.04)] hover:border-[#2878F0]/35 transition-colors duration-200"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                  {/* Animated Gallery / Single Preview / Clean Placeholder */}
                  <div
                    className={`lg:col-span-6 flex ${
                      isReversed ? 'lg:order-2' : 'lg:order-1'
                    }`}
                  >
                    <ProjectVisualGallery
                      project={project}
                      prevLabel={projectsContent.prevImageLabel}
                      nextLabel={projectsContent.nextImageLabel}
                      goToSlideLabel={projectsContent.goToSlideLabel}
                      tlsPlaceholderTitle={projectsContent.tlsPlaceholderTitle}
                      tlsPlaceholderNote={projectsContent.tlsPlaceholderNote}
                      linuxPlaceholderTitle={projectsContent.linuxPlaceholderTitle}
                      linuxPlaceholderNote={projectsContent.linuxPlaceholderNote}
                    />
                  </div>

                  {/* Editorial Project Copy */}
                  <div
                    className={`lg:col-span-6 flex flex-col justify-between ${
                      isReversed ? 'lg:order-1' : 'lg:order-2'
                    }`}
                  >
                    <div>
                      <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#858585]">
                        <span className="font-display text-base text-[#2878F0] tabular-nums">
                          {projectsContent.projectPrefix} {project.number}
                        </span>
                        {project.projectType && (
                          <>
                            <span aria-hidden="true">·</span>
                            <span>{project.projectType}</span>
                          </>
                        )}
                        {project.status && project.status !== project.projectType && (
                          <>
                            <span aria-hidden="true">·</span>
                            <span className="text-[#F07855]">{project.status}</span>
                          </>
                        )}
                      </div>

                      <h3 className="mt-2 font-identity text-2xl sm:text-3xl font-bold text-[#111827] tracking-tight">
                        {project.title}
                      </h3>

                      {project.clientContext && (
                        <p className="mt-2 text-sm font-medium text-[#2878F0]">
                          {project.clientContext}
                        </p>
                      )}

                      <p className="mt-4 text-base sm:text-[17px] text-[#374151] leading-relaxed">
                        {project.description}
                      </p>

                      {project.involvement && (
                        <p className="mt-4 pt-4 border-t border-[#111827]/10 text-sm text-[#4B5563] leading-relaxed">
                          <span className="font-semibold text-[#111827]">
                            {projectsContent.involvementLabel}{' '}
                          </span>
                          {project.involvement}
                        </p>
                      )}

                      <div className="mt-6">
                        <span className="block text-xs font-semibold uppercase tracking-[0.14em] text-[#858585] mb-2.5">
                          {projectsContent.stackLabel}
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.map((tech) => (
                            <span
                              key={tech}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#F4F1EA] border border-[#111827]/12 text-xs font-medium text-[#111827]"
                            >
                              <TechIcon
                                name={tech}
                                className="w-3.5 h-3.5 text-[#2878F0]"
                              />
                              <span className="whitespace-nowrap">{tech}</span>
                            </span>
                          ))}
                        </div>
                      </div>

                      {project.docLinks && project.docLinks.length > 0 && (
                        <div className="mt-6 pt-5 border-t border-[#111827]/10">
                          <span className="block text-xs font-semibold uppercase tracking-[0.14em] text-[#858585] mb-2.5">
                            {projectsContent.docsLabel}
                          </span>
                          <div className="flex flex-wrap gap-2">
                            {project.docLinks.map((doc) => (
                              <a
                                key={doc.url}
                                href={doc.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#F4F1EA] border border-[#111827]/15 text-xs font-medium text-[#111827] hover:border-[#2878F0] hover:text-[#2878F0] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2878F0]"
                              >
                                <FileText className="w-3.5 h-3.5 text-[#2878F0] shrink-0" aria-hidden="true" />
                                <span>{doc.label}</span>
                                <ExternalLink className="w-3 h-3 opacity-70 shrink-0" aria-hidden="true" />
                              </a>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="mt-8 pt-6 border-t border-[#111827]/10 flex flex-wrap items-center gap-4">
                      <button
                        type="button"
                        onClick={() => setSelectedProjectId(project.id)}
                        className="inline-flex items-center gap-2 min-h-[42px] px-5 py-2 rounded-lg bg-[#111827] text-[#F4F1EA] text-sm font-medium whitespace-nowrap shrink-0 hover:bg-[#2878F0] transition-colors duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2878F0]"
                      >
                        <Eye className="w-4 h-4" aria-hidden="true" />
                        <span>{projectsContent.viewOverview}</span>
                      </button>

                      {project.externalUrl && (
                        <a
                          href={project.externalUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 min-h-[42px] px-4 py-2 rounded-lg border border-[#111827]/20 text-sm font-medium text-[#111827] whitespace-nowrap shrink-0 hover:border-[#2878F0] hover:text-[#2878F0] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2878F0]"
                        >
                          <span>
                            {projectsContent.visitPrefix} {project.title}
                          </span>
                          <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>

      {/* Project Overview Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-[#111827]/65 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
            onClick={() => setSelectedProjectId(null)}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-project-title"
          >
            <motion.div
              initial={
                prefersReducedMotion
                  ? { opacity: 1 }
                  : { opacity: 0, scale: 0.96, y: 16 }
              }
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={
                prefersReducedMotion
                  ? { opacity: 0 }
                  : { opacity: 0, scale: 0.96, y: 12 }
              }
              transition={{ duration: 0.25, ease: EASE_EDITORIAL }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-2xl rounded-2xl bg-[#FAF8F4] border border-[#111827]/15 p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-start justify-between gap-4 pb-5 border-b border-[#111827]/10">
                <div>
                  <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#858585]">
                    <span className="text-[#2878F0]">
                      {projectsContent.projectPrefix} {selectedProject.number}
                    </span>
                    {selectedProject.projectType && (
                      <>
                        <span aria-hidden="true">·</span>
                        <span>{selectedProject.projectType}</span>
                      </>
                    )}
                    {selectedProject.status &&
                      selectedProject.status !== selectedProject.projectType && (
                        <>
                          <span aria-hidden="true">·</span>
                          <span className="text-[#F07855]">
                            {selectedProject.status}
                          </span>
                        </>
                      )}
                  </div>
                  <h3
                    id="modal-project-title"
                    className="mt-1.5 font-identity text-2xl sm:text-3xl font-bold text-[#111827]"
                  >
                    {selectedProject.title}
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedProjectId(null)}
                  aria-label={projectsContent.closeModal}
                  className="inline-flex items-center justify-center w-10 h-10 rounded-lg border border-[#111827]/15 text-[#111827] hover:bg-[#111827] hover:text-[#F4F1EA] transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="mt-6 space-y-6">
                {selectedProject.images.length > 0 && (
                  <ProjectVisualGallery
                    project={selectedProject}
                    prevLabel={projectsContent.prevImageLabel}
                    nextLabel={projectsContent.nextImageLabel}
                    goToSlideLabel={projectsContent.goToSlideLabel}
                    tlsPlaceholderTitle={projectsContent.tlsPlaceholderTitle}
                    tlsPlaceholderNote={projectsContent.tlsPlaceholderNote}
                    linuxPlaceholderTitle={projectsContent.linuxPlaceholderTitle}
                    linuxPlaceholderNote={projectsContent.linuxPlaceholderNote}
                  />
                )}

                {isAcademicProject(selectedProject) && (
                  <div className="p-3.5 rounded-xl bg-[#2878F0]/8 border border-[#2878F0]/25 text-xs sm:text-sm font-medium text-[#111827]">
                    {projectsContent.academicNotice}
                  </div>
                )}

                <p className="text-base text-[#374151] leading-relaxed">
                  {selectedProject.description}
                </p>

                {selectedProject.involvement && (
                  <div className="p-4 rounded-xl bg-[#EAE5DB]/65 border border-[#111827]/10 text-sm text-[#111827]">
                    <span className="font-semibold">
                      {projectsContent.involvementLabel}{' '}
                    </span>
                    {selectedProject.involvement}
                  </div>
                )}

                {selectedProject.clientContext && (
                  <div className="p-4 rounded-xl bg-[#EAE5DB]/65 border border-[#111827]/10 text-sm text-[#111827]">
                    <span className="font-semibold">
                      {projectsContent.clientContextLabel}{' '}
                    </span>
                    {selectedProject.clientContext}
                  </div>
                )}

                {selectedProject.practicalWork &&
                selectedProject.practicalWork.length > 0 ? (
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-[0.14em] text-[#858585] mb-3">
                      {projectsContent.practicalWorkTitle}
                    </h4>
                    <ul className="space-y-2">
                      {selectedProject.practicalWork.map((point) => (
                        <li
                          key={point}
                          className="flex items-start gap-2.5 text-sm sm:text-[15px] text-[#374151]"
                        >
                          <CheckCircle2
                            className="w-4 h-4 text-[#2878F0] mt-0.5 shrink-0"
                            aria-hidden="true"
                          />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-[0.14em] text-[#858585] mb-3">
                      {projectsContent.scopeTitle}
                    </h4>
                    <ul className="space-y-2.5">
                      {selectedProject.highlights.map((point) => (
                        <li
                          key={point}
                          className="flex items-start gap-2.5 text-sm sm:text-[15px] text-[#374151]"
                        >
                          <CheckCircle2
                            className="w-4 h-4 text-[#2878F0] mt-0.5 shrink-0"
                            aria-hidden="true"
                          />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {selectedProject.securityWork &&
                  selectedProject.securityWork.length > 0 && (
                    <div>
                      <h4 className="text-xs font-semibold uppercase tracking-[0.14em] text-[#858585] mb-3">
                        {projectsContent.securityWorkTitle}
                      </h4>
                      <ul className="space-y-2">
                        {selectedProject.securityWork.map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-2.5 text-sm sm:text-[15px] text-[#374151]"
                          >
                            <ShieldCheck
                              className="w-4 h-4 text-[#F07855] mt-0.5 shrink-0"
                              aria-hidden="true"
                            />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                {selectedProject.resultsSummary && (
                  <div className="p-4 rounded-xl bg-[#EAE5DB]/65 border border-[#111827]/10">
                    <h4 className="text-xs font-semibold uppercase tracking-[0.14em] text-[#858585] mb-1.5">
                      {projectsContent.resultsSummaryTitle}
                    </h4>
                    <p className="text-sm text-[#374151] leading-relaxed">
                      {selectedProject.resultsSummary}
                    </p>
                  </div>
                )}

                {selectedProject.docLinks && selectedProject.docLinks.length > 0 && (
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-[0.14em] text-[#858585] mb-3">
                      {projectsContent.docsLabel}
                    </h4>
                    <div className="space-y-2.5">
                      {selectedProject.docLinks.map((doc) => (
                        <a
                          key={doc.url}
                          href={doc.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between gap-3 p-3.5 rounded-xl bg-[#F4F1EA] border border-[#111827]/12 hover:border-[#2878F0] group transition-colors"
                        >
                          <div className="min-w-0">
                            <p className="text-xs text-[#4B5563] truncate">
                              {doc.topic}
                            </p>
                            <p className="text-sm font-semibold text-[#111827] group-hover:text-[#2878F0] transition-colors">
                              {doc.label}
                            </p>
                          </div>
                          <ExternalLink
                            className="w-4 h-4 text-[#858585] group-hover:text-[#2878F0] shrink-0"
                            aria-hidden="true"
                          />
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-[0.14em] text-[#858585] mb-3">
                    {projectsContent.technologiesTitle}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#F4F1EA] border border-[#111827]/12 text-xs font-medium text-[#111827]"
                      >
                        <TechIcon
                          name={tech}
                          className="w-3.5 h-3.5 text-[#2878F0]"
                        />
                        <span>{tech}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
