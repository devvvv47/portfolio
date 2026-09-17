import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { GraduationCap } from 'lucide-react';

export const ProfileSection: React.FC = () => {
  const { data } = usePortfolio();
  const { profile } = data;

  return (
    <section
      id="profile"
      className="py-24 sm:py-32 border-t border-black/10 max-w-7xl mx-auto px-6 sm:px-8"
    >
      {/* Section Identifier */}
      <div className="flex items-center gap-3 text-xs font-mono tracking-widest text-[#7C3AED] uppercase mb-4">
        <span>02 //</span>
        <span>{profile.sectionTitle}</span>
      </div>

      {/* Main Headline */}
      <div className="max-w-4xl">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#111111] leading-tight">
          {profile.subtitle}
        </h2>

        {/* Intro Quote without quotes */}
        <blockquote className="mt-8 pl-6 border-l-2 border-[#7C3AED] text-lg sm:text-xl md:text-2xl font-light text-neutral-800 leading-relaxed">
          {profile.introduction}
        </blockquote>
      </div>

      {/* 3 Steps: How I Ask */}
      <div className="mt-16 sm:mt-20">
        <div className="flex items-center justify-between border-b border-black/10 pb-3 mb-8">
          <h3 className="text-xs font-mono tracking-widest text-neutral-600 uppercase">
            HOW I WORK
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
          {profile.askSteps.map((step, idx) => (
            <div
              key={step.step}
              id={`ask-step-${step.step}`}
              className="group p-6 sm:p-8 bg-white border border-black/10 hover:border-black/30 transition-all duration-200 relative flex flex-col justify-between min-h-[220px]"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-[#7C3AED] font-bold tracking-wider">
                    {step.step}
                  </span>
                  <span className="text-[10px] font-mono text-neutral-600 uppercase tracking-widest">
                    STEP {idx + 1}
                  </span>
                </div>
                <h4 className="mt-4 font-display text-2xl sm:text-3xl font-extrabold text-[#111111]">
                  {step.title}
                </h4>
              </div>
              <p className="mt-6 text-sm text-neutral-600 leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Education (학력 - 하단에 간결하게 배치) */}
      <div className="mt-20 sm:mt-24 pt-12 border-t border-black/10">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-8">
          <div className="md:w-1/4">
            <div className="flex items-center gap-2 text-xs font-mono text-neutral-600 uppercase tracking-widest">
              <GraduationCap className="w-4 h-4 text-[#7C3AED]" />
              <span>EDUCATION</span>
            </div>
            <p className="mt-2 text-xs text-neutral-600">
              국내외 글로벌 비즈니스 및 마케팅 수학
            </p>
          </div>

          <div className="md:w-3/4 grid grid-cols-1 sm:grid-cols-3 gap-6">
            {profile.educations.map((edu, idx) => (
              <div
                key={idx}
                className="p-5 bg-white border border-black/10 flex flex-col justify-between"
              >
                <div>
                  <h4 className="text-sm font-bold text-[#111111]">
                    {edu.school}
                  </h4>
                  <p className="mt-1 text-xs text-neutral-600">{edu.major}</p>
                  {edu.notes && (
                    <p className="text-[11px] font-mono text-neutral-600 mt-0.5">{edu.notes}</p>
                  )}
                </div>
                <div className="mt-4 pt-3 border-t border-black/5">
                  <span className="text-[11px] font-mono font-medium text-[#7C3AED]">
                    {edu.period}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
