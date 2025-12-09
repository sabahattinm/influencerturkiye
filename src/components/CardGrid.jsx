import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import InfluencerCard from './InfluencerCard';

// Import influencer images
import zeyZorImage from '../assets/zey_zor.webp';
import clburakkkImage from '../assets/clburakkk.webp';
import jankovicsametImage from '../assets/jankovicsamet.webp';
import boncuksaraImage from '../assets/boncuksara.webp';
import drIlaydasimaygulImage from '../assets/dr_ilaydasimaygul.webp';
import senasuraeerrImage from '../assets/senasuraeerr.webp';

// Import Swiper styles
import 'swiper/css';

/**
 * CardGrid Component - Slider with Influencer Cards
 * InfluencerCard component'i üzerinden temiz slider tasarımı
 */
const CardGrid = () => {
  const swiperRef = useRef(null);

  const influencers = [
    {
      id: 1,
      image: zeyZorImage,
      name: "Zeynep Boz",
      instagramUrl: "https://www.instagram.com/zey_zor",
      engagementRate: "%2",
      followers: 813000
    },
    {
      id: 2,
      image: clburakkkImage,
      name: "Burak Çelebi",
      instagramUrl: "https://www.instagram.com/clburakkk",
      engagementRate: "%8",
      followers: 321000
    },
    {
      id: 3,
      image: jankovicsametImage,
      name: "Samet Jankovic",
      instagramUrl: "https://www.instagram.com/jankovicsamet",
      engagementRate: "%3",
      followers: 261000
    },
    {
      id: 4,
      image: boncuksaraImage,
      name: "Sara Yılmaz",
      instagramUrl: "https://www.instagram.com/boncuksara",
      engagementRate: "%8",
      followers: 896000
    },
    {
      id: 5,
      image: drIlaydasimaygulImage,
      name: "İlayda Simay Gül",
      instagramUrl: "https://www.instagram.com/dr.ilaydasimaygul",
      engagementRate: "%4",
      followers: 172000
    },
    {
      id: 6,
      image: senasuraeerrImage,
      name: "Sena Şura Er",
      instagramUrl: "https://www.instagram.com/senasuraeerr",
      engagementRate: "%3",
      followers: 354000
    }
  ];

  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-6">
        <Swiper
          modules={[Autoplay]}
          spaceBetween={20}
          slidesPerView={2}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          loop={false}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          onSlideChange={(swiper) => {
            // "Tümünü Gör" kartı index 6 (son kart)
            // Eğer son karta geldiyse, 3 saniye gösterdikten sonra başa dön
            if (swiper.activeIndex === 6) {
              setTimeout(() => {
                swiper.slideTo(0, 500); // 500ms hızlı geçiş ile başa dön
              }, 3000); // 3 saniye gösterdikten sonra başa dön
            }
          }}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 24,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 28,
            },
          }}
          className="influencer-swiper"
        >
          {/* Influencer Cards */}
          {influencers.map((influencer) => (
            <SwiperSlide key={influencer.id}>
              <InfluencerCard
                image={influencer.image}
                name={influencer.name}
                instagramUrl={influencer.instagramUrl}
                engagementRate={influencer.engagementRate}
                followers={influencer.followers}
                alt={influencer.name}
                className="aspect-[3/4]"
              />
            </SwiperSlide>
          ))}

          {/* Show All Card - Red (Clickable Link to Portfolio Page) */}
          <SwiperSlide>
            <Link 
              to="/portfolyo"
              className="bg-red-600 hover:bg-red-700 rounded-3xl p-6 flex flex-col aspect-[3/4] transition-all hover:scale-[1.02] hover:shadow-2xl hover:shadow-red-600/20 group h-full"
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
          </SwiperSlide>
        </Swiper>
      </div>
    </section>
  );
};

export default CardGrid;
