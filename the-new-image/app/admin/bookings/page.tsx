'use client'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase-client'
import { Search, Filter, Phone, Calendar, Clock } from 'lucide-react'

const STATUS_OPTS = ['all', 'pending', 'confirmed', 'completed', 'cancelled']
const STATUS_STYLE: Record<string, { color: string; bg: string }> = {
  pending: { color: '#E8C5A0', bg: 'rgba(232,197,160,0.12)' },
  confirmed: { color: '#C9A84C', bg: 'rgba(201,168,76,0.12)' },
  completed: { color: '#7FB069', bg: 'rgba(127,176,105,0.12)' },
  cancelled: { color: '#C4958A', bg: 'rgba(196,149,138,0.12)' },
}

export default function BookingsPage() {
  const [bookings, setBookings] = useState<any[]>([])
  const [filtered, setFiltered] = useState<any[]>([])
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [loading, setLoading] = useState(true)
  const sb = createClient()

  useEffect(() => {
    const load = async () => {
      const { data } = await sb.from('ni_bookings').select('*').order('created_at', { ascending: false })
      setBookings(data || [])
      setLoading(false)
    }
    load()
    const channel = sb.channel('bookings-page')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'ni_bookings' }, load)
      .subscribe()
    return () => { sb.removeChannel(channel) }
  }, [])

  useEffect(() => {
    let result = bookings
    if (statusFilter !== 'all') result = result.filter(b => b.status === statusFilter)
    if (search) result = result.filter(b =>
      b.name.toLowerCase().includes(search.toLowerCase()) ||
      b.phone.includes(search) ||
      b.service.toLowerCase().includes(search.toLowerCase())
    )
    setFiltered(result)
  }, [bookings, statusFilter, search])

  const updateStatus = async (id: string, status: string) => {
    await sb.from('ni_bookings').update({ status }).eq('id', id)
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status } : b))
  }

  const openWhatsApp = (booking: any) => {
    const msg = `Hi ${booking.name}! Your appointment for *${booking.service}* on *${booking.date}* at *${booking.time_slot}* has been confirmed at The New Image Salon. See you soon! 💛`
    window.open(`https://wa.me/91${booking.phone.replace(/\D/g, '')}?text=${encodeURIComponent(msg)}`, '_blank')
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl mb-1" style={{ color: '#F0E6D3' }}>Bookings</h1>
          <p className="text-sm" style={{ color: '#8A7B6E' }}>{filtered.length} appointment{filtered.length !== 1 ? 's' : ''}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: '#8A7B6E' }} />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name, phone, or service..."
            className="pl-9 text-sm" />
        </div>
        <div className="flex gap-2 flex-wrap">
          {STATUS_OPTS.map(s => (
            <button key={s} onClick={() => setStatusFilter(s)}
              className="text-xs px-4 py-2 rounded-full capitalize transition-all"
              style={{
                background: statusFilter === s ? (STATUS_STYLE[s]?.bg || 'rgba(201,168,76,0.15)') : 'rgba(201,168,76,0.06)',
                color: statusFilter === s ? (STATUS_STYLE[s]?.color || '#C9A84C') : '#8A7B6E',
                border: `1px solid ${statusFilter === s ? (STATUS_STYLE[s]?.color || '#C9A84C') + '50' : 'rgba(201,168,76,0.15)'}`,
              }}>
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="rounded-xl overflow-hidden" style={{ background: '#0f0f0c', border: '1px solid rgba(201,168,76,0.12)' }}>
        {loading ? (
          <div className="p-12 text-center text-sm" style={{ color: '#8A7B6E' }}>Loading...</div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center text-sm" style={{ color: '#8A7B6E' }}>No bookings found</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(201,168,76,0.08)' }}>
                  {['Client', 'Service', 'Date & Time', 'Notes', 'Status', 'Actions'].map(h => (
                    <th key={h} className="px-5 py-4 text-left text-xs uppercase tracking-wider" style={{ color: '#4A4038' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map(b => {
                  const s = STATUS_STYLE[b.status] || STATUS_STYLE.pending
                  return (
                    <tr key={b.id} style={{ borderBottom: '1px solid rgba(201,168,76,0.06)' }}>
                      <td className="px-5 py-4">
                        <div className="text-sm font-medium" style={{ color: '#F0E6D3' }}>{b.name}</div>
                        <div className="text-xs mt-0.5 flex items-center gap-1" style={{ color: '#8A7B6E' }}>
                          <Phone size={10} />{b.phone}
                        </div>
                        {b.email && <div className="text-xs" style={{ color: '#4A4038' }}>{b.email}</div>}
                      </td>
                      <td className="px-5 py-4 text-sm max-w-xs" style={{ color: '#A09080' }}>{b.service}</td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-1.5 text-xs" style={{ color: '#8A7B6E' }}>
                          <Calendar size={11} />{b.date}
                        </div>
                        <div className="flex items-center gap-1.5 text-xs mt-1" style={{ color: '#8A7B6E' }}>
                          <Clock size={11} />{b.time_slot}
                        </div>
                      </td>
                      <td className="px-5 py-4 text-xs max-w-xs" style={{ color: '#6A5848' }}>{b.notes || '—'}</td>
                      <td className="px-5 py-4">
                        <span className="text-xs px-2.5 py-1 rounded-full capitalize" style={{ background: s.bg, color: s.color }}>{b.status}</span>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <select value={b.status} onChange={e => updateStatus(b.id, e.target.value)}
                            style={{ background: '#161612', border: '1px solid rgba(201,168,76,0.2)', color: '#C9A84C', borderRadius: 4, padding: '4px 8px', fontSize: 12, width: 'auto' }}>
                            <option value="pending">Pending</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                          <button onClick={() => openWhatsApp(b)}
                            className="text-xs px-3 py-1.5 rounded transition-all hover:opacity-80"
                            style={{ background: 'rgba(37,211,102,0.15)', color: '#25D166', border: '1px solid rgba(37,211,102,0.3)' }}>
                            WA
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
