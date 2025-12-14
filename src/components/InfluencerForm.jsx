import { useState, useEffect } from 'react';
import { 
  User, Mail, Phone, MapPin, MessageSquare, Send, 
  Instagram, Youtube, Facebook, Globe, Link as LinkIcon,
  Sparkles, TrendingUp, CheckCircle2
} from 'lucide-react';

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
import { saveInfluencerApplication } from '../services/dataService';
import { sendInfluencerApplicationEmail } from '../services/emailService';

/**
 * InfluencerForm Component
 * Expert-level design with modern UI/UX principles
 * Professional gradient effects, smooth animations, and intuitive layout
 */
const InfluencerForm = () => {
  const [formData, setFormData] = useState({
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ type: null, message: '' });

  // Form gönderildikten sonra sayfayı yukarı kaydır
  useEffect(() => {
    if (submitStatus.message) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [submitStatus.message]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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

      const hasSocialMedia = formData.facebook || formData.youtube || formData.twitch || 
                            formData.instagram || formData.twitter || formData.blog || formData.other;
      
      if (!hasSocialMedia) {
        setSubmitStatus({ 
          type: 'error', 
          message: 'Lütfen en az bir sosyal medya hesabı bilgisi giriniz.' 
        });
        setIsSubmitting(false);
        return;
      }

      await saveInfluencerApplication(formData);
      
      // E-posta gönder (hata olsa bile form kaydı başarılı olduğu için devam et)
      try {
        await sendInfluencerApplicationEmail(formData);
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

  return (
    <div className="w-full">
      {/* Header Section with Gradient */}
      <div className="mb-4 sm:mb-6 md:mb-8">
        <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-gradient-to-br from-pink-500 to-red-600 flex items-center justify-center shadow-lg">
            <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">Influencer Başvuru Formu</h2>
            <p className="text-gray-600 mt-1 text-sm sm:text-base">Sosyal medya varlığınızı büyütmek için bize katılın</p>
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
        {/* Personal Information Section */}
        <div className="bg-gradient-to-br from-white to-gray-50 border-2 border-gray-200 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-red-100 flex items-center justify-center">
              <User className="w-4 h-4 sm:w-5 sm:h-5 text-red-600" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-900">Kişisel Bilgiler</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
            <div className="md:col-span-2">
              <label className="text-gray-700 text-xs sm:text-sm font-semibold mb-2 block">
                Ad Soyad <span className="text-red-600">*</span>
              </label>
              <div className="relative group">
                <User className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400 group-focus-within:text-red-600 transition-colors" />
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Adınız Soyadınız"
                  className="w-full bg-white border-2 border-gray-200 rounded-lg sm:rounded-xl py-3 sm:py-4 pl-10 sm:pl-12 pr-3 sm:pr-4 text-sm sm:text-base text-gray-900 placeholder-gray-400 focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-100 transition-all"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-gray-700 text-xs sm:text-sm font-semibold mb-2 block">
                E-posta <span className="text-red-600">*</span>
              </label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-red-600 transition-colors" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="ornek@email.com"
                  className="w-full bg-white border-2 border-gray-200 rounded-lg sm:rounded-xl py-3 sm:py-4 pl-10 sm:pl-12 pr-3 sm:pr-4 text-sm sm:text-base text-gray-900 placeholder-gray-400 focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-100 transition-all"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-gray-700 text-xs sm:text-sm font-semibold mb-2 block">
                Telefon <span className="text-red-600">*</span>
              </label>
              <div className="relative group">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-red-600 transition-colors" />
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="+90 5XX XXX XX XX"
                  className="w-full bg-white border-2 border-gray-200 rounded-lg sm:rounded-xl py-3 sm:py-4 pl-10 sm:pl-12 pr-3 sm:pr-4 text-sm sm:text-base text-gray-900 placeholder-gray-400 focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-100 transition-all"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-gray-700 text-xs sm:text-sm font-semibold mb-2 block">Cinsiyet</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full bg-white border-2 border-gray-200 rounded-lg sm:rounded-xl py-3 sm:py-4 px-3 sm:px-4 text-sm sm:text-base text-gray-900 focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-100 transition-all"
              >
                <option value="">Seçiniz</option>
                <option value="Erkek">Erkek</option>
                <option value="Kadın">Kadın</option>
              </select>
            </div>

            <div>
              <label className="text-gray-700 text-xs sm:text-sm font-semibold mb-2 block">
                Ülke <span className="text-red-600">*</span>
              </label>
              <div className="relative group">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-red-600 transition-colors" />
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  placeholder="Türkiye"
                  className="w-full bg-white border-2 border-gray-200 rounded-lg sm:rounded-xl py-3 sm:py-4 pl-10 sm:pl-12 pr-3 sm:pr-4 text-sm sm:text-base text-gray-900 placeholder-gray-400 focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-100 transition-all"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-gray-700 text-xs sm:text-sm font-semibold mb-2 block">
                Şehir <span className="text-red-600">*</span>
              </label>
              <div className="relative group">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-red-600 transition-colors" />
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="İstanbul"
                  className="w-full bg-white border-2 border-gray-200 rounded-lg sm:rounded-xl py-3 sm:py-4 pl-10 sm:pl-12 pr-3 sm:pr-4 text-sm sm:text-base text-gray-900 placeholder-gray-400 focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-100 transition-all"
                  required
                />
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="text-gray-700 text-xs sm:text-sm font-semibold mb-2 block">İlgi Alanları</label>
              <div className="relative group">
                <MessageSquare className="absolute left-3 sm:left-4 top-3 sm:top-4 w-4 h-4 sm:w-5 sm:h-5 text-gray-400 group-focus-within:text-red-600 transition-colors" />
                <textarea
                  name="interests"
                  value={formData.interests}
                  onChange={handleChange}
                  placeholder="Örn: Teknoloji, Moda, Spor, Yemek..."
                  rows={3}
                  className="w-full bg-white border-2 border-gray-200 rounded-lg sm:rounded-xl py-3 sm:py-4 pl-10 sm:pl-12 pr-3 sm:pr-4 text-sm sm:text-base text-gray-900 placeholder-gray-400 focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-100 resize-none transition-all"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Social Media Section */}
        <div className="bg-gradient-to-br from-white to-gray-50 border-2 border-gray-200 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center">
              <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900">Sosyal Medya Hesapları</h3>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">En az bir tane zorunlu</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
            <div>
              <label className="text-gray-700 text-xs sm:text-sm font-semibold mb-2 block flex items-center gap-2">
                <Instagram className="w-4 h-4 text-pink-600" />
                Instagram URL
              </label>
              <div className="relative group">
                <LinkIcon className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400 group-focus-within:text-red-600 transition-colors" />
                <input
                  type="url"
                  name="instagram"
                  value={formData.instagram}
                  onChange={handleChange}
                  placeholder="https://instagram.com/kullaniciadi"
                  className="w-full bg-white border-2 border-gray-200 rounded-lg sm:rounded-xl py-3 sm:py-4 pl-10 sm:pl-12 pr-3 sm:pr-4 text-sm sm:text-base text-gray-900 placeholder-gray-400 focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-100 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="text-gray-700 text-xs sm:text-sm font-semibold mb-2 block flex items-center gap-2">
                <Youtube className="w-4 h-4 text-red-600" />
                YouTube URL
              </label>
              <div className="relative group">
                <LinkIcon className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400 group-focus-within:text-red-600 transition-colors" />
                <input
                  type="url"
                  name="youtube"
                  value={formData.youtube}
                  onChange={handleChange}
                  placeholder="https://youtube.com/@kullaniciadi"
                  className="w-full bg-white border-2 border-gray-200 rounded-lg sm:rounded-xl py-3 sm:py-4 pl-10 sm:pl-12 pr-3 sm:pr-4 text-sm sm:text-base text-gray-900 placeholder-gray-400 focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-100 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="text-gray-700 text-xs sm:text-sm font-semibold mb-2 block flex items-center gap-2">
                <Facebook className="w-4 h-4 text-blue-600" />
                Facebook URL
              </label>
              <div className="relative group">
                <LinkIcon className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400 group-focus-within:text-red-600 transition-colors" />
                <input
                  type="url"
                  name="facebook"
                  value={formData.facebook}
                  onChange={handleChange}
                  placeholder="https://facebook.com/kullaniciadi"
                  className="w-full bg-white border-2 border-gray-200 rounded-lg sm:rounded-xl py-3 sm:py-4 pl-10 sm:pl-12 pr-3 sm:pr-4 text-sm sm:text-base text-gray-900 placeholder-gray-400 focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-100 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="text-gray-700 text-xs sm:text-sm font-semibold mb-2 block flex items-center gap-2">
                <XIcon className="w-4 h-4 text-gray-900" />
                X (Twitter) URL
              </label>
              <div className="relative group">
                <LinkIcon className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400 group-focus-within:text-red-600 transition-colors" />
                <input
                  type="url"
                  name="twitter"
                  value={formData.twitter}
                  onChange={handleChange}
                  placeholder="https://x.com/kullaniciadi"
                  className="w-full bg-white border-2 border-gray-200 rounded-lg sm:rounded-xl py-3 sm:py-4 pl-10 sm:pl-12 pr-3 sm:pr-4 text-sm sm:text-base text-gray-900 placeholder-gray-400 focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-100 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="text-gray-700 text-xs sm:text-sm font-semibold mb-2 block flex items-center gap-2">
                <Globe className="w-4 h-4 text-purple-600" />
                Twitch TV URL
              </label>
              <div className="relative group">
                <LinkIcon className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400 group-focus-within:text-red-600 transition-colors" />
                <input
                  type="url"
                  name="twitch"
                  value={formData.twitch}
                  onChange={handleChange}
                  placeholder="https://twitch.tv/kullaniciadi"
                  className="w-full bg-white border-2 border-gray-200 rounded-lg sm:rounded-xl py-3 sm:py-4 pl-10 sm:pl-12 pr-3 sm:pr-4 text-sm sm:text-base text-gray-900 placeholder-gray-400 focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-100 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="text-gray-700 text-xs sm:text-sm font-semibold mb-2 block flex items-center gap-2">
                <Globe className="w-4 h-4 text-gray-600" />
                Blog/Web Sitesi URL
              </label>
              <div className="relative group">
                <LinkIcon className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400 group-focus-within:text-red-600 transition-colors" />
                <input
                  type="url"
                  name="blog"
                  value={formData.blog}
                  onChange={handleChange}
                  placeholder="https://blogunuz.com"
                  className="w-full bg-white border-2 border-gray-200 rounded-lg sm:rounded-xl py-3 sm:py-4 pl-10 sm:pl-12 pr-3 sm:pr-4 text-sm sm:text-base text-gray-900 placeholder-gray-400 focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-100 transition-all"
                />
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="text-gray-700 text-xs sm:text-sm font-semibold mb-2 block">Diğer Sosyal Medya</label>
              <div className="relative group">
                <LinkIcon className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400 group-focus-within:text-red-600 transition-colors" />
                <input
                  type="url"
                  name="other"
                  value={formData.other}
                  onChange={handleChange}
                  placeholder="Diğer platform URL'i"
                  className="w-full bg-white border-2 border-gray-200 rounded-lg sm:rounded-xl py-3 sm:py-4 pl-10 sm:pl-12 pr-3 sm:pr-4 text-sm sm:text-base text-gray-900 placeholder-gray-400 focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-100 transition-all"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Budget Section */}
        <div className="bg-gradient-to-br from-white to-gray-50 border-2 border-gray-200 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-gradient-to-br from-yellow-100 to-orange-100 flex items-center justify-center">
              <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-900">Bütçe Beklentisi</h3>
          </div>
          
          <div>
            <label className="text-gray-700 text-sm font-semibold mb-2 block">
              Paylaşım Başına Ücret (TRY) <span className="text-red-600">*</span>
            </label>
            <input
              type="number"
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              placeholder="0.00"
              min="0"
              step="0.01"
              className="w-full bg-white border-2 border-gray-200 rounded-lg sm:rounded-xl py-3 sm:py-4 px-3 sm:px-4 text-sm sm:text-base text-gray-900 placeholder-gray-400 focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-100 transition-all [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              required
            />
          </div>
        </div>

        {/* KVKK Section */}
        <div className="bg-gradient-to-br from-red-50 to-pink-50 border-2 border-red-200 rounded-2xl sm:rounded-3xl p-4 sm:p-6">
          <div className="flex items-start gap-3 sm:gap-4">
            <input
              type="checkbox"
              id="kvkk-checkbox"
              checked={kvkkAccepted}
              onChange={(e) => setKvkkAccepted(e.target.checked)}
              className="mt-1 w-4 h-4 sm:w-5 sm:h-5 text-red-600 border-gray-300 rounded focus:ring-red-500 focus:ring-2 cursor-pointer"
              required
            />
            <label htmlFor="kvkk-checkbox" className="text-xs sm:text-sm text-gray-700 cursor-pointer flex-1 leading-relaxed">
              <a 
                href="/kvkk" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-red-600 hover:text-red-700 underline font-semibold"
                onClick={(e) => e.stopPropagation()}
              >
                Kişisel Verilerin Korunması Kanunu
              </a>
              {' '}metnini okudum, anladım ve{' '}
              <span className="text-red-600 font-bold">onaylıyorum</span>.
              <span className="text-red-600"> *</span>
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting || !kvkkAccepted}
          className="w-full bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-white py-4 sm:py-5 rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg flex items-center justify-center gap-2 sm:gap-3 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:transform-none"
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

export default InfluencerForm;


