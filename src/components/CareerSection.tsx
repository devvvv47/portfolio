import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Briefcase } from 'lucide-react';

export const CareerSection: React.FC = () => {
  const { data } = usePortfolio();
  const { careers } = data;

  return (
    <section
      id="career"
      className="py-24 sm:py-32 border-t border-black/10 max-w-7xl mx-auto px-6 sm:px-8"
    >
      {/* Section Identifier */}
      <div className="flex items-center gap-3 text-xs font-mono tracking-widest text-[#7C3AED] uppercase mb-4">
        <span>03 //</span>
        <span>CAREER</span>
      </div>

      <div className="flex flex-col md:flex-row md:items-start justify-between gap-8 mb-12 sm:mb-16">
        <div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#111111]">
            Internships
          </h2>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono text-neutral-600 self-start md:self-end">
          <Briefcase className="w-3.5 h-3.5 text-[#7C3AED]" />
          <span>INTERNSHIPS</span>
        </div>
      </div>

      {/* Vertical Timeline */}
      <div className="relative border-l border-black/20 ml-2 sm:ml-4 pl-6 sm:pl-10 space-y-12 sm:space-y-16">
        {careers.map((career) => (
          <div
            key={career.id}
            id={`career-item-${career.id}`}
            className="relative group"
          >
            {/* Timeline Dot */}
            <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-3.5 h-3.5 bg-white border-2 border-black group-hover:border-[#7C3AED] group-hover:bg-[#7C3AED] transition-colors rounded-full" />

            <div className="bg-white border border-black/10 p-6 sm:p-8 hover:border-black/30 transition-all duration-200">
              {/* Company Header */}
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-black/10 pb-4">
                <div className="flex flex-wrap items-baseline gap-3">
                  <h3 className="font-display text-xl sm:text-2xl font-extrabold text-[#111111] tracking-tight">
                    {career.company}
                  </h3>
                  <span className="text-xs font-mono font-medium text-[#7C3AED] px-2 py-0.5 bg-[#7C3AED]/5 border border-[#7C3AED]/20">
                    {career.teamRole}
                  </span>
                </div>
                <span className="text-xs font-mono text-neutral-600">
                  {career.period}
                </span>
              </div>

              {/* Bullet points limited to 2~3 lines */}
              <ul className="mt-5 space-y-2.5">
                {career.bulletPoints.map((point, pIdx) => (
                  <li
                    key={pIdx}
                    className="text-sm text-neutral-700 flex items-start gap-2.5 leading-relaxed"
                  >
                    <span className="text-[#7C3AED] font-bold text-xs mt-0.5">•</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
