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
  const updatedDateStr = post.updated_at ? new Date(post.updated_at).toLocaleDateString() : dateStr;
  const yearStr = new Date(post.created_at || post.published_at).getFullYear();

  return (
    <MainLayout>
      <Section bg="white">
        <div className="max-w-4xl mx-auto py-10">
          {/* Year & Date */}
          <div className="mb-4 flex items-center gap-4">
            <span className="text-primary text-sm font-bold uppercase tracking-wider">{yearStr}</span>
            <span className="text-gray-400 text-sm uppercase tracking-wider font-bold">{type}</span>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-display font-black text-dark leading-tight mb-4">
            {post.title}
          </h1>

          {/* Metadata: Date, Views, Last Updated */}
          <div className="flex flex-wrap items-center gap-6 text-gray-500 text-sm font-medium mb-10 pb-6 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <span>Published: {dateStr}</span>
            </div>
            {post.updated_at && post.updated_at !== post.created_at && (
              <div className="flex items-center gap-2">
                <Clock size={16} />
                <span>Last updated: {updatedDateStr}</span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <Eye size={16} />
              <span>{post.views || 0} views</span>
            </div>
          </div>

          {/* Featured Image */}
          {post.image_url && (
            <div className="mb-10">
              <img
                src={post.image_url}
                alt={post.title}
                className="w-full rounded-xl object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          )}

          {/* Content */}
          <div className="prose max-w-none text-gray-700 leading-relaxed mb-16 text-lg">
            {type === 'news' ? (
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            ) : (
              <p>{post.description}</p>
            )}
          </div>

          {/* Additional Gallery Images */}
          {post.images_data && post.images_data.length > 0 && (
            <div className="mb-16 space-y-12">
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
