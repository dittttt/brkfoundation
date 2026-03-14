with open('src/pages/admin/ManagePosts.tsx', 'r', encoding='utf-8') as f:
    text = f.read()

# Let's find "Preview" section
idx = text.find('Live Preview')
if idx != -1:
    start = max(0, idx - 500)
    end = min(len(text), idx + 1000)
    print(text[start:end])
