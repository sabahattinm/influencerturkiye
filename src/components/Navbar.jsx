import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  Menu,
  X,
  LogOut,
  User
} from 'lucide-react';

/**
 * Navbar Component - Türkçe with React Router
 * Kırmızı-Beyaz Tema
 * Supabase Authentication entegrasyonu
 */
const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user, signOut, loading } = useAuth();

  const navItems = [
    { label: 'Anasayfa', path: '/' },
    { label: 'Nasıl Çalışıyoruz', path: '/nasil-calisiyoruz' },
    { label: 'Portföy', path: '/portfolyo' },
    { label: 'Blog', path: '/blog' },
    { label: 'İletişim', path: '/iletisim' },
  ];

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname === path;
  };

  return (
    <nav className="bg-white px-6 py-4 sticky top-0 z-50 border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Left: Logo with Text - 1:1 Aspect Ratio */}
        <Link to="/" className="flex items-center gap-3">
          <div 
            className="rounded-lg flex items-center justify-center overflow-hidden"
            style={{ 
              width: '50px',  // Genişlik
              height: '50px', // Yükseklik (1:1 oranı)
              aspectRatio: '1/1'
            }}
          >
            <img 
              src="/icon.webp" 
              alt="Influencer Türkiye Logo" 
              className="w-full h-full object-contain"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-gray-900 font-bold text-lg leading-tight">INFLUENCER</span>
            <span className="text-red-600 text-xs font-medium tracking-wider">TÜRKİYE</span>
          </div>
        </Link>
          
        {/* Center: Navigation Links - Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.path}
              className={`relative text-sm transition-colors duration-200 pb-1 ${
                isActive(item.path)
                  ? 'text-red-600 font-medium' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {item.label}
              {isActive(item.path) && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-red-600 rounded-full" />
              )}
            </Link>
          ))}
        </div>

        {/* Right: Auth Buttons / User Profile & Mobile Menu */}
        <div className="flex items-center gap-4">
          {!loading && (
            <>
              {isAuthenticated ? (
                /* Authenticated User */
                <div className="hidden sm:block relative">
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center">
                      <User className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-sm text-gray-700 font-medium">
                      {user?.email?.split('@')[0] || 'Kullanıcı'}
                    </span>
                  </button>
                  
                  {/* User Dropdown Menu */}
                  {userMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
                      <div className="px-4 py-2 border-b border-gray-100">
                        <p className="text-xs text-gray-500">Giriş yapıldı</p>
                        <p className="text-sm font-medium text-gray-900 truncate">{user?.email}</p>
                      </div>
                      <button
                        onClick={async () => {
                          await signOut();
                          setUserMenuOpen(false);
                        }}
                        className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        Çıkış Yap
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                /* Not Authenticated - Auth Buttons */
                <div className="hidden sm:flex items-center gap-3">
                  <Link
                    to="/auth/login"
                    className="text-sm text-gray-700 hover:text-gray-900 font-medium transition-colors"
                  >
                    Giriş Yap
                  </Link>
                  <Link
                    to="/auth/register"
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-all"
                  >
                    Üye Ol
                  </Link>
                </div>
              )}
            </>
          )}

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 text-gray-700"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden pt-4 pb-2 bg-white border-t border-gray-200">
          <div className="flex flex-col gap-2">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`text-sm py-2 px-2 rounded-lg ${
                  isActive(item.path) ? 'text-red-600 bg-red-50' : 'text-gray-600'
                }`}
              >
                {item.label}
              </Link>
            ))}
            
            {/* Mobile Auth Buttons */}
            {!loading && (
              <div className="pt-4 border-t border-gray-200 mt-2 flex flex-col gap-2">
                {isAuthenticated ? (
                  <>
                    <div className="px-2 py-2">
                      <p className="text-xs text-gray-500 mb-1">Giriş yapıldı</p>
                      <p className="text-sm font-medium text-gray-900 truncate">{user?.email}</p>
                    </div>
                    <button
                      onClick={async () => {
                        await signOut();
                        setMobileMenuOpen(false);
                      }}
                      className="text-sm py-2 px-2 rounded-lg text-red-600 hover:bg-red-50 flex items-center gap-2"
                    >
                      <LogOut className="w-4 h-4" />
                      Çıkış Yap
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/auth/login"
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-sm py-2 px-2 rounded-lg text-gray-600 hover:bg-gray-50"
                    >
                      Giriş Yap
                    </Link>
                    <Link
                      to="/auth/register"
                      onClick={() => setMobileMenuOpen(false)}
                      className="bg-red-600 hover:bg-red-700 text-white text-sm py-2 px-2 rounded-lg text-center font-semibold"
                    >
                      Üye Ol
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      )}
      
      {/* Click outside to close user menu */}
      {userMenuOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setUserMenuOpen(false)}
        />
      )}
    </nav>
  );
};

export default Navbar;
