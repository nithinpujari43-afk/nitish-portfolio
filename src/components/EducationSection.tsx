import React from 'react';
import { GraduationCap } from 'lucide-react';
import { motion } from 'motion/react';
import { PROFILE } from '../data/portfolioData';
import { SpotlightTiltCard } from './SpotlightTiltCard';

const FOCUS_AREAS = [
  'Programming',
  'Web Development',
  'Data Analytics',
  'Artificial Intelligence',
];

const JOURNEY_STAGES = [
  {
    stage: '01. Computing Foundations',
    title: 'Core Programming & Problem Solving',
    summary:
      'Developing algorithmic logic in Python and JavaScript alongside Git version control and clean code practices.',
  },
  {
    stage: '02. Full Stack & Databases',
    title: 'Modern Web & Relational SQL',
    summary:
      'Designing responsive interfaces with HTML5, CSS3, and React while structuring relational queries in SQL.',
  },
  {
    stage: '03. Analytics & Applied AI',
    title: 'Insights & Intelligent Prototypes',
    summary:
      'Exploring business KPIs, customer retention cohorts, and computer vision applications for real-world utility.',
  },
];

export const EducationSection: React.FC = () => {
  return (
    <section
      id="education"
      className="py-24 md:py-32 border-t border-[#38BDF8]/12 relative"
    >
      <div className="max-w-[1240px] mx-auto px-6 md:px-9">
        <div className="mb-14">
          <span className="block font-mono text-xs font-medium text-[#00D4FF] mb-2">
            04. Academic Trajectory
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#F8FAFC] mb-2">
            Education &amp; Journey
          </h2>
          <p className="text-sm sm:text-base text-[#94A3B8] max-w-[56ch]">
            Undergraduate engineering education focused on computer science fundamentals, web engineering, and data-centric technologies.
          </p>
        </div>

        {/* Illuminated Electric-Blue Vertical Conduit Timeline */}
        <div className="relative pl-7 md:pl-11 border-l border-[#2563EB]/45">
          {/* Static Illuminated Node Marker */}
          <div
            aria-hidden="true"
            className="absolute -left-[7px] top-9 w-3.5 h-3.5 rounded-full bg-[#03060C] border-2 border-[#00D4FF] ring-4 ring-[#00D4FF]/15"
          />

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            <SpotlightTiltCard
              tiltMaxDeg={2}
              className="p-6 sm:p-10 rounded-3xl bg-[#0A101D]/90 border border-[#38BDF8]/18 hover:border-[#00D4FF]/50"
            >
              <div className="relative z-10">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 pb-6 border-b border-white/[0.08] mb-6">
                  <div>
                    <div className="inline-flex items-center gap-2 font-mono text-xs text-[#00D4FF] mb-2">
                      <GraduationCap className="w-4 h-4" />
                      <span>Current Status: Third-Year Student</span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-[#F8FAFC] mb-1">
                      {PROFILE.university}
                    </h3>
                    <p className="text-base font-medium text-[#CBD5E1]">
                      Bachelor of Technology — Computer Science and Engineering
                    </p>
                  </div>

                  <span className="font-mono text-xs text-[#94A3B8] whitespace-nowrap">
                    Bengaluru, India
                  </span>
                </div>

                <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed max-w-[68ch] mb-7">
                  Currently in my third year of Computer Science and Engineering at CMR University, combining core academic coursework with practical full-stack, data analytics, and artificial intelligence projects.
                </p>

                {/* Unboxed Focus Areas */}
                <div className="mb-8">
                  <span className="block font-mono text-xs text-[#64748B] mb-2">
                    Core Focus Areas
                  </span>
                  <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 font-mono text-xs sm:text-sm text-[#F8FAFC]">
                    {FOCUS_AREAS.map((area, index) => (
                      <React.Fragment key={area}>
                        <span>{area}</span>
                        {index < FOCUS_AREAS.length - 1 && (
                          <span aria-hidden="true" className="text-[#00D4FF]">
                            ·
                          </span>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>

                {/* Academic Progression Columns */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t border-white/[0.08]">
                  {JOURNEY_STAGES.map((item) => (
                    <div
                      key={item.stage}
                      className="p-5 rounded-2xl bg-[#03060C]/85 border border-[#38BDF8]/12 hover:border-[#00D4FF]/40 transition-colors"
                    >
                      <span className="block font-mono text-xs text-[#00D4FF] mb-1.5 tabular-nums">
                        {item.stage}
                      </span>
                      <h4 className="text-sm font-bold text-[#F8FAFC] mb-1.5">
                        {item.title}
                      </h4>
                      <p className="text-xs text-[#94A3B8] leading-relaxed">
                        {item.summary}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </SpotlightTiltCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
