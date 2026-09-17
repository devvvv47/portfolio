import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Trophy, Globe, Flag, Filter } from 'lucide-react';

export const AwardsSection: React.FC = () => {
  const { data } = usePortfolio();
  const { awards } = data;
  const [filter, setFilter] = useState<'all' | 'international' | 'domestic'>('all');

  const filteredAwards = awards.filter((aw) => {
    if (filter === 'all') return true;
    return aw.type === filter;
  });

  const internationalCount = awards.filter((a) => a.type === 'international').length;
  const domesticCount = awards.filter((a) => a.type === 'domestic').length;

  return (
    <section
      id="awards"
      className="py-24 sm:py-32 border-t border-black/10 max-w-7xl mx-auto px-6 sm:px-8"
    >
      {/* Section Identifier */}
      <div className="flex items-center gap-3 text-xs font-mono tracking-widest text-[#7C3AED] uppercase mb-4">
        <span>05 //</span>
        <span>AWARDS</span>
      </div>

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-black/10">
        <div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#111111]">
            Honors &amp; Recognitions
          </h2>
          <p className="mt-3 text-sm text-neutral-600">
            글로벌 및 국내 유수 광고제와 공모전에서의 수상 및 파이널리스트 선정 공식 기록입니다.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-neutral-100 border border-black/10 text-xs font-mono">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 transition-colors ${
              filter === 'all'
                ? 'bg-black text-white font-bold'
                : 'text-neutral-600 hover:text-black'
            }`}
          >
            ALL ({awards.length})
          </button>
          <button
            onClick={() => setFilter('international')}
            className={`flex items-center gap-1.5 px-3 py-1.5 transition-colors ${
              filter === 'international'
                ? 'bg-black text-white font-bold'
                : 'text-neutral-600 hover:text-black'
            }`}
          >
            <Globe className="w-3 h-3" />
            <span>INTERNATIONAL ({internationalCount})</span>
          </button>
          <button
            onClick={() => setFilter('domestic')}
            className={`flex items-center gap-1.5 px-3 py-1.5 transition-colors ${
              filter === 'domestic'
                ? 'bg-black text-white font-bold'
                : 'text-neutral-600 hover:text-black'
            }`}
          >
            <Flag className="w-3 h-3" />
            <span>DOMESTIC ({domesticCount})</span>
          </button>
        </div>
      </div>

      {/* Structured Awards Archive Table: 연도 / 광고제명 / 수상 등급 / 프로젝트명 */}
      <div className="mt-8 overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b-2 border-black text-[11px] font-mono tracking-widest text-neutral-600 uppercase">
              <th className="py-4 px-3 sm:px-4 w-20">YEAR</th>
              <th className="py-4 px-3 sm:px-4">FESTIVAL / COMPETITION</th>
              <th className="py-4 px-3 sm:px-4">TIER / LEVEL</th>
              <th className="py-4 px-3 sm:px-4">PROJECT NAME</th>
              <th className="py-4 px-3 sm:px-4 text-right w-24">CATEGORY</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-black/10 text-sm">
            {filteredAwards.map((award) => {
              const isGrandOrGold =
                award.tier.includes('Gold') ||
                award.tier.includes('대상') ||
                award.tier.includes('최우수');

              return (
                <tr
                  key={award.id}
                  className="hover:bg-black/2.5 transition-colors group"
                >
                  {/* Year */}
                  <td className="py-4 px-3 sm:px-4 font-mono text-xs text-neutral-500 group-hover:text-black">
                    {award.year}
                  </td>

                  {/* Festival */}
                  <td className="py-4 px-3 sm:px-4 font-semibold text-[#111111] group-hover:text-[#7C3AED] transition-colors">
                    {award.festival}
                  </td>

                  {/* Tier */}
                  <td className="py-4 px-3 sm:px-4">
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

                  {/* Project Name */}
                  <td className="py-4 px-3 sm:px-4 text-neutral-700 font-medium">
                    {award.projectName}
                  </td>

                  {/* Category Type */}
                  <td className="py-4 px-3 sm:px-4 text-right">
                    <span className="text-[10px] font-mono tracking-wider text-neutral-600 uppercase">
                      {award.type === 'international' ? 'INTL' : 'DOM'}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="mt-8 pt-4 border-t border-black/10 flex items-center justify-between text-xs font-mono text-neutral-600">
        <span>* 단순 참가·출품 이력을 배제한 공인 수상 및 공식 Finalist 선정 기록입니다.</span>
        <span>ARCHIVE VERIFIED</span>
      </div>
    </section>
  );
};
