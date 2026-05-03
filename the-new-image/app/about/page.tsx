'use client'
import { useState } from 'react'
import Image from 'next/image'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import BookingModal from '@/components/BookingModal'
import { Award, Star, Users, Heart, CheckCircle } from 'lucide-react'

const MILESTONES = [
  { year: '2019', title: 'The Beginning', desc: 'The New Image Salon opens its doors at Manik Bagh Road, Indore with a vision to bring premium beauty to every client.' },
  { year: '2020', title: 'Laser Expansion', desc: 'Added advanced laser hair removal with Korean cooling technology, becoming one of the first in the area to offer painless LHR.' },
  { year: '2021', title: 'Academy Launch', desc: 'Launched the beauty academy to train the next generation of beauty professionals with world-class techniques.' },
  { year: '2022', title: 'Skin Clinic', desc: 'Expanded to advanced skin treatments: Hydra Facial, PRP, BB Glow, Chemical Peels and Mole & Wart Removal.' },
  { year: '2023', title: '5-Star Excellence', desc: 'Achieved 5.0 Google rating with 100+ authentic reviews — a testimony to consistent quality and client love.' },
  { year: '2025', title: 'New Horizons', desc: 'Launched digital presence, online booking, and Korean skincare product line for at-home care.' },
]

const VALUES = [
  { icon: Heart, title: 'Genuine Care', desc: 'Every client is treated like family. Khushboo personally ensures each visit exceeds expectations.' },
  { icon: Award, title: 'Expert Knowledge', desc: 'Continuously trained in the latest global techniques, Korean beauty innovations, and advanced aesthetic medicine.' },
  { icon: Star, title: 'Premium Standards', desc: 'Clinical-grade hygiene, internationally sourced products, and zero-compromise quality on every service.' },
  { icon: Users, title: 'Inclusive Space', desc: 'LGBTQ+ friendly, welcoming clients of all backgrounds. Your comfort and confidence matter most.' },
]

const ACHIEVEMENTS = [
  { num: '6+', label: 'Years of Excellence' },
  { num: '2000+', label: 'Happy Clients' },
  { num: '5.0★', label: 'Google Rating' },
  { num: '137', label: 'Verified Reviews' },
  { num: '19+', label: 'Premium Services' },
  { num: '100%', label: 'Client Satisfaction' },
]

