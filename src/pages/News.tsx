import React, { useState, useRef, useEffect } from 'react';
import { MainLayout } from '../layouts/MainLayout';
import { Section, PageHeader, FadeIn } from '../components/ui';
import { Search, ChevronLeft, ChevronRight, Filter } from 'lucide-react';
import { NewsCard } from '../components/shared/NewsCard';
import { GalleryCard } from '../components/shared/GalleryCard';
import { supabase } from '../lib/supabase';

// Dummy backups if database empty
const DUMMY_NEWS = [
  {
    title: "Donated Clothes & Shoes",
    date: "2023",
    image: "https://brkfoundation.org/data/file/notice/thumb-28369db3d30448c714369d5988f647e5_2NjdMvPp_fb3f83f6e288ec340c7bc7bd29e0328f20a5cea0_500x300.jpg",
    desc: "Distributing clothing and footwear to those in need.",
    slug: "donated-clothes"
  }
];
const DUMMY_GALLERY = [
  {
    title: "Feeding Program (BRGY. APAS GYM)",
    date: "2025.10.12",
    image: "https://picsum.photos/seed/community/400/300",
    slug: "feeding-program-apas",
    views: 0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

export default function News() {
  const [activeYear, setActiveYear] = useState('All');
  const [gallerySort, setGallerySort] = useState('newest');
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const [news, setNews] = useState<any[]>([]);
  const [gallery, setGallery] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch external data (will fallback if failed)
        const [newsRes, galleryRes] = await Promise.all([
          supabase.from('news').select('*').order('created_at', { ascending: false }),
          supabase.from('gallery').select('*').order('created_at', { ascending: false })
        ]);

        if (newsRes.data && newsRes.data.length > 0) {
          setNews(newsRes.data.map(n => ({
            title: n.title,
            date: new Date(n.created_at).toLocaleDateString(),
            image: n.image_url,
            desc: n.excerpt || n.content.substring(0, 100) + '...',
            slug: n.slug
          })));
        } else {
          setNews(DUMMY_NEWS);
        }

        if (galleryRes.data && galleryRes.data.length > 0) {
          setGallery(galleryRes.data.map(g => ({
            title: g.title,
            date: new Date(g.created_at).toLocaleDateString(),
            image: g.image_url,
            slug: g.slug,
            views: g.views || 0,
            created_at: g.created_at,
            updated_at: g.updated_at || g.created_at
          })));
        } else {
          setGallery(DUMMY_GALLERY);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setNews(DUMMY_NEWS);
        setGallery(DUMMY_GALLERY);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 200;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const years = ['All', ...Array.from({ length: 9 }, (_, i) => (2018 + i).toString())];

  const sortedGallery = React.useMemo(() => {
    let sorted = [...gallery];
    switch (gallerySort) {
      case 'oldest':
        sorted.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
        break;
      case 'last_updated':
        sorted.sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());
        break;
      case 'most_popular':
        sorted.sort((a, b) => b.views - a.views);
        break;
      case 'newest':
      default:
        sorted.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        break;
    }
    return sorted;
  }, [gallery, gallerySort]);

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
            Total <span className="text-primary font-bold">{news.length}</span> items
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

        {loading ? (
          <div className="py-10 text-center text-gray-500">Loading news...</div>
        ) : (
          <div className="grid md:grid-cols-3 gap-10">
            {news.map((item, idx) => (
              <NewsCard key={idx} item={item} delay={idx * 0.1} />
            ))}
          </div>
        )}
      </Section>

      {/* Gallery Section */}
      <Section bg="secondary">
        <FadeIn className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-display font-black text-dark uppercase tracking-tight">Gallery</h2>
          <p className="text-gray-600 text-lg mt-4 font-medium max-w-2xl mx-auto">Be the reason for someone's happiness</p>
        </FadeIn>
        
        {/* Gallery Controls */}
        <FadeIn delay={0.1} className="mb-0 md:mb-10 space-y-6">
          <div className="flex items-center gap-2 md:block">
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

            <button 
              onClick={() => scroll('right')}
              className="md:hidden shrink-0 flex-none p-1 bg-white border border-gray-200 rounded-full shadow-sm text-dark h-9 w-9 flex items-center justify-center my-auto transition-colors active:bg-gray-50"
            >
              <ChevronRight size={18} />
            </button>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mt-6 md:mt-0 mb-6 md:mb-0">
            <div className="text-sm font-medium text-gray-500 w-full md:w-auto text-left">
              Total <span className="text-primary font-bold">{gallery.length}</span> items
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <div className="relative flex-1 md:w-64">
                <input 
                  type="text" 
                  placeholder="Search gallery..." 
                  className="w-full pl-4 pr-10 py-2 border border-gray-200 rounded-full text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all bg-white"
                />
                <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary transition-colors">
                  <Search size={16} />
                </button>
              </div>
              <div className="relative shrink-0">
                <select 
                  value={gallerySort}
                  onChange={(e) => setGallerySort(e.target.value)}
                  className="appearance-none pl-4 pr-10 py-2 border border-gray-200 rounded-full text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all bg-white text-gray-700 font-medium"
                >
                  <option value="newest">Newest</option>
                  <option value="oldest">Oldest</option>
                  <option value="last_updated">Last Updated</option>
                  <option value="most_popular">Most Popular</option>
                </select>
                <Filter className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
              </div>
            </div>
          </div>
        </FadeIn>
        
        {loading ? (
          <div className="py-10 text-center text-gray-500">Loading gallery...</div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12">
            {sortedGallery.map((item, idx) => (
              <GalleryCard key={idx} item={item} delay={idx * 0.05} />
            ))}
          </div>
        )}
      </Section>
    </MainLayout>
  );
}

