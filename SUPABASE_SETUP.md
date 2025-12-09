# Supabase Kurulum Rehberi

Bu proje Supabase Authentication kullanmaktadır. Portföy sayfasına erişmek için kullanıcıların üye olması ve e-posta doğrulaması yapması gerekmektedir.

## 1. Supabase Projesi Oluşturma

1. [Supabase](https://supabase.com) sitesine gidin
2. Yeni bir proje oluşturun
3. Proje ayarlarından **Project URL** ve **anon/public key** bilgilerini alın

## 2. Environment Variables Ayarlama

1. Proje kök dizininde `.env` dosyası oluşturun:
   ```bash
   cp .env.example .env
   ```

2. `.env` dosyasını düzenleyin ve Supabase bilgilerinizi ekleyin:
   ```env
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   ```

## 3. Supabase Authentication Ayarları

### Email Authentication
1. Supabase Dashboard > Authentication > Providers
2. **Email** provider'ını aktif edin
3. **Confirm email** seçeneğini aktif edin (e-posta doğrulama için)

### Email Templates (Opsiyonel)
1. Supabase Dashboard > Authentication > Email Templates
2. Confirm signup ve Reset password şablonlarını özelleştirebilirsiniz

### Redirect URLs
1. Supabase Dashboard > Authentication > URL Configuration
2. **Site URL**: `http://localhost:5173` (development)
3. **Redirect URLs** ekleyin:
   - `http://localhost:5173/auth/verify`
   - `http://localhost:5173/auth/reset-password`
   - Production URL'inizi de ekleyin

## 4. Test Etme

1. Development server'ı başlatın:
   ```bash
   npm run dev
   ```

2. Tarayıcıda `/auth/register` sayfasına gidin
3. Yeni bir hesap oluşturun
4. E-posta adresinize gelen doğrulama linkine tıklayın
5. Doğrulama sonrası `/auth/login` ile giriş yapın
6. `/portfolyo` sayfasına erişebilmelisiniz

## Özellikler

- ✅ Email/Password authentication
- ✅ Email doğrulama (confirmation required)
- ✅ Şifre sıfırlama
- ✅ Protected routes (Portfolio sayfası)
- ✅ Session management
- ✅ Auto-refresh tokens

## 5. Production Deployment

**⚠️ ÖNEMLİ:** Production'a alırken environment variable'ları **mutlaka** ayarlamanız gerekiyor!

Detaylı bilgi için `DEPLOYMENT.md` dosyasına bakın.

### Hızlı Özet:
1. Deployment platform'unuzda (Vercel, Netlify, vs.) Environment Variables ayarlayın
2. `VITE_SUPABASE_URL` ve `VITE_SUPABASE_ANON_KEY` değerlerini ekleyin
3. Build'i yeniden yapın
4. Supabase Dashboard'da production URL'inizi Redirect URLs'e ekleyin

## Sorun Giderme

### "supabaseUrl is required" hatası (Production)
- ✅ Deployment platform'unda environment variable'ların ayarlandığını kontrol edin
- ✅ Variable isimlerinin `VITE_` ile başladığından emin olun
- ✅ Build'i yeniden yapın (environment variable'lar build zamanında yüklenir)
- ✅ Detaylı bilgi için `DEPLOYMENT.md` dosyasına bakın

### "Supabase URL ve Key bulunamadı" hatası (Development)
- `.env` dosyasının proje kök dizininde olduğundan emin olun
- Environment variable'ların `VITE_` ile başladığından emin olun
- Development server'ı yeniden başlatın

### Email doğrulama linki gelmiyor
- Supabase Dashboard > Authentication > Users bölümünden kontrol edin
- Spam klasörünü kontrol edin
- Supabase Email ayarlarını kontrol edin

### Login sonrası redirect çalışmıyor
- `supabase.js` dosyasındaki `emailRedirectTo` URL'lerini kontrol edin
- Supabase Dashboard'daki Redirect URLs ayarlarını kontrol edin
