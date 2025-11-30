import React from 'react';
import { Home, Users, BarChart, Bell, User, LogOut } from 'lucide-react'; // Import LogOut

const BottomNavigation = ({ activeTab, setActiveTab, role, onLogout }) => {
    // Definisi item navigasi utama
    const baseNavItems = [
        { id: 'home', icon: Home, label: 'Beranda' },
        { id: 'candidates', icon: Users, label: 'Kandidat' },
        { id: 'voting', icon: BarChart, label: 'Hasil' },
        { id: 'news', icon: Bell, label: 'Berita' },
    ];

    // Filter item navigasi
    let navItems = [...baseNavItems];
    let showLogoutButton = false;

    // Jika peran adalah 'voter' atau 'admin', tambahkan 'profile'. 
    if (role === 'voter' || role === 'admin') {
        navItems.push({ id: 'profile', icon: User, label: 'Profil' });
    } else {
        // Jika mode tamu (role=null), kita akan menunjukkan tombol Logout di sebelah kanan.
        showLogoutButton = true;
    }
    
    // Hitung lebar agar tombol logout memiliki ruang sendiri
    const itemWidthClass = showLogoutButton ? 'w-1/5' : 'w-1/4';

    return (
        <nav className="fixed bottom-0 left-0 right-0 md:hidden bg-white border-t border-slate-200 z-50 shadow-2xl shadow-slate-300/50">
            <div className="flex justify-around items-center h-16 w-full max-w-xl mx-auto">
                {navItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => setActiveTab(item.id)}
                        // Pastikan lebar konsisten
                        className={`flex flex-col items-center justify-center p-2 transition-colors ${itemWidthClass} ${
                            activeTab === item.id 
                                ? 'text-amber-600' 
                                : 'text-slate-500 hover:text-slate-700'
                        }`}
                    >
                        <item.icon size={20} strokeWidth={activeTab === item.id ? 2.5 : 2} />
                        <span className="text-[10px] font-semibold mt-1">
                            {item.label}
                        </span>
                    </button>
                ))}
                
                {/* Tombol Logout untuk Mode Tamu (Pengganti Profil) */}
                {showLogoutButton && (
                    <button
                        onClick={onLogout}
                        // Pastikan lebar konsisten
                        className={`flex flex-col items-center justify-center p-2 transition-colors text-red-500 hover:text-red-600 ${itemWidthClass}`}
                        title="Keluar (Pilih Peran)"
                    >
                        <LogOut size={20} />
                        <span className="text-[10px] font-semibold mt-1">
                            Keluar
                        </span>
                    </button>
                )}

            </div>
        </nav>
    );
};

export default BottomNavigation;