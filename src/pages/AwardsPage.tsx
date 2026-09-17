import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Trophy, Globe, Flag, Search, ArrowRight, ArrowLeft } from 'lucide-react';

interface AwardsPageProps {
  onNavigate: (page: string) => void;
}

export const AwardsPage: React.FC<AwardsPageProps> = ({ onNavigate }) => {
  const { data } = usePortfolio();
  const { awards } = data;
  const [filter, setFilter] = useState<'all' | 'international' | 'domestic'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredAwards = awards.filter((aw) => {
    const matchesType = filter === 'all' || aw.type === filter;
    const matchesSearch =
      searchQuery.trim() === '' ||
      aw.festival.toLowerCase().includes(searchQuery.toLowerCase()) ||
      aw.projectName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      aw.tier.toLowerCase().includes(searchQuery.toLowerCase()) ||
      aw.year.includes(searchQuery);

    return matchesType && matchesSearch;
  });

  const internationalCount = awards.filter((a) => a.type === 'international').length;
  const domesticCount = awards.filter((a) => a.type === 'domestic').length;

  return (
    <div className="pt-24 pb-24 px-6 sm:px-8 max-w-7xl mx-auto min-h-[calc(100vh-80px)]">
      {/* Breadcrumb / Top Bar */}
      <div className="flex items-center justify-between border-b border-black/10 pb-4 mb-12 text-xs font-mono tracking-widest uppercase">
        <div className="flex items-center gap-3 text-[#7C3AED]">
          <span>05 //</span>
          <span className="text-black font-semibold">AWARDS</span>
        </div>
        <button
          onClick={() => onNavigate('projects')}
          className="text-neutral-500 hover:text-black flex items-center gap-1 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>PREV: PROJECTS</span>
        </button>
      </div>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-black/10">
        <div>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[#111111]">
            Recognition Archive
          </h1>
          <p className="mt-3 text-sm sm:text-base text-neutral-600 max-w-2xl">
            국내 및 글로벌 공모전 · 광고제 수상 및 파이널리스트 선정 기록
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full sm:w-64">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="광고제, 프로젝트명 검색..."
            className="w-full pl-9 pr-4 py-2 border border-black/20 text-xs font-mono bg-white focus:border-[#7C3AED] focus:outline-hidden"
          />
          <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-3" />
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-1.5 p-1 bg-neutral-100 border border-black/10 text-xs font-mono">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 transition-colors ${
              filter === 'all'
                ? 'bg-black text-white font-bold'
                : 'text-neutral-600 hover:text-black'
            }`}
          >
            ALL ({awards.length})
          </button>
          <button
            onClick={() => setFilter('international')}
            className={`flex items-center gap-1.5 px-4 py-2 transition-colors ${
              filter === 'international'
                ? 'bg-[#7C3AED] text-white font-bold'
                : 'text-neutral-600 hover:text-black'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>INTERNATIONAL ({internationalCount})</span>
          </button>
          <button
            onClick={() => setFilter('domestic')}
            className={`flex items-center gap-1.5 px-4 py-2 transition-colors ${
              filter === 'domestic'
                ? 'bg-[#7C3AED] text-white font-bold'
                : 'text-neutral-600 hover:text-black'
            }`}
          >
            <Flag className="w-3.5 h-3.5" />
            <span>KOREA ({domesticCount})</span>
          </button>
        </div>

        <span className="text-xs font-mono text-neutral-600">
          표시된 결과: {filteredAwards.length} 건
        </span>
      </div>

      {/* Archive Table */}
      <div className="mt-8 overflow-x-auto bg-white border border-black/10">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b-2 border-black text-[11px] font-mono tracking-widest text-neutral-600 uppercase bg-[#FAFAFA]">
              <th className="py-4 px-4 sm:px-6 w-20">YEAR</th>
              <th className="py-4 px-4 sm:px-6">FESTIVAL / COMPETITION</th>
              <th className="py-4 px-4 sm:px-6">TIER / LEVEL</th>
              <th className="py-4 px-4 sm:px-6">PROJECT NAME</th>
              <th className="py-4 px-4 sm:px-6 text-right w-24">REGION</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-black/10 text-sm">
            {filteredAwards.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-12 text-center text-xs font-mono text-neutral-600">
                  검색 조건에 해당하는 수상 기록이 없습니다.
                </td>
              </tr>
            ) : (
              filteredAwards.map((award) => {
                const isGrandOrGold =
                  award.tier.includes('Gold') ||
                  award.tier.includes('대상') ||
                  award.tier.includes('최우수');

                return (
                  <tr key={award.id} className="hover:bg-[#7C3AED]/5 transition-colors group">
                    <td className="py-4 px-4 sm:px-6 font-mono text-xs text-neutral-500 group-hover:text-black">
                      {award.year}
                    </td>
                    <td className="py-4 px-4 sm:px-6 font-semibold text-[#111111] group-hover:text-[#7C3AED] transition-colors">
                      {award.festival}
                    </td>
                    <td className="py-4 px-4 sm:px-6">
                      <span
                        className={`inline-block font-mono text-xs px-2.5 py-1 ${
                          isGrandOrGold
                            ? 'bg-[#7C3AED] text-white font-bold'
                            : 'bg-neutral-100 text-neutral-800 border border-black/10 font-medium'
                        }`}
                      >
                        {award.tier}
                      </span>
                    </td>
                    <td className="py-4 px-4 sm:px-6 text-neutral-700 font-medium">
                      {award.projectName}
                    </td>
                    <td className="py-4 px-4 sm:px-6 text-right">
                      <span className="text-[10px] font-mono tracking-wider text-neutral-600 uppercase">
                        {award.type === 'international' ? 'INTL' : 'KOR'}
                      </span>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Navigation Footer */}
      <div className="mt-20 pt-8 border-t border-black/10 flex items-center justify-between">
        <button
          onClick={() => onNavigate('projects')}
          className="text-xs font-mono text-neutral-600 hover:text-black flex items-center gap-1.5"
        >
          <ArrowLeft className="w-4 h-4" /> PREV: PROJECTS
        </button>
        <button
          onClick={() => onNavigate('contact')}
          className="px-6 py-3 bg-black text-white hover:bg-[#7C3AED] transition-colors text-xs font-mono tracking-wider uppercase flex items-center gap-2"
        >
          <span>NEXT: CONTACT</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
