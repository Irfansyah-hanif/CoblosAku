// coblos-aku\src\services\apiService.js
import { supabase } from '../config/supabaseClient';

// Nama bucket Supabase Storage Anda (Menggunakan konstanta)
const CANDIDATE_PHOTO_BUCKET = 'candidate_photos';

export class ApiService {
  constructor(userId) {
    this.userId = userId;
  }

  /**
   * Mengunggah file foto kandidat ke Supabase Storage.
   * @param {File} file - Objek File yang akan diunggah.
   * @param {string} candidateName - Nama kandidat untuk dijadikan bagian dari nama file unik.
   * @returns {Promise<string>} URL publik dari foto yang diunggah.
   */
  async uploadCandidatePhoto(file, candidateName) {
    if (!file) {
      console.warn("No file provided for upload.");
      return null;
    }

    // Membuat nama file yang unik dan aman
    const fileExt = file.name.split('.').pop();
    const safeName = candidateName.replace(/\s/g, '_').toLowerCase();
    const fileName = `${safeName}-${Date.now()}.${fileExt}`;
    const filePath = `candidates/${fileName}`; // Path di dalam bucket

    try {
      // 1. Upload file ke Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from(CANDIDATE_PHOTO_BUCKET) // Menggunakan konstanta
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false // Jangan menimpa
        });

      if (uploadError) {
        console.error("Supabase Storage Upload Error:", uploadError);
        throw uploadError;
      }

      // 2. Mendapatkan URL publik dari file yang diunggah
      const { data: publicUrlData } = supabase.storage
        .from(CANDIDATE_PHOTO_BUCKET) // Menggunakan konstanta
        .getPublicUrl(filePath);

      if (!publicUrlData || !publicUrlData.publicUrl) {
        throw new Error("Gagal mendapatkan URL publik setelah upload.");
      }

