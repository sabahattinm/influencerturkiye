import { createClient } from '@supabase/supabase-js';

// Supabase URL ve Anon Key - Bu değerleri kendi Supabase projenizden almalısınız
// Supabase Dashboard > Project Settings > API
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

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
  
  // Production'da daha görünür hata
  if (import.meta.env.PROD) {
    throw new Error('Supabase configuration is missing. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY environment variables.');
  }
}

// Supabase client'ı oluştur
// Eğer URL veya Key yoksa, boş string ile oluşturma (createClient hata verir)
export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true,
        flowType: 'pkce' // PKCE flow for better security and CORS handling
      },
      global: {
        // Global fetch options for CORS handling
        fetch: (url, options = {}) => {
          return fetch(url, {
            ...options,
            headers: {
              ...options.headers,
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
          });
        },
      },
    })
  : null;
