// src/services/emailService.js
import emailjs from '@emailjs/browser';

// EmailJS configuration - Bu değerleri .env dosyasından alacağız
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
const RECIPIENT_EMAIL = 'sabahattinmakine@gmail.com';

/**
 * EmailJS servisini başlatır
 */
export const initEmailJS = () => {
  if (EMAILJS_PUBLIC_KEY) {
    emailjs.init(EMAILJS_PUBLIC_KEY);
  }
};

/**
 * Influencer başvurusu için e-posta gönderir
 * @param {object} formData - Form verileri
 */
export const sendInfluencerApplicationEmail = async (formData) => {
  // EmailJS yapılandırması kontrolü
  if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
    console.warn('EmailJS yapılandırılmamış. E-posta gönderilemedi.');
    return;
  }

  try {
    // Sosyal medya hesaplarını formatla
    const socialMediaAccounts = [];
    if (formData.instagram) socialMediaAccounts.push(`Instagram: ${formData.instagram}`);
    if (formData.youtube) socialMediaAccounts.push(`YouTube: ${formData.youtube}`);
    if (formData.facebook) socialMediaAccounts.push(`Facebook: ${formData.facebook}`);
    if (formData.twitter) socialMediaAccounts.push(`Twitter/X: ${formData.twitter}`);
    if (formData.twitch) socialMediaAccounts.push(`Twitch: ${formData.twitch}`);
    if (formData.blog) socialMediaAccounts.push(`Blog/Web: ${formData.blog}`);
    if (formData.other) socialMediaAccounts.push(`Diğer: ${formData.other}`);

    const templateParams = {
      to_email: RECIPIENT_EMAIL,
      application_type: 'Influencer Başvurusu',
      full_name: formData.fullName,
      email: formData.email,
      phone_number: formData.phoneNumber,
      gender: formData.gender || 'Belirtilmemiş',
      country: formData.country,
      city: formData.city,
      interests: formData.interests || 'Belirtilmemiş',
      social_media: socialMediaAccounts.join('\n') || 'Belirtilmemiş',
      budget: formData.budget ? `${formData.budget} TRY` : 'Belirtilmemiş',
      submission_date: new Date().toLocaleString('tr-TR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    };

    await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams
    );

    console.log('Influencer başvuru e-postası başarıyla gönderildi');
  } catch (error) {
    console.error('E-posta gönderme hatası:', error);
    // Hata olsa bile form kaydı devam etsin, sadece log'la
    throw new Error('E-posta gönderilemedi, ancak başvurunuz kaydedildi.');
  }
};

/**
 * Müşteri başvurusu için e-posta gönderir
 * @param {object} formData - Form verileri
 */
export const sendCustomerApplicationEmail = async (formData) => {
  // EmailJS yapılandırması kontrolü
  if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
    console.warn('EmailJS yapılandırılmamış. E-posta gönderilemedi.');
    return;
  }

  try {
    const templateParams = {
      to_email: RECIPIENT_EMAIL,
      application_type: 'Müşteri Başvurusu',
      full_name: formData.fullName,
      brand: formData.brand,
      tax_number: formData.taxNumber || 'Belirtilmemiş',
      phone_number: formData.phoneNumber,
      platform: formData.platform || 'Belirtilmemiş',
      content_type: formData.contentType || 'Belirtilmemiş',
      description: formData.description,
      submission_date: new Date().toLocaleString('tr-TR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    };

    await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams
    );

    console.log('Müşteri başvuru e-postası başarıyla gönderildi');
  } catch (error) {
    console.error('E-posta gönderme hatası:', error);
    // Hata olsa bile form kaydı devam etsin, sadece log'la
    throw new Error('E-posta gönderilemedi, ancak başvurunuz kaydedildi.');
  }
};


