import { useState } from 'react';
import { Phone, Send, User, MessageSquare, Building2, FileText, Instagram, Youtube, Music } from 'lucide-react';
import { saveCustomerApplication } from '../services/dataService';

/**
 * CustomerApplicationSection Component
 * Müşteri (Marka) başvuru formu - Kırmızı-Beyaz Tema
 */
const CustomerApplicationSection = () => {
  const [formData, setFormData] = useState({
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

  // Platform seçimine göre içerik seçenekleri
  const getContentOptions = () => {
    switch (formData.platform) {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      // Platform seçilmişse içerik tipi de seçilmiş olmalı
      if (formData.platform && !formData.contentType) {
        setSubmitStatus({ 
          type: 'error', 
          message: 'Lütfen bir içerik tipi seçiniz.' 
        });
        setIsSubmitting(false);
        return;
      }

      await saveCustomerApplication(formData);
      
      setSubmitStatus({ 
        type: 'success', 
        message: 'Başvurunuz başarıyla kaydedildi! En kısa sürede sizinle iletişime geçeceğiz.' 
      });
      
      // Formu temizle
      setFormData({
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => {
      // Platform değiştiğinde içerik tipini sıfırla
      if (name === 'platform') {
        return { ...prev, [name]: value, contentType: '' };
      }
      return { ...prev, [name]: value };
    });
  };

  const contentOptions = getContentOptions();

  return (
    <section className="bg-white py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-red-600 text-sm font-semibold tracking-wider uppercase">
            Müşteri Başvurusu
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mt-4">
            Markanız İçin
            <span className="text-red-600"> Başvurun</span>
          </h2>
          <p className="text-gray-600 mt-6 text-lg leading-relaxed max-w-2xl mx-auto">
            Markanız için en uygun influencer stratejisini oluşturmak üzere formu doldurun. 
            Size özel çözümler sunmak için bilgilerinize ihtiyacımız var.
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-gray-50 border border-gray-200 rounded-3xl p-8 md:p-10">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Müşteri Başvuru Formu</h3>
          
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

          <form onSubmit={handleSubmit} className="space-y-6">
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
                      value={formData.fullName}
                      onChange={handleChange}
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
                      value={formData.brand}
                      onChange={handleChange}
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
                      value={formData.taxNumber}
                      onChange={handleChange}
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
                      value={formData.phoneNumber}
                      onChange={handleChange}
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
                  onClick={() => handleChange({ target: { name: 'platform', value: 'instagram' } })}
                  className={`p-6 rounded-xl border-2 transition-all ${
                    formData.platform === 'instagram'
                      ? 'border-red-600 bg-red-50'
                      : 'border-gray-300 bg-white hover:border-gray-400'
                  }`}
                >
                  <Instagram className={`w-8 h-8 mx-auto mb-2 ${
                    formData.platform === 'instagram' ? 'text-red-600' : 'text-gray-400'
                  }`} />
                  <span className={`font-medium ${
                    formData.platform === 'instagram' ? 'text-red-600' : 'text-gray-700'
                  }`}>
                    Instagram
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => handleChange({ target: { name: 'platform', value: 'youtube' } })}
                  className={`p-6 rounded-xl border-2 transition-all ${
                    formData.platform === 'youtube'
                      ? 'border-red-600 bg-red-50'
                      : 'border-gray-300 bg-white hover:border-gray-400'
                  }`}
                >
                  <Youtube className={`w-8 h-8 mx-auto mb-2 ${
                    formData.platform === 'youtube' ? 'text-red-600' : 'text-gray-400'
                  }`} />
                  <span className={`font-medium ${
                    formData.platform === 'youtube' ? 'text-red-600' : 'text-gray-700'
                  }`}>
                    YouTube
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => handleChange({ target: { name: 'platform', value: 'tiktok' } })}
                  className={`p-6 rounded-xl border-2 transition-all ${
                    formData.platform === 'tiktok'
                      ? 'border-red-600 bg-red-50'
                      : 'border-gray-300 bg-white hover:border-gray-400'
                  }`}
                >
                  <Music className={`w-8 h-8 mx-auto mb-2 ${
                    formData.platform === 'tiktok' ? 'text-red-600' : 'text-gray-400'
                  }`} />
                  <span className={`font-medium ${
                    formData.platform === 'tiktok' ? 'text-red-600' : 'text-gray-700'
                  }`}>
                    TikTok
                  </span>
                </button>
              </div>

              {formData.platform && (
                <div className="mt-6">
                  <label className="text-gray-700 text-sm mb-2 block">
                    İçerik Tipi <span className="text-red-600">*</span>
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {contentOptions.map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => handleChange({ target: { name: 'contentType', value: option.value } })}
                        className={`p-4 rounded-xl border-2 transition-all text-left ${
                          formData.contentType === option.value
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
                    value={formData.description}
                    onChange={handleChange}
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
        </div>
      </div>
    </section>
  );
};

export default CustomerApplicationSection;
