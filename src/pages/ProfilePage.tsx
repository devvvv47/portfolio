import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { GraduationCap, ArrowRight, ArrowLeft, CheckCircle2 } from 'lucide-react';

interface ProfilePageProps {
  onNavigate: (page: string) => void;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({ onNavigate }) => {
  const { data } = usePortfolio();
  const { profile } = data;

  return (
    <div className="pt-24 pb-24 px-6 sm:px-8 max-w-7xl mx-auto min-h-[calc(100vh-80px)]">
      {/* Breadcrumb / Top Bar */}
      <div className="flex items-center justify-between border-b border-black/10 pb-4 mb-12 text-xs font-mono tracking-widest uppercase">
        <div className="flex items-center gap-3 text-[#7C3AED]">
          <span>02 //</span>
          <span className="text-black font-semibold">{profile.sectionTitle}</span>
        </div>
        <button
          onClick={() => onNavigate('home')}
          className="text-neutral-500 hover:text-black flex items-center gap-1 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>BACK TO HOME</span>
        </button>
      </div>

      {/* Hero Headline & Manifesto */}
      <div className="max-w-4xl">
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[#111111] leading-tight font-display">
          {profile.subtitle}
        </h1>

        <blockquote className="mt-10 pl-6 sm:pl-8 border-l-4 border-[#7C3AED] text-xl sm:text-2xl font-light text-neutral-800 leading-relaxed bg-[#7C3AED]/5 py-6 pr-6">
          {profile.introduction}
        </blockquote>
      </div>

      {/* 3-Stage Methodology: How I Ask */}
      <div className="mt-20">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between border-b border-black/10 pb-3 mb-8">
          <h2 className="text-sm font-mono tracking-widest text-[#7C3AED] uppercase font-bold">
            HOW I WORK
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {profile.askSteps.map((step, idx) => (
            <div
              key={step.step}
              className="p-8 bg-white border border-black/10 hover:border-[#7C3AED] hover:shadow-md transition-all duration-200 relative flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-black/5">
                  <span className="font-mono text-base text-[#7C3AED] font-extrabold tracking-wider">
                    {step.step}
                  </span>
                  <span className="text-[10px] font-mono text-neutral-600 uppercase tracking-widest">
                    PHASE 0{idx + 1}
                  </span>
                </div>
                <h3 className="mt-6 font-display text-2xl sm:text-3xl font-extrabold text-[#111111]">
                  {step.title}
                </h3>
              </div>
              <p className="mt-8 text-sm sm:text-base text-neutral-600 leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Core Competencies Matrix */}
      <div className="mt-20 p-8 sm:p-10 bg-white border border-black/10">
        <div className="text-xs font-mono text-neutral-600 uppercase tracking-widest mb-6">
          CORE CAPABILITIES
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {(
            profile.coreCapabilities || [
              {
                title: 'Problem Framing',
                desc: '데이터와 현상 뒤에 숨겨진 진짜 소비자 문제와 결핍을 질문으로 재정의',
              },
              {
                title: 'Creative Strategy',
                desc: '글로벌 광고제 수상으로 입증된 역발상 캠페인 콘셉트 및 메시지 설계',
              },
              {
                title: 'Channel Operation',
                desc: 'F1 숏폼 채널 140만 뷰, 1.5만 팔로워를 견인한 오가닉 소셜 성장 전략',
              },
              {
                title: 'Global Communication',
                desc: '프랑스 비즈니스 스쿨 교환학생 및 영문 프레젠테이션/리포트 작성 역량',
              },
            ]
          ).map((cap, i) => (
            <div key={cap.id || i} className="border-l-2 border-[#7C3AED] pl-4">
              <h4 className="font-bold text-sm text-black">{cap.title}</h4>
              <p className="mt-2 text-xs text-neutral-600 leading-relaxed">{cap.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Education Section */}
      <div className="mt-20 pt-12 border-t border-black/10">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-8">
          <div className="md:w-1/4">
            <div className="flex items-center gap-2 text-xs font-mono text-[#7C3AED] uppercase tracking-widest font-bold">
              <GraduationCap className="w-4 h-4" />
              <span>EDUCATION // 학력</span>
            </div>
            <p className="mt-2 text-xs text-neutral-600 leading-relaxed">
              글로벌 비즈니스 및 인터내셔널 마케팅 전략 수학
            </p>
          </div>

          <div className="md:w-3/4 grid grid-cols-1 sm:grid-cols-3 gap-6">
            {profile.educations.map((edu, idx) => (
              <div
                key={idx}
                className="p-6 bg-white border border-black/10 flex flex-col justify-between"
              >
                <div>
                  <h4 className="text-base font-bold text-[#111111]">
                    {edu.school}
                  </h4>
                  <p className="mt-1.5 text-xs text-neutral-600">{edu.major}</p>
                  {edu.notes && (
                    <p className="text-[11px] font-mono text-neutral-600 mt-1">{edu.notes}</p>
                  )}
                </div>
                <div className="mt-6 pt-3 border-t border-black/5">
                  <span className="text-xs font-mono font-semibold text-[#7C3AED]">
                    {edu.period}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="mt-20 pt-8 border-t border-black/10 flex items-center justify-between">
        <button
          onClick={() => onNavigate('home')}
          className="text-xs font-mono text-neutral-600 hover:text-black flex items-center gap-1.5"
        >
          <ArrowLeft className="w-4 h-4" /> PREV: HOME
        </button>
        <button
          onClick={() => onNavigate('career')}
          className="px-6 py-3 bg-black text-white hover:bg-[#7C3AED] transition-colors text-xs font-mono tracking-wider uppercase flex items-center gap-2"
        >
          <span>NEXT: CAREER</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
