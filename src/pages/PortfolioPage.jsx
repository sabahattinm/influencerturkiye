import { useState } from 'react';
import { Link } from 'react-router-dom';
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
    <section className="bg-white py-20 px-6 min-h-screen">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-red-600 text-sm font-semibold tracking-wider uppercase">
            Portföyümüz
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mt-4">
            Influencer Portföyü
          </h1>
          <p className="text-gray-600 mt-6 max-w-2xl mx-auto text-lg">
            Türkiye'nin dört bir yanından, farklı kategorilerde binlerce influencer ile 
            markanızı büyütün. Doğru influencer'ı seçmenize yardımcı oluyoruz.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div key={index} className="bg-gray-50 border border-gray-200 rounded-2xl p-6 text-center">
                <IconComponent className="w-8 h-8 text-red-600 mx-auto mb-3" />
                <div className="text-2xl md:text-3xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-gray-600 text-sm">{stat.label}</div>
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
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200 border border-gray-300'
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
              className="group relative rounded-3xl overflow-hidden cursor-pointer bg-white border border-gray-200 shadow-sm hover:shadow-xl transition-all"
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
                <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center">
                  {influencer.platform === 'instagram' && <Instagram className="w-5 h-5 text-white" />}
                  {influencer.platform === 'youtube' && <Youtube className="w-5 h-5 text-white" />}
                  {influencer.platform === 'twitter' && <Twitter className="w-5 h-5 text-white" />}
                </div>
              </div>
              
              {/* Content */}
              <div className="absolute inset-x-0 bottom-0 p-4">
                <h3 className="text-white font-semibold text-lg">{influencer.name}</h3>
                <p className="text-gray-300 text-sm mb-3">{influencer.category}</p>
                
                {/* Stats */}
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4 text-red-400" />
                    <span className="text-white text-sm font-medium">{influencer.followers}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Heart className="w-4 h-4 text-red-400" />
                    <span className="text-white text-sm font-medium">{influencer.engagement}</span>
                  </div>
                </div>
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-red-600/0 group-hover:bg-red-600/10 transition-all duration-300" />
            </div>
          ))}
        </div>

        {/* Load More / CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-red-50 to-red-100 rounded-3xl p-12 border border-red-200">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Aradığınız Influencer'ı Bulamadınız mı?
            </h3>
            <p className="text-gray-700 max-w-xl mx-auto mb-8">
              13.000'den fazla influencer veritabanımızda markanıza en uygun kişileri 
              sizin için buluyoruz. Hemen başvuru yapın, size özel çözümler sunalım.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/basvuru"
                className="inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-2xl font-semibold transition-all hover:scale-105"
              >
                Başvuru Yap
              </Link>
              <a 
                href="tel:+905422125395"
                className="inline-flex items-center justify-center gap-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-900 px-8 py-4 rounded-2xl font-semibold transition-all"
              >
                0542 212 53 95
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default PortfolioPage;

