import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

const POSTS: Record<string, any> = {
  'hydra-facial-benefits': {
    title: 'Why Hydra Facial is the Best Skin Treatment in 2025',
    description: 'Hydra Facial combines cleansing, exfoliation, extraction, hydration and antioxidant protection simultaneously. Here\'s everything you need to know.',
    category: 'Skin Care', date: 'March 15, 2025', readTime: '5 min read',
    img: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=1200&q=80',
    content: `Hydra Facial has become one of the most sought-after skin treatments globally, and for good reason. Unlike traditional facials, it combines multiple steps in one session — making it the most efficient and effective treatment available today.\n\n**What is a Hydra Facial?**\n\nHydra Facial is a patented, multi-step treatment that uses a specialized device to cleanse, exfoliate, extract, and hydrate the skin simultaneously. It uses a unique vortex suction technology to deliver potent serums deep into the skin.\n\n**The 6 Steps of Hydra Facial:**\n\n1. **Cleansing & Exfoliation** — Dead skin cells are removed to reveal a new layer of fresh skin\n2. **Acid Peel** — A gentle peel loosens dirt and debris from pores without irritation\n3. **Extraction** — Painless suction removes blackheads and pore congestion\n4. **Hydration** — Antioxidants and hyaluronic acid are infused into the skin\n5. **Rejuvenation** — LED light therapy and peptides help with fine lines\n6. **Protection** — Final serums seal in the treatment\n\n**Results You Can Expect:**\n\nMost clients see immediate results — brighter, plumper, more even-toned skin right after the first session. For lasting results, a series of 3-6 treatments spaced 3-4 weeks apart is recommended.\n\nAt The New Image Salon, our Hydra Facial starts at just ₹1,199 during Monsoon Special — making it incredibly accessible for premium skin care.`,
  },
  'laser-hair-removal-guide': {
    title: 'Complete Guide to Laser Hair Removal: What to Expect',
    description: 'Everything you need to know about laser hair removal — how it works, sessions needed, and what results to expect.',
    category: 'Laser', date: 'February 28, 2025', readTime: '7 min read',
    img: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=1200&q=80',
    content: `Laser Hair Removal (LHR) is one of the most popular and permanent solutions to unwanted body hair. If you've been considering it, this guide covers everything you need to know before your first session.\n\n**How Does Laser Hair Removal Work?**\n\nLaser energy targets the melanin (pigment) in hair follicles, heating and destroying them while leaving the surrounding skin unaffected. The result is permanent reduction of hair growth over multiple sessions.\n\n**Why Multiple Sessions Are Required:**\n\nHair grows in cycles — active (anagen), transitional (catagen), and resting (telogen). Laser only affects hair in the active growth phase. Since only 20-30% of hairs are in this phase at any time, you need 6-8 sessions to treat all follicles.\n\n**At The New Image Salon:**\n\nWe use advanced diode laser technology with a built-in cooling system, making treatments virtually painless. Our technology is suitable for Indian skin tones and provides effective results across all body areas.\n\n**Pre-Treatment Care:**\n- Avoid sun exposure 2 weeks before\n- Shave the area 24 hours before (do not wax)\n- Avoid retinoids or acids 3 days before\n\n**Post-Treatment Care:**\n- Apply soothing aloe vera gel\n- Avoid sun exposure for 2 weeks\n- Use SPF 50+ sunscreen daily`,
  },
  'bridal-makeup-tips-2025': {
    title: '2025 Bridal Makeup Trends Every Bride Should Know',
    description: 'From dewy glass skin to bold eye statements — discover the top bridal makeup trends for Indian brides in 2025.',
    category: 'Bridal', date: 'February 14, 2025', readTime: '6 min read',
    img: 'https://images.unsplash.com/photo-1457972729786-0411a3b2b626?w=1200&q=80',
    content: `Your wedding day is the most photographed day of your life — and your makeup needs to be perfect both in person and in photos. Here are the top bridal makeup trends our expert Khushboo recommends for 2025.\n\n**1. Glass Skin Foundation**\n\nThe dewy, luminous "glass skin" look has replaced heavy matte coverage. It's about looking healthy and radiant rather than perfectly airbrushed. We use lightweight, buildable coverage that lets your natural skin texture show through beautifully.\n\n**2. Soft Smokey Eyes**\n\nInstead of dramatic black smokies, 2025 brides are going for softer versions — using bronze, copper, and brown tones that complement Indian skin tones beautifully.\n\n**3. Bold Lip + Minimal Eye (or Vice Versa)**\n\nThe modern bride picks one statement feature. Deep reds, terracottas, and berry-wine shades are trending for bold lips paired with natural eyes.\n\n**4. Airbrush Makeup**\n\nFor long-lasting, sweat-proof coverage that looks stunning in photos, airbrush makeup is the go-to for modern brides.\n\n**Khushboo's Tip:** Always do a trial run at least 2 weeks before your wedding day. This gives you time to request adjustments and ensures you\'re completely comfortable with your look.`,
  },
  'korean-hair-care-routine': {
    title: 'The Korean Hair Care Routine for Silky, Healthy Hair',
    description: 'Adopt the Korean hair care multi-step routine at home for salon-quality results every day.',
    category: 'Hair Care', date: 'January 30, 2025', readTime: '5 min read',
    img: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1200&q=80',
    content: `Korean beauty has transformed skincare — and now it's doing the same for hair care. The Korean hair care routine focuses on scalp health first, then treats the hair from root to tip.\n\n**Step 1: Scalp Massage & Oil**\n\nBefore washing, massage your scalp with a nourishing oil (camellia, argan, or fermented rice water) for 5-10 minutes. This improves circulation and preps the scalp.\n\n**Step 2: Pre-Shampoo Treatment**\n\nApply a clarifying pre-wash treatment to remove product buildup. This allows your shampoo to work more effectively.\n\n**Step 3: Double Cleanse**\n\nWash hair twice — first to cleanse buildup, second to nourish the scalp. Use a gentle, sulfate-free shampoo.\n\n**Step 4: Hair Mask / Treatment**\n\nApply a deep conditioning mask from mid-lengths to ends. Korean hair masks often contain fermented ingredients, ginseng, and ceramides.\n\n**Step 5: Scalp Toner**\n\nAfter washing, apply a lightweight scalp essence to balance pH and promote healthy growth.\n\n**Step 6: Leave-in Treatment**\n\nFinish with a lightweight leave-in serum or essence for frizz control and shine.\n\nAt The New Image Salon, we use premium Korean hair care products that follow these principles for our Hair Spa and treatment services.`,
  },
  'gel-nails-vs-acrylic': {
    title: 'Gel Nails vs Acrylic: Which is Better for You?',
    description: 'The complete comparison of gel and acrylic nail extensions — pros, cons, cost, and which suits your lifestyle.',
    category: 'Nails', date: 'January 15, 2025', readTime: '4 min read',
    img: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=1200&q=80',
    content: `Choosing between gel and acrylic nails is one of the most common questions our nail artists get. Both have their advantages — here's a clear breakdown.\n\n**Gel Nails:**\n\n✓ More natural-looking and flexible\n✓ Less damaging to natural nails\n✓ No harsh smell during application\n✓ Easier removal\n✗ Less durable than acrylics for heavy use\n✗ Requires UV lamp to cure\n\n**Acrylic Nails:**\n\n✓ Extremely durable and long-lasting\n✓ Better for nail biters (stronger structure)\n✓ Easier to repair if broken\n✓ More nail art possibilities\n✗ Can feel heavier\n✗ Strong smell during application\n✗ Requires more careful removal\n\n**Which Should You Choose?**\n\n- **Choose Gel if:** You want a natural look, have sensitive nails, or prefer easier maintenance\n- **Choose Acrylic if:** You're hard on your nails, want maximum length, or work with your hands a lot\n\n**At The New Image Salon:**\n\nWe offer both gel and acrylic extensions with full nail art customization. Our nail artists will recommend the best option based on your natural nail health and lifestyle.`,
  },
  'prp-treatment-hair-growth': {
    title: 'PRP Treatment: Can It Really Regrow Your Hair?',
    description: 'The science behind Platelet-Rich Plasma therapy for hair regrowth — who it works for and what results to expect.',
    category: 'Skin Care', date: 'January 5, 2025', readTime: '6 min read',
    img: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=1200&q=80',
    content: `PRP (Platelet-Rich Plasma) therapy has emerged as one of the most scientifically backed treatments for hair loss. But does it actually work? Let's dive into the research.\n\n**What is PRP Therapy?**\n\nPRP therapy uses your own blood's growth factors to stimulate hair follicles. A small amount of blood is drawn, spun in a centrifuge to concentrate platelets, then injected or micro-needled into the scalp.\n\n**The Science:**\n\nPlatelets contain growth factors including PDGF, VEGF, and IGF-1, which stimulate dormant hair follicles, increase blood supply to the scalp, and prolong the growth phase of hair.\n\n**Who is PRP Best For?**\n\n- Early to moderate hair thinning (androgenetic alopecia)\n- Post-partum hair loss\n- Alopecia areata\n- Overall hair density improvement\n- Not as effective for complete baldness\n\n**What to Expect:**\n\nMost patients need 3-4 initial sessions spaced 4-6 weeks apart, followed by maintenance sessions every 3-6 months. Results typically become visible after 3-6 months.\n\n**At The New Image Salon:**\n\nOur PRP treatments are performed with clinical precision in a hygienic environment. We offer both face and hair PRP treatments using the latest protocols.`,
  },
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = POSTS[slug]
  if (!post) return { title: 'Post Not Found' }
  return {
    title: `${post.title} | The New Image Salon Blog`,
    description: post.description,
    keywords: `${post.category}, beauty tips indore, salon indore, ${post.title.toLowerCase()}`,
    openGraph: { title: post.title, description: post.description, images: [{ url: post.img }] },
  }
}

