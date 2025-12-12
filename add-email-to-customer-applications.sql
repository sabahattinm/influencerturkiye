-- ============================================
-- Customer Applications Tablosuna Email Kolonu Ekleme
-- Bu dosyayı Supabase Dashboard > SQL Editor'de çalıştırın
-- ============================================
-- 
-- Marka başvuru formunda müşteri email'i için gerekli kolon ekleme
-- ============================================

-- Email kolonunu ekle (eğer yoksa)
ALTER TABLE public.customer_applications
ADD COLUMN IF NOT EXISTS email TEXT;

-- Email kolonuna NOT NULL constraint ekle (opsiyonel - mevcut kayıtlar varsa önce onları güncellemeniz gerekebilir)
-- ALTER TABLE public.customer_applications
-- ALTER COLUMN email SET NOT NULL;

-- Email kolonuna index ekle (arama performansı için)
CREATE INDEX IF NOT EXISTS idx_customer_applications_email 
ON public.customer_applications(email);

-- Email kolonuna comment ekle
COMMENT ON COLUMN public.customer_applications.email IS 'Müşteri e-posta adresi';

-- ============================================
-- NOTLAR:
-- ============================================
-- 1. Bu SQL komutunu Supabase Dashboard > SQL Editor'de çalıştırın
-- 2. Eğer tabloda mevcut kayıtlar varsa ve NOT NULL constraint eklemek istiyorsanız,
--    önce mevcut kayıtların email'lerini güncelleyin
-- 3. Index eklenmesi arama performansını artırır
-- 4. Email formatı kontrolü uygulama katmanında yapılıyor (HTML5 email input)
-- ============================================
