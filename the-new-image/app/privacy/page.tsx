import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy | The New Image Salon Indore',
  description: 'Privacy policy for The New Image Salon Studio Academy, Indore. Learn how we collect, use and protect your personal information.',
}

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="max-w-3xl mx-auto px-6 pt-32 pb-24">
        <div className="text-xs tracking-[0.3em] uppercase mb-3" style={{ color: '#C9A84C' }}>Legal</div>
        <h1 className="font-display text-5xl font-light mb-4" style={{ color: '#F0E6D3' }}>Privacy Policy</h1>
        <div className="section-divider" style={{ margin: '0 0 2rem 0' }} />
        <div className="text-xs mb-8" style={{ color: '#4A4038' }}>Last updated: January 2025</div>
        <div className="prose space-y-8 text-sm leading-relaxed" style={{ color: '#A09080' }}>
          {[
            { h: 'Information We Collect', p: 'We collect information you provide directly to us when booking appointments, filling contact forms, or communicating with us. This includes your name, phone number, email address, and service preferences. We do not collect financial or payment information through our website.' },
            { h: 'How We Use Your Information', p: 'We use the information we collect to process and confirm appointment bookings, communicate with you about our services, send appointment reminders via WhatsApp, improve our services based on feedback, and respond to your inquiries.' },
            { h: 'WhatsApp Communication', p: 'When you book an appointment through our website, you will be redirected to WhatsApp to confirm your booking details. This WhatsApp communication is governed by WhatsApp\'s own Privacy Policy. We use WhatsApp only for appointment confirmation and customer service.' },
            { h: 'Data Storage', p: 'Your booking and contact information is stored securely using Supabase, a trusted database service with enterprise-grade security. We retain your data only as long as necessary to provide our services.' },
            { h: 'Data Sharing', p: 'We do not sell, trade, or otherwise transfer your personal information to third parties. Your information is used solely for providing salon services and communicating with you.' },
            { h: 'Your Rights', p: 'You have the right to access, correct, or delete your personal information. To exercise these rights, contact us at 075664 46000. You may also opt out of communications at any time.' },
            { h: 'Cookies', p: 'Our website may use cookies for basic functionality. We do not use cookies for advertising or tracking purposes.' },
            { h: 'Contact Us', p: 'For any privacy-related questions, reach us at: The New Image Salon Studio Academy, LG -2,3, Gold Avenue Apartment, 2A, Manik Bagh Rd, Palsikar Colony, Indore, MP 452007. Phone: 075664 46000.' },
          ].map(s => (
            <div key={s.h}>
              <h2 className="font-display text-xl mb-3" style={{ color: '#E8C5A0' }}>{s.h}</h2>
              <p>{s.p}</p>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  )
}
