import re

with open("ManagePosts.tsx", "r", encoding="utf-8") as f:
    text = f.read()

# Locate standard filteredPosts map block using regex
pattern = re.compile(r"\{\s*filteredPosts\.map\(\(post\)\s*=>\s*\(\s*<div key=\{post\.id\}\s+className=\"bg-white rounded-xl.*?</div>\s*\)\)\s*\}", re.DOTALL)

new_cards = """{filteredPosts.map((post) => (
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
          ))}"""

res = pattern.sub(new_cards, text)
if text != res:
    with open("ManagePosts.tsx", "w", encoding="utf-8") as f:
        f.write(res)
    print("Replaced Cards!")
else:
    print("Cards not found.")
