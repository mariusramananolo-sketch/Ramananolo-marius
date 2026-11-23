import React from 'react';
import { ArrowUp, ExternalLink } from 'lucide-react';
import { useReducedMotion } from 'motion/react';
import { PORTFOLIO_CONTENT, REAL_CONTACT } from '../data/portfolio';
import { useLanguage } from '../context/LanguageContext';
import { MonogramLogo } from './TechIcons';
import { LanguageSwitcher } from './LanguageSwitcher';

export function Footer() {
  const { language } = useLanguage();
  const content = PORTFOLIO_CONTENT[language];
  const footer = content.footer;
  const navItems = content.nav.items;

  const prefersReducedMotion = useReducedMotion();
  const currentYear = new Date().getFullYear();

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    });
  };

  return (
    <footer className="bg-[#111827] text-[#F4F1EA] py-14 sm:py-16">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-10 border-b border-[#F4F1EA]/12">
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <MonogramLogo className="w-10 h-10" />
              <div>
                <p className="font-identity text-lg font-bold tracking-tight text-[#F4F1EA]">
                  {REAL_CONTACT.name}
                </p>
                <p className="text-xs text-[#9CA3AF]">{footer.roleSubtitle}</p>
              </div>
            </div>

            <p className="text-sm text-[#D1D5DB] leading-relaxed max-w-sm">
              {footer.bio}
            </p>
          </div>

          <div className="md:col-span-4">
            <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-[#9CA3AF] mb-4">
              {footer.navigationTitle}
            </h2>
            <nav aria-label="Footer Navigation" className="grid grid-cols-2 gap-2.5">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo(item.id);
                  }}
                  className="text-sm text-[#E5E7EB] hover:text-[#2878F0] transition-colors w-fit"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>

          <div className="md:col-span-3 flex flex-col justify-between items-start md:items-end gap-6">
            <div className="md:text-right">
              <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-[#9CA3AF] mb-3">
                {footer.connectTitle}
              </h2>
              <div className="flex flex-col md:items-end gap-2 text-sm text-[#D1D5DB]">
                <a
                  href={REAL_CONTACT.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 hover:text-[#2878F0] transition-colors"
                >
                  <span>{footer.linkedinLabel}</span>
                  <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                </a>
                <a
                  href={`mailto:${REAL_CONTACT.email}`}
                  className="hover:text-[#F07855] transition-colors"
                >
                  {REAL_CONTACT.email}
                </a>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <LanguageSwitcher variant="dark" />
              <button
                type="button"
                onClick={scrollToTop}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-[#F4F1EA]/20 text-xs font-semibold uppercase tracking-wider text-[#F4F1EA] hover:border-[#2878F0] hover:bg-[#2878F0] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2878F0]"
              >
                <span>{footer.backToTop}</span>
                <ArrowUp className="w-3.5 h-3.5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#9CA3AF]">
          <p className="tabular-nums">
            &copy; {currentYear} {REAL_CONTACT.name}. {footer.rights}
          </p>
          <p>{footer.paletteTagline}</p>
        </div>
      </div>
    </footer>
  );
}
