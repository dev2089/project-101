import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://thenewimage.vercel.app'
  const now = new Date()
  return [
    { url: base, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${base}/services`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/gallery`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${base}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/contact`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/book`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${base}/blog/hydra-facial-benefits`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/blog/laser-hair-removal-guide`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/blog/bridal-makeup-tips-2025`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/blog/korean-hair-care-routine`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/blog/gel-nails-vs-acrylic`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/blog/prp-treatment-hair-growth`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/privacy`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${base}/terms`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
  ]
}
