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
    <div className="relative h-[calc(100vh-6rem)] min-h-[600px] flex items-center justify-center overflow-hidden bg-gray-900">
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
      <div className="relative z-20 text-center px-6 max-w-screen-2xl mx-auto mt-16">
        <FadeIn>
          <div className="inline-flex items-center gap-2 py-2 px-6 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-bold tracking-wider uppercase mb-8 shadow-xl">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            Non-Profit Organization
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl 2xl:text-9xl font-display font-black text-white mb-8 leading-[0.9] tracking-tight uppercase drop-shadow-2xl">
            Make Laughter <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Last Forever</span>
          </h1>
          
          <p className="text-base md:text-xl 2xl:text-2xl text-gray-200 max-w-4xl mx-auto mb-12 font-medium leading-relaxed drop-shadow-lg">
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

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 animate-bounce text-white/50">
        <div className="w-6 h-10 rounded-full border-2 border-white/30 flex justify-center pt-2">
          <div className="w-1 h-2 bg-white rounded-full" />
        </div>
      </div>
    </div>
  );
};
