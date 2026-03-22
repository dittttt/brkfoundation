import React, { useEffect, useState } from 'react';
import { Outlet, Navigate, Link, useLocation, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { LayoutDashboard, FileText, Image as ImageIcon, LogOut, Menu, X } from 'lucide-react';

export default function AdminLayout() {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Close sidebar on route change for mobile
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [location.pathname]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!session && location.pathname !== '/admin/login') {
    return <Navigate to="/admin/login" replace />;
  }

  if (session && location.pathname === '/admin/login') {
    return <Navigate to="/admin" replace />;
  }

  if (!session) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <main className="flex-1 w-full overflow-x-hidden">
          <Outlet />
        </main>
      </div>
    );
  }

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin/login');
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar (Drawer on mobile, Static on desktop) */}
      <aside 
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 flex flex-col transition-transform duration-300 ease-in-out md:sticky md:h-screen md:top-0 md:translate-x-0 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-xl font-black text-dark">BRK Admin</h2>
          <button 
            className="md:hidden text-gray-500 hover:text-gray-700"
            onClick={() => setIsSidebarOpen(false)}
          >
            <X size={24} />
          </button>
        </div>
        
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto w-full">
          <Link
            to="/admin"
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
              location.pathname === '/admin' ? 'bg-primary text-white' : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <LayoutDashboard size={20} />
            <span className="font-bold">Dashboard</span>
          </Link>
          <Link
            to="/admin/posts"
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
              location.pathname.startsWith('/admin/posts') ? 'bg-primary text-white' : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <FileText size={20} />
            <span className="font-bold">Posts</span>
          </Link>
        </nav>
        
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl transition-colors font-bold"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile Header (Hidden on large screens) */}
        <header className="md:hidden bg-white border-b border-gray-200 px-6 py-4 flex items-center sticky top-0 z-30">
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary rounded-md p-1 -ml-1"
          >
            <Menu size={24} />
          </button>
          <span className="ml-4 font-bold text-lg">BRK Admin</span>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 md:p-8 w-full bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
}