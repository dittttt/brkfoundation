import re
with open('src/pages/admin/ManagePosts.tsx', 'r', encoding='utf-8') as f:
    text = f.read()

text = text.replace('max-w-4xl mx-auto', 'max-w-5xl mx-auto')

with open('src/pages/admin/ManagePosts.tsx', 'w', encoding='utf-8') as f:
    f.write(text)
