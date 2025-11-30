import React, { useState } from 'react';
import { Vote } from 'lucide-react';

// Import komponen baru
import AuthForm from '../components/AuthForm'; // Asumsi: Anda sudah membuat ini
import RoleSelectionButtons from '../components/RoleSelectionButtons'; // Komponen yang baru kita pisahkan

// Perbarui props yang diterima dari App.jsx
const LoginPage = ({ onLogin, onRegister, onGuestLogin }) => { 
    // State untuk menentukan peran mana yang sedang mencoba login.
    // null: Tampilkan tombol pemilihan peran.
    // 'admin' atau 'voter': Tampilkan formulir AuthForm.
    const [selectedRole, setSelectedRole] = useState(null); 
    
    // Handler untuk tombol di RoleSelectionButtons
    const handleSelectRole = (role) => {
        if (role === 'guest') {
            // Jika memilih tamu, langsung panggil onGuestLogin dari App.jsx
            onGuestLogin();
        } else {
            // Jika memilih admin/voter, tampilkan formulir login
            setSelectedRole(role);
        }
    };
    
    // Komponen Header dan Background (agar tidak duplikasi)
    const Header = () => (
        <>
            {/* Background Effects */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-amber-500/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl"></div>
            
            {/* Logo Area */}
            <div className="w-24 h-24 bg-slate-800 rounded-3xl flex items-center justify-center mb-8 shadow-2xl relative z-10 border border-slate-700">
                <Vote className="text-amber-500 w-12 h-12" />
            </div>
            
            <h1 className="text-4xl font-bold mb-2 tracking-tight relative z-10">COBLOS <span className="text-amber-500 italic">AKU</span></h1>
            <p className="text-slate-400 mb-12 text-center text-sm font-medium relative z-10 max-w-xs">Sistem Pemilihan Terpercaya & Elegan</p>
        </>
    );

    return (
        <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-6 text-white relative overflow-hidden">
            <Header />

            {selectedRole ? (
                // Tampilan 2: Formulir Login/Register
                <AuthForm 
                    onLogin={onLogin}         // Dari App.jsx
                    onRegister={onRegister}   // Dari App.jsx
                    role={selectedRole}       // 'admin' atau 'voter'
                    onBack={() => setSelectedRole(null)} // Kembali ke pemilihan peran
                />
            ) : (
                // Tampilan 1: Tombol Pemilihan Peran
                <RoleSelectionButtons onSelectRole={handleSelectRole} />
            )}
        </div>
    );
};

export default LoginPage;