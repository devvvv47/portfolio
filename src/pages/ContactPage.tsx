import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Mail, ArrowUpRight, Copy, Check, ArrowLeft, Send } from 'lucide-react';

interface ContactPageProps {
  onNavigate: (page: string) => void;
  onOpenAdmin: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate, onOpenAdmin }) => {
  const { data } = usePortfolio();
  const { contact } = data;
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(contact.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="pt-24 pb-24 px-6 sm:px-8 max-w-7xl mx-auto min-h-[calc(100vh-80px)] flex flex-col justify-between">
      <div>
        {/* Breadcrumb / Top Bar */}
        <div className="flex items-center justify-between border-b border-black/10 pb-4 mb-12 text-xs font-mono tracking-widest uppercase">
          <div className="flex items-center gap-3 text-[#7C3AED]">
            <span>06 //</span>
            <span className="text-black font-semibold">CONTACT</span>
          </div>
          <button
            onClick={() => onNavigate('awards')}
            className="text-neutral-500 hover:text-black flex items-center gap-1 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>PREV: AWARDS</span>
          </button>
        </div>

        {/* Main Typographic Headline */}
        <div className="max-w-4xl py-6">
          <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-extrabold text-[#111111] tracking-tight leading-[1.05]">
            {contact.headline}
          </h1>
          <p className="mt-6 text-xl sm:text-2xl text-neutral-700 font-light leading-relaxed">
            {contact.subheadline}
          </p>
        </div>

        {/* Contact Cards Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 pt-12 border-t border-black/10 max-w-4xl">
          {/* Email */}
          <div className="p-8 bg-white border border-black/10 flex flex-col justify-between hover:border-[#7C3AED] transition-colors">
            <div>
              <div className="flex items-center justify-between text-xs font-mono text-neutral-600 uppercase mb-4">
                <span>DIRECT EMAIL</span>
                <Mail className="w-4 h-4 text-[#7C3AED]" />
              </div>
              <a
                href={`mailto:${contact.email}`}
                className="text-lg font-bold text-black hover:text-[#7C3AED] transition-colors break-all"
              >
                {contact.email}
              </a>
              <p className="mt-2 text-xs text-neutral-500">
                캠페인 기획, 프로젝트 협업, 채용 제안 등 언제든 연락주세요.
              </p>
            </div>

            <div className="mt-8 pt-4 border-t border-black/5 flex items-center justify-between">
              <button
                onClick={handleCopyEmail}
                className="inline-flex items-center gap-1.5 text-xs font-mono text-neutral-600 hover:text-black"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-600 font-bold">복사 완료!</span>
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
                className="text-xs font-mono text-[#7C3AED] font-bold hover:underline flex items-center gap-1"
              >
                <span>메일 쓰기</span>
                <Send className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* LinkedIn */}
          <div className="p-8 bg-white border border-black/10 flex flex-col justify-between hover:border-[#7C3AED] transition-colors">
            <div>
              <div className="flex items-center justify-between text-xs font-mono text-neutral-600 uppercase mb-4">
                <span>PROFESSIONAL NETWORK</span>
                <ArrowUpRight className="w-4 h-4 text-[#7C3AED]" />
              </div>
              <h2 className="text-lg font-bold text-black">
                LinkedIn Profile
              </h2>
              <p className="mt-2 text-xs text-neutral-500">
                글로벌 비즈니스 네트워크 및 상세 커리어 활동 내역
              </p>
            </div>

            <div className="mt-8 pt-4 border-t border-black/5">
              <a
                href={contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-mono text-[#7C3AED] font-bold hover:underline"
              >
                <span>CONNECT ON LINKEDIN</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
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
            onClick={() => onNavigate('home')}
            className="text-neutral-600 hover:text-black"
          >
            FIRST: HOME
          </button>
          <button
            onClick={onOpenAdmin}
            className="text-neutral-600 hover:text-black transition-colors"
          >
            [ ADMIN LOGIN ]
          </button>
        </div>
      </footer>
    </div>
  );
};
