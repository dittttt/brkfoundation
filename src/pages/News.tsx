import React, { useState, useRef } from 'react';
import { MainLayout } from '../layouts/MainLayout';
import { Section, PageHeader, FadeIn } from '../components/ui';
import { Search, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { NewsCard } from '../components/shared/NewsCard';
import { GalleryCard } from '../components/shared/GalleryCard';

export default function News() {
  const [activeYear, setActiveYear] = useState('All');
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 200;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const newsItems = [
    {
      title: "Donated Clothes & Shoes",
      date: "2023",
      image: "https://brkfoundation.org/data/file/notice/thumb-28369db3d30448c714369d5988f647e5_2NjdMvPp_fb3f83f6e288ec340c7bc7bd29e0328f20a5cea0_500x300.jpg",
      desc: "Distributing clothing and footwear to those in need."
    },
    {
      title: "Giving Hope and Inspiration",
      date: "2023",
      image: "https://brkfoundation.org/data/file/notice/thumb-28369db3d30448c714369d5988f647e5_e9p2Eqz1_bb4e9bc94bc42b93a0b14eb7b2552b8536d01fb2_500x300.jpg",
      desc: "The desires of giving hope and inspiration to them."
    },
    {
      title: "We Can Overcome Anything Together",
      date: "2023",
      image: "https://brkfoundation.org/data/file/notice/thumb-28369db3d30448c714369d5988f647e5_nt7DG9dF_4ac9ddda4643fa78eaa8a747a1f808ad374cb2ed_500x300.jpg",
      desc: "As long as we C.R.E.A.T.E together, we can overcome any challenge."
    }
  ];

  const galleryItems = [
    {
      title: "Feeding Program (BRGY. APAS GYM- WORLD VISION DAY)",
      date: "2025.10.12",
      image: "https://picsum.photos/seed/community/400/300"
    },
    {
      title: "School Supplies Distribution (MANDAUE CITY)",
      date: "2025.09.05",
      image: "https://picsum.photos/seed/school/400/300"
    },
    {
      title: "Medical Mission (CEBU PROVINCE)",
      date: "2025.08.20",
      image: "https://picsum.photos/seed/help/400/300"
    },
    {
      title: "Youth Leadership Camp",
      date: "2025.07.15",
      image: "https://picsum.photos/seed/children/400/300"
    },
    {
      title: "Community Clean-up Drive",
      date: "2025.06.30",
      image: "https://picsum.photos/seed/volunteer/400/300"
    },
    {
      title: "Elderly Care Visit",
      date: "2025.06.10",
      image: "https://picsum.photos/seed/smile/400/300"
    },
    {
      title: "Disaster Relief Operations",
      date: "2025.05.22",
      image: "https://picsum.photos/seed/hope/400/300"
    },
    {
      title: "Livelihood Training Seminar",
      date: "2025.04.18",
      image: "https://picsum.photos/seed/work/400/300"
    }
  ];

  const years = ['All', ...Array.from({ length: 9 }, (_, i) => (2018 + i).toString())];

  return (
    <MainLayout>
      <PageHeader 
        title="Updates" 
        subtitle="Latest stories and updates from our community."
        image="https://brkfoundation.org/theme/brk/img/s_back08.jpg"
      />

      {/* News Section */}
      <Section bg="white">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 md:mb-8 border-b border-gray-100 pb-4 gap-4">
          <div className="text-sm font-medium text-gray-500 w-full md:w-auto text-left">
            Total <span className="text-primary font-bold">3</span>건 1 페이지
          </div>
          <div className="relative w-full md:w-64">
            <input 
              type="text" 
              placeholder="Search news..." 
              className="w-full pl-4 pr-10 py-2 border border-gray-200 rounded-full text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary transition-colors">
              <Search size={16} />
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          {newsItems.map((item, idx) => (
            <NewsCard key={idx} item={item} delay={idx * 0.1} />
          ))}
        </div>
      </Section>

      {/* Gallery Section */}
      <Section bg="secondary">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-display font-black text-dark uppercase tracking-tight">Gallery</h2>
          <p className="text-gray-600 text-lg mt-4 font-medium max-w-2xl mx-auto">Be the reason for someone's happiness</p>
        </div>
        
        {/* Gallery Controls */}
        <div className="mb-0 md:mb-10 space-y-6">
          {/* Filters */}
          <div className="flex items-center gap-2 md:block">
            {/* Mobile Left Arrow */}
            <button 
              onClick={() => scroll('left')}
              className="md:hidden shrink-0 flex-none p-1 bg-white border border-gray-200 rounded-full shadow-sm text-dark h-9 w-9 flex items-center justify-center my-auto transition-colors active:bg-gray-50"
            >
              <ChevronLeft size={18} />
            </button>

            <div 
              ref={scrollContainerRef}
              className="flex-1 overflow-x-auto flex gap-2 md:flex-wrap md:justify-start py-2 scroll-smooth snap-x min-w-0"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              <style>{`
                div::-webkit-scrollbar {
                  display: none;
                }
              `}</style>
              {years.map((year) => (
                <button
                  key={year}
                  onClick={() => setActiveYear(year)}
                  className={`px-5 py-2 rounded-full text-sm font-bold transition-all whitespace-nowrap snap-start shrink-0 ${
                    activeYear === year 
                      ? 'bg-primary text-white shadow-md transform scale-[1.02] border border-primary' 
                      : 'bg-white text-dark border border-dark hover:bg-gray-50'
                  }`}
                >
                  {year}
                </button>
              ))}
            </div>

            {/* Mobile Right Arrow */}
            <button 
              onClick={() => scroll('right')}
              className="md:hidden shrink-0 flex-none p-1 bg-white border border-gray-200 rounded-full shadow-sm text-dark h-9 w-9 flex items-center justify-center my-auto transition-colors active:bg-gray-50"
            >
              <ChevronRight size={18} />
            </button>
          </div>

          {/* Search and Count */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mt-6 md:mt-0 mb-6 md:mb-0">
            <div className="text-sm font-medium text-gray-500 w-full md:w-auto text-left">
              Total <span className="text-primary font-bold">265</span>건 1 페이지
            </div>
            <div className="relative w-full md:w-64">
              <input 
                type="text" 
                placeholder="Search gallery..." 
                className="w-full pl-4 pr-10 py-2 border border-gray-200 rounded-full text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all bg-white"
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary transition-colors">
                <Search size={16} />
              </button>
            </div>
          </div>
        </div>
        
        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12">
          {galleryItems.map((item, idx) => (
            <GalleryCard key={idx} item={item} delay={idx * 0.05} />
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center gap-2">
          <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-white border border-gray-200 text-gray-400 hover:text-primary hover:border-primary transition-colors">
            <ChevronsLeft size={16} />
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-white border border-gray-200 text-gray-400 hover:text-primary hover:border-primary transition-colors">
            <ChevronLeft size={16} />
          </button>
          
          <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-primary text-white font-bold shadow-md">
            1
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-white border border-gray-200 text-gray-600 hover:text-primary hover:border-primary transition-colors">
            2
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-white border border-gray-200 text-gray-600 hover:text-primary hover:border-primary transition-colors">
            3
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-white border border-gray-200 text-gray-600 hover:text-primary hover:border-primary transition-colors">
            4
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-white border border-gray-200 text-gray-600 hover:text-primary hover:border-primary transition-colors">
            5
          </button>

          <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-white border border-gray-200 text-gray-400 hover:text-primary hover:border-primary transition-colors">
            <ChevronRight size={16} />
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-white border border-gray-200 text-gray-400 hover:text-primary hover:border-primary transition-colors">
            <ChevronsRight size={16} />
          </button>
        </div>
      </Section>
    </MainLayout>
  );
}

