import { useState, lazy, Suspense } from 'react';
import { MapPin, Phone, Mail, Sparkles, Briefcase } from 'lucide-react';

// Lazy load forms for better performance
const InfluencerForm = lazy(() => import('./InfluencerForm'));
const BrandForm = lazy(() => import('./BrandForm'));

/**
 * ContactSection Component
 * Separated Influencer and Brand forms with expert-level design
 * Modern UI/UX with smooth transitions and professional layout
 */
const ContactSection = () => {
  const [applicationType, setApplicationType] = useState('influencer'); // 'influencer' veya 'brand'

  return (
    <section className="bg-gradient-to-b from-white to-gray-50 py-8 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16">
          
          {/* Left - Contact Info */}
          <div className="lg:sticky lg:top-8 h-fit">
            <div className="mb-6 md:mb-8">
              <span className="text-red-600 text-sm font-semibold tracking-wider uppercase">
                İletişim
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mt-3 md:mt-4">
                Bizimle İletişime
                <span className="text-red-600"> Geçin</span>
              </h2>
              <p className="text-gray-600 mt-4 md:mt-6 text-base md:text-lg leading-relaxed">
                Markanız için en uygun influencer stratejisini oluşturmak veya bir influencer 
                olarak bize katılmak için formu doldurun.
              </p>
            </div>

            {/* Contact Details */}
            <div className="space-y-4 md:space-y-6 mb-6 md:mb-10">
              <div className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl sm:rounded-2xl hover:bg-gray-50 transition-colors">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-gradient-to-br from-red-100 to-pink-100 flex items-center justify-center flex-shrink-0 shadow-sm">
                  <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-red-600" />
                </div>
                <div>
                  <h4 className="text-gray-900 font-semibold mb-1 text-sm sm:text-base">Adres</h4>
                  <p className="text-gray-600 text-sm sm:text-base">Şişli / İstanbul</p>
                </div>
              </div>

              <div className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl sm:rounded-2xl hover:bg-gray-50 transition-colors">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-gradient-to-br from-red-100 to-pink-100 flex items-center justify-center flex-shrink-0 shadow-sm">
                  <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-red-600" />
                </div>
                <div>
                  <h4 className="text-gray-900 font-semibold mb-1 text-sm sm:text-base">Telefon</h4>
                  <a href="tel:+905422125395" className="text-gray-600 hover:text-red-600 transition-colors text-sm sm:text-base">
                    0542 212 53 95
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl sm:rounded-2xl hover:bg-gray-50 transition-colors">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-gradient-to-br from-red-100 to-pink-100 flex items-center justify-center flex-shrink-0 shadow-sm">
                  <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-red-600" />
                </div>
                <div>
                  <h4 className="text-gray-900 font-semibold mb-1 text-sm sm:text-base">E-posta</h4>
                  <a href="mailto:hello@influencerturkiye.com" className="text-gray-600 hover:text-red-600 transition-colors text-xs sm:text-sm break-all">
                    hello@influencerturkiye.com
                  </a>
                </div>
              </div>
            </div>

            <div className="p-4 sm:p-6 bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-200 rounded-2xl sm:rounded-3xl shadow-sm">
              <h4 className="text-gray-900 font-bold mb-2 text-base sm:text-lg">Influencer Türkiye Inc.</h4>
              <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                Türkiye'nin önde gelen influencer marketing ajansı. 13.000+ influencer ağımız ile 
                markanızı hedef kitlenize ulaştırıyoruz.
              </p>
            </div>
          </div>

          {/* Right - Form Container */}
          <div className="bg-white border-2 border-gray-200 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-10 shadow-xl">
            {/* Type Selection - Modern Toggle */}
            <div className="mb-6 md:mb-8">
              <div className="relative bg-gray-100 p-1 sm:p-1.5 rounded-xl sm:rounded-2xl flex gap-1.5 sm:gap-2">
                <button
                  type="button"
                  onClick={() => setApplicationType('influencer')}
                  className={`flex-1 py-3 sm:py-4 px-4 sm:px-6 rounded-lg sm:rounded-xl font-bold text-xs sm:text-sm transition-all duration-300 relative z-10 ${
                    applicationType === 'influencer'
                      ? 'bg-gradient-to-r from-pink-500 to-red-600 text-white shadow-lg transform scale-105'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <div className="flex items-center justify-center gap-1.5 sm:gap-2">
                    <Sparkles className={`w-4 h-4 sm:w-5 sm:h-5 ${applicationType === 'influencer' ? 'text-white' : 'text-gray-500'}`} />
                    <span>Influencer'ım</span>
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => setApplicationType('brand')}
                  className={`flex-1 py-3 sm:py-4 px-4 sm:px-6 rounded-lg sm:rounded-xl font-bold text-xs sm:text-sm transition-all duration-300 relative z-10 ${
                    applicationType === 'brand'
                      ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg transform scale-105'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <div className="flex items-center justify-center gap-1.5 sm:gap-2">
                    <Briefcase className={`w-4 h-4 sm:w-5 sm:h-5 ${applicationType === 'brand' ? 'text-white' : 'text-gray-500'}`} />
                    <span>Markayım</span>
                  </div>
                </button>
              </div>
            </div>

            {/* Form Content with Smooth Transition */}
            <div className="transition-all duration-300">
              <Suspense fallback={
                <div className="flex items-center justify-center py-12">
                  <div className="w-8 h-8 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
                </div>
              }>
                {applicationType === 'influencer' ? (
                  <InfluencerForm />
                ) : (
                  <BrandForm />
                )}
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
