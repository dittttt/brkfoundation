import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { MainLayout } from '../layouts/MainLayout';
import { Section } from '../components/ui';
import { ChevronLeft, ChevronRight, Clock, Eye } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface PostDetailProps {
  type: 'news' | 'gallery';
}

export default function PostDetail({ type }: PostDetailProps) {
  const { slug } = useParams();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // You can extend these later to actually fetch previous/next by date
  const prevPost = { title: "Back to list", link: "/updates" };
  const nextPost = { title: "Back to list", link: "/updates" };

  useEffect(() => {
    async function fetchPost() {
      if (!slug) return;
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from(type)
          .select('*')
          .eq('slug', slug)
          .single();

        if (error) throw error;
        setPost(data);

        // Increment views asynchronously
        supabase.rpc('increment_view_count', { 
          table_type: type, 
          row_slug: slug 
        }).then();
        
      } catch (err) {
        console.error("Error fetching post details:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchPost();
  }, [slug, type]);

  if (loading) {
    return (
      <MainLayout>
        <Section bg="white">
          <div className="max-w-4xl mx-auto py-20 text-center text-gray-500">
            Loading...
          </div>
        </Section>
      </MainLayout>
    );
  }

  if (!post) {
    return (
      <MainLayout>
        <Section bg="white">
          <div className="max-w-4xl mx-auto py-20 text-center">
            <h1 className="text-3xl font-bold mb-4">Post Not Found</h1>
            <Link to="/updates" className="text-primary hover:underline">
              Return to updates
            </Link>
          </div>
        </Section>
      </MainLayout>
    );
  }

  const dateStr = new Date(post.created_at || post.published_at).toLocaleDateString();
  const getRelativeTime = (date: string | null) => {
    if (!date) return 'Recently';
    const now = new Date();
    const past = new Date(date);
    const diffInSecs = Math.floor((now.getTime() - past.getTime()) / 1000);
    const diffInMins = Math.floor(diffInSecs / 60);
    const diffInHours = Math.floor(diffInMins / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInSecs < 60) return 'Just now';
    if (diffInMins < 60) return `${diffInMins} min${diffInMins > 1 ? 's' : ''} ago`;
    if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    if (diffInDays === 1) return 'Yesterday';
    if (diffInDays <= 7) return `${diffInDays} days ago`;
    return past.toLocaleDateString();
  };

  const relativeTimeStr = getRelativeTime(post.created_at || post.published_at);
  const updatedDateStr = post.updated_at ? new Date(post.updated_at).toLocaleDateString() : dateStr;
  const yearStr = new Date(post.created_at || post.published_at).getFullYear();

  return (
    <MainLayout>
      {/* Banner Header instead of inline image */}
      <div className="relative w-full h-[50vh] min-h-[400px] bg-dark flex flex-col justify-end">
        {post.image_url && (
          <div className="absolute inset-0 z-0">
            <img
              src={post.image_url}
              alt={post.title}
              className="w-full h-full object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/40 to-transparent" />
          </div>
        )}

        {/* Banner Overlays (Like original) */}
        <div className="relative z-10 w-full max-w-4xl mx-auto px-6 pb-28">
          <div className="flex items-center gap-4">
            <span className="text-secondary text-base font-bold uppercase tracking-widest">{yearStr}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
            <span className="text-white text-base uppercase tracking-widest font-bold">{type}</span>
          </div>
        </div>
      </div>

      <Section bg="transparent" className="pt-0 -mt-16 md:-mt-20 relative z-20 pb-20">
        <div className="max-w-4xl mx-auto bg-white rounded-3xl p-8 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-gray-100">
          
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-display font-black text-gray-900 leading-tight mb-8">
            {post.title}
          </h1>

          {/* Metadata: Date, Views, Last Updated */}
          <div className="flex flex-wrap items-center justify-between gap-6 text-gray-500 text-sm font-medium mb-12 pb-6 border-b border-gray-100">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <span>Published {relativeTimeStr}</span>
              </div>
              {post.updated_at && post.updated_at !== post.created_at && (
                <div className="flex items-center gap-2">
                  <Clock size={16} />
                  <span>Updated: {updatedDateStr}</span>
                </div>
              )}
            </div>
            <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-full">
              <Eye size={16} />
              <span>{post.views || 0} views</span>
            </div>
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed font-sans mb-16">
            {type === 'news' && post.content && (
              <div dangerouslySetInnerHTML={{ __html: post.content }} className="mb-10" />
            )}
            
            {type === 'news' ? (
              <div className="space-y-10">
                {(post.images_data || []).map((block: any, idx: number) => (
                  <div key={block.id || idx}>
                    {block.type === 'text' && (
                      <div>
                         <div dangerouslySetInnerHTML={{ __html: block.content || '' }} />
                         {block.description && (
                           <p className="text-sm text-gray-400 italic mt-2 border-l-2 border-gray-200 pl-3">{block.description}</p>
                         )}
                      </div>
                    )}
                    
                    {(block.type === 'image' || block.type === 'media' || !block.type) && block.url && !block.url.includes('<iframe') && !block.url.endsWith('.mp4') && (
                      <figure className="my-8">
                        <img src={block.url} alt={block.description || ''} className="w-full rounded-2xl bg-gray-50 max-h-[700px] object-cover" referrerPolicy="no-referrer" />
                        {block.description && (
                          <figcaption className="text-center text-gray-500 font-medium italic mt-3 text-base">{block.description}</figcaption>
                        )}
                      </figure>
                    )}

                    {(block.type === 'video' || block.type === 'media') && block.url && (block.url.includes('<iframe') || block.url.endsWith('.mp4') || block.url.includes('youtube')) && (
                       <figure className="my-8">
                         {(block.url || '').includes('<iframe') ? (
                            <div dangerouslySetInnerHTML={{ __html: block.url }} className="w-full rounded-2xl overflow-hidden aspect-video shadow-md" />
                         ) : (
                            <video src={block.url} controls className="w-full rounded-2xl bg-black shadow-md aspect-video" />
                         )}
                         {block.description && (
                          <figcaption className="text-center text-gray-500 font-medium italic mt-3 text-base">{block.description}</figcaption>
                         )}
                       </figure>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              // For Legacy Gallery format handling if needed
              <>
                <p>{post.description}</p>
                {post.images_data && post.images_data.length > 0 && (
                  <div className="mt-16 space-y-12">
                    <h3 className="text-2xl font-bold border-b pb-4">Gallery</h3>
                    {post.images_data.map((img: any, idx: number) => (
                      <div key={idx} className="flex flex-col gap-4">
                        {img.url && (
                          <img
                            src={img.url}
                            alt={img.description || `Gallery image ${idx + 1}`}
                            className="w-full rounded-2xl object-cover bg-gray-50 max-h-[600px]"
                            referrerPolicy="no-referrer"
                          />
                        )}
                        {img.description && (
                          <p className="text-center text-gray-500 font-medium italic">{img.description}</p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>

          {/* Previous / Next Navigation */}
          <div className="border-t border-gray-200 pt-6">
            <div className="flex items-stretch gap-4">
              <Link
                to={prevPost.link}
                className="flex-1 flex items-center gap-3 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors group"
              >
                <ChevronLeft size={20} className="text-gray-400 group-hover:text-primary shrink-0" />
                <div className="min-w-0">
                  <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Return</div>
                  <div className="text-sm font-bold text-dark group-hover:text-primary transition-colors line-clamp-2">
                    {prevPost.title}
                  </div>
                </div>
              </Link>

              <Link
                to={nextPost.link}
                className="flex-1 flex items-center justify-end gap-3 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors group text-right"
              >
                <div className="min-w-0">
                  <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Return</div>
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
