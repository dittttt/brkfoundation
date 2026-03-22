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
    <FadeIn delay={delay} className="group cursor-pointer">
      <Link to={item.slug ? `/gallery/${item.slug}` : "/demoboard"} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 h-full flex flex-col">
        <div className="relative overflow-hidden aspect-[16/10]">
          <img 
            src={item.image} 
            alt={item.title} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <div className="bg-white/20 backdrop-blur-md p-3 rounded-full text-white">
              <Search size={20} />
            </div>
          </div>
        </div>
        <div className="p-4 sm:p-6 md:p-8 flex flex-col flex-grow">
          <div className="text-primary text-[10px] sm:text-sm font-bold mb-2 sm:mb-3 uppercase tracking-wide">
            {item.date}
          </div>
          <h3 className="text-lg sm:text-xl md:text-2xl font-display font-black text-dark group-hover:text-primary transition-colors leading-tight line-clamp-3">
            {item.title}
          </h3>
        </div>
      </Link>
    </FadeIn>
  );
};
