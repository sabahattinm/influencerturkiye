import { Users, TrendingUp, Target, Zap } from 'lucide-react';

/**
 * MicroInfluencerSection Component
 * Micro influencer stratejisi açıklaması
 */
const MicroInfluencerSection = () => {
  const benefits = [
    { icon: Users, title: "Niş Topluluklar", desc: "Daha bağlı ve etkileşimli kitle" },
    { icon: Target, title: "Hedefli Pazarlama", desc: "Doğru kitleye doğru mesaj" },
    { icon: TrendingUp, title: "Yüksek Etkileşim", desc: "Daha fazla organik etkileşim" },
    { icon: Zap, title: "Özgün İçerik", desc: "Güvenilir ve samimi paylaşımlar" }
  ];

  return (
    <section className="bg-[#171719] py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Content */}
          <div>
            <span className="text-[#ad7bff] text-sm font-semibold tracking-wider uppercase">
              Strateji
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mt-4 leading-tight">
              Etkili Geri Dönüş İçin
              <span className="text-[#d3f26a]"> Micro Influencer</span>
            </h2>
            
            <div className="mt-8 space-y-6">
              <blockquote className="border-l-4 border-[#d3f26a] pl-6 py-2">
                <p className="text-white text-lg italic">
                  "Influencer'ların daha küçük bir kitlesi olduğu zaman bu daha niş ve bağlı bir 
                  topluluk olur ve bu oran etkilenmeye daha müsaittir."
                </p>
                <cite className="text-gray-500 text-sm mt-2 block">
                  — Shannon Truax, Group Nine Kıdemli Direktörü
                </cite>
              </blockquote>

              <p className="text-gray-400 leading-relaxed">
                Nielsen'in Global Trust in Advertising araştırmasında insanların geleneksel reklam 
                ve ilanlardan ziyade aile, arkadaş ve marka sahipli websitelere daha çok güvendiği 
                ortaya çıkıyor.
              </p>

              <p className="text-gray-400 leading-relaxed">
                Daha az takipçisi olan (10 bin – 100 bin arası) bu düşünce liderleri ilgili, 
                etkileşimli ve bağlantılı kitleyi, makro-influencer olan rakiplerine göre daha 
                fazla ellerinde tutabiliyorlar.
              </p>
            </div>

            {/* Benefits */}
            <div className="grid grid-cols-2 gap-4 mt-10">
              {benefits.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#242426] flex items-center justify-center flex-shrink-0">
                      <IconComponent className="w-5 h-5 text-[#d3f26a]" />
                    </div>
                    <div>
                      <h4 className="text-white font-medium text-sm">{item.title}</h4>
                      <p className="text-gray-500 text-xs mt-1">{item.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right - Example */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-[#ad7bff]/20 to-[#d3f26a]/10 rounded-3xl p-8">
              <div className="text-[#ad7bff] text-sm font-semibold mb-4">ÖRNEK</div>
              <h3 className="text-white text-2xl font-bold mb-4">Basit Bir Matematik</h3>
              <p className="text-gray-400 leading-relaxed mb-6">
                Bir spor şirketi, 2 milyon takipçili bir sosyal ünlüyle birlikte çalışırsa 
                büyük bir izleyici havuzuna erişebilir ancak yüzde 90'ı spor hayranı olmayabilir.
              </p>
              <div className="bg-[#171719] rounded-2xl p-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 rounded-xl bg-red-500/10 border border-red-500/20">
                    <div className="text-2xl font-bold text-red-400">1</div>
                    <div className="text-xs text-gray-500 mt-1">Ünlü (2M takipçi)</div>
                    <div className="text-xs text-red-400 mt-2">%10 alakalı kitle</div>
                  </div>
                  <div className="text-center p-4 rounded-xl bg-green-500/10 border border-green-500/20">
                    <div className="text-2xl font-bold text-green-400">100</div>
                    <div className="text-xs text-gray-500 mt-1">Micro Influencer</div>
                    <div className="text-xs text-green-400 mt-2">%90 alakalı kitle</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#242426] rounded-3xl p-8">
              <p className="text-gray-300 leading-relaxed">
                "Aynı miktar bütçeyle markalar 2 ünlü yerine 20 veya 40 'power-middle influencer'larla 
                iş birliği yapıp farklı demografiklerde kitleye erişip daha fazla etkileşim sağlayabilirler."
              </p>
              <div className="flex items-center gap-3 mt-6">
                <div className="w-10 h-10 rounded-full bg-[#ad7bff] flex items-center justify-center">
                  <span className="text-white font-bold text-sm">FT</span>
                </div>
                <div>
                  <div className="text-white font-medium text-sm">Fergus Thomas</div>
                  <div className="text-gray-500 text-xs">Influencer Marketing Uzmanı</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MicroInfluencerSection;
