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
      <Link to={item.slug ? `/news/${item.slug}` : "#"} className="group cursor-pointer bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 h-full flex flex-col">
        <div className="relative overflow-hidden aspect-[16/10]">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            referrerPolicy="no-referrer"
          />
          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-dark px-4 py-2 rounded-lg text-xs font-black uppercase tracking-wide shadow-sm">
            News
          </div>
        </div>
        <div className="p-8 flex flex-col flex-grow">
          <div className="text-primary text-sm font-bold mb-3 uppercase tracking-wide">{item.date}</div>
          <h3 className="text-2xl font-display font-black text-dark group-hover:text-primary transition-colors leading-tight mb-4">{item.title}</h3>
          <p className="text-gray-600 font-medium leading-relaxed mb-6 flex-grow">{item.desc}</p>
          <div className="flex items-center text-primary font-bold text-sm uppercase tracking-wider group/link">
            Read More
            <svg className="w-4 h-4 ml-2 transform group-hover/link:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        </div>
      </Link>
    </FadeIn>
  );
};