export default function AboutPage() {
  const [bookingOpen, setBookingOpen] = useState(false)

  return (
    <>
      <Navbar />
      <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} />

      {/* Hero */}
      <section className="relative pt-32 pb-24">
        <div className="absolute inset-0">
          <Image src="https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=1920&q=70" alt="About" fill className="object-cover opacity-20" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, #080806 0%, rgba(8,8,6,0.6) 50%, #080806 100%)' }} />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <div className="text-xs tracking-[0.3em] uppercase mb-3" style={{ color: '#C9A84C' }}>Our Story</div>
          <h1 className="font-display text-5xl sm:text-6xl font-light mb-4" style={{ color: '#F0E6D3' }}>About <span className="gold-gradient italic">The New Image</span></h1>
          <div className="section-divider" />
        </div>
      </section>

      {/* Founder Story */}
      <section className="py-16 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="rounded-2xl overflow-hidden" style={{ height: 500 }}>
              <Image src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=85" alt="Khushboo - Founder" fill className="object-cover" />
            </div>
            <div className="absolute -bottom-6 -right-6 p-6 rounded-xl" style={{ background: '#080806', border: '1px solid rgba(201,168,76,0.3)' }}>
              <div className="font-display text-2xl font-semibold" style={{ color: '#C9A84C' }}>Khushboo</div>
              <div className="text-sm" style={{ color: '#F0E6D3' }}>Founder & Head Stylist</div>
              <div className="text-xs mt-1" style={{ color: '#8A7B6E' }}>6+ Years of Expertise</div>
            </div>
          </div>
          <div>
            <div className="text-xs tracking-[0.3em] uppercase mb-3" style={{ color: '#C9A84C' }}>The Vision Behind The Brand</div>
            <h2 className="font-display text-4xl font-light mb-6" style={{ color: '#F0E6D3' }}>Built on Passion, <span className="gold-gradient italic">Driven by Care</span></h2>
            <div className="space-y-4 text-sm leading-relaxed" style={{ color: '#A09080' }}>
              <p>The New Image Salon was born from a simple but powerful belief: every person deserves to feel beautiful, confident, and cared for. Founded by Khushboo, the salon was created to bring world-class beauty experiences to Indore.</p>
              <p>Khushboo's approach is unique — she listens before she creates. Whether it's understanding your hair type, skin concerns, or the exact look you envision for your wedding day, her attentiveness is what sets her apart. Hundreds of clients have called her treatments life-changing.</p>
              <p>From Korean skincare innovations to advanced laser technology, Khushboo continuously invests in learning and upgrading, ensuring The New Image stays ahead of beauty trends while staying rooted in personalized care.</p>
              <p>Today, the salon is not just a beauty destination — it's a community where clients feel like family, return year after year, and trust Khushboo with their most important beauty moments.</p>
            </div>
            <div className="flex flex-wrap gap-3 mt-8">
              <button className="btn-gold" onClick={() => setBookingOpen(true)}>Book With Khushboo</button>
              <a href="tel:+917566446000" className="btn-outline">Call Us</a>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-16" style={{ background: '#0a0a08' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {ACHIEVEMENTS.map(a => (
              <div key={a.label} className="text-center p-6 rounded-lg" style={{ background: 'rgba(201,168,76,0.05)', border: '1px solid rgba(201,168,76,0.12)' }}>
                <div className="font-display text-3xl font-semibold mb-1" style={{ color: '#C9A84C' }}>{a.num}</div>
                <div className="text-xs tracking-widest uppercase" style={{ color: '#8A7B6E' }}>{a.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className="text-xs tracking-[0.3em] uppercase mb-3" style={{ color: '#C9A84C' }}>What We Stand For</div>
          <h2 className="font-display text-4xl font-light" style={{ color: '#F0E6D3' }}>Our <span className="gold-gradient italic">Core Values</span></h2>
          <div className="section-divider" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {VALUES.map(v => (
            <div key={v.title} className="p-8 rounded-lg text-center card-hover" style={{ background: '#0f0f0c', border: '1px solid rgba(201,168,76,0.15)' }}>
              <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5" style={{ background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.3)' }}>
                <v.icon size={24} style={{ color: '#C9A84C' }} />
              </div>
              <h3 className="font-display text-xl mb-3" style={{ color: '#F0E6D3' }}>{v.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: '#8A7B6E' }}>{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20" style={{ background: '#0a0a08' }}>
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="text-xs tracking-[0.3em] uppercase mb-3" style={{ color: '#C9A84C' }}>Our Journey</div>
            <h2 className="font-display text-4xl font-light" style={{ color: '#F0E6D3' }}>The <span className="gold-gradient italic">Milestones</span></h2>
            <div className="section-divider" />
          </div>
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-px" style={{ background: 'linear-gradient(to bottom, #C9A84C, rgba(201,168,76,0.2))' }} />
            <div className="space-y-8">
              {MILESTONES.map((m, i) => (
                <div key={i} className="flex gap-8 relative">
                  <div className="w-16 shrink-0 flex items-start justify-end">
                    <div className="w-4 h-4 rounded-full mt-1 relative z-10" style={{ background: 'linear-gradient(135deg,#9A7A2E,#C9A84C)', boxShadow: '0 0 12px rgba(201,168,76,0.5)' }} />
                  </div>
                  <div className="flex-1 pb-2">
                    <div className="text-xs tracking-widest uppercase mb-1" style={{ color: '#C9A84C' }}>{m.year}</div>
                    <h3 className="font-display text-xl mb-2" style={{ color: '#F0E6D3' }}>{m.title}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: '#8A7B6E' }}>{m.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* What clients say about Khushboo */}
      <section className="py-20 max-w-4xl mx-auto px-6 text-center">
        <h2 className="font-display text-4xl mb-8" style={{ color: '#F0E6D3' }}>What Clients Say About <span className="gold-gradient italic">Khushboo</span></h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { text: '"Khushboo di is too humble and suggests the best for you. The salon is too hygienic and the staff is always well dressed. Must recommended!"', name: 'Sukhneet Bhatia' },
            { text: '"Khushboo di listened attentively to my requests, offered valuable advice — the team members are incredibly talented and know exactly how to bring out the best."', name: 'Preet Pandit' },
            { text: '"She knows clients requirements and does best for them regarding beauty. She is using Korean skin, hair and health products that are giving good results."', name: 'Sangeeta Kainth' },
            { text: '"I have been a consistent customer since 2019 — Khushboo di\'s behaviour is too good, she also advises some skin care tips which are beneficial too."', name: 'Neeleshwari Dandir' },
          ].map((r, i) => (
            <div key={i} className="p-6 rounded-lg text-left" style={{ background: '#0f0f0c', border: '1px solid rgba(201,168,76,0.15)' }}>
              <div className="flex gap-1 mb-3">{[...Array(5)].map((_, j) => <Star key={j} size={12} fill="#C9A84C" color="#C9A84C" />)}</div>
              <p className="text-sm leading-relaxed mb-3 italic" style={{ color: '#A09080' }}>{r.text}</p>
              <div className="text-sm font-medium" style={{ color: '#C9A84C' }}>— {r.name}</div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </>
  )
}
