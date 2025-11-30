import React from 'react';
import { ArrowLeft, Edit } from 'lucide-react';

const NewsDetailPage = ({ newsItem, onBack, role, onEditNews }) => {
    if (!newsItem) return null;

    // Helper untuk format tanggal
    const getDisplayDate = (item) => {
        const dateStr = item.date || item.created_at;
        if (!dateStr) return '';
        try {
            return new Date(dateStr).toLocaleDateString('id-ID', {
                weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
            });
        } catch (e) {
            return dateStr;
        }
    };

    return (
        <div className="animate-fade-in pb-10">
            
            {/* Header / Tombol Kembali */}
            <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <button 
                        onClick={onBack} 
                        className="text-slate-900 hover:text-amber-600 transition p-2 rounded-full hover:bg-slate-100"
                    >
                        <ArrowLeft size={24} />
                    </button>
                    <h1 className="text-xl font-bold text-slate-900 font-serif">Detail Berita</h1>
                </div>

                {/* Tombol Edit (Hanya Admin) */}
                {role === 'admin' && onEditNews && (
                    <button 
                        onClick={() => onEditNews(newsItem)} 
                        className="text-slate-500 hover:text-blue-500 transition px-3 py-2 rounded-lg text-sm font-semibold flex items-center gap-1 border border-slate-200 hover:bg-blue-50"
                        title="Edit Berita"
                    >
                        <Edit size={16} /> Edit
                    </button>
                )}
            </div>

            {/* Isi Konten Berita */}
            <div className="bg-white p-6 rounded-2xl shadow-xl border border-slate-100">
                {/* Judul */}
                <h2 className="text-3xl font-bold text-slate-900 font-serif mb-3 leading-tight">
                    {newsItem.title}
                </h2>
                
                {/* Tanggal */}
                <p className="text-sm text-amber-600 font-medium mb-5 border-b pb-3 border-slate-100">
                    Dipublikasikan: {getDisplayDate(newsItem)}
                </p>
                
                {/* Konten Penuh */}
                <div className="text-slate-700 text-base leading-relaxed whitespace-pre-wrap">
                    {newsItem.content} 
                </div>
            </div>
        </div>
    );
};

export default NewsDetailPage;