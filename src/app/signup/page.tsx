'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function SignUpPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
    })

    if (signUpError) {
      setError(signUpError.message)
      setLoading(false)
      return
    }

    const { error: insertError } = await supabase
      .from('users')
      .insert([{ email }])

    if (insertError) {
      setError('Kullanıcı veritabanına eklenirken hata oluştu: ' + insertError.message)
      setLoading(false)
      return
    }

    router.push('/login')
    setLoading(false)
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 via-blue-100 to-purple-100 overflow-hidden">
    
      <div className="absolute w-[800px] h-[800px] bg-purple-300 opacity-20 rounded-full top-[-300px] left-[-300px] blur-3xl animate-pulse" />
      <div className="absolute w-[600px] h-[600px] bg-green-300 opacity-20 rounded-full bottom-[-250px] right-[-250px] blur-3xl animate-pulse" />

      <form
        onSubmit={handleSignUp}
        className="z-10 bg-white p-8 rounded-2xl shadow-2xl w-full max-w-sm animate-fade-in"
      >
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Kayıt Ol</h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          className="w-full p-3 mb-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
        />

        <input
          type="password"
          placeholder="Şifre"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          className="w-full p-3 mb-6 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
        />

        {error && <p className="text-red-500 mb-4 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className={`w-full p-3 rounded-xl font-semibold text-white transition-all ${
            loading
              ? 'bg-green-300 cursor-not-allowed'
              : 'bg-green-500 hover:bg-green-600'
          }`}
        >
          {loading ? 'Kayıt oluyor...' : 'Kayıt Ol'}
        </button>
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
