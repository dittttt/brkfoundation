with open("src/pages/admin/ManagePosts.tsx", "r", encoding="utf-8") as f:
    text = f.read()

target = """              {/* Title & Metadata */}
              <div className="space-y-4">"""

replacement = """              {/* Title & Metadata */}
              <div className="space-y-4 relative z-[60]">"""

text = text.replace(target, replacement)

with open("src/pages/admin/ManagePosts.tsx", "w", encoding="utf-8") as f:
    f.write(text)

print("z-index replaced")
