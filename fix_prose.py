with open('src/pages/admin/ManagePosts.tsx', 'r', encoding='utf-8') as f:
    text = f.read()

text = text.replace('className="prose max-w-none text-gray-700 leading-[1.5] text-sm"', 'className="prose max-w-none prose-p:my-4 prose-a:text-blue-600 text-gray-700 leading-[1.5] text-sm md:text-base"')

with open('src/pages/admin/ManagePosts.tsx', 'w', encoding='utf-8') as f:
    f.write(text)
