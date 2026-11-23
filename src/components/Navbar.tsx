import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { PORTFOLIO_CONTENT } from '../data/portfolio';
import { useLanguage } from '../context/LanguageContext';
import { MonogramLogo } from './TechIcons';
import { EASE_EDITORIAL } from './MotionPrimitives';
import { LanguageSwitcher } from './LanguageSwitcher';

export function Navbar() {
  const { language } = useLanguage();
  const navContent = PORTFOLIO_CONTENT[language].nav;

  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState('home');
  const [mobileOpen, setMobileOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sections = navContent.items
      .map((item) => document.getElementById(item.id))
      .filter(Boolean) as HTMLElement[];

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: '-30% 0px -55% 0px',
        threshold: [0.05, 0.2, 0.5],
      }
    );

    sections.forEach((sec) => observer.observe(sec));
    return () => observer.disconnect();
  }, [navContent.items]);

  const scrollToSection = (id: string) => {
    setMobileOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-200 ${
        scrolled
          ? 'bg-[#F4F1EA]/90 backdrop-blur-md border-b border-[#111827]/10'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 h-16 md:h-[72px] flex items-center justify-between gap-6">
        {/* Left: Personal Monogram MR */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection('home');
          }}
          className="flex items-center gap-2.5 shrink-0 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2878F0] rounded-lg"
          aria-label="Marius Ramananolo"
        >
          <MonogramLogo className="w-9 h-9 transition-transform duration-200 group-hover:scale-105" />
          <span className="sr-only">Marius RAMANANOLO</span>
        </a>

        {/* Center/Right Navigation Links */}
        <nav
          aria-label="Primary Navigation"
          className="hidden lg:flex items-center gap-7"
        >
          {navContent.items.map((item) => {
            const isActive = activeId === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.id);
                }}
                className={`relative py-1.5 text-sm font-medium whitespace-nowrap shrink-0 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2878F0] rounded ${
                  isActive
                    ? 'text-[#111827]'
                    : 'text-[#4B5563] hover:text-[#111827]'
                }`}
              >
                {item.label}
                {isActive && (
                  <motion.span
                    layoutId="active-nav-indicator"
                    transition={{ duration: 0.25, ease: EASE_EDITORIAL }}
                    className="absolute left-0 right-0 -bottom-0.5 h-[2px] bg-[#2878F0] rounded-full"
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Right: Language Option + Primary Action + Mobile Trigger */}
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
          <LanguageSwitcher />

          <button
            type="button"
            onClick={() => scrollToSection('contact')}
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#111827] text-[#F4F1EA] text-sm font-medium whitespace-nowrap shrink-0 hover:bg-[#2878F0] transition-colors duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2878F0] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F4F1EA]"
          >
            <span>{navContent.letsTalk}</span>
            <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? navContent.closeMenu : navContent.openMenu}
            className="lg:hidden inline-flex items-center justify-center w-11 h-11 rounded-lg border border-[#111827]/15 text-[#111827] hover:bg-[#111827]/5 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2878F0]"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Animated Navigation Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: EASE_EDITORIAL }}
            className="lg:hidden bg-[#F4F1EA]/98 backdrop-blur-md border-b border-[#111827]/12 px-5 pb-6 pt-2"
          >
            <nav aria-label="Mobile Navigation" className="flex flex-col gap-1">
              {navContent.items.map((item) => {
                const isActive = activeId === item.id;
                return (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(item.id);
                    }}
                    className={`flex items-center justify-between min-h-[44px] px-3 rounded-lg text-base font-medium transition-colors ${
                      isActive
                        ? 'bg-[#111827] text-[#F4F1EA]'
                        : 'text-[#111827] hover:bg-[#111827]/5'
                    }`}
                  >
                    <span>{item.label}</span>
                    {isActive && (
                      <span className="text-xs text-[#2878F0] font-semibold">
                        {navContent.currentLabel}
                      </span>
                    )}
                  </a>
                );
              })}

              <div className="mt-3 pt-3 border-t border-[#111827]/10 flex items-center justify-between gap-3">
                <LanguageSwitcher showLabel />
                <button
                  type="button"
                  onClick={() => scrollToSection('contact')}
                  className="flex-1 min-h-[44px] inline-flex items-center justify-center gap-2 rounded-lg bg-[#2878F0] text-white text-sm font-semibold hover:bg-[#1e63cf] transition-colors cursor-pointer"
                >
                  <span>{navContent.letsTalk}</span>
                  <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
