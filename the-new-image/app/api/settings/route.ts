import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function GET() {
  const { data, error } = await supabase.from('ni_settings').select('*')
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  const obj: Record<string, string> = {}
  data?.forEach(r => { obj[r.key] = r.value })
  return NextResponse.json(obj)
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  const updates = Object.entries(body).map(([key, value]) => ({
    key, value: String(value), updated_at: new Date().toISOString()
  }))
  const { error } = await supabase.from('ni_settings').upsert(updates, { onConflict: 'key' })
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}
