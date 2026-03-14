import re

with open('src/pages/PostDetail.tsx', 'r', encoding='utf-8') as f:
    text = f.read()

old_back_box = '''<div className="bg-dark pt-24 pb-4 px-4 md:px-6">
        <div className="max-w-5xl mx-auto">
          <Link to="/updates" className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors font-medium text-sm">
            <ChevronLeft size={16} /> Back to Updates
          </Link>
        </div>
      </div>
      {/* Banner Header instead of inline image */}'''
text = text.replace(old_back_box, "{/* Banner Header instead of inline image */}")

find_banner_start = '''{/* Banner Header instead of inline image */}
      <div className="relative w-full aspect-[21/9] bg-dark flex flex-col justify-end overflow-hidden">'''
replace_banner_start = '''{/* Banner Header instead of inline image */}
      <div className="w-full bg-gray-50 pt-20">
        <div className="relative w-full max-w-[1400px] mx-auto min-h-[300px] max-h-[450px] aspect-[21/9] bg-dark flex flex-col justify-end overflow-hidden lg:rounded-b-[3rem]">'''
text = text.replace(find_banner_start, replace_banner_start)

find_banner_text = '''        {/* Banner Overlays */}
        <div className="relative z-10 w-full max-w-5xl mx-auto px-10 md:px-12 pb-20">
          <div className="flex items-center gap-4 md:gap-6">
            <span className="text-secondary text-sm md:text-base font-bold uppercase tracking-widest">{yearStr}</span>
            <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-secondary"></span>
            <span className="text-white text-sm md:text-base uppercase tracking-widest font-bold">{type}</span>
          </div>
        </div>
      </div>

      <div className="w-full px-4 md:px-6 pt-0 -mt-12 relative z-20 pb-20">
        <div className="max-w-5xl mx-auto bg-white rounded-3xl p-6 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-gray-100">'''

replace_banner_text = '''        {/* Banner Overlays */}
        <div className="relative z-10 w-full max-w-4xl mx-auto px-10 md:px-12 pb-20">
          <div className="flex items-center gap-3">
            <span className="text-secondary text-xs md:text-sm font-bold uppercase tracking-widest">{yearStr}</span>
            <span className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-secondary"></span>
            <span className="text-white text-xs md:text-sm uppercase tracking-widest font-bold">{type}</span>
          </div>
        </div>
      </div>

      <div className="w-full px-4 md:px-6 pt-0 -mt-12 relative z-20 pb-20 bg-gray-50">
        <div className="max-w-4xl mx-auto bg-white rounded-3xl p-6 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-gray-100">
          <div className="mb-8">
            <Link to="/updates" className="inline-flex items-center gap-2 text-gray-400 hover:text-blue-600 transition-colors font-bold text-xs uppercase tracking-wider">
              <ChevronLeft size={16} /> Back to Updates
            </Link>
          </div>'''
text = text.replace(find_banner_text, replace_banner_text)

find_share = '''<button 
                onClick={(e) => {
                  navigator.clipboard.writeText(window.location.href);
                  const span = e.currentTarget.querySelector('span');
                  if (span) {
                    const orig = span.innerText;
                    span.innerText = 'Copied!';
                    setTimeout(() => span.innerText = orig, 2000);
                  }
                }}
                className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-50 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors font-bold text-sm md:text-base rounded-xl border border-gray-200 shadow-sm active:scale-95"
              >
                <Share2 size={18} />
                <span>Share Post</span>
              </button>'''
replace_share = '''<button 
                onClick={(e) => {
                  navigator.clipboard.writeText(window.location.href);
                  const span = e.currentTarget.querySelector('span');
                  if (span) {
                    const orig = span.innerText;
                    span.innerText = 'Copied!';
                    setTimeout(() => span.innerText = orig, 2000);
                  }
                }}
                className="flex items-center gap-1.5 text-gray-400 hover:text-blue-600 transition-colors pointer-events-auto font-medium"
              >
                <Share2 size={16} />
                <span>Share</span>
              </button>'''
text = text.replace(find_share, replace_share)

text = text.replace("      </div>\n    </MainLayout>", "      </div>\n      </div>\n    </MainLayout>")

with open('src/pages/PostDetail.tsx', 'w', encoding='utf-8') as f:
    f.write(text)

