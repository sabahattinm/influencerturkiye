# Supabase Edge Function - E-posta Gönderimi Kurulumu

Bu dokümantasyon, Supabase Edge Function kullanarak e-posta gönderimi için gerekli adımları açıklar.

## 📋 Gereksinimler

1. Supabase CLI kurulu olmalı
2. Supabase projenizde Edge Functions etkin olmalı
3. Bir e-posta servisi API key'i (Resend, SendGrid, Mailgun, vb.)

## 🚀 Kurulum Adımları

### 1. Supabase CLI Kurulumu

```bash
# npm ile kurulum
npm install -g supabase

# veya Homebrew ile (macOS)
brew install supabase/tap/supabase
```

### 2. Supabase'e Giriş Yapın

```bash
supabase login
```

### 3. Projeyi Bağlayın

**Project Reference ID'yi Bulma:**
1. Supabase Dashboard'a gidin: https://app.supabase.com
2. Projenizi seçin
3. **Project Settings** (sol menüde ⚙️ ikonu) > **General** sekmesine gidin
4. **Reference ID** bölümünde bulunan ID'yi kopyalayın
   - Örnek format: `abcdefghijklmnop` (yaklaşık 20 karakterlik bir string)
   - Bu, proje adınız DEĞİL, unique bir referans ID'sidir

```bash
# Proje dizininde
supabase link --project-ref cpvbwtkfumugodmkfbyd

# Örnek: Eğer Reference ID'niz "xyz123abc456" ise
# supabase link --project-ref xyz123abc456
```

**Alternatif Yöntem (Daha Kolay):**
Eğer Reference ID'yi bulmakta zorlanıyorsanız, sadece proje URL'inizden de alabilirsiniz:
- Supabase proje URL'iniz: `https://app.supabase.com/project/abcdefghijklmnop`
- URL'deki son kısım (`abcdefghijklmnop`) Project Reference ID'nizdir

### 4. Edge Function Oluşturun

```bash
supabase functions new send-application-email
```

Bu komut `supabase/functions/send-application-email/` dizinini oluşturur.

### 5. Edge Function Kodunu Yazın

`supabase/functions/send-application-email/index.ts` dosyasını aşağıdaki kodla güncelleyin:

