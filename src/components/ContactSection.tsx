import React, { useEffect, useRef, useState } from 'react';
import {
  ArrowUp,
  Check,
  Copy,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  Send,
} from 'lucide-react';
import { motion } from 'motion/react';
import { PROFILE } from '../data/portfolioData';
import { SpotlightTiltCard } from './SpotlightTiltCard';

interface ContactSectionProps {
  prefilledProject: string | null;
  onClearPrefill: () => void;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const ContactSection: React.FC<ContactSectionProps> = ({
  prefilledProject,
  onClearPrefill,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [recipientEmail, setRecipientEmail] = useState('');

  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    message?: string;
  }>({});
  const [validated, setValidated] = useState(false);
  const [copied, setCopied] = useState(false);
  const [socialNotice, setSocialNotice] = useState<string | null>(null);

  const nameInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (prefilledProject) {
      setMessage(
        `Hi Nitish, I reviewed your portfolio and would like to discuss your project "${prefilledProject}".`
      );
      setErrors((prev) => ({ ...prev, message: undefined }));
      window.setTimeout(() => {
        nameInputRef.current?.focus();
      }, 250);
      onClearPrefill();
    }
  }, [prefilledProject, onClearPrefill]);

  const validate = () => {
    const nextErrors: { name?: string; email?: string; message?: string } = {};
    if (name.trim().length < 2) {
      nextErrors.name = 'Please enter your name (at least 2 characters).';
    }
    if (!EMAIL_REGEX.test(email.trim())) {
      nextErrors.email = 'Please enter a valid email address.';
    }
    if (message.trim().length < 10) {
      nextErrors.message = 'Please write a message of at least 10 characters.';
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setValidated(true);
    } else {
      setValidated(false);
    }
  };

  const buildMailtoHref = () => {
    const target = EMAIL_REGEX.test(recipientEmail.trim())
      ? encodeURIComponent(recipientEmail.trim())
      : '';
    const subject = encodeURIComponent(`Portfolio Inquiry from ${name.trim()}`);
    const body = encodeURIComponent(
      `Name: ${name.trim()}\nReply-To: ${email.trim()}\n\nMessage:\n${message.trim()}\n\n---\nPrepared via NITISH.DEV Portfolio`
    );
    return `mailto:${target}?subject=${subject}&body=${body}`;
  };

  const handleCopyMessage = async () => {
    const formatted = `Portfolio Inquiry for Nitish Kumar A\nFrom: ${name.trim()} (${email.trim()})\n\n${message.trim()}`;
    try {
      await navigator.clipboard.writeText(formatted);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  };

  const handleGithubPlaceholder = (e: React.MouseEvent) => {
    e.preventDefault();
    setSocialNotice(
      'GitHub profile link is set as a placeholder until a public repository URL is added. Connect directly on LinkedIn or send a message using the form.'
    );
  };

  return (
    <>
      <section
        id="contact"
        className="py-24 md:py-32 border-t border-[#38BDF8]/12 relative"
      >
        <div className="max-w-[1240px] mx-auto px-6 md:px-9">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Invitation & Live LinkedIn Connection */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-5"
            >
              <span className="block font-mono text-xs font-medium text-[#00D4FF] mb-2">
                05. Direct Dispatch
              </span>
              <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#F8FAFC] mb-4">
                Let&apos;s Build Something Meaningful
              </h2>
              <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed mb-8">
                I&apos;m always interested in learning opportunities, collaborative projects, and meaningful conversations about technology.
              </p>

              {/* Profile & LinkedIn Card */}
              <SpotlightTiltCard
                tiltMaxDeg={3.5}
                className="p-6 rounded-3xl bg-[#0A101D]/90 border border-[#38BDF8]/18 hover:border-[#00D4FF]/50 mb-8"
              >
                <div className="relative z-10 space-y-4">
                  <div>
                    <span className="block font-mono text-[11px] text-[#64748B] mb-0.5">
                      Name &amp; Standing
                    </span>
                    <strong className="text-sm font-semibold text-[#F8FAFC]">
                      {PROFILE.name} · {PROFILE.status}
                    </strong>
                  </div>
                  <div>
                    <span className="block font-mono text-[11px] text-[#64748B] mb-0.5">
                      Institution
                    </span>
                    <strong className="text-sm font-semibold text-[#F8FAFC]">
                      {PROFILE.university}
                    </strong>
                  </div>
                  <div>
                    <span className="block font-mono text-[11px] text-[#64748B] mb-0.5">
                      LinkedIn
                    </span>
                    <a
                      href={PROFILE.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-[#00D4FF] hover:text-white transition-colors break-all"
                    >
                      <span>{PROFILE.linkedinDisplay}</span>
                      <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                    </a>
                  </div>
                </div>
              </SpotlightTiltCard>

              {/* Social Buttons */}
              <div>
                <h3 className="text-sm font-bold text-[#F8FAFC] mb-3">
                  Profiles &amp; Channels
                </h3>
                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href={PROFILE.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-white rounded-xl bg-gradient-to-r from-[#2563EB] to-[#0284C7] border border-[#38BDF8]/40 shadow-[0_0_24px_-6px_rgba(0,212,255,0.45)] transition-all duration-150 hover:-translate-y-0.5 whitespace-nowrap shrink-0"
                  >
                    <Linkedin className="w-4 h-4" />
                    <span>LinkedIn</span>
                    <ExternalLink className="w-3 h-3 opacity-85" />
                  </a>

                  <button
                    type="button"
                    onClick={handleGithubPlaceholder}
                    className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-medium text-[#CBD5E1] rounded-xl bg-[#0A101D] border border-[#38BDF8]/18 hover:border-[#00D4FF]/55 hover:text-white transition-all duration-150 hover:-translate-y-0.5 whitespace-nowrap shrink-0"
                  >
                    <Github className="w-4 h-4" />
                    <span>GitHub</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => nameInputRef.current?.focus()}
                    className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-medium text-[#CBD5E1] rounded-xl bg-[#0A101D] border border-[#38BDF8]/18 hover:border-[#00D4FF]/55 hover:text-white transition-all duration-150 hover:-translate-y-0.5 whitespace-nowrap shrink-0"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Email Form</span>
                  </button>
                </div>

                {socialNotice && (
                  <p
                    role="status"
                    aria-live="polite"
                    className="mt-3 text-xs text-[#00D4FF] leading-relaxed"
                  >
                    {socialNotice}
                  </p>
                )}
              </div>
            </motion.div>

            {/* Right Column: Client-Side Validated Form + Honest Mailto Fallback */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-7"
            >
              <SpotlightTiltCard
                tiltMaxDeg={1.8}
                as="div"
                className="p-6 sm:p-9 rounded-3xl bg-[#0A101D]/90 border border-[#38BDF8]/18 hover:border-[#00D4FF]/45"
              >
                <div className="relative z-10">
                  <form onSubmit={handleSubmit} noValidate className="space-y-5">
                    <div>
                      <h3 className="text-2xl font-extrabold text-[#F8FAFC] mb-1">
                        Send a Message
                      </h3>
                      <p className="text-xs text-[#94A3B8]">
                        Client-side validated form with clearly labeled email-client (
                        <code className="font-mono text-[#00D4FF]">mailto:</code>) dispatch fallback.
                      </p>
                    </div>

                    {/* Name Field */}
                    <div>
                      <label
                        htmlFor="contact-name"
                        className="block text-xs font-medium text-[#CBD5E1] mb-2"
                      >
                        Name <span className="text-[#00D4FF]">*</span>
                      </label>
                      <input
                        ref={nameInputRef}
                        id="contact-name"
                        type="text"
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                          if (errors.name) {
                            setErrors((p) => ({ ...p, name: undefined }));
                          }
                        }}
                        placeholder="Your full name"
                        aria-invalid={Boolean(errors.name)}
                        aria-describedby={
                          errors.name ? 'contact-name-error' : undefined
                        }
                        className={`w-full px-4 py-3 text-sm text-[#F8FAFC] placeholder-[#64748B] rounded-xl bg-[#03060C] border transition-colors focus:outline-none ${
                          errors.name
                            ? 'border-red-400 focus:border-red-400'
                            : 'border-[#38BDF8]/18 focus:border-[#00D4FF]'
                        }`}
                      />
                      {errors.name && (
                        <p
                          id="contact-name-error"
                          role="alert"
                          className="mt-1.5 text-xs text-red-400"
                        >
                          {errors.name}
                        </p>
                      )}
                    </div>

                    {/* Email Field */}
                    <div>
                      <label
                        htmlFor="contact-email"
                        className="block text-xs font-medium text-[#CBD5E1] mb-2"
                      >
                        Email <span className="text-[#00D4FF]">*</span>
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (errors.email) {
                            setErrors((p) => ({ ...p, email: undefined }));
                          }
                        }}
                        placeholder="you@example.com"
                        aria-invalid={Boolean(errors.email)}
                        aria-describedby={
                          errors.email ? 'contact-email-error' : undefined
                        }
                        className={`w-full px-4 py-3 text-sm text-[#F8FAFC] placeholder-[#64748B] rounded-xl bg-[#03060C] border transition-colors focus:outline-none ${
                          errors.email
                            ? 'border-red-400 focus:border-red-400'
                            : 'border-[#38BDF8]/18 focus:border-[#00D4FF]'
                        }`}
                      />
                      {errors.email && (
                        <p
                          id="contact-email-error"
                          role="alert"
                          className="mt-1.5 text-xs text-red-400"
                        >
                          {errors.email}
                        </p>
                      )}
                    </div>

                    {/* Message Field */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label
                          htmlFor="contact-message"
                          className="text-xs font-medium text-[#CBD5E1]"
                        >
                          Message <span className="text-[#00D4FF]">*</span>
                        </label>
                        <span className="font-mono text-xs text-[#64748B] tabular-nums">
                          {message.length} / 1000
                        </span>
                      </div>
                      <textarea
                        id="contact-message"
                        rows={4}
                        maxLength={1000}
                        value={message}
                        onChange={(e) => {
                          setMessage(e.target.value);
                          if (errors.message) {
                            setErrors((p) => ({ ...p, message: undefined }));
                          }
                        }}
                        placeholder="Share details about an internship opportunity, project collaboration, or conversation..."
                        aria-invalid={Boolean(errors.message)}
                        aria-describedby={
                          errors.message ? 'contact-message-error' : undefined
                        }
                        className={`w-full px-4 py-3 text-sm text-[#F8FAFC] placeholder-[#64748B] rounded-xl bg-[#03060C] border transition-colors focus:outline-none resize-y ${
                          errors.message
                            ? 'border-red-400 focus:border-red-400'
                            : 'border-[#38BDF8]/18 focus:border-[#00D4FF]'
                        }`}
                      />
                      {errors.message && (
                        <p
                          id="contact-message-error"
                          role="alert"
                          className="mt-1.5 text-xs text-red-400"
                        >
                          {errors.message}
                        </p>
                      )}
                    </div>

                    <button
                      type="submit"
                      className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white rounded-xl bg-gradient-to-r from-[#2563EB] via-[#1D4ED8] to-[#00D4FF] border border-[#38BDF8]/35 shadow-[0_0_28px_-6px_rgba(0,212,255,0.5)] transition-all duration-150 hover:-translate-y-0.5"
                    >
                      <span>Send Message</span>
                      <Send className="w-4 h-4" />
                    </button>
                  </form>

                  {/* Clearly Labeled Mailto Email-Client Fallback */}
                  {validated && (
                    <div
                      aria-live="polite"
                      className="mt-6 pt-6 border-t border-white/[0.08] space-y-4"
                    >
                      <div>
                        <span className="block font-mono text-xs text-[#00D4FF] mb-1">
                          Validation Passed · Email-Client Fallback Ready
                        </span>
                        <p className="text-xs text-[#94A3B8] leading-relaxed">
                          No backend mail server is configured on this portfolio. Supply a recipient email below to open your message directly in your default email app via{' '}
                          <code className="font-mono text-[#00D4FF]">mailto:</code>, or copy the formatted message to send on LinkedIn.
                        </p>
                      </div>

                      <div>
                        <label
                          htmlFor="recipient-email-input"
                          className="block text-xs font-medium text-[#CBD5E1] mb-1.5"
                        >
                          Recipient Email Address (Optional for direct mailto:)
                        </label>
                        <input
                          id="recipient-email-input"
                          type="email"
                          value={recipientEmail}
                          onChange={(e) => setRecipientEmail(e.target.value)}
                          placeholder="Enter owner's email address to address the draft"
                          className="w-full px-3.5 py-2.5 text-xs text-[#F8FAFC] placeholder-[#64748B] rounded-lg bg-[#03060C] border border-[#38BDF8]/20 focus:border-[#00D4FF] focus:outline-none"
                        />
                      </div>

                      <div className="flex flex-wrap items-center gap-3">
                        <a
                          href={buildMailtoHref()}
                          className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-white rounded-xl bg-gradient-to-r from-[#2563EB] to-[#00D4FF] border border-[#38BDF8]/30 whitespace-nowrap shrink-0"
                        >
                          <Mail className="w-3.5 h-3.5" />
                          <span>Open in Email Client (mailto:)</span>
                        </a>

                        <button
                          type="button"
                          onClick={handleCopyMessage}
                          className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-medium text-[#CBD5E1] rounded-xl bg-[#03060C] border border-white/10 hover:text-white transition-colors whitespace-nowrap shrink-0"
                        >
                          {copied ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-[#00D4FF]" />
                              <span>Copied to Clipboard</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>Copy Formatted Message</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </SpotlightTiltCard>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 8: Minimal Premium Footer */}
      <footer className="py-10 border-t border-[#38BDF8]/14 bg-[#03060C]/98">
        <div className="max-w-[1240px] mx-auto px-6 md:px-9 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <a
              href="#home"
              className="text-base font-extrabold text-[#F8FAFC] hover:text-[#00D4FF] transition-colors font-display"
            >
              {PROFILE.brand}
            </a>
            <p className="text-xs text-[#94A3B8] mt-1">
              © 2026 Nitish Kumar A. Built with curiosity and code.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <a
                href={PROFILE.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Nitish Kumar A on LinkedIn"
                className="w-9 h-9 rounded-lg border border-[#38BDF8]/20 flex items-center justify-center text-[#94A3B8] hover:text-[#00D4FF] hover:border-[#00D4FF]/60 transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </a>

              <button
                type="button"
                onClick={handleGithubPlaceholder}
                aria-label="GitHub profile placeholder"
                className="w-9 h-9 rounded-lg border border-[#38BDF8]/20 flex items-center justify-center text-[#94A3B8] hover:text-white hover:border-[#00D4FF]/60 transition-colors"
              >
                <Github className="w-4 h-4" />
              </button>

              <a
                href="#contact"
                aria-label="Scroll to contact section"
                className="w-9 h-9 rounded-lg border border-[#38BDF8]/20 flex items-center justify-center text-[#94A3B8] hover:text-white hover:border-[#00D4FF]/60 transition-colors"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>

            <a
              href="#home"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-[#CBD5E1] rounded-lg border border-[#38BDF8]/20 hover:text-[#00D4FF] hover:border-[#00D4FF]/60 transition-colors whitespace-nowrap shrink-0"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </footer>
    </>
  );
};
