import React from 'react';
import { Calendar, MapPin } from 'lucide-react';
import { FadeIn } from '../ui';

interface TimelineEvent {
  date: string;
  desc: string;
}

export interface TimelineBlockProps {
  year: string;
  image: string;
  title: string;
  events: TimelineEvent[];
  isEven: boolean;
}

export const TimelineBlock: React.FC<TimelineBlockProps> = ({ year, image, title, events, isEven }) => {
  return (
    <div className={`relative flex flex-col md:flex-row items-center gap-6 md:gap-0 ${isEven ? 'md:flex-row-reverse' : ''}`}>
      
      {/* Timeline Dot (Desktop & Mobile) */}
      <div className="absolute left-1/2 md:top-1/2 w-4 h-4 bg-primary rounded-full border-4 border-white shadow-md z-20 transform -translate-x-1/2 md:-translate-y-1/2 -top-10 md:top-auto" />

      {/* Content Side */}
      <div className={`w-full md:w-1/2 px-4 md:px-0 z-10 ${isEven ? 'md:pl-16' : 'md:pr-16'}`}>
        <FadeIn delay={0.1} className="h-full">
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xl shadow-gray-100 border border-gray-100 hover:shadow-2xl transition-all duration-300 group h-full">
            <div className="flex items-center justify-between mb-6">
              <span className="text-5xl font-display font-black text-gray-100 group-hover:text-primary/10 transition-colors duration-300">
                {year}
              </span>
              {title && (
                <span className="text-sm font-bold text-primary uppercase tracking-wider bg-primary/5 px-3 py-1 rounded-full">
                  {title}
                </span>
              )}
            </div>
            
            <div className="space-y-6">
              {events.map((ev, i) => (
                <div key={i} className="relative pl-6 border-l-2 border-gray-100 group-hover:border-primary/30 transition-colors duration-300">
                  <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
                    <Calendar className="w-3 h-3" />
                    {ev.date}
                  </div>
                  <p className="text-gray-600 font-medium leading-relaxed">
                    {ev.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>

      {/* Image Side */}
      <div className={`w-full md:w-1/2 px-4 md:px-0 mt-4 md:mt-0 z-10 ${isEven ? 'md:pr-16' : 'md:pl-16'}`}>
        <FadeIn delay={0.2}>
          <div className="relative group overflow-hidden rounded-2xl shadow-lg aspect-[4/3]">
            <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 mix-blend-multiply" />
            <img 
              src={image} 
              alt={`Story from ${year}`} 
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20">
              <p className="text-white font-medium text-sm flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Cebu, Philippines
              </p>
            </div>
          </div>
        </FadeIn>
      </div>
    </div>
  );
};
