import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev
export default defineConfig({
  plugins: [react()],
  // Keeping the base path relative ensures it deploys perfectly to GitHub Pages
  base: './',
})
