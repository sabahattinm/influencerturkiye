import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

// Admin email'leri - Environment variable'dan al veya direkt tanımla
const ADMIN_EMAILS = [
  import.meta.env.VITE_ADMIN_EMAIL_1 || 'admin1@example.com',
  import.meta.env.VITE_ADMIN_EMAIL_2 || 'admin2@example.com'
];

/**
 * AdminRoute Component
 * Sadece belirli admin kullanıcıların erişebileceği korumalı route
 * Kullanıcı giriş yapmamışsa login sayfasına yönlendirir
 * Admin değilse ana sayfaya yönlendirir
 */
const AdminRoute = ({ children }) => {
  const { isAuthenticated, user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }

  // Kullanıcının admin olup olmadığını kontrol et
  const isAdmin = user?.email && ADMIN_EMAILS.includes(user.email.toLowerCase());

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AdminRoute;
