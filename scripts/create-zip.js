import { createWriteStream, existsSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');
const distDir = join(rootDir, 'dist');
const zipFile = join(rootDir, 'dist-cpanel.zip');

try {
  // dist klasörünün var olduğunu kontrol et
  if (!existsSync(distDir)) {
    console.error('❌ dist klasörü bulunamadı! Önce build yapın.');
    process.exit(1);
  }

  // Eski ZIP dosyasını sil (varsa)
  if (existsSync(zipFile)) {
    execSync(`rm "${zipFile}"`);
    console.log('🗑️  Eski ZIP dosyası silindi.');
  }

  // ZIP oluştur (macOS/Linux için zip komutu)
  console.log('📦 ZIP dosyası oluşturuluyor...');
  process.chdir(distDir);
  execSync(`zip -r "${zipFile}" .`, { stdio: 'inherit' });
  
  console.log(`✅ ZIP dosyası oluşturuldu: ${zipFile}`);
  console.log(`📤 Bu dosyayı cPanel File Manager'a yükleyip extract edebilirsiniz.`);
} catch (error) {
  console.error('❌ Hata:', error.message);
  console.log('\n💡 Alternatif: Manuel olarak dist klasörünü ZIP\'leyebilirsiniz.');
  process.exit(1);
}


