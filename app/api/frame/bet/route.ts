import { NextRequest, NextResponse } from 'next/server';
import { store } from '@/lib/store';

export async function POST(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const outcome = searchParams.get('outcome');
    const marketId = searchParams.get('marketId');

    const body = await request.json();
    const { untrustedData } = body;

    if (!untrustedData || !outcome || !marketId) {
      return NextResponse.json({ error: 'Invalid request data' }, { status: 400 });
    }

    const { fid } = untrustedData;

    // Find or create participant
    const participantId = `fc_${fid}`;
    let participant = store.getParticipant(participantId);

    if (!participant) {
      participant = {
        participantId,
        farcasterId: fid.toString(),
        baseWalletAddress: `0x${fid.toString().padStart(40, '0')}`, // Mock address
        createdAt: new Date(),
        tokenBalance: 1000,
      };
      store.createParticipant(participant);
    }

    const market = store.getMarket(marketId);
    if (!market) {
      return NextResponse.json({
        version: 'next',
        imageUrl: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/frame/image?message=Market not found`,
        buttons: [
          {
            label: 'Back',
            action: 'post',
            target: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/frame`,
          },
        ],
      });
    }

    if (market.status !== 'active' || market.closingTime <= new Date()) {
      return NextResponse.json({
        version: 'next',
        imageUrl: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/frame/image?message=Market is closed`,
        buttons: [
          {
            label: 'Back',
            action: 'post',
            target: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/frame`,
          },
        ],
      });
    }

    // Create bet (simplified - in production would handle wallet transaction)
    const betAmount = 10; // Fixed bet amount for demo
    const betId = `bet_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    const bet = {
      betId,
      marketId,
      participantId,
      chosenOutcome: outcome,
      betAmount,
      payout: null,
      createdAt: new Date(),
    };

    store.createBet(bet);
    store.updateParticipantBalance(participantId, -betAmount);
    store.updateMarket(marketId, {
      totalPool: market.totalPool + betAmount,
      participantCount: market.participantCount + 1,
    });

    return NextResponse.json({
      version: 'next',
      imageUrl: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/frame/image?message=Bet placed successfully!`,
      buttons: [
        {
          label: 'View Market',
          action: 'post',
          target: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/frame?marketId=${marketId}`,
        },
        {
          label: 'Back to Markets',
          action: 'post',
          target: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/frame`,
        },
      ],
    });
  } catch (error) {
    console.error('Frame bet error:', error);
    return NextResponse.json({
      version: 'next',
      imageUrl: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/frame/image?message=Error placing bet`,
      buttons: [
        {
          label: 'Back',
          action: 'post',
          target: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/frame`,
        },
      ],
    }, { status: 500 });
  }
}

