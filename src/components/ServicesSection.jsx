import { Palette, Shirt, Sparkles, Plane } from 'lucide-react';

/**
 * ServicesSection Component
 * Hizmet kategorileri - Kırmızı-Beyaz Tema
 */
const ServicesSection = () => {
  const services = [
    {
      icon: Palette,
      title: "Sanat & Life Style",
      description: "Sanatçıların markanıza kattığı değer.. Markanıza özel kurgular ile içerik üretirler.",
      color: "#DC2626"
    },
    {
      icon: Shirt,
      title: "Moda & Tasarım",
      description: "Eğer içeriğiniz moda ve tasarım ile ilgili görsellerse, Instagram doğası gereği sizin için uygun platformdur.",
      color: "#EF4444"
    },
    {
      icon: Sparkles,
      title: "Beauty",
      description: "Güzellik sırları güncelliğini asla kaybetmemiştir. Kozmetik ve güzellik içerikleri ile milyonlara ulaşın.",
      color: "#B91C1C"
    },
    {
      icon: Plane,
      title: "Seyahat",
      description: "Keşfedilmemiş rotalar ve deneyimler ile takipçilerinizi büyüleyin.",
      color: "#DC2626"
    }
  ];

  return (
    <section className="bg-white py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-red-600 text-sm font-semibold tracking-wider uppercase">
            Hizmetlerimiz
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mt-4">
            Influencer'lar İnternetin
            <br />
            <span className="text-gray-600">Otoritesi Olmaya Devam Ediyor</span>
          </h2>
          <p className="text-gray-600 mt-6 max-w-2xl mx-auto text-lg">
            Mobilde geçirilen zamanın artması ile influencer'lar, samimi, ilgili ve etkileşimli 
            takipçiler olan spesifik niş gruplar için kilit fikir önderleri oluyorlar.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <div 
                key={index}
                className="group bg-gray-50 border border-gray-200 rounded-3xl p-8 hover:bg-red-50 hover:border-red-200 transition-all duration-300 cursor-pointer"
              >
                <div 
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
                  style={{ backgroundColor: service.color + '20' }}
                >
                  <IconComponent className="w-7 h-7" style={{ color: service.color }} />
                </div>
                <h3 className="text-gray-900 text-xl font-semibold mb-3">{service.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{service.description}</p>
              </div>
            );
          })}
        </div>

        {/* Info Box */}
        <div className="mt-16 bg-gradient-to-r from-red-50 to-red-100 rounded-3xl p-8 md:p-12 border border-red-200">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Yeni Modern Influencer & Reklam
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Markalarla bireyler arasında kişisel ve güçlü bir bağlantı kuran influencer 
                marketing'in şirketlere sağladığı geri dönüş de oldukça büyük. Pazarlamanın 
                dijital versiyonu da denebilir.
              </p>
            </div>
            <div className="text-gray-700 leading-relaxed">
              <p>
                Influencer'ların öncülük ettiği bu cirolar sağlam, güvenilir ve üssel bir 
                şekilde geleneksel reklamcılık medyalarından daha etkili olarak algılanıyor.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
