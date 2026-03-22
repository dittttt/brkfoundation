import React from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import { FadeIn } from '../ui';

interface GalleryItem {
  title: string;
  date: string;
  image: string;
  slug?: string;
}

export interface GalleryCardProps {
  item: GalleryItem;
  delay?: number;
}

export const GalleryCard: React.FC<GalleryCardProps> = ({ item, delay = 0 }) => {
  return (
    <FadeIn delay={delay} className="group cursor-pointer h-full">
      <Link to={item.slug ? `/gallery/${item.slug}` : "/demoboard"} className="bg-white rounded-2xl md:rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 h-full flex flex-col">
        <div className="relative overflow-hidden aspect-[16/10]">
          <img 
            src={item.image} 
            alt={item.title} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            referrerPolicy="no-referrer"
          />
          <div className="absolute top-2 left-2 sm:top-4 sm:left-4 bg-white/90 backdrop-blur-sm text-dark px-2 py-1 sm:px-4 sm:py-2 rounded-md sm:rounded-lg text-[10px] sm:text-xs font-black uppercase tracking-wide shadow-sm">
            Gallery
          </div>
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
            <div className="bg-white/20 backdrop-blur-md p-3 rounded-full text-white">
              <Search size={20} />
            </div>
          </div>
        </div>
        <div className="p-4 sm:p-6 md:p-8 flex flex-col flex-grow">
          <div className="text-primary text-[10px] sm:text-sm font-bold mb-2 sm:mb-3 uppercase tracking-wide">
            {item.date}
          </div>
          <h3 className="text-lg sm:text-xl md:text-2xl font-display font-black text-dark group-hover:text-primary transition-colors leading-tight mb-4 flex-grow line-clamp-3">
            {item.title}
          </h3>
          <div className="flex items-center text-primary font-bold text-xs sm:text-sm uppercase tracking-wider group/link mt-auto">
            Read More
            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 ml-1.5 sm:ml-2 transform group-hover/link:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        </div>
      </Link>
    </FadeIn>
  );
};
