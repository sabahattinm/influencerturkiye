import { Briefcase, Users, MapPin, Award } from 'lucide-react';

/**
 * StatsSection Component
 * İstatistikler ve proje durumları
 */
const StatsSection = () => {
  const stats = [
    { icon: Briefcase, number: "189", label: "Özel Proje", color: "#d3f26a" },
    { icon: Users, number: "125", label: "Hesap Yönetimi", color: "#ad7bff" },
    { icon: MapPin, number: "168", label: "Mekan Tanıtımı", color: "#ff7bb8" },
    { icon: Award, number: "84", label: "Ödüllü Proje", color: "#4ecdc4" }
  ];

  const progressBars = [
    { label: "Özel Proje", percentage: 40, color: "#d3f26a" },
    { label: "Hesap Yönetimi", percentage: 20, color: "#ad7bff" },
    { label: "Reklam Projeleri", percentage: 60, color: "#ff7bb8" },
    { label: "Mekan Tanıtımı", percentage: 80, color: "#4ecdc4" }
  ];

  return (
    <section className="bg-[#1a1a1c] py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-[#d3f26a] text-sm font-semibold tracking-wider uppercase">
            Başarılarımız
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mt-4">
            Rakamlarla Influencer Türkiye
          </h2>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div 
                key={index}
                className="bg-[#242426] rounded-3xl p-8 text-center group hover:bg-[#2a2a2c] transition-all"
              >
                <div 
                  className="w-16 h-16 rounded-2xl mx-auto mb-6 flex items-center justify-center"
                  style={{ backgroundColor: stat.color + '20' }}
                >
                  <IconComponent className="w-8 h-8" style={{ color: stat.color }} />
                </div>
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-gray-500">{stat.label}</div>
              </div>
            );
          })}
        </div>

        {/* Progress Section */}
        <div className="bg-[#242426] rounded-3xl p-8 md:p-12">
          <h3 className="text-2xl font-bold text-white mb-8">Proje Durumları</h3>
          <div className="grid md:grid-cols-2 gap-8">
            {progressBars.map((bar, index) => (
              <div key={index}>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-400">{bar.label}</span>
                  <span className="text-white font-semibold">{bar.percentage}%</span>
                </div>
                <div className="h-3 bg-[#171719] rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all duration-1000"
                    style={{ width: `${bar.percentage}%`, backgroundColor: bar.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
