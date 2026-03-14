import re

with open('src/pages/News.tsx', 'r', encoding='utf-8') as f:
    text = f.read()

# Replace the inner News section and remove old h3
news_header = '''<FadeIn className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-display font-black text-dark uppercase tracking-tight">News / Announcements</h2>
          <p className="text-gray-600 text-lg mt-4 font-medium max-w-2xl mx-auto">Stay updated with our latest activities</p>
        </FadeIn>
'''

text = text.replace('{/* News Section */}\n      <Section bg="white">\n        <div className="flex flex-col md:flex-row', '{/* News Section */}\n      <Section bg="white">\n        ' + news_header + '<div className="flex flex-col md:flex-row')

# Remove the old h3
text = text.replace('<> <h3 className="text-xl md:text-2xl font-bold text-dark mb-6">News / Announcements</h3>', '<>')

# For the years array! "also the all years dropdown should be changed."
# The user wants "all years" which is activeYear to be changed to DropdownFilter.

dropdown_code = '''
            <div className="relative min-w-[140px] md:w-48 shrink-0">
              <DropdownFilter
                value={activeYear}
                onChange={setActiveYear}
                options={years.map(y => ({ value: y, label: y === 'All' ? 'All Years' : y }))}
              />
            </div>
'''

# The previous gallery controls had a whole flex block for years
year_block_regex = r'<div className="flex items-center gap-2 md:block">[\s\S]*?</button>\s*</div>'

# Let's replace the whole year block
text = re.sub(year_block_regex, dropdown_code, text)

with open('src/pages/News.tsx', 'w', encoding='utf-8') as f:
    f.write(text)
