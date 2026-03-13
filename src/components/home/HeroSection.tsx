import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { FadeIn } from '../ui';
import { Carousel } from '../ui/Carousel';

const HERO_SLIDES = [
  { image: "https://brkfoundation.org/theme/brk/img/h_back01.jpg" },
  { image: "https://brkfoundation.org/theme/brk/img/h_back02.jpg" },
  { image: "https://brkfoundation.org/theme/brk/img/h_back03.jpg" },
  { image: "https://brkfoundation.org/theme/brk/img/h_back04.jpg" }
];

export const HeroSection = () => {
  return (
    <div className="relative h-[90vh] min-h-[700px] md:min-h-[850px] flex items-center justify-center overflow-hidden bg-gray-900 pb-16">
      {/* Background Carousel */}
      <div className="absolute inset-0 z-0">
        <Carousel 
          slides={HERO_SLIDES} 
          className="w-full h-full"
          showArrows={true}
          showIndicators={true}
          autoPlayInterval={6000}
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80 z-10" />
      </div>
      
      {/* Hero Content */}
      <div className="relative z-20 w-full max-w-screen-2xl mx-auto px-6 -mt-16 md:-mt-24">
        <FadeIn className="text-center max-w-4xl mx-auto flex flex-col items-center">
          <div className="inline-flex items-center gap-2 py-2 px-6 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-bold tracking-wider uppercase mb-8 shadow-xl">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            Non-Profit Organization
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl 2xl:text-9xl font-display font-black text-white mb-8 leading-[1.0] tracking-tight uppercase drop-shadow-2xl">
            Make Laughter <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Last Forever</span>
          </h1>
          
          <p className="text-base md:text-xl 2xl:text-2xl text-gray-200 mb-12 font-medium leading-relaxed drop-shadow-lg max-w-3xl">
            Your love and sharing can help children grow their hopes and dreams. 
            Even a small donation can save a neighbor and give hope for the future.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/donate" className="bg-primary text-white px-8 py-4 rounded-lg text-lg font-bold hover:bg-primary/90 transition-colors shadow-lg w-full sm:w-auto flex items-center justify-center gap-2 uppercase tracking-wide">
              Donate Now
            </Link>
            <Link to="/about" className="bg-white text-dark px-8 py-4 rounded-lg text-lg font-bold hover:bg-gray-100 transition-colors shadow-lg w-full sm:w-auto flex items-center justify-center gap-2 uppercase tracking-wide">
              Learn More
              <ArrowRight size={20} />
            </Link>
          </div>
        </FadeIn>
      </div>

      {/* Curved Bottom Wave */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-20 pointer-events-none translate-y-[1px]">
        <svg viewBox="0 0 1440 120" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-[50px] md:h-[120px] text-white fill-current">
          <path d="M0,0 C320,120 1120,120 1440,0 L1440,120 L0,120 Z"></path>
        </svg>
      </div>
    </div>
  );
};
