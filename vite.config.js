import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev
export default defineConfig({
  plugins: [react()],
  // 🚀 CRITICAL FIX: Tell Vite to build relative assets matching your exact GitHub Repository path name
  base: '/Ar-Caller-Pro/',
})
