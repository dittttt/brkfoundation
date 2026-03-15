import React from 'react';
import { Link } from 'react-router-dom';
import { FadeIn } from '../ui';

interface NewsItem {
  title: string;
  date: string;
  image: string;
  desc: string;
  slug?: string;
}

export interface NewsCardProps {
  item: NewsItem;
  delay?: number;
}

export const NewsCard: React.FC<NewsCardProps> = ({ item, delay = 0 }) => {     
  return (
    <FadeIn delay={delay}>
      <Link to={item.slug ? `/news/${item.slug}` : "#"} className="group cursor-pointer bg-white rounded-2xl md:rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 h-full flex flex-col">
        <div className="relative overflow-hidden aspect-[16/10]">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            referrerPolicy="no-referrer"
          />
          <div className="absolute top-2 left-2 sm:top-4 sm:left-4 bg-white/90 backdrop-blur-sm text-dark px-2 py-1 sm:px-4 sm:py-2 rounded-md sm:rounded-lg text-[10px] sm:text-xs font-black uppercase tracking-wide shadow-sm">
            News
          </div>
        </div>
        <div className="p-4 sm:p-6 md:p-8 flex flex-col flex-grow">
          <div className="text-primary text-[10px] sm:text-sm font-bold mb-2 sm:mb-3 uppercase tracking-wide">{item.date}</div>
          <h3 className="text-lg sm:text-xl md:text-2xl font-display font-black text-dark group-hover:text-primary transition-colors leading-tight mb-2 sm:mb-4 line-clamp-3">{item.title}</h3>
          <p className="text-xs sm:text-sm md:text-base text-gray-600 font-medium leading-relaxed mb-4 sm:mb-6 flex-grow line-clamp-3">{item.desc}</p>
          <div className="flex items-center text-primary font-bold text-xs sm:text-sm uppercase tracking-wider group/link">
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
