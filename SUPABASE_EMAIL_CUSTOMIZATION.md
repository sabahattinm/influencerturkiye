# Supabase Email Özelleştirme Rehberi

## "Supabase Auth" Yazısını Değiştirme

Email'lerde görünen "Supabase Auth" yazısını değiştirmek için iki yöntem var:

---

## Yöntem 1: Email Template'lerini Düzenleme (Hızlı Çözüm)

### Adımlar:

1. **Supabase Dashboard'a giriş yapın**
   - https://supabase.com/dashboard
   - Projenizi seçin

2. **Authentication > Email Templates'e gidin**
   - Sol menüden **Authentication** seçeneğine tıklayın
   - **Email Templates** sekmesine gidin

3. **"Confirm signup" template'ini düzenleyin**
   - Kayıt doğrulama email'i için **Confirm signup** template'ini seçin
   - HTML içeriğinde "Supabase Auth" yazan yerleri bulun
   - Bunları istediğiniz metinle değiştirin (örn: "Influencer Türkiye", "Akilevo", vb.)

4. **Örnek HTML Düzenleme:**

   **Önce (Varsayılan):**
   ```html
   <h1>Supabase Auth</h1>
   <p>Confirm your signup</p>
   ```

   **Sonra (Özelleştirilmiş):**
   ```html
   <h1>Influencer Türkiye</h1>
   <p>Hesabınızı doğrulayın</p>
   ```

5. **Subject (Konu) satırını da değiştirin**
   - Subject alanında da "Supabase" yazısını kaldırıp özelleştirebilirsiniz
   - Örnek: `"Hesabınızı Doğrulayın - Influencer Türkiye"`

6. **Kaydedin**
   - Değişiklikleri kaydedin
   - Yeni kayıt olan kullanıcılara özelleştirilmiş email gönderilecek

---

## Yöntem 2: Custom SMTP Kullanma (Profesyonel Çözüm)

Custom SMTP kullanarak gönderen adını ve email adresini tamamen özelleştirebilirsiniz.

### Avantajları:
- ✅ Kendi domain'inizden email gönderimi (örn: noreply@influencerturkiye.com)
- ✅ Özelleştirilmiş gönderen adı
- ✅ Daha iyi email deliverability (spam'e düşme riski azalır)
- ✅ Daha yüksek email gönderim limiti

### Adımlar:

1. **SMTP Provider Seçin**
   - **Resend** (Önerilen - Ücretsiz 3000 email/ay)
   - SendGrid
   - Mailgun
   - AWS SES
   - Postmark

2. **Resend ile Kurulum (Önerilen):**

   a. **Resend hesabı oluşturun**
      - https://resend.com adresine gidin
      - Ücretsiz hesap oluşturun
      - API Key alın

   b. **Domain doğrulama yapın**
      - Resend Dashboard > Domains
      - Domain ekleyin (örn: influencerturkiye.com)
      - DNS kayıtlarını ekleyin (SPF, DKIM, DMARC)
      - Domain doğrulamasını tamamlayın

   c. **Supabase'de Custom SMTP'yi aktif edin**
      - Supabase Dashboard > Authentication > Email Settings
      - **Custom SMTP** seçeneğini aktif edin
      - SMTP ayarlarını girin:
        ```
        SMTP Host: smtp.resend.com
        SMTP Port: 465 (SSL) veya 587 (TLS)
        SMTP User: resend
        SMTP Password: [Resend API Key'iniz]
        Sender Email: noreply@influencerturkiye.com
        Sender Name: Influencer Türkiye
        ```

3. **Email Template'lerini özelleştirin**
   - Authentication > Email Templates
   - Tüm template'leri markanıza uygun şekilde düzenleyin

---

## Örnek Özelleştirilmiş Email Template

### Confirm Signup Template Örneği:

**Subject:**
```
Hesabınızı Doğrulayın - Influencer Türkiye
```

**HTML Body:**
```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    .container {
      background: #ffffff;
      border-radius: 8px;
      padding: 30px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .header {
      text-align: center;
      margin-bottom: 30px;
    }
    .logo {
      color: #dc2626;
      font-size: 28px;
      font-weight: bold;
      margin-bottom: 10px;
    }
    .button {
      display: inline-block;
      background-color: #dc2626;
      color: #ffffff;
      padding: 12px 30px;
      text-decoration: none;
      border-radius: 6px;
      margin: 20px 0;
      font-weight: 600;
    }
    .button:hover {
      background-color: #b91c1c;
    }
    .footer {
      margin-top: 30px;
      padding-top: 20px;
      border-top: 1px solid #e5e7eb;
      font-size: 12px;
      color: #6b7280;
      text-align: center;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo">Influencer Türkiye</div>
      <h1>Hesabınızı Doğrulayın</h1>
    </div>
    
    <p>Merhaba,</p>
    
    <p>Influencer Türkiye'ye hoş geldiniz! Hesabınızı aktifleştirmek için aşağıdaki butona tıklayın:</p>
    
    <div style="text-align: center;">
      <a href="{{ .ConfirmationURL }}" class="button">Hesabımı Doğrula</a>
    </div>
    
    <p>Veya bu linki tarayıcınıza kopyalayıp yapıştırabilirsiniz:</p>
    <p style="word-break: break-all; color: #6b7280; font-size: 14px;">{{ .ConfirmationURL }}</p>
    
    <p>Bu link 24 saat geçerlidir.</p>
    
    <p>Eğer bu hesabı siz oluşturmadıysanız, bu email'i görmezden gelebilirsiniz.</p>
    
    <div class="footer">
      <p>© 2024 Influencer Türkiye. Tüm hakları saklıdır.</p>
      <p>Bu email otomatik olarak gönderilmiştir, lütfen yanıtlamayın.</p>
    </div>
  </div>
</body>
</html>
```

---

## Önemli Notlar

1. **Email Template Değişkenleri:**
   - `{{ .ConfirmationURL }}` - Doğrulama linki
   - `{{ .Email }}` - Kullanıcının email adresi
   - `{{ .Token }}` - Doğrulama token'ı
   - `{{ .SiteURL }}` - Site URL'i

2. **Test Etme:**
   - Değişikliklerden sonra yeni bir test hesabı oluşturun
   - Email'in doğru göründüğünü kontrol edin
   - Spam klasörünü de kontrol edin

3. **Production için:**
   - Custom SMTP kullanmanız önerilir
   - Domain doğrulaması yapın (SPF, DKIM, DMARC)
   - Email deliverability'yi artırır

---

## Hızlı Erişim

- **Email Templates:** Supabase Dashboard → Authentication → Email Templates
- **SMTP Settings:** Supabase Dashboard → Authentication → Email Settings → Custom SMTP
- **Resend Dashboard:** https://resend.com/dashboard
