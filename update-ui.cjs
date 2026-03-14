const fs = require('fs');
let code = fs.readFileSync('src/pages/admin/ManagePosts.tsx', 'utf8');

const returnStart = code.lastIndexOf('  return (');

if (returnStart === -1) { console.error("Could not find returnStart"); process.exit(1); }

const topUI = `  const filteredPosts = posts
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

  const years = ['All', ...Array.from(new Set(posts.map(p => new Date(p.created_at).getFullYear().toString())))].sort((a, b) => b.localeCompare(a));

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
      <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm mb-8">
        <div className="flex flex-col lg:flex-row gap-4 justify-between">
          <div className="relative flex-1 lg:max-w-md">
            <input 
              type="text" 
              placeholder="Search posts..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-slate-50 border-transparent rounded-2xl text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all font-medium text-gray-700 placeholder-gray-400"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          </div>
          
          <div className="flex flex-wrap items-center gap-3">
            <select value={filterYear} onChange={e => setFilterYear(e.target.value)} className="bg-slate-50 border-transparent py-3 px-4 rounded-2xl text-sm font-bold text-gray-700 focus:ring-2 focus:ring-blue-200 outline-none appearance-none pr-10 cursor-pointer relative">
              {years.map(y => <option key={y} value={y}>{y === 'All' ? 'All Years' : y}</option>)}
            </select>
            
            <div className="flex bg-slate-50 p-1.5 rounded-2xl">
              {['ALL', 'News', 'Gallery'].map(t => (
                <button
                  key={t}
                  onClick={() => setFilterType(t)}
                  className={\`px-4 py-1.5 rounded-xl text-sm font-bold transition-all \${filterType === t ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}\`}
                >
                  {t}
                </button>
              ))}
            </div>

            <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="bg-slate-50 border-transparent py-3 px-4 rounded-2xl text-sm font-bold text-gray-700 focus:ring-2 focus:ring-blue-200 outline-none appearance-none pr-10 cursor-pointer">
              <option value="latest">Latest</option>
              <option value="oldest">Oldest</option>
              <option value="updated">Most Updated</option>
              <option value="views">Most Views</option>
            </select>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="py-20 text-center font-bold text-gray-400">Loading posts...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredPosts.map((post) => (
            <div key={post.id} className="bg-white rounded-[2rem] p-4 border border-gray-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full group">
              
              {/* Image Block */}
              <div className="w-full aspect-[4/3] rounded-[1.5rem] relative shrink-0 bg-slate-100 overflow-hidden mb-5">
                {post.image_url ? (
                  <img src={post.image_url} alt={post.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <ImageIcon className="w-10 h-10 text-slate-300" />
                  </div>
                )}
                
                {/* Badges */}
                <div className="absolute top-4 left-4 right-4 flex justify-between items-start pointer-events-none">
                  <div className="bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest text-dark shadow-sm">
                    {post.tableType === 'news' ? 'News' : 'Gallery'}
                  </div>
                  {post.is_featured_news && post.tableType === 'news' && (
                    <div className="bg-amber-400 text-white text-[10px] font-bold px-2 py-1.5 rounded-lg shadow-sm flex items-center gap-1 uppercase tracking-wider backdrop-blur-sm">
                      <Star className="w-3 h-3 fill-current" />
                      Featured
                    </div>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-col flex-grow px-2">
                <div className="flex items-center gap-4 text-[11px] font-bold text-gray-400 mb-3 uppercase tracking-wider">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    {new Date(post.created_at).toLocaleDateString()}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Eye className="w-3.5 h-3.5" />
                    {post.views || 0}
                  </span>
                </div>

                <h3 className="text-xl font-display font-black text-gray-900 mb-4 line-clamp-2 leading-tight group-hover:text-blue-600 transition-colors">
                  {post.title}
                </h3>

                <div className="mt-auto pt-4 border-t border-gray-50 flex flex-col gap-3">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex-1 relative">
                      <select 
                        value={post.tableType || 'news'} 
                        onChange={(e) => movePostType(post, e.target.value)}
                        className="w-full appearance-none bg-gray-50 border border-gray-100 py-2 pl-3 pr-8 rounded-xl text-xs font-bold text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                      >
                        <option value="news">Type: News Post</option>
                        <option value="gallery">Type: Gallery Item</option>
                      </select>
                      <ChevronDown size={12} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400" />
                    </div>
                    {post.tableType === 'news' && (
                      <button 
                        title="Toggle Featured on homepage"
                        onClick={() => toggleFeaturedNews(post, !!post.is_featured_news)} 
                        className={\`p-2 rounded-xl border transition-all \${post.is_featured_news ? 'bg-amber-50 border-amber-200 text-amber-500' : 'bg-gray-50 border-gray-100 text-gray-400 hover:text-amber-500 hover:bg-amber-50'}\`}
                      >
                        <Star className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <button onClick={() => setEditingPost(post)} className="flex items-center justify-center p-2 text-sm font-bold text-blue-600 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors">
                      <Edit2 size={14} className="mr-1.5" /> Edit
                    </button>
                    <button onClick={() => handleDelete(post.id, post.tableType || 'news')} className="flex items-center justify-center p-2 text-sm font-bold text-red-600 bg-red-50 rounded-xl hover:bg-red-100 transition-colors">
                      <Trash2 size={14} className="mr-1.5" /> Delete
                    </button>
                  </div>
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
}`;

code = code.substring(0, returnStart) + topUI + '\n}\n';
fs.writeFileSync('src/pages/admin/ManagePosts.tsx', code);
console.log("Success");
