import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs'
export const maxDuration = 90

const LLM_KEY = process.env.ANTHROPIC_API_KEY ?? process.env.MAMMOUTH_API_KEY ?? process.env.OPENAI_API_KEY
const IS_ANTHROPIC = !!process.env.ANTHROPIC_API_KEY
const IS_MAMMOUTH = !IS_ANTHROPIC && !!process.env.MAMMOUTH_API_KEY

function getLLMConfig(): { url: string; model: string } {
  if (IS_ANTHROPIC) {
    return { url: 'https://api.anthropic.com/v1/messages', model: 'claude-sonnet-4-6' }
  }
  if (IS_MAMMOUTH) {
    return { url: 'https://api.mammouth.ai/v1/chat/completions', model: process.env.LLM_MODEL ?? 'gpt-4o-mini' }
  }
  return { url: 'https://api.openai.com/v1/chat/completions', model: process.env.LLM_MODEL ?? 'gpt-4o-mini' }
}

async function callLLM(systemPrompt: string, userPrompt: string): Promise<string> {
  if (!LLM_KEY) throw new Error('No LLM API key configured')
  const { url, model } = getLLMConfig()

  if (IS_ANTHROPIC) {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'x-api-key': LLM_KEY,
        'anthropic-version': '2023-06-01',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        max_tokens: 4096,
        system: systemPrompt,
        messages: [{ role: 'user', content: userPrompt }],
      }),
    })
    if (!res.ok) {
      const text = await res.text()
      throw new Error(`Anthropic ${res.status}: ${text.slice(0, 200)}`)
    }
    const data = (await res.json()) as { content?: { type: string; text: string }[] }
    return data.content?.[0]?.text ?? '{}'
  }

  // OpenAI / Mammouth
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${LLM_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      temperature: 0.75,
      max_tokens: 4096,
    }),
  })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(`LLM ${res.status}: ${text.slice(0, 200)}`)
  }
  const data = (await res.json()) as { choices?: { message?: { content?: string } }[] }
  return data.choices?.[0]?.message?.content ?? '{}'
}

const LANG_MAP: Record<string, string> = {
  fr: 'French',
  en: 'English',
  de: 'German',
  it: 'Italian',
}

export type Persona = {
  name: string
  age: number
  role: string
  company_size?: string
  location: string
  budget_range: string
  decision_maker: boolean
  purchase_intent: 'high' | 'medium' | 'low' | 'none'
  intent_score: number // 0-100
  key_objection: string
  what_resonates: string
  quote: string
}

