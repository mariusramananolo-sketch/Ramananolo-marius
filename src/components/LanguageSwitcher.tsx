import React from 'react';
import { Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface LanguageSwitcherProps {
  variant?: 'light' | 'dark';
  showLabel?: boolean;
}

export function LanguageSwitcher({
  variant = 'light',
  showLabel = false,
}: LanguageSwitcherProps) {
  const { language, setLanguage } = useLanguage();

  const isDark = variant === 'dark';

  return (
    <div
      role="group"
      aria-label={language === 'fr' ? 'Sélecteur de langue' : 'Language selector'}
      className={`inline-flex items-center gap-1 p-1 rounded-lg border ${
        isDark
          ? 'bg-[#1F2937] border-[#F4F1EA]/15 text-[#F4F1EA]'
          : 'bg-[#EAE5DB]/90 border-[#111827]/12 text-[#111827]'
      }`}
    >
      {showLabel && (
        <span className="inline-flex items-center gap-1.5 pl-2 pr-1 text-xs font-medium text-[#858585]">
          <Globe className="w-3.5 h-3.5" aria-hidden="true" />
        </span>
      )}
      <button
        type="button"
        onClick={() => setLanguage('en')}
        aria-pressed={language === 'en'}
        className={`min-h-[30px] px-2.5 py-1 rounded-md text-xs font-semibold tracking-wide whitespace-nowrap shrink-0 transition-colors duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2878F0] ${
          language === 'en'
            ? isDark
              ? 'bg-[#2878F0] text-white'
              : 'bg-[#111827] text-[#F4F1EA]'
            : isDark
            ? 'text-[#D1D5DB] hover:text-white'
            : 'text-[#4B5563] hover:text-[#111827]'
        }`}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => setLanguage('fr')}
        aria-pressed={language === 'fr'}
        className={`min-h-[30px] px-2.5 py-1 rounded-md text-xs font-semibold tracking-wide whitespace-nowrap shrink-0 transition-colors duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2878F0] ${
          language === 'fr'
            ? isDark
              ? 'bg-[#2878F0] text-white'
              : 'bg-[#111827] text-[#F4F1EA]'
            : isDark
            ? 'text-[#D1D5DB] hover:text-white'
            : 'text-[#4B5563] hover:text-[#111827]'
        }`}
      >
        FR
      </button>
    </div>
  );
}
