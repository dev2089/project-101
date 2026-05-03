'use client'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase-client'
import { Phone, Mail, MessageSquare, Check } from 'lucide-react'

export default function AdminContacts() {
  const [contacts, setContacts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const sb = createClient()

  const load = async () => {
    const { data } = await sb.from('ni_contacts').select('*').order('created_at', { ascending: false })
    setContacts(data || [])
    setLoading(false)
  }
  useEffect(() => { load() }, [])

  const markRead = async (id: string) => {
    await sb.from('ni_contacts').update({ is_read: true }).eq('id', id)
    setContacts(p => p.map(c => c.id === id ? { ...c, is_read: true } : c))
  }

  const replyWA = (c: any) => {
    if (!c.phone) return alert('No phone number')
    const msg = `Hi ${c.name}! Thank you for reaching out to The New Image Salon. `
    window.open(`https://wa.me/91${c.phone.replace(/\D/g, '')}?text=${encodeURIComponent(msg)}`, '_blank')
  }

  const unread = contacts.filter(c => !c.is_read).length

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl mb-1" style={{ color: '#F0E6D3' }}>Messages</h1>
        <p className="text-sm" style={{ color: '#8A7B6E' }}>
          {contacts.length} total · <span style={{ color: '#C9A84C' }}>{unread} unread</span>
        </p>
      </div>

      {loading ? (
        <div className="text-center py-12 text-sm" style={{ color: '#8A7B6E' }}>Loading...</div>
      ) : contacts.length === 0 ? (
        <div className="text-center py-20" style={{ color: '#4A4038' }}>
          <MessageSquare size={40} className="mx-auto mb-3 opacity-30" />
          <p className="text-sm">No messages yet</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {contacts.map(c => (
            <div key={c.id} className="p-5 rounded-xl transition-all" style={{ background: '#0f0f0c', border: `1px solid ${!c.is_read ? 'rgba(201,168,76,0.35)' : 'rgba(201,168,76,0.1)'}` }}>
              <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold" style={{ color: '#F0E6D3' }}>{c.name}</span>
                    {!c.is_read && <span className="w-2 h-2 rounded-full" style={{ background: '#C9A84C' }} />}
                  </div>
                  <div className="flex items-center gap-4 mt-1">
                    {c.phone && <a href={`tel:${c.phone}`} className="flex items-center gap-1.5 text-xs" style={{ color: '#8A7B6E' }}><Phone size={10} />{c.phone}</a>}
                    {c.email && <span className="flex items-center gap-1.5 text-xs" style={{ color: '#8A7B6E' }}><Mail size={10} />{c.email}</span>}
                  </div>
                </div>
                <span className="text-xs shrink-0" style={{ color: '#4A4038' }}>{new Date(c.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
              </div>
              <p className="text-sm leading-relaxed mb-4 p-3 rounded" style={{ color: '#A09080', background: 'rgba(201,168,76,0.04)', border: '1px solid rgba(201,168,76,0.08)' }}>{c.message}</p>
              <div className="flex gap-2">
                {c.phone && (
                  <button onClick={() => replyWA(c)} className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded" style={{ background: 'rgba(37,211,102,0.12)', color: '#25D166', border: '1px solid rgba(37,211,102,0.25)' }}>
                    WhatsApp Reply
                  </button>
                )}
                {!c.is_read && (
                  <button onClick={() => markRead(c.id)} className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded" style={{ background: 'rgba(201,168,76,0.1)', color: '#C9A84C', border: '1px solid rgba(201,168,76,0.25)' }}>
                    <Check size={11} /> Mark Read
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
