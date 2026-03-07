import React from 'react';
import { MainLayout } from '../layouts/MainLayout';
import { Section, PageHeader, FadeIn } from '../components/ui';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export default function Contact() {
  return (
    <MainLayout>
      <PageHeader 
        title="Contact Us" 
        subtitle="We ask for your ongoing warm interest and passion."
        image="https://brkfoundation.org/theme/brk/img/s_back09.jpg"
      />

      <Section bg="white">
        <div className="grid md:grid-cols-2 gap-16">
          <FadeIn>
            <h2 className="text-4xl mb-8">Get in Touch</h2>
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
          </FadeIn>

          <FadeIn delay={0.2} className="bg-secondary p-8 md:p-12 rounded-3xl">
            <h3 className="text-2xl font-display font-bold mb-6">Send us a Message</h3>
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input 
                  type="text" 
                  placeholder="First Name" 
                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-colors"
                />
                <input 
                  type="text" 
                  placeholder="Last Name" 
                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-colors"
                />
              </div>
              <input 
                type="email" 
                placeholder="Email Address" 
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-colors"
              />
              <textarea 
                rows={4} 
                placeholder="Your Message" 
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none resize-none transition-colors"
              />
              <button className="w-full bg-primary text-white font-medium py-4 rounded-xl hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20">
                Send Message
              </button>
            </form>
          </FadeIn>
        </div>
      </Section>

      {/* Thank You Section */}
      <div className="relative h-[400px] bg-fixed bg-center bg-cover" style={{ backgroundImage: "url('https://brkfoundation.org/theme/brk/img/feeding06.jpg')" }}>
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <div className="text-center text-white p-8">
             <h2 className="text-5xl font-display font-black mb-4">Thank You!</h2>
             <p className="text-xl opacity-90">For making a difference in the lives of many.</p>
          </div>
        </div>
      </div>
      
      {/* Map Section */}
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
    </MainLayout>
  );
}
