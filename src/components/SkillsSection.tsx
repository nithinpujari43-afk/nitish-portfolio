import React, { useState } from 'react';
import { motion } from 'motion/react';
import { SKILLS, SkillCategory, SkillItem } from '../data/portfolioData';
import { SpotlightTiltCard } from './SpotlightTiltCard';

const FILTER_TABS: { id: SkillCategory; label: string }[] = [
  { id: SkillCategory.ALL, label: 'All' },
  { id: SkillCategory.PROGRAMMING, label: 'Programming' },
  { id: SkillCategory.FRONTEND, label: 'Frontend' },
  { id: SkillCategory.DATA, label: 'Data & Analytics' },
  { id: SkillCategory.TOOLS, label: 'Tools' },
];

const SkillTechIcon: React.FC<{ iconKey: SkillItem['iconKey'] }> = ({
  iconKey,
}) => {
  switch (iconKey) {
    case 'python':
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2c-5 0-5 3-5 3v3h5v1H6s-4 0-4 5 3.5 5 3.5 5H8v-2.5S8 14 10.5 14h5s2.5 0 2.5-2.5v-6S18 2 12 2z" />
          <path d="M12 22c5 0 5-3 5-3v-3h-5v-1h6s4 0 4-5-3.5-5-3.5-5H16v2.5S16 10 13.5 10h-5S6 10 6 12.5v6S6 22 12 22z" />
        </svg>
      );
    case 'javascript':
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="3" />
          <path d="M10 9v6.5c0 1.2-.8 2-2 2-.8 0-1.5-.4-1.8-1.1" />
          <path d="M17.5 10.5c-.4-.8-1.2-1.2-2.2-1.2-1.2 0-2 .6-2 1.5 0 2.2 4.4 1.2 4.4 3.7 0 1.2-1 2-2.4 2-1.1 0-2-.5-2.4-1.4" />
        </svg>
      );
    case 'html5':
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 3l1.5 16.2L12 21l6.5-1.8L20 3H4z" />
          <path d="M16 8H8l.4 4h7.2l-.5 4.2L12 17l-3.1-.8-.2-2.2" />
        </svg>
      );
    case 'css3':
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 2 7 12 12 22 7 12 2" />
          <polyline points="2 17 12 22 22 17" />
          <polyline points="2 12 12 17 22 12" />
        </svg>
      );
    case 'react':
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="2" />
          <ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(30 12 12)" />
          <ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(90 12 12)" />
          <ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(150 12 12)" />
        </svg>
      );
    case 'sql':
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <ellipse cx="12" cy="5" rx="9" ry="3" />
          <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
          <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
        </svg>
      );
    case 'analytics':
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 3v18h18" />
          <path d="m19 9-5 5-4-4-3 3" />
        </svg>
      );
    case 'vscode':
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="4" width="20" height="16" rx="2" />
          <path d="m8 10-3 2 3 2" />
          <path d="m16 10 3 2-3 2" />
          <path d="m13 9-2 6" />
        </svg>
      );
    case 'github':
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="18" cy="18" r="3" />
          <circle cx="6" cy="6" r="3" />
          <path d="M13 6h3a2 2 0 0 1 2 2v7" />
          <line x1="6" y1="9" x2="6" y2="21" />
        </svg>
      );
  }
};

export const SkillsSection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<SkillCategory>(
    SkillCategory.ALL
  );
  const [hoveredSkill, setHoveredSkill] = useState<SkillItem | null>(null);

  const visibleSkills =
    activeFilter === SkillCategory.ALL
      ? SKILLS
      : SKILLS.filter((skill) => skill.category === activeFilter);

  return (
    <section
      id="skills"
      className="py-24 md:py-32 border-t border-[#38BDF8]/12 relative"
    >
      <div className="max-w-[1240px] mx-auto px-6 md:px-9">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div>
            <span className="block font-mono text-xs font-medium text-[#00D4FF] mb-2">
              02. Capabilities &amp; Stack
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#F8FAFC] mb-2">
              My Technical Toolkit
            </h2>
            <p className="text-sm sm:text-base text-[#94A3B8] max-w-[54ch]">
              Hover any capability module to trace where it powers my real coursework and engineering projects.
            </p>
          </div>

          {/* Interactive Category Filter Tabs */}
          <div
            role="tablist"
            aria-label="Filter skills by category"
            className="inline-flex flex-wrap items-center gap-1 p-1.5 rounded-xl bg-[#0A101D] border border-[#38BDF8]/18 self-start"
          >
            {FILTER_TABS.map((tab) => {
              const isSelected = activeFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setActiveFilter(tab.id)}
                  className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 ${
                    isSelected
                      ? 'bg-[#2563EB] text-white'
                      : 'text-[#94A3B8] hover:text-[#F8FAFC]'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Live Skill-to-Project Connection Trace Readout */}
        <div className="mb-8 px-5 py-3.5 rounded-2xl bg-[#0A101D]/85 border border-[#38BDF8]/16 flex flex-wrap items-center justify-between gap-3 font-mono text-xs">
          <span className="text-[#94A3B8]">
            {hoveredSkill ? (
              <>
                Active Capability:{' '}
                <strong className="text-[#00D4FF] font-semibold">
                  {hoveredSkill.name}
                </strong>
              </>
            ) : (
              'Interactive Stack Trace · Hover a skill card to inspect connected work'
            )}
          </span>
          <span className="text-[#F8FAFC]">
            {hoveredSkill
              ? `Applied in: ${hoveredSkill.relatedProjects.join(' · ')}`
              : '9 Core Technologies · Zero Inflated Metrics'}
          </span>
        </div>

        {/* Clean Responsive 3D-Tilt Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {visibleSkills.map((skill) => (
            <motion.div
              layout
              key={skill.id}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              onMouseEnter={() => setHoveredSkill(skill)}
              onMouseLeave={() => setHoveredSkill(null)}
            >
              <SpotlightTiltCard
                tiltMaxDeg={6}
                className="group h-full p-6 rounded-3xl bg-[#0A101D]/88 border border-[#38BDF8]/15 hover:border-[#00D4FF]/60 flex flex-col justify-between"
              >
                <div className="relative z-10">
                  <div className="flex items-center justify-between gap-4 mb-5">
                    <div className="w-11 h-11 rounded-xl bg-[#03060C] border border-[#38BDF8]/25 group-hover:border-[#00D4FF] group-hover:bg-[#2563EB]/20 flex items-center justify-center text-[#00D4FF] transition-colors duration-150">
                      <SkillTechIcon iconKey={skill.iconKey} />
                    </div>
                    <span className="font-mono text-xs text-[#64748B] group-hover:text-[#38BDF8] transition-colors">
                      {skill.categoryLabel}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-[#F8FAFC] mb-2">
                    {skill.name}
                    {skill.learningNote && (
                      <span className="text-sm font-medium text-[#00D4FF]">
                        {' '}
                        — {skill.learningNote}
                      </span>
                    )}
                  </h3>

                  <p className="text-sm text-[#94A3B8] leading-relaxed mb-5">
                    {skill.description}
                  </p>
                </div>

                {/* Unboxed Project Trace Line Revealed/Illuminated on Hover */}
                <div className="relative z-10 pt-3.5 border-t border-white/[0.06] flex items-center justify-between gap-2 font-mono text-[11px]">
                  <span className="text-[#64748B] group-hover:text-[#94A3B8] transition-colors">
                    Project Trace
                  </span>
                  <span className="text-[#94A3B8] group-hover:text-[#00D4FF] transition-colors truncate">
                    {skill.relatedProjects.join(' · ')}
                  </span>
                </div>
              </SpotlightTiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
