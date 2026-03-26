import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { email, ebookId, name } = body

    if (!email || !ebookId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const RESEND_API_KEY = process.env.RESEND_API_KEY
    if (!RESEND_API_KEY) {
      console.error('RESEND_API_KEY not configured')
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 })
    }

    const EBOOK_LINKS: Record<string, { title: string; url: string }> = {
      'architecture-ia': {
        title: 'Architecture IA — Le Guide Definitif',
        url: `${process.env.NEXT_PUBLIC_EBOOK_BASE_URL || 'https://ai-due.com/ebooks'}/architecture-ia.pdf`,
      },
      'ia-generative': {
        title: 'IA Generative — De GPT a la Production',
        url: `${process.env.NEXT_PUBLIC_EBOOK_BASE_URL || 'https://ai-due.com/ebooks'}/ia-generative.pdf`,
      },
      'ia-generale': {
        title: 'IA Generale — Comprendre et Deployer l\'Intelligence Artificielle',
        url: `${process.env.NEXT_PUBLIC_EBOOK_BASE_URL || 'https://ai-due.com/ebooks'}/ia-generale.pdf`,
      },
    }

    const ebook = EBOOK_LINKS[ebookId]
    if (!ebook) {
      return NextResponse.json({ error: 'Unknown ebook' }, { status: 400 })
    }

    // Send download link email to user
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'AI-DUE <noreply@ai-due.com>',
        to: [email],
        subject: `Votre eBook : ${ebook.title}`,
        html: `
          <div style="font-family: system-ui, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: linear-gradient(135deg, #1a0533, #2d1b69); padding: 32px; border-radius: 12px; text-align: center;">
              <h1 style="color: white; font-size: 24px; margin-bottom: 8px;">AI-DUE</h1>
              <p style="color: #c4b5fd; font-size: 14px;">Architecture IA & Systemes Intelligents</p>
            </div>
            <div style="padding: 32px 0;">
              <p style="color: #374151; font-size: 16px;">Bonjour${name ? ` ${name}` : ''},</p>
              <p style="color: #374151; font-size: 16px;">Merci pour votre interet ! Voici votre lien de telechargement :</p>
              <div style="text-align: center; margin: 24px 0;">
                <a href="${ebook.url}" style="display: inline-block; background: linear-gradient(135deg, #8b5cf6, #7c3aed); color: white; padding: 14px 32px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 16px;">
                  Telecharger ${ebook.title}
                </a>
              </div>
              <p style="color: #6b7280; font-size: 14px;">Ce lien est valide pendant 7 jours.</p>
            </div>
            <div style="border-top: 1px solid #e5e7eb; padding-top: 16px; text-align: center;">
              <p style="color: #9ca3af; font-size: 12px;">AI-DUE — ai-due.com</p>
            </div>
          </div>
        `,
      }),
    })

    // Notify admin of new lead
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'AI-DUE <noreply@ai-due.com>',
        to: ['contact@ai-due.com'],
        subject: `[Lead] eBook download: ${ebook.title}`,
        html: `<p><strong>Email:</strong> ${email}</p><p><strong>Name:</strong> ${name || 'N/A'}</p><p><strong>eBook:</strong> ${ebook.title}</p>`,
      }),
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Ebook download API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
