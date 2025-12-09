# Production Deployment Rehberi

Bu rehber, projeyi production'a (canlıya) alırken yapmanız gereken adımları açıklar.

## ⚠️ ÖNEMLİ: Environment Variables

Production'da **mutlaka** environment variable'ları ayarlamanız gerekiyor. Aksi takdirde "supabaseUrl is required" hatası alırsınız.

## Deployment Platform'larına Göre Ayarlama

### 1. Vercel

1. Vercel Dashboard'a gidin
2. Projenizi seçin
3. **Settings** > **Environment Variables** bölümüne gidin
4. Şu variable'ları ekleyin:
   ```
   VITE_SUPABASE_URL = https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY = your-anon-key-here
   ```
5. **Save** butonuna tıklayın
6. **Deployments** sekmesine gidin ve son deployment'ı **Redeploy** edin

### 2. Netlify

1. Netlify Dashboard'a gidin
2. Projenizi seçin
3. **Site settings** > **Environment variables** bölümüne gidin
4. Şu variable'ları ekleyin:
   ```
   VITE_SUPABASE_URL = https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY = your-anon-key-here
   ```
5. **Save** butonuna tıklayın
6. **Deploys** sekmesine gidin ve **Trigger deploy** > **Clear cache and deploy site** yapın

### 3. GitHub Pages / Vite Build

1. GitHub Actions kullanıyorsanız, `.github/workflows` klasöründe workflow dosyanızı düzenleyin
2. Environment secrets ekleyin:
   - GitHub Repo > **Settings** > **Secrets and variables** > **Actions**
   - `VITE_SUPABASE_URL` ve `VITE_SUPABASE_ANON_KEY` ekleyin
3. Workflow dosyanızda şu şekilde kullanın:
   ```yaml
   env:
     VITE_SUPABASE_URL: ${{ secrets.VITE_SUPABASE_URL }}
     VITE_SUPABASE_ANON_KEY: ${{ secrets.VITE_SUPABASE_ANON_KEY }}
   ```

### 4. Docker / Custom Server

1. `.env.production` dosyası oluşturun (veya environment variable'ları server'da ayarlayın)
2. Build sırasında environment variable'ların yüklendiğinden emin olun:
   ```bash
   VITE_SUPABASE_URL=https://your-project.supabase.co \
   VITE_SUPABASE_ANON_KEY=your-anon-key-here \
   npm run build
   ```

## Build Komutu

Tüm platformlarda build komutu aynıdır:
```bash
npm run build
```

## Kontrol Listesi

Deployment öncesi kontrol edin:

- [ ] Environment variable'lar deployment platform'unda ayarlandı
- [ ] `VITE_SUPABASE_URL` doğru değere sahip
- [ ] `VITE_SUPABASE_ANON_KEY` doğru değere sahip
- [ ] Supabase Dashboard'da production URL'i Redirect URLs'e eklendi
- [ ] Build başarılı bir şekilde tamamlandı
- [ ] Production'da test edildi (login/register çalışıyor)

## Supabase Redirect URLs

Production URL'inizi Supabase'e eklemeyi unutmayın:

1. Supabase Dashboard > **Authentication** > **URL Configuration**
2. **Redirect URLs** bölümüne ekleyin:
   ```
   https://yourdomain.com/auth/verify
   https://yourdomain.com/auth/reset-password
   ```
3. **Site URL**'i production URL'iniz olarak ayarlayın

## Sorun Giderme

### "supabaseUrl is required" Hatası

Bu hata, environment variable'ların yüklenmediğini gösterir:

1. ✅ Deployment platform'unda environment variable'ların ayarlandığını kontrol edin
2. ✅ Variable isimlerinin `VITE_` ile başladığından emin olun
3. ✅ Build'i yeniden yapın (environment variable'lar build zamanında yüklenir)
4. ✅ Browser console'da hata mesajını kontrol edin

### Build Sonrası Değişiklik Yapmışsanız

Environment variable'lar **build zamanında** yüklenir. Değişiklik yaptıktan sonra mutlaka **yeni bir build** yapın.

## Güvenlik Notları

- ⚠️ **Asla** Supabase keys'i kod içine yazmayın
- ⚠️ **Asla** `.env` dosyasını commit etmeyin
- ✅ Environment variable'ları sadece deployment platform'unda ayarlayın
- ✅ Production ve development için farklı Supabase projeleri kullanmanız önerilir
