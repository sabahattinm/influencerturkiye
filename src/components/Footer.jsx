import { Instagram, Twitter, Linkedin, Youtube, Mail, ArrowRight } from 'lucide-react';

/**
 * Footer Component
 * Site footer - Kırmızı-Beyaz Tema
 */
const Footer = () => {
  const footerLinks = {
    danisma: {
      title: "Danışma",
      links: ["Basın", "Katılım Şartları", "Kullanıcı Sözleşmesi", "Haber Merkezi", "İletişim"]
    },
    bilgi: {
      title: "Bilgi",
      links: ["Kategoriler", "Prodüksiyon", "İçerik Merkezi", "Başarı Ödülleri", "Analiz Raporları"]
    },
    hizmetler: {
      title: "Hizmetler",
      links: ["Moda & Tasarım", "Beauty", "Sanat & Life Style", "Seyahat", "Yaşam Tarzı"]
    }
  };

  const socialLinks = [
    { icon: Instagram, href: "#" },
    { icon: Twitter, href: "#" },
    { icon: Linkedin, href: "#" },
    { icon: Youtube, href: "#" }
  ];

  return (
    <footer className="bg-gray-50 pt-20 pb-8 px-6 border-t border-gray-200">
      <div className="max-w-7xl mx-auto">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-12 border-b border-gray-200">
          
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div 
                className="rounded-lg flex items-center justify-center overflow-hidden"
                style={{ width: '50px', height: '50px', aspectRatio: '1/1' }}
              >
                <img 
                  src="/icon.webp" 
                  alt="Influencer Türkiye Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-gray-900 font-bold text-lg">INFLUENCER</span>
                <span className="text-red-600 text-xs font-medium tracking-wider">TÜRKİYE</span>
              </div>
            </div>
            <p className="text-gray-600 leading-relaxed mb-6 max-w-sm">
              Türkiye'nin en kapsamlı influencer marketing platformu. Markalar ve influencer'ları 
              bir araya getiriyoruz.
            </p>

            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social, index) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-gray-600 hover:text-red-600 hover:bg-red-50 transition-all"
                  >
                    <IconComponent className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Link Columns */}
          {Object.values(footerLinks).map((section, index) => (
            <div key={index}>
              <h4 className="text-gray-900 font-semibold mb-6">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a href="#" className="text-gray-600 hover:text-red-600 transition-colors text-sm">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter Section */}
        <div className="py-12 border-b border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h4 className="text-gray-900 font-semibold text-lg">E-Bülten</h4>
              <p className="text-gray-600 text-sm mt-1">
                Mailinize E-Bülten göndermemizi ister misiniz?
              </p>
            </div>
            <div className="flex gap-3">
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="email"
                  placeholder="E-posta adresiniz"
                  className="bg-white border border-gray-300 rounded-xl py-3 pl-12 pr-4 text-gray-900 placeholder-gray-500 focus:outline-none focus:border-red-600 w-64"
                />
              </div>
              <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 transition-all">
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <p className="text-gray-600 text-sm">
            © Influencer Türkiye - All Rights Reserved
          </p>
          <p className="text-gray-600 text-sm">
            Designed by <span className="text-red-600">Sabo Company</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
