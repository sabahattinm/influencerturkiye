import { createClient } from '@supabase/supabase-js';

// Supabase URL ve Anon Key - Bu değerleri kendi Supabase projenizden almalısınız
// Supabase Dashboard > Project Settings > API
export const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
export const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Production'da environment variable'lar yoksa hata ver
if (!supabaseUrl || !supabaseAnonKey) {
  const errorMessage = `
    ⚠️ Supabase Configuration Error ⚠️
    
    Supabase URL veya Key bulunamadı!
    
    Development için:
    - Proje kök dizininde .env dosyası oluşturun
    - VITE_SUPABASE_URL ve VITE_SUPABASE_ANON_KEY değerlerini ekleyin
    
    Production için:
    - Deployment platform'unuzda (Vercel, Netlify, vs.) Environment Variables ayarlayın
    - VITE_SUPABASE_URL ve VITE_SUPABASE_ANON_KEY değerlerini ekleyin
    - Build'i yeniden yapın
    
    Detaylı bilgi için SUPABASE_SETUP.md dosyasına bakın.
  `;
  
  console.error(errorMessage);
  
  // Production'da uygulamayı crash etmek yerine, sadece uyarı ver
  // Bu sayede sayfa açılabilir ama Supabase özellikleri çalışmaz
  if (import.meta.env.PROD) {
    console.error('⚠️ CRITICAL: Supabase configuration is missing. Some features may not work.');
    // Production'da throw etmek yerine null döndürüyoruz
    // Bu sayede uygulama açılabilir ama Supabase özellikleri çalışmaz
  }
}

// Supabase client'ı oluştur
// Eğer URL veya Key yoksa, boş string ile oluşturma (createClient hata verir)
export const supabase = supabaseUrl && supabaseAnonKey 
  ? (() => {
      // Debug: Environment variable'ların yüklendiğini kontrol et
      if (import.meta.env.DEV) {
        console.log('✅ Supabase Client initialized:', {
          url: supabaseUrl ? `${supabaseUrl.substring(0, 30)}...` : 'MISSING',
          hasKey: !!supabaseAnonKey,
          keyLength: supabaseAnonKey?.length || 0
        });
      }
      
      return createClient(supabaseUrl, supabaseAnonKey, {
        auth: {
          autoRefreshToken: true,
          persistSession: true,
          detectSessionInUrl: true,
          flowType: 'pkce' // PKCE flow for better security and CORS handling
        },
        // Custom fetch'i kaldırdık - Supabase kendi header'larını (apikey, etc.) otomatik ekler
        // Eğer CORS sorunu yaşıyorsanız, Supabase Dashboard > Settings > API > CORS ayarlarından çözebilirsiniz
      });
    })()
  : null;
