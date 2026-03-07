import React from 'react';
import { Link } from 'react-router-dom';
import { MainLayout } from '../layouts/MainLayout';
import { Section } from '../components/ui';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const post = {
  title: "Feeding Program (BRGY. APAS GYM- WORLD VISION DAY)",
  year: "2025",
  date: "2025.10.12",
  images: [
    "https://picsum.photos/seed/feed1/900/600",
    "https://picsum.photos/seed/feed2/900/600",
    "https://picsum.photos/seed/feed3/900/600",
    "https://picsum.photos/seed/feed4/900/600",
    "https://picsum.photos/seed/feed5/900/600",
    "https://picsum.photos/seed/feed6/900/600",
  ]
};

const prevPost = {
  title: "Feeding Program (BRGY. APAS GYM- WORLD VISION DAY)",
  link: "/demoboard"
};

const nextPost = {
  title: "Feeding Program (BRGY. DULJO, SITIO MEKABAJA)",
  link: "/demoboard"
};

export default function PostDetail() {
  return (
    <MainLayout>
      <Section bg="white">
        <div className="max-w-4xl mx-auto">
          {/* Year & Date */}
          <div className="mb-4">
            <span className="text-primary text-sm font-bold uppercase tracking-wider">{post.year}</span>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-display font-black text-dark leading-tight mb-3">
            {post.title}
          </h1>

          {/* Exact Date */}
          <div className="text-gray-500 text-sm font-medium mb-10 pb-6 border-b border-gray-200">
            {post.date}
          </div>

          {/* Images */}
          <div className="space-y-6 mb-16">
            {post.images.map((src, idx) => (
              <img
                key={idx}
                src={src}
                alt={`${post.title} - ${idx + 1}`}
                className="w-full rounded-xl object-cover"
                referrerPolicy="no-referrer"
              />
            ))}
          </div>

          {/* Previous / Next Navigation */}
          <div className="border-t border-gray-200 pt-6">
            <div className="flex items-stretch gap-4">
              {/* Previous */}
              <Link
                to={prevPost.link}
                className="flex-1 flex items-center gap-3 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors group"
              >
                <ChevronLeft size={20} className="text-gray-400 group-hover:text-primary shrink-0" />
                <div className="min-w-0">
                  <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Previous</div>
                  <div className="text-sm font-bold text-dark group-hover:text-primary transition-colors line-clamp-2">
                    {prevPost.title}
                  </div>
                </div>
              </Link>

              {/* Next */}
              <Link
                to={nextPost.link}
                className="flex-1 flex items-center justify-end gap-3 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors group text-right"
              >
                <div className="min-w-0">
                  <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Next</div>
                  <div className="text-sm font-bold text-dark group-hover:text-primary transition-colors line-clamp-2">
                    {nextPost.title}
                  </div>
                </div>
                <ChevronRight size={20} className="text-gray-400 group-hover:text-primary shrink-0" />
              </Link>
            </div>
          </div>
        </div>
      </Section>
    </MainLayout>
  );
}
