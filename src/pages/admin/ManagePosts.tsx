import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Plus, Edit2, Trash2, Calendar, ArrowLeft, Image as ImageIcon, Save, X, Eye, Upload, ArrowUp, ArrowDown, Video, Type, Star } from 'lucide-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface NewsBlock {
  id: string;
  type: 'text' | 'image' | 'video';
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

export default function ManagePosts() {
  const [posts, setPosts] = useState<NewsPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingPost, setEditingPost] = useState<NewsPost | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);

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

  const addBlock = (type: 'text' | 'image' | 'video') => {
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

  const moveBlock = (index: number, direction: 'up' | 'down') => {
    if (!editingPost) return;
    const blocks = [...(editingPost.images_data || [])];
    if (direction === 'up' && index > 0) {
      [blocks[index - 1], blocks[index]] = [blocks[index], blocks[index - 1]];
    } else if (direction === 'down' && index < blocks.length - 1) {
      [blocks[index + 1], blocks[index]] = [blocks[index], blocks[index + 1]];
    }
    setEditingPost({ ...editingPost, images_data: blocks });
  };

  const updateBlock = (index: number, field: keyof NewsBlock, value: any) => {
    if (!editingPost) return;
    const blocks = [...(editingPost.images_data || [])];
    blocks[index] = { ...blocks[index], [field]: value };
    setEditingPost({ ...editingPost, images_data: blocks });
  };

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['link', 'clean']
    ],
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
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            {/* Header / Cover */}
            <div className="p-6 space-y-4 bg-slate-50 border-b border-gray-100">
              <label className="block text-sm font-bold text-gray-700">Cover Image URL</label>
              <div className="flex gap-2">
                <input type="text" value={editingPost.image_url} onChange={(e) => setEditingPost({ ...editingPost, image_url: e.target.value })} className="flex-1 w-full border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm" placeholder="Paste image URL here..." />
                <label className="px-4 py-2 bg-white border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 text-sm font-medium flex items-center">
                  <Upload className="w-4 h-4 mr-2" /> Upload
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
              <div>
                <textarea value={editingPost.title} onChange={(e) => setEditingPost({ ...editingPost, title: e.target.value })} className="w-full text-3xl font-bold text-gray-900 border-none p-0 resize-none focus:ring-0 bg-transparent outline-none m-0 focus:outline-none" rows={2} placeholder="Post Title..." />
              </div>

              <hr className="border-gray-100" />

              {/* Blocks Editor */}
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">Content Blocks</h3>
                
                {(editingPost.images_data || []).map((block, index) => (
                  <div key={block.id} className="relative bg-white border border-gray-200 rounded-xl p-4 shadow-sm group transition-all hover:border-blue-300">
                    <div className="absolute -left-3 top-4 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                      <button onClick={() => moveBlock(index, 'up')} disabled={index === 0} className="w-6 h-6 bg-white border shadow-sm rounded-full flex items-center justify-center text-gray-500 hover:text-blue-600 disabled:opacity-30"><ArrowUp className="w-3 h-3" /></button>
                      <button onClick={() => moveBlock(index, 'down')} disabled={index === editingPost.images_data.length - 1} className="w-6 h-6 bg-white border shadow-sm rounded-full flex items-center justify-center text-gray-500 hover:text-blue-600 disabled:opacity-30"><ArrowDown className="w-3 h-3" /></button>
                      <button onClick={() => removeBlock(index)} className="w-6 h-6 bg-white border shadow-sm rounded-full flex items-center justify-center text-red-500 hover:bg-red-50 disabled:opacity-30 mt-2"><Trash2 className="w-3 h-3" /></button>
                    </div>

                    <div className="ml-2">
                      <div className="mb-2 flex items-center gap-2">
                        {block.type === 'text' && <Type className="w-4 h-4 text-blue-500" />}
                        {block.type === 'image' && <ImageIcon className="w-4 h-4 text-emerald-500" />}
                        {block.type === 'video' && <Video className="w-4 h-4 text-purple-500" />}
                        <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">{block.type} Block</span>
                      </div>

                      {block.type === 'text' && (
                        <div className="space-y-3">
                          <ReactQuill theme="snow" value={block.content || ''} onChange={(val) => updateBlock(index, 'content', val)} className="bg-white" modules={modules} />
                          <input type="text" placeholder="Optional block description/notes..." value={block.description || ''} onChange={(e) => updateBlock(index, 'description', e.target.value)} className="w-full text-sm border-gray-200 rounded-md bg-slate-50 focus:border-blue-500 p-2 outline-none" />
                        </div>
                      )}

                      {block.type === 'image' && (
                        <div className="space-y-3">
                          <div className="flex gap-2">
                            <input type="text" value={block.url || ''} onChange={(e) => updateBlock(index, 'url', e.target.value)} className="flex-1 text-sm border-gray-300 rounded-md focus:border-blue-500 p-2 outline-none" placeholder="Image URL (or upload ->)" />
                            <label className="px-3 py-2 bg-slate-100 border border-gray-200 rounded-md cursor-pointer hover:bg-slate-200 flex items-center text-sm">
                              <Upload size={14} className="mr-1" /> Upload
                              <input type="file" className="hidden" accept="image/*" onChange={async (e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  const url = await handleImageUpload(file);
                                  if (url) updateBlock(index, 'url', url);
                                }
                              }} />
                            </label>
                          </div>
                          <textarea value={block.description || ''} onChange={(e) => updateBlock(index, 'description', e.target.value)} className="w-full border-gray-200 rounded-md text-sm bg-slate-50 focus:border-blue-500 resize-none p-2 outline-none" rows={2} placeholder="Image caption or description..." />
                        </div>
                      )}

                      {block.type === 'video' && (
                        <div className="space-y-3">
                          <input type="text" value={block.url || ''} onChange={(e) => updateBlock(index, 'url', e.target.value)} className="w-full text-sm border-gray-300 rounded-md p-2 outline-none" placeholder="Video URL (YouTube embed link, mp4, etc.)" />
                          <textarea value={block.description || ''} onChange={(e) => updateBlock(index, 'description', e.target.value)} className="w-full border-gray-200 rounded-md text-sm bg-slate-50 p-2 outline-none resize-none" rows={2} placeholder="Video caption or description..." />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                
                <div className="flex items-center gap-3 pt-4 justify-center">
                  <span className="text-sm text-gray-500 font-medium">Add Block:</span>
                  <button onClick={() => addBlock('text')} className="flex items-center px-4 py-2 bg-blue-50 text-blue-700 rounded-full hover:bg-blue-100 text-sm font-medium"><Type className="w-4 h-4 mr-1.5" /> Text</button>
                  <button onClick={() => addBlock('image')} className="flex items-center px-4 py-2 bg-emerald-50 text-emerald-700 rounded-full hover:bg-emerald-100 text-sm font-medium"><ImageIcon className="w-4 h-4 mr-1.5" /> Image</button>
                  <button onClick={() => addBlock('video')} className="flex items-center px-4 py-2 bg-purple-50 text-purple-700 rounded-full hover:bg-purple-100 text-sm font-medium"><Video className="w-4 h-4 mr-1.5" /> Video</button>
                </div>
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
            
            <div className="flex-1 overflow-y-auto bg-white p-6 md:p-10 pointer-events-none pb-20">
              <div className="max-w-3xl mx-auto">
                <div className="mb-4 flex items-center gap-4">
                  <span className="text-blue-600 text-sm font-bold uppercase tracking-wider">
                    {editingPost.created_at ? new Date(editingPost.created_at).getFullYear() : '2024'}
                  </span>
                  <span className="text-gray-400 text-sm uppercase tracking-wider font-bold">news</span>
                </div>

                <h1 className="text-3xl md:text-4xl font-black text-gray-900 leading-tight mb-4">
                  {editingPost.title || 'Untitled Post'}
                </h1>

                <div className="flex flex-wrap items-center gap-6 text-gray-500 text-sm font-medium mb-10 pb-6 border-b border-gray-200">
                  <div className="flex items-center gap-2">
                    <span>Published: {editingPost.created_at ? new Date(editingPost.created_at).toLocaleDateString() : 'Draft'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Eye size={16} />
                    <span>{editingPost.views || 0} views</span>
                  </div>
                </div>

                {editingPost.image_url && (
                  <div className="mb-10">
                    <img src={editingPost.image_url} alt="Cover" className="w-full rounded-xl object-cover max-h-[500px]" />
                  </div>
                )}

                <div className="prose max-w-none text-gray-700 leading-relaxed text-lg">
                  {(editingPost.images_data || []).map((block) => (
                    <div key={block.id} className="mb-10">
                      {block.type === 'text' && (
                        <div>
                           <div dangerouslySetInnerHTML={{ __html: block.content || '' }} />
                           {block.description && (
                             <p className="text-sm text-gray-400 italic mt-2 border-l-2 border-gray-200 pl-3">{block.description}</p>
                           )}
                        </div>
                      )}
                      
                      {block.type === 'image' && block.url && (
                        <figure className="my-6">
                          <img src={block.url} alt={block.description || ''} className="w-full rounded-xl bg-gray-50 max-h-[600px] object-cover" />
                          {block.description && (
                            <figcaption className="text-center text-gray-500 font-medium italic mt-3 text-base">{block.description}</figcaption>
                          )}
                        </figure>
                      )}

                      {block.type === 'video' && block.url && (
                         <figure className="my-6">
                           {(block.url || '').includes('<iframe') ? (
                              <div dangerouslySetInnerHTML={{ __html: block.url }} className="w-full rounded-xl overflow-hidden aspect-video" />
                           ) : (
                              <video src={block.url} controls className="w-full rounded-xl bg-black" />
                           )}
                           {block.description && (
                            <figcaption className="text-center text-gray-500 font-medium italic mt-3 text-base">{block.description}</figcaption>
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
