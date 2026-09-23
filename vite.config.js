import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Using an empty base path forces all assets to build completely relative to where they sit
  base: '',
})
