import React from 'react';
import { SafeMedia } from './SafeMedia';

interface PhoneClayMockupProps {
  mediaUrl?: string;
  className?: string;
}

export const PhoneClayMockup: React.FC<PhoneClayMockupProps> = ({
  mediaUrl,
  className = '',
}) => {
  return (
    <div className={`relative mx-auto flex items-center justify-center ${className}`}>
      {/* iPhone Clay Body */}
      <div className="relative w-[230px] sm:w-[250px] aspect-[9/18.5] bg-[#E5E7EB] rounded-[42px] p-[10px] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.25),inset_0_2px_4px_rgba(255,255,255,0.8),inset_0_-2px_4px_rgba(0,0,0,0.1)] border border-neutral-300">
        {/* Outer bezel rim */}
        <div className="relative w-full h-full bg-black rounded-[34px] overflow-hidden p-[3px]">
          {/* Screen area */}
          <div className="relative w-full h-full bg-neutral-900 rounded-[31px] overflow-hidden flex flex-col">
            {/* Dynamic Island / Notch */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 z-20 w-20 h-4 bg-black rounded-full flex items-center justify-end px-1.5 gap-1">
              <div className="w-2 h-2 rounded-full bg-neutral-800/80" />
            </div>

            {/* Screen Media Content */}
            <div className="relative w-full h-full bg-neutral-950 flex items-center justify-center overflow-hidden">
              {mediaUrl ? (
                <SafeMedia
                  url={mediaUrl}
                  alt="Phone Mockup Content"
                  className="w-full h-full object-cover"
                  autoPlay
                  loop
                  muted
                  controls={false}
                />
              ) : (
                <div className="p-4 text-center text-neutral-500 font-mono text-xs">
                  <p className="text-neutral-400 font-bold mb-1">PHONE SCREEN</p>
                  <p className="text-[10px]">사진이나 영상을 등록하세요</p>
                </div>
              )}
            </div>

            {/* Home indicator bar at bottom */}
            <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 z-20 w-24 h-1 bg-white/40 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
};