export type MarketResearchResult = {
  ok: true
  studyId: string
  product_summary: string
  avg_purchase_intent: number // 0-100
  would_buy_pct: number // % qui achèterait
  price_sensitivity: 'low' | 'medium' | 'high'
  top_segment: string
  personas: Persona[]
  top_objections: string[]
  top_resonators: string[]
  executive_summary: string
  recommended_price_range: string
  go_to_market_tips: string[]
  roi_vs_traditional: string
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as {
      product: string
      audience: string
      sector: string
      buyer_type: 'b2b' | 'b2c' | 'both'
      count?: number
      locale?: string
    }

    const { product, audience, sector, buyer_type, count = 10, locale = 'fr' } = body

    if (!product?.trim() || product.trim().length < 10) {
      return NextResponse.json(
        { ok: false, error: 'Product description too short (min 10 chars)' },
        { status: 400 }
      )
    }

    const lang = LANG_MAP[locale] ?? 'French'
    const personaCount = Math.min(Math.max(count, 5), 15)

    if (!LLM_KEY) {
      return NextResponse.json(getDemoResult(product, locale), { status: 200 })
    }

    const systemPrompt = `You are an expert French market research analyst. You create hyper-realistic synthetic buyer personas based on French demographics (INSEE data) and simulate their genuine reactions to products and campaigns. Output ONLY valid JSON — no prose, no markdown fences.`

    const userPrompt = `Simulate ${personaCount} realistic French ${buyer_type === 'b2b' ? 'B2B decision-makers' : buyer_type === 'b2c' ? 'B2C consumers' : 'buyers (mix B2B and B2C)'} evaluating this product/offer:

PRODUCT/CAMPAIGN:
${product.trim()}

TARGET AUDIENCE: ${audience?.trim() || 'General French market'}
SECTOR: ${sector?.trim() || 'General'}
BUYER TYPE: ${buyer_type}

ALL text outputs (product_summary, persona fields, objections, resonators, executive_summary, tips) MUST be in ${lang}.

Return this exact JSON structure:
{
  "product_summary": "1 sentence summary of what is being evaluated",
  "personas": [
    {
      "name": "realistic French full name",
      "age": number between 25-62,
      "role": "job title / role in ${lang}",
      "company_size": "company size if B2B (e.g. 10-50 employees), null if B2C",
      "location": "French city (vary: Paris, Lyon, Marseille, Bordeaux, Nantes, Toulouse, Strasbourg...)",
      "budget_range": "realistic budget range in EUR",
      "decision_maker": true or false,
      "purchase_intent": "high" | "medium" | "low" | "none",
      "intent_score": number 0-100,
      "key_objection": "their main concern or objection in ${lang} (1 sentence)",
      "what_resonates": "what appeals to them most in ${lang} (1 sentence)",
      "quote": "realistic 1-2 sentence quote from them evaluating this in ${lang}"
    }
  ],
  "avg_purchase_intent": number 0-100 (weighted average of intent_score),
  "would_buy_pct": number 0-100 (% who would actually buy, intent high or medium),
  "price_sensitivity": "low" | "medium" | "high",
  "top_segment": "the most promising buyer segment in 1 sentence in ${lang}",
  "top_objections": ["top 3-4 objections across all personas in ${lang}"],
  "top_resonators": ["top 3-4 things that resonate most across all personas in ${lang}"],
  "executive_summary": "3 paragraphs in ${lang}: (1) audience reception overview, (2) key barriers and opportunities, (3) go-to-market recommendations",
  "recommended_price_range": "realistic recommended price range in EUR based on buyer feedback",
  "go_to_market_tips": ["4-5 specific actionable tips in ${lang}"],
  "roi_vs_traditional": "1 sentence comparing cost/speed vs traditional market research in ${lang}"
}`

    const raw = await callLLM(systemPrompt, userPrompt)
    const cleaned = raw.replace(/^```(?:json)?\s*/i, '').replace(/```\s*$/, '').trim()
    const parsed = JSON.parse(cleaned) as Omit<MarketResearchResult, 'ok' | 'studyId'>

    const result: MarketResearchResult = {
      ok: true,
      studyId: `study-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      ...parsed,
    }

    return NextResponse.json(result)
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : 'Internal error'
    return NextResponse.json({ ok: false, error: msg }, { status: 500 })
  }
}

function getDemoResult(product: string, locale: string): MarketResearchResult {
  const isFr = locale === 'fr'
  return {
    ok: true,
    studyId: `demo-${Date.now()}`,
    product_summary: isFr ? `Évaluation démo de : ${product.slice(0, 80)}` : `Demo evaluation of: ${product.slice(0, 80)}`,
    avg_purchase_intent: 62,
    would_buy_pct: 48,
    price_sensitivity: 'medium',
    top_segment: isFr ? 'Mode démo — configurez ANTHROPIC_API_KEY pour des résultats réels' : 'Demo mode — configure ANTHROPIC_API_KEY for real results',
    personas: [],
    top_objections: [
      isFr ? 'Prix perçu trop élevé' : 'Perceived price too high',
      isFr ? 'Manque de notoriété de la marque' : 'Lack of brand awareness',
      isFr ? 'Besoin de preuves sociales' : 'Need for social proof',
    ],
    top_resonators: [
      isFr ? 'Gain de temps significatif' : 'Significant time savings',
      isFr ? 'ROI mesurable rapidement' : 'Quickly measurable ROI',
      isFr ? 'Interface simple et intuitive' : 'Simple and intuitive interface',
    ],
    executive_summary: isFr
      ? 'Mode démo actif. Configurez ANTHROPIC_API_KEY dans .env.local pour lancer de vraies simulations avec des personas français réalistes.\n\nCette plateforme simule des acheteurs français réels basés sur les données INSEE pour vous donner un aperçu précis de la réception marché.\n\nContactez-nous pour accéder à la version complète avec simulations illimitées et export PDF.'
      : 'Demo mode active. Configure ANTHROPIC_API_KEY in .env.local to run real simulations with realistic French personas.',
    recommended_price_range: isFr ? 'N/A (mode démo)' : 'N/A (demo mode)',
    go_to_market_tips: [
      isFr ? 'Configurez votre clé API pour accéder aux résultats réels' : 'Configure your API key for real results',
    ],
    roi_vs_traditional: isFr
      ? "Cette simulation remplace un cycle d'etude traditionnelle lourd en quelques minutes."
      : 'This simulation replaces a heavy traditional research cycle in minutes.',
  }
}
