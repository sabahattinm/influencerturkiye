import { useState } from 'react';
import { MapPin, Phone, Mail, Send, User, MessageSquare, Globe, DollarSign, MapPin as MapPinIcon, Instagram, Youtube, Facebook, Twitter, Link as LinkIcon, Building2, FileText, Music } from 'lucide-react';
import { saveInfluencerApplication, saveCustomerApplication } from '../services/dataService';

/**
 * ContactSection Component
 * Influencer ve Müşteri başvuru formları - Kırmızı-Beyaz Tema
 */
const ContactSection = () => {
  const [applicationType, setApplicationType] = useState('influencer'); // 'influencer' veya 'customer'

  // Influencer form data
  const [influencerFormData, setInfluencerFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    gender: '',
    country: 'Türkiye',
    city: '',
    interests: '',
    facebook: '',
    youtube: '',
    twitch: '',
    instagram: '',
    twitter: '',
    blog: '',
    other: '',
    budget: ''
  });

  const [kvkkAccepted, setKvkkAccepted] = useState(false);

  // Customer form data
  const [customerFormData, setCustomerFormData] = useState({
    fullName: '',
    brand: '',
    taxNumber: '',
    phoneNumber: '',
    platform: '',
    contentType: '',
    description: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ type: null, message: '' });

  // Platform seçimine göre içerik seçenekleri (Customer form için)
  const getContentOptions = () => {
    switch (customerFormData.platform) {
      case 'instagram':
        return [
          { value: 'reels', label: 'Reels' },
          { value: 'story', label: 'Story' },
          { value: 'pr', label: 'PR' }
        ];
      case 'youtube':
        return [
          { value: 'shorts', label: 'Shorts' }
        ];
      case 'tiktok':
        return [
          { value: 'video', label: 'Video' }
        ];
      default:
        return [];
    }
  };

  const handleInfluencerSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      // KVKK onay kontrolü
      if (!kvkkAccepted) {
        setSubmitStatus({ 
          type: 'error', 
          message: 'Lütfen Kişisel Verilerin Korunması Kanunu\'nu onaylayınız.' 
        });
        setIsSubmitting(false);
        return;
      }

      // En az bir sosyal medya hesabı kontrolü
      const hasSocialMedia = influencerFormData.facebook || influencerFormData.youtube || influencerFormData.twitch || 
                            influencerFormData.instagram || influencerFormData.twitter || influencerFormData.blog || influencerFormData.other;
      
      if (!hasSocialMedia) {
        setSubmitStatus({ 
          type: 'error', 
          message: 'Lütfen en az bir sosyal medya hesabı bilgisi giriniz.' 
        });
        setIsSubmitting(false);
        return;
      }

      await saveInfluencerApplication(influencerFormData);
      
      setSubmitStatus({ 
        type: 'success', 
        message: 'Başvurunuz başarıyla kaydedildi! En kısa sürede sizinle iletişime geçeceğiz.' 
      });
      
      // Formu temizle
      setInfluencerFormData({
        fullName: '',
        email: '',
        phoneNumber: '',
        gender: '',
        country: 'Türkiye',
        city: '',
        interests: '',
        facebook: '',
        youtube: '',
        twitch: '',
        instagram: '',
        twitter: '',
        blog: '',
        other: '',
        budget: ''
      });
      setKvkkAccepted(false);
    } catch (error) {
      setSubmitStatus({ 
        type: 'error', 
        message: error.message || 'Başvurunuz kaydedilemedi. Lütfen tekrar deneyin.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCustomerSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      // Platform seçilmişse içerik tipi de seçilmiş olmalı
      if (customerFormData.platform && !customerFormData.contentType) {
        setSubmitStatus({ 
          type: 'error', 
          message: 'Lütfen bir içerik tipi seçiniz.' 
        });
        setIsSubmitting(false);
        return;
      }

      await saveCustomerApplication(customerFormData);
      
      setSubmitStatus({ 
        type: 'success', 
        message: 'Başvurunuz başarıyla kaydedildi! En kısa sürede sizinle iletişime geçeceğiz.' 
      });
      
      // Formu temizle
      setCustomerFormData({
        fullName: '',
        brand: '',
        taxNumber: '',
        phoneNumber: '',
        platform: '',
        contentType: '',
        description: ''
      });
    } catch (error) {
      setSubmitStatus({ 
        type: 'error', 
        message: error.message || 'Başvurunuz kaydedilemedi. Lütfen tekrar deneyin.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInfluencerChange = (e) => {
    setInfluencerFormData({ ...influencerFormData, [e.target.name]: e.target.value });
  };

  const handleCustomerChange = (e) => {
    const { name, value } = e.target;
    setCustomerFormData(prev => {
      // Platform değiştiğinde içerik tipini sıfırla
      if (name === 'platform') {
        return { ...prev, [name]: value, contentType: '' };
      }
      return { ...prev, [name]: value };
    });
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
                  <p className="text-gray-600">0542 212 53 95</p>
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
            {/* Type Selection */}
            <div className="flex gap-4 mb-6">
              <button
                type="button"
                onClick={() => {
                  setApplicationType('influencer');
                  setSubmitStatus({ type: null, message: '' });
                }}
                className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all ${
                  applicationType === 'influencer'
                    ? 'bg-red-600 text-white'
                    : 'bg-white border border-gray-300 text-gray-600 hover:bg-gray-50'
                }`}
              >
                Influencer'ım
              </button>
              <button
                type="button"
                onClick={() => {
                  setApplicationType('customer');
                  setSubmitStatus({ type: null, message: '' });
                }}
                className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all ${
                  applicationType === 'customer'
                    ? 'bg-red-600 text-white'
                    : 'bg-white border border-gray-300 text-gray-600 hover:bg-gray-50'
                }`}
              >
                Markayım
              </button>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              {applicationType === 'influencer' ? 'Influencer Başvuru Formu' : 'Müşteri Başvuru Formu'}
            </h3>
            
            {/* Status Message */}
            {submitStatus.message && (
              <div className={`mb-6 p-4 rounded-xl ${
                submitStatus.type === 'success' 
                  ? 'bg-green-50 border border-green-200 text-green-800' 
                  : 'bg-red-50 border border-red-200 text-red-800'
              }`}>
                {submitStatus.message}
            </div>
            )}

            {/* Influencer Form */}
            {applicationType === 'influencer' && (
            <form onSubmit={handleInfluencerSubmit} className="space-y-6">
              {/* Kişisel Bilgiler */}
              <div className="border-b border-gray-200 pb-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Kişisel Bilgiler</h4>
                
                <div className="space-y-4">
              <div>
                    <label className="text-gray-700 text-sm mb-2 block">Ad Soyad <span className="text-red-600">*</span></label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type="text"
                        name="fullName"
                        value={influencerFormData.fullName}
                    onChange={handleInfluencerChange}
                    placeholder="Adınız Soyadınız"
                    className="w-full bg-white border border-gray-300 rounded-xl py-4 pl-12 pr-4 text-gray-900 placeholder-gray-500 focus:outline-none focus:border-red-600"
                    required
                  />
                </div>
              </div>

              <div>
                    <label className="text-gray-700 text-sm mb-2 block">E-posta <span className="text-red-600">*</span></label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type="email"
                    name="email"
                    value={influencerFormData.email}
                    onChange={handleInfluencerChange}
                    placeholder="ornek@email.com"
                    className="w-full bg-white border border-gray-300 rounded-xl py-4 pl-12 pr-4 text-gray-900 placeholder-gray-500 focus:outline-none focus:border-red-600"
                    required
                  />
                </div>
              </div>

              <div>
                    <label className="text-gray-700 text-sm mb-2 block">Telefon <span className="text-red-600">*</span></label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type="tel"
                        name="phoneNumber"
                        value={influencerFormData.phoneNumber}
                    onChange={handleInfluencerChange}
                    placeholder="+90 5XX XXX XX XX"
                    className="w-full bg-white border border-gray-300 rounded-xl py-4 pl-12 pr-4 text-gray-900 placeholder-gray-500 focus:outline-none focus:border-red-600"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-gray-700 text-sm mb-2 block">Cinsiyet</label>
                    <select
                      name="gender"
                      value={influencerFormData.gender}
                      onChange={handleInfluencerChange}
                      className="w-full bg-white border border-gray-300 rounded-xl py-4 px-4 text-gray-900 focus:outline-none focus:border-red-600"
                    >
                      <option value="">Seçiniz</option>
                      <option value="Erkek">Erkek</option>
                      <option value="Kadın">Kadın</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-gray-700 text-sm mb-2 block">Ülke <span className="text-red-600">*</span></label>
                      <div className="relative">
                        <MapPinIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                        <input
                          type="text"
                          name="country"
                          value={influencerFormData.country}
                          onChange={handleInfluencerChange}
                          placeholder="Türkiye"
                          className="w-full bg-white border border-gray-300 rounded-xl py-4 pl-12 pr-4 text-gray-900 placeholder-gray-500 focus:outline-none focus:border-red-600"
                          required
                  />
                </div>
              </div>

              <div>
                      <label className="text-gray-700 text-sm mb-2 block">Şehir <span className="text-red-600">*</span></label>
                      <div className="relative">
                        <MapPinIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                        <input
                          type="text"
                          name="city"
                          value={influencerFormData.city}
                          onChange={handleInfluencerChange}
                          placeholder="İstanbul"
                          className="w-full bg-white border border-gray-300 rounded-xl py-4 pl-12 pr-4 text-gray-900 placeholder-gray-500 focus:outline-none focus:border-red-600"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="text-gray-700 text-sm mb-2 block">İlgi Alanları</label>
                <div className="relative">
                  <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-gray-500" />
                  <textarea
                        name="interests"
                        value={influencerFormData.interests}
                    onChange={handleInfluencerChange}
                        placeholder="Örn: Teknoloji, Moda, Spor, Yemek..."
                        rows={3}
                    className="w-full bg-white border border-gray-300 rounded-xl py-4 pl-12 pr-4 text-gray-900 placeholder-gray-500 focus:outline-none focus:border-red-600 resize-none"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Sosyal Medya Hesapları */}
              <div className="border-b border-gray-200 pb-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Sosyal Medya Hesapları <span className="text-sm font-normal text-gray-600">(En az bir tane zorunlu)</span></h4>
                
                <div className="space-y-4">
                  <div>
                    <label className="text-gray-700 text-sm mb-2 block flex items-center gap-2">
                      <Instagram className="w-4 h-4 text-pink-600" />
                      Instagram URL
                    </label>
                    <div className="relative">
                      <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                      <input
                        type="url"
                        name="instagram"
                        value={influencerFormData.instagram}
                        onChange={handleInfluencerChange}
                        placeholder="https://instagram.com/kullaniciadi"
                        className="w-full bg-white border border-gray-300 rounded-xl py-4 pl-12 pr-4 text-gray-900 placeholder-gray-500 focus:outline-none focus:border-red-600"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-gray-700 text-sm mb-2 block flex items-center gap-2">
                      <Youtube className="w-4 h-4 text-red-600" />
                      YouTube URL
                    </label>
                    <div className="relative">
                      <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                      <input
                        type="url"
                        name="youtube"
                        value={influencerFormData.youtube}
                        onChange={handleInfluencerChange}
                        placeholder="https://youtube.com/@kullaniciadi"
                        className="w-full bg-white border border-gray-300 rounded-xl py-4 pl-12 pr-4 text-gray-900 placeholder-gray-500 focus:outline-none focus:border-red-600"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-gray-700 text-sm mb-2 block flex items-center gap-2">
                      <Facebook className="w-4 h-4 text-blue-600" />
                      Facebook URL
                    </label>
                    <div className="relative">
                      <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                      <input
                        type="url"
                        name="facebook"
                        value={influencerFormData.facebook}
                        onChange={handleInfluencerChange}
                        placeholder="https://facebook.com/kullaniciadi"
                        className="w-full bg-white border border-gray-300 rounded-xl py-4 pl-12 pr-4 text-gray-900 placeholder-gray-500 focus:outline-none focus:border-red-600"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-gray-700 text-sm mb-2 block flex items-center gap-2">
                      <Twitter className="w-4 h-4 text-blue-400" />
                      Twitter/X URL
                    </label>
                    <div className="relative">
                      <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                      <input
                        type="url"
                        name="twitter"
                        value={influencerFormData.twitter}
                        onChange={handleInfluencerChange}
                        placeholder="https://twitter.com/kullaniciadi"
                        className="w-full bg-white border border-gray-300 rounded-xl py-4 pl-12 pr-4 text-gray-900 placeholder-gray-500 focus:outline-none focus:border-red-600"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-gray-700 text-sm mb-2 block flex items-center gap-2">
                      <Globe className="w-4 h-4 text-purple-600" />
                      Twitch TV URL
                    </label>
                    <div className="relative">
                      <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                      <input
                        type="url"
                        name="twitch"
                        value={influencerFormData.twitch}
                        onChange={handleInfluencerChange}
                        placeholder="https://twitch.tv/kullaniciadi"
                        className="w-full bg-white border border-gray-300 rounded-xl py-4 pl-12 pr-4 text-gray-900 placeholder-gray-500 focus:outline-none focus:border-red-600"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-gray-700 text-sm mb-2 block flex items-center gap-2">
                      <Globe className="w-4 h-4 text-gray-600" />
                      Blog/Web Sitesi URL
                    </label>
                    <div className="relative">
                      <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                      <input
                        type="url"
                        name="blog"
                        value={influencerFormData.blog}
                        onChange={handleInfluencerChange}
                        placeholder="https://blogunuz.com"
                        className="w-full bg-white border border-gray-300 rounded-xl py-4 pl-12 pr-4 text-gray-900 placeholder-gray-500 focus:outline-none focus:border-red-600"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-gray-700 text-sm mb-2 block">Diğer Sosyal Medya</label>
                    <div className="relative">
                      <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                      <input
                        type="url"
                        name="other"
                        value={influencerFormData.other}
                        onChange={handleInfluencerChange}
                        placeholder="Diğer platform URL'i"
                        className="w-full bg-white border border-gray-300 rounded-xl py-4 pl-12 pr-4 text-gray-900 placeholder-gray-500 focus:outline-none focus:border-red-600"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Bütçe Beklentisi */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Bütçe Beklentisi</h4>
                <div>
                  <label className="text-gray-700 text-sm mb-2 block">Paylaşım Başına Ücret (TRY) <span className="text-red-600">*</span></label>
                  <input
                    type="number"
                    name="budget"
                    value={influencerFormData.budget}
                    onChange={handleInfluencerChange}
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                    className="w-full bg-white border border-gray-300 rounded-xl py-4 px-4 text-gray-900 placeholder-gray-500 focus:outline-none focus:border-red-600 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    required
                  />
                </div>
              </div>

              {/* KVKK Onay */}
              <div className="border-t border-gray-200 pt-6">
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="kvkk-checkbox"
                    checked={kvkkAccepted}
                    onChange={(e) => setKvkkAccepted(e.target.checked)}
                    className="mt-1 w-5 h-5 text-red-600 border-gray-300 rounded focus:ring-red-500 focus:ring-2"
                    required
                  />
                  <label htmlFor="kvkk-checkbox" className="text-sm text-gray-700 cursor-pointer">
                    <a 
                      href="/kvkk" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-red-600 hover:text-red-700 underline font-medium"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Kişisel Verilerin Korunması Kanunu
                    </a>
                    {' '}metnini okudum, anladım ve{' '}
                    <span className="text-red-600 font-semibold">onaylıyorum</span>.
                    <span className="text-red-600"> *</span>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting || !kvkkAccepted}
                className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Gönderiliyor...
                  </>
                ) : (
                  <>
                <Send className="w-5 h-5" />
                    Başvuruyu Gönder
                  </>
                )}
              </button>
            </form>
            )}

            {/* Customer Form */}
            {applicationType === 'customer' && (
            <form onSubmit={handleCustomerSubmit} className="space-y-6">
              {/* Kişisel ve Marka Bilgileri */}
              <div className="border-b border-gray-200 pb-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Kişisel ve Marka Bilgileri</h4>
                
                <div className="space-y-4">
                  <div>
                    <label className="text-gray-700 text-sm mb-2 block">
                      Ad Soyad <span className="text-red-600">*</span>
                    </label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                      <input
                        type="text"
                        name="fullName"
                        value={customerFormData.fullName}
                        onChange={handleCustomerChange}
                        placeholder="Adınız Soyadınız"
                        className="w-full bg-white border border-gray-300 rounded-xl py-4 pl-12 pr-4 text-gray-900 placeholder-gray-500 focus:outline-none focus:border-red-600"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-gray-700 text-sm mb-2 block">
                      Marka <span className="text-red-600">*</span>
                    </label>
                    <div className="relative">
                      <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                      <input
                        type="text"
                        name="brand"
                        value={customerFormData.brand}
                        onChange={handleCustomerChange}
                        placeholder="Marka Adı"
                        className="w-full bg-white border border-gray-300 rounded-xl py-4 pl-12 pr-4 text-gray-900 placeholder-gray-500 focus:outline-none focus:border-red-600"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-gray-700 text-sm mb-2 block">
                      Vergi Numarası <span className="text-gray-500 text-xs">(İsteğe bağlı)</span>
                    </label>
                    <div className="relative">
                      <FileText className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                      <input
                        type="text"
                        name="taxNumber"
                        value={customerFormData.taxNumber}
                        onChange={handleCustomerChange}
                        placeholder="Vergi Numarası"
                        className="w-full bg-white border border-gray-300 rounded-xl py-4 pl-12 pr-4 text-gray-900 placeholder-gray-500 focus:outline-none focus:border-red-600"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-gray-700 text-sm mb-2 block">
                      Telefon Numarası <span className="text-red-600">*</span>
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                      <input
                        type="tel"
                        name="phoneNumber"
                        value={customerFormData.phoneNumber}
                        onChange={handleCustomerChange}
                        placeholder="+90 5XX XXX XX XX"
                        className="w-full bg-white border border-gray-300 rounded-xl py-4 pl-12 pr-4 text-gray-900 placeholder-gray-500 focus:outline-none focus:border-red-600"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Platform Seçimi */}
              <div className="border-b border-gray-200 pb-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Platform Seçimi</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <button
                    type="button"
                    onClick={() => handleCustomerChange({ target: { name: 'platform', value: 'instagram' } })}
                    className={`p-6 rounded-xl border-2 transition-all ${
                      customerFormData.platform === 'instagram'
                        ? 'border-red-600 bg-red-50'
                        : 'border-gray-300 bg-white hover:border-gray-400'
                    }`}
                  >
                    <Instagram className={`w-8 h-8 mx-auto mb-2 ${
                      customerFormData.platform === 'instagram' ? 'text-red-600' : 'text-gray-400'
                    }`} />
                    <span className={`font-medium ${
                      customerFormData.platform === 'instagram' ? 'text-red-600' : 'text-gray-700'
                    }`}>
                      Instagram
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleCustomerChange({ target: { name: 'platform', value: 'youtube' } })}
                    className={`p-6 rounded-xl border-2 transition-all ${
                      customerFormData.platform === 'youtube'
                        ? 'border-red-600 bg-red-50'
                        : 'border-gray-300 bg-white hover:border-gray-400'
                    }`}
                  >
                    <Youtube className={`w-8 h-8 mx-auto mb-2 ${
                      customerFormData.platform === 'youtube' ? 'text-red-600' : 'text-gray-400'
                    }`} />
                    <span className={`font-medium ${
                      customerFormData.platform === 'youtube' ? 'text-red-600' : 'text-gray-700'
                    }`}>
                      YouTube
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleCustomerChange({ target: { name: 'platform', value: 'tiktok' } })}
                    className={`p-6 rounded-xl border-2 transition-all ${
                      customerFormData.platform === 'tiktok'
                        ? 'border-red-600 bg-red-50'
                        : 'border-gray-300 bg-white hover:border-gray-400'
                    }`}
                  >
                    <Music className={`w-8 h-8 mx-auto mb-2 ${
                      customerFormData.platform === 'tiktok' ? 'text-red-600' : 'text-gray-400'
                    }`} />
                    <span className={`font-medium ${
                      customerFormData.platform === 'tiktok' ? 'text-red-600' : 'text-gray-700'
                    }`}>
                      TikTok
                    </span>
                  </button>
                </div>

                {customerFormData.platform && (
                  <div className="mt-6">
                    <label className="text-gray-700 text-sm mb-2 block">
                      İçerik Tipi <span className="text-red-600">*</span>
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {getContentOptions().map((option) => (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => handleCustomerChange({ target: { name: 'contentType', value: option.value } })}
                          className={`p-4 rounded-xl border-2 transition-all text-left ${
                            customerFormData.contentType === option.value
                              ? 'border-red-600 bg-red-50 text-red-600'
                              : 'border-gray-300 bg-white hover:border-gray-400 text-gray-700'
                          }`}
                        >
                          <span className="font-medium">{option.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Açıklama */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Proje Detayları</h4>
                <div>
                  <label className="text-gray-700 text-sm mb-2 block">
                    Açıklama <span className="text-red-600">*</span>
                  </label>
                  <div className="relative">
                    <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-gray-500" />
                    <textarea
                      name="description"
                      value={customerFormData.description}
                      onChange={handleCustomerChange}
                      placeholder="Projeniz hakkında detaylı bilgi verin..."
                      rows={6}
                      className="w-full bg-white border border-gray-300 rounded-xl py-4 pl-12 pr-4 text-gray-900 placeholder-gray-500 focus:outline-none focus:border-red-600 resize-none"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Gönderiliyor...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Başvuruyu Gönder
                  </>
                )}
              </button>
            </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
