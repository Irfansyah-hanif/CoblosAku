import React, { useState } from 'react';
import { Vote, Lock, User, UserCheck, LogOut } from 'lucide-react';
import AuthForm from '../components/AuthForm'; // Pastikan path benar

const RoleSelectionPage = ({ setRole, loginUser, registerUser }) => {
  // State untuk mengontrol peran mana yang sedang mencoba login/register
  const [selectedRole, setSelectedRole] = useState(null); // null, 'admin', atau 'voter'

  // Fungsi yang dipanggil ketika user memilih peran
  const handleRoleSelect = (role) => {
    // Jika memilih 'guest', langsung ubah peran
    if (role === 'guest') {
      setRole('guest'); // setRole harus mengarah ke state di App.jsx atau konteks
    } else {
      // Jika memilih 'admin' atau 'voter', tampilkan formulir login
      setSelectedRole(role);
    }
  };

  // Fungsi untuk menangani login dari AuthForm
  const handleLogin = ({ email, password, role }) => {
    // Lakukan proses otentikasi (API call ke backend) di sini
    console.log(`Mencoba Login sebagai ${role} dengan: ${email} / ${password}`);
    // Setelah sukses login (misalnya dari API), panggil fungsi loginUser/setRole
    // loginUser({ id: '...', name: '...', role: role });
  };

  // Fungsi untuk menangani pendaftaran dari AuthForm
  const handleRegister = ({ email, password, role }) => {
    // Lakukan proses pendaftaran (API call ke backend) di sini
    console.log(`Mencoba Daftar sebagai Pemilih dengan: ${email} / ${password}`);
    // Setelah sukses register, mungkin langsung login atau kembali ke form login
    // registerUser({ id: '...', name: '...', role: role });
  };

  // Tampilkan formulir otentikasi jika peran dipilih
  if (selectedRole) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 p-4">
        <AuthForm 
          onLogin={handleLogin}
          onRegister={handleRegister}
          role={selectedRole}
          onBack={() => setSelectedRole(null)} // Tombol kembali
        />
      </div>
    );
  }

  // Tampilan awal Pemilihan Peran
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-900 p-4">
      {/* HEADER LOGO */}
      <div className="flex flex-col items-center mb-10">
        <div className="w-16 h-16 bg-slate-800 rounded-2xl flex items-center justify-center border border-slate-700 mb-3">
          <Vote className="text-amber-500 w-8 h-8" />
        </div>
        <h1 className="text-4xl font-extrabold text-white tracking-tight">
          COBLOS <span className="text-amber-500 italic">AKU</span>
        </h1>
        <p className="text-sm text-slate-400 mt-1">Sistem Pemilihan Terpercaya & Elegan</p>
      </div>

      {/* KOTAK PEMILIHAN PERAN */}
      <div className="bg-slate-800 p-6 rounded-xl shadow-2xl w-full max-w-xs border border-slate-700">
        <h3 className="text-sm font-semibold text-slate-300 tracking-wider mb-4 uppercase text-center">
          MASUK SEBAGAI
        </h3>

        <div className="space-y-3">
          {/* Tombol Admin (Memanggil formulir login) */}
          <button
            onClick={() => handleRoleSelect('admin')}
            className="w-full flex items-center justify-center gap-2 bg-slate-700 text-white py-3 rounded-lg hover:bg-slate-600 transition font-medium"
          >
            <Lock size={20} /> Admin
          </button>

          {/* Tombol Pemilih (Memanggil formulir login/register) */}
          <button
            onClick={() => handleRoleSelect('voter')}
            className="w-full flex items-center justify-center gap-2 bg-amber-500 text-slate-900 py-3 rounded-lg hover:bg-amber-400 transition font-bold shadow-lg shadow-amber-500/30"
          >
            <UserCheck size={20} /> Pemilih
          </button>

          {/* Tombol Tamu (Aksi tetap sama: langsung set role) */}
          <button
            onClick={() => handleRoleSelect('guest')}
            className="w-full flex items-center justify-center gap-2 bg-slate-700 text-slate-400 py-3 rounded-lg hover:bg-slate-600 transition font-medium border border-slate-600"
          >
            <User size={20} /> Tamu
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoleSelectionPage;