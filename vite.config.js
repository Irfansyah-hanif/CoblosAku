import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  
  /**
   * Properti 'base' menentukan jalur dasar publik saat aplikasi di-serve.
   * Ini sangat penting jika Anda men-deploy ke subfolder, misalnya GitHub Pages.
   * GANTI '/nama-repository-anda/' dengan nama repository Anda (misalnya '/coblos-aku/').
   * Jika Anda men-deploy ke root domain (misal Netlify/Vercel), Anda dapat menghapus baris ini.
   */
  base: '/', 
})