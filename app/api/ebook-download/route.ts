import { NextRequest, NextResponse } from 'next/server'

const EBOOK_FILES: Record<string, { title: string; file: string }> = {
  'architecture-ia': {
    title: 'Architecture IA — Le Guide Definitif',
    file: '/ebooks/architecture-ia-guide-definitif.pdf',
  },
  'ia-generative': {
    title: 'IA Generative — De GPT a la Production',
    file: '/ebooks/ia-generative-gpt-production.pdf',
  },
  'ia-generale': {
    title: 'IA Generale — Comprendre et Deployer',
    file: '/ebooks/ia-generale-comprendre-deployer.pdf',
  },
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { email, ebookId, name } = body

    if (!email || !ebookId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const ebook = EBOOK_FILES[ebookId]
    if (!ebook) {
      return NextResponse.json({ error: 'Unknown ebook' }, { status: 400 })
    }

    // Log the lead
    console.log(`[eBook Lead] ${new Date().toISOString()} | ${email} | ${name || 'N/A'} | ${ebook.title}`)

    // Try sending email via Resend if configured
    const RESEND_API_KEY = process.env.RESEND_API_KEY
    if (RESEND_API_KEY) {
      const downloadUrl = `https://ai-due.com${ebook.file}`
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
                <p style="color: #374151;">Bonjour${name ? ` ${name}` : ''},</p>
                <p style="color: #374151;">Voici votre lien de telechargement direct :</p>
                <div style="text-align: center; margin: 24px 0;">
                  <a href="${downloadUrl}" style="display: inline-block; background: linear-gradient(135deg, #8b5cf6, #7c3aed); color: white; padding: 14px 32px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 16px;">
                    Telecharger le PDF
                  </a>
                </div>
              </div>
              <div style="border-top: 1px solid #e5e7eb; padding-top: 16px; text-align: center;">
                <p style="color: #9ca3af; font-size: 12px;">AI-DUE — ai-due.com</p>
              </div>
            </div>
          `,
        }),
      }).catch(() => null)
    }

    // Always return the direct download URL
    return NextResponse.json({
      success: true,
      downloadUrl: ebook.file,
      title: ebook.title,
    })
  } catch (error) {
    console.error('Ebook download API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
