import React, { useState } from 'react';
import { Mail, Lock, UserPlus, LogIn } from 'lucide-react';

// Props:
// onLogin: function untuk menangani login
// onRegister: function untuk menangani pendaftaran (hanya untuk voter)
// role: 'admin' atau 'voter'
// onBack: function untuk kembali ke halaman pemilihan peran
const AuthForm = ({ onLogin, onRegister, role, onBack }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isVoter = role === 'voter';
  const title = isVoter ? 'PEMILIH' : 'ADMIN';

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isRegister && isVoter) {
      onRegister({ email, password, role: 'voter' });
    } else {
      onLogin({ email, password, role });
    }
  };

  return (
    <div className="bg-slate-800 p-8 rounded-xl shadow-2xl w-full max-w-sm border border-slate-700">
      <h2 className="text-xl font-bold text-white mb-6 text-center">
        Masuk Sebagai {title}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Input Email */}
        <div>
          <label htmlFor="email" className="sr-only">Email</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full pl-10 pr-4 py-3 bg-slate-900 text-white rounded-lg border border-slate-700 focus:ring-amber-500 focus:border-amber-500 transition"
            />
          </div>
        </div>

        {/* Input Password */}
        <div>
          <label htmlFor="password" className="sr-only">Password</label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full pl-10 pr-4 py-3 bg-slate-900 text-white rounded-lg border border-slate-700 focus:ring-amber-500 focus:border-amber-500 transition"
            />
          </div>
        </div>

        {/* Tombol Submit (Login / Register) */}
        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 bg-amber-500 text-slate-900 font-bold py-3 rounded-lg hover:bg-amber-400 transition shadow-lg shadow-amber-500/30"
        >
          {isRegister && isVoter ? <UserPlus size={20} /> : <LogIn size={20} />}
          {isRegister && isVoter ? 'Daftar Sekarang' : 'Masuk'}
        </button>
      </form>

      {/* Tombol Pindah ke Register/Login (Hanya untuk Voter) */}
      {isVoter && (
        <div className="mt-4 text-center">
          <button
            onClick={() => setIsRegister(!isRegister)}
            className="text-sm text-slate-400 hover:text-amber-500 transition underline"
          >
            {isRegister
              ? 'Sudah punya akun? Masuk di sini.'
              : 'Belum punya akun? Daftar sebagai Pemilih.'
            }
          </button>
        </div>
      )}

      {/* Tombol Kembali */}
      <div className="mt-6">
        <button
          onClick={onBack}
          className="w-full text-sm text-slate-400 hover:text-white transition py-2 rounded-lg border border-slate-700 hover:bg-slate-700"
        >
          ← Kembali ke Pemilihan Peran
        </button>
      </div>
    </div>
  );
};

export default AuthForm;