with open('src/pages/admin/ManagePosts.tsx', 'r', encoding='utf-8') as f:
    text = f.read()

idx = text.find('RIGHT: Live Preview Column')
if idx != -1:
    end = min(len(text), idx + 2000)
    print(text[idx:end])
