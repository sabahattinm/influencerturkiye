import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import InfluencerCard from './InfluencerCard';

/**
 * CardGrid Component - Türkçe
 * Kırmızı-Beyaz Tema
 */
const CardGrid = () => {
  const influencers = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=500&fit=crop&crop=face",
      name: "Elif Deniz",
      followers: 245000
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=500&fit=crop&crop=face",
      name: "Selin Yılmaz",
      followers: 189000
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=500&fit=crop&crop=face",
      name: "Kaan Demir",
      followers: 312000
    }
  ];

  return (
    <section className="bg-white px-6 pb-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          
          {/* First Influencer Card */}
          <InfluencerCard
            image={influencers[0].image}
            alt={influencers[0].name}
            followers={influencers[0].followers}
            className="aspect-[3/4]"
          />

          {/* Second Influencer Card */}
          <InfluencerCard
            image={influencers[1].image}
            alt={influencers[1].name}
            followers={influencers[1].followers}
            className="aspect-[3/4]"
          />

          {/* Show All Card - Red (Clickable Link to Portfolio Page) */}
          <Link 
            to="/portfolyo"
            className="bg-red-600 hover:bg-red-700 rounded-3xl p-6 flex flex-col aspect-[3/4] transition-all hover:scale-[1.02] hover:shadow-2xl hover:shadow-red-600/20 group"
          >
            {/* Arrow icon */}
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-auto group-hover:bg-white/30 transition-colors">
              <ArrowRight className="w-5 h-5 text-white group-hover:translate-x-1 transition-transform" />
            </div>
            
            {/* Text */}
            <div className="mt-auto">
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-1">
                Tümünü Gör
              </h3>
              <p className="text-white/90 text-sm">
                13 150 influencer
              </p>
            </div>
          </Link>

          {/* Third Influencer Card */}
          <InfluencerCard
            image={influencers[2].image}
            alt={influencers[2].name}
            followers={influencers[2].followers}
            className="aspect-[3/4]"
          />
        </div>
      </div>
    </section>
  );
};

export default CardGrid;
