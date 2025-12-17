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
