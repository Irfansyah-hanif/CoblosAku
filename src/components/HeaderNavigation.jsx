import React from 'react';
import { LogOut, User } from 'lucide-react';

const HeaderNavigation = ({ activeTab, setActiveTab, role, user, onLogout }) => {
  const navItems = [
    { id: 'home', label: 'Beranda' },
    { id: 'candidates', label: 'Kandidat' },
    { id: 'voting', label: 'Hasil Voting' },
    { id: 'news', label: 'Berita' },
  ];

  const isUserLoggedIn = role === 'voter' || role === 'admin';

  return (
    <nav className="hidden md:block fixed top-0 left-0 right-0 bg-slate-900 border-b border-slate-800 z-50 shadow-xl">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          
          {/* LOGO & BRAND TEXT (Updated Style) */}
          <div 
            className="flex items-center gap-3 cursor-pointer group" 
            onClick={() => setActiveTab('home')}
          >
            <img 
              src="/coblosaku.png" 
              alt="Coblos Aku" 
              className="h-10 w-auto object-contain" 
            />
            
            {/* Style disamakan dengan referensi: Font Bold White + Amber Italic Serif */}
            {/* Ukuran disesuaikan menjadi text-2xl agar pas di navbar */}
            <h1 className="text-2xl font-bold text-white tracking-tight group-hover:opacity-90 transition-opacity">
              COBLOS <span className="text-amber-500 italic font-serif">AKU</span>
            </h1>
          </div>

          {/* MENU TENGAH */}
          <div className="flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`text-sm font-medium transition-all duration-200 hover:text-amber-400 relative ${
                  activeTab === item.id 
                    ? 'text-amber-500' 
                    : 'text-slate-400'
                }`}
              >
                {item.label}
                {activeTab === item.id && (
                  <span className="absolute -bottom-8 left-0 right-0 h-1 bg-amber-500 rounded-t-full"></span>
                )}
              </button>
            ))}
          </div>

          {/* USER PROFILE & LOGOUT */}
          {isUserLoggedIn ? (
            <div className="flex items-center gap-4">
              <div 
                className="flex items-center gap-3 cursor-pointer hover:bg-slate-800 py-1.5 px-3 rounded-lg transition border border-transparent hover:border-slate-700"
                onClick={() => setActiveTab('profile')}
              >
                <div className="text-right">
                  <p className="text-sm font-bold text-white capitalize leading-none mb-1">{role}</p>
                  <p className="text-[10px] text-slate-400 font-mono">ID: {user?.id?.substring(0, 6)}</p>
                </div>
                <div className="w-9 h-9 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center text-slate-900 shadow-lg">
                  <User size={18} strokeWidth={2.5} />
                </div>
              </div>
              
              <div className="h-8 w-px bg-slate-700 mx-1"></div>

              <button 
                onClick={onLogout}
                className="p-2.5 text-red-500 hover:text-white hover:bg-red-500 rounded-full transition-all"
                title="Keluar Aplikasi"
              >
                <LogOut size={20} />
              </button>
            </div>
          ) : (
             <button
                onClick={onLogout} 
                className="flex items-center gap-2 text-white bg-red-600 px-3 py-1.5 rounded-lg border border-red-500/50 hover:bg-red-700 transition text-sm font-medium"
             >
                <LogOut size={16} /> Keluar (Pilih Peran)
             </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default HeaderNavigation;