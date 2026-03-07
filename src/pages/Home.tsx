import React from 'react';
import { MainLayout } from '../layouts/MainLayout';
import { Section, FadeIn } from '../components/ui';
import { ArrowRight, Heart, Users, Globe, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Carousel } from '../components/ui/Carousel';
import { ActivitySlider } from '../components/ui/ActivitySlider';

const HERO_SLIDES = [
  { image: "https://brkfoundation.org/theme/brk/img/h_back01.jpg" },
  { image: "https://brkfoundation.org/theme/brk/img/h_back02.jpg" },
  { image: "https://brkfoundation.org/theme/brk/img/h_back03.jpg" },
  { image: "https://brkfoundation.org/theme/brk/img/h_back04.jpg" }
];

const ACTIVITIES = [
  {
    title: "Brgy. Zapatera, Green Mosque",
    date: "10th April, 2023",
    image: "https://brkfoundation.org/data/editor/2510/thumb-5f7cb3a2b19511c194455100e31d012b_1761788708_4552_350x350.jpg"
  },
  {
    title: "Brgy. Mambaling, Al-Khairiah Mosque",
    date: "11th April, 2023",
    image: "https://brkfoundation.org/data/editor/2510/thumb-5f7cb3a2b19511c194455100e31d012b_1761788692_1686_350x350.jpg"
  },
  {
    title: "Sanciangko Cebu City, Sittie Mariyam Masjed",
    date: "12th April, 2023",
    image: "https://brkfoundation.org/data/editor/2510/thumb-5f7cb3a2b19511c194455100e31d012b_1761788674_115_350x350.jpg"
  },
  {
    title: "Brgy. Kamputhaw, Cebu Islamic (Al-masjid)",
    date: "13th April, 2023",
    image: "https://brkfoundation.org/data/editor/2510/thumb-5f7cb3a2b19511c194455100e31d012b_1761788657_5461_350x350.jpg"
  },
  {
    title: "Islamic Da'wah Mosque, Basak Pardo",
    date: "14th April, 2023",
    image: "https://brkfoundation.org/data/editor/2510/thumb-5f7cb3a2b19511c194455100e31d012b_1761788638_6241_350x350.jpg"
  },
  {
    title: "Kinasang-an Pardo Mosque",
    date: "15th April, 2023",
    image: "https://brkfoundation.org/data/editor/2510/thumb-5f7cb3a2b19511c194455100e31d012b_1761788617_7662_350x350.jpg"
  },
  {
    title: "Talamban Elementary School",
    date: "19th April, 2023",
    image: "https://brkfoundation.org/data/editor/2510/thumb-5f7cb3a2b19511c194455100e31d012b_1761788596_6216_350x350.jpg"
  },
  {
    title: "Sambag II, Sitio Maharlika",
    date: "20th April, 2023",
    image: "https://brkfoundation.org/data/editor/2510/thumb-5f7cb3a2b19511c194455100e31d012b_1761788569_5736_350x350.jpg"
  }
];

