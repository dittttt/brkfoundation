const fs = require('fs');

let text = fs.readFileSync('src/layouts/AdminLayout.tsx', 'utf8');

const layoutCodeNew = \  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50 pb-20 md:pb-0">
      {/* Mobile Top Header */}
      <div className="md:hidden flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200 sticky top-0 z-[60] shadow-sm">
        <h2 className="text-xl font-black text-dark tracking-tight">BRK Admin</h2>
        <button
          onClick={handleLogout}
          className="text-red-500 p-2 rounded-lg hover:bg-red-50 transition-colors"
        >
          <LogOut size={20} />
        </button>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 bg-white border-r border-gray-200 flex-col sticky top-0 h-screen shrink-0 z-50">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-black text-dark tracking-tight">BRK Admin</h2>
        </div>
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          <Link
            to="/admin"
            className={\\flex items-center gap-3 px-4 py-3 rounded-xl transition-colors \\}
          >
            <LayoutDashboard size={20} />
            <span className="font-bold">Dashboard</span>
          </Link>
          <Link
            to="/admin/posts"
            className={\lex items-center gap-3 px-4 py-3 rounded-xl transition-colors \\}
          >
            <FileText size={20} />
            <span className="font-bold">Posts</span>
          </Link>
        </nav>
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-colors font-bold"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 sm:p-6 md:p-8 w-full overflow-x-hidden pt-6">
        <Outlet />
      </main>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex items-center justify-around px-2 py-2 z-[60] shadow-[0_-4px_20px_rgb(0,0,0,0.05)]" style={{ paddingBottom: 'env(safe-area-inset-bottom, 0.5rem)' }}>
        <Link
          to="/admin"
          className={\lex flex-col items-center gap-1 w-full py-2 rounded-xl transition-all \\}
        >
          <LayoutDashboard size={22} className={location.pathname === '/admin' ? 'scale-110 mb-0.5 transition-transform' : ''} />
          <span className="text-[10px] font-bold">Dashboard</span>
        </Link>
        <Link
          to="/admin/posts"
          className={\lex flex-col items-center gap-1 w-full py-2 rounded-xl transition-all \\}
        >
          <FileText size={22} className={location.pathname.startsWith('/admin/posts') ? 'scale-110 mb-0.5 transition-transform' : ''} />
          <span className="text-[10px] font-bold">Posts</span>
        </Link>
      </nav>
    </div>
  );
}\;

const idx = text.indexOf('  return (\\n    <div className="flex min-h-screen bg-gray-50">');
if(idx === -1) { console.log('not found'); process.exit(1); }
const oldReturnBlock = text.substring(idx);
text = text.replace(oldReturnBlock, layoutCodeNew);

fs.writeFileSync('src/layouts/AdminLayout.tsx', text.replace(/\\\\f/g, 'f'));
