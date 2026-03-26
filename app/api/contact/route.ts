import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, subject, message } = body

    // Validate required fields
    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: 'Le nom est requis' },
        { status: 400 }
      )
    }

    if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Email invalide' },
        { status: 400 }
      )
    }

    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: 'Le message est requis' },
        { status: 400 }
      )
    }

    // Log the contact form submission
    console.log('[Contact Form]', {
      name: name.trim(),
      email: email.trim(),
      subject: subject?.trim() || 'N/A',
      message: message.trim(),
      timestamp: new Date().toISOString(),
    })

    return NextResponse.json({
      success: true,
      message: 'Message recu',
    })
  } catch (error) {
    console.error('Contact API error:', error)
    return NextResponse.json(
      { success: false, error: 'Erreur interne du serveur' },
      { status: 500 }
    )
  }
}
