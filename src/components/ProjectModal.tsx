import React, { useEffect, useState } from 'react';
import { Layers, MessageSquare, X } from 'lucide-react';
import { ProjectItem } from '../data/portfolioData';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
  onInquire: (projectTitle: string) => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
  onInquire,
}) => {
  const [imgFailed, setImgFailed] = useState(false);

  useEffect(() => {
    setImgFailed(false);
  }, [project]);

  useEffect(() => {
    if (!project) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="case-study-modal-title"
      onClick={onClose}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-[#03060C]/88 backdrop-blur-xl"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#0A101D] border border-[#38BDF8]/25 shadow-[0_0_60px_-12px_rgba(0,212,255,0.3)]"
      >
        {/* Top Modal Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between gap-4 px-6 py-4 bg-[#0A101D]/96 backdrop-blur-md border-b border-white/[0.08]">
          <span className="font-mono text-xs text-[#00D4FF] tabular-nums">
            {project.indexNumber}. {project.categoryLabel}
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close project preview"
            className="inline-flex items-center justify-center w-9 h-9 rounded-lg border border-white/10 text-[#94A3B8] hover:text-[#00D4FF] hover:border-[#00D4FF]/50 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* High-Resolution Visual Header */}
        <div className="aspect-[16/9] w-full bg-[#03060C] border-b border-white/[0.08] overflow-hidden">
          {!imgFailed ? (
            <img
              src={project.image}
              alt={project.imageAlt}
              referrerPolicy="no-referrer"
              onError={() => setImgFailed(true)}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-br from-[#03060C] to-[#0A101D]">
              <Layers className="w-8 h-8 text-[#00D4FF] mb-2" />
              <span className="text-sm font-medium text-[#F8FAFC]">
                {project.title}
              </span>
            </div>
          )}
        </div>

        {/* Case Study Details */}
        <div className="p-6 sm:p-8 space-y-6">
          <div>
            <h3
              id="case-study-modal-title"
              className="text-2xl sm:text-3xl font-extrabold text-[#F8FAFC] mb-1.5"
            >
              {project.title}
            </h3>
            <p className="text-sm font-mono text-[#38BDF8]">
              {project.subtitle}
            </p>
          </div>

          <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed">
            {project.description}
          </p>

          {/* Workflow Pipeline Steps */}
          <div className="p-4 rounded-2xl bg-[#03060C] border border-[#38BDF8]/18">
            <span className="block font-mono text-[11px] text-[#00D4FF] mb-2.5">
              Architecture Flow
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {project.pipelineSteps.map((step, idx) => (
                <div
                  key={step}
                  className="flex items-center gap-2.5 text-xs text-[#E2E8F0]"
                >
                  <span className="font-mono text-[#00D4FF] tabular-nums">
                    0{idx + 1}.
                  </span>
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold text-[#F8FAFC] mb-2.5">
              Key Capabilities &amp; Scope
            </h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {project.highlights.map((item) => (
                <li
                  key={item}
                  className="text-xs sm:text-sm text-[#CBD5E1] flex items-start gap-2"
                >
                  <span aria-hidden="true" className="text-[#00D4FF] font-mono">
                    ·
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold text-[#F8FAFC] mb-2">
              Technical Approach
            </h4>
            <p className="text-sm text-[#94A3B8] leading-relaxed">
              {project.architectureSummary}
            </p>
          </div>

          <div className="pt-4 border-t border-white/[0.08]">
            <span className="block text-xs text-[#94A3B8] mb-1.5">
              Technologies &amp; Focus
            </span>
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-xs text-[#00D4FF]">
              {project.technologies.map((tech, idx) => (
                <React.Fragment key={tech}>
                  <span>{tech}</span>
                  {idx < project.technologies.length - 1 && (
                    <span aria-hidden="true" className="text-white/25">
                      ·
                    </span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#03060C] border border-white/[0.08] text-xs text-[#94A3B8]">
            {project.statusNote}
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => onInquire(project.title)}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-semibold text-white rounded-xl bg-gradient-to-r from-[#2563EB] to-[#00D4FF] border border-[#38BDF8]/30 shadow-[0_0_24px_-4px_rgba(0,212,255,0.45)] transition-transform duration-150 hover:-translate-y-0.5 whitespace-nowrap shrink-0"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Discuss This Project</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center justify-center px-5 py-2.5 text-xs sm:text-sm font-medium text-[#CBD5E1] rounded-xl bg-[#03060C] border border-white/10 hover:text-white transition-colors whitespace-nowrap shrink-0"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
