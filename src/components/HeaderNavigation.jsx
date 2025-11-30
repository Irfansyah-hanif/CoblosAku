import React from 'react';
import { Vote, LogOut, User } from 'lucide-react';

const HeaderNavigation = ({ activeTab, setActiveTab, role, user, onLogout }) => {
  const navItems = [
    { id: 'home', label: 'Beranda' },
    { id: 'candidates', label: 'Kandidat' },
    { id: 'voting', label: 'Hasil Voting' },
    { id: 'news', label: 'Berita' },
  ];

  // Tentukan apakah user sudah login (bukan mode tamu/null)
  const isUserLoggedIn = role === 'voter' || role === 'admin';

  return (
    // 'hidden md:block' artinya sembunyi di HP, muncul di layar medium/besar
    <nav className="hidden md:block fixed top-0 left-0 right-0 bg-slate-900 border-b border-slate-800 z-50 shadow-xl">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          
          {/* LOGO */}
          <div 
            className="flex items-center gap-3 cursor-pointer group" 
            onClick={() => setActiveTab('home')}
          >
            <div className="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center border border-slate-700 group-hover:border-amber-500 transition-colors">
              <Vote className="text-amber-500 w-6 h-6" />
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">
              COBLOS <span className="text-amber-500 italic">AKU</span>
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
                {/* Garis bawah aktif */}
                {activeTab === item.id && (
                  <span className="absolute -bottom-8 left-0 right-0 h-1 bg-amber-500 rounded-t-full"></span>
                )}
              </button>
            ))}
          </div>

          {/* USER PROFILE & LOGOUT */}
          {/* Tampilkan hanya jika user sudah login (role bukan null/tamu) */}
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
                // --- PERUBAHAN DI SINI: Ikon LogOut (User Login)
                className="p-2.5 text-red-500 hover:text-white hover:bg-red-500 rounded-full transition-all"
                title="Keluar Aplikasi"
              >
                <LogOut size={20} />
              </button>
            </div>
          ) : (
            // Jika mode tamu, tampilkan tombol Keluar/Pilih Peran
             <button
                onClick={onLogout} 
                // --- PERUBAHAN DI SINI: Tombol Keluar (Pilih Peran)
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