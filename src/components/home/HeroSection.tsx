import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FadeIn } from '../ui';
import { Carousel } from '../ui/Carousel';

const HERO_SLIDES = [
  { image: "https://brkfoundation.org/theme/brk/img/h_back01.jpg" },
  { image: "https://brkfoundation.org/theme/brk/img/h_back02.jpg" },
  { image: "https://brkfoundation.org/theme/brk/img/h_back03.jpg" },
  { image: "https://brkfoundation.org/theme/brk/img/h_back04.jpg" }
];

export const HeroSection = () => {
  const { scrollY } = useScroll();
  // Animates the wave path from a completely flat line (no curve, zero visual height) 
  // to a full rich curve. This guarantees ZERO white space at scroll 0!
  const wavePath = useTransform(
    scrollY, 
    [0, 400], 
    [
      "M0,200 C320,200 1120,200 1440,200 L1440,200 L0,200 Z", 
      "M0,0 C320,200 1120,200 1440,0 L1440,200 L0,200 Z"
    ]
  );

  return (
    <div className="relative h-[calc(100svh-6rem)] min-h-[600px] flex items-center justify-center overflow-hidden bg-gray-900">
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
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80 z-10 pointer-events-none" />
      </div>
      
      {/* Hero Content */}
      <div className="relative z-20 w-full max-w-screen-2xl mx-auto px-4 sm:px-6 -mt-44 md:-mt-40">
        <FadeIn className="text-center max-w-[1200px] mx-auto flex flex-col items-center">
          <div className="inline-flex items-center gap-2 sm:gap-3 py-1 sm:py-1.5 px-4 sm:px-6 rounded-full bg-white/5 backdrop-blur-md border border-white/20 text-white text-[10px] sm:text-xs font-bold tracking-[0.1em] sm:tracking-[0.15em] uppercase mb-4 sm:mb-8 shadow-xl">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            Non-Profit Organization
          </div>
          
          <h1 className="text-[12vw] sm:text-[4.5rem] md:text-[6rem] lg:text-[8rem] xl:text-[9.5rem] font-display font-black text-white mb-3 sm:mb-6 leading-[0.85] tracking-tight uppercase drop-shadow-2xl flex flex-col items-center whitespace-nowrap">
            <span>Make Laughter</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-[#a7c4bc] to-amber-300">Last Forever</span>
          </h1>
          
          <p className="text-[11px] leading-[1.6] sm:text-base md:text-xl lg:text-[22px] text-gray-100 mb-6 sm:mb-12 font-medium sm:leading-relaxed drop-shadow-lg max-w-3xl px-4 text-center">
            Your love and sharing can help children grow their hopes and dreams. Even a small donation can save a neighbor and give hope for the future.
          </p>
          
          <div className="flex flex-row gap-3 sm:gap-4 justify-center items-center w-full px-4 sm:px-0 max-w-[320px] sm:max-w-none mx-auto relative z-50">
            <Link to="/donate" className="bg-[#00a8e8] text-white px-3 py-3 sm:px-8 sm:py-3.5 rounded text-[11px] sm:text-base font-bold hover:bg-[#00a8e8]/90 transition-colors shadow-lg flex-1 sm:flex-none flex items-center justify-center uppercase tracking-wider relative z-50 pointer-events-auto">
              Donate Now
            </Link>
            <Link to="/about" className="bg-white text-dark px-3 py-3 sm:px-8 sm:py-3.5 rounded text-[11px] sm:text-base font-bold hover:bg-gray-100 transition-colors shadow-lg flex-1 sm:flex-none flex items-center justify-center gap-1.5 sm:gap-2 uppercase tracking-wider relative z-50 pointer-events-auto">
              Learn More
              <ArrowRight className="w-3.5 h-3.5 sm:w-[18px] sm:h-[18px]" />
            </Link>
          </div>
        </FadeIn>
      </div>

      {/* Curved Bottom Wave */}
      <div 
        className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-20 pointer-events-none origin-bottom"
      >
        <svg viewBox="0 0 1440 200" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-[60px] md:h-[120px] text-white fill-current">
          <motion.path d={wavePath}></motion.path>
        </svg>
      </div>
    </div>
  );
};
