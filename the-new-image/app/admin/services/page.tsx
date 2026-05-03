'use client'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase-client'
import { Plus, Pencil, Trash2, X, Check, Eye, EyeOff } from 'lucide-react'

const CATEGORIES = ['Hair Care', 'Skin Care', 'Laser', 'Nails', 'Bridal', 'Body Care', 'Packages']
const EMPTY = { name: '', description: '', price_min: '', price_max: '', category: 'Hair Care', duration_minutes: '', is_active: true, image_url: '' }

export default function AdminServices() {
  const [services, setServices] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState<null | 'add' | 'edit'>(null)
  const [form, setForm] = useState<any>(EMPTY)
  const [saving, setSaving] = useState(false)
  const sb = createClient()

  const load = async () => {
    const { data } = await sb.from('ni_services').select('*').order('sort_order')
    setServices(data || [])
    setLoading(false)
  }
  useEffect(() => { load() }, [])

  const openAdd = () => { setForm(EMPTY); setModal('add') }
  const openEdit = (s: any) => { setForm({ ...s, price_min: String(s.price_min || ''), price_max: String(s.price_max || ''), duration_minutes: String(s.duration_minutes || '') }); setModal('edit') }

  const save = async () => {
    setSaving(true)
    const payload = { name: form.name, description: form.description, price_min: Number(form.price_min) || 0, price_max: Number(form.price_max) || 0, category: form.category, duration_minutes: Number(form.duration_minutes) || 0, is_active: form.is_active, image_url: form.image_url || null }
    if (modal === 'add') await sb.from('ni_services').insert(payload)
    else await sb.from('ni_services').update(payload).eq('id', form.id)
    await load(); setModal(null); setSaving(false)
  }

  const toggle = async (id: string, val: boolean) => {
    await sb.from('ni_services').update({ is_active: !val }).eq('id', id)
    setServices(p => p.map(s => s.id === id ? { ...s, is_active: !val } : s))
  }
  const del = async (id: string) => {
    if (!confirm('Delete this service?')) return
    await sb.from('ni_services').delete().eq('id', id)
    setServices(p => p.filter(s => s.id !== id))
  }

  const grouped = CATEGORIES.reduce((acc, cat) => {
    acc[cat] = services.filter(s => s.category === cat)
    return acc
  }, {} as Record<string, any[]>)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl mb-1" style={{ color: '#F0E6D3' }}>Services</h1>
          <p className="text-sm" style={{ color: '#8A7B6E' }}>{services.length} services configured</p>
        </div>
        <button className="btn-gold flex items-center gap-2 text-xs py-2.5 px-5" onClick={openAdd}>
          <Plus size={14} /> Add Service
        </button>
      </div>

      {loading ? <div className="text-center py-12 text-sm" style={{ color: '#8A7B6E' }}>Loading...</div> : (
        <div className="space-y-8">
          {CATEGORIES.map(cat => grouped[cat]?.length > 0 && (
            <div key={cat}>
              <div className="flex items-center gap-3 mb-4">
                <h2 className="text-xs tracking-[0.2em] uppercase font-semibold" style={{ color: '#C9A84C' }}>{cat}</h2>
                <div className="flex-1 h-px" style={{ background: 'rgba(201,168,76,0.15)' }} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {grouped[cat].map(s => (
                  <div key={s.id} className="p-5 rounded-xl transition-all" style={{ background: '#0f0f0c', border: `1px solid ${s.is_active ? 'rgba(201,168,76,0.2)' : 'rgba(201,168,76,0.06)'}`, opacity: s.is_active ? 1 : 0.6 }}>
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex-1">
                        <h3 className="text-sm font-semibold mb-1" style={{ color: '#F0E6D3' }}>{s.name}</h3>
                        <p className="text-xs leading-relaxed line-clamp-2" style={{ color: '#8A7B6E' }}>{s.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 mb-4 text-xs" style={{ color: '#8A7B6E' }}>
                      {s.price_min > 0 && <span style={{ color: '#C9A84C' }}>₹{s.price_min.toLocaleString('en-IN')}{s.price_max !== s.price_min ? ` – ₹${s.price_max.toLocaleString('en-IN')}` : ''}</span>}
                      {s.duration_minutes > 0 && <span>· {s.duration_minutes} min</span>}
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => openEdit(s)} className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded transition-all" style={{ background: 'rgba(201,168,76,0.1)', color: '#C9A84C', border: '1px solid rgba(201,168,76,0.25)' }}>
                        <Pencil size={11} /> Edit
                      </button>
                      <button onClick={() => toggle(s.id, s.is_active)} className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded transition-all" style={{ background: 'rgba(201,168,76,0.06)', color: '#8A7B6E', border: '1px solid rgba(201,168,76,0.12)' }}>
                        {s.is_active ? <><EyeOff size={11} /> Hide</> : <><Eye size={11} /> Show</>}
                      </button>
                      <button onClick={() => del(s.id)} className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded transition-all ml-auto" style={{ background: 'rgba(196,149,138,0.1)', color: '#C4958A', border: '1px solid rgba(196,149,138,0.25)' }}>
                        <Trash2 size={11} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.85)' }}>
          <div className="w-full max-w-lg rounded-xl overflow-hidden max-h-[90vh] overflow-y-auto" style={{ background: '#0f0f0c', border: '1px solid rgba(201,168,76,0.3)' }}>
            <div className="flex items-center justify-between p-6 pb-4" style={{ borderBottom: '1px solid rgba(201,168,76,0.1)' }}>
              <h3 className="font-display text-xl" style={{ color: '#F0E6D3' }}>{modal === 'add' ? 'Add Service' : 'Edit Service'}</h3>
              <button onClick={() => setModal(null)} style={{ color: '#8A7B6E' }}><X size={18} /></button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="text-xs uppercase tracking-widest mb-1.5 block" style={{ color: '#8A7B6E' }}>Service Name *</label>
                <input value={form.name} onChange={e => setForm((f: any) => ({ ...f, name: e.target.value }))} placeholder="e.g. Hydra Facial" />
              </div>
              <div>
                <label className="text-xs uppercase tracking-widest mb-1.5 block" style={{ color: '#8A7B6E' }}>Description</label>
                <textarea value={form.description} onChange={e => setForm((f: any) => ({ ...f, description: e.target.value }))} rows={3} placeholder="Describe this service..." />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs uppercase tracking-widest mb-1.5 block" style={{ color: '#8A7B6E' }}>Min Price (₹)</label>
                  <input type="number" value={form.price_min} onChange={e => setForm((f: any) => ({ ...f, price_min: e.target.value }))} placeholder="500" />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-widest mb-1.5 block" style={{ color: '#8A7B6E' }}>Max Price (₹)</label>
                  <input type="number" value={form.price_max} onChange={e => setForm((f: any) => ({ ...f, price_max: e.target.value }))} placeholder="2000" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs uppercase tracking-widest mb-1.5 block" style={{ color: '#8A7B6E' }}>Category</label>
                  <select value={form.category} onChange={e => setForm((f: any) => ({ ...f, category: e.target.value }))} style={{ background: '#161612' }}>
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs uppercase tracking-widest mb-1.5 block" style={{ color: '#8A7B6E' }}>Duration (minutes)</label>
                  <input type="number" value={form.duration_minutes} onChange={e => setForm((f: any) => ({ ...f, duration_minutes: e.target.value }))} placeholder="60" />
                </div>
              </div>
              <div>
                <label className="text-xs uppercase tracking-widest mb-1.5 block" style={{ color: '#8A7B6E' }}>Image URL (optional)</label>
                <input value={form.image_url} onChange={e => setForm((f: any) => ({ ...f, image_url: e.target.value }))} placeholder="https://..." />
              </div>
              <div className="flex items-center gap-3">
                <label className="text-sm" style={{ color: '#F0E6D3' }}>Active / Visible</label>
                <button onClick={() => setForm((f: any) => ({ ...f, is_active: !f.is_active }))}
                  className="w-10 h-5 rounded-full transition-all relative"
                  style={{ background: form.is_active ? 'linear-gradient(135deg,#9A7A2E,#C9A84C)' : 'rgba(201,168,76,0.2)' }}>
                  <span className="absolute w-4 h-4 rounded-full top-0.5 transition-all" style={{ background: '#fff', left: form.is_active ? '22px' : '2px' }} />
                </button>
              </div>
              <div className="flex gap-3 pt-2">
                <button className="btn-outline flex-1" onClick={() => setModal(null)}>Cancel</button>
                <button className="btn-gold flex-1 flex items-center justify-center gap-2" onClick={save} disabled={!form.name || saving}>
                  <Check size={14} /> {saving ? 'Saving...' : 'Save Service'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
