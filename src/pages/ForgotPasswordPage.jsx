import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Mail, AlertCircle, CheckCircle, ArrowLeft } from 'lucide-react';

/**
 * ForgotPasswordPage Component
 * Şifre sıfırlama sayfası
 */
const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const { resetPassword } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setLoading(true);

    const { data, error: resetError } = await resetPassword(email);

    if (resetError) {
      setError(resetError.message || 'Şifre sıfırlama e-postası gönderilirken bir hata oluştu');
      setLoading(false);
    } else {
      setSuccess(true);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50 flex items-center justify-center px-6 py-12">
      <div className="max-w-md w-full">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center justify-center mb-6">
            <div 
              className="rounded-lg flex items-center justify-center overflow-hidden"
              style={{ 
                width: '210px',
                height: '120px',
                aspectRatio: '7/4'
              }}
            >
              <img 
                src="/logo.svg" 
                alt="Influencer Türkiye Logo" 
                className="w-full h-full object-contain"
              />
            </div>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Şifremi Unuttum</h1>
          <p className="text-gray-600">E-posta adresinize şifre sıfırlama linki göndereceğiz</p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-200">
          {success ? (
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">E-posta Gönderildi!</h2>
              <p className="text-gray-600 mb-6">
                E-posta adresinize şifre sıfırlama linki gönderildi. Lütfen e-postanızı kontrol edin.
              </p>
              <p className="text-sm text-gray-500 mb-6">
                E-posta gelmedi mi? Spam klasörünü kontrol etmeyi unutmayın.
              </p>
              <Link
                to="/auth/login"
                className="inline-block bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-xl transition-all"
              >
                Giriş Sayfasına Dön
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  <span className="text-sm">{error}</span>
                </div>
              )}

              {/* Email Input */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  E-posta Adresi
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none transition-all"
                    placeholder="ornek@email.com"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Gönderiliyor...</span>
                  </>
                ) : (
                  'Şifre Sıfırlama Linki Gönder'
                )}
              </button>
            </form>
          )}

          {/* Back to Login */}
          <div className="mt-6 text-center">
            <Link 
              to="/auth/login" 
              className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              Giriş Sayfasına Dön
            </Link>
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-6">
          <Link to="/" className="text-gray-600 hover:text-gray-900 text-sm">
            ← Ana Sayfaya Dön
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
