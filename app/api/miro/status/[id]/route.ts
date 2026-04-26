import { NextRequest, NextResponse } from 'next/server'

const MIRO_API_URL = process.env.MIRO_API_URL

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } },
) {
  const id = params.id

  if (!MIRO_API_URL || id.startsWith('demo-')) {
    return NextResponse.json({
      ok: true,
      mode: 'demo',
      id,
      status: 'running',
      progress: Math.min(100, Math.floor((Date.now() % 120_000) / 1200)),
      message: 'Demo mode — real Miro backend not configured.',
    })
  }

  const upstream = await fetch(`${MIRO_API_URL}/api/simulation/${id}`)

  if (!upstream.ok) {
    return NextResponse.json(
      { ok: false, error: `Upstream ${upstream.status}` },
      { status: 502 },
    )
  }

  const data = (await upstream.json()) as unknown
  return NextResponse.json({ ok: true, mode: 'live', data })
}
