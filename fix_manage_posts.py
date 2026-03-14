import re

with open('src/pages/admin/ManagePosts.tsx', 'r', encoding='utf-8') as f:
    text = f.read()

find_motion = '''                  <AnimatePresence>
                    {(editingPost.images_data || []).map((block, index) => (
                      <motion.div'''
replace_motion = '''                  <AnimatePresence>
                    {(editingPost.images_data || []).map((block, index) => (
                      <motion.div
                           layout'''
text = text.replace(find_motion, replace_motion)

with open('src/pages/admin/ManagePosts.tsx', 'w', encoding='utf-8') as f:
    f.write(text)
