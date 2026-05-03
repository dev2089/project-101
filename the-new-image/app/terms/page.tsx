import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms & Conditions | The New Image Salon Indore',
  description: 'Terms and conditions for services at The New Image Salon Studio Academy, Indore. Booking policies, cancellations, and service terms.',
}

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main className="max-w-3xl mx-auto px-6 pt-32 pb-24">
        <div className="text-xs tracking-[0.3em] uppercase mb-3" style={{ color: '#C9A84C' }}>Legal</div>
        <h1 className="font-display text-5xl font-light mb-4" style={{ color: '#F0E6D3' }}>Terms &amp; Conditions</h1>
        <div className="section-divider" style={{ margin: '0 0 2rem 0' }} />
        <div className="text-xs mb-8" style={{ color: '#4A4038' }}>Last updated: January 2025</div>
        <div className="space-y-8 text-sm leading-relaxed" style={{ color: '#A09080' }}>
          {[
            { h: 'Appointment Booking', p: 'Appointments can be booked online via our website or by calling us directly. Online bookings are confirmed via WhatsApp. Your appointment is only confirmed once you receive a confirmation message from us.' },
            { h: 'Cancellation Policy', p: 'We request a minimum of 2 hours notice for cancellations or rescheduling. Late cancellations or no-shows may result in a fee for some services. We understand emergencies happen and handle such situations with care.' },
            { h: 'Pricing', p: 'Prices displayed on our website are indicative. Final pricing may vary based on hair length, thickness, product requirements, and complexity of the service. Our team will discuss pricing before beginning any service.' },
            { h: 'Service Results', p: 'While we strive for the best results, individual outcomes may vary based on hair type, skin type, medical conditions, and prior treatments. We recommend a consultation for advanced treatments.' },
            { h: 'Laser Hair Removal', p: 'LHR requires a minimum of 6–8 sessions for optimal results. Results vary based on hair color, skin tone, and hormonal factors. A patch test may be required before the first session.' },
            { h: 'Health Conditions', p: 'Please inform us of any medical conditions, allergies, or ongoing medications before your appointment. This helps us provide the safest and most effective service for you.' },
            { h: 'Children', p: 'Children under 16 must be accompanied by a parent or guardian for services.' },
            { h: 'Payments', p: 'We accept Cash, Credit/Debit Cards, Google Pay, UPI, and NFC payments. Payment is due at the time of service.' },
            { h: 'Liability', p: 'The New Image Salon is not liable for any adverse reactions resulting from undisclosed medical conditions or allergies. By booking a service, you confirm that you have disclosed all relevant health information.' },
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
