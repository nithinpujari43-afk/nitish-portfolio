import React, { useState } from 'react';
import { ArrowUpRight, Layers } from 'lucide-react';
import { motion } from 'motion/react';
import {
  PROJECTS,
  ProjectCategory,
  ProjectItem,
} from '../data/portfolioData';
import { SpotlightTiltCard } from './SpotlightTiltCard';

interface ProjectsSectionProps {
  onSelectProject: (project: ProjectItem) => void;
}

const PROJECT_FILTERS: { id: ProjectCategory; label: string }[] = [
  { id: ProjectCategory.ALL, label: 'All Work' },
  { id: ProjectCategory.WEB, label: 'Software & Web' },
  { id: ProjectCategory.AI, label: 'AI & Vision' },
  { id: ProjectCategory.ANALYTICS, label: 'Data Analytics' },
];

const ProjectThumbnail: React.FC<{ project: ProjectItem }> = ({ project }) => {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#050A14] border-b border-[#38BDF8]/15">
      {!imageFailed ? (
        <img
          src={project.image}
          alt={project.imageAlt}
          referrerPolicy="no-referrer"
          loading="lazy"
          onError={() => setImageFailed(true)}
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
        />
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-br from-[#03060C] via-[#0A101D] to-[#2563EB]/25 text-center">
          <Layers className="w-8 h-8 text-[#00D4FF] mb-3" />
          <span className="font-display text-sm font-semibold text-[#F8FAFC]">
            {project.title}
          </span>
        </div>
      )}

      {/* Measured Contrast Scrim */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#03060C]/85 via-[#03060C]/20 to-transparent"
      />

      {/* Editorial Index Number */}
      <div className="pointer-events-none absolute bottom-3 left-5 right-5 flex items-center justify-between font-mono text-xs">
        <span className="text-[#00D4FF] font-semibold tabular-nums">
          {project.indexNumber}. {project.categoryLabel}
        </span>
        <span className="text-[#CBD5E1] opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          Inspect Architecture →
        </span>
      </div>
    </div>
  );
};

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  onSelectProject,
}) => {
  const [activeFilter, setActiveFilter] = useState<ProjectCategory>(
    ProjectCategory.ALL
  );

  const filteredProjects =
    activeFilter === ProjectCategory.ALL
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeFilter);

  return (
    <section
      id="projects"
      className="py-24 md:py-32 border-t border-[#38BDF8]/12 relative"
    >
      <div className="max-w-[1240px] mx-auto px-6 md:px-9">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
          <div>
            <span className="block font-mono text-xs font-medium text-[#00D4FF] mb-2">
              03. Featured Engineering &amp; Analytics
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#F8FAFC] mb-2">
              Selected Work
            </h2>
            <p className="text-sm sm:text-base text-[#94A3B8] max-w-[58ch]">
              Interactive case studies spanning railway ticket booking systems, computer vision hazard detection, and business data analytics.
            </p>
          </div>

          {/* Interactive Domain Filter Controls */}
          <div
            role="tablist"
            aria-label="Filter projects by domain"
            className="inline-flex flex-wrap items-center gap-1 p-1.5 rounded-xl bg-[#0A101D] border border-[#38BDF8]/18 self-start"
          >
            {PROJECT_FILTERS.map((filter) => {
              const isSelected = activeFilter === filter.id;
              return (
                <button
                  key={filter.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setActiveFilter(filter.id)}
                  className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 ${
                    isSelected
                      ? 'bg-[#2563EB] text-white'
                      : 'text-[#94A3B8] hover:text-[#F8FAFC]'
                  }`}
                >
                  {filter.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Spatial Showcase Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <motion.div
              layout
              key={project.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
            >
              <SpotlightTiltCard
                tiltMaxDeg={3.8}
                onClick={() => onSelectProject(project)}
                className="group cursor-pointer h-full flex flex-col justify-between rounded-3xl bg-[#0A101D]/90 border border-[#38BDF8]/16 hover:border-[#00D4FF]/60 overflow-hidden"
              >
                <div className="relative z-10">
                  <ProjectThumbnail project={project} />

                  <div className="p-6 sm:p-8 pb-5">
                    <h3 className="text-2xl sm:text-[1.65rem] font-extrabold text-[#F8FAFC] mb-1.5 group-hover:text-[#00D4FF] transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs font-mono text-[#64748B] mb-4">
                      {project.subtitle}
                    </p>

                    <p className="text-sm text-[#94A3B8] leading-relaxed mb-6">
                      {project.description}
                    </p>

                    {/* Interactive Architecture Pipeline Flow (Illuminates on Hover) */}
                    <div className="p-4 rounded-2xl bg-[#03060C]/85 border border-white/[0.06] group-hover:border-[#2563EB]/40 transition-colors mb-5">
                      <span className="block font-mono text-[10px] text-[#64748B] group-hover:text-[#00D4FF] transition-colors mb-2">
                        SYSTEM WORKFLOW PIPELINE
                      </span>
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1.5 text-xs text-[#CBD5E1]">
                        {project.pipelineSteps.map((step, idx) => (
                          <React.Fragment key={step}>
                            <span className="group-hover:text-white transition-colors">
                              {step}
                            </span>
                            {idx < project.pipelineSteps.length - 1 && (
                              <span
                                aria-hidden="true"
                                className="font-mono text-[#2563EB] group-hover:text-[#00D4FF] transition-colors"
                              >
                                →
                              </span>
                            )}
                          </React.Fragment>
                        ))}
                      </div>
                    </div>

                    {/* Key Highlights */}
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1.5">
                      {project.highlights.map((item) => (
                        <li
                          key={item}
                          className="text-xs text-[#CBD5E1] flex items-start gap-2"
                        >
                          <span
                            aria-hidden="true"
                            className="text-[#00D4FF] font-mono"
                          >
                            —
                          </span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="relative z-10 px-6 sm:px-8 pb-6 pt-4 border-t border-white/[0.06] flex flex-wrap items-center justify-between gap-4">
                  {/* Unboxed Technology Metadata */}
                  <div
                    aria-label="Technologies used"
                    className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-xs text-[#94A3B8]"
                  >
                    {project.technologies.map((tech, idx) => (
                      <React.Fragment key={tech}>
                        <span>{tech}</span>
                        {idx < project.technologies.length - 1 && (
                          <span aria-hidden="true" className="text-white/20">
                            ·
                          </span>
                        )}
                      </React.Fragment>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectProject(project);
                    }}
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-[#F8FAFC] rounded-xl bg-[#03060C] border border-[#38BDF8]/25 group-hover:bg-[#2563EB] group-hover:border-[#00D4FF]/60 group-hover:text-white transition-all duration-150 whitespace-nowrap shrink-0"
                  >
                    <span>View Project</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </SpotlightTiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
