import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import SmoothScroll from './components/SmoothScroll';
import Home from './pages/Home';
import About from './pages/About';
import Story from './pages/Story';
import Programs from './pages/Programs';
import Projects from './pages/Projects';
import Partners from './pages/Partners';
import Donate from './pages/Donate';
import Contact from './pages/Contact';
import News from './pages/News';
import PostDetail from './pages/PostDetail';

// Admin Pages
import AdminLayout from './layouts/AdminLayout';
import AdminLogin from './pages/admin/Login';
import AdminDashboard from './pages/admin/Dashboard';
import ManageNews from './pages/admin/ManageNews';
import ManageGallery from './pages/admin/ManageGallery';

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <SmoothScroll />
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
          <Route path="news" element={<ManageNews />} />
          <Route path="gallery" element={<ManageGallery />} />
        </Route>
      </Routes>
    </Router>
  );
}
