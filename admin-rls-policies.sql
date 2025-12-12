-- ============================================
-- Admin Panel için RLS Politikaları
-- Bu dosyayı Supabase Dashboard > SQL Editor'de çalıştırın
-- ============================================
-- 
-- Admin kullanıcıların başvuruları görüntüleyebilmesi ve
-- durumlarını güncelleyebilmesi için gerekli politikalar
-- ============================================

-- ============================================
-- INFLUENCER APPLICATIONS POLİTİKALARI
-- ============================================

-- Önce mevcut politikaları kaldır (varsa)
DROP POLICY IF EXISTS "Authenticated users can view influencer applications." ON public.influencer_applications;
DROP POLICY IF EXISTS "Authenticated users can update influencer application status." ON public.influencer_applications;

-- Authenticated kullanıcılar tüm influencer başvurularını görebilir (Admin paneli için)
-- NOT: Uygulama katmanında admin kontrolü yapılıyor (AdminRoute component'i)
CREATE POLICY "Authenticated users can view influencer applications."
ON public.influencer_applications 
FOR SELECT 
TO authenticated 
USING (true);

-- Authenticated kullanıcılar influencer başvuru durumlarını güncelleyebilir (Admin paneli için)
CREATE POLICY "Authenticated users can update influencer application status."
ON public.influencer_applications 
FOR UPDATE 
TO authenticated 
USING (true)
WITH CHECK (true);

-- ============================================
-- CUSTOMER APPLICATIONS POLİTİKALARI
-- ============================================

-- Önce mevcut politikaları kaldır (varsa)
DROP POLICY IF EXISTS "Authenticated users can view customer applications." ON public.customer_applications;
DROP POLICY IF EXISTS "Authenticated users can update customer application status." ON public.customer_applications;

-- Authenticated kullanıcılar tüm marka başvurularını görebilir (Admin paneli için)
CREATE POLICY "Authenticated users can view customer applications."
ON public.customer_applications 
FOR SELECT 
TO authenticated 
USING (true);

-- Authenticated kullanıcılar marka başvuru durumlarını güncelleyebilir (Admin paneli için)
CREATE POLICY "Authenticated users can update customer application status."
ON public.customer_applications 
FOR UPDATE 
TO authenticated 
USING (true)
WITH CHECK (true);

-- ============================================
-- NOTLAR:
-- ============================================
-- 1. Bu politikalar tüm authenticated (giriş yapmış) kullanıcılara izin verir
-- 2. Ancak uygulama katmanında AdminRoute component'i ile admin kontrolü yapılıyor
-- 3. Admin email'leri AdminRoute.jsx dosyasında tanımlı (VITE_ADMIN_EMAIL_1 ve VITE_ADMIN_EMAIL_2)
-- 4. Sadece admin email'ine sahip kullanıcılar admin paneline erişebilir
-- 5. Bu politikaları çalıştırmadan önce mevcut politikaları kontrol edin
-- 6. Eğer aynı isimde politika varsa, önce DROP POLICY ile kaldırın
-- ============================================
