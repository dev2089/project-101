'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase-client'
import { Eye, EyeOff, Lock, Mail } from 'lucide-react'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()
  const sb = createClient()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const { error } = await sb.auth.signInWithPassword({ email, password })
    if (error) { setError('Invalid email or password. Please try again.'); setLoading(false) }
    else router.push('/admin')
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: '#050503' }}>
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
            style={{ background: 'linear-gradient(135deg,#9A7A2E,#C9A84C)', boxShadow: '0 8px 32px rgba(201,168,76,0.4)' }}>
            <span className="font-display text-xl font-bold" style={{ color: '#080806' }}>NI</span>
          </div>
          <h1 className="font-display text-3xl mb-1" style={{ color: '#F0E6D3' }}>Admin Panel</h1>
          <p className="text-sm" style={{ color: '#8A7B6E' }}>The New Image Salon</p>
        </div>

        {/* Form */}
        <div className="p-8 rounded-xl" style={{ background: '#0f0f0c', border: '1px solid rgba(201,168,76,0.2)', boxShadow: '0 20px 60px rgba(0,0,0,0.5)' }}>
          <h2 className="font-display text-xl mb-6 text-center" style={{ color: '#E8C5A0' }}>Sign In</h2>

          {error && (
            <div className="mb-4 p-3 rounded text-xs" style={{ background: 'rgba(196,149,138,0.15)', border: '1px solid rgba(196,149,138,0.3)', color: '#C4958A' }}>
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-xs tracking-widest uppercase mb-1.5 block" style={{ color: '#8A7B6E' }}>Email</label>
              <div className="relative">
                <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: '#8A7B6E' }} />
                <input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="admin@salon.com"
                  className="pl-9" required />
              </div>
            </div>
            <div>
              <label className="text-xs tracking-widest uppercase mb-1.5 block" style={{ color: '#8A7B6E' }}>Password</label>
              <div className="relative">
                <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: '#8A7B6E' }} />
                <input value={password} onChange={e => setPassword(e.target.value)}
                  type={showPass ? 'text' : 'password'} placeholder="••••••••"
                  className="pl-9 pr-9" required />
                <button type="button" onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2" style={{ color: '#8A7B6E', background: 'none', border: 'none', cursor: 'pointer' }}>
                  {showPass ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
            </div>
            <button type="submit" className="btn-gold w-full mt-2" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        </div>

        <p className="text-center text-xs mt-6" style={{ color: '#4A4038' }}>
          Secure admin access for The New Image Salon
        </p>
      </div>
    </div>
  )
}
