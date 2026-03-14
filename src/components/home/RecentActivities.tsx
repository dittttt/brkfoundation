import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Section, FadeIn } from '../ui';
import { ActivitySlider } from '../ui/ActivitySlider';

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

export const RecentActivities = () => {
  return (
    <Section bg="secondary" className="py-12 md:py-20">
      <FadeIn className="text-center max-w-3xl mx-auto mb-10 md:mb-16 px-6">
        <h2 className="text-4xl md:text-5xl lg:text-6xl mb-4 md:mb-6 font-black text-dark uppercase tracking-tight">Recent Activities</h2>
        <p className="text-gray-600 text-lg md:text-xl font-medium">
          We are constantly working on the ground to provide support where it's needed most.
        </p>
      </FadeIn>

      <FadeIn delay={0.2}>
        <ActivitySlider activities={ACTIVITIES} />
      </FadeIn>
      
      <FadeIn delay={0.3} className="text-center mt-12 md:mt-16">
        <Link to="/projects" className="inline-flex items-center gap-3 bg-white text-dark px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition-colors shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)]">
          View all projects <ArrowRight size={20} />
        </Link>
      </FadeIn>
    </Section>
  );
};
