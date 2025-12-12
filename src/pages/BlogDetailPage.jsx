import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, User, ArrowLeft, Clock, Tag } from 'lucide-react';

/**
 * BlogDetailPage - Blog Yazısı Detay Sayfası
 * Individual blog post detail page with full content
 */
const BlogDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Blog posts data - same as BlogPage but with full content
  const blogPosts = [
    {
      id: 1,
      title: "2025 Yıl Sonu Influencer Pazarlama Trendleri: Ne Öğrendik?",
      excerpt: "2025 yılının sonuna yaklaşırken, influencer pazarlama sektöründeki en önemli trendleri ve öğrenilen dersleri derledik. Gelecek yıl için hazırlık yapın.",
      author: "Ayşe Yılmaz",
      date: "12 Aralık 2025",
      category: "trends",
      readTime: "8 dk",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=500&fit=crop",
      featured: true,
      content: `
        <p class="mb-4">2025 yılının sonuna yaklaşırken, influencer pazarlama sektöründe önemli dönüşümler yaşandı. Bu yazıda, yıl boyunca öğrendiğimiz en önemli dersleri ve 2026 için hazırlık yapmanız gereken trendleri derledik.</p>
        
        <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">Micro-Influencer'ların Yükselişi</h2>
        <p class="mb-4">2025'te en büyük öğrenme, micro-influencer'ların (1,000-100,000 takipçi) mega-influencer'lara göre %60 daha yüksek engagement oranlarına sahip olduğuydu. Markalar, büyük bütçeler yerine akıllı micro-influencer stratejileri ile daha iyi sonuçlar aldı.</p>
        
        <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">Kısa Video İçeriklerin Dominansı</h2>
        <p class="mb-4">TikTok, Instagram Reels ve YouTube Shorts, 2025'te influencer pazarlamada en yüksek ROI'yi sağladı. 60 saniyenin altındaki içerikler, uzun format içeriklere göre %80 daha fazla etkileşim aldı.</p>
        
        <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">AI Destekli Eşleştirme</h2>
        <p class="mb-4">Yapay zeka teknolojileri, marka-influencer eşleştirmesini devrim niteliğinde değiştirdi. AI araçları, kampanya hazırlık süresini %70 kısalttı ve eşleştirme doğruluğunu %85'e çıkardı.</p>
        
        <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">Doğrudan Satış Entegrasyonu</h2>
        <p class="mb-4">TikTok Shop ve Instagram Shopping özellikleri, influencer içeriklerinden doğrudan satış yapılmasını sağladı. Bu entegrasyonlar, dönüşüm oranlarını %300 artırdı.</p>
        
        <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">Otantiklik ve Şeffaflık</h2>
        <p class="mb-4">Tüketiciler, 2025'te daha otantik ve şeffaf içerikler aradı. Sponsored içeriklerde açıklık ve influencer'ların gerçek deneyimlerini paylaşması, güveni artırdı.</p>
        
        <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">2026 İçin Öneriler</h2>
        <p class="mb-4">2026'da başarılı olmak için, micro-influencer'larla uzun vadeli işbirlikleri kurun, kısa video içeriklere odaklanın ve AI araçlarını stratejinize entegre edin. Ayrıca, doğrudan satış özelliklerini kullanarak ROI'nizi maksimize edin.</p>
      `
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
      featured: false,
      content: `
        <p class="mb-4">Instagram'ın Reels ve Stories formatları, 2025'te influencer pazarlamada en yüksek engagement oranlarını sağladı. Bu yazıda, bu formatların neden bu kadar etkili olduğunu ve nasıl kullanabileceğinizi inceleyeceğiz.</p>
        
        <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">Reels'in Gücü</h2>
        <p class="mb-4">Instagram Reels, 2025'te platformun en hızlı büyüyen özelliği oldu. Reels içerikleri, normal feed gönderilerine göre %250 daha fazla etkileşim aldı. Kısa, eğlenceli ve trend'lere uygun içerikler, algoritma tarafından önceliklendiriliyor.</p>
        
        <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">Stories'in Etkisi</h2>
        <p class="mb-4">Instagram Stories, 2025'te günlük 500 milyon aktif kullanıcıya ulaştı. Stories içerikleri, takipçilerle daha samimi bağlantılar kuruyor ve anlık etkileşim sağlıyor. Poll, soru-cevap ve swipe-up özellikleri, engagement oranlarını artırıyor.</p>
        
        <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">Strateji Önerileri</h2>
        <p class="mb-4">Reels için, ilk 3 saniyede dikkat çekin, trend müzikler kullanın ve hashtag stratejinizi optimize edin. Stories için, günlük paylaşımlar yapın, interaktif özellikler kullanın ve takipçilerinizle gerçek zamanlı etkileşim kurun.</p>
        
        <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">Marka İşbirlikleri</h2>
        <p class="mb-4">2025'te, Reels ve Stories formatlarında yapılan marka işbirlikleri, geleneksel feed gönderilerine göre %180 daha yüksek dönüşüm oranları sağladı. Bu formatlar, ürün tanıtımları ve kampanyalar için ideal.</p>
      `
    },
    {
      id: 3,
      title: "Q4 2025 Başarı Hikayesi: E-Ticaret Markası %450 ROI Elde Etti",
      excerpt: "Bir e-ticaret markasının son çeyrekte 150 micro-influencer ile yaptığı kampanyanın detaylı analizi ve rekor kıran sonuçları.",
      author: "Zeynep Kaya",
      date: "8 Aralık 2025",
      category: "case-studies",
      readTime: "10 dk",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=500&fit=crop",
      featured: false,
      content: `
        <p class="mb-4">Türkiye'nin önde gelen e-ticaret markalarından biri, 2025'in son çeyreğinde 150 micro-influencer ile yaptığı kampanya ile rekor kıran %450 ROI elde etti. Bu vaka çalışması, doğru strateji ve platform seçimi ile nelerin mümkün olduğunu gösteriyor.</p>
        
        <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">Kampanya Detayları</h2>
        <p class="mb-4">Marka, Q4 2025'te 150 micro-influencer ile çalışarak, TikTok Shop ve Instagram Shopping entegrasyonlarını kullandı. Kampanya 3 ay sürdü ve toplamda 12 milyon kişiye ulaşıldı. Her influencer, kendi tarzına uygun ve otantik içerikler üretti.</p>
        
        <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">Sonuçlar</h2>
        <p class="mb-4">Kampanya sonunda, marka %450 ROI elde etti - sektör ortalamasının 3 katı. Web sitesi trafiği %320 arttı, yeni müşteri sayısı %280 yükseldi ve ortalama sepet değeri %45 artış gösterdi. Ayrıca, marka bilinirliği %200 arttı ve sosyal medya takipçi sayısı 2.5 katına çıktı.</p>
        
        <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">Başarının Sırları</h2>
        <p class="mb-4">Kampanyanın başarısı, doğru influencer seçimi (AI destekli eşleştirme), kısa video içerik odaklı strateji, doğrudan satış entegrasyonları ve uzun vadeli işbirliklerine dayanıyordu. Her influencer, markanın değerlerini yansıtan ve kendi tarzına uygun içerikler üretti.</p>
        
        <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">Öğrenilen Dersler</h2>
        <p class="mb-4">Bu kampanyadan öğrenilen en önemli dersler: Micro-influencer'lar mega-influencer'lardan daha etkili, kısa video içerikler en yüksek ROI'yi sağlıyor, doğrudan satış entegrasyonları kritik öneme sahip ve uzun vadeli işbirlikleri daha değerli sonuçlar veriyor.</p>
      `
    },
    {
      id: 4,
      title: "2026 İçin Influencer Pazarlama Stratejisi Nasıl Hazırlanır?",
      excerpt: "Yeni yıla hazırlanırken, influencer pazarlama stratejinizi nasıl optimize edebilirsiniz? 2026 için hazırlık rehberi.",
      author: "Can Özkan",
      date: "5 Aralık 2025",
      category: "tips",
      readTime: "6 dk",
      image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=500&fit=crop",
      featured: false,
      content: `
        <p class="mb-4">2026'ya hazırlanırken, influencer pazarlama stratejinizi gözden geçirmek ve optimize etmek kritik öneme sahip. Bu yazıda, 2026 için hazırlık yapmanız gereken adımları ve stratejileri inceleyeceğiz.</p>
        
        <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">1. 2025 Performans Analizi</h2>
        <p class="mb-4">Öncelikle, 2025'teki kampanyalarınızın performansını analiz edin. Hangi influencer'lar en iyi sonuçları verdi? Hangi içerik formatları en yüksek ROI'yi sağladı? Bu veriler, 2026 stratejinizin temelini oluşturacak.</p>
        
        <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">2. Bütçe Planlaması</h2>
        <p class="mb-4">2026 bütçenizi, 2025'teki başarılı kampanyalara göre planlayın. Micro-influencer'lara daha fazla kaynak ayırın ve kısa video içerik üretimine odaklanın. Ayrıca, AI araçları için bütçe ayırmayı unutmayın.</p>
        
        <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">3. Influencer İlişkileri</h2>
        <p class="mb-4">2025'te başarılı olan influencer'larla uzun vadeli işbirlikleri kurun. Bu, marka bilinirliği ve güven açısından daha değerlidir. Ayrıca, yeni micro-influencer'lar keşfetmek için sürekli araştırma yapın.</p>
        
        <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">4. Platform Stratejisi</h2>
        <p class="mb-4">2026'da TikTok, Instagram Reels ve YouTube Shorts'a odaklanın. Bu platformlar, 2025'te en yüksek ROI'yi sağladı. Ayrıca, doğrudan satış özelliklerini (TikTok Shop, Instagram Shopping) stratejinize entegre edin.</p>
        
        <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">5. İçerik Formatları</h2>
        <p class="mb-4">Kısa video içerikler (60 saniyenin altı) 2026'da da öncelikli olacak. Ayrıca, interaktif içerikler (poll, soru-cevap, canlı yayınlar) engagement oranlarını artırıyor.</p>
        
        <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">6. AI Araçları Entegrasyonu</h2>
        <p class="mb-4">AI destekli influencer eşleştirme ve içerik optimizasyon araçlarını stratejinize entegre edin. Bu araçlar, kampanya hazırlık süresini kısaltıyor ve ROI'yi artırıyor.</p>
        
        <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">7. Ölçüm ve Analiz</h2>
        <p class="mb-4">2026'da, kampanya performansını sürekli ölçün ve analiz edin. Sadece engagement oranlarına değil, dönüşüm oranlarına, marka bilinirliğine ve uzun vadeli etkilere de bakın.</p>
      `
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
      featured: false,
      content: `
        <p class="mb-4">TikTok Shop'un influencer pazarlamaya entegrasyonu, 2025'te sektörde devrim yarattı. Bu özellik, influencer içeriklerinden doğrudan satış yapılmasını sağlayarak, dönüşüm oranlarını %300 artırdı.</p>
        
        <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">TikTok Shop Nedir?</h2>
        <p class="mb-4">TikTok Shop, kullanıcıların TikTok içeriklerinden doğrudan ürün satın almasını sağlayan bir özellik. Influencer'lar, videolarında ürünleri etiketleyebiliyor ve takipçiler tek tıkla satın alma yapabiliyor.</p>
        
        <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">Neden Bu Kadar Etkili?</h2>
        <p class="mb-4">TikTok Shop, satın alma sürecini kısaltarak, impulse buying'i artırıyor. Kullanıcılar, bir ürünü görür görmez satın alabiliyor, bu da dönüşüm oranlarını önemli ölçüde artırıyor. Ayrıca, influencer'lar için gelir kaynağı oluşturuyor.</p>
        
        <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">Başarılı Kampanya Örnekleri</h2>
        <p class="mb-4">2025'te TikTok Shop kullanan markalar, geleneksel influencer kampanyalarına göre %300 daha yüksek dönüşüm oranları elde etti. Özellikle moda, kozmetik ve elektronik kategorilerinde büyük başarılar görüldü.</p>
        
        <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">Strateji Önerileri</h2>
        <p class="mb-4">TikTok Shop kampanyalarında başarılı olmak için, influencer'larla birlikte ürünleri doğal bir şekilde gösterin, demo videoları çekin ve özel indirimler sunun. Ayrıca, trend'lere uygun içerikler üretin ve ilk 3 saniyede dikkat çekin.</p>
      `
    },
    {
      id: 6,
      title: "Micro-Influencer Pazarlama: 2025'in En Etkili Stratejisi",
      excerpt: "Büyük bütçeler yerine akıllı stratejilerle markanızı büyütün. Micro-influencer pazarlamanın neden geleceğin pazarlaması olduğunu keşfedin.",
      author: "Burak Yıldız",
      date: "1 Aralık 2025",
      category: "marketing",
      readTime: "9 dk",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop",
      featured: false,
      content: `
        <p class="mb-4">2025 yılında influencer pazarlama sektöründe en büyük değişim, büyük bütçeli mega-influencer kampanyalarından, daha akıllı ve hedefli micro-influencer stratejilerine geçiş oldu. Bu yazıda, neden micro-influencer pazarlamanın geleceğin pazarlaması olduğunu ve markaların bu stratejiden nasıl maksimum fayda sağlayabileceğini inceleyeceğiz.</p>
        
        <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">Micro-Influencer'ların Gücü</h2>
        <p class="mb-4">Micro-influencer'lar (genellikle 1,000-100,000 takipçiye sahip), mega-influencer'lara göre çok daha yüksek engagement oranlarına sahiptir. 2025 verilerine göre, micro-influencer'ların paylaşımları %60 daha fazla etkileşim alıyor ve takipçileriyle daha güçlü bir bağ kuruyorlar.</p>
        
        <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">ROI ve Maliyet Etkinliği</h2>
        <p class="mb-4">Bir mega-influencer ile yapılan tek bir kampanyanın maliyeti, 10-20 micro-influencer ile yapılan kampanyanın maliyetine eşit olabilir. Ancak micro-influencer kampanyaları genellikle daha geniş bir kitleye ulaşır ve daha yüksek dönüşüm oranları sağlar. 2025'te micro-influencer kampanyaları, ortalama %350 ROI sağladı.</p>
        
        <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">Hedef Kitle Uyumu</h2>
        <p class="mb-4">Micro-influencer'lar genellikle belirli bir niş alanda uzmanlaşmıştır. Bu, markaların tam olarak hedefledikleri kitleye ulaşmalarını sağlar. Örneğin, bir fitness markası, fitness micro-influencer'ları ile çalışarak doğrudan fitness meraklılarına ulaşabilir.</p>
        
        <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">Otantiklik ve Güven</h2>
        <p class="mb-4">Takipçiler, micro-influencer'ların içeriklerini daha otantik ve güvenilir buluyor. Bu otantiklik, marka mesajlarının daha etkili bir şekilde iletilmesini sağlar ve tüketici güvenini artırır. 2025'te, tüketicilerin %78'i micro-influencer önerilerini güvenilir buldu.</p>
        
        <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">2026 İçin Öneriler</h2>
        <p class="mb-4">2026'da başarılı olmak için, micro-influencer'larla uzun vadeli işbirlikleri kurun, kısa video içerikler üretin ve AI destekli eşleştirme araçlarını kullanın. Bu yaklaşım, hem maliyet etkinliği hem de yüksek ROI sağlayarak markaların pazarlama hedeflerine ulaşmalarına yardımcı oluyor.</p>
      `
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
      featured: false,
      content: `
        <p class="mb-4">Yapay zeka teknolojileri, 2025'te influencer pazarlama sektörünü dönüştürdü. AI destekli araçlar, influencer seçiminden içerik optimizasyonuna kadar kampanya süreçlerini iyileştirdi ve ROI'yi önemli ölçüde artırdı.</p>
        
        <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">AI ile Influencer Seçimi</h2>
        <p class="mb-4">AI araçları, marka-influencer uyumunu analiz ederek, en uygun influencer'ları otomatik olarak öneriyor. Bu, kampanya hazırlık süresini %70 kısaltıyor ve eşleştirme doğruluğunu %85'e çıkarıyor. 2025'te, AI destekli eşleştirme kullanan kampanyalar, geleneksel yöntemlere göre %200 daha yüksek ROI sağladı.</p>
        
        <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">İçerik Optimizasyonu</h2>
        <p class="mb-4">AI, içerik performansını analiz ederek, en etkili içerik formatlarını, zamanlamalarını ve hashtag stratejilerini belirliyor. Bu, kampanya ROI'sini %150 artırıyor. Ayrıca, AI destekli A/B testleri, içerik optimizasyonunu hızlandırıyor.</p>
        
        <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">Performans Tahmini</h2>
        <p class="mb-4">AI araçları, kampanya başlamadan önce performans tahminleri yapabiliyor. Bu, markaların bütçe planlaması ve beklenti yönetimi yapmasını sağlıyor. 2025'te, AI tahminleri %80 doğruluk oranına ulaştı.</p>
        
        <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">Gelecek Öngörüleri</h2>
        <p class="mb-4">2026 ve sonrasında, AI'ın influencer pazarlamadaki rolü daha da artacak. Kişiselleştirilmiş kampanyalar, otomatik optimizasyon ve gerçek zamanlı performans analizi, sektörün standartları haline gelecek. Ayrıca, AI destekli içerik üretimi de yaygınlaşacak.</p>
      `
    },
    {
      id: 8,
      title: "YouTube Shorts ve Instagram Reels: Kısa Video İçeriklerin Gücü",
      excerpt: "2025'te kısa video içerikler, influencer pazarlamada en yüksek ROI'yi sağladı. Bu platformları nasıl etkili kullanabilirsiniz?",
      author: "Mehmet Demir",
      date: "25 Kasım 2025",
      category: "news",
      readTime: "7 dk",
      image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=500&fit=crop",
      featured: false,
      content: `
        <p class="mb-4">2025'te kısa video içerikler (YouTube Shorts ve Instagram Reels), influencer pazarlamada en yüksek ROI'yi sağladı. Bu platformlar, markaların daha geniş kitlelere ulaşmasını ve yüksek engagement oranları elde etmesini sağlıyor.</p>
        
        <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">Kısa Video İçeriklerin Gücü</h2>
        <p class="mb-4">60 saniyenin altındaki içerikler, 2025'te uzun format içeriklere göre %80 daha fazla etkileşim aldı. Kullanıcıların dikkat sürelerinin kısalması ve hızlı tüketim alışkanlıkları, kısa video içeriklerin popülerliğini artırdı.</p>
        
        <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">YouTube Shorts'un Avantajları</h2>
        <p class="mb-4">YouTube Shorts, TikTok benzeri kısa videolar için optimize edilmiş bir platform. YouTube'un geniş kullanıcı tabanı (2 milyar+ aylık aktif kullanıcı) sayesinde, Shorts içerikleri hızlı bir şekilde viral olabiliyor. 2025'te, Shorts içerikleri ortalama %250 daha fazla görüntülenme aldı.</p>
        
        <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">Instagram Reels'in Etkisi</h2>
        <p class="mb-4">Instagram Reels, 2025'te platformun en hızlı büyüyen özelliği oldu. Reels içerikleri, normal feed gönderilerine göre %300 daha fazla etkileşim aldı. Ayrıca, Reels içerikleri, Instagram'ın keşfet sayfasında daha fazla görünürlük kazandı.</p>
        
        <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">Strateji Önerileri</h2>
        <p class="mb-4">Kısa video kampanyalarında başarılı olmak için, ilk 3 saniyede dikkat çekin, trend müzikler kullanın, görsel olarak çekici içerikler üretin ve hashtag stratejinizi optimize edin. Ayrıca, influencer'larla birlikte eğlenceli, bilgilendirici ve otantik içerikler üretin.</p>
        
        <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">2026 İçin Öngörüler</h2>
        <p class="mb-4">2026'da, kısa video içeriklerin popülerliği artmaya devam edecek. Özellikle, interaktif özellikler (poll, soru-cevap, canlı yayınlar) ve doğrudan satış entegrasyonları, kısa video kampanyalarının başarısını artıracak.</p>
      `
    }
  ];

  const post = blogPosts.find(p => p.id === parseInt(id));

  if (!post) {
    return (
      <section className="bg-white py-20 px-6 min-h-screen">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Blog Yazısı Bulunamadı</h1>
          <p className="text-gray-600 mb-8">Aradığınız blog yazısı mevcut değil.</p>
          <button
            onClick={() => navigate('/blog')}
            className="flex items-center gap-2 text-red-600 hover:text-red-700 transition-colors font-semibold mx-auto"
          >
            <ArrowLeft className="w-5 h-5" />
            Blog'a Dön
          </button>
        </div>
      </section>
    );
  }

  const categories = [
    { id: 'all', label: 'Tümü' },
    { id: 'marketing', label: 'Marketing' },
    { id: 'trends', label: 'Trendler' },
    { id: 'case-studies', label: 'Vaka Çalışmaları' },
    { id: 'tips', label: 'İpuçları' },
    { id: 'news', label: 'Haberler' }
  ];

  return (
    <section className="bg-white py-20 px-6 min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate('/blog')}
          className="flex items-center gap-2 text-gray-600 hover:text-red-600 transition-colors mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Blog'a Dön</span>
        </button>

        {/* Article Header */}
        <article>
          {/* Category Badge */}
          <div className="mb-6">
            <span className="bg-red-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
              {categories.find(c => c.id === post.category)?.label}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {post.title}
          </h1>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-6 mb-8 text-gray-600">
            <div className="flex items-center gap-2">
              <User className="w-5 h-5" />
              <span className="font-medium">{post.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              <span>{post.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              <span>{post.readTime} okuma süresi</span>
            </div>
          </div>

          {/* Featured Image */}
          <div className="mb-10 rounded-2xl overflow-hidden">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Article Content */}
          <div 
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
            style={{
              color: '#374151',
              lineHeight: '1.75'
            }}
          />
          <style>{`
            .prose h2 {
              font-size: 1.5rem;
              font-weight: 700;
              color: #111827;
              margin-top: 2rem;
              margin-bottom: 1rem;
            }
            .prose p {
              margin-bottom: 1rem;
              line-height: 1.75;
            }
          `}</style>

          {/* Share Section */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <p className="text-gray-600 mb-4 font-medium">Bu yazıyı paylaş:</p>
            <div className="flex gap-4">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Facebook
              </button>
              <button className="px-4 py-2 bg-blue-400 text-white rounded-lg hover:bg-blue-500 transition-colors">
                Twitter
              </button>
              <button className="px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors">
                Instagram
              </button>
            </div>
          </div>
        </article>

        {/* Related Posts */}
        <div className="mt-16 pt-12 border-t border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">İlgili Yazılar</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {blogPosts
              .filter(p => p.id !== post.id && p.category === post.category)
              .slice(0, 2)
              .map((relatedPost) => (
                <article
                  key={relatedPost.id}
                  onClick={() => navigate(`/blog/${relatedPost.id}`)}
                  className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:bg-red-50 hover:border-red-200 transition-all group cursor-pointer"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={relatedPost.image}
                      alt={relatedPost.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-red-600 transition-colors">
                      {relatedPost.title}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-2">
                      {relatedPost.excerpt}
                    </p>
                  </div>
                </article>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogDetailPage;
