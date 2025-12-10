import { Instagram, Linkedin, Youtube, Mail, ArrowRight, Phone } from 'lucide-react';

/**
 * X.com Icon Component - X.com'un resmi amblemi
 */
const XIcon = ({ className }) => (
  <svg 
    viewBox="0 0 24 24" 
    className={className}
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

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
    { icon: Instagram, href: "https://www.instagram.com/influencerturkiyecom/" },
    { icon: XIcon, href: "https://x.com/influenturkiye" },
    { icon: Linkedin, href: "https://www.linkedin.com/company/influencer-türki̇ye" }
   
  ];

  return (
    <footer className="bg-gray-50 pt-20 pb-8 px-6 border-t border-gray-200">
      <div className="max-w-7xl mx-auto">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-12 border-b border-gray-200">
          
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-6">
              <div 
                className="rounded-lg flex items-center justify-center overflow-hidden"
                style={{ width: '175px', height: '100px', aspectRatio: '7/4' }}
              >
                <img 
                  src="/logo.svg" 
                  alt="Influencer Türkiye Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
            <p className="text-gray-600 leading-relaxed mb-6 max-w-sm">
              Türkiye'nin en kapsamlı influencer marketing platformu. Markalar ve influencer'ları 
              bir araya getiriyoruz.
            </p>

            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              <a 
                href="tel:+905422125395"
                className="flex items-center gap-3 text-gray-600 hover:text-red-600 transition-colors text-sm"
              >
                <Phone className="w-4 h-4" />
                <span>0542 212 53 95</span>
              </a>
              <a 
                href="mailto:hello@influencerturkiye.com"
                className="flex items-center gap-3 text-gray-600 hover:text-red-600 transition-colors text-sm"
              >
                <Mail className="w-4 h-4" />
                <span>hello@influencerturkiye.com</span>
              </a>
            </div>

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
                    <span className="text-gray-600 text-sm cursor-default">
                      {link}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter Section */}
       

        {/* Bottom Section */}
        <div className="pt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <p className="text-gray-600 text-sm">
            © Influencer Türkiye - All Rights Reserved
          </p>
          <p className="text-gray-600 text-sm">
            Designed by <span className="text-red-600">Company</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
