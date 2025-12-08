import { Quote } from 'lucide-react';

/**
 * TestimonialsSection Component
 * Uzman görüşleri - Kırmızı-Beyaz Tema
 */
const TestimonialsSection = () => {
  const testimonials = [
    {
      quote: "Instagram'ın algoritmasını kullanıcının ilgi alanına göre içeriği önceliklendirme şeklinde değiştirmesinin 'micro-influencer'ların paylaşımlarının platformda daha görünür hale getirdiğini söylüyor.",
      author: "Chris Gonzales",
      role: "Gnack CEO",
      color: "#DC2626"
    },
    {
      quote: "Genellikle yaklaşık 100.000 ila 200.000 takipçisi olan sosyal medya kullanıcılarını tanımlamak için 'power-middle influencers' tabirini kullanıyor.",
      author: "Fergus Thomas",
      role: "Influencer Marketing Uzmanı",
      color: "#EF4444"
    },
    {
      quote: "Moda influencer'larının katıldıkları moda haftalarından paylaştığı içerikler moda dergileri ile yarışıyor. Sosyal medya moda endüstrisine şeffaflık getirdi.",
      author: "Sektör Analizi",
      role: "Marketing Insight",
      color: "#B91C1C"
    }
  ];

  return (
    <section className="bg-gray-50 py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-red-600 text-sm font-semibold tracking-wider uppercase">
            Görüşler
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mt-4">
            Uzman Görüşleri
          </h2>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-white border border-gray-200 rounded-3xl p-8 relative group hover:bg-red-50 hover:border-red-200 transition-all shadow-sm"
            >
              <div 
                className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6"
                style={{ backgroundColor: testimonial.color + '20' }}
              >
                <Quote className="w-6 h-6" style={{ color: testimonial.color }} />
              </div>

              <p className="text-gray-700 leading-relaxed mb-8">
                "{testimonial.quote}"
              </p>

              <div className="flex items-center gap-4">
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm text-white"
                  style={{ backgroundColor: testimonial.color }}
                >
                  {testimonial.author.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <div className="text-gray-900 font-semibold">{testimonial.author}</div>
                  <div className="text-gray-600 text-sm">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
