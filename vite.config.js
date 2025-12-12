import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Tüm network interface'lerde dinle
    port: 5173,
    strictPort: false,
    // ngrok ve diğer tunnel servisleri için host kontrolünü kaldır
    allowedHosts: [
      '.ngrok.io',
      '.ngrok-free.app',
      '.ngrok.app',
      'localhost',
      '127.0.0.1'
    ],
    // Veya tüm host'lara izin ver (development için)
    // allowedHosts: 'all'
  },
  build: {
    // Code splitting optimizasyonu
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Vendor chunks - daha iyi code splitting
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router')) {
              return 'react-vendor';
            }
            if (id.includes('@supabase')) {
              return 'supabase-vendor';
            }
            if (id.includes('lucide-react')) {
              return 'icons-vendor';
            }
            if (id.includes('framer-motion')) {
              return 'animations-vendor';
            }
            if (id.includes('swiper')) {
              return 'swiper-vendor';
            }
            // Diğer node_modules paketleri
            return 'vendor';
          }
        },
        // Chunk file names - daha iyi cache
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
      },
    },
    // Chunk size uyarı limiti
    chunkSizeWarningLimit: 1000,
    // Minification - terser daha iyi sıkıştırma sağlar ama esbuild daha hızlı
    minify: 'esbuild',
    // Source maps (production'da kapalı, daha hızlı build ve daha küçük bundle)
    sourcemap: false,
    // CSS code splitting
    cssCodeSplit: true,
    // Target modern browsers for smaller bundles
    target: ['es2020', 'edge88', 'firefox78', 'chrome87', 'safari14'],
  },
  // Optimize dependencies
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', '@supabase/supabase-js'],
  },
})