export default function Home() {
  return (
    <MainLayout>
      {/* Hero Section */}
      <div className="relative h-screen flex items-center justify-center overflow-hidden bg-gray-900">
        {/* Background Carousel */}
        <div className="absolute inset-0 z-0">
          <Carousel 
            slides={HERO_SLIDES} 
            className="w-full h-full"
            showArrows={true}
            showIndicators={true}
            autoPlayInterval={6000}
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80 z-10" />
        </div>
        
        {/* Hero Content */}
        <div className="relative z-20 text-center px-6 max-w-screen-2xl mx-auto mt-16">
          <FadeIn>
            <div className="inline-flex items-center gap-2 py-2 px-6 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-bold tracking-wider uppercase mb-8 shadow-xl">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Non-Profit Organization
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl 2xl:text-9xl font-display font-black text-white mb-8 leading-[0.9] tracking-tight uppercase drop-shadow-2xl">
              Make Laughter <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Last Forever</span>
            </h1>
            
            <p className="text-base md:text-xl 2xl:text-2xl text-gray-200 max-w-4xl mx-auto mb-12 font-medium leading-relaxed drop-shadow-lg">
              Your love and sharing can help children grow their hopes and dreams. 
              Even a small donation can save a neighbor and give hope for the future.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/donate" className="bg-primary text-white px-8 py-4 rounded-lg text-lg font-bold hover:bg-primary/90 transition-colors shadow-lg w-full sm:w-auto flex items-center justify-center gap-2 uppercase tracking-wide">
                <Heart size={20} fill="currentColor" />
                Donate Now
              </Link>
              <Link to="/about" className="bg-white text-dark px-8 py-4 rounded-lg text-lg font-bold hover:bg-gray-100 transition-colors shadow-lg w-full sm:w-auto flex items-center justify-center gap-2 uppercase tracking-wide">
                Learn More
                <ArrowRight size={20} />
              </Link>
            </div>
          </FadeIn>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 animate-bounce text-white/50">
          <div className="w-6 h-10 rounded-full border-2 border-white/30 flex justify-center pt-2">
            <div className="w-1 h-2 bg-white rounded-full" />
          </div>
        </div>
      </div>

      {/* Intro Section - Redesigned */}
      <Section className="relative overflow-hidden py-32 bg-white">
        <div className="grid md:grid-cols-2 gap-16 items-center max-w-screen-2xl mx-auto">
          {/* Image Side */}
          <FadeIn delay={0.1} className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3] group">
              <img 
                src="https://brkfoundation.org/theme/brk/img/h_back05.jpg" 
                alt="Community Support" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-dark/10 group-hover:bg-transparent transition-colors duration-500" />
            </div>
            {/* Floating Badge */}
            <div className="absolute -bottom-6 -right-6 bg-white py-4 px-6 rounded-2xl shadow-2xl hidden md:flex items-center gap-4 animate-float border border-gray-100/50">
              <div className="p-2.5 bg-green-50 rounded-full text-green-600 shadow-sm">
                <CheckCircle size={24} strokeWidth={2.5} />
              </div>
              <div>
                <span className="block font-black text-dark text-base leading-none mb-1">Verified Impact</span>
                <span className="block text-xs text-gray-400 font-bold uppercase tracking-wider">Since 2018</span>
              </div>
            </div>
          </FadeIn>

          {/* Text Side */}
          <FadeIn delay={0.3}>
            <h2 className="text-4xl md:text-5xl lg:text-6xl 2xl:text-7xl font-black text-dark uppercase tracking-tight mb-8 leading-[0.95]">
              A World We Can <br/>
              <span className="text-primary">Build Together</span>
            </h2>
            
            <div className="space-y-6 text-base 2xl:text-lg text-gray-600 font-medium leading-relaxed">
              <p>
                Sharing what we have with those in need can be a challenging task. However, at <strong className="text-dark">BRK Foundation</strong>, we are devoted to making a positive impact on the world by supporting those who are most marginalized.
              </p>
              <p>
                We began with providing warm meals to children who represent a brighter future and are now expanding our reach across the globe. Our goal is to transcend borders, race, and religion to create lasting change.
              </p>
            </div>

            <div className="mt-10">
              <Link to="/about" className="inline-flex items-center gap-3 text-dark font-bold text-lg group border-b-2 border-primary pb-1 hover:text-primary transition-colors">
                Read our full story 
                <ArrowRight size={24} className="text-primary group-hover:translate-x-2 transition-transform" />
              </Link>
            </div>
          </FadeIn>
        </div>
      </Section>

      {/* Impact Stats */}
      <Section bg="dark" className="relative overflow-hidden py-32">
        <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent rounded-full blur-[120px]" />
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 relative z-10 max-w-screen-2xl mx-auto">
          {[
            { label: "ESTABLISHED IN", value: "2018", icon: Globe },
            { label: "DONATION", value: "75,120", unit: "BOWLS", icon: Heart },
            { label: "PROJECTS FINISHED", value: "W.I.P.", icon: Users },
            { label: "SUPPORT FOR", value: "80", unit: "PLACES", icon: Globe },
          ].map((stat, idx) => (
            <FadeIn key={idx} delay={idx * 0.1} className="text-center group">
              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                <stat.icon className="w-8 h-8 text-white" />
              </div>
              <div className="text-gray-400 text-sm font-bold uppercase tracking-widest mb-2">{stat.label}</div>
              <div className="text-4xl md:text-5xl lg:text-6xl font-display font-black text-white flex items-baseline justify-center gap-2">
                {stat.value}
                {stat.unit && <span className="text-lg md:text-xl lg:text-2xl font-bold text-gray-400">{stat.unit}</span>}
              </div>
            </FadeIn>
          ))}
        </div>
      </Section>

      {/* Recent Activities */}
      <Section bg="secondary">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-5xl md:text-6xl mb-6 font-black text-dark uppercase tracking-tight">Recent Activities</h2>
          <p className="text-gray-600 text-xl font-medium">
            We are constantly working on the ground to provide support where it's needed most.
          </p>
        </div>

        <ActivitySlider activities={ACTIVITIES} />
        
        <div className="text-center mt-16">
          <Link to="/projects" className="inline-flex items-center gap-3 bg-dark text-white px-8 py-4 rounded-xl font-bold hover:bg-primary transition-colors">
            View all projects <ArrowRight size={20} />
          </Link>
        </div>
      </Section>

      {/* Partners Section */}
      <Section bg="white">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-dark uppercase tracking-tight">Our Partners</h2>
        </div>
        <div className="flex flex-wrap justify-center items-center gap-16">
          <div className="flex flex-col items-center gap-4 group cursor-pointer">
            <img 
              src="https://brkfoundation.org/theme/brk/img/partner01.png" 
              alt="Tatay Pho" 
              className="h-24 w-auto object-contain transition-all duration-300 group-hover:scale-110 group-hover:-translate-y-2" 
              referrerPolicy="no-referrer"
            />
            <span className="font-bold text-dark group-hover:text-primary transition-colors">Tatay Pho</span>
          </div>
          <div className="flex flex-col items-center gap-4 group cursor-pointer">
            <img 
              src="https://brkfoundation.org/theme/brk/img/partner02.png" 
              alt="Cpass" 
              className="h-24 w-auto object-contain transition-all duration-300 group-hover:scale-110 group-hover:-translate-y-2" 
              referrerPolicy="no-referrer"
            />
            <span className="font-bold text-dark group-hover:text-primary transition-colors">Cpass</span>
          </div>
        </div>
      </Section>
    </MainLayout>
  );
}
