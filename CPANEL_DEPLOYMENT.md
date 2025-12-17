# cPanel Deployment Rehberi

Bu rehber, projenizi cPanel üzerinden canlıya almak için adım adım talimatlar içerir.

## 📋 Ön Hazırlık

### 1. Gerekli Bilgileri Hazırlayın

- ✅ cPanel kullanıcı adı ve şifresi
- ✅ FTP/cPanel File Manager erişimi
- ✅ Domain adınız (örn: `yourdomain.com`)
- ✅ Supabase URL ve Anon Key değerleriniz

### 2. Supabase Ayarları

Production domain'inizi Supabase'e ekleyin:

1. Supabase Dashboard > **Authentication** > **URL Configuration**
2. **Redirect URLs** bölümüne ekleyin:
   ```
   https://yourdomain.com/auth/verify
   https://yourdomain.com/auth/reset-password
   ```
3. **Site URL**'i production domain'iniz olarak ayarlayın: `https://yourdomain.com`

## 🚀 Deployment Adımları

### Adım 1: Environment Variables Hazırlama

cPanel'de environment variable'lar build zamanında gömülür. Önce `.env.production` dosyası oluşturun:

```bash
# Proje kök dizininde .env.production dosyası oluşturun
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

⚠️ **ÖNEMLİ:** `.env.production` dosyasını `.gitignore`'a ekleyin (zaten ekli olmalı).

### Adım 2: Projeyi Build Etme ve ZIP Oluşturma

**🎯 Kolay Yöntem (Önerilen):** Tek komutla build + .htaccess kopyalama + ZIP oluşturma:

```bash
# Bağımlılıkları yükleyin (ilk kez yapıyorsanız)
npm install

# Build + .htaccess kopyalama + ZIP oluşturma (HEPSİ BİRDEN!)
npm run build:zip
```

Bu komut:
1. ✅ Projeyi build eder
2. ✅ `.htaccess` dosyasını `dist` klasörüne kopyalar
3. ✅ `dist` klasörünü `dist-cpanel.zip` olarak ZIP'ler

**Alternatif Yöntemler:**

```bash
# Sadece build + .htaccess kopyalama (ZIP olmadan)
npm run build:cpanel

# Veya manuel olarak:
npm run build
cp .htaccess dist/.htaccess
```

Build işlemi tamamlandığında `dist-cpanel.zip` dosyası proje kök dizininde oluşacak. Bu ZIP dosyasını cPanel'e yükleyeceksiniz.

### Adım 3: cPanel'e ZIP Dosyasını Yükleme

#### Yöntem 1: cPanel File Manager ile ZIP Yükleme (Önerilen - En Kolay!)

1. **cPanel'e giriş yapın**
2. **File Manager**'a tıklayın
3. **public_html** klasörüne gidin (veya domain'inizin root dizini)
4. **Eski dosyaları temizleyin** (varsa):
   - Tüm dosya ve klasörleri seçin
   - **Delete** butonuna tıklayın
   - ⚠️ Yedek almayı unutmayın!
5. **ZIP dosyasını yükleyin**:
   - cPanel File Manager'da **Upload** butonuna tıklayın
   - `dist-cpanel.zip` dosyasını seçin ve yükleyin
   - Yükleme tamamlandıktan sonra ZIP dosyasına **sağ tıklayın**
   - **Extract** (Aç) seçeneğine tıklayın
   - Extract işlemi tamamlandığında ZIP dosyasını silebilirsiniz
   - ✅ Artık siteniz hazır!

#### Yöntem 2: FTP ile Yükleme

1. **FTP Client** kullanın (FileZilla, WinSCP, vs.)
2. cPanel FTP bilgilerinizle bağlanın:
   - Host: `ftp.yourdomain.com` veya IP adresi
   - Username: cPanel kullanıcı adınız
   - Password: cPanel şifreniz
   - Port: 21 (veya 22 SFTP için)
3. **public_html** klasörüne gidin
4. Eski dosyaları silin (varsa)
5. `dist-cpanel.zip` dosyasını yükleyin
6. ZIP dosyasını extract edin (FTP client'ınızın extract özelliği varsa)
   - Veya cPanel File Manager'dan extract edin

### Adım 4: Dosya İzinlerini Kontrol Etme

cPanel File Manager'da şu dosyaların izinlerini kontrol edin:

- `.htaccess` → **644** (veya **644**)
- Tüm klasörler → **755**
- Tüm dosyalar → **644**

İzinleri değiştirmek için:
1. Dosyaya sağ tıklayın
2. **Change Permissions** seçin
3. İlgili izinleri ayarlayın

### Adım 5: Test Etme

1. Tarayıcınızda domain'inizi açın: `https://yourdomain.com`
2. Ana sayfanın yüklendiğini kontrol edin
3. Sayfa navigasyonunu test edin (menü linklerine tıklayın)
4. Login/Register işlemlerini test edin
5. Browser Console'u açın (F12) ve hata olup olmadığını kontrol edin

