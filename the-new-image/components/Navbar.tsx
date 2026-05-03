'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, Phone } from 'lucide-react'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/about', label: 'About' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled ? 'py-3' : 'py-5'
    }`} style={{ background: scrolled ? 'rgba(8,8,6,0.97)' : 'transparent', backdropFilter: scrolled ? 'blur(20px)' : 'none', borderBottom: scrolled ? '1px solid rgba(201,168,76,0.15)' : 'none' }}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #9A7A2E, #C9A84C)', boxShadow: '0 4px 16px rgba(201,168,76,0.4)' }}>
            <span className="font-display text-sm font-bold" style={{ color: '#080806' }}>NI</span>
          </div>
          <div className="hidden sm:block">
            <div className="font-display text-lg font-semibold leading-none" style={{ color: '#E8C5A0' }}>The New Image</div>
            <div className="text-xs tracking-[0.2em] uppercase" style={{ color: '#8A7B6E' }}>Salon · Studio · Academy</div>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map(l => (
            <Link key={l.href} href={l.href}
              className="text-xs tracking-[0.15em] uppercase font-medium transition-colors duration-300 hover:text-yellow-400"
              style={{ color: '#8A7B6E' }}>
              {l.label}
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden lg:flex items-center gap-4">
          <a href="tel:+917566446000" className="flex items-center gap-2 text-xs" style={{ color: '#8A7B6E' }}>
            <Phone size={14} style={{ color: '#C9A84C' }} />
            <span>075664 46000</span>
          </a>
          <Link href="/book" className="btn-gold text-xs">Book Now</Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button onClick={() => setOpen(!open)} className="lg:hidden p-2" style={{ color: '#C9A84C' }}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="lg:hidden absolute top-full left-0 right-0 py-6 px-6" style={{ background: 'rgba(8,8,6,0.98)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(201,168,76,0.15)' }}>
          <div className="flex flex-col gap-4">
            {navLinks.map(l => (
              <Link key={l.href} href={l.href} onClick={() => setOpen(false)}
                className="text-sm tracking-[0.1em] uppercase font-medium py-2 border-b transition-colors"
                style={{ color: '#8A7B6E', borderColor: 'rgba(201,168,76,0.1)' }}>
                {l.label}
              </Link>
            ))}
            <Link href="/book" className="btn-gold text-center mt-2" onClick={() => setOpen(false)}>
              Book Now
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
