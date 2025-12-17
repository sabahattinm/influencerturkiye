import { copyFileSync, existsSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');
const distDir = join(rootDir, 'dist');
const htaccessSource = join(rootDir, '.htaccess');
const htaccessDest = join(distDir, '.htaccess');

try {
  // dist klasörünün var olduğunu kontrol et
  if (!existsSync(distDir)) {
    console.error('❌ dist klasörü bulunamadı! Önce "npm run build" çalıştırın.');
    process.exit(1);
  }

  // .htaccess dosyasının var olduğunu kontrol et
  if (!existsSync(htaccessSource)) {
    console.error('❌ .htaccess dosyası bulunamadı!');
    process.exit(1);
  }

  // .htaccess dosyasını dist klasörüne kopyala
  copyFileSync(htaccessSource, htaccessDest);
  console.log('✅ .htaccess dosyası dist klasörüne kopyalandı!');
} catch (error) {
  console.error('❌ Hata:', error.message);
  process.exit(1);
}


