import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Briefcase, ArrowRight, ArrowLeft, Building2, Calendar } from 'lucide-react';

interface CareerPageProps {
  onNavigate: (page: string) => void;
}

export const CareerPage: React.FC<CareerPageProps> = ({ onNavigate }) => {
  const { data } = usePortfolio();
  const { careers } = data;

  return (
    <div className="pt-24 pb-24 px-6 sm:px-8 max-w-7xl mx-auto min-h-[calc(100vh-80px)]">
      {/* Breadcrumb / Top Bar */}
      <div className="flex items-center justify-between border-b border-black/10 pb-4 mb-12 text-xs font-mono tracking-widest uppercase">
        <div className="flex items-center gap-3 text-[#7C3AED]">
          <span>03 //</span>
          <span className="text-black font-semibold">CAREER</span>
        </div>
        <button
          onClick={() => onNavigate('profile')}
          className="text-neutral-500 hover:text-black flex items-center gap-1 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>PREV: PROFILE</span>
        </button>
      </div>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-black/10">
        <div>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[#111111]">
            Internships
          </h1>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono text-[#7C3AED] bg-[#7C3AED]/10 px-3 py-1.5 border border-[#7C3AED]/30">
          <Briefcase className="w-4 h-4" />
          <span>INTERNSHIPS</span>
        </div>
      </div>

      {/* Timeline */}
      <div className="mt-16 relative border-l-2 border-black/15 ml-4 sm:ml-8 pl-8 sm:pl-12 space-y-16">
        {careers.map((career, idx) => (
          <div key={career.id} className="relative group">
            {/* Timeline Indicator Dot */}
            <div className="absolute -left-[41px] sm:-left-[57px] top-2 w-4 h-4 bg-white border-2 border-black group-hover:border-[#7C3AED] group-hover:bg-[#7C3AED] transition-colors rounded-full" />

            <div className="bg-white border border-black/10 p-8 sm:p-10 hover:border-black/30 hover:shadow-sm transition-all">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3 border-b border-black/10 pb-5">
                <div className="flex flex-wrap items-baseline gap-3">
                  <span className="text-xs font-mono text-neutral-600">0{idx + 1} //</span>
                  <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-[#111111]">
                    {career.company}
                  </h2>
                  <span className="text-xs font-mono font-bold text-[#7C3AED] px-2.5 py-0.5 bg-[#7C3AED]/10 border border-[#7C3AED]/30">
                    {career.teamRole}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-mono text-neutral-600">
                  <Calendar className="w-3.5 h-3.5 text-[#7C3AED]" />
                  <span>{career.period}</span>
                </div>
              </div>

              {/* Bullet points */}
              <div className="mt-6">
                <ul className="space-y-3">
                  {career.bulletPoints.map((point, pIdx) => (
                    <li
                      key={pIdx}
                      className="text-sm sm:text-base text-neutral-800 flex items-start gap-3 leading-relaxed"
                    >
                      <span className="text-[#7C3AED] font-bold text-sm mt-0.5">•</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Footer */}
      <div className="mt-20 pt-8 border-t border-black/10 flex items-center justify-between">
        <button
          onClick={() => onNavigate('profile')}
          className="text-xs font-mono text-neutral-600 hover:text-black flex items-center gap-1.5"
        >
          <ArrowLeft className="w-4 h-4" /> PREV: PROFILE
        </button>
        <button
          onClick={() => onNavigate('projects')}
          className="px-6 py-3 bg-black text-white hover:bg-[#7C3AED] transition-colors text-xs font-mono tracking-wider uppercase flex items-center gap-2"
        >
          <span>NEXT: PROJECTS</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
