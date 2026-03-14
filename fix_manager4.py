with open('src/pages/admin/ManagePosts.tsx', 'r', encoding='utf-8') as f:
    text = f.read()

# Make sure imports are there.
if 'import DropdownFilter' not in text:
    text = text.replace("import { Trash2, Edit, Plus, X, Search", "import DropdownFilter from '../../components/ui/DropdownFilter';\nimport { Trash2, Edit, Plus, X, Search")
    text = text.replace("import { Archive, Plus, Search", "import DropdownFilter from '../../components/ui/DropdownFilter';\nimport { Archive, Plus, Search")

# Apply max-w-5xl to preview main block
text = text.replace('<div className="max-w-4xl mx-auto flex flex-col', '<div className="max-w-5xl mx-auto flex flex-col')
text = text.replace('<div className="max-w-4xl mx-auto pt-4', '<div className="max-w-5xl mx-auto pt-4')
text = text.replace('<div className="max-w-4xl mx-auto bg-white rounded-3xl', '<div className="max-w-5xl mx-auto bg-white rounded-3xl')

# Look for date input
import re

text = re.sub(
    r'<input\s+type="date"\s+value=\{[^}]+\}\s+onChange=\{[^}]+\}\s+className="[^"]+"\s+required\s*/>',
    '<input type="date" value={newPost.published_at} onChange={(e) => setNewPost({ ...newPost, published_at: e.target.value })} className="w-full text-base font-semibold text-gray-900 border-2 border-gray-200 focus:border-gray-300 focus:ring-0 focus:outline-none rounded-2xl px-6 py-4 transition-all bg-white" required />',
    text
)

text = re.sub(
    r'<input\s+type="date"\s+value=\{editingPost\.published_at\}\s+onChange=\{[^}]+\}\s+className="[^"]+"\s+required\s*/>',
    '<input type="date" value={editingPost.published_at} onChange={(e) => setEditingPost({ ...editingPost, published_at: e.target.value })} className="w-full text-base font-semibold text-gray-900 border-2 border-gray-200 focus:border-gray-300 focus:ring-0 focus:outline-none rounded-2xl px-6 py-4 transition-all bg-white" required />',
    text
)

# Replace remaining input
text = re.sub(
    r'<input\s+type="date"[^>]+px-3 py-2[^>]+>',
    '<input type="date" className="w-full text-base font-semibold text-gray-900 border-2 border-gray-200 focus:border-gray-300 focus:ring-0 focus:outline-none rounded-2xl px-6 py-4 transition-all bg-white" required />',
    text
)

with open('src/pages/admin/ManagePosts.tsx', 'w', encoding='utf-8') as f:
    f.write(text)
