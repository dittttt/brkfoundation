import React from 'react';
import { Quote } from 'lucide-react';
import { FadeIn } from '../ui';

export interface ProfileCardProps {
  name: string;
  role: string;
  quote: string;
  image: string;
  delay?: number;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({ name, role, quote, image, delay = 0 }) => {
  return (
    <FadeIn delay={delay} className="relative group">
      <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 transition-transform duration-500 hover:-translate-y-2 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10 text-primary">
          <Quote size={64} />
        </div>
        <div className="flex items-center gap-6 relative z-10">
          <div className="w-24 h-24 rounded-2xl overflow-hidden shadow-lg border-2 border-white ring-2 ring-gray-100">
            <img src={image} alt={name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          </div>
          <div>
            <h3 className="text-2xl font-display font-bold text-dark">{name}</h3>
            <p className="text-primary font-bold text-sm uppercase tracking-widest mb-2">{role}</p>
            <p className="text-gray-500 italic text-sm">"{quote}"</p>
          </div>
        </div>
      </div>
    </FadeIn>
  );
};
