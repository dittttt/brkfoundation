import re

with open('src/pages/admin/ManagePosts.tsx', 'r', encoding='utf-8') as f:
    text = f.read()

# 1. Search Bar Centering
target_search = r'<div className="relative flex-1 lg:max-w-md w-full">\s*<input[^>]+/>\s*<Search[^>]+/>\s*</div>'
replacement_search = '''<div className="flex items-center w-full lg:max-w-md bg-slate-50 rounded-2xl overflow-hidden focus-within:ring-2 focus-within:ring-blue-200 focus-within:border-blue-500 border border-transparent transition-all">
              <div className="pl-4 pr-2 flex items-center justify-center text-gray-400">
                <Search size={18} />
              </div>
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full py-3 pr-4 bg-transparent border-none focus:ring-0 text-sm font-medium text-gray-700 placeholder-gray-400"
              />
            </div>'''
text = re.sub(target_search, replacement_search, text)

# 2. Reordering Animation
text = text.replace('<motion.div\n                           initial={{ opacity: 0, y: 20 }}', '<motion.div\n                           layout\n                           initial={{ opacity: 0, y: 20 }}')

# 3. Line Breaks (m-0 instead of my-4)
text = text.replace('prose-p:my-4', 'prose-p:m-0')
text = text.replace('prose-h1:text-2xl', '') # just cleanup if accidentally present

# 4. Years Filtering Layout (no max-w-[300px])
target_years_container = r'<div className="flex items-center gap-2 max-w-\[300px\] md:max-w-md">'
replacement_years_container = '<div className="flex items-center gap-2 flex-1 min-w-0 pr-4 overflow-hidden">'
text = text.replace(target_years_container, replacement_years_container)

# 5. Type Dropdown in individual post cards
target_select = r'<div className="flex-1 relative">\s*<select[\s\S]*?</select>\s*<ChevronDown[^>]+/>\s*</div>'
# We will replace it with DropdownFilter
replacement_select = '''<div className="flex-1">
                        <DropdownFilter
                          value={post.tableType || 'news'}
                          onChange={(val) => movePostType(post, val as 'news' | 'gallery')}
                          options={[
                            { value: 'news', label: 'Type: News Post' },
                            { value: 'gallery', label: 'Type: Gallery Item' }
                          ]}
                          className="w-full"
                        />
                      </div>'''
text = re.sub(target_select, replacement_select, text)

# 6. Make preview 1:1 with banner ratio Aspect-[21/9] (Since live is maybe 21/9 but preview was h-[250px]). Let's just use aspect-[21/9] everywhere.
text = text.replace('className="relative w-full h-[250px] bg-dark flex flex-col justify-end"', 'className="relative w-full aspect-[21/9] bg-dark flex flex-col justify-end overflow-hidden"')

with open('src/pages/admin/ManagePosts.tsx', 'w', encoding='utf-8') as f:
    f.write(text)

with open('src/pages/PostDetail.tsx', 'r', encoding='utf-8') as f:
    p = f.read()

# Make PostDetail use exactly aspect-[21/9]
p = re.sub(r'className="relative w-full [^"]*bg-dark flex flex-col justify-end"', 'className="relative w-full aspect-[21/9] max-h-[600px] bg-dark flex flex-col justify-end overflow-hidden"', p)

p = p.replace('prose-p:my-4', 'prose-p:m-0')

with open('src/pages/PostDetail.tsx', 'w', encoding='utf-8') as f:
    f.write(p)

