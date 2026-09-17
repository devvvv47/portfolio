import React from 'react';
import { CampaignProject, MoreProjectItem, F1ProjectData } from '../types';
import { X, Award, HelpCircle, Lightbulb, CheckCircle2, UserCheck, Trophy, Users, Eye, Heart, ArrowUpRight, Instagram } from 'lucide-react';
import { PhoneClayMockup } from './PhoneClayMockup';
import { SafeMedia } from './SafeMedia';

interface ProjectDetailModalProps {
  project: (CampaignProject | MoreProjectItem | (CampaignProject & { isF1?: boolean; f1Raw?: F1ProjectData })) | null;
  onClose: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  const isF1 = (project as any).isF1 || project.id === 'boxbox-english' || project.id === 'f1-project' || project.title === 'boxbox.english';
  const f1Raw: F1ProjectData | undefined = (project as any).f1Raw;

  // Extract all award badges (supports array awardBadges as well as single awardBadge/award)
  const awardsList: string[] = (() => {
    const list = (project as any).awardBadges;
    if (Array.isArray(list) && list.length > 0) {
      return list.filter((b: string) => typeof b === 'string' && b.trim().length > 0);
    }
    const single = 'awardBadge' in project ? project.awardBadge : (project as any).award;
    return single && single.trim() ? [single.trim()] : [];
  })();

  const clientName = 'client' in project ? project.client : undefined;
  const yearText = 'year' in project ? project.year : undefined;
  const mediaUrl = (project as any).mediaUrl || (project as any).imageUrl;

  return (
    <div
      id="project-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs animate-fade-in"
      onClick={onClose}
    >
      <div
        id="project-modal-content"
        className="bg-[#FAFAFA] border border-black/20 w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-10 relative text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          id="close-project-modal-btn"
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-neutral-500 hover:text-black border border-black/10 hover:border-black/30 rounded-xs transition-colors z-20 bg-white"
          aria-label="Close Project Details"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Category & Year Header */}
        <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-neutral-600 uppercase tracking-widest pb-3 border-b border-black/10 pr-12">
          {isF1 ? (
            <span>SOCIAL MEDIA • INSTAGRAM</span>
          ) : (
            <span>Campaign</span>
          )}
        </div>

        {/* Project Title */}
        <h3 className="mt-4 font-display text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#111111] tracking-tight">
          {project.title}
        </h3>

        {/* Award Badges if exists and not F1 (추가, 변경 가능) */}
        {!isF1 && awardsList.length > 0 && (
          <div className="mt-4 flex flex-wrap items-center gap-2">
            {awardsList.map((badge, bIdx) => (
              <div
                key={bIdx}
                className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#7C3AED]/10 text-[#7C3AED] border border-[#7C3AED]/30 text-xs font-mono font-semibold"
              >
                <Award className="w-3.5 h-3.5 shrink-0" />
                <span>{badge}</span>
              </div>
            ))}
          </div>
        )}

