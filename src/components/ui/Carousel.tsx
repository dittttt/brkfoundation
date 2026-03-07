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
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    if (!autoPlayInterval) return;
    const timer = setInterval(nextSlide, autoPlayInterval);
    return () => clearInterval(timer);
  }, [autoPlayInterval, nextSlide, currentIndex]);

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
          key={currentIndex}
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
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-white/20 transition-all opacity-50 hover:opacity-100"
          >
            <ChevronLeft size={24} />
          </button>
          <button 
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-white/20 transition-all opacity-50 hover:opacity-100"
          >
            <ChevronRight size={24} />
          </button>
        </>
      )}

      {/* Indicators */}
      {showIndicators && (
        <div className="absolute bottom-28 left-1/2 -translate-x-1/2 z-20 flex gap-3">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setDirection(idx > currentIndex ? 1 : -1);
                setCurrentIndex(idx);
              }}
              className={clsx(
                "h-1.5 transition-all duration-300 rounded-full",
                idx === currentIndex ? "bg-white w-12" : "bg-white/30 w-8 hover:bg-white/50"
              )}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};
