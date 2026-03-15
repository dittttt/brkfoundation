import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { FileText, Image as ImageIcon, Eye, Plus, ChevronRight, Activity, TrendingUp, Clock, MousePointerClick } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ newsCount: 0, galleryCount: 0, totalViews: 0 });
  const [recentActivity, setRecentActivity] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const { count: newsCount } = await supabase.from('news').select('*', { count: 'exact', head: true });
        const { count: galleryCount } = await supabase.from('gallery').select('*', { count: 'exact', head: true });
        
        // Fetch total views
        const [newsViews, galleryViews] = await Promise.all([
          supabase.from('news').select('views'),
          supabase.from('gallery').select('views')
        ]);

        let views = 0;
        newsViews.data?.forEach(n => views += (n.views || 0));
        galleryViews.data?.forEach(g => views += (g.views || 0));

        setStats({
          newsCount: newsCount || 0,
          galleryCount: galleryCount || 0,
          totalViews: views
        });

        // Fetch recent activity (latest 3 news and latest 3 gallery, then merge)
        const [recentNews, recentGallery] = await Promise.all([
          supabase.from('news').select('id, title, created_at, views').order('created_at', { ascending: false }).limit(3),
          supabase.from('gallery').select('id, title, created_at, views').order('created_at', { ascending: false }).limit(3)
        ]);

        const combined = [
          ...(recentNews.data || []).map(n => ({ ...n, type: 'News' })),
          ...(recentGallery.data || []).map(g => ({ ...g, type: 'Gallery' }))
        ].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()).slice(0, 5);

        setRecentActivity(combined);
      } catch (err) {
        console.error("Error fetching admin stats:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) return (
    <div className="flex h-[60vh] items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto pb-20">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
        <div>
          <h1 className="text-4xl font-display font-black text-dark tracking-tight mb-2">Welcome Back!</h1>
          <p className="text-gray-500 font-medium text-lg">Here's what's happening with BRK Foundation today.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link to="/admin/news" className="bg-primary hover:bg-primary/90 text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-all shadow-sm shadow-primary/20">
            <Plus size={18} /> New Post
          </Link>
          <Link to="/admin/gallery" className="bg-white hover:bg-gray-50 text-dark border border-gray-200 px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-all">
            <ImageIcon size={18} /> Add Photos
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-7 rounded-3xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-gray-100/50 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 group-hover:scale-110 transition-all duration-500">
            <FileText size={100} />
          </div>
          <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-blue-500/20">
            <FileText size={24} />
          </div>
          <div className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">Published Posts</div>
          <div className="text-4xl font-black text-dark flex items-baseline gap-2">
            {stats.newsCount} <span className="text-sm font-medium text-green-500 flex items-center"><TrendingUp size={14} className="mr-1"/> Active</span>
          </div>
        </div>

        <div className="bg-white p-7 rounded-3xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-gray-100/50 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 group-hover:scale-110 transition-all duration-500">
            <ImageIcon size={100} />
          </div>
          <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-purple-500/20">
            <ImageIcon size={24} />
          </div>
          <div className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">Gallery Items</div>
          <div className="text-4xl font-black text-dark flex items-baseline gap-2">
            {stats.galleryCount}
          </div>
        </div>

        <div className="bg-white p-7 rounded-3xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-gray-100/50 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 group-hover:scale-110 transition-all duration-500">
            <Eye size={100} />
          </div>
          <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-green-500/20">
            <Eye size={24} />
          </div>
          <div className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">Total Impressions</div>
          <div className="text-4xl font-black text-dark flex items-baseline gap-2">
            {stats.totalViews} <span className="text-sm font-medium text-gray-400 font-normal">views</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white rounded-3xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-gray-100/50 p-7">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold flex items-center gap-2"><Activity size={20} className="text-primary" /> Recent Activity</h2>
            <Link to="/admin/news" className="text-sm font-bold text-primary hover:text-primary/80 flex items-center">View all <ChevronRight size={16}/></Link>
          </div>
          
          <div className="space-y-4">
            {recentActivity.length === 0 ? (
              <div className="text-center py-8 text-gray-400 text-sm">No activity yet.</div>
            ) : (
              recentActivity.map((item, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-gray-50/50 hover:bg-gray-50 rounded-2xl transition-colors border border-transparent hover:border-gray-100 gap-4">
                  <div className="flex items-center gap-4 min-w-0">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${item.type === 'News' ? 'bg-blue-100 text-blue-600' : 'bg-purple-100 text-purple-600'}`}>
                      {item.type === 'News' ? <FileText size={18} /> : <ImageIcon size={18} />}
                    </div>
                    <div className="min-w-0">
                      <div className="font-bold text-dark text-sm md:text-base line-clamp-1">{item.title}</div>
                      <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
                        <span className="flex items-center gap-1"><Clock size={12} /> {new Date(item.created_at).toLocaleDateString()}</span>
                        <span className="flex items-center gap-1"><Eye size={12} /> {item.views || 0} views</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-xs font-bold px-3 py-1 bg-white border border-gray-200 text-gray-600 rounded-full shrink-0">
                    {item.type}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Quick Tips */}
        <div className="bg-gradient-to-br from-dark to-gray-900 rounded-3xl p-7 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
          
          <h2 className="text-xl font-bold mb-6 relative z-10 flex items-center gap-2"><MousePointerClick size={20} className="text-primary"/> Quick Tips</h2>
          
          <div className="space-y-5 relative z-10">
            <div className="bg-white/5 border border-white/10 p-4 rounded-2xl backdrop-blur-sm">
              <div className="font-bold text-sm text-primary mb-1">Better Previews</div>
              <p className="text-xs text-gray-300 font-medium leading-relaxed">Use high resolution images for gallery items. The site automatically optimizes them for faster loading.</p>
            </div>
            <div className="bg-white/5 border border-white/10 p-4 rounded-2xl backdrop-blur-sm">
              <div className="font-bold text-sm text-blue-400 mb-1">Post Slugs</div>
              <p className="text-xs text-gray-300 font-medium leading-relaxed">The "slug" is the URL path for your post. Keep it short and use hyphens instead of spaces (e.g. food-drive-2026).</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}