'use client'
import { useState } from 'react'
import Image from 'next/image'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import BookingModal from '@/components/BookingModal'
import { ArrowRight, Clock, IndianRupee } from 'lucide-react'

const CATEGORIES = ['All', 'Hair Care', 'Skin Care', 'Laser', 'Nails', 'Bridal', 'Packages']

const SERVICES = [
  { name: 'Haircut & Styling', category: 'Hair Care', priceMin: 300, priceMax: 800, duration: 45, desc: 'Expert haircut tailored to your face shape, lifestyle, and hair type. Includes wash, cut and blow-dry.', img: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&q=80', popular: true },
  { name: 'Hair Color', category: 'Hair Care', priceMin: 1500, priceMax: 5000, duration: 120, desc: 'Global color, highlights, balayage, and ombre with premium international brands for stunning results.', img: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=600&q=80' },
  { name: 'Hair Spa', category: 'Hair Care', priceMin: 800, priceMax: 1500, duration: 60, desc: 'Deep conditioning treatment using Korean hair care products. Restores shine, strength, and moisture.', img: 'https://images.unsplash.com/photo-1519415387722-a1c3bbef716c?w=600&q=80' },
  { name: 'Keratin / Straightening', category: 'Hair Care', priceMin: 2500, priceMax: 8000, duration: 180, desc: 'Keratin treatment and rebonding for permanently smooth, frizz-free, manageable hair.', img: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=600&q=80' },
  { name: 'Root Touch-up', category: 'Hair Care', priceMin: 600, priceMax: 1200, duration: 60, desc: 'Seamless root touch-up color to hide regrowth and maintain your hair color between full appointments.', img: 'https://images.unsplash.com/photo-1560869713-7d0a29430803?w=600&q=80' },
  { name: 'Facial', category: 'Skin Care', priceMin: 600, priceMax: 2000, duration: 60, desc: 'Customized facial treatments for every skin type. Deep cleansing, exfoliation, and intense hydration for glowing skin.', img: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=600&q=80' },
  { name: 'Hydra Facial', category: 'Skin Care', priceMin: 1199, priceMax: 2500, duration: 60, desc: 'Advanced 6-step hydradermabrasion treatment. Deep cleansing + extraction + hydration in one powerful session.', img: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&q=80', popular: true },
  { name: 'BB Glow', category: 'Skin Care', priceMin: 2000, priceMax: 4000, duration: 90, desc: 'Semi-permanent foundation micro-needling treatment for an even, flawless skin tone that lasts months.', img: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=600&q=80' },
  { name: 'PRP Treatment', category: 'Skin Care', priceMin: 3000, priceMax: 8000, duration: 90, desc: 'Platelet-Rich Plasma therapy for face rejuvenation and hair regrowth using your own blood\'s growth factors.', img: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=600&q=80' },
  { name: 'Chemical Peels', category: 'Skin Care', priceMin: 1500, priceMax: 4000, duration: 45, desc: 'Professional grade peels to treat acne, pigmentation, sun damage, and uneven skin tone.', img: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=600&q=80' },
  { name: 'Mole & Wart Removal', category: 'Skin Care', priceMin: 500, priceMax: 3000, duration: 30, desc: 'Safe, effective removal of moles and warts using advanced electrosurgery with minimal downtime.', img: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&q=80' },
  { name: 'Laser Hair Removal', category: 'Laser', priceMin: 1500, priceMax: 15000, duration: 60, desc: 'Painless full/partial body LHR using advanced diode laser with cooling technology. Korean-grade equipment.', img: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=600&q=80', popular: true },
  { name: 'Full Body Laser Package', category: 'Laser', priceMin: 8000, priceMax: 25000, duration: 120, desc: 'Complete head-to-toe laser hair removal package. Best value for permanent silky smooth skin.', img: 'https://images.unsplash.com/photo-1529693662653-9d480da3af9f?w=600&q=80' },
  { name: 'Nail Extension', category: 'Nails', priceMin: 800, priceMax: 2000, duration: 90, desc: 'Acrylic and gel nail extensions with custom nail art designs. From natural to dramatic lengths.', img: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=600&q=80' },
  { name: 'Gel Nail Paint', category: 'Nails', priceMin: 400, priceMax: 800, duration: 45, desc: 'Long-lasting gel polish available in 200+ shades. Chip-free, glossy finish for up to 3 weeks.', img: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=600&q=80', popular: true },
  { name: 'Manicure & Pedicure', category: 'Nails', priceMin: 500, priceMax: 1500, duration: 60, desc: 'Relaxing hand and foot care treatment. Includes soak, scrub, massage, and polish application.', img: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=600&q=80' },
  { name: 'Bridal Makeup', category: 'Bridal', priceMin: 8000, priceMax: 25000, duration: 180, desc: 'Complete bridal transformation with consultation, trial, and final look. HD, airbrush, and traditional options available.', img: 'https://images.unsplash.com/photo-1457972729786-0411a3b2b626?w=600&q=80', popular: true },
  { name: 'Party Makeup', category: 'Bridal', priceMin: 1500, priceMax: 5000, duration: 90, desc: 'Glamorous party and event makeup. Smokey eyes, contouring, and everything to make you the center of attention.', img: 'https://images.unsplash.com/photo-1609097687754-34e65db6ce2b?w=600&q=80' },
  { name: 'Head to Toe Package', category: 'Packages', priceMin: 2999, priceMax: 2999, duration: 240, desc: '11 premium services in one session: facial, haircut, hair spa, waxing, manicure, pedicure, eyebrow threading, and more.', img: 'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=600&q=80', popular: true },
  { name: 'Happy Hour Deal', category: 'Packages', priceMin: 0, priceMax: 0, duration: 0, desc: 'Mon–Sat 12pm–8pm: Pay for Pedicure → Get Manicure FREE | Pay for Global Color → Get Root Touch-up FREE | Pay for Facial → Get Back Detox Massage FREE', img: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=600&q=80' },
]

export default function ServicesPage() {
  const [active, setActive] = useState('All')
  const [bookingOpen, setBookingOpen] = useState(false)
  const [bookingService, setBookingService] = useState('')

  const filtered = active === 'All' ? SERVICES : SERVICES.filter(s => s.category === active)

  return (
    <>
      <Navbar />
      <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} defaultService={bookingService} />

      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <Image src="https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1920&q=70" alt="Services" fill className="object-cover opacity-20" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, #080806 0%, rgba(8,8,6,0.7) 50%, #080806 100%)' }} />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <div className="text-xs tracking-[0.3em] uppercase mb-3" style={{ color: '#C9A84C' }}>What We Offer</div>
          <h1 className="font-display text-5xl sm:text-6xl font-light mb-4" style={{ color: '#F0E6D3' }}>Our <span className="gold-gradient italic">Services</span></h1>
          <div className="section-divider" />
          <p className="text-sm max-w-xl mx-auto leading-relaxed mt-4" style={{ color: '#8A7B6E' }}>
            From everyday beauty rituals to transformative treatments — premium services crafted for every need.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="sticky top-16 z-40 py-4" style={{ background: 'rgba(8,8,6,0.97)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(201,168,76,0.12)' }}>
        <div className="max-w-7xl mx-auto px-6 flex gap-3 overflow-x-auto pb-1 scrollbar-hide">
          {CATEGORIES.map(cat => (
            <button key={cat} onClick={() => setActive(cat)}
              className="whitespace-nowrap text-xs tracking-widest uppercase px-5 py-2 rounded-full transition-all font-medium"
              style={{
                background: active === cat ? 'linear-gradient(135deg,#9A7A2E,#C9A84C)' : 'rgba(201,168,76,0.08)',
                color: active === cat ? '#080806' : '#8A7B6E',
                border: `1px solid ${active === cat ? 'transparent' : 'rgba(201,168,76,0.2)'}`,
              }}>
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map(s => (
            <div key={s.name} className="card-hover group cursor-pointer rounded-lg overflow-hidden" style={{ background: '#0f0f0c', border: '1px solid rgba(201,168,76,0.15)' }}>
              <div className="relative h-48 overflow-hidden">
                <Image src={s.img} alt={s.name} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(8,8,6,0.85) 0%, transparent 60%)' }} />
                {s.popular && (
                  <div className="absolute top-3 left-3 text-xs px-2 py-1 rounded" style={{ background: 'rgba(201,168,76,0.9)', color: '#080806', fontWeight: 600 }}>Popular</div>
                )}
                <div className="absolute bottom-3 left-3 right-3">
                  <h3 className="font-display text-lg leading-tight" style={{ color: '#F0E6D3' }}>{s.name}</h3>
                </div>
              </div>
              <div className="p-4">
                <p className="text-xs leading-relaxed mb-4" style={{ color: '#8A7B6E' }}>{s.desc}</p>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    <IndianRupee size={12} style={{ color: '#C9A84C' }} />
                    <span className="text-sm font-semibold" style={{ color: '#C9A84C' }}>
                      {s.priceMin === 0 ? 'Special Offer' : s.priceMin === s.priceMax ? `${s.priceMin.toLocaleString('en-IN')}` : `${s.priceMin.toLocaleString('en-IN')} – ${s.priceMax.toLocaleString('en-IN')}`}
                    </span>
                  </div>
                  {s.duration > 0 && (
                    <div className="flex items-center gap-1">
                      <Clock size={11} style={{ color: '#8A7B6E' }} />
                      <span className="text-xs" style={{ color: '#8A7B6E' }}>{s.duration}min</span>
                    </div>
                  )}
                </div>
                <button className="btn-gold w-full text-xs py-2.5" onClick={() => { setBookingService(s.name); setBookingOpen(true) }}>
                  Book This Service
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 mx-6 mb-16 rounded-2xl overflow-hidden relative" style={{ background: 'linear-gradient(135deg, rgba(201,168,76,0.1) 0%, rgba(201,168,76,0.04) 100%)', border: '1px solid rgba(201,168,76,0.25)' }}>
        <div className="text-center relative z-10">
          <h2 className="font-display text-3xl sm:text-4xl mb-3" style={{ color: '#F0E6D3' }}>Not sure what you need?</h2>
          <p className="text-sm mb-6" style={{ color: '#8A7B6E' }}>Call us and Khushboo will personally guide you to the perfect treatment.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="tel:+917566446000" className="btn-gold">Call 075664 46000</a>
            <button className="btn-outline" onClick={() => setBookingOpen(true)}>Book Consultation</button>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
