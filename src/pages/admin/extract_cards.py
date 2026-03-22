with open("ManagePosts.tsx", "r", encoding="utf-8") as f:
    text = f.read()

idx = text.find("{filteredPosts.map((post) => (")
print(text[idx:idx+3500])
