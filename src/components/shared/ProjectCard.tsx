import React from 'react';
import { FadeIn } from '../ui';
import { LucideIcon } from 'lucide-react';

interface StatItem {
  icon: LucideIcon;
  value: string;
  label: string;
}

export interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  icon: React.ReactNode;
  stats?: StatItem[];
  reverse?: boolean;
  children?: React.ReactNode;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ 
  title, 
  description, 
  image, 
  icon, 
  stats, 
  reverse = false,
  children 
}) => {
  return (
    <div className="grid lg:grid-cols-2 gap-16 items-center">
      <FadeIn className={`relative h-[500px] rounded-3xl overflow-hidden shadow-2xl group ${reverse ? 'lg:order-2' : ''}`}>
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60" />
      </FadeIn>
      
      <FadeIn delay={0.2} className={reverse ? 'lg:order-1' : ''}>
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
            {icon}
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-black text-dark uppercase tracking-tight">
            {title}
          </h2>
        </div>
        
        <p className="text-lg text-gray-600 font-medium leading-relaxed mb-8">
          {description}
        </p>

        {children}

        {stats && (
          <div
            className="grid gap-4 md:gap-6"
            style={{ gridTemplateColumns: `repeat(${stats.length}, minmax(0, 1fr))` }}
          >
            {stats.map((stat, idx) => (
              <div key={idx} className="bg-gray-50 p-2 md:p-6 rounded-xl md:rounded-2xl border border-gray-100 text-center hover:shadow-lg transition-shadow flex flex-col justify-center items-center">
                <div className="text-primary mb-1 md:mb-2 flex justify-center"><stat.icon size={24} className="md:w-7 md:h-7" /></div>
                <div className="text-xl sm:text-2xl md:text-3xl font-black text-dark mb-1">{stat.value}</div>
                <div className="text-[10px] sm:text-xs md:text-sm font-bold text-gray-500 uppercase tracking-wider leading-tight">{stat.label}</div>
              </div>
            ))}
          </div>
        )}
      </FadeIn>
    </div>
  );
};
