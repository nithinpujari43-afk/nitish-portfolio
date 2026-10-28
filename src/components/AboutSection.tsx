import React from 'react';
import { BarChart3, BrainCircuit, Code2, Compass } from 'lucide-react';
import { motion } from 'motion/react';
import { SpotlightTiltCard } from './SpotlightTiltCard';

const HIGHLIGHTS = [
  {
    index: '01',
    title: 'Data-Driven Problem Solving',
    description:
      'Querying relational databases with SQL and analyzing datasets in Python to turn raw numbers into structured, actionable insights.',
    Icon: BarChart3,
  },
  {
    index: '02',
    title: 'Applied AI & Vision',
    description:
      'Exploring object detection and machine learning pipelines—such as AI Pothole Detection—to address practical real-world challenges.',
    Icon: BrainCircuit,
  },
  {
    index: '03',
    title: 'Full Stack Web Foundations',
    description:
      'Building clean, user-friendly applications like RailOne railway ticket booking using HTML5, CSS3, JavaScript, and React.',
    Icon: Code2,
  },
  {
    index: '04',
    title: 'Continuous Curiosity',
    description:
      'Approaching coursework and personal engineering builds with disciplined structure, clean code, and steady skill growth.',
    Icon: Compass,
  },
];

export const AboutSection: React.FC = () => {
  return (
    <section
      id="about"
      className="py-24 md:py-32 relative"
    >
      <div className="max-w-[1240px] mx-auto px-6 md:px-9">
        <div className="mb-14">
          <span className="block font-mono text-xs font-medium text-[#00D4FF] mb-2">
            01. Engineering Identity
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#F8FAFC]">
            Beyond the Code
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Asymmetric Architectural Narrative Panel */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 flex"
          >
            <SpotlightTiltCard
              tiltMaxDeg={2.5}
              className="w-full p-7 sm:p-9 rounded-3xl bg-[#0A101D]/90 border border-[#38BDF8]/18 hover:border-[#00D4FF]/45 flex flex-col justify-between"
            >
              <div className="relative z-10 space-y-5 text-[#94A3B8] leading-relaxed">
                <p className="text-lg sm:text-xl text-[#F8FAFC] font-medium leading-relaxed font-display">
                  I am a third-year{' '}
                  <span className="text-[#00D4FF]">
                    B.Tech Computer Science and Engineering student at CMR University, Bengaluru
                  </span>
                  , driven by curiosity for how thoughtful software, data analytics, and artificial intelligence solve real-world problems.
                </p>

                <p className="text-sm sm:text-base">
                  My academic and project work bridges analytical thinking with hands-on software engineering. From architecting passenger reservation workflows in{' '}
                  <strong className="font-semibold text-[#E2E8F0]">RailOne</strong>{' '}
                  to prototyping computer vision road hazard detection and exploring business KPIs, I enjoy tracing how data moves from relational schemas all the way to interactive interfaces.
                </p>

                <p className="text-sm sm:text-base">
                  Every project I build focuses on strengthening core engineering fundamentals—clean Python, structured SQL, modern JavaScript, semantic HTML5/CSS3, and expanding fluency in React and data analysis.
                </p>
              </div>

              <div className="relative z-10 mt-8 pt-6 border-t border-white/[0.08] grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <span className="block font-mono text-[11px] text-[#64748B] mb-1">
                    Base Location
                  </span>
                  <span className="text-sm font-semibold text-[#F8FAFC]">
                    Bengaluru, Karnataka, India
                  </span>
                </div>
                <div>
                  <span className="block font-mono text-[11px] text-[#64748B] mb-1">
                    Primary Focus
                  </span>
                  <span className="text-sm font-semibold text-[#00D4FF]">
                    Data Analytics · AI · Software Dev
                  </span>
                </div>
              </div>
            </SpotlightTiltCard>
          </motion.div>

          {/* Right 2x2 Tactile 3D-Tilt Capability Modules */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-5"
          >
            {HIGHLIGHTS.map(({ index, title, description, Icon }) => (
              <SpotlightTiltCard
                key={title}
                tiltMaxDeg={5.5}
                className="group p-6 rounded-3xl bg-[#0A101D]/85 border border-[#38BDF8]/14 hover:border-[#00D4FF]/50 flex flex-col justify-between"
              >
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-11 h-11 rounded-xl bg-[#2563EB]/15 border border-[#38BDF8]/30 flex items-center justify-center text-[#00D4FF] group-hover:bg-[#2563EB] group-hover:text-white transition-colors duration-150">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="font-mono text-xs text-[#64748B] group-hover:text-[#00D4FF] transition-colors tabular-nums">
                      {index}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-[#F8FAFC] mb-2">
                    {title}
                  </h3>
                  <p className="text-sm text-[#94A3B8] leading-relaxed">
                    {description}
                  </p>
                </div>
              </SpotlightTiltCard>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
