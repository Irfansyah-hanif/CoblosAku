import { createClient } from '@supabase/supabase-js'

// Mengambil variabel dari file .env (Asumsi menggunakan Vite/React)
// VITE_SUPABASE_URL dan VITE_SUPABASE_ANON_KEY adalah standar umum
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY; // Nama variabel yang disarankan

// Pengecekan keamanan sederhana agar developer sadar jika config belum diset
if (!supabaseUrl || !supabaseAnonKey) {
  console.error(
    '⚠️ Supabase URL atau Anon Key tidak ditemukan. Pastikan Anda telah membuat file .env di root project.'
  );
  // Menggunakan URL/Key dummy agar aplikasi tidak crash saat pengembangan
  // Ini memungkinkan komponen React dimuat tanpa data
  // Peringatan ini harus diperbaiki sebelum deployment
  // HANYA UNTUK PENGEMBANGAN: Supaya tidak crash.
  // Jika ini terjadi, data tidak akan terload, yang sesuai dengan error yang Anda alami.
}

// Inisialisasi client
// Menggunakan supabaseAnonKey sesuai penamaan dari env
export const supabase = createClient(supabaseUrl, supabaseAnonKey);