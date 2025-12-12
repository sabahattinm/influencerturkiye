import { Instagram, Linkedin, Mail, Phone } from 'lucide-react';

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
  const socialLinks = [
    { icon: Instagram, href: "https://www.instagram.com/influencerturkiyecom/" },
    { icon: XIcon, href: "https://x.com/influenturkiye" },
    { icon: Linkedin, href: "https://www.linkedin.com/company/influencer-türki̇ye" }
   
  ];

  return (
    <footer className="bg-gray-50 pt-16 pb-8 px-6 border-t border-gray-200">
      <div className="max-w-7xl mx-auto">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pb-12 border-b border-gray-200">
          
          {/* Brand Column */}
          <div>
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
            <p className="text-gray-600 leading-relaxed mb-8 text-sm max-w-md">
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
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:text-red-600 hover:border-red-600 hover:bg-red-50 transition-all shadow-sm hover:shadow-md"
                  >
                    <IconComponent className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Contact Column */}
          <div>
            <h4 className="text-gray-900 font-semibold mb-8 text-xl">İletişim</h4>
            <div className="space-y-6">
              <a 
                href="tel:+905422125395"
                className="flex items-start gap-4 text-gray-600 hover:text-red-600 transition-colors group"
              >
                <div className="w-12 h-12 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-gray-400 group-hover:text-red-600 group-hover:border-red-600 group-hover:bg-red-50 transition-all shadow-sm">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="flex-1 pt-1">
                  <div className="text-sm font-semibold text-gray-900 group-hover:text-red-600 mb-1">Telefon</div>
                  <div className="text-base font-medium">0542 212 53 95</div>
                </div>
              </a>
              <a 
                href="mailto:hello@influencerturkiye.com"
                className="flex items-start gap-4 text-gray-600 hover:text-red-600 transition-colors group"
              >
                <div className="w-12 h-12 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-gray-400 group-hover:text-red-600 group-hover:border-red-600 group-hover:bg-red-50 transition-all shadow-sm">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="flex-1 pt-1">
                  <div className="text-sm font-semibold text-gray-900 group-hover:text-red-600 mb-1">E-posta</div>
                  <div className="text-base font-medium break-all">hello@influencerturkiye.com</div>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <p className="text-gray-600 text-sm">
            © {new Date().getFullYear()} Influencer Türkiye - Tüm hakları saklıdır.
          </p>
          <div className="flex flex-col md:flex-row gap-4 md:gap-6">
            <a 
              href="/kvkk"
              className="text-gray-600 hover:text-red-600 transition-colors text-sm"
            >
              KVKK
            </a>
            <p className="text-gray-600 text-sm">
              Designed by <span className="text-red-600">Company</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
