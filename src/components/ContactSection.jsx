import { useState } from 'react';
import { MapPin, Phone, Mail, Sparkles, Briefcase } from 'lucide-react';
import InfluencerForm from './InfluencerForm';
import BrandForm from './BrandForm';

/**
 * ContactSection Component
 * Separated Influencer and Brand forms with expert-level design
 * Modern UI/UX with smooth transitions and professional layout
 */
const ContactSection = () => {
  const [applicationType, setApplicationType] = useState('influencer'); // 'influencer' veya 'brand'

  return (
    <section className="bg-gradient-to-b from-white to-gray-50 py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16">
          
          {/* Left - Contact Info */}
          <div className="lg:sticky lg:top-8 h-fit">
            <div className="mb-8">
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
            </div>

            {/* Contact Details */}
            <div className="space-y-6 mb-10">
              <div className="flex items-start gap-4 p-4 rounded-2xl hover:bg-gray-50 transition-colors">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-red-100 to-pink-100 flex items-center justify-center flex-shrink-0 shadow-sm">
                  <MapPin className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h4 className="text-gray-900 font-semibold mb-1">Adres</h4>
                  <p className="text-gray-600">Etiler / Beşiktaş / İstanbul</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-2xl hover:bg-gray-50 transition-colors">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-red-100 to-pink-100 flex items-center justify-center flex-shrink-0 shadow-sm">
                  <Phone className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h4 className="text-gray-900 font-semibold mb-1">Telefon</h4>
                  <a href="tel:+905422125395" className="text-gray-600 hover:text-red-600 transition-colors">
                    0542 212 53 95
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-2xl hover:bg-gray-50 transition-colors">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-red-100 to-pink-100 flex items-center justify-center flex-shrink-0 shadow-sm">
                  <Mail className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h4 className="text-gray-900 font-semibold mb-1">E-posta</h4>
                  <a href="mailto:hello@influencerturkiye.com" className="text-gray-600 hover:text-red-600 transition-colors">
                    hello@influencerturkiye.com
                  </a>
                </div>
              </div>
            </div>

            <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-200 rounded-3xl shadow-sm">
              <h4 className="text-gray-900 font-bold mb-2 text-lg">Influencer Türkiye Inc.</h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                Türkiye'nin önde gelen influencer marketing ajansı. 13.000+ influencer ağımız ile 
                markanızı hedef kitlenize ulaştırıyoruz.
              </p>
            </div>
          </div>

          {/* Right - Form Container */}
          <div className="bg-white border-2 border-gray-200 rounded-3xl p-8 md:p-10 shadow-xl">
            {/* Type Selection - Modern Toggle */}
            <div className="mb-8">
              <div className="relative bg-gray-100 p-1.5 rounded-2xl flex gap-2">
                <button
                  type="button"
                  onClick={() => setApplicationType('influencer')}
                  className={`flex-1 py-4 px-6 rounded-xl font-bold text-sm transition-all duration-300 relative z-10 ${
                    applicationType === 'influencer'
                      ? 'bg-gradient-to-r from-pink-500 to-red-600 text-white shadow-lg transform scale-105'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <div className="flex items-center justify-center gap-2">
                    <Sparkles className={`w-5 h-5 ${applicationType === 'influencer' ? 'text-white' : 'text-gray-500'}`} />
                    <span>Influencer'ım</span>
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => setApplicationType('brand')}
                  className={`flex-1 py-4 px-6 rounded-xl font-bold text-sm transition-all duration-300 relative z-10 ${
                    applicationType === 'brand'
                      ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg transform scale-105'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <div className="flex items-center justify-center gap-2">
                    <Briefcase className={`w-5 h-5 ${applicationType === 'brand' ? 'text-white' : 'text-gray-500'}`} />
                    <span>Markayım</span>
                  </div>
                </button>
              </div>
            </div>

            {/* Form Content with Smooth Transition */}
            <div className="transition-all duration-300">
              {applicationType === 'influencer' ? (
                <InfluencerForm />
              ) : (
                <BrandForm />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
