with open("src/pages/admin/ManagePosts.tsx", "r", encoding="utf-8") as f:
    text = f.read()

text = text.replace(
    """{/* Post Type */}
                  <div className="flex flex-col gap-1 mt-4">""",
    """{/* Post Type */}
                  <div className="flex flex-col gap-1 mt-4 relative z-50">"""
)

text = text.replace(
    """<div className="text-primary text-[10px] sm:text-sm font-bold mb-2 sm:mb-3 uppercase tracking-wide flex justify-between items-center group-hover:text-blue-600 transition-colors">""",
    """<div className="text-primary text-[10px] sm:text-sm font-bold mb-2 sm:mb-3 uppercase tracking-wide flex justify-between items-center transition-colors">"""
)

with open("src/pages/admin/ManagePosts.tsx", "w", encoding="utf-8") as f:
    f.write(text)
print("done")
