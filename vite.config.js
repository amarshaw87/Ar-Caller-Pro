import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev
export default defineConfig({
  plugins: [react()],
  // 🚀 FIXED: Setting the base path to './' forces Vite to map every single style asset relatively
  base: './',
})
