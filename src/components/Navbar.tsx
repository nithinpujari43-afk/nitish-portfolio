import React, { useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { PROFILE } from '../data/portfolioData';

interface NavbarProps {
  activeSection: string;
}

const NAV_ITEMS = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
];

export const Navbar: React.FC<NavbarProps> = ({ activeSection }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const progressRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 18);

      if (progressRef.current) {
        const docHeight =
          document.documentElement.scrollHeight - window.innerHeight;
        const ratio = docHeight > 0 ? Math.min(Math.max(y / docHeight, 0), 1) : 0;
        progressRef.current.style.transform = `scaleX(${ratio})`;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 h-16 transition-colors duration-200 border-b ${
        scrolled
          ? 'bg-[#03060C]/92 backdrop-blur-xl border-[#38BDF8]/18'
          : 'bg-[#03060C]/75 backdrop-blur-md border-white/[0.06]'
      }`}
    >
      {/* Strict 3-Zone Top Bar Contract */}
      <div className="max-w-[1240px] mx-auto h-full px-6 md:px-9 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (Single Element) */}
        <a
          href="#home"
          className="text-lg font-extrabold tracking-tight text-[#F8FAFC] hover:text-[#00D4FF] transition-colors whitespace-nowrap shrink-0 font-display"
        >
          {PROFILE.brand}
        </a>

        {/* Zone 2: Primary Navigation Links */}
        <nav aria-label="Primary Navigation" className="hidden md:flex items-center gap-7">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                aria-current={isActive ? 'page' : undefined}
                className={`relative py-1 text-sm font-medium transition-colors duration-150 whitespace-nowrap shrink-0 ${
                  isActive ? 'text-[#F8FAFC]' : 'text-[#94A3B8] hover:text-[#F8FAFC]'
                }`}
              >
                {item.label}
                <span
                  aria-hidden="true"
                  className={`absolute left-0 right-0 -bottom-0.5 h-[2px] rounded-full bg-gradient-to-r from-[#2563EB] to-[#00D4FF] transition-transform duration-200 origin-center ${
                    isActive ? 'scale-x-100' : 'scale-x-0'
                  }`}
                />
              </a>
            );
          })}
        </nav>

        {/* Zone 3: Single Primary Action + Mobile Trigger */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="#contact"
            className="hidden md:inline-flex items-center justify-center px-4 py-2 text-xs font-semibold text-white rounded-lg bg-gradient-to-r from-[#2563EB] to-[#0284C7] hover:from-[#1D4ED8] hover:to-[#00D4FF] border border-[#38BDF8]/30 shadow-[0_0_24px_-4px_rgba(0,212,255,0.45)] transition-all duration-150 hover:-translate-y-0.5 whitespace-nowrap shrink-0"
          >
            Let&apos;s Connect
          </a>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation-drawer"
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-lg border border-[#38BDF8]/20 bg-[#0A101D] text-[#F8FAFC] hover:border-[#00D4FF]/60 transition-colors"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Scroll Progress Electric Laser Line */}
      <div
        ref={progressRef}
        aria-hidden="true"
        className="h-[2px] w-full origin-left scale-x-0 bg-gradient-to-r from-[#2563EB] via-[#38BDF8] to-[#00D4FF]"
      />

      {/* Responsive Mobile Navigation Drawer */}
      {mobileOpen && (
        <div
          id="mobile-navigation-drawer"
          className="md:hidden bg-[#03060C]/98 backdrop-blur-2xl border-b border-[#38BDF8]/20 px-6 pt-4 pb-6"
        >
          <nav aria-label="Mobile Navigation" className="flex flex-col gap-1">
            <a
              href="#home"
              onClick={() => setMobileOpen(false)}
              className={`px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                activeSection === 'home'
                  ? 'bg-[#2563EB]/20 text-[#00D4FF]'
                  : 'text-[#94A3B8] hover:text-[#F8FAFC]'
              }`}
            >
              Home
            </a>
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={() => setMobileOpen(false)}
                  className={`px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-[#2563EB]/20 text-[#00D4FF]'
                      : 'text-[#94A3B8] hover:text-[#F8FAFC]'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
            <a
              href="#contact"
              onClick={() => setMobileOpen(false)}
              className="mt-3 inline-flex items-center justify-center w-full py-3 px-4 text-sm font-semibold text-white rounded-lg bg-gradient-to-r from-[#2563EB] to-[#00D4FF] border border-[#38BDF8]/30"
            >
              Let&apos;s Connect
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};