export function generateStaticParams() {
  return Object.keys(POSTS).map(slug => ({ slug }))
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = POSTS[slug]
  if (!post) notFound()

  const formatContent = (text: string) => text.split('\n\n').map((para, i) => {
    if (para.startsWith('**') && para.endsWith('**')) {
      return <h3 key={i} className="font-display text-2xl mt-8 mb-3" style={{ color: '#E8C5A0' }}>{para.replace(/\*\*/g, '')}</h3>
    }
    const html = para.replace(/\*\*(.*?)\*\*/g, '<strong style="color:#E8C5A0">$1</strong>')
    return <p key={i} className="mb-4 leading-relaxed" dangerouslySetInnerHTML={{ __html: html }} />
  })

  return (
    <>
      <Navbar />
      <article className="max-w-3xl mx-auto px-6 pt-32 pb-24">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs px-3 py-1 rounded-full" style={{ background: 'rgba(201,168,76,0.15)', color: '#C9A84C', border: '1px solid rgba(201,168,76,0.3)' }}>{post.category}</span>
            <span className="text-xs" style={{ color: '#4A4038' }}>{post.date} · {post.readTime}</span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-light mb-6 leading-tight" style={{ color: '#F0E6D3' }}>{post.title}</h1>
          <p className="text-base leading-relaxed mb-8" style={{ color: '#8A7B6E' }}>{post.description}</p>
        </div>
        <div className="relative rounded-2xl overflow-hidden mb-10" style={{ height: 400 }}>
          <Image src={post.img} alt={post.title} fill className="object-cover" />
        </div>
        <div className="text-sm" style={{ color: '#A09080' }}>{formatContent(post.content)}</div>
        <div className="mt-12 p-6 rounded-xl" style={{ background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.2)' }}>
          <h3 className="font-display text-xl mb-2" style={{ color: '#F0E6D3' }}>Experience This at The New Image</h3>
          <p className="text-sm mb-4" style={{ color: '#8A7B6E' }}>Book your appointment today at Indore's premier luxury salon.</p>
          <Link href="/book" className="btn-gold text-xs">Book Now</Link>
        </div>
        <div className="mt-8 pt-8" style={{ borderTop: '1px solid rgba(201,168,76,0.1)' }}>
          <Link href="/blog" className="text-sm" style={{ color: '#C9A84C' }}>← Back to Blog</Link>
        </div>
      </article>
      <Footer />
    </>
  )
}
