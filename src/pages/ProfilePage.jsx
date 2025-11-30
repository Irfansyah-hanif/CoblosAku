import React from 'react';
import { User, LogOut } from 'lucide-react';

const ProfilePage = ({ user, role, onLogout }) => (
  <div className="p-6 animate-fade-in pb-24 md:pb-10">
    <div className="mb-6 border-l-4 border-amber-500 pl-3">
       <h2 className="text-2xl font-bold text-slate-900 font-serif">Profil</h2>
     </div>
     
    {/* Kartu User Info */}
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 flex flex-col items-center mb-6">
       <div className="w-24 h-24 bg-slate-900 rounded-full flex items-center justify-center text-amber-500 mb-4 shadow-lg shadow-slate-200">
         <User size={40}/>
       </div>
       <h3 className="font-bold text-xl capitalize text-slate-900 font-serif">{role}</h3>
       <p className="text-xs text-slate-400 mt-1 font-mono">ID: {user?.id}</p>
    </div>

    {/* Logout Button */}
    <button 
      onClick={onLogout} 
      className="w-full bg-red-50 text-red-600 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 border border-red-100 hover:bg-red-100 transition"
    >
      <LogOut size={18} /> Keluar
    </button>
  </div>
);

export default ProfilePage;