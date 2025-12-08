import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import HowWeWorkPage from './pages/HowWeWorkPage';
import PortfolioPage from './pages/PortfolioPage';
import BlogPage from './pages/BlogPage';
import ContactPage from './pages/ContactPage';

/**
 * Main App Component
 * Influencer Türkiye - React Router ile sayfa yönetimi
 */
function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#171719]">
        {/* Navbar - Tüm sayfalarda görünür */}
        <Navbar />
        
        {/* Routes */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/nasil-calisiyoruz" element={<HowWeWorkPage />} />
          <Route path="/portfolyo" element={<PortfolioPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/iletisim" element={<ContactPage />} />
        </Routes>
        
        {/* Footer - Tüm sayfalarda görünür */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
