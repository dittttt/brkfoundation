import React from 'react';
import { MainLayout } from '../layouts/MainLayout';
import { Section, PageHeader, FadeIn } from '../components/ui';
import { PartnerCard } from '../components/shared/PartnerCard';

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
              <PartnerCard 
                key={idx}
                name={partner.name}
                image={partner.image}
                delay={idx * 0.1}
              />
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
