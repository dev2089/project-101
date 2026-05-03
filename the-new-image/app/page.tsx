'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import BookingModal from '@/components/BookingModal'
import { Star, ChevronRight, Sparkles, Shield, Award, Clock, MapPin, Phone, Share2, ArrowRight } from 'lucide-react'

const HERO_IMAGES = [
  'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1920&q=85&auto=format',
  'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1920&q=85&auto=format',
  'https://images.unsplash.com/photo-1634449571010-02389ed0f9b0?w=1920&q=85&auto=format',
]

const SERVICES = [
  { icon: '💇‍♀️', name: 'Hair Care', desc: 'Cuts, Color, Spa, Straightening & Korean treatments', img: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&q=80' },
  { icon: '✨', name: 'Skin Treatments', desc: 'Hydra Facial, BB Glow, PRP, Chemical Peels & more', img: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=600&q=80' },
  { icon: '💅', name: 'Nail Art', desc: 'Gel Extensions, Acrylic, Manicure & Pedicure', img: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=600&q=80' },
  { icon: '⚡', name: 'Laser Hair Removal', desc: 'Advanced painless LHR with cooling technology', img: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&q=80' },
  { icon: '👰', name: 'Bridal Makeup', desc: 'Complete bridal transformation & party looks', img: 'https://images.unsplash.com/photo-1457972729786-0411a3b2b626?w=600&q=80' },
  { icon: '🎓', name: 'Beauty Academy', desc: 'Professional beauty courses & certifications', img: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=600&q=80' },
]

const REVIEWS = [
  { name: 'Shatakshi Sharma', text: 'I had such a lovely experience! From the moment I walked in, the staff was warm, welcoming, and very professional. The ambience is clean, comfortable, and relaxing — perfect for a little self-care time.', rating: 5, time: '2 months ago' },
  { name: 'Swati Bohare', text: 'I had a wonderful experience at the salon. Khushboo, the owner, is so sweet and welcoming, which makes the whole experience even better. I am very happy with the service and will definitely visit again!', rating: 5, time: '2 months ago' },
  { name: 'Kratika Joshi', text: 'My experience is always amazing with New Image Salon. Their knowledge related to skin, the Hygiene they have maintained is really commendable. It gives you vibe of premium parlour at affordable range.', rating: 5, time: '11 months ago' },
  { name: 'Preet Pandit', text: 'I recently visited and I am delighted with the results. The team members are incredibly talented and know exactly how to bring out the best in my hair. Khushboo di listened attentively to my requests.', rating: 5, time: '5 months ago' },
  { name: 'Neeleshwari Dandir', text: 'I have been a consistent customer since 2019, and service is too good. Behaviour of Khushboo di is too good, she also advises some skin care tips which are beneficial too.', rating: 5, time: '2 years ago' },
  { name: 'Chakshu Parwani', text: 'Regularly visiting this salon for the last 8 years just because of upright service and awesome experience with the staff.', rating: 5, time: '2 years ago' },
]

const WHY_US = [
  { icon: Shield, title: 'Premium Hygiene', desc: 'Clinical-grade sterilization, single-use tools, and spotless environment for every client.' },
  { icon: Award, title: 'Expert Team', desc: 'Trained professionals with expertise in the latest global beauty techniques.' },
  { icon: Sparkles, title: 'Korean Products', desc: 'Using internationally imported Korean skin, hair, and health products for best results.' },
  { icon: Clock, title: 'Happy Hour Deals', desc: 'Special offers Mon–Sat 12pm–8pm. Premium service at incredible value.' },
]

const OFFERS = [
  { tag: 'Most Popular', title: 'Head to Toe', subtitle: '11 Services Package', price: '₹2,999', desc: 'Complete pampering experience — facials, hair, nails, massage & more', cta: 'Book This' },
  { tag: 'Monsoon Special', title: 'Hydra Facial', subtitle: 'Advanced Skin Treatment', price: '₹1,199', originalPrice: '₹2,500', desc: 'Deep hydration + cleansing + anti-aging treatment in 60 minutes', cta: 'Book This' },
  { tag: 'Happy Hour', title: 'Free Service', subtitle: 'With Every Booking', price: 'FREE', desc: 'Pay for Pedicure → Get Manicure FREE. Pay for Global Color → Get Root Touch-up FREE', cta: 'Book & Save' },
]

export default function Home() {
  const [bookingOpen, setBookingOpen] = useState(false)
  const [bookingService, setBookingService] = useState('')
  const [heroIdx, setHeroIdx] = useState(0)
  const [reviewIdx, setReviewIdx] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setHeroIdx(i => (i + 1) % HERO_IMAGES.length), 5000)
    return () => clearInterval(t)
  }, [])

  useEffect(() => {
    const t = setInterval(() => setReviewIdx(i => (i + 2) % REVIEWS.length), 4000)
    return () => clearInterval(t)
  }, [])

  const openBooking = (service = '') => { setBookingService(service); setBookingOpen(true) }

  return (
    <>
      <Navbar />
      <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} defaultService={bookingService} />

      {/* HERO */}
      <section className="relative h-screen min-h-[700px] flex items-center overflow-hidden">
        {HERO_IMAGES.map((src, i) => (
          <div key={i} className="absolute inset-0 transition-opacity duration-1500" style={{ opacity: heroIdx === i ? 1 : 0 }}>
            <Image src={src} alt="The New Image Salon" fill className="object-cover" priority={i === 0} />
          </div>
        ))}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(8,8,6,0.85) 0%, rgba(8,8,6,0.5) 50%, rgba(8,8,6,0.75) 100%)' }} />
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23C9A84C' fill-opacity='0.3'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-6 animate-fade-up">
              <div className="section-divider w-12" style={{ margin: 0 }} />
              <span className="text-xs tracking-[0.3em] uppercase" style={{ color: '#C9A84C' }}>Indore's Premier Beauty Destination</span>
            </div>
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-light leading-tight mb-4 animate-fade-up" style={{ color: '#F0E6D3', animationDelay: '0.1s' }}>
              Feel <span className="gold-shimmer italic">Beautiful</span><br />With Care
            </h1>
            <p className="text-base sm:text-lg leading-relaxed mb-8 animate-fade-up" style={{ color: '#A09080', animationDelay: '0.2s' }}>
              Luxury hair, skin & nail treatments by expert stylists. From everyday glam to bridal transformations — your beauty journey begins here.
            </p>
            <div className="flex flex-wrap gap-3 animate-fade-up" style={{ animationDelay: '0.3s' }}>
              <button className="btn-gold" onClick={() => openBooking()}>Book Appointment</button>
              <Link href="/services" className="btn-outline">Explore Services</Link>
            </div>
            <div className="flex items-center gap-6 mt-10 animate-fade-up" style={{ animationDelay: '0.4s' }}>
              <div>
                <div className="flex items-center gap-1">{[...Array(5)].map((_, i) => <Star key={i} size={14} fill="#C9A84C" color="#C9A84C" />)}</div>
                <div className="text-xs mt-1" style={{ color: '#8A7B6E' }}>5.0 · 137 Reviews on Google</div>
              </div>
              <div className="w-px h-8" style={{ background: 'rgba(201,168,76,0.3)' }} />
              <div>
                <div className="font-display text-2xl font-semibold" style={{ color: '#C9A84C' }}>6+ Years</div>
                <div className="text-xs" style={{ color: '#8A7B6E' }}>of Excellence</div>
              </div>
              <div className="w-px h-8" style={{ background: 'rgba(201,168,76,0.3)' }} />
              <div>
                <div className="font-display text-2xl font-semibold" style={{ color: '#C9A84C' }}>2000+</div>
                <div className="text-xs" style={{ color: '#8A7B6E' }}>Happy Clients</div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-float">
          <div className="text-xs tracking-[0.2em] uppercase" style={{ color: '#8A7B6E' }}>Scroll</div>
          <div className="w-px h-8" style={{ background: 'linear-gradient(to bottom, #C9A84C, transparent)' }} />
        </div>
      </section>

      {/* MARQUEE STRIP */}
      <div className="py-4 overflow-hidden" style={{ background: 'linear-gradient(90deg, #9A7A2E, #C9A84C, #E8C5A0, #C9A84C, #9A7A2E)' }}>
        <div className="flex items-center gap-8 whitespace-nowrap" style={{ animation: 'marquee 20s linear infinite' }}>
          {['Hair Care', 'Skin Treatments', 'Nail Extensions', 'Laser Hair Removal', 'Bridal Makeup', 'Hydra Facial', 'PRP Treatment', 'Beauty Academy', 'Korean Products', 'Happy Hour Deals'].map((t, i) => (
            <span key={i} className="text-xs tracking-[0.2em] uppercase font-semibold flex items-center gap-4" style={{ color: '#080806' }}>
              {t} <span>✦</span>
            </span>
          ))}
        </div>
        <style>{`@keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }`}</style>
      </div>

      {/* SERVICES */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="text-xs tracking-[0.3em] uppercase mb-3" style={{ color: '#C9A84C' }}>What We Offer</div>
          <h2 className="font-display text-4xl sm:text-5xl font-light" style={{ color: '#F0E6D3' }}>Our <span className="gold-gradient italic">Services</span></h2>
          <div className="section-divider" />
          <p className="text-sm mt-4 max-w-xl mx-auto leading-relaxed" style={{ color: '#8A7B6E' }}>From everyday beauty to complete transformations — we offer premium services tailored to bring out the best in you.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((s) => (
            <div key={s.name} className="card-hover group cursor-pointer rounded-lg overflow-hidden" style={{ background: '#0f0f0c', border: '1px solid rgba(201,168,76,0.15)' }}
              onClick={() => openBooking(s.name)}>
              <div className="relative h-56 overflow-hidden">
                <Image src={s.img} alt={s.name} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(8,8,6,0.9) 0%, transparent 60%)' }} />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="font-display text-2xl" style={{ color: '#F0E6D3' }}>{s.name}</h3>
                </div>
              </div>
              <div className="p-5">
                <p className="text-sm leading-relaxed mb-4" style={{ color: '#8A7B6E' }}>{s.desc}</p>
                <div className="flex items-center gap-2 text-xs font-medium" style={{ color: '#C9A84C' }}>
                  <span>Book This Service</span>
                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link href="/services" className="btn-outline">View All Services</Link>
        </div>
      </section>

      {/* SPECIAL OFFERS */}
      <section className="py-24" style={{ background: '#0a0a08' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="text-xs tracking-[0.3em] uppercase mb-3" style={{ color: '#C9A84C' }}>Exclusive Deals</div>
            <h2 className="font-display text-4xl sm:text-5xl font-light" style={{ color: '#F0E6D3' }}>Special <span className="gold-gradient italic">Offers</span></h2>
            <div className="section-divider" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {OFFERS.map((o, i) => (
              <div key={i} className={`card-hover p-8 rounded-lg relative overflow-hidden ${i === 0 ? 'md:scale-105' : ''}`}
                style={{ background: i === 0 ? 'linear-gradient(135deg, rgba(201,168,76,0.12) 0%, rgba(201,168,76,0.04) 100%)' : '#0f0f0c', border: `1px solid ${i === 0 ? 'rgba(201,168,76,0.4)' : 'rgba(201,168,76,0.15)'}` }}>
                <div className="absolute top-4 right-4 text-xs px-3 py-1 rounded-full" style={{ background: 'rgba(201,168,76,0.15)', color: '#C9A84C', border: '1px solid rgba(201,168,76,0.3)' }}>{o.tag}</div>
                <div className="font-display text-3xl mb-1" style={{ color: '#F0E6D3' }}>{o.title}</div>
                <div className="text-xs tracking-widest uppercase mb-4" style={{ color: '#8A7B6E' }}>{o.subtitle}</div>
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="font-display text-4xl font-semibold" style={{ color: '#C9A84C' }}>{o.price}</span>
                  {o.originalPrice && <span className="text-sm line-through" style={{ color: '#4A4038' }}>{o.originalPrice}</span>}
                </div>
                <p className="text-sm leading-relaxed mb-6" style={{ color: '#8A7B6E' }}>{o.desc}</p>
                <button className={i === 0 ? "btn-gold w-full" : "btn-outline w-full"} onClick={() => openBooking(o.title)}>{o.cta}</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="text-xs tracking-[0.3em] uppercase mb-3" style={{ color: '#C9A84C' }}>Why The New Image</div>
            <h2 className="font-display text-4xl sm:text-5xl font-light mb-4" style={{ color: '#F0E6D3' }}>The <span className="gold-gradient italic">Difference</span><br />You Can Feel</h2>
            <div className="section-divider" style={{ margin: '1rem 0' }} />
            <p className="text-sm leading-relaxed mb-10" style={{ color: '#8A7B6E' }}>Owner Khushboo has built a salon that genuinely cares — about your comfort, your results, and your experience. That's why clients keep returning for years.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {WHY_US.map((w) => (
                <div key={w.title} className="p-5 rounded-lg" style={{ background: 'rgba(201,168,76,0.05)', border: '1px solid rgba(201,168,76,0.12)' }}>
                  <w.icon size={24} className="mb-3" style={{ color: '#C9A84C' }} />
                  <h3 className="font-semibold text-sm mb-1" style={{ color: '#F0E6D3' }}>{w.title}</h3>
                  <p className="text-xs leading-relaxed" style={{ color: '#8A7B6E' }}>{w.desc}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="rounded-lg overflow-hidden" style={{ height: '500px', boxShadow: '0 0 80px rgba(201,168,76,0.1)' }}>
              <Image src="https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=800&q=85" alt="Salon Interior" fill className="object-cover" />
            </div>
            <div className="absolute -bottom-6 -left-6 p-6 rounded-lg" style={{ background: '#080806', border: '1px solid rgba(201,168,76,0.3)' }}>
              <div className="font-display text-4xl font-semibold" style={{ color: '#C9A84C' }}>5.0 ★</div>
              <div className="text-sm" style={{ color: '#F0E6D3' }}>Google Rating</div>
              <div className="text-xs" style={{ color: '#8A7B6E' }}>137 verified reviews</div>
            </div>
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="py-24" style={{ background: '#0a0a08' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="text-xs tracking-[0.3em] uppercase mb-3" style={{ color: '#C9A84C' }}>Client Stories</div>
            <h2 className="font-display text-4xl sm:text-5xl font-light" style={{ color: '#F0E6D3' }}>What They <span className="gold-gradient italic">Say</span></h2>
            <div className="section-divider" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {REVIEWS.map((r, i) => (
              <div key={i} className="p-6 rounded-lg" style={{ background: '#0f0f0c', border: '1px solid rgba(201,168,76,0.15)' }}>
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(r.rating)].map((_, j) => <Star key={j} size={14} fill="#C9A84C" color="#C9A84C" />)}
                </div>
                <p className="text-sm leading-relaxed mb-4 italic" style={{ color: '#B0A090' }}>"{r.text}"</p>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium" style={{ color: '#F0E6D3' }}>{r.name}</div>
                    <div className="text-xs" style={{ color: '#4A4038' }}>{r.time}</div>
                  </div>
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: 'linear-gradient(135deg,#9A7A2E,#C9A84C)', color: '#080806' }}>
                    {r.name[0]}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <a href="https://maps.google.com" target="_blank" rel="noopener" className="btn-outline inline-flex items-center gap-2">
              Read All 137 Reviews <ChevronRight size={14} />
            </a>
          </div>
        </div>
      </section>

      {/* GALLERY PREVIEW */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className="text-xs tracking-[0.3em] uppercase mb-3" style={{ color: '#C9A84C' }}>Our Work</div>
          <h2 className="font-display text-4xl sm:text-5xl font-light" style={{ color: '#F0E6D3' }}>The <span className="gold-gradient italic">Gallery</span></h2>
          <div className="section-divider" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=500&q=80',
            'https://images.unsplash.com/photo-1519415387722-a1c3bbef716c?w=500&q=80',
            'https://images.unsplash.com/photo-1560869713-7d0a29430803?w=500&q=80',
            'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500&q=80',
            'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=500&q=80',
            'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=500&q=80',
            'https://images.unsplash.com/photo-1457972729786-0411a3b2b626?w=500&q=80',
            'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=500&q=80',
          ].map((src, i) => (
            <div key={i} className={`relative overflow-hidden rounded-lg group cursor-pointer ${i === 0 || i === 6 ? 'row-span-2' : ''}`}
              style={{ height: i === 0 || i === 6 ? '400px' : '190px' }}>
              <Image src={src} alt={`Gallery ${i + 1}`} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center" style={{ background: 'rgba(201,168,76,0.3)' }}>
                <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'rgba(8,8,6,0.8)' }}>
                  <Share2 size={18} style={{ color: '#C9A84C' }} />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link href="/gallery" className="btn-outline">View Full Gallery</Link>
        </div>
      </section>

      {/* CONTACT STRIP */}
      <section className="py-16" style={{ background: 'linear-gradient(135deg, rgba(201,168,76,0.08) 0%, rgba(201,168,76,0.03) 100%)', borderTop: '1px solid rgba(201,168,76,0.15)', borderBottom: '1px solid rgba(201,168,76,0.15)' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            <a href="tel:+917566446000" className="flex flex-col items-center gap-2 group">
              <Phone size={24} className="group-hover:scale-110 transition-transform" style={{ color: '#C9A84C' }} />
              <div className="text-xs tracking-widest uppercase" style={{ color: '#8A7B6E' }}>Call Us</div>
              <div className="font-display text-xl" style={{ color: '#F0E6D3' }}>075664 46000</div>
            </a>
            <div className="flex flex-col items-center gap-2">
              <MapPin size={24} style={{ color: '#C9A84C' }} />
              <div className="text-xs tracking-widest uppercase" style={{ color: '#8A7B6E' }}>Location</div>
              <div className="text-sm text-center" style={{ color: '#F0E6D3' }}>Manik Bagh Road, Palsikar Colony, Indore</div>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Clock size={24} style={{ color: '#C9A84C' }} />
              <div className="text-xs tracking-widest uppercase" style={{ color: '#8A7B6E' }}>Hours</div>
              <div className="font-display text-xl" style={{ color: '#F0E6D3' }}>Mon – Sat: 12pm – 8pm</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 relative overflow-hidden">
        <Image src="https://images.unsplash.com/photo-1634449571010-02389ed0f9b0?w=1920&q=75" alt="Luxury Salon" fill className="object-cover" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(8,8,6,0.9) 0%, rgba(8,8,6,0.7) 100%)' }} />
        <div className="relative z-10 max-w-2xl mx-auto px-6 text-center">
          <div className="text-xs tracking-[0.3em] uppercase mb-4" style={{ color: '#C9A84C' }}>Start Your Journey</div>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-light mb-4" style={{ color: '#F0E6D3' }}>
            Ready to <span className="gold-shimmer italic">Transform</span>?
          </h2>
          <p className="text-sm leading-relaxed mb-8" style={{ color: '#8A7B6E' }}>
            Book your appointment today and experience the luxury of The New Image. Walk in feeling ordinary, walk out feeling extraordinary.
          </p>
          <button className="btn-gold text-sm" onClick={() => openBooking()}>Book Your Appointment</button>
        </div>
      </section>

      <Footer />
    </>
  )
}
