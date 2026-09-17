import React from 'react';
import { ArrowDown } from 'lucide-react';

export const Hero: React.FC = () => {
  const scrollToProjects = () => {
    const el = document.getElementById('projects');
    if (el) {
      const topOffset = 70;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - topOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section
      id="home"
      className="min-h-screen relative flex flex-col justify-between pt-28 pb-16 px-6 sm:px-8 max-w-7xl mx-auto"
    >
      {/* Editorial Header Bar / Issue Meta */}
      <div className="flex flex-wrap items-center justify-between border-b border-black/10 pb-4 text-[11px] font-mono tracking-widest text-neutral-600 uppercase">
        <div className="flex items-center gap-3">
          <span className="inline-block w-2 h-2 bg-[#7C3AED] rounded-full" />
          <span>MARKETING PORTFOLIO</span>
        </div>
        <div className="hidden sm:block">
          <span>CREATIVE STRATEGY &amp; CAMPAIGN ARCHIVE</span>
        </div>
        <div>
          <span>SEOUL, KR</span>
        </div>
      </div>

      {/* Main Center Typography */}
      <div className="my-auto py-12 sm:py-20 flex flex-col items-start justify-center">
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

          {/* Subtext description */}
          <div className="mt-8 sm:mt-12 pt-8 border-t border-black/10 max-w-2xl">
            <p className="text-xl sm:text-2xl md:text-3xl text-neutral-800 font-light leading-snug tracking-tight">
              끊임없이 질문하며 더 나은 답을 찾는<br className="hidden sm:inline" />
              <span className="font-medium text-black"> 마케터 김드보라</span>입니다.
            </p>
            <p className="mt-3 text-sm sm:text-base text-neutral-600 leading-relaxed">
              소비자의 당연한 행동 뒤에 숨은 본질을 포착하고, 브랜드를 움직이는 실행 가능한 캠페인 솔루션으로 구체화합니다.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Action Footer */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pt-6 border-t border-black/10 gap-4">
        <button
          id="hero-view-projects-btn"
          onClick={scrollToProjects}
          className="group inline-flex items-center gap-3 px-6 py-3.5 bg-black text-white hover:bg-[#7C3AED] transition-all duration-200 text-xs font-mono tracking-wider uppercase focus:outline-hidden"
        >
          <span>VIEW PROJECTS</span>
          <ArrowDown className="w-4 h-4 transition-transform group-hover:translate-y-1" />
        </button>
      </div>
    </section>
  );
};
