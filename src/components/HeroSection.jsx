import { Search, Mic, ArrowUpRight, Video } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

/**
 * HeroSection Component - Türkçe
 */
const HeroSection = () => {
  const navigate = useNavigate();
  
  const avatars = [
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face",
  ];

  // Navigate to How We Work page
  const goToHowWeWork = () => {
    navigate('/nasil-calisiyoruz');
  };

  return (
    <section className="bg-[#171719] px-6 py-8 lg:py-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-start gap-8">
          
          {/* Left Content */}
          <div className="flex-1">
            {/* Main Headline */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1]">
              {/* First line */}
              <div className="flex items-center gap-3 flex-wrap">
                <span>Bul</span>
                {/* Search icon with lime border */}
                <div className="inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 border-2 border-[#d3f26a] rounded-full">
                  <Search className="w-6 h-6 md:w-7 md:h-7 text-[#d3f26a]" />
                </div>
                <span>Influencer'ları</span>
              </div>
              
              {/* Second line with avatars */}
              <div className="flex items-center gap-4 mt-1">
                {/* Overlapping avatars */}
                <div className="flex -space-x-2">
                  {avatars.map((avatar, index) => (
                    <img
                      key={index}
                      src={avatar}
                      alt={`Kullanıcı ${index + 1}`}
                      className="w-12 h-12 md:w-14 md:h-14 rounded-full border-2 border-[#171719] object-cover"
                      style={{ zIndex: avatars.length - index }}
                    />
                  ))}
                </div>
                <span className="text-gray-500 font-normal">işbirliği için</span>
              </div>
              
              {/* Third line */}
              <div className="text-gray-500 font-normal mt-1">keşfet</div>
            </h1>

            {/* Search Bar */}
            <div className="mt-8 max-w-xl">
              <div className="flex items-center bg-[#242426] rounded-2xl p-2 pl-6">
                <input
                  type="text"
                  placeholder="Ara"
                  className="flex-1 bg-transparent text-white placeholder-gray-500 outline-none text-lg py-2"
                />
                <button className="p-3 text-gray-400 hover:text-white transition-colors">
                  <Mic className="w-5 h-5" />
                </button>
                <button className="bg-[#d3f26a] hover:bg-[#c5e45c] p-3 rounded-xl transition-colors">
                  <Search className="w-5 h-5 text-black" />
                </button>
              </div>
            </div>
          </div>

          {/* Right - CTA Card (Clickable Button - Navigates to new page) */}
          <div className="lg:w-64 xl:w-72">
            <button 
              onClick={goToHowWeWork}
              className="w-full bg-[#d3f26a] rounded-3xl p-6 h-full min-h-[220px] flex flex-col relative overflow-hidden text-left transition-all hover:scale-[1.02] hover:shadow-2xl hover:shadow-[#d3f26a]/20 cursor-pointer group"
            >
              {/* Decorative circles */}
              <div className="absolute top-4 right-4">
                <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                  <circle cx="60" cy="20" r="30" stroke="#171719" strokeWidth="1" opacity="0.2" fill="none"/>
                  <circle cx="60" cy="20" r="50" stroke="#171719" strokeWidth="1" opacity="0.15" fill="none"/>
                </svg>
              </div>
              
              {/* Video icon */}
              <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mb-auto group-hover:scale-110 transition-transform">
                <Video className="w-5 h-5 text-white" />
              </div>
              
              {/* Arrow */}
              <div className="absolute top-6 right-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">
                <ArrowUpRight className="w-8 h-8 text-black" />
              </div>
              
              {/* Text */}
              <div className="mt-auto">
                <h3 className="text-2xl font-bold text-black leading-tight">
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
