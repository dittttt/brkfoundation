import React from 'react';
import { MainLayout } from '../layouts/MainLayout';
import { Section, PageHeader, FadeIn, Input, TextArea, Button } from '../components/ui';
import { ContactInfo } from '../components/shared/ContactInfo';
import { ThankYouSection } from '../components/shared/ThankYouSection';
import { MapSection } from '../components/shared/MapSection';

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
            <ContactInfo />
          </FadeIn>

          <FadeIn delay={0.2} className="bg-secondary p-8 md:p-12 rounded-3xl">
            <h3 className="text-2xl font-display font-bold mb-6">Send us a Message</h3>
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Input 
                  type="text" 
                  placeholder="First Name" 
                />
                <Input 
                  type="text" 
                  placeholder="Last Name" 
                />
              </div>
              <Input 
                type="email" 
                placeholder="Email Address" 
              />
              <TextArea 
                rows={4} 
                placeholder="Your Message" 
              />
              <Button>
                Send Message
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

