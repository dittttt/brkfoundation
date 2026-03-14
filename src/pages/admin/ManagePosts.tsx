import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '../../lib/supabase';
import { Plus, Edit2, Trash2, Calendar, ArrowLeft, Image as ImageIcon, Save, X, Eye, Upload, Video, Type, Star, GripVertical, ChevronDown } from 'lucide-react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
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
  const [loading, setLoading] = useState(true);
  const [editingPost, setEditingPost] = useState<NewsPost | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('news')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      const processed: NewsPost[] = (data || []).map(p => ({
        ...p,
        images_data: Array.isArray(p.images_data) 
          ? p.images_data.map((b: any) => ({
              id: b.id || Math.random().toString(36).substring(2, 9),
              type: b.type || (b.url ? 'image' : 'text'),
              ...b
            }))
          : []
      }));

      setPosts(processed);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this news post?')) return;
    try {
      const { error } = await supabase.from('news').delete().eq('id', id);
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
      views: 0,
      is_featured_news: false,
      images_data: [
        { id: Math.random().toString(36).substr(2, 9), type: 'text', content: 'Start writing your content here...', description: '' }
      ]
    };
    setEditingPost(newPost);
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

      const postData: any = {
        title: editingPost.title,
        slug: editingPost.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
        content: editingPost.content,
        created_at: validDate,
        updated_at: new Date().toISOString(),
        image_url: editingPost.image_url,
        is_featured_news: editingPost.is_featured_news || false,
        images_data: editingPost.images_data || []
      };

      if (editingPost.id) {
        const { error } = await supabase.from('news').update(postData).eq('id', editingPost.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('news').insert([postData]);
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
      alert('Error uploading image.');
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
    // Needed for Firefox
    if (e.dataTransfer) {
      e.dataTransfer.effectAllowed = "move";
      e.dataTransfer.setData('text/plain', index.toString());
    }
  };

  const handleDragEnter = (e: React.DragEvent, targetIndex: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === targetIndex) return;

    if (!editingPost) return;
    const newBlocks = [...(editingPost.images_data || [])];
    const [draggedBlock] = newBlocks.splice(draggedIndex, 1);
    newBlocks.splice(targetIndex, 0, draggedBlock);
    
    setEditingPost({ ...editingPost, images_data: newBlocks });
    setDraggedIndex(targetIndex);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault(); // Necessary to allow dropping
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDraggedIndex(null);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

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

  if (loading) return <div className="p-8 text-center text-gray-500">Loading posts...</div>;

  if (editingPost) {
    return (
      <div className="max-w-[1600px] mx-auto py-8 px-4 sm:px-6 lg:px-8">
        
        {/* Editor Toolbar */}
        <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-xl shadow-sm border border-gray-100 sticky top-4 z-20">
          <button onClick={() => setEditingPost(null)} className="flex items-center text-gray-600 hover:text-gray-900 transition-colors">
            <ArrowLeft className="w-5 h-5 mr-2" /> Back to List
          </button>
          <button onClick={handleSave} disabled={isUpdating} className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-150 disabled:opacity-50">
            <Save className="w-4 h-4 mr-2" /> {isUpdating ? 'Saving...' : 'Save Changes'}
          </button>
        </div>

        {/* Two-Column Editor & Live Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative items-start">
          
          {/* LEFT: Editor Column */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 pb-10">
            {/* Header / Cover */}
            <div className="p-6 bg-slate-50 border-b border-gray-100">
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
                  className="w-full text-2xl font-black text-gray-900 border-2 border-transparent hover:border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 rounded-xl px-4 py-3 transition-all outline-none" 
                  placeholder="Enter Post Title..." 
                />
                
                {/* Dates */}
                <div className="flex flex-col sm:flex-row gap-4 px-4">
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
                      className="border-gray-200 rounded-lg text-sm focus:ring-blue-500 focus:border-blue-500 shadow-sm px-3 py-2"
                    />
                  </div>
                  <div className="flex-1 flex flex-col gap-1">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Modified / Updated On</label>
                    <div className="bg-gray-50 border border-gray-200 rounded-lg text-sm px-3 py-2 text-gray-500 font-medium">
                      {editingPost.id ? 'Auto-updated on save' : 'Not saved yet'}
                    </div>
                  </div>
                </div>
              </div>

              <hr className="border-gray-100" />

              {/* Blocks Editor */}
              <div className="space-y-6 px-6 md:px-8 relative z-50">
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
                         layout
                         initial={{ opacity: 0, y: 20 }}
                         animate={{ opacity: 1, y: 0 }}
                         exit={{ opacity: 0, height: 0, overflow: 'hidden', margin: 0, padding: 0 }}
                         transition={{ duration: 0.2 }}
                         key={block.id}
                         onDragEnter={(e) => handleDragEnter(e, index)}
                         onDragOver={handleDragOver}
                         onDrop={handleDrop}
                         className={`relative bg-white border border-gray-200 rounded-xl pt-10 p-5 shadow-sm transition-all mb-6 w-full ${draggedIndex === index ? 'opacity-50 scale-95 border-blue-400 border-dashed' : 'hover:border-blue-300 hover:shadow-md'}`}>
                      
                      <div className="absolute top-2 right-2 flex items-center gap-2 opacity-100 z-10 bg-white p-1 rounded-lg border border-gray-100 shadow-sm cursor-grab">
                        <div draggable
                             onDragStart={(e) => handleDragStart(e, index)}
                             onDragEnd={handleDragEnd}
                             className="hover:bg-gray-100 p-1.5 rounded-md text-gray-400 active:cursor-grabbing transition-colors"
                             title="Drag to reorder">
                          <GripVertical className="w-4 h-4" />
                        </div>
                        <div className="w-px h-4 bg-gray-200"></div>
                        <button onClick={() => removeBlock(index)} className="p-1.5 hover:bg-red-50 text-gray-400 hover:text-red-500 rounded-md transition-colors" title="Delete block">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="w-full">
                        <div className="mb-4 flex items-center gap-2">
                          {block.type === 'text' && <Type className="w-4 h-4 text-blue-500" />}
                          {(block.type === 'image' || block.type === 'media' || block.type === 'video') && <ImageIcon className="w-4 h-4 text-emerald-500" />}
                        </div>

                      {block.type === 'text' && (
                        <div className="space-y-3">
                          <ReactQuill theme="snow" value={block.content || ''} onChange={(val) => updateBlock(index, 'content', val)} className="bg-white" modules={QUILL_MODULES} />
                          <input type="text" placeholder="Optional block description/notes..." value={block.description || ''} onChange={(e) => updateBlock(index, 'description', e.target.value)} className="w-full text-sm border-gray-200 rounded-md bg-slate-50 focus:border-blue-500 p-2 outline-none" />
                        </div>
                      )}

                      {(block.type === 'image' || block.type === 'video' || block.type === 'media') && (
                        <div className="space-y-3">
                          <div className="flex gap-2">
                            <input type="text" value={block.url || ''} onChange={(e) => updateBlock(index, 'url', e.target.value)} className="flex-1 text-sm border-gray-300 rounded-md focus:border-blue-500 p-2 outline-none" placeholder="Media URL (Image/Video, YouTube, MP4, etc. or upload ->)" />
                            <label className="px-4 py-2 bg-blue-50 text-blue-600 border border-blue-100 rounded-md cursor-pointer hover:bg-blue-100 flex items-center text-sm font-semibold transition-colors">
                              <Upload size={14} className="mr-1" /> Upload
                              <input type="file" className="hidden" accept="image/*,video/*" onChange={async (e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  const url = await handleImageUpload(file);
                                  if (url) updateBlock(index, 'url', url);
                                }
                              }} />
                            </label>
                          </div>
                          <textarea value={block.description || ''} onChange={(e) => updateBlock(index, 'description', e.target.value)} className="w-full border-gray-200 rounded-md text-sm bg-slate-50 focus:border-blue-500 resize-none p-2 outline-none" rows={2} placeholder="Media caption or description..." />
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
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 sticky top-24 overflow-hidden h-[calc(100vh-8rem)] flex flex-col">
            <div className="bg-slate-900 px-4 py-3 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <span className="text-slate-300 text-xs font-mono tracking-wider font-bold">Live Preview</span>
              <div className="w-10"></div>
            </div>
            
            <div className="flex-1 overflow-y-auto bg-gray-50 pointer-events-none p-0 m-0">
              
              {/* Banner Header for Preview */}
              <div className="relative w-full h-[250px] bg-slate-900 flex flex-col justify-end">
                {editingPost.image_url && (
                  <div className="absolute inset-0 z-0">
                    <img
                      src={editingPost.image_url}
                      alt={editingPost.title}
                      className="w-full h-full object-cover opacity-60"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
                  </div>
                )}

                <div className="relative z-10 w-full px-6 pb-[min(4vh,2rem)]">
                  <div className="flex items-center gap-3">
                    <span className="text-secondary text-xs font-bold uppercase tracking-widest">
                      {editingPost.created_at ? new Date(editingPost.created_at).getFullYear() : '2026'}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-secondary"></span>
                    <span className="text-white text-xs uppercase tracking-widest font-bold">news</span>
                  </div>
                </div>
              </div>

              <div className="px-4 md:px-6 pt-0 -mt-10 relative z-20 pb-20">
                <div className="bg-white rounded-3xl p-6 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-gray-100">
                  <h1 className="text-2xl md:text-3xl font-display font-black text-gray-900 leading-tight mb-6">
                    {editingPost.title || 'Untitled Post'}
                  </h1>

                  <div className="flex flex-wrap items-center justify-between gap-4 text-gray-500 text-sm font-medium mb-8 pb-5 border-b border-gray-100">
                    <div className="flex items-center gap-2">
                       <span>Published {getRelativeTime(editingPost.created_at)}</span>
                    </div>
                    <div className="flex items-center gap-2 bg-gray-50 px-2 py-1 rounded-full text-xs">
                      <Eye size={12} />
                      <span>{editingPost.views || 0} views</span>
                    </div>
                  </div>

                  <div className="prose max-w-none text-gray-700 leading-relaxed text-sm">
                    {(editingPost.images_data || []).map((block) => (
                      <div key={block.id} className="mb-8">
                        {block.type === 'text' && (
                          <div>
                            <div dangerouslySetInnerHTML={{ __html: block.content || '' }} />
                            {block.description && (
                              <p className="text-xs text-gray-400 italic mt-2 border-l-2 border-gray-200 pl-3">{block.description}</p>
                            )}
                          </div>
                        )}

                        {(block.type === 'image' || block.type === 'media' || !block.type) && block.url && !block.url.includes('<iframe') && !block.url.endsWith('.mp4') && (
                          <figure className="my-6">
                            <img src={block.url} alt={block.description || ''} className="w-full rounded-xl bg-gray-50 max-h-[400px] object-cover" />
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

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Manage Posts</h1>
          <p className="mt-2 text-sm text-gray-500">Create, edit, and organize news articles</p>
        </div>
        <button onClick={handleCreateNew} className="flex items-center px-5 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 shadow-sm font-medium cursor-pointer">
          <Plus className="w-5 h-5 mr-2" /> Create New Post
        </button>
      </div>

      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
        {posts.map((post) => (
          <div key={post.id} className="bg-white rounded-2xl shadow-sm border overflow-hidden hover:shadow-md transition-shadow group">
            <div className="flex flex-col sm:flex-row h-full">
              <div className="sm:w-48 h-48 sm:h-auto relative shrink-0 bg-slate-100">
                {post.image_url ? (
                  <img src={post.image_url} alt={post.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <ImageIcon className="w-8 h-8 text-slate-300" />
                  </div>
                )}
                {post.is_featured_news && (
                  <div className="absolute top-2 left-2 bg-amber-500 text-white text-[10px] font-bold px-2 py-1 rounded shadow-sm flex items-center gap-1 uppercase tracking-wide">
                    <Star className="w-3 h-3 fill-current" />
                    Featured
                  </div>
                )}
              </div>
              
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-4 text-xs font-medium text-gray-500 mb-3">
                  <span className="flex items-center bg-slate-100 px-2.5 py-1 rounded-md">
                    <Calendar className="w-3.5 h-3.5 mr-1.5" />
                    {new Date(post.created_at).toLocaleDateString()}
                  </span>
                  <span className="flex items-center text-slate-400">
                    <Eye className="w-3.5 h-3.5 mr-1" />
                    {post.views || 0}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 leading-tight">
                  {post.title}
                </h3>
                
                <div className="flex justify-between items-center pt-4 border-t border-gray-50 mt-auto">
                  <button onClick={() => toggleFeaturedNews(post, !!post.is_featured_news)} className="flex items-center px-3 py-1.5 text-xs font-bold rounded-full transition-colors cursor-pointer">
                    <Star className="w-3.5 h-3.5 mr-1.5" />
                    {post.is_featured_news ? 'Featured in News' : 'Make Featured'}
                  </button>
                  <div className="flex items-center gap-2">
                    <button onClick={() => setEditingPost(post)} className="flex items-center px-3 py-1.5 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 cursor-pointer">
                      <Edit2 className="w-4 h-4 mr-1.5" /> Edit
                    </button>
                    <button onClick={() => handleDelete(post.id)} className="flex items-center p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg cursor-pointer">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
