# CORS Hatası Çözüm Rehberi

## 🔴 Sorun

Production'da şu hatayı alıyorsunuz:
```
Access to fetch at 'https://cpvbwtkfumugodmkfbyd.supabase.co/auth/v1/user' 
from origin 'https://influencerturkiye.vercel.app' has been blocked by CORS policy
```

## ✅ Çözüm Adımları

### 1. Supabase Dashboard Ayarları (EN ÖNEMLİ)

1. [Supabase Dashboard](https://supabase.com/dashboard)'a gidin
2. Projenizi seçin
3. **Authentication** > **URL Configuration** bölümüne gidin
4. Şu ayarları yapın:

   **Site URL:**
   ```
   https://influencerturkiye.vercel.app
   ```

   **Redirect URLs** bölümüne şunları ekleyin:
   ```
   https://influencerturkiye.vercel.app/**
   https://influencerturkiye.vercel.app/auth/verify
   https://influencerturkiye.vercel.app/auth/reset-password
   https://influencerturkiye.vercel.app/basvuru
   ```

5. **Save** butonuna tıklayın

### 2. Vercel Environment Variables Kontrolü

1. Vercel Dashboard'a gidin
2. Projenizi seçin
3. **Settings** > **Environment Variables** bölümüne gidin
4. Şu değişkenlerin olduğundan emin olun:
   - `VITE_SUPABASE_URL` = `https://cpvbwtkfumugodmkfbyd.supabase.co`
   - `VITE_SUPABASE_ANON_KEY` = (anon key'iniz)

5. Eğer değişkenler yoksa veya yanlışsa, düzeltin ve **Save** yapın

### 3. Vercel'de Yeniden Deploy

Environment variable'ları değiştirdiyseniz:

1. Vercel Dashboard > **Deployments** sekmesine gidin
2. Son deployment'ın yanındaki **⋯** (üç nokta) menüsüne tıklayın
3. **Redeploy** seçeneğini seçin
4. "Use existing Build Cache" seçeneğini **kapatın** (önemli!)
5. Deploy'un tamamlanmasını bekleyin

### 4. Tarayıcı Cache Temizleme

1. Tarayıcıda `Ctrl+Shift+R` (Windows/Linux) veya `Cmd+Shift+R` (Mac) yapın
2. Veya Developer Tools > Network sekmesinde "Disable cache" seçeneğini açın
3. Sayfayı yenileyin

## 🔍 Kontrol Listesi

- [ ] Supabase Dashboard'da Site URL doğru ayarlandı
- [ ] Supabase Dashboard'da Redirect URLs eklendi (https://influencerturkiye.vercel.app/**)
- [ ] Vercel'de environment variables doğru ayarlandı
- [ ] Vercel'de yeni bir deploy yapıldı (cache olmadan)
- [ ] Tarayıcı cache temizlendi
- [ ] Yeni deploy'dan sonra test edildi

## ⚠️ Önemli Notlar

1. **CORS ayarları Supabase Dashboard'dan yapılır**, kod tarafında değil
2. **Environment variable'lar build zamanında yüklenir**, bu yüzden değiştirdikten sonra mutlaka yeni build yapmalısınız
3. **Redirect URLs'de wildcard kullanın**: `https://influencerturkiye.vercel.app/**` şeklinde
4. Supabase, CORS ayarlarını yalnızca belirtilen URL'ler için izin verir

## 🐛 Hala Çalışmıyorsa

1. Browser Console'da tam hata mesajını kontrol edin
2. Network sekmesinde Supabase isteklerini kontrol edin:
   - Request headers'da `Origin` header'ını kontrol edin
   - Response headers'da `Access-Control-Allow-Origin` header'ını kontrol edin
3. Supabase Dashboard'da **Project Settings** > **API** bölümünde:
   - Project URL'nin doğru olduğundan emin olun
4. Vercel deployment loglarını kontrol edin:
   - Environment variable'ların build'e dahil olup olmadığını kontrol edin

## 📞 Destek

Eğer hala sorun devam ediyorsa:
- Supabase Community Forum: https://supabase.com/discuss
- Supabase Discord: https://discord.supabase.com
