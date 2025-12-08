import { Quote } from 'lucide-react';

/**
 * TestimonialsSection Component
 * Uzman görüşleri
 */
const TestimonialsSection = () => {
  const testimonials = [
    {
      quote: "Instagram'ın algoritmasını kullanıcının ilgi alanına göre içeriği önceliklendirme şeklinde değiştirmesinin 'micro-influencer'ların paylaşımlarının platformda daha görünür hale getirdiğini söylüyor.",
      author: "Chris Gonzales",
      role: "Gnack CEO",
      color: "#d3f26a"
    },
    {
      quote: "Genellikle yaklaşık 100.000 ila 200.000 takipçisi olan sosyal medya kullanıcılarını tanımlamak için 'power-middle influencers' tabirini kullanıyor.",
      author: "Fergus Thomas",
      role: "Influencer Marketing Uzmanı",
      color: "#ad7bff"
    },
    {
      quote: "Moda influencer'larının katıldıkları moda haftalarından paylaştığı içerikler moda dergileri ile yarışıyor. Sosyal medya moda endüstrisine şeffaflık getirdi.",
      author: "Sektör Analizi",
      role: "Marketing Insight",
      color: "#ff7bb8"
    }
  ];

  return (
    <section className="bg-[#1a1a1c] py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-[#d3f26a] text-sm font-semibold tracking-wider uppercase">
            Görüşler
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mt-4">
            Uzman Görüşleri
          </h2>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-[#242426] rounded-3xl p-8 relative group hover:bg-[#2a2a2c] transition-all"
            >
              <div 
                className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6"
                style={{ backgroundColor: testimonial.color + '20' }}
              >
                <Quote className="w-6 h-6" style={{ color: testimonial.color }} />
              </div>

              <p className="text-gray-300 leading-relaxed mb-8">
                "{testimonial.quote}"
              </p>

              <div className="flex items-center gap-4">
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm"
                  style={{ backgroundColor: testimonial.color, color: '#171719' }}
                >
                  {testimonial.author.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <div className="text-white font-semibold">{testimonial.author}</div>
                  <div className="text-gray-500 text-sm">{testimonial.role}</div>
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
