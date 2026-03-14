import re
with open('src/pages/admin/ManagePosts.tsx', 'r', encoding='utf-8') as f:
    text = f.read()

matches = re.findall(r'className="[^"]*max-w-[^"]*"', text)
for m in set(matches):
    print(m)
