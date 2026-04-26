import { NextRequest, NextResponse } from 'next/server'

type CheckoutBody = {
  plan?: 'starter' | 'pro' | 'enterprise'
  locale?: string
}

const PAYMENT_LINKS_EUR: Record<string, string | undefined> = {
  pro: process.env.STRIPE_PAYMENT_LINK_PRO,
  enterprise: process.env.STRIPE_PAYMENT_LINK_ENTERPRISE,
}

const PAYMENT_LINKS_USD: Record<string, string | undefined> = {
  pro: process.env.STRIPE_PAYMENT_LINK_PRO_USD,
  enterprise: process.env.STRIPE_PAYMENT_LINK_ENTERPRISE_USD,
}

function pickLink(plan: string, locale: string): string | undefined {
  const isUsd = locale === 'en'
  return (isUsd ? PAYMENT_LINKS_USD[plan] : PAYMENT_LINKS_EUR[plan]) ?? PAYMENT_LINKS_EUR[plan]
}

const PRICE_IDS: Record<string, string | undefined> = {
  pro: process.env.STRIPE_PRICE_PRO,
  enterprise: process.env.STRIPE_PRICE_ENTERPRISE,
}

export async function POST(req: NextRequest) {
  const { plan = 'pro', locale = 'en' } = (await req.json()) as CheckoutBody

  const paymentLink = pickLink(plan, locale)
  if (paymentLink) {
    return NextResponse.json({ url: paymentLink })
  }

  const secret = process.env.STRIPE_SECRET_KEY
  const priceId = PRICE_IDS[plan]
  const origin = req.headers.get('origin') ?? 'https://ai-due.com'

  if (!secret || !priceId) {
    return NextResponse.json(
      {
        error:
          'Stripe is not configured. Set STRIPE_PAYMENT_LINK_PRO / STRIPE_PAYMENT_LINK_ENTERPRISE env vars (easiest) or STRIPE_SECRET_KEY + STRIPE_PRICE_PRO / STRIPE_PRICE_ENTERPRISE.',
      },
      { status: 500 },
    )
  }

  const body = new URLSearchParams({
    mode: 'subscription',
    'line_items[0][price]': priceId,
    'line_items[0][quantity]': '1',
    success_url: `${origin}/${locale}/paiement/succes?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/${locale}/tarifs`,
    allow_promotion_codes: 'true',
    'automatic_tax[enabled]': 'false',
  })

  const stripeRes = await fetch('https://api.stripe.com/v1/checkout/sessions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${secret}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body,
  })

  const data = (await stripeRes.json()) as { url?: string; error?: { message: string } }

  if (!stripeRes.ok || !data.url) {
    return NextResponse.json(
      { error: data.error?.message ?? 'Stripe checkout failed' },
      { status: 500 },
    )
  }

  return NextResponse.json({ url: data.url })
}
