import { Search, ArrowUpRight, Video, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

/**
 * HeroSection Component - Türkçe
 * Full-screen hero section with dynamic sizing
 * Kırmızı-Beyaz Tema
 */
const HeroSection = () => {
  const navigate = useNavigate();
  
  const avatars = [
    "/assets/boncuksara.webp",
    "/assets/clburakkk.webp",
    "/assets/dr_ilaydasimaygul.webp",
  ];

  // Navigate to How We Work page
  const goToHowWeWork = () => {
    navigate('/nasil-calisiyoruz');
  };

  // Navigate to Contact page
  const goToContact = () => {
    navigate('/iletisim');
  };

  // Navigate to Application page
  const goToApplication = () => {
    navigate('/basvuru');
  };

  return (
    <section className="bg-white min-h-[60vh] flex items-center px-6 py-8 lg:py-12">
      <div className="max-w-7xl mx-auto w-full">
        <div className="flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-12">
          
          {/* Left Content */}
          <div className="flex-1">
            {/* Main Headline */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-[1.1]">
              {/* First line */}
              <div className="flex items-center gap-3 flex-wrap">
                <span>Bul</span>
                {/* Search icon with red border */}
                <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 border-2 border-red-600 rounded-full">
                  <Search className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 text-red-600" />
                </div>
                <span>Influencer'ları</span>
              </div>
              
              {/* Second line with avatars */}
              <div className="flex items-center gap-4 mt-2 sm:mt-3">
                {/* Overlapping avatars */}
                <div className="flex -space-x-2 sm:-space-x-3">
                  {avatars.map((avatar, index) => (
                    <img
                      key={index}
                      src={avatar}
                      alt={`Kullanıcı ${index + 1}`}
                      className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-full border-2 border-white object-cover shadow-md"
                      style={{ zIndex: avatars.length - index }}
                    />
                  ))}
                </div>
                <span className="text-gray-900 font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">işbirliği için</span>
              </div>
              
              {/* Third line */}
              <div className="text-gray-900 font-bold mt-2 sm:mt-3 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">keşfet</div>
            </h1>

            {/* CTA Buttons */}
            <div className="mt-8 sm:mt-10 md:mt-12 flex flex-col sm:flex-row gap-4">
              <button
                onClick={goToApplication}
                className="group inline-flex items-center gap-3 bg-red-600 hover:bg-red-700 text-white px-8 py-4 sm:px-10 sm:py-5 rounded-2xl font-semibold text-lg sm:text-xl transition-all hover:scale-105 hover:shadow-2xl hover:shadow-red-600/30"
              >
                Başvuru Yap
                <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={goToContact}
                className="group inline-flex items-center gap-3 bg-white border-2 border-red-600 hover:bg-red-50 text-red-600 px-8 py-4 sm:px-10 sm:py-5 rounded-2xl font-semibold text-lg sm:text-xl transition-all hover:scale-105"
              >
                İletişime Geç
                <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Right - CTA Card (Clickable Button - Navigates to new page) */}
          <div className="lg:w-80 xl:w-96 lg:flex-shrink-0">
            <button 
              onClick={goToHowWeWork}
              className="w-full bg-red-600 hover:bg-red-700 rounded-3xl p-6 sm:p-8 min-h-[280px] sm:min-h-[320px] lg:min-h-[380px] flex flex-col relative overflow-hidden text-left transition-all hover:scale-[1.02] hover:shadow-2xl hover:shadow-red-600/20 cursor-pointer group"
            >
              {/* Decorative circles */}
              <div className="absolute top-4 right-4 sm:top-6 sm:right-6">
                <svg width="80" height="80" viewBox="0 0 80 80" fill="none" className="w-16 h-16 sm:w-20 sm:h-20">
                  <circle cx="60" cy="20" r="30" stroke="white" strokeWidth="1" opacity="0.2" fill="none"/>
                  <circle cx="60" cy="20" r="50" stroke="white" strokeWidth="1" opacity="0.15" fill="none"/>
                </svg>
              </div>
              
              {/* Video icon */}
              <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-white rounded-full flex items-center justify-center mb-auto group-hover:scale-110 transition-transform">
                <Video className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-red-600" />
              </div>
              
              {/* Arrow */}
              <div className="absolute top-6 right-6 sm:top-8 sm:right-8 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">
                <ArrowUpRight className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white" />
              </div>
              
              {/* Text */}
              <div className="mt-auto">
                <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight">
                  Nasıl<br />Çalışıyoruz?
                </h3>
              </div>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
