import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Plus, Edit2, Trash2, Calendar, ArrowLeft, Image as ImageIcon, GripVertical, Save, X, Eye } from 'lucide-react';

interface NewsImage {
  url: string;
  description: string;
}

interface NewsPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  created_at: string;
  image_url: string;
  views: number;
  images_data: NewsImage[];
}

export default function ManageNews() {
  const [posts, setPosts] = useState<NewsPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingPost, setEditingPost] = useState<NewsPost | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
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
      setPosts(data || []);
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
      content: 'Start writing your content here...',
      created_at: new Date().toISOString().split('T')[0],
      image_url: '',
      views: 0,
      images_data: []
    };
    setEditingPost(newPost);
  };

  const handleSave = async () => {
    if (!editingPost) return;
    setIsUpdating(true);
    try {
      const postData = {
        title: editingPost.title,
        slug: editingPost.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
        content: editingPost.content,
        created_at: new Date(editingPost.created_at).toISOString(),
        updated_at: new Date().toISOString(),
        image_url: editingPost.image_url,
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
    } catch (error) {
      console.error('Error saving post:', error);
      alert('Error saving post');
    } finally {
      setIsUpdating(false);
    }
  };

  // Drag and drop handlers for images_data
  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
    // Firefox requires setting data
    e.dataTransfer.setData('text/html', e.currentTarget.parentNode as any);
    e.dataTransfer.setDragImage(e.currentTarget.parentNode as Element, 20, 20);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (draggedIndex === null || draggedIndex === index || !editingPost) return;

    const newImages = [...(editingPost.images_data || [])];
    const draggedItem = newImages[draggedIndex];
    newImages.splice(draggedIndex, 1);
    newImages.splice(index, 0, draggedItem);
    
    setEditingPost({ ...editingPost, images_data: newImages });
    setDraggedIndex(index);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  const updateImageItem = (index: number, field: keyof NewsImage, value: string) => {
    if (!editingPost) return;
    const newImages = [...(editingPost.images_data || [])];
    newImages[index] = { ...newImages[index], [field]: value };
    setEditingPost({ ...editingPost, images_data: newImages });
  };

  const addImageItem = () => {
    if (!editingPost) return;
    const newImages = [...(editingPost.images_data || []), { url: '', description: '' }];
    setEditingPost({ ...editingPost, images_data: newImages });
  };

  const removeImageItem = (index: number) => {
    if (!editingPost) return;
    const newImages = [...(editingPost.images_data || [])];
    newImages.splice(index, 1);
    setEditingPost({ ...editingPost, images_data: newImages });
  };

  if (loading) return <div className="p-8 text-center text-gray-500">Loading news...</div>;

  if (editingPost) {
    return (
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Editor Toolbar */}
        <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-xl shadow-sm border border-gray-100 sticky top-4 z-10">
          <button 
            onClick={() => setEditingPost(null)}
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to List
          </button>
          <div className="flex gap-3">
            <button 
              onClick={handleSave}
              disabled={isUpdating}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-150 disabled:opacity-50"
            >
              <Save className="w-4 h-4 mr-2" />
              {isUpdating ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>

        {/* Preview-like Editor Area */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Main Image Header */}
          <div className="relative h-[400px] bg-slate-100 group">
            {editingPost.image_url ? (
              <img 
                src={editingPost.image_url} 
                alt="Post header cover" 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-slate-400">
                <ImageIcon className="w-16 h-16 mb-4 opacity-50" />
                <p>No featured image</p>
              </div>
            )}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <div className="bg-white p-4 rounded-xl shadow-lg w-full max-w-md mx-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Featured Image URL</label>
                <input
                  type="text"
                  value={editingPost.image_url}
                  onChange={(e) => setEditingPost({ ...editingPost, image_url: e.target.value })}
                  className="w-full border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="https://example.com/image.jpg"
                />
              </div>
            </div>
          </div>

          <div className="p-8 md:p-12">
            {/* Metadata Row */}
            <div className="flex items-center gap-6 text-gray-500 text-sm mb-6">
              <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-200">
                <Calendar className="w-4 h-4" />
                <input
                  type="date"
                  value={editingPost.created_at.split('T')[0]}
                  onChange={(e) => setEditingPost({ ...editingPost, created_at: e.target.value })}
                  className="bg-transparent border-none p-0 focus:ring-0 text-sm w-32 cursor-pointer focus:outline-none"
                />
              </div>
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4" />
                <span>{editingPost.views || 0} views</span>
              </div>
            </div>

            {/* Title */}
            <textarea
              value={editingPost.title}
              onChange={(e) => setEditingPost({ ...editingPost, title: e.target.value })}
              className="w-full text-4xl md:text-5xl font-bold text-gray-900 border-none p-0 resize-none focus:ring-0 mb-8 bg-transparent"
              rows={2}
              placeholder="Post Title..."
            />

            {/* Content */}
            <div className="prose prose-blue max-w-none mb-12">
              <textarea
                value={editingPost.content}
                onChange={(e) => setEditingPost({ ...editingPost, content: e.target.value })}
                className="w-full h-auto min-h-[300px] border-none p-0 focus:ring-0 text-lg leading-relaxed text-gray-700 resize-y bg-transparent"
                placeholder="Write the full news story here..."
              />
            </div>

            {/* Custom Gallery Builder (images_data) */}
            <div className="mt-12 pt-8 border-t border-gray-100">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Additional Gallery Images</h3>
                  <p className="text-sm text-gray-500 mt-1">Add images that will appear in the article body</p>
                </div>
                <button
                  onClick={addImageItem}
                  className="flex items-center px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors text-sm font-medium"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Image
                </button>
              </div>

              <div className="space-y-4">
                {(editingPost.images_data || []).map((img, index) => (
                  <div 
                    key={index}
                    draggable
                    onDragStart={(e) => handleDragStart(e, index)}
                    onDragOver={(e) => handleDragOver(e, index)}
                    onDragEnd={handleDragEnd}
                    className={`flex items-start gap-4 p-4 bg-white border rounded-xl transition-all ${
                      draggedIndex === index ? 'opacity-50 border-blue-400 bg-blue-50/50' : 'border-gray-200 hover:border-gray-300 shadow-sm'
                    }`}
                  >
                    <div 
                      className="mt-1 cursor-grab active:cursor-grabbing p-1 text-gray-400 hover:text-gray-600 rounded"
                    >
                      <GripVertical className="w-5 h-5" />
                    </div>
                    
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider">Image URL</label>
                        <input
                          type="text"
                          value={img.url}
                          onChange={(e) => updateImageItem(index, 'url', e.target.value)}
                          className="w-full border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm bg-slate-50"
                          placeholder="https://..."
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider">Description/Caption</label>
                        <input
                          type="text"
                          value={img.description}
                          onChange={(e) => updateImageItem(index, 'description', e.target.value)}
                          className="w-full border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm bg-slate-50"
                          placeholder="Image caption..."
                        />
                      </div>
                    </div>
                    
                    <button
                      onClick={() => removeImageItem(index)}
                      className="mt-6 p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      title="Remove image"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ))}
                {(!editingPost.images_data || editingPost.images_data.length === 0) && (
                  <div className="text-center py-10 border-2 border-dashed border-gray-200 rounded-xl bg-slate-50/50 text-gray-500">
                    <ImageIcon className="w-8 h-8 mx-auto mb-3 opacity-20" />
                    <p>No additional images added yet.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Modern List View
  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Manage News</h1>
          <p className="mt-2 text-sm text-gray-500">Create, edit, and organize news articles</p>
        </div>
        <button
          onClick={handleCreateNew}
          className="flex items-center px-5 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition duration-150 shadow-sm font-medium"
        >
          <Plus className="w-5 h-5 mr-2" />
          Create New Post
        </button>
      </div>

      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
        {posts.map((post) => (
          <div key={post.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow group">
            <div className="flex flex-col sm:flex-row h-full">
              <div className="sm:w-48 h-48 sm:h-auto relative shrink-0 bg-slate-100">
                {post.image_url ? (
                  <img src={post.image_url} alt={post.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <ImageIcon className="w-8 h-8 text-slate-300" />
                  </div>
                )}
              </div>
              
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-4 text-xs font-medium text-gray-500 mb-3">
                  <span className="flex items-center bg-slate-100 px-2.5 py-1 rounded-md">
                    <Calendar className="w-3.5 h-3.5 mr-1.5" />
                    {new Date(post.date).toLocaleDateString()}
                  </span>
                  <span className="flex items-center text-slate-400">
                    <Eye className="w-3.5 h-3.5 mr-1" />
                    {post.views || 0}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 leading-tight">
                  {post.title}
                </h3>
                
                <p className="text-gray-500 text-sm line-clamp-2 mb-6 flex-grow">
                  {post.content}
                </p>
                
                <div className="flex justify-end items-center gap-2 pt-4 border-t border-gray-50 mt-auto">
                  <button
                    onClick={() => setEditingPost(post)}
                    className="flex items-center px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                  >
                    <Edit2 className="w-4 h-4 mr-2" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(post.id)}
                    className="flex items-center p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete post"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
        {posts.length === 0 && (
          <div className="col-span-full py-20 text-center bg-white rounded-2xl border border-dashed border-gray-200">
            <div className="mx-auto w-16 h-16 bg-slate-50 flex items-center justify-center rounded-full mb-4">
              <ImageIcon className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">No news posts yet</h3>
            <p className="text-gray-500">Get started by creating your first post.</p>
          </div>
        )}
      </div>
    </div>
  );
}
