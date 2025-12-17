-- Supabase Tablo Yapıları
-- Bu dosya influencer-landing projesinde kullanılan tüm Supabase tablolarının SQL kodlarını içerir.

-- ============================================
-- 1. INFLUENCER APPLICATIONS TABLE
-- ============================================
-- Influencer başvurularını saklayan tablo
CREATE TABLE IF NOT EXISTS influencer_applications (
  id BIGSERIAL PRIMARY KEY,
  
  -- Kişisel Bilgiler
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone_number TEXT NOT NULL,
  gender TEXT,
  country TEXT NOT NULL,
  city TEXT NOT NULL,
  interests TEXT,
  
  -- Sosyal Medya Hesapları (URL'ler)
  facebook_url TEXT,
  youtube_url TEXT,
  twitch_tv_url TEXT,
  instagram_url TEXT,
  twitter_url TEXT,
  blog_url TEXT,
  other_social_media TEXT,
  
  -- Finansal Bilgi
  budget_per_share NUMERIC(10, 2) DEFAULT 0,
  
  -- Kullanıcı İlişkisi (opsiyonel - giriş yapmış kullanıcılar için)
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  
  -- Durum Yönetimi
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'reviewed', 'accepted', 'rejected')),
  
  -- Zaman Damgaları
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index'ler (performans için)
CREATE INDEX IF NOT EXISTS idx_influencer_applications_user_id ON influencer_applications(user_id);
CREATE INDEX IF NOT EXISTS idx_influencer_applications_status ON influencer_applications(status);
CREATE INDEX IF NOT EXISTS idx_influencer_applications_created_at ON influencer_applications(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_influencer_applications_email ON influencer_applications(email);

-- updated_at için otomatik güncelleme trigger'ı
CREATE OR REPLACE FUNCTION update_influencer_applications_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_influencer_applications_updated_at
  BEFORE UPDATE ON influencer_applications
  FOR EACH ROW
  EXECUTE FUNCTION update_influencer_applications_updated_at();

-- RLS (Row Level Security) Politikaları
ALTER TABLE influencer_applications ENABLE ROW LEVEL SECURITY;

-- Herkes başvuru ekleyebilir (anon)
CREATE POLICY "Anyone can insert influencer applications"
  ON influencer_applications
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Kullanıcılar kendi başvurularını görebilir
CREATE POLICY "Users can view their own influencer applications"
  ON influencer_applications
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Admin kullanıcılar tüm başvuruları görebilir ve yönetebilir
-- (Burada admin kontrolü için bir user_metadata veya ayrı bir admin tablosu kullanılabilir)
-- Örnek: user_metadata->>'role' = 'admin'
CREATE POLICY "Admins can view all influencer applications"
  ON influencer_applications
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND (auth.users.raw_user_meta_data->>'role')::text = 'admin'
    )
  );

CREATE POLICY "Admins can update influencer applications"
  ON influencer_applications
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND (auth.users.raw_user_meta_data->>'role')::text = 'admin'
    )
  );

CREATE POLICY "Admins can delete influencer applications"
  ON influencer_applications
  FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND (auth.users.raw_user_meta_data->>'role')::text = 'admin'
    )
  );

-- ============================================
-- 2. CUSTOMER APPLICATIONS TABLE
-- ============================================
-- Müşteri (Marka) başvurularını saklayan tablo
CREATE TABLE IF NOT EXISTS customer_applications (
  id BIGSERIAL PRIMARY KEY,
  
  -- İletişim Bilgileri
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone_number TEXT NOT NULL,
  
  -- Şirket/Marka Bilgileri
  brand TEXT NOT NULL,
  tax_number TEXT,
  
  -- Proje Detayları
  platform TEXT NOT NULL CHECK (platform IN ('instagram', 'youtube', 'tiktok')),
  content_type TEXT NOT NULL CHECK (content_type IN ('reels', 'story', 'pr', 'shorts', 'video')),
  description TEXT NOT NULL,
  
  -- Kullanıcı İlişkisi (opsiyonel - giriş yapmış kullanıcılar için)
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  
  -- Durum Yönetimi
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'reviewed', 'accepted', 'rejected')),
  
  -- Zaman Damgaları
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index'ler (performans için)
CREATE INDEX IF NOT EXISTS idx_customer_applications_user_id ON customer_applications(user_id);
CREATE INDEX IF NOT EXISTS idx_customer_applications_status ON customer_applications(status);
CREATE INDEX IF NOT EXISTS idx_customer_applications_created_at ON customer_applications(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_customer_applications_email ON customer_applications(email);
CREATE INDEX IF NOT EXISTS idx_customer_applications_brand ON customer_applications(brand);

-- updated_at için otomatik güncelleme trigger'ı
CREATE OR REPLACE FUNCTION update_customer_applications_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_customer_applications_updated_at
  BEFORE UPDATE ON customer_applications
  FOR EACH ROW
  EXECUTE FUNCTION update_customer_applications_updated_at();

-- RLS (Row Level Security) Politikaları
ALTER TABLE customer_applications ENABLE ROW LEVEL SECURITY;

-- Herkes başvuru ekleyebilir (anon)
CREATE POLICY "Anyone can insert customer applications"
  ON customer_applications
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Kullanıcılar kendi başvurularını görebilir
CREATE POLICY "Users can view their own customer applications"
  ON customer_applications
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Admin kullanıcılar tüm başvuruları görebilir ve yönetebilir
CREATE POLICY "Admins can view all customer applications"
  ON customer_applications
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND (auth.users.raw_user_meta_data->>'role')::text = 'admin'
    )
  );

CREATE POLICY "Admins can update customer applications"
  ON customer_applications
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND (auth.users.raw_user_meta_data->>'role')::text = 'admin'
    )
  );

CREATE POLICY "Admins can delete customer applications"
  ON customer_applications
  FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND (auth.users.raw_user_meta_data->>'role')::text = 'admin'
    )
  );

-- ============================================
-- Yorumlar ve Notlar
-- ============================================

-- NOT: Bu SQL kodları Supabase PostgreSQL veritabanında çalıştırılmalıdır.
-- 
-- Kurulum Adımları:
-- 1. Supabase Dashboard'a gidin
-- 2. SQL Editor'ü açın
-- 3. Bu SQL kodlarını yapıştırın ve çalıştırın
--
-- Alternatif: Supabase CLI kullanarak migration oluşturun:
-- supabase migration new create_application_tables
-- 
-- RLS (Row Level Security) Notları:
-- - Admin kontrolü için auth.users tablosundaki raw_user_meta_data->>'role' = 'admin' kullanılmıştır
-- - Admin kullanıcı oluşturmak için Supabase Dashboard > Authentication > Users > Edit User
--   > User Metadata bölümüne {"role": "admin"} ekleyin
--
-- Veri Tipleri:
-- - TEXT: String veriler için (PostgreSQL'de VARCHAR yerine TEXT kullanmak performans açısından fark yaratmaz)
-- - NUMERIC(10,2): Para birimi için (10 basamak, 2 ondalık)
-- - UUID: Supabase auth.users tablosundan gelen user ID'leri için
-- - TIMESTAMP WITH TIME ZONE: Zaman damgaları için (timezone bilgisi ile)


