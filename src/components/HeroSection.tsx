import React, { useEffect } from 'react';
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from 'motion/react';
import { ArrowDownRight, Mail } from 'lucide-react';
import {
  HERO_FLOATING_LOGOS,
  PORTFOLIO_CONTENT,
  PORTRAIT_IMAGE_PATH,
  type FloatingTechLogo,
} from '../data/portfolio';
import { useLanguage } from '../context/LanguageContext';
import { EASE_EDITORIAL } from './MotionPrimitives';
import { MariusSignature, TechIcon } from './TechIcons';

function FloatingLogoNode({
  item,
  displayLabel,
  mouseX,
  mouseY,
  prefersReducedMotion,
}: {
  item: FloatingTechLogo;
  displayLabel: string;
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
  prefersReducedMotion: boolean | null;
}) {
  const [hovered, setHovered] = React.useState(false);

  const parallaxX = useTransform(
    mouseX,
    [-0.5, 0.5],
    [-item.parallaxFactor, item.parallaxFactor]
  );
  const parallaxY = useTransform(
    mouseY,
    [-0.5, 0.5],
    [-item.parallaxFactor * 0.75, item.parallaxFactor * 0.75]
  );

  const visibilityClass = item.mobilePosition
    ? 'flex'
    : item.tabletVisible
    ? 'hidden sm:flex'
    : 'hidden lg:flex';

  return (
    <>
      {/* Desktop & Tablet Organic Placement */}
      <motion.div
        style={{
          ...item.desktopStyle,
          x: prefersReducedMotion ? 0 : parallaxX,
          y: prefersReducedMotion ? 0 : parallaxY,
        }}
        className={`absolute z-20 pointer-events-auto ${
          item.tabletVisible ? 'hidden sm:flex' : 'hidden lg:flex'
        }`}
      >
        <motion.div
          initial={
            prefersReducedMotion
              ? { opacity: 1, scale: 1 }
              : { opacity: 0, scale: 0.55, y: 18 }
          }
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{
            type: 'spring',
            stiffness: 200,
            damping: 18,
            delay: item.delay,
          }}
        >
          <motion.div
            animate={
              prefersReducedMotion
                ? undefined
                : {
                    y: [0, item.floatY, 0],
                    x: [0, item.floatX, 0],
                    rotate: [item.rotateRange[0], item.rotateRange[1], item.rotateRange[0]],
                    scale: [1, 1.03, 1],
                  }
            }
            transition={{
              duration: item.duration,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: item.delay * 0.4,
            }}
            whileHover={{ scale: 1.09, y: -3 }}
            onHoverStart={() => setHovered(true)}
            onHoverEnd={() => setHovered(false)}
            className="group flex items-center gap-2 px-3 py-2 rounded-xl bg-[#FAF8F4]/92 backdrop-blur-sm border border-[#111827]/12 shadow-[0_8px_20px_rgba(17,24,39,0.06)] hover:border-[#2878F0]/45 hover:shadow-[0_12px_26px_rgba(40,120,240,0.14)] transition-colors duration-200 cursor-default select-none"
          >
            <span className="flex items-center justify-center w-6 h-6 transition-transform duration-200 group-hover:scale-110 text-[#111827]">
              <TechIcon
                name={item.name}
                className="w-5 h-5 transition-colors duration-200"
                colored={hovered}
              />
            </span>
            <span className="text-xs font-medium tracking-tight text-[#111827] whitespace-nowrap">
              {displayLabel}
            </span>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Mobile Compact Edge Placement */}
      {item.mobilePosition && (
        <motion.div
          style={item.mobilePosition}
          className={`absolute z-20 sm:hidden ${visibilityClass}`}
        >
          <motion.div
            initial={
              prefersReducedMotion
                ? { opacity: 1, scale: 1 }
                : { opacity: 0, scale: 0.65 }
            }
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              type: 'spring',
              stiffness: 200,
              damping: 20,
              delay: item.delay,
            }}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#FAF8F4]/92 backdrop-blur-sm border border-[#111827]/12 shadow-sm"
          >
            <TechIcon name={item.name} className="w-4 h-4 text-[#111827]" colored />
            <span className="text-[11px] font-medium text-[#111827] whitespace-nowrap">
              {displayLabel}
            </span>
          </motion.div>
        </motion.div>
      )}
    </>
  );
}

