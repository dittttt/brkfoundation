import React from 'react';

export const ThankYouSection = () => {
  return (
    <div className="relative h-[400px] bg-fixed bg-center bg-cover" style={{ backgroundImage: "url('https://brkfoundation.org/theme/brk/img/feeding06.jpg')" }}>
      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
        <div className="text-center text-white p-8">
           <h2 className="text-5xl font-display font-black mb-4">Thank You!</h2>
           <p className="text-xl opacity-90">For making a difference in the lives of many.</p>
        </div>
      </div>
    </div>
  );
};
