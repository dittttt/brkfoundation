with open("src/pages/admin/ManagePosts.tsx", "r", encoding="utf-8") as f:
    text = f.read()

target = """                {/* Post Type */}
                <div className="flex flex-col gap-1 mt-4">"""

replacement = """                {/* Post Type */}
                <div className="flex flex-col gap-1 mt-4 relative z-50">"""

text = text.replace(target, replacement)

with open("src/pages/admin/ManagePosts.tsx", "w", encoding="utf-8") as f:
    f.write(text)

print("z-index 2 replaced")
