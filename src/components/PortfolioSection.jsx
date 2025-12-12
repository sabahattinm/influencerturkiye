import { Link } from 'react-router-dom';
import { Instagram, ArrowRight } from 'lucide-react';

/**
 * PortfolioSection Component
 * Influencer portföyü - Ana sayfada gösterilen özet
 * Kırmızı-Beyaz Tema
 */
const PortfolioSection = () => {
  const influencers = [
    { name: "Cerem Onurluer", category: "Sanatçı / Influencer", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=500&fit=crop&crop=face", color: "#DC2626", followers: 156000 },
    { name: "Gizem Kurtulmuş", category: "Moda / Life Style", image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=500&fit=crop&crop=face", color: "#EF4444", followers: 423000 },
    { name: "Tuana Schumacher", category: "Moda / Influencer", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=500&fit=crop&crop=face", color: "#B91C1C", followers: 89000 },
    { name: "Gül Korzay", category: "Life Style / Influencer", image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=500&fit=crop&crop=face", color: "#DC2626", followers: 1250000 },
    { name: "Hande Aselbelis", category: "Influencer / Life Style", image: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=400&h=500&fit=crop&crop=face", color: "#EF4444", followers: 67000 },
    { name: "Ada Özdemir", category: "Influencer / Life Style", image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=500&fit=crop&crop=face", color: "#B91C1C", followers: 298000 },
    { name: "Şeyma Karakuş", category: "Influencer / Moda", image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=500&fit=crop&crop=face", color: "#DC2626", followers: 512000 },
    { name: "Aleyna Bağdaçiçek", category: "Life Style / Influencer", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=500&fit=crop&crop=face", color: "#EF4444", followers: 178000 }
  ];

  const filterTags = ["Instagram", "Akış", "İçerik", "Özel", "Hikaye"];

  return (
    <section id="portfolio" className="bg-white py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <span className="text-red-600 text-sm font-semibold tracking-wider uppercase">
              Portföy
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mt-4">
              Influencer Portföyü
            </h2>
          </div>
          
          {/* Filter Tags */}
          <div className="flex flex-wrap gap-3">
            {filterTags.map((tag, index) => (
              <button
                key={index}
                className={`px-4 py-2 rounded-full text-sm transition-all ${
                  index === 0 
                    ? 'bg-red-600 text-white font-medium' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200 border border-gray-300'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Influencer Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {influencers.map((influencer, index) => (
            <div 
              key={index}
              className="group relative rounded-3xl overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-shadow"
            >
              <img
                src={influencer.image}
                alt={influencer.name}
                width="400"
                height="533"
                sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 300px"
                loading="lazy"
                className="w-full aspect-[3/4] object-cover transition-transform duration-500 group-hover:scale-110"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Follower Badge - Always Visible */}
              <div className="absolute top-3 right-3">
                <div className="bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full flex items-center gap-1.5 shadow-lg">
                  <svg className="w-3.5 h-3.5 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
                  </svg>
                  <span className="text-xs font-semibold text-gray-800">
                    {influencer.followers >= 1000000 
                      ? `${(influencer.followers / 1000000).toFixed(1)}M` 
                      : `${(influencer.followers / 1000).toFixed(0)}K`}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center mb-3"
                  style={{ backgroundColor: influencer.color }}
                >
                  <Instagram className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-white font-semibold">{influencer.name}</h3>
                <p className="text-gray-300 text-sm">{influencer.category}</p>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="flex justify-center mt-12">
          <Link 
            to="/portfolyo"
            className="group flex items-center gap-3 bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-2xl font-semibold transition-all hover:scale-105"
          >
            Tüm Portföyü Gör
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