## 🔧 Sorun Giderme

### Problem: Sayfa 404 hatası veriyor

**Çözüm:** `.htaccess` dosyasının `public_html` klasöründe olduğundan ve doğru içeriğe sahip olduğundan emin olun.

### Problem: "supabaseUrl is required" hatası

**Çözüm:** 
1. `.env.production` dosyasının doğru değerlere sahip olduğunu kontrol edin
2. Build'i yeniden yapın: `npm run build`
3. Yeni build'i cPanel'e yükleyin

### Problem: CSS veya JavaScript dosyaları yüklenmiyor

**Çözüm:**
1. Dosya yollarının doğru olduğundan emin olun
2. Browser Console'da 404 hatalarını kontrol edin
3. `.htaccess` dosyasının doğru olduğundan emin olun
4. Cache'i temizleyin (Ctrl+F5 veya Cmd+Shift+R)

### Problem: React Router sayfaları çalışmıyor

**Çözüm:**
1. `.htaccess` dosyasının `public_html` klasöründe olduğundan emin olun
2. `.htaccess` içeriğini kontrol edin (aşağıdaki örnek dosyaya bakın)
3. Apache mod_rewrite modülünün aktif olduğundan emin olun (çoğu cPanel'de varsayılan olarak aktiftir)

### Problem: HTTPS çalışmıyor

**Çözüm:**
1. cPanel'de **SSL/TLS** bölümüne gidin
2. **Let's Encrypt** veya başka bir SSL sertifikası yükleyin
3. **Force HTTPS Redirect** seçeneğini aktif edin

## 📁 Dosya Yapısı (cPanel'de olması gerekenler)

```
public_html/
├── .htaccess
├── index.html
├── assets/
│   ├── css/
│   │   └── [dosyalar]
│   ├── js/
│   │   └── [dosyalar]
│   └── [diğer asset'ler]
└── [diğer dosyalar]
```

## 🔄 Güncelleme Yapmak İçin

Projeyi güncelledikten sonra:

1. Yerel olarak build + ZIP oluşturun: `npm run build:zip`
2. cPanel'de eski dosyaları silin (veya yedekleyin)
3. Yeni `dist-cpanel.zip` dosyasını yükleyin ve extract edin
4. Test edin

**Tek komutla güncelleme:**
```bash
npm run build:zip
# Sonra ZIP'i cPanel'e yükleyin
```

## 📝 Notlar

- ✅ **`npm run build:zip`** komutu ile tek seferde build + .htaccess + ZIP işlemini yapabilirsiniz
- ⚠️ **Environment variable'lar** build zamanında gömülür, sonradan değiştirilemez
- ✅ Build'i her zaman production modda yapın: `npm run build:zip` (dev değil)
- ✅ ZIP dosyası proje kök dizininde `dist-cpanel.zip` olarak oluşur
- ✅ cPanel'de ZIP yükleme ve extract işlemi çok daha hızlıdır
- ✅ İlk deployment'tan sonra birkaç dakika bekleyin (DNS propagation)

## 🆘 Yardım

Sorun yaşıyorsanız:
1. Browser Console'u kontrol edin (F12)
2. cPanel Error Log'larına bakın
3. `.htaccess` dosyasının doğru olduğundan emin olun
4. Build log'larını kontrol edin


