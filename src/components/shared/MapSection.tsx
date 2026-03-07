import React from 'react';

export const MapSection = () => {
  return (
    <div className="w-full h-[600px] bg-gray-200">
      <iframe 
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3925.123456789!2d123.9123456!3d10.3345678!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTDCsDIwJzA0LjQiTiAxMjPCsDU0JzQ0LjQiRQ!5e0!3m2!1sen!2sph!4v1620000000000!5m2!1sen!2sph" 
        width="100%" 
        height="100%" 
        style={{ border: 0 }} 
        allowFullScreen 
        loading="lazy"
      ></iframe>
    </div>
  );
};
