import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '../../lib/supabase';
import { getRelativeTime } from '../../lib/utils';
import { Plus, Edit2, Trash2, Calendar, ArrowLeft, Image as ImageIcon, Save, X, Eye, Upload, Video, Type, Star, GripVertical, ChevronDown, Search, ChevronLeft, ChevronRight, Share2, History } from 'lucide-react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { DropdownFilter } from '../../components/ui';
import { motion, AnimatePresence } from 'framer-motion';

interface NewsBlock {
  id: string;
  type: 'text' | 'image' | 'video' | 'media';
  content?: string;
  url?: string;
  description?: string;
}

interface NewsPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  created_at: string;
  image_url: string;
  views: number;
  is_featured_news?: boolean;
  images_data: NewsBlock[];
  tableType?: 'news' | 'gallery';
  revisions?: any[];
}

const QUILL_MODULES = {
  toolbar: [
    [{ 'header': [1, 2, 3, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    ['link', 'clean']
  ],
};

export default function ManagePosts() {
  const [posts, setPosts] = useState<NewsPost[]>([]);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showScrollArrows, setShowScrollArrows] = useState(false);

  useEffect(() => {
    const checkOverflow = () => {
      if (scrollContainerRef.current) {
        const { scrollWidth, clientWidth } = scrollContainerRef.current;
        setShowScrollArrows(scrollWidth > clientWidth);
      }
    };
    
    checkOverflow();
    window.addEventListener('resize', checkOverflow);
    const timeoutId = setTimeout(checkOverflow, 100);
    
    return () => {
      window.removeEventListener('resize', checkOverflow);
      clearTimeout(timeoutId);
    };
  }, [posts]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 200;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const [loading, setLoading] = useState(true);
  const [editingPost, setEditingPost] = useState<NewsPost | null>(null);
  const [originalPost, setOriginalPost] = useState<NewsPost | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const [filterType, setFilterType] = useState('ALL'); // ALL, news, gallery
  const [filterYear, setFilterYear] = useState('All'); 
  const [sortBy, setSortBy] = useState('latest');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const [newsRes, galleryRes] = await Promise.all([
        supabase.from('news').select('*').order('created_at', { ascending: false }),
        supabase.from('gallery').select('*').order('created_at', { ascending: false })
      ]);

      const processList = (list: any[], type: 'news' | 'gallery') => (list || []).map(p => ({
        ...p,
        tableType: type,
        images_data: Array.isArray(p.images_data) && p.images_data.length > 0   
          ? p.images_data.map((b: any) => ({
              id: b.id || Math.random().toString(36).substring(2, 9),
              type: b.type || (b.url ? 'image' : 'text'),
              ...b
            }))
          : p.content ? [
              {
                id: Math.random().toString(36).substring(2, 9),
                type: 'text',
                content: p.content
              }
            ] : []
      }));

      const processedNews = processList(newsRes.data, 'news');
      const processedGallery = processList(galleryRes.data, 'gallery');
      const combined = [...processedNews, ...processedGallery].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
      
      setPosts(combined);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const movePostType = async (post: NewsPost, newType: 'news' | 'gallery') => {
    if (!post.tableType || post.tableType === newType) return;
    if (!window.confirm(`Are you sure you want to change this post to ${newType}?`)) return;
    try {
      const { error: delErr } = await supabase.from(post.tableType).delete().eq('id', post.id);
      if (delErr) throw delErr;
      
      const { id, tableType, is_featured_news, ...rest } = post as any;
      
      const postData = {
        title: rest.title,
        slug: rest.slug,
        content: rest.content || '',
        created_at: rest.created_at,
        updated_at: new Date().toISOString(),
        image_url: rest.image_url,
        images_data: rest.images_data || [],
        views: rest.views || 0,
      };

      const { error: insErr } = await supabase.from(newType).insert([postData]);
      if (insErr) throw insErr;
      
      await fetchPosts();
    } catch (e: any) {
      alert("Error moving post type: " + e.message);
    }
  };

  const handleDelete = async (id: string, tableType?: string) => {
    const table = tableType || 'news';
    if (!window.confirm(`Are you sure you want to delete this ${table} post?`)) return;
    try {
      const { error } = await supabase.from(table).delete().eq('id', id);
      if (error) throw error;
      setPosts(posts.filter(p => p.id !== id));
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('Error deleting post');
    }
  };

  const handleCreateNew = () => {
    const newPost: NewsPost = {
      id: '',
      title: 'New Post Title',
      slug: 'new-post-title',
      content: '',
      created_at: new Date().toISOString(),
      image_url: '',
      tableType: 'news',
      views: 0,
      is_featured_news: false,
      images_data: [
          { id: Math.random().toString(36).substr(2, 9), type: 'text', content: '', description: '' }
      ]
    };
    setEditingPost(newPost);
    setOriginalPost(JSON.parse(JSON.stringify(newPost)));
  };

  const toggleFeaturedNews = async (post: NewsPost, currentValue: boolean) => {
    if (!currentValue) {
       const featuredCount = posts.filter(p => p.is_featured_news).length;
       if (featuredCount >= 3) {
          alert("You can only feature up to 3 news posts on the homepage. Please un-feature another post first.");
          return;
       }
    }
    
    try {
      const { error } = await supabase.from('news').update({ is_featured_news: !currentValue }).eq('id', post.id);
      if (error) throw error;
      setPosts(posts.map(p => p.id === post.id ? { ...p, is_featured_news: !currentValue } : p));
    } catch (err: any) {
      console.error('Error updating feature status:', err);
      alert("Failed to update feature status. Did you run the DB migration to add the 'is_featured_news' boolean column?");
    }
  };

  const handleSave = async () => {
    if (!editingPost) return;
    setIsUpdating(true);
    try {
      let validDate = new Date().toISOString();
      try {
        if (editingPost.created_at) validDate = new Date(editingPost.created_at).toISOString();
      } catch (e) {
        console.warn("Invalid date, fallback to now");
      }

      const { data: { user } } = await supabase.auth.getUser();

      const postData: any = {
        title: editingPost.title,
        slug: editingPost.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
        content: editingPost.content || '',
        created_at: validDate,
        updated_at: new Date().toISOString(),
        image_url: editingPost.image_url,
        images_data: editingPost.images_data || []
      };

      if (editingPost.id && originalPost) {
        const rev = {
          edited_at: new Date().toISOString(),
          title: originalPost.title,
          content: originalPost.content,
          image_url: originalPost.image_url,
          editor: user?.email || 'Admin'
        };
        postData.revisions = [rev, ...(editingPost.revisions || [])];
      }

      // Remove setting user_id/author_id to prevent "column not found" errors
      // if (user) {
      //   postData.user_id = user.id;
      // }

      const targetTable = editingPost.tableType || 'news';
      if (editingPost.id) {
        const { error } = await supabase.from(targetTable).update(postData).eq('id', editingPost.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from(targetTable).insert([postData]);
        if (error) throw error;
      }
      
      await fetchPosts();
      setEditingPost(null);
    } catch (error: any) {
      console.error('Error saving post:', error);
      alert('Error saving post: ' + error.message);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleImageUpload = async (file: File) => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;
      
      const { error: uploadError } = await supabase.storage
        .from('images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from('images').getPublicUrl(filePath);
      return data.publicUrl;
    } catch (error: any) {
      console.error('Upload Error:', error);
      alert('Error uploading media: ' + error.message);
      return null;
    }
  };

  const addBlock = (type: 'text' | 'image' | 'video' | 'media') => {
    if (!editingPost) return;
    const newBlock: NewsBlock = {
      id: Math.random().toString(36).substr(2, 9),
      type,
      content: '',
      url: '',
      description: ''
    };
    setEditingPost({ ...editingPost, images_data: [...(editingPost.images_data || []), newBlock] });
  };

  const removeBlock = (index: number) => {
    if (!editingPost) return;
    const newBlocks = [...(editingPost.images_data || [])];
    newBlocks.splice(index, 1);
    setEditingPost({ ...editingPost, images_data: newBlocks });
  };

  const updateBlock = (index: number, field: keyof NewsBlock, value: any) => {
    if (!editingPost) return;
    const blocks = [...(editingPost.images_data || [])];
    blocks[index] = { ...blocks[index], [field]: value };
    setEditingPost({ ...editingPost, images_data: blocks });
  };

  
  
  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    if (e.dataTransfer) {
      e.dataTransfer.effectAllowed = "move";
      e.dataTransfer.setData('text/plain', index.toString());
    }
  };

  const handleDragEnter = (e: React.DragEvent, targetIndex: number) => {
    e.preventDefault();
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault(); // Necessary to allow dropping
  };

  const handleDrop = (e: React.DragEvent, targetIndex: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === targetIndex) {
        setDraggedIndex(null);
        return;
    }
    if (!editingPost) return;
    const newBlocks = [...(editingPost.images_data || [])];
    const [draggedBlock] = newBlocks.splice(draggedIndex, 1);
    newBlocks.splice(targetIndex, 0, draggedBlock);

    setEditingPost({ ...editingPost, images_data: newBlocks });
    setDraggedIndex(null);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  if (loading) return <div className="p-8 text-center text-gray-500">Loading posts...</div>;

  if (editingPost) {
    const hasChanges = JSON.stringify(editingPost) !== JSON.stringify(originalPost);

    return (
      <div className="max-w-[1600px] mx-auto py-8 px-4 sm:px-6 lg:px-8">
        
        {/* Editor Toolbar - Note: Removed sticky class as requested */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center mb-6 bg-white p-4 rounded-xl shadow-sm border border-gray-100 z-50">
            <button onClick={() => { setEditingPost(null); setOriginalPost(null); }} className="inline-flex items-center gap-2 text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.1)] px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider cursor-pointer transition-all">
              <ChevronLeft size={16} /> Back to List
          </button>
          <button onClick={handleSave} disabled={isUpdating || !hasChanges} className="flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 shadow-md font-bold cursor-pointer transition-all active:scale-95 disabled:opacity-50 w-full sm:w-auto">
            <Save className="w-5 h-5 mr-2" /> {isUpdating ? 'Saving...' : 'Save Changes'}
          </button>
        </div>

        {/* Two-Column Editor & Live Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative items-stretch">

          {/* LEFT: Editor Column */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 pb-10 flex flex-col h-full">
            {/* Header / Cover */}
            <div className="p-6 md:p-8 bg-slate-50 border-b border-gray-100">
              <label className="block text-sm font-bold text-gray-700 mb-2">Cover Image</label>
              <div className="flex items-center gap-2 border-2 border-dashed border-gray-300 p-2 rounded-xl bg-white focus-within:border-blue-500 focus-within:bg-blue-50 transition-colors">
                <input type="text" value={editingPost.image_url} onChange={(e) => setEditingPost({ ...editingPost, image_url: e.target.value })} className="flex-1 w-full bg-transparent border-none shadow-none focus:ring-0 text-sm px-2 py-1 outline-none" placeholder="Paste image URL here or upload right ->" />
                <label className="p-2 bg-gray-100 text-gray-600 rounded-lg cursor-pointer hover:bg-blue-100 hover:text-blue-600 transition flex items-center justify-center" title="Upload cover image">
                  <Upload size={18} />
                  <input type="file" className="hidden" accept="image/*" onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const url = await handleImageUpload(file);
                      if (url) setEditingPost({ ...editingPost, image_url: url });
                    }
                  }} />
                </label>
              </div>
            </div>

            <div className="p-6 md:p-8 space-y-6">
              {/* Title & Metadata */}
              <div className="space-y-4">
                <input
                  type="text"
                  value={editingPost.title}
                  onChange={(e) => setEditingPost({ ...editingPost, title: e.target.value })}
                  className="w-full text-2xl font-black text-gray-900 border-2 border-gray-200 focus:border-gray-300 focus:ring-0 focus:outline-none rounded-xl px-4 py-3 transition-all"
                  placeholder="Enter Post Title..."
                />

                {/* Dates */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1 flex flex-col gap-1">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Published On</label>
                    <input 
                      type="date" 
                      value={editingPost.created_at ? new Date(editingPost.created_at).toISOString().split('T')[0] : ''}
                      onChange={(e) => {
                        if (e.target.value) {
                          setEditingPost({ ...editingPost, created_at: new Date(e.target.value).toISOString() });
                        }
                      }}
                      className="w-full text-sm font-semibold text-gray-900 border-2 border-gray-200 focus:border-gray-300 focus:ring-0 focus:outline-none rounded-xl px-4 py-3 transition-all bg-white"
                    />
                  </div>
                  <div className="flex-1 flex flex-col gap-1">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Modified / Updated On</label>
                    <div className="w-full text-sm font-semibold text-gray-500 border-2 border-gray-200 rounded-xl px-4 py-3 transition-all bg-gray-50 truncate text-center sm:text-left">
                      {editingPost.id ? (
                        <>
                          <span className="hidden lg:inline">Auto-updated on save</span>
                          <span className="lg:hidden">Auto</span>
                        </>
                      ) : (
                        'Not saved'
                      )}
                    </div>
                  </div>
                </div>

                {/* Post Type */}
                <div className="flex flex-col gap-1 mt-4">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Post Type</label>
                  <DropdownFilter
                    value={editingPost.tableType || 'news'}
                    onChange={(val) => setEditingPost({ ...editingPost, tableType: val as 'news' | 'gallery' })}
                    options={[
                      { value: 'news', label: 'News Post' },
                      { value: 'gallery', label: 'Gallery Item' }
                    ]}
                    className="w-full"
                    buttonClassName="w-full text-sm font-semibold text-gray-900 border-2 border-gray-200 focus:border-gray-300 focus:ring-0 focus:outline-none rounded-xl px-4 py-3 transition-all bg-white"
                  />
                </div>
              </div>

              <hr className="border-gray-100" />

              {/* Blocks Editor */}
              <div className="space-y-6 relative z-50">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">Content Blocks</h3>
                  <div className="relative z-50">
                    <button onClick={() => setDropdownOpen(!dropdownOpen)} className="w-8 h-8 flex items-center justify-center bg-blue-600 text-white rounded-full hover:bg-blue-700 shadow-sm transition-transform active:scale-95">
                      <Plus className="w-5 h-5" />
                    </button>
                    <AnimatePresence>
                      {dropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -10, scale: 0.95 }}
                          className="absolute right-0 mt-2 w-48 bg-white border border-gray-100 shadow-xl rounded-xl overflow-hidden z-[100]"
                        >
                          <div className="p-1">
                            <button onClick={() => { addBlock('text'); setDropdownOpen(false); }} className="w-full text-left px-4 py-2 text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-lg flex items-center">
                              <Type className="w-4 h-4 mr-2" /> Text Block
                            </button>
                            <button onClick={() => { addBlock('media'); setDropdownOpen(false); }} className="w-full text-left px-4 py-2 text-sm font-medium text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 rounded-lg flex items-center mt-1">
                              <ImageIcon className="w-4 h-4 mr-2" /> Media (Image/Video)
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
                
                <AnimatePresence>
                  {(editingPost.images_data || []).map((block, index) => (
                    <motion.div
                         initial={{ opacity: 0, y: 20 }}
                         animate={{ opacity: 1, y: 0 }}
                         exit={{ opacity: 0, height: 0, overflow: 'hidden', margin: 0, padding: 0 }}
                         transition={{ duration: 0.2 }}
                         key={block.id}
                         onDragEnter={(e) => handleDragEnter(e, index)}
                         onDragOver={handleDragOver}
                         onDrop={(e) => handleDrop(e, index)}
                         className={`relative bg-white border border-gray-200 rounded-xl p-5 shadow-sm transition-all mb-6 w-full ${draggedIndex === index ? 'opacity-50 scale-95 border-blue-400 border-dashed' : 'hover:border-blue-300 hover:shadow-md'}`}>

                      <div className="w-full">
                        <div className="mb-4 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            {block.type === 'text' && <Type className="w-4 h-4 text-blue-500" />}
                            {(block.type === 'image' || block.type === 'media' || block.type === 'video') && <ImageIcon className="w-4 h-4 text-emerald-500" />}
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                              {block.type === 'media' ? 'Media' : block.type}
                            </span>
                          </div>
                          
                          <div className="flex items-center gap-2 opacity-100 z-10 bg-white p-1 rounded-lg border border-gray-100 shadow-sm">
                            <div draggable
                                 onDragStart={(e) => handleDragStart(e, index)}
                                 onDragEnd={handleDragEnd}
                                 className="hover:bg-gray-100 p-1.5 rounded-md text-gray-400 active:cursor-grabbing transition-colors cursor-grab"
                                 title="Drag to reorder">
                              <GripVertical className="w-4 h-4" />
                            </div>
                            <div className="w-px h-4 bg-gray-200"></div>
                            <button onClick={() => removeBlock(index)} className="p-1.5 hover:bg-red-50 text-gray-400 hover:text-red-500 rounded-md transition-colors" title="Delete block">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                      {block.type === 'text' && (
                        <div className="space-y-3">
                          <div className="text-sm sm:text-base">
                            <ReactQuill theme="snow" value={block.content || ''} onChange={(val) => updateBlock(index, 'content', val)} className="bg-white ql-text-sm" modules={QUILL_MODULES} />
                          </div>
                          <input type="text" placeholder="Optional block description/notes..." value={block.description || ''} onChange={(e) => updateBlock(index, 'description', e.target.value)} className="w-full text-sm border-gray-200 rounded-md bg-slate-50 focus:border-blue-500 p-2 outline-none" />
                        </div>
                      )}

                      {(block.type === 'image' || block.type === 'video' || block.type === 'media') && (
                        <div className="space-y-3">
                          <div className="flex items-center gap-2 border-2 border-dashed border-gray-300 p-2 rounded-xl bg-white focus-within:border-gray-400 focus-within:bg-gray-50 transition-colors">
                            <input type="text" value={block.url || ''} onChange={(e) => updateBlock(index, 'url', e.target.value)} className="flex-1 w-full bg-transparent border-none shadow-none focus:ring-0 text-sm px-2 py-1 outline-none" placeholder="Media URL (Image/Video, YouTube, MP4, etc. or upload right ->)" />
                            <label className="p-2 bg-gray-100 text-gray-600 rounded-lg cursor-pointer hover:bg-gray-200 hover:text-gray-900 transition flex items-center justify-center text-sm font-semibold" title="Upload media">
                              <Upload size={16} className="mr-1" /> Upload
                              <input type="file" className="hidden" accept="image/*,video/*" onChange={async (e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  const url = await handleImageUpload(file);
                                  if (url) updateBlock(index, 'url', url);
                                }
                              }} />
                            </label>
                          </div>
                          <input type="text" value={block.description || ''} onChange={(e) => updateBlock(index, 'description', e.target.value)} className="w-full text-sm border-gray-200 rounded-md bg-slate-50 focus:border-blue-500 p-2 outline-none" placeholder="Media caption or description..." />
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* RIGHT: Live Preview Column */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 flex flex-col h-full overflow-hidden">
            <div className="bg-slate-900 px-4 py-3 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <span className="text-slate-300 text-xs font-mono tracking-wider font-bold">Live Preview</span>
              <div className="w-10"></div>
            </div>

            <div className="flex-1 bg-gray-50 pointer-events-none p-0 m-0">
              {/* Banner Header for Preview */}
              <div className="relative w-full h-[30vh] min-h-[250px] md:aspect-[21/9] md:h-auto bg-dark flex flex-col justify-end overflow-hidden">
                {editingPost.image_url && (
                  <div className="absolute inset-0 z-0">
                    <img
                      src={editingPost.image_url}
                      alt={editingPost.title}
                      className="w-full h-full object-cover opacity-60"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/40 to-transparent" />
                  </div>
                )}

                <div className="relative z-10 w-full px-6 md:px-12 pb-20">
                  <div className="flex items-center gap-3">
                    <span className="text-secondary text-xs font-bold uppercase tracking-widest">
                      {editingPost.created_at ? new Date(editingPost.created_at).getFullYear() : '2026'}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-secondary"></span>
                    <span className="text-white text-xs uppercase tracking-widest font-bold">news</span>
                  </div>
                </div>
              </div>

              <div className="px-4 md:px-6 pt-0 -mt-12 relative z-20 pb-20">
                <div className="bg-white rounded-3xl p-6 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-gray-100">
                  <h1 className="text-2xl sm:text-3xl md:text-4xl font-display font-black text-gray-900 leading-tight mb-4 md:mb-6">
                    {editingPost.title || 'Untitled Post'}
                  </h1>

                  <div className="flex flex-wrap items-center justify-between gap-4 text-gray-500 text-sm font-medium mb-8 pb-5 border-b border-gray-100">
                    <div className="flex items-center gap-2">
                       <span>{getRelativeTime(editingPost.created_at)}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <button className="flex items-center gap-1.5 text-gray-400 hover:text-blue-600 transition-colors pointer-events-auto">
                        <Share2 size={14} />
                        <span>Share</span>
                      </button>
                      <div className="flex items-center gap-1.5 bg-gray-50 px-2 py-1 rounded-full text-xs">
                        <Eye size={12} />
                        <span>{editingPost.views || 0} views</span>
                      </div>
                    </div>
                  </div>

                    <div className="prose max-w-none prose-a:text-blue-600 text-gray-700 leading-[1.5] text-sm md:text-base">
                      {(editingPost.images_data || []).map((block) => (
                        <div key={block.id} className="mb-8">
                          {block.type === 'text' && (
                            <div className="not-prose pb-2">
                              <div className="ql-container ql-snow preview-quill">
                                <div className="ql-editor" dangerouslySetInnerHTML={{ __html: block.content || '' }} />
                              </div>
                            {block.description && (
                              <p className="text-xs text-gray-400 italic mt-2 border-l-2 border-gray-200 pl-3">{block.description}</p>
                            )}
                          </div>
                        )}

                        {(block.type === 'image' || block.type === 'media' || !block.type) && block.url && !block.url.includes('<iframe') && !block.url.endsWith('.mp4') && (
                          <figure className="my-6">
                              <img src={block.url} alt={block.description || ''} className="w-full rounded-xl bg-gray-50 aspect-[16/9] object-cover" />
                              {block.description && (
                                <figcaption className="text-center text-gray-500 font-medium italic mt-2 text-xs">{block.description}</figcaption>
                              )}
                          </figure>
                        )}

                        {(block.type === 'video' || block.type === 'media') && block.url && (block.url.includes('<iframe') || block.url.endsWith('.mp4') || block.url.includes('youtube')) && (
                          <figure className="my-6">
                            {(block.url || '').includes('<iframe') ? (
                                <div dangerouslySetInnerHTML={{ __html: block.url }} className="w-full rounded-xl overflow-hidden aspect-video shadow-md" />
                            ) : (
                                <video src={block.url} controls className="w-full rounded-xl bg-black shadow-md aspect-video" />
                            )}
                            {block.description && (
                              <figcaption className="text-center text-gray-500 font-medium italic mt-2 text-xs">{block.description}</figcaption>
                            )}
                          </figure>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const filteredPosts = posts
    .filter(p => {
      let match = true;
      if (searchQuery && !p.title.toLowerCase().includes(searchQuery.toLowerCase())) match = false;
      if (filterType !== 'ALL' && p.tableType !== filterType.toLowerCase()) match = false;
      if (filterYear !== 'All') {
        const year = new Date(p.created_at).getFullYear().toString();
        if (year !== filterYear) match = false;
      }
      return match;
    })
    .sort((a, b) => {
      if (sortBy === 'latest') return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      if (sortBy === 'oldest') return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
      if (sortBy === 'updated') return new Date(b.updated_at || b.created_at).getTime() - new Date(a.updated_at || a.created_at).getTime();
      if (sortBy === 'views') return (b.views || 0) - (a.views || 0);
      return 0;
    });

  const years = ['All', ...Array.from(new Set(posts.map(p => new Date(p.created_at).getFullYear().toString())))].sort((a: any, b: any) => b.localeCompare(a));

  return (
    <div className="max-w-[90rem] mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <h1 className="text-4xl font-display font-black text-gray-900 mb-2">Manage Posts</h1>    
          <p className="text-gray-500 font-medium">Create, edit, and organize posts and gallery items.</p>
        </div>
        <button onClick={handleCreateNew} className="flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 shadow-md font-bold cursor-pointer transition-all active:scale-95 w-full md:w-auto">
          <Plus className="w-5 h-5 mr-2" /> Create New Post
        </button>
      </div>

      {/* Filters and Search */}
      <div className="bg-white p-4 sm:p-5 rounded-3xl border border-gray-100 shadow-sm mb-8 flex flex-col lg:flex-row flex-wrap gap-4 items-center w-full">
        {/* Search */}
        <div className="flex items-center w-full lg:w-[300px] shrink-0 bg-slate-50 rounded-2xl overflow-hidden border border-transparent transition-all h-12">
          <div className="pl-4 pr-2 flex items-center justify-center text-gray-400">
            <Search size={18} />
          </div>
          <input
            type="text"
            placeholder="Search posts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full py-3 pr-4 bg-transparent border-none focus:ring-0 focus:outline-none text-sm font-medium text-gray-700 placeholder-gray-400 h-full"
          />
        </div>

        {/* Type Filter */}
        <div className="flex flex-wrap lg:flex-nowrap bg-slate-50 p-1.5 rounded-2xl w-full lg:w-auto h-auto min-h-[48px] shrink-0 gap-1">
          {['ALL', 'News', 'Gallery'].map(t => (
            <button
              key={t}
              onClick={() => setFilterType(t)}
              className={`flex-1 md:flex-none px-3 md:px-4 py-1.5 rounded-xl text-xs md:text-sm font-bold transition-all whitespace-nowrap ${filterType === t ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Year Filter */}
        <div className="flex bg-slate-50 p-1.5 rounded-2xl w-full lg:flex-1 overflow-x-auto h-12" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          <style>{`
            div::-webkit-scrollbar {
              display: none;
            }
          `}</style>
          {years.map((year) => (
            <button
              key={year}
              onClick={() => setFilterYear(year)}
              className={`px-4 py-1.5 rounded-xl text-sm font-bold transition-all whitespace-nowrap shrink-0 ${
                filterYear === year
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {year === 'All' ? 'All Years' : year}
            </button>
          ))}
        </div>

        <div className="w-full lg:w-48 shrink-0 h-12 relative z-40">
          <DropdownFilter
            value={sortBy}
            onChange={setSortBy}
            options={[
              { value: 'latest', label: 'Latest' },
              { value: 'oldest', label: 'Oldest' },
              { value: 'updated', label: 'Updated' },
              { value: 'views', label: 'Popular' }
            ]}
          />
        </div>
      </div>

      {loading ? (
        <div className="py-20 text-center font-bold text-gray-400">Loading posts...</div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-6">
          {filteredPosts.map((post) => (
            <div key={post.id} className="bg-white rounded-2xl md:rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 h-full flex flex-col group relative">

              {/* Image Block */}
              <div className="relative overflow-hidden aspect-[16/10]">
                {post.image_url ? (
                  <img src={post.image_url} alt={post.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-slate-100">
                    <ImageIcon className="w-8 h-8 sm:w-10 sm:h-10 text-slate-300" />
                  </div>
                )}

                {/* Badges */}
                <div className="absolute top-2 left-2 sm:top-4 sm:left-4 z-10 flex flex-col gap-2 pointer-events-none">
                  <div className="bg-white/90 backdrop-blur-sm px-2 py-1 sm:px-4 sm:py-2 rounded-md sm:rounded-lg text-[10px] sm:text-xs font-black uppercase tracking-wide shadow-sm text-dark self-start">
                    {post.tableType === 'news' ? 'News' : 'Gallery'}
                  </div>
                  {post.is_featured_news && post.tableType === 'news' && (
                    <div className="bg-amber-400 text-white text-[10px] sm:text-xs font-bold px-2 py-1 sm:px-4 sm:py-2 rounded-md sm:rounded-lg shadow-sm flex items-center gap-1 uppercase tracking-wide backdrop-blur-sm self-start">
                      <Star className="w-3 h-3 fill-current" /> Featured
                    </div>
                  )}
                </div>

                <div className="absolute top-2 right-2 sm:top-4 sm:right-4 z-10">
                  <div className="bg-black/60 text-white text-[10px] sm:text-xs font-bold px-2 py-1 sm:px-3 sm:py-1.5 rounded-md sm:rounded-lg shadow-sm flex items-center gap-1.5 backdrop-blur-sm pr-3">
                    <Eye size={12} /> {post.views || 0}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-4 sm:p-6 flex flex-col flex-grow bg-white relative z-0">
                <div className="text-primary text-[10px] sm:text-sm font-bold mb-2 sm:mb-3 uppercase tracking-wide flex justify-between items-center group-hover:text-blue-600 transition-colors">
                  <span>{new Date(post.created_at).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' })}</span>
                  {post.revisions && post.revisions.length > 0 && (
                    <span className="text-gray-400 font-medium lowercase flex items-center gap-1"><History size={12}/> {post.revisions.length} rev</span>
                  )}
                </div>

                <h3 className="text-sm sm:text-base md:text-lg font-bold text-dark leading-tight line-clamp-2 mb-4 group-hover:text-primary transition-colors">
                  {post.title}
                </h3>

                <div className="mt-auto grid grid-cols-2 gap-2 pt-4 border-t border-gray-50">
                    <button onClick={() => { setEditingPost(post); setOriginalPost(JSON.parse(JSON.stringify(post))); }} className="flex items-center justify-center p-2 text-sm font-bold text-blue-600 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors">
                    <Edit2 size={14} className="mr-1.5" /> Edit
                  </button>
                  <button onClick={() => handleDelete(post.id, post.tableType || 'news')} className="flex items-center justify-center p-2 text-sm font-bold text-red-600 bg-red-50 rounded-xl hover:bg-red-100 transition-colors">
                    <Trash2 size={14} className="mr-1.5" /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
          {filteredPosts.length === 0 && (
            <div className="col-span-full py-16 text-center text-gray-500 bg-white rounded-3xl border border-gray-100">
              No posts found.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
