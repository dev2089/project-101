'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import BookingModal from '@/components/BookingModal'
import { createClient } from '@/lib/supabase-client'
import { X, Play } from 'lucide-react'

const FALLBACK_GALLERY = [
  { id: '1', type: 'image', url: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80', caption: 'Hair Transformation', category: 'Hair' },
  { id: '2', type: 'image', url: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=800&q=80', caption: 'Nail Art', category: 'Nails' },
  { id: '3', type: 'image', url: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&q=80', caption: 'Skin Treatment', category: 'Skin' },
  { id: '4', type: 'image', url: 'https://images.unsplash.com/photo-1457972729786-0411a3b2b626?w=800&q=80', caption: 'Bridal Makeup', category: 'Bridal' },
  { id: '5', type: 'image', url: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=800&q=80', caption: 'Hair Coloring', category: 'Hair' },
  { id: '6', type: 'image', url: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=800&q=80', caption: 'Salon Interior', category: 'Salon' },
  { id: '7', type: 'image', url: 'https://images.unsplash.com/photo-1519415387722-a1c3bbef716c?w=800&q=80', caption: 'Hair Spa', category: 'Hair' },
  { id: '8', type: 'image', url: 'https://images.unsplash.com/photo-1609097687754-34e65db6ce2b?w=800&q=80', caption: 'Party Makeup', category: 'Bridal' },
  { id: '9', type: 'image', url: 'https://images.unsplash.com/photo-1560869713-7d0a29430803?w=800&q=80', caption: 'Hair Styling', category: 'Hair' },
  { id: '10', type: 'image', url: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=800&q=80', caption: 'Facial Treatment', category: 'Skin' },
  { id: '11', type: 'image', url: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=800&q=80', caption: 'Laser Treatment', category: 'Skin' },
  { id: '12', type: 'image', url: 'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=800&q=80', caption: 'Premium Ambience', category: 'Salon' },
]

const CATS = ['All', 'Hair', 'Skin', 'Nails', 'Bridal', 'Salon']

export default function GalleryPage() {
  const [items, setItems] = useState(FALLBACK_GALLERY as any[])
  const [filter, setFilter] = useState('All')
  const [lightbox, setLightbox] = useState<any>(null)
  const [bookingOpen, setBookingOpen] = useState(false)

  useEffect(() => {
    const load = async () => {
      const sb = createClient()
      const { data } = await sb.from('ni_gallery').select('*').eq('is_active', true).order('sort_order')
      if (data && data.length > 0) setItems(data)
    }
    load()
  }, [])

  const filtered = filter === 'All' ? items : items.filter(i => i.category === filter)

  return (
    <>
      <Navbar />
      <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} />

      {/* Lightbox */}
      {lightbox && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4" onClick={() => setLightbox(null)}>
          <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.95)' }} />
          <button className="absolute top-4 right-4 z-10 p-2 rounded-full" style={{ background: 'rgba(201,168,76,0.2)' }}><X style={{ color: '#C9A84C' }} /></button>
          <div className="relative z-10 max-w-4xl w-full" onClick={e => e.stopPropagation()}>
            {lightbox.type === 'image' ? (
              <div className="relative" style={{ height: '80vh' }}>
                <Image src={lightbox.url} alt={lightbox.caption || ''} fill className="object-contain" />
              </div>
            ) : (
              <video src={lightbox.url} controls className="w-full max-h-[80vh] rounded-lg" />
            )}
            {lightbox.caption && (
              <p className="text-center mt-4 text-sm font-display" style={{ color: '#E8C5A0' }}>{lightbox.caption}</p>
            )}
          </div>
        </div>
      )}

      {/* Hero */}
      <section className="pt-32 pb-16 text-center relative">
        <div className="absolute inset-0">
          <Image src="https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=1920&q=60" alt="" fill className="object-cover opacity-15" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, #080806 0%, rgba(8,8,6,0.5) 50%, #080806 100%)' }} />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="text-xs tracking-[0.3em] uppercase mb-3" style={{ color: '#C9A84C' }}>Our Portfolio</div>
          <h1 className="font-display text-5xl sm:text-6xl font-light mb-4" style={{ color: '#F0E6D3' }}>The <span className="gold-gradient italic">Gallery</span></h1>
          <div className="section-divider" />
          <p className="text-sm max-w-xl mx-auto leading-relaxed mt-4" style={{ color: '#8A7B6E' }}>Real results, real transformations. Browse our portfolio of work to see what The New Image can do for you.</p>
        </div>
      </section>

      {/* Filter */}
      <div className="sticky top-16 z-40 py-4" style={{ background: 'rgba(8,8,6,0.97)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(201,168,76,0.12)' }}>
        <div className="max-w-7xl mx-auto px-6 flex gap-3 overflow-x-auto">
          {CATS.map(c => (
            <button key={c} onClick={() => setFilter(c)}
              className="whitespace-nowrap text-xs tracking-widest uppercase px-5 py-2 rounded-full transition-all"
              style={{
                background: filter === c ? 'linear-gradient(135deg,#9A7A2E,#C9A84C)' : 'rgba(201,168,76,0.08)',
                color: filter === c ? '#080806' : '#8A7B6E',
                border: `1px solid ${filter === c ? 'transparent' : 'rgba(201,168,76,0.2)'}`,
                fontWeight: filter === c ? 600 : 400,
              }}>
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Masonry Grid */}
      <section className="py-12 max-w-7xl mx-auto px-6">
        <div className="columns-2 sm:columns-3 lg:columns-4 gap-3 space-y-3">
          {filtered.map((item, i) => (
            <div key={item.id} className="break-inside-avoid group cursor-pointer relative overflow-hidden rounded-lg"
              onClick={() => setLightbox(item)}>
              {item.type === 'image' ? (
                <div className="relative overflow-hidden" style={{ aspectRatio: i % 5 === 0 ? '3/4' : '1/1' }}>
                  <Image src={item.url} alt={item.caption || ''} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3"
                    style={{ background: 'linear-gradient(to top, rgba(8,8,6,0.8) 0%, transparent 60%)' }}>
                    {item.caption && <p className="text-xs text-white">{item.caption}</p>}
                  </div>
                </div>
              ) : (
                <div className="relative overflow-hidden rounded-lg" style={{ aspectRatio: '16/9' }}>
                  {item.thumbnail_url && <Image src={item.thumbnail_url} alt="" fill className="object-cover" />}
                  <div className="absolute inset-0 flex items-center justify-center" style={{ background: 'rgba(8,8,6,0.5)' }}>
                    <div className="w-14 h-14 rounded-full flex items-center justify-center" style={{ background: 'rgba(201,168,76,0.9)' }}>
                      <Play size={20} fill="#080806" color="#080806" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Book CTA */}
      <section className="py-16 text-center">
        <div className="max-w-xl mx-auto px-6">
          <h2 className="font-display text-3xl mb-3" style={{ color: '#F0E6D3' }}>Love what you see?</h2>
          <p className="text-sm mb-6" style={{ color: '#8A7B6E' }}>Book your appointment today and let us create your perfect look.</p>
          <button className="btn-gold" onClick={() => setBookingOpen(true)}>Book Your Transformation</button>
        </div>
      </section>

      <Footer />
    </>
  )
}
