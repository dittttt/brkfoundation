import React, { useRef } from 'react';
import { Calendar } from 'lucide-react';
import { FadeIn } from '../ui';
import { motion, useInView } from 'framer-motion';

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
  const blockRef = useRef(null);

  // Trigger exactly when reaching middle of screen, but stay locked in as user scrolls down!
  const isInView = useInView(blockRef, { margin: "1000px 0px -50% 0px" });

  return (
    <div ref={blockRef} className={`relative flex flex-col md:flex-row items-stretch gap-10 md:gap-0 ${isEven ? 'md:flex-row-reverse' : ''} pt-8 md:pt-0`}>
      
      {/* Timeline Dot Wrapper */}
      <div 
        className="absolute left-[39.5px] top-1/2 md:left-1/2 md:top-1/2 pointer-events-none z-20 flex items-center justify-center -translate-x-1/2 -translate-y-1/2"
      >
        <motion.div 
          animate={{
            backgroundColor: isInView ? '#0284c7' : '#d1d5db',
            scale: isInView ? 1.2 : 1
          }}
          transition={{ duration: 0.3 }}
          className="w-5 h-5 rounded-full border-[3px] border-white shadow-sm z-30 flex items-center justify-center" 
        >
          {isInView && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.15 }}
              className="w-1.5 h-1.5 bg-white rounded-full"
            />
          )}
        </motion.div>
      </div>

      {/* Content Side */}
      <div className={`w-full md:w-1/2 flex flex-col justify-center pl-[80px] pr-4 md:px-0 z-10 ${isEven ? 'md:pl-20 md:pr-0' : 'md:pr-20 md:pl-0'}`}>
        <FadeIn delay={0.1} className="w-full">
          <div className="py-6">
            <span className={`text-4xl md:text-5xl font-display font-black mb-2 tracking-tight transition-colors duration-300 block ${isInView ? 'text-primary' : 'text-gray-300'}`}>
              {year}
            </span>
            <h3 className="text-2xl md:text-3xl font-display font-bold text-gray-900 mb-8 leading-tight">
              {title}
            </h3>
            
            <div className="space-y-4 text-gray-600">
              {events.map((ev, i) => (
                <div key={i} className="relative group">
                  <div className={`flex bg-gray-50/50 rounded-xl p-5 border flex-col transition-all duration-300 ${isInView ? 'border-primary/20 bg-white shadow-sm' : 'border-gray-100 group-hover:bg-white group-hover:border-primary/20'}`}>
                    <span className={`text-xs font-bold tracking-wider mb-2 block flex items-center gap-2 transition-colors duration-300 ${isInView ? 'text-primary' : 'text-gray-400 group-hover:text-primary'}`}>
                        <Calendar className="w-3.5 h-3.5" />
                        {ev.date}
                    </span>
                    <p className="text-[15px] leading-relaxed font-medium">
                      {ev.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>

      {/* Image Side */}
      <div className={`w-full md:w-1/2 flex items-center justify-center pl-[80px] pr-4 md:px-0 z-10 ${isEven ? 'md:pr-20 md:pl-0' : 'md:pl-20 md:pr-0'} mt-8 md:mt-0`}>
        <FadeIn delay={0.2} y={20} className="w-full">
          <div className={`relative group overflow-hidden rounded-[2rem] aspect-video bg-gray-100 border shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] transition-colors duration-300 ${isInView ? 'border-primary/20' : 'border-gray-100'}`}>
            <img 
              src={image} 
              alt={`Story from ${year}`} 
              className={`w-full h-full object-cover transform transition-transform duration-1000 ${isInView ? 'scale-105' : 'group-hover:scale-105'}`}
              referrerPolicy="no-referrer"
            />
          </div>
        </FadeIn>
      </div>
    </div>
  );
};
