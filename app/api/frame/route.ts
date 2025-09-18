import { NextRequest, NextResponse } from 'next/server';
import { store } from '@/lib/store';

// Frame metadata for Farcaster
export async function GET() {
  const activeMarkets = store.getActiveMarkets();

  const frameData = {
    version: 'next',
    imageUrl: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/frame/image`,
    button: {
      title: 'View Markets',
      action: {
        type: 'launch_frame',
        name: 'CreatorBet',
        url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/frame`,
        splashImageUrl: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/frame/splash`,
        splashBackgroundColor: '#0f0f0f',
      },
    },
  };

  return NextResponse.json(frameData);
}

// Handle Frame interactions
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { untrustedData } = body;

    if (!untrustedData) {
      return NextResponse.json({ error: 'Invalid frame data' }, { status: 400 });
    }

    const { buttonIndex, fid, castId } = untrustedData;

    // Get active markets
    const activeMarkets = store.getActiveMarkets();

    if (activeMarkets.length === 0) {
      return NextResponse.json({
        version: 'next',
        imageUrl: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/frame/image?message=No active markets`,
        buttons: [
          {
            label: 'Create Market',
            action: 'post',
            target: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/frame/create`,
          },
        ],
      });
    }

    // Show first active market
    const market = activeMarkets[0];

    return NextResponse.json({
      version: 'next',
      imageUrl: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/frame/image?marketId=${market.marketId}`,
      buttons: [
        {
          label: `Bet on ${market.outcomeOptions[0]}`,
          action: 'post',
          target: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/frame/bet?outcome=${market.outcomeOptions[0]}&marketId=${market.marketId}`,
        },
        {
          label: market.outcomeOptions[1] ? `Bet on ${market.outcomeOptions[1]}` : 'View Details',
          action: 'post',
          target: market.outcomeOptions[1]
            ? `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/frame/bet?outcome=${market.outcomeOptions[1]}&marketId=${market.marketId}`
            : `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/frame/details?marketId=${market.marketId}`,
        },
        {
          label: 'Next Market',
          action: 'post',
          target: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/frame/next?index=1`,
        },
      ],
    });
  } catch (error) {
    console.error('Frame interaction error:', error);
    return NextResponse.json(
      {
        version: 'next',
        imageUrl: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/frame/image?message=Error occurred`,
        buttons: [
          {
            label: 'Back',
            action: 'post',
            target: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/frame`,
          },
        ],
      },
      { status: 500 }
    );
  }
}

