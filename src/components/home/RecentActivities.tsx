import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Section, FadeIn } from '../ui';
import { ActivitySlider } from '../ui/ActivitySlider';
import { supabase } from '../../lib/supabase';

const DUMMY_ACTIVITIES = [
  {
    title: "Brgy. Zapatera, Green Mosque",
    date: "10th April, 2023",
    image: "https://brkfoundation.org/data/editor/2510/thumb-5f7cb3a2b19511c194455100e31d012b_1761788708_4552_350x350.jpg",
    slug: "zapatera-green-mosque",
    type: "gallery"
  },
  {
    title: "Donated Clothes & Shoes",
    date: "15th May, 2023",
    image: "https://brkfoundation.org/data/file/notice/thumb-28369db3d30448c714369d5988f647e5_2NjdMvPp_fb3f83f6e288ec340c7bc7bd29e0328f20a5cea0_500x300.jpg",
    slug: "donated-clothes",
    type: "news"
  },
  {
    title: "Feeding Program (BRGY. APAS GYM)",
    date: "12th Oct, 2023",
    image: "https://brkfoundation.org/data/editor/2510/thumb-5f7cb3a2b19511c194455100e31d012b_1761788708_4552_350x350.jpg",
    slug: "feeding-program-apas",
    type: "gallery"
  },
  {
    title: "Medical Mission",
    date: "20th Nov, 2023",
    image: "https://brkfoundation.org/data/file/notice/thumb-28369db3d30448c714369d5988f647e5_2NjdMvPp_fb3f83f6e288ec340c7bc7bd29e0328f20a5cea0_500x300.jpg",
    slug: "medical-mission",
    type: "news"
  }
];

export const RecentActivities = () => {
  const [activities, setActivities] = useState<any[]>(DUMMY_ACTIVITIES);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchActivities() {
      try {
        const [newsRes, galleryRes] = await Promise.all([
          supabase.from('news').select('title, created_at, image_url, slug').order('created_at', { ascending: false }).limit(8),
          supabase.from('gallery').select('title, created_at, image_url, slug').order('created_at', { ascending: false }).limit(8)
        ]);

        const combined = [
          ...(newsRes.data || []).map(n => ({ ...n, type: 'news' })),
          ...(galleryRes.data || []).map(n => ({ ...n, type: 'gallery' }))
        ];

        combined.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        
        const latest = combined.slice(0, 8);

        if (latest.length > 0) {
          setActivities(latest.map(g => ({
            title: g.title,
            date: new Date(g.created_at).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' }),
            image: g.image_url,
            slug: g.slug,
            type: g.type
          })));
        }
      } catch (err) {
        console.error("Error fetching activities:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchActivities();
  }, []);

  return (
    <Section bg="secondary" className="py-12 md:py-20">
      <FadeIn className="text-center max-w-3xl mx-auto mb-10 md:mb-16 px-6">    
        <h2 className="text-4xl md:text-5xl lg:text-6xl mb-4 md:mb-6 font-black text-dark uppercase tracking-tight">Recent Activities</h2>
        <p className="text-gray-600 text-lg md:text-xl font-medium">
          We are constantly working on the ground to provide support where it's needed most.
        </p>
      </FadeIn>

      <FadeIn delay={0.2}>
        <ActivitySlider activities={activities} />
      </FadeIn>

      <FadeIn delay={0.3} className="text-center mt-12 md:mt-16">
        <Link to="/projects" className="inline-flex items-center gap-3 bg-white text-dark px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition-colors shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)]">
          View all projects <ArrowRight size={20} />
        </Link>
      </FadeIn>
    </Section>
  );
};