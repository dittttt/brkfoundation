const fs = require('fs');

let text = fs.readFileSync('src/pages/PostDetail.tsx', 'utf8');

const backBtn = \<div className="bg-dark pt-24 pb-4 px-4 md:px-6">
        <div className="max-w-5xl mx-auto">
          <Link to="/updates" className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors font-medium text-sm">
            <ChevronLeft size={16} /> Back to Updates
          </Link>
        </div>
      </div>
      {/* Banner Header instead of inline image */}\;
text = text.replace('{/* Banner Header instead of inline image */}', backBtn);

text = text.replace('w-full aspect-[21/9] max-h-[600px]', 'w-full aspect-[21/9]');
text = text.replace('text-2xl md:text-3xl font-display', 'text-4xl md:text-5xl lg:text-6xl font-display');

const findShare = \<div className="flex items-center gap-4">
              <button 
                onClick={() => navigator.clipboard.writeText(window.location.href)}
                className="flex items-center gap-2 text-gray-400 hover:text-blue-600 transition-colors font-medium text-sm md:text-base"
              >
                <Share2 size={16} />
                <span>Share</span>
              </button>
            </div>\;

const replaceShare = \<div className="flex items-center gap-4">
              <button 
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
              </button>
            </div>\;
            
text = text.replace(findShare, replaceShare);

fs.writeFileSync('src/pages/PostDetail.tsx', text);
