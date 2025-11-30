// coblos-aku\src\components\CandidateCard.jsx
import React from 'react';
import { Info, CheckCircle, Trash2, Edit } from 'lucide-react'; 

// Tambahkan onEdit sebagai prop
// Tambahkan onCardClick
const CandidateCard = ({ candidate, role, onVote, onViewDetail, onDelete, onEdit, hasVoted }) => ( 
  // Ganti div utama menjadi tombol atau div yang dapat diklik, dan panggil onViewDetail
  <div 
    className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden mb-4 transition-all hover:shadow-lg hover:ring-2 hover:ring-amber-200 cursor-pointer"
    onClick={() => onViewDetail(candidate.id)} // KLIK KARTU MEMBUKA DETAIL
  >
    {/* Header Navy */}
    <div className="h-32 bg-slate-900 relative">
      <div className="absolute top-3 right-3">
        <span className="bg-amber-500/20 backdrop-blur-md text-amber-500 px-3 py-1 rounded-full text-xs font-bold border border-amber-500/30">
          No. {candidate.number}
        </span>
      </div>
      <div className="absolute -bottom-10 left-4">
        <div className="w-20 h-20 rounded-full border-4 border-white bg-slate-200 overflow-hidden shadow-md">
          <img 
            src={candidate.photo_url || "https://placehold.co/100x100?text=Foto"} 
            alt={candidate.name} 
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
    <div className="pt-12 px-5 pb-5">
      {/* Tombol Edit dan Delete (Hanya Admin) */}
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-bold text-slate-900 leading-tight">{candidate.name}</h3>
          <p className="text-xs text-amber-600 font-semibold uppercase tracking-wide mt-1">Calon Ketua</p>
        </div>
        {role === 'admin' && (
          // Cegah propagasi klik agar tidak memicu onViewDetail saat mengklik tombol admin
          <div className="flex gap-1" onClick={(e) => e.stopPropagation()}> 
            {/* Tombol EDIT BARU */}
            <button 
                onClick={() => onEdit(candidate)} 
                className="text-slate-400 hover:text-blue-500 hover:bg-blue-50 p-2 rounded-full transition-colors"
            >
              <Edit size={18} />
            </button>
            {/* Tombol Delete */}
            <button onClick={() => onDelete(candidate.id)} className="text-slate-400 hover:text-red-500 hover:bg-red-50 p-2 rounded-full transition-colors">
              <Trash2 size={18} />
            </button>
          </div>
        )}
      </div>
      <p className="text-slate-500 text-sm mt-3 line-clamp-2 leading-relaxed">{candidate.vision || 'Visi belum diisi'}</p>
      
      {/* Hapus tombol 'Detail' */}
      <div className="mt-5 flex gap-3">
        {role === 'voter' && !hasVoted && (
          // Cegah propagasi klik agar tidak memicu onViewDetail saat mengklik tombol Coblos
          <button 
            onClick={(e) => {
              e.stopPropagation(); 
              onVote(candidate.id);
            }} 
            className="w-full py-2.5 px-3 bg-amber-500 text-slate-900 rounded-lg text-sm font-bold hover:bg-amber-400 shadow-lg shadow-amber-200 transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            <CheckCircle size={16} /> Coblos
          </button>
        )}
        {/* Jika sudah memilih, tampilkan status/tombol lain jika diperlukan */}
        {role === 'voter' && hasVoted && (
          <div className="w-full py-2.5 px-3 bg-slate-200 text-slate-700 rounded-lg text-sm font-bold flex items-center justify-center gap-2">
            Sudah Memilih
          </div>
        )}
      </div>
    </div>
  </div>
);

export default CandidateCard;