```typescript
// supabase/functions/send-application-email/index.ts

import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { corsHeaders } from '../_shared/cors.ts'

// E-posta servisi seçenekleri:
// 1. Resend (Önerilen - Ücretsiz 3000 e-posta/ay)
// 2. SendGrid
// 3. Mailgun
// 4. AWS SES

serve(async (req) => {
  // CORS handling
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { type, data } = await req.json()

    // E-posta içeriğini oluştur
    let emailSubject = '';
    let emailBody = '';

    if (type === 'influencer') {
      emailSubject = `Yeni Influencer Başvurusu: ${data.fullName}`;
      emailBody = `
        <h2>Yeni Influencer Başvurusu</h2>
        <p><strong>Ad Soyad:</strong> ${data.fullName}</p>
        <p><strong>E-posta:</strong> ${data.email}</p>
        <p><strong>Telefon:</strong> ${data.phoneNumber}</p>
        <p><strong>Cinsiyet:</strong> ${data.gender || 'Belirtilmemiş'}</p>
        <p><strong>Ülke:</strong> ${data.country}</p>
        <p><strong>Şehir:</strong> ${data.city}</p>
        <p><strong>İlgi Alanları:</strong> ${data.interests || 'Belirtilmemiş'}</p>
        <p><strong>Bütçe:</strong> ${data.budget || 'Belirtilmemiş'}</p>
        
        <h3>Sosyal Medya Hesapları:</h3>
        <ul>
          ${data.facebook ? `<li>Facebook: ${data.facebook}</li>` : ''}
          ${data.instagram ? `<li>Instagram: ${data.instagram}</li>` : ''}
          ${data.youtube ? `<li>YouTube: ${data.youtube}</li>` : ''}
          ${data.twitter ? `<li>Twitter/X: ${data.twitter}</li>` : ''}
          ${data.twitch ? `<li>Twitch: ${data.twitch}</li>` : ''}
          ${data.blog ? `<li>Blog: ${data.blog}</li>` : ''}
          ${data.other ? `<li>Diğer: ${data.other}</li>` : ''}
        </ul>
      `;
    } else if (type === 'customer') {
      emailSubject = `Yeni Marka Başvurusu: ${data.brand}`;
      emailBody = `
        <h2>Yeni Marka Başvurusu</h2>
        <p><strong>Ad Soyad:</strong> ${data.fullName}</p>
        <p><strong>E-posta:</strong> ${data.email}</p>
        <p><strong>Marka:</strong> ${data.brand}</p>
        <p><strong>Vergi No:</strong> ${data.taxNumber || 'Belirtilmemiş'}</p>
        <p><strong>Telefon:</strong> ${data.phoneNumber}</p>
        <p><strong>Platform:</strong> ${data.platform}</p>
        <p><strong>İçerik Tipi:</strong> ${data.contentType}</p>
        <p><strong>Açıklama:</strong> ${data.description || 'Belirtilmemiş'}</p>
      `;
    }

    // Resend API kullanarak e-posta gönder
    // Alternatif: SendGrid, Mailgun, AWS SES kullanabilirsiniz
    
    const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');
    // Form tipine göre farklı e-posta adresleri
    const TO_EMAIL = type === 'influencer' 
      ? Deno.env.get('INFLUENCER_EMAIL') || Deno.env.get('ADMIN_EMAIL') || 'influencer@influencerturkiye.com'
      : Deno.env.get('CUSTOMER_EMAIL') || Deno.env.get('ADMIN_EMAIL') || 'customer@influencerturkiye.com';
    const FROM_EMAIL = Deno.env.get('FROM_EMAIL') || 'noreply@influencerturkiye.com';

    if (!RESEND_API_KEY) {
      throw new Error('RESEND_API_KEY environment variable is not set');
    }

    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: [TO_EMAIL],
        subject: emailSubject,
        html: emailBody,
        reply_to: data.email, // Başvuru sahibinin e-postasına yanıt verilebilir
      }),
    });

    if (!resendResponse.ok) {
      const error = await resendResponse.json();
      throw new Error(`Resend API error: ${JSON.stringify(error)}`);
    }

    const result = await resendResponse.json();

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'E-posta başarıyla gönderildi',
        emailId: result.id 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    )

  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400 
      }
    )
  }
})
```

### 6. CORS Helper Dosyası Oluşturun

`supabase/functions/_shared/cors.ts` dosyasını oluşturun:

```typescript
// supabase/functions/_shared/cors.ts

export const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}
```

### 7. Environment Variables Ayarlayın

Supabase Dashboard'da environment variables ekleyin:

