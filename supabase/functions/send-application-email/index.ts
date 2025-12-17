// supabase/functions/send-application-email/index.ts

// Setup type definitions for built-in Supabase Runtime APIs
import "jsr:@supabase/functions-js/edge-runtime.d.ts"

// CORS headers - inline olarak tanımlanmış (deployment sorunlarını önlemek için)
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Note: Deno types are provided by the edge-runtime import above
// IDE may show errors, but code works correctly when deployed to Supabase

// E-posta servisi seçenekleri:
// 1. Resend (Önerilen - Ücretsiz 3000 e-posta/ay)
// 2. SendGrid
// 3. Mailgun
// 4. AWS SES

Deno.serve(async (req) => {
  // CORS handling
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  console.log('📧 E-posta gönderim isteği alındı');
  console.log('Method:', req.method);
  console.log('URL:', req.url);

  try {
    // Request body'yi parse et
    let requestBody;
    try {
      requestBody = await req.json();
    } catch (parseError) {
      console.error('JSON parse error:', parseError);
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Geçersiz JSON formatı',
          details: parseError.message 
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400 
        }
      );
    }

    const { type, data } = requestBody;

    // Validation: type kontrolü
    if (!type) {
      console.error('Missing type in request body');
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Form tipi (type) belirtilmedi' 
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400 
        }
      );
    }

    if (type !== 'influencer' && type !== 'customer') {
      console.error('Invalid type:', type);
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: `Geçersiz form tipi: ${type}. 'influencer' veya 'customer' olmalı.` 
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400 
        }
      );
    }

    // Validation: data kontrolü
    if (!data) {
      console.error('Missing data in request body');
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Form verileri (data) bulunamadı' 
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400 
        }
      );
    }

    // Validation: email kontrolü
    if (!data.email) {
      console.error('Missing email in data');
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Başvuru sahibinin e-posta adresi bulunamadı' 
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400 
        }
      );
    }

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
    // Influencer formu → INFLUENCER_EMAIL
    // Customer (Marka) formu → CUSTOMER_EMAIL
    let TO_EMAIL: string;
    if (type === 'influencer') {
      TO_EMAIL = Deno.env.get('INFLUENCER_EMAIL') || Deno.env.get('ADMIN_EMAIL') || 'influencer@influencerturkiye.com';
    } else if (type === 'customer') {
      TO_EMAIL = Deno.env.get('CUSTOMER_EMAIL') || Deno.env.get('ADMIN_EMAIL') || 'customer@influencerturkiye.com';
    } else {
      throw new Error(`Geçersiz form tipi: ${type}`);
    }
    
    // Resend'de "from" adresi doğrulanmış bir domain'den olmalı
    // Bu yüzden doğrulanmış domain'i kullanıp, "reply_to" ile başvuru sahibinin e-postasını belirtiyoruz
    // Bu sayede e-posta başvuru sahibinden geliyormuş gibi görünür
    const FROM_EMAIL = Deno.env.get('FROM_EMAIL') || 'noreply@influencerturkiye.com';

    // Gmail, Yahoo, Hotmail gibi genel email servislerini kontrol et
    // Resend bu domain'leri doğrulamaya izin vermez
    const blockedDomains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'live.com', 'msn.com'];
    const fromDomain = FROM_EMAIL.split('@')[1]?.toLowerCase();
    
    if (fromDomain && blockedDomains.includes(fromDomain)) {
      console.error(`FROM_EMAIL genel email servisi kullanıyor: ${fromDomain}`);
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: `FROM_EMAIL genel bir email servisi kullanıyor (${fromDomain}). Resend, gmail.com, yahoo.com gibi genel email servislerini doğrulamaya izin vermez.`,
          solution: 'Lütfen Resend Dashboard\'da kendi domain\'inizi doğrulayın (örn: influencerturkiye.com) ve FROM_EMAIL environment variable\'ını doğrulanmış domain\'inizden bir adres olarak ayarlayın (örn: noreply@influencerturkiye.com). Detaylar: https://resend.com/domains'
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400 
        }
      );
    }

    if (!RESEND_API_KEY) {
      console.error('RESEND_API_KEY environment variable is not set');
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'RESEND_API_KEY environment variable is not set. Lütfen Supabase dashboard\'da environment variable\'ları kontrol edin.' 
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 500 
        }
      );
    }

    // Form tipine göre ilgili e-posta adresine başvuru bildirimi gönder
    // "from": Doğrulanmış domain (Resend gereksinimi)
    // "reply_to": Formu dolduran kişinin e-postası (böylece yanıt başvuru sahibine gider)
    
    console.log('📤 Resend API\'ye istek gönderiliyor...');
    console.log('FROM_EMAIL:', FROM_EMAIL);
    console.log('TO_EMAIL:', TO_EMAIL);
    console.log('RESEND_API_KEY mevcut:', !!RESEND_API_KEY);
    
    const emailPayload = {
      from: `${data.fullName || 'Başvuru'} <${FROM_EMAIL}>`, // Gönderen adı başvuru sahibinin adı
      to: [TO_EMAIL], // Form tipine göre ilgili e-posta adresi
      subject: emailSubject,
      html: emailBody,
      reply_to: data.email, // Yanıt adresi: Formu dolduran kişinin e-postası
    };
    
    console.log('Email payload:', JSON.stringify(emailPayload, null, 2));

    let resendResponse;
    try {
      resendResponse = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${RESEND_API_KEY}`,
        },
        body: JSON.stringify(emailPayload),
      });
    } catch (fetchError) {
      console.error('Resend API fetch hatası:', fetchError);
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Resend API\'ye bağlanılamadı',
          details: fetchError.message 
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 500 
        }
      );
    }

    console.log('Resend API response status:', resendResponse.status);

    if (!resendResponse.ok) {
      let errorData;
      try {
        errorData = await resendResponse.json();
      } catch (parseError) {
        const errorText = await resendResponse.text();
        console.error('Resend API error (JSON parse failed):', errorText);
        return new Response(
          JSON.stringify({ 
            success: false, 
            error: `Resend API hatası (Status: ${resendResponse.status})`,
            details: errorText 
          }),
          { 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 500 
          }
        );
      }
      
      console.error('Resend API error:', errorData);
      const errorMessage = errorData.message || errorData.error || 'Resend API hatası';
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: errorMessage,
          details: errorData 
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 500 
        }
      );
    }

    let result;
    try {
      result = await resendResponse.json();
    } catch (parseError) {
      console.error('Resend API response parse hatası:', parseError);
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Resend API yanıtı parse edilemedi',
          details: parseError.message 
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 500 
        }
      );
    }
    
    console.log('✅ Resend API başarılı:', result);

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
    console.error('Unexpected error:', error);
    console.error('Error stack:', error.stack);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message || 'Beklenmeyen bir hata oluştu',
        details: error.toString()
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    )
  }
})
