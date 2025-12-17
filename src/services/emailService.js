// emailService.js - EmailJS ile e-posta gönderimi (frontend/browser)
//
// EN: EmailJS "non-browser" (server/edge) çağrıları bazı hesaplarda engellediği için,
// e-posta gönderimini doğrudan tarayıcıdan yapıyoruz.
// TR: EmailJS'i frontend'de kullanıyoruz.

import emailjs from '@emailjs/browser';

/**
 * E-posta servisinin hazır olup olmadığını kontrol eder
 * @returns {boolean}
 */
const isEmailServiceReady = () => {
  return !!import.meta.env.VITE_EMAILJS_PUBLIC_KEY &&
    !!import.meta.env.VITE_EMAILJS_SERVICE_ID &&
    !!import.meta.env.VITE_EMAILJS_TEMPLATE_ID_INFLUENCER &&
    !!import.meta.env.VITE_EMAILJS_TEMPLATE_ID_CUSTOMER;
};

const getEmailJsConfig = () => {
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateIdInfluencer = import.meta.env.VITE_EMAILJS_TEMPLATE_ID_INFLUENCER;
  const templateIdCustomer = import.meta.env.VITE_EMAILJS_TEMPLATE_ID_CUSTOMER;

  if (!publicKey || !serviceId || !templateIdInfluencer || !templateIdCustomer) {
    throw new Error(
      'EmailJS ayarları eksik. .env dosyasında VITE_EMAILJS_PUBLIC_KEY, VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID_INFLUENCER, VITE_EMAILJS_TEMPLATE_ID_CUSTOMER olmalı.'
    );
  }

  return { publicKey, serviceId, templateIdInfluencer, templateIdCustomer };
};

const sendEmailJs = async ({ templateId, templateParams }) => {
  const { publicKey, serviceId } = getEmailJsConfig();

  try {
    // EN: emailjs.send returns { status, text }
    // TR: emailjs.send sonucu { status, text } döner
    const res = await emailjs.send(serviceId, templateId, templateParams, { publicKey });
    return { success: true, status: res.status, text: res.text };
  } catch (err) {
    // EmailJS bazen { text, status } gibi alanlar döndürebiliyor
    const message =
      err?.text ||
      err?.message ||
      (typeof err === 'string' ? err : JSON.stringify(err));
    throw new Error(message);
  }
};

/**
 * Influencer başvuru formunu Supabase Edge Function ile e-posta gönderir
 * @param {Object} formData - Form verileri
 * @returns {Promise} Response
 */
const sendInfluencerEmail = async (formData) => {
  const { templateIdInfluencer } = getEmailJsConfig();

  try {
    // EmailJS template parametreleri
    const templateParams = {
      to_email: 'influencer@influencerturkiye.com',
      // EmailJS template subject alanında: "Yeni Başvuru - {{fullName}}" kullanıyorsan
      // burada fullName göndermek yeterli. Yine de subject'i de set ediyoruz.
      subject: `Yeni Başvuru - ${formData.fullName || 'Başvuru'}`,
      from_name: formData.fullName || 'Başvuru',
      from_email: formData.email || '',
      reply_to: formData.email || '',

      // Template'lerinde kullandığın değişken isimleri (camelCase)
      fullName: formData.fullName || '',
      email: formData.email || '',
      phoneNumber: formData.phoneNumber || '',
      gender: formData.gender || 'Belirtilmemiş',
      country: formData.country || '',
      city: formData.city || '',
      interests: formData.interests || 'Belirtilmemiş',
      instagram: formData.instagram || '',
      youtube: formData.youtube || '',
      facebook: formData.facebook || '',
      twitter: formData.twitter || '',
      twitch: formData.twitch || '',
      blog: formData.blog || '',
      other: formData.other || '',
      budget: formData.budget || 'Belirtilmemiş',
    };

    const response = await sendEmailJs({ templateId: templateIdInfluencer, templateParams });
    console.log('✅ Influencer başvuru e-postası başarıyla gönderildi:', response);
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
  const { templateIdCustomer } = getEmailJsConfig();

  try {
    const templateParams = {
      to_email: 'customer@influencerturkiye.com',
      subject: `Yeni Başvuru - ${formData.fullName || 'Başvuru'}`,
      from_name: formData.fullName || 'Başvuru',
      from_email: formData.email || '',
      reply_to: formData.email || '',

      fullName: formData.fullName || '',
      email: formData.email || '',
      phoneNumber: formData.phoneNumber || '',
      brand: formData.brand || '',
      taxNumber: formData.taxNumber || 'Belirtilmemiş',
      platform: formData.platform || '',
      contentType: formData.contentType || '',
      description: formData.description || 'Belirtilmemiş',
    };

    const response = await sendEmailJs({ templateId: templateIdCustomer, templateParams });
    console.log('✅ Müşteri başvuru e-postası başarıyla gönderildi:', response);
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
