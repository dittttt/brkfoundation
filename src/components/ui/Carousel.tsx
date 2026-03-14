import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';

interface CarouselProps {
  slides: {
    image: string;
    content?: React.ReactNode;
  }[];
  autoPlayInterval?: number;
  className?: string;
  showArrows?: boolean;
  showIndicators?: boolean;
}

export const Carousel = ({ 
  slides, 
  autoPlayInterval = 5000, 
  className,
  showArrows = true,
  showIndicators = true
}: CarouselProps) => {
  const [[page, direction], setPage] = useState([0, 0]);

  // Derive current slide index robustly (handles negative numbers)
  const currentIndex = ((page % slides.length) + slides.length) % slides.length;

  const nextSlide = useCallback(() => {
    setPage([page + 1, 1]);
  }, [page]);

  const prevSlide = useCallback(() => {
    setPage([page - 1, -1]);
  }, [page]);

  useEffect(() => {
    if (!autoPlayInterval) return;
    const timer = setInterval(nextSlide, autoPlayInterval);
    return () => clearInterval(timer);
  }, [autoPlayInterval, nextSlide]);

  const handleIndicatorClick = (idx: number) => {
    const diff = idx - currentIndex;
    if (diff === 0) return;
    
    // Instead of simply jumping, we increment/decrement the page by the difference
    // to ensure the index aligns and we get a completely fresh key from Framer Motion.
    setPage([page + diff, diff > 0 ? 1 : -1]);
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
    }),
    center: {
      zIndex: 1,
      x: 0,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? '100%' : '-100%',
    })
  };

  return (
    <div className={clsx("relative overflow-hidden group", className)}>
      <AnimatePresence initial={false} custom={direction} mode="popLayout">
        <motion.div
          key={page}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "tween", ease: [0.25, 1, 0.5, 1], duration: 1.5 },
          }}
          className="absolute inset-0 w-full h-full"
        >
          <img 
            src={slides[currentIndex].image} 
            alt={`Slide ${currentIndex + 1}`} 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          {slides[currentIndex].content && (
            <div className="absolute inset-0 flex items-center justify-center">
              {slides[currentIndex].content}
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Arrows */}
      {showArrows && (
        <>
          <button
            onClick={prevSlide}
            className="hidden md:block absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 p-2 md:p-3 rounded-full bg-white/40 backdrop-blur-md text-white hover:bg-white/60 transition-all"
          >
            <ChevronLeft className="w-5 h-5 md:w-7 md:h-7" />
          </button>
          <button
            onClick={nextSlide}
            className="hidden md:block absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 p-2 md:p-3 rounded-full bg-white/40 backdrop-blur-md text-white hover:bg-white/60 transition-all"
          >
            <ChevronRight className="w-5 h-5 md:w-7 md:h-7" />
          </button>
        </>
      )}
      {/* Indicators and Mobile Arrows */}
      {(showIndicators || showArrows) && (
        <div className="absolute flex bottom-[230px] md:bottom-[200px] left-1/2 -translate-x-1/2 z-[60] gap-2 md:gap-3 items-center pointer-events-auto">
          {showArrows && (
            <button
              onClick={prevSlide}
              className="md:hidden p-1.5 flex items-center justify-center rounded-full bg-white/20 text-white hover:bg-white/40 transition-all mr-1"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          )}

          {showIndicators && slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => handleIndicatorClick(idx)}
              className={clsx(
                "h-1.5 transition-all duration-300 rounded-full",
                idx === currentIndex ? "bg-white w-8 md:w-12" : "bg-white/30 w-4 md:w-8 hover:bg-white/50"
              )}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}

          {showArrows && (
            <button
              onClick={nextSlide}
              className="md:hidden p-1.5 flex items-center justify-center rounded-full bg-white/20 text-white hover:bg-white/40 transition-all ml-1"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          )}

          {showIndicators && (
            <div className="ml-2 md:ml-4 pl-2 md:pl-3 border-l border-white/30 flex items-center gap-1 text-white/60 text-xs font-bold">
              <svg className="w-4 h-5 hidden md:block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v14m0 0l-7-7m7 7l7-7" />
              </svg>
              <span>Scroll</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
