import React from 'react';
import { MainLayout } from '../layouts/MainLayout';
import { Section, PageHeader, FadeIn } from '../components/ui';
import { Shirt, Monitor, Droplets, Heart, Zap, Footprints } from 'lucide-react';
import { ProjectCard } from '../components/shared/ProjectCard';

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
        <ProjectCard
          title="Basic Living Support Program"
          description="We provide basic living support and love to families and children struggling in poverty. We support basic living necessities such as clothing, shoes, and fans for people in need."
          image="https://brkfoundation.org/theme/brk/img/projects01.jpg"
          icon={<Shirt size={24} />}
          stats={[
            { icon: Shirt, value: "18.6K", label: "Clothes" },
            { icon: Footprints, value: "38.4K", label: "Shoes" },
            { icon: Zap, value: "100", label: "Elec. Fans" }
          ]}
        />
      </Section>

      {/* Education Support Program */}
      <Section bg="secondary">
        <ProjectCard
          title="Education Support Program"
          description="We help vulnerable individuals achieve their dreams and become global citizens by providing quality education. We also provide computer support and educational facilities for communities with poor working conditions."
          image="https://brkfoundation.org/theme/brk/img/projects02.jpg"
          icon={<Monitor size={24} />}
          stats={[
            { icon: Monitor, value: "110", label: "Computer (Unit)" }
          ]}
          reverse={true}
        />
      </Section>

      {/* Community Development Support */}
      <Section bg="white">
        <ProjectCard
          title="Community Development Support"
          description="We create a safe environment with clean water for vulnerable children and residents."
          image="https://brkfoundation.org/theme/brk/img/projects03.jpg"
          icon={<Droplets size={24} />}
        >
          <div className="bg-blue-50 p-6 rounded-2xl border-l-4 border-blue-500 mb-6">
            <p className="text-blue-900 font-medium italic">
              "An alarming 748 million people lack access to safe drinking water."
            </p>
          </div>

          <p className="text-lg text-gray-600 font-medium leading-relaxed">
            Through our well-digging initiatives, we provide clean water to benefit children and communities, protecting them from infectious diseases and creating a safe and healthy environment.
          </p>
        </ProjectCard>
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

