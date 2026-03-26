import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const title = searchParams.get('title') || 'AI Architecture & Intelligent Systems'

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #030014 0%, #1a0533 50%, #030014 100%)',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            marginBottom: '32px',
          }}
        >
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '16px',
              background: 'linear-gradient(135deg, #8b5cf6, #06b6d4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '32px',
              fontWeight: 900,
              color: 'white',
            }}
          >
            A
          </div>
          <span style={{ fontSize: '40px', fontWeight: 800, color: 'white' }}>
            AI-<span style={{ color: '#a78bfa' }}>DUE</span>
          </span>
        </div>
        <div
          style={{
            fontSize: '28px',
            fontWeight: 600,
            color: '#d1d5db',
            textAlign: 'center',
            maxWidth: '800px',
            lineHeight: 1.4,
            padding: '0 40px',
          }}
        >
          {title}
        </div>
        <div
          style={{
            marginTop: '24px',
            fontSize: '16px',
            color: '#8b5cf6',
            fontWeight: 600,
          }}
        >
          ai-due.com
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}
