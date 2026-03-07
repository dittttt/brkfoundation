import React from 'react';
import { Section } from '../ui';

export const PartnersSection = () => {
  return (
    <Section bg="white">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-black text-dark uppercase tracking-tight">Our Partners</h2>
      </div>
      <div className="flex flex-wrap justify-center items-center gap-16">
        <div className="flex flex-col items-center gap-4 group cursor-pointer">
          <img 
            src="https://brkfoundation.org/theme/brk/img/partner01.png" 
            alt="Tatay Pho" 
            className="h-24 w-auto object-contain transition-all duration-300 group-hover:scale-110 group-hover:-translate-y-2" 
            referrerPolicy="no-referrer"
          />
          <span className="font-bold text-dark group-hover:text-primary transition-colors">Tatay Pho</span>
        </div>
        <div className="flex flex-col items-center gap-4 group cursor-pointer">
          <img 
            src="https://brkfoundation.org/theme/brk/img/partner02.png" 
            alt="Cpass" 
            className="h-24 w-auto object-contain transition-all duration-300 group-hover:scale-110 group-hover:-translate-y-2" 
            referrerPolicy="no-referrer"
          />
          <span className="font-bold text-dark group-hover:text-primary transition-colors">Cpass</span>
        </div>
      </div>
    </Section>
  );
};
