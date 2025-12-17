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

// E-posta servisi: EmailJS
// EmailJS API kullanarak e-posta gönderimi

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

    // EmailJS API için environment variable'ları kontrol et
    console.log('🔍 EmailJS Environment Variables:');
    const EMAILJS_PUBLIC_KEY = Deno.env.get('EMAILJS_PUBLIC_KEY');
    const EMAILJS_SERVICE_ID = Deno.env.get('EMAILJS_SERVICE_ID');
    const EMAILJS_TEMPLATE_ID_INFLUENCER = Deno.env.get('EMAILJS_TEMPLATE_ID_INFLUENCER');
    const EMAILJS_TEMPLATE_ID_CUSTOMER = Deno.env.get('EMAILJS_TEMPLATE_ID_CUSTOMER');
    
    console.log('  - EMAILJS_PUBLIC_KEY mevcut:', EMAILJS_PUBLIC_KEY ? 'EVET' : 'HAYIR');
    console.log('  - EMAILJS_SERVICE_ID mevcut:', EMAILJS_SERVICE_ID ? 'EVET' : 'HAYIR');
    console.log('  - EMAILJS_TEMPLATE_ID_INFLUENCER mevcut:', EMAILJS_TEMPLATE_ID_INFLUENCER ? 'EVET' : 'HAYIR');
    console.log('  - EMAILJS_TEMPLATE_ID_CUSTOMER mevcut:', EMAILJS_TEMPLATE_ID_CUSTOMER ? 'EVET' : 'HAYIR');
    
    // Gerekli environment variable'ları kontrol et
    if (!EMAILJS_PUBLIC_KEY) {
      console.error('EMAILJS_PUBLIC_KEY environment variable is not set');
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'EMAILJS_PUBLIC_KEY environment variable is not set. Lütfen Supabase dashboard\'da environment variable\'ları kontrol edin.',
          recommendation: 'Supabase Dashboard > Project Settings > Edge Functions > Environment Variables > EMAILJS_PUBLIC_KEY ekleyin'
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 500 
        }
      );
    }
    
    if (!EMAILJS_SERVICE_ID) {
      console.error('EMAILJS_SERVICE_ID environment variable is not set');
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'EMAILJS_SERVICE_ID environment variable is not set. Lütfen Supabase dashboard\'da environment variable\'ları kontrol edin.',
          recommendation: 'Supabase Dashboard > Project Settings > Edge Functions > Environment Variables > EMAILJS_SERVICE_ID ekleyin'
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 500 
        }
      );
    }
    
    // Form tipine göre template ID ve alıcı email'i belirle
    let templateId: string;
    let toEmail: string;
    
    if (type === 'influencer') {
      templateId = EMAILJS_TEMPLATE_ID_INFLUENCER || '';
      toEmail = 'influencer@influencerturkiye.com';
      
      if (!EMAILJS_TEMPLATE_ID_INFLUENCER) {
        console.error('EMAILJS_TEMPLATE_ID_INFLUENCER environment variable is not set');
        return new Response(
          JSON.stringify({ 
            success: false, 
            error: 'EMAILJS_TEMPLATE_ID_INFLUENCER environment variable is not set. Lütfen Supabase dashboard\'da environment variable\'ları kontrol edin.',
            recommendation: 'Supabase Dashboard > Project Settings > Edge Functions > Environment Variables > EMAILJS_TEMPLATE_ID_INFLUENCER ekleyin'
          }),
          { 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 500 
          }
        );
      }
    } else if (type === 'customer') {
      templateId = EMAILJS_TEMPLATE_ID_CUSTOMER || '';
      toEmail = 'customer@influencerturkiye.com';
      
      if (!EMAILJS_TEMPLATE_ID_CUSTOMER) {
        console.error('EMAILJS_TEMPLATE_ID_CUSTOMER environment variable is not set');
        return new Response(
          JSON.stringify({ 
            success: false, 
            error: 'EMAILJS_TEMPLATE_ID_CUSTOMER environment variable is not set. Lütfen Supabase dashboard\'da environment variable\'ları kontrol edin.',
            recommendation: 'Supabase Dashboard > Project Settings > Edge Functions > Environment Variables > EMAILJS_TEMPLATE_ID_CUSTOMER ekleyin'
          }),
          { 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 500 
          }
        );
      }
    } else {
      throw new Error(`Geçersiz form tipi: ${type}`);
    }
    
    // EmailJS template parametrelerini hazırla
    // Template'de kullanılacak tüm değişkenleri buraya ekleyin
    const templateParams: Record<string, string> = {
      to_email: toEmail,
      subject: type === 'influencer' 
        ? `Yeni Influencer Başvurusu: ${data.fullName}`
        : `Yeni Marka Başvurusu: ${data.brand}`,
      from_name: data.fullName || 'Başvuru',
      from_email: data.email,
      reply_to: data.email,
      // Form verileri
      full_name: data.fullName || '',
      email: data.email || '',
      phone_number: data.phoneNumber || '',
    };
    
    // Type'a göre özel alanları ekle
    if (type === 'influencer') {
      templateParams.gender = data.gender || 'Belirtilmemiş';
      templateParams.country = data.country || '';
      templateParams.city = data.city || '';
      templateParams.interests = data.interests || 'Belirtilmemiş';
      templateParams.budget = data.budget || 'Belirtilmemiş';
      templateParams.facebook = data.facebook || '';
      templateParams.instagram = data.instagram || '';
      templateParams.youtube = data.youtube || '';
      templateParams.twitter = data.twitter || '';
      templateParams.twitch = data.twitch || '';
      templateParams.blog = data.blog || '';
      templateParams.other = data.other || '';
    } else if (type === 'customer') {
      templateParams.brand = data.brand || '';
      templateParams.tax_number = data.taxNumber || 'Belirtilmemiş';
      templateParams.platform = data.platform || '';
      templateParams.content_type = data.contentType || '';
      templateParams.description = data.description || 'Belirtilmemiş';
    }
    
    console.log('📤 EmailJS API\'ye istek gönderiliyor...');
    console.log('  - Service ID:', EMAILJS_SERVICE_ID);
    console.log('  - Template ID:', templateId);
    console.log('  - To Email:', toEmail);
    console.log('  - Template Params:', JSON.stringify(templateParams, null, 2));
    
    const emailJSPayload = {
      service_id: EMAILJS_SERVICE_ID,
      template_id: templateId,
      user_id: EMAILJS_PUBLIC_KEY,
      template_params: templateParams
    };
    
    console.log('📦 EmailJS Payload Hazırlandı:', JSON.stringify(emailJSPayload, null, 2));

    // EmailJS API'ye istek gönder
    let emailJSResponse;
    try {
      emailJSResponse = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailJSPayload),
      });
    } catch (fetchError) {
      console.error('❌ EmailJS API fetch hatası:', fetchError);
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'EmailJS API\'ye bağlanılamadı',
          details: fetchError.message 
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 500 
        }
      );
    }

    console.log('📥 EmailJS API Response:');
    console.log('  - Status:', emailJSResponse.status);
    console.log('  - Status Text:', emailJSResponse.statusText);
    console.log('  - OK:', emailJSResponse.ok);

    // EmailJS response'u oku
    let responseText: string;
    try {
      responseText = await emailJSResponse.text();
      console.log('  - Response Text:', responseText);
    } catch (readError) {
      console.error('❌ EmailJS response okuma hatası:', readError);
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'EmailJS API yanıtı okunamadı',
          details: readError.message 
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 500 
        }
      );
    }

    // EmailJS başarılı ise "OK" döner (200 status)
    if (emailJSResponse.ok && responseText === 'OK') {
      console.log('✅ EmailJS API Başarılı!');
      console.log('  - Service ID:', EMAILJS_SERVICE_ID);
      console.log('  - Template ID:', templateId);
      console.log('  - To Email:', toEmail);
      console.log('  - Response:', responseText);

      return new Response(
        JSON.stringify({ 
          success: true, 
          message: 'E-posta başarıyla gönderildi',
          debug: {
            serviceId: EMAILJS_SERVICE_ID,
            templateId: templateId,
            toEmail: toEmail,
            response: responseText
          }
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200 
        }
      );
    }

    // Hata durumu
    console.error('❌ EmailJS API Error:');
    console.error('  - Status:', emailJSResponse.status);
    console.error('  - Response Text:', responseText);
    
    let errorData: any;
    try {
      errorData = JSON.parse(responseText);
    } catch (parseError) {
      // JSON parse edilemezse, text olarak kullan
      errorData = { message: responseText };
    }

    const errorMessage = errorData.message || errorData.error || `EmailJS API hatası (Status: ${emailJSResponse.status})`;

    return new Response(
      JSON.stringify({ 
        success: false, 
        error: errorMessage,
        details: errorData,
        debug: {
          status: emailJSResponse.status,
          statusText: emailJSResponse.statusText,
          responseText: responseText,
          serviceId: EMAILJS_SERVICE_ID,
          templateId: templateId,
          toEmail: toEmail,
          recommendation: 'EmailJS Dashboard\'da service ve template ayarlarınızı kontrol edin: https://dashboard.emailjs.com'
        }
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
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
