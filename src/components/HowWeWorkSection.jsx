import { Link } from 'react-router-dom';
import { 
  Users, 
  Target, 
  MessageCircle, 
  Sparkles, 
  Phone, 
  Calendar, 
  UserCheck, 
  Megaphone, 
  Camera, 
  BarChart3,
  CheckCircle,
  Heart,
  Zap
} from 'lucide-react';

/**
 * HowWeWorkSection Component
 * Nasıl Çalışıyoruz - Dikey Timeline ile 6 adımlı süreç
 */
const HowWeWorkSection = () => {
  // Süreç adımları
  const processSteps = [
    {
      number: "01",
      icon: Phone,
      title: "Tanışma",
      description: "Yetkilimiz firmanızı tanımak ve konu hakkında bilgi almak için e-mail, telefon veya video konferans ile sizinle iletişime geçiyor.",
      color: "#d3f26a"
    },
    {
      number: "02",
      icon: Calendar,
      title: "Stratejik Planlama",
      description: "Markayı doğru konumlandırmak için reklam yayın planı tarih, zaman ve mecra seçimi konusunda takvim hazırlayıp onayınıza sunuyoruz.",
      color: "#ad7bff"
    },
    {
      number: "03",
      icon: UserCheck,
      title: "Doğru Influencer Tespiti",
      description: "Planlamaya göre influencer listesi hazırlayıp size sunuyoruz. Bu listede kanalların etkileşim oranını, trafiğini, yaş grubu, cinsiyet ve takipçi kitlesini görebiliyorsunuz.",
      color: "#ff7bb8"
    },
    {
      number: "04",
      icon: Megaphone,
      title: "Reklam ve Kampanya Yönetimi",
      description: "Ürün ve markanın hazır görsellerinin belirlenen tarih aralığında ve saatinde yayın planı takvimine uygun olarak influencer'e ulaşımı ekibimiz tarafından sağlanır.",
      color: "#4ecdc4"
    },
    {
      number: "05",
      icon: Camera,
      title: "İçerik Üretimi ve Yayınlama",
      description: "Influencer ürün ile özgün içerik üretiyor, profesyonel çekimlerini tamamlıyor ve kanalında reklamınızı sizin geri dönüş ölçümlemenizi sağlayacak şekilde yapıyor.",
      color: "#d3f26a"
    },
    {
      number: "06",
      icon: BarChart3,
      title: "Erişim ve Etkileşim Raporlama",
      description: "Yayın sonrası ister günlük ister haftalık yapılan yayınların gösterim ve izlenme istatiklerini rapor halinde tarafınıza gönderiyoruz.",
      color: "#ad7bff"
    }
  ];

  // Micro influencer avantajları
  const advantages = [
    {
      icon: Target,
      title: "Hedef Kitle",
      description: "Hedef kitlenize göre doğru influencer seçimi yapıyoruz."
    },
    {
      icon: Sparkles,
      title: "Etkileyici İçerik",
      description: "Teşvik edici ve özgün içeriklerle hedef kitlenizi harekete geçiriyoruz."
    },
    {
      icon: Heart,
      title: "Samimiyet Olgusu",
      description: "Micro-influencer'ların samimiyeti satın alma kararlarını etkiliyor."
    },
    {
      icon: MessageCircle,
      title: "İletişim Gücü",
      description: "Çift yönlü güçlü iletişim ile takipçi sadakatini artırıyoruz."
    }
  ];

  return (
    <section id="how-we-work" className="bg-[#171719] py-20 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-[#d3f26a] text-sm font-semibold tracking-wider uppercase">
            Sürecimiz
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mt-4">
            Nasıl Çalışıyoruz?
          </h2>
          <p className="text-gray-400 mt-6 max-w-3xl mx-auto text-lg leading-relaxed">
            Mikro-influencer pazarlama ile markanızı doğru kitleye, doğru zamanda, doğru içerikle ulaştırıyoruz. 
            Büyük bütçeler yerine akıllı stratejilerle maksimum etki sağlıyoruz.
          </p>
        </div>

        {/* Micro Influencer Intro Box */}
        <div className="bg-gradient-to-r from-[#d3f26a]/10 to-[#ad7bff]/10 rounded-3xl p-8 md:p-12 mb-20 border border-white/5">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#d3f26a]/20 rounded-full text-[#d3f26a] text-sm font-medium mb-4">
                <Users className="w-4 h-4" />
                Micro Influencer Nedir?
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Güvenilir Kaynak, Gerçek Etki
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Kendi kategorilerinin dışına çıkmayan, gerçekten bilgili ve tutkulu, önerileri güvenilir 
                kaynak olarak görülen kişilere micro-influencer denir. 10.000 - 100.000 takipçili bu 
                influencer'lar, büyük ünlülerden çok daha hedefli ve ekonomik çözümler sunar.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#242426] rounded-2xl p-6 text-center">
                <div className="text-3xl font-bold text-[#d3f26a]">10K-100K</div>
                <div className="text-gray-500 text-sm mt-1">Takipçi Aralığı</div>
              </div>
              <div className="bg-[#242426] rounded-2xl p-6 text-center">
                <div className="text-3xl font-bold text-[#ad7bff]">%8-15</div>
                <div className="text-gray-500 text-sm mt-1">Etkileşim Oranı</div>
              </div>
              <div className="bg-[#242426] rounded-2xl p-6 text-center">
                <div className="text-3xl font-bold text-[#ff7bb8]">81</div>
                <div className="text-gray-500 text-sm mt-1">İl Kapsama</div>
              </div>
              <div className="bg-[#242426] rounded-2xl p-6 text-center">
                <div className="text-3xl font-bold text-[#4ecdc4]">13K+</div>
                <div className="text-gray-500 text-sm mt-1">Influencer</div>
              </div>
            </div>
          </div>
        </div>

        {/* Vertical Timeline - 6 Steps */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold text-white text-center mb-16">
            6 Adımda Başarılı Kampanya
          </h3>
          
          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-[#d3f26a] via-[#ad7bff] to-[#4ecdc4] rounded-full hidden lg:block" />
            
            {/* Timeline Items */}
            <div className="space-y-12 lg:space-y-0">
              {processSteps.map((step, index) => {
                const IconComponent = step.icon;
                const isEven = index % 2 === 0;
                
                return (
                  <div 
                    key={index}
                    className={`relative lg:flex lg:items-center lg:mb-16 ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
                  >
                    {/* Content Card */}
                    <div className={`lg:w-5/12 ${isEven ? 'lg:pr-16 lg:text-right' : 'lg:pl-16 lg:text-left'}`}>
                      <div className="bg-[#1a1a1c] rounded-3xl p-8 border border-white/5 hover:border-white/10 transition-all">
                        {/* Mobile: Icon and number in same row */}
                        <div className={`flex items-center gap-4 mb-4 lg:hidden`}>
                          <div 
                            className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
                            style={{ backgroundColor: step.color + '20' }}
                          >
                            <IconComponent className="w-7 h-7" style={{ color: step.color }} />
                          </div>
                          <span 
                            className="text-5xl font-bold opacity-30"
                            style={{ color: step.color }}
                          >
                            {step.number}
                          </span>
                        </div>
                        
                        {/* Desktop: Icon and number positioned */}
                        <div className={`hidden lg:flex items-center gap-4 mb-4 ${isEven ? 'justify-end' : 'justify-start'}`}>
                          {isEven && (
                            <span 
                              className="text-5xl font-bold opacity-30"
                              style={{ color: step.color }}
                            >
                              {step.number}
                            </span>
                          )}
                          <div 
                            className="w-14 h-14 rounded-2xl flex items-center justify-center"
                            style={{ backgroundColor: step.color + '20' }}
                          >
                            <IconComponent className="w-7 h-7" style={{ color: step.color }} />
                          </div>
                          {!isEven && (
                            <span 
                              className="text-5xl font-bold opacity-30"
                              style={{ color: step.color }}
                            >
                              {step.number}
                            </span>
                          )}
                        </div>
                        
                        <h4 className="text-white text-xl font-semibold mb-3">{step.title}</h4>
                        <p className="text-gray-500 text-sm leading-relaxed">{step.description}</p>
                      </div>
                    </div>
                    
                    {/* Center Circle (Desktop) */}
                    <div className="hidden lg:flex lg:w-2/12 justify-center">
                      <div 
                        className="w-16 h-16 rounded-full flex items-center justify-center z-10 border-4 border-[#171719]"
                        style={{ backgroundColor: step.color }}
                      >
                        <IconComponent className="w-7 h-7 text-black" />
                      </div>
                    </div>
                    
                    {/* Empty Space (Desktop) */}
                    <div className={`hidden lg:block lg:w-5/12`} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Advantages Grid */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-white text-center mb-12">
            Neden Micro-Influencer?
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {advantages.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <div 
                  key={index}
                  className="bg-[#242426] rounded-3xl p-6 text-center hover:bg-[#2a2a2c] transition-all"
                >
                  <div className="w-16 h-16 rounded-2xl bg-[#d3f26a]/10 flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-8 h-8 text-[#d3f26a]" />
                  </div>
                  <h4 className="text-white font-semibold mb-2">{item.title}</h4>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Key Benefits */}
        <div className="bg-[#242426] rounded-3xl p-8 md:p-12 mb-16">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">
                Akıllı Pazarlama, Gerçek Sonuçlar
              </h3>
              <div className="space-y-4">
                {[
                  "Hedefli kitleye doğrudan erişim",
                  "Ünlülere göre 10x daha ekonomik",
                  "Yüksek etkileşim ve güven oranı",
                  "Detaylı raporlama ve analiz",
                  "Türkiye genelinde 13.000+ influencer ağı",
                  "Profesyonel içerik koordinasyonu"
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-[#d3f26a] flex-shrink-0" />
                    <span className="text-gray-300">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-[#171719] rounded-2xl p-8">
              <div className="text-center">
                <div className="text-6xl font-bold text-[#d3f26a] mb-2">%90</div>
                <div className="text-white font-medium mb-4">Daha Hedefli Kitle</div>
                <p className="text-gray-500 text-sm">
                  2 milyon takipçili 1 ünlü yerine, alanında uzman 100 micro-influencer ile 
                  %90 daha alakalı kitleye ulaşın.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA - Teklif Al */}
        <div className="text-center bg-gradient-to-r from-[#d3f26a] to-[#a8e063] rounded-3xl p-12">
          <h3 className="text-3xl md:text-4xl font-bold text-black mb-4">
            Markanızı Büyütmeye Hazır mısınız?
          </h3>
          <p className="text-black/70 max-w-2xl mx-auto mb-8">
            Ücretsiz danışmanlık ile markanıza en uygun influencer stratejisini birlikte oluşturalım. 
            Hemen iletişime geçin, size özel teklif hazırlayalım.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/iletisim"
              className="inline-flex items-center justify-center gap-2 bg-black hover:bg-gray-900 text-white px-8 py-4 rounded-2xl font-semibold transition-all hover:scale-105"
            >
              <Zap className="w-5 h-5" />
              Teklif Al
            </Link>
            <a 
              href="tel:+905542290101"
              className="inline-flex items-center justify-center gap-2 bg-white/20 hover:bg-white/30 text-black px-8 py-4 rounded-2xl font-semibold transition-all"
            >
              <Phone className="w-5 h-5" />
              +90 554 229 0101
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};

export default HowWeWorkSection;
