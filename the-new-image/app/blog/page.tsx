import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Beauty Blog | Hair, Skin & Nail Tips | The New Image Salon Indore',
  description: 'Expert beauty tips, trends, and advice from The New Image Salon Indore. Learn about hair care, skin treatments, nail art, laser hair removal, and bridal beauty.',
  keywords: 'beauty tips indore, hair care tips, skin care advice, laser hair removal guide, hydra facial benefits, nail art trends, bridal makeup tips indore',
}

const POSTS = [
  {
    slug: 'hydra-facial-benefits',
    title: 'Why Hydra Facial is the Best Skin Treatment in 2025',
    excerpt: 'Hydra Facial combines cleansing, exfoliation, extraction, hydration, and antioxidant protection simultaneously. Here\'s everything you need to know about this revolutionary treatment.',
    category: 'Skin Care',
    readTime: '5 min read',
    date: 'March 15, 2025',
    img: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&q=80',
  },
  {
    slug: 'laser-hair-removal-guide',
    title: 'Complete Guide to Laser Hair Removal: What to Expect',
    excerpt: 'Thinking about getting laser hair removal? This comprehensive guide covers everything from how LHR works, to how many sessions you need, and what to expect during recovery.',
    category: 'Laser',
    readTime: '7 min read',
    date: 'February 28, 2025',
    img: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=800&q=80',
  },
  {
    slug: 'bridal-makeup-tips-2025',
    title: '2025 Bridal Makeup Trends Every Bride Should Know',
    excerpt: 'From dewy glass skin to bold eye statements — discover what\'s trending in bridal makeup this season. Our expert Khushboo shares her top picks for Indian brides.',
    category: 'Bridal',
    readTime: '6 min read',
    date: 'February 14, 2025',
    img: 'https://images.unsplash.com/photo-1457972729786-0411a3b2b626?w=800&q=80',
  },
  {
    slug: 'korean-hair-care-routine',
    title: 'The Korean Hair Care Routine for Silky, Healthy Hair',
    excerpt: 'Korean beauty has revolutionized hair care. Here\'s how you can adopt the multi-step Korean hair care routine at home for salon-quality results every day.',
    category: 'Hair Care',
    readTime: '5 min read',
    date: 'January 30, 2025',
    img: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80',
  },
  {
    slug: 'gel-nails-vs-acrylic',
    title: 'Gel Nails vs Acrylic: Which is Better for You?',
    excerpt: 'Confused between gel and acrylic nail extensions? We break down the pros, cons, costs, and durability of both to help you decide which is perfect for your lifestyle.',
    category: 'Nails',
    readTime: '4 min read',
    date: 'January 15, 2025',
    img: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=800&q=80',
  },
  {
    slug: 'prp-treatment-hair-growth',
    title: 'PRP Treatment: Can It Really Regrow Your Hair?',
    excerpt: 'Platelet-Rich Plasma (PRP) therapy is gaining massive popularity for hair loss. Here\'s the science behind how it works, who it\'s for, and what results to expect.',
    category: 'Skin Care',
    readTime: '6 min read',
    date: 'January 5, 2025',
    img: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=800&q=80',
  },
]

const CATEGORY_COLORS: Record<string, string> = {
  'Skin Care': '#C9A84C',
  'Laser': '#C4958A',
  'Bridal': '#9A7A2E',
  'Hair Care': '#8A7B6E',
  'Nails': '#C9A84C',
}

export default function BlogPage() {
  const [featured, ...rest] = POSTS

  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-16 text-center">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-xs tracking-[0.3em] uppercase mb-3" style={{ color: '#C9A84C' }}>Expert Advice</div>
          <h1 className="font-display text-5xl sm:text-6xl font-light mb-4" style={{ color: '#F0E6D3' }}>Beauty <span className="gold-gradient italic">Blog</span></h1>
          <div className="section-divider" />
          <p className="text-sm max-w-xl mx-auto mt-4" style={{ color: '#8A7B6E' }}>Tips, trends, and expert advice from Indore's premier beauty salon. Your guide to looking and feeling your best.</p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-24">
        {/* Featured post */}
        <div className="mb-12 group cursor-pointer rounded-2xl overflow-hidden" style={{ background: '#0f0f0c', border: '1px solid rgba(201,168,76,0.2)' }}>
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="relative h-72 lg:h-auto overflow-hidden">
              <Image src={featured.img} alt={featured.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute top-4 left-4 text-xs px-3 py-1 rounded-full font-semibold" style={{ background: '#C9A84C', color: '#080806' }}>Featured</div>
            </div>
            <div className="p-8 lg:p-10 flex flex-col justify-center">
              <div className="text-xs tracking-widest uppercase mb-3" style={{ color: CATEGORY_COLORS[featured.category] || '#C9A84C' }}>{featured.category}</div>
              <h2 className="font-display text-3xl sm:text-4xl mb-4 leading-tight" style={{ color: '#F0E6D3' }}>{featured.title}</h2>
              <p className="text-sm leading-relaxed mb-6" style={{ color: '#8A7B6E' }}>{featured.excerpt}</p>
              <div className="flex items-center justify-between">
                <div className="text-xs" style={{ color: '#4A4038' }}>{featured.date} · {featured.readTime}</div>
                <Link href={`/blog/${featured.slug}`} className="btn-gold text-xs py-2.5 px-5">Read Article</Link>
              </div>
            </div>
          </div>
        </div>

        {/* Post grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rest.map(post => (
            <article key={post.slug} className="card-hover group cursor-pointer rounded-xl overflow-hidden" style={{ background: '#0f0f0c', border: '1px solid rgba(201,168,76,0.15)' }}>
              <div className="relative h-48 overflow-hidden">
                <Image src={post.img} alt={post.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute top-3 left-3 text-xs px-2.5 py-1 rounded-full font-medium" style={{ background: 'rgba(8,8,6,0.85)', color: CATEGORY_COLORS[post.category] || '#C9A84C', border: `1px solid ${CATEGORY_COLORS[post.category] || '#C9A84C'}40` }}>
                  {post.category}
                </div>
              </div>
              <div className="p-5">
                <h2 className="font-display text-xl mb-2 leading-snug" style={{ color: '#F0E6D3' }}>{post.title}</h2>
                <p className="text-xs leading-relaxed mb-4" style={{ color: '#8A7B6E' }}>{post.excerpt.slice(0, 100)}...</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs" style={{ color: '#4A4038' }}>{post.date} · {post.readTime}</span>
                  <Link href={`/blog/${post.slug}`} className="text-xs font-medium" style={{ color: '#C9A84C' }}>Read →</Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <Footer />
    </>
  )
}
