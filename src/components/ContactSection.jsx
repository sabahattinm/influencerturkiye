import { useState } from 'react';
import { MapPin, Phone, Mail, Send, User, MessageSquare } from 'lucide-react';

/**
 * ContactSection Component
 * İletişim formu ve bilgileri
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
    <section className="bg-[#171719] py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16">
          
          {/* Left - Contact Info */}
          <div>
            <span className="text-[#d3f26a] text-sm font-semibold tracking-wider uppercase">
              İletişim
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mt-4">
              Bizimle İletişime
              <span className="text-[#ad7bff]"> Geçin</span>
            </h2>
            <p className="text-gray-400 mt-6 text-lg leading-relaxed">
              Markanız için en uygun influencer stratejisini oluşturmak veya bir influencer 
              olarak bize katılmak için formu doldurun.
            </p>

            {/* Contact Details */}
            <div className="mt-10 space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#d3f26a]/20 flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-[#d3f26a]" />
                </div>
                <div>
                  <h4 className="text-white font-semibold">Adres</h4>
                  <p className="text-gray-400">Etiler / Beşiktaş / İstanbul</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#ad7bff]/20 flex items-center justify-center">
                  <Phone className="w-6 h-6 text-[#ad7bff]" />
                </div>
                <div>
                  <h4 className="text-white font-semibold">Telefon</h4>
                  <p className="text-gray-400">+90 (554) 229 01 01</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#ff7bb8]/20 flex items-center justify-center">
                  <Mail className="w-6 h-6 text-[#ff7bb8]" />
                </div>
                <div>
                  <h4 className="text-white font-semibold">E-posta</h4>
                  <p className="text-gray-400">info@influencerturkiye.com</p>
                </div>
              </div>
            </div>

            <div className="mt-10 p-6 bg-[#242426] rounded-2xl">
              <h4 className="text-white font-semibold mb-2">Influencer Türkiye Inc.</h4>
              <p className="text-gray-500 text-sm">
                Türkiye'nin önde gelen influencer marketing ajansı
              </p>
            </div>
          </div>

          {/* Right - Form */}
          <div className="bg-[#1a1a1c] rounded-3xl p-8 md:p-10 border border-white/5">
            <h3 className="text-2xl font-bold text-white mb-6">Başvuru Formu</h3>
            
            {/* Type Selection */}
            <div className="flex gap-4 mb-8">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, type: 'brand' })}
                className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all ${
                  formData.type === 'brand'
                    ? 'bg-[#d3f26a] text-black'
                    : 'bg-[#242426] text-gray-400 hover:bg-[#2a2a2c]'
                }`}
              >
                Markayım
              </button>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, type: 'influencer' })}
                className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all ${
                  formData.type === 'influencer'
                    ? 'bg-[#ad7bff] text-white'
                    : 'bg-[#242426] text-gray-400 hover:bg-[#2a2a2c]'
                }`}
              >
                Influencer'ım
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="text-gray-400 text-sm mb-2 block">Ad Soyad</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Adınız Soyadınız"
                    className="w-full bg-[#242426] border border-white/5 rounded-xl py-4 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-[#d3f26a]/50"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-gray-400 text-sm mb-2 block">E-posta</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="ornek@email.com"
                    className="w-full bg-[#242426] border border-white/5 rounded-xl py-4 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-[#d3f26a]/50"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-gray-400 text-sm mb-2 block">Telefon</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+90 5XX XXX XX XX"
                    className="w-full bg-[#242426] border border-white/5 rounded-xl py-4 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-[#d3f26a]/50"
                  />
                </div>
              </div>

              <div>
                <label className="text-gray-400 text-sm mb-2 block">Mesajınız</label>
                <div className="relative">
                  <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-gray-500" />
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Projeniz hakkında bilgi verin..."
                    rows={4}
                    className="w-full bg-[#242426] border border-white/5 rounded-xl py-4 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-[#d3f26a]/50 resize-none"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[#d3f26a] hover:bg-[#c5e45c] text-black py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all"
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
