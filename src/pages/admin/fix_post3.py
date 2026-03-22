import re
with open("ManagePosts.tsx", "r", encoding="utf-8") as f:
    text = f.read()

old_str = r"                  </AnimatePresence>\s+</div>\s+</div>\s+</div>\s+\{/\* RIGHT: Live Preview Column \*/\}"

new_str = """                  </AnimatePresence>
                </div>
              </div>

              {/* Revision History */}
              {editingPost.revisions && editingPost.revisions.length > 0 && (
                <div className="mt-8 px-6 md:px-8 border-t border-gray-100 pt-6 pb-6 bg-slate-50 border-b border-gray-100">
                  <h3 className="text-sm font-bold text-gray-700 mb-4 flex items-center gap-2"><History size={16} /> Revision History ({editingPost.revisions.length})</h3>
                  <div className="space-y-3 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                    {editingPost.revisions.map((rev: any, idx: number) => (
                      <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 bg-white border border-gray-200 shadow-sm rounded-xl">
                        <div>
                          <p className="text-xs font-bold text-gray-800">{new Date(rev.edited_at).toLocaleString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
                          <p className="text-[10px] text-gray-500">Edited by Admin</p>
                        </div>
                        <button onClick={() => {
                          if (window.confirm('Restore this revision? Your current unsaved changes will be overwritten in the editor.')) {
                            setEditingPost({ ...editingPost, title: rev.title, content: rev.content, image_url: rev.image_url, images_data: rev.images_data || [] });
                          }
                        }} className="text-xs font-bold text-blue-600 hover:text-blue-700 mt-2 sm:mt-0 px-3 py-1.5 bg-blue-50 border border-blue-100 rounded-lg hover:bg-blue-100 transition-colors cursor-pointer">
                          Restore
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* RIGHT: Live Preview Column */}"""

res = re.sub(old_str, new_str, text, count=1)

if text != res:
    with open("ManagePosts.tsx", "w", encoding="utf-8") as f:
        f.write(res)
    print("Replaced!")
else:
    print("Not found... :(")
