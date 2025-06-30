'use client'

import { useState} from 'react'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) setError(error.message)
    else window.location.href = '/'
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-purple-200 via-pink-100 to-blue-200">
      {/* Arka planda süzülen daireler */}
      <div className="absolute w-[1000px] h-[1000px] bg-pink-300 opacity-20 rounded-full top-[-400px] left-[-400px] blur-3xl animate-pulse" />
      <div className="absolute w-[700px] h-[700px] bg-blue-300 opacity-20 rounded-full bottom-[-300px] right-[-300px] blur-3xl animate-pulse" />

      <form
        onSubmit={handleLogin}
        className="z-10 bg-white p-8 rounded-2xl shadow-2xl w-full max-w-sm animate-fade-in"
      >
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Giriş Yap</h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          className="w-full p-3 mb-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
        />

        <input
          type="password"
          placeholder="Şifre"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          className="w-full p-3 mb-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
        />

        {error && <p className="text-red-500 mb-4 text-sm">{error}</p>}

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white p-3 rounded-xl font-semibold hover:opacity-90 transition-all"
        >
          Giriş Yap
        </button>

        <p className="mt-4 text-center text-sm text-gray-600">
          Hesabın yok mu?{' '}
          <Link href="/signup" className="text-purple-600 hover:underline font-medium">
            Kayıt Ol
          </Link>
        </p>
      </form>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 1s ease-out forwards;
        }
      `}</style>
    </div>
  )
}
