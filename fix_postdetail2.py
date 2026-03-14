with open('src/pages/PostDetail.tsx', 'r', encoding='utf-8') as f:
    text = f.read()

# Make it wider
text = text.replace('max-w-4xl mx-auto', 'max-w-5xl mx-auto')

# Fix alignment of tags in banner - wait, the title box has px-8 md:px-12 which means the text is in-dented that much.
# Let's see banner overlays in PostDetail.tsx:
banner_pattern = '''<div className="relative z-10 w-full max-w-4xl mx-auto px-6 pb-28 md:pb-
32">'''

text = text.replace('max-w-4xl mx-auto px-6 pb-28 md:pb-\n32', 'max-w-5xl mx-auto px-12 md:px-16 pb-28 md:pb-32')
text = text.replace('max-w-4xl mx-auto px-6 pb-28 md:pb-32', 'max-w-5xl mx-auto px-12 md:px-16 pb-28 md:pb-32')

# prose line spacing... "everything in actual post has line breaks automatically regardless". 
# ReactQuill line breaks: quill uses <p><br></p> or just <p> for new lines. 
# Tailwind prose adds marging to p tags! We can use prose-p:mt-0 prose-p:mb-4 or similar. But whitespace-pre-wrap might be needed if they type regular spaces.
text = text.replace('prose prose-lg md:prose-xl', 'prose prose-lg md:prose-xl prose-p:my-4 prose-a:text-blue-600')

with open('src/pages/PostDetail.tsx', 'w', encoding='utf-8') as f:
    f.write(text)
