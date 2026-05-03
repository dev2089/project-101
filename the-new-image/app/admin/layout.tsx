'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase-client'
import {
  LayoutDashboard, Calendar, Scissors, Image, MessageSquare,
  Settings, LogOut, Menu, X, Star
} from 'lucide-react'

const NAV = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/bookings', label: 'Bookings', icon: Calendar },
  { href: '/admin/services', label: 'Services', icon: Scissors },
  { href: '/admin/gallery', label: 'Gallery', icon: Image },
  { href: '/admin/contacts', label: 'Messages', icon: MessageSquare },
  { href: '/admin/settings', label: 'Settings', icon: Settings },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [user, setUser] = useState<any>(null)
  const pathname = usePathname()
  const router = useRouter()
  const sb = createClient()

  useEffect(() => {
    sb.auth.getUser().then(({ data }) => setUser(data.user))
  }, [])

  const handleLogout = async () => {
    await sb.auth.signOut()
    router.push('/admin/login')
  }

  if (pathname === '/admin/login') return <>{children}</>

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: '#050503', color: '#F0E6D3' }}>
      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 flex flex-col transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
        style={{ background: '#080806', borderRight: '1px solid rgba(201,168,76,0.12)', minHeight: '100vh' }}>
        {/* Logo */}
        <div className="p-6 flex items-center justify-between" style={{ borderBottom: '1px solid rgba(201,168,76,0.1)' }}>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg,#9A7A2E,#C9A84C)' }}>
              <span className="font-display text-xs font-bold" style={{ color: '#080806' }}>NI</span>
            </div>
            <div>
              <div className="font-display text-sm font-semibold" style={{ color: '#E8C5A0' }}>New Image</div>
              <div className="text-xs" style={{ color: '#4A4038' }}>Admin Panel</div>
            </div>
          </div>
          <button className="lg:hidden" onClick={() => setSidebarOpen(false)} style={{ color: '#8A7B6E' }}><X size={18} /></button>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {NAV.map(item => (
            <Link key={item.href} href={item.href}
              className={`admin-sidebar-link ${pathname === item.href ? 'active' : ''}`}
              onClick={() => setSidebarOpen(false)}>
              <item.icon size={16} />
              {item.label}
            </Link>
          ))}
        </nav>

        {/* User info + logout */}
        <div className="p-4" style={{ borderTop: '1px solid rgba(201,168,76,0.1)' }}>
          {user && <div className="text-xs mb-3 truncate" style={{ color: '#4A4038' }}>{user.email}</div>}
          <button onClick={handleLogout} className="admin-sidebar-link w-full text-left" style={{ color: '#8A7B6E' }}>
            <LogOut size={16} /><span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Overlay */}
      {sidebarOpen && <div className="fixed inset-0 z-40 lg:hidden bg-black/60" onClick={() => setSidebarOpen(false)} />}

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="flex items-center gap-4 px-6 py-4 shrink-0" style={{ background: '#080806', borderBottom: '1px solid rgba(201,168,76,0.1)' }}>
          <button className="lg:hidden p-1.5" onClick={() => setSidebarOpen(true)} style={{ color: '#C9A84C' }}><Menu size={20} /></button>
          <div className="flex-1">
            <div className="text-xs tracking-[0.15em] uppercase" style={{ color: '#8A7B6E' }}>
              {NAV.find(n => n.href === pathname)?.label || 'Admin'}
            </div>
          </div>
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => <Star key={i} size={12} fill="#C9A84C" color="#C9A84C" />)}
            <span className="text-xs ml-1" style={{ color: '#8A7B6E' }}>5.0 Google</span>
          </div>
          <a href="/" target="_blank" className="btn-outline text-xs py-2 px-4">View Site</a>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6" style={{ background: '#050503' }}>
          {children}
        </main>
      </div>
    </div>
  )
}
