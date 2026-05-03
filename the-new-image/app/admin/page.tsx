'use client'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase-client'
import { Calendar, Users, MessageSquare, TrendingUp, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react'

const STATUS_CONFIG: Record<string, { color: string; bg: string; icon: any }> = {
  pending: { color: '#E8C5A0', bg: 'rgba(232,197,160,0.12)', icon: Clock },
  confirmed: { color: '#C9A84C', bg: 'rgba(201,168,76,0.12)', icon: CheckCircle },
  completed: { color: '#7FB069', bg: 'rgba(127,176,105,0.12)', icon: CheckCircle },
  cancelled: { color: '#C4958A', bg: 'rgba(196,149,138,0.12)', icon: XCircle },
}

export default function AdminDashboard() {
  const [stats, setStats] = useState({ bookings: 0, pending: 0, confirmed: 0, completed: 0, contacts: 0, todayBookings: 0 })
  const [recentBookings, setRecentBookings] = useState<any[]>([])
  const [recentContacts, setRecentContacts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const sb = createClient()

  useEffect(() => {
    const load = async () => {
      const today = new Date().toISOString().split('T')[0]
      const [{ data: bookings }, { data: contacts }] = await Promise.all([
        sb.from('ni_bookings').select('*').order('created_at', { ascending: false }).limit(50),
        sb.from('ni_contacts').select('*').order('created_at', { ascending: false }).limit(5),
      ])
      if (bookings) {
        setStats({
          bookings: bookings.length,
          pending: bookings.filter(b => b.status === 'pending').length,
          confirmed: bookings.filter(b => b.status === 'confirmed').length,
          completed: bookings.filter(b => b.status === 'completed').length,
          contacts: contacts?.length || 0,
          todayBookings: bookings.filter(b => b.date === today).length,
        })
        setRecentBookings(bookings.slice(0, 8))
      }
      if (contacts) setRecentContacts(contacts)
      setLoading(false)
    }
    load()

    // Realtime subscription for new bookings
    const channel = sb.channel('bookings-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'ni_bookings' }, () => load())
      .subscribe()

    return () => { sb.removeChannel(channel) }
  }, [])

  const updateStatus = async (id: string, status: string) => {
    await sb.from('ni_bookings').update({ status }).eq('id', id)
    setRecentBookings(prev => prev.map(b => b.id === id ? { ...b, status } : b))
  }

  const STAT_CARDS = [
    { label: 'Total Bookings', value: stats.bookings, icon: Calendar, color: '#C9A84C' },
    { label: 'Pending', value: stats.pending, icon: Clock, color: '#E8C5A0' },
    { label: 'Today\'s Appointments', value: stats.todayBookings, icon: TrendingUp, color: '#7FB069' },
    { label: 'Messages', value: stats.contacts, icon: MessageSquare, color: '#C4958A' },
  ]

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="text-sm" style={{ color: '#8A7B6E' }}>Loading dashboard...</div>
    </div>
  )

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl mb-1" style={{ color: '#F0E6D3' }}>Dashboard</h1>
        <p className="text-sm" style={{ color: '#8A7B6E' }}>Welcome back! Here's what's happening today.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STAT_CARDS.map(s => (
          <div key={s.label} className="p-5 rounded-xl" style={{ background: '#0f0f0c', border: '1px solid rgba(201,168,76,0.12)' }}>
            <div className="flex items-center justify-between mb-3">
              <div className="text-xs tracking-widest uppercase" style={{ color: '#8A7B6E' }}>{s.label}</div>
              <s.icon size={16} style={{ color: s.color }} />
            </div>
            <div className="font-display text-4xl font-semibold" style={{ color: s.color }}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Status summary */}
      <div className="grid grid-cols-3 gap-4">
        {(['pending', 'confirmed', 'completed'] as const).map(s => {
          const cfg = STATUS_CONFIG[s]
          const count = s === 'pending' ? stats.pending : s === 'confirmed' ? stats.confirmed : stats.completed
          return (
            <div key={s} className="p-4 rounded-xl flex items-center gap-3" style={{ background: cfg.bg, border: `1px solid ${cfg.color}30` }}>
              <cfg.icon size={20} style={{ color: cfg.color }} />
              <div>
                <div className="font-display text-2xl" style={{ color: cfg.color }}>{count}</div>
                <div className="text-xs capitalize" style={{ color: cfg.color, opacity: 0.7 }}>{s}</div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Recent Bookings */}
        <div className="xl:col-span-2 rounded-xl overflow-hidden" style={{ background: '#0f0f0c', border: '1px solid rgba(201,168,76,0.12)' }}>
          <div className="p-4 flex items-center justify-between" style={{ borderBottom: '1px solid rgba(201,168,76,0.1)' }}>
            <h2 className="font-semibold text-sm" style={{ color: '#F0E6D3' }}>Recent Bookings</h2>
            <a href="/admin/bookings" className="text-xs" style={{ color: '#C9A84C' }}>View all →</a>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(201,168,76,0.08)' }}>
                  {['Client', 'Service', 'Date', 'Time', 'Status', 'Action'].map(h => (
                    <th key={h} className="px-4 py-3 text-left text-xs uppercase tracking-wider" style={{ color: '#4A4038' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {recentBookings.map(b => {
                  const cfg = STATUS_CONFIG[b.status] || STATUS_CONFIG.pending
                  return (
                    <tr key={b.id} style={{ borderBottom: '1px solid rgba(201,168,76,0.06)' }}>
                      <td className="px-4 py-3">
                        <div className="text-sm font-medium" style={{ color: '#F0E6D3' }}>{b.name}</div>
                        <div className="text-xs" style={{ color: '#8A7B6E' }}>{b.phone}</div>
                      </td>
                      <td className="px-4 py-3 text-xs" style={{ color: '#A09080' }}>{b.service}</td>
                      <td className="px-4 py-3 text-xs" style={{ color: '#8A7B6E' }}>{b.date}</td>
                      <td className="px-4 py-3 text-xs" style={{ color: '#8A7B6E' }}>{b.time_slot}</td>
                      <td className="px-4 py-3">
                        <span className="text-xs px-2 py-1 rounded-full capitalize" style={{ background: cfg.bg, color: cfg.color }}>{b.status}</span>
                      </td>
                      <td className="px-4 py-3">
                        <select value={b.status} onChange={e => updateStatus(b.id, e.target.value)}
                          className="text-xs rounded px-2 py-1" style={{ background: '#161612', border: '1px solid rgba(201,168,76,0.2)', color: '#C9A84C', width: 'auto', padding: '4px 8px' }}>
                          <option value="pending">Pending</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="completed">Completed</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Messages */}
        <div className="rounded-xl overflow-hidden" style={{ background: '#0f0f0c', border: '1px solid rgba(201,168,76,0.12)' }}>
          <div className="p-4" style={{ borderBottom: '1px solid rgba(201,168,76,0.1)' }}>
            <h2 className="font-semibold text-sm" style={{ color: '#F0E6D3' }}>Recent Messages</h2>
          </div>
          <div className="divide-y" style={{ '--divide-color': 'rgba(201,168,76,0.06)' } as any}>
            {recentContacts.length === 0 && (
              <div className="p-6 text-center text-sm" style={{ color: '#4A4038' }}>No messages yet</div>
            )}
            {recentContacts.map(c => (
              <div key={c.id} className="p-4">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <span className="text-sm font-medium" style={{ color: '#F0E6D3' }}>{c.name}</span>
                  {!c.is_read && <span className="w-2 h-2 rounded-full shrink-0 mt-1" style={{ background: '#C9A84C' }} />}
                </div>
                <div className="text-xs mb-1" style={{ color: '#8A7B6E' }}>{c.phone}</div>
                <p className="text-xs leading-relaxed line-clamp-2" style={{ color: '#6A5848' }}>{c.message}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
