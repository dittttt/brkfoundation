import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { Section, FadeIn } from '../ui';

export const IntroSection = () => {
  return (
    <Section className="relative overflow-hidden py-32 bg-white">
      <div className="grid md:grid-cols-2 gap-16 items-center max-w-screen-2xl mx-auto">
        {/* Image Side */}
        <FadeIn delay={0.1} className="relative">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3] group">
            <img 
              src="https://brkfoundation.org/theme/brk/img/h_back05.jpg" 
              alt="Community Support" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-dark/10 group-hover:bg-transparent transition-colors duration-500" />
          </div>
          {/* Floating Badge */}
          <div className="absolute -bottom-6 -right-6 bg-white py-4 px-6 rounded-2xl shadow-2xl hidden md:flex items-center gap-4 animate-float border border-gray-100/50">
            <div className="p-2.5 bg-green-50 rounded-full text-green-600 shadow-sm">
              <CheckCircle size={24} strokeWidth={2.5} />
            </div>
            <div>
              <span className="block font-black text-dark text-base leading-none mb-1">Verified Impact</span>
              <span className="block text-xs text-gray-400 font-bold uppercase tracking-wider">Since 2018</span>
            </div>
          </div>
        </FadeIn>

        {/* Text Side */}
        <FadeIn delay={0.3}>
          <h2 className="text-4xl md:text-5xl lg:text-6xl 2xl:text-7xl font-black text-dark uppercase tracking-tight mb-8 leading-[0.95]">
            A World We Can <br/>
            <span className="text-primary">Build Together</span>
          </h2>
          
          <div className="space-y-6 text-base 2xl:text-lg text-gray-600 font-medium leading-relaxed">
            <p>
              Sharing what we have with those in need can be a challenging task. However, at <strong className="text-dark">BRK Foundation</strong>, we are devoted to making a positive impact on the world by supporting those who are most marginalized.
            </p>
            <p>
              We began with providing warm meals to children who represent a brighter future and are now expanding our reach across the globe. Our goal is to transcend borders, race, and religion to create lasting change.
            </p>
          </div>

          <div className="mt-10">
            <Link to="/about" className="inline-flex items-center gap-3 text-dark font-bold text-lg group border-b-2 border-primary pb-1 hover:text-primary transition-colors">
              Read our full story 
              <ArrowRight size={24} className="text-primary group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
        </FadeIn>
      </div>
    </Section>
  );
};
