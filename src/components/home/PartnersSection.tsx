import React from 'react';
import { Section, FadeIn } from '../ui';

export const PartnersSection = () => {
  return (
    <Section bg="white" className="py-12 md:py-20">
      <FadeIn className="text-center mb-8 md:mb-12">
        <h2 className="text-3xl md:text-4xl font-black text-dark uppercase tracking-tight">Our Partners</h2>
      </FadeIn>
      <div className="flex flex-wrap justify-center items-center gap-12 md:gap-16">
        <FadeIn delay={0.1} className="flex flex-col items-center gap-4 group cursor-pointer">
          <img 
            src="https://brkfoundation.org/theme/brk/img/partner01.png" 
            alt="Tatay Pho" 
            className="h-20 md:h-24 w-auto object-contain transition-all duration-300 group-hover:scale-110 group-hover:-translate-y-2" 
            referrerPolicy="no-referrer"
          />
          <span className="font-bold text-dark group-hover:text-primary transition-colors">Tatay Pho</span>
        </FadeIn>
        <FadeIn delay={0.2} className="flex flex-col items-center gap-4 group cursor-pointer">
          <img 
            src="https://brkfoundation.org/theme/brk/img/partner02.png" 
            alt="Cpass" 
            className="h-20 md:h-24 w-auto object-contain transition-all duration-300 group-hover:scale-110 group-hover:-translate-y-2" 
            referrerPolicy="no-referrer"
          />
          <span className="font-bold text-dark group-hover:text-primary transition-colors">Cpass</span>
        </FadeIn>
      </div>
    </Section>
  );
};
