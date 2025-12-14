# Supabase Email Verification Ayarları

## Site URL: https://influencer.akilevo.com

### Supabase Dashboard'da Yapılacaklar

1. **Supabase Dashboard'a giriş yapın**
   - https://supabase.com/dashboard adresine gidin
   - Projenizi seçin

2. **Authentication > URL Configuration'a gidin**
   - Sol menüden **Authentication** seçeneğine tıklayın
   - **URL Configuration** sekmesine gidin

3. **Site URL'yi ayarlayın**
   - **Site URL** alanına şunu girin:
     ```
     https://influencer.akilevo.com
     ```

4. **Redirect URLs'e doğrulama linkini ekleyin**
   - **Redirect URLs** bölümüne şu URL'yi ekleyin:
     ```
     https://influencer.akilevo.com/auth/verify
     ```
   - **+ Add URL** butonuna tıklayarak ekleyin

5. **Kaydedin**
   - Değişiklikleri kaydedin

### Önemli Notlar

- ✅ Site URL ve Redirect URL'ler **tam olarak eşleşmeli**
- ✅ HTTPS kullanıldığından emin olun
- ✅ Trailing slash (/) olmadan yazın
- ✅ Değişiklikler hemen aktif olur (yeniden deploy gerekmez)

### Test Etme

1. Yeni bir kullanıcı kaydı oluşturun
2. E-posta adresinize gelen doğrulama linkine tıklayın
3. Otomatik olarak giriş yapılıp `/portfolyo` sayfasına yönlendirilmelisiniz

### Sorun Giderme

**Eğer "Invalid redirect URL" hatası alırsanız:**
- Redirect URL'in tam olarak eşleştiğinden emin olun
- HTTPS kullandığınızdan emin olun
- Trailing slash olmadığından emin olun

**Eğer email doğrulama çalışmıyorsa:**
- Supabase Dashboard > Authentication > Email Templates'te email şablonlarını kontrol edin
- Email provider ayarlarını kontrol edin
- Spam klasörünü kontrol edin