        {/* SPECIAL VIEW FOR BOXBOX.ENGLISH (F1) */}
        {isF1 ? (
          <div className="mt-8 pt-6 border-t border-black/10">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              {/* Left Column: iPhone Clay Mockup with clickable Instagram link */}
              <div className="md:col-span-6 flex flex-col items-center justify-center py-4">
                <a
                  href="https://www.instagram.com/boxbox.english/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block cursor-pointer transition-transform duration-200 hover:scale-[1.02] focus:outline-hidden text-center"
                  title="인스타그램 @boxbox.english 바로가기"
                >
                  <div className="relative">
                    <PhoneClayMockup
                      mediaUrl={f1Raw?.mockupMediaUrl || f1Raw?.imageUrl || (project as any).imageUrl}
                    />
                  </div>
                  <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 bg-neutral-100 hover:bg-[#7C3AED]/10 text-neutral-800 hover:text-[#7C3AED] border border-black/10 text-xs font-mono font-medium transition-colors">
                    <Instagram className="w-3.5 h-3.5 text-[#E1306C]" />
                    <span>@boxbox.english 인스타그램 방문하기</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400 group-hover:text-[#7C3AED]" />
                  </div>
                </a>
              </div>

              {/* Right Column: Followers, Views, Interactions Stats arranged vertically */}
              <div className="md:col-span-6 space-y-6">
                <div>
                  <span className="text-xs font-mono font-semibold text-[#7C3AED] uppercase tracking-widest block mb-1">
                    PERFORMANCE METRICS
                  </span>
                  <h4 className="font-display text-2xl font-bold text-neutral-900">
                    Social Growth &amp; Engagement
                  </h4>
                </div>

                {/* 3 Metric Cards: Followers, Views, Interactions (세로 배치) */}
                <div className="space-y-4">
                  {/* Followers */}
                  <div className="bg-white border border-black/10 p-5 shadow-xs flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2 text-xs font-mono text-neutral-600">
                        <Users className="w-4 h-4 text-[#7C3AED]" />
                        <span className="font-semibold text-sm">Followers</span>
                      </div>
                    </div>
                    <div className="font-display text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight">
                      {f1Raw?.followers || '1.7K+'}
                    </div>
                  </div>

                  {/* Views */}
                  <div className="bg-white border border-black/10 p-5 shadow-xs flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2 text-xs font-mono text-neutral-600">
                        <Eye className="w-4 h-4 text-[#7C3AED]" />
                        <span className="font-semibold text-sm">Views</span>
                      </div>
                    </div>
                    <div className="font-display text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight">
                      {f1Raw?.views || '940K+'}
                    </div>
                  </div>

                  {/* Interactions (아이콘 포함) */}
                  <div className="bg-white border border-black/10 p-5 shadow-xs flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2 text-xs font-mono text-neutral-600">
                        <Heart className="w-4 h-4 text-[#7C3AED]" />
                        <span className="font-semibold text-sm">Interactions</span>
                      </div>
                    </div>
                    <div className="font-display text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight">
                      {f1Raw?.interactions || '74K+'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* STANDARD CAMPAIGN VIEW (두 번째 카드부터) */
          <div className="mt-8 space-y-6 pt-6 border-t border-black/10">
            {/* Top Media (Photo or Video placed above question/insight/answer) */}
            {mediaUrl && (
              <div className="w-full bg-black/5 border border-black/15 overflow-hidden rounded-xs">
                <SafeMedia
                  url={mediaUrl}
                  alt={project.title}
                  className="w-full max-h-[480px] object-contain bg-black/90 mx-auto block"
                  controls={true}
                  autoPlay={false}
                  loop={true}
                  muted={false}
                />
              </div>
            )}

            {/* Clean 5-Stage Core Sections */}
            {/* QUESTION */}
            {project.question && (
              <div className="bg-white p-5 sm:p-6 border-l-4 border-[#7C3AED] border-y border-r border-black/10">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#7C3AED] uppercase tracking-wider mb-2">
                  <HelpCircle className="w-4 h-4" />
                  <span>QUESTION</span>
                </div>
                <p className="text-base sm:text-lg font-medium text-neutral-900 leading-snug">
                  {project.question}
                </p>
              </div>
            )}

            {/* INSIGHT */}
            {project.insight && (
              <div className="bg-white p-5 sm:p-6 border border-black/10">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-neutral-700 uppercase tracking-wider mb-2">
                  <Lightbulb className="w-4 h-4 text-amber-500" />
                  <span>INSIGHT</span>
                </div>
                <p className="text-sm sm:text-base text-neutral-700 leading-relaxed">
                  {project.insight}
                </p>
              </div>
            )}

            {/* ANSWER */}
            {project.answer && (
              <div className="bg-[#7C3AED]/5 p-5 sm:p-6 border-l-4 border-[#7C3AED] border-y border-r border-[#7C3AED]/20">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#7C3AED] uppercase tracking-wider mb-2">
                  <CheckCircle2 className="w-4 h-4 text-[#7C3AED]" />
                  <span>ANSWER</span>
                </div>
                <p className="text-base text-neutral-900 leading-relaxed font-normal">
                  {project.answer}
                </p>
              </div>
            )}

            {/* MY ROLE */}
            {project.myRole && (
              <div className="bg-white p-5 sm:p-6 border border-black/10">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-neutral-700 uppercase tracking-wider mb-2">
                  <UserCheck className="w-4 h-4 text-neutral-600" />
                  <span>MY ROLE</span>
                </div>
                <p className="text-sm text-neutral-700 leading-relaxed">
                  {project.myRole}
                </p>
              </div>
            )}

            {/* RESULT */}
            {project.result && (
              <div className="bg-white p-5 sm:p-6 border border-black/10">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-700 uppercase tracking-wider mb-2">
                  <Trophy className="w-4 h-4 text-emerald-600" />
                  <span>RESULT</span>
                </div>
                <p className="text-sm font-medium text-neutral-900 leading-relaxed">
                  {project.result}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Footer info */}
        <div className="mt-8 pt-6 border-t border-black/10 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-black text-white hover:bg-[#7C3AED] transition-colors text-xs font-mono tracking-wider uppercase"
          >
            닫기 (CLOSE)
          </button>
        </div>
      </div>
    </div>
  );
};
