import React from 'react';
// Tambahkan User dan GraduationCap untuk data diri
import { Award, Info, X, User, GraduationCap } from 'lucide-react'; 

const CandidateDetailModal = ({ candidate, onClose }) => {
  if (!candidate) return null;

  // Fungsi untuk memproses string misi (tetap sama)
  const formatMission = (missionString) => {
    if (!missionString) return [];
    
    // Menggunakan regex untuk memisahkan string berdasarkan '\n' diikuti oleh angka atau karakter.
    const missions = missionString.split(/\s*\\n\s*/); // Split berdasarkan \n dengan spasi di sekitarnya
    
    // Membersihkan setiap item misi
    return missions
      .filter(m => m.trim() !== '') // Hilangkan string kosong
      .map(m => {
        // Hapus penomoran seperti "1.", "2.", dll., jika ada di awal string
        return m.trim().replace(/^[\d\.\s\-\*]+\s*/, '');
      });
  };

  const missionsList = formatMission(candidate.mission);

  return (
    <div className="fixed inset-0 bg-slate-900/80 z-50 flex items-end sm:items-center justify-center sm:p-4 backdrop-blur-sm animate-fade-in">
      <div className="bg-white w-full sm:max-w-md h-[85vh] sm:h-auto sm:rounded-2xl rounded-t-3xl flex flex-col shadow-2xl overflow-hidden">
        {/* Header Modal */}
        <div className="p-4 border-b flex justify-between items-center bg-white z-10 sticky top-0">
          <div className="flex items-center gap-3">
            {/* FOTO KANDIDAT */}
            <div className="w-10 h-10 rounded-full bg-slate-100 overflow-hidden border border-slate-200">
              <img 
                src={candidate.photo_url || "https://placehold.co/100x100?text=Foto"} 
                alt={candidate.name} 
                className="w-full h-full object-cover"
                onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/100x100/E2E8F0/64748B?text=FOTO" }}
              />
            </div>
            <div>
              <h2 className="font-bold text-slate-900 leading-none">{candidate.name}</h2>
              <p className="text-xs text-amber-600 font-medium mt-1">No. Urut {candidate.number}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 bg-slate-50 rounded-full hover:bg-slate-100 transition">
            <X size={20} className="text-slate-600" />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto bg-slate-50 p-6 space-y-5">
          
          {/* BAGIAN BARU: DATA DIRI & STATUS */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-slate-900 mb-3 flex items-center gap-2 text-sm uppercase tracking-wider border-b pb-2">
                <User size={16} className="text-slate-500"/> Data Diri
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center text-sm text-slate-700">
                <span className="flex items-center gap-2 font-semibold">
                  <GraduationCap size={14} className="text-amber-500"/> NIM
                </span>
                <span className="font-medium text-slate-900">{candidate.nim || '-'}</span>
              </div>
              <div className="flex justify-between items-center text-sm text-slate-700">
                <span className="flex items-center gap-2 font-semibold">
                  <Info size={14} className="text-amber-500"/> Status Akademik
                </span>
                <span className={`font-bold ${candidate.status === 'Aktif' ? 'text-green-600' : 'text-red-600'}`}>
                  {candidate.status || 'Tidak Diketahui'}
                </span>
              </div>
            </div>
          </div>
          
          {/* Visi */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-slate-900 mb-3 flex items-center gap-2 text-sm uppercase tracking-wider"><Award size={16} className="text-amber-500"/> Visi</h3>
            <p className="text-slate-700 text-sm leading-relaxed">{candidate.vision || 'Visi belum tersedia.'}</p>
          </div>
          
          {/* Misi */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-slate-900 mb-3 flex items-center gap-2 text-sm uppercase tracking-wider"><Info size={16} className="text-amber-500"/> Misi</h3>
            {missionsList.length > 0 ? (
              <ul className="space-y-3">
                {missionsList.map((m, i) => (
                  <li key={i} className="flex gap-3 text-sm text-slate-700">
                    <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-1.5 shrink-0"></div>
                    <span>{m}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-slate-500 text-sm">Misi belum tersedia.</p>
            )}
          </div>
          
          {/* Info Tambahan (tetap) */}
          {candidate.extraInfo && (
              <div className="bg-slate-900 p-5 rounded-xl border border-slate-800 shadow-sm">
                <h3 className="font-bold text-amber-500 mb-2 text-sm">Info Tambahan</h3>
                <p className="text-slate-300 text-sm">{candidate.extraInfo}</p>
              </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CandidateDetailModal;