1. Supabase Dashboard > Project Settings > Edge Functions > Secrets
2. Aşağıdaki secret'ları ekleyin:
   - `RESEND_API_KEY`: Resend API key'iniz
   - `INFLUENCER_EMAIL`: Influencer başvurularının gönderileceği e-posta adresi (örn: influencer@influencerturkiye.com)
   - `CUSTOMER_EMAIL`: Marka/Müşteri başvurularının gönderileceği e-posta adresi (örn: customer@influencerturkiye.com)
   - `FROM_EMAIL`: Gönderen e-posta adresi (Resend'de doğrulanmış domain olmalı, örn: noreply@influencerturkiye.com)
   - `ADMIN_EMAIL`: (Opsiyonel) Fallback e-posta adresi, eğer INFLUENCER_EMAIL veya CUSTOMER_EMAIL ayarlanmamışsa kullanılır

**Resend API Key Alma:**
1. https://resend.com adresine gidin
2. Hesap oluşturun (ücretsiz 3000 e-posta/ay)
3. API Keys bölümünden yeni bir key oluşturun
4. Domain'inizi doğrulayın (DNS ayarları gerekli)

**Secret'ları Güncelleme:**
Secret'ları istediğiniz zaman değiştirebilirsiniz:
1. Supabase Dashboard > Project Settings > Edge Functions > Secrets
2. Güncellemek istediğiniz secret'ın yanındaki **✏️ Edit** (Düzenle) butonuna tıklayın
3. Yeni değeri girin ve **Save** (Kaydet) butonuna tıklayın
4. Değişiklikler anında aktif olur - **yeni deploy gerekmez!**
5. Secret'ı silmek için **🗑️ Delete** (Sil) butonuna tıklayın

**Not:** Secret'ları güncelledikten sonra function'ı yeniden deploy etmenize gerek yok. Değişiklikler otomatik olarak aktif olur.

### 8. Edge Function'ı Deploy Edin

```bash
supabase functions deploy send-application-email
```

### 9. Test Edin

```bash
# Local test
supabase functions serve send-application-email

# Production test
curl -X POST https://YOUR_PROJECT_REF.supabase.co/functions/v1/send-application-email \
  -H "Authorization: Bearer YOUR_ANON_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "type": "influencer",
    "data": {
      "fullName": "Test User",
      "email": "test@example.com",
      "phoneNumber": "5551234567"
    }
  }'
```

## 🔄 Alternatif E-posta Servisleri

### SendGrid Kullanımı

```typescript
const SENDGRID_API_KEY = Deno.env.get('SENDGRID_API_KEY');

const sendgridResponse = await fetch('https://api.sendgrid.com/v3/mail/send', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${SENDGRID_API_KEY}`,
  },
  body: JSON.stringify({
    personalizations: [{
      to: [{ email: TO_EMAIL }],
      subject: emailSubject,
    }],
    from: { email: FROM_EMAIL },
    content: [{
      type: 'text/html',
      value: emailBody,
    }],
    reply_to: { email: data.email },
  }),
});
```

### Mailgun Kullanımı

```typescript
const MAILGUN_API_KEY = Deno.env.get('MAILGUN_API_KEY');
const MAILGUN_DOMAIN = Deno.env.get('MAILGUN_DOMAIN');

const formData = new FormData();
formData.append('from', FROM_EMAIL);
formData.append('to', TO_EMAIL);
formData.append('subject', emailSubject);
formData.append('html', emailBody);
formData.append('h:Reply-To', data.email);

const mailgunResponse = await fetch(
  `https://api.mailgun.net/v3/${MAILGUN_DOMAIN}/messages`,
  {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${btoa(`api:${MAILGUN_API_KEY}`)}`,
    },
    body: formData,
  }
);
```

## 📝 Notlar

- Edge Function'lar Deno runtime kullanır
- Environment variables Supabase Dashboard'dan ayarlanmalı
- CORS ayarları production'da daha kısıtlayıcı olabilir
- E-posta servisi API key'lerini güvenli tutun
- Rate limiting için Supabase'in built-in özelliklerini kullanabilirsiniz

## 🐛 Sorun Giderme

1. **CORS Hatası**: `corsHeaders` doğru ayarlanmış mı kontrol edin
2. **401 Unauthorized**: Supabase anon key'in doğru olduğundan emin olun
3. **E-posta Gönderilmiyor**: API key'lerin ve environment variables'ın doğru olduğunu kontrol edin
4. **Function Bulunamıyor**: Deploy işleminin başarılı olduğundan emin olun

## 🔗 Faydalı Linkler

- [Supabase Edge Functions Docs](https://supabase.com/docs/guides/functions)
- [Resend API Docs](https://resend.com/docs/api-reference)
- [SendGrid API Docs](https://docs.sendgrid.com/api-reference)
- [Mailgun API Docs](https://documentation.mailgun.com/en/latest/api_reference.html)
