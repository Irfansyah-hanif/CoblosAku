import React from 'react'; 
import { Plus, Edit, Trash2 } from 'lucide-react';

const NewsPage = ({ news, role, onAddNews, onViewDetail, onEditNews, onDeleteNews }) => {
    
    // Helper untuk format tanggal agar aman (mendukung date atau created_at)
    const getDisplayDate = (item) => {
        const dateStr = item.date || item.created_at;
        if (!dateStr) return '';
        try {
            return new Date(dateStr).toLocaleDateString('id-ID', {
                day: 'numeric', month: 'long', year: 'numeric'
            });
        } catch (e) {
            return dateStr;
        }
    };

    return (
    <div className="p-6 animate-fade-in pb-24">
      <div className="mb-6 border-l-4 border-amber-500 pl-3">
            <h2 className="text-2xl font-bold text-slate-900 font-serif">Berita</h2>
            <p className="text-slate-500 text-xs mt-1">Informasi seputar pemilihan umum.</p>
      </div>
        
      <div className="space-y-4">
        {news.length === 0 ? (
            <div className="text-center py-10 bg-white rounded-xl border border-dashed border-slate-300">
                <p className="text-slate-400">Belum ada berita.</p>
            </div>
        ) : (
            news.map(n => (
               <div 
                   key={n.id} 
                   className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 transition-shadow duration-300 hover:shadow-lg" 
               >
                   <div 
                       onClick={() => onViewDetail(n)} 
                       className="cursor-pointer"
                   >
                       <h3 className="font-bold text-slate-900 font-serif mb-1">{n.title}</h3>
                       <p className="text-xs text-slate-400 mb-3">{getDisplayDate(n)}</p>
                       <p className="text-sm text-slate-600 leading-relaxed line-clamp-2">{n.content}</p> 
                   </div>

                   {/* Tombol Aksi Admin */}
                   {role === 'admin' && (
                       <div className="mt-4 pt-4 border-t border-slate-100 flex justify-end gap-2"
                           onClick={(e) => e.stopPropagation()} 
                       >
                           <button 
                               onClick={() => onEditNews(n)} 
                               className="text-slate-500 hover:text-blue-500 p-1 rounded-full transition"
                               title="Edit Berita"
                           >
                               <Edit size={18} />
                           </button>
                           <button 
                               onClick={() => onDeleteNews(n.id)}
                               className="text-slate-500 hover:text-red-500 p-1 rounded-full transition"
                               title="Hapus Berita"
                           >
                               <Trash2 size={18} />
                           </button>
                       </div>
                   )}
               </div>
            ))
        )}
      </div>

      {role === 'admin' && (
        <button 
          onClick={onAddNews} 
          className="w-full py-4 bg-slate-900 text-white rounded-2xl border border-dashed border-slate-700 font-bold flex items-center justify-center gap-2 mt-6 hover:bg-slate-800 transition"
        >
          <Plus size={18}/> Tambah Berita
        </button>
      )}
    </div>
  );
};

export default NewsPage;