// src/services/dataService.js
import { supabase } from '../lib/supabase';

const APPLICATION_TABLE = 'influencer_applications';
const CUSTOMER_APPLICATION_TABLE = 'customer_applications';

/**
 * Yeni bir Influencer başvurusunu Supabase'e kaydeder.
 * @param {object} formData Formdan gelen tüm veriler.
 * @returns {Promise<object>} Kaydedilen başvuru verisi
 */
export const saveInfluencerApplication = async (formData) => {
  // Supabase client kontrolü
  if (!supabase) {
    throw new Error('Supabase client yapılandırılmamış. Lütfen environment variable\'ları kontrol edin.');
  }

  try {
    const { data, error } = await supabase
      .from(APPLICATION_TABLE)
      .insert([
        {
          full_name: formData.fullName,
          email: formData.email,
          phone_number: formData.phoneNumber,
          gender: formData.gender || null,
          country: formData.country,
          city: formData.city,
          interests: formData.interests || null,
          facebook_url: formData.facebook || null,
          youtube_url: formData.youtube || null,
          twitch_tv_url: formData.twitch || null,
          instagram_url: formData.instagram || null,
          twitter_url: formData.twitter || null,
          blog_url: formData.blog || null,
          other_social_media: formData.other || null,
          budget_per_share: parseFloat(formData.budget) || 0,
          user_id: null,
        }
      ])
      .select()
      .single();

    if (error) {
      console.error("Başvuru kaydı hatası:", error);
      throw new Error(error.message || 'Başvurunuz kaydedilemedi. Lütfen tekrar deneyin.');
    }

    return data;
  } catch (error) {
    console.error("Başvuru kaydı hatası:", error);
    throw error;
  }
};

/**
 * Yeni bir Müşteri (Marka) başvurusunu Supabase'e kaydeder.
 * @param {object} formData Formdan gelen tüm veriler.
 * @returns {Promise<object>} Kaydedilen başvuru verisi
 */
export const saveCustomerApplication = async (formData) => {
  // Supabase client kontrolü
  if (!supabase) {
    throw new Error('Supabase client yapılandırılmamış. Lütfen environment variable\'ları kontrol edin.');
  }

  try {
    // Mevcut kullanıcının ID'sini al
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    // Kullanıcı yoksa veya auth hatası varsa işlemi durdur
    if (authError || !user) {
      throw new Error('Bu işlemi yapabilmek için giriş yapmalısınız. Lütfen hesabınıza giriş yapın.');
    }

    const { data, error } = await supabase
      .from(CUSTOMER_APPLICATION_TABLE)
      .insert([
        {
          full_name: formData.fullName,
          brand: formData.brand,
          tax_number: formData.taxNumber || null,
          phone_number: formData.phoneNumber,
          platform: formData.platform,
          content_type: formData.contentType,
          description: formData.description,
          user_id: user.id, // Artık null olamaz, kesinlikle kullanıcı ID'si
        }
      ])
      .select()
      .single();

    if (error) {
      console.error("Müşteri başvuru kaydı hatası:", error);
      throw new Error(error.message || 'Başvurunuz kaydedilemedi. Lütfen tekrar deneyin.');
    }

    return data;
  } catch (error) {
    console.error("Müşteri başvuru kaydı hatası:", error);
    throw error;
  }
};