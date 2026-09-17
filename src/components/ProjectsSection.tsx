import React, { useState, useRef } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { CampaignProject, MoreProjectItem } from '../types';
import { ProjectDetailModal } from './ProjectDetailModal';
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
} from 'lucide-react';

export const ProjectsSection: React.FC = () => {
  const { data } = usePortfolio();
  const { f1Project, campaigns, moreProjects } = data;
  const [selectedModalProject, setSelectedModalProject] = useState<
    CampaignProject | MoreProjectItem | null
  >(null);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Convert f1Project to modal item
  const f1AsModalProject: CampaignProject = {
    id: f1Project.id || 'f1-project',
    order: 0,
    title: f1Project.title,
    client: 'Independent Project',
    category: f1Project.category,
    year: '2024',
    summary: f1Project.subtitle,
    question: '왜 F1은 일부 마니아만의 스포츠여야 할까?',
    insight:
      '신규 팬 유입의 장벽은 복잡한 규정과 기술 용어였습니다. 드라이버 간의 심리전과 서사 중심의 콘텐츠가 해결책이었습니다.',
    answer: f1Project.execution,
    myRole: f1Project.role,
    result: f1Project.results,
    awardBadge: 'Organic 1.4M+ Views',
    imageUrl: f1Project.imageUrl,
    accentColor: '#7C3AED',
  };

  const allProjects = [
    {
      item: f1AsModalProject,
      type: 'f1',
      imageUrl: f1Project.imageUrl || 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1200&q=80',
      title: f1Project.title,
      client: 'Independent Channel',
      category: f1Project.category,
    },
    ...campaigns.map((c) => ({
      item: c,
      type: 'campaign',
      imageUrl: c.imageUrl || 'https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?auto=format&fit=crop&w=1200&q=80',
      title: c.title,
      client: c.client,
      category: c.category,
    })),
    ...moreProjects.map((m) => ({
      item: m,
      type: 'more',
      imageUrl: m.imageUrl || 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80',
      title: m.title,
      client: m.category,
      category: m.award || 'Concept Exploration',
    })),
  ];

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      const totalScroll = scrollWidth - clientWidth;
      if (totalScroll > 0) {
        setScrollProgress((scrollLeft / totalScroll) * 100);
      }
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -420 : 420;
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section
      id="projects"
      className="py-24 sm:py-32 border-t border-black/10 max-w-7xl mx-auto px-6 sm:px-8"
    >
      {/* Section Header */}
      <div className="flex items-center gap-3 text-xs font-mono tracking-widest text-[#7C3AED] uppercase mb-4">
        <span>04 //</span>
        <span>PROJECTS</span>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-6 border-b border-black/10">
        <div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#111111]">
            Social Media &amp; Campaigns
          </h2>
        </div>

        {/* Scroll Control Buttons */}
        <div className="flex items-center gap-3 self-start sm:self-auto">
          <span className="text-xs font-mono text-neutral-500">
            {allProjects.length} PROJECTS
          </span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => scroll('left')}
              className="p-2.5 bg-white border border-black/20 hover:border-black hover:bg-black hover:text-white transition-colors text-black"
              title="이전 프로젝트"
              aria-label="Previous Projects"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="p-2.5 bg-white border border-black/20 hover:border-black hover:bg-black hover:text-white transition-colors text-black"
              title="다음 프로젝트"
              aria-label="Next Projects"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Horizontal Rail: Project Thumbnails */}
      <div className="relative mt-8">
        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="flex gap-5 sm:gap-6 overflow-x-auto scroll-smooth pb-6 pt-2 snap-x snap-mandatory cursor-grab active:cursor-grabbing"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {allProjects.map((project, idx) => (
            <div
              key={`section-${project.title}-${idx}`}
              onClick={() => setSelectedModalProject(project.item)}
              className="snap-start shrink-0 w-[300px] sm:w-[380px] md:w-[440px] aspect-[4/3] bg-neutral-100 border border-black/15 hover:border-[#7C3AED] relative overflow-hidden group cursor-pointer transition-all duration-300 shadow-xs hover:shadow-lg"
            >
              {/* Pure Thumbnail (Photo) */}
              <img
                src={project.imageUrl}
                alt={project.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
              />

              {/* Hover overlay with title & CTA */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-6 text-white pointer-events-none">
                <div className="flex justify-end">
                  <span className="p-2 bg-white/20 backdrop-blur-xs text-white rounded-full">
                    <Maximize2 className="w-4 h-4" />
                  </span>
                </div>
                <div>
                  <span className="text-[10px] font-mono tracking-widest uppercase text-[#A78BFA] block mb-1">
                    {project.client}
                  </span>
                  <h3 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-white leading-tight">
                    {project.title}
                  </h3>
                  <p className="mt-2 text-xs font-mono text-neutral-300 flex items-center gap-1">
                    <span>VIEW CASE STUDY</span>
                    <span>→</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Progress Line */}
        <div className="mt-4 flex items-center gap-4">
          <div className="flex-1 h-[2px] bg-black/10 overflow-hidden">
            <div
              className="h-full bg-[#7C3AED] transition-all duration-150"
              style={{ width: `${Math.max(scrollProgress, 8)}%` }}
            />
          </div>
          <span className="text-[10px] font-mono text-neutral-400 tracking-wider">
            DRAG OR SCROLL HORIZONTALLY
          </span>
        </div>
      </div>

      {/* Modal View */}
      <ProjectDetailModal
        project={selectedModalProject}
        onClose={() => setSelectedModalProject(null)}
      />
    </section>
  );
};
