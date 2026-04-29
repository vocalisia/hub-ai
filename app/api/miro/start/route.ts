import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs'
export const maxDuration = 60

const MIRO_API_URL = process.env.MIRO_API_URL
const LLM_KEY = process.env.MAMMOUTH_API_KEY ?? process.env.OPENAI_API_KEY
const LLM_BASE = process.env.MAMMOUTH_API_KEY
  ? 'https://api.mammouth.ai/v1/chat/completions'
  : 'https://api.openai.com/v1/chat/completions'
const LLM_MODEL = process.env.LLM_MODEL ?? 'gpt-4o-mini'

// ── RATE LIMIT : 1 simulation par IP par 30 jours ────────────────────────────
// Empêche l'abus du widget public (coût ~$0.04/simulation × N visites = explose)
// Storage: Upstash Redis REST (TTL 30j). Si Redis indispo → fallback memory (process-local).
const RL_URL = process.env.UPSTASH_REDIS_REST_URL ?? ''
const RL_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN ?? ''
const RL_TTL_SECONDS = 30 * 24 * 60 * 60 // 30 jours

const memoryFallback = new Map<string, number>() // dev local seulement

async function checkRateLimit(ip: string): Promise<{ allowed: boolean; resetAt?: number }> {
  const key = `miro:rl:${ip.replace(/[^a-zA-Z0-9.:_-]/g, '_')}`

  // Production : Upstash Redis
  if (RL_URL && RL_TOKEN) {
    try {
      const setRes = await fetch(`${RL_URL}/set/${encodeURIComponent(key)}/1?nx=true&ex=${RL_TTL_SECONDS}`, {
        headers: { Authorization: `Bearer ${RL_TOKEN}` },
        signal: AbortSignal.timeout(3000),
      })
      const data = (await setRes.json()) as { result: string | null }
      // result === "OK" → première fois (allowed). null → déjà existe (refused)
      if (data.result === 'OK') return { allowed: true }
      // Récupère TTL pour le reset
      const ttlRes = await fetch(`${RL_URL}/ttl/${encodeURIComponent(key)}`, {
        headers: { Authorization: `Bearer ${RL_TOKEN}` },
        signal: AbortSignal.timeout(3000),
      })
      const ttl = (await ttlRes.json()) as { result: number }
      return { allowed: false, resetAt: Date.now() + ttl.result * 1000 }
    } catch {
      // Si Redis fail, fallback memory (mieux que tout autoriser)
    }
  }

  // Fallback memory (dev local)
  const now = Date.now()
  const last = memoryFallback.get(key)
  if (last && now - last < RL_TTL_SECONDS * 1000) {
    return { allowed: false, resetAt: last + RL_TTL_SECONDS * 1000 }
  }
  memoryFallback.set(key, now)
  return { allowed: true }
}

function getClientIp(req: NextRequest): string {
  const xff = req.headers.get('x-forwarded-for')
  if (xff) return xff.split(',')[0].trim()
  return req.headers.get('x-real-ip') ?? 'unknown'
}

type Reaction = {
  platform: 'twitter' | 'reddit' | 'polymarket'
  agent: string
  role: string
  stance: 'support' | 'neutral' | 'oppose'
  text: string
}

type SimResult = {
  ok: true
  mode: 'live-llm' | 'live-miro' | 'demo'
  simulationId: string
  doc_summary: string
  reactions: Reaction[]
  sentiment: { support: number; neutral: number; oppose: number }
  report: string
  risks: string[]
}

async function extractText(file: File): Promise<string> {
  const buf = Buffer.from(await file.arrayBuffer())
  const name = file.name.toLowerCase()
  if (name.endsWith('.txt') || name.endsWith('.md')) {
    return buf.toString('utf-8').slice(0, 8000)
  }
  // Naive extraction for PDF/DOCX (just strip non-text chars)
  return buf
    .toString('utf-8')
    .replace(/[^\x20-\x7E\n]/g, ' ')
    .replace(/\s+/g, ' ')
    .slice(0, 8000)
}

