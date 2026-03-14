import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { FileText, Image as ImageIcon, Eye } from 'lucide-react';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ newsCount: 0, galleryCount: 0, totalViews: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
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
      } catch (err) {
        console.error("Error fetching admin stats:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  if (loading) return <div>Loading dashboard...</div>;

  return (
    <div>
      <h1 className="text-3xl font-black text-dark mb-8">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-6">
          <div className="w-14 h-14 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center">
            <FileText size={24} />
          </div>
          <div>
            <div className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">Total News</div>
            <div className="text-3xl font-black text-dark">{stats.newsCount}</div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-6">
          <div className="w-14 h-14 bg-purple-50 text-purple-500 rounded-2xl flex items-center justify-center">
            <ImageIcon size={24} />
          </div>
          <div>
            <div className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">Total Gallery</div>
            <div className="text-3xl font-black text-dark">{stats.galleryCount}</div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-6">
          <div className="w-14 h-14 bg-green-50 text-green-500 rounded-2xl flex items-center justify-center">
            <Eye size={24} />
          </div>
          <div>
            <div className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">Total Views</div>
            <div className="text-3xl font-black text-dark">{stats.totalViews}</div>
          </div>
        </div>
      </div>
    </div>
  );
}