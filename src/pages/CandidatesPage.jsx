// coblos-aku\src\pages\CandidatesPage.jsx
import React, { useState, useEffect } from 'react'; 
import { Plus, X, Save, Image as ImageIcon, Edit } from 'lucide-react'; 
import CandidateCard from '../components/CandidateCard';

// Pastikan Anda memiliki prop onEditCandidate dari komponen induk
// PERHATIKAN: onViewDetail sekarang diharapkan menerima candidate.id untuk navigasi rute
const CandidatesPage = ({ candidates, role, onVote, onViewDetail, onDelete, onAddCandidate, onEditCandidate, hasVoted, isLoading }) => {
  // State untuk menampilkan/menyembunyikan form tambah
  const [showAddForm, setShowAddForm] = useState(false);
  
  // State BARU untuk menyimpan data kandidat yang sedang diedit (null jika mode Tambah)
  const [editingCandidate, setEditingCandidate] = useState(null); // <== INI YANG HILANG DAN HARUS DITAMBAHKAN
  
  // State untuk menyimpan file foto yang diunggah (digunakan untuk Add dan Edit)
  const [candidatePhoto, setCandidatePhoto] = useState(null); 

  // Fungsi untuk membuka modal dalam mode Edit
  const handleEditClick = (candidate) => {
    setEditingCandidate(candidate); // Set data kandidat yang akan diedit
    setShowAddForm(true); // Tampilkan modal form
    setCandidatePhoto(null); // Reset foto yang diunggah
  };

  // Fungsi untuk menutup modal dan mereset state
  const handleCloseForm = () => {
    setShowAddForm(false);
    setEditingCandidate(null);
    setCandidatePhoto(null);
  }
    
  // Fungsi UNTUK MENANGANI SUBMIT (Add atau Edit)
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const candidateData = Object.fromEntries(formData.entries());

    // Hapus photo_url karena kita akan mengirim file/data base64
    delete candidateData.photo_url;
    
    const finalData = {
      ...candidateData,
      // Jika ada foto baru di-upload, kirim object File-nya. Jika tidak ada, biarkan undefined/null.
      photoFile: candidatePhoto, 
    };

    if (editingCandidate) {
      // MODE EDIT
      // Tambahkan ID kandidat yang diedit
      const dataToEdit = {
        id: editingCandidate.id, 
        ...finalData,
      };
      // Panggil prop onEditCandidate yang harus ditangani di komponen induk
      onEditCandidate(dataToEdit); 
      
    } else {
      // MODE TAMBAH
      onAddCandidate(finalData);
    }

    // Reset state
    handleCloseForm(); // Tutup form setelah submit
  };
    
  // Tentukan apakah ini mode Edit atau Add
  const isEditMode = !!editingCandidate;

  // Tentukan judul modal
  const modalTitle = isEditMode ? 'Edit Kandidat' : 'Tambah Kandidat Baru';
  const submitButtonText = isEditMode ? 'Simpan Perubahan' : 'Simpan Data';

  // --- KODE UTAMA RENDER ---

  return (
    <div className="p-6 animate-fade-in pb-24 md:pb-10">
      <div className="flex justify-between items-start mb-8">
        <div className="border-l-4 border-amber-500 pl-4">
          <h2 className="text-3xl font-bold text-slate-900 font-serif">Kandidat Ketua</h2>
          <p className="text-slate-500 text-sm mt-1">Kenali visi, misi, dan program kerja.</p>
        </div>
        
        {/* Tombol Tambah (Hanya Admin) */}
        {role === 'admin' && (
          <button 
            onClick={() => {
              setEditingCandidate(null); // Pastikan mode Tambah
              setShowAddForm(true);
            }}
            className="bg-slate-900 text-amber-500 px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 shadow-lg hover:bg-slate-800 transition"
          >
            <Plus size={18} /> Tambah
          </button>
        )}
      </div>

      {/* MODAL FORM TAMBAH/EDIT KANDIDAT */}
      {showAddForm && (
        <div className="fixed inset-0 bg-slate-900/80 z-[60] flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden">
            {/* Header Modal */}
            <div className="bg-slate-900 p-4 flex justify-between items-center border-b border-slate-800">
              <h3 className="text-amber-500 font-bold flex items-center gap-2">
                {isEditMode ? <Edit size={18}/> : <Plus size={18}/>} {modalTitle}
              </h3>
              <button onClick={handleCloseForm} className="text-slate-400 hover:text-white transition"><X size={20}/></button>
            </div>
            
            {/* Body Modal */}
            <div className="p-6 max-h-[80vh] overflow-y-auto">
              <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* Menambahkan input hidden untuk ID di mode edit, jika diperlukan backend */}
                {isEditMode && (
                  <input type="hidden" name="id" value={editingCandidate.id} />
                )}

                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 block">Nama Kandidat</label>
                  <input 
                    name="name" 
                    placeholder="Contoh: Budi Santoso" 
                    required 
                    defaultValue={editingCandidate?.name || ''} 
                    className="w-full p-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500" 
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 block">Nomor Urut</label>
                  <input 
                    name="number" 
                    type="number" 
                    placeholder="1" 
                    required 
                    defaultValue={editingCandidate?.number || ''} 
                    className="w-full p-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500" 
                  />
                </div>
                
                {/* --- INPUT DATA DIRI BARU --- */}
                
                {/* Input NIM */}
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 block">NIM</label>
                  <input 
                    name="nim" 
                    placeholder="Contoh: 12345678" 
                    required 
                    defaultValue={editingCandidate?.nim || ''} 
                    className="w-full p-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500" 
                  />
                </div>

                {/* Input Tempat Lahir */}
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 block">Tempat Lahir</label>
                  <input 
                    name="tempat_lahir" 
                    placeholder="Contoh: Jakarta" 
                    required 
                    defaultValue={editingCandidate?.tempat_lahir || ''} 
                    className="w-full p-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500" 
                  />
                </div>

                {/* Input Tanggal Lahir */}
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 block">Tanggal Lahir</label>
                  <input 
                    name="tanggal_lahir" 
                    type="date"
                    required 
                    defaultValue={editingCandidate?.tanggal_lahir || ''} 
                    className="w-full p-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500" 
                  />
                </div>

                {/* Input Jenis Kelamin */}
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 block">Jenis Kelamin</label>
                  <select
                    name="jenis_kelamin"
                    required
                    defaultValue={editingCandidate?.jenis_kelamin || ''}
                    className="w-full p-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                  >
                    <option value="" disabled>Pilih Jenis Kelamin</option>
                    <option value="Laki-laki">Laki-laki</option>
                    <option value="Perempuan">Perempuan</option>
                  </select>
                </div>
                
                {/* Input Fakultas */}
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 block">Fakultas</label>
                  <input 
                    name="fakultas" 
                    placeholder="Contoh: Fakultas Teknik" 
                    required 
                    defaultValue={editingCandidate?.fakultas || ''} 
                    className="w-full p-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500" 
                  />
                </div>

                {/* Input Prodi */}
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 block">Program Studi (Prodi)</label>
                  <input 
                    name="prodi" 
                    placeholder="Contoh: Teknik Informatika" 
                    required 
                    defaultValue={editingCandidate?.prodi || ''} 
                    className="w-full p-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500" 
                  />
                </div>

                {/* Input Status */}
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 block">Status (Contoh: Mahasiswa)</label>
                  <input 
                    name="status" 
                    placeholder="Contoh: Mahasiswa Aktif" 
                    required 
                    defaultValue={editingCandidate?.status || ''} 
                    className="w-full p-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500" 
                  />
                </div>

                {/* --- END: INPUT DATA DIRI BARU --- */}


                {/* START: INPUT UNTUK UPLOAD FILE FOTO */}
                <div className="border p-4 rounded-xl border-slate-200">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 block flex items-center gap-2"><ImageIcon size={14}/> {isEditMode ? 'Ganti Foto Kandidat' : 'Pilih Foto Kandidat (File)'}</label>
                  
                  {isEditMode && !candidatePhoto && (
                    <p className="text-xs text-slate-500 mb-2">
                      <span className="font-bold">Foto saat ini:</span> {editingCandidate.photo_url ? 'Sudah Ada' : 'Belum Ada'}. Kosongkan jika tidak ingin diubah.
                    </p>
                  )}
                  
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={(e) => setCandidatePhoto(e.target.files[0])} 
                    required={!isEditMode} // FOTO WAJIB di mode Tambah, opsional di mode Edit
                    className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-amber-50 file:text-amber-700 hover:file:bg-amber-100 p-3 border border-slate-200 rounded-xl" 
                  />
                </div>
                {/* END: INPUT UNTUK UPLOAD FILE FOTO */}

                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 block">Visi Singkat</label>
                  <textarea 
                    name="vision" 
                    placeholder="Visi kandidat..." 
                    required 
                    defaultValue={editingCandidate?.vision || ''} 
                    className="w-full p-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500" 
                    rows="2" 
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 block">Misi</label>
                  <textarea 
                    name="mission" 
                    placeholder="Misi kandidat..." 
                    required 
                    defaultValue={editingCandidate?.mission || ''} 
                    className="w-full p-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500" 
                    rows="3" 
                  />
                </div>

                <button type="submit" className="w-full bg-slate-900 text-white py-3 rounded-xl text-sm font-bold hover:bg-slate-800 transition flex items-center justify-center gap-2 mt-4 shadow-lg">
                  <Save size={18}/> {submitButtonText}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
      
      {/* List Kandidat (Modifikasi onDetailClick) */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1,2,3].map(i => (
            <div key={i} className="h-80 bg-slate-200 rounded-2xl animate-pulse"></div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {candidates.map(c => (
            <CandidateCard 
                key={c.id} 
                candidate={c} 
                role={role} 
                onVote={onVote} 
                onViewDetail={() => onViewDetail(c.id)} // Ganti ke ID
                onDelete={onDelete} 
                onEdit={handleEditClick} 
                hasVoted={hasVoted} 
              />
          ))}
        </div>
      )}
    </div>
  );
};

export default CandidatesPage;