async function callLLM(prompt: string): Promise<string> {
  if (!LLM_KEY) throw new Error('No LLM key configured')
  const res = await fetch(LLM_BASE, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${LLM_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: LLM_MODEL,
      messages: [
        {
          role: 'system',
          content:
            'You are a multi-agent public opinion simulation engine. Output only valid JSON. No prose, no markdown fences.',
        },
        { role: 'user', content: prompt },
      ],
      temperature: 0.7,
      max_tokens: 2000,
    }),
  })

  if (!res.ok) {
    const text = await res.text()
    throw new Error(`LLM ${res.status}: ${text.slice(0, 200)}`)
  }

  const data = (await res.json()) as { choices?: { message?: { content?: string } }[] }
  return data.choices?.[0]?.message?.content ?? '{}'
}

const LANGS: Record<string, string> = {
  fr: 'French',
  en: 'English',
  de: 'German',
  it: 'Italian',
}

async function runSimulation(text: string, userPrompt: string, locale: string): Promise<SimResult> {
  const lang = LANGS[locale] ?? 'English'
  const prompt = `Document content (truncated):\n"""\n${text.slice(0, 5000)}\n"""\n\nUser context: ${userPrompt || '(none)'}\n\nSimulate public reactions across Twitter, Reddit, Polymarket. ALL outputs (doc_summary, reactions text, report, risks) MUST be written in ${lang}. Agent names stay realistic and natural in any language. Output JSON only:\n{\n  "doc_summary": "1 sentence summary of the document in ${lang}",\n  "reactions": [12 reactions, mix of platforms (twitter/reddit/polymarket), realistic agent names like "Sarah Chen, Senior Analyst" and stances (support/neutral/oppose), each text 25-50 words written in ${lang}],\n  "sentiment": {"support": 0-100, "neutral": 0-100, "oppose": 0-100},  // sum to 100\n  "report": "3-paragraph executive analysis in ${lang}: opinion landscape, key risks, recommendations",\n  "risks": [3-5 specific risks in ${lang}]\n}`

  const raw = await callLLM(prompt)
  const cleaned = raw.replace(/^```(?:json)?\s*/i, '').replace(/```\s*$/, '').trim()
  const parsed = JSON.parse(cleaned) as Omit<SimResult, 'ok' | 'mode' | 'simulationId'>

  return {
    ok: true,
    mode: 'live-llm',
    simulationId: `sim-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    ...parsed,
  }
}

export async function POST(req: NextRequest) {
  try {
    // RATE LIMIT — 1 simulation par IP par 30 jours
    const ip = getClientIp(req)
    const rl = await checkRateLimit(ip)
    if (!rl.allowed) {
      const resetDate = rl.resetAt ? new Date(rl.resetAt).toISOString() : 'unknown'
      return NextResponse.json(
        {
          ok: false,
          error: 'Rate limit reached: 1 simulation per IP per 30 days. Try again later.',
          resetAt: resetDate,
        },
        { status: 429, headers: { 'Retry-After': String(RL_TTL_SECONDS) } },
      )
    }

    const formData = await req.formData()
    const file = formData.get('file') as File | null
    const promptInput = (formData.get('prompt') as string) ?? ''

    // 1. Real Miro backend if configured
    if (MIRO_API_URL) {
      const upstream = await fetch(`${MIRO_API_URL}/api/graph/build`, {
        method: 'POST',
        body: formData,
      })
      if (!upstream.ok) {
        const text = await upstream.text()
        return NextResponse.json(
          { ok: false, error: `Miro backend ${upstream.status}: ${text.slice(0, 200)}` },
          { status: 502 },
        )
      }
      const data = (await upstream.json()) as unknown
      return NextResponse.json({ ok: true, mode: 'live-miro', data })
    }

    // 2. LLM-based simulation if key available
    if (LLM_KEY) {
      let text = ''
      if (file) {
        text = await extractText(file)
      }
      if (!text && !promptInput) {
        return NextResponse.json(
          { ok: false, error: 'Provide a document or a prompt.' },
          { status: 400 },
        )
      }
      const locale = (formData.get('locale') as string) ?? 'en'
      const result = await runSimulation(text || promptInput, promptInput, locale)
      return NextResponse.json(result)
    }

    // 3. Pure demo fallback
    return NextResponse.json({
      ok: true,
      mode: 'demo',
      simulationId: `demo-${Date.now()}`,
      doc_summary: 'Demo mode — configure MAMMOUTH_API_KEY or OPENAI_API_KEY for real simulations.',
      reactions: [],
      sentiment: { support: 33, neutral: 34, oppose: 33 },
      report: 'Demo mode active.',
      risks: [],
    })
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : 'Internal error'
    return NextResponse.json({ ok: false, error: msg }, { status: 500 })
  }
}
