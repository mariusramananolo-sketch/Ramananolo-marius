import React from 'react';
import { MotionConfig } from 'motion/react';
import { LanguageProvider } from './context/LanguageContext';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { TechMarquee } from './components/TechMarquee';
import { AboutSection } from './components/AboutSection';
import { ExperienceSection } from './components/ExperienceSection';
import { SkillsSection } from './components/SkillsSection';
import { ProjectsSection } from './components/ProjectsSection';
import { EducationSection } from './components/EducationSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <LanguageProvider>
      <MotionConfig reducedMotion="user">
        <div className="min-h-screen flex flex-col bg-[#F4F1EA] text-[#111827]">
          <Navbar />
          <main className="flex-1">
            <HeroSection />
            <TechMarquee />
            <AboutSection />
            <ExperienceSection />
            <SkillsSection />
            <ProjectsSection />
            <EducationSection />
            <ContactSection />
          </main>
          <Footer />
        </div>
      </MotionConfig>
    </LanguageProvider>
  );
}
