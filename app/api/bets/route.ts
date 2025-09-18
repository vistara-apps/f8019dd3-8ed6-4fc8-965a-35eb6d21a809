import { NextRequest, NextResponse } from 'next/server';
import { store } from '@/lib/store';
import type { MarketBet } from '@/lib/types';

// GET /api/bets - Get bets (optionally filtered by market)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const marketId = searchParams.get('marketId');
    const participantId = searchParams.get('participantId');

    let bets: MarketBet[] = [];

    if (marketId) {
      bets = store.getBetsByMarket(marketId);
    } else {
      // Return all bets (in production, this would be paginated)
      bets = Array.from(store['bets'].values());
    }

    if (participantId) {
      bets = bets.filter(bet => bet.participantId === participantId);
    }

    return NextResponse.json({
      success: true,
      data: bets,
    });
  } catch (error) {
    console.error('Error fetching bets:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch bets' },
      { status: 500 }
    );
  }
}

// POST /api/bets - Create a new bet
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { marketId, participantId, chosenOutcome, betAmount } = body;

    if (!marketId || !participantId || !chosenOutcome || !betAmount) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const market = store.getMarket(marketId);
    if (!market) {
      return NextResponse.json(
        { success: false, error: 'Market not found' },
        { status: 404 }
      );
    }

    if (market.status !== 'active' || market.closingTime <= new Date()) {
      return NextResponse.json(
        { success: false, error: 'Market is not active' },
        { status: 400 }
      );
    }

    if (!market.outcomeOptions.includes(chosenOutcome)) {
      return NextResponse.json(
        { success: false, error: 'Invalid outcome option' },
        { status: 400 }
      );
    }

    const participant = store.getParticipant(participantId);
    if (!participant || participant.tokenBalance < betAmount) {
      return NextResponse.json(
        { success: false, error: 'Insufficient token balance' },
        { status: 400 }
      );
    }

    // Create the bet
    const betId = `bet_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const bet: MarketBet = {
      betId,
      marketId,
      participantId,
      chosenOutcome,
      betAmount,
      payout: null, // Will be calculated when market closes
      createdAt: new Date(),
    };

    store.createBet(bet);

    // Update participant's balance
    store.updateParticipantBalance(participantId, -betAmount);

    // Update market stats
    store.updateMarket(marketId, {
      totalPool: market.totalPool + betAmount,
      participantCount: market.participantCount + 1,
    });

    return NextResponse.json({
      success: true,
      data: bet,
    });
  } catch (error) {
    console.error('Error creating bet:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create bet' },
      { status: 500 }
    );
  }
}

