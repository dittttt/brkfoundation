import React from 'react';
import { Globe, Heart, Users } from 'lucide-react';
import { Section, FadeIn } from '../ui';

export const ImpactStats = () => {
  return (
    <Section bg="dark" className="relative overflow-hidden py-32">
      <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent rounded-full blur-[120px]" />
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-12 relative z-10 max-w-screen-2xl mx-auto">
        {[
          { label: "ESTABLISHED IN", value: "2018", icon: Globe },
          { label: "DONATION", value: "75,120", unit: "BOWLS", icon: Heart },
          { label: "PROJECTS FINISHED", value: "W.I.P.", icon: Users },
          { label: "SUPPORT FOR", value: "80", unit: "PLACES", icon: Globe },
        ].map((stat, idx) => (
          <FadeIn key={idx} delay={idx * 0.1} className="text-center group">
            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
              <stat.icon className="w-8 h-8 text-white" />
            </div>
            <div className="text-gray-400 text-sm font-bold uppercase tracking-widest mb-2">{stat.label}</div>
            <div className="text-4xl md:text-5xl lg:text-6xl font-display font-black text-white flex items-baseline justify-center gap-2">
              {stat.value}
              {stat.unit && <span className="text-lg md:text-xl lg:text-2xl font-bold text-gray-400">{stat.unit}</span>}
            </div>
          </FadeIn>
        ))}
      </div>
    </Section>
  );
};
