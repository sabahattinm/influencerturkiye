-- ============================================
-- GÜVENLİ RLS POLİTİKASI
-- Authenticated kullanıcılar için user_id kontrolü ile
-- ============================================
-- Bu script'i Supabase Dashboard > SQL Editor'de çalıştırın
-- ============================================

-- ============================================
-- ADIM 1: TÜM MEVCUT POLİTİKALARI SİL
-- ============================================

-- customer_applications için tüm politikaları sil
DO $$ 
DECLARE
    r RECORD;
BEGIN
    FOR r IN (SELECT policyname FROM pg_policies WHERE tablename = 'customer_applications') 
    LOOP
        EXECUTE 'DROP POLICY IF EXISTS ' || quote_ident(r.policyname) || ' ON public.customer_applications';
    END LOOP;
END $$;

-- influencer_applications için tüm politikaları sil
DO $$ 
DECLARE
    r RECORD;
BEGIN
    FOR r IN (SELECT policyname FROM pg_policies WHERE tablename = 'influencer_applications') 
    LOOP
        EXECUTE 'DROP POLICY IF EXISTS ' || quote_ident(r.policyname) || ' ON public.influencer_applications';
    END LOOP;
END $$;

-- ============================================
-- ADIM 2: RLS'Yİ ETKİNLEŞTİR
-- ============================================

ALTER TABLE public.customer_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.influencer_applications ENABLE ROW LEVEL SECURITY;

-- ============================================
-- ADIM 3: CUSTOMER_APPLICATIONS POLİTİKALARI
-- ============================================

-- Anonim kullanıcılar için INSERT (user_id NULL olabilir)
CREATE POLICY "anon_insert_customer_applications"
ON public.customer_applications 
FOR INSERT 
TO anon 
WITH CHECK (true);

-- Authenticated kullanıcılar için INSERT
-- Kullanıcı sadece kendi user_id'si ile kayıt ekleyebilir
-- Bu, kullanıcının başkası adına kayıt eklemesini engeller
CREATE POLICY "authenticated_insert_customer_applications"
ON public.customer_applications
FOR INSERT
TO authenticated
WITH CHECK (user_id = auth.uid());

-- Authenticated kullanıcılar kendi kayıtlarını görebilir (opsiyonel)
CREATE POLICY "authenticated_select_own_customer_applications"
ON public.customer_applications
FOR SELECT
TO authenticated
USING (user_id = auth.uid());

-- ============================================
-- ADIM 4: INFLUENCER_APPLICATIONS POLİTİKALARI
-- ============================================

-- Anonim kullanıcılar için INSERT (user_id NULL olabilir)
CREATE POLICY "anon_insert_influencer_applications"
ON public.influencer_applications 
FOR INSERT 
TO anon 
WITH CHECK (true);

-- Authenticated kullanıcılar için INSERT
-- Kullanıcı sadece kendi user_id'si ile kayıt ekleyebilir
-- Bu, kullanıcının başkası adına kayıt eklemesini engeller
CREATE POLICY "authenticated_insert_influencer_applications"
ON public.influencer_applications
FOR INSERT
TO authenticated
WITH CHECK (user_id = auth.uid());

-- Authenticated kullanıcılar kendi kayıtlarını görebilir (opsiyonel)
CREATE POLICY "authenticated_select_own_influencer_applications"
ON public.influencer_applications
FOR SELECT
TO authenticated
USING (user_id = auth.uid());

-- ============================================
-- ADIM 5: DOĞRULAMA
-- ============================================

-- Politikaları kontrol et
SELECT 
    tablename,
    policyname,
    roles,
    cmd as operation,
    with_check
FROM pg_policies 
WHERE tablename IN ('customer_applications', 'influencer_applications')
ORDER BY tablename, policyname;

-- RLS'nin etkin olduğunu kontrol et
SELECT 
    schemaname,
    tablename,
    rowsecurity as rls_enabled
FROM pg_tables 
WHERE schemaname = 'public' 
  AND tablename IN ('customer_applications', 'influencer_applications');
