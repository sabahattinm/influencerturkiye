import { useState, useEffect } from 'react';
import { 
  User, Phone, Mail, Send, MessageSquare, Building2, FileText, 
  Instagram, Youtube, Music, CheckCircle2, Briefcase, Target
} from 'lucide-react';
import { saveCustomerApplication } from '../services/dataService';
import { sendCustomerApplicationEmail } from '../services/emailService';

/**
 * BrandForm Component
 * Expert-level design with modern UI/UX principles
 * Professional gradient effects, smooth animations, and intuitive layout
 */
const BrandForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    brand: '',
    taxNumber: '',
    phoneNumber: '',
    platform: '',
    contentType: '',
    description: ''
  });

  const [kvkkAccepted, setKvkkAccepted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ type: null, message: '' });

  // Form gönderildikten sonra sayfayı yukarı kaydır
  useEffect(() => {
    if (submitStatus.message) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [submitStatus.message]);

  const getContentOptions = () => {
    switch (formData.platform) {
      case 'instagram':
        return [
          { value: 'reels', label: 'Reels', icon: '🎬' },
          { value: 'story', label: 'Story', icon: '📱' },
          { value: 'pr', label: 'PR', icon: '📢' }
        ];
      case 'youtube':
        return [
          { value: 'shorts', label: 'Shorts', icon: '🎥' }
        ];
      case 'tiktok':
        return [
          { value: 'video', label: 'Video', icon: '🎵' }
        ];
      default:
        return [];
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => {
      if (name === 'platform') {
        return { ...prev, [name]: value, contentType: '' };
      }
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      if (!kvkkAccepted) {
        setSubmitStatus({ 
          type: 'error', 
          message: 'Lütfen Kişisel Verilerin Korunması Kanunu\'nu onaylayınız.' 
        });
        setIsSubmitting(false);
        return;
      }

      // Telefon numarası kontrolü
      if (!formData.phoneNumber || formData.phoneNumber.trim() === '') {
        setSubmitStatus({ 
          type: 'error', 
          message: 'Lütfen telefon numaranızı giriniz.' 
        });
        setIsSubmitting(false);
        return;
      }

      // Telefon numarası minimum uzunluk kontrolü (en az 10 karakter)
      const phoneDigits = formData.phoneNumber.replace(/\D/g, '');
      if (phoneDigits.length < 10) {
        setSubmitStatus({ 
          type: 'error', 
          message: 'Lütfen geçerli bir telefon numarası giriniz.' 
        });
        setIsSubmitting(false);
        return;
      }

      if (formData.platform && !formData.contentType) {
        setSubmitStatus({ 
          type: 'error', 
          message: 'Lütfen bir içerik tipi seçiniz.' 
        });
        setIsSubmitting(false);
        return;
      }

      await saveCustomerApplication(formData);
      
      // E-posta gönder (hata olsa bile form kaydı başarılı olduğu için devam et)
      try {
        await sendCustomerApplicationEmail(formData);
      } catch (emailError) {
        console.warn('E-posta gönderilemedi:', emailError);
        // E-posta hatası form başarısını etkilemez
      }
      
      setSubmitStatus({ 
        type: 'success', 
        message: 'Başvurunuz başarıyla kaydedildi! En kısa sürede sizinle iletişime geçeceğiz.' 
      });
      
      setFormData({
        fullName: '',
        email: '',
        brand: '',
        taxNumber: '',
        phoneNumber: '',
        platform: '',
        contentType: '',
        description: ''
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

  const contentOptions = getContentOptions();

  return (
    <div className="w-full">
      {/* Header Section with Gradient */}
      <div className="mb-4 sm:mb-6 md:mb-8">
        <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg">
            <Briefcase className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">Marka Başvuru Formu</h2>
            <p className="text-gray-600 mt-1 text-sm sm:text-base">Markanız için en uygun influencer stratejisini oluşturalım</p>
          </div>
        </div>
      </div>

      {/* Status Message */}
      {submitStatus.message && (
        <div className={`mb-4 sm:mb-6 p-3 sm:p-4 rounded-xl sm:rounded-2xl border-2 shadow-sm animate-in fade-in duration-300 ${
          submitStatus.type === 'success' 
            ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-300 text-green-800' 
            : 'bg-gradient-to-r from-red-50 to-rose-50 border-red-300 text-red-800'
        }`}>
          <div className="flex items-center gap-2 sm:gap-3">
            {submitStatus.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
            ) : (
              <span className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0">⚠</span>
            )}
            <p className="font-medium text-sm sm:text-base">{submitStatus.message}</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6 md:space-y-8">
        {/* Company Information Section */}
        <div className="bg-gradient-to-br from-white to-gray-50 border-2 border-gray-200 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center">
              <Building2 className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-900">Kişisel ve Marka Bilgileri</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
            <div>
              <label className="text-gray-700 text-xs sm:text-sm font-semibold mb-2 block">
                Ad Soyad <span className="text-red-600">*</span>
              </label>
              <div className="relative group">
                <User className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Adınız Soyadınız"
                  className="w-full bg-white border-2 border-gray-200 rounded-lg sm:rounded-xl py-3 sm:py-4 pl-10 sm:pl-12 pr-3 sm:pr-4 text-sm sm:text-base text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-gray-700 text-xs sm:text-sm font-semibold mb-2 block">
                E-posta <span className="text-red-600">*</span>
              </label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="ornek@email.com"
                  className="w-full bg-white border-2 border-gray-200 rounded-lg sm:rounded-xl py-3 sm:py-4 pl-10 sm:pl-12 pr-3 sm:pr-4 text-sm sm:text-base text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-gray-700 text-xs sm:text-sm font-semibold mb-2 block">
                Marka <span className="text-red-600">*</span>
              </label>
              <div className="relative group">
                <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
                <input
                  type="text"
                  name="brand"
                  value={formData.brand}
                  onChange={handleChange}
                  placeholder="Marka Adı"
                  className="w-full bg-white border-2 border-gray-200 rounded-lg sm:rounded-xl py-3 sm:py-4 pl-10 sm:pl-12 pr-3 sm:pr-4 text-sm sm:text-base text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-gray-700 text-xs sm:text-sm font-semibold mb-2 block">
                Vergi Numarası <span className="text-gray-500 text-xs font-normal">(İsteğe bağlı)</span>
              </label>
              <div className="relative group">
                <FileText className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
                <input
                  type="text"
                  name="taxNumber"
                  value={formData.taxNumber}
                  onChange={handleChange}
                  placeholder="Vergi Numarası"
                  className="w-full bg-white border-2 border-gray-200 rounded-lg sm:rounded-xl py-3 sm:py-4 pl-10 sm:pl-12 pr-3 sm:pr-4 text-sm sm:text-base text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="text-gray-700 text-xs sm:text-sm font-semibold mb-2 block">
                Telefon Numarası <span className="text-red-600">*</span>
              </label>
              <div className="relative group">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="+90 5XX XXX XX XX"
                  className="w-full bg-white border-2 border-gray-200 rounded-lg sm:rounded-xl py-3 sm:py-4 pl-10 sm:pl-12 pr-3 sm:pr-4 text-sm sm:text-base text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all"
                  required
                />
              </div>
            </div>
          </div>
        </div>

        {/* Platform Selection Section */}
        <div className="bg-gradient-to-br from-white to-gray-50 border-2 border-gray-200 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">
              <Target className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900">Platform Seçimi</h3>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">Hedef platformunuzu seçin</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-6">
            <button
              type="button"
              onClick={() => handleChange({ target: { name: 'platform', value: 'instagram' } })}
              className={`p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl border-2 transition-all transform hover:scale-105 ${
                formData.platform === 'instagram'
                  ? 'border-pink-500 bg-gradient-to-br from-pink-50 to-rose-50 shadow-lg'
                  : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
              }`}
            >
              <Instagram className={`w-8 h-8 sm:w-10 sm:h-10 mx-auto mb-2 sm:mb-3 ${
                formData.platform === 'instagram' ? 'text-pink-600' : 'text-gray-400'
              }`} />
              <span className={`font-semibold block text-sm sm:text-base ${
                formData.platform === 'instagram' ? 'text-pink-600' : 'text-gray-700'
              }`}>
                Instagram
              </span>
            </button>

            <button
              type="button"
              onClick={() => handleChange({ target: { name: 'platform', value: 'youtube' } })}
              className={`p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl border-2 transition-all transform hover:scale-105 ${
                formData.platform === 'youtube'
                  ? 'border-red-500 bg-gradient-to-br from-red-50 to-rose-50 shadow-lg'
                  : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
              }`}
            >
              <Youtube className={`w-8 h-8 sm:w-10 sm:h-10 mx-auto mb-2 sm:mb-3 ${
                formData.platform === 'youtube' ? 'text-red-600' : 'text-gray-400'
              }`} />
              <span className={`font-semibold block text-sm sm:text-base ${
                formData.platform === 'youtube' ? 'text-red-600' : 'text-gray-700'
              }`}>
                YouTube
              </span>
            </button>

            <button
              type="button"
              onClick={() => handleChange({ target: { name: 'platform', value: 'tiktok' } })}
              className={`p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl border-2 transition-all transform hover:scale-105 ${
                formData.platform === 'tiktok'
                  ? 'border-cyan-500 bg-gradient-to-br from-cyan-50 to-blue-50 shadow-lg'
                  : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
              }`}
            >
              <Music className={`w-8 h-8 sm:w-10 sm:h-10 mx-auto mb-2 sm:mb-3 ${
                formData.platform === 'tiktok' ? 'text-cyan-600' : 'text-gray-400'
              }`} />
              <span className={`font-semibold block text-sm sm:text-base ${
                formData.platform === 'tiktok' ? 'text-cyan-600' : 'text-gray-700'
              }`}>
                TikTok
              </span>
            </button>
          </div>

          {formData.platform && contentOptions.length > 0 && (
            <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t-2 border-gray-200">
              <label className="text-gray-700 text-xs sm:text-sm font-semibold mb-3 sm:mb-4 block">
                İçerik Tipi <span className="text-red-600">*</span>
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
                {contentOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => handleChange({ target: { name: 'contentType', value: option.value } })}
                    className={`p-4 sm:p-5 rounded-xl sm:rounded-2xl border-2 transition-all text-left transform hover:scale-105 ${
                      formData.contentType === option.value
                        ? 'border-blue-600 bg-gradient-to-br from-blue-50 to-indigo-50 text-blue-700 shadow-lg'
                        : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md text-gray-700'
                    }`}
                  >
                    <div className="flex items-center gap-2 sm:gap-3">
                      <span className="text-xl sm:text-2xl">{option.icon}</span>
                      <span className="font-semibold text-sm sm:text-base">{option.label}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Project Details Section */}
        <div className="bg-gradient-to-br from-white to-gray-50 border-2 border-gray-200 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-gradient-to-br from-green-100 to-emerald-100 flex items-center justify-center">
              <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-900">Proje Detayları</h3>
          </div>
          
          <div>
            <label className="text-gray-700 text-sm font-semibold mb-2 block">
              Açıklama <span className="text-red-600">*</span>
            </label>
            <div className="relative group">
              <MessageSquare className="absolute left-3 sm:left-4 top-3 sm:top-4 w-4 h-4 sm:w-5 sm:h-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Projeniz hakkında detaylı bilgi verin... Hedef kitle, bütçe, zaman çizelgesi gibi bilgileri paylaşabilirsiniz."
                rows={6}
                className="w-full bg-white border-2 border-gray-200 rounded-lg sm:rounded-xl py-3 sm:py-4 pl-10 sm:pl-12 pr-3 sm:pr-4 text-sm sm:text-base text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 resize-none transition-all"
                required
              />
            </div>
          </div>
        </div>

        {/* KVKK Section */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-2xl sm:rounded-3xl p-4 sm:p-6">
          <div className="flex items-start gap-3 sm:gap-4">
            <input
              type="checkbox"
              id="kvkk-checkbox-brand"
              checked={kvkkAccepted}
              onChange={(e) => setKvkkAccepted(e.target.checked)}
              className="mt-1 w-4 h-4 sm:w-5 sm:h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 cursor-pointer"
              required
            />
            <label htmlFor="kvkk-checkbox-brand" className="text-xs sm:text-sm text-gray-700 cursor-pointer flex-1 leading-relaxed">
              <a 
                href="/kvkk" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-700 underline font-semibold"
                onClick={(e) => e.stopPropagation()}
              >
                Kişisel Verilerin Korunması Kanunu
              </a>
              {' '}metnini okudum, anladım ve{' '}
              <span className="text-blue-600 font-bold">onaylıyorum</span>.
              <span className="text-red-600"> *</span>
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting || !kvkkAccepted}
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-white py-4 sm:py-5 rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg flex items-center justify-center gap-2 sm:gap-3 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:transform-none"
        >
          {isSubmitting ? (
            <>
              <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span className="text-sm sm:text-base">Gönderiliyor...</span>
            </>
          ) : (
            <>
              <Send className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="text-sm sm:text-base">Başvuruyu Gönder</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default BrandForm;


