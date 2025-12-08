import { useState } from 'react';
import { MapPin, Phone, Mail, Send, User, MessageSquare } from 'lucide-react';

/**
 * ContactSection Component
 * İletişim formu ve bilgileri - Kırmızı-Beyaz Tema
 */
const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    type: 'brand'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Başvurunuz alındı! En kısa sürede sizinle iletişime geçeceğiz.');
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section className="bg-white py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16">
          
          {/* Left - Contact Info */}
          <div>
            <span className="text-red-600 text-sm font-semibold tracking-wider uppercase">
              İletişim
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mt-4">
              Bizimle İletişime
              <span className="text-red-600"> Geçin</span>
            </h2>
            <p className="text-gray-600 mt-6 text-lg leading-relaxed">
              Markanız için en uygun influencer stratejisini oluşturmak veya bir influencer 
              olarak bize katılmak için formu doldurun.
            </p>

            {/* Contact Details */}
            <div className="mt-10 space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-red-100 flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h4 className="text-gray-900 font-semibold">Adres</h4>
                  <p className="text-gray-600">Etiler / Beşiktaş / İstanbul</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-red-100 flex items-center justify-center">
                  <Phone className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h4 className="text-gray-900 font-semibold">Telefon</h4>
                  <p className="text-gray-600">+90 (554) 229 01 01</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-red-100 flex items-center justify-center">
                  <Mail className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h4 className="text-gray-900 font-semibold">E-posta</h4>
                  <p className="text-gray-600">info@influencerturkiye.com</p>
                </div>
              </div>
            </div>

            <div className="mt-10 p-6 bg-gray-50 border border-gray-200 rounded-2xl">
              <h4 className="text-gray-900 font-semibold mb-2">Influencer Türkiye Inc.</h4>
              <p className="text-gray-600 text-sm">
                Türkiye'nin önde gelen influencer marketing ajansı
              </p>
            </div>
          </div>

          {/* Right - Form */}
          <div className="bg-gray-50 border border-gray-200 rounded-3xl p-8 md:p-10">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Başvuru Formu</h3>
            
            {/* Type Selection */}
            <div className="flex gap-4 mb-8">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, type: 'brand' })}
                className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all ${
                  formData.type === 'brand'
                    ? 'bg-red-600 text-white'
                    : 'bg-white border border-gray-300 text-gray-600 hover:bg-gray-50'
                }`}
              >
                Markayım
              </button>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, type: 'influencer' })}
                className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all ${
                  formData.type === 'influencer'
                    ? 'bg-red-600 text-white'
                    : 'bg-white border border-gray-300 text-gray-600 hover:bg-gray-50'
                }`}
              >
                Influencer'ım
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="text-gray-700 text-sm mb-2 block">Ad Soyad</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Adınız Soyadınız"
                    className="w-full bg-white border border-gray-300 rounded-xl py-4 pl-12 pr-4 text-gray-900 placeholder-gray-500 focus:outline-none focus:border-red-600"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-gray-700 text-sm mb-2 block">E-posta</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="ornek@email.com"
                    className="w-full bg-white border border-gray-300 rounded-xl py-4 pl-12 pr-4 text-gray-900 placeholder-gray-500 focus:outline-none focus:border-red-600"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-gray-700 text-sm mb-2 block">Telefon</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+90 5XX XXX XX XX"
                    className="w-full bg-white border border-gray-300 rounded-xl py-4 pl-12 pr-4 text-gray-900 placeholder-gray-500 focus:outline-none focus:border-red-600"
                  />
                </div>
              </div>

              <div>
                <label className="text-gray-700 text-sm mb-2 block">Mesajınız</label>
                <div className="relative">
                  <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-gray-500" />
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Projeniz hakkında bilgi verin..."
                    rows={4}
                    className="w-full bg-white border border-gray-300 rounded-xl py-4 pl-12 pr-4 text-gray-900 placeholder-gray-500 focus:outline-none focus:border-red-600 resize-none"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all"
              >
                <Send className="w-5 h-5" />
                Gönder
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
