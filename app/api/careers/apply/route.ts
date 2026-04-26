import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs'
export const maxDuration = 30

const MAX_CV_BYTES = 5 * 1024 * 1024 // 5 MB
const ALLOWED_MIME = new Set([
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'text/plain',
])

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

export async function POST(req: NextRequest) {
  const RESEND_KEY = process.env.RESEND_API_KEY
  const TO = process.env.CAREERS_EMAIL_TO ?? 'contact@ai-due.com'
  const FROM = process.env.CAREERS_EMAIL_FROM ?? 'Careers AI-DUE <onboarding@resend.dev>'

  if (!RESEND_KEY) {
    return NextResponse.json(
      { ok: false, error: 'RESEND_API_KEY not configured' },
      { status: 500 },
    )
  }

  const form = await req.formData()
  const job = (form.get('job') as string) ?? 'Spontaneous'
  const name = (form.get('name') as string) ?? ''
  const email = (form.get('email') as string) ?? ''
  const phone = (form.get('phone') as string) ?? ''
  const linkedin = (form.get('linkedin') as string) ?? ''
  const location = (form.get('location') as string) ?? ''
  const message = (form.get('message') as string) ?? ''
  const cv = form.get('cv') as File | null

  if (!name || !email) {
    return NextResponse.json({ ok: false, error: 'Name and email required' }, { status: 400 })
  }

  const attachments: { filename: string; content: string }[] = []
  if (cv && cv.size > 0) {
    if (cv.size > MAX_CV_BYTES) {
      return NextResponse.json(
        { ok: false, error: 'CV too large (max 5MB)' },
        { status: 413 },
      )
    }
    if (cv.type && !ALLOWED_MIME.has(cv.type)) {
      return NextResponse.json(
        { ok: false, error: 'CV format not supported (PDF/DOCX/TXT only)' },
        { status: 415 },
      )
    }
    const buf = Buffer.from(await cv.arrayBuffer())
    attachments.push({
      filename: cv.name || 'cv.pdf',
      content: buf.toString('base64'),
    })
  }

  const html = `
    <h2>New application — ${escapeHtml(job)}</h2>
    <p><strong>Name:</strong> ${escapeHtml(name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(email)}</p>
    <p><strong>Phone:</strong> ${escapeHtml(phone)}</p>
    <p><strong>LinkedIn:</strong> ${escapeHtml(linkedin)}</p>
    <p><strong>Location:</strong> ${escapeHtml(location)}</p>
    <hr>
    <p><strong>Message:</strong></p>
    <pre style="white-space:pre-wrap;font-family:inherit">${escapeHtml(message)}</pre>
    ${cv ? `<hr><p>📎 CV attached: ${escapeHtml(cv.name)} (${Math.round(cv.size / 1024)} KB)</p>` : '<hr><p>⚠️ No CV attached</p>'}
  `

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${RESEND_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: FROM,
      to: [TO],
      reply_to: email,
      subject: `Application — ${job} — ${name}`,
      html,
      attachments,
    }),
  })

  if (!res.ok) {
    const text = await res.text()
    return NextResponse.json(
      { ok: false, error: `Email failed: ${text.slice(0, 200)}` },
      { status: 502 },
    )
  }

  return NextResponse.json({ ok: true })
}
