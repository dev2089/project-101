import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "The New Image Salon Studio Academy | Indore's #1 Luxury Salon",
  description: "Indore's premier luxury beauty salon. Expert hair care, advanced skin treatments (Hydra Facial, PRP, Laser Hair Removal), nail extensions, bridal makeup & beauty academy. Located at Manik Bagh Road, Palsikar Colony.",
  keywords: "best salon in indore, luxury salon indore, hair salon indore, skin treatment indore, laser hair removal indore, hydra facial indore, bridal makeup indore, nail extension indore, beauty academy indore, The New Image salon, Khushboo salon indore",
  openGraph: {
    title: "The New Image Salon Studio Academy | Indore",
    description: "Feel Beautiful With Care. Premier luxury beauty salon in Indore offering hair, skin, nails, laser treatments & bridal services.",
    url: "https://thenewimage.vercel.app",
    siteName: "The New Image Salon",
    locale: "en_IN",
    type: "website",
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  alternates: { canonical: "https://thenewimage.vercel.app" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&display=swap" rel="stylesheet" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BeautySalon",
              "name": "The New Image Salon Studio Academy",
              "description": "Luxury beauty salon in Indore offering hair care, skin treatments, nail services, laser hair removal, and bridal makeup.",
              "url": "https://thenewimage.vercel.app",
              "telephone": "+91-75664-46000",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "LG -2,3, Gold Avenue Apartment, 2A, Manik Bagh Rd, Nai Duniya, Palsikar Colony",
                "addressLocality": "Indore",
                "addressRegion": "Madhya Pradesh",
                "postalCode": "452007",
                "addressCountry": "IN"
              },
              "geo": { "@type": "GeoCoordinates", "latitude": 22.70557, "longitude": 75.85566 },
              "openingHours": "Mo-Sa 12:00-20:00",
              "priceRange": "₹₹",
              "aggregateRating": { "@type": "AggregateRating", "ratingValue": "5.0", "reviewCount": "137" },
              "paymentAccepted": "Cash, Credit Card, Debit Card, Google Pay, UPI",
              "image": "https://thenewimage.vercel.app/og-image.jpg"
            })
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
