import React from 'react';
import { FadeIn, Counter } from '../ui';

export const ImpactStats = () => {
  return (
    <div className="relative z-20 max-w-5xl mx-auto px-4 -mt-24 sm:-mt-28 md:-mt-32 mb-12 sm:mb-24 pointer-events-none">
      <div className="bg-[#111111] backdrop-blur-xl rounded-[2.5rem] shadow-[0_20px_50px_-10px_rgba(0,0,0,0.5)] py-6 md:py-8 px-6 md:px-10 relative overflow-hidden border border-white/5 pointer-events-auto">
        <div className="flex flex-row justify-around items-center flex-wrap gap-4 md:gap-2 relative z-10 w-full">
          {[
            { label: "ESTABLISHED IN", value: 2018, unit: "" },
            { label: "DONATION", value: 75120, unit: "BOWLS" },
            { label: "PROJECTS", value: "W.I.P.", unit: "" },
            { label: "SUPPORT FOR", value: 80, unit: "PLACES" },
          ].map((stat, idx) => (
            <FadeIn key={idx} delay={idx * 0.1} className="text-center group flex-1 min-w-[120px]">
              <div className="text-3xl md:text-4xl lg:text-5xl font-display font-black text-white mb-1 md:mb-2 flex flex-row items-baseline justify-center tracking-tighter drop-shadow-md">
                {typeof stat.value === 'string' || stat.label === "ESTABLISHED IN" ? (
                  stat.value
                ) : (
                  <Counter end={stat.value} duration={2500} />
                )}
                {stat.unit && <span className="font-sans text-gray-400 text-sm md:text-base font-bold ml-2 tracking-widest">{stat.unit}</span>}
              </div>
              <div className="font-sans text-gray-400 font-bold text-[9px] md:text-[10px] tracking-widest uppercase transition-colors group-hover:text-white">
                {stat.label}
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </div>
  );
};
