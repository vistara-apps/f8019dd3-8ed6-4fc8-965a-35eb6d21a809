import { NextRequest, NextResponse } from 'next/server';
import { store } from '@/lib/store';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const marketId = searchParams.get('marketId');
    const message = searchParams.get('message');

    // For demo purposes, return a simple SVG image
    // In production, you'd use a library like @vercel/og or puppeteer

    let svgContent = '';

    if (message) {
      svgContent = `
        <svg width="800" height="400" xmlns="http://www.w3.org/2000/svg">
          <rect width="800" height="400" fill="#0f0f0f"/>
          <text x="400" y="200" text-anchor="middle" fill="#ffffff" font-size="24" font-family="Arial">
            ${message}
          </text>
        </svg>
      `;
    } else if (marketId) {
      const market = store.getMarket(marketId);

      if (market) {
        svgContent = `
          <svg width="800" height="400" xmlns="http://www.w3.org/2000/svg">
            <rect width="800" height="400" fill="#0f0f0f"/>
            <text x="400" y="50" text-anchor="middle" fill="#00ff88" font-size="28" font-family="Arial" font-weight="bold">
              CreatorBet
            </text>
            <text x="400" y="100" text-anchor="middle" fill="#ffffff" font-size="20" font-family="Arial">
              ${market.title}
            </text>
            <text x="400" y="140" text-anchor="middle" fill="#cccccc" font-size="16" font-family="Arial">
              Pool: ${market.totalPool} CBT • ${market.participantCount} participants
            </text>
            <text x="400" y="180" text-anchor="middle" fill="#cccccc" font-size="14" font-family="Arial">
              Options: ${market.outcomeOptions.join(' | ')}
            </text>
            <text x="400" y="220" text-anchor="middle" fill="#ff6b6b" font-size="16" font-family="Arial">
              Ends: ${market.closingTime.toLocaleString()}
            </text>
          </svg>
        `;
      } else {
        svgContent = `
          <svg width="800" height="400" xmlns="http://www.w3.org/2000/svg">
            <rect width="800" height="400" fill="#0f0f0f"/>
            <text x="400" y="200" text-anchor="middle" fill="#ffffff" font-size="24" font-family="Arial">
              Market not found
            </text>
          </svg>
        `;
      }
    } else {
      // Default CreatorBet image
      svgContent = `
        <svg width="800" height="400" xmlns="http://www.w3.org/2000/svg">
          <rect width="800" height="400" fill="#0f0f0f"/>
          <text x="400" y="150" text-anchor="middle" fill="#00ff88" font-size="36" font-family="Arial" font-weight="bold">
            CreatorBet
          </text>
          <text x="400" y="200" text-anchor="middle" fill="#ffffff" font-size="24" font-family="Arial">
            Predict, Engage, and Earn
          </text>
          <text x="400" y="240" text-anchor="middle" fill="#cccccc" font-size="18" font-family="Arial">
            on Creator Streams
          </text>
        </svg>
      `;
    }

    return new NextResponse(svgContent, {
      headers: {
        'Content-Type': 'image/svg+xml',
        'Cache-Control': 'public, max-age=300',
      },
    });
  } catch (error) {
    console.error('Frame image generation error:', error);

    const errorSvg = `
      <svg width="800" height="400" xmlns="http://www.w3.org/2000/svg">
        <rect width="800" height="400" fill="#0f0f0f"/>
        <text x="400" y="200" text-anchor="middle" fill="#ff6b6b" font-size="24" font-family="Arial">
          Error generating image
        </text>
      </svg>
    `;

    return new NextResponse(errorSvg, {
      headers: {
        'Content-Type': 'image/svg+xml',
      },
      status: 500,
    });
  }
}

