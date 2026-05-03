import Link from 'next/link'
import { Phone, MapPin, Clock, Star, Share2 } from 'lucide-react'

export default function Footer() {
  return (
    <footer style={{ background: '#050503', borderTop: '1px solid rgba(201,168,76,0.15)' }}>
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #9A7A2E, #C9A84C)' }}>
                <span className="font-display text-sm font-bold" style={{ color: '#080806' }}>NI</span>
              </div>
              <div>
                <div className="font-display text-base font-semibold" style={{ color: '#E8C5A0' }}>The New Image</div>
                <div className="text-xs tracking-widest" style={{ color: '#8A7B6E' }}>SALON · STUDIO · ACADEMY</div>
              </div>
            </div>
            <p className="text-sm leading-relaxed mb-4" style={{ color: '#8A7B6E' }}>
              Feel Beautiful With Care. Indore's premier luxury beauty destination since 2019.
            </p>
            <div className="flex items-center gap-1 mb-3">
              {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="#C9A84C" color="#C9A84C" />)}
              <span className="text-xs ml-2" style={{ color: '#8A7B6E' }}>5.0 · 137 Reviews</span>
            </div>
            <div className="flex gap-3">
              <a href="#" className="w-8 h-8 rounded-full flex items-center justify-center transition-all hover:scale-110" style={{ background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.3)' }}>
                <Share2 size={14} style={{ color: "#C9A84C" }} />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-xs tracking-[0.2em] uppercase mb-5 font-semibold" style={{ color: '#C9A84C' }}>Services</h4>
            <ul className="space-y-2">
              {['Hair Care', 'Skin Treatments', 'Nail Extensions', 'Laser Hair Removal', 'Bridal Makeup', 'Hydra Facial', 'PRP Treatment', 'Beauty Academy'].map(s => (
                <li key={s}><Link href="/services" className="text-sm transition-colors hover:text-yellow-400" style={{ color: '#8A7B6E' }}>{s}</Link></li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs tracking-[0.2em] uppercase mb-5 font-semibold" style={{ color: '#C9A84C' }}>Quick Links</h4>
            <ul className="space-y-2">
              {[['/', 'Home'], ['/about', 'About Us'], ['/gallery', 'Gallery'], ['/blog', 'Beauty Blog'], ['/contact', 'Contact'], ['/book', 'Book Appointment'], ['/privacy', 'Privacy Policy'], ['/terms', 'Terms & Conditions']].map(([href, label]) => (
                <li key={href}><Link href={href} className="text-sm transition-colors hover:text-yellow-400" style={{ color: '#8A7B6E' }}>{label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs tracking-[0.2em] uppercase mb-5 font-semibold" style={{ color: '#C9A84C' }}>Visit Us</h4>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <MapPin size={16} className="shrink-0 mt-0.5" style={{ color: '#C9A84C' }} />
                <span className="text-sm leading-relaxed" style={{ color: '#8A7B6E' }}>LG -2,3, Gold Avenue Apartment, 2A, Manik Bagh Rd, Palsikar Colony, Indore, MP 452007</span>
              </li>
              <li className="flex gap-3">
                <Phone size={16} className="shrink-0" style={{ color: '#C9A84C' }} />
                <a href="tel:+917566446000" className="text-sm transition-colors hover:text-yellow-400" style={{ color: '#8A7B6E' }}>075664 46000</a>
              </li>
              <li className="flex gap-3">
                <Clock size={16} className="shrink-0" style={{ color: '#C9A84C' }} />
                <div>
                  <div className="text-sm" style={{ color: '#8A7B6E' }}>Mon – Sat: 12pm – 8pm</div>
                  <div className="text-xs mt-0.5" style={{ color: '#9A7A2E' }}>Sunday: By Appointment</div>
                </div>
              </li>
            </ul>
            <div className="mt-6 p-3 rounded text-center" style={{ background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.2)' }}>
              <div className="text-xs tracking-widest uppercase mb-1" style={{ color: '#8A7B6E' }}>Happy Hours</div>
              <div className="font-display text-base" style={{ color: '#C9A84C' }}>Mon–Sat: 12pm–8pm</div>
              <div className="text-xs mt-1" style={{ color: '#8A7B6E' }}>Special discounts apply</div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4" style={{ borderTop: '1px solid rgba(201,168,76,0.1)' }}>
          <p className="text-xs" style={{ color: '#4A4038' }}>© {new Date().getFullYear()} The New Image Salon Studio Academy. All rights reserved.</p>
          <p className="text-xs" style={{ color: '#4A4038' }}>
            Designed by{' '}
            <span style={{ color: '#9A7A2E' }}>DEVRAYOG AI</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
