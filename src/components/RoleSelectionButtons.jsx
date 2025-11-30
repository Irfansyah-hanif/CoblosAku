import React from 'react';
import { Lock, Users, User } from 'lucide-react';

const RoleSelectionButtons = ({ onSelectRole }) => (
    <div className="w-full max-w-sm space-y-4 bg-slate-800/50 p-8 rounded-2xl backdrop-blur-md border border-slate-700 shadow-xl relative z-10">
        <p className="text-xs text-center mb-4 font-bold text-slate-400 uppercase tracking-widest">Masuk Sebagai</p>
        
        {/* Tombol Admin: Meminta Login Form */}
        <button 
            onClick={() => onSelectRole('admin')} 
            className="w-full bg-slate-700 text-white py-3.5 rounded-xl font-bold hover:bg-slate-600 transition shadow-lg flex justify-center items-center gap-2 border border-slate-600"
        >
            <Lock size={16}/> Admin
        </button>
        
        {/* Tombol Pemilih: Meminta Login/Register Form */}
        <button 
            onClick={() => onSelectRole('voter')} 
            className="w-full bg-amber-500 text-slate-900 py-3.5 rounded-xl font-bold hover:bg-amber-400 transition shadow-lg flex justify-center items-center gap-2"
        >
            <Users size={16}/> Pemilih
        </button>
        
        {/* Tombol Tamu: Langsung Login (Memanggil onGuestLogin yang sudah ada) */}
        <button 
            onClick={() => onSelectRole('guest')} 
            className="w-full bg-transparent text-slate-300 py-3.5 rounded-xl font-bold hover:bg-slate-700/50 transition border border-slate-600 flex justify-center items-center gap-2"
        >
            <User size={16}/> Tamu
        </button>
    </div>
);

export default RoleSelectionButtons;