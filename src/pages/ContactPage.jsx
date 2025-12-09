import { MapPin, Phone, Mail, MessageSquare, Clock } from 'lucide-react';

/**
 * ContactPage - İletişim Sayfası
 */
const ContactPage = () => {

  const contactInfo = [
    {
      icon: MapPin,
      title: "Adres",
      content: "Etiler / Beşiktaş / İstanbul",
      color: "#DC2626"
    },
    {
      icon: Phone,
      title: "Telefon",
      content: "0542 212 53 95",
      color: "#EF4444",
      link: "tel:+905422125395"
    },
    {
      icon: Mail,
      title: "E-posta",
      content: "hello@influencerturkiye.com",
      color: "#B91C1C",
      link: "mailto:hello@influencerturkiye.com"
    },
    {
      icon: Clock,
      title: "Çalışma Saatleri",
      content: "Pazartesi - Cuma: 09:00 - 18:00",
      color: "#DC2626"
    }
  ];

  return (
    <section className="bg-white py-20 px-6 min-h-screen">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-red-600 text-sm font-semibold tracking-wider uppercase">
            İletişim
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mt-4">
            Bizimle İletişime Geçin
          </h1>
          <p className="text-gray-600 mt-6 max-w-2xl mx-auto text-lg">
            Sorularınız, önerileriniz veya işbirliği teklifleriniz için bizimle iletişime geçmekten çekinmeyin. 
            Size en kısa sürede dönüş yapacağız.
          </p>
        </div>

        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {contactInfo.map((info, index) => {
            const IconComponent = info.icon;
            const content = info.link ? (
              <a 
                href={info.link}
                className="hover:text-white transition-colors"
              >
                {info.content}
              </a>
            ) : (
              <span>{info.content}</span>
            );

            return (
              <div 
                key={index}
                className="bg-gray-50 border border-gray-200 rounded-3xl p-6 text-center hover:bg-red-50 hover:border-red-200 transition-all"
              >
                <div 
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
                  style={{ backgroundColor: info.color + '20' }}
                >
                  <IconComponent className="w-7 h-7" style={{ color: info.color }} />
                </div>
                <h3 className="text-gray-900 font-semibold mb-2">{info.title}</h3>
                <p className="text-gray-600 text-sm">{content}</p>
              </div>
            );
          })}
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-6">
            {/* Map */}
            <div className="bg-gray-50 border border-gray-200 rounded-3xl overflow-hidden h-96">
              <iframe
                src="https://www.google.com/maps?q=Etiler,+Beşiktaş,+İstanbul&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
                title="Influencer Türkiye - Etiler / Beşiktaş / İstanbul"
              />
            </div>

            {/* Additional Info */}
            <div className="bg-gradient-to-r from-red-50 to-red-100 rounded-3xl p-8 border border-red-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Neden Bizi Seçmelisiniz?
              </h3>
              <ul className="space-y-4">
                {[
                  "7/24 Müşteri Desteği",
                  "Hızlı Yanıt Süresi (24 saat içinde)",
                  "Profesyonel Danışmanlık",
                  "Özelleştirilmiş Çözümler",
                  "13.000+ Influencer Ağı",
                  "Detaylı Raporlama"
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-red-600 flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-xs">✓</span>
                    </div>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Contact */}
            <div className="bg-gray-50 border border-gray-200 rounded-3xl p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Hızlı İletişim</h3>
              <p className="text-gray-600 mb-6">
                Acil durumlar için bizi doğrudan arayabilir veya WhatsApp üzerinden ulaşabilirsiniz.
              </p>
              <div className="flex flex-col gap-3">
                <a
                  href="tel:+905422125395"
                  className="flex items-center gap-3 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-semibold transition-all justify-center"
                >
                  <Phone className="w-5 h-5" />
                  Hemen Ara
                </a>
                <a
                  href="https://wa.me/905422125395"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 bg-[#25D366] hover:bg-[#20BA5A] text-white px-6 py-3 rounded-xl font-semibold transition-all justify-center"
                >
                  <MessageSquare className="w-5 h-5" />
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ContactPage;

