import React, { useState, useRef } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { CampaignProject, MoreProjectItem } from '../types';
import { ProjectDetailModal } from '../components/ProjectDetailModal';
import { SafeMedia } from '../components/SafeMedia';
import {
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  ArrowRight,
  Maximize2,
} from 'lucide-react';

interface ProjectsPageProps {
  onNavigate: (page: string) => void;
}

export const ProjectsPage: React.FC<ProjectsPageProps> = ({ onNavigate }) => {
  const { data } = usePortfolio();
  const { f1Project, campaigns, moreProjects } = data;
  const [selectedModalProject, setSelectedModalProject] = useState<any | null>(null);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Convert f1Project to modal project structure with special F1 flags
  const f1AsModalProject = {
    id: f1Project.id || 'boxbox-english',
    order: 0,
    title: f1Project.title || 'boxbox.english',
    client: 'INSTAGRAM',
    category: f1Project.category || 'SOCIAL MEDIA • INSTAGRAM',
    year: '2024',
    summary: f1Project.subtitle,
    question: '',
    insight: '',
    answer: '',
    myRole: f1Project.role,
    result: f1Project.results,
    imageUrl: f1Project.imageUrl,
    mediaUrl: f1Project.mockupMediaUrl || f1Project.imageUrl,
    accentColor: '#7C3AED',
    isF1: true,
    f1Raw: f1Project,
  };

  // Combine all projects: boxbox.english (F1) + Campaigns + More Projects
  const allProjects = [
    {
      item: f1AsModalProject,
      type: 'f1',
      imageUrl: f1Project.imageUrl || 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1200&q=80',
      title: f1Project.title || 'boxbox.english',
      client: 'INSTAGRAM',
      category: f1Project.category || 'SOCIAL MEDIA • INSTAGRAM',
    },
    ...campaigns.map((c) => ({
      item: c,
      type: 'campaign',
      imageUrl: c.imageUrl || 'https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?auto=format&fit=crop&w=1200&q=80',
      title: c.title,
      client: c.category || 'Campaign',
      category: c.category || 'Campaign',
    })),
    ...moreProjects.map((m) => ({
      item: m,
      type: 'more',
      imageUrl: m.imageUrl || 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80',
      title: m.title,
      client: m.category || 'Campaign',
      category: m.category || 'Campaign',
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
    <div className="pt-24 pb-24 px-6 sm:px-8 max-w-7xl mx-auto min-h-[calc(100vh-80px)] flex flex-col justify-between">
      <div>
        {/* Breadcrumb / Top Bar */}
        <div className="flex items-center justify-between border-b border-black/10 pb-4 mb-10 text-xs font-mono tracking-widest uppercase">
          <div className="flex items-center gap-3 text-[#7C3AED]">
            <span>04 //</span>
            <span className="text-black font-semibold">PROJECTS</span>
          </div>
          <div className="flex items-center gap-6">
            <button
              onClick={() => onNavigate('career')}
              className="text-neutral-500 hover:text-black flex items-center gap-1 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>PREV: CAREER</span>
            </button>
            <button
              onClick={() => onNavigate('awards')}
              className="text-neutral-500 hover:text-black flex items-center gap-1 transition-colors"
            >
              <span>NEXT: AWARDS</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-6 border-b border-black/10">
          <div>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[#111111]">
              Social Media &amp; Campaigns
            </h1>
          </div>

          {/* Horizontal Scroll Arrows & Count */}
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

        {/* Horizontal Scrolling Projects Rail (Thumbnails only) */}
        <div className="relative mt-8 group/rail">
          <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="flex gap-5 sm:gap-6 overflow-x-auto scroll-smooth pb-6 pt-2 snap-x snap-mandatory cursor-grab active:cursor-grabbing no-scrollbar"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {allProjects.map((project, idx) => (
              <div
                key={`${project.title}-${idx}`}
                onClick={() => setSelectedModalProject(project.item)}
                className="snap-start shrink-0 w-[300px] sm:w-[380px] md:w-[440px] aspect-[4/3] bg-neutral-100 border border-black/15 hover:border-[#7C3AED] relative overflow-hidden group cursor-pointer transition-all duration-300 shadow-xs hover:shadow-lg"
              >
                {/* Pure Thumbnail (Photo / Video Safe Component) */}
                <SafeMedia
                  url={project.imageUrl}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  controls={false}
                  autoPlay={false}
                />

                {/* Subtle Hover Reveal Overlay for Context & Click Cue */}
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

          {/* Scroll Progress Track */}
          <div className="mt-4">
            <div className="w-full h-[2px] bg-black/10 overflow-hidden">
              <div
                className="h-full bg-[#7C3AED] transition-all duration-150"
                style={{ width: `${Math.max(scrollProgress, 8)}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      <ProjectDetailModal
        project={selectedModalProject}
        onClose={() => setSelectedModalProject(null)}
      />
    </div>
  );
};
