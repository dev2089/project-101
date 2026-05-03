'use client'
import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import BookingModal from '@/components/BookingModal'

function BookingContent() {
  const params = useSearchParams()
  const service = params.get('service') || ''
  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center pt-24 pb-16 px-6">
        <div className="text-center mb-10">
          <div className="text-xs tracking-[0.3em] uppercase mb-3" style={{ color: '#C9A84C' }}>Reserve Your Spot</div>
          <h1 className="font-display text-5xl sm:text-6xl font-light mb-4" style={{ color: '#F0E6D3' }}>Book Your <span className="gold-gradient italic">Appointment</span></h1>
          <div className="section-divider" />
          <p className="text-sm max-w-xl mx-auto mt-4" style={{ color: '#8A7B6E' }}>Fill in your details below. After confirming, you'll be connected to us on WhatsApp for a quick confirmation.</p>
        </div>
        <BookingModal isOpen={true} onClose={() => window.history.back()} defaultService={service} />
      </div>
    </>
  )
}

export default function BookPage() {
  return (
    <>
      <Navbar />
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center" style={{ color: '#8A7B6E' }}>Loading...</div>}>
        <BookingContent />
      </Suspense>
      <Footer />
    </>
  )
}
