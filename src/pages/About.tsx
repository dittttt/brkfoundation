import React from 'react';
import { MainLayout } from '../layouts/MainLayout';
import { Section, PageHeader, FadeIn } from '../components/ui';
import { Eye, Target, Heart, ShieldCheck, Users } from 'lucide-react';
import { ProfileCard } from '../components/shared/ProfileCard';

export default function About() {
  return (
    <MainLayout>
      <PageHeader 
        title="About Us" 
        subtitle="A society that dreams of love and sharing, where no one is excluded."
        image="https://brkfoundation.org/theme/brk/img/s_back01.jpg"
      />

      {/* Intro Section - Split Layout */}
      <section className="relative bg-white overflow-hidden">
        <div className="grid lg:grid-cols-2 md:min-h-[600px]">
          {/* Left Content Side */}
          <div className="relative z-10 flex items-center justify-center p-6 md:p-12 lg:p-16 order-2 lg:order-1">
            <div className="max-w-xl w-full">
              <FadeIn>
                <div className="mb-8 md:mb-12">
                  <h2 className="text-6xl md:text-7xl font-display font-black text-dark mb-8 leading-[0.9] tracking-tighter">
                    A WORLD WE CAN<br />
                    <span className="text-primary">BUILD TOGETHER</span>
                  </h2>
                  <div className="w-24 h-2 bg-primary mb-8 rounded-full"></div>
                  <div className="space-y-6 text-lg text-gray-600 font-medium leading-relaxed">
                    <p>
                      Sharing what we have with those in need can be a challenging task. However, after living abroad for 15 years, I came to realize that <strong className="text-dark font-bold">people are the most crucial aspect of our lives.</strong>
                    </p>
                    <p>
                      At BRK Foundation, we are devoted to making a positive impact on the world by supporting those who are most marginalized and in need. We began with providing warm meals to children who represent a brighter future and are now expanding our reach across the globe.
                    </p>
                    <p>
                      Our goal is to transcend borders, race, and religion, and be a stepping stone for those who need it the most.
                    </p>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>

          {/* Right Profile Side */}
          <div className="relative bg-gray-50 p-6 md:p-12 lg:p-16 flex flex-col justify-center gap-6 md:gap-8 order-1 lg:order-2">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
            
            {/* Bruce Kim Profile */}
            <ProfileCard 
              name="Bruce Kim"
              role="Chairman"
              quote="People are the most crucial aspect of our lives."
              image="https://brkfoundation.org/theme/brk/img/Bruce-Kim.jpg"
              delay={0.2}
            />

            {/* Liz Moon Profile */}
            <ProfileCard 
              name="Liz Moon"
              role="Director of Operation"
              quote="Love and sharing can change the world."
              image="https://brkfoundation.org/theme/brk/img/Liz-Moon.jpg"
              delay={0.4}
            />
          </div>
        </div>
      </section>

      {/* Vision & Mission Section */}
      <Section bg="secondary" className="relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12 md:mb-20">
            <FadeIn>
              <h2 className="text-5xl md:text-6xl font-black text-dark uppercase tracking-tight mb-6">Our Purpose</h2>
              <p className="text-xl text-gray-600 font-medium max-w-2xl mx-auto">
                Guiding principles that drive every action we take to build a better world.
              </p>
            </FadeIn>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Vision Card */}
            <FadeIn delay={0.2} className="group h-full">
              <div className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-gray-100 h-full transition-all duration-500 hover:shadow-2xl hover:border-primary/20 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-16 -mt-16 transition-transform duration-700 group-hover:scale-110"></div>
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-8 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                    <Eye size={32} />
                  </div>
                  <h3 className="text-4xl font-display font-bold text-dark mb-6">Our Vision</h3>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    We promise a dream for our vulnerable neighbors and children, who represent seeds of hope, along with those who are socially disadvantaged.
                  </p>
                </div>
              </div>
            </FadeIn>

            {/* Mission Card */}
            <FadeIn delay={0.4} className="group h-full">
              <div className="bg-dark p-10 rounded-[2.5rem] shadow-xl h-full transition-all duration-500 hover:shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-16 -mt-16 transition-transform duration-700 group-hover:scale-110"></div>
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center text-white mb-8 group-hover:bg-white group-hover:text-dark transition-colors duration-300">
                    <Target size={32} />
                  </div>
                  <h3 className="text-4xl font-display font-bold text-white mb-6">Our Mission</h3>
                  <p className="text-lg text-gray-300 leading-relaxed">
                    As a leader for a warm society, BRK Foundation is dedicated to volunteering and sharing, creating a healthy community where people can live together in harmony.
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </Section>

      {/* Core Values Section */}
      <Section bg="white" className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <FadeIn className="mb-12 md:mb-16">
            <h2 className="text-5xl font-black text-dark uppercase tracking-tight mb-4">Core Values</h2>
            <div className="w-20 h-2 bg-primary rounded-full mb-6"></div>
            <p className="text-xl text-gray-500 font-medium max-w-2xl">
              The fundamental beliefs that shape our culture and impact.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8">
            {[
              { 
                icon: Heart, 
                title: "Community Empathy", 
                desc: "Understanding and sharing the feelings of our neighbors.",
                color: "bg-red-50 text-red-500"
              },
              { 
                icon: ShieldCheck, 
                title: "Transparency", 
                desc: "Operating with openness and accountability in all we do.",
                color: "bg-blue-50 text-blue-500"
              },
              { 
                icon: Users, 
                title: "Collaboration", 
                desc: "Working together to achieve greater impact.",
                color: "bg-green-50 text-green-500"
              }
            ].map((val, idx) => (
              <FadeIn key={idx} delay={idx * 0.1} className="group">
                <div className="bg-white p-6 md:p-8 rounded-2xl md:rounded-3xl border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full items-center text-center sm:items-start sm:text-left flex flex-col sm:block">
                  <div className={`w-12 h-12 md:w-14 md:h-14 ${val.color} rounded-xl md:rounded-2xl flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <val.icon className="w-6 h-6 md:w-7 md:h-7" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-display font-bold text-dark mb-3 md:mb-4 group-hover:text-primary transition-colors">{val.title}</h3>
                  <p className="text-sm md:text-base text-gray-600 leading-relaxed max-w-[280px] sm:max-w-none">{val.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </Section>
    </MainLayout>
  );
}

