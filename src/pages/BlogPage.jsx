import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, User, ArrowRight, Search, Tag, Clock } from 'lucide-react';

/**
 * BlogPage - Blog Sayfası
 */
const BlogPage = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', label: 'Tümü' },
    { id: 'marketing', label: 'Marketing' },
    { id: 'trends', label: 'Trendler' },
    { id: 'case-studies', label: 'Vaka Çalışmaları' },
    { id: 'tips', label: 'İpuçları' },
    { id: 'news', label: 'Haberler' }
  ];

  const blogPosts = [
    {
      id: 1,
      title: "2025 Yıl Sonu Influencer Pazarlama Trendleri: Ne Öğrendik?",
      excerpt: "2025 yılının sonuna yaklaşırken, influencer pazarlama sektöründeki en önemli trendleri ve öğrenilen dersleri derledik. Gelecek yıl için hazırlık yapın.",
      author: "Ayşe Yılmaz",
      date: "12 Aralık 2025",
      category: "trends",
      readTime: "8 dk",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop",
      featured: true
    },
    {
      id: 2,
      title: "Instagram Reels ve Stories: 2025'in En Etkili İçerik Formatları",
      excerpt: "Instagram'ın Reels ve Stories formatları, 2025'te influencer pazarlamada en yüksek engagement oranlarını sağladı. Bu formatları nasıl etkili kullanabilirsiniz?",
      author: "Mehmet Demir",
      date: "10 Aralık 2025",
      category: "trends",
      readTime: "7 dk",
      image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=500&fit=crop",
      featured: false
    },
    {
      id: 3,
      title: "Q4 2025 Başarı Hikayesi: E-Ticaret Markası %450 ROI Elde Etti",
      excerpt: "Bir e-ticaret markasının son çeyrekte 150 micro-influencer ile yaptığı kampanyanın detaylı analizi ve rekor kıran sonuçları.",
      author: "Zeynep Kaya",
      date: "8 Aralık 2025",
      category: "case-studies",
      readTime: "10 dk",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=500&fit=crop",
      featured: false
    },
    {
      id: 4,
      title: "2026 İçin Influencer Pazarlama Stratejisi Nasıl Hazırlanır?",
      excerpt: "Yeni yıla hazırlanırken, influencer pazarlama stratejinizi nasıl optimize edebilirsiniz? 2026 için hazırlık rehberi.",
      author: "Can Özkan",
      date: "5 Aralık 2025",
      category: "tips",
      readTime: "6 dk",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=500&fit=crop",
      featured: false
    },
    {
      id: 5,
      title: "TikTok Shop Entegrasyonu: Influencer Satışlarında Devrim",
      excerpt: "TikTok Shop'un influencer pazarlamaya entegrasyonu, doğrudan satışları %300 artırdı. Bu yeni özellikten nasıl faydalanabilirsiniz?",
      author: "Elif Şahin",
      date: "3 Aralık 2025",
      category: "trends",
      readTime: "8 dk",
      image: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=800&h=500&fit=crop",
      featured: false
    },
    {
      id: 6,
      title: "Micro-Influencer Pazarlama: 2025'in En Etkili Stratejisi",
      excerpt: "Büyük bütçeler yerine akıllı stratejilerle markanızı büyütün. Micro-influencer pazarlamanın neden geleceğin pazarlaması olduğunu keşfedin.",
      author: "Burak Yıldız",
      date: "1 Aralık 2025",
      category: "marketing",
      readTime: "9 dk",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=500&fit=crop",
      featured: false
    },
    {
      id: 7,
      title: "AI Destekli Influencer Eşleştirme: Gelecek Burada",
      excerpt: "Yapay zeka teknolojileri, marka-influencer eşleştirmesini devrim niteliğinde değiştirdi. 2025'te en başarılı AI araçları ve kullanım örnekleri.",
      author: "Ayşe Yılmaz",
      date: "28 Kasım 2025",
      category: "trends",
      readTime: "6 dk",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=500&fit=crop",
      featured: false
    },
    {
      id: 8,
      title: "YouTube Shorts ve Instagram Reels: Kısa Video İçeriklerin Gücü",
      excerpt: "2025'te kısa video içerikler, influencer pazarlamada en yüksek ROI'yi sağladı. Bu platformları nasıl etkili kullanabilirsiniz?",
      author: "Mehmet Demir",
      date: "25 Kasım 2025",
      category: "news",
      readTime: "7 dk",
      image: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=800&h=500&fit=crop",
      featured: false
    }
  ];

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = activeCategory === 'all' || post.category === activeCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredPost = blogPosts.find(post => post.featured);

  return (
    <section className="bg-white py-20 px-6 min-h-screen">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-red-600 text-sm font-semibold tracking-wider uppercase">
            Blog
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mt-4">
            Güncel Haberler & İçerikler
          </h1>
          <p className="text-gray-600 mt-6 max-w-2xl mx-auto text-lg">
            Influencer pazarlama, trendler, vaka çalışmaları ve sektörden en güncel haberler
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="text"
              placeholder="Blog yazılarında ara..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-50 border border-gray-300 rounded-2xl py-4 pl-12 pr-4 text-gray-900 placeholder-gray-500 focus:outline-none focus:border-red-600 transition-colors"
            />
          </div>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-3 rounded-full text-sm font-medium transition-all ${
                activeCategory === category.id
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200 border border-gray-300'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Featured Post */}
        {featuredPost && activeCategory === 'all' && !searchQuery && (
          <div className="mb-16">
            <div className="bg-gray-50 border border-gray-200 rounded-3xl overflow-hidden">
              <div className="grid md:grid-cols-2 gap-0">
                <div className="relative h-64 md:h-auto">
                  <img
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-red-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                      Öne Çıkan
                    </span>
                  </div>
                </div>
                <div className="p-8 md:p-12 flex flex-col justify-center bg-white">
                  <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{featuredPost.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>{featuredPost.readTime}</span>
                    </div>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                    {featuredPost.title}
                  </h2>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                        <User className="w-5 h-5 text-red-600" />
                      </div>
                      <div>
                        <div className="text-gray-900 font-medium">{featuredPost.author}</div>
                        <div className="text-gray-600 text-sm">Yazar</div>
                      </div>
                    </div>
                    <button 
                      onClick={() => navigate(`/blog/${featuredPost.id}`)}
                      className="flex items-center gap-2 text-red-600 hover:text-red-700 transition-colors font-semibold"
                    >
                      Devamını Oku
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Blog Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts
            .filter(post => !post.featured || activeCategory !== 'all' || searchQuery)
            .map((post) => (
            <article
              key={post.id}
              onClick={() => navigate(`/blog/${post.id}`)}
              className="bg-white border border-gray-200 rounded-3xl overflow-hidden hover:bg-red-50 hover:border-red-200 transition-all group cursor-pointer shadow-sm"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-red-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                    {categories.find(c => c.id === post.category)?.label}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center gap-4 mb-3 text-xs text-gray-600">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{post.readTime}</span>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-red-600 transition-colors">
                  {post.title}
                </h3>
                
                <p className="text-gray-600 text-sm mb-4 leading-relaxed line-clamp-2">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-600 text-sm">{post.author}</span>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-500 group-hover:text-red-600 group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Empty State */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-600 text-lg">Aradığınız kriterlere uygun blog yazısı bulunamadı.</p>
          </div>
        )}

        {/* Newsletter CTA */}
        

      </div>
    </section>
  );
};

export default BlogPage;

