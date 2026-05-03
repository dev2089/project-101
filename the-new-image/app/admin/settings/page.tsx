'use client'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase-client'
import { Save, CheckCircle, Phone, MapPin, Clock, Globe, Key } from 'lucide-react'

const FIELDS = [
  { key: 'whatsapp_number', label: 'WhatsApp Number', icon: Phone, placeholder: '917566446000', help: 'Include country code, no + sign. e.g. 917566446000' },
  { key: 'salon_phone', label: 'Display Phone', icon: Phone, placeholder: '075664 46000', help: 'Shown on website' },
  { key: 'salon_name', label: 'Salon Name', icon: Globe, placeholder: 'The New Image Salon Studio Academy' },
  { key: 'salon_email', label: 'Email Address', icon: Globe, placeholder: 'info@thenewimage.com' },
  { key: 'salon_address', label: 'Address', icon: MapPin, placeholder: 'Full address...' },
  { key: 'salon_hours', label: 'Working Hours', icon: Clock, placeholder: 'Monday-Saturday: 12pm - 8pm' },
  { key: 'salon_instagram', label: 'Instagram Handle', icon: Globe, placeholder: '@thenewimagesalon' },
  { key: 'hero_tagline', label: 'Hero Tagline', icon: Globe, placeholder: 'Feel Beautiful With Care' },
]

export default function AdminSettings() {
  const [settings, setSettings] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [adminEmail, setAdminEmail] = useState('')
  const [newPass, setNewPass] = useState('')
  const [passMsg, setPassMsg] = useState('')
  const sb = createClient()

  useEffect(() => {
    const load = async () => {
      const { data } = await sb.from('ni_settings').select('*')
      const obj: Record<string, string> = {}
      data?.forEach(r => { obj[r.key] = r.value })
      setSettings(obj)
      const { data: { user } } = await sb.auth.getUser()
      setAdminEmail(user?.email || '')
      setLoading(false)
    }
    load()
  }, [])

  const save = async () => {
    setSaving(true)
    const upserts = Object.entries(settings).map(([key, value]) => ({ key, value, updated_at: new Date().toISOString() }))
    await sb.from('ni_settings').upsert(upserts, { onConflict: 'key' })
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const changePass = async () => {
    if (!newPass || newPass.length < 6) return setPassMsg('Password must be at least 6 characters')
    const { error } = await sb.auth.updateUser({ password: newPass })
    if (error) setPassMsg('Error: ' + error.message)
    else { setPassMsg('Password updated successfully!'); setNewPass('') }
  }

  if (loading) return <div className="text-center py-12 text-sm" style={{ color: '#8A7B6E' }}>Loading settings...</div>

  return (
    <div className="space-y-8 max-w-2xl">
      <div>
        <h1 className="font-display text-3xl mb-1" style={{ color: '#F0E6D3' }}>Settings</h1>
        <p className="text-sm" style={{ color: '#8A7B6E' }}>Manage salon info, WhatsApp number, and contact details</p>
      </div>

      {/* Salon Settings */}
      <div className="p-6 rounded-xl space-y-5" style={{ background: '#0f0f0c', border: '1px solid rgba(201,168,76,0.15)' }}>
        <h2 className="font-display text-xl" style={{ color: '#F0E6D3' }}>Salon Information</h2>
        {FIELDS.map(f => (
          <div key={f.key}>
            <label className="text-xs uppercase tracking-widest mb-1.5 flex items-center gap-1.5" style={{ color: '#8A7B6E' }}>
              <f.icon size={11} />{f.label}
            </label>
            <input value={settings[f.key] || ''} onChange={e => setSettings(p => ({ ...p, [f.key]: e.target.value }))}
              placeholder={f.placeholder} />
            {f.help && <p className="text-xs mt-1" style={{ color: '#4A4038' }}>{f.help}</p>}
          </div>
        ))}

        <div className="pt-4">
          <button className="btn-gold flex items-center gap-2" onClick={save} disabled={saving}>
            {saved ? <><CheckCircle size={14} /> Saved!</> : <><Save size={14} /> {saving ? 'Saving...' : 'Save All Settings'}</>}
          </button>
        </div>
      </div>

      {/* Account Security */}
      <div className="p-6 rounded-xl space-y-4" style={{ background: '#0f0f0c', border: '1px solid rgba(201,168,76,0.15)' }}>
        <h2 className="font-display text-xl" style={{ color: '#F0E6D3' }}>Account Security</h2>
        <div>
          <label className="text-xs uppercase tracking-widest mb-1.5 block" style={{ color: '#8A7B6E' }}>Admin Email</label>
          <input value={adminEmail} disabled style={{ opacity: 0.5 }} />
        </div>
        <div>
          <label className="text-xs uppercase tracking-widest mb-1.5 block" style={{ color: '#8A7B6E' }}>New Password</label>
          <input type="password" value={newPass} onChange={e => setNewPass(e.target.value)} placeholder="Minimum 6 characters" />
        </div>
        {passMsg && <p className="text-xs" style={{ color: passMsg.includes('Error') ? '#C4958A' : '#7FB069' }}>{passMsg}</p>}
        <button className="btn-outline flex items-center gap-2 text-xs" onClick={changePass}>
          <Key size={13} /> Update Password
        </button>
      </div>

      {/* Quick Preview */}
      <div className="p-5 rounded-xl" style={{ background: 'rgba(201,168,76,0.06)', border: '1px solid rgba(201,168,76,0.15)' }}>
        <h3 className="text-xs uppercase tracking-widest mb-4" style={{ color: '#C9A84C' }}>WhatsApp Booking Preview</h3>
        <div className="text-xs p-3 rounded font-mono" style={{ background: '#080806', color: '#A09080', lineHeight: 1.8 }}>
          wa.me/<span style={{ color: '#C9A84C' }}>{settings.whatsapp_number || '917566446000'}</span><br />
          Message: "Hello! I'd like to book an appointment..."
        </div>
        <a href={`https://wa.me/${settings.whatsapp_number || '917566446000'}`} target="_blank" rel="noopener"
          className="mt-3 inline-flex text-xs items-center gap-1.5" style={{ color: '#25D166' }}>
          Test WhatsApp Link →
        </a>
      </div>
    </div>
  )
}
