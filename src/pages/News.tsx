import React, { useState } from 'react';
import { MainLayout } from '../layouts/MainLayout';
import { Section, PageHeader, FadeIn } from '../components/ui';
import { Search, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

export default function News() {
  const [activeYear, setActiveYear] = useState('All');

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
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 border-b border-gray-100 pb-4 gap-4">
          <div className="text-sm font-medium text-gray-500">
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
            <FadeIn key={idx} delay={idx * 0.1}>
              <div className="group cursor-pointer bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 h-full flex flex-col">
                <div className="relative overflow-hidden aspect-[16/10]">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-dark px-4 py-2 rounded-lg text-xs font-black uppercase tracking-wide shadow-sm">
                    News
                  </div>
                </div>
                <div className="p-8 flex flex-col flex-grow">
                  <div className="text-primary text-sm font-bold mb-3 uppercase tracking-wide">{item.date}</div>
                  <h3 className="text-2xl font-display font-black text-dark group-hover:text-primary transition-colors leading-tight mb-4">{item.title}</h3>
                  <p className="text-gray-600 font-medium leading-relaxed mb-6 flex-grow">{item.desc}</p>
                  <div className="flex items-center text-primary font-bold text-sm uppercase tracking-wider group/link">
                    Read More 
                    <svg className="w-4 h-4 ml-2 transform group-hover/link:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </div>
            </FadeIn>
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
        <div className="mb-10 space-y-6">
          {/* Filters */}
          <div className="flex flex-wrap gap-2 justify-center md:justify-start">
            {years.map((year) => (
              <button
                key={year}
                onClick={() => setActiveYear(year)}
                className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${
                  activeYear === year 
                    ? 'bg-primary text-white shadow-md transform scale-105' 
                    : 'bg-white text-gray-500 hover:bg-gray-100'
                }`}
              >
                {year}
              </button>
            ))}
          </div>

          {/* Search and Count */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm font-medium text-gray-500 order-2 md:order-1">
              Total <span className="text-primary font-bold">265</span>건 1 페이지
            </div>
            <div className="relative w-full md:w-64 order-1 md:order-2">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {galleryItems.map((item, idx) => (
            <FadeIn key={idx} delay={idx * 0.05} className="group cursor-pointer">
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 h-full flex flex-col">
                <div className="relative overflow-hidden aspect-[4/3]">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="bg-white/20 backdrop-blur-md p-3 rounded-full text-white">
                      <Search size={20} />
                    </div>
                  </div>
                </div>
                <div className="p-4 flex flex-col flex-grow">
                  <h4 className="font-bold text-dark text-sm leading-snug mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                    {item.title}
                  </h4>
                  <div className="mt-auto pt-2 border-t border-gray-100 text-xs text-gray-500 font-mono">
                    {item.date}
                  </div>
                </div>
              </div>
            </FadeIn>
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
