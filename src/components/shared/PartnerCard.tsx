import React from 'react';
import { FadeIn } from '../ui';

export interface PartnerCardProps {
  name: string;
  image: string;
  delay?: number;
}

export const PartnerCard: React.FC<PartnerCardProps> = ({ name, image, delay = 0 }) => {
  return (
    <FadeIn delay={delay} className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col items-center text-center border border-gray-100">
      <div className="h-32 w-full flex items-center justify-center mb-6 bg-gray-50 rounded-2xl p-4 group-hover:bg-primary/5 transition-colors">
        <img 
          src={image} 
          alt={name} 
          className="max-h-full w-auto object-contain transition-all duration-500 transform group-hover:scale-110" 
          referrerPolicy="no-referrer" 
        />
      </div>
      <h3 className="text-2xl font-display font-bold text-dark">{name}</h3>
    </FadeIn>
  );
};
