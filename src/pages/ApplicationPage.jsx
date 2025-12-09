import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import ContactSection from '../components/ContactSection';

/**
 * ApplicationPage - Başvuru Sayfası
 * Kullanıcı giriş yapmamışsa register sayfasına yönlendirir
 */
const ApplicationPage = () => {
  const { isAuthenticated, loading } = useAuth();

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
    return <Navigate to="/auth/register" replace />;
  }

  return <ContactSection />;
};

export default ApplicationPage;
