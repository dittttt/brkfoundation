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
        <Route path="/news" element={<News />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/donate" element={<Donate />} />
      </Routes>
    </Router>
  );
}
