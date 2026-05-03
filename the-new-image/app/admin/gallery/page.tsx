'use client'
import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { createClient } from '@/lib/supabase-client'
import { Upload, Trash2, Link as LinkIcon, Plus, X, Eye, EyeOff } from 'lucide-react'

export default function AdminGallery() {
  const [items, setItems] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [showAdd, setShowAdd] = useState(false)
  const [form, setForm] = useState({ url: '', type: 'image', caption: '', category: 'general' })
  const fileRef = useRef<HTMLInputElement>(null)
  const sb = createClient()

  const load = async () => {
    const { data } = await sb.from('ni_gallery').select('*').order('created_at', { ascending: false })
    setItems(data || [])
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return
    setUploading(true)
    for (const file of Array.from(files)) {
      const ext = file.name.split('.').pop()
      const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
      const { data: uploadData, error } = await sb.storage.from('ni-gallery').upload(fileName, file, { contentType: file.type })
      if (!error && uploadData) {
        const { data: { publicUrl } } = sb.storage.from('ni-gallery').getPublicUrl(fileName)
        const type = file.type.startsWith('video') ? 'video' : 'image'
        await sb.from('ni_gallery').insert({ url: publicUrl, type, is_active: true, category: 'general' })
      }
    }
    await load()
    setUploading(false)
    if (fileRef.current) fileRef.current.value = ''
  }

  const addByUrl = async () => {
    if (!form.url) return
    await sb.from('ni_gallery').insert({ ...form, is_active: true })
    setForm({ url: '', type: 'image', caption: '', category: 'general' })
    setShowAdd(false)
    await load()
  }

  const toggleActive = async (id: string, current: boolean) => {
    await sb.from('ni_gallery').update({ is_active: !current }).eq('id', id)
    setItems(prev => prev.map(i => i.id === id ? { ...i, is_active: !current } : i))
  }

  const deleteItem = async (id: string, url: string) => {
    if (!confirm('Delete this item?')) return
    const fileName = url.split('/').pop()
    if (fileName) await sb.storage.from('ni-gallery').remove([fileName])
    await sb.from('ni_gallery').delete().eq('id', id)
    setItems(prev => prev.filter(i => i.id !== id))
  }

  const CATS = ['general', 'Hair', 'Skin', 'Nails', 'Bridal', 'Salon', 'Laser']

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl mb-1" style={{ color: '#F0E6D3' }}>Gallery</h1>
          <p className="text-sm" style={{ color: '#8A7B6E' }}>{items.length} media items</p>
        </div>
        <div className="flex gap-3">
          <button onClick={() => setShowAdd(true)} className="btn-outline flex items-center gap-2 text-xs py-2.5 px-4">
            <LinkIcon size={14} /> Add by URL
          </button>
          <button className="btn-gold flex items-center gap-2 text-xs py-2.5 px-4" onClick={() => fileRef.current?.click()} disabled={uploading}>
            <Upload size={14} /> {uploading ? 'Uploading...' : 'Upload Files'}
          </button>
          <input ref={fileRef} type="file" multiple accept="image/*,video/*" className="hidden" onChange={handleFileUpload} />
        </div>
      </div>

      {/* Add by URL Modal */}
      {showAdd && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.8)' }}>
          <div className="w-full max-w-md p-6 rounded-xl" style={{ background: '#0f0f0c', border: '1px solid rgba(201,168,76,0.3)' }}>
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-display text-xl" style={{ color: '#F0E6D3' }}>Add Media by URL</h3>
              <button onClick={() => setShowAdd(false)} style={{ color: '#8A7B6E' }}><X size={18} /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-xs uppercase tracking-widest mb-1.5 block" style={{ color: '#8A7B6E' }}>URL *</label>
                <input value={form.url} onChange={e => setForm(f => ({ ...f, url: e.target.value }))} placeholder="https://..." />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs uppercase tracking-widest mb-1.5 block" style={{ color: '#8A7B6E' }}>Type</label>
                  <select value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))} style={{ background: '#161612' }}>
                    <option value="image">Image</option>
                    <option value="video">Video</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs uppercase tracking-widest mb-1.5 block" style={{ color: '#8A7B6E' }}>Category</label>
                  <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} style={{ background: '#161612' }}>
                    {CATS.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="text-xs uppercase tracking-widest mb-1.5 block" style={{ color: '#8A7B6E' }}>Caption</label>
                <input value={form.caption} onChange={e => setForm(f => ({ ...f, caption: e.target.value }))} placeholder="Optional caption" />
              </div>
              <button className="btn-gold w-full" onClick={addByUrl}>Add to Gallery</button>
            </div>
          </div>
        </div>
      )}

      {/* Upload Zone */}
      <div onClick={() => fileRef.current?.click()}
        className="border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-colors"
        style={{ borderColor: 'rgba(201,168,76,0.3)', background: 'rgba(201,168,76,0.03)' }}
        onDragOver={e => e.preventDefault()}
        onDrop={e => { e.preventDefault(); const dt = e.dataTransfer; if (dt.files.length) { const fi = { target: { files: dt.files } } as any; handleFileUpload(fi) } }}>
        <Upload size={32} className="mx-auto mb-3" style={{ color: '#C9A84C' }} />
        <div className="text-sm" style={{ color: '#8A7B6E' }}>Drop images/videos here or click to browse</div>
        <div className="text-xs mt-1" style={{ color: '#4A4038' }}>JPG, PNG, MP4, MOV • Multiple files supported</div>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="text-center py-12 text-sm" style={{ color: '#8A7B6E' }}>Loading gallery...</div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
          {items.map(item => (
            <div key={item.id} className="relative group rounded-lg overflow-hidden" style={{ aspectRatio: '1', background: '#0f0f0c', border: '1px solid rgba(201,168,76,0.1)' }}>
              {item.type === 'image' ? (
                <Image src={item.url} alt={item.caption || ''} fill className="object-cover" unoptimized />
              ) : (
                <div className="w-full h-full flex items-center justify-center" style={{ background: '#161612' }}>
                  <div className="text-xs" style={{ color: '#8A7B6E' }}>Video</div>
                </div>
              )}
              {!item.is_active && (
                <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.6)' }}>
                  <div className="absolute top-2 left-2 text-xs px-2 py-0.5 rounded" style={{ background: 'rgba(196,149,138,0.3)', color: '#C4958A' }}>Hidden</div>
                </div>
              )}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2"
                style={{ background: 'rgba(0,0,0,0.7)' }}>
                <button onClick={() => toggleActive(item.id, item.is_active)}
                  className="p-2 rounded-full transition-colors" style={{ background: 'rgba(201,168,76,0.2)' }}>
                  {item.is_active ? <EyeOff size={14} style={{ color: '#C9A84C' }} /> : <Eye size={14} style={{ color: '#C9A84C' }} />}
                </button>
                <button onClick={() => deleteItem(item.id, item.url)}
                  className="p-2 rounded-full transition-colors" style={{ background: 'rgba(196,149,138,0.2)' }}>
                  <Trash2 size={14} style={{ color: '#C4958A' }} />
                </button>
              </div>
              {item.caption && (
                <div className="absolute bottom-0 left-0 right-0 px-2 py-1" style={{ background: 'rgba(8,8,6,0.85)' }}>
                  <div className="text-xs truncate" style={{ color: '#8A7B6E' }}>{item.caption}</div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
