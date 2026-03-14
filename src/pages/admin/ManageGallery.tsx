import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Plus, Edit2, Trash2, X, Save } from 'lucide-react';

export default function ManageGallery() {
  const [gallery, setGallery] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  // Form state
  const [formData, setFormData] = useState({
    title: '', slug: '', description: '', image_url: '', created_at: ''
  });

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('gallery').select('*').order('created_at', { ascending: false });
    if (!error && data) setGallery(data);
    setLoading(false);
  };

  const handleEdit = (item: any) => {
    setEditingId(item.id);
    setFormData({
      title: item.title,
      slug: item.slug,
      description: item.description || '',
      image_url: item.image_url || '',
      created_at: new Date(item.created_at).toISOString().slice(0, 16)
    });
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormData({ title: '', slug: '', description: '', image_url: '', created_at: '' });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      ...formData,
      updated_at: new Date().toISOString()
    };

    if (editingId === 'new') {
      await supabase.from('gallery').insert([payload]);
    } else {
      await supabase.from('gallery').update(payload).eq('id', editingId);
    }
    
    handleCancel();
    fetchGallery();
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this gallery item?')) {
      await supabase.from('gallery').delete().eq('id', id);
      fetchGallery();
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-black text-dark">Manage Gallery</h1>
        {!editingId && (
          <button 
            onClick={() => {
              setEditingId('new');
              setFormData({ title: '', slug: '', description: '', image_url: '', created_at: new Date().toISOString().slice(0, 16) });
            }}
            className="bg-primary text-white px-6 py-2 rounded-xl font-bold flex items-center gap-2"
          >
            <Plus size={20} /> Add Image
          </button>
        )}
      </div>

      {editingId ? (
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold mb-6">{editingId === 'new' ? 'Add Gallery Item' : 'Edit Gallery Item'}</h2>
          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold mb-1">Title</label>
                <input type="text" required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full border rounded-lg p-2" />
              </div>
              <div>
                <label className="block text-sm font-bold mb-1">Slug</label>
                <input type="text" required value={formData.slug} onChange={e => setFormData({...formData, slug: e.target.value})} className="w-full border rounded-lg p-2" />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold mb-1">Image URL</label>
                <input type="url" required value={formData.image_url} onChange={e => setFormData({...formData, image_url: e.target.value})} className="w-full border rounded-lg p-2" />
              </div>
              <div>
                <label className="block text-sm font-bold mb-1">Created Date</label>
                <input type="datetime-local" required value={formData.created_at} onChange={e => setFormData({...formData, created_at: e.target.value})} className="w-full border rounded-lg p-2" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold mb-1">Description</label>
              <textarea value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full border rounded-lg p-2" rows={4} />
            </div>

            <div className="flex gap-4 pt-4">
              <button type="button" onClick={handleCancel} className="px-6 py-2 rounded-xl font-bold bg-gray-100 text-gray-700 flex items-center gap-2">
                <X size={20} /> Cancel
              </button>
              <button type="submit" className="px-6 py-2 rounded-xl font-bold bg-primary text-white flex items-center gap-2">
                <Save size={20} /> Save Image
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="p-4 font-bold text-gray-500 w-24">Image</th>
                <th className="p-4 font-bold text-gray-500">Title</th>
                <th className="p-4 font-bold text-gray-500">Date</th>
                <th className="p-4 font-bold text-gray-500">Views</th>
                <th className="p-4 font-bold text-gray-500 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {gallery.map(item => (
                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-4">
                    <img src={item.image_url} alt={item.title} className="w-16 h-12 object-cover rounded-lg" />
                  </td>
                  <td className="p-4 font-medium text-dark">{item.title}</td>
                  <td className="p-4 text-gray-500">{new Date(item.created_at).toLocaleDateString()}</td>
                  <td className="p-4 text-gray-500">{item.views || 0}</td>
                  <td className="p-4 justify-end flex gap-2">
                    <button onClick={() => handleEdit(item)} className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"><Edit2 size={18} /></button>
                    <button onClick={() => handleDelete(item.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"><Trash2 size={18} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {gallery.length === 0 && <div className="p-8 text-center text-gray-500">No images found.</div>}
        </div>
      )}
    </div>
  );
}