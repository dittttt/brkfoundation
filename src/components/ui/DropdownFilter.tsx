import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Check } from 'lucide-react';
import { cn } from './index';

interface Option {
  value: string;
  label: string;
}

interface DropdownFilterProps {
  value: string;
  onChange: (value: string) => void;
  options: Option[];
  className?: string;
  buttonClassName?: string;
}

export function DropdownFilter({ value, onChange, options, className, buttonClassName }: DropdownFilterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOption = options.find((opt) => opt.value === value) || options[0];

  return (
    <div className={cn('relative', className)} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-xl text-sm font-medium hover:border-primary/50 transition-colors bg-white text-gray-700 w-full justify-between",
          buttonClassName
        )}
      >
        {selectedOption?.label}
        <ChevronDown size={16} className={cn('text-gray-400 transition-transform duration-200 shrink-0', isOpen && 'rotate-180')} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute left-0 right-0 top-full mt-2 w-full z-50 origin-top"
          >
            <div className="bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden py-2 w-full">
              {options.map((option) => (
                <button
                  key={option.value}
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                  }}
                  className={cn(
                    'w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors flex items-center justify-between',
                    value === option.value ? 'text-primary font-medium bg-primary/5' : 'text-gray-700'
                  )}
                >
                  {option.label}
                  {value === option.value && <Check size={16} className="text-primary" />}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}


