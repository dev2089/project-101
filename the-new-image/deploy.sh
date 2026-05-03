#!/bin/bash
echo "========================================="
echo "  The New Image Salon - Deploy Script"
echo "========================================="
echo ""
echo "Step 1: Installing dependencies..."
npm install

echo ""
echo "Step 2: Building project..."
npm run build

echo ""
echo "Step 3: Deploying to Vercel..."
echo "(Login to Vercel first if not done: vercel login)"
vercel deploy --prod \
  --env NEXT_PUBLIC_SUPABASE_URL=https://qontbkslqibddxhblcru.supabase.co \
  --env NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFvbnRia3NscWliZGR4aGJsY3J1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzczOTU3NjMsImV4cCI6MjA5Mjk3MTc2M30.jK7CgjaJyg_wn9LQT0AAUY4eYlF8CdTK6bB-Lss5NU0 \
  --yes

echo ""
echo "✅ Deployment complete!"
