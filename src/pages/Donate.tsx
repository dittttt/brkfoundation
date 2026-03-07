import React from 'react';
import { MainLayout } from '../layouts/MainLayout';
import { Section, PageHeader, FadeIn, Input, TextArea, Button } from '../components/ui';
import { ContactInfo } from '../components/shared/ContactInfo';
import { ThankYouSection } from '../components/shared/ThankYouSection';
import { MapSection } from '../components/shared/MapSection';

export default function Donate() {
  return (
    <MainLayout>
      <PageHeader 
        title="Donation" 
        subtitle="We ask for your ongoing warm interest and passion."
        image="https://brkfoundation.org/theme/brk/img/s_back09.jpg"
      />

      <Section bg="white">
        <div className="grid md:grid-cols-2 gap-16">
          <FadeIn>
            <h2 className="text-4xl mb-8">Get in Touch</h2>
            <ContactInfo />
          </FadeIn>

          <FadeIn delay={0.2} className="bg-secondary p-8 md:p-12 rounded-3xl">
            <h3 className="text-2xl font-display font-bold mb-6">Donation</h3>
            <form className="space-y-4">
              <Input 
                type="text" 
                placeholder="Your Name" 
              />
              <Input 
                type="email" 
                placeholder="Email Address" 
              />
              <div className="grid grid-cols-2 gap-4">
                <Input 
                  type="tel" 
                  placeholder="Phone Number" 
                />
                <Input 
                  type="text" 
                  placeholder="Donation Amount" 
                />
              </div>
              <Input 
                type="text" 
                placeholder="Subject" 
              />
              <TextArea 
                rows={4} 
                placeholder="Message" 
              />
              <Button>
                Donate
              </Button>
            </form>
          </FadeIn>
        </div>
      </Section>

      <ThankYouSection />
      
      <MapSection />
    </MainLayout>
  );
}

