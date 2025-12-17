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
    // Kullanıcı giriş yapmışsa user_id'yi al, yapmamışsa null
    let userId = null;
    try {
      const { data: { user } } = await supabase.auth.getUser();
      userId = user?.id || null;
    } catch (authError) {
      // Auth hatası olsa bile devam et (giriş yapmadan da form doldurulabilir)
      userId = null;
    }

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
          user_id: userId, // Giriş yapmışsa user.id, yapmamışsa null
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
    // Kullanıcı giriş yapmışsa user_id'yi al, yapmamışsa null
    let userId = null;
    try {
      const { data: { user } } = await supabase.auth.getUser();
      userId = user?.id || null;
    } catch (authError) {
      // Auth hatası olsa bile devam et (giriş yapmadan da form doldurulabilir)
      userId = null;
    }

    const { data, error } = await supabase
      .from(CUSTOMER_APPLICATION_TABLE)
      .insert([
        {
          full_name: formData.fullName,
          email: formData.email,
          brand: formData.brand,
          tax_number: formData.taxNumber || null,
          phone_number: formData.phoneNumber,
          platform: formData.platform,
          content_type: formData.contentType,
          description: formData.description,
          user_id: userId, // Giriş yapmışsa user.id, yapmamışsa null
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

/**
 * Tüm Influencer başvurularını getirir (Admin için)
 * @returns {Promise<Array>} Tüm influencer başvuruları
 */
export const getAllInfluencerApplications = async () => {
  if (!supabase) {
    throw new Error('Supabase client yapılandırılmamış. Lütfen environment variable\'ları kontrol edin.');
  }

  try {
    const { data, error } = await supabase
      .from(APPLICATION_TABLE)
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error("Influencer başvuruları getirme hatası:", error);
      throw new Error(error.message || 'Başvurular getirilemedi.');
    }

    return data || [];
  } catch (error) {
    console.error("Influencer başvuruları getirme hatası:", error);
    throw error;
  }
};

/**
 * Tüm Marka başvurularını getirir (Admin için)
 * @returns {Promise<Array>} Tüm marka başvuruları
 */
export const getAllCustomerApplications = async () => {
  if (!supabase) {
    throw new Error('Supabase client yapılandırılmamış. Lütfen environment variable\'ları kontrol edin.');
  }

  try {
    const { data, error } = await supabase
      .from(CUSTOMER_APPLICATION_TABLE)
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error("Marka başvuruları getirme hatası:", error);
      throw new Error(error.message || 'Başvurular getirilemedi.');
    }

    return data || [];
  } catch (error) {
    console.error("Marka başvuruları getirme hatası:", error);
    throw error;
  }
};

/**
 * Influencer başvuru durumunu günceller (Admin için)
 * @param {number} id Başvuru ID'si
 * @param {string} status Yeni durum ('new', 'reviewed', 'accepted', 'rejected')
 * @returns {Promise<object>} Güncellenen başvuru
 */
export const updateInfluencerApplicationStatus = async (id, status) => {
  if (!supabase) {
    throw new Error('Supabase client yapılandırılmamış. Lütfen environment variable\'ları kontrol edin.');
  }

  try {
    const { data, error } = await supabase
      .from(APPLICATION_TABLE)
      .update({ status })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error("Influencer başvuru durumu güncelleme hatası:", error);
      throw new Error(error.message || 'Başvuru durumu güncellenemedi.');
    }

    return data;
  } catch (error) {
    console.error("Influencer başvuru durumu güncelleme hatası:", error);
    throw error;
  }
};

/**
 * Marka başvuru durumunu günceller (Admin için)
 * @param {number} id Başvuru ID'si
 * @param {string} status Yeni durum ('new', 'reviewed', 'accepted', 'rejected')
 * @returns {Promise<object>} Güncellenen başvuru
 */
export const updateCustomerApplicationStatus = async (id, status) => {
  if (!supabase) {
    throw new Error('Supabase client yapılandırılmamış. Lütfen environment variable\'ları kontrol edin.');
  }

  try {
    const { data, error } = await supabase
      .from(CUSTOMER_APPLICATION_TABLE)
      .update({ status })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error("Marka başvuru durumu güncelleme hatası:", error);
      throw new Error(error.message || 'Başvuru durumu güncellenemedi.');
    }

    return data;
  } catch (error) {
    console.error("Marka başvuru durumu güncelleme hatası:", error);
    throw error;
  }
};

/**
 * Influencer başvurusunu siler (Admin için)
 * @param {number} id Başvuru ID'si
 * @returns {Promise<void>}
 */
export const deleteInfluencerApplication = async (id) => {
  if (!supabase) {
    throw new Error('Supabase client yapılandırılmamış. Lütfen environment variable\'ları kontrol edin.');
  }

  try {
    const { error } = await supabase
      .from(APPLICATION_TABLE)
      .delete()
      .eq('id', id);

    if (error) {
      console.error("Influencer başvuru silme hatası:", error);
      throw new Error(error.message || 'Başvuru silinemedi.');
    }
  } catch (error) {
    console.error("Influencer başvuru silme hatası:", error);
    throw error;
  }
};

/**
 * Marka başvurusunu siler (Admin için)
 * @param {number} id Başvuru ID'si
 * @returns {Promise<void>}
 */
export const deleteCustomerApplication = async (id) => {
  if (!supabase) {
    throw new Error('Supabase client yapılandırılmamış. Lütfen environment variable\'ları kontrol edin.');
  }

  try {
    const { error } = await supabase
      .from(CUSTOMER_APPLICATION_TABLE)
      .delete()
      .eq('id', id);

    if (error) {
      console.error("Marka başvuru silme hatası:", error);
      throw new Error(error.message || 'Başvuru silinemedi.');
    }
  } catch (error) {
    console.error("Marka başvuru silme hatası:", error);
    throw error;
  }
};

/**
 * Birden fazla Influencer başvurusunu toplu olarak siler (Admin için)
 * @param {Array<number>} ids Başvuru ID'leri dizisi
 * @returns {Promise<void>}
 */
export const deleteMultipleInfluencerApplications = async (ids) => {
  if (!supabase) {
    throw new Error('Supabase client yapılandırılmamış. Lütfen environment variable\'ları kontrol edin.');
  }

  if (!ids || ids.length === 0) {
    throw new Error('Silinecek başvuru seçilmedi.');
  }

  try {
    const { error } = await supabase
      .from(APPLICATION_TABLE)
      .delete()
      .in('id', ids);

    if (error) {
      console.error("Toplu influencer başvuru silme hatası:", error);
      throw new Error(error.message || 'Başvurular silinemedi.');
    }
  } catch (error) {
    console.error("Toplu influencer başvuru silme hatası:", error);
    throw error;
  }
};

/**
 * Birden fazla Marka başvurusunu toplu olarak siler (Admin için)
 * @param {Array<number>} ids Başvuru ID'leri dizisi
 * @returns {Promise<void>}
 */
export const deleteMultipleCustomerApplications = async (ids) => {
  if (!supabase) {
    throw new Error('Supabase client yapılandırılmamış. Lütfen environment variable\'ları kontrol edin.');
  }

  if (!ids || ids.length === 0) {
    throw new Error('Silinecek başvuru seçilmedi.');
  }

  try {
    const { error } = await supabase
      .from(CUSTOMER_APPLICATION_TABLE)
      .delete()
      .in('id', ids);

    if (error) {
      console.error("Toplu marka başvuru silme hatası:", error);
      throw new Error(error.message || 'Başvurular silinemedi.');
    }
  } catch (error) {
    console.error("Toplu marka başvuru silme hatası:", error);
    throw error;
  }
};