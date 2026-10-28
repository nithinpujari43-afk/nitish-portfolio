/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useCallback, useEffect, useState } from 'react';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { EducationSection } from './components/EducationSection';
import { HeroSection } from './components/HeroSection';
import { Navbar } from './components/Navbar';
import { ProjectModal } from './components/ProjectModal';
import { ProjectsSection } from './components/ProjectsSection';
import { SkillsSection } from './components/SkillsSection';
import { ProjectItem } from './data/portfolioData';

const SECTION_IDS = [
  'home',
  'about',
  'skills',
  'projects',
  'education',
  'contact',
];

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(
    null
  );
  const [prefilledProject, setPrefilledProject] = useState<string | null>(null);

  useEffect(() => {
    const elements = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => el !== null
    );

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-25% 0px -55% 0px',
        threshold: 0.05,
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleInquireProject = useCallback((projectTitle: string) => {
    setSelectedProject(null);
    setPrefilledProject(projectTitle);
    const contactEl = document.getElementById('contact');
    contactEl?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const handleClearPrefill = useCallback(() => {
    setPrefilledProject(null);
  }, []);

  return (
    <div className="min-h-screen bg-[#03060C] text-[#F8FAFC] relative">
      {/* Accessible Skip Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-4 focus:z-[200] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-[#2563EB] focus:text-white focus:text-sm focus:font-semibold"
      >
        Skip to main content
      </a>

      {/* Dynamic Black & Electric-Blue Spatial Background Architecture */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      >
        <div className="absolute inset-0 bg-spatial-grid" />
        <div className="absolute -top-48 -left-36 w-[580px] h-[580px] rounded-full bg-[#2563EB]/14 blur-[145px]" />
        <div className="absolute top-32 -right-40 w-[520px] h-[520px] rounded-full bg-[#00D4FF]/10 blur-[145px]" />
        <div className="absolute bottom-0 left-1/3 w-[620px] h-[360px] rounded-full bg-[#1D4ED8]/10 blur-[160px]" />
      </div>

      <div className="relative z-10">
        <Navbar activeSection={activeSection} />

        <main id="main-content">
          <HeroSection />
          <AboutSection />
          <SkillsSection />
          <ProjectsSection onSelectProject={setSelectedProject} />
          <EducationSection />
          <ContactSection
            prefilledProject={prefilledProject}
            onClearPrefill={handleClearPrefill}
          />
        </main>
      </div>

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onInquire={handleInquireProject}
      />
    </div>
  );
}
