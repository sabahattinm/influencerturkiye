/**
 * Instagram Utility Functions
 * Instagram profil fotoğrafları ve verileri için yardımcı fonksiyonlar
 */

/**
 * Instagram URL'den username çıkarır
 * @param {string} url - Instagram URL (örn: https://www.instagram.com/username)
 * @returns {string} - Username
 */
export const extractUsername = (url) => {
  if (!url) return null;
  const match = url.match(/instagram\.com\/([^/?]+)/);
  return match ? match[1] : null;
};

/**
 * Instagram profil fotoğrafı URL'si oluşturur
 * Not: Instagram'ın resmi API'si olmadan direkt erişim sınırlıdır
 * Bu fonksiyon Instagram'ın genel profil fotoğrafı formatını kullanır
 * 
 * @param {string} username - Instagram username
 * @returns {string} - Profil fotoğrafı URL'si
 */
export const getInstagramProfilePicture = (username) => {
  if (!username) return null;
  // Instagram profil fotoğrafları için genel format
  // Not: Bu yöntem her zaman çalışmayabilir, Instagram'ın güvenlik politikalarına bağlıdır
  return `https://www.instagram.com/${username}/media/?size=l`;
};

/**
 * Alternatif: Instagram profil fotoğrafı için Graph API formatı
 * (Instagram Graph API erişimi gerektirir)
 * 
 * @param {string} username - Instagram username
 * @returns {string} - Profil fotoğrafı URL'si
 */
export const getInstagramProfilePictureGraph = (username) => {
  if (!username) return null;
  // Instagram Graph API formatı (Business hesabı gerektirir)
  return `https://graph.instagram.com/${username}/picture?type=large`;
};

/**
 * Instagram profil sayfasından veri çekmek için proxy endpoint
 * Not: Bu fonksiyon backend'de bir proxy servisi gerektirir
 * CORS politikaları nedeniyle direkt frontend'den erişim mümkün değildir
 * 
 * @param {string} username - Instagram username
 * @returns {Promise<Object>} - Profil verileri
 */
export const fetchInstagramProfile = async (username) => {
  if (!username) return null;
  
  try {
    // Backend proxy endpoint'i kullanılmalı
    // Örnek: /api/instagram/profile?username=${username}
    const response = await fetch(`/api/instagram/profile?username=${username}`);
    if (!response.ok) throw new Error('Failed to fetch Instagram profile');
    return await response.json();
  } catch (error) {
    console.error('Error fetching Instagram profile:', error);
    return null;
  }
};
