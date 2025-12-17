import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';

// Lazy load pages for better performance
const HomePage = lazy(() => import('./pages/HomePage'));
const HowWeWorkPage = lazy(() => import('./pages/HowWeWorkPage'));
const PortfolioPage = lazy(() => import('./pages/PortfolioPage'));
const BlogPage = lazy(() => import('./pages/BlogPage'));
const BlogDetailPage = lazy(() => import('./pages/BlogDetailPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const ApplicationPage = lazy(() => import('./pages/ApplicationPage'));
const KVKKPage = lazy(() => import('./pages/KVKKPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const RegisterPage = lazy(() => import('./pages/RegisterPage'));
const ForgotPasswordPage = lazy(() => import('./pages/ForgotPasswordPage'));
const VerifyPage = lazy(() => import('./pages/VerifyPage'));
const AdminPage = lazy(() => import('./pages/AdminPage'));

// Loading component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-white">
    <div className="text-center">
      <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
      <p className="text-gray-600">Yükleniyor...</p>
    </div>
  </div>
);

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
 * Supabase tabanlı formlar (auth olmadan)
 */
function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        {/* Navbar - Tüm sayfalarda görünür */}
        <Navbar />
        
        {/* Routes */}
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/nasil-calisiyoruz" element={<HowWeWorkPage />} />
            <Route 
              path="/portfolyo" 
              element={<PortfolioPage />} 
            />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:id" element={<BlogDetailPage />} />
            <Route path="/iletisim" element={<ContactPage />} />
            <Route path="/basvuru" element={<ApplicationPage />} />
            <Route path="/kvkk" element={<KVKKPage />} />
            {/* Admin sayfası artık herkese açık */}
            <Route 
              path="/influencerturkiye" 
              element={<AdminPage />} 
            />
          </Routes>
        </Suspense>
        
        {/* Footer - Tüm sayfalarda görünür */}
        <Footer />
        
        {/* WhatsApp Floating Button - Tüm sayfalarda görünür */}
        <WhatsAppButtonWrapper />
      </div>
    </Router>
  );
}

export default App;
