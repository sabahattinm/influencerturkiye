# EmailJS Kurulum Rehberi

Bu proje, form gönderimlerinde e-posta bildirimi için EmailJS kullanmaktadır. Form gönderildiğinde, `sabahattinmakine@gmail.com` adresine otomatik e-posta gönderilir.

## Kurulum Adımları

### 1. EmailJS Hesabı Oluşturma

1. [EmailJS](https://www.emailjs.com/) sitesine gidin ve ücretsiz hesap oluşturun
2. EmailJS Dashboard'a giriş yapın

### 2. Email Service Oluşturma

1. Dashboard'da **Email Services** sekmesine gidin
2. **Add New Service** butonuna tıklayın
3. E-posta sağlayıcınızı seçin (Gmail, Outlook, vb.)
4. Servisi yapılandırın ve **Service ID**'yi not edin

### 3. Email Template Oluşturma

1. Dashboard'da **Email Templates** sekmesine gidin
2. **Create New Template** butonuna tıklayın
3. Aşağıdaki template'i kullanabilirsiniz:

**Template Adı:** Form Başvuru Bildirimi

**Subject:** Yeni {{application_type}} - {{full_name}}

**Content (HTML):**
```html
<h2>Yeni Form Başvurusu</h2>

<p><strong>Başvuru Tipi:</strong> {{application_type}}</p>
<p><strong>Gönderim Tarihi:</strong> {{submission_date}}</p>

<hr>

<h3>Başvuru Bilgileri</h3>

{{#if application_type}}
  {{#if (eq application_type "Influencer Başvurusu")}}
    <p><strong>Ad Soyad:</strong> {{full_name}}</p>
    <p><strong>E-posta:</strong> {{email}}</p>
    <p><strong>Telefon:</strong> {{phone_number}}</p>
    <p><strong>Cinsiyet:</strong> {{gender}}</p>
    <p><strong>Ülke:</strong> {{country}}</p>
    <p><strong>Şehir:</strong> {{city}}</p>
    <p><strong>İlgi Alanları:</strong> {{interests}}</p>
    <p><strong>Sosyal Medya Hesapları:</strong></p>
    <pre>{{social_media}}</pre>
    <p><strong>Bütçe Beklentisi:</strong> {{budget}}</p>
  {{else}}
    <p><strong>Ad Soyad:</strong> {{full_name}}</p>
    <p><strong>Marka:</strong> {{brand}}</p>
    <p><strong>Vergi Numarası:</strong> {{tax_number}}</p>
    <p><strong>Telefon:</strong> {{phone_number}}</p>
    <p><strong>Platform:</strong> {{platform}}</p>
    <p><strong>İçerik Tipi:</strong> {{content_type}}</p>
    <p><strong>Açıklama:</strong></p>
    <pre>{{description}}</pre>
  {{/if}}
{{/if}}
```

**Not:** EmailJS template sistemi basit olduğu için, daha basit bir versiyon kullanabilirsiniz:

**Basit Template:**
```html
<h2>Yeni Form Başvurusu</h2>
<p><strong>Başvuru Tipi:</strong> {{application_type}}</p>
<p><strong>Gönderim Tarihi:</strong> {{submission_date}}</p>
<hr>
<h3>Başvuru Detayları</h3>
<p><strong>Ad Soyad:</strong> {{full_name}}</p>
<p><strong>E-posta:</strong> {{email}}</p>
<p><strong>Telefon:</strong> {{phone_number}}</p>
<p><strong>Marka:</strong> {{brand}}</p>
<p><strong>Platform:</strong> {{platform}}</p>
<p><strong>İçerik Tipi:</strong> {{content_type}}</p>
<p><strong>Açıklama:</strong> {{description}}</p>
<p><strong>Sosyal Medya:</strong> {{social_media}}</p>
<p><strong>Bütçe:</strong> {{budget}}</p>
```

4. Template'i kaydedin ve **Template ID**'yi not edin

### 4. Public Key Alma

1. Dashboard'da **Account** > **General** sekmesine gidin
2. **Public Key** değerini kopyalayın

### 5. Environment Variables Ayarlama

Proje kök dizinindeki `.env` dosyasına aşağıdaki değişkenleri ekleyin:

```env
# EmailJS Configuration
VITE_EMAILJS_SERVICE_ID=your_service_id_here
VITE_EMAILJS_TEMPLATE_ID=your_template_id_here
VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
```

**Örnek:**
```env
VITE_EMAILJS_SERVICE_ID=service_abc123
VITE_EMAILJS_TEMPLATE_ID=template_xyz789
VITE_EMAILJS_PUBLIC_KEY=abcdefghijklmnop
```

### 6. Development Ortamında Test

1. Development server'ı başlatın: `npm run dev`
2. Formu doldurup gönderin
3. `sabahattinmakine@gmail.com` adresine e-posta gelip gelmediğini kontrol edin

### 7. Production Deployment

Production ortamında (Vercel, Netlify, vb.) environment variables'ları ayarlayın:

- **Vercel:** Project Settings > Environment Variables
- **Netlify:** Site Settings > Environment Variables

Aynı değişkenleri ekleyin:
- `VITE_EMAILJS_SERVICE_ID`
- `VITE_EMAILJS_TEMPLATE_ID`
- `VITE_EMAILJS_PUBLIC_KEY`

## Sorun Giderme

### E-posta gelmiyor

1. Browser console'u kontrol edin (F12 > Console)
2. EmailJS yapılandırma değerlerinin doğru olduğundan emin olun
3. EmailJS Dashboard'da email log'larını kontrol edin
4. Template'deki değişken isimlerinin kod ile eşleştiğinden emin olun

### EmailJS limit aşıldı

EmailJS ücretsiz planında aylık 200 e-posta limiti vardır. Limit aşıldığında:
- Ücretli plana geçebilirsiniz
- Alternatif olarak backend API kullanabilirsiniz

## Notlar

- E-posta gönderme hatası olsa bile form kaydı başarılı olur (kullanıcı deneyimi için)
- E-posta gönderme hataları console'da log'lanır
- Tüm form verileri hem Supabase'e kaydedilir hem de e-posta ile gönderilir

