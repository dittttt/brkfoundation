import React from 'react';
import { MainLayout } from '../layouts/MainLayout';
import { Section, PageHeader, FadeIn } from '../components/ui';
import { Shirt, Monitor, Droplets, Heart, Zap, Footprints } from 'lucide-react';

export default function Projects() {
  return (
    <MainLayout>
      <PageHeader 
        title="Our Projects" 
        subtitle="Initiatives that create lasting change in our communities."
        image="https://brkfoundation.org/theme/brk/img/s_back03.jpg"
      />

      {/* Basic Living Support Program */}
      <Section bg="white">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <FadeIn className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl group">
            <img 
              src="https://brkfoundation.org/theme/brk/img/projects01.jpg" 
              alt="Basic Living Support" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60" />
          </FadeIn>
          
          <FadeIn delay={0.2}>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                <Shirt size={24} />
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-black text-dark uppercase tracking-tight">
                Basic Living Support Program
              </h2>
            </div>
            
            <p className="text-lg text-gray-600 font-medium leading-relaxed mb-8">
              We provide basic living support and love to families and children struggling in poverty.
              We support basic living necessities such as clothing, shoes, and fans for people in need.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 text-center hover:shadow-lg transition-shadow">
                <div className="text-primary mb-2 flex justify-center"><Shirt size={28} /></div>
                <div className="text-3xl font-black text-dark mb-1">18,600</div>
                <div className="text-sm font-bold text-gray-500 uppercase tracking-wider">Clothes (PCS)</div>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 text-center hover:shadow-lg transition-shadow">
                <div className="text-primary mb-2 flex justify-center"><Footprints size={28} /></div>
                <div className="text-3xl font-black text-dark mb-1">38,400</div>
                <div className="text-sm font-bold text-gray-500 uppercase tracking-wider">Shoes (Pairs)</div>
              </div>

              <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 text-center hover:shadow-lg transition-shadow">
                <div className="text-primary mb-2 flex justify-center"><Zap size={28} /></div>
                <div className="text-3xl font-black text-dark mb-1">100</div>
                <div className="text-sm font-bold text-gray-500 uppercase tracking-wider">Electric Fan (Unit)</div>
              </div>
            </div>
          </FadeIn>
        </div>
      </Section>

      {/* Education Support Program */}
      <Section bg="secondary">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <FadeIn delay={0.2} className="order-2 lg:order-1">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                <Monitor size={24} />
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-black text-dark uppercase tracking-tight">
                Education Support Program
              </h2>
            </div>
            
            <p className="text-lg text-gray-600 font-medium leading-relaxed mb-8">
              We help vulnerable individuals achieve their dreams and become global citizens by providing quality education.
              We also provide computer support and educational facilities for communities with poor working conditions.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 text-center hover:shadow-lg transition-shadow">
                <div className="text-primary mb-3 flex justify-center"><Monitor size={32} /></div>
                <div className="text-4xl font-black text-dark mb-2">110</div>
                <div className="text-sm font-bold text-gray-500 uppercase tracking-wider">Computer (Unit)</div>
              </div>
            </div>
          </FadeIn>

          <FadeIn className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl group order-1 lg:order-2">
            <img 
              src="https://brkfoundation.org/theme/brk/img/projects02.jpg" 
              alt="Education Support" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60" />
          </FadeIn>
        </div>
      </Section>

      {/* Community Development Support */}
      <Section bg="white">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <FadeIn className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl group">
            <img 
              src="https://brkfoundation.org/theme/brk/img/projects03.jpg" 
              alt="Community Development" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60" />
          </FadeIn>
          
          <FadeIn delay={0.2}>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                <Droplets size={24} />
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-black text-dark uppercase tracking-tight">
                Community Development Support
              </h2>
            </div>
            
            <p className="text-lg text-gray-600 font-medium leading-relaxed mb-6">
              We create a safe environment with clean water for vulnerable children and residents.
            </p>
            
            <div className="bg-blue-50 p-6 rounded-2xl border-l-4 border-blue-500 mb-6">
              <p className="text-blue-900 font-medium italic">
                "An alarming 748 million people lack access to safe drinking water."
              </p>
            </div>

            <p className="text-lg text-gray-600 font-medium leading-relaxed">
              Through our well-digging initiatives, we provide clean water to benefit children and communities, protecting them from infectious diseases and creating a safe and healthy environment.
            </p>
          </FadeIn>
        </div>
      </Section>

      {/* Future Initiatives */}
      <Section bg="secondary">
        <div className="max-w-4xl mx-auto text-center">
          <FadeIn>
            <div className="relative h-[400px] rounded-3xl overflow-hidden shadow-2xl mb-10 group">
              <img 
                src="https://brkfoundation.org/theme/brk/img/projects04.jpg" 
                alt="Future Initiatives" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white mx-auto mb-6">
                    <Heart size={40} />
                  </div>
                  <h2 className="text-4xl md:text-5xl font-display font-black text-white uppercase tracking-tight mb-4">
                    Future Initiatives
                  </h2>
                  <p className="text-xl text-white/90 font-medium max-w-2xl mx-auto">
                    Currently under planning and development.
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </Section>

      {/* Banner Section */}
      <div className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://brkfoundation.org/theme/brk/img/s_back04.jpg" 
            alt="Leap Forward" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <FadeIn>
            <h2 className="text-4xl md:text-6xl font-display font-black text-white uppercase leading-tight tracking-tight">
              We will continue to <span className="text-primary">leap forward</span> and help more marginalized people
            </h2>
          </FadeIn>
        </div>
      </div>
    </MainLayout>
  );
}
