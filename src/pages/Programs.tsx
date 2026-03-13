import React from 'react';
import { MainLayout } from '../layouts/MainLayout';
import { Section, PageHeader, FadeIn, Counter, ActivitySlider } from '../components/ui';
import { Heart } from 'lucide-react';

export default function Programs() {
  const FEEDING_ACTIVITIES = Array.from({ length: 10 }, (_, i) => ({
    title: `Feeding Program Activity ${i + 1}`,
    date: "2023",
    image: `https://brkfoundation.org/theme/brk/img/f_thum${String(i + 1).padStart(2, '0')}.jpg`
  }));

  return (
    <MainLayout>
      <PageHeader 
        title="Feeding Program" 
        subtitle="Sharing the gift of warm meals with our neighbors and children."
        image="https://brkfoundation.org/theme/brk/img/s_back03.jpg"
      />

      {/* Intro Section */}
      <Section className="py-24 md:py-32 bg-white">
        <div className="max-w-4xl mx-auto text-center px-6">
          <FadeIn>
            <div className="inline-flex items-center justify-center p-3 bg-primary/5 rounded-full mb-8">
              <Heart className="w-6 h-6 text-primary" />
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-black text-dark mb-8 leading-tight">
              "Food is the most essential thing for human survival."
            </h2>
            <div className="w-px h-16 bg-gray-200 mx-auto mb-8"></div>
            <p className="text-xl text-gray-500 font-medium leading-relaxed max-w-2xl mx-auto">
              Yet many around the world still struggle with hunger. <br className="hidden md:block" />
              <span className="text-dark font-bold">We aim to stand by our struggling neighbors during difficult times.</span>
            </p>
          </FadeIn>
        </div>
      </Section>

      {/* Nutrition Support Project - Split Layout */}
      <section className="relative bg-gray-50 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[800px]">
          {/* Left Content Side */}
          <div className="relative z-10 flex items-center justify-center p-12 lg:p-24 order-2 lg:order-1">
            <div className="max-w-xl w-full">
              <FadeIn>
                <div className="mb-12">
                  <h2 className="text-6xl md:text-8xl font-display font-black text-dark mb-6 leading-[0.9] tracking-tighter">
                    MAKING A<br />
                    <span className="text-primary">DIFFERENCE</span>
                  </h2>
                  <p className="text-xl text-gray-600 font-medium leading-relaxed border-l-4 border-primary pl-6">
                    Every meal we serve is a message of hope and solidarity to those who need it most.
                  </p>
                </div>

                <div className="mb-12">
                  <h3 className="text-2xl font-bold text-dark mb-2">Nutrition Support Project</h3>
                  <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">2018 - 2023 (APR.)</p>
                </div>

                <div className="space-y-8">
                  {/* Stat Item 1 */}
                  <div className="group">
                    <div className="flex items-baseline justify-between border-b border-gray-200 pb-4 mb-2 group-hover:border-primary transition-colors duration-300">
                      <span className="text-lg font-medium text-gray-500 group-hover:text-primary transition-colors">Rice Noodles</span>
                      <div className="text-right flex items-baseline gap-2">
                        <span className="text-4xl font-display font-bold text-dark block">
                          <Counter end={75120} />
                        </span>
                        <span className="text-xs font-bold text-gray-400 group-hover:text-primary transition-colors duration-300 uppercase tracking-widest">BOWLS</span>
                      </div>
                    </div>
                  </div>

                  {/* Stat Item 2 */}
                  <div className="group">
                    <div className="flex items-baseline justify-between border-b border-gray-200 pb-4 mb-2 group-hover:border-primary transition-colors duration-300">
                      <span className="text-lg font-medium text-gray-500 group-hover:text-primary transition-colors">Chicken</span>
                      <div className="text-right flex items-baseline gap-2">
                        <span className="text-4xl font-display font-bold text-dark block">
                          <Counter end={200} />
                        </span>
                        <span className="text-xs font-bold text-gray-400 group-hover:text-primary transition-colors duration-300 uppercase tracking-widest">PIECES</span>
                      </div>
                    </div>
                  </div>

                  {/* Stat Item 3 */}
                  <div className="group">
                    <div className="flex items-baseline justify-between border-b border-gray-200 pb-4 mb-2 group-hover:border-primary transition-colors duration-300">
                      <span className="text-lg font-medium text-gray-500 group-hover:text-primary transition-colors">Asian Fruit</span>
                      <div className="text-right flex items-baseline gap-2">
                        <span className="text-4xl font-display font-bold text-dark block">
                          <Counter end={432} />
                        </span>
                        <span className="text-xs font-bold text-gray-400 group-hover:text-primary transition-colors duration-300 uppercase tracking-widest">BOXES</span>
                      </div>
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>

          {/* Right Image Side */}
          <div className="relative h-full min-h-[600px] lg:h-auto order-1 lg:order-2 p-4 lg:p-12 flex items-center justify-center">
            <div className="grid grid-cols-2 gap-4 w-full max-w-lg mx-auto">
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden group">
                <img 
                  src="https://brkfoundation.org/theme/brk/img/feeding01.jpg" 
                  alt="Feeding Program 1" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300"></div>
              </div>
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden group mt-12">
                <img 
                  src="https://brkfoundation.org/theme/brk/img/feeding02.jpg" 
                  alt="Feeding Program 2" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300"></div>
              </div>
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden group -mt-12">
                <img 
                  src="https://brkfoundation.org/theme/brk/img/feeding03.jpg" 
                  alt="Feeding Program 3" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300"></div>
              </div>
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden group">
                <img 
                  src="https://brkfoundation.org/theme/brk/img/feeding04.jpg" 
                  alt="Feeding Program 4" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feeding Activities Slider */}
      <section className="py-32 bg-white overflow-hidden">
        <div className="text-center mb-20 px-6">
          <h2 className="text-4xl md:text-5xl font-black text-dark uppercase tracking-tight">Recent Feeding Activities</h2>
          <div className="w-24 h-1 bg-primary mx-auto mt-6 rounded-full"></div>
        </div>
        <div className="w-full">
          <ActivitySlider activities={FEEDING_ACTIVITIES} />
        </div>
      </section>
    </MainLayout>
  );
}
