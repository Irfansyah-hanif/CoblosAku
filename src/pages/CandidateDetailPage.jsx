// coblos-aku\src\pages\CandidateDetailPage.jsx
import React from 'react';
import { Award, Info, User, ChevronLeft, Calendar, Mail, GraduationCap, CheckCircle } from 'lucide-react'; // Tambah CheckCircle
// Hapus useNavigate, karena kita menggunakan prop onBack yang dikirim dari App.jsx
// import { useNavigate } from 'react-router-dom'; 


// Catatan: Prop 'candidate' ini harusnya di-fetch/ditemukan berdasarkan ID dari rute.
// Tambahkan onBack ke destructuring props
const CandidateDetailPage = ({ candidate, onVote, role, hasVoted, isLoading, onBack }) => {
  // Hapus baris useNavigate()
  // const navigate = useNavigate();
  
  // Jika sedang memuat data
  if (isLoading) {
    return (
      <div className="p-6 animate-fade-in max-w-2xl mx-auto">
        <div className="h-96 bg-slate-200 rounded-2xl animate-pulse"></div>
        <div className="mt-8 space-y-4">
          <div className="h-6 w-3/4 bg-slate-200 rounded"></div>
          <div className="h-4 w-1/2 bg-slate-200 rounded"></div>
          <div className="h-40 bg-slate-200 rounded-xl"></div>
        </div>
      </div>
    );
  }

  // Jika kandidat tidak ditemukan
  if (!candidate) {
    return (
      <div className="p-6 animate-fade-in max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-slate-900">Kandidat Tidak Ditemukan</h2>
        <p className="text-slate-500 mt-2">Data kandidat tidak tersedia atau telah dihapus.</p>
        <button 
            // Gunakan onBack yang seharusnya membawa kembali ke daftar kandidat
            onClick={onBack} 
            className="mt-4 text-amber-600 flex items-center gap-1 hover:text-amber-500 transition"
        >
            <ChevronLeft size={16}/> Kembali ke Daftar Kandidat
        </button>
      </div>
    );
  }

  // Fungsi untuk memproses string misi (sama seperti di modal sebelumnya)
  const formatMission = (missionString) => {
    if (!missionString) return [];
    
    const missions = missionString.split(/\s*\n\s*/); // Split berdasarkan \n dengan spasi di sekitarnya
    
    return missions
      .filter(m => m.trim() !== '') 
      .map(m => {
        // Hapus penomoran seperti "1.", "2.", dll., jika ada di awal string
        return m.trim().replace(/^[\d\.\s\-\*]+\s*/, '');
      });
  };

  const missionsList = formatMission(candidate.mission);
  
  // Format tanggal lahir (Contoh: "1999-12-31" menjadi "31 Desember 1999")
  const formatTanggalLahir = (dateString) => {
    if (!dateString) return 'Tidak tersedia';
    try {
      return new Date(dateString).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });
    } catch (e) {
      return dateString; // Kembali ke string asli jika gagal
    }
  };


  return (
    <div className="p-6 animate-fade-in pb-24 max-w-3xl mx-auto">
      <button 
        onClick={onBack} // <== Ganti navigate(-1) menjadi onBack()
        className="text-slate-600 flex items-center gap-1 mb-6 hover:text-slate-800 transition"
      >
        <ChevronLeft size={20}/> Kembali
      </button>

      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100">
        
        {/* Header dan Foto */}
        <div className="relative bg-slate-900/90 p-8 pt-16">
          <div className="absolute top-4 right-4 bg-amber-500 text-slate-900 px-4 py-1.5 rounded-full text-lg font-extrabold shadow-md">
            No. Urut {candidate.number}
          </div>
          <div className="flex items-center gap-6">
            <div className="w-28 h-28 rounded-full border-4 border-amber-500 bg-slate-200 overflow-hidden shadow-xl shrink-0">
              <img 
                src={candidate.photo_url || "https://placehold.co/150x150?text=Foto"} 
                alt={candidate.name} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className='text-white'>
              <p className="text-sm font-light text-amber-300">Calon Ketua</p>
              <h1 className="text-3xl font-bold leading-tight mt-1">{candidate.name}</h1>
            </div>
          </div>
        </div>
        
        <div className="p-6 space-y-8">
          
          {/* Bagian Data Diri */}
          <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
            <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2 text-lg uppercase tracking-wider border-b pb-2"><User size={20} className="text-amber-500"/> Data Diri</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 text-sm">
              <DetailItem icon={Mail} label="NIM" value={candidate.nim} />
              <DetailItem icon={Calendar} label="TTL" value={`${candidate.tempat_lahir || 'N/A'}, ${formatTanggalLahir(candidate.tanggal_lahir)}`} /> {/* Ganti label menjadi TTL */}
              <DetailItem icon={User} label="Jenis Kelamin" value={candidate.jenis_kelamin} />
              <DetailItem icon={GraduationCap} label="Fakultas" value={candidate.fakultas} />
              <DetailItem icon={GraduationCap} label="Program Studi" value={candidate.prodi} />
              <DetailItem icon={Info} label="Status" value={candidate.status} />
            </div>
          </div>

          {/* Bagian Visi */}
          <div className="p-6 rounded-xl border border-amber-300 bg-amber-50/50">
            <h3 className="font-bold text-slate-900 mb-3 flex items-center gap-2 text-xl uppercase tracking-wider"><Award size={20} className="text-amber-700"/> Visi</h3>
            <p className="text-slate-800 leading-relaxed whitespace-pre-wrap">{candidate.vision || 'Visi belum tersedia.'}</p> {/* Tambahkan whitespace-pre-wrap */}
          </div>
          
          {/* Bagian Misi */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2 text-xl uppercase tracking-wider"><Info size={20} className="text-amber-500"/> Misi</h3>
            {missionsList.length > 0 ? (
              <ul className="space-y-3 list-none p-0">
                {missionsList.map((m, i) => (
                  <li key={i} className="flex gap-3 text-base text-slate-700">
                    <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 shrink-0"></div>
                    <span className="leading-relaxed">{m}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-slate-500 text-base">Misi belum tersedia.</p>
            )}
          </div>
          
          {/* Tombol Coblos (Hanya untuk Voter yang Belum Memilih) */}
          {role === 'voter' && !hasVoted && (
            <div className="sticky bottom-0 bg-white border-t border-slate-100 p-4 -mx-6 -mb-6 shadow-t-xl">
              <button 
                onClick={() => onVote(candidate.id)} 
                className="w-full py-3 bg-amber-500 text-slate-900 rounded-xl text-lg font-bold hover:bg-amber-400 shadow-lg shadow-amber-300 transition-all active:scale-[0.99] flex items-center justify-center gap-3"
              >
                <CheckCircle size={24} /> Coblos Kandidat Ini
              </button>
            </div>
          )}
          {role === 'voter' && hasVoted && (
            <div className="p-3 bg-green-50 text-green-700 rounded-xl text-center font-bold">
              <CheckCircle size={20} className="inline-block mr-2"/> Anda **SUDAH** memberikan suara Anda.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Komponen bantu untuk item detail
const DetailItem = ({ icon: Icon, label, value }) => (
    <div className='flex items-start gap-3'>
        <Icon size={18} className='text-amber-500 mt-0.5 shrink-0'/>
        <div>
            <p className='text-xs font-bold text-slate-500 uppercase tracking-wider'>{label}</p>
            <p className='text-slate-700 font-medium leading-snug'>{value || 'N/A'}</p>
        </div>
    </div>
);

export default CandidateDetailPage;