 import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // Ensure a consistent port
    proxy: {
      // Proxy API requests to the backend server
      '/api': {
        target: 'http://localhost:5001',
        changeOrigin: true,
      },
    },
  },
})


