import { useState } from 'react';
import { Instagram, Youtube, Twitter, Users, Heart, MessageCircle, Eye } from 'lucide-react';

/**
 * PortfolioPage - Influencer Portföy Sayfası
 */
const PortfolioPage = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const filters = [
    { id: 'all', label: 'Tümü' },
    { id: 'moda', label: 'Moda' },
    { id: 'lifestyle', label: 'Life Style' },
    { id: 'sanat', label: 'Sanat' },
    { id: 'beauty', label: 'Beauty' },
    { id: 'seyahat', label: 'Seyahat' }
  ];

  const influencers = [
    { 
      name: "Cerem Onurluer", 
      category: "Sanatçı / Influencer", 
      type: "sanat",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=500&fit=crop&crop=face", 
      followers: "125K",
      engagement: "8.5%",
      platform: "instagram"
    },
    { 
      name: "Gizem Kurtulmuş", 
      category: "Moda / Life Style", 
      type: "moda",
      image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=500&fit=crop&crop=face", 
      followers: "89K",
      engagement: "12.3%",
      platform: "instagram"
    },
    { 
      name: "Tuana Schumacher", 
      category: "Moda / Influencer", 
      type: "moda",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=500&fit=crop&crop=face", 
      followers: "156K",
      engagement: "9.7%",
      platform: "instagram"
    },
    { 
      name: "Gül Korzay", 
      category: "Life Style / Influencer", 
      type: "lifestyle",
      image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=500&fit=crop&crop=face", 
      followers: "67K",
      engagement: "14.2%",
      platform: "instagram"
    },
    { 
      name: "Hande Aselbelis", 
      category: "Influencer / Life Style", 
      type: "lifestyle",
      image: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=400&h=500&fit=crop&crop=face", 
      followers: "203K",
      engagement: "7.8%",
      platform: "instagram"
    },
    { 
      name: "Ada Özdemir", 
      category: "Beauty / Influencer", 
      type: "beauty",
      image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=500&fit=crop&crop=face", 
      followers: "45K",
      engagement: "15.6%",
      platform: "instagram"
    },
    { 
      name: "Şeyma Karakuş", 
      category: "Influencer / Moda", 
      type: "moda",
      image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=500&fit=crop&crop=face", 
      followers: "112K",
      engagement: "10.1%",
      platform: "instagram"
    },
    { 
      name: "Aleyna Bağdaçiçek", 
      category: "Life Style / Influencer", 
      type: "lifestyle",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=500&fit=crop&crop=face", 
      followers: "78K",
      engagement: "11.4%",
      platform: "instagram"
    },
    { 
      name: "Deniz Yılmaz", 
      category: "Seyahat / Influencer", 
      type: "seyahat",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop&crop=face", 
      followers: "92K",
      engagement: "9.3%",
      platform: "instagram"
    },
    { 
      name: "Elif Korkmaz", 
      category: "Beauty / Life Style", 
      type: "beauty",
      image: "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?w=400&h=500&fit=crop&crop=face", 
      followers: "134K",
      engagement: "8.9%",
      platform: "instagram"
    },
    { 
      name: "Merve Aktaş", 
      category: "Moda / Beauty", 
      type: "moda",
      image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&h=500&fit=crop&crop=face", 
      followers: "167K",
      engagement: "7.5%",
      platform: "instagram"
    },
    { 
      name: "Selin Demir", 
      category: "Sanat / Life Style", 
      type: "sanat",
      image: "https://images.unsplash.com/photo-1496440737103-cd596325d314?w=400&h=500&fit=crop&crop=face", 
      followers: "54K",
      engagement: "13.8%",
      platform: "instagram"
    }
  ];

  const filteredInfluencers = activeFilter === 'all' 
    ? influencers 
    : influencers.filter(i => i.type === activeFilter);

  const stats = [
    { icon: Users, value: "13.150+", label: "Influencer" },
    { icon: Heart, value: "2.5M+", label: "Toplam Takipçi" },
    { icon: Eye, value: "500M+", label: "Aylık Görüntülenme" },
    { icon: MessageCircle, value: "%12", label: "Ort. Etkileşim" }
  ];

  return (
    <section className="bg-[#171719] py-20 px-6 min-h-screen">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-[#ad7bff] text-sm font-semibold tracking-wider uppercase">
            Portföyümüz
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mt-4">
            Influencer Portföyü
          </h1>
          <p className="text-gray-400 mt-6 max-w-2xl mx-auto text-lg">
            Türkiye'nin dört bir yanından, farklı kategorilerde binlerce influencer ile 
            markanızı büyütün. Doğru influencer'ı seçmenize yardımcı oluyoruz.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div key={index} className="bg-[#242426] rounded-2xl p-6 text-center">
                <IconComponent className="w-8 h-8 text-[#d3f26a] mx-auto mb-3" />
                <div className="text-2xl md:text-3xl font-bold text-white">{stat.value}</div>
                <div className="text-gray-500 text-sm">{stat.label}</div>
              </div>
            );
          })}
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-6 py-3 rounded-full text-sm font-medium transition-all ${
                activeFilter === filter.id
                  ? 'bg-[#d3f26a] text-black'
                  : 'bg-[#242426] text-gray-400 hover:bg-[#2a2a2c] hover:text-white'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Influencer Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {filteredInfluencers.map((influencer, index) => (
            <div 
              key={index}
              className="group relative rounded-3xl overflow-hidden cursor-pointer bg-[#242426]"
            >
              {/* Image */}
              <div className="aspect-[3/4] overflow-hidden">
                <img
                  src={influencer.image}
                  alt={influencer.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
              
              {/* Platform Badge */}
              <div className="absolute top-4 right-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                  {influencer.platform === 'instagram' && <Instagram className="w-5 h-5 text-white" />}
                  {influencer.platform === 'youtube' && <Youtube className="w-5 h-5 text-white" />}
                  {influencer.platform === 'twitter' && <Twitter className="w-5 h-5 text-white" />}
                </div>
              </div>
              
              {/* Content */}
              <div className="absolute inset-x-0 bottom-0 p-4">
                <h3 className="text-white font-semibold text-lg">{influencer.name}</h3>
                <p className="text-gray-400 text-sm mb-3">{influencer.category}</p>
                
                {/* Stats */}
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4 text-[#d3f26a]" />
                    <span className="text-white text-sm font-medium">{influencer.followers}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Heart className="w-4 h-4 text-[#ff7bb8]" />
                    <span className="text-white text-sm font-medium">{influencer.engagement}</span>
                  </div>
                </div>
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-[#d3f26a]/0 group-hover:bg-[#d3f26a]/10 transition-all duration-300" />
            </div>
          ))}
        </div>

        {/* Load More / CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-[#ad7bff]/20 to-[#d3f26a]/20 rounded-3xl p-12 border border-white/5">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Aradığınız Influencer'ı Bulamadınız mı?
            </h3>
            <p className="text-gray-400 max-w-xl mx-auto mb-8">
              13.000'den fazla influencer veritabanımızda markanıza en uygun kişileri 
              sizin için buluyoruz. Hemen bizimle iletişime geçin.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/iletisim"
                className="inline-flex items-center justify-center gap-2 bg-[#d3f26a] hover:bg-[#c5e45c] text-black px-8 py-4 rounded-2xl font-semibold transition-all hover:scale-105"
              >
                Bize Ulaşın
              </a>
              <a 
                href="tel:+905542290101"
                className="inline-flex items-center justify-center gap-2 bg-[#242426] hover:bg-[#2a2a2c] text-white px-8 py-4 rounded-2xl font-semibold transition-all"
              >
                +90 554 229 0101
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default PortfolioPage;

