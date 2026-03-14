import re

with open('src/pages/admin/ManagePosts.tsx', 'r', encoding='utf-8') as f:
    text = f.read()

# Add state
if 'const [showScrollArrows, setShowScrollArrows] = useState(false);' not in text:
    text = text.replace('const scrollContainerRef = useRef<HTMLDivElement>(null);', 'const scrollContainerRef = useRef<HTMLDivElement>(null);\n  const [showScrollArrows, setShowScrollArrows] = useState(false);')

# Add ResizeObserver effect
resize_effect = '''
  useEffect(() => {
    const checkOverflow = () => {
      if (scrollContainerRef.current) {
        const { scrollWidth, clientWidth } = scrollContainerRef.current;
        setShowScrollArrows(scrollWidth > clientWidth);
      }
    };
    checkOverflow();
    window.addEventListener('resize', checkOverflow);
    return () => window.removeEventListener('resize', checkOverflow);
  }, [years]);
'''

if 'const checkOverflow = () => {' not in text:
    text = text.replace('const scroll = (direction: \'left\' | \'right\') => {', resize_effect + '\n  const scroll = (direction: \'left\' | \'right\') => {')

# Apply conditional rendering to buttons
text = text.replace('''<button
                onClick={() => scroll('left')}
                className="shrink-0 flex-none p-1 bg-white border border-gray-200 rounded-full shadow-sm text-dark h-9 w-9 flex items-center justify-center my-auto transition-colors active:bg-gray-50 hover:bg-gray-50"
              >
                <ChevronLeft size={18} />
              </button>''', '''{showScrollArrows && (
              <button
                onClick={() => scroll('left')}
                className="shrink-0 flex-none p-1 bg-white border border-gray-200 rounded-full shadow-sm text-dark h-9 w-9 flex items-center justify-center my-auto transition-colors active:bg-gray-50 hover:bg-gray-50"
              >
                <ChevronLeft size={18} />
              </button>
              )}''')

text = text.replace('''<button
                onClick={() => scroll('right')}
                className="shrink-0 flex-none p-1 bg-white border border-gray-200 rounded-full shadow-sm text-dark h-9 w-9 flex items-center justify-center my-auto transition-colors active:bg-gray-50 hover:bg-gray-50"
              >
                <ChevronRight size={18} />
              </button>''', '''{showScrollArrows && (
              <button
                onClick={() => scroll('right')}
                className="shrink-0 flex-none p-1 bg-white border border-gray-200 rounded-full shadow-sm text-dark h-9 w-9 flex items-center justify-center my-auto transition-colors active:bg-gray-50 hover:bg-gray-50"
              >
                <ChevronRight size={18} />
              </button>
              )}''')

with open('src/pages/admin/ManagePosts.tsx', 'w', encoding='utf-8') as f:
    f.write(text)
