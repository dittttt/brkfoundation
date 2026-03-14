import React from 'react';
import { motion } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export * from './ActivitySlider';
export * from './Carousel';
export * from './Counter';

export const Section = ({ 
  children, 
  className, 
  bg = 'transparent',
  id
}: { 
  children: React.ReactNode; 
  className?: string; 
  bg?: 'white' | 'secondary' | 'dark' | 'transparent';
  id?: string;
}) => {
  const bgColors = {
    white: 'bg-white',
    secondary: 'bg-secondary',
    dark: 'bg-dark text-secondary',
    transparent: ''
  };

  return (
    <section id={id} className={cn("py-12 md:py-20 px-4 md:px-6", bgColors[bg], className)}>
      <div className="max-w-7xl mx-auto">
        {children}
      </div>
    </section>
  );
};

export const FadeIn: React.FC<{ children: React.ReactNode; delay?: number; className?: string; viewport?: any }> = ({ children, delay = 0, className, viewport }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewport || { once: true, margin: "0px 0px 0px 0px" }}
      transition={{ duration: 0.8, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const PageHeader = ({ title, subtitle, image }: { title: string; subtitle?: string; image?: string }) => {
  return (
    <div className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden bg-dark">
      {image && (
        <div className="absolute inset-0 z-0">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover opacity-60" 
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/50 to-transparent" />
        </div>
      )}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto mt-10">
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-6xl md:text-8xl font-display font-black text-white mb-6 uppercase tracking-tight"
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-white/90 font-medium max-w-3xl mx-auto leading-relaxed"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </div>
  );
};

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(({ className, ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={cn(
        "w-full bg-white border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-colors",
        className
      )}
      {...props}
    />
  );
});
Input.displayName = "Input";

export const TextArea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(({ className, ...props }, ref) => {
  return (
    <textarea
      ref={ref}
      className={cn(
        "w-full bg-white border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none resize-none transition-colors",
        className
      )}
      {...props}
    />
  );
});
TextArea.displayName = "TextArea";

export const Button = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(({ className, children, ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={cn(
        "w-full bg-primary text-white font-medium py-4 rounded-xl hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
});
Button.displayName = "Button";
