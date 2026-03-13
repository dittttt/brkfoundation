import React from 'react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="bg-dark text-white py-16">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="flex flex-row md:flex-col items-center md:items-start gap-4 md:gap-0 md:space-y-6">
          <div className="shrink-0">
            <img 
              src="https://brkfoundation.org/theme/brk/img/top_logo.png" 
              alt="BRK Foundation" 
              className="h-12 md:h-14 w-auto object-contain brightness-0 invert opacity-90"
              referrerPolicy="no-referrer"
            />
          </div>
          <p className="text-gray-400 text-sm leading-relaxed font-medium text-left">
            A society that dreams of love and sharing, where no one is excluded.
          </p>
        </div>

        <div>
          <h4 className="font-display text-lg font-bold mb-6 text-white">Quick Links</h4>
          <ul className="space-y-3 text-sm font-medium text-gray-400">
            <li><Link to="/about" className="hover:text-primary transition-colors">About Us</Link></li>
            <li><Link to="/story" className="hover:text-primary transition-colors">Our Story</Link></li>
            <li><Link to="/programs" className="hover:text-primary transition-colors">What We Do</Link></li>
            <li><Link to="/partners" className="hover:text-primary transition-colors">Partners</Link></li>
            <li><Link to="/updates" className="hover:text-primary transition-colors">Updates</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-lg font-bold mb-6 text-white">Contact</h4>
          <ul className="space-y-3 text-sm font-medium text-gray-400">
            <li>#53 Mango Village A.S.Fortuna Banilad</li>
            <li>Mandaue City, Cebu, Philippines</li>
            <li>Landline: (032) 236 6803</li>
            <li>Mobile: 0917-830-2330</li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-lg font-bold mb-6 text-white">Newsletter</h4>
          <p className="text-gray-400 text-sm mb-4 font-medium">Subscribe to get updates on our latest projects.</p>
          <div className="flex gap-2">
            <input 
              type="email" 
              placeholder="Your email" 
              className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm w-full focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
            />
            <button className="bg-primary text-white px-6 py-2 rounded-lg text-sm font-bold hover:bg-primary/90 transition-colors">
              Join
            </button>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-white/10 text-center text-xs font-medium text-gray-500">
        © 2023 BRK Foundation. All rights reserved.
      </div>
    </footer>
  );
};