export function HeroSection() {
  const { language } = useLanguage();
  const hero = PORTFOLIO_CONTENT[language].hero;
  const prefersReducedMotion = useReducedMotion();

  const rawMouseX = useMotionValue(0);
  const rawMouseY = useMotionValue(0);

  const smoothMouseX = useSpring(rawMouseX, { stiffness: 90, damping: 24, mass: 0.8 });
  const smoothMouseY = useSpring(rawMouseY, { stiffness: 90, damping: 24, mass: 0.8 });

  const portraitX = useTransform(smoothMouseX, [-0.5, 0.5], [-8, 8]);
  const portraitY = useTransform(smoothMouseY, [-0.5, 0.5], [-6, 6]);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      const normX = e.clientX / window.innerWidth - 0.5;
      const normY = e.clientY / window.innerHeight - 0.5;
      rawMouseX.set(normX);
      rawMouseY.set(normY);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [prefersReducedMotion, rawMouseX, rawMouseY]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="relative overflow-hidden pt-24 pb-16 sm:pt-28 sm:pb-20 lg:pt-32 lg:pb-24 bg-[#F4F1EA]"
    >
      {/* Subtle restrained architectural grid backdrop */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            'radial-gradient(rgba(17, 24, 39, 0.08) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
        aria-hidden="true"
      />

      {/* Restrained editorial accent aura behind portrait */}
      <div
        className="pointer-events-none absolute top-28 left-1/2 -translate-x-1/2 w-[360px] sm:w-[500px] h-[360px] sm:h-[420px] rounded-full bg-[#2878F0]/[0.06] blur-3xl"
        aria-hidden="true"
      />

      <div className="relative max-w-6xl mx-auto px-5 sm:px-8">
        {/* Central Portrait + Organically Dispersed Floating Technology Logos */}
        <div className="relative mx-auto max-w-5xl min-h-[340px] sm:min-h-[410px] lg:min-h-[440px] flex items-end justify-center pb-4">
          {HERO_FLOATING_LOGOS.map((item) => (
            <FloatingLogoNode
              key={item.name}
              item={item}
              displayLabel={
                item.name === 'Cybersecurity' ? hero.cyberLogoLabel : item.label
              }
              mouseX={smoothMouseX}
              mouseY={smoothMouseY}
              prefersReducedMotion={prefersReducedMotion}
            />
          ))}

          {/* Personal Portrait Cutout integrated seamlessly on the editorial Hero stage */}
          <motion.div
            initial={
              prefersReducedMotion
                ? { opacity: 1, scale: 1 }
                : { opacity: 0, scale: 0.94, y: 20 }
            }
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.12, ease: EASE_EDITORIAL }}
            style={prefersReducedMotion ? undefined : { x: portraitX, y: portraitY }}
            className="relative z-10 flex items-end justify-center"
          >
            {/* Subtle architectural arch backdrop behind cutout */}
            <div
              className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[235px] sm:w-[275px] md:w-[305px] h-[270px] sm:h-[315px] md:h-[345px] rounded-t-full border border-[#111827]/12 bg-gradient-to-b from-[#EAE5DB]/65 via-[#EAE5DB]/30 to-transparent -z-10"
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute -top-3 left-1/2 -translate-x-1/2 w-[255px] sm:w-[295px] md:w-[325px] h-[285px] sm:h-[330px] md:h-[360px] rounded-t-full border border-dashed border-[#2878F0]/22 -z-10"
              aria-hidden="true"
            />

            <img
              src={PORTRAIT_IMAGE_PATH}
              alt={hero.portraitAlt}
              referrerPolicy="no-referrer"
              className="relative z-10 w-[230px] sm:w-[270px] md:w-[300px] h-auto object-contain select-none drop-shadow-[0_22px_28px_rgba(17,24,39,0.2)]"
            />

            {/* Subtle studio floor contact shadow */}
            <div
              className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-48 sm:w-56 h-4 rounded-full bg-[#111827]/20 blur-md -z-10"
              aria-hidden="true"
            />
          </motion.div>
        </div>

        <motion.div
          initial={prefersReducedMotion ? false : { scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.48, ease: EASE_EDITORIAL }}
          className="mx-auto w-full max-w-md h-px bg-[#111827]/15 origin-center mt-2"
          aria-hidden="true"
        />

        {/* Name & Identity strictly BELOW the Portrait */}
        <div className="relative z-20 mt-7 sm:mt-8 text-center max-w-3xl mx-auto">
          <div className="overflow-hidden py-1">
            <motion.h1
              initial={prefersReducedMotion ? false : { y: '105%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.72, delay: 0.55, ease: EASE_EDITORIAL }}
              className="font-identity font-extrabold uppercase tracking-[-0.03em] text-[#111827] text-4xl sm:text-6xl lg:text-[4.25rem] leading-[0.98] editorial-offset-shadow"
            >
              <span className="block">MARIUS</span>
              <span className="block mt-1">RAMANANOLO</span>
            </motion.h1>
          </div>

          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7, ease: EASE_EDITORIAL }}
            className="flex justify-center mt-2"
          >
            <MariusSignature className="w-24 sm:w-28 h-9" />
          </motion.div>

          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.78, ease: EASE_EDITORIAL }}
            className="mt-3"
          >
            <p className="font-display text-xl sm:text-2xl tracking-[0.12em] text-[#111827]">
              {hero.roleTitle}
            </p>

            <p className="mt-4 mx-auto max-w-xl text-base sm:text-[17px] text-[#4B5563] leading-relaxed">
              {hero.intro}
            </p>
          </motion.div>

          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.96, ease: EASE_EDITORIAL }}
            className="mt-8 flex flex-wrap items-center justify-center gap-4"
          >
            <button
              type="button"
              onClick={() => scrollTo('projects')}
              className="inline-flex items-center justify-center gap-2 min-h-[46px] px-7 py-3 rounded-lg bg-[#2878F0] text-white text-sm sm:text-base font-semibold whitespace-nowrap shrink-0 shadow-[0_10px_24px_rgba(40,120,240,0.25)] hover:bg-[#1d64d4] hover:-translate-y-0.5 transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2878F0] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F4F1EA]"
            >
              <span>{hero.ctaExplore}</span>
              <ArrowDownRight className="w-4 h-4" aria-hidden="true" />
            </button>

            <button
              type="button"
              onClick={() => scrollTo('contact')}
              className="inline-flex items-center justify-center gap-2 min-h-[46px] px-7 py-3 rounded-lg bg-transparent border border-[#111827]/25 text-[#111827] text-sm sm:text-base font-semibold whitespace-nowrap shrink-0 hover:border-[#111827] hover:bg-[#111827] hover:text-[#F4F1EA] hover:-translate-y-0.5 transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111827] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F4F1EA]"
            >
              <Mail className="w-4 h-4" aria-hidden="true" />
              <span>{hero.ctaContact}</span>
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
