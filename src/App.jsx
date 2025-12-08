import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import WhatsAppButton from './components/WhatsAppButton';
import HomePage from './pages/HomePage';
import HowWeWorkPage from './pages/HowWeWorkPage';
import PortfolioPage from './pages/PortfolioPage';
import BlogPage from './pages/BlogPage';
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';

/**
 * WhatsApp Button Wrapper - Sadece auth sayfalarında gizle
 */
const WhatsAppButtonWrapper = () => {
  const location = useLocation();
  const isAuthPage = location.pathname.startsWith('/auth');
  
  if (isAuthPage) return null;
  return <WhatsAppButton />;
};

/**
 * Main App Component
 * Influencer Türkiye - React Router ile sayfa yönetimi
 * Kırmızı-Beyaz Tema
 * Supabase Authentication entegrasyonu
 */
function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-white">
          {/* Navbar - Tüm sayfalarda görünür (auth sayfaları hariç) */}
          <Routes>
            <Route path="/auth/*" element={null} />
            <Route path="*" element={<Navbar />} />
          </Routes>
          
          {/* Routes */}
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/nasil-calisiyoruz" element={<HowWeWorkPage />} />
            <Route 
              path="/portfolyo" 
              element={
                <ProtectedRoute>
                  <PortfolioPage />
                </ProtectedRoute>
              } 
            />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/iletisim" element={<ContactPage />} />
            
            {/* Auth Routes */}
            <Route path="/auth/login" element={<LoginPage />} />
            <Route path="/auth/register" element={<RegisterPage />} />
            <Route path="/auth/forgot-password" element={<ForgotPasswordPage />} />
          </Routes>
          
          {/* Footer - Tüm sayfalarda görünür (auth sayfaları hariç) */}
          <Routes>
            <Route path="/auth/*" element={null} />
            <Route path="*" element={<Footer />} />
          </Routes>
          
          {/* WhatsApp Floating Button - Tüm sayfalarda (auth sayfaları hariç) */}
          <WhatsAppButtonWrapper />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
