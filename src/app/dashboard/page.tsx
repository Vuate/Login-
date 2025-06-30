'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import { User } from '@supabase/supabase-js'

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) {
        router.push('/login')
      } else {
        setUser(data.session.user)
      }
    })
  }, [router])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  if (!user) return <div>Yükleniyor...</div>

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl mb-6">Hoşgeldin, {user.email}</h1>
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 rounded"
      >
        Çıkış Yap
      </button>
    </div>
  )
}
