/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Kita tambahkan sedikit kustomisasi agar warna Slate-900 (Navy) 
      // dan Amber-500 (Gold) terlihat konsisten seperti desain
      colors: {
        slate: {
          850: '#1e293b', // Variasi tambahan jika perlu
          900: '#0f172a', // Warna Navy Utama
        },
        amber: {
          400: '#fbbf24',
          500: '#f59e0b', // Warna Emas Utama
          600: '#d97706',
        }
      }
    },
  },
  plugins: [],
}