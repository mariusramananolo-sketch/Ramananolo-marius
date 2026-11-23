import React from 'react';
import { motion, useReducedMotion, type Transition } from 'motion/react';

export const EASE_EDITORIAL: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const SPRING_GENTLE: Transition = {
  type: 'spring',
  stiffness: 220,
  damping: 26,
  mass: 0.9,
};

export const VIEWPORT_CONFIG = {
  once: true,
  amount: 0.14 as const,
};

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}

export function EditorialReveal({
  children,
  className = '',
  delay = 0,
  y = 22,
}: RevealProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT_CONFIG}
      transition={{
        duration: 0.6,
        delay,
        ease: EASE_EDITORIAL,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface SectionHeaderProps {
  index: string;
  kicker: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
}

export function SectionHeader({
  index,
  kicker,
  title,
  subtitle,
  align = 'left',
}: SectionHeaderProps) {
  const prefersReducedMotion = useReducedMotion();
  const alignClasses = align === 'center' ? 'text-center mx-auto' : 'text-left';

  return (
    <div className={`max-w-3xl mb-12 md:mb-16 ${alignClasses}`}>
      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={VIEWPORT_CONFIG}
        transition={{ duration: 0.45, ease: EASE_EDITORIAL }}
        className={`flex items-center gap-3 mb-3 text-xs font-medium tracking-[0.18em] uppercase text-[#858585] ${
          align === 'center' ? 'justify-center' : ''
        }`}
      >
        <span className="font-display text-lg tracking-wider text-[#2878F0] tabular-nums">
          {index}
        </span>
        <span className="h-px w-6 bg-[#111827]/20" aria-hidden="true" />
        <span>{kicker}</span>
      </motion.div>

      <motion.h2
        initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={VIEWPORT_CONFIG}
        transition={{ duration: 0.55, delay: 0.06, ease: EASE_EDITORIAL }}
        className="font-identity text-3xl sm:text-4xl lg:text-[2.75rem] font-bold tracking-tight text-[#111827] leading-[1.12] editorial-offset-shadow-subtle"
      >
        {title}
      </motion.h2>

      {subtitle && (
        <motion.p
          initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_CONFIG}
          transition={{ duration: 0.5, delay: 0.12, ease: EASE_EDITORIAL }}
          className="mt-4 text-base sm:text-[17px] text-[#4B5563] leading-relaxed max-w-2xl"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
