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
  }
})
