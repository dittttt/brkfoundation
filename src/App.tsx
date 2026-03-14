import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import SmoothScroll from './components/SmoothScroll';

// Lazy loading pages for better performance
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Story = lazy(() => import('./pages/Story'));
const Programs = lazy(() => import('./pages/Programs'));
const Projects = lazy(() => import('./pages/Projects'));
const Partners = lazy(() => import('./pages/Partners'));
const Donate = lazy(() => import('./pages/Donate'));
const Contact = lazy(() => import('./pages/Contact'));
const News = lazy(() => import('./pages/News'));
const PostDetail = lazy(() => import('./pages/PostDetail'));

// Admin Pages
const AdminLayout = lazy(() => import('./layouts/AdminLayout'));
const AdminLogin = lazy(() => import('./pages/admin/Login'));
const AdminDashboard = lazy(() => import('./pages/admin/Dashboard'));
const ManagePosts = lazy(() => import('./pages/admin/ManagePosts'));

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <SmoothScroll />
      <Suspense fallback={<div className="min-h-screen bg-gray-50 flex items-center justify-center">Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/story" element={<Story />} />
          <Route path="/programs" element={<Programs />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/partners" element={<Partners />} />
          <Route path="/updates" element={<News />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/donate" element={<Donate />} />
          <Route path="/news/:slug" element={<PostDetail type="news" />} />
          <Route path="/gallery/:slug" element={<PostDetail type="gallery" />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="login" element={<AdminLogin />} />
            <Route index element={<AdminDashboard />} />
            <Route path="posts" element={<ManagePosts />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
}
