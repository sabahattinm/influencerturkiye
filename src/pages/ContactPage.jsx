import { useState } from 'react';
import { MapPin, Phone, Mail, Send, User, MessageSquare, Clock, Globe } from 'lucide-react';

/**
 * ContactPage - İletişim Sayfası
 */
const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: '',
    type: 'brand'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Mesajınız başarıyla gönderildi! En kısa sürede sizinle iletişime geçeceğiz.');
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      subject: '',
      message: '',
      type: 'brand'
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Adres",
      content: "Etiler / Beşiktaş / İstanbul",
      color: "#d3f26a"
    },
    {
      icon: Phone,
      title: "Telefon",
      content: "+90 (554) 229 01 01",
      color: "#ad7bff",
      link: "tel:+905542290101"
    },
    {
      icon: Mail,
      title: "E-posta",
      content: "info@influencerturkiye.com",
      color: "#ff7bb8",
      link: "mailto:info@influencerturkiye.com"
    },
    {
      icon: Clock,
      title: "Çalışma Saatleri",
      content: "Pazartesi - Cuma: 09:00 - 18:00",
      color: "#4ecdc4"
    }
  ];

  return (
    <section className="bg-[#171719] py-20 px-6 min-h-screen">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-[#d3f26a] text-sm font-semibold tracking-wider uppercase">
            İletişim
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mt-4">
            Bizimle İletişime Geçin
          </h1>
          <p className="text-gray-400 mt-6 max-w-2xl mx-auto text-lg">
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
                className="bg-[#242426] rounded-3xl p-6 text-center hover:bg-[#2a2a2c] transition-all"
              >
                <div 
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
                  style={{ backgroundColor: info.color + '20' }}
                >
                  <IconComponent className="w-7 h-7" style={{ color: info.color }} />
                </div>
                <h3 className="text-white font-semibold mb-2">{info.title}</h3>
                <p className="text-gray-400 text-sm">{content}</p>
              </div>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          
          {/* Left - Contact Form */}
          <div className="bg-[#1a1a1c] rounded-3xl p-8 md:p-10 border border-white/5">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
              Bize Ulaşın
            </h2>
            
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
              {/* Name */}
              <div>
                <label className="text-gray-400 text-sm mb-2 block">Ad Soyad *</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Adınız Soyadınız"
                    className="w-full bg-[#242426] border border-white/5 rounded-xl py-4 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-[#d3f26a]/50 transition-colors"
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="text-gray-400 text-sm mb-2 block">E-posta *</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="ornek@email.com"
                    className="w-full bg-[#242426] border border-white/5 rounded-xl py-4 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-[#d3f26a]/50 transition-colors"
                    required
                  />
                </div>
              </div>

              {/* Phone & Company */}
              <div className="grid grid-cols-2 gap-4">
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
                      className="w-full bg-[#242426] border border-white/5 rounded-xl py-4 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-[#d3f26a]/50 transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-gray-400 text-sm mb-2 block">Şirket</label>
                  <div className="relative">
                    <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Şirket Adı"
                      className="w-full bg-[#242426] border border-white/5 rounded-xl py-4 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-[#d3f26a]/50 transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Subject */}
              <div>
                <label className="text-gray-400 text-sm mb-2 block">Konu *</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Mesajınızın konusu"
                  className="w-full bg-[#242426] border border-white/5 rounded-xl py-4 px-4 text-white placeholder-gray-500 focus:outline-none focus:border-[#d3f26a]/50 transition-colors"
                  required
                />
              </div>

              {/* Message */}
              <div>
                <label className="text-gray-400 text-sm mb-2 block">Mesajınız *</label>
                <div className="relative">
                  <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-gray-500" />
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Mesajınızı buraya yazın..."
                    rows={5}
                    className="w-full bg-[#242426] border border-white/5 rounded-xl py-4 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-[#d3f26a]/50 transition-colors resize-none"
                    required
                  />
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full bg-[#d3f26a] hover:bg-[#c5e45c] text-black py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
              >
                <Send className="w-5 h-5" />
                Mesaj Gönder
              </button>
            </form>
          </div>

          {/* Right - Map & Info */}
          <div className="space-y-6">
            {/* Map Placeholder */}
            <div className="bg-[#242426] rounded-3xl overflow-hidden h-96">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3008.5!2d29.0!3d41.0!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDHCsDAwJzAwLjAiTiAyOcKwMDAnMDAuMCJF!5e0!3m2!1str!2str!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />
            </div>

            {/* Additional Info */}
            <div className="bg-gradient-to-r from-[#d3f26a]/10 to-[#ad7bff]/10 rounded-3xl p-8 border border-white/5">
              <h3 className="text-2xl font-bold text-white mb-6">
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
                    <div className="w-6 h-6 rounded-full bg-[#d3f26a] flex items-center justify-center flex-shrink-0">
                      <span className="text-black font-bold text-xs">✓</span>
                    </div>
                    <span className="text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Contact */}
            <div className="bg-[#242426] rounded-3xl p-8">
              <h3 className="text-xl font-bold text-white mb-4">Hızlı İletişim</h3>
              <p className="text-gray-400 mb-6">
                Acil durumlar için bizi doğrudan arayabilir veya WhatsApp üzerinden ulaşabilirsiniz.
              </p>
              <div className="flex flex-col gap-3">
                <a
                  href="tel:+905542290101"
                  className="flex items-center gap-3 bg-[#d3f26a] hover:bg-[#c5e45c] text-black px-6 py-3 rounded-xl font-semibold transition-all justify-center"
                >
                  <Phone className="w-5 h-5" />
                  Hemen Ara
                </a>
                <a
                  href="https://wa.me/905542290101"
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

