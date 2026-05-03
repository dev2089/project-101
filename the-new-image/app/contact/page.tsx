'use client'
import { useState } from 'react'
import Image from 'next/image'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Phone, MapPin, Clock, Send, CheckCircle, Share2 } from 'lucide-react'

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch('/api/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setSuccess(true)
        setForm({ name: '', phone: '', email: '', message: '' })
      }
    } catch (err) { console.error(err) }
    finally { setLoading(false) }
  }

  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-20 text-center">
        <div className="absolute inset-0">
          <Image src="https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1920&q=60" alt="" fill className="object-cover opacity-15" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, #080806, rgba(8,8,6,0.5) 50%, #080806)' }} />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="text-xs tracking-[0.3em] uppercase mb-3" style={{ color: '#C9A84C' }}>Reach Out</div>
          <h1 className="font-display text-5xl sm:text-6xl font-light mb-4" style={{ color: '#F0E6D3' }}>Get in <span className="gold-gradient italic">Touch</span></h1>
          <div className="section-divider" />
          <p className="text-sm max-w-xl mx-auto leading-relaxed mt-4" style={{ color: '#8A7B6E' }}>Have a question? Want to book? Just want to say hello? We'd love to hear from you.</p>
        </div>
      </section>

      <section className="py-16 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div>
            <h2 className="font-display text-3xl mb-8" style={{ color: '#F0E6D3' }}>Visit <span className="gold-gradient italic">Our Salon</span></h2>
            <div className="space-y-6 mb-10">
              <div className="flex gap-4 p-5 rounded-lg" style={{ background: '#0f0f0c', border: '1px solid rgba(201,168,76,0.15)' }}>
                <div className="w-12 h-12 rounded-full flex items-center justify-center shrink-0" style={{ background: 'rgba(201,168,76,0.1)' }}>
                  <MapPin size={20} style={{ color: '#C9A84C' }} />
                </div>
                <div>
                  <div className="text-xs tracking-widest uppercase mb-1" style={{ color: '#C9A84C' }}>Address</div>
                  <div className="text-sm leading-relaxed" style={{ color: '#F0E6D3' }}>LG -2,3, Gold Avenue Apartment, 2A, Manik Bagh Rd, Nai Duniya, Palsikar Colony, Indore, Madhya Pradesh 452007</div>
                  <a href="https://maps.google.com/?q=22.70557,75.85566" target="_blank" rel="noopener" className="text-xs mt-2 inline-block" style={{ color: '#C9A84C' }}>Get Directions →</a>
                </div>
              </div>
              <div className="flex gap-4 p-5 rounded-lg" style={{ background: '#0f0f0c', border: '1px solid rgba(201,168,76,0.15)' }}>
                <div className="w-12 h-12 rounded-full flex items-center justify-center shrink-0" style={{ background: 'rgba(201,168,76,0.1)' }}>
                  <Phone size={20} style={{ color: '#C9A84C' }} />
                </div>
                <div>
                  <div className="text-xs tracking-widest uppercase mb-1" style={{ color: '#C9A84C' }}>Phone</div>
                  <a href="tel:+917566446000" className="text-sm font-medium transition-colors hover:text-yellow-400" style={{ color: '#F0E6D3' }}>+91 75664 46000</a>
                  <div className="text-xs mt-1" style={{ color: '#8A7B6E' }}>Call or WhatsApp for appointments</div>
                </div>
              </div>
              <div className="flex gap-4 p-5 rounded-lg" style={{ background: '#0f0f0c', border: '1px solid rgba(201,168,76,0.15)' }}>
                <div className="w-12 h-12 rounded-full flex items-center justify-center shrink-0" style={{ background: 'rgba(201,168,76,0.1)' }}>
                  <Clock size={20} style={{ color: '#C9A84C' }} />
                </div>
                <div>
                  <div className="text-xs tracking-widest uppercase mb-1" style={{ color: '#C9A84C' }}>Working Hours</div>
                  <div className="text-sm" style={{ color: '#F0E6D3' }}>Monday – Saturday: 12:00 PM – 8:00 PM</div>
                  <div className="text-xs mt-1" style={{ color: '#8A7B6E' }}>Sunday: By appointment only</div>
                </div>
              </div>
              <div className="flex gap-4 p-5 rounded-lg" style={{ background: '#0f0f0c', border: '1px solid rgba(201,168,76,0.15)' }}>
                <div className="w-12 h-12 rounded-full flex items-center justify-center shrink-0" style={{ background: 'rgba(201,168,76,0.1)' }}>
                  <Share2 size={20} style={{ color: '#C9A84C' }} />
                </div>
                <div>
                  <div className="text-xs tracking-widest uppercase mb-1" style={{ color: '#C9A84C' }}>Payments Accepted</div>
                  <div className="text-sm" style={{ color: '#F0E6D3' }}>Cash · Credit Card · Debit Card</div>
                  <div className="text-xs mt-1" style={{ color: '#8A7B6E' }}>Google Pay · UPI · NFC Payments</div>
                </div>
              </div>
            </div>

            {/* Map embed */}
            <div className="rounded-lg overflow-hidden" style={{ height: 280, border: '1px solid rgba(201,168,76,0.2)' }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3680.7!2d75.85566!3d22.70557!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjLCsDQyJzIwLjEiTiA3NcKwNTEnMjAuNCJF!5e0!3m2!1sen!2sin!4v1"
                width="100%" height="100%" loading="lazy" className="grayscale"
                style={{ filter: 'invert(90%) hue-rotate(180deg)' }}
              />
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <div className="p-8 rounded-2xl" style={{ background: '#0f0f0c', border: '1px solid rgba(201,168,76,0.2)' }}>
              <h2 className="font-display text-3xl mb-2" style={{ color: '#F0E6D3' }}>Send a <span className="gold-gradient italic">Message</span></h2>
              <p className="text-sm mb-8" style={{ color: '#8A7B6E' }}>We'll get back to you within a few hours.</p>

              {success ? (
                <div className="text-center py-12">
                  <CheckCircle size={48} className="mx-auto mb-4" style={{ color: '#C9A84C' }} />
                  <h3 className="font-display text-2xl mb-2" style={{ color: '#F0E6D3' }}>Message Sent!</h3>
                  <p className="text-sm" style={{ color: '#8A7B6E' }}>We'll be in touch very soon. Thank you!</p>
                  <button className="btn-outline mt-6" onClick={() => setSuccess(false)}>Send Another</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="text-xs tracking-widest uppercase mb-1.5 block" style={{ color: '#8A7B6E' }}>Full Name *</label>
                    <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Your full name" required />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs tracking-widest uppercase mb-1.5 block" style={{ color: '#8A7B6E' }}>Phone *</label>
                      <input value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} placeholder="+91 XXXXX" type="tel" required />
                    </div>
                    <div>
                      <label className="text-xs tracking-widest uppercase mb-1.5 block" style={{ color: '#8A7B6E' }}>Email</label>
                      <input value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder="you@email.com" type="email" />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs tracking-widest uppercase mb-1.5 block" style={{ color: '#8A7B6E' }}>Message *</label>
                    <textarea value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} placeholder="How can we help you?" rows={5} required />
                  </div>
                  <button type="submit" className="btn-gold w-full flex items-center justify-center gap-2" disabled={loading}>
                    <Send size={14} />
                    {loading ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
