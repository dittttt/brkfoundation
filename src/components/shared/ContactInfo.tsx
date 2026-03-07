import React from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export const ContactInfo = () => {
  return (
    <div className="space-y-8">
      <div className="flex gap-4">
        <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center text-primary flex-shrink-0">
          <MapPin size={24} />
        </div>
        <div>
          <h3 className="font-display font-bold text-xl mb-2">Visit Us</h3>
          <p className="text-dark/70">
            #53 Mango Village A.S.Fortuna Banilad,<br/>
            Mandaue City, Cebu, Philippines
          </p>
        </div>
      </div>

      <div className="flex gap-4">
        <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center text-primary flex-shrink-0">
          <Phone size={24} />
        </div>
        <div>
          <h3 className="font-display font-bold text-xl mb-2">Call Us</h3>
          <p className="text-dark/70">
            Landline: (032) 236 6803<br/>
            Mobile: 0917-830-2330
          </p>
        </div>
      </div>

      <div className="flex gap-4">
        <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center text-primary flex-shrink-0">
          <Mail size={24} />
        </div>
        <div>
          <h3 className="font-display font-bold text-xl mb-2">Email Us</h3>
          <p className="text-dark/70">
            brkfoundation.ph@gmail.com
          </p>
        </div>
      </div>

      <div className="flex gap-4">
        <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center text-primary flex-shrink-0">
          <Clock size={24} />
        </div>
        <div>
          <h3 className="font-display font-bold text-xl mb-2">Business Hours</h3>
          <p className="text-dark/70">
            09:00 AM - 05:00 PM
          </p>
        </div>
      </div>
    </div>
  );
};
