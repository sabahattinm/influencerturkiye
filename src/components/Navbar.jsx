import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Menu,
  X
} from 'lucide-react';

/**
 * Navbar Component - Türkçe with React Router
 */
const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

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
    <nav className="bg-[#171719] px-6 py-4 sticky top-0 z-50 border-b border-white/5">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Left: Logo with Text */}
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center overflow-hidden">
            <img 
              src="/icon.svg" 
              alt="Influencer Türkiye Logo" 
              className="w-full h-full object-contain"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-white font-bold text-lg leading-tight">INFLUENCER</span>
            <span className="text-[#d3f26a] text-xs font-medium tracking-wider">TÜRKİYE</span>
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
                  ? 'text-[#d3f26a] font-medium' 
                  : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              {item.label}
              {isActive(item.path) && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#d3f26a] rounded-full" />
              )}
            </Link>
          ))}
        </div>

        {/* Right: User Profile & Mobile Menu */}
        <div className="flex items-center gap-4">
          {/* User Profile */}
          <div className="hidden sm:flex items-center gap-3">
            <span className="text-sm text-white">Hoş Geldiniz</span>
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face"
              alt="Kullanıcı"
              className="w-10 h-10 rounded-full object-cover"
            />
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden pt-4 pb-2">
          <div className="flex flex-col gap-2">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`text-sm py-2 px-2 rounded-lg ${
                  isActive(item.path) ? 'text-[#d3f26a] bg-[#d3f26a]/10' : 'text-gray-400'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
