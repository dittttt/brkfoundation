import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';

const NavLink = ({ to, children, mobile = false, onClick }: { to: string; children: React.ReactNode; mobile?: boolean; onClick?: () => void }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      onClick={onClick}
      className={clsx(
        "relative transition-colors duration-200",
        mobile ? "block text-xl py-2 font-medium" : "text-base font-bold uppercase tracking-wide hover:text-primary",
        isActive ? "text-primary" : "text-dark"
      )}
    >
      {children}
    </Link>
  );
};

const Dropdown = ({ title, items, mobile = false, onClose }: { title: string, items: { label: string, to: string }[], mobile?: boolean, onClose?: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  if (mobile) {
    return (
      <div className="w-full">
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-between w-full text-xl py-2 font-medium text-dark"
        >
          {title}
          <ChevronDown size={20} className={clsx("transition-transform", isOpen && "rotate-180")} />
        </button>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden pl-4 border-l-2 border-gray-100 ml-2"
            >
              {items.map((item, idx) => (
                <Link
                  key={idx}
                  to={item.to}
                  onClick={onClose}
                  className={clsx(
                    "block py-2.5 text-lg text-gray-600 hover:text-primary",
                    location.pathname === item.to && "text-primary font-medium"
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div 
      className="relative group h-full flex items-center"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button 
        onClick={(e) => {
          // Allow toggle on touch devices
          e.preventDefault();
          setIsOpen(!isOpen);
        }}
        className={clsx(
          "flex items-center gap-1 text-base font-bold uppercase tracking-wide transition-colors py-2",
          isOpen ? "text-primary" : "text-dark hover:text-primary"
        )}
      >
        {title}
        <ChevronDown size={16} className={clsx("transition-transform duration-200", isOpen && "rotate-180")} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute top-full left-0 pt-2 w-60 z-50 origin-top-left"
          >
            <div className="bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden py-2">
              {items.map((item, idx) => (
                <Link
                  key={idx}
                  to={item.to}
                  className={clsx(
                    "block px-6 py-3.5 text-base font-bold uppercase tracking-wide transition-all hover:pl-8",
                    location.pathname === item.to 
                      ? "text-primary bg-primary/5 border-l-4 border-primary" 
                      : "text-gray-500 hover:text-primary hover:bg-gray-50 border-l-4 border-transparent"
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const Header = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  // Lock body scroll when mobile menu is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Stop Lenis smooth scroll when menu is open
      const lenisInstance = (window as any).__lenis;
      if (lenisInstance) lenisInstance.stop();
    } else {
      document.body.style.overflow = '';
      const lenisInstance = (window as any).__lenis;
      if (lenisInstance) lenisInstance.start();
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm relative">
        <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 z-50 group py-2 h-full">
            <img 
              src="https://brkfoundation.org/theme/brk/img/top_logo.png" 
              alt="BRK Foundation" 
              className="h-full w-auto object-contain max-h-[4.5rem]"
              referrerPolicy="no-referrer"
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-10 h-full">
            <NavLink to="/">Home</NavLink>
            
            <Dropdown 
              title="About Us" 
              items={[
                { label: "About Us", to: "/about" },
                { label: "Our Story", to: "/story" }
              ]} 
            />
            
            <Dropdown 
              title="What We Do" 
              items={[
                { label: "Feeding Program", to: "/programs" },
                { label: "Projects", to: "/projects" },
                { label: "Partners", to: "/partners" }
              ]} 
            />

            <NavLink to="/updates">Updates</NavLink>
            <NavLink to="/contact">Contact</NavLink>
            
            <Link 
              to="/donate" 
              className="bg-primary text-white px-7 py-3 rounded-md text-base font-bold uppercase tracking-wide hover:bg-primary/90 transition-colors flex items-center gap-2 shadow-sm"
            >
              <span>Donate</span>
            </Link>
          </nav>

          {/* Mobile Toggle */}
          <button
            className="md:hidden z-[60] p-2 text-dark flex items-center justify-center w-12 h-12 relative"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={28} strokeWidth={2.5} /> : <Menu size={28} strokeWidth={2.5} />}
          </button>
        </div>
      </header>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-white z-[45] flex flex-col pt-28 px-6 md:hidden overflow-y-auto"
          >
            <div className="flex flex-col gap-4">
              <NavLink to="/" mobile onClick={() => setIsOpen(false)}>Home</NavLink>
              
              <Dropdown 
                title="About Us" 
                mobile 
                onClose={() => setIsOpen(false)}
                items={[
                  { label: "About Us", to: "/about" },
                  { label: "Our Story", to: "/story" }
                ]} 
              />
              
              <Dropdown 
                title="What We Do" 
                mobile 
                onClose={() => setIsOpen(false)}
                items={[
                  { label: "Feeding Program", to: "/programs" },
                  { label: "Projects", to: "/projects" },
                  { label: "Partners", to: "/partners" }
                ]} 
              />

              <NavLink to="/updates" mobile onClick={() => setIsOpen(false)}>Updates</NavLink>
              <NavLink to="/contact" mobile onClick={() => setIsOpen(false)}>Contact</NavLink>
              
              <Link 
                to="/donate" 
                onClick={() => setIsOpen(false)}
                className="mt-6 bg-primary text-white px-8 py-4 rounded-lg font-bold text-lg flex items-center justify-center gap-2 shadow-md uppercase tracking-wide"
              >
                <span>Donate Now</span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
