with open('src/pages/admin/ManagePosts.tsx', 'r', encoding='utf-8') as f:
    text = f.read()

# Make the date input same as title input box
text = text.replace('className="border-gray-200 rounded-lg text-sm focus:ring-blue-500 focus:border-blue-500 shadow-sm px-3 py-2"', 'className="w-full text-sm font-semibold text-gray-900 border-2 border-gray-200 focus:border-gray-300 focus:ring-0 focus:outline-none rounded-xl px-4 py-3 transition-all bg-white"')
text = text.replace('className="bg-gray-50 border border-gray-200 rounded-lg text-sm px-3 py-2 text-gray-500 font-medium"', 'className="w-full text-sm font-semibold text-gray-500 border-2 border-gray-200 rounded-xl px-4 py-3 transition-all bg-gray-50"')

# Preview banner tags alignment
# Currently: <div className="relative z-10 w-full px-6 pb-20">
text = text.replace('<div className="relative z-10 w-full px-6 pb-20">', '<div className="relative z-10 w-full px-10 md:px-12 pb-20">')

# Manage dropdowns "Please match all the dropdowns in the manage post admin dashboard to the header nav bar style or fitler in gallery in updates page."
# Make sure we got all <select> elements replaced.
import re
# dropdown 1: filterYear
dropdown_year = '''
            <div className="relative min-w-[140px] shrink-0 z-50">
              <DropdownFilter
                value={filterYear}
                onChange={setFilterYear}
                options={years.map(y => ({ value: y, label: y === 'All' ? 'All Years' : y }))}
              />
            </div>
'''
text = re.sub(r'<select value=\{filterYear\}[^>]*>[\s\S]*?</select>', dropdown_year, text)

dropdown_sort = '''
            <div className="relative min-w-[140px] shrink-0 z-50">
              <DropdownFilter
                value={sortBy}
                onChange={setSortBy}
                options={[
                  { value: 'latest', label: 'Latest' },
                  { value: 'oldest', label: 'Oldest' },
                  { value: 'views', label: 'Most Views' },
                  { value: 'updated', label: 'Recently Updated' }
                ]}
              />
            </div>
'''
text = re.sub(r'<select value=\{sortBy\}[^>]*>[\s\S]*?</select>', dropdown_sort, text)

# Ensure the prose matches line break expectations
text = text.replace('prose md:prose-lg', 'prose md:prose-lg prose-p:my-4 prose-a:text-blue-600')

with open('src/pages/admin/ManagePosts.tsx', 'w', encoding='utf-8') as f:
    f.write(text)
