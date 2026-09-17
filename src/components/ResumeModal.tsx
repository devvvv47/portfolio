import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { X, Download, Printer, Mail, MapPin, Award, Briefcase, GraduationCap } from 'lucide-react';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const { data } = usePortfolio();
  const { profile, careers, awards, contact } = data;

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      id="resume-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs animate-fade-in"
      onClick={onClose}
    >
      <div
        id="resume-modal-content"
        className="bg-white border border-black/20 w-full max-w-4xl max-h-[92vh] overflow-y-auto shadow-2xl p-6 sm:p-12 relative text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Controls Header */}
        <div className="flex items-center justify-between pb-6 border-b border-black/10 no-print">
          <div className="text-xs font-mono text-neutral-600 uppercase tracking-widest">
            OFFICIAL RESUME // 김드보라 (DEBORAH KIM)
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-mono transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>PRINT / PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-neutral-500 hover:text-black border border-black/10 hover:border-black/30 rounded-xs transition-colors"
              aria-label="Close Resume"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Resume Sheet Body */}
        <div className="mt-8 space-y-10">
          {/* Header */}
          <div className="border-b-2 border-black pb-8">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4">
              <div>
                <h1 className="font-display text-4xl font-extrabold text-[#111111] tracking-tight">
                  김드보라 <span className="text-xl font-normal text-neutral-600 font-mono">Deborah Kim</span>
                </h1>
                <p className="mt-2 text-base text-[#7C3AED] font-medium">
                  질문을 통해 더 나은 답을 찾는 마케터 (Marketer &amp; Creative Strategist)
                </p>
              </div>
              <div className="text-xs font-mono text-neutral-600 space-y-1">
                <p className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-[#7C3AED]" />
                  <span>{contact.email}</span>
                </p>
                <p className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-neutral-500" />
                  <span>Seoul, South Korea</span>
                </p>
              </div>
            </div>

            <p className="mt-5 text-sm text-neutral-700 leading-relaxed max-w-3xl">
              {profile.introduction}
            </p>
          </div>

          {/* Experience */}
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#7C3AED] uppercase tracking-wider mb-4">
              <Briefcase className="w-4 h-4" />
              <span>EXPERIENCE // 실무 인턴 경력</span>
            </div>

            <div className="space-y-6">
              {careers.map((career) => (
                <div key={career.id} className="border-l-2 border-black/20 pl-4">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between">
                    <h3 className="text-base font-bold text-black">
                      {career.company}{' '}
                      <span className="text-xs font-mono font-normal text-neutral-600">
                        | {career.teamRole}
                      </span>
                    </h3>
                    <span className="text-xs font-mono text-neutral-600">
                      {career.period}
                    </span>
                  </div>
                  <ul className="mt-2 space-y-1 text-xs sm:text-sm text-neutral-700">
                    {career.bulletPoints.map((bp, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-[#7C3AED]">•</span>
                        <span>{bp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#7C3AED] uppercase tracking-wider mb-4">
              <GraduationCap className="w-4 h-4" />
              <span>EDUCATION // 학력</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {profile.educations.map((edu, idx) => (
                <div key={idx} className="p-4 bg-neutral-50 border border-black/10">
                  <h4 className="text-sm font-bold text-black">{edu.school}</h4>
                  <p className="text-xs text-neutral-600 mt-1">{edu.major}</p>
                  <p className="text-[11px] font-mono text-[#7C3AED] mt-2 font-medium">
                    {edu.period}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Selected Awards Summary */}
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#7C3AED] uppercase tracking-wider mb-4">
              <Award className="w-4 h-4" />
              <span>HONORS &amp; AWARDS // 주요 수상 이력</span>
            </div>

            <div className="divide-y divide-black/10 text-xs">
              {awards.slice(0, 8).map((aw) => (
                <div key={aw.id} className="py-2 flex items-baseline justify-between gap-4">
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-neutral-500 w-12">{aw.year}</span>
                    <span className="font-bold text-neutral-900">{aw.festival}</span>
                    <span className="text-[#7C3AED] font-medium">({aw.tier})</span>
                  </div>
                  <span className="text-neutral-600 truncate max-w-xs text-right">
                    {aw.projectName}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="mt-12 pt-6 border-t border-black/10 flex justify-end gap-3 no-print">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-black text-white hover:bg-[#7C3AED] transition-colors text-xs font-mono tracking-wider uppercase"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};
