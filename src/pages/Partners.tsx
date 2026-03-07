import React from 'react';
import { MainLayout } from '../layouts/MainLayout';
import { Section, PageHeader, FadeIn } from '../components/ui';

export default function Partners() {
  return (
    <MainLayout>
      <PageHeader 
        title="Our Partners" 
        subtitle="We'd like to recognize our major sponsors for taking their time and resources."
        image="https://brkfoundation.org/theme/brk/img/s_back05.jpg"
      />

      {/* Partners Grid */}
      <Section bg="white">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { name: "Tatay Pho Vietnamese Rice Noodles", image: "https://brkfoundation.org/theme/brk/img/partner01.png" },
              { name: "Cpass Inc.", image: "https://brkfoundation.org/theme/brk/img/partner02.png" }
            ].map((partner, idx) => (
              <FadeIn key={idx} delay={idx * 0.1} className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col items-center text-center border border-gray-100">
                <div className="h-32 w-full flex items-center justify-center mb-6 bg-gray-50 rounded-2xl p-4 group-hover:bg-primary/5 transition-colors">
                  <img 
                    src={partner.image} 
                    alt={partner.name} 
                    className="max-h-full w-auto object-contain transition-all duration-500 transform group-hover:scale-110" 
                    referrerPolicy="no-referrer" 
                  />
                </div>
                <h3 className="text-2xl font-display font-bold text-dark">{partner.name}</h3>
              </FadeIn>
            ))}
          </div>
        </div>
      </Section>

      {/* CTA Section */}
      <Section className="bg-gray-50 text-center py-24">
        <FadeIn>
          <h2 className="text-4xl md:text-5xl font-display font-black uppercase tracking-tight mb-6 text-dark">
            Become a Partner
          </h2>
          <p className="text-gray-600 text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Join us in our mission to create a better world. We are always looking for organizations and individuals who share our vision.
          </p>
          <button className="bg-primary text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-dark transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
            Partner With Us
          </button>
        </FadeIn>
      </Section>
    </MainLayout>
  );
}
