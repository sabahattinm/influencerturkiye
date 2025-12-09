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
        manualChunks: {
          // Vendor chunks
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'supabase-vendor': ['@supabase/supabase-js'],
          'ui-vendor': ['framer-motion', 'lucide-react'],
          'swiper-vendor': ['swiper'],
        },
      },
    },
    // Chunk size uyarı limiti
    chunkSizeWarningLimit: 1000,
    // Minification
    minify: 'esbuild',
    // Source maps (production'da kapalı, daha hızlı build)
    sourcemap: false,
  },
  // Optimize dependencies
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', '@supabase/supabase-js'],
  },
})
