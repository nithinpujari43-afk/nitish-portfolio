import React, { useEffect, useState } from 'react';
import {
  ArrowRight,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Layers,
  Zap,
} from 'lucide-react';
import { motion } from 'motion/react';
import { CameraPreset, FOCUS_DOMAINS, PROFILE } from '../data/portfolioData';
import { ThreeSpatialCore } from './ThreeSpatialCore';

const CAMERA_OPTIONS: { id: CameraPreset; label: string }[] = [
  { id: CameraPreset.ISOMETRIC, label: 'Isometric' },
  { id: CameraPreset.CORE, label: 'Core' },
  { id: CameraPreset.ORBITAL, label: 'Orbital' },
];

const MARQUEE_ITEMS = [
  'railone railway booking',
  'ai pothole computer vision',
  'enterprise kpi analytics',
  'customer churn insights',
  'b.tech cse · cmr university',
  'python · sql · javascript · react',
];

export const HeroSection: React.FC = () => {
  const [activeRoleIdx, setActiveRoleIdx] = useState(0);
  const [selectedDomainId, setSelectedDomainId] = useState(FOCUS_DOMAINS[0].id);
  const [explodedValue, setExplodedValue] = useState(0);
  const [cameraPreset, setCameraPreset] = useState<CameraPreset>(
    CameraPreset.ISOMETRIC
  );
  const [pulseBoost, setPulseBoost] = useState(false);
  const [dockCollapsed, setDockCollapsed] = useState(false);

  const selectedDomain =
    FOCUS_DOMAINS.find((d) => d.id === selectedDomainId) ?? FOCUS_DOMAINS[0];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveRoleIdx((prev) => (prev + 1) % PROFILE.roles.length);
    }, 2800);
    return () => window.clearInterval(timer);
  }, []);

  // Keyboard shortcut 'H' to toggle 3D HUD Dock (Zen Mode) when not typing in inputs
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement | null)?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;
      if (e.key === 'h' || e.key === 'H') {
        setDockCollapsed((prev) => !prev);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <section id="home" className="relative pt-8 pb-0 overflow-hidden">
      <div className="max-w-[1240px] mx-auto px-6 md:px-9">
        {/* Split-Screen Spatial Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-stretch">
          {/* Left Column: Bold Oversized Typography & Magnetic CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 flex flex-col justify-center py-4 lg:py-10"
          >
            {/* Clean Static Editorial Kicker (Zero Pulsing Dots) */}
            <div className="inline-flex items-center gap-3 text-xs font-mono text-[#38BDF8] mb-6">
              <span
                aria-hidden="true"
                className="w-7 h-[2px] bg-gradient-to-r from-[#2563EB] to-[#00D4FF]"
              />
              <span>B.Tech CSE · CMR University, Bengaluru</span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-[4.1rem] font-extrabold tracking-[-0.035em] leading-[1.03] text-[#F8FAFC] mb-6">
              Hi, I&apos;m{' '}
              <span className="bg-gradient-to-r from-white via-[#60A5FA] to-[#00D4FF] bg-clip-text text-transparent">
                Nitish Kumar A.
              </span>
            </h1>

            {/* Animated Career-Interest Subtitle */}
            <div className="mb-6" aria-live="polite">
              <p className="sr-only">
                Computer Science Student | Aspiring Data Analyst | AI Enthusiast
              </p>
              <div
                aria-hidden="true"
                className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-base sm:text-lg font-semibold font-display"
              >
                {PROFILE.roles.map((role, index) => {
                  const isActive = index === activeRoleIdx;
                  return (
                    <React.Fragment key={role}>
                      <span
                        className={`transition-colors duration-200 ${
                          isActive ? 'text-[#00D4FF]' : 'text-[#64748B]'
                        }`}
                      >
                        {role}
                      </span>
                      {index < PROFILE.roles.length - 1 && (
                        <span className="text-white/15">|</span>
                      )}
                    </React.Fragment>
                  );
                })}
              </div>
            </div>

            <p className="text-base sm:text-[1.0625rem] leading-relaxed text-[#94A3B8] max-w-[54ch] mb-8">
              {PROFILE.description}
            </p>

            {/* Primary & Secondary CTAs */}
            <div className="flex flex-wrap items-center gap-4 mb-8">
              <a
                href="#projects"
                className="group inline-flex items-center justify-center gap-2.5 px-7 py-3.5 text-sm font-semibold text-white rounded-xl bg-gradient-to-r from-[#2563EB] via-[#1D4ED8] to-[#00D4FF] border border-[#38BDF8]/35 shadow-[0_0_32px_-6px_rgba(0,212,255,0.55)] transition-all duration-150 hover:-translate-y-0.5 whitespace-nowrap shrink-0"
              >
                <span>Explore My Work</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-150 group-hover:translate-x-1" />
              </a>

              <a
                href="#contact"
                className="inline-flex items-center justify-center px-6 py-3.5 text-sm font-semibold text-[#F8FAFC] rounded-xl bg-[#0A101D] border border-[#38BDF8]/20 hover:border-[#00D4FF]/60 hover:text-[#00D4FF] transition-all duration-150 hover:-translate-y-0.5 whitespace-nowrap shrink-0"
              >
                <span>Contact Me</span>
              </a>
            </div>

            {/* Active 3D Node Inspector Readout */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#0A101D]/90 border border-[#38BDF8]/18">
              <div className="flex items-center justify-between gap-3 mb-1.5">
                <span className="font-mono text-xs text-[#00D4FF]">
                  Selected 3D Node · {selectedDomain.label}
                </span>
                <a
                  href={PROFILE.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-medium text-[#CBD5E1] hover:text-[#00D4FF] transition-colors whitespace-nowrap shrink-0"
                >
                  <span>LinkedIn</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              <p className="text-sm font-semibold text-[#F8FAFC] mb-1">
                {selectedDomain.headline}
              </p>
              <p className="text-xs text-[#94A3B8] leading-relaxed mb-2">
                {selectedDomain.summary}
              </p>
              <p className="font-mono text-[11px] text-[#38BDF8]">
                {selectedDomain.stackLine}
              </p>
            </div>
          </motion.div>

          {/* Right Column: Interactive Three.js 3D Spatial Viewport + Collapsible Bottom Dock */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.55, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 flex"
          >
            <div className="relative w-full h-full min-h-[470px] lg:min-h-[590px] rounded-3xl bg-[#060B16] border border-[#38BDF8]/20 overflow-hidden flex flex-col justify-between">
              {/* Top-Left Minimal Spec Label (Zero Side-Panel Clutter) */}
              <div className="pointer-events-none absolute top-4 left-5 z-10 flex items-center gap-2 font-mono text-[11px] text-[#94A3B8]">
                <span className="text-[#00D4FF]">INTERACTIVE 3D CORE</span>
                <span aria-hidden="true">·</span>
                <span>Drag to Orbit · Click Satellites</span>
              </div>

              {/* 100% Unobstructed Center WebGL Viewport */}
              <div className="w-full h-full flex-1">
                <ThreeSpatialCore
                  selectedDomainId={selectedDomainId}
                  onSelectDomain={setSelectedDomainId}
                  explodedTarget={explodedValue}
                  cameraPreset={cameraPreset}
                  pulseBoost={pulseBoost}
                />
              </div>

              {/* Unified Collapsible Bottom Control Dock (No backdrop-filter over WebGL) */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 w-[94%] max-w-[540px] flex flex-col items-center">
                <button
                  type="button"
                  onClick={() => setDockCollapsed((prev) => !prev)}
                  className="inline-flex items-center gap-1.5 px-3 py-1 mb-1.5 rounded-md bg-[#0A101D] border border-[#38BDF8]/25 font-mono text-[11px] text-[#CBD5E1] hover:text-[#00D4FF] hover:border-[#00D4FF]/50 transition-colors whitespace-nowrap shrink-0"
                >
                  {dockCollapsed ? (
                    <>
                      <ChevronUp className="w-3.5 h-3.5" />
                      <span>Show 3D Controls (H)</span>
                    </>
                  ) : (
                    <>
                      <ChevronDown className="w-3.5 h-3.5" />
                      <span>Hide Controls (H)</span>
                    </>
                  )}
                </button>

                {!dockCollapsed && (
                  <div className="w-full p-3 rounded-2xl bg-[#0A101D]/95 border border-[#38BDF8]/25 shadow-2xl space-y-2.5">
                    {/* Row 1: Domain Satellite Selector */}
                    <div
                      role="tablist"
                      aria-label="3D Orbital Focus Satellites"
                      className="flex items-center gap-1 overflow-x-auto pb-0.5"
                    >
                      {FOCUS_DOMAINS.map((domain) => {
                        const isSelected = domain.id === selectedDomainId;
                        return (
                          <button
                            key={domain.id}
                            type="button"
                            role="tab"
                            aria-selected={isSelected}
                            onClick={() => setSelectedDomainId(domain.id)}
                            className={`px-2.5 py-1 text-[11px] font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                              isSelected
                                ? 'bg-[#2563EB] text-white'
                                : 'bg-[#03060C] text-[#94A3B8] hover:text-white'
                            }`}
                          >
                            {domain.shortLabel}
                          </button>
                        );
                      })}
                    </div>

                    {/* Row 2: Exploded Assembly Slider + Camera Views + Energy Toggle */}
                    <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-white/[0.08]">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            setExplodedValue((prev) => (prev > 0.5 ? 0 : 1))
                          }
                          className={`inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-medium rounded-lg border transition-colors whitespace-nowrap shrink-0 ${
                            explodedValue > 0.1
                              ? 'bg-[#00D4FF]/15 border-[#00D4FF]/50 text-[#00D4FF]'
                              : 'bg-[#03060C] border-white/10 text-[#CBD5E1] hover:text-white'
                          }`}
                        >
                          <Layers className="w-3 h-3" />
                          <span>{explodedValue > 0.5 ? 'Assemble' : 'Explode'}</span>
                        </button>

                        <input
                          type="range"
                          min={0}
                          max={1}
                          step={0.05}
                          value={explodedValue}
                          aria-label="Exploded view separation"
                          onChange={(e) =>
                            setExplodedValue(parseFloat(e.target.value))
                          }
                          className="w-20 accent-[#00D4FF] cursor-pointer"
                        />
                      </div>

                      <div className="flex items-center gap-1">
                        {CAMERA_OPTIONS.map((cam) => (
                          <button
                            key={cam.id}
                            type="button"
                            onClick={() => setCameraPreset(cam.id)}
                            className={`px-2 py-1 text-[11px] font-mono rounded-md transition-colors whitespace-nowrap shrink-0 ${
                              cameraPreset === cam.id
                                ? 'bg-[#2563EB]/30 text-[#00D4FF] border border-[#00D4FF]/40'
                                : 'text-[#94A3B8] hover:text-white'
                            }`}
                          >
                            {cam.label}
                          </button>
                        ))}

                        <button
                          type="button"
                          onClick={() => setPulseBoost((p) => !p)}
                          aria-pressed={pulseBoost}
                          title="Toggle kinetic spin speed"
                          className={`inline-flex items-center gap-1 px-2 py-1 text-[11px] font-mono rounded-md border transition-colors whitespace-nowrap shrink-0 ${
                            pulseBoost
                              ? 'bg-[#00D4FF]/20 border-[#00D4FF]/50 text-[#00D4FF]'
                              : 'border-white/10 text-[#94A3B8] hover:text-white'
                          }`}
                        >
                          <Zap className="w-3 h-3" />
                          <span>{pulseBoost ? '2x' : '1x'}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Full-Width 4-Column Architectural Summary Strip Below Hero Split */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 rounded-2xl bg-[#0A101D]/85 border border-[#38BDF8]/16 divide-y sm:divide-y-0 sm:divide-x divide-white/[0.08]">
          <div className="p-5">
            <span className="block font-mono text-[11px] text-[#64748B] mb-1">
              Academic Standing
            </span>
            <strong className="text-sm font-bold text-[#F8FAFC] font-display">
              Third-Year B.Tech CSE
            </strong>
          </div>
          <div className="p-5">
            <span className="block font-mono text-[11px] text-[#64748B] mb-1">
              Institution
            </span>
            <strong className="text-sm font-bold text-[#F8FAFC] font-display">
              CMR University, Bengaluru
            </strong>
          </div>
          <div className="p-5">
            <span className="block font-mono text-[11px] text-[#64748B] mb-1">
              Flagship Systems
            </span>
            <strong className="text-sm font-bold text-[#00D4FF] font-display">
              RailOne · AI Pothole Vision
            </strong>
          </div>
          <div className="p-5">
            <span className="block font-mono text-[11px] text-[#64748B] mb-1">
              Core Stack
            </span>
            <strong className="text-sm font-bold text-[#F8FAFC] font-display">
              Python · SQL · JS · React
            </strong>
          </div>
        </div>
      </div>

      {/* Subtle Kinetic Section Marquee Ribbon Divider */}
      <div
        aria-hidden="true"
        className="mt-16 py-3.5 border-y border-[#38BDF8]/12 bg-[#060B15] overflow-hidden select-none"
      >
        <div className="animate-marquee">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, idx) => (
            <div
              key={`${item}-${idx}`}
              className="flex items-center gap-6 px-4 font-mono text-xs tracking-wider text-[#64748B]"
            >
              <span className="text-[#CBD5E1]">{item}</span>
              <span className="text-[#00D4FF]">·</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
