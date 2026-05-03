'use client'
import { useState, useEffect } from 'react'
import { X, CheckCircle, Calendar, Clock, User, Phone, Scissors } from 'lucide-react'
import { createClient } from '@/lib/supabase-client'

const SERVICE_CATEGORIES = [
  { label: 'Hair Care', services: ['Haircut & Styling', 'Hair Color', 'Hair Spa', 'Hair Straightening', 'Hair Threading'] },
  { label: 'Skin Care', services: ['Facial', 'Hydra Facial', 'BB Glow', 'PRP Treatment', 'Chemical Peels', 'Mole & Wart Removal'] },
  { label: 'Laser', services: ['Laser Hair Removal', 'Full Body Laser Package'] },
  { label: 'Nails', services: ['Nail Extension', 'Gel Nail Paint', 'Manicure & Pedicure', 'Acrylic Nails'] },
  { label: 'Bridal', services: ['Bridal Makeup', 'Party Makeup', 'Engagement Makeup'] },
  { label: 'Packages', services: ['Head to Toe Package (11 Services @ ₹2999)', 'Happy Hour Special'] },
]

const TIME_SLOTS = ['12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM']

interface Props {
  isOpen: boolean
  onClose: () => void
  defaultService?: string
}

export default function BookingModal({ isOpen, onClose, defaultService }: Props) {
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [whatsappNumber, setWhatsappNumber] = useState('917566446000')
  const [form, setForm] = useState({
    name: '', phone: '', email: '',
    service: defaultService || '', date: '', time: '', notes: ''
  })

  useEffect(() => {
    const fetchWA = async () => {
      const sb = createClient()
      const { data } = await sb.from('ni_settings').select('value').eq('key', 'whatsapp_number').single()
      if (data?.value) setWhatsappNumber(data.value)
    }
    fetchWA()
  }, [])

  useEffect(() => {
    if (defaultService) setForm(f => ({ ...f, service: defaultService }))
  }, [defaultService])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async () => {
    setLoading(true)
    try {
      const sb = createClient()
      await sb.from('ni_bookings').insert({
        name: form.name, phone: form.phone, email: form.email || null,
        service: form.service, date: form.date, time_slot: form.time, notes: form.notes || null,
        status: 'pending'
      })

      const msg = `Hello! I'd like to book an appointment at The New Image Salon.%0A%0A*Name:* ${form.name}%0A*Phone:* ${form.phone}%0A*Service:* ${form.service}%0A*Date:* ${form.date}%0A*Time:* ${form.time}${form.notes ? `%0A*Notes:* ${form.notes}` : ''}%0A%0APlease confirm my appointment. Thank you! 🙏`
      window.open(`https://wa.me/${whatsappNumber}?text=${msg}`, '_blank')
      setStep(3)
    } catch (err) {
      console.error(err)
      alert('Something went wrong. Please try again or call us directly.')
    } finally { setLoading(false) }
  }

  if (!isOpen) return null

  const isStep1Valid = form.name && form.phone.length >= 10 && form.service
  const isStep2Valid = form.date && form.time

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)' }} />
      <div className="relative w-full max-w-lg rounded-lg overflow-hidden" style={{ background: '#0f0f0c', border: '1px solid rgba(201,168,76,0.3)', boxShadow: '0 40px 100px rgba(0,0,0,0.8), 0 0 80px rgba(201,168,76,0.1)' }} onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="p-6 pb-4" style={{ borderBottom: '1px solid rgba(201,168,76,0.1)', background: 'linear-gradient(135deg, rgba(201,168,76,0.08) 0%, transparent 100%)' }}>
          <div className="flex items-start justify-between">
            <div>
              <div className="text-xs tracking-[0.2em] uppercase mb-1" style={{ color: '#C9A84C' }}>The New Image Salon</div>
              <h2 className="font-display text-2xl" style={{ color: '#F0E6D3' }}>Book Appointment</h2>
            </div>
            <button onClick={onClose} className="p-1.5 rounded transition-colors hover:bg-white/5" style={{ color: '#8A7B6E' }}><X size={20} /></button>
          </div>
          {/* Step indicators */}
          <div className="flex items-center gap-2 mt-4">
            {[1, 2].map(s => (
              <div key={s} className="flex items-center gap-2">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all ${step > s ? 'text-[#080806]' : step === s ? 'text-[#080806]' : 'text-[#8A7B6E]'}`}
                  style={{ background: step >= s ? 'linear-gradient(135deg,#9A7A2E,#C9A84C)' : 'rgba(138,123,110,0.2)' }}>
                  {step > s ? '✓' : s}
                </div>
                <span className="text-xs" style={{ color: step >= s ? '#C9A84C' : '#8A7B6E' }}>{s === 1 ? 'Your Details' : 'Date & Time'}</span>
                {s < 2 && <div className="w-8 h-px mx-1" style={{ background: step > s ? '#C9A84C' : 'rgba(138,123,110,0.3)' }} />}
              </div>
            ))}
          </div>
        </div>

        <div className="p-6">
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <label className="text-xs tracking-widest uppercase mb-1.5 block" style={{ color: '#8A7B6E' }}>
                  <User size={12} className="inline mr-1.5" />Full Name *
                </label>
                <input name="name" value={form.name} onChange={handleChange} placeholder="Your full name" />
              </div>
              <div>
                <label className="text-xs tracking-widest uppercase mb-1.5 block" style={{ color: '#8A7B6E' }}>
                  <Phone size={12} className="inline mr-1.5" />Phone Number *
                </label>
                <input name="phone" value={form.phone} onChange={handleChange} placeholder="+91 XXXXX XXXXX" type="tel" />
              </div>
              <div>
                <label className="text-xs tracking-widest uppercase mb-1.5 block" style={{ color: '#8A7B6E' }}>Email (Optional)</label>
                <input name="email" value={form.email} onChange={handleChange} placeholder="your@email.com" type="email" />
              </div>
              <div>
                <label className="text-xs tracking-widest uppercase mb-1.5 block" style={{ color: '#8A7B6E' }}>
                  <Scissors size={12} className="inline mr-1.5" />Service *
                </label>
                <select name="service" value={form.service} onChange={handleChange} className="bg-transparent">
                  <option value="">Select a service</option>
                  {SERVICE_CATEGORIES.map(cat => (
                    <optgroup key={cat.label} label={`── ${cat.label} ──`}>
                      {cat.services.map(s => <option key={s} value={s}>{s}</option>)}
                    </optgroup>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs tracking-widest uppercase mb-1.5 block" style={{ color: '#8A7B6E' }}>Special Requests</label>
                <textarea name="notes" value={form.notes} onChange={handleChange} placeholder="Any specific requirements or questions..." rows={2} />
              </div>
              <button className="btn-gold w-full" onClick={() => isStep1Valid && setStep(2)}
                style={{ opacity: isStep1Valid ? 1 : 0.5, cursor: isStep1Valid ? 'pointer' : 'not-allowed' }}>
                Next → Choose Date & Time
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div>
                <label className="text-xs tracking-widest uppercase mb-1.5 block" style={{ color: '#8A7B6E' }}>
                  <Calendar size={12} className="inline mr-1.5" />Preferred Date *
                </label>
                <input name="date" value={form.date} onChange={handleChange} type="date"
                  min={new Date().toISOString().split('T')[0]} />
              </div>
              <div>
                <label className="text-xs tracking-widest uppercase mb-1.5 block" style={{ color: '#8A7B6E' }}>
                  <Clock size={12} className="inline mr-1.5" />Preferred Time *
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {TIME_SLOTS.map(t => (
                    <button key={t} onClick={() => setForm(f => ({ ...f, time: t }))}
                      className="py-2 px-1 text-xs rounded transition-all"
                      style={{
                        background: form.time === t ? 'linear-gradient(135deg,#9A7A2E,#C9A84C)' : 'rgba(201,168,76,0.08)',
                        color: form.time === t ? '#080806' : '#8A7B6E',
                        border: `1px solid ${form.time === t ? '#C9A84C' : 'rgba(201,168,76,0.2)'}`,
                        fontWeight: form.time === t ? '600' : '400'
                      }}>
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div className="rounded p-4 mt-2" style={{ background: 'rgba(201,168,76,0.06)', border: '1px solid rgba(201,168,76,0.15)' }}>
                <div className="text-xs uppercase tracking-widest mb-2" style={{ color: '#C9A84C' }}>Booking Summary</div>
                <div className="space-y-1 text-sm" style={{ color: '#F0E6D3' }}>
                  <div><span style={{ color: '#8A7B6E' }}>Name: </span>{form.name}</div>
                  <div><span style={{ color: '#8A7B6E' }}>Service: </span>{form.service}</div>
                  {form.date && <div><span style={{ color: '#8A7B6E' }}>Date: </span>{new Date(form.date).toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</div>}
                  {form.time && <div><span style={{ color: '#8A7B6E' }}>Time: </span>{form.time}</div>}
                </div>
              </div>

              <div className="flex gap-3">
                <button className="btn-outline flex-1" onClick={() => setStep(1)}>← Back</button>
                <button className="btn-gold flex-1" onClick={handleSubmit}
                  disabled={!isStep2Valid || loading}
                  style={{ opacity: isStep2Valid && !loading ? 1 : 0.5 }}>
                  {loading ? 'Confirming...' : 'Confirm & WhatsApp →'}
                </button>
              </div>
              <p className="text-xs text-center" style={{ color: '#4A4038' }}>You'll be redirected to WhatsApp to confirm your booking</p>
            </div>
          )}

          {step === 3 && (
            <div className="text-center py-6">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'rgba(201,168,76,0.15)', border: '2px solid rgba(201,168,76,0.4)' }}>
                <CheckCircle size={32} style={{ color: '#C9A84C' }} />
              </div>
              <h3 className="font-display text-2xl mb-2" style={{ color: '#E8C5A0' }}>Booking Submitted!</h3>
              <p className="text-sm mb-6" style={{ color: '#8A7B6E' }}>Your appointment details have been sent to our team via WhatsApp. We'll confirm shortly.</p>
              <div className="text-sm p-4 rounded mb-6" style={{ background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.2)', color: '#F0E6D3' }}>
                <div><span style={{ color: '#8A7B6E' }}>Service: </span>{form.service}</div>
                <div><span style={{ color: '#8A7B6E' }}>Date: </span>{form.date}</div>
                <div><span style={{ color: '#8A7B6E' }}>Time: </span>{form.time}</div>
              </div>
              <button className="btn-gold w-full" onClick={() => { setStep(1); setForm({ name: '', phone: '', email: '', service: '', date: '', time: '', notes: '' }); onClose() }}>
                Done
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