      return publicUrlData.publicUrl;

    } catch (error) {
      console.error("Supabase Storage Upload Error:", error);
      throw new Error(`Gagal mengunggah foto: ${error.message || error}`);
    }
  }

  // --- KANDIDAT ---

  async getCandidates() {
    console.log("API: Mengambil daftar kandidat...");
    const { data, error } = await supabase
      .from('candidates')
      .select('*')
      .order('number', { ascending: true }); // Diurutkan berdasarkan nomor urut
      
    if (error) {
      console.error("Error getCandidates:", error);
      throw error;
    }
    return { data };
  }
  
  /**
   * Menambahkan kandidat baru ke tabel 'candidates'.
   */
  async addCandidate(candidateData) {
    console.log("API: Menambahkan kandidat baru...");
    const { data, error } = await supabase
      .from('candidates')
      .insert([candidateData])
      .select();

    if (error) {
      console.error("Error addCandidate:", error);
      throw error;
    }
    return { data };
  }

  /**
   * Memperbarui data kandidat yang ada.
   */
  async updateCandidate(id, updates) {
    console.log(`API: Memperbarui kandidat ID ${id}...`);
    const { data, error } = await supabase
      .from('candidates')
      .update(updates)
      .eq('id', id)
      .select();

    if (error) {
      console.error("Error updateCandidate:", error);
      throw error;
    }
    return { data };
  }

  async deleteCandidate(id) {
    console.log(`API: Menghapus kandidat ID ${id}...`);
    const { error } = await supabase
      .from('candidates')
      .delete()
      .eq('id', id);

    if (error) {
      console.error("Error deleteCandidate:", error);
      throw error;
    }
    return true;
  }

  // --- VOTING (Logika Penting) ---
  
  async getUserVotingStatus() {
    if (!this.userId) return { hasVoted: false, candidateId: null };
    
    console.log(`API: Cek status voting untuk user ${this.userId}...`);
    const { data, error } = await supabase
      .from('votes')
      .select('candidate_id')
      .eq('user_id', this.userId)
      .maybeSingle(); 
    
    if (error) {
        // Jangan throw error jika hanya 'no rows found'
        if (error.code !== 'PGRST116') console.error("Error getUserVotingStatus:", error);
    }

    if (data) {
        return { hasVoted: true, candidateId: data.candidate_id };
    }
    return { hasVoted: false, candidateId: null };
  }

  async castVote(candidateId, userRole) {
    console.log(`API: Melakukan vote untuk user ${this.userId} pada kandidat ${candidateId}...`);
    if (userRole !== 'voter' && userRole !== 'admin') { // Admin juga bisa vote untuk pengujian, tapi sebaiknya hanya voter
        throw new Error("Akses ditolak. Hanya Pemilih yang sah.");
    }

    // 1. Cek apakah user sudah pernah vote
    const { data: existingVote } = await supabase
      .from('votes')
      .select('id')
      .eq('user_id', this.userId)
      .single(); 

    if (existingVote) {
      throw new Error("Anda sudah menggunakan hak suara!");
    }

    // 2. Masukkan data ke tabel votes
    const { error: insertError } = await supabase
      .from('votes')
      .insert([{ user_id: this.userId, candidate_id: candidateId, role: userRole }]);
    
    if (insertError) {
        console.error("Error castVote (insert):", insertError);
        throw insertError;
    }

    // 3. Increment (Tambah 1) jumlah suara kandidat menggunakan RPC
    const { error: updateError } = await supabase.rpc('increment_vote', { row_id: candidateId });
    
    if (updateError) {
        console.warn("Warning: RPC 'increment_vote' failed. Falling back to manual update.", updateError);
        
        // FALLBACK MANUAL (Hati-hati terhadap race condition)
        try {
            const { data: current, error: fetchError } = await supabase
                .from('candidates')
                .select('vote_count')
                .eq('id', candidateId)
                .single();
            
            if (fetchError) throw fetchError;

            const newCount = (current?.vote_count || 0) + 1;
            const { error: manualUpdateError } = await supabase
                .from('candidates')
                .update({ vote_count: newCount })
                .eq('id', candidateId);

            if (manualUpdateError) throw manualUpdateError;
            console.log("Fallback manual update successful.");
            
        } catch (manualError) {
             console.error("Critical Error: Fallback manual update also failed.", manualError);
             // Jika kedua cara gagal, lempar error yang lebih jelas
             throw new Error(`Gagal memperbarui hitungan suara, vote mungkin telah dicatat: ${manualError.message}`);
        }
    }
    
    return true;
  }

  // --- BERITA ---
  async getNews() {
    console.log("API: Mengambil daftar berita...");
    const { data, error } = await supabase
      .from('news')
      .select('*')
      .order('created_at', { ascending: false }); // Urutkan berdasarkan created_at

    if (error) {
        console.error("Error getNews:", error);
        throw error;
    }
    return { data };
  }
  
  async addNews(newsData) {
    console.log("API: Menambahkan berita baru...");
    const { data, error } = await supabase
      .from('news')
      .insert([newsData])
      .select();

    if (error) {
        console.error("Error addNews:", error);
        throw error;
    }
    return { data };
  }
  
  /**
   * Memperbarui data berita yang ada.
   */
  async updateNews(id, updates) {
    console.log(`API: Memperbarui berita ID ${id}...`);
    const { data, error } = await supabase
      .from('news')
      .update(updates)
      .eq('id', id)
      .select();

    if (error) {
        console.error("Error updateNews:", error);
        throw error;
    }
    return { data };
  }
  
  /**
   * Menghapus berita berdasarkan ID.
   */
  async deleteNews(id) {
    console.log(`API: Menghapus berita ID ${id}...`);
    const { error } = await supabase
      .from('news')
      .delete()
      .eq('id', id);

    if (error) {
        console.error("Error deleteNews:", error);
        throw error;
    }
    return true;
  }
}