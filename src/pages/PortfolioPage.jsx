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
      name: "Şükran Kaymak", 
      category: "Life Style / Influencer", 
      type: "lifestyle",
      image: "/portf/sukrankaymak.webp", 
      followers: "7.8M",
      engagement: "8%",
      platform: "instagram",
      instagramUrl: "https://instagram.com/sukrankaymak"
    },
    { 
      name: "Gizem Hatipoğlu", 
      category: "Moda / Life Style", 
      type: "moda",
      image: "/portf/hatipoglugizem.webp", 
      followers: "2.2M",
      engagement: "12%",
      platform: "instagram",
      instagramUrl: "https://instagram.com/hatipoglugizem"
    },
    { 
      name: "Asya Başol", 
      category: "Seyahat / Influencer", 
      type: "seyahat",
      image: "/portf/mayabasol.webp", 
      followers: "2.6M",
      engagement: "10%",
      platform: "instagram",
      instagramUrl: "https://instagram.com/mayabasol"
    },
    { 
      name: "Ümran Avcu", 
      category: "Moda / Influencer", 
      type: "moda",
      image: "/portf/umrantoo.webp", 
      followers: "1.4M",
      engagement: "12%",
      platform: "instagram",
      instagramUrl: "https://instagram.com/umrantoo"
    },
    { 
      name: "Tuğba Bağ", 
      category: "Influencer / Life Style", 
      type: "lifestyle",
      image: "/portf/bagtubaa.webp", 
      followers: "2M",
      engagement: "8%",
      platform: "instagram",
      instagramUrl: "https://instagram.com/bagtubaa"
    },
    { 
      name: "Özgür Balakar", 
      category: "Life Style / Influencer", 
      type: "lifestyle",
      image: "/portf/uzunmakarna.webp", 
      followers: "1.1M",
      engagement: "11%",
      platform: "instagram",
      instagramUrl: "https://instagram.com/uzunmakarna"
    },
    { 
      name: "Betül Demirkaya", 
      category: "Beauty / Influencer", 
      type: "beauty",
      image: "/portf/betizmmm.webp", 
      followers: "1M",
      engagement: "12%",
      platform: "instagram",
      instagramUrl: "https://instagram.com/betizmmm"
    },
    { 
      name: "Ecmel Rümeysa Kaya", 
      category: "Influencer / Moda", 
      type: "moda",
      image: "/portf/ecmelrumeysa.webp", 
      followers: "964K",
      engagement: "9%",
      platform: "instagram",
      instagramUrl: "https://instagram.com/ecmelrumeysa"
    },
    { 
      name: "Songül Dönmez", 
      category: "Life Style / Influencer", 
      type: "lifestyle",
      image: "/portf/emure_ozd.webp", 
      followers: "1M",
      engagement: "11%",
      platform: "instagram",
      instagramUrl: "https://instagram.com/emure_ozd"
    },
    { 
      name: "Halide Acar", 
      category: "Life Style / Influencer", 
      type: "lifestyle",
      image: "/portf/aytachalideacar.webp", 
      followers: "941K",
      engagement: "12%",
      platform: "instagram",
      instagramUrl: "https://instagram.com/aytachalideacar"
    },
    { 
      name: "Leyla Günay", 
      category: "Life Style / Influencer", 
      type: "lifestyle",
      image: "/portf/leyla_gunay.webp", 
      followers: "1M",
      engagement: "8%",
      platform: "instagram",
      instagramUrl: "https://instagram.com/leylaa_gunay"
    },
    { 
      name: "Songül Dönmez", 
      category: "Life Style / Influencer", 
      type: "lifestyle",
      image: "/portf/saancez.webp", 
      followers: "1M",
      engagement: "10%",
      platform: "instagram",
      instagramUrl: "https://instagram.com/saancez"
    },

  
    { 
      name: "Aleyna Atalar", 
      category: "Moda / Influencer", 
      type: "moda",
      image: "/portf/atalaraleyna.webp", 
      followers: "804K",
      engagement: "12%",
      platform: "instagram",
      instagramUrl: "https://instagram.com/atalaraleyna"
    },
    { 
      name: "Özlem Mekik", 
      category: "Moda / Beauty", 
      type: "moda",
      image: "/portf/ozlemmekik.webp", 
      followers: "706K",
      engagement: "8%",
      platform: "instagram",
      instagramUrl: "https://instagram.com/ozlemmekik"
    },
    { 
      name: "Asena Olgun", 
      category: "Moda / Life Style", 
      type: "moda",
      image: "/portf/asenaaolgun.webp", 
      followers: "894K",
      engagement: "10%",
      platform: "instagram",
      instagramUrl: "https://instagram.com/asenaaolgun"
    },
    { 
      name: "Serap Korkmaz", 
      category: "Moda / Beauty", 
      type: "moda",
      image: "/portf/serapinakappa.webp", 
      followers: "602K",
      engagement: "10%",
      platform: "instagram",
      instagramUrl: "https://instagram.com/serapinakappa"
    },
    { 
      name: "Melek Öğüt", 
      category: "Beauty / Influencer", 
      type: "beauty",
      image: "/portf/melekicmeli.webp", 
      followers: "501K",
      engagement: "5%",
      platform: "instagram",
      instagramUrl: "https://instagram.com/melekicmeli"
    },

    { 
      name: "Oğuzhan Şahin", 
      category: "Sanat / Life Style", 
      type: "sanat",
      image: "/portf/sahinoguzoffical.webp", 
      followers: "483K",
      engagement: "12%",
      platform: "instagram",
      instagramUrl: "https://instagram.com/sahinoguzofficial"
    },
    { 
      name: "Nurşen Şenyurt", 
      category: "Moda / Influencer", 
      type: "moda",
      image: "/portf/nursen_senyurt.webp", 
      followers: "356K",
      engagement: "6%",
      platform: "instagram",
      instagramUrl: "https://instagram.com/nursen_senyurt"
    },
    { 
      name: "Duygu Genç", 
      category: "Beauty / Life Style", 
      type: "beauty",
      image: "/portf/duygu.webp", 
      followers: "406K",
      engagement: "7%",
      platform: "instagram",
      instagramUrl: "https://instagram.com/duygu"
    },
    { 
      name: "Yaren Bahadır", 
      category: "Beauty / Influencer", 
      type: "beauty",
      image: "/portf/yareento.webp", 
      followers: "391K",
      engagement: "8%",
      platform: "instagram",
      instagramUrl: "https://instagram.com/yareento"
    },
    { 
      name: "Asel Kiraz", 
      category: "Life Style / Influencer", 
      type: "lifestyle",
      image: "/portf/aselkirazz.webp", 
      followers: "298K",
      engagement: "8%",
      platform: "instagram",
      instagramUrl: "https://instagram.com/aselkirazz"
    },
    { 
      name: "Nur Pehlivan", 
      category: "Life Style / Influencer", 
      type: "lifestyle",
      image: "/portf/nnurpehlivan.webp", 
      followers: "234K",
      engagement: "9%",
      platform: "instagram",
      instagramUrl: "https://instagram.com/nnurpehivan"
    },
    { 
      name: "Dilara Pusa", 
      category: "Moda / Influencer", 
      type: "moda",
      image: "/portf/dilarapusa.webp", 
      followers: "279K",
      engagement: "10%",
      platform: "instagram",
      instagramUrl: "https://instagram.com/dilarapusa"
    },
    { 
      name: "Berrak Berro", 
      category: "Life Style / Influencer", 
      type: "lifestyle",
      image: "/portf/berrakberroo.webp", 
      followers: "215K",
      engagement: "6%",
      platform: "instagram",
      instagramUrl: "https://instagram.com/berrakberroo"
    },
 
    { 
      name: "Ömer Olgun", 
      category: "Beauty / Life Style", 
      type: "beauty",
      image: "/portf/omer_olgun.webp", 
      followers: "200K",
      engagement: "35%",
      platform: "instagram",
      instagramUrl: "https://instagram.com/omer_olgun"
    },
    { 
      name: "Zeynep Boz", 
      category: "Life Style / Influencer", 
      type: "lifestyle",
      image: "/assets/zey_zor.webp", 
      followers: "813K",
      engagement: "2%",
      platform: "instagram",
      instagramUrl: "https://instagram.com/zey_zor"
    },
    { 
      name: "Burak Çelebi", 
      category: "Life Style / Influencer", 
      type: "lifestyle",
      image: "/assets/clburakkk.webp", 
      followers: "321K",
      engagement: "8%",
      platform: "instagram",
      instagramUrl: "https://instagram.com/clburakkk"
    },
    { 
      name: "Samet Jankovic", 
      category: "Sanat / Life Style", 
      type: "sanat",
      image: "/assets/jankovicsamet.webp", 
      followers: "261K",
      engagement: "3%",
      platform: "instagram",
      instagramUrl: "https://instagram.com/jankovicsamet"
    },
    { 
      name: "Sara Yılmaz", 
      category: "Life Style / Influencer", 
      type: "lifestyle",
      image: "/assets/boncuksara.webp", 
      followers: "896K",
      engagement: "8%",
      platform: "instagram",
      instagramUrl: "https://instagram.com/boncuksara"
    },
    { 
      name: "İlayda Simay Gül", 
      category: "Beauty / Life Style", 
      type: "beauty",
      image: "/assets/dr_ilaydasimaygul.webp", 
      followers: "172K",
      engagement: "4%",
      platform: "instagram",
      instagramUrl: "https://instagram.com/dr.ilaydasimaygul"
    },
    { 
      name: "Sena Şura Er", 
      category: "Life Style / Influencer", 
      type: "lifestyle",
      image: "/assets/senasuraeerr.webp", 
      followers: "354K",
      engagement: "3%",
      platform: "instagram",
      instagramUrl: "https://instagram.com/senasuraeerr"
    }
  ];

  // Helper function to convert follower string to number for sorting
  // Converts "7.8M" to 7800000, "964K" to 964000, etc.
  const parseFollowers = (followersStr) => {
    if (!followersStr) return 0;
    
    const upperStr = followersStr.toUpperCase();
    const numStr = upperStr.replace(/[^0-9.]/g, '');
    const num = parseFloat(numStr) || 0;
    
    if (upperStr.includes('M')) {
      return num * 1000000;
    } else if (upperStr.includes('K')) {
      return num * 1000;
    }
    
    return num;
  };

  // Filter and sort influencers by follower count (descending)
  const filteredInfluencers = (activeFilter === 'all' 
    ? influencers 
    : influencers.filter(i => i.type === activeFilter)
  ).sort((a, b) => {
    const followersA = parseFollowers(a.followers);
    const followersB = parseFollowers(b.followers);
    return followersB - followersA; // Sort descending (highest first)
  });

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
                  width="400"
                  height="533"
                  sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 300px"
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
              
              {/* Content */}
              <div className="absolute left-0 bottom-0 p-3 pr-16 md:pr-20">
                <h3 className="text-white font-semibold text-sm md:text-base">{influencer.name}</h3>
                <p className="text-gray-300 text-xs md:text-sm mb-2">{influencer.category}</p>
                
                {/* Stats */}
                <div className="flex items-center gap-2 md:gap-3">
                  <div className="flex items-center gap-1">
                    <Users className="w-3 h-3 md:w-4 md:h-4 text-red-400" />
                    <span className="text-white text-xs md:text-sm font-medium">{influencer.followers}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Heart className="w-3 h-3 md:w-4 md:h-4 text-red-400" />
                    <span className="text-white text-xs md:text-sm font-medium">{influencer.engagement}</span>
                  </div>
                </div>
              </div>

              {/* Platform Badge - Bottom Right */}
              {influencer.instagramUrl && (
                <a 
                  href={influencer.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="absolute bottom-3 right-3 md:bottom-4 md:right-4 z-10 hover:scale-110 transition-transform"
                >
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-red-600 flex items-center justify-center shadow-lg hover:bg-red-700 transition-colors">
                    {influencer.platform === 'instagram' && <Instagram className="w-4 h-4 md:w-5 md:h-5 text-white" />}
                    {influencer.platform === 'youtube' && <Youtube className="w-4 h-4 md:w-5 md:h-5 text-white" />}
                    {influencer.platform === 'twitter' && <Twitter className="w-4 h-4 md:w-5 md:h-5 text-white" />}
                  </div>
                </a>
              )}

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

