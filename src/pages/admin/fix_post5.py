with open("ManagePosts.tsx", "r", encoding="utf-8") as f:
    text = f.read()

target = """                  </AnimatePresence>
                </div>
              </div>
            </div>

              {/* Revision History */}"""

replacement = """                  </AnimatePresence>
                </div>
              </div>

              {/* Revision History */}"""

text = text.replace(target, replacement)

with open("ManagePosts.tsx", "w", encoding="utf-8") as f:
    f.write(text)

print("Done")
