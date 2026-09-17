import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { ResumeModal } from './ResumeModal';
import { Mail, ArrowUpRight, Copy, Check, FileDown, ArrowUp } from 'lucide-react';

interface ContactSectionProps {
  onOpenAdmin: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onOpenAdmin }) => {
  const { data } = usePortfolio();
  const { contact } = data;
  const [copied, setCopied] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(contact.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <section
      id="contact"
      className="pt-24 sm:pt-32 pb-16 border-t border-black/10 max-w-7xl mx-auto px-6 sm:px-8"
    >
      {/* Section Identifier */}
      <div className="flex items-center gap-3 text-xs font-mono tracking-widest text-[#7C3AED] uppercase mb-4">
        <span>06 //</span>
        <span>CONTACT</span>
      </div>

      {/* Main Closing Typographic Question */}
      <div className="max-w-4xl py-6">
        <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-extrabold text-[#111111] tracking-tight leading-[1.05]">
          {contact.headline}
        </h2>
        <p className="mt-6 text-xl sm:text-2xl text-neutral-700 font-light leading-relaxed">
          {contact.subheadline}
        </p>
      </div>

      {/* Contact Interaction Actions */}
      <div className="mt-12 sm:mt-16 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 border-t border-black/10 pt-12">
        {/* Email Box */}
        <div className="p-6 sm:p-8 bg-white border border-black/10 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs font-mono text-neutral-600 uppercase mb-4">
              <span>DIRECT EMAIL</span>
              <Mail className="w-4 h-4 text-[#7C3AED]" />
            </div>
            <a
              href={`mailto:${contact.email}`}
              className="text-base sm:text-lg font-bold text-black hover:text-[#7C3AED] transition-colors break-all"
            >
              {contact.email}
            </a>
          </div>

          <div className="mt-6 pt-4 border-t border-black/5 flex items-center justify-between">
            <button
              onClick={handleCopyEmail}
              className="inline-flex items-center gap-1.5 text-xs font-mono text-neutral-600 hover:text-black transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-600 font-bold">COPIED!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>이메일 주소 복사</span>
                </>
              )}
            </button>
            <a
              href={`mailto:${contact.email}`}
              className="text-xs font-mono text-[#7C3AED] hover:underline"
            >
              메일 보내기 →
            </a>
          </div>
        </div>

        {/* LinkedIn / Professional Network */}
        <div className="p-6 sm:p-8 bg-white border border-black/10 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs font-mono text-neutral-600 uppercase mb-4">
              <span>PROFESSIONAL NETWORK</span>
              <ArrowUpRight className="w-4 h-4 text-[#7C3AED]" />
            </div>
            <h4 className="text-base sm:text-lg font-bold text-black">
              LinkedIn Profile
            </h4>
            <p className="mt-1 text-xs text-neutral-600">
              커리어 이력 및 네트워크 연결
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-black/5">
            <a
              href={contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-mono text-[#7C3AED] hover:underline"
            >
              <span>CONNECT ON LINKEDIN</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Resume Download / View */}
        <div className="p-6 sm:p-8 bg-black text-white flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs font-mono text-neutral-300 uppercase mb-4">
              <span>DOCUMENT ARCHIVE</span>
              <FileDown className="w-4 h-4 text-[#7C3AED]" />
            </div>
            <h4 className="text-base sm:text-lg font-bold text-white">
              Official Resume
            </h4>
            <p className="mt-1 text-xs text-neutral-300">
              김드보라 상세 이력서 열람 및 PDF 인쇄
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-white/10">
            <button
              onClick={() => setResumeOpen(true)}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#7C3AED] hover:bg-violet-700 transition-colors text-xs font-mono font-bold tracking-wider uppercase text-white"
            >
              <FileDown className="w-4 h-4" />
              <span>RESUME DOWNLOAD / VIEW</span>
            </button>
          </div>
        </div>
      </div>

      {/* Global Footer */}
      <footer className="mt-24 pt-8 border-t border-black/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-neutral-600">
        <div className="flex items-center gap-4">
          <span className="text-black font-bold">DEBORAH KIM</span>
          <span>© 2026. All Rights Reserved.</span>
        </div>

        <div className="flex items-center gap-6">
          <button
            onClick={onOpenAdmin}
            className="text-neutral-600 hover:text-black transition-colors"
          >
            [ ADMIN LOGIN ]
          </button>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1 text-black hover:text-[#7C3AED] transition-colors"
          >
            <span>BACK TO TOP</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </footer>

      {/* Resume Modal */}
      <ResumeModal isOpen={resumeOpen} onClose={() => setResumeOpen(false)} />
    </section>
  );
};
