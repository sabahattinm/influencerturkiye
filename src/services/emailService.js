// emailService.js - Supabase Edge Function ile e-posta gönderimi

import { supabase, supabaseUrl, supabaseAnonKey } from '../lib/supabase';

/**
 * Supabase Edge Function'ı çağırarak e-posta gönderir
 * @param {string} functionName - Edge Function adı
 * @param {Object} payload - Gönderilecek veri
 * @returns {Promise} Response
 */
const sendEmailViaEdgeFunction = async (functionName, payload) => {
  if (!supabase) {
    throw new Error('Supabase client yapılandırılmamış. Lütfen environment variable\'ları kontrol edin.');
  }

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Supabase URL veya Key bulunamadı. Lütfen environment variable\'ları kontrol edin.');
  }

  try {
    console.log(`📤 Edge Function çağrılıyor: ${functionName}`, payload);
    
    // Edge Function URL'ini oluştur
    const functionUrl = `${supabaseUrl}/functions/v1/${functionName}`;
    
    // Fetch ile direkt çağır - bu şekilde response body'yi okuyabiliriz
    const response = await fetch(functionUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${supabaseAnonKey}`,
        'apikey': supabaseAnonKey,
      },
      body: JSON.stringify(payload),
    });

    console.log(`📥 Edge Function response status:`, response.status);

    // Response body'yi oku
    let responseData;
    try {
      responseData = await response.json();
    } catch (parseError) {
      const textResponse = await response.text();
      console.error('Response parse hatası:', parseError);
      console.error('Response text:', textResponse);
      throw new Error(`Edge Function yanıtı parse edilemedi: ${textResponse}`);
    }

    console.log(`📥 Edge Function response data:`, responseData);

    // Status code kontrolü
    if (!response.ok) {
      // Response body'deki hata mesajını kullan
      const errorMessage = responseData?.error || responseData?.message || `Edge Function hatası (Status: ${response.status})`;
      const errorDetails = responseData?.details ? ` Detaylar: ${JSON.stringify(responseData.details)}` : '';
      throw new Error(`${errorMessage}${errorDetails}`);
    }

    // Response başarılı ama success: false olabilir
    if (responseData && !responseData.success) {
      const errorMessage = responseData.error || 'E-posta gönderilemedi';
      const errorDetails = responseData.details ? ` Detaylar: ${JSON.stringify(responseData.details)}` : '';
      throw new Error(`${errorMessage}${errorDetails}`);
    }

    console.log(`✅ Edge Function başarılı: ${functionName}`, responseData);
    return responseData;
  } catch (error) {
    console.error(`❌ E-posta gönderim hatası (${functionName}):`, error);
    console.error('Error stack:', error.stack);
    
    // Daha anlaşılır hata mesajı
    if (error.message) {
      throw new Error(error.message);
    }
    
    // Error objesi ise, message'ı çıkar
    if (typeof error === 'object' && error !== null) {
      const errorMessage = error.message || error.error || JSON.stringify(error);
      throw new Error(errorMessage);
    }
    
    throw error;
  }
};

/**
 * E-posta servisinin hazır olup olmadığını kontrol eder
 * @returns {boolean}
 */
const isEmailServiceReady = () => {
  return !!supabase;
};

/**
 * Influencer başvuru formunu Supabase Edge Function ile e-posta gönderir
 * @param {Object} formData - Form verileri
 * @returns {Promise} Response
 */
const sendInfluencerEmail = async (formData) => {
  if (!supabase) {
    throw new Error("Supabase client yapılandırılmamış");
  }

  try {
    const payload = {
      type: 'influencer',
      data: {
        fullName: formData.fullName || "",
        email: formData.email || "",
        phoneNumber: formData.phoneNumber || "",
        gender: formData.gender || "",
        country: formData.country || "",
        city: formData.city || "",
        interests: formData.interests || "",
        facebook: formData.facebook || "",
        youtube: formData.youtube || "",
        twitch: formData.twitch || "",
        instagram: formData.instagram || "",
        twitter: formData.twitter || "",
        blog: formData.blog || "",
        other: formData.other || "",
        budget: formData.budget || ""
      }
    };

    const response = await sendEmailViaEdgeFunction('send-application-email', payload);
    console.log("✅ Influencer başvuru e-postası başarıyla gönderildi:", response);
    return response;

  } catch (error) {
    console.error("❌ E-posta gönderim hatası:", error);
    throw error;
  }
};

/**
 * Müşteri başvuru formunu Supabase Edge Function ile e-posta gönderir
 * @param {Object} formData - Form verileri
 * @returns {Promise} Response
 */
const sendCustomerEmail = async (formData) => {
  if (!supabase) {
    throw new Error("Supabase client yapılandırılmamış");
  }

  try {
    const payload = {
      type: 'customer',
      data: {
        fullName: formData.fullName || "",
        email: formData.email || "",
        brand: formData.brand || "",
        taxNumber: formData.taxNumber || "",
        phoneNumber: formData.phoneNumber || "",
        platform: formData.platform || "",
        contentType: formData.contentType || "",
        description: formData.description || ""
      }
    };

    const response = await sendEmailViaEdgeFunction('send-application-email', payload);
    console.log("✅ Müşteri başvuru e-postası başarıyla gönderildi:", response);
    return response;

  } catch (error) {
    console.error("❌ E-posta gönderim hatası:", error);
    throw error;
  }
};

/**
 * Influencer başvuru formunu Supabase Edge Function ile gönderir (alias)
 * @param {Object} formData - Form verileri
 * @returns {Promise} Response
 */
const sendInfluencerApplicationEmail = sendInfluencerEmail;

/**
 * Müşteri başvuru formunu Supabase Edge Function ile gönderir (alias)
 * @param {Object} formData - Form verileri
 * @returns {Promise} Response
 */
const sendCustomerApplicationEmail = sendCustomerEmail;

// Export
export { 
  sendInfluencerApplicationEmail,
  sendCustomerApplicationEmail,
  sendInfluencerEmail,
  sendCustomerEmail,
  isEmailServiceReady
};