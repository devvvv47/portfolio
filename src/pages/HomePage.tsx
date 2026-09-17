import React from 'react';
import { ArrowDown, ArrowRight } from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  return (
    <div className="pt-28 pb-20 px-6 sm:px-8 max-w-7xl mx-auto min-h-[calc(100vh-80px)] flex flex-col justify-between">
      {/* Editorial Header Bar */}
      <div className="flex flex-wrap items-center justify-between border-b border-black/10 pb-4 text-[11px] font-mono tracking-widest text-neutral-600 uppercase">
        <div className="flex items-center gap-3">
          <span className="inline-block w-2.5 h-2.5 bg-[#7C3AED] rounded-full animate-pulse" />
          <span>MARKETING STRATEGY &amp; CAMPAIGN ARCHIVE</span>
        </div>
        <div>
          <span>SEOUL, KR</span>
        </div>
      </div>

      {/* Main Center Typographic Hero */}
      <div className="my-auto py-12 sm:py-20 lg:py-28">
        <div className="max-w-5xl">
          {/* Main Statement */}
          <h1 className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold tracking-tight leading-[0.95] text-left">
            <span className="block text-[#111111]">
              Ask Differently,
            </span>
            <span className="block text-[#7C3AED] mt-1 sm:mt-2">
              Answer Better.
            </span>
          </h1>

          {/* Subtext description without English name */}
          <div className="mt-8 sm:mt-12 pt-8 border-t border-black/10 max-w-2xl">
            <p className="text-xl sm:text-2xl md:text-3xl text-neutral-800 font-light leading-snug tracking-tight">
              끊임없이 질문하며 더 나은 답을 찾는<br className="hidden sm:inline" />
              <span className="font-medium text-black"> 마케터 김드보라</span>입니다.
            </p>
            <p className="mt-4 text-sm sm:text-base text-neutral-600 leading-relaxed">
              당연하게 보이는 현상을 그대로 받아들이기보다 ‘왜’라는 질문을 던집니다.
              소비자의 행동과 브랜드가 가진 자산을 살피고, 발견한 답을 캠페인과 콘텐츠로 구체화합니다.
            </p>
          </div>

          {/* Direct CTA Buttons */}
          <div className="mt-8 sm:mt-10 flex flex-wrap items-center gap-4">
            <button
              onClick={() => onNavigate('projects')}
              className="group inline-flex items-center gap-3 px-7 py-4 bg-black text-white hover:bg-[#7C3AED] transition-all duration-200 text-xs font-mono tracking-wider uppercase"
            >
              <span>VIEW PROJECTS</span>
              <ArrowDown className="w-4 h-4 transition-transform group-hover:translate-y-1" />
            </button>
            <button
              onClick={() => onNavigate('profile')}
              className="inline-flex items-center gap-2 px-6 py-4 bg-white border border-black/20 hover:border-black text-black transition-colors text-xs font-mono tracking-wider uppercase"
            >
              <span>READ PROFILE</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Minimal Footer Strip */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pt-6 border-t border-black/10 gap-4 text-[11px] font-mono text-neutral-600">
        <div>
          <span>© 2026 DEBORAH KIM. ALL RIGHTS RESERVED.</span>
        </div>
        <div className="flex items-center gap-6">
          <button
            onClick={() => onNavigate('profile')}
            className="hover:text-black transition-colors"
          >
            START WITH PROFILE →
          </button>
        </div>
      </div>
    </div>
  );
};
