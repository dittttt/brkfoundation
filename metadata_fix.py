import re

with open('src/pages/admin/ManagePosts.tsx', 'r', encoding='utf-8') as f:
    m = f.read()

m = m.replace('<span>Published {getRelativeTime(editingPost.created_at)}</span>', '<span>{getRelativeTime(editingPost.created_at)}</span>')

target_eye_m = r'<div className="flex items-center gap-2 bg-gray-50 px-2 py-1 rounded-full text-xs">\s*<Eye size=\{12\} />\s*<span>\{editingPost.views \|\| 0\} views</span>\s*</div>'

replacement_m = '''<div className="flex items-center gap-3">
                      <button className="flex items-center gap-1.5 text-gray-400 hover:text-blue-600 transition-colors pointer-events-auto">
                        <Share2 size={14} />
                        <span>Share</span>
                      </button>
                      <div className="flex items-center gap-1.5 bg-gray-50 px-2 py-1 rounded-full text-xs">
                        <Eye size={12} />
                        <span>{editingPost.views || 0} views</span>
                      </div>
                    </div>'''

m = re.sub(target_eye_m, replacement_m, m)

if 'Share2' not in m:
    m = m.replace('Eye, Upload', 'Eye, Share2, Upload')

with open('src/pages/admin/ManagePosts.tsx', 'w', encoding='utf-8') as f:
    f.write(m)

with open('src/pages/PostDetail.tsx', 'r', encoding='utf-8') as f:
    p = f.read()

# PostDetail already uses: {relativeTimeStr} instead of Published {relativeTimeStr}
# Let's adjust eye element in PostDetail

target_eye_p = r'<div className="flex items-center gap-2 bg-gray-50 px-3 py-1\.5 rounded-full">\s*<Eye size=\{16\} />\s*<span>\{post\.views \|\| 0\} views</span>\s*</div>'

replacement_p = '''<div className="flex items-center gap-4">
              <button 
                onClick={() => navigator.clipboard.writeText(window.location.href)}
                className="flex items-center gap-2 text-gray-400 hover:text-blue-600 transition-colors font-medium text-sm md:text-base"
              >
                <Share2 size={16} />
                <span>Share</span>
              </button>
              <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-full">
                <Eye size={16} />
                <span>{post.views || 0} views</span>
              </div>
            </div>'''
            
p = re.sub(target_eye_p, replacement_p, p)

# Post header sizing: PostDetail has text-3xl md:text-4xl lg:text-5xl ... mb-4
p = p.replace('text-3xl md:text-4xl lg:text-5xl font-display font-black text-gray-900 leading-tight mb-4', 'text-2xl md:text-3xl font-display font-black text-gray-900 leading-tight mb-6')
p = p.replace('gap-6 text-gray-500 text-sm md:text-base font-medium mb-12 pb-6', 'gap-4 text-gray-500 text-sm font-medium mb-8 pb-5')

# Also the Banner ratio
p = p.replace('className="relative w-full h-[50vh] min-h-[400px] bg-dark flex flex-col justify-end"', 'className="relative w-full h-[50vh] min-h-[300px] md:min-h-[400px] max-h-[500px] bg-dark flex flex-col justify-end"')
p = p.replace('px-6 pb-28 md:pb-32', 'px-10 md:px-12 pb-20')
p = p.replace('pt-0 -mt-16 md:-mt-20', 'pt-0 -mt-12')
p = p.replace('p-8 md:p-12', 'p-6 md:p-8')

if 'Share2' not in p:
    p = p.replace('Clock, Eye', 'Clock, Eye, Share2')

with open('src/pages/PostDetail.tsx', 'w', encoding='utf-8') as f:
    f.write(p)
